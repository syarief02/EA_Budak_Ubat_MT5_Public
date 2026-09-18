"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MQLProductsShowcase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Extract unique categories for filter tabs
  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="mql-products" className="mql-showcase-section" style={{ padding: "90px 0", position: "relative" }}>
      <div className="jp-kanji-watermark" aria-hidden="true">製品一覧</div>
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-header animate-in">
          <span className="label" style={{ color: "#00f0ff", borderColor: "rgba(0, 240, 255, 0.3)" }}>
            ⚡ OFFICIAL MQL5 MARKET ECOSYSTEM // 公式MQL5製品群
          </span>
          <h2>Automated Trading Portfolio &amp; MQL5 Systems</h2>
          <p>
            Explore our complete suite of quantitative Expert Advisors, volatility scalpers, and trend algorithms. 
            All systems feature pure native MQL code with zero DLL dependencies and instant MetaQuotes Market activation.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="mql-filter-tabs animate-in" style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{ textTransform: "capitalize", fontSize: "0.85rem", padding: "8px 16px" }}
            >
              {cat === "all" ? "🌐 All Products" : cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="feed-loading" style={{ textAlign: "center", padding: "60px 0" }}>
            <div className="loading-dots"><span></span><span></span><span></span></div>
            <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>Synchronizing MQL5 products catalog...</p>
          </div>
        ) : (
          <div className="partner-broker-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            {filteredProducts.map((p, idx) => (
              <div
                key={p.slug || idx}
                className="partner-broker-card animate-in"
                style={{
                  animationDelay: `${idx * 0.08}s`,
                  borderColor: p.color ? `${p.color}35` : "var(--border-glass)",
                  background: "linear-gradient(180deg, rgba(17, 24, 39, 0.92) 0%, rgba(10, 14, 26, 0.96) 100%)",
                }}
              >
                <div className="partner-broker-content">
                  {/* TOP BAR */}
                  <div className="partner-broker-top-bar" style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "1.6rem" }}>{p.icon}</span>
                      <div>
                        <h3 className="partner-broker-title" style={{ fontSize: "1.25rem", margin: 0 }}>{p.name}</h3>
                        <span style={{ fontSize: "0.75rem", color: p.color || "#60a5fa", fontWeight: 600 }}>{p.version}</span>
                      </div>
                    </div>
                    {p.badge && (
                      <span
                        className="partner-broker-badge"
                        style={{
                          background: `${p.color || '#3b82f6'}18`,
                          color: p.color || '#60a5fa',
                          border: `1px solid ${p.color || '#3b82f6'}40`,
                          fontSize: "0.72rem",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* TAGLINE & DESCRIPTION */}
                  <h4 className="partner-broker-headline" style={{ color: "var(--text-main)", fontSize: "0.98rem", marginBottom: "8px" }}>
                    {p.tagline}
                  </h4>
                  <p className="partner-broker-desc" style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "var(--text-muted)" }}>
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
                          fontSize: "0.72rem",
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
                          fontSize: "0.72rem",
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
                    <div className="partner-broker-tags" style={{ marginTop: "8px" }}>
                      {p.features.map((feat, fIdx) => (
                        <span key={fIdx} className="partner-broker-tag" style={{ fontSize: "0.76rem" }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* PRICING & REVIEWS */}
                  <div className="partner-broker-meta-bar" style={{ marginTop: "18px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <span>PRICE: <strong className="partner-broker-code-highlight" style={{ color: "#10b981" }}>{p.price}</strong></span>
                    {p.reviews_count > 0 ? (
                      <span style={{ color: "#f59e0b", fontSize: "0.78rem" }}>
                        ⭐ {Number(p.rating).toFixed(1)} ({p.reviews_count} reviews)
                      </span>
                    ) : (
                      <span style={{ color: "#60a5fa", fontSize: "0.78rem" }}>✓ MetaQuotes Verified</span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
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
                    <span>🛒 Buy on MQL5 Market</span>
                    <span>↗</span>
                  </a>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/${p.slug}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.8rem", padding: "8px 12px" }}
                    >
                      📖 Strategy Specs
                    </Link>
                    {p.download_url && (
                      <a
                        href={p.download_url}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, textAlign: "center", fontSize: "0.8rem", padding: "8px 12px" }}
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

        {/* MQL5 SELLER BANNER CALLOUT */}
        <div
          className="mql5-seller-card glass-card animate-in"
          style={{
            marginTop: "50px",
            padding: "28px",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(0, 240, 255, 0.08) 100%)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "var(--radius)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "1.3rem" }}>🛡️</span>
              <h4 style={{ margin: 0, fontSize: "1.15rem", color: "#ffffff" }}>Official MetaQuotes Certified MQL5 Seller</h4>
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: "600px" }}>
              All algorithms published by <strong>Syarief Azman</strong> are verified by MetaQuotes automated code checks,
              with tick-by-tick Strategy Tester compliance and native terminal licensing.
            </p>
          </div>

          <a
            href="https://www.mql5.com/en/users/syarief.azman/seller"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: "12px 24px", fontSize: "0.92rem" }}
          >
            <span>Browse Full Seller Profile on MQL5.com</span>
            <span>➜</span>
          </a>
        </div>
      </div>
    </section>
  );
}
