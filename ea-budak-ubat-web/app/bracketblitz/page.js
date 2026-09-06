"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AccountChecker from "@/app/components/AccountChecker";


const DOWNLOAD_MT4 = "https://github.com/syarief02/BracketBlitz-EA/raw/master/BracketBlitz%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/BracketBlitz-EA/raw/master/BracketBlitz%20-%20MT5%20-%2020260930.ex5";

const FEATURES = [
    { icon: "⚡", title: "Rapid-Fire Brackets", desc: "Continuously places Buy Stop + Sell Stop pending orders around the live price, straddling the market for instant breakout capture." },
    { icon: "🔄", title: "OCO Execution", desc: "One-Cancels-Other logic — when one side triggers, the opposite pending order is instantly deleted to keep exposure directional." },
    { icon: "⏱️", title: "Auto Refresh", desc: "Stale orders are deleted and re-placed at the new current price every 30 seconds (configurable), keeping entries razor-close to the action." },
    { icon: "📈", title: "Trailing Stop", desc: "Once in a trade, the stop loss automatically follows price movement, locking in profits as the breakout extends." },
    { icon: "📊", title: "Multi-Platform", desc: "Identical logic on both MetaTrader 4 and MetaTrader 5. Works on any instrument — forex, gold, indices, crypto CFDs." },
    { icon: "🎯", title: "Breakout Capture", desc: "Designed for volatile conditions and news events. Catches the first directional move without predicting direction." },
    { icon: "🛠️", title: "Fully Configurable", desc: "Tune every parameter — gap distance, stop loss, trailing stop, order lifetime, lot size, and magic number." },
    { icon: "🔒", title: "Isolated Trading", desc: "Only manages orders with its own MagicNumber. Never touches manual trades or orders from other EAs." },
];

const SETTINGS = [
    { name: "LotSize", type: "double", def: "0.01", desc: "Position size for each bracket order" },
    { name: "GapPips", type: "int", def: "50", desc: "Distance in pips from current price for pending orders" },
    { name: "StopLossPips", type: "int", def: "50", desc: "Stop loss distance in pips from entry price" },
    { name: "TrailingStopPips", type: "int", def: "20", desc: "Trailing stop distance in pips — follows price, never moves back" },
    { name: "OrderLifetimeSec", type: "int", def: "30", desc: "Seconds before stale pending orders are refreshed at new price" },
    { name: "MagicNumber", type: "int/long", def: "123456", desc: "Unique identifier — use different values for multi-chart setups" },
];

const PRESETS = [
    { name: "Scalping", tf: "M1 / M5", gap: 10, sl: 15, trail: 8, lifetime: 15 },
    { name: "Swing", tf: "H1 / H4", gap: 100, sl: 80, trail: 40, lifetime: 120 },
    { name: "News Trading", tf: "Any", gap: 30, sl: 50, trail: 20, lifetime: 10 },
];

const FAQS = [
    { q: "Can I run BracketBlitz on multiple charts?", a: "Yes! Just give each instance a different MagicNumber so they don't interfere with each other." },
    { q: "Does it work on all currency pairs?", a: "Yes. It works on any instrument available in MetaTrader — forex pairs, gold (XAUUSD), indices, crypto CFDs, etc. The pip calculation auto-adjusts for each symbol's digit configuration." },
    { q: "Can I use it alongside manual trading?", a: "Absolutely. The EA only manages orders with its own MagicNumber. It will never touch your manual trades or orders from other EAs." },
    { q: "Why 30 seconds for the refresh timer?", a: "30 seconds is a balance between keeping entries fresh and avoiding excessive order churn. You can adjust this from 5 seconds (aggressive) to 3600 seconds (passive) via the OrderLifetimeSec input." },
    { q: "Does it set a Take Profit?", a: "No. The strategy relies on the trailing stop to lock in profit and exit. This allows the trade to ride extended breakouts without a hard exit cap." },
    { q: "What happens during high-impact news?", a: "BracketBlitz is designed for breakout-capture, making it well-suited for news events. However, be aware of wider spreads, slippage, and rare gap scenarios." },
    { q: "MT4 or MT5 — which should I use?", a: "Both versions have identical logic. Choose based on your broker: MT4 for most retail forex brokers, MT5 for newer brokers with more asset classes." },
];

