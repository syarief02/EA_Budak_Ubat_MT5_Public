-- ==============================================================================
-- MQL5 PRODUCTS SHOWCASE TABLE (live schema, applied 2026-10-31)
-- Project: EA Budak Ubat website Supabase project qthjikwteugfowlflkfi
--
-- The table already exists and holds the live storefront (24 products at creation,
-- loaded in one transaction from FALLBACK_PRODUCTS in ea-budak-ubat-web/app/api/products/route.js).
-- /api/products serves these rows; FALLBACK_PRODUCTS is only the backup if the database is down.
-- Do NOT re-run this file to "seed" data: add or update products through the MQL5 daily
-- generator (database/supabase_client.py publish) and keep FALLBACK_PRODUCTS identical.
-- ==============================================================================

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
    market_url TEXT,                       -- NULL for products not sold on MQL5 (site links the seller page)
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
    is_mql5 BOOLEAN NOT NULL DEFAULT true,  -- shows PRICE vs ACCESS on the cards
    has_page BOOLEAN NOT NULL DEFAULT false, -- links /<slug> instead of the MQL5 listing
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security: the public (anon key) may only read active products.
-- There is deliberately NO insert/update/delete policy for anon or authenticated users;
-- writes go through the generator's database login only.
ALTER TABLE public.mql_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon full access with anon key" ON public.mql_products;
DROP POLICY IF EXISTS "Public can view active mql_products" ON public.mql_products;
CREATE POLICY "Public can view active mql_products"
ON public.mql_products
FOR SELECT
USING (active = true);

-- Generator's internal catalog (not read by the website): RLS on, no policies.
CREATE TABLE IF NOT EXISTS public.mql_daily_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL UNIQUE,
    platform TEXT NOT NULL,
    product_type TEXT NOT NULL,
    strategy TEXT NOT NULL,
    price_lifetime NUMERIC(10,2) NOT NULL,
    price_rent_1m NUMERIC(10,2),
    price_rent_3m NUMERIC(10,2),
    price_rent_6m NUMERIC(10,2),
    price_rent_12m NUMERIC(10,2),
    source_path TEXT NOT NULL,
    commit_hash TEXT,
    validation_status TEXT DEFAULT 'PASSED',
    mql5_product_id TEXT,
    mql5_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.mql_daily_products ENABLE ROW LEVEL SECURITY;
