"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { playTactileClick, playProfitChime, playAlertPing } from "@/lib/audioSynthesizer";

const MODES = [
  {
    id: "ea-budak-ubat",
    name: "EA Budak Ubat",
    tag: "Grid Martingale + ADR Pooling",
    badge: "SYS.01",
    color: "#00f0ff",
    desc: "Autonomous dynamic layering with ADR break-even TP pooling. Realizes basket profit as soon as price rebounds.",
  },
  {
    id: "bracketblitz",
    name: "BracketBlitz EA",
    tag: "Rapid-Fire OCO Stop Brackets",
    badge: "SYS.03",
    color: "#10b981",
    desc: "Surrounds current price with Buy Stop & Sell Stop pending brackets. Catches breakouts instantly during news catalysts.",
  },
  {
    id: "goldmind-ai",
    name: "GoldMind AI",
    tag: "Neural XAUUSD LLM Signals",
    badge: "SYS.02",
    color: "#f59e0b",
    desc: "ChatGPT vision & reasoning engine that identifies institutional order blocks with strict 1:2.5 risk-to-reward gating.",
  },
];

export default function LiveStrategySimulator() {
  const [activeMode, setActiveMode] = useState("ea-budak-ubat");
  const [simSpeed, setSimSpeed] = useState(1); // 0 = pause, 1 = normal, 2 = fast, 5 = ultra
  const [startLot, setStartLot] = useState(0.01);
  const [multiplier, setMultiplier] = useState(1.3);
  const [gridStep, setGridStep] = useState(15); // pips
  const [tpDistance, setTpDistance] = useState(20); // pips

  // Financial Telemetry State
  const [balance, setBalance] = useState(1000.0);
  const [realizedProfit, setRealizedProfit] = useState(0.0);
  const [floatingPnl, setFloatingPnl] = useState(0.0);
  const [activeLayers, setActiveLayers] = useState([]);
  const [maxDrawdown, setMaxDrawdown] = useState(0.0);
  const [tpCelebration, setTpCelebration] = useState(null);
  const [aiTelemetryLog, setAiTelemetryLog] = useState("AI Model initialized. Awaiting market structure confirmation...");

  const canvasRef = useRef(null);
  const stateRef = useRef({
    price: 1.085, // EURUSD base price
    basePrice: 1.085,
    pipSize: 0.0001,
    history: [],
    trendBias: 0,
    volatility: 0.8,
    targetPrice: 1.085,
    positions: [],
    takeProfitPrice: null,
    ocoBuyStop: null,
    ocoSellStop: null,
    particles: [],
    running: true,
    lastAiTick: 0,
    totalWins: 0,
    peakEquity: 1000,
    simSpeed: 1,
    startLot: 0.01,
    multiplier: 1.3,
    gridStep: 15,
    tpDistance: 20,
    mode: "ea-budak-ubat",
  });

  // Keep stateRef synced with React state for high-frequency RAF loop
  useEffect(() => {
    stateRef.current.simSpeed = simSpeed;
    stateRef.current.startLot = startLot;
    stateRef.current.multiplier = multiplier;
    stateRef.current.gridStep = gridStep;
    stateRef.current.tpDistance = tpDistance;
    stateRef.current.mode = activeMode;
  }, [simSpeed, startLot, multiplier, gridStep, tpDistance, activeMode]);

  // Trigger celebration particle effect
  const triggerCelebration = useCallback((profit, tpPrice) => {
    setTpCelebration({
      profit: profit.toFixed(2),
      time: Date.now(),
    });
    playProfitChime();

    // Spawn canvas particles
    const canvas = canvasRef.current;
    if (canvas) {
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < 42; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        stateRef.current.particles.push({
          x: w - 80,
          y: h / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          color: Math.random() > 0.4 ? "#00f0ff" : "#10b981",
          radius: 2 + Math.random() * 3,
          alpha: 1,
          life: 0.95 + Math.random() * 0.04,
        });
      }
    }

    setTimeout(() => setTpCelebration(null), 2500);
  }, []);

  // Initialize and run Canvas Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize canvas with devicePixelRatio for ultra-sharp Retina rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const s = stateRef.current;
    const pip = s.pipSize;

    // Prefill price history
    if (s.history.length === 0) {
      let p = s.price;
      for (let i = 0; i < 80; i++) {
        p += (Math.random() - 0.5) * pip * 1.5;
        s.history.push(p);
      }
      s.price = p;
      s.targetPrice = p;

      // Open initial position for EA Budak Ubat
      openInitialGridPosition();
    }

    function openInitialGridPosition() {
      const curPrice = s.price;
      const initialPos = {
        id: 1,
        type: "BUY",
        lot: s.startLot,
        openPrice: curPrice,
        pipsStep: 0,
      };
      s.positions = [initialPos];
      s.takeProfitPrice = curPrice + s.tpDistance * pip;
    }

    let animId;
    let tickCounter = 0;

    const render = () => {
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      const speed = s.simSpeed;
      if (speed > 0) {
        tickCounter++;
        // Speed step execution
        const ticksThisFrame = speed === 1 ? 1 : speed === 2 ? 2 : 4;

        for (let t = 0; t < ticksThisFrame; t++) {
          // Dynamic market price physics
          const randomWalk = (Math.random() - 0.495) * pip * 1.8 * s.volatility;
          const trendPull = (s.trendBias * pip * 0.4);
          s.price += randomWalk + trendPull;

          // Dampen trend bias gradually towards 0 (mean reversion)
          s.trendBias *= 0.985;
          s.volatility = 0.8 + (s.volatility - 0.8) * 0.98;

          s.history.push(s.price);
          if (s.history.length > 85) s.history.shift();

          // ----------------------------------------------------
          // ALGORITHM LOGIC: EA BUDAK UBAT (Grid Martingale + ADR Pooling)
          // ----------------------------------------------------
          if (s.mode === "ea-budak-ubat") {
            if (s.positions.length === 0) {
              openInitialGridPosition();
            } else {
              const lowestBuy = s.positions.reduce((min, p) => p.openPrice < min ? p.openPrice : min, 999999);
              const gridThreshold = lowestBuy - s.gridStep * pip;

              // Check if price fell enough to open next martingale layer
              if (s.price <= gridThreshold && s.positions.length < 8) {
                const prevLot = s.positions[s.positions.length - 1].lot;
                const newLot = parseFloat((prevLot * s.multiplier).toFixed(3));
                const newPos = {
                  id: s.positions.length + 1,
                  type: "BUY",
                  lot: newLot,
                  openPrice: s.price,
                  pipsStep: s.positions.length * s.gridStep,
                };
                s.positions.push(newPos);

                // Recalculate dynamic weighted average break-even price
                let totalCost = 0;
                let totalLots = 0;
                s.positions.forEach((p) => {
                  totalCost += p.openPrice * p.lot;
                  totalLots += p.lot;
                });
                const weightedAvg = totalCost / totalLots;
                // Move dynamic TP line down closer to active price!
                s.takeProfitPrice = weightedAvg + s.tpDistance * pip * 0.8;
                playTactileClick(0.06);
              }

              // Check if price reached dynamic Take Profit line
              if (s.takeProfitPrice && s.price >= s.takeProfitPrice) {
                // Realize profit across the entire grid basket!
                let basketProfit = 0;
                s.positions.forEach((p) => {
                  const profitPips = (s.price - p.openPrice) / pip;
                  basketProfit += profitPips * p.lot * 10; // $10 per pip per standard lot
                });

                if (basketProfit > 0) {
                  s.totalWins++;
                  setRealizedProfit((prev) => prev + basketProfit);
                  setBalance((prev) => prev + basketProfit);
                  triggerCelebration(basketProfit, s.takeProfitPrice);
                }

                // Reset grid basket
                s.positions = [];
                s.takeProfitPrice = null;
                setTimeout(() => {
                  if (s.positions.length === 0) openInitialGridPosition();
                }, 400);
              }
            }
          }

          // ----------------------------------------------------
          // ALGORITHM LOGIC: BRACKETBLITZ (OCO Pending Brackets)
          // ----------------------------------------------------
          else if (s.mode === "bracketblitz") {
            const bracketDist = s.gridStep * pip;
            if (!s.ocoBuyStop || !s.ocoSellStop) {
              s.ocoBuyStop = s.price + bracketDist;
              s.ocoSellStop = s.price - bracketDist;
            } else {
              // Dynamically trail pending orders to chase the market
              const targetBuy = s.price + bracketDist;
              const targetSell = s.price - bracketDist;
              s.ocoBuyStop += (targetBuy - s.ocoBuyStop) * 0.05;
              s.ocoSellStop += (targetSell - s.ocoSellStop) * 0.05;

              // Breakout triggered!
              if (s.price >= s.ocoBuyStop) {
                const profit = 18.5 * s.startLot * 10;
                setRealizedProfit((prev) => prev + profit);
                setBalance((prev) => prev + profit);
                triggerCelebration(profit, s.ocoBuyStop);
                s.ocoBuyStop = s.price + bracketDist * 1.5;
                s.ocoSellStop = s.price - bracketDist * 1.5;
              } else if (s.price <= s.ocoSellStop) {
                const profit = 18.5 * s.startLot * 10;
                setRealizedProfit((prev) => prev + profit);
                setBalance((prev) => prev + profit);
                triggerCelebration(profit, s.ocoSellStop);
                s.ocoBuyStop = s.price + bracketDist * 1.5;
                s.ocoSellStop = s.price - bracketDist * 1.5;
              }
            }
          }

          // ----------------------------------------------------
          // ALGORITHM LOGIC: GOLDMIND AI (Neural LLM Telemetry)
          // ----------------------------------------------------
          else if (s.mode === "goldmind-ai") {
            if (Date.now() - s.lastAiTick > 3500) {
              s.lastAiTick = Date.now();
              const aiSignals = [
                `[Neural M15] Bullish Liquidity Sweep at ${(s.price - 0.0012).toFixed(4)} → Entry Confirmed (Conf: 94%)`,
                `[Vision Engine] Fair Value Gap filled. Auto-hedging enabled. Target: +${s.tpDistance} pips.`,
                `[Risk Guard] Volatility index optimal. Trailing Break-Even armed.`,
                `[ChatGPT 4o-mini] Re-evaluating macro order flow. Bias: ACCUMULATION.`,
              ];
              const logMsg = aiSignals[Math.floor(Math.random() * aiSignals.length)];
              setAiTelemetryLog(logMsg);

              if (s.positions.length === 0) {
                s.positions = [{ id: 1, type: "BUY", lot: s.startLot, openPrice: s.price }];
                s.takeProfitPrice = s.price + s.tpDistance * pip * 1.2;
              }
            }

            if (s.takeProfitPrice && s.price >= s.takeProfitPrice && s.positions.length > 0) {
              const profit = s.tpDistance * 1.2 * s.startLot * 10;
              setRealizedProfit((prev) => prev + profit);
              setBalance((prev) => prev + profit);
              triggerCelebration(profit, s.takeProfitPrice);
              s.positions = [];
              s.takeProfitPrice = null;
            }
          }
        }
      }

      // Calculate Floating PnL & Drawdown
      let currentFloating = 0;
      let totalLots = 0;
      s.positions.forEach((p) => {
        const pnlPips = (s.price - p.openPrice) / pip;
        currentFloating += pnlPips * p.lot * 10;
        totalLots += p.lot;
      });

      if (tickCounter % 5 === 0) {
        setFloatingPnl(currentFloating);
        setActiveLayers([...s.positions]);
        const currentEquity = balance + currentFloating;
        if (currentEquity > s.peakEquity) s.peakEquity = currentEquity;
        const dd = s.peakEquity > 0 ? ((s.peakEquity - currentEquity) / s.peakEquity) * 100 : 0;
        if (dd > maxDrawdown) setMaxDrawdown(Math.min(99.9, Math.max(0, dd)));
      }

      // ----------------------------------------------------
      // DRAW CHART CANVAS
      // ----------------------------------------------------
      const prices = s.history;
      const minP = Math.min(...prices, s.takeProfitPrice || 9999, ...s.positions.map((p) => p.openPrice)) - pip * 6;
      const maxP = Math.max(...prices, s.takeProfitPrice || -9999, ...s.positions.map((p) => p.openPrice)) + pip * 6;
      const pRange = maxP - minP || 1;

      const getY = (price) => height - ((price - minP) / pRange) * (height - 60) - 30;
      const getX = (idx) => (idx / (prices.length - 1)) * (width - 70) + 15;

      // Background Subtle Tech Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width - 65, y);
        ctx.stroke();

        // Pip price label
        const priceAtY = minP + ((height - 30 - y) / (height - 60)) * pRange;
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(priceAtY.toFixed(4), width - 60, y + 3);
      }

      // Fill Gradient under Price Curve
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(0, 240, 255, 0.22)");
      grad.addColorStop(1, "rgba(0, 240, 255, 0.0)");

      ctx.beginPath();
      ctx.moveTo(getX(0), height);
      prices.forEach((p, i) => {
        ctx.lineTo(getX(i), getY(p));
      });
      ctx.lineTo(getX(prices.length - 1), height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Main Neon Price Line
      ctx.beginPath();
      prices.forEach((p, i) => {
        const x = getX(i);
        const y = getY(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "round";
      ctx.stroke();

      // Current Price Pulse Head
      const currentX = getX(prices.length - 1);
      const currentY = getY(s.price);

      ctx.beginPath();
      ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00f0ff";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(currentX, currentY, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Active Grid Positions Lines (Green Buy Layers)
      s.positions.forEach((pos, idx) => {
        const posY = getY(pos.openPrice);
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(15, posY);
        ctx.lineTo(width - 70, posY);
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.setLineDash([]);

        // Layer Badge
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.fillText(`BUY #${pos.id} [${pos.lot.toFixed(2)}]`, 20, posY - 4);
      });

      // Draw Dynamic TP Pooling Line (Cyan Glowing Dashed)
      if (s.takeProfitPrice) {
        const tpY = getY(s.takeProfitPrice);
        ctx.beginPath();
        ctx.setLineDash([6, 3]);
        ctx.moveTo(15, tpY);
        ctx.lineTo(width - 70, tpY);
        ctx.strokeStyle = "#ff007f";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#ff007f";
        ctx.font = "bold 10px 'JetBrains Mono', monospace";
        ctx.fillText(`🎯 DYNAMIC TP POOL (+${s.tpDistance} PIPS)`, 20, tpY - 5);
      }

      // Draw BracketBlitz OCO Lines
      if (s.mode === "bracketblitz") {
        if (s.ocoBuyStop) {
          const buyStopY = getY(s.ocoBuyStop);
          ctx.setLineDash([5, 3]);
          ctx.strokeStyle = "#10b981";
          ctx.strokeRect(15, buyStopY, width - 85, 0);
          ctx.fillStyle = "#10b981";
          ctx.font = "bold 9px 'JetBrains Mono', monospace";
          ctx.fillText("⚡ BUY STOP (OCO PENDING)", 20, buyStopY - 4);
        }
        if (s.ocoSellStop) {
          const sellStopY = getY(s.ocoSellStop);
          ctx.setLineDash([5, 3]);
          ctx.strokeStyle = "#ef4444";
          ctx.strokeRect(15, sellStopY, width - 85, 0);
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 9px 'JetBrains Mono', monospace";
          ctx.fillText("⚡ SELL STOP (OCO PENDING)", 20, sellStopY + 12);
        }
        ctx.setLineDash([]);
      }

      // Draw Particles on Celebration
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.12; // Gravity
        pt.alpha *= pt.life;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (pt.alpha < 0.03) {
          s.particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [balance, triggerCelebration, maxDrawdown]);

  // Market Catalyst Triggers
  const triggerMarketEvent = (eventType) => {
    playTactileClick(0.1);
    const s = stateRef.current;
    if (eventType === "ranging") {
      s.trendBias = 0;
      s.volatility = 0.55;
    } else if (eventType === "bull") {
      s.trendBias = 4.5;
      s.volatility = 1.2;
    } else if (eventType === "flash_dip") {
      // Create sudden downward shock to trigger layers, then sharp rebound!
      s.trendBias = -6.0;
      s.volatility = 1.6;
      setTimeout(() => {
        s.trendBias = 8.0; // V-shaped bounce to smash TP!
      }, 1400);
    } else if (eventType === "news_spike") {
      s.trendBias = (Math.random() > 0.5 ? 8 : -8);
      s.volatility = 3.2;
    }
  };

  // Close All Positions (Emergency Flush)
  const handleCloseAll = () => {
    playAlertPing(0.15);
    const s = stateRef.current;
    s.positions = [];
    s.takeProfitPrice = null;
    setActiveLayers([]);
    setFloatingPnl(0);
  };

  // Reset Simulation
  const handleReset = () => {
    playTactileClick(0.12);
    const s = stateRef.current;
    s.price = 1.085;
    s.history = [];
    s.positions = [];
    s.takeProfitPrice = null;
    s.particles = [];
    s.peakEquity = 1000;
    setBalance(1000.0);
    setRealizedProfit(0.0);
    setFloatingPnl(0.0);
    setActiveLayers([]);
    setMaxDrawdown(0.0);
  };

  const currentModeInfo = MODES.find((m) => m.id === activeMode) || MODES[0];
  const equity = balance + floatingPnl;

  return (
    <div className="simulator-container border-beam-card">
      {/* SIMULATOR HEADER */}
      <div className="sim-header">
        <div className="sim-title-group">
          <div className="sim-badge-row">
            <span className="jp-badge">{currentModeInfo.badge}</span>
            <span className="sim-live-indicator">
              <span className="sim-live-dot"></span>
              {simSpeed === 0 ? "PAUSED" : `LIVE SIMULATION (${simSpeed}x)`}
            </span>
          </div>
          <h3 className="sim-title">⚡ Interactive Algorithmic Engine Visualizer</h3>
          <p className="sim-subtitle">{currentModeInfo.desc}</p>
        </div>

        {/* MODE SELECTOR PILLS */}
        <div className="sim-mode-tabs">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              data-cursor-label="ENGAGE"
              className={`sim-mode-btn ${activeMode === m.id ? "active" : ""}`}
              style={{
                borderColor: activeMode === m.id ? m.color : undefined,
                color: activeMode === m.id ? m.color : undefined,
                background: activeMode === m.id ? `${m.color}18` : undefined,
              }}
              onClick={() => {
                playTactileClick();
                setActiveMode(m.id);
                stateRef.current.positions = [];
                stateRef.current.takeProfitPrice = null;
              }}
            >
              <span>{m.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FINANCIAL TELEMETRY HUD BAR */}
      <div className="sim-telemetry-hud">
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Account Balance</span>
          <span className="sim-hud-value">${balance.toFixed(2)}</span>
        </div>
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Equity (Net)</span>
          <span className="sim-hud-value" style={{ color: equity >= balance ? "#10b981" : "#f59e0b" }}>
            ${equity.toFixed(2)}
          </span>
        </div>
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Floating P&L</span>
          <span
            className="sim-hud-value"
            style={{ color: floatingPnl >= 0 ? "#10b981" : "#ef4444" }}
          >
            {floatingPnl >= 0 ? `+$${floatingPnl.toFixed(2)}` : `-$${Math.abs(floatingPnl).toFixed(2)}`}
          </span>
        </div>
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Realized Profit</span>
          <span className="sim-hud-value" style={{ color: "var(--liquid-cyan)" }}>
            +${realizedProfit.toFixed(2)}
          </span>
        </div>
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Active Layers</span>
          <span className="sim-hud-value">
            {activeLayers.length} <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>positions</span>
          </span>
        </div>
        <div className="sim-hud-cell">
          <span className="sim-hud-label">Max Drawdown</span>
          <span className="sim-hud-value" style={{ color: maxDrawdown > 20 ? "#ef4444" : "#10b981" }}>
            {maxDrawdown.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* MAIN CHART CANVAS VIEWPORT */}
      <div className="sim-canvas-wrapper">
        <canvas ref={canvasRef} className="sim-canvas" />

        {/* TAKE PROFIT CELEBRATION OVERLAY */}
        {tpCelebration && (
          <div className="tp-celebration-badge animate-in">
            <span className="tp-icon">🎉</span>
            <div>
              <div className="tp-title">BASKET TAKE PROFIT REALIZED!</div>
              <div className="tp-amount">+${tpCelebration.profit} USD</div>
            </div>
          </div>
        )}

        {/* AI TELEMETRY TICKER (FOR GOLDMIND AI) */}
        {activeMode === "goldmind-ai" && (
          <div className="sim-ai-terminal-bar">
            <span className="sim-ai-tag">AI // LOG:</span>
            <span className="sim-ai-msg">{aiTelemetryLog}</span>
          </div>
        )}
      </div>

      {/* INTERACTIVE CONTROLS & MARKET CATALYSTS DOCK */}
      <div className="sim-controls-dock">
        {/* Market Event Triggers */}
        <div className="sim-control-group">
          <span className="sim-control-label">⚡ Trigger Market Catalysts:</span>
          <div className="sim-btn-row">
            <button
              type="button"
              data-cursor-label="TRIGGER"
              className="sim-action-btn"
              onClick={() => triggerMarketEvent("ranging")}
            >
              🌊 Ranging Channel
            </button>
            <button
              type="button"
              data-cursor-label="TRIGGER"
              className="sim-action-btn"
              onClick={() => triggerMarketEvent("bull")}
            >
              🚀 Bullish Surge
            </button>
            <button
              type="button"
              data-cursor-label="TRIGGER"
              className="sim-action-btn"
              onClick={() => triggerMarketEvent("flash_dip")}
            >
              📉 Flash Dip & Rebound
            </button>
            <button
              type="button"
              data-cursor-label="TRIGGER"
              className="sim-action-btn"
              onClick={() => triggerMarketEvent("news_spike")}
            >
              🌪️ News Spike
            </button>
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="sim-sliders-grid">
          <div className="sim-slider-item">
            <div className="sim-slider-header">
              <span>Start Lot</span>
              <span className="sim-slider-val">{startLot.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.10"
              step="0.01"
              value={startLot}
              onChange={(e) => setStartLot(parseFloat(e.target.value))}
            />
          </div>

          <div className="sim-slider-item">
            <div className="sim-slider-header">
              <span>Martingale Multiplier</span>
              <span className="sim-slider-val">{multiplier.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.0"
              step="0.1"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
            />
          </div>

          <div className="sim-slider-item">
            <div className="sim-slider-header">
              <span>Grid Step (Pips)</span>
              <span className="sim-slider-val">{gridStep} pips</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={gridStep}
              onChange={(e) => setGridStep(parseInt(e.target.value))}
            />
          </div>

          <div className="sim-slider-item">
            <div className="sim-slider-header">
              <span>Take Profit (Pips)</span>
              <span className="sim-slider-val">{tpDistance} pips</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={tpDistance}
              onChange={(e) => setTpDistance(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Simulation Speed & Utilities */}
        <div className="sim-footer-bar">
          <div className="sim-speed-selector">
            <span className="sim-control-label">Speed:</span>
            {[0, 1, 2, 5].map((spd) => (
              <button
                key={spd}
                type="button"
                className={`sim-speed-btn ${simSpeed === spd ? "active" : ""}`}
                onClick={() => {
                  playTactileClick();
                  setSimSpeed(spd);
                }}
              >
                {spd === 0 ? "⏸ Pause" : `${spd}x`}
              </button>
            ))}
          </div>

          <div className="sim-utility-buttons">
            <button
              type="button"
              className="sim-util-btn flush-btn"
              data-cursor-label="FLUSH"
              onClick={handleCloseAll}
              title="Close all open grid layers"
            >
              🛑 Flush Positions
            </button>
            <button
              type="button"
              className="sim-util-btn reset-btn"
              data-cursor-label="RESET"
              onClick={handleReset}
              title="Reset balance and simulation"
            >
              🔄 Reset Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
