"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import MQL5TrustBadge from "@/app/components/MQL5TrustBadge";
import { playTactileClick } from "@/lib/audioSynthesizer";

const POST_TYPES = [
  { key: "idea", label: "💡 Idea", color: "#8b5cf6" },
  { key: "feedback", label: "💬 Feedback", color: "#3b82f6" },
  { key: "ea_request", label: "🤖 Request EA", color: "#f59e0b" },
];

// Limits shared with /api/comments (the server enforces 2-50 for names and 5-1500 for messages).
const NAME_MIN = 2;
const MESSAGE_MIN = 5;
const MESSAGE_MAX = 600;
const MIN_FORM_MS = 2000;

const EMPTY_FORM = { name: "", type: "feedback", ea_name: "", message: "" };

// Returns the first problem with the form, or "" when it can be sent.
function validatePost(form) {
  if (form.name.trim().length < NAME_MIN) return `Please enter your name (at least ${NAME_MIN} characters).`;
  if (form.type === "ea_request" && !form.ea_name.trim()) return "Please name the EA you would like built.";
  if (form.message.trim().length < MESSAGE_MIN) return `Please write a message (at least ${MESSAGE_MIN} characters).`;
  return "";
}

// Server list first, plus any of our own new posts the (cached) server list does not include yet.
function mergeWithOwnPosts(serverList, ownPosts) {
  const ids = new Set(serverList.map((c) => c.id));
  const missing = ownPosts.filter((c) => !ids.has(c.id));
  return [...missing, ...serverList];
}

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

