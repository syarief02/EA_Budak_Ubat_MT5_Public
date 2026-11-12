"use client";

import { useState, useEffect, useMemo, useReducer } from "react";
import Image from "next/image";
import { getActiveAds, BROKER_ADS } from "@/lib/adsData";

const FALLBACK_BANNER = "/banners/default-banner.svg";
const AUTO_ADVANCE_MS = 6000;
const AUTO_FADE_MS = 250;
const MANUAL_FADE_MS = 200;

// Slide state (docs/state-flows.md, section 5): "shown" or "fading" toward `target`.
// One fade timer at a time; picking another ad mid-fade just replaces the target.
// Pausing (hover) only stops the auto-advance timer, so a fade that started always completes.
function slideReducer(state, action) {
  switch (action.type) {
    case "go":
      if (state.phase === "shown" && action.target === state.index) return state;
      if (state.phase === "fading" && action.target === state.target) return state;
      return { ...state, phase: "fading", target: action.target, fadeMs: action.fadeMs };
    case "commit":
      return { index: state.target, phase: "shown", target: null, fadeMs: 0 };
    case "jump":
      return { index: action.index, phase: "shown", target: null, fadeMs: 0 };
    default:
      return state;
  }
}

// next/image serves a resized WebP/AVIF (CSS caps banners at ~180x54), so full-size broker artwork is fine in /public/banners
function BannerImage({ ad, className }) {
  const [failed, setFailed] = useState(false);
  const src = failed ? FALLBACK_BANNER : ad.image;
  return (
    <Image
      src={src}
      alt={ad.imageAlt}
      width={160}
      height={52}
      className={className}
      loading="eager"
      unoptimized={src.endsWith(".svg")}
      onError={() => setFailed(true)}
    />
  );
}

export default function RotatingAdBanner({ variant = "strip" }) {
  const ads = useMemo(() => {
    const active = getActiveAds();
    return active.length > 0 ? active : BROKER_ADS;
  }, []);

  const [slide, dispatch] = useReducer(slideReducer, { index: 0, phase: "shown", target: null, fadeMs: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex = slide.index;
  const fadeState = slide.phase === "fading" ? "out" : "in";

  // Randomize starting ad on client mount (avoids SSR hydration mismatch)
  useEffect(() => {
    if (ads.length > 1) {
      const randomIndex = Math.floor(Math.random() * ads.length);
      if (randomIndex !== 0) dispatch({ type: "jump", index: randomIndex });
    }
  }, [ads.length]);

  // Finish a fade: runs whenever a fade starts or its target changes, never cancelled by a pause.
  useEffect(() => {
    if (slide.phase !== "fading") return undefined;
    const t = setTimeout(() => dispatch({ type: "commit" }), slide.fadeMs);
    return () => clearTimeout(t);
  }, [slide.phase, slide.target, slide.fadeMs]);

  // Auto-advance 6 s after the current ad settled, unless hovered. A manual switch restarts the count.
  useEffect(() => {
    if (isPaused || ads.length <= 1 || slide.phase !== "shown") return undefined;
    const t = setTimeout(
      () => dispatch({ type: "go", target: (slide.index + 1) % ads.length, fadeMs: AUTO_FADE_MS }),
      AUTO_ADVANCE_MS
    );
    return () => clearTimeout(t);
  }, [isPaused, ads.length, slide.phase, slide.index]);

  // Arrows step from where the banner is heading, so quick double clicks move two ads.
  const base = slide.phase === "fading" ? slide.target : slide.index;
  const switchAd = (newIndex) => dispatch({ type: "go", target: newIndex, fadeMs: MANUAL_FADE_MS });

  const nextAd = (e) => {
    if (e) e.preventDefault();
    switchAd((base + 1) % ads.length);
  };

  const prevAd = (e) => {
    if (e) e.preventDefault();
    switchAd((base - 1 + ads.length) % ads.length);
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
              <BannerImage key={ad.id} ad={ad} className={`promo-strip-img ad-img-${ad.id}`} />
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
          <BannerImage key={ad.id} ad={ad} className={`headway-bonus-img ad-img-${ad.id}`} />
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
