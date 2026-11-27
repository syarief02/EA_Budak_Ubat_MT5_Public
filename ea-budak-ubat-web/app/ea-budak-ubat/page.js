"use client";

import { useState } from "react";
import Link from "next/link";
import AccountChecker from "@/app/components/AccountChecker";
import PriceTierUrgency from "@/app/components/PriceTierUrgency";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import { TRIAL_FILE_DATE } from "@/lib/authorizedAccounts";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.68%20-%20MT4%20-%2020261130.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.68%20-%20MT5%20-%2020261130.ex5";
const PURCHASE_LINK = "https://tinyurl.com/eabubuy";
const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

const FEATURES = [
  { icon: "📊", title: "Multi-Platform", desc: "Runs on both MetaTrader 4 and MetaTrader 5 with identical trading logic." },
  { icon: "🧠", title: "4 Analysis Methods", desc: "Classic Candle, SMA20, Alligator, and Ichimoku for entry signals." },
  { icon: "📈", title: "Grid Martingale", desc: "Automatic position layering with configurable multiplier and distance." },
  { icon: "📊", title: "AutoConfig", desc: "Dynamic parameter optimization based on Average Daily Range." },
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
    { name: "TakeProfit_Inp", def: "25.0", desc: "Take profit in pips from weighted average" },
    { name: "StopLoss_Inp", def: "0", desc: "Stop loss in pips from first entry (0 = disabled)" },
    { name: "minDistance_Inp", def: "4", desc: "Minimum pip distance between grid orders" },
    { name: "distanceIncrement_Inp", def: "2.0", desc: "Extra pips added per successive layer" },
    { name: "maxDistance_Inp", def: "100.0", desc: "Maximum distance cap between grid orders" },
  ],
  time: [
    { name: "StartTime", def: "00:00", desc: "EA active start time (HH:MM, server time)" },
    { name: "StopTime", def: "23:59", desc: "EA active stop time (HH:MM, server time)" },
    { name: "AutoConfig", def: "false", desc: "Rescale TakeProfit and grid distances from the symbol's daily range (ADR)" },
    { name: "MagicNumber", def: "123456", desc: "Unique magic number for trade identification" },
  ],
  filter: [
    { name: "UseRSIFilter", def: "true", desc: "Toggle RSI filter ON/OFF. Set false for Gold (XAUUSD) to avoid blocking buys during macro uptrends" },
    { name: "RSI_TF", def: "PERIOD_H1", desc: "Timeframe for RSI calculation (M1, M5, M15, M30, H1, etc.)" },
    { name: "RSI_Period", def: "14", desc: "Averaging period for RSI momentum calculation" },
    { name: "RSI_BuyCeiling", def: "70.0", desc: "Maximum RSI value allowed to open new Buy positions" },
    { name: "RSI_SellFloor", def: "30.0", desc: "Minimum RSI value allowed to open new Sell positions" },
  ],
  risk: [
    { name: "MaxSpread_Pips", def: "0.0", desc: "Spread filter in pips. EA pauses entries if spread exceeds this (0 = disabled)" },
    { name: "MaxDrawdownPct", def: "0.0", desc: "Drawdown guard %. While account drawdown is at or above this %, the EA opens no new entries or grid layers; open positions are not closed (0 = disabled)" },
    { name: "EnableBreakEven", def: "false", desc: "Automatically lock profits by moving SL once basket exceeds trigger pips" },
    { name: "BreakEven_Trigger", def: "15.0", desc: "Floating profit in pips required to activate Break-Even" },
    { name: "BreakEven_Lock", def: "1.0", desc: "Pips of profit locked above/below the average entry price once break-even triggers (price gaps and slippage can still fill worse)" },
    { name: "MinMarginLevelToTrade", def: "0.0", desc: "Skips a new entry or grid layer when the margin level after opening it would fall below this %. Fewer layers also means the basket needs a bigger reversal to reach its take profit (0 = off, 200% in Market Edition)" },
    { name: "EmergencyMarginLevel", def: "0.0", desc: "Closes all positions on the chart's symbol when the account margin level falls to this %, before the broker's stop-out (0 = off, 60% in Market Edition)" },
  ],
};

