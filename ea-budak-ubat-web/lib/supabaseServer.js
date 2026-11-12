import { createClient } from '@supabase/supabase-js';
import { supabase as anonClient, supabaseUrl } from '@/lib/supabase';

// Server-only client for API routes. Never import this from a client component.
//
// With SUPABASE_SERVICE_ROLE_KEY set in the Vercel environment (a plain server variable, never NEXT_PUBLIC_),
// /api/comments writes as the service role. The comments table's RLS can then refuse anon inserts, so nobody
// can skip the route's checks (honeypot, limits, reserved names) by calling Supabase with the public anon key.
// Without the variable this falls back to the anon client, which is how the site worked before.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseServer =
  typeof serviceKey === 'string' && serviceKey.length > 20
    ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
    : anonClient;

export const usingServiceRole = supabaseServer !== anonClient;
