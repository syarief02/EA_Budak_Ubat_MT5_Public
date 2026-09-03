"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { getActiveAds, BROKER_ADS } from "@/lib/adsData";

export default function RotatingAdBanner({ variant = "strip" }) {
  const ads = useMemo(() => {
    const active = getActiveAds();
    return active.length > 0 ? active : BROKER_ADS;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState("in");
  const timeoutRef = useRef(null);

  // Randomize starting ad on client mount (avoids SSR hydration mismatch)
  useEffect(() => {
    if (ads.length > 1) {
      const randomIndex = Math.floor(Math.random() * ads.length);
      if (randomIndex !== 0) {
        setCurrentIndex(randomIndex);
      }
    }
  }, [ads.length]);

  // Auto-cycle every 6 seconds
  useEffect(() => {
    if (isPaused || ads.length <= 1) return;

    const interval = setInterval(() => {
      setFadeState("out");
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
        setFadeState("in");
      }, 250);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused, ads.length]);

  const switchAd = (newIndex) => {
    if (newIndex === currentIndex) return;
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeState("in");
    }, 200);
  };

  const nextAd = (e) => {
    if (e) e.preventDefault();
    switchAd((currentIndex + 1) % ads.length);
  };

  const prevAd = (e) => {
    if (e) e.preventDefault();
    switchAd((currentIndex - 1 + ads.length) % ads.length);
  };

  const ad = ads[currentIndex] || ads[0];

  if (variant === "strip") {
    return (
      <div
        className="rotating-banner-strip-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="promo-strip-wrapper">
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer-when-downgrade"
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
                width={160}
                height={52}
                className={`promo-strip-img ad-img-${ad.id}`}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                onError={(e) => {
                  e.currentTarget.src = "/banners/default-banner.svg";
                }}
              />
            </div>

            <span className="promo-strip-text">
              {ad.headline.includes(ad.broker) ? (
                <>
                  {ad.headline.split(ad.broker)[0]}
                  <strong style={{ color: ad.accentColor }}>{ad.broker}</strong>
                  {ad.headline.split(ad.broker).slice(1).join(ad.broker)}
                </>
              ) : (
                <>
                  <strong style={{ color: ad.accentColor }}>{ad.broker}</strong>: {ad.headline}
                </>
              )}
              {" — "}
              <span className="promo-strip-sub">{ad.desc}</span>
            </span>

            <span
              className="promo-strip-btn"
              style={{ background: ad.btnGradient, color: ad.btnColor }}
            >
              {ad.cta}
            </span>
          </a>
        </div>

        {/* CONTROLS & BROKER QUICK SWITCH */}
        <div className="banner-nav-bar">
          <button
            type="button"
            className="banner-nav-arrow"
            onClick={prevAd}
            title="Previous broker promo"
            aria-label="Previous promo"
          >
            ‹
          </button>

          <div className="banner-nav-pills">
            {ads.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`banner-broker-pill ${idx === currentIndex ? "active" : ""}`}
                style={{
                  borderColor: idx === currentIndex ? item.accentColor : "transparent",
                  color: idx === currentIndex ? item.accentColor : "#94a3b8",
                  background: idx === currentIndex ? `${item.accentColor}15` : "rgba(255, 255, 255, 0.03)",
                }}
                onClick={() => switchAd(idx)}
                title={`View ${item.broker} promotion`}
              >
                {item.broker}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="banner-nav-arrow"
            onClick={nextAd}
            title="Next broker promo"
            aria-label="Next promo"
          >
            ›
          </button>
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
          {ad.badge || "🔥 Featured Broker Deal"}
        </span>

        <div className="rotating-card-meta">
          <span className="headway-bonus-subtitle">
            Partner Promo ({currentIndex + 1}/{ads.length})
          </span>
          <div className="card-arrow-controls">
            <button
              type="button"
              className="card-arrow-btn"
              onClick={prevAd}
              title="Previous offer"
              aria-label="Previous offer"
            >
              ‹
            </button>
            <button
              type="button"
              className="card-arrow-btn"
              onClick={nextAd}
              title="Next offer"
              aria-label="Next offer"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer-when-downgrade"
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
            width={160}
            height={52}
            className={`headway-bonus-img ad-img-${ad.id}`}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            onError={(e) => {
              e.currentTarget.src = "/banners/default-banner.svg";
            }}
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

      {/* QUICK BROKER PILLS IN CARD */}
      <div className="card-broker-pills-row">
        {ads.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`card-broker-mini-pill ${idx === currentIndex ? "active" : ""}`}
            style={{
              borderColor: idx === currentIndex ? item.accentColor : "transparent",
              color: idx === currentIndex ? item.accentColor : "#64748b",
              background: idx === currentIndex ? `${item.accentColor}18` : "transparent",
            }}
            onClick={() => switchAd(idx)}
            title={`Switch to ${item.broker}`}
          >
            {item.broker}
          </button>
        ))}
      </div>
    </div>
  );
}
