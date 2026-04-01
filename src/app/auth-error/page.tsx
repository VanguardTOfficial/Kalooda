"use client";

import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { btnPrimaryClass } from "@/lib/ui-classes";

export default function AuthErrorPage() {
  const { signOut } = useAuth();
  const { t } = useLanguage();

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

        <div className="relative w-full max-w-md rounded-lg border border-lux-border bg-lux-surface-elevated p-8 text-center shadow-[0_24px_60px_-24px_rgba(26,21,18,0.35)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/80 bg-amber-50">
            <AlertTriangle className="h-8 w-8 text-amber-700" aria-hidden />
          </div>

          <h1 className="font-serif text-xl font-semibold text-lux-espresso">
            {t("authErrorTitle")}
          </h1>
          <p className="mt-2 text-sm text-lux-muted">{t("authErrorMessage")}</p>

          <button
            type="button"
            onClick={signOut}
            className={`${btnPrimaryClass} mt-8 w-full py-3.5`}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {t("signOut")}
          </button>
        </div>
      </div>
      <SiteFooter variant="minimal" />
    </div>
  );
}
