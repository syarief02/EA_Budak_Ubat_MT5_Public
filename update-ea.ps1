<#
.SYNOPSIS
    Monthly EA Update Automation Script
.DESCRIPTION
    Updates expiry dates in all EA source files, compiles MQ4/MQ5,
    renames outputs with platform and date, copies to repos, and
    updates website download URLs in a single command.
.PARAMETER ExpiryDate
    New expiry date in YYYY-MM-DD format (e.g. 2026-04-28)
.EXAMPLE
    .\update-ea.ps1 -ExpiryDate "2026-04-28"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$ExpiryDate
)

$ErrorActionPreference = "Continue"

# Parse and validate date
try {
    $date = [DateTime]::ParseExact($ExpiryDate, "yyyy-MM-dd", $null)
}
catch {
    Write-Host "ERROR: Invalid date format. Use YYYY-MM-DD (e.g. 2026-04-28)" -ForegroundColor Red
    exit 1
}

$dateDot     = $date.ToString("yyyy.MM.dd")
$dateCompact = $date.ToString("yyyyMMdd")
$dateDash    = $date.ToString("yyyy-MM-dd")

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "         EA MONTHLY UPDATE AUTOMATION SCRIPT" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  New Expiry Date: $dateDot" -ForegroundColor Yellow
Write-Host "  File Suffix:     $dateCompact" -ForegroundColor Yellow
Write-Host ""

# Compilers
$MT4_COMPILER = "C:\Program Files (x86)\FBS Trader 4\metaeditor.exe"
$MT5_COMPILER = "C:\Program Files\MetaTrader 5\MetaEditor64.exe"

if (-not (Test-Path $MT4_COMPILER)) {
    Write-Host "WARNING: MT4 compiler not found at $MT4_COMPILER" -ForegroundColor Yellow
}
if (-not (Test-Path $MT5_COMPILER)) {
    Write-Host "WARNING: MT5 compiler not found at $MT5_COMPILER" -ForegroundColor Yellow
}

# Base paths
$DESKTOP   = "C:\Users\User\OneDrive\Desktop"
$MQL4_BASE = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\9D15457EC01AD10E06A932AAC616DC32\MQL4\Experts\EA-Budak-Ubat"
$MQL5_BASE = "C:\Users\User\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Experts"
$WEB_APP   = "$DESKTOP\ea bu mt5 public\ea-budak-ubat-web\app"

# EA Source File Registry
# Format: Name, Version, MQ4 path, MQ5 path, MQ4 encoding, MQ5 encoding,
#          output repo, MQ5 sub-dir, MT4 output name, MT5 output name, web slug

$EANames    = @("EA Budak Ubat",     "GoldMind AI",       "BracketBlitz",       "MathEdge Pro",       "Aligator Gozaimasu",       "Encik Moku")
$EAVersions = @("v1.62",             "v1.00",             "v1.00",              "v1.1",               "v1.06",                     "v1.06")

$MQ4Sources = @(
    "$MQL4_BASE\EA - Budak Ubat v1.62 - .mq4",
    "",
    "$DESKTOP\BracketBlitz-EA\BracketBlitz.mq4",
    "$DESKTOP\MathEdge Pro\MathEdge Pro.mq4",
    "$DESKTOP\EA Aligator Gozaimasu\EA - Aligator Gozaimasu v1.06 - .mq4",
    "$DESKTOP\EA Encik Moku\EA - Encik Moku.mq4"
)

$MQ5Sources = @(
    "$MQL5_BASE\EA Budak Ubat\EA - Budak Ubat v1.62 - MT5 - Beta.mq5",
    "$MQL5_BASE\Goldmind AI\mt5\Experts\GoldMind_AI.mq5",
    "$DESKTOP\BracketBlitz-EA\BracketBlitz.mq5",
    "$DESKTOP\MathEdge Pro\MT5\MathEdge Pro.mq5",
    "$DESKTOP\EA Aligator Gozaimasu\EA - Aligator Gozaimasu v1.06 - MT5.mq5",
    "$DESKTOP\EA Encik Moku\EA - Encik Moku v1.06 - MT5.mq5"
)

$MQ4Encodings = @("unicode", "", "utf8", "utf8", "utf8", "utf8")
$MQ5Encodings = @("unicode", "utf8", "utf8", "utf8", "utf8", "utf8")

$OutputRepos = @(
    "$DESKTOP\ea bu mt5 public",
    "$MQL5_BASE\Goldmind AI",
    "$DESKTOP\BracketBlitz-EA",
    "$DESKTOP\MathEdge Pro",
    "$DESKTOP\EA Aligator Gozaimasu",
    "$DESKTOP\EA Encik Moku"
)

