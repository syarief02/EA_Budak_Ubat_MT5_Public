"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const GITHUB_LINK = "https://github.com/syarief02/MathEdge-Pro";
const DOWNLOAD_MT4 = "/downloads/MathEdge Pro v1.1 - MT4.ex4";

const FEATURES = [
    { icon: "📐", title: "Math-Based Strategy", desc: "Uses daily OHLC levels and net change calculations to determine directional bias — no indicators, pure math." },
    { icon: "📊", title: "US Index Specialist", desc: "Designed specifically for US30 and NAS100 trading with NY session timing." },
    { icon: "🎯", title: "3-Trade Sequence", desc: "Executes a strict T1 → T2 → T3 pending order sequence, all sharing a unified take profit target." },
    { icon: "⏰", title: "NY Session Timing", desc: "Locks levels at 18:00 NY time and trades until 15:29 the next day. Fully DST-aware." },
    { icon: "📈", title: "On-Chart Dashboard", desc: "Live panel showing account info, bias, levels, order status, and expiry countdown." },
    { icon: "🛡️", title: "Smart Risk Control", desc: "Fixed lots or dynamic risk-percent sizing, spread filter, and optional emergency stop loss." },
    { icon: "🔧", title: "Symbol Whitelist", desc: "Restrict the EA to approved symbols only, with configurable CSV list for broker variants." },
    { icon: "📉", title: "Auto Cleanup", desc: "Automatically cancels unfilled pending orders after the trading window closes." },
];

const SETTINGS = [
    { name: "MagicNumber", def: "260128", desc: "Unique ID for this EA's orders" },
    { name: "Lots", def: "0.10", desc: "Fixed lot size per trade" },
    { name: "UseRiskPercent", def: "false", desc: "Calculate lots dynamically based on RiskPercent" },
    { name: "RiskPercent", def: "1.0", desc: "% of free margin risked per trade" },
    { name: "MaxSpreadPoints", def: "300", desc: "Orders skipped if spread exceeds this value" },
    { name: "PlacePendingOrders", def: "true", desc: "Place pending orders at calculated levels" },
    { name: "CancelPendingsAfterWindow", def: "true", desc: "Cancel unfilled pendings after window closes" },
    { name: "CloseOpenAtWindowEnd", def: "false", desc: "Close open positions when window ends" },
    { name: "EmergencySL_Points", def: "0", desc: "Hard stop-loss in points (0 = disabled)" },
    { name: "DrawLevels", def: "true", desc: "Draw PRV, CV, H, L, TP lines on chart" },
    { name: "ShowDashboard", def: "true", desc: "Display live info panel on chart" },
];

const FAQS = [
    { q: "What instruments does it trade?", a: "US30 and NAS100 (and broker variants like US30m, NAS100.cash). Add your broker's exact symbol name to AllowedSymbolsCSV if needed." },
    { q: "Does it need a specific timeframe?", a: "No — the EA is timeframe-independent. It uses daily OHLC data calculated from M1 bars at NY session boundaries." },
    { q: "Why aren't T2 and T3 appearing?", a: "T2 and T3 only place after T1 is filled — this is by design. T1 acts as the activation trade." },
    { q: "My levels don't match TradingView", a: "Toggle UseCustomNYDailyOHLC between true and false. Your broker's D1 candle boundaries may differ from NY 18:00 boundaries." },
    { q: "Does it work on forex pairs?", a: "No. The strategy is specifically designed for US index math. Using it on forex would produce meaningless levels." },
    { q: "Is there a stop loss?", a: "The core strategy does not define a stop loss. Set EmergencySL_Points > 0 for a safety net if desired." },
];

