"use client";

import Link from "next/link";
import { ShoppingCart, Candy, LayoutDashboard } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-rose-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Candy className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-stone-900">
            SweetDrop
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </Link>
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-stone-900">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
