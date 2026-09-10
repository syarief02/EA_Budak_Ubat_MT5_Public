"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CHANGELOG_DATA = [
  {
    version: "v1.64",
    product: "EA Budak Ubat (MT5)",
    productSlug: "ea-budak-ubat",
    date: "September 10, 2026",
    badge: "Engine Fix & Optimization",
    badgeType: "major",
    summary: "Multi-symbol EURUSD ADR data engine overhaul with zero-latency direct price rates fallback, smart broker variety candidate matching, and non-blocking execution architecture.",
    highlights: [
      {
        type: "fix",
        tag: "Critical Fix",
        title: "Multi-Symbol EURUSD ADR Calculation Overhaul",
        desc: "Resolved the 'AutoConfig: EURUSD ADR data not ready' issue in MetaTrader 5. Implemented a zero-latency direct price rates fallback via CopyRates so EURUSD ADR is computed immediately even when MT5 asynchronous indicator buffers are delayed or waiting on history.",
      },
      {
        type: "improvement",
        tag: "Reliability",
        title: "Intelligent Account Variety & Suffix Matching",
        desc: "Upgraded FindEURUSDVariety() to detect matching broker prefixes and suffixes directly from the current chart symbol (e.g. XAUUSD.pro automatically selects EURUSD.pro, XAUUSD.c maps to EURUSD.c), guaranteeing seamless multi-symbol synchronization across Pro, Cent, Standard, and ECN account types.",
      },
      {
        type: "fix",
        tag: "Architecture",
        title: "Non-Blocking Trade Execution Architecture",
        desc: "Restructured Main() execution loop so that AutoConfig never halts trading or traps the EA in waiting loops. The bot continues active order management and dynamically recalculates ADR parameters as market data streams in.",
      },
      {
        type: "feature",
        tag: "Compatibility",
        title: "100% Preserved ADR Mathematical Scaling Workflow",
        desc: "Retained the exact 365-day EURUSD ADR ratio formula for TakeProfit, minDistance, distanceIncrement, and maxDistance across all tradable assets (Forex pairs, Gold, and Commodities).",
      },
      {
        type: "clarification",
        tag: "AutoConfig Modes",
        title: "Manual (AutoConfig = false) vs AI Dynamic Mode (AutoConfig = true)",
        desc: "Clarified operational modes: In default Manual Mode (AutoConfig = false), calcParam() is never called and the EA runs 100% on your manual inputs. When enabled (AutoConfig = true), calcParam() dynamically adapts grid step and take profit using the 365-day EURUSD ADR ratio with zero execution delays.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.64%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download MT5 v1.64 .ex5",
  },
  {
    version: "v1.63",
    product: "EA Budak Ubat (MT5)",
    productSlug: "ea-budak-ubat",
    date: "September 7, 2026",
    badge: "Major Update",
    badgeType: "major",
    summary: "Dedicated RSI filter toggle for Gold trading, dynamic order filling mode negotiation, spread guard, hard equity protection, and interactive web risk tools.",
    highlights: [
      {
        type: "feature",
        tag: "New Feature",
        title: "Dedicated RSI Filter Toggle (UseRSIFilter)",
        desc: "Added the ability to disable the RSI filter specifically for Gold (XAUUSD) trading. In strong macro bull trends, gold often stays overbought for extended periods—setting UseRSIFilter = false prevents the EA from blocking buy entries during continuous rallies.",
      },
      {
        type: "feature",
        tag: "New Feature",
        title: "Dynamic Order Filling Mode (SYMBOL_FILLING_MODE)",
        desc: "Implemented automatic negotiation of MetaTrader 5 execution filling modes. The bot automatically checks broker support and seamlessly selects ORDER_FILLING_FOK, ORDER_FILLING_IOC, or ORDER_FILLING_RETURN, preventing order rejection errors across different broker account types.",
      },
      {
        type: "feature",
        tag: "New Feature",
        title: "Max Spread Guard Filter (MaxSpread_Pips)",
        desc: "EA pauses new entry orders when broker spreads widen beyond configured thresholds during rollover, illiquid hours, or volatile news releases.",
      },
      {
        type: "feature",
        tag: "New Feature",
        title: "Hard Equity Protection Cutoff (MaxDrawdownPct)",
        desc: "Emergency circuit-breaker: automatically closes all open positions and cancels pending orders if floating drawdown reaches a user-configured equity percentage (0 = disabled).",
      },
      {
        type: "feature",
        tag: "New Feature",
        title: "Trailing Break-Even Profit Lock",
        desc: "Introduced EnableBreakEven, BreakEven_Trigger, and BreakEven_Lock. Automatically locks in guaranteed profit pips once the grid basket reaches the trigger profit distance from weighted average entry.",
      },
      {
        type: "tool",
        tag: "Web Tools",
        title: "Interactive Grid Margin Calculator & One-Click Presets",
        desc: "Launched the browser-based Grid & Margin Risk Calculator and One-Click Preset (.set) Generator directly on the website for instant risk simulation and configuration download.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.63%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download MT5 v1.63 .ex5",
  },
  {
    version: "v1.62",
    product: "EA Budak Ubat (MT4 & MT5)",
    productSlug: "ea-budak-ubat",
    date: "August 2026",
    badge: "Ecosystem Release",
    badgeType: "release",
    summary: "Extended trial authorization to 2026-09-30, launched multi-broker authorization portal, and unified cross-platform parameter documentation.",
    highlights: [
      {
        type: "improvement",
        tag: "Licensing",
        title: "Trial Period Extended to September 30, 2026",
        desc: "Extended active trial period across MT4 and MT5 versions for all demo and live test accounts, with unlimited lifetime whitelisting for partner accounts.",
      },
      {
        type: "improvement",
        tag: "Platform",
        title: "Multi-Broker Partner Integration",
        desc: "Integrated verified partner support for Headway (Cent & Standard 1:3000), FBS (Standard 1:3000), CXM Direct, XM, Tickmill, HF Markets, and LiteFinance.",
      },
      {
        type: "tool",
        tag: "Web Portal",
        title: "Multi-EA Authorization Verification Checker",
        desc: "Launched client-side search engine allowing traders to instantly verify whether their MT4/MT5 account numbers have lifetime whitelist status.",
      },
      {
        type: "improvement",
        tag: "Automation",
        title: "Single-Command Automation Pipeline",
        desc: "Created authorize-accounts.ps1 to prepend account numbers, recompile MT4/MT5 binaries via MetaEditor CLI, synchronize Git repositories, and deploy web updates in one command.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4",
    downloadLabel: "Download MT4 v1.62 .ex4",
  },
  {
    version: "v1.61",
    product: "EA Budak Ubat",
    productSlug: "ea-budak-ubat",
    date: "July 2026",
    badge: "AI Volatility Engine",
    badgeType: "feature",
    summary: "Introduced AutoConfig AI dynamic parameter adaptation and on-chart emergency Close All button.",
    highlights: [
      {
        type: "feature",
        tag: "Algorithm",
        title: "AutoConfig AI Dynamic Volatility Derivation",
        desc: "Calculates EURUSD 365-day Average Daily Range (ADR) on D1 and derives optimal TakeProfit, minDistance, distanceIncrement, and maxDistance ratios adapted dynamically to the current symbol's 20-day ADR.",
      },
      {
        type: "feature",
        tag: "Safety",
        title: "On-Chart Emergency Close All Button",
        desc: "Rendered an interactive GUI button directly on the chart window to instantly close all open positions and baskets in one click.",
      },
      {
        type: "feature",
        tag: "Strategy",
        title: "Full Dual-Direction Hedging Support",
        desc: "Configurable Hedging parameter: trade buy and sell baskets independently and simultaneously, or lock to single-direction recovery mode.",
      },
    ],
  },
  {
    version: "v1.60",
    product: "EA Budak Ubat (MT5 Port)",
    productSlug: "ea-budak-ubat",
    date: "May 2026",
    badge: "Platform Port",
    badgeType: "release",
    summary: "Complete MQL5 architecture rewrite bringing full MT4 grid martingale logic to MetaTrader 5.",
    highlights: [
      {
        type: "feature",
        tag: "Engine",
        title: "MQL5 Object-Oriented Architecture",
        desc: "Ported entire core trading logic to native MetaTrader 5 using Trade classes, CPositionInfo, and dynamic ticket management.",
      },
      {
        type: "feature",
        tag: "Strategy",
        title: "Dynamic Distance Increment Formula",
        desc: "Successive grid layers scale according to: minDistance + (layer - 2) * distanceIncrement, spacing orders further apart during aggressive moves.",
      },
      {
        type: "feature",
        tag: "Analysis",
        title: "4 Core Entry Methods",
        desc: "Selectable initial entry models: Classic Candle (Bull/Bear momentum), SMA20 filter, Williams Alligator trend, or Ichimoku Cloud breakout.",
      },
    ],
  },
  {
    version: "v1.06",
    product: "Encik Moku",
    productSlug: "encik-moku",
    date: "August 2026",
    badge: "Trend Following",
    badgeType: "release",
    summary: "Multi-Timeframe Ichimoku Kinko Hyo trend-following system with martingale recovery.",
    highlights: [
      {
        type: "feature",
        tag: "Indicator",
        title: "5 MTF Confirmation Modes",
        desc: "Trades strictly aligned with Ichimoku Kumo Cloud, Tenkan-sen, and Kijun-sen confirmed across up to 4 user-selected timeframes.",
      },
      {
        type: "feature",
        tag: "Risk",
        title: "Auto-Compounding & Martingale Recovery",
        desc: "Automatic balance compounding on trending wins combined with smart basket layering during temporary pullbacks.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/EA-Encik-Moku/raw/master/EA%20-%20Encik%20Moku%20v1.06%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download Encik Moku MT5",
  },
  {
    version: "v1.06",
    product: "Aligator Gozaimasu",
    productSlug: "aligator-gozaimasu",
    date: "August 2026",
    badge: "Trend Following",
    badgeType: "release",
    summary: "Bill Williams Alligator, Awesome Oscillator, RSI, and Stochastic confluence trend EA.",
    highlights: [
      {
        type: "feature",
        tag: "Indicator",
        title: "4-Indicator Confluence Strategy",
        desc: "Executes trades only when Alligator Lips/Teeth/Jaws alignment agrees with Awesome Oscillator momentum and RSI/Stochastic boundaries.",
      },
      {
        type: "feature",
        tag: "Platform",
        title: "MT4 & MT5 Dual Availability",
        desc: "Identical multi-timeframe trend algorithms available for both MetaTrader 4 and MetaTrader 5.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/EA-Aligator-Gozaimasu/raw/master/EA%20-%20Aligator%20Gozaimasu%20v1.06%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download Aligator Gozaimasu MT5",
  },
  {
    version: "v1.1",
    product: "MathEdge Pro",
    productSlug: "mathedge-pro",
    date: "August 2026",
    badge: "Index Trading",
    badgeType: "release",
    summary: "Mathematical daily level and 3-trade pending order sequence for US30 & NAS100.",
    highlights: [
      {
        type: "feature",
        tag: "Strategy",
        title: "Mathematical Pivot & Bias Calculation",
        desc: "Computes key institutional price levels prior to New York session open and sets up high-probability breakout pending orders.",
      },
      {
        type: "feature",
        tag: "Execution",
        title: "Strict 3-Trade Sequence",
        desc: "Automated bracket execution preventing overtrading on volatile US index moves.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/MathEdge-Pro/raw/main/MT5/MathEdge%20Pro%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download MathEdge Pro MT5",
  },
  {
    version: "v1.00",
    product: "BracketBlitz EA",
    productSlug: "bracketblitz",
    date: "August 2026",
    badge: "Breakout",
    badgeType: "release",
    summary: "OCO bracket breakout bot with 30-second auto-refresh chasing market price.",
    highlights: [
      {
        type: "feature",
        tag: "Strategy",
        title: "Directionless OCO Breakout",
        desc: "Places paired Buy Stop and Sell Stop pending orders that auto-adjust every 30 seconds, capturing rapid spikes without predicting direction.",
      },
      {
        type: "feature",
        tag: "Optimization",
        title: "News Trading Engine",
        desc: "Optimized for high-impact CPI, NFP, and FOMC rate announcements across any currency pair or commodity.",
      },
    ],
    downloadUrl: "https://github.com/syarief02/BracketBlitz-EA/raw/master/BracketBlitz%20-%20MT5%20-%2020260930.ex5",
    downloadLabel: "Download BracketBlitz MT5",
  },
];

const PRODUCTS_FILTER = [
  { id: "all", name: "All Products" },
  { id: "ea-budak-ubat", name: "EA Budak Ubat" },
  { id: "encik-moku", name: "Encik Moku" },
  { id: "aligator-gozaimasu", name: "Aligator Gozaimasu" },
  { id: "mathedge-pro", name: "MathEdge Pro" },
  { id: "bracketblitz", name: "BracketBlitz" },
];

export default function ChangelogPage() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredLogs = selectedProduct === "all"
    ? CHANGELOG_DATA
    : CHANGELOG_DATA.filter((log) => log.productSlug === selectedProduct);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedProduct]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
            <li><Link href="/guide" onClick={() => setMobileNavOpen(false)}>Guide</Link></li>
            <li><Link href="/ea-budak-ubat" onClick={() => setMobileNavOpen(false)}>EA Budak Ubat</Link></li>
            <li><Link href="/ea-budak-ubat#preset-generator" onClick={() => setMobileNavOpen(false)}>Presets</Link></li>
            <li><Link href="/ea-budak-ubat#risk-calculator" onClick={() => setMobileNavOpen(false)}>Calculator</Link></li>
            <li><Link href="/#authorization" onClick={() => setMobileNavOpen(false)}>License</Link></li>
            <li><Link href="/changelog" className="nav-link-active" onClick={() => setMobileNavOpen(false)}>Changelog</Link></li>
            <li><a href="https://t.me/SyariefAzman" className="nav-cta" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero catalog-hero" style={{ minHeight: "45vh", paddingTop: "110px", paddingBottom: "30px" }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Version History & Release Notes
          </div>
          <h1>
            <span className="gradient-text">Product Changelog</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: "680px" }}>
            Track continuous improvements, feature additions, safety enhancements, and parameter updates across all Expert Advisors by Syarief Azman.
          </p>
        </div>
      </section>

      {/* FILTER TABS & TIMELINE CONTENT */}
      <section style={{ padding: "30px 0 100px" }}>
        <div className="container">
          {/* PRODUCT SELECTOR TABS */}
          <div className="changelog-filters animate-in">
            {PRODUCTS_FILTER.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`filter-tab ${selectedProduct === p.id ? "active" : ""}`}
                onClick={() => setSelectedProduct(p.id)}
              >
                {p.name}
                <span className="filter-count">
                  {p.id === "all"
                    ? CHANGELOG_DATA.length
                    : CHANGELOG_DATA.filter((l) => l.productSlug === p.id).length}
                </span>
              </button>
            ))}
          </div>

          {/* TIMELINE LIST */}
          <div className="changelog-timeline">
            {filteredLogs.map((item, index) => (
              <div key={`${item.productSlug}-${item.version}-${index}`} className="changelog-card glass-card animate-in">
                {/* CARD HEADER */}
                <div className="changelog-card-header">
                  <div className="changelog-meta-left">
                    <span className="changelog-version-badge">{item.version}</span>
                    <h3 className="changelog-product-name">{item.product}</h3>
                    <span className={`changelog-type-pill ${item.badgeType}`}>{item.badge}</span>
                  </div>
                  <div className="changelog-date">{item.date}</div>
                </div>

                <p className="changelog-summary">{item.summary}</p>

                {/* HIGHLIGHTS */}
                <div className="changelog-items-list">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="changelog-item">
                      <div className="changelog-item-top">
                        <span className={`changelog-item-tag ${h.type}`}>{h.tag}</span>
                        <h4 className="changelog-item-title">{h.title}</h4>
                      </div>
                      <p className="changelog-item-desc">{h.desc}</p>
                    </div>
                  ))}
                </div>

                {/* DOWNLOAD OR DETAILS FOOTER */}
                <div className="changelog-card-footer">
                  <Link href={`/${item.productSlug}`} className="btn btn-secondary btn-sm" style={{ animation: "none" }}>
                    View {item.product} Details →
                  </Link>
                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      download
                      className="btn btn-primary btn-sm"
                      style={{ animation: "none" }}
                    >
                      ⬇️ {item.downloadLabel}
                    </a>
                  )}
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
                Automated Expert Advisors and trading tool systems for MetaTrader 4 & MetaTrader 5.
              </p>
              <div className="social-links" style={{ marginTop: 16 }}>
                <a href="mailto:support@eabudakubat.com" className="social-link" title="Email">✉️</a>
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram">💬</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Products</h4>
              <ul className="footer-links">
                <li><Link href="/ea-budak-ubat">EA Budak Ubat (v1.64)</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
                <li><Link href="/bracketblitz">BracketBlitz EA</Link></li>
                <li><Link href="/mathedge-pro">MathEdge Pro</Link></li>
                <li><Link href="/aligator-gozaimasu">Aligator Gozaimasu</Link></li>
                <li><Link href="/encik-moku">Encik Moku</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><Link href="/guide">System Guide</Link></li>
                <li><Link href="/ea-budak-ubat#preset-generator">Presets (.set)</Link></li>
                <li><Link href="/ea-budak-ubat#risk-calculator">Margin Calculator</Link></li>
                <li><Link href="/changelog">Version Changelog</Link></li>
                <li><Link href="/#authorization">License Checker</Link></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Telegram Channel</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

