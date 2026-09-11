"use client";

import { playTactileClick } from "@/lib/audioSynthesizer";

export default function MQL5TrustBadge({
  productUrl = "https://www.mql5.com/en/market/product/195399",
  compact = false,
}) {
  return (
    <div className={`mql5-trust-card glass-card ${compact ? "compact" : ""}`}>
      <div className="mql5-trust-header">
        <div className="mql5-brand-wrapper">
          <div className="mql5-logo-shield">
            <span>MQL5</span>
          </div>
          <div>
            <div className="mql5-badge-title">MetaQuotes Certified Product</div>
            <div className="mql5-stars">
              <span className="star-fill">★★★★★</span>
              <span className="star-rating-text">5.0 Official Rating</span>
            </div>
          </div>
        </div>

        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mql5-verify-link"
          onClick={() => playTactileClick(0.08)}
        >
          <span>Verify on MQL5.com</span>
          <span className="verify-arrow">↗</span>
        </a>
      </div>

      <div className="mql5-cert-points-grid">
        <div className="cert-point">
          <span className="cert-check">✓</span>
          <div>
            <strong>100% Automated Validation Passed</strong>
            <p>Tested in MetaQuotes Strategy Tester against rigorous tick simulations</p>
          </div>
        </div>

        <div className="cert-point">
          <span className="cert-check">✓</span>
          <div>
            <strong>Netting & Hedging Certified</strong>
            <p>Compatible with all MT5 broker margin accounting systems worldwide</p>
          </div>
        </div>

        <div className="cert-point">
          <span className="cert-check">✓</span>
          <div>
            <strong>Zero DLL / Pure Native MQL5</strong>
            <p>Highest security standard — zero external binaries or security risks</p>
          </div>
        </div>

        <div className="cert-point">
          <span className="cert-check">✓</span>
          <div>
            <strong>Instant Hardware-Bound DRM</strong>
            <p>Automatic download and 10 terminal activations right in MetaTrader 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
