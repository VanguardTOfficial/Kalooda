"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  pending?: boolean;
};

export function AdminConfirmDialog({
  open,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  pending = false,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !pending) onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel, pending]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-confirm-message"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={pending ? undefined : onCancel}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-admin-border bg-admin-panel p-6 shadow-lg">
        <p
          id="admin-confirm-message"
          className="text-sm font-medium text-admin-ink"
        >
          {message}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={onCancel}
            className="rounded-lg border border-admin-border bg-white px-4 py-2 text-sm font-semibold text-admin-ink transition-colors hover:bg-[rgba(31,68,60,0.05)] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => void onConfirm()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
