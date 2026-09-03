"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { checkAccount, EA_DATABASE, BROKERS } from "@/lib/authorizedAccounts";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";

export default function AccountChecker({
  initialEa = "all",
  title = "Authorized Account Verification",
  subtitle = "Check your MetaTrader account status across all Expert Advisors or filter by specific EA.",
  showAllOption = true,
  compact = false,
}) {
  const [selectedEa, setSelectedEa] = useState(initialEa);
  const [accountNumber, setAccountNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [copiedBrokerId, setCopiedBrokerId] = useState(null);

  const results = useMemo(() => {
    if (!hasSearched || !accountNumber.trim()) return [];
    return checkAccount(accountNumber, selectedEa);
  }, [hasSearched, accountNumber, selectedEa]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const clean = accountNumber.trim();
    if (!clean) {
      setSearchError("Please enter a valid MetaTrader account number (digits only).");
      setHasSearched(false);
      return;
    }
    if (!/^\d+$/.test(clean)) {
      setSearchError("Account number must contain digits only.");
      setHasSearched(false);
      return;
    }
    setSearchError("");
    setHasSearched(true);
  };

  const handleQuickExample = (num) => {
    setAccountNumber(String(num));
    setSearchError("");
    setHasSearched(true);
  };

  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedBrokerId(id);
    setTimeout(() => setCopiedBrokerId(null), 2500);
  };

  const summary = useMemo(() => {
    if (!results.length) return null;
    const authorizedCount = results.filter((r) => r.status === "authorized").length;
    const trialCount = results.filter((r) => r.status === "trial").length;
    const openSourceCount = results.filter((r) => r.status === "open_source").length;
    return { authorizedCount, trialCount, openSourceCount, total: results.length };
  }, [results]);

  return (
    <div className="account-checker-card glass-card animate-in">
      <div className="checker-header">
        <div className="checker-badge">
          <span className="checker-badge-icon">🔐</span>
          Multi-EA Authorization Portal
        </div>
        <h3 className="checker-title">{title}</h3>
        {subtitle && <p className="checker-subtitle">{subtitle}</p>}
      </div>

      {/* EA SELECTOR TABS */}
      <div className="checker-ea-selector">
        <label className="selector-label">Select EA / Strategy:</label>
        <div className="ea-tab-group">
          {showAllOption && (
            <button
              type="button"
              className={`ea-tab ${selectedEa === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedEa("all");
                if (hasSearched) setHasSearched(true);
              }}
            >
              <span className="ea-tab-icon">🌐</span>
              <span className="ea-tab-name">All EAs (Global)</span>
            </button>
          )}
          {EA_DATABASE.map((ea) => (
            <button
              key={ea.slug}
              type="button"
              className={`ea-tab ${selectedEa === ea.slug ? "active" : ""}`}
              onClick={() => {
                setSelectedEa(ea.slug);
                if (hasSearched) setHasSearched(true);
              }}
            >
              <span className="ea-tab-icon">{ea.icon}</span>
              <span className="ea-tab-name">{ea.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} className="checker-form">
        <div className="checker-input-group">
          <div className="checker-input-wrapper">
            <span className="input-prefix-icon">🔢</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="checker-input"
              placeholder="e.g. 391619624 or your MetaTrader account number..."
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value.replace(/\D/g, ""));
                setSearchError("");
              }}
            />
            {accountNumber && (
              <button
                type="button"
                className="input-clear-btn"
                onClick={() => {
                  setAccountNumber("");
                  setHasSearched(false);
                }}
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary checker-submit-btn" style={{ animation: "none" }}>
            🔍 Check Status
          </button>
        </div>

        {searchError && (
          <div className="checker-alert checker-alert-error">
            ⚠️ {searchError}
          </div>
        )}

        {/* QUICK EXAMPLES */}
        <div className="quick-examples">
          <span className="examples-label">Try example:</span>
          <button
            type="button"
            className="example-pill"
            onClick={() => handleQuickExample("391619624")}
          >
            391619624 (Authorized)
          </button>
          <button
            type="button"
            className="example-pill"
            onClick={() => handleQuickExample("51379350")}
          >
            51379350 (Whitelisted)
          </button>
          <button
            type="button"
            className="example-pill"
            onClick={() => handleQuickExample("987654321")}
          >
            987654321 (Trial)
          </button>
        </div>
      </form>

      {/* DEMO NOTICE */}
      <div className="demo-notice-box">
        <span className="demo-notice-icon">🧪</span>
        <div>
          <strong>Demo Accounts:</strong> All EAs automatically detect and authorize MetaTrader Demo accounts with <strong>zero restrictions</strong>. No whitelist registration needed for demo testing!
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {hasSearched && results.length > 0 && (
        <div className="checker-results-wrapper">
          {summary && selectedEa === "all" && (
            <div className="results-summary-banner">
              <div className="summary-account">
                Results for Account: <strong>{accountNumber}</strong>
              </div>
              <div className="summary-stats">
                {summary.authorizedCount > 0 && (
                  <span className="summary-stat-pill authorized">
                    ✅ {summary.authorizedCount} Authorized (Permanent)
                  </span>
                )}
                {summary.trialCount > 0 && (
                  <span className="summary-stat-pill trial">
                    ⏳ {summary.trialCount} Trial Mode (Active)
                  </span>
                )}
                {summary.openSourceCount > 0 && (
                  <span className="summary-stat-pill open-source">
                    🆓 {summary.openSourceCount} Open Access
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="checker-results-grid">
            {results.map((res) => (
              <div key={res.slug} className={`result-item-card ${res.badgeClass}`}>
                <div className="result-card-header">
                  <div className="result-ea-info">
                    <span className="result-ea-icon">{res.icon}</span>
                    <div>
                      <div className="result-ea-name-row">
                        <h4 className="result-ea-name">{res.name}</h4>
                        <span className="result-ea-version">{res.version}</span>
                      </div>
                      <p className="result-ea-tagline">{res.tagline}</p>
                    </div>
                  </div>

                  <div className="result-status-badge-container">
                    <span className={`result-status-badge ${res.badgeClass}`}>
                      {res.status === "authorized" && "✅ Permanent License"}
                      {res.status === "trial" && "⏳ Trial Active"}
                      {res.status === "open_source" && "🆓 Open Source"}
                    </span>
                  </div>
                </div>

                <div className="result-card-body">
                  <div className="result-meta-row">
                    <span className="result-meta-label">Platforms:</span>
                    <span className="result-meta-value">
                      {res.platforms.map((p) => (
                        <span key={p} className="platform-tag">{p}</span>
                      ))}
                    </span>
                  </div>
                  <div className="result-meta-row">
                    <span className="result-meta-label">License Expiry:</span>
                    <span className="result-meta-value highlight-expiry">
                      {res.expiryDate}
                    </span>
                  </div>
                  <p className="result-message">{res.message}</p>
                </div>

                <div className="result-card-footer">
                  <Link href={`/${res.slug}`} className="result-link">
                    View EA Details →
                  </Link>
                  {res.status === "trial" && (
                    <a
                      href="#partner-brokers"
                      className="btn-get-authorized"
                    >
                      🔓 Get Permanent Authorization
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOW TO GET AUTHORIZED & PARTNER BROKERS */}
      <div className="how-to-authorize-section" id="partner-brokers">
        <div className="authorize-header">
          <h4>🌟 How to Get Permanent Authorization (No Expiry)</h4>
          <p>
            Follow these 3 easy steps to authorize any live MetaTrader account number permanently:
          </p>
        </div>

        <div className="steps-flow-grid">
          <div className="step-box">
            <span className="step-number">1</span>
            <h5>Register via Partner Link</h5>
            <p>Choose a broker below that you have not registered before with maximum leverage.</p>
          </div>
          <div className="step-box">
            <span className="step-number">2</span>
            <h5>Deposit $100 USD</h5>
            <p>Any account type is accepted (Cent recommended for accounts under $1,000 USD).</p>
          </div>
          <div className="step-box">
            <span className="step-number">3</span>
            <h5>Send Account Number</h5>
            <p>
              PM your account number to{" "}
              <a
                href="https://t.me/SyariefAzman"
                target="_blank"
                rel="noopener noreferrer"
                className="tg-link-highlight"
              >
                @SyariefAzman on Telegram
              </a>{" "}
              for instant whitelist update.
            </p>
          </div>
        </div>

        <div className="brokers-container">
          {/* ROTATING SPONSOR PROMO BANNER */}
          <RotatingAdBanner variant="card" />

          <h5 className="brokers-title">Partner Broker Registration Links</h5>
          <div className="broker-interactive-grid">
            {BROKERS.map((b, i) => (
              <div key={i} className="broker-card-interactive">
                <div className="broker-card-top">
                  <div className="broker-title-group">
                    <span className="broker-badge-icon">🏛️</span>
                    <strong className="broker-name">{b.name}</strong>
                  </div>
                  <a
                    href={b.url}
                    className="btn-broker-register"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register ↗
                  </a>
                </div>

                <div className="broker-code-box">
                  <div className="broker-code-label">
                    <span>Partner ID:</span>
                    <strong className="broker-code-val">{b.id}</strong>
                  </div>
                  <button
                    type="button"
                    className="btn-copy-code"
                    onClick={() => handleCopyId(b.id)}
                    title="Copy Partner ID"
                  >
                    {copiedBrokerId === b.id ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>

                <div className="broker-card-bottom">
                  <span className="broker-support">✉️ {b.support}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-callout">
          <span>💬 Already registered under our link?</span>
          <a
            href="https://t.me/SyariefAzman"
            className="btn btn-secondary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ animation: "none" }}
          >
            💬 Contact @SyariefAzman on Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
