"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PRODUCTS = [
    {
        name: "EA Budak Ubat", slug: "ea-budak-ubat", icon: "📊", version: "v1.62",
        strategy: "Grid Martingale", platforms: "MT4, MT5", bestFor: "Ranging pairs, M5",
        license: "MIT + Paid Full", expiry: "2026-04-28",
        description: "A grid-based martingale EA with 4 analysis methods (Classic Candle, SMA20, Alligator, Ichimoku), AutoConfig AI, hedging support, and configurable time filters. Designed for ranging currency pairs on the M5 timeframe.",
        howItWorks: [
            { title: "Tick Received", desc: "Updates chart display, checks time filter (StartTime–StopTime)." },
            { title: "Execution Mode", desc: "Every Tick = instant logic. Every New Bar = waits for candle close." },
            { title: "Entry Signal", desc: "If no positions exist, evaluates selected Analysis Method + RSI H1 filter (Buy: RSI < 70, Sell: RSI > 30)." },
            { title: "Grid Layering", desc: "If positions exist and GridTrading is ON, checks distance from last position. Opens new position: Lots × Multiplier^(layer count)." },
            { title: "TP Modification", desc: "All positions updated to weighted average entry price (break-even) + configured TP pips." },
            { title: "Stop Loss", desc: "If enabled, calculated from first entry price of the basket." },
        ],
        params: [
            { name: "Execution_Mode", def: "on Every New Bar", desc: "Every Tick or Every New Bar" },
            { name: "Method", def: "Ichimoku", desc: "Classic Candle, SMA20, Alligator, Ichimoku" },
            { name: "Lots", def: "0.01", desc: "Initial lot size" },
            { name: "GridTrading", def: "true", desc: "Enable grid martingale layering" },
            { name: "MartingaleMultiplier", def: "1.3", desc: "Lot multiplier per grid layer" },
            { name: "TakeProfit", def: "25.0", desc: "TP in pips from weighted average" },
            { name: "StopLoss", def: "0", desc: "SL in pips (0 = disabled)" },
            { name: "minDistance", def: "4", desc: "Min pip distance between grid orders" },
            { name: "distanceIncrement", def: "2.0", desc: "Extra pips per successive layer" },
            { name: "AutoConfig", def: "false", desc: "Enable AutoConfig AI for dynamic params" },
            { name: "Hedging", def: "false", desc: "Allow simultaneous buy/sell baskets" },
            { name: "MagicNumber", def: "123456", desc: "Unique trade identifier" },
        ],
        tips: [
            "Use a cent account to limit exposure",
            "Minimum $100 capital for 0.01 starting lot",
            "Use maximum leverage to reduce margin per trade",
            "Choose ranging/low-volatility pairs",
            "Set MaxLot to prevent runaway lot sizes",
            "Consider enabling StopLoss for protection",
            "Use a VPS for 24/7 operation",
        ],
        faqs: [
            { q: "Can I use on multiple charts?", a: "Yes — use a different MagicNumber per chart." },
            { q: "MT4 vs MT5 difference?", a: "Identical trading logic, only underlying API differs." },
            { q: "Best pairs?", a: "Ranging pairs with low spread. Avoid trending/exotic pairs." },
            { q: "Can I use on XAUUSD?", a: "Possible but very risky. Use cent account with conservative settings." },
            { q: "How to get authorized?", a: "Register through a broker partner link, send account number to @SyariefAzman on Telegram." },
        ],
    },
    {
        name: "GoldMind AI", slug: "goldmind-ai", icon: "🤖", version: "v1.00",
        strategy: "AI-Powered Signals", platforms: "MT5", bestFor: "XAUUSD (Gold)",
        license: "Open Source", expiry: "2026-04-28",
        description: "Uses OpenAI ChatGPT to analyze gold (XAUUSD) price charts and automatically place trades in MetaTrader 5. Runs entirely on your computer with a Python FastAPI backend.",
        howItWorks: [
            { title: "EA Collects Data", desc: "Every refresh interval, sends OHLC candle data to local Python server." },
            { title: "Server Forwards to AI", desc: "FastAPI backend sends price data to OpenAI ChatGPT with gold analysis prompt." },
            { title: "AI Analyzes Market", desc: "ChatGPT responds with JSON: buy stop / sell stop / no trade + entry, SL, TP." },
            { title: "Signal Validation", desc: "6 safety filters: spread, stop level, entry price, SL direction, R:R ratio, lot size." },
            { title: "Order Placement", desc: "Pending order placed. Cancelled after 4 hours if unfilled." },
            { title: "Cost Optimization", desc: "While position is open, skips signal requests to save API costs." },
        ],
        params: [
            { name: "BackendURL", def: "http://localhost:8000", desc: "Local Python server address" },
            { name: "MaxSpreadPoints", def: "50", desc: "Max allowed spread in points" },
            { name: "RiskPercent", def: "1.0", desc: "% of equity risked per trade" },
            { name: "MinRR", def: "1.5", desc: "Min reward-to-risk ratio" },
            { name: "Timeframe", def: "PERIOD_M15", desc: "Candle timeframe for AI data" },
            { name: "CandleCount", def: "100", desc: "Historical candles sent to AI" },
            { name: "RefreshHours", def: "4.0", desc: "Hours between signal requests" },
            { name: "MagicNumber", def: "777", desc: "Unique trade identifier" },
        ],
        tips: [
            "Requires Python 3.10+, MetaTrader 5, and OpenAI API Key",
            "Each signal costs ~$0.01–$0.05 in API fees",
            "XAUUSD only — other symbols produce unreliable signals",
            "Must allow WebRequest for http://127.0.0.1:8000 in MT5",
            "Keep the Python server terminal open at all times",
            "Always test on demo first — AI predictions can be wrong",
        ],
        faqs: [
            { q: "Does this guarantee profits?", a: "No. AI can make wrong predictions. Always demo first." },
            { q: "How much does it cost?", a: "~$0.01–$0.02 per signal in OpenAI fees. Stops polling while position is open." },
            { q: "Can I use on other symbols?", a: "No — the prompt is designed specifically for gold." },
            { q: "Is my API key safe?", a: "Yes — stays in local .env file, never sent elsewhere." },
            { q: "Can I change AI model?", a: "Yes — edit OPENAI_MODEL in backend/.env." },
        ],
    },
    {
        name: "BracketBlitz EA", slug: "bracketblitz", icon: "⚡", version: "v1.00",
        strategy: "OCO Bracket Breakout", platforms: "MT4, MT5", bestFor: "All instruments, News",
        license: "Open Source", expiry: "2026-04-28",
        description: "Rapid-fire OCO bracket orders — Buy Stop + Sell Stop straddling the market, auto-refreshed every 30 seconds. Catches breakouts without predicting direction. Works on any instrument.",
        howItWorks: [
            { title: "Bracket Placement", desc: "Buy Stop at Ask + GapPips, Sell Stop at Bid − GapPips." },
            { title: "OCO Execution", desc: "One side triggers → opposite is instantly deleted." },
            { title: "Fresh Entries", desc: "If neither triggers within 30 seconds → delete both → re-place at new price." },
            { title: "Trailing Protection", desc: "Once in trade, SL follows price automatically (never moves back)." },
        ],
        params: [
            { name: "LotSize", def: "0.01", desc: "Position size per bracket order" },
            { name: "GapPips", def: "50", desc: "Distance from price for pending orders" },
            { name: "StopLossPips", def: "50", desc: "Stop loss distance from entry" },
            { name: "TrailingStopPips", def: "20", desc: "Trailing stop distance" },
            { name: "OrderLifetimeSec", def: "30", desc: "Seconds before orders refresh" },
            { name: "MagicNumber", def: "123456", desc: "Unique trade identifier" },
        ],
        tips: [
            "Works on forex, gold, indices, crypto CFDs",
            "No Take Profit — relies on trailing stop to exit",
            "Designed for volatile / breakout conditions",
            "Preset: Scalping (Gap=10, SL=15, Trail=8, Lifetime=15s)",
            "Preset: Swing (Gap=100, SL=80, Trail=40, Lifetime=120s)",
            "Preset: News (Gap=30, SL=50, Trail=20, Lifetime=10s)",
        ],
        faqs: [
            { q: "Does it work on all pairs?", a: "Yes — any MetaTrader instrument. Pip calc auto-adjusts." },
            { q: "Does it set a Take Profit?", a: "No — uses trailing stop to ride extended breakouts." },
            { q: "What about news events?", a: "Designed for breakout-capture. Beware wider spreads." },
            { q: "Can I use alongside manual trading?", a: "Yes — only manages its own MagicNumber orders." },
        ],
    },
    {
        name: "MathEdge Pro", slug: "mathedge-pro", icon: "📐", version: "v1.1",
        strategy: "Math-Based Levels", platforms: "MT4, MT5", bestFor: "US30, NAS100",
        license: "Open Source", expiry: "2026-04-28",
        description: "Automated math-based index trading. Calculates daily OHLC levels at NY session boundaries, determines directional bias from net change, and executes a strict 3-trade pending order sequence.",
        howItWorks: [
            { title: "Lock Daily Levels", desc: "At 18:00 NY time, reads PRV (2 days ago close), CV (yesterday close), H (high), L (low)." },
            { title: "Calculate Bias", desc: "Net Change = CV − PRV. Positive → Buy. Negative → Sell. Zero → No trades." },
            { title: "T1: Activation Trade", desc: "Pending order at PRV level. T2/T3 only place after T1 fills." },
            { title: "T2 & T3: Follow-Up", desc: "T2 enters at extreme (Low/High). T3 enters at CV." },
            { title: "Unified Take Profit", desc: "All trades share TP = CV + Net Change." },
            { title: "Window Closes", desc: "At 15:29 NY, unfilled pending orders cancelled automatically." },
        ],
        params: [
            { name: "MagicNumber", def: "260128", desc: "Unique trade identifier" },
            { name: "Lots", def: "0.10", desc: "Fixed lot size per trade" },
            { name: "UseRiskPercent", def: "false", desc: "Dynamic lot sizing" },
            { name: "RiskPercent", def: "1.0", desc: "% of margin risked" },
            { name: "MaxSpreadPoints", def: "300", desc: "Skip if spread exceeds this" },
            { name: "EmergencySL_Points", def: "0", desc: "Hard stop-loss (0 = disabled)" },
            { name: "DrawLevels", def: "true", desc: "Draw chart level lines" },
            { name: "ShowDashboard", def: "true", desc: "Display live info panel" },
        ],
        tips: [
            "US30 and NAS100 only — does not work on forex",
            "Timeframe-independent — uses daily OHLC internally",
            "No default SL — set EmergencySL_Points for safety",
            "Key levels: PRV=Orange, CV=Cyan, H=Red, L=Green, TP=Yellow",
            "Add broker symbol name to AllowedSymbolsCSV if needed",
            "Fully DST-aware for NY session timing",
        ],
        faqs: [
            { q: "What instruments?", a: "US30 and NAS100 (and variants like US30m, NAS100.cash)." },
            { q: "Need specific timeframe?", a: "No — timeframe-independent." },
            { q: "Why no T2/T3?", a: "They only place after T1 fills — by design." },
            { q: "Work on forex?", a: "No — the math is specific to US indices." },
            { q: "Is there a stop loss?", a: "Not by default. Set EmergencySL_Points > 0." },
        ],
    },
    {
        name: "Aligator Gozaimasu", slug: "aligator-gozaimasu", icon: "🐊", version: "v1.06",
        strategy: "MTF Alligator Trend", platforms: "MT4, MT5", bestFor: "Trending pairs",
        license: "Open Source", expiry: "2026-04-28",
        description: "Trades based on Bill Williams Alligator + Awesome Oscillator + RSI + Stochastic, confirmed across up to 4 timeframes. Buys uptrends, sells downtrends. Auto-compounding and martingale recovery.",
        howItWorks: [
            { title: "Buy Signal (all TFs)", desc: "Alligator: Lips > Teeth > Jaw · AO > 0 · Stochastic: Main < 80 & Main > Signal · RSI < 70" },
            { title: "Sell Signal (all TFs)", desc: "Alligator: Lips < Teeth < Jaw · AO < 0 · Stochastic: Main > 20 & Main < Signal · RSI > 30" },
            { title: "Entry Timeframe", desc: "On lowest TF, checks price vs Jaw instead of full Alligator alignment." },
            { title: "Close on Reversal", desc: "Automatically closes opposite trades when reversal signal appears." },
        ],
        params: [
            { name: "Lots", def: "0.01", desc: "Base lot size" },
            { name: "Takeprofit_Pips", def: "50", desc: "TP distance in pips" },
            { name: "Stoploss_Pips", def: "50", desc: "SL distance in pips" },
            { name: "Close_On_Reversal", def: "true", desc: "Close opposite on reversal" },
            { name: "MultiTimeFrame_Mode", def: "CC (Intradayz)", desc: "MTF mode" },
            { name: "AutoCompounding_Mode", def: "A (Off)", desc: "Auto lot-sizing" },
            { name: "LotMultiplierOnLoss", def: "2.25", desc: "Martingale multiplier" },
            { name: "MaxLots", def: "999", desc: "Maximum lot cap" },
            { name: "TrailingStop", def: "false", desc: "Enable trailing stop" },
        ],
        tips: [
            "MTF Modes: AA=No MTF, BB=Scalperz (H1→M1), CC=Intradayz (H4→M5), DD=Swingz (D1→M15), EE=Positionz (W1→H1)",
            "Chart timeframe doesn't matter — EA fetches data internally",
            "Best on EURUSD, GBPUSD, USDJPY, XAUUSD, indices",
            "Martingale 2.25x = ~11x lot after 3 losses — set MaxLots!",
            "6 auto-compounding modes available",
            "Supports email and push notifications",
        ],
        faqs: [
            { q: "Why isn't the EA trading?", a: "All 4 TFs × 4 indicators must agree. May take hours/days for a signal — quality over quantity." },
            { q: "Is martingale safe?", a: "Risky. 2.25x after 3 losses = ~11x base lot. Always cap with MaxLots." },
            { q: "Can I backtest?", a: "Yes. Strategy Tester (Ctrl+R). MTF modes need history for all timeframes." },
        ],
    },
    {
        name: "Encik Moku", slug: "encik-moku", icon: "🏯", version: "v1.06",
        strategy: "MTF Ichimoku Trend", platforms: "MT4, MT5", bestFor: "Trending pairs",
        license: "Open Source", expiry: "2026-04-28",
        description: "Trades based on Ichimoku Kinko Hyo + RSI + Stochastic, confirmed across up to 4 timeframes. Buys above the Kumo cloud, sells below. Sister EA to Aligator Gozaimasu with identical architecture.",
        howItWorks: [
            { title: "Buy Signal (all TFs)", desc: "Ichimoku: Tenkan > Senkou A & B & Kijun (above cloud) · Stochastic: Main < 80 & Main > Signal · RSI < 70" },
            { title: "Sell Signal (all TFs)", desc: "Ichimoku: Tenkan < Senkou A & B & Kijun (below cloud) · Stochastic: Main > 20 & Main < Signal · RSI > 30" },
            { title: "Close on Reversal", desc: "Closes opposite trades when reversal signal appears." },
            { title: "Kumo Cloud", desc: "Senkou Span A & B form the cloud. Price above = bullish, below = bearish." },
        ],
        params: [
            { name: "Lots", def: "0.01", desc: "Base lot size" },
            { name: "Takeprofit_Pips", def: "50", desc: "TP distance in pips" },
            { name: "Stoploss_Pips", def: "50", desc: "SL distance in pips" },
            { name: "Close_On_Reversal", def: "true", desc: "Close opposite on reversal" },
            { name: "MultiTimeFrame_Mode", def: "CC (Intradayz)", desc: "MTF mode" },
            { name: "AutoCompounding_Mode", def: "A (Off)", desc: "Auto lot-sizing" },
            { name: "LotMultiplierOnLoss", def: "2.25", desc: "Martingale multiplier" },
            { name: "MaxLots", def: "999", desc: "Maximum lot cap" },
            { name: "TrailingStop", def: "false", desc: "Enable trailing stop" },
        ],
        tips: [
            "Ichimoku settings: Tenkan-sen (9), Kijun-sen (26), Senkou Span (52)",
            "Same MTF modes as Aligator Gozaimasu",
            "Best on trending pairs — EURUSD, GBPUSD, USDJPY, XAUUSD",
            "Chart timeframe doesn't matter",
            "Sister EA to Aligator Gozaimasu — same architecture, different indicator",
        ],
        faqs: [
            { q: "Difference from Aligator Gozaimasu?", a: "Same architecture, but uses Ichimoku instead of Bill Williams Alligator." },
            { q: "What is the Kumo cloud?", a: "Formed by Senkou Span A & B. Price above = bullish, below = bearish." },
            { q: "Why no trades for hours?", a: "All TFs × 3 indicators must agree. Strict by design." },
        ],
    },
];

