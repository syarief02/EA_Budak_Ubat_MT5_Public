"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import { playTactileClick } from "@/lib/audioSynthesizer";

const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const MQL5_SELLER_LINK = "https://www.mql5.com/en/users/syarief.azman/seller";
const GITHUB_PROFILE = "https://github.com/syarief02";
const TELEGRAM_PERSONAL = "https://t.me/SyariefAzman";
const TELEGRAM_CHANNEL = "https://t.me/EABudakUbat";

export default function AboutPage() {
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
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
            <li><Link href="/products" onClick={() => setMobileNavOpen(false)} style={{ color: "#38bdf8", fontWeight: 700 }}>🛒 MQL5 Store</Link></li>
            <li><a href="#laboratory" onClick={() => setMobileNavOpen(false)}>Lab Science</a></li>
            <li><a href="#architecture" onClick={() => setMobileNavOpen(false)}>Architecture</a></li>
            <li><a href="#risk-math" onClick={() => setMobileNavOpen(false)}>Risk Mathematics</a></li>
            <li><a href="#timeline" onClick={() => setMobileNavOpen(false)}>Timeline</a></li>
            <li><a href="#ecosystem" onClick={() => setMobileNavOpen(false)}>Ecosystem</a></li>
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

      {/* HERO SECTION */}
      <section className="catalog-hero" style={{ paddingTop: "140px", paddingBottom: "70px", position: "relative" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">精密定量分析</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#00f0ff", fontWeight: 700 }}>About the Architect &amp; System</span>
          </div>

          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              SCIENTIFIC RIGOR · QUANTITATIVE FINANCIAL ENGINEERING
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "18px" }}>
            Where Pharmaceutical Precision Meets
            <br />
            <span className="gradient-text">Autonomous Algorithmic Trading</span>
          </h1>

          <p className="hero-subtitle" style={{ maxWidth: "880px", margin: "0 0 30px", fontSize: "1.12rem", lineHeight: 1.75 }}>
            The story of <strong>EA Budak Ubat</strong> is not that of a generic retail bot. It is the real-world convergence of 
            chemical quality control discipline at Malaysia&rsquo;s National Pharmaceutical Regulatory Agency (NPRA) with 
            over 2.87 million lines of self-taught quantitative software engineering.
          </p>

          {/* Quick Metrics Bar */}
          <div className="about-stats-grid" style={{ marginBottom: "0" }}>
            <div className="about-stat-card">
              <span className="about-stat-number">2.87M+</span>
              <div className="about-stat-label">Lines of Code</div>
              <div className="about-stat-sub">Across 78 Git Repos</div>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">900+</span>
              <div className="about-stat-label">Authorized Accounts</div>
              <div className="about-stat-sub">MT4 &amp; MT5 Traders</div>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">2014</span>
              <div className="about-stat-label">Genesis Year</div>
              <div className="about-stat-sub">12+ Years Live Heritage</div>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">Pure MQL</span>
              <div className="about-stat-label">Zero DLL Risk</div>
              <div className="about-stat-sub">Hedging &amp; Netting Certified</div>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">1-Minute</span>
              <div className="about-stat-label">AutoConfig AI</div>
              <div className="about-stat-sub">Real-Time ADR Recalculation</div>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">Official</span>
              <div className="about-stat-label">MQL5 Market Author</div>
              <div className="about-stat-sub">Global Verified Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROTATING PROMOTIONS */}
      <section style={{ padding: "0 0 20px" }}>
        <div className="container">
          <RotatingAdBanner />
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="container" style={{ paddingBottom: "80px" }}>
        {/* DEVELOPER PROFILE HERO CARD */}
        <section className="about-creator-card animate-in" style={{ marginTop: "20px" }}>
          <div className="about-creator-header">
            <div className="about-avatar-frame" aria-hidden="true">
              <span>🔬</span>
            </div>
            <div className="about-creator-titles">
              <h2 className="about-creator-name" style={{ margin: 0, fontSize: "2rem" }}>
                Syarief Azman bin Rosli
              </h2>
              <div className="about-creator-role">
                Quantitative Software Architect · Pharmaceutical Quality Control Analyst
              </div>
              <div className="about-creator-location">
                <span>📍 Petaling Jaya, Selangor, Malaysia</span>
                <span style={{ margin: "0 8px" }}>•</span>
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00f0ff", fontWeight: 700, textDecoration: "none" }}
                >
                  GitHub: @syarief02
                </a>
                <span style={{ margin: "0 8px" }}>•</span>
                <a
                  href={MQL5_SELLER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none" }}
                >
                  MQL5 Seller Profile
                </a>
              </div>
            </div>
          </div>

          <div className="about-badges">
            <span className="about-badge-item highlight-cyan">
              🧪 National Pharmaceutical Regulatory Agency (NPRA, MOH Malaysia)
            </span>
            <span className="about-badge-item highlight-blue">
              🎓 Harvard University CS50x (Computer Science)
            </span>
            <span className="about-badge-item highlight-blue">
              🛡️ Harvard University CS50 Cybersecurity
            </span>
            <span className="about-badge-item highlight-amber">
              💻 2,870,000+ Lines of Code Authored
            </span>
            <span className="about-badge-item highlight-emerald">
              ⚡ Pure Native MQL4 &amp; MQL5 (No External DLL Dependencies)
            </span>
            <span className="about-badge-item">
              ⭐ MQL5 Market Registered Developer (Product #195399)
            </span>
          </div>

          <div className="about-bio-quote">
            &ldquo;In high-sensitivity pharmaceutical screening, an uncalibrated micropipette or an undetected trace contaminant invalidates an entire chemical assay. In retail algorithmic trading, undisciplined parameters, unchecked emotional interventions, and static grid spacing destroy trading accounts. I approach quantitative finance not as speculative gambling, but as an analytical science: hypotheses must be stress-tested against millions of historical ticks, risks must be bounded with mathematical ceilings, and volatility must be adapted to dynamically in real-time.&rdquo;
          </div>
        </section>

        {/* SECTION 1: THE DUAL IDENTITY & SCIENTIFIC METHOD */}
        <section id="laboratory" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 01</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              Laboratory Precision: The Scientific Foundation
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              How chemical quality control protocols and Good Laboratory Practice (GLP) translate directly into financial algorithm design.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            <div className="about-pillar-card">
              <div className="about-pillar-icon">⚗️</div>
              <h3 className="about-pillar-title">High-Sensitivity Analytical Instrumentation</h3>
              <p className="about-pillar-desc">
                During regular hours, Syarief serves in the Quality Control Centre (Pusat Kawalan Kualiti) at Malaysia&rsquo;s 
                <strong>National Pharmaceutical Regulatory Agency (NPRA)</strong> under the Ministry of Health. Operating across 
                the Screening Unit (<em>Unit Penyaringan</em>) and Heavy Metals Unit (<em>Unit Logam Berat</em>), his daily workflow 
                mandates the calibration and operation of cutting-edge analytical instruments:
              </p>
              <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                <li><strong>ICP-MS:</strong> Inductively Coupled Plasma Mass Spectrometry (Agilent 8900 Triple Quad)</li>
                <li><strong>HPLC &amp; LC-MS:</strong> High-Performance Liquid Chromatography &amp; Mass Spectrometry</li>
                <li><strong>GC-MS:</strong> Gas Chromatography-Mass Spectrometry for organic compound separation</li>
              </ul>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon">📏</div>
              <h3 className="about-pillar-title">ISO Calibration &amp; GLP Protocols</h3>
              <p className="about-pillar-desc">
                Pharmaceutical testing operates under a zero-tolerance policy for methodological deviations. Routine compliance 
                includes executing rigid Standard Operating Procedures:
              </p>
              <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                <li><strong>ISO 8655-2:</strong> Gravimetric verification of micropipette volume precision</li>
                <li><strong>ISO 4787:</strong> Volumetric verification of laboratory glassware</li>
                <li><strong>GLP (Good Laboratory Practice):</strong> Uncompromising traceability, chain-of-custody, and audit trails</li>
              </ul>
              <p className="about-pillar-desc" style={{ marginTop: "12px" }}>
                This exact mindset is carried into software development: code is treated like a chemical assay, 
                where assumptions must be proved through empirical data rather than wishful thinking.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon">🔬</div>
              <h3 className="about-pillar-title">Translating Chemistry to Quantitative Trading</h3>
              <p className="about-pillar-desc">
                Why does this matter to forex traders? Traditional retail traders fail because they react with emotion, chase losses, 
                and rely on static indicators that fail when market regimes shift. 
              </p>
              <p className="about-pillar-desc" style={{ marginTop: "10px" }}>
                In laboratory science, if a baseline expands, you re-calibrate. In <strong>EA Budak Ubat</strong>, if market volatility 
                expands from a quiet Asian session into a volatile New York session, the <strong>AutoConfig AI</strong> engine 
                automatically recalibrates pip steps and take profits every single minute.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: AUTODIDACT QUANTITATIVE ENGINEERING */}
        <section id="software-engineering" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 02</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              The Autodidact Engineer: 2.87M Lines of Code
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              A relentless builder mentality balancing civil service with institutional-grade algorithmic software architecture.
            </p>
          </div>

          <div style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid var(--border-glass)", borderRadius: "20px", padding: "32px", marginBottom: "30px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
              <div>
                <h3 style={{ color: "#00f0ff", fontSize: "1.2rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>🎓</span> Formal Computer Science Foundations
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  To formalize his self-taught quantitative skills, Syarief completed Harvard University&rsquo;s rigorous online 
                  <strong>CS50x (Introduction to Computer Science)</strong> and <strong>CS50 Cybersecurity</strong> programs. 
                  His technical stack spans C/C++ (MetaQuotes MQL4 &amp; MQL5), Python, JavaScript/TypeScript, Next.js, FastAPI, 
                  and Supabase.
                </p>
              </div>

              <div>
                <h3 style={{ color: "#38bdf8", fontSize: "1.2rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>📊</span> 24-Hour Disciplined Commit Schedule
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Maintaining 68+ public repositories on GitHub (<code>@syarief02</code>), code analytics showcase a meticulously 
                  balanced work ethic: <strong>26.8%</strong> commits early morning, <strong>24.1%</strong> daytime, 
                  <strong>25.6%</strong> evening, and <strong>23.5%</strong> late night. His most productive coding day is Sunday, 
                  reflecting weekend dedication to refining algorithmic logic.
                </p>
              </div>

              <div>
                <h3 style={{ color: "#10b981", fontSize: "1.2rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>🏢</span> Real-World Lab Automation Systems
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  His coding isn&rsquo;t confined to forex. He has built automated pharmaceutical calculation tools that slashed 
                  hours of manual laboratory data processing down to seconds: including the <em>Uniformity of Weight Guide (USP 43)</em> 
                  and the internal <em>NPRA Lab Notes &amp; Competency Reference Hub</em>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SYSTEM ARCHITECTURE & AUTOCONFIG AI */}
        <section id="architecture" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 03</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              Technical Architecture: The AutoConfig AI Volatility Engine
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              Why traditional static grid bots blow accounts, and how mathematically derived dynamic volatility adaptation solves it.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="about-pillar-icon">📈</div>
              <h3 className="about-pillar-title">The Flaw of Static Grids</h3>
              <p className="about-pillar-desc">
                Traditional retail grid bots use fixed pip intervals (e.g. open a trade every 20 pips). In a quiet consolidation market, 
                20 pips is meaningful; but during high-impact news releases or London/NY opens, 20 pips is absorbed in seconds. 
                Static bots stack dangerous lot sizes too quickly, leading to immediate margin calls.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon">🧠</div>
              <h3 className="about-pillar-title">ADR Mathematical Anchoring</h3>
              <p className="about-pillar-desc">
                EA Budak Ubat&rsquo;s <strong>AutoConfig AI</strong> module measures both macro volatility (rolling 365-day baseline) 
                and micro volatility (20-day Average Daily Range). Take-Profit is dynamically derived as <code>ADR ÷ 25</code>, and the 
                minimum pip distance step is computed as <code>ADR ÷ 4</code>.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon">🔄</div>
              <h3 className="about-pillar-title">1-Minute Dynamic Recalculation</h3>
              <p className="about-pillar-desc">
                This is not a one-time setup. The algorithm recalculates market volatility every 60 seconds. When an asset experiences 
                surging volatility, the grid step expands automatically, spacing out subsequent layers to preserve free equity. 
                When volatility contracts, the grid tightens to capture quick micro-profits.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-icon">🎯</div>
              <h3 className="about-pillar-title">Intra-Candle Tick Break-Even</h3>
              <p className="about-pillar-desc">
                In v1.67, the EA calculates the volume-weighted average cost of all open layers on every tick. As soon as floating 
                equity surpasses the safety threshold, the system moves stop-losses to guaranteed profit, closing entire heavy baskets 
                on minor retracements.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: RISK MATHEMATICS & CENT CAPITAL RESILIENCE */}
        <section id="risk-math" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 04</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              Risk Mathematics: Bounding Martingale &amp; Cent Cushioning
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              Uncompromising honesty about probability theory, the &ldquo;fat-tail&rdquo; problem, and the mandatory capital architecture required to trade safely.
            </p>
          </div>

          <div style={{ background: "rgba(10, 15, 28, 0.7)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "20px", padding: "32px", marginBottom: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.8rem" }}>⚠️</span>
              <h3 style={{ color: "#ef4444", margin: 0, fontSize: "1.3rem" }}>
                The Fat-Tail Problem in Retail Trading
              </h3>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "16px" }}>
              In theoretical probability, an unconstrained Martingale sequence has a 100% win rate—assuming infinite capital and zero broker leverage limits. 
              In real-world retail forex, both constraints are finite. While grid bots achieve high win rates (often exceeding 80%) in ranging markets, 
              unidirectional macro trends (central bank rate shocks, geopolitical crises) cause geometric drawdown accumulation if left unbounded.
            </p>

            <h4 style={{ color: "#ffffff", fontSize: "1.05rem", marginTop: "24px", marginBottom: "12px" }}>
              How EA Budak Ubat Mathematically Bounds Risk:
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <strong style={{ color: "#00f0ff", display: "block", marginBottom: "6px" }}>1. Hard Lot Cap (MaxLot)</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Once the multiplier reaches the ceiling, subsequent layers open linearly rather than multiplying geometrically, blunting drawdown growth.
                </span>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "6px" }}>2. Expanding Distance Increment</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Pip spacing widens progressively between deeper layers (e.g. 15 pips → 22 pips → 32 pips), requiring the market to travel much further before dangerous layers trigger.
                </span>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <strong style={{ color: "#f59e0b", display: "block", marginBottom: "6px" }}>3. Cent Account 100x Cushion</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  A $100 USD deposit on a Cent broker registers as 10,000 USC. When the EA trades 0.01 micro-lots, it risks pennies, providing 10-15 layers of survival breathing room.
                </span>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <strong style={{ color: "#10b981", display: "block", marginBottom: "6px" }}>4. Hard Equity Cutoff</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Configurable MaxDrawdownPct acts as a final circuit breaker, liquidating open baskets cleanly before catastrophic account loss.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: HISTORICAL TIMELINE (2017 TO PRESENT) */}
        <section id="timeline" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 05</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              Historical Milestones: 12+ Years of Continuous Iteration
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              From its 2014 initial publicization (v1.27) and open-source community forum testing to official MQL5 Market commercial verification and generative AI integration.
            </p>
          </div>

          <div className="about-timeline-wrapper">
            <div className="about-timeline-nodes" style={{ gridTemplateColumns: "1fr", gap: "24px" }}>
              <div className="about-timeline-item" style={{ borderLeftColor: "#6366f1" }}>
                <div className="about-timeline-year">2014 – 2016 · INITIAL PUBLIC GENESIS (v1.27)</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  &ldquo;EA Budak Ubat v1.27&rdquo; on MT4
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Originally engineered as an automated quantitative tool and initially publicized in 2014 as <strong>EA Budak Ubat v1.27</strong> on MT4. 
                  The name <em>&ldquo;Budak Ubat&rdquo;</em> (Malay for Medicine Boy) was established as a humble tribute to Syarief&rsquo;s 
                  pharmaceutical quality control career. Documented across early forex communities (Forex Factory, Forex Station, early Myfxbook records), 
                  it demonstrated early automated recovery capabilities that laid the groundwork for future iterations.
                </div>
              </div>

              <div className="about-timeline-item" style={{ borderLeftColor: "#3b82f6" }}>
                <div className="about-timeline-year">2017 – 2019 · FORUM EXPANSION &amp; FLEXIBLE ITERATIONS</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  &ldquo;EA Budak Ubat v1.51 Flexible&rdquo; on MT4
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Widely distributed across Southeast Asian retail forums (notably SoeHoe) as <strong>v1.51 Flexible</strong>. 
                  Introduced customizable Candle entry modes, flexible Martingale multipliers, and extensive live account forward-testing 
                  across FBS, XM, and Exness real accounts.
                </div>
              </div>

              <div className="about-timeline-item" style={{ borderLeftColor: "#00f0ff" }}>
                <div className="about-timeline-year">2020 – 2022 · QUANTITATIVE HARDENING</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  Multi-Indicator Confluence &amp; Higher-Timeframe Filters
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Refactored entry engines to incorporate Bill Williams Alligator and Ichimoku Kinko Hyo Cloud equilibrium logic. 
                  Introduced an H1 RSI momentum filter to prevent opening counter-trend baskets during macro momentum breakouts.
                </div>
              </div>

              <div className="about-timeline-item" style={{ borderLeftColor: "#10b981" }}>
                <div className="about-timeline-year">SEPTEMBER 2023 · COMMERCIALIZATION &amp; MT5 MIGRATION</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  Official Launch on MetaQuotes MQL5 Market
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Recognizing the modern performance advantages of 64-bit multi-threaded execution, Syarief engineered a complete 
                  Pure Native MQL5 rewrite. The software received official Netting and Hedging certification on the MQL5 Market, 
                  completely stripping away external DLLs to deliver 100% verified execution security.
                </div>
              </div>

              <div className="about-timeline-item" style={{ borderLeftColor: "#f59e0b" }}>
                <div className="about-timeline-year">2024 – 2025 · MULTI-SYSTEM EXPANSION</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  GoldMind AI, BracketBlitz, &amp; MathEdge Pro
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Expanded the development suite with specialized tools: <strong>GoldMind AI</strong> (bridging Python FastAPI, OpenAI vision, 
                  and MT5 for chart screenshot analysis), <strong>BracketBlitz EA</strong> (rapid-fire OCO breakout pending orders), 
                  and <strong>MathEdge Pro</strong> (mathematical sequencing for US30/NAS100).
                </div>
              </div>

              <div className="about-timeline-item" style={{ borderLeftColor: "#a855f7" }}>
                <div className="about-timeline-year">2026 · THE MODERN ERA</div>
                <div className="about-timeline-heading" style={{ fontSize: "1.15rem" }}>
                  v1.67 Intra-Candle Tick Break-Even &amp; Web Platform
                </div>
                <div className="about-timeline-text" style={{ fontSize: "0.92rem", maxWidth: "880px" }}>
                  Released the v1.67 architecture with real-time intra-candle tick break-even trailing, dynamic ADR AutoConfig AI, 
                  and automated broker whitelist authorization deployed at <strong>https://eabudakubat.com</strong>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE COMPLETE ECOSYSTEM */}
        <section id="ecosystem" className="animate-in" style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="label" style={{ margin: 0 }}>SECTION 06</span>
            <h2 style={{ fontSize: "1.9rem", marginTop: "8px" }}>
              The Algorithmic Product Ecosystem
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "900px" }}>
              A diversified suite of automated trading tools designed for different market conditions, asset classes, and risk appetites.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {[
              {
                title: "EA Budak Ubat (Flagship)",
                code: "SYS.01",
                badge: "Adaptive Grid Martingale",
                desc: "Flagship multi-method grid system featuring 4 analysis methods, dynamic ADR AutoConfig AI, and intra-candle tick basket break-even.",
                target: "EURUSD, GBPUSD, XAUUSD (M5 Cent/Standard)",
                platforms: "MT4 / MT5",
                url: "/ea-budak-ubat",
              },
              {
                title: "GoldMind AI",
                code: "SYS.02",
                badge: "Generative AI Vision",
                desc: "Automated trading system utilizing Python FastAPI to capture MT5 chart screenshots, querying OpenAI vision models for trend confirmation.",
                target: "XAUUSD (Gold), M5 / M15",
                platforms: "MT5 Exclusive",
                url: "/goldmind-ai",
              },
              {
                title: "BracketBlitz EA",
                code: "SYS.03",
                badge: "Momentum Breakout",
                desc: "Rapid-fire One-Cancels-the-Other (OCO) bracket orders deployed every 30 seconds to capture violent news breakouts without directional bias.",
                target: "News Events, High Volatility",
                platforms: "MT4 / MT5",
                url: "/bracketblitz",
              },
              {
                title: "MathEdge Pro",
                code: "SYS.04",
                badge: "Index Mathematical Bias",
                desc: "Quantitative sequencing algorithm that computes daily mathematical levels and executes a strict 3-trade sequence during NY open.",
                target: "US30 (Dow Jones), NAS100",
                platforms: "MT4 / MT5",
                url: "/mathedge-pro",
              },
              {
                title: "Encik Moku & Aligator Gozaimasu",
                code: "SYS.05",
                badge: "Trend Following",
                desc: "Zero-martingale trend-following systems confirming momentum across 4 simultaneous timeframes using Ichimoku Kumo and Alligator lines.",
                target: "Trending Forex Majors",
                platforms: "MT4 / MT5",
                url: "/encik-moku",
              },
              {
                title: "Aegis Risk Sentinel",
                code: "SYS.06",
                badge: "Institutional Risk Utility",
                desc: "On-chart Head-Up Display (HUD) monitoring floating drawdown in real-time, enforcing hard daily percentage cutoffs for prop-firm compliance.",
                target: "Universal (Prop Firm Focus)",
                platforms: "MT4 / MT5",
                url: "/products",
              },
            ].map((p, idx) => (
              <div key={idx} className="about-pillar-card" style={{ background: "rgba(15, 23, 42, 0.55)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.08em" }}>{p.code}</span>
                  <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(0, 240, 255, 0.1)", color: "#00f0ff", border: "1px solid rgba(0, 240, 255, 0.25)" }}>
                    {p.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: "14px" }}>{p.desc}</p>
                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "12px", fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
                  <span>{p.target}</span>
                  <strong style={{ color: "#ffffff" }}>{p.platforms}</strong>
                </div>
                <Link
                  href={p.url}
                  style={{ marginTop: "14px", color: "#00f0ff", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  Explore Details →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST BADGE & VERIFICATION */}
        <section style={{ marginBottom: "60px" }}>
          <MQL5TrustBadge />
        </section>

        {/* SECTION 7: GET IN TOUCH & ACTION BANNER */}
        <section id="contact" className="about-creator-card animate-in" style={{ textAlign: "center", alignItems: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#ffffff", marginBottom: "12px" }}>
            Connect Directly with the Developer
          </h2>
          <p style={{ maxWidth: "700px", margin: "0 auto 24px", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Have questions about bot parameters, set files, broker authorization, or custom quantitative development? 
            Syarief Azman provides direct technical support on Telegram.
          </p>

          <div className="about-actions-bar">
            <a
              href={TELEGRAM_PERSONAL}
              target="_blank"
              rel="noopener noreferrer"
              className="about-btn-primary"
            >
              <span>💬</span>
              <span>Telegram: @SyariefAzman</span>
              <span>→</span>
            </a>
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="about-btn-secondary"
            >
              <span>📢</span>
              <span>Join Telegram Channel (t.me/EABudakUbat)</span>
            </a>
            <Link
              href="/#broker-partners"
              className="about-btn-secondary"
              style={{ borderColor: "rgba(0, 240, 255, 0.4)", color: "#00f0ff" }}
            >
              <span>🎁</span>
              <span>Get 100% Free Lifetime License</span>
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">👑 EA Budak Ubat</h3>
              <p className="footer-desc">
                Flagship automated quantitative grid trading system and specialized Expert Advisors for MetaTrader platforms by Syarief Azman. Built with laboratory precision and real-world algorithmic engineering.
              </p>
              <div className="social-links">
                <a href="mailto:support@eabudakubat.com" className="social-link" title="Email">✉️</a>
                <a href={TELEGRAM_PERSONAL} className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram">💬</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Twitter/X">🐦</a>
                <a href={GITHUB_PROFILE} className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">💻</a>
              </div>
            </div>
            <div>
              <h4>Official Pages</h4>
              <ul className="footer-links">
                <li><Link href="/" style={{ color: "#00f0ff", fontWeight: 700 }}>Home</Link></li>
                <li><Link href="/about">About the Architect</Link></li>
                <li><Link href="/products">MQL5 Store Catalog</Link></li>
                <li><Link href="/ea-budak-ubat">EA Budak Ubat MT5/MT4</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
                <li><Link href="/changelog">Changelog &amp; Releases</Link></li>
              </ul>
            </div>
            <div>
              <h4>Authorized Brokers</h4>
              <ul className="footer-links">
                <li><a href="https://tickmill.link/46cOQ2h" target="_blank" rel="noopener noreferrer">Tickmill (Raw ECN · #1 Choice)</a></li>
                <li><a href="https://clicks.pipaffiliates.com/c?m=150422&c=862266" target="_blank" rel="noopener noreferrer">XM (100% Bonus)</a></li>
                <li><a href="https://fbs.partners?ibl=154319&ibp=588292" target="_blank" rel="noopener noreferrer">FBS (Cent Account)</a></li>
                <li><a href="https://one.justmarkets.link/a/tjrtn60m2i/landing/trade-metals-like-professional?promo=4869" target="_blank" rel="noopener noreferrer">JustMarkets (Zero Spread)</a></li>
                <li><a href="https://headway.partners/landings/en/bonus-150/?hwp=516d6b" target="_blank" rel="noopener noreferrer">Headway ($150 Bonus)</a></li>
                <li><a href="https://banner-api.hfmmalaysia.com/link/e993b134?regulator=HFSV&refid=30572923" target="_blank" rel="noopener noreferrer">HF Markets (Cent Account)</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact &amp; Official Links</h4>
              <ul className="footer-links">
                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
                <li><a href={TELEGRAM_PERSONAL} target="_blank" rel="noopener noreferrer">Telegram: @SyariefAzman</a></li>
                <li><a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">Channel: t.me/EABudakUbat</a></li>
                <li><a href={MQL5_MARKET_LINK} target="_blank" rel="noopener noreferrer">MQL5 Market (Official MT5)</a></li>
                <li><a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">GitHub: syarief02</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Automated grid and martingale systems can result in significant loss of capital. Past performance is not indicative of future results. Always test on a demo account first. Official domain: https://eabudakubat.com.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

