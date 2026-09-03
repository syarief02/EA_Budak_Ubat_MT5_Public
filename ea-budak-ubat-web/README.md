# EA Budak Ubat — Complete Product Guide

> **By Syarief Azman** · Telegram [@SyariefAzman](https://t.me/SyariefAzman) · WhatsApp [+60194961568](https://wa.me/60194961568)  
> Website: [ea-budak-ubat.vercel.app](https://ea-budak-ubat.vercel.app)

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [EA Budak Ubat](#2-ea-budak-ubat)
3. [GoldMind AI](#3-goldmind-ai)
4. [BracketBlitz EA](#4-bracketblitz-ea)
5. [MathEdge Pro](#5-mathedge-pro)
6. [Aligator Gozaimasu](#6-aligator-gozaimasu)
7. [Encik Moku](#7-encik-moku)
8. [General Installation Guide](#8-general-installation-guide)
9. [VPS Setup Guide](#9-vps-setup-guide)
10. [Risk Management Guide](#10-risk-management-guide)
11. [Broker Partner Links](#11-broker-partner-links)
12. [Contact & Support](#12-contact--support)
13. [Legal Disclaimers](#13-legal-disclaimers)

---

## 1. Product Overview

EA Budak Ubat offers **6 professional trading tools** for MetaTrader 4 & MetaTrader 5, each designed for a different trading strategy and market condition.

| # | Product | Strategy | Platform | Best For | Version | License |
|---|---|---|---|---|---|---|
| 1 | **EA Budak Ubat** | Grid Martingale | MT4, MT5 | Ranging pairs, M5 | v1.62 | MIT + Paid Full |
| 2 | **GoldMind AI** | AI-Powered Signals | MT5 | XAUUSD (Gold) | v1.00 | Open Source |
| 3 | **BracketBlitz EA** | OCO Bracket Breakout | MT4, MT5 | All instruments, News | v1.00 | Open Source |
| 4 | **MathEdge Pro** | Math-Based Levels | MT4, MT5 | US30, NAS100 | v1.1 | Open Source |
| 5 | **Aligator Gozaimasu** | MTF Alligator Trend | MT4, MT5 | Trending pairs | v1.06 | Open Source |
| 6 | **Encik Moku** | MTF Ichimoku Trend | MT4, MT5 | Trending pairs | v1.06 | Open Source |

### Choosing the Right EA

```
Are you trading ranging pairs?
  └── Yes → EA Budak Ubat (Grid Martingale)

Are you trading Gold (XAUUSD)?
  └── Yes → GoldMind AI (AI-Powered)

Are you trading news events / breakouts?
  └── Yes → BracketBlitz EA (OCO Brackets)

Are you trading US30 / NAS100 indices?
  └── Yes → MathEdge Pro (Math-Based)

Are you trading trending pairs?
  └── Yes → Do you prefer Alligator or Ichimoku?
        ├── Alligator → Aligator Gozaimasu
        └── Ichimoku → Encik Moku
```

### Expiration Dates

| EA | Expiry | Notes |
|---|---|---|
| EA Budak Ubat | 2026-09-30 | Authorized accounts never expire |
| GoldMind AI | 2026-09-30 | — |
| BracketBlitz EA | 2026-09-30 | — |
| MathEdge Pro | 2026-09-30 | — |
| Aligator Gozaimasu | 2026-09-30 | — |
| Encik Moku | 2026-09-30 | — |

> Contact [@SyariefAzman](https://t.me/SyariefAzman) on Telegram for updated files when expiration approaches.

---

## 2. EA Budak Ubat

**Grid Martingale Expert Advisor** · v1.62 · MT4 & MT5

### Downloads

- [⬇️ Download MT4](https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4)
- [⬇️ Download MT5](https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT5%20-%2020260930.ex5)
- [🛒 Purchase Full Version (MT4 Only)](https://tinyurl.com/eabubuy)
- [📡 MQL5 Signal Channel](https://www.mql5.com/en/channels/eabudakubat)

> **Limited Time Price!** The price increases by 10 USD after every 10 purchases.

### What It Does

EA Budak Ubat is a **grid-based martingale EA** designed for **ranging currency pairs** on the **M5 timeframe**. It enters trades based on technical analysis, manages a grid of martingale positions with increasing lot sizes and dynamic distance increments, and modifies take-profit levels to a weighted break-even point.

### Key Features

| Feature | Description |
|---|---|
| **Multi-Platform** | Runs on both MT4 and MT5 with identical trading logic |
| **4 Analysis Methods** | Classic Candle, SMA20, Alligator, Ichimoku for entry signals |
| **Grid Martingale** | Automatic position layering with configurable multiplier and distance |
| **AutoConfig AI** | Dynamic parameter optimization based on Average Daily Range |
| **Hedging Support** | Trade both directions simultaneously or restrict to single-direction |
| **Time Filter** | Schedule EA active hours with Start/Stop times |
| **Close All Button** | One-click close for all open positions on the chart |
| **Authorization System** | Account-locked licensing with unlimited demo support |

### How It Works

```
1. TICK RECEIVED
   └── Updates chart display, checks time filter (StartTime–StopTime)

2. EXECUTION MODE CHECK
   └── Every Tick = instant logic  |  Every New Bar = waits for candle close

3. ENTRY SIGNAL (no open positions)
   └── Evaluates selected Analysis Method + RSI H1 filter
       • Buy: RSI < 70  |  Sell: RSI > 30

4. GRID LAYERING (positions exist + GridTrading ON)
   └── Checks distance from last position
   └── Opens new position: Lots × Multiplier^(layer count)

5. TP MODIFICATION
   └── All positions updated to weighted average price + TP pips

6. STOP LOSS (if enabled)
   └── Calculated from first entry price of the basket
```

### Parameters

#### Core Parameters

| Parameter | Default | Description |
|---|---|---|
| `Execution_Mode` | on Every New Bar | `Every Tick` = instant entry; `Every New Bar` = candle close |
| `Pos_Mode` | Buy & Sell | Buy & Sell, Buy Only, or Sell Only |
| `Hedging` | false | Allows simultaneous buy/sell baskets |
| `Method` | Ichimoku | Analysis method: Classic Candle, SMA20, Alligator, Ichimoku |

#### Lot & Grid Parameters

| Parameter | Default | Description |
|---|---|---|
| `Lots` | 0.01 | Initial lot size for the first position |
| `GridTrading` | true | Enable/disable grid (martingale) layering |
| `MartingaleMultiplier` | 1.3 | Lot multiplier per grid layer (1.0 = flat) |
| `MaxLot` | 500 | Maximum lot size cap |
| `MaxTrade` | 99999 | Maximum grid layers per direction |

#### Distance & TP/SL Parameters

| Parameter | Default | Description |
|---|---|---|
| `TakeProfit` | 25.0 | Take profit in pips from weighted average |
| `StopLoss` | 0 | Stop loss in pips from first entry (0 = disabled) |
| `minDistance` | 4 | Minimum pip distance between grid orders |
| `distanceIncrement` | 2.0 | Extra pips added per successive layer |
| `maxDistance` | 100.0 | Maximum distance cap between grid orders |

#### Time & Configuration

| Parameter | Default | Description |
|---|---|---|
| `StartTime` | 00:00 | EA active start time (HH:MM, server time) |
| `StopTime` | 23:59 | EA active stop time |
| `AutoConfig` | false | Enable AutoConfig AI for dynamic parameters |
| `MagicNumber` | 123456 | Unique magic number for trade identification |

### Grid Distance Formula

```
Distance(N) = minDistance + (N - 1) × distanceIncrement    (capped at maxDistance)
```

| Layer | Distance (default settings) |
|---|---|
| 1 → 2 | 4 pips |
| 2 → 3 | 6 pips |
| 3 → 4 | 8 pips |
| 4 → 5 | 10 pips |
| ... | up to max 100 pips |

### AutoConfig AI System

When `AutoConfig` is enabled, the EA dynamically calculates optimal TakeProfit, minDistance, distanceIncrement, and maxDistance based on market volatility:

1. **EURUSD Detection** — Automatically finds EURUSD on your broker and calculates the 365-day Average Daily Range (ADR) on D1
2. **Ratio Derivation** — Derives divisor ratios: TP÷25, minPipStep÷4, PipStepIncr÷(2×Multiplier^positions), maxPipStep÷100
3. **Dynamic Adaptation** — Calculates the 20-day ADR of the current symbol and applies optimized parameters every tick/bar

> **Tip:** Enable AutoConfig when you're unsure which settings to use for a particular currency pair.

### Authorization & Licensing

```
Is Demo Account? ─── Yes ──► ✅ Run EA (no expiry)
    │
    No
    │
Is Authorized? ───── Yes ──► ✅ Run EA (no expiry)
    │
    No
    │
Before Expiry? ───── Yes ──► ⚠️ Trial Mode (runs until 2026-09-30)
    │
    No
    │
    ▼
   ❌ EA Removed (alert shown)
```

**How to get authorized:** Register through a [broker partner link](#11-broker-partner-links), then send your trading account number to [@SyariefAzman on Telegram](https://t.me/SyariefAzman).

### Account Checker

Visit the [EA Budak Ubat page](https://ea-budak-ubat.vercel.app/ea-budak-ubat) on the website to search your account number and verify if it's authorized.

### Installation

**MT4:**
1. Download `EA - Budak Ubat v1.62 - MT4 - 20260930.ex4`
2. Open MT4 → `File` → `Open Data Folder`
3. Navigate to `MQL4/Experts/`
4. Copy the `.ex4` file into this folder
5. Restart MT4 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart (recommended: **M5 timeframe**, ranging pair)
7. In EA properties → `Common` tab → check **Allow live trading**
8. Configure parameters in the `Inputs` tab
9. Click **OK**

**MT5:**
1. Download `EA - Budak Ubat v1.62 - MT5 - 20260930.ex5`
2. Open MT5 → `File` → `Open Data Folder`
3. Navigate to `MQL5/Experts/`
4. Copy the `.ex5` file into this folder
5. Restart MT5 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart (recommended: **M5 timeframe**, ranging pair)
7. In EA properties → `Common` tab → check **Allow Algo Trading**
8. Configure parameters in the `Inputs` tab
9. Click **OK**

> ⚠️ **MT5 Note:** Make sure your broker supports **hedging accounts** (not netting) if you plan to run grid trading or Hedging = true.

### FAQ

**Q: Can I use this on multiple charts?**
A: Yes, but use a **different MagicNumber** for each chart.

**Q: Does the MT5 version trade the same as MT4?**
A: Yes. Identical trading logic — only the underlying API calls differ.

**Q: What pairs work best?**
A: Ranging pairs with low spread. Avoid highly trending or exotic pairs.

**Q: Can I use this on XAUUSD (Gold)?**
A: Technically yes, but gold is very volatile. Use extreme caution, conservative lot sizing (or a cent account), and very strict settings.

**Q: What is the minimum capital?**
A: $100 on a Cent account (or larger balance on a Standard account) with 0.01 starting lots. Higher leverage reduces margin needs.

**Q: How do I get authorized?**
A: Register through a broker partner link, then send your account number to [@SyariefAzman on Telegram](https://t.me/SyariefAzman).

### Troubleshooting

| Problem | Solution |
|---|---|
| "Account Unauthorized" alert | Register through a partner broker and contact @SyariefAzman |
| EA not trading | 1) Check AutoTrading is ON. 2) Verify time filter. 3) Confirm margin. 4) Check Experts log |
| "Not enough margin" | Reduce lot size or deposit more funds |
| EA expired | Contact the author for an updated file |
| Broker rejects orders | Check max orders limit (some brokers limit to 200) |
| MT5 orders fail | Ensure your account is a **hedging account**, not netting |
| "No available EURUSD variation" | Add EURUSD to Market Watch or disable AutoConfig |

---

## 3. GoldMind AI

**AI-Powered XAUUSD Signal Trading** · v1.00 · MT5 Only · Open Source

### Downloads

- [⬇️ Download Project (EA + Backend)](https://github.com/syarief02/goldmind-ai.git)
- [📂 GitHub Repository](https://github.com/syarief02/goldmind-ai)

### What It Does

GoldMind AI uses **OpenAI's ChatGPT** to analyze gold (XAUUSD) price charts and automatically place trades in MetaTrader 5. The system consists of two parts:
- **Python FastAPI server** running on your computer — communicates with OpenAI
- **MT5 Expert Advisor** — sends price data to the server and executes signals

### Key Features

| Feature | Description |
|---|---|
| **AI-Powered Analysis** | ChatGPT analyzes XAUUSD price data and generates trading signals |
| **6 Safety Filters** | Spread, stop level, entry price, SL direction, R:R ratio, lot size validation |
| **Pending Orders** | Places buy stop / sell stop orders, cancelled after 4 hours if not triggered |
| **Smart Lot Sizing** | Calculates lot based on risk percentage and SL distance |
| **Auto Signal Refresh** | Fresh AI signals at configurable intervals, skips when position is open |
| **Local Processing** | Everything runs on your computer — your API key never leaves your machine |
| **XAUUSD Specialist** | AI prompt specifically designed for gold price analysis |

### How It Works

```
1. EA COLLECTS DATA
   └── Every refresh interval, EA sends OHLC candle data to local Python server

2. SERVER FORWARDS TO AI
   └── FastAPI backend sends price data to OpenAI ChatGPT with gold analysis prompt

3. AI ANALYZES MARKET
   └── ChatGPT responds with JSON: buy stop / sell stop / no trade + entry, SL, TP

4. SIGNAL VALIDATION
   └── 6 safety filters: spread, stop level, entry, SL direction, R:R, lot size

5. ORDER PLACEMENT
   └── Pending order placed (buy stop or sell stop). Cancelled after 4 hours if unfilled

6. COST OPTIMIZATION
   └── While position is open, EA skips signal requests to save API costs
```

### Requirements

| Requirement | Details |
|---|---|
| **Python 3.10+** | Download from [python.org](https://www.python.org/downloads/). Check "Add Python to PATH" during install |
| **MetaTrader 5** | Your broker's MT5, logged in and able to see XAUUSD charts |
| **OpenAI API Key** | Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Add $5–10 in credits at [Billing](https://platform.openai.com/settings/organization/billing/overview). Each signal costs ~$0.01–$0.05 |

### Installation (Step-by-Step)

**Step 1: Download & Extract**
Download the GoldMind AI source code and extract to a folder (e.g. `C:\goldmind-ai`). Inside: `backend/` (Python server) and `mt5/` (MetaTrader files).

**Step 2: Set Up Python Backend**
```bash
cd "C:\goldmind-ai\backend"
pip install -r requirements.txt
```
Wait for "Successfully installed..." (1–2 minutes).

Set up your API key:
```bash
copy .env.example .env
notepad .env
```
Replace `sk-your-key-here` with your actual OpenAI API key. Save and close.

**Step 3: Start the Server**
```bash
python main.py
```
You should see: `Uvicorn running on http://0.0.0.0:8000`

To verify: open a new terminal and run `curl http://127.0.0.1:8000/health` — you should get `{"status":"ok"}`.

> ⚠️ **Keep this terminal window open!** Minimize it, don't close it.

**Step 4: Install EA Files in MT5**
- Open MT5 → `File → Open Data Folder`
- Copy `mt5\Include\JASONNode.mqh` → `MQL5\Include\`
- Copy `mt5\Experts\GoldMind_AI.mq5` → `MQL5\Experts\`
- Or just place the pre-compiled `.ex5` file in `MQL5\Experts\`

**Step 5: Allow WebRequest (Critical!)**
Without this, you'll get **error 4014**:
- MT5 → `Tools → Options → Expert Advisors` tab
- ☑ Check **"Allow WebRequest for listed URL"**
- Click **Add** → type: `http://127.0.0.1:8000`
- Click **OK**

**Step 6: Attach EA to XAUUSD Chart**
> ⚠️ **XAUUSD only!** Other symbols will produce bad signals.

- Open a XAUUSD chart (your broker may call it GOLD, XAUUSDm, etc.)
- Ctrl+N → Navigator → Expert Advisors → drag **GoldMind_AI** onto chart
- Common tab: ☑ **Allow Algo Trading**
- Inputs tab: Leave defaults or adjust `RiskPercent = 1.0`, `MaxSpreadPoints = 50`
- Make sure the **Algo Trading** button in toolbar is **green**

**Step 7: Verify It's Working**
Check the Experts tab. You should see:
```
=== GoldMind AI initialized ===
Backend URL: http://127.0.0.1:8000/signal
Requesting new signal...
Signal: bias=bullish confidence=0.72
Order placed successfully!
```

> **After PC reboot:** Start Python server first (`cd backend` → `python main.py`), then open MT5.

### Settings

| Parameter | Default | Description |
|---|---|---|
| `BackendURL` | http://localhost:8000 | Address of your local Python server |
| `MaxSpreadPoints` | 50 | Max allowed spread in points |
| `RiskPercent` | 1.0 | % of account equity risked per trade |
| `MinRR` | 1.5 | Minimum reward-to-risk ratio to place a trade |
| `Timeframe` | PERIOD_M15 | Candle timeframe for price data sent to AI |
| `CandleCount` | 100 | Number of historical candles sent to AI |
| `RefreshHours` | 4.0 | Hours between signal requests (also pending order expiry) |
| `MagicNumber` | 777 | Unique identifier for this EA's trades |
| `Timeout` | 30000 | WebRequest timeout in milliseconds |

### File Structure

```
goldmind-ai/
├── backend/              ← Python backend server
│   ├── main.py           ← FastAPI + OpenAI integration
│   ├── requirements.txt  ← Python dependencies
│   ├── .env.example      ← Template for API key
│   └── .env              ← Your actual API key (secret!)
├── mt5/                  ← MetaTrader 5 files
│   ├── Include/
│   │   └── JASONNode.mqh ← JSON parser library
│   └── Experts/
│       └── GoldMind_AI.mq5  ← The Expert Advisor
└── README.md
```

### FAQ

**Q: Does this guarantee profits?**
A: No. AI can make wrong predictions. Always test on demo first. Never risk money you can't afford to lose.

**Q: How much does it cost to run?**
A: Each signal costs ~$0.01–$0.02 in OpenAI API fees. The EA stops polling while a position is open to save costs.

**Q: Can I run this on a VPS?**
A: Yes! Run both the Python server and MT5 on the same VPS.

**Q: Can I use it on other symbols?**
A: No. The AI prompt is specifically designed for gold price action. Other symbols would produce unreliable signals.

**Q: Can I change the AI model?**
A: Yes. Edit `OPENAI_MODEL` in `backend/.env`. Options: gpt-4o-2024-08-06, gpt-5-mini, gpt-5.

**Q: Is my API key safe?**
A: Yes. The key stays on your computer in the `.env` file and is never sent anywhere else.

---

## 4. BracketBlitz EA

**OCO Bracket Breakout Strategy** · v1.00 · MT4 & MT5 · Open Source

### Downloads

- [⬇️ Download MT4](https://github.com/syarief02/BracketBlitz-EA/raw/master/BracketBlitz%20-%20MT4%20-%2020260930.ex4)
- [⬇️ Download MT5](https://github.com/syarief02/BracketBlitz-EA/raw/master/BracketBlitz%20-%20MT5%20-%2020260930.ex5)
- [📂 GitHub Repository](https://github.com/syarief02/BracketBlitz-EA)

### What It Does

BracketBlitz places **rapid-fire OCO (One-Cancels-Other) bracket orders** that straddle the market — a Buy Stop above price and a Sell Stop below price, auto-refreshed every 30 seconds. It catches breakouts without predicting direction. Works on **any instrument**.

### How It Works

```
1. BRACKET PLACEMENT
   └── Buy Stop at Ask + GapPips  |  Sell Stop at Bid − GapPips

2. OCO EXECUTION
   └── One side triggers → opposite pending order is instantly deleted

3. FRESH ENTRIES
   └── If neither triggers within 30 seconds → delete both → re-place at new price

4. TRAILING PROTECTION
   └── Once in trade, SL follows price automatically (never moves back)
```

### Key Features

| Feature | Description |
|---|---|
| **Rapid-Fire Brackets** | Buy Stop + Sell Stop straddling the market for instant breakout capture |
| **OCO Execution** | When one triggers, the opposite is instantly deleted |
| **Auto Refresh** | Re-places orders at new price every 30 seconds (configurable) |
| **Trailing Stop** | SL follows price movement, locks in profits |
| **Multi-Platform** | Identical logic on MT4 and MT5 |
| **Works on Everything** | Forex, gold, indices, crypto CFDs |
| **Isolated Trading** | Only manages orders with its own MagicNumber |

### Settings

| Parameter | Default | Description |
|---|---|---|
| `LotSize` | 0.01 | Position size for each bracket order |
| `GapPips` | 50 | Distance from current price for pending orders |
| `StopLossPips` | 50 | Stop loss distance from entry |
| `TrailingStopPips` | 20 | Trailing stop distance — follows price, never moves back |
| `OrderLifetimeSec` | 30 | Seconds before stale orders are refreshed at new price |
| `MagicNumber` | 123456 | Use different values for multi-chart setups |

### Preset Configurations

| Style | Timeframe | GapPips | SL | Trailing | Lifetime |
|---|---|---|---|---|---|
| **Scalping** | M1 / M5 | 10 | 15 | 8 | 15 sec |
| **Swing** | H1 / H4 | 100 | 80 | 40 | 120 sec |
| **News Trading** | Any | 30 | 50 | 20 | 10 sec |

### Installation

1. Download the `.ex4` (MT4) or `.ex5` (MT5) file
2. Open MetaTrader → `File → Open Data Folder` → place in `MQL4/Experts/` or `MQL5/Experts/`
3. Restart or refresh the Navigator panel
4. Open any chart (works on all instruments) → drag BracketBlitz onto it
5. Common tab: enable **Allow live trading** (MT4) or **Allow Algo Trading** (MT5)
6. Inputs tab: set GapPips, StopLossPips, TrailingStopPips, OrderLifetimeSec
7. Give each chart instance a unique MagicNumber
8. Make sure Auto Trading is ON (green toolbar button)

### FAQ

**Q: Can I run it on multiple charts?**
A: Yes! Give each instance a different MagicNumber.

**Q: Does it work on all currency pairs?**
A: Yes — any instrument in MetaTrader. Pip calculation auto-adjusts for each symbol.

**Q: Can I use it alongside manual trading?**
A: Absolutely. It only manages orders with its own MagicNumber.

**Q: Does it set a Take Profit?**
A: No. The strategy relies on the trailing stop to lock in profit — allowing trades to ride extended breakouts.

**Q: What happens during news?**
A: BracketBlitz is designed for breakout-capture, well-suited for news events. Be aware of wider spreads and slippage.

---

## 5. MathEdge Pro

**Math-Based US Index Trading** · v1.1 · MT4 & MT5 · Open Source

### Downloads

- [⬇️ Download MT4](https://github.com/syarief02/MathEdge-Pro/raw/main/MathEdge%20Pro%20-%20MT4%20-%2020260930.ex4)
- [⬇️ Download MT5](https://github.com/syarief02/MathEdge-Pro/raw/main/MT5/MathEdge%20Pro%20-%20MT5%20-%2020260930.ex5)
- [📂 GitHub Repository](https://github.com/syarief02/MathEdge-Pro)

### What It Does

MathEdge Pro automates **math-based daily-level trading** for **US30 and NAS100**. It calculates daily OHLC levels at NY session boundaries, determines directional bias from net change, and executes a strict **3-trade pending order sequence** — all fully automated.

### How It Works

```
1. LOCK DAILY LEVELS (at 18:00 NY time)
   └── Reads: PRV (2 days ago close), CV (yesterday close), H (high), L (low)

2. CALCULATE BIAS
   └── Net Change = CV − PRV
       Positive → Buy-only day  |  Negative → Sell-only day  |  Zero → No trades

3. T1: ACTIVATION TRADE
   └── Pending order at PRV level (T2 and T3 only place after T1 fills)

4. T2: EXTREME ENTRY
   └── After T1 fills: T2 enters at Low (buys) or High (sells)

5. T3: CLOSE ENTRY
   └── After T1 fills: T3 enters at CV level

6. UNIFIED TAKE PROFIT
   └── All trades share TP = CV + Net Change

7. WINDOW CLOSES (15:29 NY next day)
   └── Unfilled pending orders cancelled automatically
```

### Key Levels

| Symbol | Meaning | Chart Color |
|---|---|---|
| **PRV** | Previous Reference Value (2 days ago close) | 🟠 Orange |
| **CV** | Closing Value (yesterday's close) | 🔵 Cyan |
| **H** | Daily High | 🔴 Red |
| **L** | Daily Low | 🟢 Green |
| **TP** | Take Profit = CV + Net Change | 🟡 Yellow |

### Settings

| Parameter | Default | Description |
|---|---|---|
| `MagicNumber` | 260128 | Unique ID for this EA's orders |
| `Lots` | 0.10 | Fixed lot size per trade |
| `UseRiskPercent` | false | Calculate lots dynamically based on RiskPercent |
| `RiskPercent` | 1.0 | % of free margin risked per trade |
| `MaxSpreadPoints` | 300 | Orders skipped if spread exceeds this |
| `PlacePendingOrders` | true | Place pending orders at calculated levels |
| `CancelPendingsAfterWindow` | true | Cancel unfilled pendings after window closes |
| `CloseOpenAtWindowEnd` | false | Close open positions when window ends |
| `EmergencySL_Points` | 0 | Hard stop-loss in points (0 = disabled) |
| `DrawLevels` | true | Draw PRV, CV, H, L, TP lines on chart |
| `ShowDashboard` | true | Display live info panel on chart |

### Installation

1. Download the `.ex4` (MT4) or `.ex5` (MT5) file
2. Open MetaTrader → `File → Open Data Folder` → place in `MQL4/Experts/` or `MQL5/Experts/`
3. Open a **US30** or **NAS100** chart (any timeframe — EA is TF-independent)
4. Drag MathEdge Pro onto the chart → Common tab: enable **Allow live trading**
5. Set your `Lots` or enable `UseRiskPercent`. Add broker symbol name to `AllowedSymbolsCSV` if needed
6. Set `DrawLevels = true` and `ShowDashboard = true` to verify levels
7. Always test on **demo** first. EA starts at the next 18:00 NY session

### Troubleshooting

| Problem | Solution |
|---|---|
| EA not trading | Check AutoTrading is ON and symbol matches the whitelist |
| "Symbol not allowed" | Add your broker's symbol name to `AllowedSymbolsCSV` |
| Levels differ from TradingView | Toggle `UseCustomNYDailyOHLC` — broker D1 boundaries may differ from NY 18:00 |
| Orders skipped (spread) | Spread exceeds `MaxSpreadPoints` — wait for lower spread or increase the limit |
| T2/T3 not appearing | T2 and T3 only place after T1 fills — this is by design |

### FAQ

**Q: What instruments does it trade?**
A: US30 and NAS100 (and variants like US30m, NAS100.cash).

**Q: Does it need a specific timeframe?**
A: No — timeframe-independent. Uses daily OHLC from M1 bars at NY session boundaries.

**Q: Does it work on forex?**
A: No. The math strategy is designed specifically for US indices.

**Q: Is there a stop loss?**
A: No default SL. Set `EmergencySL_Points > 0` for a safety net.

---

## 6. Aligator Gozaimasu

**Multi-Timeframe Alligator Trend EA** · v1.06 · MT4 & MT5 · Open Source

### Downloads

- [⬇️ Download MT4](https://github.com/syarief02/EA-Aligator-Gozaimasu/raw/master/EA%20-%20Aligator%20Gozaimasu%20v1.06%20-%20MT4%20-%2020260930.ex4)
- [⬇️ Download MT5](https://github.com/syarief02/EA-Aligator-Gozaimasu/raw/master/EA%20-%20Aligator%20Gozaimasu%20v1.06%20-%20MT5%20-%2020260930.ex5)
- [📂 GitHub Repository](https://github.com/syarief02/EA-Aligator-Gozaimasu)

### What It Does

Trades based on **Bill Williams Alligator**, **Awesome Oscillator**, **RSI**, and **Stochastic** — confirmed across up to **4 timeframes**. Buys in uptrends, sells in downtrends. Single-entry, trend-following EA with auto-compounding and martingale recovery.

### Signal Requirements

**📊 Buy Signal (all must be true on ALL configured timeframes):**
- ✅ **Alligator Bullish:** Lips > Teeth > Jaw (lines spreading upward)
- ✅ **Awesome Oscillator:** AO > 0 (bullish momentum)
- ✅ **Stochastic:** Main < 80 AND Main > Signal (rising, not overbought)
- ✅ **RSI:** RSI < 70 (not exhausted)

**📉 Sell Signal (all must be true on ALL configured timeframes):**
- ✅ **Alligator Bearish:** Lips < Teeth < Jaw (lines spreading downward)
- ✅ **Awesome Oscillator:** AO < 0 (bearish momentum)
- ✅ **Stochastic:** Main > 20 AND Main < Signal (falling, not oversold)
- ✅ **RSI:** RSI > 30 (not exhausted)

> 💡 On the entry (lowest) timeframe, instead of Lips > Teeth > Jaw, the EA checks that **price is above/below the Jaw** — ensuring the candle has actually broken into the trend.

### Multi-Timeframe Modes

| Mode | Label | Timeframes | Best For |
|---|---|---|---|
| `AA` | No MTF | Current chart TF only | Quick testing |
| `BB` | Scalperz | H1 → M15 → M5 → M1 | Scalping |
| `CC` | Intradayz (default) | H4 → H1 → M15 → M5 | Intraday trading |
| `DD` | Swingz | D1 → H4 → H1 → M15 | Swing trading |
| `EE` | Positionz | W1 → D1 → H4 → H1 | Position trading |

> The chart timeframe doesn't matter — the EA fetches data from configured timeframes internally.

### Key Settings

| Parameter | Default | Description |
|---|---|---|
| `Lots` | 0.01 | Base lot size |
| `Takeprofit_Pips` | 50 | Take profit distance in pips |
| `Stoploss_Pips` | 50 | Stop loss distance in pips |
| `Close_On_Reversal` | true | Close opposite trades when reversal signal appears |
| `MultiTimeFrame_Mode` | CC (Intradayz) | Which MTF mode to use |
| `AutoCompounding_Mode` | A (Off) | Auto lot-sizing based on equity |
| `ECN_Broker` | false | Order without SL/TP first, then modify |
| `TrailingStop` | false | Enable trailing stop |
| `TrailingStop_Pips` | 25 | Trailing distance in pips |
| `LotMultiplierOnLoss` | 2.25 | Lot multiplier after a losing trade |
| `LotsResetOnProfit` | true | Reset to base lot after a win |
| `MaxLots` | 999 | Maximum lot size (safety cap) |
| `HoursFrom / HoursTo` | 0 / 24 | Trading hours filter (supports overnight) |
| `Monday–Sunday` | All true | Day-of-week filter |
| `Email_Notification` | true | Send trade signals via email |
| `MT4/MT5_Messages` | true | Push notifications to mobile app |

### Installation

1. Download the `.ex4` or `.ex5` file
2. MT4/MT5 → `File → Open Data Folder` → place in `MQL4\Experts\` or `MQL5\Experts\`
3. Ctrl+N → right-click Expert Advisors → Refresh
4. Drag onto a chart of a trending pair (EURUSD, GBPUSD, XAUUSD, etc.)
5. Common tab: ☑ **Allow live trading** | Inputs: choose MTF mode, set Lots, SL, TP
6. Make sure **Auto Trading** is ON (green icon)
7. Check the Experts tab — EA will wait for all indicators to align before trading

### FAQ

**Q: What pairs work best?**
A: Trending pairs — EURUSD, GBPUSD, USDJPY, XAUUSD, indices. Avoid choppy/ranging markets.

**Q: Why isn't the EA trading?**
A: The MTF requirement is strict — all 4 TFs × 4 indicators must agree. It may take hours or days for a valid signal. Quality over quantity.

**Q: Is martingale safe?**
A: Risky. Default 2.25x means after 3 consecutive losses, lot is ~11x base size. Always set `MaxLots` to a reasonable cap.

**Q: Can I backtest it?**
A: Yes. MT4/MT5 → Strategy Tester (Ctrl+R). MTF modes require history data for all relevant timeframes.

---

## 7. Encik Moku

**Multi-Timeframe Ichimoku Trend EA** · v1.06 · MT4 & MT5 · Open Source

### Downloads

- [⬇️ Download MT4](https://github.com/syarief02/EA-Encik-Moku/raw/master/EA%20-%20Encik%20Moku%20-%20MT4%20-%2020260930.ex4)
- [⬇️ Download MT5](https://github.com/syarief02/EA-Encik-Moku/raw/master/EA%20-%20Encik%20Moku%20v1.06%20-%20MT5%20-%2020260930.ex5)
- [📂 GitHub Repository](https://github.com/syarief02/EA-Encik-Moku)

### What It Does

Trades based on **Ichimoku Kinko Hyo**, **RSI**, and **Stochastic** — confirmed across up to **4 timeframes**. Buys above the Kumo cloud, sells below. Single-entry, trend-following EA with auto-compounding and martingale recovery. **Sister EA** to Aligator Gozaimasu with identical architecture but Ichimoku as the primary indicator.

### Signal Requirements

**📊 Buy Signal (all must be true on ALL configured timeframes):**
- ✅ **Ichimoku Bullish:** Tenkan-sen > Senkou Span A AND Tenkan-sen > Senkou Span B AND Tenkan-sen > Kijun-sen (price above cloud)
- ✅ **Stochastic:** Main < 80 AND Main > Signal (rising, not overbought)
- ✅ **RSI:** RSI < 70 (not exhausted)

**📉 Sell Signal (all must be true on ALL configured timeframes):**
- ✅ **Ichimoku Bearish:** Tenkan-sen < Senkou Span A AND Tenkan-sen < Senkou Span B AND Tenkan-sen < Kijun-sen (price below cloud)
- ✅ **Stochastic:** Main > 20 AND Main < Signal (falling, not oversold)
- ✅ **RSI:** RSI > 30 (not exhausted)

> 💡 **Ichimoku Settings:** Tenkan-sen (9), Kijun-sen (26), Senkou Span (52) — the classic Ichimoku parameters.

### What is the Kumo Cloud?

The **Kumo (cloud)** is formed by Senkou Span A and Senkou Span B. Price above the cloud = bullish bias, below = bearish bias. The EA checks that Tenkan-sen is positioned correctly relative to both spans and the Kijun-sen.

### Multi-Timeframe Modes

Same as Aligator Gozaimasu:

| Mode | Label | Timeframes | Best For |
|---|---|---|---|
| `AA` | No MTF | Current chart TF only | Quick testing |
| `BB` | Scalperz | H1 → M15 → M5 → M1 | Scalping |
| `CC` | Intradayz (default) | H4 → H1 → M15 → M5 | Intraday trading |
| `DD` | Swingz | D1 → H4 → H1 → M15 | Swing trading |
| `EE` | Positionz | W1 → D1 → H4 → H1 | Position trading |

### Settings

Identical parameter set to Aligator Gozaimasu — see [Section 6 Settings](#key-settings).

### Installation

Same process as Aligator Gozaimasu:
1. Download → place in `MQL4\Experts\` or `MQL5\Experts\` → Refresh
2. Drag onto a chart of a trending pair → enable Allow live trading
3. Choose MTF mode, set Lots/SL/TP → OK → ensure Auto Trading is ON

### FAQ

**Q: What pairs work best?**
A: Trending pairs — EURUSD, GBPUSD, USDJPY, XAUUSD. Avoid ranging/choppy markets.

**Q: How is this different from Aligator Gozaimasu?**
A: Same architecture, but uses **Ichimoku Kinko Hyo** instead of the Bill Williams Alligator. Choose based on your indicator preference.

**Q: What is the Kumo cloud?**
A: The Kumo (cloud) is formed by Senkou Span A and B. Price above = bullish, below = bearish.

---

## 8. General Installation Guide

### For Any MT4 EA

1. Download the `.ex4` file
2. Open MT4 → `File` → `Open Data Folder`
3. Navigate to `MQL4/Experts/`
4. Copy the `.ex4` file into this folder
5. Restart MT4 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart
7. EA properties → `Common` tab → ☑ **Allow live trading**
8. Configure parameters in the `Inputs` tab → Click **OK**
9. Make sure the **AutoTrading** button in the toolbar is **green**

### For Any MT5 EA

1. Download the `.ex5` file
2. Open MT5 → `File` → `Open Data Folder`
3. Navigate to `MQL5/Experts/`
4. Copy the `.ex5` file into this folder
5. Restart MT5 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart
7. EA properties → `Common` tab → ☑ **Allow Algo Trading**
8. Configure parameters in the `Inputs` tab → Click **OK**
9. Make sure the **Algo Trading** button in the toolbar is **green**

### MT5 Special Notes

- Ensure your account is a **hedging account** (not netting) for EAs that open multiple positions
- For GoldMind AI: you must also **Allow WebRequest** for `http://127.0.0.1:8000`

---

## 9. VPS Setup Guide

A **VPS (Virtual Private Server)** is essential for running EAs reliably 24/7.

### Why Use a VPS?

| Benefit | Description |
|---|---|
| **24/7 Uptime** | EA runs continuously without relying on your PC |
| **Stability** | No disruption from power outages or internet drops |
| **Low Latency** | VPS in data centers offers faster trade execution |
| **Security** | Isolated environment protects your trading data |

### How to Set Up

1. **Choose a VPS provider** — many forex brokers offer free VPS for active traders
2. **Connect via RDP** (Remote Desktop Protocol) from your PC
3. **Install MT4/MT5** on the VPS
4. **Copy your EA and configuration** — attach to chart and let it run

### Recommended Provider

**GB Network Forex VPS** — Reliable, low latency, 24/7 uptime  
📍 Locations: New York, Amsterdam, London, Malaysia  
🌐 [Order here](https://secure.gbnetwork.com/aff.php?aff=515)

---

## 10. Risk Management Guide

> ⚠️ **Martingale and automated trading strategies carry significant risk.** Always use proper risk management.

| Rule | Recommendation |
|---|---|
| **Account Type** | Cent account recommended for lower capital ($100+); Standard accounts also supported |
| **Capital** | Minimum **$100** for 0.01 starting lot (Cent recommended) |
| **Leverage** | Maximum leverage available (reduces margin per trade) |
| **Pairs** | Choose **ranging/low-volatility pairs** for grid EAs, **trending pairs** for trend EAs |
| **Timeframe** | M5 recommended for EA Budak Ubat; any for others |
| **MaxLot** | Set a reasonable cap to prevent runaway lot sizes |
| **MaxTrade** | Limit grid layers (10–15) to cap drawdown |
| **StopLoss** | Enable SL for additional protection |
| **Monitoring** | Check your account daily, even on VPS |
| **Profit Withdrawal** | Withdraw profits regularly |
| **Demo First** | Always test on demo before live trading |

---

## 11. Broker Partner Links & Authorization

To get your EA Budak Ubat account **authorized** (permanent access with no expiry), you must register through one of the following partner links. Any account type is eligible (Cent, Standard, Micro, etc. — Cent accounts recommended for starting balances under $1,000), with **maximum leverage**, and a minimum deposit of **$100 USD**.

Please select a broker that you have never registered with before. After registering, tell me the trading account number. I will share the EA update file.

Clients who have registered through my link can just PM the trading account number to me at [@SyariefAzman on Telegram](https://t.me/SyariefAzman).

| Broker | Register Link | Partner/Affiliate ID | Support Email |
|---|---|---|---|
| **FISG** | [Register](https://my.fisg.com/u/CTt0Rd) | `CTt0Rd` | support@fisg.com |
| **CXM** | [Register](https://gocxm.co/links/go/5062) | `5062` | support@cxm.com |
| **FBS** | [Register](https://fbs.partners?ibl=154319&ibp=588292) | `588292` | support@fbs.com |
| **HeadWay** | [Register](https://headway.partners/user/signup?hwp=516d6b) | `1021290` | care@hw.site |
| **Markets4you** | [Register](https://account.markets4you.online/en/user-registration/?affid=4hcnvz4) | `4hcnvz4` | info@markets4you.com |
| **InstaForex** | [Register](https://www.instaforex.com?x=KUSD) | `KUSD` | support@instaforex.com |
| **LiteForex** | [Register](https://www.litefinance.com/?uid=805161060) | `805161060` | clients@litefinance.com |
| **RoboForex** | [Register](https://rinfinity.com/en/welcome-bonus?a=mxyg) | `mxyg` | info@roboforex.com |
| **XM** | [Register](https://clicks.pipaffiliates.com/c?m=150422&c=862266) | `HVVR7` | XM Support |
| **Valetax** | [Register](https://ma.valetax.com/p/1939088) | `1939088` | contact@valetax.com |
| **Tickmill** | [Register](https://tickmill.link/46cOQ2h) | `IB72324388` | support@tickmill.com |
| **HF Markets** | [Register](https://banner-api.hfmmalaysia.com/link/e993b134?regulator=HFSV&refid=30572923) | `30572923` | support@hfm.com |
| **Eightcap** | [Register](https://partners.eightcap.com/click?campaign_id=1&ref_id=8660) | `8660` | customerservice@eightcap.com |
| **JustMarkets** | [Register](https://one.justmarkets.link/a/tjrtn60m2i/landing/trade-metals-like-professional?promo=4869) | `tjrtn60m2i` | support@justmarkets.com |

---

## 12. Contact & Support

| Channel | Contact |
|---|---|
| **Telegram** | [@SyariefAzman](https://t.me/SyariefAzman) |
| **WhatsApp** | [+60194961568](https://wa.me/60194961568) |
| **Twitter/X** | [@SyariefAzman](https://www.twitter.com/SyariefAzman) |
| **Facebook** | [EABudakUbat](https://m.me/EABudakUbat) |
| **Telegram Channel** | [t.me/EABudakUbat](https://t.me/EABudakUbat) |
| **MQL5 Signal** | [Signal Channel](https://www.mql5.com/en/channels/eabudakubat) |
| **GitHub** | [syarief02](https://github.com/syarief02) |

---

## 13. Legal Disclaimers

### Risk Warning

Products traded on margin carry a high level of risk, and it is possible to lose all your capital. These products may not be suitable for everyone and you should ensure that you understand the risks involved.

### Restricted Jurisdictions

EA Budak Ubat does not offer its services to residents of the United States of America, Malaysia, the European Union, the United Kingdom, North Korea, Myanmar, Iran, or any other country whose domestic regulations classify such investment offerings as prohibited.

### Additional Disclaimers

- **No investment advice** — Nothing in our materials constitutes investment, financial, legal, or tax advice
- **Past performance** — Historical results are not indicative of future performance
- **Automation risks** — Automated trading involves technology risks including connectivity, latency, slippage, and execution errors
- **Broker independence** — EA Budak Ubat is independent and not affiliated with any broker
- **User responsibility** — You are solely responsible for complying with all applicable laws and regulations
- **Licensing** — Unauthorized copying, resale, or distribution is prohibited

---

*© 2026 EA Budak Ubat by Syarief Azman. All rights reserved.*
