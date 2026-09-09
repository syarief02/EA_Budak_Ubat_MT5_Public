<#
.SYNOPSIS
    Multi-EA Account Authorization Automation Script (MT4 & MT5 Platform Separation)
.DESCRIPTION
    Prepends new account numbers across all 6 MT4 and/or MT5 EAs:
    - EA Budak Ubat
    - EA Aligator Gozaimasu
    - EA Encik Moku
    - BracketBlitz EA
    - MathEdge Pro
    - GoldMind AI
    Compiles all affected EAs, copies binaries with date suffixes,
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
$MQL5_ROOT = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5"
$PUBLIC_REPO = "$DESKTOP\ea bu mt5 public"
$DESKTOP_MT4_REPO = "$DESKTOP\EA_Budak_Ubat"
$DESKTOP_MT5_REPO = "$DESKTOP\ea bu mt5"
$MQL5_FORGE_REPO  = "$MQL5_ROOT"

$ALIGATOR_REPO    = "$DESKTOP\EA Aligator Gozaimasu"
$ENCIK_MOKU_REPO  = "$DESKTOP\EA Encik Moku"
$BRACKETBLITZ_REPO= "$DESKTOP\BracketBlitz-EA"
$MATHEDGE_REPO    = "$DESKTOP\MathEdge Pro"
$GOLDMIND_REPO    = "$MQL5_ROOT\Experts\Goldmind AI"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Helper: Prepend to txt list file
function Prepend-To-TxtList($filePath) {
    if (-not (Test-Path $filePath)) { return $false }
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    if ($content -match 'Authorized account list:\s*\r?\n\s*') {
        $content = [regex]::Replace($content, '(Authorized account list:\s*\r?\n\s*)', { param($m) $m.Groups[1].Value + "$accString, " })
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        Write-Host "  [OK] Updated text list: $(Split-Path $filePath -Leaf)" -ForegroundColor Green
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
    Prepend-To-MQSource "$BRACKETBLITZ_REPO\BracketBlitz.mq4"
    Prepend-To-MQSource "$MATHEDGE_REPO\MathEdge Pro.mq4"
}
if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Prepend-To-MQSource "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .mq5"
    Prepend-To-MQSource "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .mq5"
    Prepend-To-MQSource "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
    Prepend-To-MQSource "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .mq5"
    Prepend-To-MQSource "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.mq5"
    Prepend-To-MQSource "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.mq5"
    Prepend-To-MQSource "$MQL5_ROOT\Experts\GoldMind_AI.mq5"
    Prepend-To-MQSource "$BRACKETBLITZ_REPO\BracketBlitz.mq5"
    Prepend-To-MQSource "$MATHEDGE_REPO\MT5\MathEdge Pro.mq5"
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

$dateSuffix = "20260930"

if ($Platform -eq "ALL" -or $Platform -eq "MT4") {
    # 1. EA Budak Ubat MT4
    $mq4Path = "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4"
    $logPath = "$MQL4_BASE\compile_mql4.log"
    Write-Host "  Compiling MT4: EA Budak Ubat..." -ForegroundColor DarkCyan
    Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Path`" /log:`"$logPath`"" -PassThru -Wait -NoNewWindow
    $compiledEx4 = "$MQL4_BASE\EA - Budak Ubat v1.62 - .ex4"
    if (Test-Path $compiledEx4) {
        Copy-Item $compiledEx4 "$MQL4_BASE\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Copy-Item $compiledEx4 "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT4 - $dateSuffix.ex4" -Force
        Copy-Item $compiledEx4 "$DESKTOP_MT4_REPO\EA - Budak Ubat v1.62 - $dateSuffix.ex4" -Force
        Write-Host "  [OK] EA Budak Ubat MT4 compiled!" -ForegroundColor Green
    }

    # 2. Aligator MT4
    $mq4Aligator = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - .mq4"
    if (Test-Path $mq4Aligator) {
        Write-Host "  Compiling MT4: Aligator Gozaimasu..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Aligator`" /log:`"$ALIGATOR_REPO\compile.log`"" -PassThru -Wait -NoNewWindow
        $binA4 = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - .ex4"
        if (Test-Path $binA4) {
            Copy-Item $binA4 "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item $binA4 "$ALIGATOR_REPO\EA Aligator Gozaimasu v1.06 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item $binA4 "$MQL4_BASE\EA - Aligator Gozaimasu v1.06 (by Budak Ubat) -.ex4" -Force
            Write-Host "  [OK] Aligator Gozaimasu MT4 compiled!" -ForegroundColor Green
        }
    }

    # 3. Encik Moku MT4
    $mq4Moku = "$ENCIK_MOKU_REPO\EA - Encik Moku.mq4"
    if (Test-Path $mq4Moku) {
        Write-Host "  Compiling MT4: Encik Moku..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4Moku`" /log:`"$ENCIK_MOKU_REPO\compile.log`"" -PassThru -Wait -NoNewWindow
        $binM4 = "$ENCIK_MOKU_REPO\EA - Encik Moku.ex4"
        if (Test-Path $binM4) {
            Copy-Item $binM4 "$ENCIK_MOKU_REPO\EA - Encik Moku - MT4 - $dateSuffix.ex4" -Force
            Copy-Item $binM4 "$MQL4_BASE\EA - Encik Moku.ex4" -Force
            Write-Host "  [OK] Encik Moku MT4 compiled!" -ForegroundColor Green
        }
    }

    # 4. BracketBlitz MT4
    $mq4BB = "$BRACKETBLITZ_REPO\BracketBlitz.mq4"
    if (Test-Path $mq4BB) {
        Write-Host "  Compiling MT4: BracketBlitz..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4BB`" /log:`"$BRACKETBLITZ_REPO\compile.log`"" -PassThru -Wait -NoNewWindow
        $binBB4 = "$BRACKETBLITZ_REPO\BracketBlitz.ex4"
        if (Test-Path $binBB4) {
            Copy-Item $binBB4 "$BRACKETBLITZ_REPO\BracketBlitz v1.00 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item $binBB4 "$BRACKETBLITZ_REPO\BracketBlitz - MT4 - $dateSuffix.ex4" -Force
            Write-Host "  [OK] BracketBlitz MT4 compiled!" -ForegroundColor Green
        }
    }

    # 5. MathEdge Pro MT4
    $mq4ME = "$MATHEDGE_REPO\MathEdge Pro.mq4"
    if (Test-Path $mq4ME) {
        Write-Host "  Compiling MT4: MathEdge Pro..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT4_COMPILER -ArgumentList "/compile:`"$mq4ME`" /log:`"$MATHEDGE_REPO\compile.log`"" -PassThru -Wait -NoNewWindow
        $binME4 = "$MATHEDGE_REPO\MathEdge Pro.ex4"
        if (Test-Path $binME4) {
            Copy-Item $binME4 "$MATHEDGE_REPO\MathEdge Pro v1.1 - MT4 - $dateSuffix.ex4" -Force
            Copy-Item $binME4 "$MATHEDGE_REPO\MathEdge Pro - MT4 - $dateSuffix.ex4" -Force
            Write-Host "  [OK] MathEdge Pro MT4 compiled!" -ForegroundColor Green
        }
    }
}

if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    # 1. EA Budak Ubat MT5 v1.63
    $mq5_163 = "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .mq5"
    if (Test-Path $mq5_163) {
        Write-Host "  Compiling MT5: EA Budak Ubat v1.63..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5_163`" /log:`"$MQL5_BASE\compile_v163.log`"" -PassThru -Wait -NoNewWindow
        $bin163 = "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - .ex5"
        if (Test-Path $bin163) {
            Copy-Item $bin163 "$MQL5_BASE\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin163 "$PUBLIC_REPO\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin163 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin163 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .ex5" -Force
            Copy-Item $mq5_163 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.63 - MT5 - .mq5" -Force
            Write-Host "  [OK] EA Budak Ubat MT5 v1.63 compiled!" -ForegroundColor Green
        }
    }

    # 2. EA Budak Ubat MT5 v1.62
    $mq5_162 = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .mq5"
    if (Test-Path $mq5_162) {
        Write-Host "  Compiling MT5: EA Budak Ubat v1.62..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5_162`" /log:`"$MQL5_BASE\compile_v162.log`"" -PassThru -Wait -NoNewWindow
        $bin162 = "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - .ex5"
        if (Test-Path $bin162) {
            Copy-Item $bin162 "$MQL5_BASE\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin162 "$PUBLIC_REPO\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin162 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $bin162 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .ex5" -Force
            Copy-Item $mq5_162 "$DESKTOP_MT5_REPO\EA - Budak Ubat v1.62 - MT5 - .mq5" -Force
            Write-Host "  [OK] EA Budak Ubat MT5 v1.62 compiled!" -ForegroundColor Green
        }
    }

    # 3. Aligator MT5
    $mq5A5 = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.mq5"
    if (Test-Path $mq5A5) {
        Write-Host "  Compiling MT5: Aligator Gozaimasu..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5A5`" /log:`"$ALIGATOR_REPO\compile_mt5.log`"" -PassThru -Wait -NoNewWindow
        $binA5 = "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5.ex5"
        if (Test-Path $binA5) {
            Copy-Item $binA5 "$ALIGATOR_REPO\EA - Aligator Gozaimasu v1.06 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $binA5 "$MQL5_ROOT\Experts\EA - Aligator Gozaimasu v1.06 - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] Aligator Gozaimasu MT5 compiled!" -ForegroundColor Green
        }
    }

    # 4. Encik Moku MT5
    $mq5M5 = "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.mq5"
    if (Test-Path $mq5M5) {
        Write-Host "  Compiling MT5: Encik Moku..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5M5`" /log:`"$ENCIK_MOKU_REPO\compile_mt5.log`"" -PassThru -Wait -NoNewWindow
        $binM5 = "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5.ex5"
        if (Test-Path $binM5) {
            Copy-Item $binM5 "$ENCIK_MOKU_REPO\EA - Encik Moku v1.06 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $binM5 "$MQL5_ROOT\Experts\EA - Encik Moku v1.06 - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] Encik Moku MT5 compiled!" -ForegroundColor Green
        }
    }

    # 5. GoldMind MT5
    $mq5GM = "$MQL5_ROOT\Experts\GoldMind_AI.mq5"
    if (Test-Path $mq5GM) {
        Write-Host "  Compiling MT5: GoldMind AI..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5GM`" /log:`"$MQL5_ROOT\Experts\compile_gm.log`"" -PassThru -Wait -NoNewWindow
        $binGM = "$MQL5_ROOT\Experts\GoldMind_AI.ex5"
        if (Test-Path $binGM) {
            Copy-Item $binGM "$GOLDMIND_REPO\mt5\Experts\GoldMind AI v1.00 - MT5 - $dateSuffix.ex5" -Force -ErrorAction SilentlyContinue
            Copy-Item $binGM "$DESKTOP\mt5 xauusd\mt5\Experts\GoldMind AI v1.00 - MT5 - $dateSuffix.ex5" -Force -ErrorAction SilentlyContinue
            Copy-Item $binGM "$DESKTOP\mt5 xauusd\mt5\Experts\GoldMind_AI.ex5" -Force -ErrorAction SilentlyContinue
            Write-Host "  [OK] GoldMind AI MT5 compiled!" -ForegroundColor Green
        }
    }

    # 6. BracketBlitz MT5
    $mq5BB = "$BRACKETBLITZ_REPO\BracketBlitz.mq5"
    if (Test-Path $mq5BB) {
        Write-Host "  Compiling MT5: BracketBlitz..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5BB`" /log:`"$BRACKETBLITZ_REPO\compile_mt5.log`"" -PassThru -Wait -NoNewWindow
        $binBB5 = "$BRACKETBLITZ_REPO\BracketBlitz.ex5"
        if (Test-Path $binBB5) {
            Copy-Item $binBB5 "$BRACKETBLITZ_REPO\BracketBlitz v1.00 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $binBB5 "$BRACKETBLITZ_REPO\BracketBlitz - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] BracketBlitz MT5 compiled!" -ForegroundColor Green
        }
    }

    # 7. MathEdge Pro MT5
    $mq5ME = "$MATHEDGE_REPO\MT5\MathEdge Pro.mq5"
    if (Test-Path $mq5ME) {
        Write-Host "  Compiling MT5: MathEdge Pro..." -ForegroundColor DarkCyan
        Start-Process -FilePath $MT5_COMPILER -ArgumentList "/compile:`"$mq5ME`" /log:`"$MATHEDGE_REPO\MT5\compile_mt5.log`"" -PassThru -Wait -NoNewWindow
        $binME5 = "$MATHEDGE_REPO\MT5\MathEdge Pro.ex5"
        if (Test-Path $binME5) {
            Copy-Item $binME5 "$MATHEDGE_REPO\MT5\MathEdge Pro v1.1 - MT5 - $dateSuffix.ex5" -Force
            Copy-Item $binME5 "$MATHEDGE_REPO\MT5\MathEdge Pro - MT5 - $dateSuffix.ex5" -Force
            Write-Host "  [OK] MathEdge Pro MT5 compiled!" -ForegroundColor Green
        }
    }
}

# 6. Git Push Repos
Write-Host ""
Write-Host "--- STEP 3: Git Commit & Push ---" -ForegroundColor Cyan

function Git-Commit-Push($repoPath, $commitMsg) {
    if (-not (Test-Path $repoPath)) { return }
    Push-Location $repoPath
    $branch = (git branch --show-current).Trim()
    if (-not $branch) { $branch = "main" }
    Write-Host "  Pushing repo: $(Split-Path $repoPath -Leaf) ($branch)..." -ForegroundColor DarkCyan
    git add -A
    git commit -m $commitMsg --quiet
    git pull --rebase origin $branch --quiet
    git push origin $branch --quiet
    Pop-Location
    Write-Host "  [OK] Pushed: $(Split-Path $repoPath -Leaf) ($branch)" -ForegroundColor Green
}

Git-Commit-Push $MQL4_BASE "feat(auth): authorize accounts $accString in MT4"
Git-Commit-Push $DESKTOP_MT4_REPO "feat(auth): authorize accounts $accString in authorized account list"
Git-Commit-Push $PUBLIC_REPO "feat(auth): authorize accounts $accString, update binaries and web checker"
Git-Commit-Push $ALIGATOR_REPO "feat(auth): authorize accounts $accString in Aligator Gozaimasu"
Git-Commit-Push $ENCIK_MOKU_REPO "feat(auth): authorize accounts $accString in Encik Moku"
Git-Commit-Push $BRACKETBLITZ_REPO "feat(auth): authorize accounts $accString in BracketBlitz"
Git-Commit-Push $MATHEDGE_REPO "feat(auth): authorize accounts $accString in MathEdge Pro"

if ($Platform -eq "ALL" -or $Platform -eq "MT5") {
    Git-Commit-Push $DESKTOP_MT5_REPO "feat(auth): authorize accounts $accString in MT5"
    Git-Commit-Push $GOLDMIND_REPO "feat(auth): authorize accounts $accString in GoldMind AI"
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
Write-Host "  ALL STEPS COMPLETED SUCCESSFULLY FOR ALL 6 EAS!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
