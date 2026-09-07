"use client";

import { useState } from "react";

const PRESETS = [
  {
    id: "conservative",
    name: "Conservative / Low Drawdown",
    icon: "🛡️",
    badge: "Low Risk",
    desc: "Wider grid distance and lower multiplier designed to withstand sustained trends with minimal drawdown.",
    symbol: "EURUSD / EURGBP",
    timeframe: "M15",
    params: {
      Lots: "0.01",
      GridTrading: "1",
      MartingaleMultiplier: "1.25",
      MaxLot: "100.0",
      MaxTrade: "10",
      TakeProfit: "20.0",
      StopLoss: "0.0",
      minDistance: "6.0",
      distanceIncrement: "3.0",
      maxDistance: "120.0",
      UseRSIFilter: "1",
      RSI_TF: "15",
      RSI_Period: "14",
      RSI_BuyCeiling: "68.0",
      RSI_SellFloor: "32.0",
      MaxSpread_Pips: "3.0",
      MaxDrawdownPct: "25.0",
      EnableBreakEven: "1",
      BreakEven_Trigger: "15.0",
      BreakEven_Lock: "2.0",
      StartTime: "00:00",
      StopTime: "23:59",
      AutoConfig: "0",
      MagicNumber: "110111",
    },
  },
  {
    id: "balanced",
    name: "Balanced / Standard Multi-Pair",
    icon: "⚖️",
    badge: "Recommended",
    desc: "Default factory calibrated settings balancing consistent daily profit take and moderate grid recovery.",
    symbol: "EURUSD, GBPUSD, AUDUSD",
    timeframe: "M5",
    params: {
      Lots: "0.01",
      GridTrading: "1",
      MartingaleMultiplier: "1.30",
      MaxLot: "500.0",
      MaxTrade: "20",
      TakeProfit: "25.0",
      StopLoss: "0.0",
      minDistance: "4.0",
      distanceIncrement: "2.0",
      maxDistance: "100.0",
      UseRSIFilter: "1",
      RSI_TF: "15",
      RSI_Period: "14",
      RSI_BuyCeiling: "70.0",
      RSI_SellFloor: "30.0",
      MaxSpread_Pips: "5.0",
      MaxDrawdownPct: "0.0",
      EnableBreakEven: "0",
      BreakEven_Trigger: "15.0",
      BreakEven_Lock: "2.0",
      StartTime: "00:00",
      StopTime: "23:59",
      AutoConfig: "0",
      MagicNumber: "123456",
    },
  },
  {
    id: "gold",
    name: "Gold (XAUUSD) Safe Profile v1.63",
    icon: "🪙",
    badge: "v1.63 Gold Engine",
    desc: "Optimized for Gold volatility: RSI filter disabled so bot does not block buys in macro rallies, with Break-Even profit lock enabled.",
    symbol: "XAUUSD (Gold)",
    timeframe: "M5",
    params: {
      Lots: "0.01",
      GridTrading: "1",
      MartingaleMultiplier: "1.20",
      MaxLot: "50.0",
      MaxTrade: "8",
      TakeProfit: "45.0",
      StopLoss: "0.0",
      minDistance: "15.0",
      distanceIncrement: "5.0",
      maxDistance: "200.0",
      UseRSIFilter: "0", // Disabled as requested for gold macro runs
      RSI_TF: "15",
      RSI_Period: "14",
      RSI_BuyCeiling: "75.0",
      RSI_SellFloor: "25.0",
      MaxSpread_Pips: "25.0",
      MaxDrawdownPct: "30.0",
      EnableBreakEven: "1",
      BreakEven_Trigger: "20.0",
      BreakEven_Lock: "5.0",
      StartTime: "01:00",
      StopTime: "22:00",
      AutoConfig: "0",
      MagicNumber: "888163",
    },
  },
  {
    id: "scalper",
    name: "High-Frequency Cent Scalper",
    icon: "🚀",
    badge: "Aggressive Cent",
    desc: "Tight pip distances with fast take profit cycles. Recommended exclusively on Cent/Micro accounts.",
    symbol: "EURUSD, USDJPY",
    timeframe: "M1 / M5",
    params: {
      Lots: "0.01",
      GridTrading: "1",
      MartingaleMultiplier: "1.35",
      MaxLot: "500.0",
      MaxTrade: "30",
      TakeProfit: "15.0",
      StopLoss: "0.0",
      minDistance: "3.0",
      distanceIncrement: "1.5",
      maxDistance: "80.0",
      UseRSIFilter: "1",
      RSI_TF: "5",
      RSI_Period: "14",
      RSI_BuyCeiling: "72.0",
      RSI_SellFloor: "28.0",
      MaxSpread_Pips: "4.0",
      MaxDrawdownPct: "0.0",
      EnableBreakEven: "0",
      BreakEven_Trigger: "10.0",
      BreakEven_Lock: "2.0",
      StartTime: "00:00",
      StopTime: "23:59",
      AutoConfig: "1",
      MagicNumber: "777333",
    },
  },
];

