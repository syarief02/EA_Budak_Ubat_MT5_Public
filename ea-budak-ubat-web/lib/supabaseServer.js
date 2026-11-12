import { createClient } from '@supabase/supabase-js';
import { supabase as anonClient, supabaseUrl, supabaseAnonKey } from '@/lib/supabase';

// Server-only client for API routes. Never import this from a client component.
//
// The anon key is public, so the comments table must not accept inserts from anyone who holds it. RLS on
// public.comments only lets an insert through when the request carries an `x-comments-key` header equal to the
// secret stored in the database (private.app_settings, checked by private.comments_insert_allowed()).
// Only this server knows the value, from COMMENTS_INSERT_KEY in the Vercel environment (a plain server variable,
// never NEXT_PUBLIC_), so every post has to go through /api/comments and its checks (honeypot, limits,
// reserved names). Without the variable this is the plain anon client.
// Trimmed because a value piped into `vercel env add` can keep a trailing newline, which is not a valid header value.
const insertKey = (process.env.COMMENTS_INSERT_KEY || '').trim();

export const supabaseServer =
  insertKey.length >= 32
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { 'x-comments-key': insertKey } },
      })
    : anonClient;
