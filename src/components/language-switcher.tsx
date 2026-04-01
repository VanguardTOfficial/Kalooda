"use client";

import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      className="flex items-center gap-2 rounded-md border border-lux-border bg-lux-surface-elevated px-3 py-2 text-sm font-medium text-lux-ink-muted shadow-sm transition-[border-color,background-color] hover:border-lux-gold/35 hover:bg-lux-cream/50"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4 shrink-0 text-lux-gold" aria-hidden />
      <span>{t("switchLanguage")}</span>
    </button>
  );
}
