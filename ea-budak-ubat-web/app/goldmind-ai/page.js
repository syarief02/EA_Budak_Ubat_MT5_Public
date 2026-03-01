"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DOWNLOAD_MT5 = "https://github.com/syarief02/goldmind-ai/raw/master/mt5/Experts/GoldMind%20AI%20v1.00%20-%20MT5%20-%2020260331.ex5";

const FEATURES = [
    { icon: "🤖", title: "AI-Powered Analysis", desc: "Uses OpenAI (ChatGPT) to analyze XAUUSD price charts and generate trading signals with structured JSON output." },
    { icon: "🛡️", title: "6 Safety Filters", desc: "Every signal passes through spread, stop level, entry price, SL direction, R:R ratio, and lot size validation." },
    { icon: "📊", title: "Pending Orders", desc: "Places buy stop or sell stop pending orders, automatically cancelled after 4 hours if not triggered." },
    { icon: "💰", title: "Smart Lot Sizing", desc: "Calculates lot size based on your risk percentage and the distance between entry and stop loss." },
    { icon: "🔄", title: "Auto Signal Refresh", desc: "Requests fresh AI signals at configurable intervals. Skips requests when a position is already open to save API costs." },
    { icon: "⚡", title: "Local Processing", desc: "Runs entirely on your computer — Python FastAPI backend communicates between MT5 and OpenAI API." },
    { icon: "📈", title: "XAUUSD Specialist", desc: "AI prompt specifically designed to analyze gold price action for optimal entry, stop loss, and take profit levels." },
    { icon: "🔐", title: "Secure API Key", desc: "Your OpenAI API key stays on your machine, stored in a local .env file that never leaves your computer." },
];

const SETTINGS = [
    { name: "BackendURL", def: "http://localhost:8000", desc: "Address of your local Python FastAPI server" },
    { name: "MaxSpreadPoints", def: "50", desc: "Maximum allowed spread in points. Signals rejected if spread exceeds this value" },
    { name: "RiskPercent", def: "1.0", desc: "Percentage of account equity to risk per trade" },
    { name: "MinRR", def: "1.5", desc: "Minimum reward-to-risk ratio required to place a trade" },
    { name: "Timeframe", def: "PERIOD_M15", desc: "Candle timeframe used for price data sent to the AI" },
    { name: "CandleCount", def: "100", desc: "Number of historical candles sent to the AI for analysis" },
    { name: "RefreshHours", def: "4.0", desc: "Hours between signal refresh requests. Also the pending order expiry time" },
    { name: "MagicNumber", def: "777", desc: "Unique identifier for trades placed by this EA" },
    { name: "Timeout", def: "30000", desc: "WebRequest timeout in milliseconds for server communication" },
];

const REQUIREMENTS = [
    { icon: "🐍", title: "Python 3.8+", desc: "Required to run the FastAPI backend server" },
    { icon: "📈", title: "MetaTrader 5", desc: "Your broker's MT5 platform with a XAUUSD chart" },
    { icon: "🔑", title: "OpenAI API Key", desc: "Paid API key from platform.openai.com — each signal costs ~$0.01–$0.02" },
];

const FAQS = [
    { q: "Does this guarantee profits?", a: "No. This is an AI-assisted trading tool, not a money-printing machine. AI can make wrong predictions. Always test on a demo account first, and never risk money you can't afford to lose." },
    { q: "How much does it cost to run?", a: "Each signal request costs about $0.01–$0.02 in OpenAI API usage. If the EA places an order or holds a position, it stops polling to save costs." },
    { q: "Can I run this on a VPS?", a: "Yes! Run the Python server and MT5 on the same VPS. Change BackendURL if they're on different machines." },
    { q: "Can I use this on other symbols besides XAUUSD?", a: "No — the AI prompt is specifically designed to analyze gold price action. Using other symbols would produce unreliable signals." },
    { q: "Can I change the AI model?", a: "Yes! Edit OPENAI_MODEL in backend/.env. Options include gpt-4o-2024-08-06, gpt-5-mini, and gpt-5." },
    { q: "Is my API key safe?", a: "Yes. The key is stored only on your computer in the .env file. It's never sent to MT5 or anywhere else." },
];

