"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { btnPrimaryClass } from "@/lib/ui-classes";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { t, dir } = useLanguage();
  const { user } = useAuth();

  const checkoutHref = user
    ? "/checkout"
    : `/sign-in?next=${encodeURIComponent("/checkout")}`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-lux-charcoal/55 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
      )}

      <div
        className={`fixed top-0 z-50 flex h-full w-full max-w-md flex-col border-lux-border bg-lux-surface-elevated shadow-[-12px_0_40px_rgba(26,21,18,0.18)] transition-transform duration-300 ease-out ${
          dir === "rtl" ? "left-0 border-e" : "right-0 border-s"
        } ${
          open
            ? "translate-x-0"
            : dir === "rtl"
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-lux-border bg-lux-espresso px-5 py-4 text-lux-cream">
          <h2
            id="cart-drawer-title"
            className="flex items-center gap-2 font-serif text-lg font-semibold"
          >
            <ShoppingBag className="h-5 w-5 text-lux-gold-light" aria-hidden />
            {t("yourCart")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-lux-cream/80 transition-colors hover:bg-lux-cream/10 hover:text-lux-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-lux-muted">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-lux-border bg-lux-cream/50">
                <ShoppingBag className="h-8 w-8 text-lux-gold" aria-hidden />
              </div>
              <p className="text-sm font-semibold text-lux-ink">{t("cartEmpty")}</p>
              <p className="mt-1 text-xs">{t("cartEmptyHint")}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center gap-3 rounded-lg border border-lux-border bg-lux-surface p-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm text-lux-espresso">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-lux-muted">
                      ₪{item.product.price.toFixed(2)} {t("each")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="rounded-md border border-lux-border p-1.5 text-lux-espresso transition-colors hover:bg-lux-cream/60"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold text-lux-espresso">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="rounded-md border border-lux-border p-1.5 text-lux-espresso transition-colors hover:bg-lux-cream/60"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="rounded-md p-1.5 text-lux-muted transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-lux-border bg-lux-cream/30 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-lux-ink-muted">{t("total")}</span>
              <span className="font-serif text-xl font-semibold text-lux-gold">
                ₪{totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              href={checkoutHref}
              onClick={onClose}
              className={`${btnPrimaryClass} w-full py-3 text-center text-sm`}
            >
              {user ? t("proceedToCheckout") : t("signInToCheckout")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
