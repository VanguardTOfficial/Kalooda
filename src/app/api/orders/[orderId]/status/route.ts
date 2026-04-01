import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { requireRole, isAuthorized } from "@/lib/require-role";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const { status } = await req.json();
    const token = req.nextUrl.searchParams.get("token");

    const validStatuses = ["pending", "preparing", "out_for_delivery"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (token) {
      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("delivery_token")
        .eq("id", orderId)
        .single();

      if (!order || order.delivery_token !== token) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      const authResult = await requireRole(req, ["admin", "super_admin"]);
      if (!isAuthorized(authResult)) return authResult;
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error("Update order status error:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
