"use client";

import { useState } from "react";
import Link from "next/link";
import { playTactileClick } from "@/lib/audioSynthesizer";

const SCENES = [
  {
    num: "01",
    title: "The Volatility Matrix",
    time: "0.0s – 4.5s",
    img: "/reel/scene1_matrix.jpg",
    headline: "Volatily is Chaos. Until You Quantify It.",
    desc: "3D perspective grid rolls forward in deep space beneath a particle starfield. Holographic 24-candlestick chart materializes with real-time SMA line and live tick price tags.",
    sfx: "Sub-bass 808 drop (130Hz -> 28Hz) + electric boot hum + stereo whoosh.",
    badge: "Act 1 // Matrix",
    color: "#00f0ff"
  },
  {
    num: "02",
    title: "Flagship Reveal: EA Budak Ubat v1.67",
    time: "4.5s – 9.5s",
    img: "/reel/scene2_flagship.jpg",
    headline: "4 Quantitative Engines · 1 Unstoppable Brain",
    desc: "Golden crown emblem inside a glowing cyan hexagon badge. Concentric HUD calipers spin in counter-rotation. Four satellite nodes ignite at 90° angles (Ichimoku, Alligator, SMA20, Candle Action).",
    sfx: "Full beat drops (4-on-the-floor kick, rolling 16th saw bass) + 4 laser lock-on chirps.",
    badge: "Act 2 // Flagship",
    color: "#f59e0b"
  },
  {
    num: "03",
    title: "Dynamic ADR AI & Tick Break-Even",
    time: "9.5s – 15.0s",
    img: "/reel/scene3_breakeven.jpg",
    headline: "Real-Time Volatility Tracking & Zero Drawdown Panic",
    desc: "20-Day ADR arc gauge calculates daily pips. Multi-order basket levels cascade downwards. Rebounding price pierces threshold, triggering an intense laser snap that secures +$1,842.60.",
    sfx: "Sci-fi frequency sweep + ascending major chord profit chime (C6 -> E6 -> G6 -> C7).",
    badge: "Act 3 // Break-Even",
    color: "#10b981"
  },
  {
    num: "04",
    title: "The Multi-Algorithm Arsenal",
    time: "15.0s – 20.5s",
    img: "/reel/scene4_arsenal.jpg",
    headline: "Specialized Quants for Gold, Indices & Forex",
    desc: "Camera whip-pans into a 4-card quantum array: GoldMind AI (XAUUSD), BracketBlitz EA (OCO Breakout), MathEdge Pro (US30 & NAS100), and Encik Moku (Ichimoku Trend).",
    sfx: "Crash cymbal, stereo whip-pan whooshes, and melodic counterpoint arpeggios.",
    badge: "Act 4 // Arsenal",
    color: "#8b5cf6"
  },
  {
    num: "05",
    title: "100% Free Lifetime Whitelist",
    time: "20.5s – 25.5s",
    img: "/reel/scene5_freelicense.jpg",
    headline: "Save $149 Upfront · Zero Subscription Fees",
    desc: "3D rotating diamond token lands in center. Tier-1 partner broker badges orbit in 3D (FBS, Tickmill, RoboForex, XM, Eightcap, JustMarkets). Verified security shield confirms instant whitelist.",
    sfx: "Heavy metallic impact + golden coin shimmer sparkle sequence (2400Hz to 3800Hz).",
    badge: "Act 5 // Whitelist",
    color: "#00f0ff"
  },
  {
    num: "06",
    title: "Climax & Call To Action",
    time: "25.5s – 30.0s",
    img: "/reel/scene6_cta.jpg",
    headline: "Trade Smarter. Automate Today.",
    desc: "16-step snare roll tension riser into explosive drop. Grand domain lockup for eabudakubat.com with glowing laser underline, pulsing CTA button, and live Account Checker mockup.",
    sfx: "Snare roll build-up, massive sub punch, 9-voice polyphonic octave chord, and trailing echo.",
    badge: "Act 6 // Climax",
    color: "#10b981"
  }
];

