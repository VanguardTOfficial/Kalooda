import { createBrowserClient } from "@supabase/ssr";
import { adminAuthCookieOptions } from "@/lib/supabase-session";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseAdminBrowser() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        isSingleton: false,
        cookieOptions: adminAuthCookieOptions,
        auth: {
          // Avoid Web Locks "stolen" errors when getUser / onAuthStateChange / refresh overlap (e.g. Strict Mode, dev).
          lock: async <R>(_name: string, _acquireTimeout: number, fn: () => Promise<R>) =>
            fn(),
        },
      }
    );
  }
  return client;
}
