import type { TranslationKey } from "@/lib/translations";

export const ORDER_STATUSES = [
  "pending",
  "preparing",
  "out_for_delivery",
  "ready_for_pickup",
  "completed",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type FulfillmentType = "delivery" | "pickup";

const DELIVERY_FLOW: OrderStatus[] = [
  "pending",
  "preparing",
  "out_for_delivery",
  "completed",
];

const PICKUP_FLOW: OrderStatus[] = [
  "pending",
  "preparing",
  "ready_for_pickup",
  "completed",
];

export function orderStatusFlow(fulfillment: FulfillmentType): OrderStatus[] {
  return fulfillment === "delivery" ? DELIVERY_FLOW : PICKUP_FLOW;
}

export function isValidStatusForFulfillment(
  status: OrderStatus,
  fulfillment: FulfillmentType
): boolean {
  return orderStatusFlow(fulfillment).includes(status);
}

/** Admin: forward-only along the fulfillment chain; no edits after completed. */
export function canAdminSetStatus(params: {
  from: OrderStatus;
  to: OrderStatus;
  fulfillment: FulfillmentType;
}): boolean {
  const { from, to, fulfillment } = params;
  if (from === "completed") return false;
  if (from === to) return true;
  if (!isValidStatusForFulfillment(to, fulfillment)) return false;

  const flow = orderStatusFlow(fulfillment);
  const iFrom = flow.indexOf(from);
  const iTo = flow.indexOf(to);

  if (iFrom === -1) {
    return true;
  }
  return iTo > iFrom;
}

/** Driver magic-link: unchanged — only pending → preparing. */
export function canTokenSetStatus(
  from: OrderStatus,
  to: OrderStatus
): boolean {
  return from === "pending" && to === "preparing";
}

export function adminSelectableStatuses(params: {
  current: OrderStatus;
  fulfillment: FulfillmentType;
}): OrderStatus[] {
  const { current, fulfillment } = params;
  const flow = orderStatusFlow(fulfillment);
  const i = flow.indexOf(current);
  if (current === "completed") {
    return ["completed"];
  }
  if (i === -1) {
    return [...flow];
  }
  return flow.slice(i);
}

export function orderStatusTranslationKey(params: {
  status: OrderStatus;
  fulfillment_type?: FulfillmentType | null;
}): TranslationKey {
  const { status, fulfillment_type } = params;
  const ft: FulfillmentType =
    fulfillment_type === "pickup" ? "pickup" : "delivery";

  if (status === "completed") {
    return ft === "delivery"
      ? "orderStatusDelivered"
      : "orderStatusCompletedPickup";
  }
  if (status === "ready_for_pickup") {
    return "readyForPickup";
  }
  if (status === "out_for_delivery") {
    return "outForDelivery";
  }
  if (status === "preparing") {
    return "preparing";
  }
  return "pending";
}
