"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { Chatbot } from "@/components/chatbot";
import { SiteFooter } from "@/components/site-footer";
import { Search, Loader2, Sparkles, Truck, ChefHat } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Category, Product } from "@/types/database";
import { btnGoldOutlineClass, btnPrimaryClass } from "@/lib/ui-classes";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch((err) => console.error("Failed to load data:", err))
      .finally(() => setLoading(false));
  }, []);

  const availableProducts = useMemo(
    () => products.filter((p) => !p.unavailable_today),
    [products]
  );

  const filtered = availableProducts.filter((p) => {
    const matchesCategory = !activeCategory || p.category_id === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.name_ar?.toLowerCase().includes(q) ||
      p.description_ar?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredPicks = useMemo(() => availableProducts.slice(0, 6), [availableProducts]);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <section className="relative overflow-hidden border-b border-lux-border bg-lux-charcoal text-lux-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 pattern-noise"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -start-[20%] top-0 h-[120%] w-[70%] rounded-full bg-lux-gold/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -end-[10%] bottom-0 h-[80%] w-[50%] rounded-full bg-lux-walnut/40 blur-3xl"
          aria-hidden
        />
        <div className="section-inner relative flex min-h-[min(32rem,85dvh)] flex-col justify-center py-16 sm:py-24 lg:min-h-[36rem]">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-lux-gold/35 bg-lux-espresso/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lux-gold-light">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t("heroBadge")}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroTitle1")}{" "}
            <span className="text-lux-gold-light">{t("heroTitle2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-lux-cream/80 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#menu" className={`${btnPrimaryClass} text-center sm:w-auto`}>
              {t("heroCtaShop")}
            </a>
            <Link
              href="/checkout"
              className={`${btnGoldOutlineClass} border-lux-cream/50 text-lux-cream hover:bg-lux-cream/10 sm:w-auto`}
            >
              {t("heroCtaOrder")}
            </Link>
          </div>
          <div className="mt-12 grid gap-6 border-t border-lux-cream/10 pt-8 sm:grid-cols-2 lg:max-w-2xl">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-lux-gold/30 bg-lux-espresso/50">
                <ChefHat className="h-5 w-5 text-lux-gold-light" aria-hidden />
              </span>
              <p className="text-sm font-medium leading-snug text-lux-cream/90">
                {t("trustCraft")}
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-lux-gold/30 bg-lux-espresso/50">
                <Truck className="h-5 w-5 text-lux-gold-light" aria-hidden />
              </span>
              <p className="text-sm font-medium leading-snug text-lux-cream/90">
                {t("trustDeliveryLine")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {!loading && featuredPicks.length > 0 && (
        <section className="border-b border-lux-border bg-lux-ivory py-16 sm:py-20">
          <div className="section-inner">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lux-gold">
                  {t("sectionFeaturedEyebrow")}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-lux-espresso sm:text-4xl">
                  {t("sectionFeaturedTitle")}
                </h2>
                <p className="mt-2 max-w-lg text-sm text-lux-muted">
                  {t("sectionFeaturedSubtitle")}
                </p>
              </div>
              <a
                href="#menu"
                className="shrink-0 text-sm font-semibold text-lux-gold underline-offset-4 hover:text-lux-walnut hover:underline"
              >
                {t("viewFullMenu")}
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPicks.map((p) => (
                <ProductCard key={p.id} product={p} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-lux-border bg-lux-surface py-16 sm:py-20">
        <div className="section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="pattern-noise absolute inset-0 rounded-lg opacity-30" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-lux-border bg-gradient-to-br from-lux-cream via-lux-surface to-lux-gold/20 shadow-[0_24px_60px_-20px_rgba(42,31,24,0.35)]">
                <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
                  <span className="font-serif text-7xl text-lux-gold/40 sm:text-8xl" aria-hidden>
                    ✦
                  </span>
                  <p className="max-w-xs font-serif text-xl italic text-lux-walnut/90">
                    &ldquo;{t("sectionStoryQuote")}&rdquo;
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -end-4 hidden h-24 w-24 rounded-lg border border-lux-gold/40 bg-lux-espresso/95 lg:block" aria-hidden />
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lux-gold">
                {t("sectionStoryKicker")}
              </p>
              <h2 className="font-serif text-3xl font-semibold text-lux-espresso sm:text-4xl">
                {t("sectionStoryTitle")}
              </h2>
              <div className="divider-gold max-w-md" />
              <p className="text-base leading-relaxed text-lux-ink-muted">
                {t("sectionStoryBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="scroll-mt-36 border-b border-lux-border bg-lux-bg py-14 sm:py-16 sm:scroll-mt-40"
      >
        <div className="section-inner">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold text-lux-espresso sm:text-4xl">
              {t("navMenu")}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-lux-muted">
              {t("heroSubtitle")}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-24 text-lux-muted">
              <Loader2 className="h-10 w-10 animate-spin text-lux-gold" />
              <p className="mt-4 text-sm font-medium">{t("loadingProducts")}</p>
            </div>
          ) : (
            <>
              <div className="relative mx-auto mb-10 max-w-xl">
                <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lux-muted" aria-hidden />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-md border border-lux-border bg-lux-surface-elevated py-3.5 ps-11 pe-4 text-sm text-lux-ink shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-lux-muted focus:border-lux-gold focus:ring-2 focus:ring-lux-gold/20"
                />
              </div>

              <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all ${
                    !activeCategory
                      ? "border-lux-gold bg-lux-espresso text-lux-cream shadow-md"
                      : "border-lux-border bg-lux-surface-elevated text-lux-ink-muted hover:border-lux-gold/40"
                  }`}
                >
                  {t("all")}
                </button>
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    isActive={activeCategory === cat.id}
                    onClick={() =>
                      setActiveCategory((prev) => (prev === cat.id ? null : cat.id))
                    }
                  />
                ))}
              </div>

              {filtered.length === 0 ? (
                <p className="py-20 text-center text-lux-muted">{t("noProducts")}</p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-lux-espresso py-16 text-lux-cream sm:py-20">
        <div className="section-inner flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold sm:text-4xl">
            {t("sectionOrderCtaTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-lux-cream/75 sm:text-base">
            {t("sectionOrderCtaBody")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-md border-2 border-lux-gold bg-lux-gold px-8 py-3 text-sm font-semibold text-lux-espresso shadow-lg transition-[transform,box-shadow] hover:brightness-110 active:scale-[0.98]"
            >
              {t("cart")}
            </button>
            <Link
              href="/checkout"
              className="rounded-md border border-lux-cream/40 px-8 py-3 text-sm font-semibold text-lux-cream transition-colors hover:bg-lux-cream/10"
            >
              {t("navOrderOnline")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Chatbot />
    </>
  );
}
