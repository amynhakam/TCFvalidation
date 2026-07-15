# Refresh local copies of IAB TCF vendor data
# Run this periodically (e.g. weekly) to keep data current.
# Usage: .\refresh-vendor-data.ps1 [-SkipGitPush]

param(
    [switch]$SkipGitPush
)

$dataDir = Join-Path $PSScriptRoot "data"
$timestamp = Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ'

Write-Host "Downloading GVL vendor list..."
Invoke-WebRequest -Uri "https://vendor-list.consensu.org/v3/vendor-list.json" `
    -OutFile (Join-Path $dataDir "gvl-vendor-list.json") -UseBasicParsing

Write-Host "Downloading Additional Vendor Information list..."
Invoke-WebRequest -Uri "https://vendor-list.consensu.org/v2/additional-vendor-information-list.json" `
    -OutFile (Join-Path $dataDir "avi-list.json") -UseBasicParsing

# Create JS wrapper files for file:// compatibility (loaded via <script> tags)
Write-Host "Creating JS wrapper files..."
$gvl = Get-Content (Join-Path $dataDir "gvl-vendor-list.json") -Raw
"window.__GVL_DATA = " + $gvl + ";" | Set-Content -Path (Join-Path $dataDir "gvl-vendor-list.js") -Encoding UTF8
$avi = Get-Content (Join-Path $dataDir "avi-list.json") -Raw
"window.__AVI_DATA = " + $avi + ";" | Set-Content -Path (Join-Path $dataDir "avi-list.js") -Encoding UTF8

# Write refresh timestamp so the UI can show data freshness
"window.__VENDOR_DATA_REFRESHED = '$timestamp';" | Set-Content -Path (Join-Path $dataDir "vendor-data-meta.js") -Encoding UTF8

Write-Host "Done. Vendor data updated at $timestamp"

if (-not $SkipGitPush) {
    # Push updated data to GitHub so the hosted site reflects the refresh
    Write-Host "Pushing updated vendor data to GitHub..."
    Set-Location $PSScriptRoot
    git add data/gvl-vendor-list.js data/avi-list.js data/vendor-data-meta.js
    git commit -m "Auto-refresh vendor data ($timestamp)"
    git push origin main
    Write-Host "Pushed to GitHub."
} else {
    Write-Host "SkipGitPush enabled: data refreshed locally without git commit/push."
}
