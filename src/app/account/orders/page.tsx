"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { AccountSubnav } from "@/components/account-subnav";
import type { Order } from "@/types/database";
import type { TranslationKey } from "@/lib/translations";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { cardSurfaceClass } from "@/lib/ui-classes";

const STATUS_KEY: Record<Order["status"], TranslationKey> = {
  pending: "pending",
  preparing: "preparing",
  out_for_delivery: "outForDelivery",
};

export default function AccountOrdersPage() {
  const { t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/mine", { credentials: "same-origin" });
      if (res.ok) {
        const data = (await res.json()) as Order[];
        setOrders(Array.isArray(data) ? data : []);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="flex min-h-full flex-col">
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-lux-muted transition-colors hover:text-lux-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToShop")}
        </Link>

        <h1 className="font-serif text-3xl font-semibold text-lux-espresso">
          {t("orderHistoryTitle")}
        </h1>
        <div className="divider-gold my-6 max-w-xs" />

        <div className="mt-2">
          <AccountSubnav />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-lux-gold" aria-hidden />
          </div>
        ) : orders.length === 0 ? (
          <p className="mt-6 text-center text-lux-muted">{t("orderHistoryEmpty")}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className={`${cardSurfaceClass} p-5`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-serif text-lg font-semibold text-lux-espresso">
                      {o.display_id}
                    </p>
                    <p className="text-xs text-lux-muted">
                      {new Date(o.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-lux-border bg-lux-cream/60 px-3 py-1 text-xs font-semibold text-lux-espresso">
                    {t(STATUS_KEY[o.status])}
                  </span>
                </div>
                <p className="mt-3 font-serif text-base font-semibold text-lux-gold">
                  ₪{Number(o.total_price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
