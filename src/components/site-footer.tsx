"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function SiteFooter({ variant = "full" }: { variant?: "full" | "minimal" }) {
  const { t } = useLanguage();

  if (variant === "minimal") {
    return (
      <footer className="border-t border-lux-border bg-lux-charcoal/95 py-6 text-center text-sm text-lux-cream/70">
        <Link
          href="/"
          className="font-medium text-lux-gold-light hover:text-lux-cream transition-colors"
        >
          {t("backToShop")}
        </Link>
      </footer>
    );
  }

  return (
    <footer
      id="contact"
      className="border-t border-lux-gold/20 bg-lux-charcoal text-lux-cream"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/brand/logo-transparent.png"
                alt="Kalooda"
                width={140}
                height={72}
                className="h-10 w-auto object-contain opacity-95 transition-opacity group-hover:opacity-100"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-lux-cream/75">
              {t("footerTagline")}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-lux-cream/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-lux-gold" aria-hidden />
                {t("footerDeliveryArea")}
              </span>
              <a
                href="mailto:support@sweetdrop.example"
                className="inline-flex items-center gap-2 hover:text-lux-gold-light transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0 text-lux-gold" aria-hidden />
                {t("footerContact")}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-lux-cream">{t("footerExplore")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/#menu"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("navMenu")}
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("navOrderOnline")}
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("account")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-lux-cream">{t("footerVisit")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/sign-in"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("signIn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("signUp")}
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lux-cream/75 hover:text-lux-gold-light transition-colors"
                >
                  {t("navContact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-lux-cream/10 pt-8 text-xs text-lux-cream/50 sm:flex-row">
          <p>{t("footerRights")}</p>
          <p className="text-lux-gold/60">{t("footerCrafted")}</p>
        </div>
      </div>
    </footer>
  );
}
