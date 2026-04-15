import { NextRequest, NextResponse } from "next/server";
import {
  coordinateSchema,
  isLocationInDeliveryZone,
} from "@/lib/geofencing/validate-zone";

const DELIVERY_ZONE_BLOCKED_MESSAGE =
  "We don't deliver to this location yet / نحن لا نوصل لهذا الموقع بعد";

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get("lat"));
  const lng = Number(req.nextUrl.searchParams.get("lng"));
  const parsed = coordinateSchema.safeParse({ lat, lng });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid coordinates", deliverable: false },
      { status: 400 }
    );
  }

  try {
    const deliverable = await isLocationInDeliveryZone(
      parsed.data.lat,
      parsed.data.lng
    );
    return NextResponse.json({
      deliverable,
      error: deliverable ? null : DELIVERY_ZONE_BLOCKED_MESSAGE,
    });
  } catch (err) {
    console.error("Delivery zone check endpoint failed:", err);
    return NextResponse.json(
      { error: "Failed to validate delivery zone", deliverable: false },
      { status: 500 }
    );
  }
}
