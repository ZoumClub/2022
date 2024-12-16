import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';
import type { Database } from './types';

if (!env.supabase.url || !env.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);