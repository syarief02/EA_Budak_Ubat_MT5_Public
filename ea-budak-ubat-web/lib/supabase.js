import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qthjikwteugfowlflkfi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aGppa3d0ZXVnZm93bGZsa2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTg5OTUsImV4cCI6MjA4NzI5NDk5NX0.rQpfbsdJuFVcLjiGu0C9nsaL1Nh8G830p258pAfUrls';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
