import type { ReactNode } from "react";

export const inlineBannerTones = {
  error: {
    container:
      "rounded-xl border border-red-300 bg-red-100 text-red-950 shadow-sm dark:border-red-700 dark:bg-red-950 dark:text-red-50 dark:shadow-none",
    text: "text-red-900 dark:text-red-100",
    icon: "text-red-700 dark:text-red-300",
  },
  success: {
    container:
      "rounded-xl border border-emerald-300 bg-emerald-100 text-emerald-950 shadow-sm dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-50 dark:shadow-none",
    text: "text-emerald-900 dark:text-emerald-100",
    icon: "text-emerald-700 dark:text-emerald-300",
  },
  warning: {
    container:
      "rounded-xl border border-amber-400 bg-amber-100 text-amber-950 shadow-sm dark:border-amber-600 dark:bg-amber-950 dark:text-amber-50 dark:shadow-none",
    text: "text-amber-950 dark:text-amber-100",
    icon: "text-amber-800 dark:text-amber-300",
  },
} as const;

/** Use next to row actions so failures match InlineBanner error styling. */
export const inlineBannerErrorTextClassName = inlineBannerTones.error.text;

type Variant = keyof typeof inlineBannerTones;

type Props = {
  variant: Variant;
  children: ReactNode;
  className?: string;
};

export function InlineBanner({ variant, children, className = "" }: Props) {
  const tone = inlineBannerTones[variant];
  const role = variant === "success" ? "status" : "alert";

  return (
    <div
      role={role}
      className={`px-4 py-3 text-sm font-medium ${tone.container} ${className}`.trim()}
    >
      <div className={`space-y-2 ${tone.text}`}>{children}</div>
    </div>
  );
}
