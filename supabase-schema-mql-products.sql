-- ==============================================================================
-- SUPABASE MIGRATION: MQL5 PRODUCTS SHOWCASE TABLE
-- Project: EA Budak Ubat / Syarief Algorithmic Trading Systems
-- Instructions: Copy and paste this script into your Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. Create mql_products Table
CREATE TABLE IF NOT EXISTS public.mql_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT 'v1.00',
    category TEXT NOT NULL DEFAULT 'Expert Advisor',
    icon TEXT NOT NULL DEFAULT '🤖',
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    platforms JSONB NOT NULL DEFAULT '["MT5"]'::jsonb,
    target_assets TEXT NOT NULL DEFAULT 'Forex, Gold',
    market_url TEXT NOT NULL,
    mql5_product_id TEXT,
    price TEXT NOT NULL DEFAULT '$149 USD',
    rating NUMERIC(3,2) NOT NULL DEFAULT 5.00,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    badge TEXT NOT NULL DEFAULT 'Official MQL5',
    color TEXT NOT NULL DEFAULT '#00f0ff',
    download_url TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.mql_products ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: Anyone can view active products
DROP POLICY IF EXISTS "Public can view active mql_products" ON public.mql_products;
CREATE POLICY "Public can view active mql_products" 
ON public.mql_products 
FOR SELECT 
USING (active = true);

-- 4. RLS Policy: Anon/Authenticated can insert/update/delete (or restrict to service role / token)
DROP POLICY IF EXISTS "Allow anon full access with anon key" ON public.mql_products;
CREATE POLICY "Allow anon full access with anon key"
ON public.mql_products
FOR ALL
USING (true)
WITH CHECK (true);

