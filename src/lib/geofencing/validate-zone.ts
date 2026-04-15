import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const coordinateSchema = z.object({
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180),
});

export type Coordinates = z.infer<typeof coordinateSchema>;

export async function isLocationInDeliveryZone(
  lat: number,
  lng: number
): Promise<boolean> {
  const parsed = coordinateSchema.safeParse({ lat, lng });
  if (!parsed.success) return false;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.rpc(
    "is_point_in_active_delivery_zone",
    {
      p_lat: parsed.data.lat,
      p_lng: parsed.data.lng,
    }
  );

  if (error) {
    console.error("Delivery zone check failed:", error);
    throw error;
  }

  return Boolean(data);
}
