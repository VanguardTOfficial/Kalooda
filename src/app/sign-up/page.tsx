"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getSafeNextPath } from "@/lib/auth-redirect";
import { btnPrimaryClass, btnSecondaryClass, inputClass, labelClass } from "@/lib/ui-classes";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-lux-bg">
          <Loader2 className="h-10 w-10 animate-spin text-lux-gold" aria-hidden />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const { signUp, signInWithOAuth, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const nextSafe = getSafeNextPath(searchParams.get("next"));
  const signInHref = nextSafe
    ? `/sign-in?next=${encodeURIComponent(nextSafe)}`
    : "/sign-in";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const err = await signUp(email, password, fullName, phone);
    if (err) {
      setError(
        err === "adminPortal"
          ? t("adminAccountUseAdminSignIn")
          : t("signUpError")
      );
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
    <div className="flex min-h-screen flex-col bg-lux-bg">
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 pattern-noise">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lux-charcoal/[0.03] via-transparent to-lux-gold/[0.06]"
          aria-hidden
        />
        <div className="relative mb-10 flex w-full max-w-md flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-lux-gold/35 bg-lux-espresso text-lux-gold-light transition-transform group-hover:scale-[1.02]">
              <Candy className="h-6 w-6" aria-hidden />
            </span>
            <span className="font-serif text-2xl font-semibold text-lux-espresso">SweetDrop</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="relative w-full max-w-md rounded-lg border border-lux-border bg-lux-surface-elevated p-8 shadow-[0_24px_60px_-24px_rgba(26,21,18,0.35)]">
          <h1 className="font-serif text-2xl font-semibold text-lux-espresso">
            {t("createAccount")}
          </h1>
          <p className="mt-1 text-sm text-lux-muted">{t("signUp")}</p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => signInWithOAuth("google", { next: nextSafe })}
              className={`${btnSecondaryClass} w-full`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t("continueWithGoogle")}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lux-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-lux-surface-elevated px-3 text-lux-muted">{t("or")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="signup-name">
                {t("fullName")}
              </label>
              <input
                id="signup-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("fullNamePlaceholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="signup-phone">
                {t("phone")}
              </label>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder2")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="signup-email">
                {t("email")}
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="signup-password">
                {t("password")}
              </label>
              <input
                id="signup-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className={inputClass}
              />
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
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
                  {t("signingUp")}
                </>
              ) : (
                t("createAccount")
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-lux-muted">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href={signInHref}
              className="font-semibold text-lux-gold hover:text-lux-walnut hover:underline"
            >
              {t("signIn")}
            </Link>
          </p>
        </div>
      </div>
      <SiteFooter variant="minimal" />
    </div>
  );
}
