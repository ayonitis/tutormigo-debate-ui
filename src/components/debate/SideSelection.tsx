import { Bot, Swords, ThumbsDown, ThumbsUp, User } from "lucide-react";
import type { ReactNode } from "react";
import { StepHeader } from "@/components/debate/StepHeader";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { SelectCard } from "@/components/ui/SelectCard";
import { cn } from "@/lib/cn";
import type { DebateSide } from "@/lib/debate/types";
import { getTutorSide } from "@/lib/debate/validation";

interface SideSelectionProps {
  topicText: string | null;
  value: DebateSide | null;
  onChange: (side: DebateSide) => void;
}

const SIDE_COPY: Record<DebateSide, { title: string; description: string }> = {
  for: {
    title: "FOR",
    description: "You support the statement and argue that the answer is yes.",
  },
  against: {
    title: "AGAINST",
    description: "You oppose the statement and argue that the answer is no.",
  },
};

export function SideSelection({ topicText, value, onChange }: SideSelectionProps) {
  const tutorSide = value ? getTutorSide(value) : null;

  return (
    <div>
      <StepHeader
        stepNumber={3}
        totalSteps={5}
        title="Which side will you argue?"
        description="Choose your position. Your AI tutor will automatically take the opposite side."
      />

      {topicText && (
        <div className="mb-5 rounded-2xl border border-line bg-elevated px-4 py-3">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            Debate statement
          </p>
          <p className="mt-0.5 break-words text-base font-semibold">&ldquo;{topicText}&rdquo;</p>
        </div>
      )}

      <fieldset>
        <legend className="sr-only">Your side</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["for", "against"] as const).map((side) => {
            const checked = value === side;
            const isTutor = value !== null && !checked;
            const Icon = side === "for" ? ThumbsUp : ThumbsDown;
            return (
              <SelectCard
                key={side}
                name="side"
                value={side}
                checked={checked}
                accent={side}
                onChange={() => onChange(side)}
                className="p-5"
              >
                <span className="flex items-center gap-3 pr-8">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-14 place-items-center rounded-2xl",
                      side === "for" ? "bg-for-100 text-for-700" : "bg-against-100 text-against-700",
                    )}
                  >
                    <Icon className="size-7" />
                  </span>
                  <span className="font-mono text-3xl font-bold tracking-tight">
                    {SIDE_COPY[side].title}
                  </span>
                </span>
                <span className="mt-3 block text-base text-ink">{SIDE_COPY[side].description}</span>

                <span className="mt-4 block min-h-8">
                  {checked && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      <User className="size-3.5" aria-hidden="true" />
                      Your position
                    </span>
                  )}
                  {isTutor && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted">
                      <Bot className="size-3.5" aria-hidden="true" />
                      AI Tutor&apos;s position
                    </span>
                  )}
                  {value === null && (
                    <span className="text-sm text-muted">Select to argue this side</span>
                  )}
                </span>
              </SelectCard>
            );
          })}
        </div>
      </fieldset>

      <section
        aria-label="Debate matchup"
        aria-live="polite"
        className="mt-5 rounded-2xl border border-line bg-white p-4 sm:p-5"
      >
        <h3 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
          Matchup
        </h3>
        <div className="mt-3 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <Participant
            icon={<User className="size-5" aria-hidden="true" />}
            name="Student"
            subtitle="You"
            side={value}
          />
          <div className="grid place-items-center text-muted" aria-hidden="true">
            <Swords className="size-5 rotate-90 sm:rotate-0" />
          </div>
          <Participant
            icon={<Bot className="size-5" aria-hidden="true" />}
            name="AI Tutor"
            subtitle="Your sparring partner"
            side={tutorSide}
          />
        </div>
        {value && tutorSide && (
          <p className="mt-3 text-sm text-muted">
            You&apos;ll argue <strong className="text-ink">{value.toUpperCase()}</strong>, and your
            tutor will argue <strong className="text-ink">{tutorSide.toUpperCase()}</strong>.
          </p>
        )}
      </section>
    </div>
  );
}

interface ParticipantProps {
  icon: ReactNode;
  name: string;
  subtitle: string;
  side: DebateSide | null;
}

function Participant({ icon, name, subtitle, side }: ParticipantProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-elevated p-3">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-white text-brand-700 ring-1 ring-line">
          {icon}
        </span>
        <div>
          <p className="text-sm font-bold">{name}:</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      {side ? (
        <PositionBadge side={side} size="lg" />
      ) : (
        <span className="rounded-full border border-dashed border-line px-3 py-1 text-sm text-muted">
          Not chosen
        </span>
      )}
    </div>
  );
}
