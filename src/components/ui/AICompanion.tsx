import Image from "next/image";
import { cn } from "@/lib/cn";

export type CompanionVariant = "hero" | "ready" | "empty";

interface CompanionAsset {
  src: string;
  objectPosition: string;
  sizes: string;
}

const ASSETS: Record<CompanionVariant, CompanionAsset> = {
  hero: {
    src: "/assets/illustrations/companion-hero.png",
    objectPosition: "50% 24%",
    sizes: "(min-width: 640px) 200px, 160px",
  },
  ready: {
    src: "/assets/illustrations/companion-ready.png",
    objectPosition: "50% 14%",
    sizes: "160px",
  },
  empty: {
    src: "/assets/illustrations/companion-empty.png",
    objectPosition: "50% 16%",
    sizes: "160px",
  },
};

interface AICompanionProps {
  variant: CompanionVariant;
  /** Tailwind sizing classes for the framed tile. */
  className?: string;
  priority?: boolean;
}

/**
 * Decorative, original AI-tutor companion illustration shown in a cropped tile.
 * (Original artwork - not an official TutorMigo character.)
 */
export function AICompanion({ variant, className, priority = false }: AICompanionProps) {
  const asset = ASSETS[variant];
  return (
    <div
      aria-hidden="true"
      className={cn("relative shrink-0 overflow-hidden rounded-2xl bg-[#f3f1fd]", className)}
    >
      <Image
        src={asset.src}
        alt=""
        fill
        priority={priority}
        sizes={asset.sizes}
        className="object-cover"
        style={{ objectPosition: asset.objectPosition }}
        draggable={false}
      />
    </div>
  );
}
