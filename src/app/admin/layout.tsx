"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Candy, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { profile, signOut } = useAdminAuth();

  if (pathname === "/admin/sign-in") {
    return <div className="min-h-screen bg-lux-bg">{children}</div>;
  }

  const isSuperAdmin = profile?.role === "super_admin";

  const navItems = [
    { href: "/admin", labelKey: "dashboard" as const, icon: LayoutDashboard },
    ...(isSuperAdmin
      ? [{ href: "/admin/functions", labelKey: "functions" as const, icon: Settings }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-lux-bg pattern-noise">
      <header className="sticky top-0 z-40 border-b border-lux-border bg-lux-surface-elevated/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-lux-gold/35 bg-lux-espresso text-lux-gold-light transition-transform group-hover:scale-[1.02]">
              <Candy className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-serif text-lg font-semibold text-lux-espresso">SweetDrop</span>
            <span className="hidden rounded-full border border-lux-border bg-lux-cream/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lux-muted sm:inline">
              {t("admin")}
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {profile?.full_name && (
              <span className="hidden max-w-[10rem] truncate text-sm text-lux-muted sm:block">
                {profile.full_name}
              </span>
            )}
            <LanguageSwitcher />
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-md border border-lux-border px-3 py-2 text-sm font-medium text-lux-ink-muted transition-colors hover:bg-lux-cream/60"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t("signOut")}</span>
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 border-t border-lux-border/80 px-4 sm:px-6">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-lux-gold text-lux-espresso"
                    : "border-transparent text-lux-muted hover:border-lux-border hover:text-lux-espresso"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
