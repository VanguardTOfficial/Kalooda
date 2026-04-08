import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { requireRole, isAuthorized } from "@/lib/require-role";

export async function GET(req: NextRequest) {
  const authResult = await requireRole(req, ["admin", "super_admin"]);
  if (!isAuthorized(authResult)) return authResult;

  try {
    const { data: customers, error } = await supabaseAdmin
      .from("profiles")
      .select("id, role, full_name, phone, preferred_language, delivery_address")
      .eq("role", "customer")
      .order("full_name", { ascending: true });

    if (error) throw error;
    const customerIds = (customers ?? []).map((customer) => customer.id);
    if (customerIds.length === 0) return NextResponse.json([]);

    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("id, user_id, display_id, total_price, status, created_at")
      .in("user_id", customerIds)
      .order("created_at", { ascending: false });

    if (ordersError) throw ordersError;

    const orderCountByCustomer = new Map<string, number>();
    const recentOrdersByCustomer = new Map<string, {
      id: string;
      display_id: string;
      total_price: number;
      status: string;
      created_at: string;
    }[]>();

    for (const order of orders ?? []) {
      if (!order.user_id) continue;
      orderCountByCustomer.set(order.user_id, (orderCountByCustomer.get(order.user_id) ?? 0) + 1);
      if (!recentOrdersByCustomer.has(order.user_id)) {
        recentOrdersByCustomer.set(order.user_id, []);
      }
      const recent = recentOrdersByCustomer.get(order.user_id);
      if (!recent || recent.length >= 3) continue;
      recent.push({
        id: order.id,
        display_id: order.display_id,
        total_price: order.total_price,
        status: order.status,
        created_at: order.created_at,
      });
    }

    const payload = (customers ?? []).map((customer) => ({
      ...customer,
      order_count: orderCountByCustomer.get(customer.id) ?? 0,
      recent_orders: recentOrdersByCustomer.get(customer.id) ?? [],
    }));

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Fetch customers error:", err);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