export default function MathEdgeProPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="nav-brand">EA Budak Ubat</Link>
                    <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
                        <li><Link href="/" onClick={() => setMobileNavOpen(false)}>← All Products</Link></li>
                        <li><a href="#strategy" onClick={() => setMobileNavOpen(false)}>Strategy</a></li>
                        <li><a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a></li>
                        <li><a href="#installation" onClick={() => setMobileNavOpen(false)}>Install</a></li>
                        <li><a href="#settings" onClick={() => setMobileNavOpen(false)}>Settings</a></li>
                        <li><a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a></li>
                        <li><a href={GITHUB_LINK} className="nav-cta" target="_blank">⭐ GitHub</a></li>
                    </ul>
                    <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        {mobileNavOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero mathedge-hero" id="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-mathedge-1"></div>
                <div className="hero-glow hero-glow-mathedge-2"></div>
                <div className="hero-content">
                    <div className="hero-badge mathedge-badge">
                        <span className="hero-badge-dot mathedge-dot"></span>
                        MT4 · US30 · NAS100
                    </div>
                    <h1>
                        <span className="mathedge-gradient-text">MathEdge Pro</span>
                    </h1>
                    <p className="hero-subtitle">
                        Automated math-based index trading for MetaTrader 4. Calculates daily levels,
                        determines bias, and executes a strict 3-trade pending order sequence — fully automated.
                    </p>
                    <div className="hero-actions">
                        <a href={DOWNLOAD_MT4} download className="btn btn-mathedge-primary">⬇️ Download MT4</a>
                        <a href={GITHUB_LINK} className="btn btn-secondary" target="_blank">⭐ GitHub</a>
                    </div>
                    <p className="hero-note">
                        <strong>Open Source</strong> — Free to use. Expires 2026-03-28. By Syarief Azman.
                    </p>
                </div>
            </section>

            {/* STRATEGY */}
            <section id="strategy" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Strategy</span>
                        <h2>How It Works</h2>
                        <p>A rules-based mathematical approach to US index trading.</p>
                    </div>
                    <div className="flow-container">
                        {[
                            { title: "Lock Daily Levels", desc: "At 18:00 New York time, the EA reads the previous completed NY day's OHLC data and the day-before-yesterday's close (PRV). These values are locked for the session." },
                            { title: "Calculate Bias", desc: "Net Change = CV − PRV. If positive → Buy-only day. If negative → Sell-only day. If zero → No trades. Opposite-direction trades are never allowed." },
                            { title: "T1: Activation Trade", desc: "A pending order is placed at the PRV level. This is the activation trade — T2 and T3 are only placed after T1 fills." },
                            { title: "T2 & T3: Follow-Up Entries", desc: "After T1 fills: T2 enters at the extreme level (Low for buys, High for sells) and T3 enters at the CV level." },
                            { title: "Unified Take Profit", desc: "All trades share a single TP: CV + Net Change. If bearish, the TP projects downward automatically." },
                            { title: "Window Closes", desc: "At 15:29 NY the next day, the trading window closes. Unfilled pending orders are cancelled automatically." },
                        ].map((step, i) => (
                            <div key={i} className="flow-step animate-in">
                                <div className="flow-line">
                                    <div className="flow-number mathedge-flow-number">{i + 1}</div>
                                </div>
                                <div className="flow-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* KEY CONCEPTS TABLE */}
                    <div className="animate-in" style={{ marginTop: 40 }}>
                        <div className="glass-card">
                            <h3 style={{ marginBottom: 16 }}>Key Levels</h3>
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead>
                                        <tr><th>Symbol</th><th>Meaning</th><th>Chart Color</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td><strong>PRV</strong></td><td>Previous Reference Value (2 days ago close)</td><td>🟠 Orange</td></tr>
                                        <tr><td><strong>CV</strong></td><td>Closing Value (yesterday&apos;s close)</td><td>🔵 Cyan</td></tr>
                                        <tr><td><strong>H</strong></td><td>Daily High</td><td>🔴 Red</td></tr>
                                        <tr><td><strong>L</strong></td><td>Daily Low</td><td>🟢 Green</td></tr>
                                        <tr><td><strong>TP</strong></td><td>Take Profit = CV + Net Change</td><td>🟡 Yellow</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Capabilities</span>
                        <h2>Key Features</h2>
                        <p>Precision index trading with mathematical edge.</p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-icon mathedge-feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Getting Started</span>
                        <h2>Installation Guide</h2>
                        <p>Get MathEdge Pro running on your MT4 terminal.</p>
                    </div>
                    <div className="animate-in" style={{ background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-glass)" }}>
                        <div style={{ display: "grid", gap: 24, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                            <div>
                                <strong style={{ color: "var(--accent-red)" }}>1. Download the EA</strong>
                                <p style={{ marginTop: 8 }}>
                                    Download <code>MathEdge Pro v1.1 - MT4.ex4</code> using the button above,
                                    or get the source from <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>GitHub</a> and compile it yourself in MetaEditor.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-red)" }}>2. Install in MetaTrader 4</strong>
                                <p style={{ marginTop: 8 }}>
                                    Open MT4 → <code>File → Open Data Folder</code>. Place the <code>.ex4</code> file in <code>MQL4/Experts/</code>. Restart MT4 or right-click the Navigator panel and select Refresh.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-red)" }}>3. Attach to Chart</strong>
                                <p style={{ marginTop: 8 }}>
                                    Open a <strong>US30</strong> or <strong>NAS100</strong> chart (any timeframe — the EA is timeframe-independent).
                                    Drag MathEdge Pro onto the chart. In the <strong>Common</strong> tab, enable <strong>Allow live trading</strong>. No DLL imports required.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-red)" }}>4. Configure Inputs</strong>
                                <p style={{ marginTop: 8 }}>
                                    Set your <code>Lots</code> or enable <code>UseRiskPercent</code>. If your broker uses a different symbol name (e.g. <code>US30m</code>, <code>NAS100.cash</code>), add it to <code>AllowedSymbolsCSV</code>.
                                    Set <code>DrawLevels = true</code> and <code>ShowDashboard = true</code> to verify levels against TradingView.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-red)" }}>5. Start on Demo</strong>
                                <p style={{ marginTop: 8 }}>
                                    Always test on a <strong>demo account</strong> first. Ensure the <strong>AutoTrading</strong> button is ON (green). The EA will start at the next 18:00 NY session.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SETTINGS */}
            <section id="settings">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Configuration</span>
                        <h2>EA Settings</h2>
                        <p>All parameters are adjustable from the EA input dialog.</p>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card">
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead>
                                        <tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
                                    </thead>
                                    <tbody>
                                        {SETTINGS.map((s, i) => (
                                            <tr key={i}>
                                                <td><code>{s.name}</code></td>
                                                <td><code>{s.def}</code></td>
                                                <td>{s.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TROUBLESHOOTING */}
            <section style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Help</span>
                        <h2>Troubleshooting</h2>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card">
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead>
                                        <tr><th>Problem</th><th>Solution</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>EA not trading</td><td>Check that AutoTrading is ON and the symbol matches the whitelist</td></tr>
                                        <tr><td>&quot;Symbol not allowed&quot;</td><td>Add your broker&apos;s symbol name to AllowedSymbolsCSV</td></tr>
                                        <tr><td>Levels differ from TradingView</td><td>Toggle UseCustomNYDailyOHLC — broker D1 boundaries may differ from NY 18:00</td></tr>
                                        <tr><td>Orders skipped (spread)</td><td>Spread exceeds MaxSpreadPoints — wait for lower spread or increase the limit</td></tr>
                                        <tr><td>T2/T3 not appearing</td><td>T2 and T3 only place after T1 fills — this is by design</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RISK WARNING */}
            <section className="risk-section">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">⚠️ Important</span>
                        <h2>Risk Disclaimer</h2>
                        <p>Please understand the risks before using MathEdge Pro.</p>
                    </div>
                    <div className="risk-grid animate-in">
                        {[
                            { icon: "🧪", title: "Demo First", desc: "Always test on a demo account before using real money" },
                            { icon: "📉", title: "No Guarantees", desc: "Past performance does not guarantee future results" },
                            { icon: "📊", title: "Index Volatility", desc: "US30 and NAS100 are highly volatile — use appropriate position sizing" },
                            { icon: "💰", title: "No SL by Default", desc: "The strategy has no built-in SL — set EmergencySL_Points for safety" },
                            { icon: "⏰", title: "Session Dependent", desc: "The EA relies on NY session timing — ensure your broker's time aligns correctly" },
                            { icon: "👀", title: "Monitor Daily", desc: "Verify levels match your reference source, especially initially" },
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

            {/* FAQ */}
            <section id="faq" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label mathedge-label">Support</span>
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-list animate-in">
                        {FAQS.map((faq, i) => (
                            <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q}
                                    <span className="faq-chevron">▼</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <h3 className="footer-brand mathedge-footer-brand">MathEdge Pro</h3>
                            <p className="footer-desc">
                                Automated math-based US index trading for MetaTrader 4. Open source by Syarief Azman.
                            </p>
                            <div className="social-links">
                                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                                <a href={GITHUB_LINK} className="social-link" target="_blank" title="GitHub">🐙</a>
                                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
                            </div>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#strategy">Strategy</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#installation">Installation</a></li>
                                <li><a href="#settings">Settings</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <ul className="footer-links">
                                <li><a href={GITHUB_LINK} target="_blank">GitHub Repository</a></li>
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><Link href="/">← Back to All Products</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} MathEdge Pro by Syarief Azman. Open Source — MIT License.</p>
                        <p className="footer-disclaimer">
                            This EA is for educational and testing purposes only. Trading indices involves significant risk. Always test on a demo account first. You are solely responsible for all trading outcomes.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
