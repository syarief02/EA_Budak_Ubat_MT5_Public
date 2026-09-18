"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AccountChecker from "@/app/components/AccountChecker";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import LiveStrategySimulator from "@/app/components/LiveStrategySimulator";
import PriceTierUrgency from "@/app/components/PriceTierUrgency";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import SetGenerator from "@/app/components/SetGenerator";
import GridCalculator from "@/app/components/GridCalculator";
import { playTactileClick } from "@/lib/audioSynthesizer";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.67%20-%20MT5%20-%2020260930.ex5";
const PURCHASE_LINK = "https://tinyurl.com/eabubuy";
const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

const POST_TYPES = [
  { key: "idea", label: "💡 Idea", color: "#8b5cf6" },
  { key: "feedback", label: "💬 Feedback", color: "#3b82f6" },
  { key: "ea_request", label: "🤖 Request EA", color: "#f59e0b" },
];

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (seconds < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const PRODUCTS = [
  {
    slug: "ea-budak-ubat",
    name: "EA Budak Ubat",
    version: "v1.67",
    tagline: "Autonomous Quantitative Grid Martingale Engine",
    description: "The flagship automated trading system for MetaTrader 5 & 4. Features 4 quantitative analysis engines (Candle, SMA20, Alligator, Ichimoku), dynamic 20-day ADR AutoConfig AI, intra-candle tick basket break-even trailing, and multi-tier margin safeguards.",
    platforms: ["MT4", "MT5"],
    highlights: ["4 Entry Engines", "AutoConfig AI", "Tick Break-Even Trailing", "Dual-Track Licensing"],
    gradient: "linear-gradient(135deg, #00f0ff, #3b82f6)",
    accentColor: "#00f0ff",
    icon: "👑",
    status: "Flagship",
    category: "Quantitative Grid",
    kanjiCategory: "旗艦グリッド取引",
    systemCode: "SYS.01",
  },
  {
    slug: "goldmind-ai",
    name: "GoldMind AI",
    version: "v1.01",
    tagline: "AI-Powered XAUUSD Signal Trading",
    description: "An AI-powered trading system that uses ChatGPT to analyze gold (XAUUSD) price charts and automatically place trades in MetaTrader 5. Runs entirely on your computer with FastAPI + OpenAI + MQL5.",
    platforms: ["MT5"],
    highlights: ["ChatGPT Analysis", "6 Safety Filters", "Smart Lot Sizing", "Auto Refresh"],
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    accentColor: "#f59e0b",
    icon: "🤖",
    status: "Live",
    category: "AI Trading",
    kanjiCategory: "AI信号分析",
    systemCode: "SYS.02",
  },
  {
    slug: "bracketblitz",
    name: "BracketBlitz EA",
    version: "v1.00",
    tagline: "OCO Bracket Breakout Strategy",
    description: "Rapid-fire OCO bracket orders that chase the market — Buy Stop + Sell Stop, auto-refreshed every 30 seconds. Catches breakouts without predicting direction. Works on any instrument.",
    platforms: ["MT4", "MT5"],
    highlights: ["OCO Orders", "Trailing Stop", "Auto Refresh", "News Trading"],
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    accentColor: "#10b981",
    icon: "⚡",
    status: "Live",
    category: "Breakout",
    kanjiCategory: "ブレイクアウト",
    systemCode: "SYS.03",
  },
  {
    slug: "mathedge-pro",
    name: "MathEdge Pro",
    version: "v1.1",
    tagline: "Math-Based US Index Trading",
    description: "Automated math-based index trading for US30 and NAS100. Calculates daily levels, determines directional bias, and executes a strict 3-trade pending order sequence.",
    platforms: ["MT4", "MT5"],
    highlights: ["US30 & NAS100", "3-Trade Sequence", "NY Session", "Dashboard"],
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    accentColor: "#ef4444",
    icon: "📐",
    status: "Live",
    category: "Index Trading",
    kanjiCategory: "指数計算",
    systemCode: "SYS.04",
  },
  {
    slug: "aligator-gozaimasu",
    name: "Aligator Gozaimasu",
    version: "v1.06",
    tagline: "Multi-Timeframe Alligator Trend EA",
    description: "Trades based on Bill Williams Alligator, Awesome Oscillator, RSI, and Stochastic — confirmed across up to 4 timeframes. Buys uptrends, sells downtrends. Includes auto-compounding and martingale recovery.",
    platforms: ["MT4", "MT5"],
    highlights: ["4 Indicators", "5 MTF Modes", "Auto-Compounding", "Martingale"],
    gradient: "linear-gradient(135deg, #22c55e, #059669)",
    accentColor: "#22c55e",
    icon: "🐊",
    status: "Live",
    category: "Trend Following",
    kanjiCategory: "トレンドフォロー",
    systemCode: "SYS.05",
  },
  {
    slug: "encik-moku",
    name: "Encik Moku",
    version: "v1.06",
    tagline: "Multi-Timeframe Ichimoku Trend EA",
    description: "Trades based on Ichimoku Kinko Hyo, RSI, and Stochastic — confirmed across up to 4 timeframes. Buys above the Kumo cloud, sells below. Includes auto-compounding and martingale recovery.",
    platforms: ["MT4", "MT5"],
    highlights: ["Ichimoku Cloud", "5 MTF Modes", "Auto-Compounding", "Martingale"],
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    accentColor: "#f59e0b",
    icon: "🏯",
    status: "Live",
    category: "Trend Following",
    kanjiCategory: "雲追跡トレンド",
    systemCode: "SYS.06",
  },
];

const STRATEGY_DATA = {
  "ea-budak-ubat": {
    name: "EA Budak Ubat",
    version: "v1.67",
    tagline: "Flagship Autonomous Grid Martingale Engine (Real-Time Tick Trailing)",
    desc: "Autonomous dynamic grid with break-even TP pooling, 4 technical entry modes (SMA20, Candle, Alligator, Ichimoku), 20-day ADR AutoConfig AI, and real-time tick basket break-even trailing for ranging markets.",
    winRate: "84.2%",
    drawdown: "< 12.8%",
    timeframe: "M5 Recommended",
    instruments: "Ranging FX Pairs (EURUSD, GBPUSD, AUDUSD, Cent Gold)",
    sparkline: "M0,110 Q50,90 100,98 T200,75 T300,60 T400,38 T500,20",
    color: "#00f0ff",
    code: "SYS.01",
  },
  "goldmind-ai": {
    name: "GoldMind AI",
    version: "v1.01",
    tagline: "Neural Signal Engine (ChatGPT 4o-mini + MQL5 Bridge)",
    desc: "Computer vision & LLM chart reasoning algorithm designed exclusively for XAUUSD gold breakouts with strict news and volatility gating.",
    winRate: "91.0%",
    drawdown: "< 8.5%",
    timeframe: "M15 / H1 Analysis",
    instruments: "XAUUSD (Gold)",
    sparkline: "M0,120 Q60,110 120,80 T240,65 T360,40 T440,25 T500,12",
    color: "#f59e0b",
    code: "SYS.02",
  },
  "bracketblitz": {
    name: "BracketBlitz EA",
    version: "v1.00",
    tagline: "Dual OCO Rapid-Fire Momentum Engine",
    desc: "Perpetually refreshes Buy Stop + Sell Stop brackets surrounding active price every 30s. Designed for high-impact CPI, NFP, and FOMC catalysts.",
    winRate: "78.5%",
    drawdown: "< 14.0%",
    timeframe: "M1 / M5 Catalyst",
    instruments: "All Major FX & Metals",
    sparkline: "M0,105 Q70,95 140,82 T260,70 T380,45 T450,30 T500,18",
    color: "#10b981",
    code: "SYS.03",
  },
  "mathedge-pro": {
    name: "MathEdge Pro",
    version: "v1.1",
    tagline: "Statistical Quantitative Sequence Model",
    desc: "Engineered specifically for US30 Dow Jones and NAS100 tech indices during high-liquidity New York session openings.",
    winRate: "82.0%",
    drawdown: "< 11.2%",
    timeframe: "M15 NY Session",
    instruments: "US30 / NAS100",
    sparkline: "M0,115 Q80,100 150,78 T270,55 T390,35 T460,22 T500,14",
    color: "#ef4444",
    code: "SYS.04",
  },
  "aligator-gozaimasu": {
    name: "Aligator Gozaimasu",
    version: "v1.06",
    tagline: "Multi-Timeframe Trend Confirmation Suite",
    desc: "Synchronizes Bill Williams Alligator lips/teeth/jaws across up to 4 simultaneous timeframes with auto-compounding lot scaling.",
    winRate: "86.5%",
    drawdown: "< 13.5%",
    timeframe: "M15 / H1 Confirmation",
    instruments: "EURUSD, GBPUSD, USDJPY",
    sparkline: "M0,112 Q65,92 135,74 T255,58 T375,38 T445,24 T500,15",
    color: "#22c55e",
    code: "SYS.05",
  },
  "encik-moku": {
    name: "Encik Moku",
    version: "v1.06",
    tagline: "Cloud Kumo Equilibrium & Trend Following",
    desc: "Automated Ichimoku Kinko Hyo strategy executing entries above bullish Kumo clouds with RSI & Stochastic confirmation filters.",
    winRate: "85.0%",
    drawdown: "< 12.0%",
    timeframe: "M30 / H1 Trend",
    instruments: "Trend-Dominant FX",
    sparkline: "M0,118 Q75,102 145,80 T265,60 T385,40 T455,26 T500,16",
    color: "#f59e0b",
    code: "SYS.06",
  },
};

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState("ea-budak-ubat");
  const [activeTool, setActiveTool] = useState("simulator"); // simulator, presets, calculator, license
  const currentStrat = STRATEGY_DATA[activeStrategy] || STRATEGY_DATA["ea-budak-ubat"];

  // Community State
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    type: "feedback",
    ea_name: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [botTrap, setBotTrap] = useState("");
  const [formRenderedAt, setFormRenderedAt] = useState(Date.now());
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ea_comment_reactions") || "{}");
      setReactions(saved);
    } catch (e) {}
  }, []);

  const handleReaction = (commentId, type) => {
    playTactileClick(0.09);
    setReactions((prev) => {
      const current = prev[commentId] || {};
      const count = current[type] || 0;
      const userReacted = current[`user_${type}`];
      const updated = {
        ...prev,
        [commentId]: {
          ...current,
          [type]: userReacted ? Math.max(0, count - 1) : count + 1,
          [`user_${type}`]: !userReacted,
        },
      };
      try {
        localStorage.setItem("ea_comment_reactions", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Fetch comments from secure API gateway
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    setLoading(true);
    try {
      const res = await fetch("/api/comments");
      const json = await res.json();
      if (json.success && json.comments) {
        setComments(json.comments);
      }
    } catch (err) {
      console.error("Fetch comments error:", err);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitError("Please fill in your name and message.");
      return;
    }

    if (formData.type === "ea_request" && !formData.ea_name.trim()) {
      setSubmitError("Please provide a name for the EA you're requesting.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        type: formData.type,
        message: formData.message.trim(),
        bot_catch: botTrap,
        form_rendered_at: formRenderedAt,
      };

      if (formData.type === "ea_request" && formData.ea_name.trim()) {
        payload.ea_name = formData.ea_name.trim();
      }

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setSubmitError(json.error || "Something went wrong. Please try again.");
      } else {
        setSubmitSuccess(true);
        setFormData({ name: "", type: "feedback", ea_name: "", message: "" });
        setBotTrap("");
        setFormRenderedAt(Date.now());
        fetchComments();
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (err) {
      setSubmitError("Network error. Please try again.");
      console.error("Submit error:", err);
    }

    setSubmitting(false);
  }

  const filteredComments = (
    filter === "all" ? comments : comments.filter((c) => c.type === filter)
  ).filter((c) => {
    const ea = (c.ea_name || "").toLowerCase();
    const msg = (c.message || "").toLowerCase();
    const nm = (c.name || "").toLowerCase();
    return !ea.includes("daltus") && !msg.includes("daltus") && !nm.includes("daltus");
  });

  const getTypeInfo = (type) =>
    POST_TYPES.find((t) => t.key === type) || POST_TYPES[1];

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
  }, [comments, filter, loading]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="nav-brand">👑 EA Budak Ubat</a>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><a href="#flagship" onClick={() => setMobileNavOpen(false)} style={{ color: "#00f0ff", fontWeight: 700 }}>Flagship</a></li>
            <li><a href="#architecture" onClick={() => setMobileNavOpen(false)}>Engines</a></li>
            <li><a href="#tools" onClick={() => { setActiveTool("simulator"); setMobileNavOpen(false); }}>Simulator</a></li>
            <li><a href="#tools" onClick={() => { setActiveTool("presets"); setMobileNavOpen(false); }}>Presets</a></li>
            <li><a href="#tools" onClick={() => { setActiveTool("calculator"); setMobileNavOpen(false); }}>Calculator</a></li>
            <li><a href="#ecosystem" onClick={() => setMobileNavOpen(false)}>Ecosystem</a></li>
            <li><Link href="/learn" onClick={() => setMobileNavOpen(false)} style={{ color: "#38bdf8", fontWeight: 700 }}>Forex Game 🎮</Link></li>
            <li><a href="#tools" onClick={() => { setActiveTool("license"); setMobileNavOpen(false); }}>License</a></li>
            <li><Link href="/changelog" onClick={() => setMobileNavOpen(false)}>Changelog</Link></li>
            <li><a href="#community-hub" onClick={() => setMobileNavOpen(false)}>Community</a></li>
            <li>
              <a
                href={MQL5_MARKET_LINK}
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", fontWeight: 700 }}
              >
                Buy MT5 ($149)
              </a>
            </li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* FLAGSHIP HERO */}
      <section className="hero catalog-hero" id="flagship">
        <div className="jp-kanji-watermark" aria-hidden="true">旗艦自動売買</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              👑 FLAGSHIP ALGORITHMIC GRID SYSTEM · v1.67 LIVE
            </span>
          </div>

          <h1>
            <span className="gradient-text">EA Budak Ubat</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: "860px", margin: "0 auto 24px" }}>
            The premier autonomous grid martingale engine engineered for MetaTrader 5 & MetaTrader 4.
            Harnesses 4 quantitative entry engines, 20-day ADR AutoConfig AI, and real-time intra-candle tick
            basket break-even trailing to turn ranging market volatility into systematic returns.
          </p>

          {/* DUAL-TRACK ACQUISITION MATRIX */}
          <div className="dual-track-container animate-in">
            {/* Track 1: Official MQL5 Market Edition */}
            <div className="track-card featured">
              <div>
                <span className="track-tag mql5">★ Recommended · Standalone</span>
                <h3 className="track-title">Official MQL5 Market Edition (MT5)</h3>
                <p className="track-desc">
                  Instant activation via MetaQuotes MQL5 Market. No broker lock, no account number restrictions, and zero monthly expiration.
                </p>
                <ul className="track-checklist">
                  <li><span className="check-icon">✓</span> 20 MetaTrader 5 Terminal Activations</li>
                  <li><span className="check-icon">✓</span> Native MetaQuotes DRM & Automatic Cloud Delivery</li>
                  <li><span className="check-icon">✓</span> Free Lifetime Updates Directly in MT5 Terminal</li>
                  <li><span className="check-icon">✓</span> Hedging & Netting Account Certified</li>
                </ul>
              </div>

              <div className="track-actions">
                <a
                  href={MQL5_MARKET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-mql5-primary"
                  onClick={() => playTactileClick(0.12)}
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

            {/* Track 2: Free Community Whitelist Edition */}
            <div className="track-card">
              <div>
                <span className="track-tag community">Free / Partner Whitelist</span>
                <h3 className="track-title">Community Whitelist Edition (MT4 & MT5)</h3>
                <p className="track-desc">
                  Run 100% free on unlimited Demo accounts or register a Live account under our broker partner link for permanent whitelist authorization.
                </p>
                <ul className="track-checklist">
                  <li><span className="check-icon">✓</span> MetaTrader 4 & MetaTrader 5 Binaries (.ex4 / .ex5)</li>
                  <li><span className="check-icon">✓</span> 100% Unlimited Free Demo Account Testing</li>
                  <li><span className="check-icon">✓</span> Free Whitelist via Partner Brokers (XM, FBS, JustMarkets)</li>
                  <li><span className="check-icon">✓</span> Full Access to Preset Studio & Margin Calculator</li>
                </ul>
              </div>

              <div className="track-actions">
                <div className="track-buttons-row">
                  <a
                    href={DOWNLOAD_MT5}
                    className="btn btn-primary"
                    onClick={() => playTactileClick(0.1)}
                  >
                    ⬇️ Download MT5 (v1.67)
                  </a>
                  <a
                    href={DOWNLOAD_MT4}
                    className="btn btn-secondary"
                    onClick={() => playTactileClick(0.1)}
                  >
                    ⬇️ Download MT4 (v1.62)
                  </a>
                </div>
                <div className="track-buttons-row" style={{ marginTop: "6px" }}>
                  <a
                    href="#tools"
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setActiveTool("presets"); playTactileClick(0.08); }}
                  >
                    ⚙️ Presets (.set)
                  </a>
                  <a
                    href="#tools"
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setActiveTool("calculator"); playTactileClick(0.08); }}
                  >
                    🧮 Risk Calculator
                  </a>
                  <a
                    href={PURCHASE_LINK}
                    className="btn btn-secondary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(0.08)}
                  >
                    🛒 Buy MT4
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC PRICE TIER URGENCY PROGRESS & TRUST BADGE */}
          <div style={{ margin: "20px auto 10px", maxWidth: "1000px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              <PriceTierUrgency
                currentPrice={149}
                nextPrice={159}
                soldInTier={7}
                tierLimit={10}
                marketUrl={MQL5_MARKET_LINK}
                compact={true}
              />
              <MQL5TrustBadge
                productUrl={MQL5_MARKET_LINK}
                compact={true}
              />
            </div>
          </div>

          {/* FLAGSHIP COCKPIT TERMINAL HUD */}
          <div className="flagship-terminal-hud animate-in">
            <div className="flagship-hud-header">
              <div className="flagship-hud-dots">
                <span className="flagship-hud-dot red"></span>
                <span className="flagship-hud-dot amber"></span>
                <span className="flagship-hud-dot green"></span>
                <span style={{ marginLeft: "6px", fontWeight: 700, color: "#e2e8f0" }}>
                  EA BUDAK UBAT v1.67 // LIVE RUNTIME TELEMETRY
                </span>
              </div>
              <div className="flagship-hud-live-tag">
                <span className="pulse-dot-green"></span>
                <span>REALTIME TICK MONITOR ACTIVE</span>
              </div>
            </div>

            <div className="flagship-hud-body">
              <div className="flagship-hud-grid">
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Asset & Timeframe</div>
                  <div className="flagship-hud-val" style={{ color: "#38bdf8" }}>EURUSD · M5 (Dynamic ADR)</div>
                </div>
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Entry Engine Mode</div>
                  <div className="flagship-hud-val" style={{ color: "#a855f7" }}>ICHIMOKU CLOUD (AutoConfig)</div>
                </div>
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Basket Position Layering</div>
                  <div className="flagship-hud-val" style={{ color: "#10b981" }}>3 BUY ORDERS (0.07 Lots)</div>
                </div>
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Weighted Break-Even Lock</div>
                  <div className="flagship-hud-val" style={{ color: "#00f0ff" }}>1.08420 (+2.0 Pips Guaranteed)</div>
                </div>
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Intra-Candle Tick Guard</div>
                  <div className="flagship-hud-val" style={{ color: "#34d399" }}>ACTIVE (0.0ms Latency in OnTick)</div>
                </div>
                <div className="flagship-hud-cell">
                  <div className="flagship-hud-label">Emergency Margin Cushion</div>
                  <div className="flagship-hud-val" style={{ color: "#f59e0b" }}>4,850% (Protected &gt; 200%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* TELEMETRY STRIP */}
          <div className="jp-telemetry-strip animate-in" style={{ marginTop: "24px" }}>
            <div className="jp-telemetry-item">
              <span className="jp-telemetry-dot"></span>
              <span>MODEL WIN RATE: <span className="jp-telemetry-val" style={{ color: "var(--liquid-cyan)" }}>84.2%</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>MAX DRAWDOWN: <span className="jp-telemetry-val" style={{ color: "var(--liquid-emerald)" }}>&lt; 12.8%</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>SUPPORT: <span className="jp-telemetry-val">MT4 &amp; MT5 COMPATIBLE</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>ACCOUNTS: <span className="jp-telemetry-val">900+ AUTHORIZED</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ROTATING PROMO BANNER STRIP */}
      <section className="promo-banner-strip">
        <div className="container">
          <RotatingAdBanner variant="strip" />
        </div>
      </section>

      {/* WHAT'S NEW IN V1.67 BANNER */}
      <div className="container" style={{ marginTop: "30px", marginBottom: "30px", position: "relative", zIndex: 10 }}>
        <div className="v163-banner-card animate-in">
          <div className="v163-banner-left">
            <span className="v163-banner-icon">🚀</span>
            <div>
              <h4 className="v163-banner-title">What's New in v1.67 Release: Real-Time Intra-Candle Tick Guard</h4>
              <p className="v163-banner-desc">
                Resolved the basket break-even StopLoss conflict, promoted profit lock evaluation directly to OnTick() execution for instantaneous intra-candle spikes, added parameter clamp safeguards, and eliminated core calculation latency.
              </p>
            </div>
          </div>
          <Link href="/changelog" className="btn btn-secondary btn-sm" style={{ animation: "none", whiteSpace: "nowrap" }}>
            View v1.67 Changelog →
          </Link>
        </div>
      </div>

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* CORE QUANTITATIVE ARCHITECTURE */}
      <section id="architecture">
        <div className="jp-kanji-watermark" aria-hidden="true">中核設計</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">SYSTEM ARCHITECTURE // 技術的特徴</span>
            <h2>The Four Quantitative Analysis Engines</h2>
            <p>
              EA Budak Ubat features 4 algorithmic entry models tailored to diverse market conditions, supported by dynamic AutoConfig AI and multi-tiered capital protection.
            </p>
          </div>

          <div className="architecture-grid">
            <div className="arch-card animate-in">
              <span className="arch-icon">🕯️</span>
              <h3 className="arch-title">1. Classic Candle Momentum</h3>
              <p className="arch-desc">
                High-probability price action engine reading consecutive candlestick closures, wick rejection ratios, and impulse body thresholds to initiate directional positioning with tight spread gating.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">📈</span>
              <h3 className="arch-title">2. Dynamic SMA20 Channel</h3>
              <p className="arch-desc">
                Calculates the 20-period simple moving average equilibrium channel. Executes mean-reversion counter-trend entries when price extends beyond channel bands, capturing high-frequency pullbacks.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">🐊</span>
              <h3 className="arch-title">3. Alligator Momentum Trio</h3>
              <p className="arch-desc">
                Incorporates Bill Williams Jaw (13), Teeth (8), and Lips (5) smoothed moving averages. Filters false breakouts by demanding synchronized jaw-alignment before committing grid capital.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">🏯</span>
              <h3 className="arch-title">4. Ichimoku Cloud Equilibrium</h3>
              <p className="arch-desc">
                Evaluates Tenkan-sen, Kijun-sen, Senkou Span A &amp; B Kumo clouds. Identifies macro trend regimes to ensure grid accumulation aligns with institutional cloud equilibrium zones.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">🤖</span>
              <h3 className="arch-title">AutoConfig AI Volatility Engine</h3>
              <p className="arch-desc">
                Analyzes the 365-day EURUSD ADR baseline and continuously computes the 20-day ADR of the active trading symbol. Dynamically derives optimal Take Profit pips, grid step distances, and multiplier ratios on the fly.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">⚡</span>
              <h3 className="arch-title">0.0ms Tick Basket Break-Even</h3>
              <p className="arch-desc">
                The breakthrough v1.67 upgrade: monitors real-time price spikes across open baskets in OnTick(), locking in guaranteed positive pips the microsecond profit targets are touched—regardless of candle close timings.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">🛡️</span>
              <h3 className="arch-title">Multi-Tier Margin Safeguards</h3>
              <p className="arch-desc">
                Active spread filtration pauses entries during rollover or news spikes. Emergency margin level guards freeze grid expansions at 200% margin and execute orderly basket stop-outs if margin reaches 60%.
              </p>
            </div>

            <div className="arch-card animate-in">
              <span className="arch-icon">🔄</span>
              <h3 className="arch-title">Adaptive Hedging &amp; Time Filters</h3>
              <p className="arch-desc">
                Allows simultaneous independent Buy and Sell baskets with individual magic numbers, coupled with millisecond server-time session schedules (e.g. Tokyo, London, or NY high liquidity windows).
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* INTERACTIVE FLAGSHIP TOOLING HUB */}
      <section id="tools" style={{ padding: "70px 0 30px" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">対話型ツール</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">INTERACTIVE WORKBENCH // ツール群</span>
            <h2>EA Budak Ubat Flagship Tooling Suite</h2>
            <p>
              Simulate market moves, generate customized .set parameter presets, calculate grid margin cushions, and verify authorized accounts in real time.
            </p>
          </div>

          {/* Tools Navigation Bar */}
          <div className="tools-nav-bar animate-in">
            <button
              type="button"
              className={`tool-nav-btn ${activeTool === "simulator" ? "active" : ""}`}
              onClick={() => { setActiveTool("simulator"); playTactileClick(0.08); }}
            >
              <span>⚡</span>
              <span>Market Simulator</span>
            </button>
            <button
              type="button"
              className={`tool-nav-btn ${activeTool === "presets" ? "active" : ""}`}
              onClick={() => { setActiveTool("presets"); playTactileClick(0.08); }}
            >
              <span>⚙️</span>
              <span>Preset Studio (.set)</span>
            </button>
            <button
              type="button"
              className={`tool-nav-btn ${activeTool === "calculator" ? "active" : ""}`}
              onClick={() => { setActiveTool("calculator"); playTactileClick(0.08); }}
            >
              <span>🧮</span>
              <span>Margin &amp; Risk Calculator</span>
            </button>
            <button
              type="button"
              className={`tool-nav-btn ${activeTool === "license" ? "active" : ""}`}
              onClick={() => { setActiveTool("license"); playTactileClick(0.08); }}
            >
              <span>🔐</span>
              <span>Account License Checker</span>
            </button>
          </div>

          {/* Tool 1: Simulator */}
          {activeTool === "simulator" && (
            <div className="animate-in" id="simulator">
              <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                  Interactive Virtual Market Engine: Simulate dynamic ADR grid layering, test volatility spikes, and watch the break-even Take Profit pool trigger in real time.
                </p>
              </div>
              <LiveStrategySimulator />
            </div>
          )}

          {/* Tool 2: Presets Generator */}
          {activeTool === "presets" && (
            <div className="animate-in" id="presets">
              <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                  Custom Preset Studio: Choose a risk profile (Conservative, Balanced, Aggressive, Cent Scalper, Gold Volatility) or adjust parameters and download customized .set files ready to load directly into MT4 or MT5.
                </p>
              </div>
              <SetGenerator />
            </div>
          )}

          {/* Tool 3: Risk Calculator */}
          {activeTool === "calculator" && (
            <div className="animate-in" id="calculator">
              <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                  Grid Risk &amp; Margin Calculator: Plan your capital allocation. Calculate cumulative lot sizes, pip drawdown distances, margin requirements, and margin call safety cushions across Cent and Standard accounts.
                </p>
              </div>
              <GridCalculator />
            </div>
          )}

          {/* Tool 4: License Verification */}
          {activeTool === "license" && (
            <div className="animate-in" id="authorization">
              <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                  Official Account Authorization Portal: Verify your MetaTrader account status across any partner broker or download the latest authorized binaries instantly.
                </p>
              </div>
              <AccountChecker initialEa="ea-budak-ubat" />
            </div>
          )}
        </div>
      </section>

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* COMPANION ALGORITHMIC SUITE */}
      <section id="ecosystem">
        <div className="jp-kanji-watermark" aria-hidden="true">製品群</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">COMPANION SYSTEMS // エコシステム</span>
            <h2>The Extended Algorithmic Suite</h2>
            <p>
              Complement your portfolio with specialized trading systems developed by Syarief Azman to trade gold, market breakouts, US indices, and multi-timeframe trends alongside EA Budak Ubat.
            </p>
          </div>

          {/* INTERACTIVE STRATEGY MATRIX DECK */}
          <div className="strategy-matrix-container border-beam-card animate-in">
            <div className="sparkline-header">
              <span className="sparkline-title">⚡ REALTIME STRATEGY TELEMETRY // {currentStrat.code}</span>
              <span className="sparkline-val-badge">LIVE SIMULATION ACTIVE</span>
            </div>

            {/* Strategy Selectors */}
            <div className="strategy-tabs-bar">
              {PRODUCTS.map((ea) => (
                <button
                  key={ea.slug}
                  type="button"
                  data-cursor-label="SWITCH"
                  className={`strategy-selector-btn ${activeStrategy === ea.slug ? "active" : ""}`}
                  onClick={() => { setActiveStrategy(ea.slug); playTactileClick(0.08); }}
                >
                  <span>{ea.icon}</span>
                  <span>{ea.name}</span>
                </button>
              ))}
            </div>

            {/* Strategy Display Grid */}
            <div className="strategy-display-grid">
              <div className="strategy-info-block">
                <h3>
                  <span>{currentStrat.name}</span>
                  <span className="jp-badge">{currentStrat.version}</span>
                </h3>
                <p className="strategy-tagline">{currentStrat.tagline}</p>
                <p className="strategy-desc">{currentStrat.desc}</p>

                <div className="strategy-telemetry-panel">
                  <div className="telemetry-cell">
                    <div className="telemetry-cell-label">Model Win Rate</div>
                    <div className="telemetry-cell-value" style={{ color: currentStrat.color }}>
                      {currentStrat.winRate}
                    </div>
                  </div>
                  <div className="telemetry-cell">
                    <div className="telemetry-cell-label">Drawdown Threshold</div>
                    <div className="telemetry-cell-value" style={{ color: "var(--liquid-emerald)" }}>
                      {currentStrat.drawdown}
                    </div>
                  </div>
                  <div className="telemetry-cell">
                    <div className="telemetry-cell-label">Optimal Timeframe</div>
                    <div className="telemetry-cell-value" style={{ fontSize: "1rem" }}>
                      {currentStrat.timeframe}
                    </div>
                  </div>
                  <div className="telemetry-cell">
                    <div className="telemetry-cell-label">Target Asset Class</div>
                    <div className="telemetry-cell-value" style={{ fontSize: "1rem" }}>
                      {currentStrat.instruments}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href={`/${activeStrategy}`}
                    className="btn btn-primary btn-sm"
                    data-cursor-label="EXPLORE"
                    style={{ animation: "none" }}
                  >
                    🚀 Deep Dive &amp; Specs
                  </Link>
                  {activeStrategy === "ea-budak-ubat" && (
                    <a
                      href={MQL5_MARKET_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent btn-sm"
                      data-cursor-label="BUY"
                      style={{ animation: "none" }}
                    >
                      🛒 Buy MT5 (MQL5 Market)
                    </a>
                  )}
                  <a
                    href="#tools"
                    className="btn btn-secondary btn-sm"
                    data-cursor-label="CHECK"
                    style={{ animation: "none" }}
                    onClick={() => setActiveTool("license")}
                  >
                    🔐 Verify Licensing
                  </a>
                </div>
              </div>

              {/* Animated Interactive SVG Equity Curve */}
              <div className="sparkline-canvas-box">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    EQUITY ACCELERATION CURVE
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: currentStrat.color, fontWeight: 700 }}>
                    MAX GAIN
                  </span>
                </div>
                <svg className="sparkline-svg" viewBox="0 0 500 130">
                  <defs>
                    <linearGradient id={`grad-${activeStrategy}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={currentStrat.color} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={currentStrat.color} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid guidelines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="65" x2="500" y2="65" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Gradient Area Fill */}
                  <path
                    d={`${currentStrat.sparkline} L500,130 L0,130 Z`}
                    fill={`url(#grad-${activeStrategy})`}
                  />

                  {/* Animated Stroke Line */}
                  <path
                    d={currentStrat.sparkline}
                    fill="none"
                    stroke={currentStrat.color}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 700,
                      strokeDashoffset: 0,
                      animation: "dash 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    }}
                  />
                  {/* Peak Target Glow Circle */}
                  <circle cx="500" cy="20" r="5" fill={currentStrat.color} />
                  <circle cx="500" cy="20" r="10" fill={currentStrat.color} opacity="0.35" />
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
                  <span>ENTRY: FIXED RISK</span>
                  <span>MARTINGALE: DYNAMIC</span>
                  <span>TARGET: COMPOUNDED</span>
                </div>
              </div>
            </div>
          </div>

          {/* CATALOG CARDS */}
          <div className="product-catalog" style={{ marginTop: "40px" }}>
            {PRODUCTS.map((product, i) => (
              <Link
                key={product.slug}
                href={`/${product.slug}`}
                className="product-card animate-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="product-card-glow" style={{ background: product.gradient }}></div>
                <div className="product-card-content">
                  <div className="product-card-header">
                    <div className="product-icon-wrapper" style={{ background: product.gradient }}>
                      <span className="product-icon">{product.icon}</span>
                    </div>
                    <div className="product-meta">
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className="jp-badge">{product.systemCode}</span>
                        <span className={`product-status ${product.status === 'Flagship' ? 'status-live' : product.status === 'New' ? 'status-new' : 'status-live'}`} style={product.status === 'Flagship' ? { background: 'rgba(0, 240, 255, 0.2)', color: '#00f0ff', borderColor: 'rgba(0, 240, 255, 0.4)' } : undefined}>
                          {product.status}
                        </span>
                      </div>
                      <span className="product-category">
                        {product.category}
                        <span className="jp-category-kanji">{product.kanjiCategory}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-version">{product.version}</p>
                  <p className="product-tagline">{product.tagline}</p>
                  <p className="product-description">{product.description}</p>

                  <div className="product-platforms">
                    {product.platforms.map((p) => (
                      <span key={p} className="platform-badge">{p}</span>
                    ))}
                  </div>

                  <div className="product-highlights">
                    {product.highlights.map((h, j) => (
                      <span key={j} className="highlight-tag" style={{ borderColor: `${product.accentColor}40`, color: product.accentColor }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="product-card-footer">
                    <span className="product-cta" style={{ color: product.accentColor }}>
                      {product.slug === 'ea-budak-ubat' ? 'Explore Flagship →' : 'Learn More →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* FOREX QUEST ACADEMY GAMIFIED SHOWCASE */}
          <div style={{ marginTop: "40px" }}>
            <div
              className="border-beam-card animate-in"
              style={{
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: "24px",
                padding: "36px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "24px",
                boxShadow: "0 16px 48px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div style={{ maxWidth: "620px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 189, 248, 0.15)", padding: "4px 12px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 800, color: "#38bdf8", marginBottom: "12px", letterSpacing: "0.08em" }}>
                  🎮 NEW INTERACTIVE GAMIFIED ACADEMY
                </div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ffffff", marginBottom: "10px", lineHeight: 1.25 }}>
                  Master Forex &amp; Algo Trading Like a Game
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Test your knowledge through 5 progressive worlds, build consecutive combo multipliers, level up your Trader Rank from Novice Pip Hunter to Institutional Quant Sovereign, and challenge the 60-Second Speedrun Blitz!
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href="/learn"
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%)",
                      border: "none",
                      padding: "12px 28px",
                      fontWeight: 800,
                    }}
                  >
                    ▶ Launch Forex Quest Game
                  </Link>
                  <Link href="/learn" className="btn btn-secondary" style={{ padding: "12px 22px" }}>
                    ⚡ 60s Speedrun Blitz
                  </Link>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "18px 24px", textAlign: "center", minWidth: "120px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "4px", color: "#38bdf8", fontWeight: 900 }}>5</div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#64748b", letterSpacing: "0.08em" }}>WORLDS</div>
                </div>
                <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "18px 24px", textAlign: "center", minWidth: "120px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "4px", color: "#f59e0b", fontWeight: 900 }}>6</div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#64748b", letterSpacing: "0.08em" }}>TRADER RANKS</div>
                </div>
                <div style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "18px 24px", textAlign: "center", minWidth: "120px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "4px", color: "#ec4899", fontWeight: 900 }}>3.0x</div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#64748b", letterSpacing: "0.08em" }}>MAX STREAK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">About</span>
            <h2>Built by a Trader, for Traders</h2>
          </div>
          <div className="about-content animate-in">
            <div className="about-text">
              <p>
                Hi, I am <strong>Syarief Azman</strong>, the developer behind EA Budak Ubat — a Malaysian developer and forex trader
                building automated trading tools. My Expert Advisors are designed with real-world trading experience, focusing on
                reliability, safety mechanisms, and transparent open-source code.
              </p>
              <p>
                Whether you prefer systematic grid trading, AI-powered analysis, trend-following with Ichimoku or Alligator indicators,
                or breakout strategies — each tool is built to give you an edge while respecting risk management principles.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Trading Tools</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">900+</span>
                  <span className="stat-label">Authorized Accounts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">MT4 &amp; MT5</span>
                  <span className="stat-label">Platform Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Connect</span>
            <h2>Get in Touch</h2>
            <p>Have questions? Need support? Reach out through any of these channels.</p>
          </div>
          <div className="contact-grid animate-in">
            {[
              { icon: "✉️", title: "Email Support", desc: "support@eabudakubat.com", url: "mailto:support@eabudakubat.com" },
              { icon: "💬", title: "Telegram", desc: "@SyariefAzman", url: "https://t.me/SyariefAzman" },
              { icon: "🐦", title: "Twitter/X", desc: "@SyariefAzman", url: "https://www.twitter.com/SyariefAzman" },
              { icon: "📢", title: "Telegram Channel", desc: "t.me/EABudakUbat", url: "https://t.me/EABudakUbat" },
              { icon: "🛒", title: "MQL5 Market", desc: "Official MT5 Product", url: MQL5_MARKET_LINK },
              { icon: "📊", title: "MQL5 Signal", desc: "Signal Channel", url: SIGNAL_LINK },
            ].map((c, i) => (
              <a key={i} href={c.url} className="contact-card" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">{c.icon}</span>
                <div>
                  <strong>{c.title}</strong>
                  <p>{c.desc}</p>
                </div>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY HUB */}
      <section id="community-hub" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label community-label">Community Hub</span>
            <h2>Share &amp; Connect</h2>
            <p>Got an idea? Want to request an EA? Give feedback? We'd love to hear from you.</p>
          </div>

          {/* Post Form */}
          <form className="community-form glass-card animate-in" onSubmit={handleSubmit} style={{ marginBottom: "60px" }}>
            {/* Honeypot Bot Trap (Hidden from real users) */}
            <div style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }} aria-hidden="true">
              <label htmlFor="bot_catch">Leave this field blank</label>
              <input
                id="bot_catch"
                type="text"
                name="bot_catch"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="community-name">Your Name</label>
              <input
                id="community-name"
                type="text"
                className="form-input"
                placeholder="e.g. Trader Ahmad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Post Type</label>
              <div className="type-selector">
                {POST_TYPES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`type-pill ${formData.type === t.key ? "active" : ""}`}
                    style={{
                      "--pill-color": t.color,
                      borderColor: formData.type === t.key ? t.color : undefined,
                      background: formData.type === t.key ? `${t.color}15` : undefined,
                      color: formData.type === t.key ? t.color : undefined,
                    }}
                    onClick={() => setFormData({ ...formData, type: t.key })}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.type === "ea_request" && (
              <div className="form-group form-group-slide">
                <label className="form-label" htmlFor="ea-name">EA Name / Description</label>
                <input
                  id="ea-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. RSI Scalper EA for EURUSD"
                  value={formData.ea_name}
                  onChange={(e) => setFormData({ ...formData, ea_name: e.target.value })}
                  maxLength={100}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="community-message">Message</label>
              <textarea
                id="community-message"
                className="form-textarea"
                placeholder="Tell us what you think, what you need, or share your trading experience..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                maxLength={2000}
              />
              <span className="char-count">{formData.message.length}/2000</span>
            </div>

            <button
              type="submit"
              className="btn btn-community-primary submit-btn"
              disabled={submitting}
              style={{ animation: "none" }}
            >
              {submitting ? (
                <><span className="spinner"></span> Posting...</>
              ) : (
                "🚀 Post"
              )}
            </button>

            {submitSuccess && (
              <div className="form-alert form-alert-success">
                ✅ Your post has been published! Thanks for sharing.
              </div>
            )}
            {submitError && (
              <div className="form-alert form-alert-error">
                ❌ {submitError}
              </div>
            )}
          </form>

          {/* Feed Header & Filters */}
          <div className="section-header animate-in" style={{ marginTop: "40px" }}>
            <h2>What People Are Saying</h2>
          </div>

          <div className="feed-filters animate-in">
            {[
              { key: "all", label: "🌐 All" },
              { key: "idea", label: "💡 Ideas" },
              { key: "feedback", label: "💬 Feedback" },
              { key: "ea_request", label: "🤖 EA Requests" },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                {f.key !== "all" && (
                  <span className="filter-count">
                    {comments.filter((c) => c.type === f.key).length}
                  </span>
                )}
                {f.key === "all" && (
                  <span className="filter-count">{comments.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Comments List */}
          {loading ? (
            <div className="feed-loading">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Loading posts...</p>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="feed-empty animate-in">
              <span className="feed-empty-icon">📭</span>
              <h3>No posts yet</h3>
              <p>Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="feed-list">
              {filteredComments.map((comment, i) => {
                const typeInfo = getTypeInfo(comment.type);
                return (
                  <div
                    key={comment.id}
                    className="comment-card animate-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="comment-header">
                      <div className="comment-author-row">
                        <div
                          className="comment-avatar"
                          style={{ background: typeInfo.color }}
                        >
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span className="comment-author">{comment.name}</span>
                            {(comment.name.toLowerCase().includes("syarief") || comment.name.toLowerCase().includes("creator")) && (
                              <span className="jp-badge" style={{ background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa", borderColor: "rgba(59, 130, 246, 0.4)", fontSize: "0.68rem" }}>
                                ⭐ Creator
                              </span>
                            )}
                          </div>
                          <span className="comment-time">{timeAgo(comment.created_at)}</span>
                        </div>
                      </div>
                      <span
                        className="comment-type-badge"
                        style={{
                          background: `${typeInfo.color}15`,
                          color: typeInfo.color,
                          borderColor: `${typeInfo.color}40`,
                        }}
                      >
                        {typeInfo.label}
                      </span>
                    </div>

                    {comment.type === "ea_request" && comment.ea_name && (
                      <div className="comment-ea-tag">
                        🤖 Requested: <strong>{comment.ea_name}</strong>
                      </div>
                    )}

                    <p className="comment-message">{comment.message}</p>

                    <div className="comment-actions-bar">
                      <button
                        type="button"
                        className={`comment-react-btn ${(reactions[comment.id]?.user_helpful) ? "active" : ""}`}
                        data-cursor-label="LIKE"
                        onClick={() => handleReaction(comment.id, "helpful")}
                      >
                        <span>❤️</span>
                        <span>Helpful</span>
                        {(reactions[comment.id]?.helpful || 0) > 0 && (
                          <span className="react-count">{reactions[comment.id].helpful}</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className={`comment-react-btn ${(reactions[comment.id]?.user_bullish) ? "active" : ""}`}
                        data-cursor-label="BULLISH"
                        onClick={() => handleReaction(comment.id, "bullish")}
                      >
                        <span>🚀</span>
                        <span>Bullish</span>
                        {(reactions[comment.id]?.bullish || 0) > 0 && (
                          <span className="react-count">{reactions[comment.id].bullish}</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className={`comment-react-btn ${(reactions[comment.id]?.user_insight) ? "active" : ""}`}
                        data-cursor-label="IDEA"
                        onClick={() => handleReaction(comment.id, "insight")}
                      >
                        <span>💡</span>
                        <span>Great Idea</span>
                        {(reactions[comment.id]?.insight || 0) > 0 && (
                          <span className="react-count">{reactions[comment.id].insight}</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">👑 EA Budak Ubat</h3>
              <p className="footer-desc">
                Flagship automated quantitative grid trading system and specialized Expert Advisors for MetaTrader platforms by Syarief Azman. Built with passion, real-world trading experience, and mathematical precision.
              </p>
              <div className="social-links">
                <a href="mailto:support@eabudakubat.com" className="social-link" title="Email">✉️</a>
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram">💬</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" rel="noopener noreferrer" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4>Trading Systems</h4>
              <ul className="footer-links">
                <li><Link href="/ea-budak-ubat">EA Budak Ubat (Flagship)</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
                <li><Link href="/bracketblitz">BracketBlitz EA</Link></li>
                <li><Link href="/mathedge-pro">MathEdge Pro</Link></li>
                <li><Link href="/aligator-gozaimasu">Aligator Gozaimasu</Link></li>
                <li><Link href="/encik-moku">Encik Moku</Link></li>
              </ul>
            </div>
            <div>
              <h4>Flagship Tools</h4>
              <ul className="footer-links">
                <li><a href="#tools" onClick={() => setActiveTool("simulator")}>Strategy Simulator</a></li>
                <li><a href="#tools" onClick={() => setActiveTool("presets")}>Preset Studio (.set)</a></li>
                <li><a href="#tools" onClick={() => setActiveTool("calculator")}>Margin Calculator</a></li>
                <li><a href="#tools" onClick={() => setActiveTool("license")}>License Checker</a></li>
                <li><Link href="/guide">System Guide</Link></li>
                <li><Link href="/changelog">Version Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact &amp; Official Links</h4>
              <ul className="footer-links">
                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
                <li><a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">Telegram: @SyariefAzman</a></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Channel: t.me/EABudakUbat</a></li>
                <li><a href={MQL5_MARKET_LINK} target="_blank" rel="noopener noreferrer">MQL5 Market (Official MT5)</a></li>
                <li><a href={SIGNAL_LINK} target="_blank" rel="noopener noreferrer">MQL5 Signal Channel</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Automated grid and martingale systems can result in significant loss of capital. Past performance is not indicative of future results. Always test on a demo account first. Not available in restricted jurisdictions.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
