"use client";

import { useState, useMemo } from "react";
import { BROKERS } from "@/lib/authorizedAccounts";

export default function GridCalculator() {
  const [balanceUSD, setBalanceUSD] = useState(100);
  const [accountType, setAccountType] = useState("cent"); // "cent" or "standard"
  const [leverage, setLeverage] = useState(1000);
  const [symbol, setSymbol] = useState("EURUSD");
  const [baseLot, setBaseLot] = useState(0.01);
  const [multiplier, setMultiplier] = useState(1.3);
  const [minDistance, setMinDistance] = useState(4);
  const [distanceIncrement, setDistanceIncrement] = useState(2);
  const [maxLayers, setMaxLayers] = useState(8);

  // Effective balance in account currency
  const effectiveBalance = useMemo(() => {
    return accountType === "cent" ? balanceUSD * 100 : balanceUSD;
  }, [balanceUSD, accountType]);

  const currencyUnit = accountType === "cent" ? "USC (¢)" : "USD ($)";

  // Standard Pip Value & Price per symbol
  const symbolConfig = useMemo(() => {
    if (symbol === "XAUUSD") {
      return {
        name: "Gold (XAUUSD)",
        price: 3500.0,
        contractSize: 100, // 100 oz per standard lot
        pipValuePerLot: 10.0, // $10 per 1.0 pip (0.10 move)
        pipUnit: "pips ($0.10)",
      };
    }
    return {
      name: "EURUSD",
      price: 1.085,
      contractSize: 100000,
      pipValuePerLot: 10.0, // $10 per standard pip
      pipUnit: "pips",
    };
  }, [symbol]);

  // Compute Grid Matrix layer by layer
  const gridRows = useMemo(() => {
    const rows = [];
    let cumLots = 0;
    let cumDistance = 0;
    let cumDrawdown = 0;

    for (let i = 1; i <= maxLayers; i++) {
      let lot;
      if (i === 1) {
        lot = Number(baseLot);
      } else {
        lot = Math.round(rows[i - 2].lot * multiplier * 100) / 100;
      }
      cumLots = Math.round((cumLots + lot) * 100) / 100;

      // Distance step
      let stepDistance = 0;
      if (i > 1) {
        stepDistance = minDistance + (i - 2) * distanceIncrement;
        cumDistance += stepDistance;
      }

      // Drawdown calculation: all previous orders are in floating loss by their distance to current price
      let floatingLoss = 0;
      for (let j = 0; j < rows.length; j++) {
        const pipsAgainst = cumDistance - rows[j].cumDist;
        const loss = pipsAgainst * rows[j].lot * symbolConfig.pipValuePerLot;
        floatingLoss += loss;
      }
      cumDrawdown = Math.round(floatingLoss * 100) / 100;

      // Margin required (Standard or Cent)
      // Margin = (Lots * ContractSize * Price) / Leverage
      const notional = lot * symbolConfig.contractSize * symbolConfig.price;
      const layerMargin = notional / leverage;
      const totalMargin = (cumLots * symbolConfig.contractSize * symbolConfig.price) / leverage;

      // Drawdown % of effective balance
      const ddPercent = effectiveBalance > 0 ? ((cumDrawdown / effectiveBalance) * 100) : 0;
      const marginLevel = totalMargin > 0 ? (((effectiveBalance - cumDrawdown) / totalMargin) * 100) : 9999;

      rows.push({
        layer: i,
        lot,
        cumLots,
        stepDist: stepDistance,
        cumDist: cumDistance,
        drawdown: cumDrawdown,
        ddPercent: Math.min(ddPercent, 999),
        totalMargin: Math.round(totalMargin * 10) / 10,
        marginLevel: Math.round(marginLevel),
      });
    }

    return rows;
  }, [baseLot, multiplier, minDistance, distanceIncrement, maxLayers, symbolConfig, leverage, effectiveBalance]);

  // Max drawdown at final layer
  const finalLayer = gridRows[gridRows.length - 1] || {};
  const isSafe = finalLayer.ddPercent < 35;
  const isWarning = finalLayer.ddPercent >= 35 && finalLayer.ddPercent < 70;
  const isDanger = finalLayer.ddPercent >= 70;

  // Best Broker recommendation based on inputs
  const recommendedBroker = useMemo(() => {
    if (symbol === "XAUUSD") {
      return (
        BROKERS.find((b) => b.name === "Tickmill") ||
        BROKERS.find((b) => b.name === "XM") ||
        BROKERS[0]
      );
    }
    if (accountType === "cent" || balanceUSD < 500) {
      return (
        BROKERS.find((b) => b.name === "FBS") ||
        BROKERS.find((b) => b.name === "Headway") ||
        BROKERS[0]
      );
    }
    return BROKERS.find((b) => b.name === "CXM Direct") || BROKERS[0];
  }, [symbol, accountType, balanceUSD]);

  return (
    <div className="grid-calc-card glass-card animate-in" id="risk-calculator">
      <div className="calc-header">
        <div className="checker-badge">
          <span className="checker-badge-icon">🧮</span>
          Interactive Risk Engine
        </div>
        <h3 className="checker-title">EA Budak Ubat Grid & Margin Calculator</h3>
        <p className="checker-subtitle">
          Simulate position layering, floating drawdown, and margin requirements up to 10 grid levels before deploying live.
        </p>
      </div>

      {/* INPUT CONTROLS GRID */}
      <div className="calc-inputs-grid">
        {/* Balance USD */}
        <div className="calc-input-item">
          <label className="calc-label">Deposit Capital (USD)</label>
          <div className="calc-input-box">
            <span className="calc-prefix">$</span>
            <input
              type="number"
              min="10"
              max="100000"
              step="10"
              value={balanceUSD}
              onChange={(e) => setBalanceUSD(Math.max(10, Number(e.target.value) || 0))}
              className="calc-input"
            />
          </div>
          <span className="calc-hint">
            {accountType === "cent"
              ? `= ${(balanceUSD * 100).toLocaleString()} Cent USC`
              : "Standard USD"}
          </span>
        </div>

        {/* Account Type */}
        <div className="calc-input-item">
          <label className="calc-label">Account Mode</label>
          <div className="calc-toggle-group">
            <button
              type="button"
              className={`calc-toggle-btn ${accountType === "cent" ? "active" : ""}`}
              onClick={() => setAccountType("cent")}
            >
              🪙 Cent (USC) <span className="pill-badge">Safe</span>
            </button>
            <button
              type="button"
              className={`calc-toggle-btn ${accountType === "standard" ? "active" : ""}`}
              onClick={() => setAccountType("standard")}
            >
              💵 Standard (USD)
            </button>
          </div>
          <span className="calc-hint">
            {accountType === "cent"
              ? "1.00 Cent lot = 0.01 Standard lot (100x buffer)"
              : "Recommended for $1,000+ capital"}
          </span>
        </div>

        {/* Symbol */}
        <div className="calc-input-item">
          <label className="calc-label">Trading Asset / Symbol</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="calc-select"
          >
            <option value="EURUSD">EURUSD (Forex Major)</option>
            <option value="XAUUSD">XAUUSD (Gold · High Volatility)</option>
          </select>
          <span className="calc-hint">
            {symbol === "XAUUSD" ? "Requires UseRSIFilter = false in v1.63" : "Optimal for Grid Martingale"}
          </span>
        </div>

        {/* Leverage */}
        <div className="calc-input-item">
          <label className="calc-label">Account Leverage</label>
          <select
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="calc-select"
          >
            <option value="500">1:500 (Standard Broker)</option>
            <option value="1000">1:1000 (Recommended)</option>
            <option value="2000">1:2000 (High Leverage)</option>
            <option value="3000">1:3000 (FBS / Headway Max)</option>
          </select>
          <span className="calc-hint">Higher leverage drastically reduces required margin</span>
        </div>

        {/* Base Lots */}
        <div className="calc-input-item">
          <label className="calc-label">Starting Lot Size</label>
          <div className="calc-input-box">
            <span className="calc-prefix">Lot</span>
            <input
              type="number"
              min="0.01"
              max="10.0"
              step="0.01"
              value={baseLot}
              onChange={(e) => setBaseLot(Math.max(0.01, Number(e.target.value) || 0.01))}
              className="calc-input"
            />
          </div>
          <span className="calc-hint">Default is 0.01</span>
        </div>

        {/* Martingale Multiplier */}
        <div className="calc-input-item">
          <label className="calc-label">Martingale Multiplier</label>
          <div className="calc-input-box">
            <span className="calc-prefix">×</span>
            <input
              type="number"
              min="1.0"
              max="2.0"
              step="0.05"
              value={multiplier}
              onChange={(e) => setMultiplier(Math.max(1.0, Number(e.target.value) || 1.0))}
              className="calc-input"
            />
          </div>
          <span className="calc-hint">Default is 1.3 (1.0 = flat grid)</span>
        </div>

        {/* Min Distance */}
        <div className="calc-input-item">
          <label className="calc-label">Min Distance (Pips)</label>
          <div className="calc-input-box">
            <span className="calc-prefix">Pips</span>
            <input
              type="number"
              min="1"
              max="50"
              step="1"
              value={minDistance}
              onChange={(e) => setMinDistance(Math.max(1, Number(e.target.value) || 1))}
              className="calc-input"
            />
          </div>
          <span className="calc-hint">Base order gap between layer 1 and 2</span>
        </div>

        {/* Distance Increment */}
        <div className="calc-input-item">
          <label className="calc-label">Distance Increment (Pips)</label>
          <div className="calc-input-box">
            <span className="calc-prefix">+</span>
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              value={distanceIncrement}
              onChange={(e) => setDistanceIncrement(Math.max(0, Number(e.target.value) || 0))}
              className="calc-input"
            />
          </div>
          <span className="calc-hint">Widens grid step per layer to counter deep trends</span>
        </div>
      </div>

      {/* RISK SUMMARY OVERVIEW BAR */}
      <div className={`calc-risk-banner ${isSafe ? "safe" : isWarning ? "warning" : "danger"}`}>
        <div className="risk-banner-left">
          <div className="risk-score-badge">
            {isSafe && "🟢 Low Risk · Stable"}
            {isWarning && "🟡 Moderate Risk · Monitor"}
            {isDanger && "🔴 High Risk · Heavy Drawdown"}
          </div>
          <p className="risk-banner-text">
            Simulating <strong>{maxLayers} layers</strong> on <strong>{symbol}</strong> with <strong>{effectiveBalance.toLocaleString()} {currencyUnit}</strong>.
            {isSafe && " Your balance easily cushions this grid ladder with over 65% free equity reserve."}
            {isWarning && " Floating drawdown reaches moderate levels. A Cent account or 1:2000 leverage is strongly advised."}
            {isDanger && " High risk of Stop Out or Margin Call. Reduce starting lot or switch to a Cent account immediately."}
          </p>
        </div>

        <div className="risk-banner-stats">
          <div className="stat-metric">
            <span className="metric-label">Max Drawdown</span>
            <strong className="metric-val">{finalLayer.drawdown?.toLocaleString()} {currencyUnit}</strong>
            <span className="metric-sub">({finalLayer.ddPercent?.toFixed(1)}% of balance)</span>
          </div>
          <div className="stat-metric">
            <span className="metric-label">Cum. Volume</span>
            <strong className="metric-val">{finalLayer.cumLots} Lots</strong>
            <span className="metric-sub">{finalLayer.cumDist} pips range</span>
          </div>
          <div className="stat-metric">
            <span className="metric-label">Margin Required</span>
            <strong className="metric-val">{finalLayer.totalMargin?.toLocaleString()} {currencyUnit}</strong>
            <span className="metric-sub">Leverage 1:{leverage}</span>
          </div>
        </div>
      </div>

      {/* GRID LADDER TABLE */}
      <div className="calc-table-wrapper">
        <div className="calc-table-header-row">
          <h4>📊 Projected 10-Layer Grid Execution Ladder</h4>
          <div className="calc-layers-slider-box">
            <label>Simulation Depth:</label>
            <input
              type="range"
              min="4"
              max="10"
              value={maxLayers}
              onChange={(e) => setMaxLayers(Number(e.target.value))}
              className="calc-range-slider"
            />
            <span className="range-val">{maxLayers} Layers</span>
          </div>
        </div>

        <div className="params-table-wrapper">
          <table className="params-table calc-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Order Lot</th>
                <th>Total Lots</th>
                <th>Order Gap</th>
                <th>Total Pips</th>
                <th>Floating Loss</th>
                <th>Drawdown %</th>
                <th>Total Margin</th>
                <th>Margin Level</th>
              </tr>
            </thead>
            <tbody>
              {gridRows.map((r) => (
                <tr key={r.layer} className={r.ddPercent >= 70 ? "row-danger" : r.ddPercent >= 35 ? "row-warning" : ""}>
                  <td><strong>#{r.layer}</strong></td>
                  <td><code>{r.lot.toFixed(2)}</code></td>
                  <td><code>{r.cumLots.toFixed(2)}</code></td>
                  <td>{r.stepDist > 0 ? `+${r.stepDist} p` : "—"}</td>
                  <td>{r.cumDist} pips</td>
                  <td className="loss-val">-{r.drawdown.toLocaleString()} {currencyUnit}</td>
                  <td>
                    <span className={`dd-pill ${r.ddPercent >= 70 ? "danger" : r.ddPercent >= 35 ? "warning" : "safe"}`}>
                      {r.ddPercent.toFixed(1)}%
                    </span>
                  </td>
                  <td>{r.totalMargin.toLocaleString()} {currencyUnit}</td>
                  <td className="margin-level-val">{r.marginLevel > 0 ? `${r.marginLevel.toLocaleString()}%` : "0%"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TAILORED BROKER CTA MATCH */}
      <div className="calc-broker-recommendation">
        <div className="recommendation-badge">
          <span>🎯</span> Recommended Broker Match for this Setup
        </div>
        <div className="recommendation-content">
          <div className="recommendation-info">
            <h5>{recommendedBroker.name} Broker</h5>
            <p>
              {accountType === "cent"
                ? `Provides true Micro/Cent accounts with 1:${leverage} leverage. Perfect for running EA Budak Ubat with $100 starting deposit.`
                : `Official recommended broker for ${symbol} automated grid trading with tight raw spreads and zero slippage.`}
            </p>
          </div>
          <div className="recommendation-actions">
            <div className="broker-partner-chip">
              Partner ID: <strong>{recommendedBroker.id}</strong>
            </div>
            <a
              href={recommendedBroker.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ animation: "none" }}
            >
              Open Account on {recommendedBroker.name} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

