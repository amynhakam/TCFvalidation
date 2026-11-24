# Deploy the current app state to VibeHub (on-demand, manual).
# Replaces the old GitHub Actions deploy workflow — VibeHub deploys now happen
# from a local/assistant-driven run instead of CI, since the deploy step needs
# a human decision point (what's being shipped) rather than a fixed schedule.
#
# This repo's VibeHub project ID is amhakam-lg2vih (https://vibehub.microsoft.com/app/tcfvalidation).
#
# Credentials are read from environment variables so the key is never typed
# into source control, a chat session, or a script argument on the command line:
#   VIBEHUB_API_KEY    - VibeHub personal API key (vhpat_...)
#   VIBEHUB_PROJECT_ID  - Existing VibeHub project ID to update in place (amhakam-lg2vih for this repo)
#
# Set them once as persistent *user* environment variables (PowerShell, run by
# you, not pasted anywhere):
#   [Environment]::SetEnvironmentVariable('VIBEHUB_API_KEY', '<your key>', 'User')
#   [Environment]::SetEnvironmentVariable('VIBEHUB_PROJECT_ID', 'amhakam-lg2vih', 'User')
# Then fully restart the application hosting your terminal/assistant session
# (a new terminal tab alone is not enough — Windows apps don't re-read
# environment variables once already running) so the variables take effect.
#
# Usage: .\deploy-to-vibehub.ps1
# Interrupted uploads resume from _vibehub_deploy; keep that directory and the
# same credential until Ready. Rerunning does not package newer workspace changes.

param(
    [string]$ApiKey = $env:VIBEHUB_API_KEY,
    [string]$ProjectId = $env:VIBEHUB_PROJECT_ID
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($ApiKey)) {
    throw "Missing VIBEHUB_API_KEY. Set it as a persistent user environment variable first (see script header)."
}
if ([string]::IsNullOrWhiteSpace($ProjectId)) {
    throw "Missing VIBEHUB_PROJECT_ID. Set it as a persistent user environment variable first (see script header)."
}

$repoRoot = $PSScriptRoot
$stageDir = Join-Path $repoRoot "_vibehub_stage"
$stateDir = Join-Path $repoRoot "_vibehub_deploy"
$statePath = Join-Path $stateDir "upload.json"
$zipPath = Join-Path $stateDir "app-vibehub.zip"
$hub = 'https://vibehub.microsoft.com'

