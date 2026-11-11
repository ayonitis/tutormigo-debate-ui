"use client";

import { FlaskConical, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Accessible modal built on the native <dialog> element, which provides
 * focus trapping, Escape-to-close, and inert background content.
 */
export function DemoModal({ open, onClose, eyebrow, title, children, footer }: DemoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="demo-modal-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border border-line bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgba(22,27,36,0.45)] backdrop:bg-[rgba(22,27,36,0.55)] open:animate-pop-in"
    >
      {open && (
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-line-soft px-5 py-4 sm:px-7">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-700">
                {eyebrow}
              </p>
              <h2 id="demo-modal-title" className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="grid size-10 shrink-0 place-items-center rounded-xl text-muted hover:bg-elevated hover:text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="px-5 py-5 sm:px-7">
            <p className="mb-4 flex items-start gap-2 rounded-xl border border-against-100 bg-against-50 px-3 py-2.5 text-sm font-medium text-against-700">
              <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Demo preview only. No AI debate is generated and no credits are used.
            </p>
            {children}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-line-soft px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            {footer}
          </div>
        </div>
      )}
    </dialog>
  );
}
