"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  playTactileClick,
  playReticleLock,
  playQuizCorrect,
  playQuizWrong,
  playLevelUpFanfare,
  playComboBonus,
  isSoundEnabled,
  toggleSound,
} from "@/lib/audioSynthesizer";

// ==========================================
// 1. TRADER RANKS & XP TIERS
// ==========================================
const RANKS = [
  { id: 1, title: "Novice Pip Hunter", minXp: 0, badge: "🥉", color: "#94a3b8", desc: "Learning currency pairs & spread basics" },
  { id: 2, title: "S&R Scout", minXp: 500, badge: "🥈", color: "#38bdf8", desc: "Spotting key market levels & trends" },
  { id: 3, title: "Chart Technician", minXp: 1500, badge: "🥇", color: "#f59e0b", desc: "Mastering indicators & candle patterns" },
  { id: 4, title: "Risk Fortress Guardian", minXp: 3000, badge: "🛡️", color: "#10b981", desc: "Executing strict 1-2% money management" },
  { id: 5, title: "Algorithmic Commander", minXp: 5000, badge: "🚀", color: "#8b5cf6", desc: "Commanding automated grid & ADR systems" },
  { id: 6, title: "Institutional Quant Sovereign", minXp: 8000, badge: "👑", color: "#ec4899", desc: "Market mastery with mathematical edge" },
];

function getRank(xp) {
  let currentRank = RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      currentRank = RANKS[i];
      break;
    }
  }
  const currentIndex = RANKS.findIndex((r) => r.id === currentRank.id);
  const nextRank = RANKS[currentIndex + 1] || null;
  const prevMin = currentRank.minXp;
  const nextMin = nextRank ? nextRank.minXp : prevMin + 2000;
  const progressPct = nextRank ? Math.min(100, Math.max(0, ((xp - prevMin) / (nextMin - prevMin)) * 100)) : 100;

  return { currentRank, nextRank, progressPct };
}

