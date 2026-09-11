"use client";

import { useState } from "react";
import { playTactileClick } from "@/lib/audioSynthesizer";

export default function PriceTierUrgency({
  currentPrice = 149,
  nextPrice = 159,
  soldInTier = 7,
  tierLimit = 10,
  marketUrl = "https://www.mql5.com/en/market/product/195399",
  compact = false,
}) {
  const [copied, setCopied] = useState(false);
  const remainingInTier = Math.max(1, tierLimit - soldInTier);
  const progressPercent = Math.min(100, Math.round((soldInTier / tierLimit) * 100));

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(marketUrl);
    setCopied(true);
    playTactileClick(0.1);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`price-tier-card glass-card ${compact ? "compact" : ""}`}>
      {/* Glow highlight */}
      <div className="price-tier-glow" aria-hidden="true"></div>

      <div className="price-tier-header">
        <div className="tier-badge-row">
          <span className="tier-pill-active">
            <span className="tier-pulse-dot"></span>
            Tier 1 · Official MQL5 Market
          </span>
          <span className="tier-countdown-badge">
            🔥 Only {remainingInTier} {remainingInTier === 1 ? "Spot" : "Spots"} Left at ${currentPrice}
          </span>
        </div>

        <div className="price-display-row">
          <div className="current-price-box">
            <span className="price-currency">$</span>
            <span className="price-number">{currentPrice}</span>
            <span className="price-period">USD / Lifetime</span>
          </div>

          <div className="next-price-box">
            <span className="next-price-label">Next Tier Price:</span>
            <span className="next-price-value">${nextPrice} USD</span>
            <span className="price-hike-tag">+${nextPrice - currentPrice} Increase</span>
          </div>
        </div>
      </div>

      {/* RENTAL & PURCHASE OPTIONS (DIRECT MQL5 TIERS) */}
      <div className="tier-rental-section">
        <div className="rental-section-title">Available License & Rental Options on MQL5 Market:</div>
        <div className="tier-rental-grid">
          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rental-pill"
            onClick={() => playTactileClick(0.08)}
          >
            <span className="rental-duration">1 Month</span>
            <span className="rental-price">$30 <small>USD</small></span>
          </a>

          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rental-pill save"
            onClick={() => playTactileClick(0.08)}
          >
            <span className="rental-badge">Save 44%</span>
            <span className="rental-duration">3 Months</span>
            <span className="rental-price">$50 <small>USD</small></span>
          </a>

          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rental-pill save"
            onClick={() => playTactileClick(0.08)}
          >
            <span className="rental-badge">Save 79%</span>
            <span className="rental-duration">1 Year</span>
            <span className="rental-price">$75 <small>USD</small></span>
          </a>

          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rental-pill lifetime active"
            onClick={() => playTactileClick(0.08)}
          >
            <span className="rental-badge gold">Best Value</span>
            <span className="rental-duration">Lifetime Buy</span>
            <span className="rental-price">${currentPrice} <small>USD</small></span>
          </a>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="tier-progress-section">
        <div className="progress-labels">
          <span className="progress-status-text">
            <strong>{soldInTier}/{tierLimit}</strong> Lifetime Licenses Claimed in Current Tier
          </span>
          <span className="progress-percent-text">{progressPercent}% Filled</span>
        </div>

        <div className="tier-progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div
            className="tier-progress-fill"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="progress-bar-sheen"></span>
          </div>
        </div>

        <p className="tier-disclaimer">
          ⚡ <em>Official Schedule:</em> The lifetime purchase price increases by <strong>+$10 USD</strong> after every 10 purchases. Secure your permanent copy now or start with flexible monthly rental.
        </p>
      </div>

      {/* CTA Actions */}
      <div className="tier-actions-row">
        <a
          href={marketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-mql5-primary"
          onClick={() => playTactileClick(0.12)}
        >
          <span className="btn-icon">🛒</span>
          <span className="btn-text">
            <strong>Buy on MQL5 Market (${currentPrice} USD)</strong>
            <small>Or rent from $30/mo · Free Demo available</small>
          </span>
          <span className="btn-arrow">→</span>
        </a>

        <a
          href={marketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm copy-link-btn"
          onClick={() => playTactileClick(0.08)}
          title="Try Free Demo on MetaTrader 5"
        >
          🧪 Free Demo
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className="btn btn-secondary btn-sm copy-link-btn"
          title="Copy official MQL5 Market Link"
        >
          {copied ? "✓ Copied" : "🔗 Share"}
        </button>
      </div>

      {/* Trust Badges Bar */}
      <div className="tier-features-grid">
        <div className="tier-feature-item">
          <span className="feature-icon">🛡️</span>
          <span><strong>20</strong> Terminal Activations</span>
        </div>
        <div className="tier-feature-item">
          <span className="feature-icon">⚡</span>
          <span>Zero Account Restriction</span>
        </div>
        <div className="tier-feature-item">
          <span className="feature-icon">🔄</span>
          <span>Lifetime Free Updates</span>
        </div>
        <div className="tier-feature-item">
          <span className="feature-icon">☁️</span>
          <span>Instant Cloud MT5 Delivery</span>
        </div>
      </div>
    </div>
  );
}
