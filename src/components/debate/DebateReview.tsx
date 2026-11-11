import { Bot, Coins, GraduationCap, MessageSquareQuote, Mic, MicOff, Timer, User } from "lucide-react";
import type { ReactNode } from "react";
import { StepHeader } from "@/components/debate/StepHeader";
import { AICompanion } from "@/components/ui/AICompanion";
import { PositionBadge } from "@/components/ui/PositionBadge";
import type { DebateSetup } from "@/lib/debate/types";
import { findGrade, findLength, getTopicText, getTutorSide } from "@/lib/debate/validation";

interface DebateReviewProps {
  setup: DebateSetup;
  onEdit: (stepIndex: number) => void;
}

export function DebateReview({ setup, onEdit }: DebateReviewProps) {
  const grade = findGrade(setup.grade);
  const topic = getTopicText(setup);
  const length = findLength(setup.length);
  const tutorSide = setup.side ? getTutorSide(setup.side) : null;

  return (
    <div>
      <StepHeader
        stepNumber={5}
        totalSteps={5}
        title="You're ready to debate!"
        description="Take one last look at your setup before entering the debate."
      />

      <section
        aria-label="Debate summary"
        className="overflow-hidden rounded-2xl border-2 border-brand-200 bg-white"
      >
        <div className="flex items-center gap-4 border-b border-brand-100 bg-brand-50 p-4 sm:p-5">
          <AICompanion variant="ready" className="size-20 sm:size-24" />
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-700">
              Debate summary
            </p>
            <p className="mt-1 text-lg font-bold leading-snug">Everything looks set!</p>
            <p className="text-sm text-muted">Tap Edit on any row to make a change.</p>
          </div>
        </div>

        <dl className="divide-y divide-line-soft">
          <Row icon={<MessageSquareQuote className="size-5" />} label="Topic" onEdit={() => onEdit(1)} editLabel="topic">
            <span className="break-words text-lg font-bold leading-snug">
              {topic ? <>&ldquo;{topic}&rdquo;</> : "Not selected"}
            </span>
          </Row>

          <Row icon={<GraduationCap className="size-5" />} label="Grade level" onEdit={() => onEdit(0)} editLabel="grade level">
            <span className="font-semibold">
              {grade ? `${grade.label} — ${grade.name}` : "Not selected"}
            </span>
          </Row>

          <Row icon={<User className="size-5" />} label="Your side (Student)" onEdit={() => onEdit(2)} editLabel="side">
            {setup.side ? <PositionBadge side={setup.side} size="lg" /> : "Not selected"}
          </Row>

          <Row icon={<Bot className="size-5" />} label="Tutor's side (AI Tutor)" onEdit={() => onEdit(2)} editLabel="side">
            {tutorSide ? <PositionBadge side={tutorSide} size="lg" /> : "Not selected"}
          </Row>

          <Row icon={<Timer className="size-5" />} label="Debate length" onEdit={() => onEdit(3)} editLabel="debate length">
            <span className="font-semibold">
              {length.title}{" "}
              <span className="font-normal text-muted">· {length.demoRounds} rounds (demo value)</span>
            </span>
          </Row>

          <Row
            icon={setup.voiceMatch ? <Mic className="size-5" /> : <MicOff className="size-5" />}
            label="Voice match"
            onEdit={() => onEdit(3)}
            editLabel="voice match"
          >
            {setup.voiceMatch ? (
              <span className="font-semibold">
                On <span className="font-normal text-muted">· </span>
                <span className="inline-flex items-center gap-1 font-normal text-muted">
                  <Coins className="size-3.5" aria-hidden="true" />
                  Uses credits when enabled
                </span>
              </span>
            ) : (
              <span className="font-semibold">Off</span>
            )}
          </Row>
        </dl>
      </section>

      <p className="mt-4 text-sm text-muted">
        This is a frontend demo. Starting shows a preview only — no AI debate is created and no
        credits are deducted.
      </p>
    </div>
  );
}

interface RowProps {
  icon: ReactNode;
  label: string;
  editLabel: string;
  onEdit: () => void;
  children: ReactNode;
}

function Row({ icon, label, editLabel, onEdit, children }: RowProps) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-inset text-brand-700"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
        <dd className="mt-1">{children}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="min-h-9 shrink-0 rounded-lg px-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        Edit<span className="sr-only"> {editLabel}</span>
      </button>
    </div>
  );
}
