<#
.SYNOPSIS
    Multi-EA Account Authorization Automation Script (MT4 & MT5 Platform Separation)
.DESCRIPTION
    Prepends new account numbers across all MT4 and/or MT5 source files, authorized account lists,
    web app checker dataset, and README files. Then compiles all affected MT4 & MT5 EAs,
    copies binaries with date suffixes, commits & pushes to Git repos, and triggers Vercel deployment.
.PARAMETER Accounts
    Comma-separated list of account numbers (e.g. "49179852, 39217198")
.PARAMETER Platform
    Target platform: "MT4", "MT5", or "ALL" (default: "ALL")
.PARAMETER SkipDeploy
    Switch to skip Vercel web deployment
.EXAMPLE
    .\authorize-accounts.ps1 -Accounts "49179852, 39217198"
    .\authorize-accounts.ps1 -Accounts "12345678" -Platform "MT4"
    .\authorize-accounts.ps1 -Accounts "440204090" -Platform "MT5"
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
Write-Host "   MULTI-EA ACCOUNT AUTHORIZATION AUTOMATION SCRIPT" -ForegroundColor Cyan
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
$MQL5_TERMINAL_ROOT = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5"
$PUBLIC_REPO = "$DESKTOP\ea bu mt5 public"
$DESKTOP_MT4_REPO = "$DESKTOP\EA_Budak_Ubat"
$DESKTOP_MT5_REPO = "$DESKTOP\ea bu mt5"
$MQL5_FORGE_REPO  = "$MQL5_TERMINAL_ROOT"
$ALIGATOR_REPO    = "$DESKTOP\EA Aligator Gozaimasu"
$ENCIK_MOKU_REPO  = "$DESKTOP\EA Encik Moku"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Helper: Prepend to txt list file
function Prepend-To-TxtList($filePath) {
    if (-not (Test-Path $filePath)) { return $false }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    if ($content -match 'Authorized account list:\s*\r?\n\s*') {
        $content = [regex]::Replace($content, '(Authorized account list:\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        Write-Host "  [OK] Updated text list: $(Split-Path $filePath -Leaf) at $(Split-Path (Split-Path $filePath -Parent) -Leaf)" -ForegroundColor Green
        return $true
    }
    return $false
}

# Helper: Prepend to MQ file allowedAccountNumbers array
function Prepend-To-MQSource($filePath) {
    if (-not (Test-Path $filePath)) { return $false }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    $pattern = '((?:int|long|ulong)\s+allowedAccountNumbers(?:\s*\[\s*\d*\s*\])?\s*=\s*\r?\n?\s*\{\s*\r?\n?\s*)'
    if ($content -match $pattern) {
        $content = [regex]::Replace($content, $pattern, { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        Write-Host "  [OK] Updated MQ source: $(Split-Path $filePath -Leaf)" -ForegroundColor Green
        return $true
    }
    Write-Host "  [WARN] Regex did not match: $filePath" -ForegroundColor Yellow
    return $false
}

# 1. Update text files
Write-Host "--- STEP 1: Updating account lists & sources ---" -ForegroundColor Cyan
if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
    Prepend-To-TxtList "$DESKTOP_MT4_REPO\v1.62 Authorized Account List.txt"
    Prepend-To-TxtList "$MQL5_BASE\v1.62 Authorized Account List.txt"
    Prepend-To-TxtList "$DESKTOP_MT5_REPO\v1.62 Authorized Account List.txt"
}
if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Prepend-To-TxtList "$MQL5_BASE\v1.63 Authorized Account List.txt"
    Prepend-To-TxtList "$DESKTOP_MT5_REPO\v1.63 Authorized Account List.txt"
}

# 2. Update MQ source files across all EAs
if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
    Prepend-To-MQSource "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4"
    Prepend-To-MQSource "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - .mq4"
    Prepend-To-MQSource "$MQL4_BASE\EA - Aligator Gozaimasu v1.06 (by Budak Ubat) -.mq4"
    Prepend-To-MQSource "$ENCIK_MOKU_REPO\EA - Encik Moku.mq4"
    Prepend-To-MQSource "$MQL4_BASE\EA - Encik Moku.mq4"
}
if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Prepend-To-MQSource "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .mq5"
    Prepend-To-MQSource "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .mq5"
    Prepend-To-MQSource "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
    Prepend-To-MQSource "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .mq5"
    Prepend-To-MQSource "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.mq5"
    Prepend-To-MQSource "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.mq5"
}