// States (see docs/state-flows.md, section 3):
//   feed:  loadState "loading" -> "ready" | "failed" (Retry goes back to "loading")
//   form:  editing -> submitting -> posted | rejected; validatePost() blocks invalid sends
export default function CommunityPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [botTrap, setBotTrap] = useState("");
  const [reactions, setReactions] = useState({});
  const formOpenedAt = useRef(0); // set on mount and after each post
  const ownPosts = useRef([]); // posts made in this visit, kept until the server list includes them
  const fetchSeq = useRef(0); // only the newest GET may update the feed

  const updateForm = (patch) => {
    setSubmitSuccess(false);
    setFormData((prev) => ({ ...prev, ...patch }));
  };

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

  // `fresh` skips the CDN copy (s-maxage 10 + stale-while-revalidate 59), so a post just made is included.
  const fetchComments = useCallback(async ({ fresh = false, quiet = false } = {}) => {
    const seq = ++fetchSeq.current;
    if (!quiet) setLoadState("loading");
    try {
      const url = fresh ? `/api/comments?fresh=${Date.now()}` : "/api/comments";
      const res = await fetch(url, fresh ? { cache: "no-store" } : undefined);
      const json = await res.json();
      if (seq !== fetchSeq.current) return;
      if (json.success && Array.isArray(json.comments)) {
        const serverIds = new Set(json.comments.map((c) => c.id));
        ownPosts.current = ownPosts.current.filter((c) => !serverIds.has(c.id));
        setComments(mergeWithOwnPosts(json.comments, ownPosts.current));
        setLoadState("ready");
      } else if (!quiet) {
        setLoadState("failed");
      }
    } catch (err) {
      if (seq !== fetchSeq.current) return;
      console.error("Fetch comments error:", err);
      if (!quiet) setLoadState("failed");
    }
  }, []);

  useEffect(() => {
    formOpenedAt.current = Date.now();
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError("");
    setSubmitSuccess(false);

    const problem = validatePost(formData);
    if (problem) {
      setSubmitError(problem);
      return;
    }

    if (botTrap) {
      setSubmitError("Submission rejected.");
      return;
    }

    const elapsed = Date.now() - formOpenedAt.current;
    if (elapsed < MIN_FORM_MS) {
      setSubmitError("Please take your time before submitting.");
      return;
    }

    setSubmitting(true);
    playTactileClick(0.12);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          type: formData.type,
          // The server keeps an EA name only on EA requests, so only send it there.
          ea_name: formData.type === "ea_request" ? formData.ea_name.trim() : null,
          message: formData.message.trim(),
          bot_catch: botTrap,
          form_elapsed_ms: elapsed,
        }),
      });

      let json = null;
      try {
        json = await res.json();
      } catch (parseErr) {
        json = null;
      }

      if (json?.success) {
        const posted = json.comment;
        if (posted?.id) {
          ownPosts.current = [posted, ...ownPosts.current.filter((c) => c.id !== posted.id)];
          setComments((prev) => mergeWithOwnPosts(prev, ownPosts.current));
          // Make sure the visitor can see the post they just made.
          setFilter((current) => (current === "all" || current === posted.type ? current : "all"));
        }
        setSubmitSuccess(true);
        setFormData(EMPTY_FORM);
        formOpenedAt.current = Date.now();
        fetchComments({ fresh: true, quiet: true });
      } else {
        setSubmitError(json?.error || `Failed to submit post (error ${res.status}). Your text is still in the form.`);
      }
    } catch (err) {
      setSubmitError("Network error. Your text is still in the form, please try again.");
    }
    setSubmitting(false);
  }

  const filteredComments = filter === "all" ? comments : comments.filter((c) => c.type === filter);
  const getTypeInfo = (type) => POST_TYPES.find((t) => t.key === type) || POST_TYPES[1];

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
            <li><Link href="/products" onClick={() => setMobileNavOpen(false)}>MQL5 Store</Link></li>
            <li><Link href="/tools" onClick={() => setMobileNavOpen(false)}>Tools ⚙️</Link></li>
            <li><Link href="/about" onClick={() => setMobileNavOpen(false)}>About</Link></li>
            <li><Link href="/community" onClick={() => setMobileNavOpen(false)} style={{ color: "#00f0ff", fontWeight: 700 }}>Community 💬</Link></li>
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

      {/* COMMUNITY HERO */}
      <section className="catalog-hero" style={{ paddingTop: "140px", paddingBottom: "50px", position: "relative" }}>
        <div className="jp-kanji-watermark" aria-hidden="true">共有広場</div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "18px" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#00f0ff", fontWeight: 700 }}>Trader Community &amp; Discussions</span>
          </div>

          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>
              VERIFIED TRADER FEEDBACK · FEATURE REQUESTS · COMMUNITY FORUM
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px" }}>
            Trader Community <span className="gradient-text">Hub</span>
          </h1>

          <p className="hero-subtitle" style={{ maxWidth: "820px", margin: "0 0 24px", fontSize: "1.08rem", lineHeight: 1.7 }}>
            Share your live trading results, request new algorithm features, exchange parameter presets, and connect directly with developer Syarief Azman.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#post-form"
              className="btn btn-primary"
              onClick={() => playTactileClick(0.1)}
              style={{ background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", fontWeight: 800 }}
            >
              ✍️ Write a Post or Feedback
            </a>
            <a
              href="https://t.me/EABudakUbat"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              onClick={() => playTactileClick(0.08)}
            >
              📢 Join Official Telegram Channel
            </a>
          </div>
        </div>
      </section>

      {/* ROTATING BANNER */}
      <section style={{ padding: "0 0 20px" }}>
        <div className="container">
          <RotatingAdBanner />
        </div>
      </section>

      {/* MAIN COMMUNITY CONTAINER */}
      <main className="container" style={{ paddingBottom: "80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>
          {/* LEFT: POST FORM */}
          <div id="post-form" className="glass-card" style={{ padding: "28px", borderRadius: "18px", border: "1px solid rgba(0, 240, 255, 0.2)" }}>
            <h3 style={{ fontSize: "1.3rem", color: "#ffffff", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✍️</span> Share Feedback or Idea
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "20px" }}>
              Posts appear live for the community. Respectful contributions only.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "none" }} aria-hidden="true">
                <input type="text" name="website_url" autoComplete="off" value={botTrap} onChange={(e) => setBotTrap(e.target.value)} tabIndex={-1} />
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label" style={{ display: "block", marginBottom: "6px", fontSize: "0.88rem", fontWeight: 600 }}>Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Trader Hafiz / Quant99"
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  maxLength={50}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label" style={{ display: "block", marginBottom: "6px", fontSize: "0.88rem", fontWeight: 600 }}>Category</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {POST_TYPES.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      aria-pressed={formData.type === t.key}
                      onClick={() => { playTactileClick(0.06); updateForm({ type: t.key }); }}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: formData.type === t.key ? `1px solid ${t.color}` : "1px solid rgba(255, 255, 255, 0.1)",
                        background: formData.type === t.key ? `${t.color}25` : "transparent",
                        color: formData.type === t.key ? "#ffffff" : "var(--text-secondary)",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Only EA requests carry an EA name (the server drops it for ideas and feedback), so ask for it only there. */}
              {formData.type === "ea_request" && (
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label htmlFor="ea-request-name" className="form-label" style={{ display: "block", marginBottom: "6px", fontSize: "0.88rem", fontWeight: 600 }}>EA You Want Built (Required)</label>
                  <input
                    id="ea-request-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Gold breakout EA, News filter for EA Budak Ubat"
                    value={formData.ea_name}
                    onChange={(e) => updateForm({ ea_name: e.target.value })}
                    maxLength={50}
                    required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff" }}
                  />
                </div>
              )}

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label" style={{ display: "block", marginBottom: "6px", fontSize: "0.88rem", fontWeight: 600 }}>Message</label>
                <textarea
                  rows={4}
                  className="form-input"
                  placeholder="Share your experience, suggest improvements, or ask a question..."
                  value={formData.message}
                  onChange={(e) => updateForm({ message: e.target.value })}
                  maxLength={MESSAGE_MAX}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", resize: "vertical" }}
                ></textarea>
                <div style={{ textAlign: "right", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  {formData.message.length}/{MESSAGE_MAX}
                </div>
              </div>

              {submitSuccess && (
                <div role="status" style={{ padding: "12px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", color: "#34d399", fontSize: "0.88rem", marginBottom: "16px" }}>
                  ✓ Post submitted successfully! It is now at the top of the feed. For a private reply, message{" "}
                  <a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer" style={{ color: "#34d399", textDecoration: "underline" }}>@SyariefAzman</a> on Telegram.
                </div>
              )}

              {submitError && (
                <div role="alert" style={{ padding: "12px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", fontSize: "0.88rem", marginBottom: "16px" }}>
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: "100%", padding: "12px", fontWeight: 800, background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", border: "none", borderRadius: "10px", cursor: "pointer" }}
              >
                {submitting ? "Publishing..." : "🚀 Publish Post"}
              </button>
            </form>
          </div>

          {/* RIGHT: COMMENT FEED & FILTERS */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {["all", "idea", "feedback", "ea_request"].map((k) => (
                  <button
                    key={k}
                    onClick={() => { playTactileClick(0.06); setFilter(k); }}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      border: filter === k ? "1px solid #00f0ff" : "1px solid rgba(255, 255, 255, 0.1)",
                      background: filter === k ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.04)",
                      color: filter === k ? "#00f0ff" : "var(--text-secondary)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {k === "ea_request" ? "EA Requests" : k}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {filteredComments.length} Posts
              </span>
            </div>

            {loadState === "loading" && comments.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                Loading community discussions...
              </div>
            ) : loadState === "failed" && comments.length === 0 ? (
              <div className="glass-card" role="alert" style={{ textAlign: "center", padding: "40px", borderRadius: "16px" }}>
                <p style={{ color: "var(--text-secondary)", margin: "0 0 12px" }}>The discussions could not be loaded right now.</p>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => fetchComments({ fresh: true })}>
                  Retry
                </button>
              </div>
            ) : filteredComments.length === 0 ? (
              <div className="glass-card" style={{ textAlign: "center", padding: "40px", borderRadius: "16px" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>💬</span>
                <p style={{ color: "var(--text-secondary)", margin: 0 }}>No posts in this category yet. Be the first to share!</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {filteredComments.map((c) => {
                  const typeInfo = getTypeInfo(c.type);
                  return (
                    <div key={c.id} className="glass-card" style={{ padding: "20px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>{c.name}</span>
                          <span style={{ fontSize: "0.74rem", padding: "2px 8px", borderRadius: "9999px", background: `${typeInfo.color}20`, color: typeInfo.color, border: `1px solid ${typeInfo.color}40`, fontWeight: 700 }}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{timeAgo(c.created_at)}</span>
                      </div>

                      {c.ea_name && (
                        <div style={{ fontSize: "0.82rem", color: "#38bdf8", fontWeight: 600, marginBottom: "8px" }}>
                          Ref: {c.ea_name}
                        </div>
                      )}

                      <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 14px", whiteSpace: "pre-wrap" }}>
                        {c.message}
                      </p>

                      <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "10px" }}>
                        <button
                          type="button"
                          className={`comment-react-btn ${reactions[c.id]?.user_heart ? "active" : ""}`}
                          onClick={() => handleReaction(c.id, "heart")}
                          title="Saved on this device only"
                        >
                          <span>❤️</span>
                          <span>Helpful</span>
                          {(reactions[c.id]?.heart || 0) > 0 && <span className="react-count">{reactions[c.id].heart}</span>}
                        </button>
                        <button
                          type="button"
                          className={`comment-react-btn ${reactions[c.id]?.user_rocket ? "active" : ""}`}
                          onClick={() => handleReaction(c.id, "rocket")}
                          title="Saved on this device only"
                        >
                          <span>🚀</span>
                          <span>Profitable</span>
                          {(reactions[c.id]?.rocket || 0) > 0 && <span className="react-count">{reactions[c.id].rocket}</span>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

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
              <h4>Official Pages</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About the Architect</Link></li>
                <li><Link href="/tools">Trader Workbench</Link></li>
                <li><Link href="/products">MQL5 Store Catalog</Link></li>
                <li><Link href="/changelog">Version Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4>Community &amp; Support</h4>
              <ul className="footer-links">
                <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Telegram Channel: t.me/EABudakUbat</a></li>
                <li><a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">1-on-1 Support: @SyariefAzman</a></li>
                <li><a href="mailto:support@eabudakubat.com">Email: support@eabudakubat.com</a></li>
              </ul>
            </div>
            <div>
              <h4>Free License</h4>
              <ul className="footer-links">
                <li><Link href="/#broker-partners">Get Free Lifetime License</Link></li>
                <li><Link href="/#authorization">Check Whitelist Status</Link></li>
                <li><Link href="/ea-budak-ubat">Installation Guide</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading forex and CFDs on margin carries high risk. Past performance does not guarantee future results. Official domain: https://eabudakubat.com.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
