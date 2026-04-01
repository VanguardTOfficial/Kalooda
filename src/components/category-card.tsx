"use client";

import { Category } from "@/types/database";
import { useLanguage } from "@/contexts/language-context";

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const categoryEmoji: Record<string, string> = {
  chocolates: "🍫",
  gummies: "🍬",
  "hard-candy": "🍭",
  pastries: "🥐",
};

export function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const { locale } = useLanguage();
  const name = locale === "ar" && category.name_ar ? category.name_ar : category.name;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-[5.5rem] flex-col items-center gap-2 rounded-full border-2 px-4 py-3 text-center transition-all sm:min-w-[6.5rem] sm:px-5 sm:py-3.5 ${
        isActive
          ? "border-lux-gold bg-lux-espresso text-lux-cream shadow-md ring-2 ring-lux-gold/30"
          : "border-lux-border bg-lux-surface-elevated text-lux-ink-muted hover:border-lux-gold/45 hover:shadow-sm"
      }`}
    >
      <span className="text-2xl sm:text-3xl" aria-hidden>
        {categoryEmoji[category.slug] ?? "🍪"}
      </span>
      <span
        className={`text-xs font-semibold sm:text-sm ${isActive ? "text-lux-cream" : "text-lux-espresso"}`}
      >
        {name}
      </span>
    </button>
  );
}