# 3. Update Web lib/authorizedAccounts.js
$webJs = "$PUBLIC_REPO\ea-budak-ubat-web\lib\authorizedAccounts.js"
if (Test-Path $webJs) {
    $content = [System.IO.File]::ReadAllText($webJs, [System.Text.Encoding]::UTF8)
    if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
        if ($content -match 'MT4_AUTHORIZED_ACCOUNTS\s*=\s*new Set\(\[\s*\r?\n\s*') {
            $content = [regex]::Replace($content, '(MT4_AUTHORIZED_ACCOUNTS\s*=\s*new Set\(\[\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        }
    }
    if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
        if ($content -match 'MT5_AUTHORIZED_ACCOUNTS\s*=\s*new Set\(\[\s*\r?\n\s*') {
            $content = [regex]::Replace($content, '(MT5_AUTHORIZED_ACCOUNTS\s*=\s*new Set\(\[\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        }
    }
    [System.IO.File]::WriteAllText($webJs, $content, $utf8NoBom)
    Write-Host "  [OK] Updated Web checker: authorizedAccounts.js" -ForegroundColor Green
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
    # 1. EA Budak Ubat MT4
    $mq4Path = "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4"
    $logPath = "$MQL4_BASE\compile_mql4.log"
    Write-Host "  Compiling MT4: EA Budak Ubat..." -ForegroundColor DarkCyan
    $proc = Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Path`" /log:`"$logPath`"" -PassThru -Wait -NoNewWindow
    $compiledEx4 = "$MQL4_BASE\EA - Budak Ubat v1.62 - .ex4"
    if (Test-Path $compiledEx4) {
        Write-Host "  [OK] EA Budak Ubat MT4 Compilation succeeded!" -ForegroundColor Green
        Copy-Item -Path $compiledEx4 -Destination "$MQL4_BASE\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Copy-Item -Path $compiledEx4 -Destination "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Copy-Item -Path $compiledEx4 -Destination "$DESKTOP_MT4_REPO\EA - Budak Ubat v1.62 - $dateSuffix.ex4" -Force
    }

    # 2. Aligator Gozaimasu MT4
    $mq4Aligator = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - .mq4"
    if (Test-Path $mq4Aligator) {
        Write-Host "  Compiling MT4: Aligator Gozaimasu..." -ForegroundColor DarkCyan
        $logAligator = "$ALIGATOR_REPO\compile.log"
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Aligator`" /log:`"$logAligator`"" -PassThru -Wait -NoNewWindow
        $binAligator4 = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - .ex4"
        if (Test-Path $binAligator4) {
            Copy-Item -Path $binAligator4 -Destination "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item -Path $binAligator4 -Destination "$ALIGATOR_REPO\EA Aligator Gozaimasu v1.06 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item -Path $binAligator4 -Destination "$MQL4_BASE\EA - Aligator Gozaimasu v1.06 (by Budak Ubat) -.ex4" -Force
            Write-Host "  [OK] Aligator Gozaimasu MT4 compiled & copied!" -ForegroundColor Green
        }
    }

    # 3. Encik Moku MT4
    $mq4Moku = "$ENCIK_MOKU_REPO\EA - Encik Moku.mq4"
    if (Test-Path $mq4Moku) {
        Write-Host "  Compiling MT4: Encik Moku..." -ForegroundColor DarkCyan
        $logMoku = "$ENCIK_MOKU_REPO\compile.log"
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Moku`" /log:`"$logMoku`"" -PassThru -Wait -NoNewWindow
        $binMoku4 = "$ENCIK_MOKU_REPO\EA - Encik Moku.ex4"
        if (Test-Path $binMoku4) {
            Copy-Item -Path $binMoku4 -Destination "$ENCIK_MOKU_REPO\EA - Encik Moku - MT4 - $dateSuffix.ex4" -Force
            Copy-Item -Path $binMoku4 -Destination "$MQL4_BASE\EA - Encik Moku.ex4" -Force
            Write-Host "  [OK] Encik Moku MT4 compiled & copied!" -ForegroundColor Green
        }
    }
}

if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    # 1. Compile MT5 v1.63
    $mq5_163 = "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .mq5"
    if (Test-Path $mq5_163) {
        $logPath163 = "$MQL5_BASE\compile_v163.log"
        Write-Host "  Compiling MT5: EA Budak Ubat v1.63..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5_163`" /log:`"$logPath163`"" -PassThru -Wait -NoNewWindow
        $compiledEx5_163 = "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .ex5"
        if (Test-Path $compiledEx5_163) {
            Copy-Item -Path $compiledEx5_163 -Destination "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_163 -Destination "$PUBLIC_REPO\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_163 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_163 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .ex5" -Force
            Copy-Item -Path $mq5_163 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .mq5" -Force
            Write-Host "  [OK] EA Budak Ubat MT5 v1.63 compiled & copied!" -ForegroundColor Green
        }
    }

    # 2. Compile MT5 v1.62
    $mq5_162 = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
    if (Test-Path $mq5_162) {
        $logPath162 = "$MQL5_BASE\compile_v162.log"
        Write-Host "  Compiling MT5: EA Budak Ubat v1.62..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5_162`" /log:`"$logPath162`"" -PassThru -Wait -NoNewWindow
        $compiledEx5_162 = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .ex5"
        if (Test-Path $compiledEx5_162) {
            Copy-Item -Path $compiledEx5_162 -Destination "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_162 -Destination "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_162 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $compiledEx5_162 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .ex5" -Force
            Copy-Item -Path $mq5_162 -Destination "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .mq5" -Force
            Write-Host "  [OK] EA Budak Ubat MT5 v1.62 compiled & copied!" -ForegroundColor Green
        }
    }

    # 3. Compile Aligator MT5
    $mq5Aligator = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.mq5"
    if (Test-Path $mq5Aligator) {
        Write-Host "  Compiling MT5: Aligator Gozaimasu..." -ForegroundColor DarkCyan
        $logAligator5 = "$ALIGATOR_REPO\compile_mt5.log"
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5Aligator`" /log:`"$logAligator5`"" -PassThru -Wait -NoNewWindow
        $binAligator5 = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.ex5"
        if (Test-Path $binAligator5) {
            Copy-Item -Path $binAligator5 -Destination "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $binAligator5 -Destination "$MQL5_TERMINAL_ROOT\Experts\EA - Aligator Gozaimasu v1.06 - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] Aligator Gozaimasu MT5 compiled & copied!" -ForegroundColor Green
        }
    }

    # 4. Compile Encik Moku MT5
    $mq5Moku = "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.mq5"
    if (Test-Path $mq5Moku) {
        Write-Host "  Compiling MT5: Encik Moku..." -ForegroundColor DarkCyan
        $logMoku5 = "$ENCIK_MOKU_REPO\compile_mt5.log"
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5Moku`" /log:`"$logMoku5`"" -PassThru -Wait -NoNewWindow
        $binMoku5 = "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.ex5"
        if (Test-Path $binMoku5) {
            Copy-Item -Path $binMoku5 -Destination "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item -Path $binMoku5 -Destination "$MQL5_TERMINAL_ROOT\Experts\EA - Encik Moku v1.06 - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] Encik Moku MT5 compiled & copied!" -ForegroundColor Green
        }
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
if (Test-Path $ALIGATOR_REPO) {
    Git-Commit-Push $ALIGATOR_REPO "feat(auth): authorize accounts $accString in Aligator Gozaimasu"
}
if (Test-Path $ENCIK_MOKU_REPO) {
    Git-Commit-Push $ENCIK_MOKU_REPO "feat(auth): authorize accounts $accString in Encik Moku"
}
if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Git-Commit-Push $DESKTOP_MT5_REPO "feat(auth): authorize accounts $accString in MT5"
    if (Test-Path $MQL5_FORGE_REPO) {
        Write-Host "  Pushing repo: MQL5 Forge..." -ForegroundColor DarkCyan
        Push-Location $MQL5_FORGE_REPO
        git add -A
        git commit -m "feat(auth): authorize accounts $accString in MQL5 Forge" --quiet
        git pull --rebase origin main --quiet
        git push origin main --quiet
        Pop-Location
        Write-Host "  [OK] Pushed: MQL5 Forge" -ForegroundColor Green
    }
}

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
