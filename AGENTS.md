# EA BUDAK UBAT & MULTI-EA AUTOMATION GUIDE FOR AI AGENTS

This document guides AI coding assistants to execute repetitive tasks (authorizing accounts, updating expiry, compiling, syncing repositories, deploying website) in a single step with zero overhead.

---

## 🌐 CRITICAL BRANDING & OFFICIAL DOMAIN RULE
> **MANDATORY FOR ALL AI AGENTS:**
> - **Always use the official custom domain:** `https://eabudakubat.com` (e.g. `https://eabudakubat.com`, `https://eabudakubat.com/changelog`, `https://eabudakubat.com/ea-budak-ubat`).
> - **NEVER mention or output `*.vercel.app`** in any user messages, public announcements, Telegram channel posts, changelogs, or documentation.
> - Vercel is strictly an underlying infrastructure build provider (traffic is routed via Cloudflare to `eabudakubat.com`). The official public face of this project is ALWAYS **`eabudakubat.com`**.
> - When reporting deployment completion to the user, always report: `https://eabudakubat.com` — NEVER the `.vercel.app` preview/alias domain.

---

## ⚡ Quick Actions Cheatsheet

### 1. Authorize / Prepend Account Numbers
When the user asks to **authorize** or **prepend** accounts (e.g. `prepend 49179852, 39217198 to EA Budak Ubat`):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; cd "."; .\authorize-accounts.ps1 -Accounts "49179852, 39217198" -Platform "ALL"
```
*Options for `-Platform`: `"ALL"`, `"MT4"`, `"MT5"`.*

**What this script does automatically:**
- Updates `allowedAccountNumbers` array in MT4 & MT5 `.mq4` / `.mq5` source files.
- Updates `v1.62 Authorized Account List.txt` in Desktop & MQL5 folders.
- Updates web app checker `ea-budak-ubat-web/lib/authorizedAccounts.js`.
- Updates `README.md`.
- Compiles both MT4 & MT5 using FBS Trader 4 & MetaTrader 5 compilers.
- Copies compiled `.ex4` / `.ex5` binaries to public distribution and terminal folders.
- Git commits and pushes across `EA-Budak-Ubat`, `EA_Budak_Ubat`, and `EA_Budak_Ubat_MT5_Public`.
- Deploys Next.js website to Vercel production using the token in `.env`.

---

### 2. Update Monthly Expiration Date
When the user asks to **update expiry** (e.g. `update expiry to 2026-10-31`):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; cd "."; .\update-ea.ps1 -ExpiryDate "YYYY-MM-DD"
```
*Followed by git push and Vercel deployment.*

---

### 3. Update Broker Ad Banners & Promotions
When the user asks to **update ads banners** or change broker promotions (e.g. `update XM bonus banner`, `set promotion expiry`):
1. **Auto-Sync Engine**: `ea-budak-ubat-web/lib/adsData.js` automatically syncs with `BROKERS` in `authorizedAccounts.js`. Any broker in `BROKERS` without a custom ad entry will automatically be generated in the rotation with its partner link and default banner!
2. **Custom Campaign**: Edit or add entries in `ea-budak-ubat-web/lib/adsData.js` (`headline`, `badge`, `cta`, `expiryDate`, `active`, `url`).
3. **Media assets**: Place new banner image/SVG in `ea-budak-ubat-web/public/banners/<broker>-banner.<ext>`.
4. **Verify, Push & Deploy**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; cd ".\ea-budak-ubat-web"; npm run build; git add .; git commit -m "Update broker promotional ads and banners"; git push origin main; npx -y vercel --prod --yes --token $env:VERCEL_TOKEN
```
*Full workflow instructions documented in `.agents/workflows/update-ads-banner.md`.*

---

## 📁 Repository & Path Directory Mapping

| Key | Location |
|---|---|
| **Public Multi-EA & Web Hub** | `.` |
| **Next.js Web Application** | `.\ea-budak-ubat-web` |
| **MT4 Source Repository** | `%APPDATA%\MetaQuotes\Terminal\<MT4_INSTANCE_HASH>\MQL4\Experts\EA-Budak-Ubat` |
| **MT5 Source Repository** | `%APPDATA%\MetaQuotes\Terminal\<MT5_INSTANCE_HASH>\MQL5\Experts\EA Budak Ubat` |
| **Desktop MT4 Release Repo** | `..\EA_Budak_Ubat` |

---

## 🛠️ Compiler Executable Locations

| Platform | Compiler Path | CLI Syntax |
|---|---|---|
| **MT4 (FBS Trader 4)** | `C:\Program Files (x86)\FBS Trader 4\metaeditor.exe` | `metaeditor.exe /compile:"<file.mq4>" /log:"<file.log>"` |
| **MT5 (MetaTrader 5)** | `C:\Program Files\MetaTrader 5\MetaEditor64.exe` | `MetaEditor64.exe /compile:"<file.mq5>" /log:"<file.log>"` |
