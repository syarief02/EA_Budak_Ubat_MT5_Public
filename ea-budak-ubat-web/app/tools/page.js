"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LiveStrategySimulator from "@/app/components/LiveStrategySimulator";
import GridCalculator from "@/app/components/GridCalculator";
import SetGenerator from "@/app/components/SetGenerator";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import { playTactileClick } from "@/lib/audioSynthesizer";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("simulator");

  useEffect(() => {
    // Open the tab named in the URL hash (e.g. #calculator, #presets, #simulator),
    // on load and when an in-page link changes the hash (the Set Generator links to #calculator).
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "calculator" || hash === "presets" || hash === "simulator") {
        setActiveTab(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
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
      <SiteNav
        active="/tools"
      />

      {/* TOOLS HERO */}
      <section className="catalog-hero" style={{ paddingTop: "140px", paddingBottom: "50px", position: "relative" }}>
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
              <span className="label">TOOL 01 · Execution simulator</span>
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
              <span className="label">TOOL 02 · Preset generator</span>
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
              <span className="label">TOOL 03 · Margin calculator</span>
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
      <SiteFooter />
    </>
  );
}