export default function ReelPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
            <li><Link href="/products" onClick={() => setMobileNavOpen(false)}>🛒 Products</Link></li>
            <li><Link href="/tools" onClick={() => setMobileNavOpen(false)}>⚙️ Tools</Link></li>
            <li><Link href="/community" onClick={() => setMobileNavOpen(false)}>Community</Link></li>
            <li><Link href="/#authorization" onClick={() => setMobileNavOpen(false)} style={{ color: "#10b981", fontWeight: 700 }}>⚡ Whitelist</Link></li>
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
      <section className="hero catalog-hero" style={{ padding: "120px 0 60px" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">映像展示</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)", marginBottom: "20px" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              🎬 OFFICIAL 30-SECOND MOTION GRAPHICS REEL // 1080P 60FPS
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, marginBottom: "20px" }}>
            <span className="gradient-text">The Quantum Advantage</span>
            <br />
            <span style={{ fontSize: "0.65em", color: "#ffffff", fontWeight: 800 }}>
              EA Budak Ubat Motion Design Showcase
            </span>
          </h1>

          <p style={{ maxWidth: "760px", margin: "0 auto 36px", color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Experience 30 seconds of high-velocity motion design: 4 Quantitative Analysis Engines, Dynamic 20-Day ADR AutoConfig AI, Real-Time Tick Break-Even Trailing, and 100% Free Lifetime Whitelist Access.
          </p>

          {/* MASTER VIDEO PLAYER */}
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto 40px",
              background: "#000",
              borderRadius: "20px",
              border: "1px solid rgba(0, 240, 255, 0.35)",
              boxShadow: "0 25px 80px rgba(0, 240, 255, 0.25), 0 0 0 1px rgba(0, 240, 255, 0.2)",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <video
                src="/videos/ea_budak_ubat_30s.mp4"
                controls
                playsInline
                poster="/reel/scene2_flagship.jpg"
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                background: "rgba(10, 14, 26, 0.9)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "#94a3b8" }}>
                <span style={{ color: "#00f0ff", fontWeight: 700 }}>● 1920×1080 Full HD</span>
                <span>·</span>
                <span>H.264 High Profile</span>
                <span>·</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>44.1kHz Stereo AAC</span>
              </div>
              <a
                href="/videos/ea_budak_ubat_30s.mp4"
                download="ea_budak_ubat_motion_graphics_30s.mp4"
                className="btn btn-primary"
                onClick={() => playTactileClick(0.12)}
                style={{
                  fontSize: "0.9rem",
                  padding: "10px 22px",
                  background: "linear-gradient(135deg, #00f0ff, #0284c7)",
                  color: "#030509",
                  fontWeight: 800,
                  border: "none",
                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)",
                }}
              >
                ⬇️ Download Master Video (1080p MP4)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ACT-BY-ACT BREAKDOWN */}
      <section style={{ padding: "60px 0 100px", position: "relative" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="label" style={{ color: "#00f0ff", borderColor: "rgba(0, 240, 255, 0.3)" }}>
              ⚡ 6-ACT VISUAL BREAKDOWN // 制作詳細
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginTop: "12px" }}>
              Scene-by-Scene Motion Architecture
            </h2>
            <p style={{ maxWidth: "680px", margin: "10px auto 0", color: "#94a3b8" }}>
              Every millisecond of animation was engineered with mathematical precision, dynamic perspective grids, and synchronized procedural sound synthesis.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
            {SCENES.map((s) => (
              <div
                key={s.num}
                style={{
                  background: "rgba(10, 16, 32, 0.75)",
                  border: `1px solid ${s.color}33`,
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 20px ${s.color}15`,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(3, 5, 9, 0.8)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${s.color}`,
                      color: s.color,
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontFamily: "monospace",
                    }}
                  >
                    {s.badge} · {s.time}
                  </div>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
                    {s.title}
                  </h3>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: s.color }}>
                    {s.headline}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.5, flex: 1 }}>
                    {s.desc}
                  </p>
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      fontSize: "0.78rem",
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    <span style={{ color: "#e2e8f0", fontWeight: 700 }}>SFX: </span>
                    {s.sfx}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM CTA CALLOUT */}
          <div
            style={{
              marginTop: "80px",
              padding: "50px 30px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(16, 185, 129, 0.08))",
              border: "1px solid rgba(0, 240, 255, 0.35)",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 240, 255, 0.15)",
            }}
          >
            <h3 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "14px", color: "#fff" }}>
              Ready to Deploy EA Budak Ubat on Your Live Account?
            </h3>
            <p style={{ maxWidth: "650px", margin: "0 auto 28px", color: "#94a3b8", fontSize: "1.05rem" }}>
              Save $149 USD upfront. Open a live trading account with one of our official regulated partner brokers to receive an instant, 100% free lifetime license whitelist.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/#broker-partners"
                className="btn btn-primary"
                onClick={() => playTactileClick(0.12)}
                style={{
                  padding: "14px 34px",
                  fontSize: "1.05rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #00f0ff, #3b82f6)",
                  color: "#0a0e1a",
                  border: "none",
                  boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
                }}
              >
                🎁 Choose Broker &amp; Get EA Free ➜
              </Link>
              <Link
                href="/#authorization"
                className="btn btn-secondary"
                onClick={() => playTactileClick(0.08)}
                style={{
                  padding: "14px 28px",
                  fontSize: "1rem",
                  fontWeight: 800,
                  background: "rgba(16, 185, 129, 0.15)",
                  borderColor: "rgba(16, 185, 129, 0.5)",
                  color: "#10b981",
                }}
              >
                ⚡ Whitelist Checker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading Forex, Gold, and CFDs on margin carries a high level of risk. Test on demo accounts before deploying live capital.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