const INSTALL_MT4 = [
    "Download the .ex4 file using the link on the product page",
    "Open MT4 → File → Open Data Folder → navigate to MQL4/Experts/",
    "Copy the .ex4 file into this folder",
    "Restart MT4 (or right-click Navigator → Refresh)",
    "Drag the EA onto a chart",
    "Common tab → check Allow live trading",
    "Configure parameters in the Inputs tab → Click OK",
    "Make sure AutoTrading button in toolbar is green",
];

const INSTALL_MT5 = [
    "Download the .ex5 file using the link on the product page",
    "Open MT5 → File → Open Data Folder → navigate to MQL5/Experts/",
    "Copy the .ex5 file into this folder",
    "Restart MT5 (or right-click Navigator → Refresh)",
    "Drag the EA onto a chart",
    "Common tab → check Allow Algo Trading",
    "Configure parameters in the Inputs tab → Click OK",
    "Make sure Algo Trading button in toolbar is green",
];

const BROKERS = [
    { name: "FISG", url: "https://my.fisg.com/u/CTt0Rd", id: "CTt0Rd", support: "support@fisg.com" },
    { name: "CXM", url: "https://secure.cxmys.com/links/go/5062", id: "5062", support: "support@cxm.com" },
    { name: "FBS", url: "https://fbs.partners?ibl=154319&ibp=588292", id: "588292", support: "support@fbs.com" },
    { name: "HeadWay", url: "https://headway.partners/user/signup?hwp=516d6b", id: "1021290", support: "care@hw.site" },
    { name: "Markets4you", url: "https://account.markets4you.online/en/user-registration/?affid=4hcnvz4", id: "4hcnvz4", support: "info@markets4you.com" },
    { name: "OctaFx", url: "https://my.octafxmy.net/change-partner-request/?partner=246630", id: "246630", support: "support@octafx.com" },
    { name: "InstaForex", url: "https://www.instaforex.com?x=KUSD", id: "KUSD", support: "support@instaforex.com" },
    { name: "LiteForex", url: "https://www.litefinance.com/?uid=805161060", id: "805161060", support: "clients@litefinance.com" },
    { name: "RoboForex", url: "https://my.roboforex.com/en/?a=mxyg", id: "mxyg", support: "info@roboforex.com" },
    { name: "XM", url: "https://clicks.pipaffiliates.com/c?c=862266&l=en&p=1", id: "A1202120 / HVVR7", support: "XM Support" },
    { name: "Valetax", url: "https://ma.valetax.com/p/1939088", id: "1939088", support: "contact@valetax.com" },
];

