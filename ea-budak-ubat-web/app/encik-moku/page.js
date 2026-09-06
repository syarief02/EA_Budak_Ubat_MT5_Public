"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AccountChecker from "@/app/components/AccountChecker";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA-Encik-Moku/raw/master/EA%20-%20Encik%20Moku%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA-Encik-Moku/raw/master/EA%20-%20Encik%20Moku%20v1.06%20-%20MT5%20-%2020260930.ex5";

const FEATURES = [
    { icon: "🏯", title: "Ichimoku Kinko Hyo", desc: "Core trend detection — Tenkan-sen must be above (buy) or below (sell) both Senkou Span A, Senkou Span B, and Kijun-sen. Price above/below the Kumo cloud." },
    { icon: "📈", title: "Stochastic Filter", desc: "Prevents late entries — buys only when not overbought (< 80), sells only when not oversold (> 20). Main vs Signal crossover required." },
    { icon: "📉", title: "RSI Confirmation", desc: "Additional exhaustion filter — RSI must be below 70 for buys and above 30 for sells, avoiding entries at extreme levels." },
    { icon: "🕐", title: "Multi-Timeframe Analysis", desc: "5 MTF modes: trade only when ALL 4 timeframes agree on direction. Dramatically reduces false signals." },
    { icon: "🔄", title: "Close on Reversal", desc: "When a reversal signal appears, automatically closes opposite trades before opening new ones — always positioned with the trend." },
    { icon: "📊", title: "Auto-Compounding", desc: "6 compounding modes scale lot size with your equity growth — from very conservative to aggressive risk profiles." },
    { icon: "🎲", title: "Martingale Recovery", desc: "Configurable lot multiplier after losses (default 2.25x) with reset-on-profit. MaxLots safety cap prevents runaway sizing." },
    { icon: "⏰", title: "Time & Day Filters", desc: "Trade only during specific hours and weekdays. Supports overnight ranges (e.g., 22:00 – 06:00)." },
];

const SETTINGS = [
    { name: "Lots", type: "double", def: "0.01", desc: "Base lot size for each trade" },
    { name: "Takeprofit_Pips", type: "int", def: "50", desc: "Take profit distance in pips" },
    { name: "Stoploss_Pips", type: "int", def: "50", desc: "Stop loss distance in pips" },
    { name: "Close_On_Reversal", type: "bool", def: "true", desc: "Close opposite trades when a reversal signal appears" },
    { name: "MultiTimeFrame_Mode", type: "enum", def: "CC (Intradayz)", desc: "Which MTF mode to use — No MTF, Scalperz, Intradayz, Swingz, or Positionz" },
    { name: "AutoCompounding_Mode", type: "enum", def: "A (Off)", desc: "Auto lot-sizing based on account equity" },
    { name: "ECN_Broker", type: "bool", def: "false", desc: "Send order without SL/TP first, then modify — required for ECN brokers" },
    { name: "TrailingStop", type: "bool", def: "false", desc: "Enable/disable trailing stop" },
    { name: "TrailingStop_Pips", type: "int", def: "25", desc: "Trailing stop distance in pips from current price" },
    { name: "TrailingGap_Pips", type: "int", def: "7", desc: "Minimum pip distance before trailing activates" },
    { name: "LotMultiplierOnLoss", type: "double", def: "2.25", desc: "Multiply lot size by this after a losing trade" },
    { name: "LotsResetOnProfit", type: "bool", def: "true", desc: "Reset to base lot after a winning trade" },
    { name: "MaxLots", type: "double", def: "999", desc: "Maximum allowed lot size (safety cap)" },
    { name: "HoursFrom / HoursTo", type: "int", def: "0 / 24", desc: "Trading hours filter (local time). Supports overnight ranges." },
    { name: "Monday–Sunday", type: "bool", def: "All true", desc: "Enable/disable trading on specific weekdays" },
    { name: "Email_Notification", type: "bool", def: "true", desc: "Send trade signals via email" },
    { name: "MT4/MT5_Messages", type: "bool", def: "true", desc: "Send push notifications to MT4/MT5 mobile app" },
];

