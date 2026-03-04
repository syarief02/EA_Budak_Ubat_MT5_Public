"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

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
    version: "v1.62",
    tagline: "Grid Martingale Expert Advisor",
    description: "A powerful grid-based martingale EA for MetaTrader 4 & MetaTrader 5. Features 4 analysis methods (Candle, SMA20, Alligator, Ichimoku), AutoConfig AI, hedging support, and configurable time filters.",
    platforms: ["MT4", "MT5"],
    highlights: ["4 Analysis Methods", "AutoConfig AI", "Grid Martingale", "Hedging Support"],
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    accentColor: "#3b82f6",
    icon: "📊",
    status: "Live",
    category: "Grid Trading",
  },
  {
    slug: "goldmind-ai",
    name: "GoldMind AI",
    version: "Open Source",
    tagline: "AI-Powered XAUUSD Signal Trading",
    description: "An AI-powered trading system that uses ChatGPT to analyze gold (XAUUSD) price charts and automatically place trades in MetaTrader 5. Runs entirely on your computer with FastAPI + OpenAI + MQL5.",
    platforms: ["MT5"],
    highlights: ["ChatGPT Analysis", "6 Safety Filters", "Smart Lot Sizing", "Auto Refresh"],
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    accentColor: "#f59e0b",
    icon: "🤖",
    status: "New",
    category: "AI Trading",
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
    status: "New",
    category: "Breakout",
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
    status: "New",
    category: "Index Trading",
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
    status: "New",
    category: "Trend Following",
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
    status: "New",
    category: "Trend Following",
  },
];

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
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

    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      message: formData.message.trim(),
    };

    if (formData.type === "ea_request" && formData.ea_name.trim()) {
      payload.ea_name = formData.ea_name.trim();
    }

    const { error } = await supabase.from("comments").insert([payload]);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
      console.error("Submit error:", error);
    } else {
      setSubmitSuccess(true);
      setFormData({ name: "", type: "feedback", ea_name: "", message: "" });
      fetchComments();
      setTimeout(() => setSubmitSuccess(false), 4000);
    }

    setSubmitting(false);
  }

  const filteredComments =
    filter === "all" ? comments : comments.filter((c) => c.type === filter);

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
          <a href="#" className="nav-brand">EA Budak Ubat</a>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/guide" onClick={() => setMobileNavOpen(false)}>📖 Guide</Link></li>
            <li><a href="#products" onClick={() => setMobileNavOpen(false)}>Products</a></li>
            <li><a href="#community-hub" onClick={() => setMobileNavOpen(false)}>💬 Community</a></li>
            <li><a href="#about" onClick={() => setMobileNavOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a></li>
            <li><a href="https://t.me/SyariefAzman" className="nav-cta" target="_blank">💬 Telegram</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero catalog-hero" id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Trading Tools & Expert Advisors
          </div>
          <h1>
            <span className="gradient-text">EA Budak Ubat</span>
          </h1>
          <p className="hero-subtitle">
            Professional-grade Expert Advisors and AI-powered trading systems for MetaTrader
            by Syarief Azman. Built for performance, rigorously tested, and continuously improved.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary" style={{ animation: "none" }}>🔽 Explore Products</a>
            <a href="https://t.me/SyariefAzman" className="btn btn-secondary" target="_blank">💬 Contact on Telegram</a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Products</span>
            <h2>Expert Advisors & Trading Systems</h2>
            <p>Choose the right tool for your trading strategy.</p>
          </div>
          <div className="product-catalog">
            {PRODUCTS.map((product, i) => (
              <Link
                key={product.slug}
                href={`/${product.slug}`}
                className="product-card animate-in"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="product-card-glow" style={{ background: product.gradient }}></div>
                <div className="product-card-content">
                  <div className="product-card-header">
                    <div className="product-icon-wrapper" style={{ background: product.gradient }}>
                      <span className="product-icon">{product.icon}</span>
                    </div>
                    <div className="product-meta">
                      <span className={`product-status ${product.status === 'New' ? 'status-new' : 'status-live'}`}>
                        {product.status}
                      </span>
                      <span className="product-category">{product.category}</span>
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
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
                  <span className="stat-number">MT4 & MT5</span>
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
              { icon: "💬", title: "Telegram", desc: "@SyariefAzman", url: "https://t.me/SyariefAzman" },
              { icon: "📱", title: "WhatsApp", desc: "+60194961568", url: "https://wa.me/60194961568" },

              { icon: "🐦", title: "Twitter/X", desc: "@SyariefAzman", url: "https://www.twitter.com/SyariefAzman" },
              { icon: "📢", title: "Telegram Channel", desc: "t.me/EABudakUbat", url: "https://t.me/EABudakUbat" },
              { icon: "📊", title: "MQL5 Signal", desc: "Signal Channel", url: "https://www.mql5.com/en/channels/eabudakubat" },
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
            <h2>Share & Connect</h2>
            <p>Got an idea? Want to request an EA? Give feedback? We'd love to hear from you.</p>
          </div>

          {/* Post Form */}
          <form className="community-form glass-card animate-in" onSubmit={handleSubmit} style={{ marginBottom: "60px" }}>
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
                          <span className="comment-author">{comment.name}</span>
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

                    {comment.ea_name && (
                      <div className="comment-ea-tag">
                        🤖 Requested: <strong>{comment.ea_name}</strong>
                      </div>
                    )}

                    <p className="comment-message">{comment.message}</p>
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
              <h3 className="footer-brand">EA Budak Ubat</h3>
              <p className="footer-desc">
                Professional trading tools and Expert Advisors for MetaTrader platforms by Syarief Azman. Built with passion and real-world trading experience.
              </p>
              <div className="social-links">
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                <a href="https://wa.me/60194961568" className="social-link" target="_blank" title="WhatsApp">📱</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4>Products</h4>
              <ul className="footer-links">
                <li><Link href="/ea-budak-ubat">EA Budak Ubat</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
                <li><Link href="/bracketblitz">BracketBlitz EA</Link></li>
                <li><Link href="/mathedge-pro">MathEdge Pro</Link></li>
                <li><Link href="/aligator-gozaimasu">Aligator Gozaimasu</Link></li>
                <li><Link href="/encik-moku">Encik Moku</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                <li><a href="https://wa.me/60194961568" target="_blank">WhatsApp: +60194961568</a></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank">Channel: t.me/EABudakUbat</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Automated trading systems can result in significant losses. Past performance is not indicative of future results. Always test on a demo account first. Not available in restricted jurisdictions.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