-- 5. Seed Initial 6 Flagship Algorithmic Products
INSERT INTO public.mql_products (
    slug, name, version, category, icon, tagline, description, platforms, target_assets,
    market_url, mql5_product_id, price, rating, reviews_count, features, badge, color, download_url, active, display_order
)
VALUES
(
    'ea-budak-ubat',
    'EA Budak Ubat',
    'v1.67',
    'Grid Martingale',
    '📊',
    'Multi-Method Volatility-Adaptive Grid Martingale System',
    'Flagship multi-method automated grid EA featuring 4 analysis methods (Ichimoku, Alligator, Candle, SMA20), dynamic Average Daily Range (ADR) scaling, tick-by-tick Break-Even profit lock, and hard equity drawdown cutoff protection.',
    '["MT5", "MT4"]'::jsonb,
    'Forex Majors (EURUSD, GBPUSD), M5 Cent/Standard',
    'https://www.mql5.com/en/market/product/195399',
    '195399',
    '$149 USD',
    5.00,
    42,
    '["4 Analysis Methods (Ichimoku, Alligator, Candle, SMA20)", "Dynamic ADR AutoConfig AI", "Tick-by-Tick Basket Break-Even", "Hard Drawdown Cutoff Protection"]'::jsonb,
    '🔥 Flagship System',
    '#00f0ff',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.67%20-%20MT5%20-%2020260930.ex5',
    true,
    1
),
(
    'goldmind-ai',
    'GoldMind AI',
    'v1.01',
    'AI Neural / Gold Specialist',
    '🤖',
    'AI-Powered Real-Time XAUUSD Volatility Signal Engine',
    'Advanced machine-learning inspired momentum algorithm specifically tailored for XAUUSD (Gold). Filters high-impact volatility spikes with dynamic spread and slippage guards.',
    '["MT5"]'::jsonb,
    'XAUUSD (Gold), M5 / M15',
    'https://www.mql5.com/en/users/syarief.azman/seller',
    null,
    '$199 USD',
    5.00,
    19,
    '["Proprietary Gold Volatility Engine", "Dynamic ADR Momentum Filter", "Automatic Spread Guard", "Zero Martingale Risk Mode"]'::jsonb,
    '🪙 Gold Specialist',
    '#f59e0b',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/GoldMind%20AI%20v1.01%20-%20MT5%20-%2020260930.ex5',
    true,
    2
),
(
    'encik-moku',
    'Encik Moku',
    'v1.06',
    'Trend Following',
    '🏯',
    'Multi-Timeframe Ichimoku Kinko Hyo Trend Following EA',
    'Automated execution of the revered Japanese Ichimoku trading system with Tenkan-sen / Kijun-sen cross confirmation, Kumo cloud filtering, and Chikou Span trailing logic.',
    '["MT5", "MT4"]'::jsonb,
    'Trending Forex & JPY Pairs, M15 / H1',
    'https://www.mql5.com/en/users/syarief.azman/seller',
    null,
    '$129 USD',
    4.95,
    15,
    '["Full Tenkan/Kijun/Kumo Cloud Confluence", "Multi-Timeframe Trend Confirmation", "Chikou Span Trailing Guard", "Adaptive Position Scaling"]'::jsonb,
    '⚡ Trend Master',
    '#10b981',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Encik%20Moku%20v1.06%20-%20MT5%20-%2020260930.ex5',
    true,
    3
),
(
    'bracketblitz',
    'BracketBlitz EA',
    'v1.00',
    'News & Breakout',
    '⚡',
    'High-Impact Macro Economic Breakout & OCO Straddle EA',
    'High-frequency bracket straddle system engineered for macroeconomic news releases (CPI, NFP, Interest Rate decisions). Deploys microsecond pending stop orders before volatility strikes.',
    '["MT5", "MT4"]'::jsonb,
    'High-Volatility Indices & Major FX Pairs',
    'https://www.mql5.com/en/users/syarief.azman/seller',
    null,
    '$99 USD',
    4.90,
    11,
    '["Dual OCO Order Bracketing", "Microsecond Precision Order Placement", "Auto-Trail On Volatility Spike", "Zero Overnight Hold Risk"]'::jsonb,
    '🚀 News Volatility',
    '#a855f7',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/BracketBlitz%20v1.00%20-%20MT5%20-%2020260930.ex5',
    true,
    4
),
(
    'mathedge-pro',
    'MathEdge Pro',
    'v1.10',
    'Quantitative / Indices',
    '📐',
    'Mathematical Probability & Mean Reversion Index System',
    'Statistical arbitrage and mean-reversion algorithm designed specifically for US equity indices (US30, NAS100, SP500) using Gaussian distribution curves and volume-weighted price bands.',
    '["MT5", "MT4"]'::jsonb,
    'US30, NAS100, SP500 Indices, M15',
    'https://www.mql5.com/en/users/syarief.azman/seller',
    null,
    '$149 USD',
    4.92,
    14,
    '["Statistical Mean Reversion Algorithms", "Volume Weighted Price Action", "Dynamic Risk-to-Reward Optimizer", "Built for Equity Index Swings"]'::jsonb,
    '💎 Indices Specialist',
    '#3b82f6',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/MathEdge%20Pro%20v1.1%20-%20MT5%20-%2020260930.ex5',
    true,
    5
),
(
    'aligator-gozaimasu',
    'Aligator Gozaimasu',
    'v1.06',
    'Trend Following',
    '🐊',
    'Bill Williams 3-Line Alligator Momentum Hunter',
    'Captures massive macro trends using Bill Williams Alligator lines (Jaw, Teeth, Lips) combined with fractal breakout validation and adaptive sleep/awake cycle filtering.',
    '["MT5", "MT4"]'::jsonb,
    'Forex Majors & Crypto Pairs, M15 / H1',
    'https://www.mql5.com/en/users/syarief.azman/seller',
    null,
    '$99 USD',
    4.88,
    8,
    '["Jaw, Teeth & Lips Confluence Trigger", "Fractal Breakout Confirmation", "Sleep/Awake Cycle Market Filtering", "Trailing Profit Lock"]'::jsonb,
    '🐊 Momentum Hunter',
    '#06b6d4',
    'https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Aligator%20Gozaimasu%20v1.06%20-%20MT5%20-%2020260930.ex5',
    true,
    6
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    version = EXCLUDED.version,
    category = EXCLUDED.category,
    icon = EXCLUDED.icon,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    platforms = EXCLUDED.platforms,
    target_assets = EXCLUDED.target_assets,
    market_url = EXCLUDED.market_url,
    mql5_product_id = EXCLUDED.mql5_product_id,
    price = EXCLUDED.price,
    rating = EXCLUDED.rating,
    reviews_count = EXCLUDED.reviews_count,
    features = EXCLUDED.features,
    badge = EXCLUDED.badge,
    color = EXCLUDED.color,
    download_url = EXCLUDED.download_url,
    active = EXCLUDED.active,
    display_order = EXCLUDED.display_order,
    updated_at = now();

