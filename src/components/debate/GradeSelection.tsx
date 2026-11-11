import { StepHeader } from "@/components/debate/StepHeader";
import { SelectCard } from "@/components/ui/SelectCard";
import { cn } from "@/lib/cn";
import { GRADE_LEVELS } from "@/lib/debate/data";
import type { GradeLevelId } from "@/lib/debate/types";

const TILE_STYLES: Record<GradeLevelId, string> = {
  elementary: "bg-[#fff3d6] text-[#8a5a00]",
  middle: "bg-[#dff3fb] text-[#075f80]",
  high: "bg-brand-100 text-brand-900",
};

interface GradeSelectionProps {
  value: GradeLevelId | null;
  onChange: (grade: GradeLevelId) => void;
}

export function GradeSelection({ value, onChange }: GradeSelectionProps) {
  return (
    <div>
      <StepHeader
        stepNumber={1}
        totalSteps={5}
        title="What grade are you in?"
        description="We'll help you find topics that match your learning level."
      />
      <fieldset>
        <legend className="sr-only">Grade level</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {GRADE_LEVELS.map((grade) => {
            const Icon = grade.icon;
            return (
              <SelectCard
                key={grade.id}
                name="grade"
                value={grade.id}
                checked={value === grade.id}
                onChange={() => onChange(grade.id)}
                className="flex flex-row items-center gap-4 sm:flex-col sm:items-start sm:gap-0 sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-2xl sm:mb-4 sm:size-16",
                    TILE_STYLES[grade.id],
                  )}
                >
                  <Icon className="size-7 sm:size-8" />
                </span>
                <span className="block min-w-0 pr-7 sm:pr-0">
                  <span className="block font-mono text-2xl font-bold leading-none text-ink">
                    {grade.label}
                  </span>
                  <span className="mt-1.5 block text-base font-semibold text-ink">{grade.name}</span>
                  <span className="mt-0.5 block text-xs font-medium text-muted">{grade.ages}</span>
                  <span className="mt-2 block text-sm text-muted">{grade.description}</span>
                </span>
              </SelectCard>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