const FAQS = [
  { q: "I am new to trading. Where should I start?", a: "Start without real money. The free Forex Quest lessons at eabudakubat.com/learn cover the basics (currency pairs, spreads, indicators, risk management and how grid systems work). Then open a free demo account on MT4 or MT5, install the demo version of EA Budak Ubat from this page and follow the setup steps in the guide at eabudakubat.com/guide. Run it on the demo for a few weeks so you see how the grid behaves in both quiet and trending markets before you consider a live account, and start small (a Cent account, 0.01 lots, one pair). If you get stuck, message @SyariefAzman on Telegram." },
  { q: "Can I use this on multiple charts?", a: "Yes, but use a different MagicNumber for each chart to avoid conflicts between EA instances." },
  { q: "Does the MT5 version trade the same as MT4?", a: "Yes. Since v1.67 the MT4 and MT5 builds have the same inputs, entry rules, grid maths and protections (RSI filter, spread and drawdown guards, basket break-even, margin safeguards). Only the platform's trading functions differ." },
  { q: "What pairs work best?", a: "Ranging pairs with low spread work best. Avoid highly trending or exotic pairs to minimize drawdown risk." },
  { q: "Can I use this on XAUUSD (Gold)?", a: "Yes, with care. Gold moves faster and trends further than EURUSD, so the grid gets deep quickly and the risk is much higher. Use the Gold preset in the Set Generator on the Tools page (eabudakubat.com/tools): TP and grid distances scaled for gold, RSI filter off, MaxTrade 6, drawdown and margin guards on. In the EA's inputs one pip on gold is 0.01 in price, so a StopLoss of 50 that suits EURUSD is only $0.50 on gold; scale TP, StopLoss and grid distances to match. Use a Cent account with 0.01 lots, keep gold on its own account, and test on demo first." },
  { q: "What is the minimum capital needed?", a: "About $100 per pair on a Cent account with 0.01 starting lots. A Standard account carries 100 times the risk at the same lot, so the like-for-like figure is about $10,000 per pair; with less on Standard, set a StopLoss, MaxTrade and EmergencyMarginLevel and run one pair. Higher leverage lowers the margin per position, not the loss in a deep grid." },
  { q: "Can it grow a small account quickly, like a scalper?", a: "No EA can safely turn a small account into a large one in a day or a week. That needs very large lots, and the same lots can wipe out the account just as fast, so be careful with anyone who promises it. EA Budak Ubat aims for small, frequent basket profits; the result depends on the pair, the lot size against your capital and the market, and a strong trend can bring a deep drawdown. For a small balance, use a Cent account (about $100 per pair at 0.01 lots). The High-Frequency Cent Scalper preset in the Set Generator at eabudakubat.com/tools trades more often but carries more risk and is meant for Cent accounts only. Test it on a demo account first." },
  { q: "The EA is attached but has not opened a trade yet. Is something wrong?", a: "Usually not. The EA looks for a first entry once per new bar (Execution_Mode = Every New Bar), and the default Ichimoku method only enters when the last closed candle is above (buy) or below (sell) the Tenkan, the Kijun and both cloud lines, so in a sideways market it can wait for hours. The H1 RSI filter also blocks buys above 70 and sells below 30. New entries are skipped as well when the spread is above MaxSpread_Pips, when the account drawdown is above MaxDrawdownPct (it counts open trades on every chart), or outside StartTime to StopTime (broker server time). Check that the chart panel says 'Account Authorized', Algo Trading is on, and the Experts tab shows no errors. Switching to M1 to force entries is not recommended: it starts baskets on noise and can add a grid layer every minute." },
  { q: "Why do some of my orders have no Take Profit or Stop Loss?", a: "No Stop Loss is the default: StopLoss_Inp = 0, because the grid closes the whole basket at one shared Take Profit instead. If you want one, set StopLoss_Inp in pips, measured from the first entry of the basket (on gold 1 EA pip = 0.01 in price, so 1000 = $10). For Take Profit, each new grid layer opens without a TP, and the EA then moves every order in the basket to the new shared TP (weighted average entry + TakeProfit). A layer can stay without a TP until the next bar if the price is already too close to the new TP level for the broker's stop level, or if a market-execution server rejected the TP (the Experts tab then shows 'Could not attach SL/TP'). The EA updates nothing outside StartTime to StopTime, while Algo Trading is off or while MT4/MT5 is closed, which is why a VPS is recommended. If a TP is still missing after a bar or two, send a screenshot of the Trade and Experts tabs." },
  { q: "Is there a live track record? Can I get an investor login?", a: "The public live record is our MQL5 signal FBS162Multi1 (mql5.com/en/signals/2266921): a real FBS account running EA Budak Ubat since October 2024, with its trade history verified by MQL5. We do not share account logins or investor passwords. Past results do not guarantee future results, so run the EA on a demo account or in the Strategy Tester to see how it trades with your own settings." },
  { q: "How do I know I am talking to the official EA Budak Ubat team?", a: "Our only contacts are Telegram @SyariefAzman, the channel t.me/EABudakUbat, support@eabudakubat.com and the Facebook Page BuBat's Trading, all linked from eabudakubat.com. We do not offer account management or profit sharing, and we never ask for your trading or investor password, or for money sent to us. The free license only needs your broker, platform and account number, and the paid version is sold only through MQL5 Market. If someone you do not know messages you first on Telegram or WhatsApp offering to trade for you, grow your deposit or sell EA Budak Ubat, treat it as a scam and report it. The same goes for group posts showing huge profits from a small deposit, and for giveaways or bonuses that ask you to pay a fee before you can withdraw." },
  { q: "Is there an EA without a grid, one trade at a time?", a: "EA Budak Ubat is a grid system by design. For single-entry trading, use its sister EAs Aligator Gozaimasu (eabudakubat.com/aligator-gozaimasu) and Encik Moku (eabudakubat.com/encik-moku): trend-following, MT4 and MT5, one position per direction, no grid. They raise the lot after a losing trade by default (LotMultiplierOnLoss = 2.25); set it to 1.0 for a fixed lot and set MaxLots. The same license applies (demo free, permanent license through a partner broker). Several of our MQL5 Market products also hold one position at a time with no grid or martingale: see eabudakubat.com/products." },
  { q: "How do I get authorized?", a: "Register through one of the broker partner links on this page, then send the broker, the platform (MT4 or MT5) and your trading account number to @SyariefAzman on Telegram, or use the license request form at eabudakubat.com/brokers." },
  { q: "Why is there a date in the file name?", a: `The date (currently ${TRIAL_FILE_DATE}) is only the trial cutoff for live accounts that are not whitelisted yet. Demo accounts and whitelisted accounts never expire. New builds with a later trial date are published from time to time, not on a fixed schedule, so the trial can lapse for a while between builds. For uninterrupted use on a live account, get the free permanent license through a partner broker, or use the MQL5 Market version.` },
];

