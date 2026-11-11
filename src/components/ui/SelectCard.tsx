import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SelectAccent = "brand" | "for" | "against";

const checkedStyles: Record<SelectAccent, string> = {
  brand: "border-brand-500 bg-brand-50 shadow-[0_6px_18px_-8px_rgba(71,97,228,0.5)]",
  for: "border-for-600 bg-for-50 shadow-[0_6px_18px_-8px_rgba(11,122,85,0.45)]",
  against: "border-against-600 bg-against-50 shadow-[0_6px_18px_-8px_rgba(180,71,11,0.45)]",
};

const indicatorStyles: Record<SelectAccent, string> = {
  brand: "border-brand-500 bg-brand-500",
  for: "border-for-600 bg-for-600",
  against: "border-against-600 bg-against-600",
};

interface SelectCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  accent?: SelectAccent;
  showIndicator?: boolean;
  className?: string;
}

/**
 * A selectable card built on a native radio input, so it is keyboard
 * accessible (arrow keys within a group) and announced correctly.
 * Selected state is shown with a border, tint and a check mark.
 */
export function SelectCard({
  name,
  value,
  checked,
  onChange,
  children,
  accent = "brand",
  showIndicator = true,
  className,
}: SelectCardProps) {
  return (
    <label
      className={cn(
        "relative block cursor-pointer rounded-2xl border-2 p-4 transition duration-150",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500",
        checked
          ? checkedStyles[accent]
          : "border-line bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/50 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {showIndicator && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-3 top-3 grid size-6 place-items-center rounded-full border-2 text-white",
            checked ? indicatorStyles[accent] : "border-line bg-white",
          )}
        >
          {checked && <Check className="size-3.5" strokeWidth={3} />}
        </span>
      )}
      {children}
    </label>
  );
}