export default function SetGenerator() {
  const [selectedPresetId, setSelectedPresetId] = useState("balanced");
  const [customParams, setCustomParams] = useState(PRESETS[1].params);
  const [downloaded, setDownloaded] = useState(false);

  const selectedPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[1];

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setCustomParams({ ...preset.params });
    setDownloaded(false);
  };

  const handleParamChange = (key, val) => {
    setCustomParams((prev) => ({ ...prev, [key]: val }));
  };

  const handleDownload = () => {
    const lines = [
      "; ====================================================",
      `; EA Budak Ubat v1.63 Parameter Preset`,
      `; Strategy: ${selectedPreset.name}`,
      `; Recommended Asset: ${selectedPreset.symbol}`,
      `; Generated: ${new Date().toISOString().split("T")[0]}`,
      `; Source: https://ea-budak-ubat-web.vercel.app`,
      "; ====================================================",
      "",
    ];

    Object.entries(customParams).forEach(([k, v]) => {
      lines.push(`${k}=${v}`);
    });

    const content = lines.join("\r\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `EA_Budak_Ubat_${selectedPreset.id}_v1.63.set`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="set-generator-card glass-card animate-in" id="preset-generator">
      <div className="checker-header">
        <div className="checker-badge">
          <span className="checker-badge-icon">⚙️</span>
          One-Click Preset Generator
        </div>
        <h3 className="checker-title">MT4 & MT5 Preset (.set) Download Portal</h3>
        <p className="checker-subtitle">
          Select an optimized risk strategy, inspect or adjust the inputs, and instantly download a ready-to-load <code>.set</code> configuration file for MetaTrader.
        </p>
      </div>

      {/* PRESET SELECTOR CARDS */}
      <div className="preset-cards-grid">
        {PRESETS.map((preset) => (
          <div
            key={preset.id}
            className={`preset-card-item ${selectedPresetId === preset.id ? "active" : ""}`}
            onClick={() => handleSelectPreset(preset)}
          >
            <div className="preset-card-top">
              <span className="preset-card-icon">{preset.icon}</span>
              <span className={`preset-badge ${preset.id}`}>{preset.badge}</span>
            </div>
            <h4 className="preset-name">{preset.name}</h4>
            <p className="preset-desc">{preset.desc}</p>
            <div className="preset-meta-tags">
              <span className="preset-tag">🎯 {preset.symbol}</span>
              <span className="preset-tag">⏱️ {preset.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PRESET PARAMETERS PREVIEW & CUSTOMIZER */}
      <div className="preset-preview-section">
        <div className="preset-preview-header">
          <div>
            <h4>
              Selected: <span className="highlight-text">{selectedPreset.name}</span>
            </h4>
            <span className="preset-symbol-hint">Recommended for {selectedPreset.symbol} on {selectedPreset.timeframe}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-download-set"
            onClick={handleDownload}
            style={{ animation: "none" }}
          >
            {downloaded ? "✓ Downloaded .set File!" : "📥 Download .set File"}
          </button>
        </div>

        <div className="params-quick-grid">
          <div className="param-field">
            <label>Starting Lots</label>
            <input
              type="text"
              value={customParams.Lots}
              onChange={(e) => handleParamChange("Lots", e.target.value)}
              className="param-field-input"
            />
          </div>
          <div className="param-field">
            <label>Martingale Multiplier</label>
            <input
              type="text"
              value={customParams.MartingaleMultiplier}
              onChange={(e) => handleParamChange("MartingaleMultiplier", e.target.value)}
              className="param-field-input"
            />
          </div>
          <div className="param-field">
            <label>Take Profit (Pips)</label>
            <input
              type="text"
              value={customParams.TakeProfit}
              onChange={(e) => handleParamChange("TakeProfit", e.target.value)}
              className="param-field-input"
            />
          </div>
          <div className="param-field">
            <label>Min Distance (Pips)</label>
            <input
              type="text"
              value={customParams.minDistance}
              onChange={(e) => handleParamChange("minDistance", e.target.value)}
              className="param-field-input"
            />
          </div>
          <div className="param-field">
            <label>Distance Incr (Pips)</label>
            <input
              type="text"
              value={customParams.distanceIncrement}
              onChange={(e) => handleParamChange("distanceIncrement", e.target.value)}
              className="param-field-input"
            />
          </div>
          <div className="param-field">
            <label>RSI Filter Toggle (v1.63)</label>
            <select
              value={customParams.UseRSIFilter}
              onChange={(e) => handleParamChange("UseRSIFilter", e.target.value)}
              className="param-field-select"
            >
              <option value="1">1 (Enabled - Standard)</option>
              <option value="0">0 (Disabled - Gold Safe)</option>
            </select>
          </div>
          <div className="param-field">
            <label>Break-Even Lock (v1.63)</label>
            <select
              value={customParams.EnableBreakEven}
              onChange={(e) => handleParamChange("EnableBreakEven", e.target.value)}
              className="param-field-select"
            >
              <option value="1">1 (Enabled - Lock Profit)</option>
              <option value="0">0 (Disabled - Standard)</option>
            </select>
          </div>
          <div className="param-field">
            <label>Max Drawdown % (v1.63)</label>
            <input
              type="text"
              value={customParams.MaxDrawdownPct}
              onChange={(e) => handleParamChange("MaxDrawdownPct", e.target.value)}
              className="param-field-input"
            />
          </div>
        </div>

        {/* HOW TO LOAD IN METATRADER */}
        <div className="how-to-load-box">
          <span className="load-icon">💡</span>
          <div>
            <strong>How to load in MetaTrader:</strong> Open chart → Press <kbd>F7</kbd> (or right-click → <em>Expert Advisors</em> → <em>Properties</em>) → Go to <strong>Inputs</strong> tab → Click <strong>Load</strong> → Choose the downloaded <code>.set</code> file → Click <strong>OK</strong>!
          </div>
        </div>
      </div>
    </div>
  );
}