$MQ5OutputSubs = @("", "mt5\Experts", "", "MT5", "", "")

$MT4OutNames = @(
    "EA - Budak Ubat v1.62 - MT4 - $dateCompact.ex4",
    "",
    "BracketBlitz v1.00 - MT4 - $dateCompact.ex4",
    "MathEdge Pro v1.1 - MT4 - $dateCompact.ex4",
    "EA Aligator Gozaimasu v1.06 - MT4 - $dateCompact.ex4",
    "EA - Encik Moku - MT4 - $dateCompact.ex4"
)

$MT5OutNames = @(
    "EA - Budak Ubat v1.62 - MT5 - $dateCompact.ex5",
    "GoldMind AI v1.00 - MT5 - $dateCompact.ex5",
    "BracketBlitz v1.00 - MT5 - $dateCompact.ex5",
    "MathEdge Pro v1.1 - MT5 - $dateCompact.ex5",
    "EA - Aligator Gozaimasu v1.06 - MT5 - $dateCompact.ex5",
    "EA - Encik Moku v1.06 - MT5 - $dateCompact.ex5"
)

$WebSlugs = @("ea-budak-ubat", "goldmind-ai", "bracketblitz", "mathedge-pro", "aligator-gozaimasu", "encik-moku")

# Counters
$updatedFiles  = 0
$compiledFiles = 0
$renamedFiles  = 0
$webUpdates    = 0
$errorList     = @()

# ================================================================
# STEP 1: UPDATE EXPIRY DATES IN SOURCE FILES
# ================================================================
Write-Host "--- STEP 1: Updating expiry dates ---" -ForegroundColor Cyan

function Update-ExpiryInFile($FilePath, $FileEncoding, $NewDateDot) {
    if (-not $FilePath -or $FilePath -eq "") { return $false }
    if (-not (Test-Path $FilePath)) {
        Write-Host "  SKIP: Not found: $FilePath" -ForegroundColor Yellow
        return $false
    }

    $fileName = Split-Path $FilePath -Leaf

    # Read file
    if ($FileEncoding -eq "unicode") {
        $content = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::Unicode)
    }
    else {
        $content = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)
    }

    $changed = $false

    # Pattern 1: D'YYYY.MM.DD 23:55'
    if ($content -match "D'\d{4}\.\d{2}\.\d{2} 23:55'") {
        $content = [regex]::Replace($content, "D'\d{4}\.\d{2}\.\d{2} 23:55'", "D'$NewDateDot 23:55'")
        $changed = $true
    }

    # Pattern 2: D'YYYY.MM.DD 00:00:00'
    if ($content -match "D'\d{4}\.\d{2}\.\d{2} 00:00:00'") {
        $content = [regex]::Replace($content, "D'\d{4}\.\d{2}\.\d{2} 00:00:00'", "D'$NewDateDot 00:00:00'")
        $changed = $true
    }

    # Pattern 3: D'YYYY.MM.DD 23:59:59'
    if ($content -match "D'\d{4}\.\d{2}\.\d{2} 23:59:59'") {
        $content = [regex]::Replace($content, "D'\d{4}\.\d{2}\.\d{2} 23:59:59'", "D'$NewDateDot 23:59:59'")
        $changed = $true
    }

    # Pattern 4: ExpiryNYDate = "YYYY.MM.DD"
    if ($content -match 'ExpiryNYDate\s*=\s*"\d{4}\.\d{2}\.\d{2}"') {
        $replacement = 'ExpiryNYDate            = "' + $NewDateDot + '"'
        $content = [regex]::Replace($content, 'ExpiryNYDate\s*=\s*"\d{4}\.\d{2}\.\d{2}"', $replacement)
        $changed = $true
    }

    # Pattern 5: "Expiration Date: YYYY.MM.DD"
    if ($content -match "Expiration Date: \d{4}\.\d{2}\.\d{2}") {
        $content = [regex]::Replace($content, "Expiration Date: \d{4}\.\d{2}\.\d{2}", "Expiration Date: $NewDateDot")
        $changed = $true
    }

    # Pattern 6: "Expiry:  YYYY-MM-DD" in comments
    $newDash = $NewDateDot -replace '\.', '-'
    if ($content -match "Expiry:\s+\d{4}-\d{2}-\d{2}") {
        $content = [regex]::Replace($content, "Expiry:\s+\d{4}-\d{2}-\d{2}", "Expiry:  $newDash")
        $changed = $true
    }

    # Pattern 7: "expiry to YYYY-MM-DD" in comments
    if ($content -match "expiry to \d{4}-\d{2}-\d{2}") {
        $content = [regex]::Replace($content, "expiry to \d{4}-\d{2}-\d{2}", "expiry to $newDash")
        $changed = $true
    }

    if ($changed) {
        if ($FileEncoding -eq "unicode") {
            [System.IO.File]::WriteAllText($FilePath, $content, [System.Text.Encoding]::Unicode)
        }
        else {
            $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
            [System.IO.File]::WriteAllText($FilePath, $content, $utf8NoBom)
        }
        Write-Host "  [OK] Updated: $fileName" -ForegroundColor Green
        return $true
    }
    else {
        Write-Host "  [--] No expiry pattern: $fileName" -ForegroundColor DarkGray
        return $false
    }
}

