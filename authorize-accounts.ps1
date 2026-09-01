<#
.SYNOPSIS
    EA Budak Ubat Account Authorization Automation Script
.DESCRIPTION
    Prepends new account numbers across all MT4/MT5 source files, authorized account lists,
    web app checker dataset, and README files. Then compiles MT4 & MT5, copies binaries,
    commits & pushes to Git repos, and triggers Vercel deployment.
.PARAMETER Accounts
    Comma-separated list of account numbers (e.g. "49179852, 39217198")
.PARAMETER Platform
    Target platform: "MT4", "MT5", or "ALL" (default: "ALL")
.PARAMETER SkipDeploy
    Switch to skip Vercel web deployment
.EXAMPLE
    .\authorize-accounts.ps1 -Accounts "49179852, 39217198"
    .\authorize-accounts.ps1 -Accounts "12345678" -Platform "MT4"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$Accounts,
    [ValidateSet("ALL", "MT4", "MT5")]
    [string]$Platform = "ALL",
    [switch]$SkipDeploy
)

$ErrorActionPreference = "Continue"

# Clean and parse input account numbers
$accList = ($Accounts -split '[,;\s]+' | Where-Object { $_ -match '^\d+$' })
if ($accList.Count -eq 0) {
    Write-Host "ERROR: No valid numeric account numbers provided." -ForegroundColor Red
    exit 1
}
$accString = ($accList -join ", ")

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "         EA ACCOUNT AUTHORIZATION AUTOMATION SCRIPT" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Accounts to Prepend: $accString" -ForegroundColor Yellow
Write-Host "  Platform Scope:      $Platform" -ForegroundColor Yellow
Write-Host ""

# Compilers & Base paths
$MT4_COMPILER = "C:\Program Files (x86)\FBS Trader 4\metaeditor.exe"
$MT5_COMPILER = "C:\Program Files\MetaTrader 5\MetaEditor64.exe"

