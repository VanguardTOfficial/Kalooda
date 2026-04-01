import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import { cookies } from "next/headers";
import { CartProvider } from "@/contexts/cart-context";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
import { AdminAuthProvider } from "@/contexts/admin-auth-context";
import { PWARegister } from "@/components/pwa-register";
import {
  LOCALE_COOKIE_NAME,
  parseLocaleCookie,
} from "@/lib/locale-preference";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

const luxSerif = Cormorant_Garamond({
  variable: "--font-lux-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SweetDrop — Artisan Sweets & Confections",
  description:
    "Hand-crafted chocolates, gummies, pastries, and more. Order online for thoughtful delivery and guest-worthy presentation.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kalooda",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a1f18",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = parseLocaleCookie(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value
  );
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} ${luxSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider initialLocale={locale}>
          <AuthProvider>
            <AdminAuthProvider>
              <CartProvider>
                {children}
                <PWARegister />
              </CartProvider>
            </AdminAuthProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
