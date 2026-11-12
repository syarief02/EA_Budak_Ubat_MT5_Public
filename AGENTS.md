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

## 🔄 CRITICAL MQL5 FORGE GIT SYNC RULE
> **MANDATORY FOR ALL AI AGENTS:**
> - **ALWAYS sync MQL5 Forge Git immediately after EVERY GitHub sync / push.**
> - Whenever any EA code, binaries, configuration, or documentation are committed and pushed to GitHub (e.g. `EA_Budak_Ubat_MT5_Public`, `goldmind-ai`, `EA-Budak-Ubat`, or any EA repository), you MUST ALWAYS stage, commit, and push to MQL5 Forge Git right after.
> - **MQL5 Forge Repository Location:**
>   `%APPDATA%\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5`
> - **Remote & Branch:** `origin https://forge.mql5.io/syarief.azman/mql5.git` on branch `main`
> - **PowerShell Sync Command:**
>   ```powershell
>   $mql5Path = "$env:APPDATA\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5"
>   if (Test-Path $mql5Path) {
>       Push-Location $mql5Path
>       git add -A
>       if (git status --porcelain) {
>           git commit --no-gpg-sign -m "sync: update EAs and binaries to MQL5 Forge"
>           git push origin main
>       }
>       Pop-Location
>   }
>   ```
> - Authentication for `forge.mql5.io` is permanently configured via Personal Access Token in Windows Credential Manager and `.env` (`MQL5_FORGE_TOKEN` / `MQL5_FORGE_USERNAME`).

---

## ⏳ CRITICAL LICENSE & EXPIRY RULE
> **MANDATORY FOR ALL AI AGENTS:**
> - **Authorized (whitelisted) accounts are permanent. They NEVER expire.** Once an account number is added with `authorize-accounts.ps1` (source `allowedAccountNumbers`, web `MT4_AUTHORIZED_ACCOUNTS` / `MT5_AUTHORIZED_ACCOUNTS`), the EA runs on that account forever, on that platform (MT4 or MT5).
> - **The expiry date only applies to trials on unauthorized real accounts.** This covers `expDate` in the source, the `YYYYMMDD` suffix in binary file names (e.g. `- 20261030.ex4`), and "Expires 2026-10-30" on the website. Demo accounts never expire either.
> - The monthly expiry update (`update-ea.ps1`) only moves the trial cutoff. It does not affect authorized customers.
> - **Customer replies, Telegram posts and site copy for an authorized account** must say the license is permanent (no expiry). NEVER tell an authorized customer their EA "expires", is "valid until <date>", or must be downloaded again each month to keep working. Mention new monthly builds only as optional updates.
> - How the code enforces it: `RunAuthorization()` / `ExpiryCheck()` skip the date when `isAuthorized()` or `IsDemo()` is true (MathEdge Pro: `HasPermanentLicense()` inside `IsExpired()`). The web checker (`checkAccount()` in `ea-budak-ubat-web/lib/authorizedAccounts.js`) returns `"Permanent (No Expiry)"` for whitelisted accounts and `"Trial Mode (Expires …)"` for everyone else.
> - **Any new EA must follow the same rule:** the expiry check runs only when the account is real AND not in `allowedAccountNumbers`.

---

## 📦 CRITICAL "SEND THE FRESH BINARY" RULE
> **MANDATORY FOR ALL AI AGENTS — read before replying to any customer after authorizing:**
> - **The whitelist is baked into the compiled binary.** An account only works with an `.ex5` / `.ex4` that was **compiled AFTER** that account was added to `allowedAccountNumbers`. `authorize-accounts.ps1` handles this by recompiling, but the customer is still holding the OLD file.
> - **NEVER tell a customer they can reuse / keep using a file you sent them earlier.** Any binary built before their account was whitelisted will reject it and show:
>   `EXPIRED. Account <number> is Unauthorized. Use Demo account to access Trials Mode.` — even though the account IS authorized. (This exact mistake happened once: a customer was told "boleh guna fail yang saya hantar sebelum ni" and the old build kept showing Unauthorized/Expired.)
> - **After authorizing, you MUST give the customer the freshly compiled binary**, by EITHER:
>   1. **Attaching the latest `.ex5` / `.ex4` directly in the chat** — from the public distribution folder, e.g. `EA - Budak Ubat v1.67 - MT5 - .ex5` in the repo root (this is the surest method), **OR**
>   2. Telling them to **re-download the latest** from `https://eabudakubat.com` — valid ONLY after the script's Vercel deploy has finished.
> - Always tell them to **delete/replace the old file** (`Buang fail lama dulu`) and restart MT4/MT5, otherwise the stale binary stays loaded.
> - The permanent-license wording from the License & Expiry rule still applies: the fresh file gives them a permanent, no-expiry license on their authorized accounts.

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

> ⚠️ **When replying to the customer afterwards:** send them the **freshly compiled** binary (attach the latest `.ex5` / `.ex4`, or have them re-download from `https://eabudakubat.com` after the deploy) and tell them to delete the old file. Their account will NOT work on any file they already had. See the **"SEND THE FRESH BINARY" RULE** above.

---

