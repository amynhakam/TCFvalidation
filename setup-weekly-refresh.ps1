# Register a Windows Scheduled Task to refresh vendor data weekly.
# Run this ONCE (as Administrator is NOT required — runs as current user).
# Usage: .\setup-weekly-refresh.ps1
#
# To remove: Unregister-ScheduledTask -TaskName "TCF-VendorDataRefresh" -Confirm:$false

$taskName  = "TCF-VendorDataRefresh"
$scriptPath = Join-Path $PSScriptRoot "refresh-vendor-data.ps1"

if (-not (Test-Path $scriptPath)) {
    Write-Host "ERROR: refresh-vendor-data.ps1 not found at $scriptPath" -ForegroundColor Red
    exit 1
}

# Run every Monday at 09:00
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9am
$action  = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`"" `
    -WorkingDirectory $PSScriptRoot

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Remove existing task if present
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed existing task '$taskName'."
}

Register-ScheduledTask `
    -TaskName $taskName `
    -Description "Weekly refresh of IAB TCF GVL and AVI vendor data for the TCF Requirements Tool" `
    -Trigger $trigger `
    -Action $action `
    -Settings $settings

Write-Host ""
Write-Host "Scheduled task '$taskName' created successfully." -ForegroundColor Green
Write-Host "  Schedule : Every Monday at 9:00 AM"
Write-Host "  Script   : $scriptPath"
Write-Host ""
Write-Host "To remove: Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"
