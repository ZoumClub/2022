import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/lib/config/env';
import type { Database } from './types';

if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.');
}

// Create Supabase client
export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Export helper functions
export const auth = supabase.auth;
export const storage = supabase.storage;
export const from = supabase.from;