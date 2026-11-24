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

param(
    [string]$ApiKey = $env:VIBEHUB_API_KEY,
    [string]$ProjectId = $env:VIBEHUB_PROJECT_ID
)

if ([string]::IsNullOrWhiteSpace($ApiKey)) {
    throw "Missing VIBEHUB_API_KEY. Set it as a persistent user environment variable first (see script header)."
}
if ([string]::IsNullOrWhiteSpace($ProjectId)) {
    throw "Missing VIBEHUB_PROJECT_ID. Set it as a persistent user environment variable first (see script header)."
}

$repoRoot = $PSScriptRoot
$stageDir = Join-Path $repoRoot "_vibehub_stage"
$zipPath = Join-Path $repoRoot "app-vibehub.zip"

if (Test-Path $stageDir) { Remove-Item $stageDir -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

New-Item -ItemType Directory -Path $stageDir | Out-Null

Write-Host "Staging deployable files..."
robocopy "$repoRoot" "$stageDir" /E /XD ".git" ".github" "_vibehub_stage" /XF "*.ps1" "*.cmd" "*.bat" | Out-Null
$robocopyExitCode = $LASTEXITCODE
if ($robocopyExitCode -gt 7) {
    throw "Robocopy failed with exit code $robocopyExitCode"
}
$global:LASTEXITCODE = 0

Compress-Archive -Path "$stageDir\*" -DestinationPath $zipPath -CompressionLevel Optimal
Write-Host "Created $zipPath"
$global:LASTEXITCODE = 0

Write-Host "Pushing to VibeHub (project $ProjectId)..."
# Existing-project version pushes omit new-project metadata (name/description).
# overwrite=true replaces the live version in place instead of accumulating version history.
$response = curl.exe -sS --fail-with-body -X POST `
    -H "X-API-Key: $ApiKey" `
    -F "file=@$zipPath" `
    -F "projectId=$ProjectId" `
    -F "overwrite=true" `
    "https://vibehub.microsoft.com/api/external/push"
$curlExitCode = $LASTEXITCODE

Write-Host "Vibehub response:"
Write-Host $response

Remove-Item $stageDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

if ($curlExitCode -ne 0) {
    throw "Vibehub push failed (curl exit code ${curlExitCode}): $response"
}
if ($response -match '"error"') {
    throw "Vibehub push failed: $response"
}

Write-Host "Deploy complete." -ForegroundColor Green
