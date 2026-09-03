"use client";

import { useState, useEffect, useRef } from "react";

const ADS = [
  {
    id: "headway",
    broker: "Headway",
    badge: "🔥 Free $150 Bonus",
    headline: "Claim $150 No-Deposit Trading Bonus at Headway",
    shortHeadline: "Headway $150 No-Deposit Trading Bonus",
    desc: "Trade 5 markets for 7 days with zero capital risk. Test EA Budak Ubat risk-free and keep your profits!",
    shortDesc: "Get $150 free credit to trade 5 markets for 7 days with zero risk. Whitelist your account & test our EAs!",
    cta: "Claim $150 Bonus ➜",
    url: "https://headway.partners/landings/en/bonus-150/?hwp=516d6b",
    image: "/headway-bonus-150.png",
    imageAlt: "Headway Bonus $150 - 7 Days. 5 Markets. 0 Risk",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.22)",
    bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(17, 24, 39, 0.88) 50%, rgba(217, 119, 6, 0.08) 100%)",
    borderColor: "rgba(245, 158, 11, 0.32)",
    hoverBorder: "rgba(245, 158, 11, 0.65)",
    btnGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    btnColor: "#0a0e1a",
  },
  {
    id: "fbs",
    broker: "FBS",
    badge: "⚡ 0.01s Execution · 1:3000 Leverage",
    headline: "Be Smart. Trade Smart with FBS Broker",
    shortHeadline: "FBS Broker — High-Speed EA Execution",
    desc: "Ultra-fast execution from 0.01s, spreads from 0.7 pips & leverage up to 1:3000. Officially recommended for MT4 & MT5 EAs!",
    shortDesc: "Ultra-fast 0.01s execution, spreads from 0.7 pips & leverage up to 1:3000. Ideal for Grid & Trend EAs!",
    cta: "Trade with FBS ➜",
    url: "https://fbs.partners?ibl=154319&ibp=588292",
    image: "/fbs-banner.jpg",
    imageAlt: "Be Smart. Trade Smart with FBS Broker",
    accentColor: "#00be40",
    glowColor: "rgba(0, 190, 64, 0.22)",
    bgGradient: "linear-gradient(135deg, rgba(0, 190, 64, 0.12) 0%, rgba(17, 24, 39, 0.88) 50%, rgba(5, 150, 105, 0.08) 100%)",
    borderColor: "rgba(0, 190, 64, 0.32)",
    hoverBorder: "rgba(0, 190, 64, 0.65)",
    btnGradient: "linear-gradient(135deg, #00be40, #059669)",
    btnColor: "#ffffff",
  },
];

export default function RotatingAdBanner({ variant = "strip" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState("in");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setFadeState("out");
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ADS.length);
        setFadeState("in");
      }, 250);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused]);

  const switchAd = (idx) => {
    if (idx === currentIndex) return;
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(idx);
      setFadeState("in");
    }, 200);
  };

  const ad = ADS[currentIndex];

  if (variant === "strip") {
    return (
      <div
        className="rotating-banner-strip-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`promo-strip-link ad-fade-${fadeState}`}
          style={{
            background: ad.bgGradient,
            borderColor: ad.borderColor,
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 24px ${ad.glowColor}`,
          }}
          title={ad.headline}
        >
          <span
            className="promo-strip-badge"
            style={{ background: ad.btnGradient, color: ad.btnColor }}
          >
            {ad.badge}
          </span>

          <div className="promo-strip-media-box">
            <img
              src={ad.image}
              alt={ad.imageAlt}
              className={`promo-strip-img ad-img-${ad.id}`}
            />
          </div>

          <span className="promo-strip-text">
            {ad.headline.split(ad.broker)[0]}
            <strong style={{ color: ad.accentColor }}>{ad.broker}</strong>
            {ad.headline.split(ad.broker).slice(1).join(ad.broker)} —{" "}
            <span className="promo-strip-sub">{ad.desc}</span>
          </span>

          <span
            className="promo-strip-btn"
            style={{ background: ad.btnGradient, color: ad.btnColor }}
          >
            {ad.cta}
          </span>
        </a>

        {/* DOT INDICATORS */}
        <div className="banner-nav-dots">
          {ADS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`banner-dot ${idx === currentIndex ? "active" : ""}`}
              style={{
                backgroundColor: idx === currentIndex ? item.accentColor : "rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => switchAd(idx)}
              title={`Switch to ${item.broker} promotion`}
              aria-label={`Switch to ${item.broker}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Variant "card" for AccountChecker
  return (
    <div
      className="headway-bonus-banner-wrap rotating-card-wrap"
      style={{
        background: ad.bgGradient,
        borderColor: ad.borderColor,
        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.35), 0 0 20px ${ad.glowColor}`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="headway-bonus-header">
        <span
          className="headway-bonus-tag"
          style={{
            background: `${ad.accentColor}20`,
            color: ad.accentColor,
            borderColor: `${ad.accentColor}40`,
          }}
        >
          {ad.id === "headway" ? "🎁 Exclusive Bonus Offer" : "⚡ Recommended Partner Broker"}
        </span>
        <div className="rotating-card-meta">
          <span className="headway-bonus-subtitle">Rotating Sponsor Deal</span>
          <div className="card-nav-dots">
            {ADS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`card-dot ${idx === currentIndex ? "active" : ""}`}
                style={{
                  backgroundColor: idx === currentIndex ? item.accentColor : "rgba(255, 255, 255, 0.25)",
                }}
                onClick={() => switchAd(idx)}
                title={`Switch to ${item.broker}`}
                aria-label={`Switch to ${item.broker}`}
              />
            ))}
          </div>
        </div>
      </div>

      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`headway-bonus-banner-link ad-fade-${fadeState}`}
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        title={ad.headline}
      >
        <div className="headway-bonus-image-box">
          <img
            src={ad.image}
            alt={ad.imageAlt}
            className={`headway-bonus-img ad-img-${ad.id}`}
          />
        </div>

        <div className="headway-bonus-details">
          <div className="headway-bonus-text">
            <strong className="headway-bonus-headline" style={{ color: "#f8fafc" }}>
              {ad.shortHeadline}
            </strong>
            <p className="headway-bonus-desc">{ad.shortDesc}</p>
          </div>
          <span
            className="headway-bonus-cta-btn"
            style={{ background: ad.btnGradient, color: ad.btnColor }}
          >
            {ad.cta}
          </span>
        </div>
      </a>
    </div>
  );
}