export default function GuidePage() {
    const [activeProduct, setActiveProduct] = useState(null);
    const [openFaqs, setOpenFaqs] = useState({});
    const [activeInstall, setActiveInstall] = useState("mt4");
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const toggleFaq = (productIdx, faqIdx) => {
        const key = `${productIdx}-${faqIdx}`;
        setOpenFaqs((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="nav-brand">EA Budak Ubat</Link>
                    <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
                        <li><Link href="/" onClick={() => setMobileNavOpen(false)}>← All Products</Link></li>
                        <li><a href="#overview" onClick={() => setMobileNavOpen(false)}>Overview</a></li>
                        <li><a href="#products" onClick={() => setMobileNavOpen(false)}>Products</a></li>
                        <li><a href="#installation" onClick={() => setMobileNavOpen(false)}>Install</a></li>
                        <li><a href="#brokers" onClick={() => setMobileNavOpen(false)}>Brokers</a></li>
                        <li><a href="#risk" onClick={() => setMobileNavOpen(false)}>Risk</a></li>
                        <li><a href="https://t.me/SyariefAzman" className="nav-cta" target="_blank">💬 Telegram</a></li>
                    </ul>
                    <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        {mobileNavOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero catalog-hero" id="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        Complete Documentation
                    </div>
                    <h1><span className="gradient-text">Comprehensive Guide</span></h1>
                    <p className="hero-subtitle">
                        Everything you need to know about all 6 Expert Advisors and trading tools
                        by Syarief Azman — strategies, parameters, installation, and FAQs.
                    </p>
                    <div className="hero-actions">
                        <a href="#overview" className="btn btn-primary" style={{ animation: "none" }}>📖 Start Reading</a>
                        <a href="#products" className="btn btn-secondary">🔽 Jump to Products</a>
                    </div>
                </div>
            </section>

            {/* OVERVIEW */}
            <section id="overview">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Overview</span>
                        <h2>Choose the Right Tool</h2>
                        <p>6 trading tools, each designed for a different strategy and market condition.</p>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card">
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Strategy</th>
                                            <th>Platform</th>
                                            <th>Best For</th>
                                            <th>Version</th>
                                            <th>Expiry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PRODUCTS.map((p, i) => (
                                            <tr key={i} style={{ cursor: "pointer" }} onClick={() => document.getElementById(`product-${i}`)?.scrollIntoView({ behavior: "smooth" })}>
                                                <td style={{ fontSize: "1.3rem" }}>{p.icon}</td>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.strategy}</td>
                                                <td><code>{p.platforms}</code></td>
                                                <td>{p.bestFor}</td>
                                                <td><code>{p.version}</code></td>
                                                <td><code>{p.expiry}</code></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* DECISION TREE */}
                    <div className="animate-in" style={{ marginTop: 40 }}>
                        <div className="glass-card" style={{ padding: "32px" }}>
                            <h3 style={{ marginBottom: 20, textAlign: "center" }}>🎯 Which EA Should I Use?</h3>
                            <div style={{ display: "grid", gap: 12, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                                <div style={{ padding: "12px 16px", background: "rgba(59,130,246,0.05)", borderRadius: 8, borderLeft: "3px solid var(--accent-blue)" }}>
                                    📊 <strong>Ranging pairs?</strong> → <Link href="/ea-budak-ubat" style={{ color: "var(--accent-cyan)" }}>EA Budak Ubat</Link> (Grid Martingale)
                                </div>
                                <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.05)", borderRadius: 8, borderLeft: "3px solid var(--accent-amber)" }}>
                                    🤖 <strong>Gold (XAUUSD)?</strong> → <Link href="/goldmind-ai" style={{ color: "var(--accent-amber)" }}>GoldMind AI</Link> (AI-Powered)
                                </div>
                                <div style={{ padding: "12px 16px", background: "rgba(16,185,129,0.05)", borderRadius: 8, borderLeft: "3px solid var(--accent-green)" }}>
                                    ⚡ <strong>News / Breakouts?</strong> → <Link href="/bracketblitz" style={{ color: "var(--accent-green)" }}>BracketBlitz EA</Link> (OCO Brackets)
                                </div>
                                <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.05)", borderRadius: 8, borderLeft: "3px solid var(--accent-red)" }}>
                                    📐 <strong>US30 / NAS100?</strong> → <Link href="/mathedge-pro" style={{ color: "var(--accent-red)" }}>MathEdge Pro</Link> (Math-Based)
                                </div>
                                <div style={{ padding: "12px 16px", background: "rgba(34,197,94,0.05)", borderRadius: 8, borderLeft: "3px solid #22c55e" }}>
                                    🐊 <strong>Trending + Alligator?</strong> → <Link href="/aligator-gozaimasu" style={{ color: "#22c55e" }}>Aligator Gozaimasu</Link> (MTF Trend)
                                </div>
                                <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.05)", borderRadius: 8, borderLeft: "3px solid var(--accent-amber)" }}>
                                    🏯 <strong>Trending + Ichimoku?</strong> → <Link href="/encik-moku" style={{ color: "var(--accent-amber)" }}>Encik Moku</Link> (MTF Trend)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section id="products">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Documentation</span>
                        <h2>Complete Product Guide</h2>
                        <p>Detailed documentation for every Expert Advisor. Click any product to expand.</p>
                    </div>

                    {PRODUCTS.map((product, pi) => (
                        <div key={pi} id={`product-${pi}`} className="animate-in" style={{ marginBottom: 32 }}>
                            {/* Product Header */}
                            <div
                                className="glass-card"
                                style={{ cursor: "pointer", padding: "24px 32px" }}
                                onClick={() => setActiveProduct(activeProduct === pi ? null : pi)}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <span style={{ fontSize: "2rem" }}>{product.icon}</span>
                                        <div>
                                            <h3 style={{ fontSize: "1.3rem", marginBottom: 4 }}>{product.name} <code style={{ fontSize: "0.75rem" }}>{product.version}</code></h3>
                                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{product.strategy} · {product.platforms} · {product.bestFor}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <Link href={`/${product.slug}`} style={{ color: "var(--accent-cyan)", fontSize: "0.85rem", textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>
                                            Visit Page →
                                        </Link>
                                        <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", transition: "transform 0.3s", transform: activeProduct === pi ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {activeProduct === pi && (
                                <div style={{ background: "var(--bg-secondary)", padding: "32px", borderRadius: "0 0 16px 16px", borderTop: "none" }}>
                                    {/* Description */}
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 32 }}>
                                        {product.description}
                                    </p>

                                    {/* How It Works */}
                                    <h4 style={{ marginBottom: 16, color: "var(--accent-cyan)" }}>⚙️ How It Works</h4>
                                    <div className="flow-container" style={{ marginBottom: 40 }}>
                                        {product.howItWorks.map((step, i) => (
                                            <div key={i} className="flow-step">
                                                <div className="flow-line">
                                                    <div className="flow-number">{i + 1}</div>
                                                </div>
                                                <div className="flow-content">
                                                    <h3>{step.title}</h3>
                                                    <p>{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Parameters */}
                                    <h4 style={{ marginBottom: 16, color: "var(--accent-cyan)" }}>🔧 Parameters</h4>
                                    <div className="glass-card" style={{ marginBottom: 40 }}>
                                        <div className="params-table-wrapper">
                                            <table className="params-table">
                                                <thead>
                                                    <tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
                                                </thead>
                                                <tbody>
                                                    {product.params.map((p, i) => (
                                                        <tr key={i}>
                                                            <td><code>{p.name}</code></td>
                                                            <td><code>{p.def}</code></td>
                                                            <td>{p.desc}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Tips */}
                                    <h4 style={{ marginBottom: 16, color: "var(--accent-cyan)" }}>💡 Tips & Notes</h4>
                                    <div style={{ display: "grid", gap: 8, marginBottom: 40 }}>
                                        {product.tips.map((tip, i) => (
                                            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 16px", background: "var(--bg-glass)", borderRadius: 8, border: "1px solid var(--border-glass)" }}>
                                                <span style={{ color: "var(--accent-green)", flexShrink: 0 }}>✓</span>
                                                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{tip}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* FAQ */}
                                    <h4 style={{ marginBottom: 16, color: "var(--accent-cyan)" }}>❓ FAQ</h4>
                                    <div className="faq-list">
                                        {product.faqs.map((faq, fi) => (
                                            <div key={fi} className={`faq-item ${openFaqs[`${pi}-${fi}`] ? "open" : ""}`}>
                                                <button className="faq-question" onClick={() => toggleFaq(pi, fi)}>
                                                    {faq.q}
                                                    <span className="faq-chevron">▼</span>
                                                </button>
                                                <div className="faq-answer"><p>{faq.a}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Getting Started</span>
                        <h2>General Installation Guide</h2>
                        <p>How to install any EA on MetaTrader 4 or MetaTrader 5.</p>
                    </div>
                    <div className="animate-in">
                        <div className="install-tabs">
                            <button className={`install-tab ${activeInstall === "mt4" ? "active" : ""}`} onClick={() => setActiveInstall("mt4")}>MetaTrader 4</button>
                            <button className={`install-tab ${activeInstall === "mt5" ? "active" : ""}`} onClick={() => setActiveInstall("mt5")}>MetaTrader 5</button>
                        </div>
                        <div className="install-steps glass-card">
                            {(activeInstall === "mt4" ? INSTALL_MT4 : INSTALL_MT5).map((step, i) => (
                                <div key={i} className="install-step">
                                    <span className="step-num">{i + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                            {activeInstall === "mt5" && (
                                <div className="install-note">
                                    <strong>⚠️ MT5 Note:</strong> Ensure your broker supports <strong>hedging accounts</strong> (not netting) for EAs that open multiple positions. For GoldMind AI, you must also <strong>Allow WebRequest</strong> for <code>http://127.0.0.1:8000</code> in Tools → Options → Expert Advisors.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* VPS */}
                    <div className="animate-in" style={{ marginTop: 48 }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            <h3 style={{ marginBottom: 16 }}>🖥️ Using a VPS (Recommended)</h3>
                            <p style={{ color: "var(--text-secondary)", marginBottom: 20, fontSize: "0.95rem" }}>
                                A VPS keeps your EA running 24/7 without relying on your PC. Essential for uninterrupted trading.
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                                {["24/7 Uptime", "No power outages", "Low latency", "Secure environment"].map((b, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                        <span style={{ color: "var(--accent-green)" }}>✓</span> {b}
                                    </div>
                                ))}
                            </div>
                            <a href="https://secure.gbnetwork.com/aff.php?aff=515" className="btn btn-accent" style={{ display: "inline-flex" }} target="_blank">
                                Order VPS from GB Network →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* BROKERS */}
            <section id="brokers">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Authorization</span>
                        <h2>Broker Partner Links</h2>
                        <p>Register through a partner broker to get permanent EA Budak Ubat authorization (no expiry). Use a <strong>cent account</strong>, <strong>maximum leverage</strong>, and a minimum deposit of <strong>$100 USD</strong>.</p>
                    </div>
                    <div className="broker-grid animate-in">
                        {BROKERS.map((b, i) => (
                            <a key={i} href={b.url} className="broker-card" target="_blank" rel="noopener noreferrer">
                                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                                    <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>ID: {b.id}</span>
                                    <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>Email: {b.support}</span>
                                </div>
                                <span className="arrow">→</span>
                            </a>
                        ))}
                    </div>
                    <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: 800, margin: "20px auto 0" }}>
                        Please select a broker that you have never registered with before. After registering, send your trading account number to <a href="https://t.me/SyariefAzman" style={{ color: "var(--accent-cyan)" }}>@SyariefAzman on Telegram</a>.
                        I will share the EA update file.
                    </p>
                </div>
            </section>

            {/* RISK MANAGEMENT */}
            <section id="risk" className="risk-section">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">⚠️ Important</span>
                        <h2>Risk Management Guide</h2>
                        <p>Automated trading carries significant risk. Follow these guidelines.</p>
                    </div>
                    <div className="risk-grid animate-in">
                        {[
                            { icon: "🏦", title: "Cent Account", desc: "Use a cent account to limit exposure" },
                            { icon: "💰", title: "Min $100 Capital", desc: "Minimum $100 (cent) for 0.01 starting lot" },
                            { icon: "⚡", title: "Max Leverage", desc: "Reduces margin usage per trade" },
                            { icon: "📉", title: "Right Pairs", desc: "Ranging for grid EAs, trending for trend EAs" },
                            { icon: "🎯", title: "Set MaxLot", desc: "Prevent runaway lot sizes" },
                            { icon: "🛡️", title: "Enable StopLoss", desc: "Additional protection layer" },
                            { icon: "🧪", title: "Demo First", desc: "Always test before going live" },
                            { icon: "👀", title: "Monitor Daily", desc: "Check your account even on VPS" },
                            { icon: "💸", title: "Withdraw Profits", desc: "Don't let the account grow unchecked" },
                        ].map((r, i) => (
                            <div key={i} className="risk-item">
                                <span className="risk-icon">{r.icon}</span>
                                <div>
                                    <strong>{r.title}</strong>
                                    <p>{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEGAL */}
            <section style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Legal</span>
                        <h2>Disclaimers</h2>
                    </div>
                    <div className="animate-in" style={{ maxWidth: 800, margin: "0 auto" }}>
                        <div className="glass-card" style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 16 }}><strong style={{ color: "var(--text-secondary)" }}>Risk Warning:</strong> Products traded on margin carry a high level of risk, and it is possible to lose all your capital. These products may not be suitable for everyone.</p>
                            <p style={{ marginBottom: 16 }}><strong style={{ color: "var(--text-secondary)" }}>Restricted Jurisdictions:</strong> EA Budak Ubat does not offer services to residents of the USA, Malaysia, EU, UK, North Korea, Myanmar, Iran, or other restricted countries.</p>
                            <p style={{ marginBottom: 16 }}><strong style={{ color: "var(--text-secondary)" }}>No Investment Advice:</strong> Nothing in these materials constitutes investment, financial, legal, or tax advice.</p>
                            <p style={{ marginBottom: 16 }}><strong style={{ color: "var(--text-secondary)" }}>Past Performance:</strong> Historical results are not indicative of future performance. Market conditions can change rapidly.</p>
                            <p><strong style={{ color: "var(--text-secondary)" }}>Automation Risks:</strong> Automated trading involves technology risks including connectivity, latency, slippage, and execution errors. You are responsible for monitoring your account.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">Connect</span>
                        <h2>Contact & Support</h2>
                    </div>
                    <div className="contact-grid animate-in">
                        {[
                            { icon: "💬", title: "Telegram", desc: "@SyariefAzman", url: "https://t.me/SyariefAzman" },
                            { icon: "📱", title: "WhatsApp", desc: "+60194961568", url: "https://wa.me/60194961568" },
                            { icon: "🐦", title: "Twitter/X", desc: "@SyariefAzman", url: "https://www.twitter.com/SyariefAzman" },
                            { icon: "📢", title: "Telegram Channel", desc: "t.me/EABudakUbat", url: "https://t.me/EABudakUbat" },
                            { icon: "📊", title: "MQL5 Signal", desc: "Signal Channel", url: "https://www.mql5.com/en/channels/eabudakubat" },
                        ].map((c, i) => (
                            <a key={i} href={c.url} className="contact-card" target="_blank" rel="noopener noreferrer">
                                <span className="contact-icon">{c.icon}</span>
                                <div>
                                    <strong>{c.title}</strong>
                                    <p>{c.desc}</p>
                                </div>
                                <span className="arrow">→</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <h3 className="footer-brand">EA Budak Ubat</h3>
                            <p className="footer-desc">
                                Professional trading tools and Expert Advisors for MetaTrader platforms by Syarief Azman.
                            </p>
                        </div>
                        <div>
                            <h4>Products</h4>
                            <ul className="footer-links">
                                {PRODUCTS.map((p, i) => (
                                    <li key={i}><Link href={`/${p.slug}`}>{p.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <ul className="footer-links">
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><a href="https://wa.me/60194961568" target="_blank">WhatsApp: +60194961568</a></li>
                                <li><a href="https://t.me/EABudakUbat" target="_blank">Channel: t.me/EABudakUbat</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
                        <p className="footer-disclaimer">
                            Risk warning: Trading on margin carries a high level of risk. Automated trading systems can result in significant losses. Past performance is not indicative of future results. Not available in restricted jurisdictions.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