function Invoke-VibeHubRequest {
    param([string]$Path, [string[]]$UploadArguments = @())

    $bodyPath = Join-Path $stateDir 'response.json'
    $headersPath = Join-Path $stateDir 'headers.txt'
    $httpStatus = curl.exe -sS --connect-timeout 30 --max-time 120 `
        -H "X-API-Key: $ApiKey" `
        --output $bodyPath --dump-header $headersPath --write-out '%{http_code}' `
        @UploadArguments "$hub$Path"
    if ($LASTEXITCODE -ne 0) {
        throw "VibeHub transport failed (curl exit code $LASTEXITCODE). Upload state retained in $stateDir; rerun with the same credential to recover."
    }

    $body = Get-Content $bodyPath -Raw
    if ([int]$httpStatus -ge 400) {
        if ([int]$httpStatus -eq 404 -and $Path.StartsWith('/api/external/uploads/lookup?')) {
            return $null
        }
        throw "VibeHub HTTP ${httpStatus}: $body. Upload state retained in $stateDir."
    }
    $expectedStatus = 200
    if ($UploadArguments.Count -gt 0) { $expectedStatus = 202 }
    if ([int]$httpStatus -ne $expectedStatus) {
        throw "Unexpected VibeHub HTTP ${httpStatus}: $body. Upload state retained."
    }
    $json = $body | ConvertFrom-Json
    if ($json.error) { throw "VibeHub API error: $body" }

    $retryAfter = $null
    $headers = Get-Content $headersPath
    if (!($headers -match '^Upload-Protocol:\s*durable-v2\s*$')) {
        throw 'Missing durable-v2 response protocol; upload state retained.'
    }
    foreach ($line in $headers) {
        if ($line -match '^Retry-After:\s*(.+?)\s*$') {
            $seconds = 0
            if ([int]::TryParse($Matches[1], [ref]$seconds)) {
                $retryAfter = [Math]::Max(0, $seconds)
            } else {
                $retryAfter = [Math]::Max(0, [Math]::Ceiling(
                    ([DateTimeOffset]::Parse($Matches[1]) - [DateTimeOffset]::UtcNow).TotalSeconds))
            }
        }
    }
    [pscustomobject]@{ Body = $json; RetryAfter = $retryAfter }
}

function Save-UploadState {
    $state | ConvertTo-Json -Depth 20 | Set-Content $statePath
}

function Send-SavedUpload {
    Invoke-VibeHubRequest '/api/external/push' @(
        '-X', 'POST', '-H', "Idempotency-Key: $($state.UploadKey)",
        '-F', "file=@$zipPath;type=$($state.ContentType)",
        '--form-string', "projectId=$($state.Fields.projectId)",
        '--form-string', "overwrite=$($state.Fields.overwrite)"
    )
}

function Save-Operation {
    param($Response, [switch]$Acceptance)

    $operationId = $Response.Body.operationId
    if ($operationId -cnotmatch '^[0-9a-f]{64}$' -or
        ($state.OperationId -and $operationId -ne $state.OperationId)) {
        throw 'VibeHub returned an invalid or mismatched operation ID; upload state retained.'
    }
    $expectedPath = "/api/external/uploads/$operationId"
    if ($Acceptance -or $Response.Body.statusUrl) {
        if (!$Response.Body.statusUrl) { throw 'VibeHub acceptance is missing statusUrl.' }
        $statusUri = [uri]::new([uri]$hub, [string]$Response.Body.statusUrl)
        if ($statusUri.GetLeftPart([UriPartial]::Authority) -ne $hub -or
            $statusUri.PathAndQuery -ne $expectedPath -or $statusUri.Fragment) {
            throw 'VibeHub returned an unexpected status URL; refusing to send credentials.'
        }
    }
    $state.OperationId = $operationId
    $state.StatusUrl = "$hub$expectedPath"
    Save-UploadState
}

New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$resuming = Test-Path $statePath
if ($resuming) {
    $state = Get-Content $statePath -Raw | ConvertFrom-Json
    if ($state.Hub -ne $hub -or $state.ProjectId -ne $ProjectId -or
        $state.Fields.projectId -ne $ProjectId -or $state.Fields.overwrite -cne 'true' -or
        $state.ContentType -ne 'application/zip' -or $state.FileName -ne 'app-vibehub.zip') {
        throw 'Pending upload intent does not match this deployment.'
    }
    if (!(Test-Path $zipPath) -or (Get-FileHash $zipPath).Hash -ne $state.ArchiveHash -or
        (Get-Item $zipPath).Length -ne $state.ByteLength) {
        throw 'Pending upload archive is missing or changed; cannot safely replay it.'
    }
    Write-Host "Resuming upload $($state.UploadKey) using the saved archive, not newer workspace changes."
} else {
    if (Test-Path $stageDir) { Remove-Item $stageDir -Recurse -Force }
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    New-Item -ItemType Directory -Path $stageDir | Out-Null

    Write-Host "Staging deployable files..."
    try {
        Copy-Item (Join-Path $repoRoot 'index.html') $stageDir
        foreach ($assetDir in @('css', 'js', 'data')) {
            Copy-Item (Join-Path $repoRoot $assetDir) $stageDir -Recurse
        }
        Compress-Archive -Path "$stageDir\*" -DestinationPath $zipPath -CompressionLevel Optimal
    } finally {
        Remove-Item $stageDir -Recurse -Force
    }
    $state = [pscustomobject]@{
        Hub = $hub
        Action = 'overwrite'
        ProjectId = $ProjectId
        Fields = @{ projectId = $ProjectId; overwrite = 'true' }
        UploadKey = [guid]::NewGuid().ToString()
        FileName = 'app-vibehub.zip'
        ContentType = 'application/zip'
        ByteLength = (Get-Item $zipPath).Length
        ArchiveHash = (Get-FileHash $zipPath).Hash
        OperationId = $null
        StatusUrl = $null
        LastStatus = $null
        Result = $null
    }
    Save-UploadState
}

if (!$state.OperationId) {
    $response = $null
    if ($resuming) {
        $response = Invoke-VibeHubRequest "/api/external/uploads/lookup?idempotencyKey=$([uri]::EscapeDataString($state.UploadKey))"
    }
    if (!$response) {
        Write-Host "Pushing to VibeHub (project $ProjectId, upload $($state.UploadKey))..."
        $response = Send-SavedUpload
        Save-Operation $response -Acceptance
    } else {
        Save-Operation $response
    }
    $initialDelay = $response.RetryAfter
    if ($null -eq $initialDelay) { $initialDelay = $response.Body.retryAfterSeconds }
    if ($initialDelay -gt 0) { Start-Sleep -Seconds $initialDelay }
}

if ($state.OperationId -cnotmatch '^[0-9a-f]{64}$') { throw 'Invalid saved operation ID.' }
$deadline = [DateTimeOffset]::UtcNow.AddMinutes(10)
$replayedAcceptance = $false
while ([DateTimeOffset]::UtcNow -lt $deadline) {
    $response = Invoke-VibeHubRequest "/api/external/uploads/$($state.OperationId)"
    $operation = $response.Body
    if ($operation.operationId -ne $state.OperationId) { throw 'Status response operation ID mismatch.' }
    $state.LastStatus = $operation.status
    $state.Result = $operation.result
    Save-UploadState
    Write-Host "VibeHub upload status: $($operation.status)"
    if ($operation.status -eq 'ready') {
        if (!$operation.result -or $operation.result.id -ne $ProjectId -or
            !$operation.result.url -or !$operation.result.versionId -or
            $operation.result.isNewProject -ne $false -or
            $operation.result.overwritten -ne $true) {
            throw 'Ready response is missing the expected overwrite result; upload state retained.'
        }
        Write-Host ($operation.result | ConvertTo-Json -Depth 10)
        $receiptPath = Join-Path $stateDir "$($state.UploadKey).ready.json"
        $state | ConvertTo-Json -Depth 20 | Set-Content $receiptPath
        Remove-Item $zipPath, $statePath, (Join-Path $stateDir 'response.json'), (Join-Path $stateDir 'headers.txt') -Force
        Write-Host "Deploy complete: $($operation.result.url)" -ForegroundColor Green
        return
    }
    if ($operation.status -eq 'retrying' -and $operation.failure -eq 'acceptance-unconfirmed' -and
        $operation.retryable -eq $true -and !$replayedAcceptance) {
        $delay = $response.RetryAfter
        if ($null -eq $delay) { $delay = $operation.retryAfterSeconds }
        Start-Sleep -Seconds ([Math]::Max(1, [double]$delay))
        $response = Send-SavedUpload
        Save-Operation $response -Acceptance
        $replayedAcceptance = $true
    } elseif ($operation.status -eq 'needs-attention' -or
        ($operation.status -eq 'retrying' -and $operation.failure -eq 'acceptance-unconfirmed')) {
        throw "Upload requires attention; no new upload was created. Saved state: $stateDir. Response: $($operation | ConvertTo-Json -Depth 10 -Compress)"
    }
    if ($operation.status -notin @('queued', 'rendering', 'finalizing', 'retrying')) {
        throw "Unexpected upload status: $($operation | ConvertTo-Json -Depth 10 -Compress)"
    }
    $delay = $response.RetryAfter
    if ($null -eq $delay) { $delay = $response.Body.retryAfterSeconds }
    Start-Sleep -Seconds ([Math]::Max(1, [double]$delay))
}
throw "Upload observation timed out; server processing may continue. Rerun with the same credential to resume $($state.OperationId)."