// ==========================================
// 2. CURRICULUM: 5 WORLDS & QUEST STAGES
// ==========================================
const WORLDS = [
  {
    id: "world-1",
    worldNum: 1,
    title: "Forex Genesis & Pip Mechanics",
    icon: "🌐",
    accent: "#38bdf8",
    tagline: "The fundamentals of global FX currency exchange",
    stages: [
      {
        id: "w1-s1",
        title: "Currency Pairs & Bid / Ask Spread",
        xpReward: 150,
        lesson: {
          summary: "In Forex, currencies are always traded in pairs: Base Currency / Quote Currency (e.g. EUR/USD).",
          points: [
            "Base Currency: The first currency. It always represents 1 unit.",
            "Quote Currency: The second currency. It represents how much quote currency is needed to buy 1 unit of base.",
            "Bid Price: The price the broker buys from you (your sell price).",
            "Ask Price: The price the broker sells to you (your buy price).",
            "Spread = Ask - Bid. It is the broker's commission built directly into the transaction.",
          ],
          proTip: "Always monitor broker spreads during London/NY open and avoid high spread rollover hours (21:00-23:00 GMT)!",
        },
        questions: [
          {
            q: "In the EUR/USD pair trading at 1.0850, which currency is the 'Base Currency'?",
            options: ["USD", "EUR", "Both", "Neither"],
            correctIndex: 1,
            explanation: "EUR is the Base Currency (the first currency listed in the pair). USD is the Quote currency.",
          },
          {
            q: "If EUR/USD Bid is 1.08500 and Ask is 1.08515, what is the spread in standard pips?",
            options: ["15 pips", "1.5 pips", "0.15 pips", "150 pips"],
            correctIndex: 1,
            explanation: "Spread = 1.08515 - 1.08500 = 0.00015 = 1.5 standard pips (15 fractional pipettes).",
          },
          {
            q: "When you execute a BUY order in MetaTrader, what price is your trade filled at?",
            options: ["Bid Price", "Ask Price", "Midpoint Price", "Previous Close Price"],
            correctIndex: 1,
            explanation: "BUY orders are always filled at the Ask price, and closed at the Bid price.",
          },
        ],
      },
      {
        id: "w1-s2",
        title: "Pips, Lots & Position Value",
        xpReward: 200,
        lesson: {
          summary: "A 'Pip' (Percentage in Point) is the standard unit of measurement for price movement.",
          points: [
            "For most pairs (4 decimals), 1 pip = 0.0001 (e.g. 1.0850 to 1.0851).",
            "For JPY pairs (2 decimals), 1 pip = 0.01 (e.g. 150.20 to 150.21).",
            "Standard Lot (1.00) = 100,000 units (~$10/pip on EURUSD).",
            "Mini Lot (0.10) = 10,000 units (~$1/pip on EURUSD).",
            "Micro Lot (0.01) = 1,000 units (~$0.10/pip on EURUSD).",
          ],
          proTip: "On Cent accounts, 0.01 lot moves at just $0.001 per pip, making it ideal for testing Martingale EAs with $100 capital!",
        },
        questions: [
          {
            q: "You buy 0.10 lots of EUR/USD. The price moves up by 25 pips. What is your approximate profit?",
            options: ["$2.50", "$25.00", "$250.00", "$0.25"],
            correctIndex: 1,
            explanation: "On EUR/USD, 0.10 lots equals approx. $1.00 per pip. 25 pips × $1.00 = $25.00 profit.",
          },
          {
            q: "USD/JPY moves from 154.20 to 154.70. How many pips did it move?",
            options: ["5 pips", "50 pips", "500 pips", "0.5 pips"],
            correctIndex: 1,
            explanation: "For JPY pairs, the second decimal is the pip. (154.70 - 154.20) = 0.50 = 50 pips.",
          },
          {
            q: "Which lot size corresponds to 1,000 units of the base currency?",
            options: ["Standard Lot (1.00)", "Mini Lot (0.10)", "Micro Lot (0.01)", "Nano Lot (0.001)"],
            correctIndex: 2,
            explanation: "0.01 lot is a Micro Lot, representing 1,000 units of currency.",
          },
        ],
      },
    ],
  },
  {
    id: "world-2",
    worldNum: 2,
    title: "Chart Anatomy & Technical Indicators",
    icon: "📊",
    accent: "#f59e0b",
    tagline: "Reading price action, moving averages & momentum indicators",
    stages: [
      {
        id: "w2-s1",
        title: "Candlestick Patterns & Price Action",
        xpReward: 200,
        lesson: {
          summary: "Japanese candlesticks tell the continuous battle between buyers (bulls) and sellers (bears).",
          points: [
            "Body: The range between Open and Close.",
            "Wicks / Shadows: The highest and lowest extremes reached during the timeframe.",
            "Bullish Pin Bar / Hammer: Long lower wick rejecting lows, showing strong buying pressure.",
            "Bearish Engulfing: A large red candle that completely covers the previous green candle body.",
          ],
          proTip: "Candlestick signals have much higher probability when they form directly at Support, Resistance, or the 200 SMA!",
        },
        questions: [
          {
            q: "What does a candle with a very long lower wick and small body near the top indicate?",
            options: [
              "Sellers are dominating the session",
              "Buyers rejected lower prices and pushed price back up (Bullish Pin Bar)",
              "A guaranteed market crash",
              "Low volatility with no buyers or sellers",
            ],
            correctIndex: 1,
            explanation: "A long lower wick proves sellers tried to push price down, but aggressive buyers stepped in to force price back up.",
          },
          {
            q: "What is a 'Bearish Engulfing' pattern?",
            options: [
              "A small green candle inside a larger previous candle",
              "A large red candle whose body completely covers the previous green candle's body",
              "Three consecutive green candles with increasing volume",
              "A candle with zero body (Doji)",
            ],
            correctIndex: 1,
            explanation: "A Bearish Engulfing occurs when sellers overpower buyers, creating a red candle body that engulfs the previous green candle.",
          },
        ],
      },
      {
        id: "w2-s2",
        title: "RSI, Moving Averages & Ichimoku Kumo",
        xpReward: 250,
        lesson: {
          summary: "Indicators quantify momentum, trend direction, and statistical deviations.",
          points: [
            "SMA 20: 20-period Simple Moving Average. Price above = short term bullish; price below = bearish.",
            "RSI (Relative Strength Index): Momentum oscillator (0-100). Overbought > 70; Oversold < 30.",
            "EA Budak Ubat RSI Rule: Buys allowed only when RSI < 70; Sells allowed only when RSI > 30 to avoid top/bottom chasing.",
            "Ichimoku Kumo Cloud: Price above the cloud is bullish territory; price below is bearish territory.",
          ],
          proTip: "In strong runaway trends (like Gold rallies), RSI can stay overbought for days. That's why v1.63+ allows turning off RSI filter specifically for XAUUSD!",
        },
        questions: [
          {
            q: "If EUR/USD H1 RSI is currently at 82.0, what does this statistically suggest?",
            options: [
              "The market is oversold and about to surge higher",
              "The market is heavily overbought and vulnerable to pullbacks",
              "The broker has disconnected",
              "Trading volume has reached zero",
            ],
            correctIndex: 1,
            explanation: "RSI > 70 indicates overbought conditions where buyers may become exhausted, creating pullbacks or consolidation.",
          },
          {
            q: "In EA Budak Ubat's Ichimoku strategy, when does the EA consider taking BUY entries?",
            options: [
              "When price closes strictly above the Kumo Cloud",
              "When price closes strictly below the Kumo Cloud",
              "Only at midnight server time",
              "When spread exceeds 10 pips",
            ],
            correctIndex: 0,
            explanation: "In Ichimoku Kinko Hyo, prices above the Kumo (cloud) represent bullish equilibrium, giving trend confirmation for buys.",
          },
        ],
      },
    ],
  },
  {
    id: "world-3",
    worldNum: 3,
    title: "The Risk Fortress & Capital Defense",
    icon: "🛡️",
    accent: "#10b981",
    tagline: "The #1 reason traders survive: Mathematics of Money Management",
    stages: [
      {
        id: "w3-s1",
        title: "Leverage, Margin & The Stop-Out Trap",
        xpReward: 250,
        lesson: {
          summary: "Leverage borrows buying power from your broker. It magnifies both your gains and your losses equally.",
          points: [
            "Leverage 1:500 means $100 of equity controls $50,000 of currency.",
            "Used Margin: The collateral locked by the broker while your trade remains open.",
            "Free Margin = Equity - Used Margin. If this reaches $0, you cannot open new trades.",
            "Margin Call / Stop Out: The broker automatically liquidates your trades to prevent your account from going negative.",
          ],
          proTip: "High leverage does NOT increase risk if your lot size remains small. It actually reduces required margin, giving your grid more breathing room!",
        },
        questions: [
          {
            q: "What happens when your account reaches the broker's 'Stop Out' level (e.g. 20% Margin Level)?",
            options: [
              "The broker deposits emergency bonus funds",
              "Your most unprofitable open positions are automatically closed by the broker",
              "Your leverage automatically increases by 10x",
              "The market pauses trading for 2 hours",
            ],
            correctIndex: 1,
            explanation: "Stop Out is an automated circuit breaker where the broker forcefully liquidates open positions to protect against debt.",
          },
          {
            q: "A trader has $500 balance and risks $250 on a single trade. What rule are they violating?",
            options: [
              "The Fibonacci sequence",
              "Strict 1-2% capital risk management",
              "The London Breakout strategy",
              "The MACD divergence",
            ],
            correctIndex: 1,
            explanation: "Risking 50% on one trade is reckless gambling. Professional traders risk only 1% to 2% per setup to survive losing streaks.",
          },
        ],
      },
      {
        id: "w3-s2",
        title: "Position Sizing & Drawdown Control",
        xpReward: 300,
        lesson: {
          summary: "Lot size must be calculated from your Stop Loss distance, never picked at random.",
          points: [
            "Position Size Formula: Risk Amount ($) ÷ (Stop Loss in Pips × Pip Value).",
            "Example: $2,000 account, 1% risk = $20 risk. Stop Loss = 20 pips. Lot size = $20 / (20 × $10) = 0.10 mini lot.",
            "Drawdown: The peak-to-trough decline in your account equity.",
            "EA Budak Ubat MaxDrawdownPct: Sets a hard equity cutoff % that closes all trades if floating loss hits your safety limit.",
          ],
          proTip: "If you suffer a 50% drawdown, you need a 100% gain just to get back to break-even! Preserve capital first.",
        },
        questions: [
          {
            q: "If your account suffers a 50% drawdown, what percentage gain is required to recover back to your original balance?",
            options: ["50%", "75%", "100%", "200%"],
            correctIndex: 2,
            explanation: "If a $1,000 account drops 50% to $500, gaining 50% only brings it to $750. You need a 100% gain ($500 -> $1,000) to recover!",
          },
          {
            q: "What is the purpose of the 'MaxDrawdownPct' setting in EA Budak Ubat?",
            options: [
              "To double the lot size every hour",
              "To close all positions and stop trading if floating loss hits a predetermined percentage",
              "To guarantee 100% daily profit",
              "To bypass broker spread requirements",
            ],
            correctIndex: 1,
            explanation: "MaxDrawdownPct acts as an emergency emergency parachute, cutting trades if extreme market events threaten your account.",
          },
        ],
      },
    ],
  },
  {
    id: "world-4",
    worldNum: 4,
    title: "Algorithmic & Grid Systems (EA Mastery)",
    icon: "🤖",
    accent: "#8b5cf6",
    tagline: "How automated expert advisors calculate dynamic grids & trailing TP",
    stages: [
      {
        id: "w4-s1",
        title: "Grid Martingale vs Pure Martingale",
        xpReward: 300,
        lesson: {
          summary: "Grid Martingale uses spatial price intervals rather than coin-flip doubling.",
          points: [
            "Pure Martingale: Doubles lot immediately upon trade loss on the next bar (extremely hazardous).",
            "Grid Martingale: Layers new pending or market orders only when price moves against the basket by a configured pip distance.",
            "Break-Even Pooling: When a new layer opens, the Take Profit for the ENTIRE basket pulls closer to current price!",
            "Take Profit Realization: A minor 30% price retracement closes the whole basket in combined net profit.",
          ],
          proTip: "Multiplier of 1.2 to 1.4 is far safer than 2.0. EA Budak Ubat defaults to 1.3 to avoid exponential lot explosion!",
        },
        questions: [
          {
            q: "Why is a Basket Break-Even TP beneficial in Grid trading?",
            options: [
              "It forces the market to move 500 pips in your original direction",
              "It pulls the exit target closer so only a minor retracement is needed to close all orders in net profit",
              "It removes all broker fees completely",
              "It turns buy orders into sell orders automatically",
            ],
            correctIndex: 1,
            explanation: "By averaging the basket entry prices, a small market pullback allows the higher-volume layers to cancel earlier losses and secure net profit.",
          },
          {
            q: "What is the advantage of using a Martingale Multiplier of 1.3 instead of 2.0?",
            options: [
              "1.3 provides explosive profits on the very first trade",
              "1.3 keeps margin usage significantly lower across 5-8 layers, preventing sudden margin calls",
              "1.3 is required by MetaQuotes regulations",
              "There is no difference between 1.3 and 2.0",
            ],
            correctIndex: 1,
            explanation: "A 2.0 multiplier escalates lot sizes exponentially (0.01, 0.02, 0.04, 0.08, 0.16, 0.32). A 1.3 multiplier scales gently (0.01, 0.01, 0.02, 0.03, 0.04).",
          },
        ],
      },
      {
        id: "w4-s2",
        title: "ADR Dynamic Spacing & VPS Hosting",
        xpReward: 350,
        lesson: {
          summary: "Fixed grid spacing fails during extreme volatility. Dynamic ADR adapts spacing to real market physics.",
          points: [
            "ADR (Average Daily Range): The average pip distance a pair moves from High to Low in 24 hours.",
            "AutoConfig AI: EA Budak Ubat measures 365-day EURUSD ADR ratio to dynamically expand grid distance when markets get fast.",
            "VPS (Virtual Private Server): A cloud computer running 24/7 with 1-5ms latency directly adjacent to broker servers.",
            "Why VPS is essential: Home computers go to sleep, lose Wi-Fi, or reboot for updates, risking unmanaged grid baskets.",
          ],
          proTip: "Never run automated EAs on a laptop on battery saver mode. Use a low-latency Windows VPS for 99.99% uptime!",
        },
        questions: [
          {
            q: "Why is running an EA on a Windows VPS superior to running on a personal laptop?",
            options: [
              "VPS guarantees zero spread on every broker",
              "VPS operates 24/7 without internet disconnects, power outages, or sleep mode disruptions",
              "VPS automatically doubles account balance every month",
              "VPS allows trading without a broker account",
            ],
            correctIndex: 1,
            explanation: "A VPS runs 24/7 in an enterprise data center with dedicated high-speed power and fiber-optic latency to broker servers.",
          },
          {
            q: "What does AutoConfig AI in EA Budak Ubat adapt based on?",
            options: [
              "Social media sentiment",
              "Average Daily Range (ADR) statistical volatility",
              "The current day of the week only",
              "Random number generation",
            ],
            correctIndex: 1,
            explanation: "AutoConfig AI benchmarks the symbol against 365-day historical ADR, automatically adjusting grid spacing and TP to match volatility.",
          },
        ],
      },
    ],
  },
  {
    id: "world-5",
    worldNum: 5,
    title: "News Hazards & Trader Psychology",
    icon: "⚡",
    accent: "#ec4899",
    tagline: "Mastering FOMC, NFP, slippage and emotional self-discipline",
    stages: [
      {
        id: "w5-s1",
        title: "High-Impact News (NFP, FOMC, CPI) & Slippage",
        xpReward: 350,
        lesson: {
          summary: "Tier-1 macroeconomic news releases can wipe out poorly managed accounts in 30 seconds.",
          points: [
            "NFP (Non-Farm Payrolls): US employment data released the first Friday of each month. Extreme volatility.",
            "FOMC (Federal Open Market Committee): Interest rate decisions and monetary policy statements.",
            "Slippage: The difference between your expected price and the actual executed price during liquidity vacuums.",
            "Spread Widening: During news, liquidity providers pull quotes, widening spreads from 1 pip to 20-50+ pips!",
          ],
          proTip: "EA Budak Ubat's MaxSpread_Pips feature prevents opening new orders during news-induced spread spikes!",
        },
        questions: [
          {
            q: "What is 'Slippage' during a high-impact news announcement like NFP?",
            options: [
              "When your broker gives you a cash refund",
              "When your order is executed at a significantly different price due to fast-moving prices and lack of liquidity",
              "When the MT5 terminal screen freezes",
              "When market orders turn into limit orders",
            ],
            correctIndex: 1,
            explanation: "Slippage occurs when price jumps over your order level during explosive news, filling at the next available market quote.",
          },
          {
            q: "Why should grid EAs avoid opening initial entries right during US CPI or FOMC releases?",
            options: [
              "Because spreads widen drastically and price can trend 150 pips in one direction without any pullback",
              "Because MT5 servers are turned off during news",
              "Because the broker bans automated trading during news",
              "Because forex pairs become crypto tokens",
            ],
            correctIndex: 0,
            explanation: "High-impact news can trigger one-directional runaway momentum with widened spreads, which challenges grid recovery mechanisms.",
          },
        ],
      },
      {
        id: "w5-s2",
        title: "Psychological Traps: FOMO & Revenge Trading",
        xpReward: 400,
        lesson: {
          summary: "The greatest threat to a trader is not the broker or the market—it is their own emotional mind.",
          points: [
            "FOMO (Fear Of Missing Out): Chasing a green candle that has already rallied 100 pips, buying at the absolute peak.",
            "Revenge Trading: Immediately opening a massive, oversized lot after a loss to 'win back' money with anger.",
            "The Algorithmic Edge: Algorithmic bots eliminate fear, greed, hope, and hesitation through pure cold mathematical execution.",
          ],
          proTip: "When you feel emotional or frustrated with the market, shut the terminal, go for a walk, and let your proven rules protect you.",
        },
        questions: [
          {
            q: "What is 'Revenge Trading'?",
            options: [
              "Following an EA setfile with strict lot sizes",
              "Taking reckless, oversized positions immediately after a loss to aggressively win money back",
              "Reporting a scam broker to regulators",
              "Hedging two correlated pairs",
            ],
            correctIndex: 1,
            explanation: "Revenge trading is an emotional spiral where anger over a loss causes traders to abandon risk rules, frequently resulting in account liquidation.",
          },
          {
            q: "What is the primary psychological advantage of algorithmic Expert Advisors (EAs)?",
            options: [
              "They predict the future with 100% certainty",
              "They execute proven risk rules and math with zero human fear, greed, or hesitation",
              "They can trade without any internet connection",
              "They can double any balance in 5 minutes",
            ],
            correctIndex: 1,
            explanation: "EAs remove the emotional flaws of fear and greed, executing entry, spacing, and take-profit math objectively without deviation.",
          },
        ],
      },
    ],
  },
];

