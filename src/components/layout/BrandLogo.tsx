import Image from "next/image";
import Link from "next/link";

/** Official TutorMigo book + graduation cap icon (unmodified) with a text wordmark. */
export function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-xl py-1 pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      aria-label="TutorMigo home"
    >
      <Image
        src="/assets/brand/tutormigo-icon.svg"
        alt=""
        width={36}
        height={36}
        priority
        className="size-9"
      />
      <span className="text-lg font-bold tracking-tight text-ink">
        TutorMigo<span className="font-mono text-xs font-medium text-muted">.ai</span>
      </span>
    </Link>
  );
}
