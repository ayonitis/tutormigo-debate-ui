import { DebatePage } from "@/components/debate/DebatePage";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <DebatePage />
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-2 text-center text-xs text-muted sm:px-6 lg:px-8">
        Frontend demo recreation of the TutorMigo Debate setup. Illustrations are original artwork
        and not official TutorMigo characters.
      </footer>
    </>
  );
}