// ==========================================
// 3. CODEX / REFERENCE KNOWLEDGE BASE
// ==========================================
const CODEX_ENTRIES = [
  {
    topic: "Pip Value Formula",
    category: "Math",
    formula: "Pip Value = (1 Pip / Exchange Rate) × Position Units",
    rule: "On USD quote pairs (EURUSD, GBPUSD), 1.00 lot = $10/pip, 0.10 lot = $1/pip, 0.01 lot = $0.10/pip.",
  },
  {
    topic: "Position Sizing Formula",
    category: "Risk",
    formula: "Lots = Account Equity × Risk % ÷ (Stop Loss Pips × Pip Value per Lot)",
    rule: "Always calculate lot size from Stop Loss. Never set lot size first and pick Stop Loss later.",
  },
  {
    topic: "Used Margin Formula",
    category: "Leverage",
    formula: "Margin = (Contract Size × Lots) ÷ Leverage",
    rule: "Higher leverage reduces margin requirements, leaving more Free Margin to sustain market fluctuations.",
  },
  {
    topic: "Basket Break-Even Formula",
    category: "Grid EA",
    formula: "Break-Even Price = Total Money Spent ÷ Total Cumulative Volume",
    rule: "Weighted average pooling moves the TP closer to the market on every additional grid layer opened.",
  },
  {
    topic: "RSI Reversal Rule",
    category: "Technical",
    formula: "RSI > 70 (Overbought Bearish Bias), RSI < 30 (Oversold Bullish Bias)",
    rule: "EA Budak Ubat only opens BUY when RSI < 70 and SELL when RSI > 30, preventing top/bottom chasing.",
  },
  {
    topic: "Ichimoku Cloud Rule",
    category: "Trend",
    formula: "Price > Senkou Span A & B (Bullish Kumo), Price < Senkou Span A & B (Bearish Kumo)",
    rule: "Only trade in the direction of the cloud to maintain multi-timeframe trend alignment.",
  },
];