export default function BracketBlitzPage() {
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
                        <li><a href="#settings" onClick={() => setMobileNavOpen(false)}>Settings</a></li>
                        <li><a href="#authorization" onClick={() => setMobileNavOpen(false)}>🔐 Authorization</a></li>
                        <li><a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a></li>
                        <li><a href={DOWNLOAD_MT4} download className="nav-cta">⬇️ Download</a></li>
                    </ul>
                    <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        {mobileNavOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero blitz-hero" id="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-blitz-1"></div>
                <div className="hero-glow hero-glow-blitz-2"></div>
                <div className="hero-content">
                    <div className="hero-badge blitz-badge">
                        <span className="hero-badge-dot blitz-dot"></span>
                        MT4 & MT5 · All Instruments
                    </div>
                    <h1>
                        <span className="blitz-gradient-text">BracketBlitz EA</span>
                    </h1>
                    <p className="hero-subtitle">
                        Rapid-fire OCO bracket orders that chase the market — Buy Stop + Sell Stop,
                        auto-refreshed every 30 seconds. Catch breakouts without predicting direction.
                    </p>
                    <div className="hero-actions">
                        <a href={DOWNLOAD_MT4} download className="btn btn-blitz-primary">⬇️ Download MT4</a>
                        <a href={DOWNLOAD_MT5} download className="btn btn-blitz-primary">⬇️ Download MT5</a>
                        <a href="#strategy" className="btn btn-secondary">📖 Learn More</a>
                    </div>
                    <p className="hero-note">
                        <strong>Open Source</strong> — Free to use on any instrument in MetaTrader. Expires 2026-09-30.
                    </p>
                </div>
            </section>

            {/* STRATEGY / HOW IT WORKS */}
            <section id="strategy" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Strategy</span>
                        <h2>How It Works</h2>
                        <p>A breakout-capture strategy designed for volatile market conditions.</p>
                    </div>
                    <div className="flow-container">
                        {[
                            { title: "Bracket Placement", desc: "Two pending orders straddle the current price: Buy Stop at Ask + GapPips (catches upward breakouts) and Sell Stop at Bid − GapPips (catches downward breakouts)." },
                            { title: "OCO Execution", desc: "The moment price breaks through one level and triggers an order, the opposite side is immediately deleted. This prevents conflicting positions and keeps exposure directional." },
                            { title: "Fresh Entries", desc: "If neither order triggers within 30 seconds (configurable), both are deleted and re-placed at the new current price — keeping the bracket tight around the latest price action." },
                            { title: "Trailing Protection", desc: "Once in a trade, the stop loss follows price movement automatically. For buys, SL moves up as price rises. For sells, SL moves down as price falls. It never moves back." },
                        ].map((step, i) => (
                            <div key={i} className="flow-step animate-in">
                                <div className="flow-line">
                                    <div className="flow-number blitz-flow-number">{i + 1}</div>
                                </div>
                                <div className="flow-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Capabilities</span>
                        <h2>Key Features</h2>
                        <p>Built for speed, simplicity, and breakout-capture efficiency.</p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-icon blitz-feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Getting Started</span>
                        <h2>Installation Guide</h2>
                        <p>Get BracketBlitz running in minutes.</p>
                    </div>
                    <div className="animate-in" style={{ background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-glass)" }}>
                        <div style={{ display: "grid", gap: 24, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                            <div>
                                <strong style={{ color: "var(--accent-green)" }}>1. Download the EA</strong>
                                <p style={{ marginTop: 8 }}>
                                    Download the compiled file for your platform using the buttons above. Choose <code>.ex4</code> for MetaTrader 4 or <code>.ex5</code> for MetaTrader 5.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-green)" }}>2. Install in MetaTrader</strong>
                                <p style={{ marginTop: 8 }}>
                                    Open your MetaTrader terminal. Go to <code>File → Open Data Folder</code>. Place the file in <code>MQL4/Experts/</code> (MT4) or <code>MQL5/Experts/</code> (MT5). Restart MetaTrader or right-click the Navigator panel and select Refresh.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-green)" }}>3. Attach to Chart</strong>
                                <p style={{ marginTop: 8 }}>
                                    Open any chart (works on all instruments — forex, gold, indices, crypto CFDs). Drag BracketBlitz onto the chart. In the EA properties, go to the <strong>Common</strong> tab and enable <strong>Allow live trading</strong> (MT4) or <strong>Allow Algo Trading</strong> (MT5).
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-green)" }}>4. Configure Parameters</strong>
                                <p style={{ marginTop: 8 }}>
                                    Adjust <code>GapPips</code>, <code>StopLossPips</code>, <code>TrailingStopPips</code>, and <code>OrderLifetimeSec</code> in the <strong>Inputs</strong> tab. Use the preset configurations below as starting points. Give each chart instance a unique <code>MagicNumber</code>.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-green)" }}>5. Enable Auto Trading</strong>
                                <p style={{ marginTop: 8 }}>
                                    Make sure Auto Trading is enabled in MetaTrader (the button in the toolbar should be green). The EA will immediately place Buy Stop + Sell Stop bracket orders around the current price.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SETTINGS */}
            <section id="settings" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Configuration</span>
                        <h2>EA Settings</h2>
                        <p>All parameters are adjustable from the EA input dialog when attaching to a chart.</p>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card">
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead>
                                        <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
                                    </thead>
                                    <tbody>
                                        {SETTINGS.map((s, i) => (
                                            <tr key={i}>
                                                <td><code>{s.name}</code></td>
                                                <td><code>{s.type}</code></td>
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

            {/* PRESETS */}
            <section id="presets">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Tuning</span>
                        <h2>Preset Configurations</h2>
                        <p>Recommended starting points for different trading styles.</p>
                    </div>
                    <div className="features-grid animate-in" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                        {PRESETS.map((p, i) => (
                            <div key={i} className="glass-card">
                                <h3 className="feature-title" style={{ marginBottom: 4 }}>{p.name}</h3>
                                <p style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: 600, marginBottom: 16 }}>{p.tf}</p>
                                <div style={{ display: "grid", gap: 8 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                        <span style={{ color: "var(--text-secondary)" }}>GapPips</span>
                                        <code>{p.gap}</code>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                        <span style={{ color: "var(--text-secondary)" }}>StopLossPips</span>
                                        <code>{p.sl}</code>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                        <span style={{ color: "var(--text-secondary)" }}>TrailingStopPips</span>
                                        <code>{p.trail}</code>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                        <span style={{ color: "var(--text-secondary)" }}>OrderLifetimeSec</span>
                                        <code>{p.lifetime}</code>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FILE STRUCTURE */}
            <section style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Project</span>
                        <h2>File Structure</h2>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card goldmind-file-structure">
                            <pre><code>{`BracketBlitz/
├── BracketBlitz.mq4    # Expert Advisor source — MetaTrader 4
├── BracketBlitz.mq5    # Expert Advisor source — MetaTrader 5
├── .gitignore           # Excludes compiled .ex4/.ex5 files
└── README.md            # Documentation`}</code></pre>
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
                        <p>Please understand the risks before using BracketBlitz EA.</p>
                    </div>
                    <div className="risk-grid animate-in">
                        {[
                            { icon: "🧪", title: "Demo First", desc: "Always test on a demo account before using real money" },
                            { icon: "📉", title: "No Guarantees", desc: "Past performance does not guarantee future results" },
                            { icon: "⚡", title: "Volatile Markets", desc: "Breakout strategies work best with volatility but also carry higher risk" },
                            { icon: "💰", title: "Risk Capital Only", desc: "Only trade with money you can afford to lose" },
                            { icon: "📊", title: "Spread Awareness", desc: "Wider spreads during news events may affect order placement" },
                            { icon: "👀", title: "Monitor Regularly", desc: "Check your positions regularly, especially during market events" },
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

            {/* AUTHORIZATION */}
            <section id="authorization" style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Access & Licensing</span>
                        <h2>BracketBlitz EA Authorization</h2>
                        <p>Verify your MetaTrader account status and check authorization for BracketBlitz and all other EAs.</p>
                    </div>

                    <AccountChecker initialEa="bracketblitz" />
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label blitz-label">Support</span>
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
                            <h3 className="footer-brand blitz-footer-brand">BracketBlitz EA</h3>
                            <p className="footer-desc">
                                Rapid-fire OCO bracket order EA for MetaTrader 4 & 5. Open source breakout-capture strategy.
                            </p>
                            <div className="social-links">
                                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
                            </div>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#strategy">Strategy</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#settings">Settings</a></li>
                                <li><a href="#presets">Presets</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <ul className="footer-links">
                                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><a href="https://www.twitter.com/SyariefAzman" target="_blank">Twitter: @SyariefAzman</a></li>
                                <li><Link href="/">← Back to All Products</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} BracketBlitz EA by Syarief Azman. Open Source — MIT License.</p>
                        <p className="footer-disclaimer">
                            Risk warning: Trading involves significant risk. Breakout strategies can result in losses. Past performance is not indicative of future results. Always test on a demo account first. Use at your own risk.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
