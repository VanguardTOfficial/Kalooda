import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

type AuthResult =
  | { authorized: true; userId: string }
  | NextResponse;

export async function requireRole(
  request: NextRequest,
  allowedRoles: ("admin" | "super_admin")[]
): Promise<AuthResult> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Route handlers cannot set cookies on the incoming request;
          // the proxy handles token refresh.
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) {
    console.error("MISSING_PROFILE_API", { userId: user.id, path: request.nextUrl.pathname });
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (!allowedRoles.includes(profile.role as "admin" | "super_admin")) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return { authorized: true, userId: user.id };
}

export function isAuthorized(
  result: AuthResult
): result is { authorized: true; userId: string } {
  return "authorized" in result && result.authorized === true;
}