// ==========================================
// 4. MAIN INTERACTIVE PAGE COMPONENT
// ==========================================
export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("quest"); // 'quest' | 'blitz' | 'codex'
  const [playerXp, setPlayerXp] = useState(0);
  const [completedStages, setCompletedStages] = useState({}); // stageId -> { stars: 3, score: 3 }
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [activeStage, setActiveStage] = useState(null);
  const [stageQuestionIndex, setStageQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [stageScore, setStageScore] = useState(0);
  const [stageFinished, setStageFinished] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchCodex, setSearchCodex] = useState("");
  const [copiedPassport, setCopiedPassport] = useState(false);

  // Blitz Mode State
  const [blitzActive, setBlitzActive] = useState(false);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(60);
  const [blitzLives, setBlitzLives] = useState(3);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzHighScore, setBlitzHighScore] = useState(0);
  const [blitzQuestion, setBlitzQuestion] = useState(null);
  const [blitzSelectedOption, setBlitzSelectedOption] = useState(null);
  const [blitzRevealed, setBlitzRevealed] = useState(false);
  const [blitzFinished, setBlitzFinished] = useState(false);

  const canvasRef = useRef(null);

  // Load Saved Game Progress
  useEffect(() => {
    try {
      const savedXp = parseInt(localStorage.getItem("ea_quest_xp") || "0", 10);
      const savedStages = JSON.parse(localStorage.getItem("ea_quest_stages") || "{}");
      const savedMaxStreak = parseInt(localStorage.getItem("ea_quest_max_streak") || "0", 10);
      const savedBlitzHigh = parseInt(localStorage.getItem("ea_blitz_high_score") || "0", 10);
      setPlayerXp(savedXp);
      setCompletedStages(savedStages);
      setMaxStreak(savedMaxStreak);
      setBlitzHighScore(savedBlitzHigh);
      setSoundActive(isSoundEnabled());
    } catch (e) {
      console.warn("Could not load stored progress", e);
    }
  }, []);

  // Save Game Progress on change
  const saveProgress = (newXp, newStages, newMaxStreak, newBlitzHigh) => {
    try {
      if (newXp !== undefined) localStorage.setItem("ea_quest_xp", newXp.toString());
      if (newStages !== undefined) localStorage.setItem("ea_quest_stages", JSON.stringify(newStages));
      if (newMaxStreak !== undefined) localStorage.setItem("ea_quest_max_streak", newMaxStreak.toString());
      if (newBlitzHigh !== undefined) localStorage.setItem("ea_blitz_high_score", newBlitzHigh.toString());
    } catch (e) {}
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  // Rank Calculation
  const { currentRank, nextRank, progressPct } = getRank(playerXp);

  // Trigger Confetti Animation
  const triggerConfetti = () => {
    setShowConfetti(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particles = [];
    const colors = ["#38bdf8", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#ffffff"];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let aliveCount = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        setShowConfetti(false);
      }
    };
    render();
  };

  // ==========================================
  // QUEST STAGE HANDLERS
  // ==========================================
  const startQuestStage = (stage) => {
    playTactileClick();
    setActiveStage(stage);
    setStageQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setStageScore(0);
    setStageFinished(false);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const handleQuestAnswer = (optionIndex) => {
    if (isAnswerRevealed) return;
    setSelectedOption(optionIndex);
    setIsAnswerRevealed(true);

    const question = activeStage.questions[stageQuestionIndex];
    const isCorrect = optionIndex === question.correctIndex;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
        saveProgress(undefined, undefined, newStreak, undefined);
      }
      playQuizCorrect(newStreak);
      if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
        playComboBonus();
      }
      setStageScore((prev) => prev + 1);

      // Add XP with streak multiplier
      const multiplier = newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : 1.0;
      const basePoints = Math.round((activeStage.xpReward / activeStage.questions.length) * multiplier);
      const newTotalXp = playerXp + basePoints;
      setPlayerXp(newTotalXp);
      saveProgress(newTotalXp, undefined, undefined, undefined);

      // Check level up threshold
      const newRankData = getRank(newTotalXp);
      if (newRankData.currentRank.id > currentRank.id) {
        playLevelUpFanfare();
        triggerConfetti();
      }
    } else {
      setStreak(0);
      playQuizWrong();
    }
  };

  const handleNextQuestQuestion = () => {
    playTactileClick();
    const nextIdx = stageQuestionIndex + 1;
    if (nextIdx < activeStage.questions.length) {
      setStageQuestionIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      // Stage finished
      setStageFinished(true);
      const totalQ = activeStage.questions.length;
      const finalScore = stageScore + (selectedOption === activeStage.questions[stageQuestionIndex]?.correctIndex ? 0 : 0);
      const starRating = finalScore === totalQ ? 3 : finalScore >= Math.ceil(totalQ * 0.6) ? 2 : 1;

      const updatedStages = {
        ...completedStages,
        [activeStage.id]: {
          stars: Math.max(completedStages[activeStage.id]?.stars || 0, starRating),
          score: Math.max(completedStages[activeStage.id]?.score || 0, finalScore),
        },
      };
      setCompletedStages(updatedStages);
      saveProgress(undefined, updatedStages, undefined, undefined);

      if (starRating >= 2) {
        playLevelUpFanfare();
        triggerConfetti();
      }
    }
  };

  // ==========================================
  // BLITZ MODE HANDLERS
  // ==========================================
  const allQuestionsPool = WORLDS.flatMap((w) =>
    w.stages.flatMap((s) =>
      s.questions.map((q) => ({
        ...q,
        stageTitle: s.title,
        worldTitle: w.title,
      }))
    )
  );

  const pickRandomBlitzQuestion = () => {
    const randomQ = allQuestionsPool[Math.floor(Math.random() * allQuestionsPool.length)];
    setBlitzQuestion(randomQ);
    setBlitzSelectedOption(null);
    setBlitzRevealed(false);
  };

  const startBlitzGame = () => {
    playLevelUpFanfare();
    setBlitzActive(true);
    setBlitzTimeLeft(60);
    setBlitzLives(3);
    setBlitzScore(0);
    setBlitzFinished(false);
    setStreak(0);
    pickRandomBlitzQuestion();
  };

  // Blitz Countdown Timer
  useEffect(() => {
    let timer;
    if (blitzActive && !blitzFinished && blitzTimeLeft > 0 && blitzLives > 0) {
      timer = setInterval(() => {
        setBlitzTimeLeft((prev) => {
          if (prev <= 1) {
            setBlitzFinished(true);
            setBlitzActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [blitzActive, blitzFinished, blitzTimeLeft, blitzLives]);

  const handleBlitzAnswer = (optionIdx) => {
    if (blitzRevealed || !blitzActive) return;
    setBlitzSelectedOption(optionIdx);
    setBlitzRevealed(true);

    const isCorrect = optionIdx === blitzQuestion.correctIndex;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      playQuizCorrect(newStreak);

      const multiplier = newStreak >= 5 ? 3.0 : newStreak >= 3 ? 2.0 : 1.0;
      const points = Math.round(100 * multiplier);
      const newScore = blitzScore + points;
      setBlitzScore(newScore);

      const newTotalXp = playerXp + Math.round(points / 2);
      setPlayerXp(newTotalXp);

      if (newScore > blitzHighScore) {
        setBlitzHighScore(newScore);
        saveProgress(newTotalXp, undefined, undefined, newScore);
      } else {
        saveProgress(newTotalXp, undefined, undefined, undefined);
      }

      setTimeout(() => {
        pickRandomBlitzQuestion();
      }, 800);
    } else {
      setStreak(0);
      playQuizWrong();
      const newLives = blitzLives - 1;
      setBlitzLives(newLives);

      if (newLives <= 0) {
        setBlitzFinished(true);
        setBlitzActive(false);
      } else {
        setTimeout(() => {
          pickRandomBlitzQuestion();
        }, 1100);
      }
    }
  };

  // Copy Trader Passport to Clipboard
  const handleCopyPassport = () => {
    playTactileClick();
    const totalStars = Object.values(completedStages).reduce((acc, curr) => acc + (curr.stars || 0), 0);
    const text = `🎮 EA BUDAK UBAT FOREX QUEST PASSPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Trader Rank: ${currentRank.badge} ${currentRank.title}
⚡ Total Experience: ${playerXp.toLocaleString()} XP
⭐ Mastery Stars: ${totalStars} Stars Earned
🔥 Max Streak: ${maxStreak} Correct in a Row
⚡ Blitz High Score: ${blitzHighScore.toLocaleString()} PTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Uji kefahaman & skill forex anda sekarang secara interaktif di:
👉 https://eabudakubat.com/learn`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPassport(true);
      setTimeout(() => setCopiedPassport(false), 3000);
    }
  };

  // Filter Codex
  const filteredCodex = CODEX_ENTRIES.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchCodex.toLowerCase()) ||
      item.category.toLowerCase().includes(searchCodex.toLowerCase()) ||
      item.rule.toLowerCase().includes(searchCodex.toLowerCase())
  );

  return (
    <div className="learn-page-container">
      {/* Confetti Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className={`confetti-canvas ${showConfetti ? "active" : ""}`}
      />

      {/* TOP NAVIGATION */}
      <nav className="learn-nav">
        <div className="container learn-nav-content">
          <div className="learn-nav-left">
            <Link href="/" className="learn-nav-brand">
              <span>⚡</span> EA Budak Ubat
            </Link>
            <span className="learn-badge">ACADEMY 🎮</span>
          </div>

          <div className="learn-nav-actions">
            <button
              onClick={handleToggleSound}
              className={`sound-toggle-btn ${soundActive ? "active" : ""}`}
              title={soundActive ? "Mute Cybernetic Audio" : "Enable Cybernetic Audio"}
            >
              {soundActive ? "🔊 Sound ON" : "🔇 Sound OFF"}
            </button>
            <Link href="/" className="btn btn-secondary btn-sm">
              ← Return to Hub
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO & TRADER HUD */}
      <header className="learn-hero">
        <div className="container">
          <div className="learn-hero-badge">
            <span className="pulsing-dot"></span>
            INTERACTIVE TRADING SIMULATION & QUIZ ARENA
          </div>
          <h1 className="learn-title">
            Forex Quest: <span className="gradient-text">Algorithmic Trader</span>
          </h1>
          <p className="learn-subtitle">
            Gamified masterclass in Forex physics, technical indicators, mathematical money management, and autonomous grid algorithms.
            Level up your trader passport, build streak multipliers, and conquer institutional quizzes!
          </p>

          {/* TRADER STATUS HUD PANEL */}
          <div className="trader-hud-panel">
            <div className="hud-rank-card">
              <div className="hud-badge-icon" style={{ borderColor: currentRank.color }}>
                {currentRank.badge}
              </div>
              <div className="hud-rank-meta">
                <span className="hud-label">TRADER RANK</span>
                <h3 className="hud-rank-title" style={{ color: currentRank.color }}>
                  {currentRank.title}
                </h3>
                <span className="hud-rank-desc">{currentRank.desc}</span>
              </div>
            </div>

            <div className="hud-stats-group">
              <div className="hud-stat-box">
                <span className="hud-stat-label">EXPERIENCE (XP)</span>
                <div className="hud-stat-value">
                  <span className="xp-number">{playerXp.toLocaleString()}</span>
                  <span className="xp-unit">XP</span>
                </div>
                <div className="xp-progress-bar-wrap">
                  <div
                    className="xp-progress-fill"
                    style={{ width: `${progressPct}%`, backgroundColor: currentRank.color }}
                  ></div>
                </div>
                <span className="xp-next-label">
                  {nextRank ? `${(nextRank.minXp - playerXp).toLocaleString()} XP to ${nextRank.title}` : "MAX RANK ACHIEVED 👑"}
                </span>
              </div>

              <div className="hud-stat-box">
                <span className="hud-stat-label">STREAK MULTIPLIER</span>
                <div className="hud-streak-value">
                  <span className="flame-icon">🔥</span>
                  <span className="streak-count">{streak}</span>
                  <span className="multiplier-badge">
                    {streak >= 5 ? "3.0x GODLIKE" : streak >= 3 ? "2.0x BOOST" : streak > 0 ? "1.2x COMBO" : "1.0x"}
                  </span>
                </div>
                <span className="xp-next-label">Personal Best: {maxStreak} in a row</span>
              </div>

              <div className="hud-stat-box">
                <span className="hud-stat-label">MASTERY PASSPORT</span>
                <div className="passport-action-wrap">
                  <button onClick={handleCopyPassport} className="btn-passport">
                    {copiedPassport ? "✓ Copied Card!" : "📋 Share Score Card"}
                  </button>
                </div>
                <span className="xp-next-label">
                  ⭐ {Object.values(completedStages).reduce((a, c) => a + (c.stars || 0), 0)} Stars Total
                </span>
              </div>
            </div>
          </div>

          {/* GAME MODE TABS */}
          <div className="game-mode-tabs">
            <button
              onClick={() => {
                playTactileClick();
                setActiveTab("quest");
              }}
              className={`mode-tab-btn ${activeTab === "quest" ? "active" : ""}`}
            >
              🗺️ Campaign Quest
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActiveTab("blitz");
              }}
              className={`mode-tab-btn ${activeTab === "blitz" ? "active" : ""}`}
            >
              ⚡ 60s Speed Blitz
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActiveTab("codex");
              }}
              className={`mode-tab-btn ${activeTab === "codex" ? "active" : ""}`}
            >
              📖 Forex Codex & Formulas
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          TAB 1: CAMPAIGN QUEST (WORLD MAP)
         ========================================== */}
      {activeTab === "quest" && (
        <main className="container quest-layout">
          {/* ACTIVE QUIZ MODAL / INLINE VIEW */}
          {activeStage && (
            <section className="active-quiz-section">
              <div className="quiz-card-wrapper">
                <div className="quiz-header">
                  <div className="quiz-header-meta">
                    <span className="quiz-badge">STAGE CHALLENGE</span>
                    <h2 className="quiz-title">{activeStage.title}</h2>
                  </div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setActiveStage(null);
                    }}
                    className="quiz-close-btn"
                  >
                    ✕ Close Stage
                  </button>
                </div>

                {/* MICRO-LESSON ACCORDION BEFORE QUESTIONS */}
                {stageQuestionIndex === 0 && !isAnswerRevealed && (
                  <div className="micro-lesson-card">
                    <div className="lesson-header">
                      <span className="lesson-icon">💡</span>
                      <h3>Briefing: Read Before You Answer</h3>
                    </div>
                    <p className="lesson-summary">{activeStage.lesson.summary}</p>
                    <ul className="lesson-points">
                      {activeStage.lesson.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    <div className="lesson-pro-tip">
                      <strong>PRO TIP:</strong> {activeStage.lesson.proTip}
                    </div>
                  </div>
                )}

                {!stageFinished ? (
                  <div className="quiz-body">
                    {/* PROGRESS BAR */}
                    <div className="question-progress-bar">
                      <div
                        className="question-progress-fill"
                        style={{
                          width: `${((stageQuestionIndex + 1) / activeStage.questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <div className="question-counter">
                      QUESTION {stageQuestionIndex + 1} OF {activeStage.questions.length}
                    </div>

                    <h3 className="question-text">
                      {activeStage.questions[stageQuestionIndex].q}
                    </h3>

                    {/* OPTIONS GRID */}
                    <div className="options-grid">
                      {activeStage.questions[stageQuestionIndex].options.map((opt, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = idx === activeStage.questions[stageQuestionIndex].correctIndex;
                        let btnClass = "option-btn";
                        if (isAnswerRevealed) {
                          if (isCorrect) btnClass += " correct";
                          else if (isSelected) btnClass += " incorrect";
                          else btnClass += " dimmed";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleQuestAnswer(idx)}
                            disabled={isAnswerRevealed}
                            className={btnClass}
                          >
                            <span className="option-index">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="option-text">{opt}</span>
                            {isAnswerRevealed && isCorrect && <span className="option-icon">✓</span>}
                            {isAnswerRevealed && isSelected && !isCorrect && <span className="option-icon">✗</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* RATIONALE & EXPLANATION */}
                    {isAnswerRevealed && (
                      <div
                        className={`explanation-card ${
                          selectedOption === activeStage.questions[stageQuestionIndex].correctIndex
                            ? "correct"
                            : "incorrect"
                        }`}
                      >
                        <div className="explanation-header">
                          <span>
                            {selectedOption === activeStage.questions[stageQuestionIndex].correctIndex
                              ? "🎯 EXCELLENT! CORRECT ANSWER"
                              : "⚠️ NOT QUITE. REVIEW THIS:"}
                          </span>
                        </div>
                        <p className="explanation-text">
                          {activeStage.questions[stageQuestionIndex].explanation}
                        </p>
                        <button onClick={handleNextQuestQuestion} className="btn btn-primary next-q-btn">
                          {stageQuestionIndex + 1 < activeStage.questions.length
                            ? "Next Question →"
                            : "View Stage Results →"}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* STAGE RESULT SCREEN */
                  <div className="stage-result-card">
                    <div className="result-stars">
                      {Array.from({ length: 3 }).map((_, i) => {
                        const isEarned =
                          i <
                          (stageScore === activeStage.questions.length
                            ? 3
                            : stageScore >= Math.ceil(activeStage.questions.length * 0.6)
                            ? 2
                            : 1);
                        return (
                          <span key={i} className={`star-item ${isEarned ? "earned" : "empty"}`}>
                            ⭐
                          </span>
                        );
                      })}
                    </div>
                    <h3 className="result-title">Stage Completed!</h3>
                    <p className="result-desc">
                      You scored {stageScore} out of {activeStage.questions.length} correct on this topic.
                    </p>
                    <div className="result-xp-awarded">
                      +{activeStage.xpReward} XP Earned
                    </div>
                    <button
                      onClick={() => {
                        playTactileClick();
                        setActiveStage(null);
                      }}
                      className="btn btn-primary"
                    >
                      Continue World Map →
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* WORLDS ROADMAP */}
          <div className="worlds-roadmap">
            {WORLDS.map((world) => (
              <section key={world.id} className="world-section">
                <div className="world-header">
                  <div className="world-header-left">
                    <div className="world-icon" style={{ borderColor: world.accent }}>
                      {world.icon}
                    </div>
                    <div>
                      <span className="world-number" style={{ color: world.accent }}>
                        WORLD 0{world.worldNum}
                      </span>
                      <h2 className="world-title">{world.title}</h2>
                      <p className="world-tagline">{world.tagline}</p>
                    </div>
                  </div>
                </div>

                <div className="stages-grid">
                  {world.stages.map((stage) => {
                    const status = completedStages[stage.id];
                    const stars = status?.stars || 0;
                    const isCompleted = stars > 0;

                    return (
                      <div
                        key={stage.id}
                        className={`stage-card ${isCompleted ? "completed" : ""}`}
                        onMouseEnter={() => playReticleLock(0.03)}
                      >
                        <div className="stage-top-meta">
                          <span className="stage-xp-tag">+{stage.xpReward} XP</span>
                          <div className="stage-stars">
                            {"⭐".repeat(stars)}
                            {"☆".repeat(3 - stars)}
                          </div>
                        </div>

                        <h3 className="stage-title">{stage.title}</h3>
                        <p className="stage-preview">{stage.lesson.summary.slice(0, 100)}...</p>

                        <div className="stage-bottom-action">
                          <button
                            onClick={() => startQuestStage(stage)}
                            className="btn-start-stage"
                          >
                            {isCompleted ? "🔄 Replay Quiz" : "▶ Start Challenge"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </main>
      )}

      {/* ==========================================
          TAB 2: 60-SECOND BLITZ MODE
         ========================================== */}
      {activeTab === "blitz" && (
        <main className="container blitz-layout">
          <div className="blitz-hero-card">
            {!blitzActive && !blitzFinished ? (
              <div className="blitz-start-screen">
                <div className="blitz-icon-header">⚡</div>
                <h2 className="blitz-heading">60-Second Institutional Speedrun</h2>
                <p className="blitz-desc">
                  Simulate high-pressure fast trading execution! Answer mixed questions from all 5 worlds as fast as you can.
                  Consecutive right answers trigger up to a <strong>3.0x GODLIKE score multiplier</strong>. 3 wrong answers ends your run!
                </p>

                <div className="blitz-high-score-banner">
                  <span>🏆 ALL-TIME BLITZ HIGH SCORE:</span>
                  <strong>{blitzHighScore.toLocaleString()} PTS</strong>
                </div>

                <button onClick={startBlitzGame} className="btn btn-primary btn-lg blitz-play-btn">
                  ⚡ Launch 60s Blitz Mode
                </button>
              </div>
            ) : blitzFinished ? (
              <div className="blitz-finished-screen">
                <div className="blitz-icon-header">{blitzLives <= 0 ? "💥" : "⏱️"}</div>
                <h2 className="blitz-heading">
                  {blitzLives <= 0 ? "Margin Call! Run Ended" : "Time's Up! Trading Session Closed"}
                </h2>
                <div className="blitz-final-score">
                  {blitzScore.toLocaleString()}
                  <span className="pts-label">POINTS</span>
                </div>
                <p className="blitz-finished-summary">
                  {blitzScore >= blitzHighScore
                    ? "🎉 NEW ALL-TIME PERSONAL RECORD! You dominated the speed challenge."
                    : `Solid run! You were ${(blitzHighScore - blitzScore).toLocaleString()} points shy of your record.`}
                </p>
                <div className="blitz-action-buttons">
                  <button onClick={startBlitzGame} className="btn btn-primary">
                    🔄 Play Again
                  </button>
                  <button onClick={handleCopyPassport} className="btn btn-secondary">
                    📋 Share Score
                  </button>
                </div>
              </div>
            ) : (
              <div className="blitz-active-arena">
                {/* BLITZ LIVE HUD */}
                <div className="blitz-live-hud">
                  <div className="blitz-timer-box">
                    <span className="blitz-hud-label">TIME REMAINING</span>
                    <span className={`blitz-timer-digit ${blitzTimeLeft <= 10 ? "urgent" : ""}`}>
                      {blitzTimeLeft}s
                    </span>
                  </div>

                  <div className="blitz-score-box">
                    <span className="blitz-hud-label">SCORE</span>
                    <span className="blitz-score-digit">{blitzScore.toLocaleString()}</span>
                  </div>

                  <div className="blitz-lives-box">
                    <span className="blitz-hud-label">SHIELDS</span>
                    <div className="blitz-lives-hearts">
                      {"❤️".repeat(blitzLives)}
                      {"🖤".repeat(3 - blitzLives)}
                    </div>
                  </div>
                </div>

                {/* CURRENT BLITZ QUESTION */}
                {blitzQuestion && (
                  <div className="blitz-question-card">
                    <div className="blitz-q-category">
                      {blitzQuestion.worldTitle} • {blitzQuestion.stageTitle}
                    </div>
                    <h3 className="blitz-q-text">{blitzQuestion.q}</h3>

                    <div className="blitz-options-grid">
                      {blitzQuestion.options.map((opt, idx) => {
                        const isSelected = blitzSelectedOption === idx;
                        const isCorrect = idx === blitzQuestion.correctIndex;
                        let btnStyle = "blitz-option-btn";
                        if (blitzRevealed) {
                          if (isCorrect) btnStyle += " correct";
                          else if (isSelected) btnStyle += " incorrect";
                          else btnStyle += " dimmed";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleBlitzAnswer(idx)}
                            disabled={blitzRevealed}
                            className={btnStyle}
                          >
                            <span className="opt-char">{String.fromCharCode(65 + idx)}</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ==========================================
          TAB 3: CODEX & FORMULA HANDBOOK
         ========================================== */}
      {activeTab === "codex" && (
        <main className="container codex-layout">
          <div className="codex-header">
            <div>
              <h2 className="codex-title">Forex Codex & Quantitative Cheat Sheet</h2>
              <p className="codex-subtitle">
                Instant reference for mathematical risk formulas, leverage calculations, and EA Budak Ubat parameters.
              </p>
            </div>
            <div className="codex-search-wrap">
              <input
                type="text"
                placeholder="Search formulas, RSI, pip values, margin..."
                value={searchCodex}
                onChange={(e) => setSearchCodex(e.target.value)}
                className="codex-search-input"
              />
            </div>
          </div>

          <div className="codex-grid">
            {filteredCodex.map((item, idx) => (
              <div key={idx} className="codex-card">
                <div className="codex-card-top">
                  <span className="codex-category">{item.category}</span>
                  <span className="codex-code">RULE.0{idx + 1}</span>
                </div>
                <h3 className="codex-topic">{item.topic}</h3>
                <div className="codex-formula-box">
                  <code>{item.formula}</code>
                </div>
                <p className="codex-rule-text">{item.rule}</p>
              </div>
            ))}
          </div>

          {/* DIRECT EA INTEGRATION CALLOUT */}
          <div className="codex-ea-callout">
            <div className="ea-callout-icon">🤖</div>
            <div className="ea-callout-content">
              <h3>Apply Your Knowledge with Automated Precision</h3>
              <p>
                Now that you grasp the mechanics of dynamic grids, RSI momentum filters, and trailing break-even pooling,
                test the flagship <strong>EA Budak Ubat v1.64</strong> directly on your MetaTrader 5 terminal.
              </p>
              <div className="ea-callout-buttons">
                <Link href="/ea-budak-ubat" className="btn btn-primary">
                  Explore EA Budak Ubat (v1.64)
                </Link>
                <a
                  href="https://www.mql5.com/en/market/product/195399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  🛒 Buy on MQL5 Market ($149)
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="learn-footer">
        <div className="container learn-footer-inner">
          <p>© {new Date().getFullYear()} EA Budak Ubat Academy. Automated Trading Education & Research.</p>
          <div className="learn-footer-links">
            <Link href="/">Hub</Link>
            <Link href="/guide">Guide</Link>
            <Link href="/changelog">Changelog</Link>
            <a href="https://eabudakubat.com" target="_blank" rel="noopener noreferrer">
              Official Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