export default function GoldMindAIPage() {
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
                        <li><a href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How It Works</a></li>
                        <li><a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a></li>
                        <li><a href="#requirements" onClick={() => setMobileNavOpen(false)}>Requirements</a></li>
                        <li><a href="#settings" onClick={() => setMobileNavOpen(false)}>Settings</a></li>
                        <li><a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a></li>
                        <li><a href={DOWNLOAD_MT5} download className="nav-cta">⬇️ Download</a></li>
                    </ul>
                    <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        {mobileNavOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero goldmind-hero" id="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-gold-1"></div>
                <div className="hero-glow hero-glow-gold-2"></div>
                <div className="hero-content">
                    <div className="hero-badge goldmind-badge">
                        <span className="hero-badge-dot goldmind-dot"></span>
                        MT5 · XAUUSD · AI-Powered
                    </div>
                    <h1>
                        <span className="goldmind-gradient-text">GoldMind AI</span>
                    </h1>
                    <p className="hero-subtitle">
                        An AI-powered trading system that uses ChatGPT to analyze gold (XAUUSD) price charts
                        and automatically place trades in MetaTrader 5. Runs entirely on your own computer.
                    </p>
                    <div className="hero-actions">
                        <a href={DOWNLOAD_MT5} download className="btn btn-goldmind-primary">⬇️ Download MT5 EA</a>
                        <a href="#how-it-works" className="btn btn-secondary">📖 Learn More</a>
                    </div>
                    <p className="hero-note">
                        <strong>Open Source</strong> — Free to use. Requires your own OpenAI API key. Expires 2026-03-31. By Syarief Azman.
                    </p>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label goldmind-label">Architecture</span>
                        <h2>How It Works</h2>
                        <p>A seamless pipeline from price data to intelligent trade execution.</p>
                    </div>
                    <div className="flow-container">
                        {[
                            { title: "EA Collects Data", desc: "Every candle timeframe (e.g. 15 minutes), the EA collects the latest candle data (OHLC prices) from the XAUUSD chart and sends it to your local Python server." },
                            { title: "Server Forwards to AI", desc: "The FastAPI backend receives the price data and forwards it to OpenAI's ChatGPT API with a specialized gold analysis prompt." },
                            { title: "AI Analyzes Market", desc: "ChatGPT analyzes the price action and responds with a structured JSON signal: buy stop, sell stop, or no trade — including entry, SL, and TP levels." },
                            { title: "Signal Validation", desc: "The EA runs the AI signal through 6 safety filters: spread check, stop level, entry price, SL direction, R:R ratio, and lot size validation." },
                            { title: "Order Placement", desc: "If all filters pass, the EA places a pending order (buy stop or sell stop). If the order isn't triggered within 4 hours, it's cancelled." },
                            { title: "Cost Optimization", desc: "While a position is open, the EA skips signal requests entirely to save API costs. A new signal is only requested after the position is closed." },
                        ].map((step, i) => (
                            <div key={i} className="flow-step animate-in">
                                <div className="flow-line">
                                    <div className="flow-number goldmind-flow-number">{i + 1}</div>
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
                        <span className="label goldmind-label">Capabilities</span>
                        <h2>Key Features</h2>
                        <p>Enterprise-grade AI trading with robust safety mechanisms.</p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-icon goldmind-feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REQUIREMENTS */}
            <section id="requirements" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label goldmind-label">Prerequisites</span>
                        <h2>What You Need</h2>
                        <p>Everything required to get GoldMind AI up and running.</p>
                    </div>
                    <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                        {REQUIREMENTS.map((r, i) => (
                            <div key={i} className="glass-card animate-in">
                                <div className="feature-icon goldmind-feature-icon" style={{ fontSize: "1.8rem", width: 56, height: 56 }}>{r.icon}</div>
                                <h3 className="feature-title">{r.title}</h3>
                                <p className="feature-desc">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="animate-in" style={{ marginTop: 40, background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-glass)" }}>
                        <h3 style={{ marginBottom: 20 }}>🚀 Quick Installation Guide</h3>
                        <div style={{ display: "grid", gap: 24, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                            <div>
                                <strong style={{ color: "var(--accent-amber)" }}>1. Setup Python Backend Server</strong>
                                <p style={{ marginTop: 8 }}>
                                    Download the source code from the GoldMind AI repository. Navigate to the <code>backend/</code> folder and run <code>pip install -r requirements.txt</code>.
                                    Copy <code>.env.example</code> to <code>.env</code> and add your OpenAI API Key (<code>OPENAI_API_KEY=sk-...</code>). Run the server: <code>python main.py</code> — it starts on <code>http://localhost:8000</code>.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-amber)" }}>2. Setup MetaTrader 5</strong>
                                <p style={{ marginTop: 8 }}>
                                    Download the EA using the button above. Open MT5 → <code>File → Open Data Folder</code>. Place the <code>.ex5</code> file in <code>MQL5/Experts/</code>.
                                    Go to <code>Tools → Options → Expert Advisors</code> and check &quot;Allow WebRequest for listed URL&quot;. Add <code>http://localhost:8000</code>.
                                </p>
                            </div>
                            <div>
                                <strong style={{ color: "var(--accent-amber)" }}>3. Attach to Chart</strong>
                                <p style={{ marginTop: 8 }}>
                                    Open a XAUUSD chart (any timeframe). Drag GoldMind AI onto the chart. Enable <strong>Allow Algo Trading</strong> in the Common tab.
                                    Adjust risk settings (default 1%) and ensure Auto Trading is ON. The EA connects to your local Python server automatically.
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
                        <span className="label goldmind-label">Configuration</span>
                        <h2>EA Settings</h2>
                        <p>Fine-tune the AI trading behavior to match your risk tolerance.</p>
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

            {/* FILE STRUCTURE */}
            <section style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label goldmind-label">Project</span>
                        <h2>File Structure</h2>
                        <p>Clean, organized codebase with clear separation of concerns.</p>
                    </div>
                    <div className="animate-in">
                        <div className="glass-card goldmind-file-structure">
                            <pre><code>{`goldmind-ai/
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
├── .gitignore
└── README.md`}</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* RISK WARNING */}
            <section className="risk-section">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label">⚠️ Important</span>
                        <h2>Important Warnings</h2>
                        <p>Please read before using GoldMind AI with real money.</p>
                    </div>
                    <div className="risk-grid animate-in">
                        {[
                            { icon: "🧪", title: "Demo First", desc: "Always test on a demo account before using real money" },
                            { icon: "🤖", title: "AI Isn't Perfect", desc: "Past performance does not guarantee future results — AI predictions can be wrong" },
                            { icon: "🔑", title: "Protect Your Key", desc: "Keep your API key secret — treat it like a password" },
                            { icon: "👀", title: "Monitor Trades", desc: "Don't just set and forget, especially in the beginning" },
                            { icon: "📊", title: "Market Conditions", desc: "Works best in trending/breakout conditions, not during choppy/ranging markets" },
                            { icon: "💻", title: "Keep Running", desc: "Both the server and MT5 need to be running. A VPS is recommended for 24/7 operation" },
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
                        <span className="label goldmind-label">Support</span>
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
                            <h3 className="footer-brand goldmind-footer-brand">GoldMind AI</h3>
                            <p className="footer-desc">
                                AI-powered XAUUSD trading system using ChatGPT, FastAPI, and MetaTrader 5. Open source and free to use.
                            </p>
                            <div className="social-links">
                                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
                            </div>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#requirements">Requirements</a></li>
                                <li><a href="#settings">Settings</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <ul className="footer-links">
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><a href="https://www.twitter.com/SyariefAzman" target="_blank">Twitter: @SyariefAzman</a></li>
                                <li><Link href="/">← Back to All Products</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} GoldMind AI by Syarief Azman. Open Source.</p>
                        <p className="footer-disclaimer">
                            Risk warning: AI-assisted trading carries inherent risks. Past performance does not guarantee future results. Never trade with money you cannot afford to lose. Always test on a demo account first.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
