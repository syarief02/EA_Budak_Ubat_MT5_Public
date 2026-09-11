$MT5_COMPILER = "C:\Program Files\MetaTrader 5\MetaEditor64.exe"
$MQL5_BASE = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Experts\EA Budak Ubat"
$mq5 = "$MQL5_BASE\EA - Budak Ubat v1.64 - MT5 - Market Edition.mq5"
$log = "$MQL5_BASE\compile_market.log"

if (Test-Path $log) { Remove-Item $log -Force }

Write-Host "Compiling Market Edition..." -ForegroundColor Cyan
$proc = Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5`" /log:`"$log`"" -PassThru -Wait -NoNewWindow

Start-Sleep -Seconds 2

if (Test-Path $log) {
    Get-Content $log
} else {
    Write-Host "Log file not created at $log" -ForegroundColor Red
}

$ex5 = "$MQL5_BASE\EA - Budak Ubat v1.64 - MT5 - Market Edition.ex5"
if (Test-Path $ex5) {
    $item = Get-Item $ex5
    Write-Host "Output binary: $($item.FullName) - $($item.Length) bytes - $($item.LastWriteTime)" -ForegroundColor Green

    # Copy to package and desktop distribution repos
    Copy-Item $ex5 "mql5-market-package\EA - Budak Ubat v1.64 - MT5 - Market Edition.ex5" -Force
    Copy-Item $mq5 "mql5-market-package\EA - Budak Ubat v1.64 - MT5 - Market Edition.mq5" -Force

    if (Test-Path "C:\Users\User\OneDrive\Desktop\ea bu mt5") {
        Copy-Item $ex5 "C:\Users\User\OneDrive\Desktop\ea bu mt5\EA - Budak Ubat v1.64 - MT5 - Market Edition.ex5" -Force
        Copy-Item $mq5 "C:\Users\User\OneDrive\Desktop\ea bu mt5\EA - Budak Ubat v1.64 - MT5 - Market Edition.mq5" -Force
    }

    Write-Host "Binaries successfully synchronized across package and distribution folders!" -ForegroundColor Green
}