for ($i = 0; $i -lt $EANames.Count; $i++) {
    Write-Host ""
    Write-Host "  [$($EANames[$i])]" -ForegroundColor White

    $result = Update-ExpiryInFile $MQ4Sources[$i] $MQ4Encodings[$i] $dateDot
    if ($result) { $updatedFiles++ }

    $result = Update-ExpiryInFile $MQ5Sources[$i] $MQ5Encodings[$i] $dateDot
    if ($result) { $updatedFiles++ }
}

# ================================================================
# STEP 2: COMPILE ALL SOURCE FILES
# ================================================================
Write-Host ""
Write-Host "--- STEP 2: Compiling source files ---" -ForegroundColor Cyan

function Compile-MQFile($SourcePath, $Compiler, $Platform) {
    if (-not $SourcePath -or $SourcePath -eq "") { return $false }
    if (-not (Test-Path $SourcePath)) {
        Write-Host "  SKIP: Source not found" -ForegroundColor Yellow
        return $false
    }
    if (-not (Test-Path $Compiler)) {
        Write-Host "  SKIP: Compiler not found" -ForegroundColor Yellow
        return $false
    }

    $fileName = Split-Path $SourcePath -Leaf
    Write-Host "  Compiling ($Platform): $fileName ..." -ForegroundColor DarkCyan -NoNewline

    $logFile = [System.IO.Path]::ChangeExtension($SourcePath, ".log")

    $argString = "/compile:""$SourcePath"" /log:""$logFile"""
    $proc = Start-Process -FilePath $Compiler -ArgumentList $argString -PassThru -Wait -NoNewWindow

    # Determine compiled extension
    $ext = ".ex5"
    if ($Platform -eq "MT4") { $ext = ".ex4" }
    $compiledFile = [System.IO.Path]::ChangeExtension($SourcePath, $ext)

    if (Test-Path $compiledFile) {
        Write-Host " [OK]" -ForegroundColor Green
        return $true
    }
    else {
        Write-Host " [FAILED]" -ForegroundColor Red
        if (Test-Path $logFile) {
            $logLines = Get-Content $logFile -Tail 5 -ErrorAction SilentlyContinue
            if ($logLines) {
                foreach ($line in $logLines) {
                    Write-Host "    $line" -ForegroundColor DarkYellow
                }
            }
        }
        return $false
    }
}

for ($i = 0; $i -lt $EANames.Count; $i++) {
    Write-Host ""
    Write-Host "  [$($EANames[$i])]" -ForegroundColor White

    if ($MQ4Sources[$i] -ne "") {
        $result = Compile-MQFile $MQ4Sources[$i] $MT4_COMPILER "MT4"
        if ($result) { $compiledFiles++ }
        else { $errorList += "$($EANames[$i]) MT4 compile failed" }
    }

    if ($MQ5Sources[$i] -ne "") {
        $result = Compile-MQFile $MQ5Sources[$i] $MT5_COMPILER "MT5"
        if ($result) { $compiledFiles++ }
        else { $errorList += "$($EANames[$i]) MT5 compile failed" }
    }
}

# ================================================================
# STEP 3: RENAME AND COPY COMPILED FILES
# ================================================================
Write-Host ""
Write-Host "--- STEP 3: Renaming and copying compiled files ---" -ForegroundColor Cyan

function Copy-CompiledFile($SourcePath, $OutputRepo, $SubDir, $NewName, $Platform) {
    if (-not $SourcePath -or $SourcePath -eq "") { return $false }
    if (-not $NewName -or $NewName -eq "") { return $false }

    $ext = ".ex5"
    if ($Platform -eq "MT4") { $ext = ".ex4" }
    $compiledFile = [System.IO.Path]::ChangeExtension($SourcePath, $ext)

    if (-not (Test-Path $compiledFile)) {
        Write-Host "  SKIP: Compiled file not found" -ForegroundColor Yellow
        return $false
    }

    $destDir = $OutputRepo
    if ($SubDir -and $SubDir -ne "") {
        $destDir = Join-Path $OutputRepo $SubDir
    }
    if (-not (Test-Path $destDir)) {
        New-Item -Path $destDir -ItemType Directory -Force | Out-Null
    }

    $destPath = Join-Path $destDir $NewName

    # Remove old dated files matching pattern
    $namePattern = $NewName -replace '\d{8}', '*'
    Get-ChildItem -Path $destDir -Filter $namePattern -ErrorAction SilentlyContinue | Remove-Item -Force

    Copy-Item -Path $compiledFile -Destination $destPath -Force
    Write-Host "  [OK] $NewName" -ForegroundColor Green
    return $true
}

