"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";

export function AccountSubnav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const linkCls = (active: boolean) =>
    `rounded-md px-4 py-2.5 text-sm font-semibold transition-[color,background-color,border-color] ${
      active
        ? "border border-lux-gold/50 bg-lux-espresso text-lux-cream shadow-sm"
        : "border border-transparent text-lux-ink-muted hover:border-lux-border hover:bg-lux-cream/50"
    }`;

  return (
    <nav
      className="mb-8 flex flex-wrap gap-2 border-b border-lux-border pb-5"
      aria-label="Account"
    >
      <Link href="/account" className={linkCls(pathname === "/account")}>
        {t("myProfile")}
      </Link>
      <Link
        href="/account/orders"
        className={linkCls(pathname === "/account/orders")}
      >
        {t("myOrders")}
      </Link>
    </nav>
  );
}
