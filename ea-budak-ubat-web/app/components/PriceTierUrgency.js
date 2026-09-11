"use client";

import { useState } from "react";
import { playTactileClick } from "@/lib/audioSynthesizer";

export default function PriceTierUrgency({
  currentPrice = 40,
  nextPrice = 50,
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
            Tier 1 · Launch Promotion
          </span>
          <span className="tier-countdown-badge">
            🔥 Only {remainingInTier} {remainingInTier === 1 ? "Spot" : "Spots"} Left
          </span>
        </div>

        <div className="price-display-row">
          <div className="current-price-box">
            <span className="price-currency">$</span>
            <span className="price-number">{currentPrice}</span>
            <span className="price-period">USD</span>
          </div>

          <div className="next-price-box">
            <span className="next-price-label">Next Tier Price:</span>
            <span className="next-price-value">${nextPrice} USD</span>
            <span className="price-hike-tag">+${nextPrice - currentPrice} Increase</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="tier-progress-section">
        <div className="progress-labels">
          <span className="progress-status-text">
            <strong>{soldInTier}/{tierLimit}</strong> Copies Claimed in Tier 1
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
          ⚡ <em>Algorithmic Schedule:</em> Price automatically steps up by <strong>+$10 USD</strong> every 10 verified purchases. Lock in your lifetime license at the lowest launch entry price.
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
            <small>Instant Activation · Native MetaQuotes DRM</small>
          </span>
          <span className="btn-arrow">→</span>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className="btn btn-secondary btn-sm copy-link-btn"
          title="Copy official MQL5 Market Link"
        >
          {copied ? "✓ Copied Link" : "🔗 Share Link"}
        </button>
      </div>

      {/* Trust Badges Bar */}
      <div className="tier-features-grid">
        <div className="tier-feature-item">
          <span className="feature-icon">🛡️</span>
          <span>10 Terminal Activations</span>
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
          <span>Cloud Terminal Sync</span>
        </div>
      </div>
    </div>
  );
}