$DESKTOP   = "C:\Users\User\OneDrive\Desktop"
$MQL4_BASE = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\9D15457EC01AD10E06A932AAC616DC32\MQL4\Experts\EA-Budak-Ubat"
$MQL5_BASE = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Experts\EA Budak Ubat"
$PUBLIC_REPO = "$DESKTOP\ea bu mt5 public"
$DESKTOP_MT4_REPO = "$DESKTOP\EA_Budak_Ubat"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Helper: Prepend to txt list file
function Prepend-To-TxtList($filePath) {
    if (-not (Test-Path $filePath)) { return $false }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    if ($content -match 'Authorized account list:\s*\r?\n\s*') {
        $content = [regex]::Replace($content, '(Authorized account list:\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        Write-Host "  [OK] Updated: $(Split-Path $filePath -Leaf) at $(Split-Path (Split-Path $filePath -Parent) -Leaf)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Helper: Prepend to MQ file allowedAccountNumbers array
function Prepend-To-MQSource($filePath) {
    if (-not (Test-Path $filePath)) { return $false }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    if ($content -match 'int allowedAccountNumbers\[\d+\]\s*=\s*\{\s*\r?\n\s*') {
        $content = [regex]::Replace($content, '(int allowedAccountNumbers\[\d+\]\s*=\s*\{\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        Write-Host "  [OK] Updated source: $(Split-Path $filePath -Leaf)" -ForegroundColor Green
        return $true
    }
    return $false
}

# 1. Update text files
Write-Host "--- STEP 1: Updating account lists & sources ---" -ForegroundColor Cyan
Prepend-To-TxtList "$DESKTOP_MT4_REPO\v1.62 Authorized Account List.txt"
Prepend-To-TxtList "$MQL5_BASE\v1.62 Authorized Account List.txt"

# 2. Update MQ source files
if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
    Prepend-To-MQSource "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4"
}
if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Prepend-To-MQSource "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
}

# 3. Update Web lib/authorizedAccounts.js
$webJs = "$PUBLIC_REPO\ea-budak-ubat-web\lib\authorizedAccounts.js"
if (Test-Path $webJs) {
    $content = [System.IO.File]::ReadAllText($webJs, [System.Text.Encoding]::UTF8)
    if ($content -match 'slug:\s*"ea-budak-ubat"[\s\S]*?accounts:\s*new Set\(\[') {
        $content = [regex]::Replace($content, '(slug:\s*"ea-budak-ubat"[\s\S]*?accounts:\s*new Set\(\[)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($webJs, $content, $utf8NoBom)
        Write-Host "  [OK] Updated Web checker: authorizedAccounts.js" -ForegroundColor Green
    }
}

# 4. Update README.md
$readme = "$PUBLIC_REPO\README.md"
if (Test-Path $readme) {
    $content = [System.IO.File]::ReadAllText($readme, [System.Text.Encoding]::UTF8)
    if ($content -match '(### Authorized Account List\s*\r?\n\s*Use \*\*Ctrl\+F\*\* to search for your account number:\s*\r?\n\s*>\s*)') {
        $content = [regex]::Replace($content, '(### Authorized Account List\s*\r?\n\s*Use \*\*Ctrl\+F\*\* to search for your account number:\s*\r?\n\s*>\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($readme, $content, $utf8NoBom)
        Write-Host "  [OK] Updated README.md" -ForegroundColor Green
    }
}

# 5. Compile EAs
Write-Host ""
Write-Host "--- STEP 2: Compiling EAs ---" -ForegroundColor Cyan

# Find current date suffix from public repo binaries or default
$mt4PublicFile = Get-ChildItem -Path $PUBLIC_REPO -Filter "EA - Budak Ubat v1.62 - MT4 - *.ex4" | Select-Object -First 1
$dateSuffix = "20260930"
if ($mt4PublicFile -and $mt4PublicFile.Name -match '\d{8}') {
    $dateSuffix = $Matches[0]
}

if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
    $mq4Path = "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4"
    $logPath = "$MQL4_BASE\compilemql4.log"
    Write-Host "  Compiling MT4: $mq4Path ..." -ForegroundColor DarkCyan
    $proc = Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Path`" /log:`"$logPath`"" -PassThru -Wait -NoNewWindow
    $compiledEx4 = "$MQL4_BASE\EA - Budak Ubat v1.62 - .ex4"
    if (Test-Path $compiledEx4) {
        Write-Host "  [OK] MT4 Compilation succeeded!" -ForegroundColor Green
        Copy-Item -Path $compiledEx4 -Destination "$MQL4_BASE\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Copy-Item -Path $compiledEx4 -Destination "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Write-Host "  [OK] Copied MT4 binaries to repos" -ForegroundColor Green
    } else {
        Write-Host "  [FAILED] MT4 Compilation failed. Check $logPath" -ForegroundColor Red
    }
}

if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    $mq5Path = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
    $logPath = "$MQL5_BASE\compilemql5.log"
    Write-Host "  Compiling MT5: $mq5Path ..." -ForegroundColor DarkCyan
    $proc = Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5Path`" /log:`"$logPath`"" -PassThru -Wait -NoNewWindow
    $compiledEx5 = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .ex5"
    if (Test-Path $compiledEx5) {
        Write-Host "  [OK] MT5 Compilation succeeded!" -ForegroundColor Green
        Copy-Item -Path $compiledEx5 -Destination "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
        Write-Host "  [OK] Copied MT5 binaries to repos" -ForegroundColor Green
    } else {
        Write-Host "  [FAILED] MT5 Compilation failed. Check $logPath" -ForegroundColor Red
    }
}

# 6. Git Push Repos
Write-Host ""
Write-Host "--- STEP 3: Git Commit & Push ---" -ForegroundColor Cyan

function Git-Commit-Push($repoPath, $commitMsg) {
    if (-not (Test-Path $repoPath)) { return }
    Write-Host "  Pushing repo: $(Split-Path $repoPath -Leaf)..." -ForegroundColor DarkCyan
    Push-Location $repoPath
    git add -A
    git commit -m $commitMsg --quiet
    git pull --rebase origin main --quiet
    git push origin main --quiet
    Pop-Location
    Write-Host "  [OK] Pushed: $(Split-Path $repoPath -Leaf)" -ForegroundColor Green
}

Git-Commit-Push $MQL4_BASE "feat(auth): authorize accounts $accString in MT4"
Git-Commit-Push $DESKTOP_MT4_REPO "feat(auth): authorize accounts $accString in authorized account list"
Git-Commit-Push $PUBLIC_REPO "feat(auth): authorize accounts $accString, update binaries and web checker"

# 7. Deploy Website
if (-not $SkipDeploy) {
    Write-Host ""
    Write-Host "--- STEP 4: Deploying Website ---" -ForegroundColor Cyan
    Push-Location "$PUBLIC_REPO\ea-budak-ubat-web"
    $envFile = "$PUBLIC_REPO\.env"
    $token = ""
    if (Test-Path $envFile) {
        $match = (Get-Content $envFile | Select-String "VERCEL_TOKEN=(.*)")
        if ($match) { $token = $match.Matches.Groups[1].Value.Trim() }
    }
    if ($token) {
        npx -y vercel --prod --yes --token $token
    } else {
        npx -y vercel --prod --yes
    }
    Pop-Location
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "  ALL STEPS COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
