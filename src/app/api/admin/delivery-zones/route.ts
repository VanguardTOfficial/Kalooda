import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole, isAuthorized } from "@/lib/require-role";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const updateDeliveryZoneSchema = z.object({
  id: z.string().uuid(),
  is_active: z.boolean(),
});

export async function GET(req: NextRequest) {
  const authResult = await requireRole(req, ["super_admin"]);
  if (!isAuthorized(authResult)) return authResult;

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("delivery_zones")
      .select("id, name_en, name_ar, is_active, created_at, updated_at")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Admin list delivery zones error:", err);
    return NextResponse.json(
      { error: "Failed to fetch delivery zones" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await requireRole(req, ["super_admin"]);
  if (!isAuthorized(authResult)) return authResult;

  try {
    const body = await req.json();
    const parsed = updateDeliveryZoneSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("delivery_zones")
      .update({ is_active: parsed.data.is_active })
      .eq("id", parsed.data.id)
      .select("id, name_en, name_ar, is_active, created_at, updated_at")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin update delivery zone error:", err);
    return NextResponse.json(
      { error: "Failed to update delivery zone" },
      { status: 500 }
    );
  }
}
