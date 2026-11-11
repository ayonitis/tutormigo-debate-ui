"use client";

import { Check, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-11 place-items-center rounded-xl border border-line bg-white text-ink hover:bg-brand-50"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="animate-step-in absolute inset-x-0 top-full border-b border-line bg-white px-4 pb-4 pt-2 shadow-[0_16px_30px_-18px_rgba(22,27,36,0.35)]"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-semibold",
                      item.active
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink hover:bg-elevated",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    {item.label}
                    {item.active && (
                      <Check className="ml-auto size-4" aria-hidden="true" />
                    )}
                    {item.external && <span className="sr-only">(opens TutorMigo.ai)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-elevated p-3">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white"
            >
              AM
            </span>
            <div className="text-sm">
              <p className="font-semibold">Alex M.</p>
              <p className="text-muted">Student profile (demo)</p>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
