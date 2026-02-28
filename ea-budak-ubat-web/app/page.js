"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
];

export default function Home() {
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
          <a href="#" className="nav-brand">Syarief Azman</a>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><a href="#products" onClick={() => setMobileNavOpen(false)}>Products</a></li>
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
            <span className="gradient-text">Trading Tools</span>
            <br />
            <span style={{ fontSize: "0.5em", fontWeight: 400, color: "var(--text-secondary)" }}>by Syarief Azman</span>
          </h1>
          <p className="hero-subtitle">
            Professional-grade Expert Advisors and AI-powered trading systems for MetaTrader.
            Built for performance, rigorously tested, and continuously improved.
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
                Hi, I am <strong>Syarief Azman</strong> — a Malaysian developer and forex trader building automated trading tools.
                My Expert Advisors are designed with real-world trading experience, focusing on reliability, safety mechanisms,
                and transparent open-source code.
              </p>
              <p>
                Whether you prefer systematic grid trading with <strong>EA Budak Ubat</strong> or AI-powered signal analysis
                with <strong>GoldMind AI</strong>, each tool is built to give you an edge while respecting risk management principles.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">2</span>
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
              { icon: "🐙", title: "GitHub", desc: "@syarief02", url: "https://github.com/syarief02" },
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">Syarief Azman</h3>
              <p className="footer-desc">
                Professional trading tools and Expert Advisors for MetaTrader platforms. Built with passion and real-world trading experience.
              </p>
              <div className="social-links">
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                <a href="https://wa.me/60194961568" className="social-link" target="_blank" title="WhatsApp">📱</a>
                <a href="https://github.com/syarief02" className="social-link" target="_blank" title="GitHub">🐙</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4>Products</h4>
              <ul className="footer-links">
                <li><Link href="/ea-budak-ubat">EA Budak Ubat</Link></li>
                <li><Link href="/goldmind-ai">GoldMind AI</Link></li>
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
            <p>© {new Date().getFullYear()} Syarief Azman. All rights reserved.</p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Automated trading systems can result in significant losses. Past performance is not indicative of future results. Always test on a demo account first. Not available in restricted jurisdictions.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
