
import Image from "next/image";
import { cn } from "@/lib/cn";

export type CompanionVariant = "hero" | "ready" | "empty";

interface AICompanionProps {
  variant: CompanionVariant;
  className?: string;
  priority?: boolean;
}

export function AICompanion({
  variant,
  className,
  priority = false,
}: AICompanionProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative shrink-0 overflow-hidden bg-transparent",
        className
      )}
    >
      <Image
        src="/assets/illustrations/tutormigo-robot.png"
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 640px) 200px, 160px"
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}
