"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  CheckCircle,
  XCircle,
  Loader2,
  Package,
  Candy,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { inputClass, labelClass, cardSurfaceClass } from "@/lib/ui-classes";

type DeliveryStatus = "loading" | "idle" | "accepting" | "accepted" | "error";

interface OrderData {
  id: string;
  display_id: string;
  customer_name: string;
  items: { product_name: string; quantity: number }[];
  total_price: number;
  status: string;
}

export default function DeliveryAcceptPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { t } = useLanguage();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [status, setStatus] = useState<DeliveryStatus>("loading");
  const [driverName, setDriverName] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${orderId}?token=${encodeURIComponent(token)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((found: OrderData) => {
        setOrder(found);
        if (found.status === "preparing") setStatus("accepted");
        else if (found.status === "pending") setStatus("idle");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [orderId, token]);

  async function handleAccept() {
    if (!driverName.trim()) return;
    setStatus("accepting");
    try {
      const res = await fetch(`/api/orders/${orderId}/status?token=${encodeURIComponent(token)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "preparing" }),
      });
      if (!res.ok) throw new Error();
      setStatus("accepted");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-lux-bg">
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 pattern-noise">
        <div className="relative mb-10 flex w-full max-w-md flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-lux-gold/35 bg-lux-espresso text-lux-gold-light">
              <Candy className="h-6 w-6" aria-hidden />
            </span>
            <span className="font-serif text-2xl font-semibold text-lux-espresso">SweetDrop</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="relative w-full max-w-md rounded-lg border border-lux-border bg-lux-surface-elevated p-8 shadow-[0_24px_60px_-24px_rgba(26,21,18,0.35)]">
          {status === "loading" && (
            <div className="flex flex-col items-center py-10 text-lux-muted">
              <Loader2 className="h-10 w-10 animate-spin text-lux-gold" aria-hidden />
              <p className="mt-4 text-sm font-medium">{t("loadingOrder")}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center py-10 text-red-600">
              <XCircle className="h-12 w-12" aria-hidden />
              <p className="mt-4 text-sm font-semibold">{t("orderNotFound")}</p>
            </div>
          )}

          {status === "accepted" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-10 w-10 text-emerald-700" aria-hidden />
              </div>
              <h2 className="mt-5 font-serif text-xl font-semibold text-lux-espresso">
                {t("deliveryAccepted")}
              </h2>
              <p className="mt-2 text-sm text-lux-muted">
                {t("order")} {order?.display_id} {t("orderAssigned")}
              </p>
            </div>
          )}

          {(status === "idle" || status === "accepting") && order && (
            <>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-lux-gold/35 bg-lux-cream">
                  <Truck className="h-6 w-6 text-lux-gold" aria-hidden />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-lux-espresso">
                    {t("newDelivery")}
                  </h2>
                  <p className="text-xs text-lux-muted">
                    {t("order")} {order.display_id}
                  </p>
                </div>
              </div>

              <div className={`${cardSurfaceClass} mb-6 p-4`}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-lux-muted">
                  {t("items")}
                </p>
                <ul className="space-y-2">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-lux-ink-muted">
                      <Package className="h-3.5 w-3.5 shrink-0 text-lux-gold" aria-hidden />
                      <span>
                        {item.product_name} &times; {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-serif text-base font-semibold text-lux-espresso">
                  {t("total")}: ₪{order.total_price.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-lux-muted">
                  {t("customerLabel")} {order.customer_name}
                </p>
              </div>

              <div className="mb-5">
                <label className={labelClass} htmlFor="driver-name">
                  {t("yourName")}
                </label>
                <input
                  id="driver-name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder={t("enterYourName")}
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                onClick={handleAccept}
                disabled={status === "accepting" || !driverName.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-emerald-700 bg-emerald-700 py-3 text-sm font-semibold text-white shadow-md transition-[filter] hover:brightness-110 disabled:opacity-50"
              >
                {status === "accepting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t("accepting")}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" aria-hidden /> {t("acceptDelivery")}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <SiteFooter variant="minimal" />
    </div>
  );
}