const INSTALL_MT4 = [
  <>Download <code>EA - Budak Ubat v1.68 - MT4 - 20261130.ex4</code></>,
  <>Open MT4 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL4/Experts/</code></>,
  "Copy the .ex4 file into this folder",
  "Restart MT4 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow live trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
  <>Make sure the <strong>AutoTrading</strong> button in the top toolbar is green. Messages and errors appear in the <code>Experts</code> tab (Ctrl+T)</>,
];

const INSTALL_MT5 = [
  <>Download <code>EA - Budak Ubat v1.68 - MT5 - 20261130.ex5</code></>,
  <>Open MT5 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL5/Experts/</code></>,
  "Copy the .ex5 file into this folder",
  "Restart MT5 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow Algo Trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
  <>Make sure the <strong>Algo Trading</strong> button in the top toolbar is green. Messages and errors appear in the <code>Experts</code> tab of the Toolbox (Ctrl+T). An MT4 account cannot log in to MT5, so use an MT5 demo or live account</>,
];

export default function EABudakUbatPage() {
  const [activeParamTab, setActiveParamTab] = useState("core");
  const [activeInstall, setActiveInstall] = useState("mt4");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* NAVBAR */}
      <SiteNav
        active="/ea-budak-ubat"
        sections={[{ href: "#features", label: "Features" }, { href: "#parameters", label: "Parameters" }, { href: "#preset-generator", label: "Tools" }, { href: "#installation", label: "Install" }, { href: "#authorization", label: "License" }, { href: "#faq", label: "FAQ" }]}
      />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            v1.68 — MT4 & MT5
          </div>
          <h1>
            <span className="gradient-text">EA Budak Ubat</span>
          </h1>
          <p className="hero-subtitle">
            A powerful grid-based martingale Expert Advisor for MetaTrader 4 & MetaTrader 5.
            Designed for ranging pairs on the M5 timeframe with 4 analysis methods and volatility-based AutoConfig.
          </p>
          {/* DUAL-TRACK ACQUISITION MATRIX */}
          <div className="dual-track-container animate-in">
            {/* Track 1: Official MQL5 Market Edition */}
            <div className="track-card featured">
              <div>
                <span className="track-tag mql5">★ Recommended · Standalone</span>
                <h3 className="track-title">Official MQL5 Market Edition</h3>
                <p className="track-desc">
                  Instant activation via MetaQuotes MQL5 Market. No broker lock, no account number restriction, and zero monthly expiration.
                </p>
                <ul className="track-checklist">
                  <li><span className="check-icon">✓</span> 20 MetaTrader 5 Terminal Activations</li>
                  <li><span className="check-icon">✓</span> Native MetaQuotes DRM & Cloud Delivery</li>
                  <li><span className="check-icon">✓</span> Free Lifetime Automatic Updates in MT5</li>
                  <li><span className="check-icon">✓</span> Hedging & Netting Account Certified</li>
                </ul>
              </div>

              <div className="track-actions">
                <a
                  href={MQL5_MARKET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-mql5-primary"
                >
                  <span className="btn-icon">🛒</span>
                  <span className="btn-text">
                    <strong>Buy on MQL5 Market ($149 USD)</strong>
                    <small>Lifetime License or Rent from $30/mo · Free Demo</small>
                  </span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Track 2: Free Community Edition */}
            <div className="track-card">
              <div>
                <span className="track-tag community">Free / Partner Whitelist</span>
                <h3 className="track-title">Community Whitelist Edition</h3>
                <p className="track-desc">
                  Run 100% free on unlimited Demo accounts or register a Live account under our broker partner link for permanent authorization.
                </p>
                <ul className="track-checklist">
                  <li><span className="check-icon">✓</span> MetaTrader 4 & MetaTrader 5 (.ex4 / .ex5)</li>
                  <li><span className="check-icon">✓</span> 100% Unlimited Free Demo Account Trading</li>
                  <li><span className="check-icon">✓</span> Whitelist Registration via Partner Brokers</li>
                  <li><span className="check-icon">✓</span> Full Access to Presets & Risk Calculator</li>
                </ul>
              </div>

              <div className="track-actions">
                <div className="track-buttons-row">
                  <a href={DOWNLOAD_MT5} className="btn btn-primary">⬇️ Download MT5 (v1.68)</a>
                  <a href={DOWNLOAD_MT4} className="btn btn-secondary">⬇️ Download MT4 (v1.68)</a>
                </div>
                <div className="track-buttons-row" style={{ marginTop: "4px" }}>
                  <Link href="/tools#presets" className="btn btn-secondary btn-sm">⚙️ Presets (.set)</Link>
                  <Link href="/tools#calculator" className="btn btn-secondary btn-sm">🧮 Risk Calculator</Link>
                  <a href={PURCHASE_LINK} className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">🛒 Buy MT4</a>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC PRICE TIER URGENCY PROGRESS */}
          <PriceTierUrgency
            currentPrice={149}
            marketUrl={MQL5_MARKET_LINK}
          />

          {/* MQL5 OFFICIAL TRUST BADGE */}
          <MQL5TrustBadge productUrl={MQL5_MARKET_LINK} />
        </div>
      </section>

      {/* WHAT'S NEW IN V1.68 BANNER */}
      <div className="container" style={{ marginTop: "-20px", marginBottom: "30px", position: "relative", zIndex: 10 }}>
        <div className="v163-banner-card animate-in">
          <div className="v163-banner-left">
            <span className="v163-banner-icon">🚀</span>
            <div>
              <h4 className="v163-banner-title">What's New in v1.68</h4>
              <p className="v163-banner-desc">
                Margin safeguards fixed on MT4 and MT5: Min Margin Level now pauses new orders in every build, and the Market Editions follow both margin inputs.
              </p>
            </div>
          </div>
          <Link href="/changelog" className="btn btn-secondary btn-sm" style={{ animation: "none", whiteSpace: "nowrap" }}>
            View Full Changelog →
          </Link>
        </div>
      </div>

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
                { key: "filter", label: "Filter & RSI (v1.63)" },
                { key: "risk", label: "Risk & Break-Even (v1.63)" },
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
            <h2>AutoConfig: Volatility-Based Settings</h2>
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

      {/* PRESETS & RISK CALCULATOR: the full tools live on /tools (the same components were embedded here twice,
          which added about 6,000 px on phones). Both old anchors still land on this card. */}
      <section id="preset-generator" style={{ padding: "60px 0" }}>
        <span id="risk-calculator" aria-hidden="true" />
        <div className="container hp">
          <div className="hp-card hp-standalone">
            <div>
              <p className="hp-eyebrow">Trader tools</p>
              <h3>Preset Studio and grid risk calculator</h3>
              <p>
                Generate a ready-made .set file for your pair and account type, and check the grid&rsquo;s lot
                progression, margin and drawdown before you trade live.
              </p>
            </div>
            <div className="hp-actions" style={{ marginTop: 0 }}>
              <Link href="/tools#presets" className="hp-btn hp-btn-primary">Open Preset Studio</Link>
              <Link href="/tools#calculator" className="hp-btn hp-btn-ghost">Open risk calculator</Link>
            </div>
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
                <a href="https://secure.gbnetwork.com/aff.php?aff=515" className="btn btn-accent" style={{ marginTop: 16, display: "inline-flex" }} target="_blank" rel="noopener noreferrer">
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
      <SiteFooter />
    </>
  );
}
