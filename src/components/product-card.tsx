"use client";

import { Product } from "@/types/database";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { Plus, ShieldAlert } from "lucide-react";
import { btnPrimaryClass } from "@/lib/ui-classes";

const productEmoji: Record<string, string> = {
  "prod-1": "🍫",
  "prod-2": "🍉",
  "prod-3": "🌰",
  "prod-4": "🍑",
  "prod-5": "🍭",
  "prod-6": "🍯",
  "prod-7": "🥮",
  "prod-8": "🍓",
};

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const { addItem } = useCart();
  const { t, locale } = useLanguage();

  const name =
    locale === "ar" && product.name_ar ? product.name_ar : product.name;
  const description =
    locale === "ar" && product.description_ar
      ? product.description_ar
      : product.description;

  const frameHeight = featured ? "h-44 sm:h-48" : "h-36 sm:h-40";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-lux-border bg-lux-surface-elevated shadow-[0_1px_0_rgba(47,33,24,0.06),0_16px_40px_-18px_rgba(31,24,20,0.2)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(31,24,20,0.28)] ${
        featured ? "ring-1 ring-lux-gold/25" : ""
      }`}
    >
      <div
        className={`relative ${frameHeight} overflow-hidden border-b border-lux-border bg-gradient-to-br from-lux-cream via-lux-ivory to-amber-100/40`}
      >
        <div
          className="absolute inset-0 opacity-[0.35] pattern-noise"
          aria-hidden
        />
        <div className="relative flex h-full items-center justify-center">
          <span
            className={`drop-shadow-md transition-transform duration-300 group-hover:scale-110 ${
              featured ? "text-7xl sm:text-8xl" : "text-6xl sm:text-7xl"
            }`}
            aria-hidden
          >
            {productEmoji[product.id] ?? "🍬"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-lux-espresso">
          {name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-lux-muted line-clamp-2">
          {description}
        </p>

        {product.allergens.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.allergens.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-0.5 rounded-full border border-amber-200/80 bg-amber-50/90 px-2 py-0.5 text-[11px] font-medium text-amber-900/90"
              >
                <ShieldAlert className="h-3 w-3 shrink-0" aria-hidden />
                {a}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-lux-border/80 pt-4">
          <span className="font-serif text-xl font-semibold text-lux-gold">
            ₪{product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className={`${btnPrimaryClass} shrink-0 px-4 py-2 text-xs sm:text-sm`}
          >
            <Plus className="h-4 w-4" aria-hidden />
            {t("add")}
          </button>
        </div>
      </div>
    </article>
  );
}
