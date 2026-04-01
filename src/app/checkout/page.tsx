"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle, ArrowLeft, Loader2, ClipboardList } from "lucide-react";
import Link from "next/link";
import { btnPrimaryClass, cardSurfaceClass, inputClass, labelClass } from "@/lib/ui-classes";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, clearRemoteCart, cartReady } = useCart();
  const { t } = useLanguage();
  const { profile, refreshProfile } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const profileComplete =
    Boolean(profile?.full_name?.trim()) && Boolean(profile?.phone?.trim());

  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name);
    if (profile?.phone) setPhone(profile.phone);
  }, [profile?.full_name, profile?.phone]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length || !cartReady) return;
    setSubmitting(true);

    const customerName = profileComplete
      ? (profile!.full_name ?? "").trim()
      : name.trim();
    const customerPhone = profileComplete
      ? (profile!.phone ?? "").trim()
      : phone.trim();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          items: items.map((i) => ({
            product_id: i.product.id,
            product_name: i.product.name,
            quantity: i.quantity,
            unit_price: i.product.price,
          })),
          total_price: totalPrice,
        }),
      });
      const data = await res.json();
      if (res.status === 401) {
        alert(t("orderRequiresSignIn"));
        window.location.href = `/sign-in?next=${encodeURIComponent("/checkout")}`;
        return;
      }
      if (res.status === 400 && data?.code === "PROFILE_INCOMPLETE") {
        alert(data?.error ?? t("profileIncompleteCheckout"));
        return;
      }
      if (res.status === 503 && data?.code === "SCHEMA_OUTDATED") {
        alert(data?.error ?? t("orderSchemaOutdated"));
        return;
      }
      if (!res.ok) {
        const parts = [data?.error, data?.details].filter(Boolean);
        alert(parts.length ? parts.join("\n\n") : t("orderFailed"));
        return;
      }
      await clearRemoteCart();
      clearCart();
      await refreshProfile();
      setOrderId(data.display_id ?? data.id ?? "confirmed");
    } catch {
      alert(t("orderFailed"));
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <div className="flex min-h-full flex-col">
        <Header onCartClick={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 py-20 text-center sm:py-24">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50 shadow-inner">
            <CheckCircle className="h-12 w-12 text-emerald-700" aria-hidden />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-lux-espresso">
            {t("orderPlaced")}
          </h1>
          <p className="mt-3 text-lux-muted">
            {t("yourOrder")}{" "}
            <span className="font-semibold text-lux-gold">{orderId}</span>{" "}
            {t("orderConfirmation")}
          </p>
          <Link
            href="/account/orders"
            className={`${btnPrimaryClass} mt-10 gap-2`}
          >
            <ClipboardList className="h-4 w-4" aria-hidden />
            {t("myOrders")}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

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
          {t("checkout")}
        </h1>
        <div className="divider-gold my-6 max-w-xs" />

        {items.length === 0 ? (
          <p className="mt-6 text-center text-lux-muted">
            {t("cartEmptyCheckout")}{" "}
            <Link href="/" className="font-semibold text-lux-gold underline-offset-2 hover:underline">
              {t("browseProducts")}
            </Link>
          </p>
        ) : (
          <>
            <div className={`${cardSurfaceClass} p-5`}>
              <h2 className="mb-4 font-serif text-lg text-lux-espresso">{t("orderSummary")}</h2>
              <ul className="divide-y divide-lux-border">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 py-3 text-sm first:pt-0"
                  >
                    <span className="text-lux-ink-muted">
                      {item.product.name} &times; {item.quantity}
                    </span>
                    <span className="font-semibold text-lux-espresso">
                      ₪{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-lux-border pt-4">
                <span className="font-semibold text-lux-ink-muted">{t("total")}</span>
                <span className="font-serif text-xl font-semibold text-lux-gold">
                  ₪{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {profileComplete ? (
                <div className={`${cardSurfaceClass} p-5 text-sm text-lux-ink-muted`}>
                  <p className="font-serif text-base font-semibold text-lux-espresso">
                    {t("deliveryContact")}
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {profile!.full_name}
                    <br />
                    {profile!.phone}
                  </p>
                  <Link
                    href="/account"
                    className="mt-4 inline-block text-sm font-semibold text-lux-gold hover:underline"
                  >
                    {t("editInAccount")}
                  </Link>
                </div>
              ) : (
                <>
                  <div>
                    <label className={labelClass} htmlFor="checkout-name">
                      {t("name")}
                    </label>
                    <input
                      id="checkout-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="checkout-phone">
                      {t("phone")}
                    </label>
                    <input
                      id="checkout-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      placeholder={t("phonePlaceholder")}
                    />
                  </div>
                  <p className="text-xs text-lux-muted">{t("checkoutProfileHint")}</p>
                </>
              )}
              <button
                type="submit"
                disabled={submitting || !cartReady}
                className={`${btnPrimaryClass} w-full py-3.5 disabled:opacity-50`}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {submitting ? t("placingOrder") : t("placeOrder")}
              </button>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
