"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AccountChecker from "@/app/components/AccountChecker";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import PriceTierUrgency from "@/app/components/PriceTierUrgency";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import MQLProductsShowcase from "@/app/components/MQLProductsShowcase";
import { playTactileClick } from "@/lib/audioSynthesizer";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.67%20-%20MT5%20-%2020260930.ex5";
const PURCHASE_LINK = "https://tinyurl.com/eabubuy";
const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

const PARTNER_BROKERS = [
  {
    name: "Tickmill",
    badge: "🏆 #1 Recommended · 0.0 Raw Spreads",
    headline: "Institutional ECN Execution & Lowest Gold Spreads",
    desc: "The #1 recommended broker for EA Budak Ubat & GoldMind AI. True ECN execution with raw spreads from 0.0 pips, lowest gold commissions, and zero freeze levels for maximum EA profitability.",
    id: "IB72324388",
    url: "https://tickmill.link/46cOQ2h",
    features: ["Raw Spreads from 0.0", "True ECN Execution", "Lowest Gold Commission", "VIP Fast Trade Servers"],
    minDeposit: "$100 (Classic / Pro)",
    color: "#e11d48",
    btnBg: "linear-gradient(135deg, #e11d48, #be123c)",
    btnColor: "#ffffff",
  },
  {
    name: "RoboForex",
    badge: "🛡️ #2 Choice · ProCent & $30 Bonus",
    headline: "ProCent Cent Accounts & Drawdown-Resilient Bonus",
    desc: "The premier cent-account broker for Grid Martingale EAs. Receive a 30 USD non-withdrawable Welcome Bonus that stays in your account during drawdowns. ProCent micro-lots provide maximum margin depth to withstand volatile market swings.",
    id: "mxyg",
    url: "https://rinfinity.com/en/welcome-bonus?a=mxyg",
    features: ["$30 Welcome Bonus", "ProCent Accounts from $10", "Drawdown-Proof Bonus Funds", "Tight Gold & FX Spreads"],
    minDeposit: "$10 (ProCent Account)",
    color: "#2563eb",
    btnBg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    btnColor: "#ffffff",
  },
  {
    name: "XM",
    badge: "🎁 100% Deposit Bonus",
    headline: "Ultra-Low Spreads & Micro/Standard Accounts",
    desc: "Globally regulated broker offering an instant 100% deposit bonus on trading capital. Zero requotes and institutional pricing on Gold, Indices & FX.",
    id: "HVVR7",
    url: "https://clicks.pipaffiliates.com/c?m=150422&c=862266",
    features: ["100% Deposit Bonus", "Ultra-Low Spreads", "Micro & Standard", "Instant Local Withdrawals"],
    minDeposit: "$10 (Micro / Standard)",
    color: "#ef4444",
    btnBg: "linear-gradient(135deg, #ef4444, #dc2626)",
    btnColor: "#ffffff",
  },
  {
    name: "FBS",
    badge: "⚡ 1:3000 Extreme Leverage · Standard",
    headline: "Ultra-Fast 0.01s Execution & Extreme Margin Power",
    desc: "High-performance Standard accounts with market execution from 0.01s, spreads from 0.7 pips, and industry-leading leverage up to 1:3000. Perfect for high-speed algorithmic execution.",
    id: "588292",
    url: "https://fbs.partners?ibl=154319&ibp=588292",
    features: ["1:3000 Extreme Leverage", "0.01s Ultra-Fast Execution", "Spreads from 0.7 Pips", "Low $5 Minimum Deposit"],
    minDeposit: "$5 (Standard Account)",
    color: "#00be40",
    btnBg: "linear-gradient(135deg, #00be40, #059669)",
    btnColor: "#ffffff",
  },
  {
    name: "JustMarkets",
    badge: "💎 Zero Spreads · Instant Payouts",
    headline: "Precision Execution for Algorithmic Trading",
    desc: "Zero spreads on major currency pairs, competitive Gold trading spreads, leverage up to 1:3000, and rapid local payment processing.",
    id: "tjrtn60m2i",
    url: "https://one.justmarkets.link/a/tjrtn60m2i/landing/trade-metals-like-professional?promo=4869",
    features: ["Zero Raw Spreads", "1:3000 Leverage", "Cent & Standard Modes", "Fast FPX & DuitNow"],
    minDeposit: "$10 (Cent / Standard)",
    color: "#0284c7",
    btnBg: "linear-gradient(135deg, #0284c7, #0369a1)",
    btnColor: "#ffffff",
  },
  {
    name: "Headway",
    badge: "🔥 $150 No-Deposit Bonus",
    headline: "Trade 5 Markets with Zero Risk for 7 Days",
    desc: "Claim a free $150 no-deposit trading bonus. Test EA Budak Ubat with zero personal capital risk and keep all your generated trading profits!",
    id: "516d6b",
    url: "https://headway.partners/landings/en/bonus-150/?hwp=516d6b",
    features: ["$150 Free Trading Credit", "Cent Accounts Supported", "Unlimited Leverage", "100% Zero Risk Trial"],
    minDeposit: "$0 (Free $150 Bonus)",
    color: "#f59e0b",
    btnBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    btnColor: "#0a0e1a",
  },
  {
    name: "HF Markets",
    badge: "🪙 Cent Accounts · Global Regulation",
    headline: "Trusted Tier-1 Regulated Multi-Asset Broker",
    desc: "Dedicated Cent accounts for small balance traders, flexible leverage, tight spreads, and multi-jurisdictional regulation for complete peace of mind.",
    id: "30572923",
    url: "https://banner-api.hfmmalaysia.com/link/e993b134?regulator=HFSV&refid=30572923",
    features: ["Cent Accounts Available", "Tier-1 Regulated Broker", "Swap-Free Trading", "24/5 Customer Support"],
    minDeposit: "$10 (Cent Account)",
    color: "#dc2626",
    btnBg: "linear-gradient(135deg, #dc2626, #991b1b)",
    btnColor: "#ffffff",
  },
  {
    name: "CXM Direct",
    badge: "🚀 High Leverage · Institutional Bridge",
    headline: "Ultra-Fast Execution for Expert Advisors",
    desc: "Proprietary liquidity bridge connecting MT4 & MT5 directly to Tier-1 international banks, delivering near-zero slippage for algorithmic trading.",
    id: "5062",
    url: "https://gocxm.co/links/go/5062",
    features: ["1:Unlimited Leverage", "Cent Accounts", "No Requotes", "Institutional Bridge"],
    minDeposit: "$10 (Cent / Standard)",
    color: "#8b5cf6",
    btnBg: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    btnColor: "#ffffff",
  },
  {
    name: "Markets4you",
    badge: "📈 Multi-Asset Cent Engine",
    headline: "Pioneers of Cent Account Trading for EAs",
    desc: "Over 15 years of industry excellence. Offers micro-lot execution on Forex, Metals, and Indices with transparent trading conditions.",
    id: "4hcnvz4",
    url: "https://account.markets4you.online/en/user-registration/?affid=4hcnvz4",
    features: ["Classic & Cent Accounts", "Instant Order Execution", "Loyalty Cashback", "Segregated Funds"],
    minDeposit: "$10 (Cent Account)",
    color: "#06b6d4",
    btnBg: "linear-gradient(135deg, #06b6d4, #0891b2)",
    btnColor: "#ffffff",
  },
  {
    name: "LiteFinance",
    badge: "🎉 100% Deposit Match · Cent & ECN",
    headline: "Double Your Margin Power with 100% Bonus",
    desc: "Double your margin cushioning with a 100% deposit bonus. Offers low-entry Cent accounts starting from just $10 with automated copy-trading support.",
    id: "805161060",
    url: "https://www.litefinance.com/?uid=805161060",
    features: ["100% Deposit Bonus", "Cent Accounts from $10", "Integrated Social Trading", "Zero Hidden Fees"],
    minDeposit: "$10 (Cent / Classic)",
    color: "#14b8a6",
    btnBg: "linear-gradient(135deg, #14b8a6, #0d9488)",
    btnColor: "#ffffff",
  },
  {
    name: "InstaForex",
    badge: "🛡️ 100% First Deposit Bonus",
    headline: "Established Global Broker with 300+ Trading Assets",
    desc: "Claim 100% bonus credit on your first deposit. Trade Gold, major FX pairs, and global indices with fixed or floating spreads and dedicated client support.",
    id: "KUSD",
    url: "https://www.instaforex.com?x=KUSD",
    features: ["100% First Deposit Bonus", "Fixed & Floating Spreads", "Cent Account Support", "300+ Tradeable Assets"],
    minDeposit: "$1 (Cent / Standard)",
    color: "#e11d48",
    btnBg: "linear-gradient(135deg, #e11d48, #be123c)",
    btnColor: "#ffffff",
  },
  {
    name: "Valetax",
    badge: "📱 Top Trading App · 1:2000 Leverage",
    headline: "Next-Gen Mobile Trading with Deep Liquidity",
    desc: "Award-winning mobile trading experience with high leverage up to 1:2000, ultra-fast chart execution, and seamless local payment gateways.",
    id: "1939088",
    url: "https://ma.valetax.com/p/1939088",
    features: ["1:2000 High Leverage", "Top-Rated Mobile App", "Cent & Standard Modes", "Fast Deposit & Withdrawal"],
    minDeposit: "$10 (Cent / Standard)",
    color: "#d97706",
    btnBg: "linear-gradient(135deg, #d97706, #b45309)",
    btnColor: "#ffffff",
  },
  {
    name: "Eightcap",
    badge: "🏆 24/7 Gold Trading · Raw 0.0 Pips",
    headline: "Award-Winning Regulated Broker for Algorithmic Quants",
    desc: "Trade Gold (XAUUSD) 24 hours a day, 7 days a week with GOLD247. Enjoy true raw ECN spreads from 0.0 pips with ultra-fast London/NY fiber optic cross-connects.",
    id: "8660",
    url: "https://partners.eightcap.com/click?campaign_id=1&ref_id=8660",
    features: ["24/7 Gold Trading (GOLD247)", "Raw Spreads from 0.0", "Tier-1 ASIC/FCA Regulated", "Ultra-Low Latency VPS"],
    minDeposit: "$100 (Raw ECN / Standard)",
    color: "#059669",
    btnBg: "linear-gradient(135deg, #059669, #047857)",
    btnColor: "#ffffff",
  },
  {
    name: "FISG",
    badge: "⭐ Tier-1 ECN · Iniesta Brand Ambassador",
    headline: "Master the Moment with Direct Institutional ECN Liquidity",
    desc: "Direct Tier-1 bank liquidity with ultra-fast order execution, deep market depth, and zero hidden markups. Officially endorsed by football icon Andrés Iniesta.",
    id: "CTt0Rd",
    url: "https://my.fisg.com/u/CTt0Rd",
    features: ["Direct Institutional ECN", "Raw 0.0 Pips Spreads", "Zero Hidden Markups", "Fast STP Execution"],
    minDeposit: "$50 (ECN / Standard)",
    color: "#f59e0b",
    btnBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    btnColor: "#0a0e1a",
  },
];