const MTF_MODES = [
    { mode: "AA", label: "No MTF", tfs: "Current chart TF only", best: "Quick testing" },
    { mode: "BB", label: "Scalperz", tfs: "H1 → M15 → M5 → M1", best: "Scalping" },
    { mode: "CC", label: "Intradayz", tfs: "H4 → H1 → M15 → M5", best: "Intraday (default)" },
    { mode: "DD", label: "Swingz", tfs: "D1 → H4 → H1 → M15", best: "Swing trading" },
    { mode: "EE", label: "Positionz", tfs: "W1 → D1 → H4 → H1", best: "Position trading" },
];

const FAQS = [
    { q: "What pairs does this work best on?", a: "Trending pairs like EURUSD, GBPUSD, USDJPY, XAUUSD, and indices. The Ichimoku indicator works best on instruments that trend clearly. Avoid ranging/choppy pairs." },
    { q: "Why isn't the EA trading?", a: "The multi-timeframe requirement is very strict — all 4 timeframes × 3 indicators must agree. Sometimes it takes hours or days to find a valid signal. This is by design — quality over quantity." },
    { q: "Can I run this on multiple pairs?", a: "Yes! Attach the EA to different charts. Each instance is independent. The MagicNumber (260328) ensures trades don't interfere." },
    { q: "Is martingale safe?", a: "Martingale carries significant risk. The default 2.25x multiplier means after 3 consecutive losses, your lot is ~11x the base size. Always set MaxLots to a reasonable value." },
    { q: "Does the EA close trades on its own?", a: "Yes — trades are closed by TP, SL, trailing stop, or the Close on Reversal feature. The EA does not leave trades unmanaged." },
    { q: "What timeframe should my chart be on?", a: "It doesn't matter — the EA fetches data from its configured timeframes internally. Use any chart timeframe you prefer for viewing." },
    { q: "What is the Kumo cloud?", a: "The Kumo (cloud) is formed by Senkou Span A and Senkou Span B. Price above the cloud = bullish bias, below = bearish bias. The EA checks that Tenkan-sen is positioned relative to both spans." },
    { q: "Can I backtest this EA?", a: "Yes. Open MT4/MT5 → Strategy Tester (Ctrl+R), select the EA, choose a pair and date range, and click Start. Multi-timeframe modes require history data for all relevant timeframes." },
    { q: "Is there an MT5 version?", a: "Yes! Both MT4 (.ex4) and MT5 (.ex5) versions are available. The MT5 version uses the same strategy with CTrade class for order management and indicator handles for optimized performance." },
];

