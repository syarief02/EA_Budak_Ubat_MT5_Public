"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AccountChecker from "@/app/components/AccountChecker";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT5%20-%2020260930.ex5";
const PURCHASE_LINK = "https://tinyurl.com/eabubuy";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

const FEATURES = [
  { icon: "📊", title: "Multi-Platform", desc: "Runs on both MetaTrader 4 and MetaTrader 5 with identical trading logic." },
  { icon: "🧠", title: "4 Analysis Methods", desc: "Classic Candle, SMA20, Alligator, and Ichimoku for entry signals." },
  { icon: "📈", title: "Grid Martingale", desc: "Automatic position layering with configurable multiplier and distance." },
  { icon: "🤖", title: "AutoConfig AI", desc: "Dynamic parameter optimization based on Average Daily Range." },
  { icon: "🔄", title: "Hedging Support", desc: "Trade both directions simultaneously or restrict to single-direction." },
  { icon: "⏰", title: "Time Filter", desc: "Schedule EA active hours with configurable Start/Stop times." },
  { icon: "🛑", title: "Close All Button", desc: "One-click close for all open positions directly on the chart." },
  { icon: "🔐", title: "Authorization System", desc: "Account-locked licensing with unlimited demo mode support." },
];

const PARAM_TABS = {
  core: [
    { name: "EA_Name", def: "[https://t.me/SyariefAzman]", desc: "Display name shown in trade comments" },
    { name: "Execution_Mode", def: "on Every New Bar", desc: "Every Tick = instant; Every New Bar = candle close" },
    { name: "Pos_Mode", def: "Buy & Sell", desc: "Buy & Sell, Buy Only, or Sell Only" },
    { name: "Hedging", def: "false", desc: "Allows simultaneous buy/sell baskets" },
    { name: "Method", def: "Ichimoku", desc: "Analysis method: Classic Candle, SMA20, Alligator, Ichimoku" },
  ],
  lot: [
    { name: "Lots", def: "0.01", desc: "Initial lot size for the first position" },
    { name: "GridTrading", def: "true", desc: "Enable/disable grid (martingale) layering" },
    { name: "MartingaleMultiplier", def: "1.3", desc: "Lot multiplier per grid layer (1.0 = flat)" },
    { name: "MaxLot", def: "500", desc: "Maximum lot size cap for martingale" },
    { name: "MaxTrade", def: "99999", desc: "Maximum grid layers per direction" },
  ],
  distance: [
    { name: "TakeProfit", def: "25.0", desc: "Take profit in pips from weighted average" },
    { name: "StopLoss", def: "0", desc: "Stop loss in pips from first entry (0 = disabled)" },
    { name: "minDistance", def: "4", desc: "Minimum pip distance between grid orders" },
    { name: "distanceIncrement", def: "2.0", desc: "Extra pips added per successive layer" },
    { name: "maxDistance", def: "100.0", desc: "Maximum distance cap between grid orders" },
  ],
  time: [
    { name: "StartTime", def: "00:00", desc: "EA active start time (HH:MM, server time)" },
    { name: "StopTime", def: "23:59", desc: "EA active stop time (HH:MM, server time)" },
    { name: "AutoConfig", def: "false", desc: "Enable AutoConfig AI for dynamic parameters" },
    { name: "MagicNumber", def: "123456", desc: "Unique magic number for trade identification" },
  ],
};

const FAQS = [
  { q: "Can I use this on multiple charts?", a: "Yes, but use a different MagicNumber for each chart to avoid conflicts between EA instances." },
  { q: "Does the MT5 version trade the same as MT4?", a: "Yes. The trading logic, parameters, grid math, analysis methods, authorization, and time filtering are all identical. Only the underlying API calls differ." },
  { q: "What pairs work best?", a: "Ranging pairs with low spread work best. Avoid highly trending or exotic pairs to minimize drawdown risk." },
  { q: "Can I use this on XAUUSD (Gold)?", a: "Technically yes, but gold is very volatile. Use extreme caution, a cent account, and very conservative settings." },
  { q: "What is the minimum capital needed?", a: "A minimum of $100 on a Cent account (or larger capital for Standard) with 0.01 starting lots is recommended. Higher leverage reduces margin requirements per position." },
  { q: "How do I get authorized?", a: "Register through one of the broker partner links on this page, then send your trading account number to @SyariefAzman on Telegram." },
];

const INSTALL_MT4 = [
  <>Download <code>EA - Budak Ubat v1.62 - MT4 - 20260930.ex4</code></>,
  <>Open MT4 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL4/Experts/</code></>,
  "Copy the .ex4 file into this folder",
  "Restart MT4 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow live trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
];

