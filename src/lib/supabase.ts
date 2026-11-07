import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Cookie storage adapter so Supabase session tokens are accessible by Next.js cookies
const cookieStorage =
  typeof window !== "undefined"
    ? {
        getItem: (key: string) => {
          const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
          return match ? decodeURIComponent(match[2]) : null;
        },
        setItem: (key: string, value: string) => {
          document.cookie = `${key}=${encodeURIComponent(
            value
          )}; path=/; max-age=604800; SameSite=Lax`;
        },
        removeItem: (key: string) => {
          document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`;
        },
      }
    : undefined;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: cookieStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
