"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LiveStrategySimulator from "@/app/components/LiveStrategySimulator";
import GridCalculator from "@/app/components/GridCalculator";
import SetGenerator from "@/app/components/SetGenerator";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import { playTactileClick } from "@/lib/audioSynthesizer";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // Check URL hash if specified (e.g. #calculator, #presets, #simulator)
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "calculator" || hash === "presets" || hash === "simulator") {
        setActiveTab(hash);
      }
    }
  }, []);

  const handleTabChange = (tab) => {
    playTactileClick(0.08);
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
            <li><Link href="/products" onClick={() => setMobileNavOpen(false)}>MQL5 Store</Link></li>
            <li><Link href="/tools" onClick={() => setMobileNavOpen(false)} style={{ color: "#00f0ff", fontWeight: 700 }}>Tools Workbench ⚙️</Link></li>
            <li><Link href="/about" onClick={() => setMobileNavOpen(false)}>About</Link></li>
            <li><Link href="/community" onClick={() => setMobileNavOpen(false)}>Community</Link></li>
            <li><Link href="/changelog" onClick={() => setMobileNavOpen(false)}>Changelog</Link></li>
            <li>
              <Link
                href="/#broker-partners"
                className="nav-cta"
                onClick={() => { playTactileClick(0.1); setMobileNavOpen(false); }}
                style={{ background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", fontWeight: 900 }}
              >
                🔥 Get EA Free
              </Link>
            </li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* TOOLS HERO */}
      <section className="catalog-hero" style={{ paddingTop: "140px", paddingBottom: "50px", position: "relative" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">計算解析盤</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "18px" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#00f0ff", fontWeight: 700 }}>Quantitative Tools Workbench</span>
          </div>

          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              PRECISION SIMULATION &amp; MARGIN OPTIMIZATION WORKBENCH
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px" }}>
            Algorithmic Trader <span className="gradient-text">Workbench</span>
          </h1>

          <p className="hero-subtitle" style={{ maxWidth: "800px", margin: "0 0 28px", fontSize: "1.08rem", lineHeight: 1.7 }}>
            Interactive simulation, parameter preset generation, and real-time margin stress-testing. 
            Calibrate your trading parameters before deploying EA Budak Ubat on live accounts.
          </p>

          {/* WORKBENCH TAB SELECTOR */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            padding: "8px",
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(0, 240, 255, 0.25)",
            borderRadius: "16px",
            maxWidth: "760px",
            backdropFilter: "blur(12px)",
          }}>
            <button
              onClick={() => handleTabChange("simulator")}
              style={{
                flex: "1 1 200px",
                padding: "14px 20px",
                borderRadius: "12px",
                border: activeTab === "simulator" ? "1px solid #00f0ff" : "1px solid transparent",
                background: activeTab === "simulator" ? "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(59, 130, 246, 0.2))" : "transparent",
                color: activeTab === "simulator" ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <span>📊</span>
              <span>Execution Simulator</span>
            </button>

            <button
              onClick={() => handleTabChange("presets")}
              style={{
                flex: "1 1 200px",
                padding: "14px 20px",
                borderRadius: "12px",
                border: activeTab === "presets" ? "1px solid #00f0ff" : "1px solid transparent",
                background: activeTab === "presets" ? "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(59, 130, 246, 0.2))" : "transparent",
                color: activeTab === "presets" ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <span>⚙️</span>
              <span>Preset Studio (.set)</span>
            </button>

            <button
              onClick={() => handleTabChange("calculator")}
              style={{
                flex: "1 1 200px",
                padding: "14px 20px",
                borderRadius: "12px",
                border: activeTab === "calculator" ? "1px solid #00f0ff" : "1px solid transparent",
                background: activeTab === "calculator" ? "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(59, 130, 246, 0.2))" : "transparent",
                color: activeTab === "calculator" ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <span>🧮</span>
              <span>Margin &amp; Cent Risk</span>
            </button>
          </div>
        </div>
      </section>

      {/* ROTATING BANNER */}
      <section style={{ padding: "0 0 20px" }}>
        <div className="container">
          <RotatingAdBanner />
        </div>
      </section>

      {/* ACTIVE TOOL VIEWPORT */}
      <main className="container" style={{ paddingBottom: "80px" }}>
        {activeTab === "simulator" && (
          <div style={{ animation: "fadeIn 0.25s ease-out" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="label">TOOL 01 // 仮想市場シミュレータ</span>
              <h2 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "6px" }}>
                Interactive Algorithmic Execution Simulator
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Simulate live market scenarios, test dynamic ADR grid layering, and observe the volume-weighted break-even Take Profit pool execute in real time.
              </p>
            </div>
            <LiveStrategySimulator />
          </div>
        )}

        {activeTab === "presets" && (
          <div style={{ animation: "fadeIn 0.25s ease-out" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="label">TOOL 02 // パラメータ設定生成器</span>
              <h2 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "6px" }}>
                EA Parameter Preset Studio (.set)
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Download pre-calibrated parameter files or customize grid multipliers, ADR auto-config ratios, and take profit targets ready to load directly into MetaTrader.
              </p>
            </div>
            <SetGenerator />
          </div>
        )}

        {activeTab === "calculator" && (
          <div style={{ animation: "fadeIn 0.25s ease-out" }}>
            <div style={{ marginBottom: "24px" }}>
              <span className="label">TOOL 03 // 証拠金計算機</span>
              <h2 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "6px" }}>
                Grid Risk &amp; Cent Margin Calculator
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Plan your capital requirements. Calculate cumulative lots, drawdown depth, and liquidation safety cushions across Cent and Standard accounts.
              </p>
            </div>
            <GridCalculator />
          </div>
        )}

        <div style={{ marginTop: "60px" }}>
          <MQL5TrustBadge />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">👑 EA Budak Ubat</h3>
              <p className="footer-desc">
                Flagship automated quantitative grid trading system and specialized Expert Advisors for MetaTrader platforms by Syarief Azman.
              </p>
              <div className="social-links">
                <a href="mailto:support@eabudakubat.com" className="social-link" title="Email">✉️</a>
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram">💬</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Twitter/X">🐦</a>
                <a href="https://github.com/syarief02" className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">💻</a>
              </div>
            </div>
            <div>
              <h4>Workbench Tools</h4>
              <ul className="footer-links">
                <li><button onClick={() => handleTabChange("simulator")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>Execution Simulator</button></li>
                <li><button onClick={() => handleTabChange("presets")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>Preset Studio (.set)</button></li>
                <li><button onClick={() => handleTabChange("calculator")} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}>Margin Risk Calculator</button></li>
                <li><Link href="/#authorization">License Whitelist Checker</Link></li>
              </ul>
            </div>
            <div>
              <h4>Official Pages</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About the Architect</Link></li>
                <li><Link href="/products">MQL5 Store Catalog</Link></li>
                <li><Link href="/community">Community Discussion</Link></li>
                <li><Link href="/changelog">Version Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4>Direct Support</h4>
              <ul className="footer-links">
                <li><a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">Telegram: @SyariefAzman</a></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Channel: t.me/EABudakUbat</a></li>
                <li><a href="https://www.mql5.com/en/market/product/195399" target="_blank" rel="noopener noreferrer">MQL5 Market Listing</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Test on demo accounts before live trading. Official domain: https://eabudakubat.com.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
