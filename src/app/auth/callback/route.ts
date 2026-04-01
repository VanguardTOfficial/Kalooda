import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSafeNextPath } from "@/lib/auth-redirect";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = getSafeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const defaultTarget =
          profile?.role === "admin" || profile?.role === "super_admin"
            ? "/admin"
            : "/";
        const target = next ?? defaultTarget;

        return NextResponse.redirect(new URL(target, origin));
      }
    }
  }

  return NextResponse.redirect(
    new URL("/sign-in?error=oauth", request.url)
  );
}