### 2. Update Monthly Expiration Date
This is the trial cutoff for **unauthorized real accounts only**. Authorized accounts never expire (see the License & Expiry rule above).
When the user asks to **update expiry** (e.g. `update expiry to 2026-10-31`):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; cd "."; .\update-ea.ps1 -ExpiryDate "YYYY-MM-DD"
```
*Followed by git push and Vercel deployment.*

> **Website:** the trial date and every dated download URL in `ea-budak-ubat-web/lib/authorizedAccounts.js` (EA_DATABASE, the home page download bar and the license checker) are built from one constant, `TRIAL = { expiryDate: "YYYY-MM-DD" }`, which `update-ea.ps1` rewrites. Do not hard-code dated `.ex4/.ex5` URLs in components; use `getEa(slug).downloadMt5 / downloadMt4`. The per-EA pages and `/changelog` still carry their own dated URLs. UI state diagrams for the whole visitor flow: `ea-budak-ubat-web/docs/state-flows.md`.

---

### 3. Update Broker Ad Banners & Promotions
When the user asks to **update ads banners** or change broker promotions (e.g. `update XM bonus banner`, `set promotion expiry`):
1. **Auto-Sync Engine**: `ea-budak-ubat-web/lib/adsData.js` automatically syncs with `BROKERS` in `authorizedAccounts.js`. Any broker in `BROKERS` without a custom ad entry will automatically be generated in the rotation with its partner link and default banner!
2. **Custom Campaign**: Edit or add entries in `ea-budak-ubat-web/lib/adsData.js` (`headline`, `badge`, `cta`, `expiryDate`, `active`, `url`).
3. **Media assets**: Place new banner image/SVG in `ea-budak-ubat-web/public/banners/<broker>-banner.<ext>`.
4. **Verify, Push & Deploy**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; cd ".\ea-budak-ubat-web"; npm run build; cd ".."; git add .; git commit -m "Update broker promotional ads and banners"; git push origin main; npx -y vercel --prod --yes --token $env:VERCEL_TOKEN
```
*Full workflow instructions documented in `.agents/workflows/update-ads-banner.md`.*

---

### 4. Add a Newly Published MQL5 Market Product to eabudakubat.com
When a product from the MQL5 daily generator is published (e.g. `add Fulcrum Value Profile #201778 to the website`):
1. **Storefront row**: the generator's `database/supabase_client.py publish "<Name>" <ID> <url>` inserts the `mql_products` row; curate its `category`, `icon`, `description`, `target_assets`, `price`, `color` and `display_order` (previous max + 1).
   - `/products` groups products into Expert Advisors, Indicators, Utilities and Libraries (`lib/productTypes.js`), using the `product_type` column (since 2026-11-08; a CHECK constraint allows only `Expert Advisor`, `Indicator`, `Utility`, `Library`). `publish` copies it from the generator's `register --type`, so check it is set after publishing. If it is ever empty, the site falls back to words in `category`, so still keep the type word there (e.g. `Volume Profile Indicator`, `Trade Journal Utility`).
2. **Fallback list**: append the same entry to `FALLBACK_PRODUCTS` in `ea-budak-ubat-web/app/api/products/route.js` (copy the shape of the last entry, including `product_type`). Since 2026-10-31 the live site serves the `mql_products` table in the website's Supabase project `qthjikwteugfowlflkfi` (`/api/products` reports `source: supabase`). The fallback list is only the backup shown if the database is unreachable, so keep both identical. Public visitors can only read active rows; all writes go through the generator's database login, so the `POST /api/products` route (public key) cannot write.
3. **Promo video**: copy the product's 30-second promo video to `ea-budak-ubat-web/public/videos/<slug>-promo.mp4` and include it in the same commit (this repo is public, so the Telegram post can fetch it). Every product's video MUST have its own newly composed music: generate it with `MQL5 daily EA generator/tools/promo_music.py make "<Name>" <out.wav>`, never copy, re-key or re-tempo an earlier track or music script (the Recoil, Counterpoint and Cascade promos were one template and sounded the same).
4. **Verify, Push & Deploy**: run `npm run build` in `ea-budak-ubat-web` and fix any error before pushing (`node --check` is NOT enough: on 2026-11-04 it passed a `route.js` whose description held an unescaped `'` in `today's`, and both Vercel production builds failed). Escape apostrophes in single-quoted strings as `\'`, and make such edits with an exact-text editor rather than a shell heredoc, which can strip the backslash. Then commit `feat(web): add <Name> (#<ID>) to MQL5 products showcase`, push (Vercel deploys production from git), confirm the slug at `https://eabudakubat.com/api/products?t=<timestamp>`, then run the MQL5 Forge sync.
*Full end-to-end flow (build, promo video, publish on MQL5, website, Telegram / Facebook / YouTube posts): `MQL5 daily EA generator/agents.md`, steps 3 and 8-10.*

---

## 📁 Repository & Path Directory Mapping

| Key | Location |
|---|---|
| **Public Multi-EA & Web Hub** | `.` |
| **Next.js Web Application** | `.\ea-budak-ubat-web` |
| **MT4 Source Repository** | `%APPDATA%\MetaQuotes\Terminal\<MT4_INSTANCE_HASH>\MQL4\Experts\EA-Budak-Ubat` |
| **MT5 Source Repository** | `%APPDATA%\MetaQuotes\Terminal\<MT5_INSTANCE_HASH>\MQL5\Experts\EA Budak Ubat` |
| **MQL5 Forge Git Repository** | `%APPDATA%\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5` |
| **Desktop MT4 Release Repo** | `..\EA_Budak_Ubat` |

---

## 🛠️ Compiler Executable Locations

| Platform | Compiler Path | CLI Syntax |
|---|---|---|
| **MT4 (FBS Trader 4)** | `C:\Program Files (x86)\FBS Trader 4\metaeditor.exe` | `metaeditor.exe /compile:"<file.mq4>" /log:"<file.log>"` |
| **MT5 (MetaTrader 5)** | `C:\Program Files\MetaTrader 5\MetaEditor64.exe` | `MetaEditor64.exe /compile:"<file.mq5>" /log:"<file.log>"` |
