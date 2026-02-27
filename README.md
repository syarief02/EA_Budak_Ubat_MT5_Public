# EA Budak Ubat v1.62

### [⬇️ Download MT4](https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260328.ex4) · [⬇️ Download MT5](https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT5%20-%2020260328.ex5) · [🛒 Purchase Full Version (MT4 Only)](https://tinyurl.com/eabubuy) · [📡 Signal Channel](https://www.mql5.com/en/channels/eabudakubat)

> **Limited Time Price!** The price increases by 10 USD after every 10 purchases.

---

## License Notice

This software is licensed under the **MIT License**, with the restriction that it **may not be sold or used for commercial purposes**. This ensures the software remains free and the author is not liable for commercial use.

---

## Table of Contents

- [Overview](#overview)
- [Platform Support (MT4 & MT5)](#platform-support-mt4--mt5)
- [How It Works](#how-it-works)
- [EA Parameters](#ea-parameters)
- [AutoConfig AI System](#autoconfig-ai-system)
- [Authorization & Account Licensing](#authorization--account-licensing)
  - [Authorized Account List](#authorized-account-list)
  - [How to Get Authorized](#how-to-get-authorized)
- [Installation Guide](#installation-guide)
  - [MT4 Installation](#mt4-installation)
  - [MT5 Installation](#mt5-installation)
- [Using a VPS](#using-a-vps)
- [Risk Management Tips](#risk-management-tips)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Update Logs](#update-logs)
- [Author & Contact](#author--contact)
- [Legal Notices & Disclaimers](#legal-notices--disclaimers)

---

## Overview

**EA Budak Ubat** is a **grid-based martingale Expert Advisor** for MetaTrader 4 & MetaTrader 5. It is designed for **ranging currency pairs** on the **M5 timeframe** and is recommended for use with a **cent account** (minimum $100 capital).

The EA automatically enters trades based on technical analysis, manages a grid of martingale positions with dynamic distance increments, and modifies take-profit levels to a weighted break-even point plus your configured TP value.

### Key Features

| Feature | Description |
|---|---|
| **Multi-Platform** | Runs on both MT4 and MT5 (Beta) |
| **4 Analysis Methods** | Classic Candle, SMA20, Alligator, Ichimoku |
| **Grid Martingale** | Automatic position layering with configurable multiplier |
| **AutoConfig AI** | Dynamic parameter optimization based on ADR |
| **Hedging Support** | Trade both directions simultaneously or single-direction |
| **Time Filter** | Schedule EA active hours (Start/Stop time) |
| **Close All Button** | One-click close for all open positions on chart |
| **Authorization System** | Account-locked licensing with demo mode support |
| **Broker Max Orders** | Automatically respects broker's order limit |

---

## Platform Support (MT4 & MT5)

EA Budak Ubat is available for **both MetaTrader 4 and MetaTrader 5**. The MT5 version is a full port of the MT4 version with identical trading logic.

| Aspect | MT4 Version | MT5 Version (Beta) |
|---|---|---|
| **File** | `EA - Budak Ubat v1.62 - MT4 - 20260328.ex4` | `EA - Budak Ubat v1.62 - MT5 - 20260328.ex5` |
| **Order System** | `OrderSend()`, `OrderSelect()`, `OrderModify()` | `CTrade` class (`trade.Buy()`, `trade.Sell()`, `trade.PositionModify()`) |
| **Position Counting** | `OrdersTotal()` with `OrderSelect()` loop | `PositionsTotal()` with `PositionGetTicket()` loop |
| **Indicators** | Direct `iRSI()`, `iMA()`, `iAlligator()`, `iIchimoku()` calls | Indicator handles + `CopyBuffer()` via `GetIndicatorBuffer()` helper |
| **Ticket Type** | `int` | `ulong` |
| **Market Info** | `MarketInfo(symbol, MODE_*)` | `SymbolInfoDouble()` / `SymbolInfoInteger()` |
| **Account Info** | `AccountFreeMargin()`, `AccountNumber()` | `AccountInfoDouble(ACCOUNT_MARGIN_FREE)`, `AccountInfoInteger(ACCOUNT_LOGIN)` |
| **Margin Check** | `MarketInfo(MODE_MARGINREQUIRED)` | `OrderCalcMargin()` with fallback |
| **Time Functions** | `TimeHour()`, `TimeMinute()` | `TimeToStruct()` with `MqlDateTime` |
| **Demo Detection** | Built-in `IsDemo()` | Custom `IsDemo()` using `ACCOUNT_TRADE_MODE` |

> **Important:** Both versions share the **identical trading logic**, parameters, authorization list, and account whitelist. The MT5 version simply uses the native MQL5 API equivalents.

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                      OnTick()                           │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │ Time Filter  │───▶│ Exec. Mode?  │                   │
│  └──────────────┘    └──────┬───────┘                   │
│                        ┌────┴────┐                      │
│                   Every Bar  Every Tick                  │
│                        └────┬────┘                      │
│                             ▼                           │
│                      ┌──────────┐                       │
│                      │  Main()  │                       │
│                      └────┬─────┘                       │
│               ┌───────────┼───────────┐                 │
│               ▼           ▼           ▼                 │
│         AutoConfig?  GetLastOrder  FirstPosition()      │
│         ─── Yes ──▶  calcParam()  (entry signal)       │
│              │                        │                 │
│              ▼                        ▼                 │
│        GridTrading? ──▶ MartingalePosition()            │
│              │              │                           │
│              ▼              ▼                           │
│        ModifyTP ◄── CommonPrice (weighted avg)          │
└─────────────────────────────────────────────────────────┘
```

### Step-by-Step Flow

1. **On every tick**, the EA updates the chart comment and checks if the current time is within the configured `StartTime` – `StopTime` window.

2. **Execution Mode** determines whether the main logic runs on every tick or only when a new bar appears.

3. **If no open positions exist**, the EA evaluates the selected **Analysis Method** (Candle, SMA20, Alligator, or Ichimoku) and an **RSI H1 filter** (Buy requires RSI < 70; Sell requires RSI > 30) to determine entry direction.

4. **If open positions exist** and `GridTrading` is enabled, the EA checks whether the price has moved far enough from the last position (using the incremental distance formula). If so, it opens a new position with a **martingale lot size** = `Lots × Multiplier^(layer count)`.

5. **Take Profit** for all positions in the same direction is updated to a **weighted average entry price** (break-even) plus the configured TP in pips.

6. **Stop Loss** (if enabled) is calculated from the **first entry price** of the basket.

---

## EA Parameters

### Core Parameters

| Parameter | Default | Description |
|---|---|---|
| **EA_Name** | `[https://t.me/SyariefAzman]` | Display name shown in trade comments |
| **Execution_Mode** | `on Every New Bar` | `Every Tick` = instant entry; `Every New Bar` = waits for candle close |
| **Pos_Mode** | `Buy & Sell` | `Buy & Sell`, `Buy Only`, or `Sell Only` |
| **Hedging** | `false` | `true` = allows simultaneous buy/sell baskets; `false` = one direction only |
| **Method** | `Ichimoku` | Analysis method for first entry: `Classic Candle`, `SMA20`, `Alligator`, `Ichimoku` |

### Lot & Grid Parameters

| Parameter | Default | Description |
|---|---|---|
| **Lots** | `0.01` | Initial lot size for the first position |
| **GridTrading** | `true` | Enable/disable grid (martingale) layering |
| **MartingaleMultiplier** | `1.3` | Lot multiplier per grid layer (set to `1.0` for flat lot) |
| **MaxLot** | `500` | Maximum lot size cap for martingale |
| **MaxTrade** | `99999` | Maximum number of grid layers per direction |

### Distance & TP/SL Parameters

| Parameter | Default | Description |
|---|---|---|
| **TakeProfit** | `25.0` | Take profit in pips (from weighted average price) |
| **StopLoss** | `0` | Stop loss in pips from first entry (0 = disabled) |
| **minDistance** | `4` | Minimum pip distance between grid orders |
| **distanceIncrement** | `2.0` | Extra pips added per successive layer |
| **maxDistance** | `100.0` | Maximum distance cap between grid orders |

### Time & Configuration

| Parameter | Default | Description |
|---|---|---|
| **StartTime** | `00:00` | EA active start time (HH:MM, server time) |
| **StopTime** | `23:59` | EA active stop time (HH:MM, server time) |
| **AutoConfig** | `false` | Enable AutoConfig AI for dynamic parameters |
| **MagicNumber** | `123456` | Unique magic number for trade identification |

### Grid Distance Formula

The distance between the Nth grid layer and the (N+1)th is calculated as:

```
Distance(N) = minDistance + (N - 1) × distanceIncrement
```

Capped at `maxDistance`. For example with defaults (minDistance=4, increment=2, maxDistance=100):

| Layer | Distance (pips) |
|---|---|
| 1 → 2 | 4 |
| 2 → 3 | 6 |
| 3 → 4 | 8 |
| 4 → 5 | 10 |
| ... | ... (up to max 100) |

---

## AutoConfig AI System

When `AutoConfig` is enabled, the EA dynamically calculates optimal **TakeProfit**, **minDistance**, **distanceIncrement**, and **maxDistance** based on market volatility.

### How It Works

1. **Detects EURUSD** (or broker variation like `EURUSD.m`) automatically from available symbols.
2. Calculates the **365-day Average Daily Range (ADR)** of EURUSD using `SMA(High) - SMA(Low)` on D1.
3. Derives divisor ratios from the EURUSD ADR: `TP÷25`, `minPipStep÷4`, `PipStepIncr÷(2×Multiplier^positions)`, `maxPipStep÷100`.
4. Calculates the **20-day ADR** of the current symbol.
5. Applies the EURUSD ratios to the current symbol's ADR to produce optimized parameter values.
6. Parameters are **recalculated every tick/bar**, ensuring continuous adaptation to changing market conditions.

> **Tip:** Enable AutoConfig when you're unsure which settings to use for a particular currency pair. It automatically adjusts for different volatility levels.

---

## Authorization & Account Licensing

The EA uses an **account-based licensing system**:

- **Demo accounts** — Always allowed (no authorization needed). Great for testing.
- **Authorized accounts** — Live accounts registered through the author's broker links.
- **Trial mode** — Unauthorized live accounts can trade until the expiration date (`2026.03.28`).
- **Expired + Unauthorized** — EA will display an alert and remove itself from the chart.

### Authorization Flow

```
Is Demo? ──── Yes ──▶ ✅ Run EA (no expiry)
    │
    No
    │
Is Authorized? ── Yes ──▶ ✅ Run EA (no expiry)
    │
    No
    │
Before Expiry? ── Yes ──▶ ⚠️ Trial Mode (runs until expiry date)
    │
    No
    │
    ▼
   ❌ EA Removed (MessageBox alert shown)
```

### Authorized Account List

Use **Ctrl+F** to search for your account number:

> 47144366, 39202388, 447496, 28744721, 446471, 67044500, 35108503, 14270029, 280898538, 22687585, 48431437, 40231501, 34181039, 50010729, 46206181, 31042413, 48424040, 30935753, 30935750, 30935749, 231105999, 231106000, 301423050, 231108522, 231107366, 437101, 231105601, 301429546, 301428462, 1253026, 45479042, 301425970, 4866577, 35066358, 20733294, 24265271, 24308938, 423655, 241272305, 30844787, 30844786, 271762633, 271762687, 271761548, 13042631, 271761625, 31031383, 241836624, 40209703, 428531, 301424257, 301420622, 30821619, 301420423, 260814087, 330018160, 13041727, 13041720, 260812069, 15127688, 260810419, 260810318, 260809709, 220763384, 260807856, 41474935, 110371577, 220760466, 220763383, 42673033, 220764630, 241797440, 40204188, 241779765, 220760133, 220757834, 110349588, 51379350, 220757761, 10589171, 220757426, 241764167, 220756561, 220756639, 301419237, 16581411, 231104393, 220754569, 290921520, 220754551, 220754458, 220754351, 110030128, 220753629, 220753544, 3805175, 231104416, 231101347, 231103989, 231103990, 260802695, 220747326, 231102420, 231100797, 231101152, 46138418, 290894056, 231099736, 290891017, 290891018, 231098986, 231097084, 231098630, 31018538, 536221, 301419571, 301419462, 301419236, 220476053, 13301739, 301419002, 301418623, 31018009, 271757912, 301417622, 1235226, 41328586, 301415814, 13300444, 38039998, 91931537, 1235225, 301415091, 301414688, 49156221, 15120370, 4574565, 407676, 271758951, 271758209, 41029112, 230325793, 271757233, 271756669, 49154578, 4573169, 260801772, 260800857, 40855756, 40818759, 30472764, 4572375, 260799123, 4120301, 22779978, 20966306, 260796883, 4571803, 260796867, 20981220, 5670568, 56171660, 241743374, 241743130, 24493784, 280788856, 44625475, 301410426, 38027769, 91922301, 4569257, 301408129, 301407379, 280790191, 384721, 301407291, 14253088, 301406548, 381957, 241738068, 15116397, 10259378, 374657, 33164480, 271750884, 31009450, 13039831, 75040932, 38023755, 13038587, 38278508, 45470568, 45471082, 90529337, 378600, 231094469, 13037390, 110447778, 231093230, 231093215, 280768223, 40172447, 3779695, 368622, 231092130, 231091871, 231091541, 231090788, 271405414, 13035331, 5075800, 271747529, 271747624, 271747617, 271747922, 128629018, 271747823, 13034491, 271747340, 40103100, 271746810, 24172371, 1228497, 67023650, 271746403, 241694961, 271745914, 271745778, 271745657, 271745025, 301406367, 5814938, 4618919, 359136, 301405259, 251005201, 301404899, 301404787, 230878495, 40005610, 50928949, 251023611, 310589109, 251011686, 56136701, 250738053, 50926643, 50926990, 6020467, 301402076, 301401831, 301401552, 241673648, 241673652, 260793536, 260793354, 260793151, 260793137, 330261658, 260792844, 310414845, 10582534, 25196877, 24281643, 260792334, 241637147, 260791720, 47105460, 75024017, 25182784, 25180557, 25182018, 43187065, 38008250, 349409, 10581650, 290827504, 10581156, 10581157, 46114152, 2100202361, 320325985, 250776195, 230878487, 10580112, 220677181, 212528, 301383073, 25134823, 110367864, 38007561, 320336495, 320341625, 10578632, 342856, 290788014, 25124937, 50911541, 320325985, 11758925, 24366538, 10577296, 271713150, 271714435, 310433979, 271710987, 241288762, 5879494, 10576950, 5879178, 1210812, 271708317, 1210655, 271706164, 4554051, 141006588, 47095826, 4566698, 6007330, 310433370, 310432147, 310427789, 4566517, 310428731, 6007088, 310428380, 467378, 467379, 260788186, 5874167, 4566325, 310416709, 310420287, 9785154, 310417582, 310412921, 310414039, 310413555, 1600109727, 310411959, 310411239, 6005601, 260789913, 230944394, 320125264, 5864001, 260784697, 260782092, 141000344, 56129966, 56129967, 38005357, 56129965, 22595771, 330246906, 17751851, 24372660, 110019895, 53483829, 2132602615, 102865, 260772890, 38216624, 56128453, 330259968, 330261080, 6973836, 250855267, 56119492, 24440346, 20932039, 330253189, 330252350, 437814, 6002511, 330247349, 22013702, 46102642, 56126565, 120201094, 51407995, 231088399, 231080470, 231080474, 38003230, 2100200249, 192139837, 231074929, 339376, 339176, 231067931, 320321354, 231065509, 220748121, 24368645, 24368642, 24368628, 24368617, 141136159, 192080160, 192080166, 192087997, 192080154, 290729490, 220734699, 6748098, 290768531, 301326664, 301326668, 310359156, 301329698, 750729, 13027894, 13527690, 301329704, 301329710, 10576779, 56120025, 310402183, 320323525, 301329718, 320287929, 320287926, 300724432, 301329724, 38000971, 320305818, 320287928, 320287930, 290797780, 320293256, 999049102, 189402, 187461, 1000012579, 192079962, 46002444, 47074913, 301329729, 5015555, 10574113, 10574122, 2100199368, 2100102903, 301370702, 301364931, 301364963, 301363842, 22668478, 117043700, 271619370, 271619248, 271619247, 271619242, 169745, 301342826, 5103852, 10572601, 301338471, 301340934, 2100127831, 301338667, 301338700, 301338711, 60127544, 241334311, 301333295, 21327810, 62630015, 290811032, 290811144, 35124407, 226727, 271376212, 271589085, 290793203, 290803005, 290803011, 290803023, 290803031, 290803035, 290803042, 290803045, 290777186, 290777238, 5793561, 290797783, 280428807, 290708505, 290708508, 10565339, 22642646, 60124625, 290793095, 290776570, 290778420, 290791966, 290791971, 290791974, 290791975, 290791976, 290791978, 290791980, 290791982, 290790446, 60127270, 290783307, 50893152, 60127243, 9106202, 4561741, 766118, 290779891, 290777138, 4561464, 24333650, 271705126, 271702365, 271702356, 271701961, 271701959, 271701950, 271700614, 271700604, 271700600, 271698838, 58808192, 22620250, 22619162, 60126730, 271680740, 65209315, 60126358, 53409128, 2875737, 5711440, 5711469, 15769428, 112883, 271670101, 271663568, 250972252, 250979131, 4559342, 3754760, 3754799, 60126208, 250966681, 250973804, 250966081, 800837865, 271628286, 260657559, 56105041, 250959657, 250957659, 35055890, 2100198278, 2100198280, 2100197940, 250953184, 250951695, 250950477, 250949189, 56104289, 363317, 250937747, 2100198277, 330231524, 1149678, 5767394, 5618549, 60125487, 117017757, 220579967, 60124536, 13025770, 330226965, 60124742, 2100197910, 13025412, 5000445, 5763809, 60124966, 60124932, 5763058, 330215114, 330215118, 330215126, 5762992, 330213208, 13024948, 330212436, 60124502, 362926, 548188, 13024780, 290448830, 320247513, 5670568, 60124670, 280755909, 21454957, 53379729, 13024449, 13022238, 60124033, 5527955, 5527967, 5586556, 5586494, 5586473, 5586460, 5585377, 60124032, 108151, 280742519, 280742542, 3751953, 280734909, 1148217, 5753815, 571958, 571729, 260753046, 260756315, 280730787, 280730796, 5585003, 13022980, 320207539, 46175797, 260764032, 260762646, 260758710, 310307023, 3957871, 5743926, 5434951, 241612110, 241612108, 27362937, 241612106, 241612105, 241612104, 241612103, 241612102, 241612100, 241612096, 241604510, 5742489, 241605261, 241617296, 443354, 22546495, 13021463, 13004694, 241591851, 290748564, 800833896, 241606464, 241605554, 231047192, 290589021, 241599814, 241599469, 13020888, 90307343, 90876405, 241598720, 241598716, 241598721, 241598555, 241598558, 241598559, 241596128, 231052121, 230942650, 241587481, 241587697, 241586738, 44094296, 5522658, 686468, 35050856, 330023862, 5724392, 220093895, 24110069, 47055958, 24390748, 220683034, 20890279, 231041409, 220670829, 231040169, 5711441, 290505538, 51194337, 310200794, 231038313, 55006805, 231037934, 8963723, 88014706, 4457412, 6336708, 360439, 20314776, 890367718, 8002244, 5727022, 5727021, 5727019, 5727018, 5727017, 5724676, 5724673, 5724670, 5713913, 5713912, 53338904, 231036521, 10569792, 10569822, 10569823, 10569824, 10569825, 260675215, 3748617, 330032453, 220708708, 10570144, 10570145, 10570146, 10570181, 220680918, 220694255, 220703637, 10570143, 10569437, 46071377, 220698139, 290636244, 220696924, 310364137, 310364161, 320243283, 310367068, 220695974, 220694810, 220694807, 220692136, 220692127, 10569667, 46070806, 220691140, 250852939, 438088, 220689347, 20829806, 220689025, 220689151, 241501008, 271557181, 250280548, 437834, 10568483, 90865412, 320183680, 21398598, 229488, 46069257, 220680804, 220678889, 310390721, 220677774, 320258092, 10568801, 320236039, 5611439, 310360242, 310393621, 330179201, 330019766, 310390036, 52133589, 310387193, 310382563, 310381317, 310362509, 310380447, 22224590, 5714333, 4558630, 5713692, 435807, 4558456, 310373184, 320239407, 320206708, 320206716, 320206723, 320206732, 4558004, 310371777, 260600979, 5711107, 310364286, 33126040, 90866470, 5434953, 301318199, 310361207, 310360465, 435036, 310360389, 320259320, 4557465, 789012, 345678

---

### How to Get Authorized

Register through one of the author's broker partner links below. After registering, send your **trading account number** to [@SyariefAzman on Telegram](https://t.me/SyariefAzman).

| Broker | Link | Partner ID |
|---|---|---|
| **FISG** | [Register](https://my.fisg.com/u/CTt0Rd) | `CTt0Rd` |
| **CXM** | [Register](https://secure.cxmys.com/links/go/5062) | `5062` |
| **FBS** | [Register](https://fbs.partners?ibl=154319&ibp=588292) | `588292` |
| **HeadWay** | [Register](https://headway.partners/user/signup?hwp=516d6b) | `1021290` |
| **Forex4you** | [Register](https://account.forex4you.com/en/user-registration/?affid=4hcnvz4) | `4hcnvz4` |
| **OctaFx** | [Register](https://my.octafxmy.net/change-partner-request/?partner=246630) | `246630` |
| **InstaForex** | [Register](https://www.instaforex.com?x=KUSD) | `KUSD` |
| **LiteForex** | [Register](https://www.litefinance.com/?uid=805161060) | `805161060` |
| **RoboForex** | [Register](https://my.roboforex.com/en/?a=mxyg) | `mxyg` |
| **XM** | [Register](https://clicks.pipaffiliates.com/c?c=862266&l=en&p=1) | `HVVR7` |
| **Valetax** | [Register](https://ma.valetax.com/p/1939088) | `1939088` |

> **Bonus:** FBS and Forex4you clients receive a **50% spread rebate** on the commission earned from your total trade lots, paid weekly.

---

## Installation Guide

### MT4 Installation

[![Watch the video](https://img.youtube.com/vi/leH9PGkLc6Q/hqdefault.jpg)](https://youtu.be/leH9PGkLc6Q)

1. Download `EA - Budak Ubat v1.62 - MT4 - 20260328.ex4`
2. Open MT4 → `File` → `Open Data Folder`
3. Navigate to `MQL4/Experts/`
4. Copy the `.ex4` file into this folder
5. Restart MT4 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart (recommended: **M5 timeframe**, ranging pair)
7. In the EA properties, go to `Common` tab → check **Allow live trading**
8. Configure parameters in the `Inputs` tab
9. Click **OK** — the EA will display its status on the chart

### MT5 Installation

1. Download `EA - Budak Ubat v1.62 - MT5 - 20260328.ex5`
2. Open MT5 → `File` → `Open Data Folder`
3. Navigate to `MQL5/Experts/`
4. Copy the `.ex5` file into this folder
5. Restart MT5 (or right-click Navigator panel → Refresh)
6. Drag the EA onto a chart (recommended: **M5 timeframe**, ranging pair)
7. In the EA properties, go to `Common` tab → check **Allow Algo Trading**
8. Configure parameters in the `Inputs` tab
9. Click **OK** — the EA will display its status on the chart

> **MT5 Note:** Make sure your broker supports **hedging accounts** (not netting) if you plan to run the EA with `Hedging = true` or grid trading enabled. The EA requires the ability to hold multiple positions on the same symbol.

---

## Using a VPS

A **VPS (Virtual Private Server)** is essential for running EA Budak Ubat reliably 24/7.

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

### VPS Recommendation

**GB Network Forex VPS** is recommended by the author for its reliability and low latency.

- **Locations:** New York, Amsterdam, London, Malaysia
- 🌐 [Order here](https://secure.gbnetwork.com/aff.php?aff=515)

[![VPS BU](https://www.gbnetwork.my/wp-content/uploads/2023/07/featured-image-GB.jpg)](https://secure.gbnetwork.com/aff.php?aff=515)

---

## Risk Management Tips

> ⚠️ **Martingale strategies carry significant risk.** Always use proper risk management.

| Rule | Recommendation |
|---|---|
| **Account Type** | Use a **cent account** to limit exposure |
| **Capital** | Minimum **$100** (cent account) for 0.01 starting lot |
| **Leverage** | Maximum leverage available (reduces margin usage per trade) |
| **Pairs** | Choose **ranging/low-volatility pairs** (avoid trending/high-news pairs) |
| **Timeframe** | **M5** is recommended |
| **MaxLot** | Set a reasonable cap to prevent runaway lot sizes |
| **MaxTrade** | Limit the number of grid layers (e.g., 10–15) to cap drawdown |
| **StopLoss** | Consider enabling SL for additional protection |
| **Monitoring** | Check your account daily, even on VPS |
| **Profit Withdrawal** | Withdraw profits regularly; don't let the account grow unchecked |

---

## Troubleshooting & FAQ

### Common Issues

| Problem | Solution |
|---|---|
| **"Account Unauthorized" alert** | Your account is not in the whitelist. Register through a partner broker link and contact [@SyariefAzman](https://t.me/SyariefAzman) |
| **EA not trading** | 1) Check AutoTrading is enabled. 2) Verify time filter (StartTime/StopTime). 3) Confirm sufficient margin. 4) Check Experts log for errors |
| **"Not enough margin" in logs** | Reduce lot size or deposit more funds |
| **EA expired** | Contact the author for updated EA file with new expiry date |
| **Broker rejects orders** | Check if your broker has reached max orders limit. Some brokers limit to 200 |
| **MT5: Orders fail** | Ensure your MT5 account is a **hedging account**, not netting |
| **"No available EURUSD variation"** | Only appears if AutoConfig is on and EURUSD isn't available. Add EURUSD to Market Watch or disable AutoConfig |

### FAQ

**Q: Can I use this on multiple charts?**
A: Yes, but use a **different MagicNumber** for each chart to avoid conflicts.

**Q: Does the MT5 version trade the same as MT4?**
A: Yes. The trading logic, parameters, grid math, analysis methods, authorization, and time filtering are all identical. Only the underlying API calls differ.

**Q: What pairs work best?**
A: Ranging pairs with low spread. Avoid highly trending or exotic pairs.

**Q: Can I use this on XAUUSD (Gold)?**
A: Technically yes, but gold is very volatile. Use extreme caution, a cent account, and very conservative settings.

---

## Update Logs

### EA Budak Ubat v1.62

```
What's new:
1. Close All Button: Close all open positions with a single click on the chart.
2. Time Start and Time Stop: Control when the EA is active using HH:MM format.
3. Bug Fixes on Symbol Select: Fixed auto-detection of broker symbol variations.
4. MT5 Beta Port: Full conversion to MQL5 with identical trading logic.
```

![EA Budak Ubat v1.62](./screenshot/v1.62.png)

### EA Budak Ubat v1.61

```
What's new:
- Analysis Method: First position follows the selected analysis method.
- Grid Trading: Toggle on/off to switch between grid and single-entry mode.
- AutoConfig AI: Dynamic parameter optimization for any currency pair.
```

![EA Budak Ubat v1.61](./screenshot/v1.61.png)

### EA Budak Ubat v1.60

```
What's new:
- Position Mode: Buy Only, Sell Only, or Buy & Sell.
- Maximum Lot: Cap martingale lot sizes at a configurable maximum.
```

### EA Budak Ubat v1.58

```
What's new:
- Execution Mode: Every Tick or Every New Bar.
- Distance Increment: Progressive grid spacing per layer.
- Max Distance: Cap on grid distance between orders.
- Bug fixes on new bar function.
- MaxTrade separated for buy/sell in hedging mode.
```

### EA Budak Ubat v1.56

```
Bug fixes and added Max Trade parameter.
Registered accounts have no expiry.
```

### EA Budak Ubat v1.55

```
Initial grid martingale EA with:
- Candle-based entry method
- Hedging support
- Martingale lot sizing
- Break-even TP modification
```

---

## Project Files

| File | Description |
|---|---|
| `EA - Budak Ubat v1.62 - MT4 - 20260328.ex4` | MT4 compiled EA |
| `EA - Budak Ubat v1.62 - MT5 - 20260328.ex5` | MT5 compiled EA |
| `v1.62 Authorized Account List.txt` | Full authorized account list |
| `LICENSE` | MIT License |
| `README.md` | This file |
| `1. PANDUAN MEMASANG EA...pdf` | Installation guide (Malay) |
| `2. panduan VPS amazon...pdf` | AWS VPS guide (Malay) |
| `3. Money Management.pdf` | Money management guide |
| `Budak Ubat's Broker Partnership.pdf` | Broker partnership details |
| `Cara Install Banyak MT4...pdf` | Multi-MT4 install guide (Malay) |
| `Cara untuk optimize mt4 di VPS.pdf` | MT4 VPS optimization guide (Malay) |
| `mql4 manual.pdf` | MQL4 programming reference |
| `BuBat MT4 Portable.zip` | Pre-configured portable MT4 |
| `fbs4setup.exe` | FBS broker MT4 installer |

---

## Author & Contact

| | |
|---|---|
| **Author** | Syarief Azman (Budak Ubat) |
| **Telegram** | [@SyariefAzman](https://t.me/SyariefAzman) |
| **WhatsApp** | [+60194961568](https://wa.me/60194961568) |
| **GitHub** | [syarief02](https://github.com/syarief02) |
| **Twitter/X** | [@SyariefAzman](https://www.twitter.com/SyariefAzman) |
| **Facebook** | [EABudakUbat](https://m.me/EABudakUbat) |
| **Telegram Channel** | [t.me/EABudakUbat](https://t.me/EABudakUbat) |

---

## Legal Notices & Disclaimers

### THIS SERVICE IS NOT PROVIDED TO CITIZENS OF COUNTRIES WHOSE DOMESTIC REGULATIONS CLASSIFY THIS INVESTMENT OFFER OR THIS PRODUCT AS PROHIBITED

**Risk warning:** Products traded on margin carry a high level of risk, and it is possible to lose all your capital. These products may not be suitable for everyone and you should ensure that you understand the risks involved.

**Restricted jurisdictions:** *EA Budak Ubat* does not offer its services to residents of the United States of America, Malaysia, the European Union, the United Kingdom, North Korea, Myanmar, Iran, or any other country whose domestic regulations classify such investment offerings as prohibited.

**Local law compliance:** *EA Budak Ubat* does not direct its website, software, or services to any person in any country in which the use of its website or services is prohibited by local legislation. When accessing or using this website or software from a country in which its use may be restricted, it is the user's responsibility to ensure that any use of the website or services adheres to local legislation.

**No universal suitability:** *EA Budak Ubat* does not affirm that the information on its website or in its materials is suitable to all jurisdictions, or that the services are available in all jurisdictions.

### Additional Disclaimers

- **No investment advice:** Nothing in our materials, website, or software constitutes investment, financial, legal, or tax advice. Decisions you make using *EA Budak Ubat* are your own and at your own risk.
- **Past performance:** Historical results, forward-tests, and back-tests are not indicative of future performance. Market conditions can change rapidly.
- **Automation risks:** Automated trading involves technology risks including but not limited to connectivity, latency, VPS/broker outages, slippage, spread widening, and execution errors. You are responsible for monitoring your account and maintaining appropriate risk controls (e.g., position sizing, stop loss).
- **Broker independence:** *EA Budak Ubat* is independent and not affiliated with, endorsed by, or responsible for the actions of any broker or liquidity provider.
- **User responsibility:** You are solely responsible for complying with all applicable laws and regulations in your jurisdiction, and for ensuring the EA is permitted for use on your trading account.
- **Licensing & usage:** Unauthorized copying, resale, or distribution of *EA Budak Ubat* is prohibited. Access may be revoked for violations of the license terms.

---

*This disclaimer is provided for general information only and does not replace professional legal advice. If you are unsure whether you may use EA Budak Ubat in your country, consult your legal advisor.*
