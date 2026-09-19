import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = (typeof rawUrl === 'string' && rawUrl.startsWith('http'))
  ? rawUrl
  : 'https://qthjikwteugfowlflkfi.supabase.co';

const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = (typeof rawKey === 'string' && rawKey.length > 20 && !rawKey.includes('{'))
  ? rawKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aGppa3d0ZXVnZm93bGZsa2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTg5OTUsImV4cCI6MjA4NzI5NDk5NX0.rQpfbsdJuFVcLjiGu0C9nsaL1Nh8G830p258pAfUrls';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

