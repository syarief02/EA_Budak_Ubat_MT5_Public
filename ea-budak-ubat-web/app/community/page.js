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

export default function CommunityPage() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="nav-brand">EA Budak Ubat</Link>
                    <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
                        <li><Link href="/guide" onClick={() => setMobileNavOpen(false)}>📖 Guide</Link></li>
                        <li><Link href="/#products" onClick={() => setMobileNavOpen(false)}>Products</Link></li>
                        <li><Link href="/community" onClick={() => setMobileNavOpen(false)} style={{ color: "var(--accent-cyan)" }}>💬 Community</Link></li>
                        <li><a href="https://t.me/SyariefAzman" className="nav-cta" target="_blank">💬 Telegram</a></li>
                    </ul>
                    <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                        {mobileNavOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero community-hero" id="community-hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-community-1"></div>
                <div className="hero-glow hero-glow-community-2"></div>
                <div className="hero-content">
                    <div className="hero-badge community-badge">
                        <span className="hero-badge-dot community-dot"></span>
                        Community Hub
                    </div>
                    <h1>
                        <span className="community-gradient-text">Share & Connect</span>
                    </h1>
                    <p className="hero-subtitle">
                        Share your trading ideas, give feedback on our EAs, or request a new Expert Advisor.
                        Your voice shapes what we build next.
                    </p>
                    <div className="hero-actions">
                        <a href="#post-form" className="btn btn-community-primary" style={{ animation: "none" }}>✍️ Write a Post</a>
                        <a href="#feed" className="btn btn-secondary">📖 Browse Posts</a>
                    </div>
                </div>
            </section>

            {/* POST FORM */}
            <section id="post-form" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label community-label">New Post</span>
                        <h2>Share Your Thoughts</h2>
                        <p>Got an idea? Want to request an EA? We'd love to hear from you.</p>
                    </div>

                    <form className="community-form glass-card animate-in" onSubmit={handleSubmit}>
                        {/* Name */}
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

                        {/* Type selector */}
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

                        {/* EA Name (conditional) */}
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

                        {/* Message */}
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

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-community-primary submit-btn"
                            disabled={submitting}
                            style={{ animation: "none" }}
                        >
                            {submitting ? (
                                <>
                                    <span className="spinner"></span> Posting...
                                </>
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
                </div>
            </section>

            {/* FEED */}
            <section id="feed">
                <div className="container">
                    <div className="section-header animate-in">
                        <span className="label community-label">Community Feed</span>
                        <h2>What People Are Saying</h2>
                    </div>

                    {/* Filter Tabs */}
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
                                Professional trading tools and Expert Advisors for MetaTrader platforms by Syarief Azman.
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
                            <h4>Community</h4>
                            <ul className="footer-links">
                                <li><Link href="/community">💬 Community Hub</Link></li>
                                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                                <li><a href="https://t.me/EABudakUbat" target="_blank">Channel: t.me/EABudakUbat</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved.</p>
                        <p className="footer-disclaimer">
                            Risk warning: Trading on margin carries a high level of risk. Automated trading systems can result in significant losses. Past performance is not indicative of future results. Always test on a demo account first.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