for ($i = 0; $i -lt $EANames.Count; $i++) {
    Write-Host ""
    Write-Host "  [$($EANames[$i])]" -ForegroundColor White

    if ($MQ4Sources[$i] -ne "" -and $MT4OutNames[$i] -ne "") {
        $result = Copy-CompiledFile $MQ4Sources[$i] $OutputRepos[$i] "" $MT4OutNames[$i] "MT4"
        if ($result) { $renamedFiles++ }
    }

    if ($MQ5Sources[$i] -ne "" -and $MT5OutNames[$i] -ne "") {
        $result = Copy-CompiledFile $MQ5Sources[$i] $OutputRepos[$i] $MQ5OutputSubs[$i] $MT5OutNames[$i] "MT5"
        if ($result) { $renamedFiles++ }
    }
}

# ================================================================
# STEP 4: UPDATE WEBSITE DOWNLOAD URLs
# ================================================================
Write-Host ""
Write-Host "--- STEP 4: Updating website download URLs ---" -ForegroundColor Cyan

for ($i = 0; $i -lt $EANames.Count; $i++) {
    $webPage = Join-Path $WEB_APP ($WebSlugs[$i] + "\page.js")
    if (-not (Test-Path $webPage)) {
        Write-Host "  SKIP: $($WebSlugs[$i])/page.js not found" -ForegroundColor Yellow
        continue
    }

    $content = [System.IO.File]::ReadAllText($webPage, [System.Text.Encoding]::UTF8)
    $changed = $false

    # Replace 8-digit date before .ex4 or .ex5 in URLs
    if ($content -match "\d{8}\.ex[45]") {
        $content = [regex]::Replace($content, "(\d{8})(\.ex[45])", "$dateCompact`$2")
        $changed = $true
    }

    if ($changed) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($webPage, $content, $utf8NoBom)
        Write-Host "  [OK] Updated: $($WebSlugs[$i])/page.js" -ForegroundColor Green
        $webUpdates++
    }
    else {
        Write-Host "  [--] No URL dates: $($WebSlugs[$i])/page.js" -ForegroundColor DarkGray
    }
}

# Also update guide page expiry dates
$guidePage = Join-Path $WEB_APP "guide\page.js"
if (Test-Path $guidePage) {
    $content = [System.IO.File]::ReadAllText($guidePage, [System.Text.Encoding]::UTF8)
    if ($content -match 'expiry: "\d{4}-\d{2}-\d{2}"') {
        $replacement = 'expiry: "' + $dateDash + '"'
        $content = [regex]::Replace($content, 'expiry: "\d{4}-\d{2}-\d{2}"', $replacement)
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($guidePage, $content, $utf8NoBom)
        Write-Host "  [OK] Updated: guide/page.js (expiry dates)" -ForegroundColor Green
        $webUpdates++
    }
}

# ================================================================
# SUMMARY
# ================================================================
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "                        SUMMARY" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  New Expiry Date:      $dateDot" -ForegroundColor Yellow

$color = "Red"; if ($updatedFiles  -gt 0) { $color = "Green" }
Write-Host "  Source files updated: $updatedFiles" -ForegroundColor $color

$color = "Red"; if ($compiledFiles -gt 0) { $color = "Green" }
Write-Host "  Files compiled:       $compiledFiles" -ForegroundColor $color

$color = "Red"; if ($renamedFiles  -gt 0) { $color = "Green" }
Write-Host "  Files renamed/copied: $renamedFiles" -ForegroundColor $color

$color = "Red"; if ($webUpdates    -gt 0) { $color = "Green" }
Write-Host "  Web URLs updated:     $webUpdates" -ForegroundColor $color

if ($errorList.Count -gt 0) {
    Write-Host ""
    Write-Host "  ERRORS:" -ForegroundColor Red
    foreach ($err in $errorList) {
        Write-Host "    X $err" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "    1. Review the compiled files in each repo" -ForegroundColor DarkCyan
Write-Host "    2. Git commit and push each repo" -ForegroundColor DarkCyan
Write-Host "    3. Deploy the website (Vercel auto-deploys on push)" -ForegroundColor DarkCyan
Write-Host ""
