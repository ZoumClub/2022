import { z } from 'zod';

const envSchema = z.object({
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string().min(1),
  }),
  app: z.object({
    url: z.string().url(),
    env: z.enum(['development', 'production', 'test']).default('development'),
  }),
});

// Parse environment variables
export const env = envSchema.parse({
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL,
    env: process.env.NODE_ENV,
  },
});

// Export individual configs
export const supabaseConfig = {
  url: env.supabase.url,
  anonKey: env.supabase.anonKey,
};

export const appConfig = {
  url: env.app.url,
  env: env.app.env,
  isDev: env.app.env === 'development',
  isProd: env.app.env === 'production',
  isTest: env.app.env === 'test',
};