export default function EncikMokuPage() {
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
            <section className="hero moku-hero" id="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-moku-1"></div>
                <div className="hero-glow hero-glow-moku-2"></div>
                <div className="hero-content">
                    <div className="hero-badge moku-badge">
                        <span className="hero-badge-dot moku-dot"></span>
                        MT4 & MT5 · Trending Pairs
                    </div>
                    <h1>
                        <span className="moku-gradient-text">
                            🏯 Encik Moku
                        </span>
                    </h1>
                    <p className="hero-subtitle">
                        Ichimoku Kinko Hyo + RSI + Stochastic — confirmed across up to 4 timeframes.
                        Buys above the Kumo cloud, sells below. Single-entry, trend-following EA.
                    </p>
                    <div className="hero-actions">
                        <a href={DOWNLOAD_MT4} download className="btn btn-moku-primary">⬇️ Download MT4</a>
                        <a href={DOWNLOAD_MT5} download className="btn btn-moku-primary">⬇️ Download MT5</a>
                        <a href="#installation" className="btn btn-secondary">📖 Installation Guide</a>
                    </div>
                    <p className="hero-note">
                        <strong>Open Source</strong> — Free to use. Expires 2026-09-30. By Syarief Azman.
                    </p>
                </div>
            </section>

            {/* STRATEGY */}
            <section id="strategy" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">Strategy</span>
                        <h2>How It Trades</h2>
                        <p>Three indicators across multiple timeframes must all agree before entering any trade.</p>
                    </div>
                    <div className="animate-in" style={{ background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-glass)" }}>
                        <h3 style={{ marginBottom: 20 }}>📊 Buy Signal Requirements (all must be true)</h3>
                        <div style={{ display: "grid", gap: 12, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                            <div>✅ <strong>Ichimoku Bullish:</strong> Tenkan-sen &gt; Senkou Span A AND Tenkan-sen &gt; Senkou Span B AND Tenkan-sen &gt; Kijun-sen (price above cloud)</div>
                            <div>✅ <strong>Stochastic:</strong> Main &lt; 80 AND Main &gt; Signal (still rising, not overbought)</div>
                            <div>✅ <strong>RSI:</strong> RSI &lt; 70 (not exhausted)</div>
                        </div>
                        <h3 style={{ marginTop: 32, marginBottom: 20 }}>📉 Sell Signal Requirements (all must be true)</h3>
                        <div style={{ display: "grid", gap: 12, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                            <div>✅ <strong>Ichimoku Bearish:</strong> Tenkan-sen &lt; Senkou Span A AND Tenkan-sen &lt; Senkou Span B AND Tenkan-sen &lt; Kijun-sen (price below cloud)</div>
                            <div>✅ <strong>Stochastic:</strong> Main &gt; 20 AND Main &lt; Signal (still falling, not oversold)</div>
                            <div>✅ <strong>RSI:</strong> RSI &gt; 30 (not exhausted)</div>
                        </div>
                        <div style={{ marginTop: 24, padding: 16, background: "rgba(245,158,11,0.05)", borderRadius: 12, border: "1px solid rgba(245,158,11,0.15)", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            💡 <strong>Ichimoku Settings:</strong> Tenkan-sen (9), Kijun-sen (26), Senkou Span (52) — the classic Ichimoku parameters used by institutional traders worldwide.
                        </div>
                    </div>

                    {/* MTF MODES TABLE */}
                    <div className="animate-in" style={{ marginTop: 32, background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-glass)" }}>
                        <h3 style={{ marginBottom: 20 }}>🕐 Multi-Timeframe Modes</h3>
                        <div className="params-table-wrapper">
                            <table className="params-table">
                                <thead><tr><th>Mode</th><th>Label</th><th>Timeframes (Highest → Lowest)</th><th>Best For</th></tr></thead>
                                <tbody>
                                    {MTF_MODES.map((m, i) => (
                                        <tr key={i}>
                                            <td><code>{m.mode}</code></td>
                                            <td><strong>{m.label}</strong></td>
                                            <td><code>{m.tfs}</code></td>
                                            <td>{m.best}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p style={{ marginTop: 16, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            ⚠️ The chart timeframe doesn&apos;t matter — the EA fetches data from the configured timeframes internally.
                        </p>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">Features</span>
                        <h2>Core Features</h2>
                        <p>Everything built into the EA.</p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                                <div className="feature-icon moku-feature-icon">{f.icon}</div>
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
                        <span className="label moku-label">Setup</span>
                        <h2>Installation Guide</h2>
                        <p>Get up and running in minutes.</p>
                    </div>
                    <div className="flow-container">
                        {[
                            {
                                title: "Download the EA (MT4 or MT5)",
                                desc: <>Click the <strong>Download MT4</strong> or <strong>Download MT5</strong> button above to get the compiled <code>.ex4</code> or <code>.ex5</code> file.</>
                            },
                            {
                                title: "Open Data Folder",
                                desc: <>Open MetaTrader 4 or 5. Click <code>File → Open Data Folder</code>. Navigate to <code>MQL4\Experts\</code> (MT4) or <code>MQL5\Experts\</code> (MT5).</>
                            },
                            {
                                title: "Copy the EA File",
                                desc: <>Place the downloaded <code>.ex4</code> or <code>.ex5</code> file into the appropriate Experts folder.</>
                            },
                            {
                                title: "Attach to Chart",
                                desc: <>In MT4/MT5, press <strong>Ctrl+N</strong> to open the Navigator. Right-click <strong>Expert Advisors</strong> → <strong>Refresh</strong>. Find <strong>EA Encik Moku</strong> and drag it onto a chart of your chosen trending pair (EURUSD, GBPUSD, XAUUSD, etc.).</>
                            },
                            {
                                title: "Configure Settings",
                                desc: <>
                                    In the EA dialog:
                                    <br />• <strong>Common tab:</strong> ☑ Check <strong>Allow live trading</strong>
                                    <br />• <strong>Inputs tab:</strong> Choose your <code>MultiTimeFrame_Mode</code> (default: Intradayz), set <code>Lots</code>, <code>Stoploss_Pips</code>, <code>Takeprofit_Pips</code>
                                    <br />Click <strong>OK</strong>. Make sure <strong>Auto Trading</strong> is enabled (green icon in toolbar).
                                </>
                            },
                            {
                                title: "Verify It's Running",
                                desc: <>Check the <strong>Experts</strong> tab at the bottom of MT4/MT5. You should see the EA name displayed and the chart comment showing your equity, lot size, and trade counts. The EA will wait for all indicators to align before placing trades.</>
                            },
                        ].map((step, i) => (
                            <div key={i} className="flow-step animate-in">
                                <div className="flow-line">
                                    <div className="flow-number moku-flow-number">{i + 1}</div>
                                </div>
                                <div className="flow-content">
                                    <h3>{step.title}</h3>
                                    <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SETTINGS */}
            <section id="settings">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">Configuration</span>
                        <h2>EA Settings</h2>
                        <p>Fine-tune every parameter to match your trading style.</p>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card">
                            <div className="params-table-wrapper">
                                <table className="params-table">
                                    <thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                                    <tbody>
                                        {SETTINGS.map((s, i) => (
                                            <tr key={i}>
                                                <td><code>{s.name}</code></td>
                                                <td>{s.type}</td>
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

            {/* IMPORTANT NOTES */}
            <section style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">Important</span>
                        <h2>Risk Warnings</h2>
                    </div>
                    <div className="animate-in" style={{ display: "grid", gap: 16 }}>
                        {[
                            { icon: "⚠️", text: "Always test on a demo account first before using real money." },
                            { icon: "🎲", text: "Martingale is risky — the default 2.25x multiplier means after 3 consecutive losses, your lot is ~11x the base size. Set MaxLots to a reasonable cap." },
                            { icon: "💰", text: "Recommended starting capital: $100 USD minimum per pair." },
                            { icon: "📊", text: "Best on trending pairs — EURUSD, GBPUSD, USDJPY, XAUUSD, indices. Avoid choppy/ranging markets." },
                            { icon: "🖥️", text: "VPS recommended for 24/7 uninterrupted operation." },
                            { icon: "📈", text: "Past performance does not guarantee future results. Ichimoku cloud analysis can be wrong." },
                        ].map((w, i) => (
                            <div key={i} className="glass-card" style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 24px" }}>
                                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{w.icon}</span>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>{w.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AUTHORIZATION */}
            <section id="authorization" style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">Access & Licensing</span>
                        <h2>Encik Moku Authorization</h2>
                        <p>Verify your MetaTrader account status and check authorization for Encik Moku and all other EAs.</p>
                    </div>

                    <AccountChecker initialEa="encik-moku" />
                </div>
            </section>

            {/* FAQ */}
            <section id="faq">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label moku-label">FAQ</span>
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
                            <h3 className="footer-brand moku-footer-brand">Encik Moku</h3>
                            <p className="footer-desc">
                                Multi-timeframe Ichimoku trend-following EA. Buy above the Kumo, sell below the Kumo. Open source strategy.
                            </p>
                            <div className="social-links">
                                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                                <a href="https://wa.me/60194961568" className="social-link" target="_blank" title="WhatsApp">📱</a>
                            </div>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#strategy">Strategy</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#installation">Setup</a></li>
                                <li><a href="#settings">Settings</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <ul className="footer-links">
                                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><a href="https://wa.me/60194961568" target="_blank">WhatsApp: +60194961568</a></li>
                                <li><Link href="/">← Back to All Products</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} EA Encik Moku by Syarief Azman. Open Source.</p>
                        <p className="footer-disclaimer">
                            Risk warning: Trading involves significant risk. Trend-following and Martingale strategies can result in losses. Past performance is not indicative of future results. Always test on a demo account first. Use at your own risk.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
