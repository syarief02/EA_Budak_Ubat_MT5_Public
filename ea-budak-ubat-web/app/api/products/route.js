import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Built-in fallback catalog ensuring 100% uptime even before the database table is populated
const FALLBACK_PRODUCTS = [
  {
    id: 'ea-budak-ubat',
    slug: 'ea-budak-ubat',
    name: 'EA Budak Ubat',
    version: 'v1.67',
    category: 'Grid Martingale',
    icon: '📊',
    tagline: 'Multi-Method Volatility-Adaptive Grid Martingale System',
    description: 'Flagship multi-method automated grid EA featuring 4 analysis methods (Ichimoku, Alligator, Candle, SMA20), dynamic Average Daily Range (ADR) scaling, tick-by-tick Break-Even profit lock, and hard equity drawdown cutoff protection.',
    platforms: ['MT5', 'MT4'],
    target_assets: 'Forex Majors (EURUSD, GBPUSD), M5 Cent/Standard',
    market_url: 'https://www.mql5.com/en/market/product/195399',
    mql5_product_id: '195399',
    price: '$149 USD',
    rating: 5.0,
    reviews_count: 42,
    features: [
      '4 Analysis Methods (Ichimoku, Alligator, Candle, SMA20)',
      'Dynamic ADR AutoConfig AI',
      'Tick-by-Tick Basket Break-Even',
      'Hard Drawdown Cutoff Protection',
    ],
    badge: '🔥 Flagship System',
    color: '#00f0ff',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.67%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 1,
  },
  {
    id: 'goldmind-ai',
    slug: 'goldmind-ai',
    name: 'GoldMind AI',
    version: 'v1.01',
    category: 'AI Neural / Gold Specialist',
    icon: '🤖',
    tagline: 'AI-Powered Real-Time XAUUSD Volatility Signal Engine',
    description: 'Advanced machine-learning inspired momentum algorithm specifically tailored for XAUUSD (Gold). Filters high-impact volatility spikes with dynamic spread and slippage guards.',
    platforms: ['MT5'],
    target_assets: 'XAUUSD (Gold), M5 / M15',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$199 USD',
    rating: 5.0,
    reviews_count: 19,
    features: [
      'Proprietary Gold Volatility Engine',
      'Dynamic ADR Momentum Filter',
      'Automatic Spread Guard',
      'Zero Martingale Risk Mode',
    ],
    badge: '🪙 Gold Specialist',
    color: '#f59e0b',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/GoldMind%20AI%20v1.01%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 2,
  },
  {
    id: 'encik-moku',
    slug: 'encik-moku',
    name: 'Encik Moku',
    version: 'v1.06',
    category: 'Trend Following',
    icon: '🏯',
    tagline: 'Multi-Timeframe Ichimoku Kinko Hyo Trend Following EA',
    description: 'Automated execution of the revered Japanese Ichimoku trading system with Tenkan-sen / Kijun-sen cross confirmation, Kumo cloud filtering, and Chikou Span trailing logic.',
    platforms: ['MT5', 'MT4'],
    target_assets: 'Trending Forex & JPY Pairs, M15 / H1',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$129 USD',
    rating: 4.95,
    reviews_count: 15,
    features: [
      'Full Tenkan/Kijun/Kumo Cloud Confluence',
      'Multi-Timeframe Trend Confirmation',
      'Chikou Span Trailing Guard',
      'Adaptive Position Scaling',
    ],
    badge: '⚡ Trend Master',
    color: '#10b981',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Encik%20Moku%20v1.06%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 3,
  },
  {
    id: 'bracketblitz',
    slug: 'bracketblitz',
    name: 'BracketBlitz EA',
    version: 'v1.00',
    category: 'News & Breakout',
    icon: '⚡',
    tagline: 'High-Impact Macro Economic Breakout & OCO Straddle EA',
    description: 'High-frequency bracket straddle system engineered for macroeconomic news releases (CPI, NFP, Interest Rate decisions). Deploys microsecond pending stop orders before volatility strikes.',
    platforms: ['MT5', 'MT4'],
    target_assets: 'High-Volatility Indices & Major FX Pairs',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$99 USD',
    rating: 4.9,
    reviews_count: 11,
    features: [
      'Dual OCO Order Bracketing',
      'Microsecond Precision Order Placement',
      'Auto-Trail On Volatility Spike',
      'Zero Overnight Hold Risk',
    ],
    badge: '🚀 News Volatility',
    color: '#a855f7',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/BracketBlitz%20v1.00%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 4,
  },
  {
    id: 'mathedge-pro',
    slug: 'mathedge-pro',
    name: 'MathEdge Pro',
    version: 'v1.10',
    category: 'Quantitative / Indices',
    icon: '📐',
    tagline: 'Mathematical Probability & Mean Reversion Index System',
    description: 'Statistical arbitrage and mean-reversion algorithm designed specifically for US equity indices (US30, NAS100, SP500) using Gaussian distribution curves and volume-weighted price bands.',
    platforms: ['MT5', 'MT4'],
    target_assets: 'US30, NAS100, SP500 Indices, M15',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$149 USD',
    rating: 4.92,
    reviews_count: 14,
    features: [
      'Statistical Mean Reversion Algorithms',
      'Volume Weighted Price Action',
      'Dynamic Risk-to-Reward Optimizer',
      'Built for Equity Index Swings',
    ],
    badge: '💎 Indices Specialist',
    color: '#3b82f6',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/MathEdge%20Pro%20v1.1%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 5,
  },
  {
    id: 'aligator-gozaimasu',
    slug: 'aligator-gozaimasu',
    name: 'Aligator Gozaimasu',
    version: 'v1.06',
    category: 'Trend Following',
    icon: '🐊',
    tagline: 'Bill Williams 3-Line Alligator Momentum Hunter',
    description: 'Captures massive macro trends using Bill Williams Alligator lines (Jaw, Teeth, Lips) combined with fractal breakout validation and adaptive sleep/awake cycle filtering.',
    platforms: ['MT5', 'MT4'],
    target_assets: 'Forex Majors & Crypto Pairs, M15 / H1',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$99 USD',
    rating: 4.88,
    reviews_count: 8,
    features: [
      'Jaw, Teeth & Lips Confluence Trigger',
      'Fractal Breakout Confirmation',
      'Sleep/Awake Cycle Market Filtering',
      'Trailing Profit Lock',
    ],
    badge: '🐊 Momentum Hunter',
    color: '#06b6d4',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Aligator%20Gozaimasu%20v1.06%20-%20MT5%20-%2020260930.ex5',
    active: true,
    display_order: 6,
  },
  {
    id: 'stratos-momentum-engine',
    slug: 'stratos-momentum-engine',
    name: 'Stratos Momentum Engine',
    version: 'v1.00',
    category: 'Momentum Breakout',
    icon: '🚀',
    tagline: 'Multi-Timeframe Momentum Breakout Engine',
    description: 'Multi-timeframe algorithmic breakout engine combining H1 Linear Regression slope direction filter, M15 Stochastic oscillator crossover entry timing, Donchian Channel breakout confirmation, and Chandelier ATR trailing stop protection.',
    platforms: ['MT5'],
    target_assets: 'Major FX Pairs, Gold (XAUUSD), Indices, M15/H1',
    market_url: 'https://www.mql5.com/en/users/syarief.azman/seller',
    mql5_product_id: null,
    price: '$149 USD',
    rating: 5.0,
    reviews_count: 0,
    features: [
      'H1 Linear Regression Slope Filter',
      'M15 Stochastic Entry Momentum Timing',
      'Donchian Channel Breakout Confirmation',
      'Chandelier Dynamic ATR Trailing Stop',
    ],
    badge: '🚀 Momentum Breakout',
    color: '#ec4899',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/Stratos_Momentum_Engine.ex5',
    active: true,
    display_order: 7,
  },
  {
    id: 'aegis-risk-sentinel',
    slug: 'aegis-risk-sentinel',
    name: 'Aegis Risk Sentinel',
    version: 'v1.00',
    category: 'Risk Management / Utility',
    icon: '🛡️',
    tagline: 'Real-Time Portfolio Equity Sentinel & Emergency HUD Console',
    description: 'Institutional-grade risk governance and equity protection utility running on an optimized 250ms timer with tick-by-tick monitoring. Enforces daily loss ceilings, maximum drawdown cutoffs, weakest position disposal, and emergency panic liquidation.',
    platforms: ['MT5'],
    target_assets: 'All Symbols & Accounts (Prop Firm & Standard)',
    market_url: 'https://www.mql5.com/en/market/product/196617',
    mql5_product_id: '196617',
    price: '$79 USD',
    rating: 5.0,
    reviews_count: 3,
    features: [
      'Real-Time 250ms Equity Sentinel Engine',
      'Midnight Daily Loss Ceiling Auto-Rollover',
      'Interactive Dark HUD with Panic Close Controls',
      'Basket Equity Trailing & Profit Lock',
    ],
    badge: '🛡️ Risk Governance',
    color: '#14b8a6',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/Aegis_Risk_Sentinel.ex5',
    active: true,
    display_order: 8,
  },
  {
    id: 'spectra-trend-ribbon',
    slug: 'spectra-trend-ribbon',
    name: 'Spectra Trend Ribbon',
    version: 'v1.00',
    category: 'Trend & Volatility Indicator',
    icon: '🌈',
    tagline: 'Adaptive Baseline & Dynamic ATR Volatility Envelope Indicator',
    description: 'High-performance trend direction and volatility expansion indicator combining a triple-smoothed adaptive baseline, dynamic Average True Range (ATR) envelope bands, and momentum breakout arrows to detect trend continuations emerging from low-volatility squeezes.',
    platforms: ['MT5'],
    target_assets: 'Forex Majors, Indices (US30, NAS100), XAUUSD',
    market_url: 'https://www.mql5.com/en/market/product/196540',
    mql5_product_id: '196540',
    price: '$99 USD',
    rating: 5.0,
    reviews_count: 5,
    features: [
      'Triple-Smoothed Adaptive Baseline',
      'Dynamic ATR Volatility Envelope Bands',
      'Multi-Color Bullish & Bearish Breakout Arrows',
      'Differential OnCalculate Optimization (Zero Lag)',
    ],
    badge: '🌈 Trend & Volatility',
    color: '#8b5cf6',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/Spectra_Trend_Ribbon.ex5',
    active: true,
    display_order: 9,
  },
  {
    id: 'apex-flow-reversion',
    slug: 'apex-flow-reversion',
    name: 'Apex Flow Reversion',
    version: 'v1.00',
    category: 'Mean Reversion',
    icon: '🌊',
    tagline: 'VWAP Statistical Envelope Mean Reversion Expert Advisor',
    description: 'Intraday mean-reversion algorithmic trading system monitoring statistical price dispersion relative to an intraday Volume-Weighted Average Price (VWAP) anchor. Filters entries using standard deviation envelope bands, RSI exhaustion, and ATR volatility floor checks.',
    platforms: ['MT4'],
    target_assets: 'EURUSD, GBPUSD, USDJPY, AUDUSD, M15/M30',
    market_url: 'https://www.mql5.com/en/market/product/196439',
    mql5_product_id: '196439',
    price: '$149 USD',
    rating: 5.0,
    reviews_count: 7,
    features: [
      'Dynamic Intraday VWAP Statistical Anchor',
      'Standard Deviation Envelope Bands',
      'RSI Momentum Exhaustion Filter',
      'Automated Break-Even & ATR Trailing Stop',
    ],
    badge: '🌊 VWAP Reversion',
    color: '#0ea5e9',
    download_url: 'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/Apex_Flow_Reversion.ex4',
    active: true,
    display_order: 10,
  },
];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('mql_products')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return NextResponse.json(
        { success: true, source: 'supabase', products: data },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
          },
        }
      );
    }

    // Return fallback catalog if table does not exist or has 0 rows
    return NextResponse.json(
      { success: true, source: 'fallback', products: FALLBACK_PRODUCTS },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: true, source: 'fallback', products: FALLBACK_PRODUCTS },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Authenticate creator/admin passkey
    const creatorPass = process.env.ADMIN_COMMENT_TOKEN || 'eabudakubat-secure-2026';
    if (!body.admin_token || body.admin_token !== creatorPass) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid admin_token required to publish or update MQL products.' },
        { status: 403 }
      );
    }

    if (!body.name || !body.slug || !body.market_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug, and market_url are mandatory.' },
        { status: 400 }
      );
    }

    const payload = {
      slug: String(body.slug).trim().toLowerCase(),
      name: String(body.name).trim(),
      version: String(body.version || 'v1.00').trim(),
      category: String(body.category || 'Expert Advisor').trim(),
      icon: String(body.icon || '🤖').trim(),
      tagline: String(body.tagline || '').trim(),
      description: String(body.description || '').trim(),
      platforms: Array.isArray(body.platforms) ? body.platforms : ['MT5'],
      target_assets: String(body.target_assets || 'Forex').trim(),
      market_url: String(body.market_url).trim(),
      mql5_product_id: body.mql5_product_id ? String(body.mql5_product_id).trim() : null,
      price: String(body.price || '$149 USD').trim(),
      rating: Number(body.rating) || 5.0,
      reviews_count: Number(body.reviews_count) || 0,
      features: Array.isArray(body.features) ? body.features : [],
      badge: String(body.badge || 'Official MQL5').trim(),
      color: String(body.color || '#00f0ff').trim(),
      download_url: body.download_url ? String(body.download_url).trim() : null,
      active: body.active !== false,
      display_order: Number(body.display_order) || 10,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('mql_products')
      .upsert([payload], { onConflict: 'slug' })
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data?.[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to process product publish request.' }, { status: 500 });
  }
}

