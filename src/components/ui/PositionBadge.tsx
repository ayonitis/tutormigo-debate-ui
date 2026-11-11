import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DebateSide } from "@/lib/debate/types";

interface PositionBadgeProps {
  side: DebateSide;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "gap-1 px-2 py-0.5 text-xs [&_svg]:size-3.5",
  md: "gap-1.5 px-3 py-1 text-sm [&_svg]:size-4",
  lg: "gap-2 px-4 py-1.5 text-base [&_svg]:size-5",
};

/** FOR / AGAINST pill. Uses an icon and text label, never color alone. */
export function PositionBadge({ side, size = "md", className }: PositionBadgeProps) {
  const isFor = side === "for";
  const Icon = isFor ? ThumbsUp : ThumbsDown;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-mono font-bold uppercase tracking-wide",
        isFor
          ? "border-for-100 bg-for-50 text-for-700"
          : "border-against-100 bg-against-50 text-against-700",
        sizeStyles[size],
        className,
      )}
    >
      <Icon aria-hidden="true" />
      {isFor ? "For" : "Against"}
    </span>
  );
}
