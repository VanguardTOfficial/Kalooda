"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getSupabaseCustomerBrowser } from "@/lib/supabase-client-customer";
import { useLanguage } from "@/contexts/language-context";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { AccountSubnav } from "@/components/account-subnav";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { btnPrimaryClass, inputClass, labelClass } from "@/lib/ui-classes";

export default function AccountPage() {
  const { user, profile, refreshProfile, loading } = useAuth();
  const { t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    const supabase = getSupabaseCustomerBrowser();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name.trim() || null,
        phone: phone.trim() || null,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      alert(t("profileSaveFailedToast"));
      return;
    }
    await refreshProfile();
    alert(t("profileSavedToast"));
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-lux-muted transition-colors hover:text-lux-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToShop")}
        </Link>

        <h1 className="font-serif text-3xl font-semibold text-lux-espresso">{t("myProfile")}</h1>
        <div className="divider-gold my-6 max-w-xs" />

        <div className="mt-2">
          <AccountSubnav />
        </div>

        {loading ? (
          <p className="text-lux-muted">{t("loadingProducts")}</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={labelClass} htmlFor="account-email">
                {t("email")}
              </label>
              <input
                id="account-email"
                readOnly
                value={user?.email ?? ""}
                className={`${inputClass} cursor-not-allowed bg-lux-cream/50 text-lux-muted`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="account-name">
                {t("fullName")}
              </label>
              <input
                id="account-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder={t("fullNamePlaceholder")}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="account-phone">
                {t("phone")}
              </label>
              <input
                id="account-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder={t("phonePlaceholder")}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className={`${btnPrimaryClass} w-full py-3.5 disabled:opacity-50`}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {saving ? t("saving") : t("saveProfile")}
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
