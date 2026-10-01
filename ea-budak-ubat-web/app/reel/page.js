"use client";

import { useState } from "react";
import Link from "next/link";
import { playTactileClick } from "@/lib/audioSynthesizer";

const SCENES = [
  {
    num: "01",
    title: "The Golden Forge",
    time: "0.0s – 6.0s",
    img: "/reel/scene1_matrix.jpg",
    headline: "A Single Spark of Molten Gold. An Ecosystem Born.",
    desc: "A pure drop of liquid gold descends in slow motion, triggering expanding concentric shockwaves across deep space. From the gold pool rises the iconic Crown emblem, stamped in 24K gold foil typography.",
    sfx: "Sub-bass drone (D1 36Hz) + metallic liquid splash + resonant acoustic chime + 4-note ascending piano motif.",
    badge: "Act 1 // The Forge",
    color: "#D4AF37"
  },
  {
    num: "02",
    title: "Precision Engine: EA Budak Ubat",
    time: "6.0s – 12.0s",
    img: "/reel/scene2_flagship.jpg",
    headline: "Laboratory-Grade QC Meets Algorithmic Execution",
    desc: "The golden crown transforms into interlocking Swiss chronometer gears: ADR AI Volatility Engine, Real-Time Break-Even, Risk Management, OnTick() Execution, and Capital Safeguard inside a spherical golden gyro.",
    sfx: "Microsecond clockwork ticking + gear mesh metallic texture + strings swell + electronic rhythm pulse.",
    badge: "Act 2 // Precision Engine",
    color: "#F0D060"
  },
  {
    num: "03",
    title: "Dynamic Orbital Trajectory",
    time: "12.0s – 15.0s",
    img: "/reel/scene3_breakeven.jpg",
    headline: "Multi-Asset Confluence in Cosmic Orbit",
    desc: "The golden gyro expands into space, launching specialized algorithms into dynamic elliptical orbits. Real-time telemetry channels price action into algorithmic order matrices.",
    sfx: "Whip-pan stereo whoosh + accelerating tempo + synthesized arpeggios.",
    badge: "Act 3 // Orbital Trajectory",
    color: "#D4AF37"
  },
  {
    num: "04",
    title: "The Multi-Algorithm Arsenal",
    time: "15.0s – 18.0s",
    img: "/reel/scene4_arsenal.jpg",
    headline: "6 Elite Quantitative Systems. One Unified Arsenal.",
    desc: "Six minted 3D gold medallions orbit in a cosmic double helix against amber candlestick telemetry: EA Budak Ubat, GoldMind AI, MathEdge Pro, Aligator Gozaimasu, Encik Moku, and BracketBlitz.",
    sfx: "Full beat drops + 6-stage ascending coin chime scale (D5 to D6) + orchestral crescendo.",
    badge: "Act 4 // The Arsenal",
    color: "#F0D060"
  },
  {
    num: "05",
    title: "The Gift: $149 USD → $0 FREE",
    time: "18.0s – 24.0s",
    img: "/reel/scene5_freelicense.jpg",
    headline: "100% Free Lifetime Whitelist via Partner Brokers",
    desc: "A golden luxury vault unlocks with radiant light particles. The standard $149 USD retail price tag is dynamically struck through, exploding into a triumphant $0 FREE lifetime whitelist verification for all 14 partner brokers.",
    sfx: "Vault latch release + ascending chime cascade + massive 808 sub drop + triumphant brass hit.",
    badge: "Act 5 // The Gift",
    color: "#10B981"
  },
  {
    num: "06",
    title: "The Call: Deploy Today",
    time: "24.0s – 30.0s",
    img: "/reel/scene6_cta.jpg",
    headline: "eabudakubat.com · 3 Simple Steps to Algorithmic Freedom",
    desc: "The 3D Golden Crown settles in full grandeur. The official domain https://eabudakubat.com ignites with illuminated underline, guiding traders through the 3-step setup: Choose Broker, Verify Whitelist, and Deploy.",
    sfx: "Resonant major bell + descending resolution piano melody + warm reverb sustain.",
    badge: "Act 6 // The Call",
    color: "#D4AF37"
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
          <div className="hero-badge" style={{ borderColor: "rgba(212, 175, 55, 0.4)", background: "rgba(212, 175, 55, 0.08)", marginBottom: "20px" }}>
            <span className="hero-badge-dot" style={{ background: "#D4AF37", boxShadow: "0 0 10px #D4AF37" }}></span>
            <span style={{ color: "#D4AF37", letterSpacing: "0.08em", fontWeight: 800 }}>
              👑 LIQUID GOLD EDITION · OFFICIAL 30-SECOND MOTION GRAPHICS REEL
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, marginBottom: "20px" }}>
            <span className="gradient-text" style={{ background: "linear-gradient(135deg, #F0D060 0%, #D4AF37 50%, #CD7F32 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Liquid Gold Precision</span>
            <br />
            <span style={{ fontSize: "0.65em", color: "#ffffff", fontWeight: 800 }}>
              EA Budak Ubat Cinematic Motion Showcase
            </span>
          </h1>

          <p style={{ maxWidth: "780px", margin: "0 auto 36px", color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Experience 30 seconds of luxury cinematic motion design: The Golden Forge, Precision Swiss Chronometer Gears, 6 Elite Quantitative Systems, the $0 Free Whitelist Gift, and Instant Deployment at <strong style={{ color: "#D4AF37" }}>eabudakubat.com</strong>.
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
