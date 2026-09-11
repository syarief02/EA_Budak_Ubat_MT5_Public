# MQL5 Market Product Listing Package — EA Budak Ubat v1.64

This document contains the exact product listing text, parameter reference, and step-by-step submission instructions to publish **EA Budak Ubat v1.64 (MT5)** on the official **MQL5 Market** showcase.

---

## 📋 Product Submission Form Data

| Field | Value |
|---|---|
| **Product Name** | `EA Budak Ubat MT5` |
| **Category** | `Experts` → `Grid` (or `Trend`) |
| **Platform** | `MetaTrader 5` |
| **Language** | `English` |
| **Minimum Version** | `5.00 build 4000+` |
| **Product File** | `EA - Budak Ubat v1.64 - MT5 - Market Edition.ex5` |
| **Free Activations** | `10` (MQL5 default is 5; 10 gives high buyer satisfaction) |
| **Price** | `$49` to `$99` (User defined; MQL5 Market minimum is $30) |
| **Rental Options** | 1 Month: `$30`, 3 Months: `$45`, 1 Year: `$75` (Optional) |
| **Icon** | 200 × 200 px PNG |

---

## 📝 MQL5 Market Description (Copy-Paste Ready)

EA Budak Ubat MT5 is an automated grid-trading Expert Advisor designed for MetaTrader 5. It combines technical trend analysis, dynamic volatility scaling, and multi-layered risk management to manage trades across ranging and trending market conditions.

The EA is optimized for the M5 timeframe on major forex pairs and precious metals (XAUUSD / Gold).


### Key Features

• 4 Selectable Analysis Methods:
  1. Classic Candle: Identifies directional momentum from bullish and bearish candle structures.
  2. SMA20: Uses 20-period Simple Moving Average crossovers for trend alignment.
  3. Alligator: Utilizes Bill Williams Alligator indicator (Lips, Teeth, Jaws) to enter during expansion phases.
  4. Ichimoku: Uses Tenkan-sen and Kijun-sen equilibrium signals (default method).

• AutoConfig AI Volatility Engine:
  When enabled, the EA measures market volatility using 365-day EURUSD Average Daily Range (ADR) benchmarked against the current instrument's 20-day ADR. It dynamically recalibrates Take Profit, minimum grid distance, distance increment step, and maximum distance to adapt to current market speed.

• H1 Multi-Timeframe RSI Filter:
  Applies an hourly Relative Strength Index filter to prevent buying into overbought zones or selling into oversold extremes. The RSI filter can be toggled OFF when trading strong macro trending instruments like Gold (XAUUSD).

• Real-Time Basket Break-Even Lock:
  When position layers accumulate and the basket enters profit, the EA dynamically pulls the Stop Loss to the weighted break-even price plus an optional lock-in profit buffer.

• Spread Guard & Equity Drawdown Protection:
  Includes real-time maximum spread filters (MaxSpread_Pips) and maximum equity drawdown guards (MaxDrawdownPct) that automatically close trades if risk thresholds are crossed.

• Dynamic Order Filling Negotiation:
  Negotiates supported filling modes (IOC, FOK, or RETURN) dynamically with the broker server for seamless execution on standard, ECN, and cent accounts.

• Integrated Chart Dashboard:
  Displays live trading metrics on the chart: account equity, active Buy/Sell count, live spread, RSI filter state, Break-Even status, and floating drawdown percentage.


### Recommended Trading Setup

• Timeframe: M5 (5 Minutes)
• Recommended Currency Pairs: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP
• Recommended Metal: XAUUSD (Gold) — Set UseRSIFilter = false
• Minimum Deposit:
  - Standard Account: $1,000 (0.01 lot)
  - Cent Account: $100 (10,000 cents with 0.01 lot)
• Recommended Leverage: 1:500 or higher
• Execution Mode: Every New Bar (Execution_Mode = B)


### Input Parameters Guide

--- General Settings ---
• Execution_Mode: [Every Tick / Every New Bar] — Execution frequency (New Bar recommended for stability).
• Pos_Mode: [Buy & Sell / Buy Only / Sell Only] — Allowed trade directions.
• Hedging: [true/false] — Allow simultaneous Buy and Sell grids.
• Method: [Classic Candle / SMA20 / Alligator / Ichimoku] — Entry signal strategy.
• Lots: Initial position volume (e.g. 0.01).

--- Grid & Martingale ---
• AutoConfig: [true/false] — Enable automated volatility-based parameter scaling.
• TakeProfit: Target profit per position in pips (used when AutoConfig = false).
• StopLoss: Hard stop loss in pips (0 = disabled).
• minDistance: Initial distance for second position layer in pips.
• distanceIncrement: Step increase added to each subsequent grid layer.
• maxDistance: Maximum pip distance cap between grid layers.
• MartingaleMultiplier: Lot size multiplier for subsequent layers (e.g. 1.5).
• MaxOrders: Maximum number of positions allowed in one grid direction.

--- Risk & Filters ---
• UseRSIFilter: [true/false] — Filter entries using H1 RSI(14). (Turn OFF for XAUUSD).
• RSI_Period: Period for RSI calculation (default: 14).
• EnableBreakEven: [true/false] — Automatically moves basket stop loss to profit once target is reached.
• BreakEven_Pips: Profit in pips before Break-Even activates.
• BreakEven_Lock: Pips locked in beyond break-even price.
• MaxDrawdownPct: Maximum basket drawdown percentage before safety intervention (0 = disabled).
• MaxSpread_Pips: Maximum spread allowed for opening new positions.
• MagicNumber: Unique identifier ticket for EA orders.


### Strategy Tester & Demonstration

Before trading on a live account, test the Expert Advisor in the MetaTrader 5 Strategy Tester on EURUSD M5 or XAUUSD M5 with Every Tick or Every New Bar execution.

---

## 🛠️ Step-by-Step Submission Instructions on MQL5.com

1. **Verify Seller Status**:
   - Go to https://www.mql5.com and log in.
   - Click on your username → **Profile** → **Seller**.
   - Ensure your identity registration (passport/ID verification) is approved.
2. **Create New Market Product**:
   - Navigate to **Market** → click the green button **Add Product** (or visit https://www.mql5.com/en/market/add).
   - Select platform: **MetaTrader 5**.
   - Select product type: **Expert Advisor**.
   - Product Name: `EA Budak Ubat MT5`.
3. **Upload Files**:
   - Upload `EA - Budak Ubat v1.64 - MT5 - Market Edition.ex5` (from `mql5-market-package/`).
4. **Paste Description**:
   - Copy the description above and paste it into the product description box.
5. **Set Pricing & Activations**:
   - Set your price (minimum $30).
   - Set free activations: `10`.
6. **Submit for Automatic Validation**:
   - Click **Save & Send to Validation**.
   - The MQL5 automated server will run the Strategy Tester checks.
   - Once automated checks pass (usually 5–15 minutes), the product will be reviewed by the moderators and published to the Market!
