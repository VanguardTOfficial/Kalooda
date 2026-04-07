export const CANCELLATION_REASONS = [
  "Customer changed mind",
  "Payment declined / credit issue",
  "Customer no-show",
  "Item out of stock",
  "Duplicate order",
  "Other",
] as const;

export type CancellationReason = (typeof CANCELLATION_REASONS)[number];
