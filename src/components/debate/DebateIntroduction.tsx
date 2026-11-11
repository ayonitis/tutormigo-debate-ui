import { ListChecks, Sparkles } from "lucide-react";
import { AICompanion } from "@/components/ui/AICompanion";

export function DebateIntroduction() {
  return (
    <section
      aria-labelledby="debate-intro-heading"
      className="relative overflow-hidden rounded-3xl border border-brand-100 bg-brand-50"
    >
      <div className="flex items-center gap-4 p-5 sm:gap-8 sm:p-7">
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-200">
            <ListChecks className="size-3.5" aria-hidden="true" />
            Guided setup · 5 steps
          </p>
          <h1
            id="debate-intro-heading"
            className="mt-3 text-[1.65rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl"
          >
            Ready to put your <em className="not-italic text-brand-500">ideas</em> to the test?
          </h1>
          <p className="mt-2.5 max-w-xl text-sm text-muted sm:text-base">
            Choose a topic, pick your side, and challenge yourself in a friendly debate with your AI
            tutor.
          </p>
          <p className="mt-3 hidden items-center gap-1.5 text-sm font-medium text-brand-700 sm:flex">
            <Sparkles className="size-4" aria-hidden="true" />
            Frontend demo — explore every step, nothing is saved or sent.
          </p>
        </div>
        <AICompanion
          variant="hero"
          priority
          className="h-32 w-28 sm:h-44 sm:w-44"
        />
      </div>
    </section>
  );
}
