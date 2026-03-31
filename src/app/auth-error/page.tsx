"use client";

import Link from "next/link";
import { AlertTriangle, Candy, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthErrorPage() {
  const { signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Candy className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-stone-900">SweetDrop</span>
        </Link>
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-lg text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-7 w-7 text-amber-600" />
        </div>

        <h1 className="mb-2 text-lg font-bold text-stone-900">
          {t("authErrorTitle")}
        </h1>
        <p className="mb-6 text-sm text-stone-500">
          {t("authErrorMessage")}
        </p>

        <button
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-bold text-white shadow-sm hover:bg-stone-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );
}
