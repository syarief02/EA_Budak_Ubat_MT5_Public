import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// The fallback catalog lives in lib/productsFallback.js (route files may only export handlers).
import { FALLBACK_PRODUCTS } from '@/lib/productsFallback';


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
    // No fallback token: this repo is public. Without ADMIN_COMMENT_TOKEN in the environment the route refuses all writes.
    const creatorPass = process.env.ADMIN_COMMENT_TOKEN;
    if (!creatorPass || !body.admin_token || body.admin_token !== creatorPass) {
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
      // Must match the mql_products_product_type_check constraint; anything else is stored as NULL.
      product_type: ['Expert Advisor', 'Indicator', 'Utility', 'Library'].includes(body.product_type)
        ? body.product_type
        : null,
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

