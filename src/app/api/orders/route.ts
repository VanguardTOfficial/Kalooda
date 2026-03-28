import { NextRequest, NextResponse } from "next/server";
import { mockOrders } from "@/data/mock";

let orderCounter = mockOrders.length;

export async function GET() {
  return NextResponse.json(mockOrders);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    orderCounter++;
    const displayId = `ORD-${7720 + orderCounter}`;

    const useMock =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url";

    if (useMock) {
      const newOrder = {
        id: `order-${orderCounter}`,
        display_id: displayId,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        items: body.items,
        total_price: body.total_price,
        status: "pending" as const,
        created_at: new Date().toISOString(),
      };
      mockOrders.push(newOrder);
      return NextResponse.json(newOrder, { status: 201 });
    }

    const { supabaseAdmin } = await import("@/lib/supabase-server");
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        display_id: displayId,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        items: body.items,
        total_price: body.total_price,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
