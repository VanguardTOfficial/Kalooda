"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  RefreshCw,
  Candy,
  Clock,
  Truck,
  CheckCircle,
  Package,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import type { Order } from "@/types/database";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-100",
    icon: Clock,
  },
  assigned: {
    label: "Assigned",
    color: "text-blue-700",
    bg: "bg-blue-100",
    icon: Package,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "text-purple-700",
    bg: "bg-purple-100",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    icon: CheckCircle,
  },
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const useMock =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url";

    if (useMock) {
      const interval = setInterval(fetchOrders, 3000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: any;

    (async () => {
      const { supabase } = await import("@/lib/supabase-client");
      channel = supabase
        .channel("orders-realtime")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "orders" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (payload: any) => {
            const updated = payload.new as Order;
            setOrders((prev) => {
              const exists = prev.find((o) => o.id === updated.id);
              if (exists) {
                return prev.map((o) =>
                  o.id === updated.id ? { ...o, ...updated } : o
                );
              }
              return [updated, ...prev];
            });
            setFlashId(updated.id);
            setTimeout(() => setFlashId(null), 3000);
          }
        )
        .subscribe();
    })();

    return () => {
      if (channel) {
        import("@/lib/supabase-client").then(({ supabase }) =>
          supabase.removeChannel(channel)
        );
      }
    };
  }, [fetchOrders]);

  async function updateStatus(orderId: string, newStatus: string) {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus as Order["status"] } : o
        )
      );
      setFlashId(orderId);
      setTimeout(() => setFlashId(null), 3000);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  function copyDeliveryLink(orderId: string) {
    const link = `${window.location.origin}/delivery/accept/${orderId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Candy className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-lg font-bold text-stone-900">SweetDrop</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <LayoutDashboard className="h-4 w-4" />
              <span className="font-semibold">Admin Dashboard</span>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                fetchOrders();
              }}
              className="rounded-lg border border-stone-200 p-2 text-stone-500 hover:bg-stone-100 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(statusConfig).map(([key, cfg]) => {
            const count = orders.filter((o) => o.status === key).length;
            const Icon = cfg.icon;
            return (
              <div
                key={key}
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${cfg.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <span className="text-sm font-medium text-stone-600">
                    {cfg.label}
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-stone-900">{count}</p>
              </div>
            );
          })}
        </div>

        {pendingCount > 0 && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>{pendingCount}</strong> order{pendingCount > 1 ? "s" : ""}{" "}
            awaiting driver assignment. Copy the delivery link and send it to
            your driver pool.
          </div>
        )}

        {/* Orders table */}
        <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Order
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Customer
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Items
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Total
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => {
                  const cfg = statusConfig[order.status] ?? statusConfig.pending;
                  const Icon = cfg.icon;
                  return (
                    <tr
                      key={order.id}
                      className={`transition-colors ${
                        flashId === order.id ? "pulse-green bg-emerald-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        {order.display_id}
                      </td>
                      <td className="px-4 py-3 text-stone-700">
                        {order.customer_name}
                      </td>
                      <td className="px-4 py-3 text-stone-600">
                        {order.items
                          .map((i) => `${i.product_name} (x${i.quantity})`)
                          .join(", ")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        ${order.total_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.color}`}
                        >
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {order.status === "pending" && (
                            <button
                              onClick={() => copyDeliveryLink(order.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                              title="Copy delivery link for driver"
                            >
                              {copiedId === order.id ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  Driver Link
                                </>
                              )}
                            </button>
                          )}
                          {order.status !== "delivered" && (
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateStatus(order.id, e.target.value)
                              }
                              className="rounded-lg border border-stone-200 px-2 py-1.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            >
                              <option value="pending">Pending</option>
                              <option value="assigned">Assigned</option>
                              <option value="out_for_delivery">
                                Out for Delivery
                              </option>
                              <option value="delivered">Delivered</option>
                            </select>
                          )}
                          <Link
                            href={`/delivery/accept/${order.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2 py-1.5 text-xs font-medium text-stone-500 hover:bg-stone-100 transition-colors"
                            target="_blank"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-stone-400"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
