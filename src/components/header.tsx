"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  LogIn,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { t } = useLanguage();
  const { user, loading, signOut, profile } = useAuth();
  const { profile: adminProfile, loading: adminLoading } = useAdminAuth();

  const isAdminRole = (p: { role?: string } | null | undefined) =>
    p != null && (p.role === "admin" || p.role === "super_admin");

  const showAdminLink =
    !loading &&
    (user
      ? isAdminRole(profile)
      : !adminLoading && isAdminRole(adminProfile));

  const navLinkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-lux-ink-muted transition-[color,background-color] hover:bg-lux-cream/50 hover:text-lux-espresso";

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div className="sticky top-0 z-50 shadow-[0_8px_30px_-12px_rgba(26,21,18,0.2)]">
        <div className="border-b border-lux-gold/25 bg-lux-espresso text-center text-xs font-medium tracking-wide text-lux-cream/90 sm:text-sm">
          <p className="px-4 py-2">{t("promoBanner")}</p>
        </div>

        <header className="border-b border-lux-border bg-lux-surface-elevated/95 backdrop-blur-md">
        <div className="section-inner flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 sm:py-4">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex min-w-0 max-w-[55%] shrink items-center gap-2 group sm:max-w-none sm:gap-3"
          >
            <Image
              src="/brand/logo-transparent.png"
              alt="Kalooda"
              width={140}
              height={72}
              className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90 sm:h-10"
              priority
            />
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">
                {t("heroBadge")}
              </span>
            </span>
          </Link>

          <nav
            className="order-last hidden w-full items-center justify-center gap-1 lg:order-none lg:flex lg:w-auto"
            aria-label="Main"
          >
            <Link href="/#menu" className={navLinkClass}>
              {t("navMenu")}
            </Link>
            <Link href="/checkout" className={navLinkClass}>
              {t("navOrderOnline")}
            </Link>
            <Link href="/#contact" className={navLinkClass}>
              {t("navContact")}
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="flex rounded-md p-2 text-lux-espresso hover:bg-lux-cream/60 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={t("navOpenMenu")}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {showAdminLink && (
              <Link
                href="/admin"
                className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-lux-ink-muted transition-colors hover:bg-lux-cream/50 hover:text-lux-espresso md:flex"
              >
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                {t("admin")}
              </Link>
            )}

            {!loading && user ? (
              <>
                <Link
                  href="/account"
                  className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-lux-ink-muted transition-colors hover:bg-lux-cream/50 hover:text-lux-espresso sm:flex"
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span className="max-w-[5rem] truncate">{t("account")}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-lux-ink-muted transition-colors hover:bg-lux-cream/50 hover:text-lux-espresso lg:flex"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  {t("signOut")}
                </button>
              </>
            ) : !loading ? (
              <Link
                href="/sign-in"
                className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-lux-ink-muted transition-colors hover:bg-lux-cream/50 hover:text-lux-espresso sm:flex"
              >
                <LogIn className="h-4 w-4 shrink-0" />
                {t("signIn")}
              </Link>
            ) : null}

            <button
              type="button"
              onClick={onCartClick}
              className="relative flex shrink-0 items-center gap-2 rounded-md border border-lux-gold/40 bg-lux-espresso px-3 py-2 text-sm font-semibold text-lux-cream shadow-md transition-[transform,box-shadow] hover:border-lux-gold hover:shadow-lg active:scale-[0.98] sm:px-4"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t("cart")}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-lux-gold px-1 text-[10px] font-bold text-lux-espresso ltr:-right-1 rtl:-left-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        </header>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-nav">
          <button
            type="button"
            className="absolute inset-0 bg-lux-charcoal/60 backdrop-blur-sm"
            aria-label={t("navCloseMenu")}
            onClick={closeMobile}
          />
          <div
            className={`animate-slide-up absolute inset-y-0 flex w-[min(100%,20rem)] flex-col border-lux-border bg-lux-surface-elevated shadow-2xl ltr:right-0 ltr:border-s rtl:left-0 rtl:border-e`}
          >
            <div className="flex items-center justify-between border-b border-lux-border px-4 py-4">
              <span className="font-serif text-lg font-semibold text-lux-espresso">
                Kalooda
              </span>
              <button
                type="button"
                className="rounded-md p-2 text-lux-ink-muted hover:bg-lux-cream/60"
                onClick={closeMobile}
                aria-label={t("navCloseMenu")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile">
              <Link
                href="/#menu"
                onClick={closeMobile}
                className="rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
              >
                {t("navMenu")}
              </Link>
              <Link
                href="/checkout"
                onClick={closeMobile}
                className="rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
              >
                {t("navOrderOnline")}
              </Link>
              <Link
                href="/#contact"
                onClick={closeMobile}
                className="rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
              >
                {t("navContact")}
              </Link>
              <div className="divider-gold my-3" />
              <div className="px-1 py-2">
                <LanguageSwitcher />
              </div>
              {showAdminLink && (
                <Link
                  href="/admin"
                  onClick={closeMobile}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {t("admin")}
                </Link>
              )}
              {!loading && user ? (
                <>
                  <Link
                    href="/account"
                    onClick={closeMobile}
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
                  >
                    <User className="h-4 w-4" />
                    {t("account")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      signOut();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-start text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("signOut")}
                  </button>
                </>
              ) : !loading ? (
                <Link
                  href="/sign-in"
                  onClick={closeMobile}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-lux-espresso hover:bg-lux-cream/70"
                >
                  <LogIn className="h-4 w-4" />
                  {t("signIn")}
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
