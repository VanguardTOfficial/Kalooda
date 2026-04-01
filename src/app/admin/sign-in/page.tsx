"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { btnPrimaryClass, inputClass, labelClass } from "@/lib/ui-classes";

export default function AdminSignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-lux-bg">
          <Loader2 className="h-10 w-10 animate-spin text-lux-gold" aria-hidden />
        </div>
      }
    >
      <AdminSignInContent />
    </Suspense>
  );
}

function AdminSignInContent() {
  const { signIn, loading: authLoading } = useAdminAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const urlError = (() => {
    const e = searchParams.get("error");
    if (e === "oauth") return t("oauthError");
    if (e === "forbidden") return t("adminSignInNoAccess");
    return null;
  })();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const err = await signIn(email, password);
    if (err) {
      setError(err === "forbidden" ? t("adminSignInNoAccess") : err);
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-lux-bg">
        <Loader2 className="h-10 w-10 animate-spin text-lux-gold" aria-hidden />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lux-bg px-4 py-12 pattern-noise">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-lux-gold/35 bg-lux-espresso text-lux-gold-light">
            <Candy className="h-6 w-6" aria-hidden />
          </span>
          <span className="font-serif text-2xl font-semibold text-lux-espresso">SweetDrop</span>
        </Link>
        <LanguageSwitcher className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200 transition-colors" />
      </div>

      <div className="w-full max-w-sm rounded-lg border border-lux-border bg-lux-surface-elevated p-8 shadow-[0_24px_60px_-24px_rgba(26,21,18,0.35)]">
        <h1 className="font-serif text-2xl font-semibold text-lux-espresso">
          {t("adminSignInTitle")}
        </h1>
        <p className="mt-1 text-sm text-lux-muted">{t("adminSignInSubtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className={labelClass} htmlFor="admin-email">
              {t("email")}
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="admin-password">
              {t("password")}
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              className={inputClass}
            />
          </div>

          {(error ?? urlError) && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error ?? urlError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`${btnPrimaryClass} w-full py-3.5 disabled:opacity-50`}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t("signingIn")}
              </>
            ) : (
              t("signIn")
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-lux-muted">
          <Link
            href="/sign-in"
            className="font-semibold text-lux-gold hover:text-lux-walnut hover:underline"
          >
            {t("adminSignInCustomerLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
