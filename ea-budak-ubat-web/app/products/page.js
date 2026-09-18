"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success && Array.isArray(json.products)) {
        setProducts(json.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Platform filter
      if (selectedPlatform !== "all" && Array.isArray(p.platforms)) {
        if (!p.platforms.includes(selectedPlatform.toUpperCase())) {
          return false;
        }
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = (p.name || "").toLowerCase().includes(q);
        const inTag = (p.tagline || "").toLowerCase().includes(q);
        const inDesc = (p.description || "").toLowerCase().includes(q);
        const inAssets = (p.target_assets || "").toLowerCase().includes(q);
        const inCat = (p.category || "").toLowerCase().includes(q);
        if (!inName && !inTag && !inDesc && !inAssets && !inCat) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedPlatform, searchQuery]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products, filteredProducts, loading]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products" className="active" style={{ color: "#00f0ff" }}>Products</Link></li>
            <li><Link href="/ea-budak-ubat">EA Budak Ubat</Link></li>
            <li><Link href="/guide">User Guide</Link></li>
            <li><Link href="/learn">Knowledge Codex</Link></li>
            <li><Link href="/changelog">Changelog</Link></li>
            <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li>
              <Link href="/#authorization" className="btn btn-primary btn-sm">
                Whitelist License
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ROTATING SPONSOR BANNER */}
      <RotatingAdBanner variant="strip" />

      {/* HERO SECTION */}
      <header className="page-header" style={{ padding: "100px 0 60px 0", textAlign: "center", position: "relative" }}>
        <div className="container">
          <span className="label" style={{ color: "#00f0ff", borderColor: "rgba(0, 240, 255, 0.3)" }}>
            ⚡ OFFICIAL MQL5 MARKET STORE // 公式マーケット製品群
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", margin: "18px 0", fontWeight: 800 }}>
            Algorithmic Trading Systems &amp; EAs
          </h1>
          <p style={{ maxWidth: "750px", margin: "0 auto", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
            Engineered with mathematical precision, dynamic volatility adaptation, and strict MetaQuotes compliance. 
            All systems run 100% pure native MQL code with zero DLL dependencies.
          </p>

          {/* SEARCH & FILTERS CONTROLS */}
          <div
            className="glass-card"
            style={{
              maxWidth: "850px",
              margin: "40px auto 0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* SEARCH INPUT */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem" }}>
                🔍
              </span>
              <input
                type="text"
                className="form-input"
                placeholder="Search by EA name, strategy (Ichimoku, Grid, Alligator), or symbol (Gold, US30, EURUSD)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: "46px" }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* FILTER PILLS ROW */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              {/* Category pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                    style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                  >
                    {cat === "all" ? "🌐 All Types" : cat}
                  </button>
                ))}
              </div>

              {/* Platform pills */}
              <div style={{ display: "flex", gap: "6px" }}>
                {["all", "mt5", "mt4"].map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    className={`platform-pill ${selectedPlatform === plat ? "active" : ""}`}
                    onClick={() => setSelectedPlatform(plat)}
                    style={{ fontSize: "0.76rem", padding: "5px 12px" }}
                  >
                    {plat === "all" ? "All Platforms" : plat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PRODUCTS GRID SECTION */}
      <main className="container" style={{ paddingBottom: "80px" }}>
        {loading ? (
          <div className="feed-loading" style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="loading-dots"><span></span><span></span><span></span></div>
            <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>Connecting to Supabase product catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="feed-empty" style={{ textAlign: "center", padding: "80px 0" }}>
            <span style={{ fontSize: "3rem" }}>🔍</span>
            <h3 style={{ marginTop: "16px" }}>No matching systems found</h3>
            <p style={{ color: "var(--text-muted)" }}>Try clearing your search query or switching categories.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "16px" }}
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedPlatform("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="partner-broker-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "28px" }}>
            {filteredProducts.map((p, idx) => (
              <div
                key={p.slug || idx}
                className="mql-product-card visible"
                style={{
                  borderColor: p.color ? `${p.color}35` : "var(--border-glass)",
                  background: "linear-gradient(180deg, rgba(17, 24, 39, 0.94) 0%, rgba(10, 14, 26, 0.98) 100%)",
                }}
              >
                <div className="partner-broker-content">
                  {/* CARD TOP BAR */}
                  <div className="partner-broker-top-bar" style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "1.75rem" }}>{p.icon}</span>
                      <div>
                        <h3 className="partner-broker-title" style={{ fontSize: "1.3rem", margin: 0 }}>{p.name}</h3>
                        <span style={{ fontSize: "0.78rem", color: p.color || "#60a5fa", fontWeight: 600 }}>{p.version}</span>
                      </div>
                    </div>
                    {p.badge && (
                      <span
                        className="partner-broker-badge"
                        style={{
                          background: `${p.color || '#3b82f6'}18`,
                          color: p.color || '#60a5fa',
                          border: `1px solid ${p.color || '#3b82f6'}40`,
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="partner-broker-headline" style={{ color: "var(--text-main)", fontSize: "1rem", marginBottom: "8px" }}>
                    {p.tagline}
                  </h4>
                  <p className="partner-broker-desc" style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "var(--text-muted)" }}>
                    {p.description}
                  </p>

                  {/* PLATFORMS & TARGET ASSETS */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "14px 0 10px 0" }}>
                    {Array.isArray(p.platforms) && p.platforms.map((plat) => (
                      <span
                        key={plat}
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(59, 130, 246, 0.15)",
                          color: "#60a5fa",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          border: "1px solid rgba(59, 130, 246, 0.3)",
                        }}
                      >
                        ⚡ {plat}
                      </span>
                    ))}
                    {p.target_assets && (
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "rgba(245, 158, 11, 0.12)",
                          color: "#f59e0b",
                          fontSize: "0.74rem",
                          fontWeight: 500,
                          border: "1px solid rgba(245, 158, 11, 0.3)",
                        }}
                      >
                        🎯 {p.target_assets}
                      </span>
                    )}
                  </div>

                  {/* FEATURE BULLETS */}
                  {Array.isArray(p.features) && p.features.length > 0 && (
                    <div className="partner-broker-tags" style={{ marginTop: "10px" }}>
                      {p.features.map((feat, fIdx) => (
                        <span key={fIdx} className="partner-broker-tag" style={{ fontSize: "0.78rem" }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* PRICE / ACCESS BAR */}
                  <div className="partner-broker-meta-bar" style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <span>{p.is_mql5 ? "PRICE:" : "ACCESS:"} <strong className="partner-broker-code-highlight" style={{ color: "#10b981", fontSize: "0.92rem" }}>{p.price}</strong></span>
                    {p.is_mql5 ? (
                      <span style={{ color: "#38bdf8", fontSize: "0.8rem" }}>🛒 MQL5 Market</span>
                    ) : (
                      <span style={{ color: "#10b981", fontSize: "0.8rem" }}>🤝 Partner Whitelist</span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "18px" }}>
                  {p.market_url ? (
                    <a
                      href={p.market_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-broker-cta-button"
                      style={{
                        background: p.color ? `linear-gradient(135deg, ${p.color}, #1e3a8a)` : "linear-gradient(135deg, #00f0ff, #0070f3)",
                        color: "#ffffff",
                      }}
                    >
                      <span>🛒 Buy / Rent on MQL5 Market</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <Link
                      href="/#authorization"
                      className="partner-broker-cta-button"
                      style={{
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "#ffffff",
                      }}
                    >
                      <span>⚡ Free via Partner Broker</span>
                      <span>➜</span>
                    </Link>
                  )}

                  <div style={{ display: "flex", gap: "8px" }}>
                    {p.has_page ? (
                      <Link
                        href={`/${p.slug}`}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, textAlign: "center", fontSize: "0.82rem", padding: "8px 12px" }}
                      >
                        📖 Strategy Specs
                      </Link>
                    ) : (
                      <a
                        href={p.market_url || "https://www.mql5.com/en/users/syarief.azman/seller"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, textAlign: "center", fontSize: "0.82rem", padding: "8px 12px" }}
                      >
                        🛡️ Verified MQL5 Listing
                      </a>
                    )}
                    {p.download_url && (
                      <a
                        href={p.download_url}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, textAlign: "center", fontSize: "0.82rem", padding: "8px 12px" }}
                      >
                        📥 Free Trial
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VERIFIED MQL5 SELLER BANNER */}
        <div
          className="glass-card visible"
          style={{
            marginTop: "60px",
            padding: "32px",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(0, 240, 255, 0.08) 100%)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "var(--radius)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#ffffff" }}>Official MetaQuotes Certified MQL5 Seller</h3>
            </div>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-muted)", maxWidth: "650px", lineHeight: "1.5" }}>
              All algorithmic systems created by <strong>Syarief Azman</strong> adhere to strict MetaQuotes automated quality checks,
              featuring native MetaTrader terminal licensing, zero DLLs, and 100% tick-by-tick Strategy Tester compatibility.
            </p>
          </div>

          <a
            href="https://www.mql5.com/en/users/syarief.azman/seller"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: "14px 28px", fontSize: "0.95rem" }}
          >
            <span>Visit Official MQL5 Seller Profile</span>
            <span>➜</span>
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">👑 EA Budak Ubat</div>
              <p className="footer-desc">
                Quantitative trading algorithms and automated Expert Advisors for MetaTrader 4 &amp; 5.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Products</h4>
              <ul className="footer-links">
                <li><Link href="/products">All MQL5 Products</Link></li>
                <li><Link href="/ea-budak-ubat">EA Budak Ubat (v1.67)</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
                <li><Link href="/bracketblitz">BracketBlitz EA</Link></li>
                <li><Link href="/mathedge-pro">MathEdge Pro</Link></li>
                <li><Link href="/encik-moku">Encik Moku</Link></li>
                <li><Link href="/aligator-gozaimasu">Aligator Gozaimasu</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><Link href="/guide">User Guide</Link></li>
                <li><Link href="/learn">Knowledge Codex</Link></li>
                <li><Link href="/changelog">Changelog</Link></li>
                <li><a href="https://www.mql5.com/en/channels/eabudakubat" target="_blank" rel="noopener noreferrer">MQL5 Signal Channel</a></li>
                <li><a href="https://www.mql5.com/en/users/syarief.azman/seller" target="_blank" rel="noopener noreferrer">MQL5 Seller Profile</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Community</h4>
              <ul className="footer-links">
                <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Telegram Channel</a></li>
                <li><a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">Telegram PM (@SyariefAzman)</a></li>
                <li><Link href="/#authorization">Whitelist Verification</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 EA Budak Ubat. All rights reserved.</span>
            <span style={{ color: "var(--text-muted)" }}>Official Domain: https://eabudakubat.com</span>
          </div>
        </div>
      </footer>
    </>
  );
}