const INSTALL_MT5 = [
  <>Download <code>EA - Budak Ubat v1.62 - MT5 - 20260930.ex5</code></>,
  <>Open MT5 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL5/Experts/</code></>,
  "Copy the .ex5 file into this folder",
  "Restart MT5 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow Algo Trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
];

export default function EABudakUbatPage() {
  const [activeParamTab, setActiveParamTab] = useState("core");
  const [activeInstall, setActiveInstall] = useState("mt4");
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
            <li><a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a></li>
            <li><a href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How It Works</a></li>
            <li><a href="#parameters" onClick={() => setMobileNavOpen(false)}>Parameters</a></li>
            <li><a href="#installation" onClick={() => setMobileNavOpen(false)}>Install</a></li>
            <li><a href="#authorization" onClick={() => setMobileNavOpen(false)}>Authorization</a></li>
            <li><a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a></li>
            <li><a href={PURCHASE_LINK} className="nav-cta" target="_blank">Purchase (MT4)</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            v1.62 — MT4 & MT5
          </div>
          <h1>
            <span className="gradient-text">EA Budak Ubat</span>
          </h1>
          <p className="hero-subtitle">
            A powerful grid-based martingale Expert Advisor for MetaTrader 4 & MetaTrader 5.
            Designed for ranging pairs on the M5 timeframe with 4 analysis methods and AutoConfig AI.
          </p>
          <div className="hero-actions">
            <a href={DOWNLOAD_MT4} className="btn btn-primary">⬇️ Download MT4</a>
            <a href={DOWNLOAD_MT5} className="btn btn-secondary">⬇️ Download MT5</a>
            <a href={PURCHASE_LINK} className="btn btn-accent" target="_blank">🛒 Full Version (MT4 Only)</a>
          </div>
          <p className="hero-note">
            <strong>Limited Time Price!</strong> The price increases by 10 USD after every 10 purchases.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Capabilities</span>
            <h2>Everything You Need in One EA</h2>
            <p>Built with precision for automated grid trading on the worlds most popular platforms.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Trading Logic</span>
            <h2>How It Works</h2>
            <p>Understanding the EAs step-by-step decision-making process on every tick.</p>
          </div>
          <div className="flow-container">
            {[
              { title: "Tick Received", desc: "On every tick, the EA updates the chart display and checks if the current time is within the configured Start/Stop window." },
              { title: "Execution Mode Check", desc: "Determines whether the main logic runs on every tick or only when a new bar appears on the chart." },
              { title: "Entry Signal", desc: "If no positions exist, the EA evaluates the selected analysis method (Candle, SMA20, Alligator, or Ichimoku) with an RSI H1 filter to determine entry direction." },
              { title: "Grid Layering", desc: "If positions exist and GridTrading is enabled, the EA checks distance from the last position and opens a new position with martingale lot sizing." },
              { title: "TP Modification", desc: "Take Profit for all positions is updated to the weighted average entry price (break-even) plus the configured TP in pips." },
              { title: "Stop Loss", desc: "If enabled, stop loss is calculated from the first entry price of the basket for risk protection." },
            ].map((step, i) => (
              <div key={i} className="flow-step animate-in">
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
        </div>
      </section>

      {/* PARAMETERS */}
      <section id="parameters">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Configuration</span>
            <h2>EA Parameters</h2>
            <p>Fine-tune every aspect of the EAs behavior to match your trading strategy.</p>
          </div>
          <div className="animate-in">
            <div className="params-tabs">
              {[
                { key: "core", label: "Core" },
                { key: "lot", label: "Lot & Grid" },
                { key: "distance", label: "Distance & TP/SL" },
                { key: "time", label: "Time & Config" },
              ].map((t) => (
                <button key={t.key} className={`param-tab ${activeParamTab === t.key ? "active" : ""}`} onClick={() => setActiveParamTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="glass-card">
              <div className="params-table-wrapper">
                <table className="params-table">
                  <thead>
                    <tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
                  </thead>
                  <tbody>
                    {PARAM_TABS[activeParamTab].map((p, i) => (
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
          </div>
        </div>
      </section>

      {/* AUTOCONFIG AI */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Intelligence</span>
            <h2>AutoConfig AI System</h2>
            <p>Let the EA automatically optimize parameters based on real-time market volatility.</p>
          </div>
          <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {[
              { icon: "🔍", title: "EURUSD Detection", desc: "Automatically detects EURUSD (or broker variations) and calculates the 365-day Average Daily Range on D1." },
              { icon: "📐", title: "Ratio Derivation", desc: "Derives divisor ratios from the EURUSD ADR: TP÷25, minPipStep÷4, PipStepIncr÷(2×Multiplier^positions), maxPipStep÷100." },
              { icon: "🔄", title: "Dynamic Adaptation", desc: "Calculates the 20-day ADR of the current symbol and applies optimized parameters that recalculate every tick/bar." },
            ].map((f, i) => (
              <div key={i} className="glass-card animate-in">
                <div className="feature-icon">{f.icon}</div>
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
            <span className="label">Getting Started</span>
            <h2>Installation Guide</h2>
            <p>Get up and running in minutes with this step-by-step guide.</p>
          </div>
          <div className="animate-in">
            <div className="install-tabs">
              <button className={`install-tab ${activeInstall === "mt4" ? "active" : ""}`} onClick={() => setActiveInstall("mt4")}>
                MetaTrader 4
              </button>
              <button className={`install-tab ${activeInstall === "mt5" ? "active" : ""}`} onClick={() => setActiveInstall("mt5")}>
                MetaTrader 5
              </button>
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
                  <strong>⚠️ MT5 Note:</strong> Make sure your broker supports <strong>hedging accounts</strong> (not netting) if you plan to run the EA with Hedging or grid trading enabled.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORIZATION */}
      <section id="authorization" style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Access & Licensing</span>
            <h2>EA Budak Ubat Authorization</h2>
            <p>Check your account status and learn how to get permanent authorization.</p>
          </div>

          <AccountChecker initialEa="ea-budak-ubat" />
        </div>
      </section>

      {/* VPS */}
      <section id="vps">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Infrastructure</span>
            <h2>Using a VPS</h2>
            <p>Run your EA 24/7 with maximum uptime and low latency.</p>
          </div>
          <div className="vps-content animate-in">
            <div>
              <ul className="vps-benefits">
                <li><span className="check">✓</span> 24/7 uptime without relying on your PC</li>
                <li><span className="check">✓</span> No disruption from power outages or internet drops</li>
                <li><span className="check">✓</span> Low latency with data center proximity</li>
                <li><span className="check">✓</span> Isolated, secure environment for your trading</li>
              </ul>
              <div className="vps-promo">
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Recommended Forex VPS Provider</p>
                <p className="promo-code" style={{ fontSize: "1.2rem" }}>GB Network Solutions</p>
                <p className="price">Reliable. Low Latency. 24/7 Uptime.</p>
                <a href="https://secure.gbnetwork.com/aff.php?aff=515" className="btn btn-accent" style={{ marginTop: 16, display: "inline-flex" }} target="_blank">
                  Order VPS →
                </a>
              </div>
            </div>
            <div className="vps-image">
              <img src="https://www.gbnetwork.my/wp-content/uploads/2023/07/featured-image-GB.jpg" alt="VPS Promotion" />
            </div>
          </div>
        </div>
      </section>

      {/* RISK MANAGEMENT */}
      <section className="risk-section">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">⚠️ Important</span>
            <h2>Risk Management</h2>
            <p>Martingale strategies carry significant risk. Always use proper risk management.</p>
          </div>
          <div className="risk-grid animate-in">
            {[
              { icon: "🏦", title: "Account Sizing", desc: "Cent account recommended for small capital; Standard also supported" },
              { icon: "💰", title: "Min $100 Capital", desc: "Minimum $100 for 0.01 starting lot (Cent recommended)" },
              { icon: "⚡", title: "Max Leverage", desc: "Maximum leverage reduces margin usage per trade" },
              { icon: "📉", title: "Ranging Pairs", desc: "Choose low-volatility pairs, avoid trending pairs" },
              { icon: "🎯", title: "Set MaxLot", desc: "Set a reasonable cap to prevent runaway lot sizes" },
              { icon: "🛡️", title: "Enable StopLoss", desc: "Consider enabling SL for additional protection" },
              { icon: "👀", title: "Monitor Daily", desc: "Check your account daily, even on VPS" },
              { icon: "💸", title: "Withdraw Profits", desc: "Withdraw regularly, don't let it grow unchecked" },
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
            <span className="label">Support</span>
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
              <h3 className="footer-brand">EA Budak Ubat</h3>
              <p className="footer-desc">
                A grid-based martingale Expert Advisor for MetaTrader 4 & 5. Designed for ranging currency pairs on the M5 timeframe.
              </p>
              <div className="social-links">
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                <a href="https://wa.me/60194961568" className="social-link" target="_blank" title="WhatsApp">📱</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#parameters">Parameters</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#authorization">Authorization</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                <li><a href="https://wa.me/60194961568" target="_blank">WhatsApp: +60194961568</a></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank">Channel: t.me/EABudakUbat</a></li>
                <li><a href={SIGNAL_LINK} target="_blank">MQL5 Signal Channel</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. Licensed under MIT.</p>
            <p className="footer-disclaimer">
              Risk warning: Products traded on margin carry a high level of risk. Martingale strategies can result in total loss of capital. Past performance is not indicative of future results. EA Budak Ubat does not provide investment advice. Use at your own risk. Not available in restricted jurisdictions including Malaysia, USA, EU, UK, North Korea, Myanmar, and Iran.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
