import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create the client with placeholders if env vars are missing during build.
// This prevents the "Supabase URL and Anon Key are required" error during Vercel build.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utility to verify if Supabase is properly configured.
 * Call this before sensitive operations if needed.
 */
export const isSupabaseConfigured = () => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};
