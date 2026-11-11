import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "cta";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 " +
  "disabled:cursor-not-allowed disabled:opacity-100";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-inset disabled:text-[#6b7079] disabled:border-line",
  cta:
    "bg-brand-500 text-white shadow-[0_8px_20px_-6px_rgba(71,97,228,0.55)] hover:bg-brand-600 " +
    "disabled:bg-inset disabled:text-[#6b7079] disabled:shadow-none",
  secondary:
    "border border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50 " +
    "disabled:bg-elevated disabled:text-[#6b7079] disabled:hover:border-line",
  ghost: "text-brand-700 hover:bg-brand-50 disabled:text-[#6b7079]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, size, className)} {...props} />;
}