const AFFILIATE_PERKS = [
  {
    icon: "💎",
    title: "100% Free Lifetime License",
    desc: "Save $149 USD upfront. Your trading account is whitelisted permanently for both MT4 and MT5 with zero recurring subscription fees.",
  },
  {
    icon: "🔄",
    title: "Continuous Free Updates",
    desc: "Gain automatic access to all future algorithm enhancements—including our latest v1.67 real-time intra-candle tick break-even engine.",
  },
  {
    icon: "⚙️",
    title: "Broker-Calibrated Presets",
    desc: "Receive pre-configured .set parameter files tailored specifically to your chosen partner broker's spreads, stop-levels, and execution speeds.",
  },
  {
    icon: "🪙",
    title: "Cent Account Capital Resilience",
    desc: "Start with as little as $10 to $50. Cent accounts transform your capital into 1,000 to 5,000 units, letting grid martingale breathe safely.",
  },
  {
    icon: "💬",
    title: "VIP Support with Developer",
    desc: "Direct 1-on-1 setup assistance and troubleshooting with creator Syarief Azman on Telegram to ensure optimal bot configuration.",
  },
  {
    icon: "🌐",
    title: "Companion EA Suite Access",
    desc: "Whitelisted clients also unlock our companion trading systems (GoldMind AI, BracketBlitz, MathEdge Pro, and more).",
  },
];

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
  if (minutes < 60) return `${minutes}m ago`;
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
    highlights: ["4 Entry Engines", "AutoConfig AI", "Tick Break-Even Trailing", "100% Free via Partners"],
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
  const [showAllBrokers, setShowAllBrokers] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState("ea-budak-ubat");
  const currentStrat = STRATEGY_DATA[activeStrategy] || STRATEGY_DATA["ea-budak-ubat"];

  // Community State (Spotlight showcase)
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const filteredComments = comments.filter((c) => {
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
  }, [comments, loading]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="nav-brand">👑 EA Budak Ubat</a>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/products" onClick={() => setMobileNavOpen(false)} style={{ color: "#38bdf8", fontWeight: 700 }}>🛒 Products</Link></li>
            <li><Link href="/tools" onClick={() => setMobileNavOpen(false)} style={{ color: "#00f0ff", fontWeight: 700 }}>⚙️ Tools &amp; Simulator</Link></li>
            <li><a href="#how-to-get-free" onClick={() => setMobileNavOpen(false)}>How It Works</a></li>
            <li><Link href="/about" onClick={() => setMobileNavOpen(false)}>About</Link></li>
            <li><Link href="/community" onClick={() => setMobileNavOpen(false)}>Community</Link></li>
            <li><a href="#authorization" onClick={() => setMobileNavOpen(false)} style={{ color: "#10b981", fontWeight: 700 }}>⚡ Whitelist</a></li>
            <li><Link href="/changelog" onClick={() => setMobileNavOpen(false)}>Changelog</Link></li>
            <li>
              <a
                href="#broker-partners"
                className="nav-cta"
                onClick={() => { playTactileClick(0.1); setMobileNavOpen(false); }}
                style={{ background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", fontWeight: 900 }}
              >
                🔥 Get EA Free
              </a>
            </li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* FLAGSHIP HERO — AFFILIATE CLIENT CONVERSION ENGINE */}
      <section className="hero catalog-hero" id="flagship">
        <div className="jp-kanji-watermark" aria-hidden="true">無料自動売買</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              👑 FLAGSHIP ALGORITHMIC SYSTEM · 100% FREE VIA PARTNER BROKERS
            </span>
          </div>

          <h1>
            <span className="gradient-text">Trade with EA Budak Ubat</span>
            <br />
            <span style={{ fontSize: "0.75em", color: "#ffffff", fontWeight: 800 }}>100% Free Lifetime License</span>
          </h1>

          <p className="hero-subtitle" style={{ maxWidth: "880px", margin: "0 auto 28px" }}>
            Why pay $149? Unlock the full, unrestricted power of <strong>EA Budak Ubat (v1.67 MT5 &amp; v1.62 MT4)</strong> at <strong>$0 upfront software cost</strong> simply by opening and funding a live trading account under our official regulated partner brokers.
          </p>

          {/* HIGH-CONVERTING HERO ACTION BUTTONS */}
          <div className="hero-actions" style={{ marginBottom: "20px" }}>
            <a
              href="#broker-partners"
              className="btn btn-primary"
              onClick={() => playTactileClick(0.12)}
              style={{
                background: "linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)",
                color: "#0a0e1a",
                fontWeight: 900,
                fontSize: "1.05rem",
                padding: "14px 32px",
                border: "none",
                boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
              }}
            >
              🎁 Choose a Broker &amp; Unlock EA Free ➜
            </a>
            <a
              href="#authorization"
              className="btn btn-secondary"
              onClick={() => playTactileClick(0.08)}
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(0, 240, 255, 0.18))",
                border: "1px solid rgba(16, 185, 129, 0.55)",
                color: "#10b981",
                padding: "14px 24px",
                fontWeight: 800,
                fontSize: "0.95rem",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.25)",
              }}
            >
              ⚡ Already Whitelisted? Download Latest EA ↓
            </a>
            <a
              href={DOWNLOAD_MT5}
              className="btn btn-secondary"
              onClick={() => playTactileClick(0.08)}
              style={{ padding: "14px 20px" }}
            >
              ⬇️ Latest MT5 (.ex5)
            </a>
            <a
              href={DOWNLOAD_MT4}
              className="btn btn-secondary"
              onClick={() => playTactileClick(0.08)}
              style={{ padding: "14px 20px" }}
            >
              ⬇️ Latest MT4 (.ex4)
            </a>
            <a
              href="#how-to-get-free"
              className="btn btn-secondary"
              onClick={() => playTactileClick(0.08)}
              style={{ padding: "14px 20px", fontWeight: 700 }}
            >
              🚀 3-Step Setup Guide
            </a>
          </div>

          {/* RETURNING WHITELISTED CLIENT FAST-PASS CALLOUT */}
          <div className="whitelisted-fast-pass animate-in" style={{
            maxWidth: "800px",
            margin: "0 auto 28px",
            background: "linear-gradient(90deg, rgba(16, 185, 129, 0.08) 0%, rgba(0, 240, 255, 0.08) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            borderRadius: "14px",
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <div>
                <span style={{ color: "#10b981", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Returning Traders / Whitelisted Accounts
                </span>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#e2e8f0" }}>
                  Told to download the updated EA? Verify your account &amp; grab <strong>v1.67 MT5</strong> or <strong>v1.62 MT4</strong> directly.
                </p>
              </div>
            </div>
            <a
              href="#authorization"
              className="btn btn-sm"
              onClick={() => playTactileClick(0.08)}
              style={{
                background: "#10b981",
                color: "#0a0e1a",
                fontWeight: 900,
                padding: "9px 20px",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                border: "none",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
              }}
            >
              📥 Go to Downloads &amp; Checker ➜
            </a>
          </div>

          {/* TELEMETRY STRIP */}
          <div className="jp-telemetry-strip animate-in">
            <div className="jp-telemetry-item">
              <span className="jp-telemetry-dot"></span>
              <span>MODEL WIN RATE: <span className="jp-telemetry-val" style={{ color: "var(--liquid-cyan)" }}>84.2%</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>MAX DRAWDOWN: <span className="jp-telemetry-val" style={{ color: "var(--liquid-emerald)" }}>&lt; 12.8%</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>SOFTWARE COST: <span className="jp-telemetry-val" style={{ color: "#00f0ff" }}>$0 (100% FREE)</span></span>
            </div>
            <div className="jp-telemetry-item">
              <span>AUTHORIZED ACCOUNTS: <span className="jp-telemetry-val">900+ VERIFIED</span></span>
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
                  <div className="flagship-hud-label">Asset &amp; Timeframe</div>
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
        </div>
      </section>

      {/* ROTATING PROMO BANNER STRIP */}
      <section className="promo-banner-strip">
        <div className="container">
          <RotatingAdBanner variant="strip" />
        </div>
      </section>

      {/* THE 3-STEP AFFILIATE ONBOARDING JOURNEY */}
      <section id="how-to-get-free" style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">参加手順</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">INSTANT ACTIVATION // 登録手順</span>
            <h2>How to Get EA Budak Ubat 100% Free</h2>
            <p>
              Follow these 3 simple steps to unlock permanent whitelist authorization on your live trading account.
            </p>
          </div>

          <div className="affiliate-steps-grid">
            <div className="affiliate-step-card animate-in">
              <span className="affiliate-step-badge">STEP 01</span>
              <div className="affiliate-step-num">1</div>
              <h3 className="affiliate-step-title">Register Broker Account</h3>
              <p className="affiliate-step-desc">
                Select one of our official authorized brokers below (Tickmill, RoboForex, XM, FBS, JustMarkets, Headway, etc.) and create a new MT4 or MT5 account using our partner link.
              </p>
              <a href="#broker-partners" className="btn btn-secondary btn-sm" onClick={() => playTactileClick(0.08)}>
                View Recommended Brokers ↓
              </a>
            </div>

            <div className="affiliate-step-card animate-in">
              <span className="affiliate-step-badge">STEP 02</span>
              <div className="affiliate-step-num">2</div>
              <h3 className="affiliate-step-title">Fund &amp; Submit Account ID</h3>
              <p className="affiliate-step-desc">
                Fund your live trading account ($10 Cent or $100 Standard recommended). Then submit your account number via our online license checker or Telegram to get whitelisted.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <a href="#authorization" className="btn btn-secondary btn-sm" onClick={() => playTactileClick(0.08)}>
                  🔐 Check Whitelist &amp; Download
                </a>
                <a href="https://t.me/SyariefAzman" className="btn btn-accent btn-sm" target="_blank" rel="noopener noreferrer" onClick={() => playTactileClick(0.08)}>
                  💬 Telegram @SyariefAzman
                </a>
              </div>
            </div>

            <div className="affiliate-step-card animate-in">
              <span className="affiliate-step-badge">STEP 03</span>
              <div className="affiliate-step-num">3</div>
              <h3 className="affiliate-step-title">Run EA &amp; Calibrated Presets</h3>
              <p className="affiliate-step-desc">
                Download EA Budak Ubat, drag it onto your MT4 or MT5 chart (EURUSD M5), load our pre-calibrated broker .set presets, and enjoy 24/7 automated algorithmic trading!
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <a href={DOWNLOAD_MT5} className="btn btn-primary btn-sm" onClick={() => playTactileClick(0.08)}>
                  ⬇️ MT5 (.ex5)
                </a>
                <a href="#presets" className="btn btn-secondary btn-sm" onClick={() => playTactileClick(0.08)}>
                  ⚙️ Load .set Presets
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PARTNER BROKER SHOWCASE (THE CORE AFFILIATE HUB) */}
      <section id="broker-partners" style={{ padding: "80px 0" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">提携証券会社</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label" style={{ color: "#00f0ff", borderColor: "rgba(0, 240, 255, 0.3)" }}>
              ⭐ OFFICIAL BROKER PARTNERS // 提携ブローカー一覧
            </span>
            <h2>Select Your Broker &amp; Unlock EA Free</h2>
            <p style={{ maxWidth: "800px", margin: "10px auto 0" }}>
              Register your live trading account under any of our official partner brokers below to receive permanent whitelist licensing for EA Budak Ubat at zero software cost.
            </p>
          </div>

          <div className="partner-broker-grid">
            {(showAllBrokers ? PARTNER_BROKERS : PARTNER_BROKERS.slice(0, 3)).map((b, idx) => (
              <div key={b.name} className="partner-broker-card animate-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="partner-broker-content">
                  <div className="partner-broker-top-bar">
                    <h3 className="partner-broker-title">{b.name}</h3>
                    <span
                      className="partner-broker-badge"
                      style={{ background: `${b.color}20`, color: b.color, border: `1px solid ${b.color}45` }}
                    >
                      {b.badge}
                    </span>
                  </div>

                  <h4 className="partner-broker-headline">{b.headline}</h4>
                  <p className="partner-broker-desc">{b.desc}</p>

                  <div className="partner-broker-tags">
                    {b.features.map((feat, fIdx) => (
                      <span key={fIdx} className="partner-broker-tag">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  <div className="partner-broker-meta-bar">
                    <span>PARTNER CODE: <strong className="partner-broker-code-highlight">{b.id}</strong></span>
                    <span>MIN: {b.minDeposit}</span>
                  </div>
                </div>

                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-broker-cta-button"
                  style={{ background: b.btnBg, color: b.btnColor }}
                  onClick={() => playTactileClick(0.12)}
                >
                  <span>Open Account &amp; Unlock EA Free</span>
                  <span>➜</span>
                </a>
              </div>
            ))}
          </div>

          {/* EXPAND / COLLAPSE ALL 14 BROKERS TOGGLE */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              type="button"
              onClick={() => {
                playTactileClick(0.08);
                setShowAllBrokers(!showAllBrokers);
              }}
              style={{
                padding: "14px 32px",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "0.95rem",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(0, 240, 255, 0.4)",
                color: "#00f0ff",
                cursor: "pointer",
                boxShadow: "0 4px 25px rgba(0, 0, 0, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              <span>
                {showAllBrokers
                  ? "▲ Show Top 3 Featured Brokers Only"
                  : `▼ View All 14 Authorized Broker Partners (${PARTNER_BROKERS.length - 3} More)`}
              </span>
            </button>
          </div>

          {/* AFFILIATE PERKS SHOWCASE */}
          <div style={{ marginTop: "70px" }}>
            <div className="section-header animate-in">
              <span className="label">CLIENT ADVANTAGES // 特典</span>
              <h2>Why Trade as an Official EA Budak Ubat Client?</h2>
              <p>
                When you trade through our broker partner links, you unlock exclusive institutional-grade trading benefits at zero additional expense.
              </p>
            </div>

            <div className="affiliate-perks-grid">
              {AFFILIATE_PERKS.map((perk, pIdx) => (
                <div key={perk.title} className="affiliate-perk-card animate-in" style={{ animationDelay: `${pIdx * 0.06}s` }}>
                  <span className="perk-icon">{perk.icon}</span>
                  <h4 className="perk-title">{perk.title}</h4>
                  <p className="perk-desc">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S NEW IN V1.67 BANNER */}
      <div className="container" style={{ marginBottom: "30px", position: "relative", zIndex: 10 }}>
        <div className="v163-banner-card animate-in">
          <div className="v163-banner-left">
            <span className="v163-banner-icon">🚀</span>
            <div>
              <h4 className="v163-banner-title">What's New in v1.67: Real-Time Intra-Candle Tick Guard</h4>
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

      {/* QUICK JUMP TOOLS NAVIGATION */}
      <section id="tools" style={{ padding: "60px 0 20px 0" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">対話型ツール</div>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">INTERACTIVE WORKBENCH // ツール群</span>
            <h2>EA Budak Ubat Flagship Tooling Suite</h2>
            <p>
              Simulate market moves, generate customized .set parameter presets, calculate grid margin cushions, and verify authorized accounts in real time.
            </p>
          </div>

          <div className="tools-nav-bar animate-in" style={{ justifyContent: "center" }}>
            <a href="#simulator" className="tool-nav-btn" onClick={() => playTactileClick(0.08)}>
              <span>⚡</span>
              <span>Market Simulator</span>
            </a>
            <a href="#presets" className="tool-nav-btn" onClick={() => playTactileClick(0.08)}>
              <span>⚙️</span>
              <span>Preset Studio (.set)</span>
            </a>
            <a href="#calculator" className="tool-nav-btn" onClick={() => playTactileClick(0.08)}>
              <span>🧮</span>
              <span>Margin &amp; Risk Calculator</span>
            </a>
            <a href="#authorization" className="tool-nav-btn" onClick={() => playTactileClick(0.08)}>
              <span>🔐</span>
              <span>Account License Checker</span>
            </a>
          </div>
        </div>
      </section>

      {/* TRADER WORKBENCH SUITE PREVIEW */}
      <section id="tools-preview" style={{ padding: "80px 0", background: "var(--bg-secondary)", position: "relative" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">QUANTITATIVE WORKBENCH // ツール群</span>
            <h2>Algorithmic Simulation &amp; Margin Tools</h2>
            <p style={{ maxWidth: "800px", margin: "12px auto 0" }}>
              Calibrate your trading parameters before deploying EA Budak Ubat on live capital. 
              Access our complete dedicated workbench of execution simulators, preset generators, and risk calculators.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "36px" }}>
            <div className="about-pillar-card animate-in" style={{ border: "1px solid rgba(0, 240, 255, 0.3)" }}>
              <div className="about-pillar-icon" style={{ background: "rgba(0, 240, 255, 0.15)", color: "#00f0ff" }}>📊</div>
              <h3 className="about-pillar-title">Execution Simulator</h3>
              <p className="about-pillar-desc">
                Simulate live market scenarios, test dynamic ADR grid layering, and observe the volume-weighted break-even Take Profit pool execute in real time.
              </p>
              <Link
                href="/tools#simulator"
                className="btn btn-secondary btn-sm"
                onClick={() => playTactileClick(0.08)}
                style={{ marginTop: "16px", color: "#00f0ff", borderColor: "rgba(0, 240, 255, 0.4)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Launch Simulator</span>
                <span>➜</span>
              </Link>
            </div>

            <div className="about-pillar-card animate-in" style={{ border: "1px solid rgba(59, 130, 246, 0.3)" }}>
              <div className="about-pillar-icon" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>⚙️</div>
              <h3 className="about-pillar-title">Preset Studio (.set)</h3>
              <p className="about-pillar-desc">
                Download pre-calibrated parameter files or customize grid multipliers, ADR auto-config ratios, and take profit targets ready to load directly into MetaTrader.
              </p>
              <Link
                href="/tools#presets"
                className="btn btn-secondary btn-sm"
                onClick={() => playTactileClick(0.08)}
                style={{ marginTop: "16px", color: "#38bdf8", borderColor: "rgba(59, 130, 246, 0.4)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Open Preset Studio</span>
                <span>➜</span>
              </Link>
            </div>

            <div className="about-pillar-card animate-in" style={{ border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              <div className="about-pillar-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>🧮</div>
              <h3 className="about-pillar-title">Cent &amp; Margin Risk</h3>
              <p className="about-pillar-desc">
                Plan your capital requirements. Calculate cumulative lots, drawdown depth, and liquidation safety cushions across Cent and Standard accounts.
              </p>
              <Link
                href="/tools#calculator"
                className="btn btn-secondary btn-sm"
                onClick={() => playTactileClick(0.08)}
                style={{ marginTop: "16px", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.4)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Open Margin Calculator</span>
                <span>➜</span>
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/tools"
              className="about-btn-primary"
              onClick={() => playTactileClick(0.12)}
              style={{ padding: "14px 36px", fontSize: "1rem" }}
            >
              <span>⚙️</span>
              <span>Launch Full Trader Tools Workbench</span>
              <span>➜</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* TOOL 4: ACCOUNT LICENSE CHECKER */}
      <section id="authorization" style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">TOOL 04 // 口座認証ポータル</span>
            <h2>Account License &amp; Whitelist Verification</h2>
            <p>
              Verify your MetaTrader account status across any partner broker or download the latest authorized binaries instantly.
            </p>
          </div>
          <AccountChecker initialEa="ea-budak-ubat" />
        </div>
      </section>

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* STANDALONE MQL5 MARKET ALTERNATIVE (FOR TRADERS UNABLE TO SWITCH BROKERS) */}
      <section style={{ background: "var(--bg-secondary)", padding: "70px 0" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">STANDALONE ALTERNATIVE // スタンドアロン版</span>
            <h2>Prefer to Keep Your Existing Broker?</h2>
            <p>
              If you trade with an unsupported broker, proprietary firm, or institutional desk that you cannot switch, you can acquire the official standalone MT5 license on MQL5 Market.
            </p>
          </div>

          <div className="track-card featured animate-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div>
              <span className="track-tag mql5">★ Standalone · No Broker Lock</span>
              <h3 className="track-title">Official MQL5 Market Edition (MT5)</h3>
              <p className="track-desc">
                Instant activation via MetaQuotes MQL5 Market. Works on any MT5 broker globally with zero broker affiliation required and zero monthly expiration.
              </p>
              <ul className="track-checklist">
                <li><span className="check-icon">✓</span> 20 MetaTrader 5 Terminal Activations</li>
                <li><span className="check-icon">✓</span> Native MetaQuotes DRM &amp; Cloud Delivery</li>
                <li><span className="check-icon">✓</span> Free Lifetime Automatic Updates in MT5</li>
                <li><span className="check-icon">✓</span> Hedging &amp; Netting Account Certified</li>
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

          <div style={{ margin: "24px auto 0", maxWidth: "800px" }}>
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
                  <a
                    href="#broker-partners"
                    className="btn btn-accent btn-sm"
                    data-cursor-label="FREE"
                    style={{ animation: "none" }}
                  >
                    🎁 Get Free via Partner Broker
                  </a>
                  <a
                    href="#authorization"
                    className="btn btn-secondary btn-sm"
                    data-cursor-label="CHECK"
                    style={{ animation: "none" }}
                  >
                    🔐 Verify Whitelist
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

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* DYNAMIC SUPABASE-POWERED MQL5 PRODUCTS SHOWCASE */}
      <MQLProductsShowcase />

      <div className="jp-architectural-line" aria-hidden="true"></div>

      {/* ABOUT THE ARCHITECT & SYSTEM */}
      <section id="about" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">THE ARCHITECT &amp; QUANTITATIVE PHILOSOPHY</span>
            <h2>Where Pharmaceutical Precision Meets Algorithmic Trading</h2>
            <p style={{ maxWidth: "840px", margin: "12px auto 0", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              The engineering story behind <strong>EA Budak Ubat</strong> — translating zero-tolerance laboratory chemical assay precision, 
              Good Laboratory Practice (GLP), and ISO calibration discipline into high-resilience quantitative trading systems.
            </p>
          </div>

          <div className="about-content animate-in">
            {/* CREATOR PROFILE CARD */}
            <div className="about-creator-card">
              <div className="about-creator-header">
                <div className="about-avatar-frame" aria-hidden="true">
                  <span>🔬</span>
                </div>
                <div className="about-creator-titles">
                  <div className="about-creator-name">Syarief Azman bin Rosli</div>
                  <div className="about-creator-role">
                    Quantitative Software Architect · Pharmaceutical Quality Control Analyst
                  </div>
                  <div className="about-creator-location">
                    <span>📍 Petaling Jaya, Selangor, Malaysia</span>
                    <span style={{ margin: "0 6px" }}>·</span>
                    <a
                      href="https://github.com/syarief02"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 700 }}
                    >
                      GitHub @syarief02
                    </a>
                  </div>
                </div>
              </div>

              {/* CREDENTIALS BADGES */}
              <div className="about-badges">
                <span className="about-badge-item highlight-cyan">
                  🧪 National Pharmaceutical Regulatory Agency (NPRA, MOH)
                </span>
                <span className="about-badge-item highlight-blue">
                  🎓 Harvard CS50x &amp; CS50 Cybersecurity
                </span>
                <span className="about-badge-item highlight-amber">
                  💻 2.87M+ Lines of Code Authored (78 Repositories)
                </span>
                <span className="about-badge-item highlight-emerald">
                  🛡️ Pure Native MQL5 / MQL4 (Zero DLL Vulnerability)
                </span>
                <span className="about-badge-item">
                  ⭐ Official MQL5 Market Seller
                </span>
              </div>

              {/* CORE ETHOS QUOTE */}
              <div className="about-bio-quote">
                &ldquo;In pharmaceutical quality control, an uncalibrated micropipette or an undetected trace contaminant invalidates an entire chemical assay. In retail algorithmic trading, undisciplined parameters and emotional biases destroy trading capital. I engineer every Expert Advisor with the exact same laboratory rigor: hypothesis-driven development, continuous tick-level backtesting, and automated risk boundaries.&rdquo;
              </div>
            </div>

            {/* EXPANDED STATS GRID */}
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <span className="about-stat-number">2.87M+</span>
                <div className="about-stat-label">Lines of Code</div>
                <div className="about-stat-sub">Across 78 Repositories</div>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">900+</span>
                <div className="about-stat-label">Authorized Accounts</div>
                <div className="about-stat-sub">MT4 &amp; MT5 Live Users</div>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">2014</span>
                <div className="about-stat-label">Genesis Year</div>
                <div className="about-stat-sub">12+ Years Live Heritage</div>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">100%</span>
                <div className="about-stat-label">Pure Native MQL</div>
                <div className="about-stat-sub">Zero Risky DLL Binaries</div>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">4 Engines</span>
                <div className="about-stat-label">Signal Confluence</div>
                <div className="about-stat-sub">Ichimoku, Alligator, SMA, Candle</div>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">1-Minute</span>
                <div className="about-stat-label">AutoConfig AI</div>
                <div className="about-stat-sub">Real-Time ADR Recalculation</div>
              </div>
            </div>

            {/* 4 PILLARS OF BUDAK UBAT */}
            <div className="about-pillars-grid">
              <div className="about-pillar-card">
                <div className="about-pillar-icon">💊</div>
                <h3 className="about-pillar-title">1. The &ldquo;Budak Ubat&rdquo; Heritage</h3>
                <p className="about-pillar-desc">
                  The nomenclature originates from Malay, translating loosely to <em>&ldquo;Medicine Boy&rdquo;</em> — a humble tribute to Syarief&rsquo;s career in pharmaceutical analysis. Initially publicized in 2014 as <strong>EA Budak Ubat v1.27</strong> on MT4 and later expanded via SoeHoe and international forums (including the v1.51 Flexible iteration), the algorithm has continuously evolved through more than a decade of live market regimes into an institutional-grade quantitative suite.
                </p>
              </div>

              <div className="about-pillar-card">
                <div className="about-pillar-icon">🔬</div>
                <h3 className="about-pillar-title">2. Laboratory Precision to Code</h3>
                <p className="about-pillar-desc">
                  Operating high-precision instrumentation (HPLC, GC-MS, ICP-MS Agilent 8900) and executing ISO 8655-2 / ISO 4787 volumetric verifications instilled a culture of zero margin for error. We treat financial tick data like molecular assays: strictly validating empirical data and eliminating confirmation bias.
                </p>
              </div>

              <div className="about-pillar-card">
                <div className="about-pillar-icon">🤖</div>
                <h3 className="about-pillar-title">3. Dynamic AutoConfig AI Engine</h3>
                <p className="about-pillar-desc">
                  Static grid bots inevitably fail when volatility shifts. EA Budak Ubat&rsquo;s AutoConfig AI mathematically anchors grid spacing and take-profit targets to real-time 20-day Average Daily Range (ADR) and 365-day macro baselines, recalculating every 60 seconds to expand during market shocks and compress during consolidation.
                </p>
              </div>

              <div className="about-pillar-card">
                <div className="about-pillar-icon">🛡️</div>
                <h3 className="about-pillar-title">4. Capital Resilience &amp; Margin Realism</h3>
                <p className="about-pillar-desc">
                  We reject dishonest &ldquo;zero-risk&rdquo; marketing. Martingale sequences require mathematical boundaries: hard lot caps, expanding step increments, and the critical mandate of Cent (USC) accounts with 1:500–1:1000+ leverage to provide a 100x margin buffer that withstands macroeconomic fat-tail trends.
                </p>
              </div>
            </div>

            {/* TIMELINE PREVIEW */}
            <div className="about-timeline-wrapper">
              <div className="about-timeline-title">
                <span>⏳</span>
                <span>The Algorithmic Evolution Timeline (12+ Years Heritage)</span>
              </div>
              <div className="about-timeline-nodes">
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2014 – 2016</div>
                  <div className="about-timeline-heading">Initial Genesis (v1.27)</div>
                  <div className="about-timeline-text">
                    Publicized in 2014 as EA Budak Ubat v1.27 on MT4; documented across early forex communities and Myfxbook logs.
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2017 – 2019</div>
                  <div className="about-timeline-heading">Forum Expansion (v1.51)</div>
                  <div className="about-timeline-text">
                    v1.51 Flexible shared on SoeHoe &amp; regional forums with dynamic multiplier testing on FBS and XM live accounts.
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2020 – 2022</div>
                  <div className="about-timeline-heading">Mathematical Hardening</div>
                  <div className="about-timeline-text">
                    Integrated dynamic distance increments, H1 RSI higher-timeframe filters, and laboratory automation workflows.
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">SEPTEMBER 2023</div>
                  <div className="about-timeline-heading">MQL5 Market Debut</div>
                  <div className="about-timeline-text">
                    Complete rewrite to Pure Native MT5. Zero external DLLs, official Netting &amp; Hedging certification.
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2024 – 2025</div>
                  <div className="about-timeline-heading">Multi-EA Ecosystem</div>
                  <div className="about-timeline-text">
                    Launched GoldMind AI (FastAPI + OpenAI MT5 Vision), BracketBlitz (OCO breakout), and MathEdge Pro.
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2026 (CURRENT)</div>
                  <div className="about-timeline-heading">v1.67 Intra-Candle Engine</div>
                  <div className="about-timeline-text">
                    Real-time tick-by-tick basket break-even trailing, dynamic ADR scaling, and automated whitelist infrastructure.
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="about-actions-bar">
              <Link href="/about" className="about-btn-primary">
                <span>📖</span>
                <span>Read Full Biography &amp; Technical Architecture</span>
                <span>→</span>
              </Link>
              <a
                href={MQL5_MARKET_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn-secondary"
              >
                <span>🛒</span>
                <span>Verified MQL5 Market Author</span>
              </a>
              <a
                href="https://t.me/SyariefAzman"
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn-secondary"
              >
                <span>💬</span>
                <span>Connect with Developer on Telegram</span>
              </a>
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
              { icon: "💬", title: "Telegram Support", desc: "@SyariefAzman", url: "https://t.me/SyariefAzman" },
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

      {/* COMMUNITY SPOTLIGHT */}
      <section id="community-hub" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label community-label">Community Spotlight</span>
            <h2>Trader Feedback &amp; Ideas</h2>
            <p>Real feedback, algorithmic ideas, and EA feature requests from our active trading community.</p>
          </div>

          {/* Top 3 Comments Showcase */}
          {loading ? (
            <div className="feed-loading">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Loading community posts...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="feed-empty animate-in">
              <span className="feed-empty-icon">💬</span>
              <h3>No posts yet</h3>
              <p>Be the first to join the conversation in our community!</p>
            </div>
          ) : (
            <div className="feed-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {filteredComments.slice(0, 3).map((comment, i) => {
                const typeInfo = getTypeInfo(comment.type);
                return (
                  <div
                    key={comment.id}
                    className="comment-card animate-in"
                    style={{ animationDelay: `${i * 0.05}s`, display: "flex", flexDirection: "column", height: "100%" }}
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

                    <p className="comment-message" style={{ flexGrow: 1, maxHeight: "120px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {comment.message}
                    </p>

                    <div className="comment-actions-bar" style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                      <button
                        type="button"
                        className={`comment-react-btn ${(reactions[comment.id]?.user_helpful) ? "active" : ""}`}
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
                        onClick={() => handleReaction(comment.id, "insight")}
                      >
                        <span>💡</span>
                        <span>Idea</span>
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

          {/* CTA Hub Banner */}
          <div
            className="glass-card animate-in"
            style={{
              marginTop: "40px",
              padding: "36px",
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
              borderColor: "rgba(139, 92, 246, 0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>💬</span>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#fff" }}>
              Join the EA Budak Ubat Trader Community
            </h3>
            <p style={{ maxWidth: "600px", color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
              Explore trader feedback, submit custom EA requests, share algorithmic strategies, or connect live on Telegram.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
              <Link
                href="/community"
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #0070f3)",
                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                  padding: "12px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                🚀 Open Community Hub &amp; Post
              </Link>
              <a
                href="https://t.me/EABudakUbat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                📢 Join Telegram Channel
              </a>
            </div>
          </div>
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
              <h4>Authorized Brokers</h4>
              <ul className="footer-links">
                <li><a href="https://tickmill.link/46cOQ2h" target="_blank" rel="noopener noreferrer">Tickmill (Raw ECN · #1 Choice)</a></li>
                <li><a href="https://rinfinity.com/en/welcome-bonus?a=mxyg" target="_blank" rel="noopener noreferrer">RoboForex (ProCent · #2 Choice)</a></li>
                <li><a href="https://clicks.pipaffiliates.com/c?m=150422&c=862266" target="_blank" rel="noopener noreferrer">XM (100% Bonus)</a></li>
                <li><a href="https://fbs.partners?ibl=154319&ibp=588292" target="_blank" rel="noopener noreferrer">FBS (1:3000 Leverage)</a></li>
                <li><a href="https://one.justmarkets.link/a/tjrtn60m2i/landing/trade-metals-like-professional?promo=4869" target="_blank" rel="noopener noreferrer">JustMarkets (Zero Spread)</a></li>
                <li><a href="https://headway.partners/landings/en/bonus-150/?hwp=516d6b" target="_blank" rel="noopener noreferrer">Headway ($150 Bonus)</a></li>
                <li><a href="https://banner-api.hfmmalaysia.com/link/e993b134?regulator=HFSV&refid=30572923" target="_blank" rel="noopener noreferrer">HF Markets (Cent Account)</a></li>
              </ul>
            </div>
            <div>
              <h4>Ecosystem &amp; Tools</h4>
              <ul className="footer-links">
                <li><Link href="/about" style={{ color: "#00f0ff", fontWeight: 700 }}>About Syarief Azman</Link></li>
                <li><Link href="/products">Multi-EA Ecosystem</Link></li>
                <li><Link href="/tools">Quant Tools &amp; Simulator</Link></li>
                <li><Link href="/community">Community Discussion</Link></li>
                <li><a href="#authorization">Whitelist Checker</a></li>
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
