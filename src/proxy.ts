import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseProxyClient } from "@/lib/supabase-proxy";
import { getSafeNextPath } from "@/lib/auth-redirect";

const PUBLIC_ROUTES = ["/", "/auth-error"];
const PUBLIC_PREFIXES = ["/delivery/accept/", "/api/", "/auth/callback"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.includes(pathname);
}

function roleHome(role: string | null): string {
  if (role === "admin" || role === "super_admin") return "/admin";
  return "/";
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createSupabaseProxyClient(request, response);
  const pathname = request.nextUrl.pathname;

  const { data, error } = await supabase.auth.getClaims();
  const claims = !error && data ? data.claims : null;

  if (isAuthPage(pathname)) {
    if (claims) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", claims.sub)
        .single();
      return NextResponse.redirect(
        new URL(roleHome(profile?.role ?? null), request.url)
      );
    }
    return response;
  }

  if (isPublicRoute(pathname)) {
    return response;
  }

  if (!claims) {
    const signInUrl = new URL("/sign-in", request.url);
    const next = getSafeNextPath(pathname + request.nextUrl.search);
    if (next) signInUrl.searchParams.set("next", next);
    return NextResponse.redirect(signInUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", claims.sub)
    .single();

  if (!profile) {
    console.error("MISSING_PROFILE", { userId: claims.sub, pathname });
    return NextResponse.redirect(new URL("/auth-error", request.url));
  }

  const role = profile.role;

  if (pathname.startsWith("/admin/functions")) {
    if (role !== "super_admin") {
      const target = role === "admin" ? "/admin" : "/";
      return NextResponse.redirect(new URL(target, request.url));
    }
  } else if (pathname.startsWith("/admin")) {
    if (role !== "admin" && role !== "super_admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
