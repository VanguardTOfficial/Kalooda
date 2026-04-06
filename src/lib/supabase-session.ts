import type { CookieOptionsWithName } from "@supabase/ssr";

export type AuthAudience = "customer" | "admin";

/**
 * Subdomain ref from NEXT_PUBLIC_SUPABASE_URL (e.g. mxbnmoagdufitnwrmsrn from
 * https://mxbnmoagdufitnwrmsrn.supabase.co). Keeps session cookies tied to one
 * Supabase project so JWTs from a previous region/project are not sent after migration.
 */
function supabaseProjectRefFromUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return "unknown";
  try {
    const host = new URL(raw).hostname;
    const sub = host.split(".")[0];
    return sub && sub.length > 0 ? sub : "unknown";
  } catch {
    return "unknown";
  }
}

const projectRef = supabaseProjectRefFromUrl();

/** Distinct storage/cookie namespaces so storefront and admin sessions do not clobber each other. */
export const CUSTOMER_AUTH_COOKIE_NAME = `sb-customer-auth-${projectRef}`;
export const ADMIN_AUTH_COOKIE_NAME = `sb-admin-auth-${projectRef}`;

export const customerAuthCookieOptions: CookieOptionsWithName = {
  name: CUSTOMER_AUTH_COOKIE_NAME,
};

export const adminAuthCookieOptions: CookieOptionsWithName = {
  name: ADMIN_AUTH_COOKIE_NAME,
};

export function parseAuthAudience(
  raw: string | null | undefined
): AuthAudience | null {
  if (raw === "customer" || raw === "admin") return raw;
  return null;
}
