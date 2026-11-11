import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandLogo />
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={cn(
                        "relative flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors",
                        item.active
                          ? "bg-brand-50 text-brand-700 after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[3px] after:rounded-full after:bg-brand-500"
                          : "text-muted hover:bg-elevated hover:text-ink",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {item.label}
                      {item.external && <span className="sr-only">(opens TutorMigo.ai)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2.5 rounded-full border border-line bg-white py-1 pl-1 pr-4 sm:flex">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white"
            >
              AM
            </span>
            <span className="text-sm font-semibold">Alex M.</span>
          </div>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
