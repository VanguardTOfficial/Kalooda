import { NextResponse, type NextRequest } from "next/server";

/** Cookie names used before project-ref suffixing (Tokyo-era sessions). */
const LEGACY_AUTH_COOKIE = /^(sb-customer-auth|sb-admin-auth)(\.\d+)?$/;

export function expireLegacyUnscopedAuthCookies(
  request: NextRequest,
  res: NextResponse
) {
  for (const { name } of request.cookies.getAll()) {
    if (LEGACY_AUTH_COOKIE.test(name)) {
      res.cookies.set(name, "", { maxAge: 0, path: "/", sameSite: "lax" });
    }
  }
}

export function redirectWithLegacyCookiePurge(
  request: NextRequest,
  url: URL
): NextResponse {
  const res = NextResponse.redirect(url);
  expireLegacyUnscopedAuthCookies(request, res);
  return res;
}
