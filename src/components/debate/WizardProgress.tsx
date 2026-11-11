import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { WizardStep } from "@/lib/debate/types";

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
  isCompleted: (index: number) => boolean;
  isReachable: (index: number) => boolean;
  onSelect: (index: number) => void;
}

export function WizardProgress({
  steps,
  currentStep,
  isCompleted,
  isReachable,
  onSelect,
}: WizardProgressProps) {
  return (
    <nav aria-label="Debate setup progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const current = index === currentStep;
          const completed = !current && isCompleted(index);
          const reachable = isReachable(index);
          const isLast = index === steps.length - 1;
          return (
            <li key={step.id} className={cn("flex items-center", !isLast && "flex-1")}>
              <button
                type="button"
                disabled={!reachable || current}
                onClick={() => onSelect(index)}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-xl p-1 text-left",
                  reachable && !current && "hover:bg-brand-50",
                  !reachable && "cursor-not-allowed",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 font-mono text-sm font-bold transition-colors",
                    current && "border-brand-500 bg-white text-brand-700 ring-4 ring-brand-100",
                    completed && "border-brand-500 bg-brand-500 text-white",
                    !current && !completed && "border-line bg-white text-[#6b7079]",
                  )}
                >
                  {completed ? <Check className="size-4" strokeWidth={3} /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-semibold sm:inline",
                    current ? "text-ink" : completed ? "text-brand-700" : "text-[#6b7079]",
                  )}
                >
                  {step.shortTitle}
                </span>
                <span className="sr-only">
                  {`Step ${index + 1}: ${step.title}`}
                  {completed ? " (completed)" : current ? " (current)" : ""}
                </span>
              </button>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-1 h-0.5 min-w-3 flex-1 rounded-full sm:mx-2",
                    completed || (index < currentStep) ? "bg-brand-500" : "bg-line",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted sm:hidden">
        Step {currentStep + 1} of {steps.length} · {steps[currentStep].shortTitle}
      </p>
    </nav>
  );
}
