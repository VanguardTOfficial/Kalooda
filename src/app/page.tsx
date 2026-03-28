"use client";

import { useState } from "react";
import { categories, products } from "@/data/mock";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { Chatbot } from "@/components/chatbot";
import { Search } from "lucide-react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchesCategory = !activeCategory || p.category_id === activeCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Hero */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            Fresh Sweets,{" "}
            <span className="text-primary">Delivered Fast</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-stone-500">
            Hand-crafted chocolates, gummies, pastries &amp; more. Order online
            and get same-day delivery.
          </p>
        </section>

        {/* Search */}
        <div className="relative mx-auto mb-8 max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sweets..."
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-stone-400 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-2xl border-2 px-5 py-3 text-sm font-semibold transition-all hover:scale-105 ${
              !activeCategory
                ? "border-primary bg-rose-50 text-primary shadow-md"
                : "border-stone-200 bg-white text-stone-700 hover:border-rose-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() =>
                setActiveCategory((prev) =>
                  prev === cat.id ? null : cat.id
                )
              }
            />
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-stone-400">
            No products found. Try a different search or category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <Chatbot />
    </>
  );
}
