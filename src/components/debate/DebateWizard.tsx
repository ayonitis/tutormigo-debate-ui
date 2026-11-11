"use client";

import { ArrowLeft, ArrowRight, Info, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DebateReview } from "@/components/debate/DebateReview";
import { DebateSettings } from "@/components/debate/DebateSettings";
import { GradeSelection } from "@/components/debate/GradeSelection";
import { SideSelection } from "@/components/debate/SideSelection";
import { TopicSelection } from "@/components/debate/TopicSelection";
import { WizardProgress } from "@/components/debate/WizardProgress";
import { Button } from "@/components/ui/Button";
import { WIZARD_STEPS } from "@/lib/debate/data";
import type { DebateSetup } from "@/lib/debate/types";
import {
  findTopic,
  getMaxReachableStep,
  getStepHint,
  getTopicText,
  INITIAL_SETUP,
  isStepValid,
} from "@/lib/debate/validation";

interface DebateWizardProps {
  onStart: (setup: DebateSetup) => void;
}

const LAST_STEP = WIZARD_STEPS.length - 1;

export function DebateWizard({ onStart }: DebateWizardProps) {
  const [setup, setSetup] = useState<DebateSetup>(INITIAL_SETUP);
  const [step, setStep] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Move focus to the new step heading so keyboard and screen reader users land in context.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    panelRef.current?.querySelector<HTMLElement>("h2")?.focus();
  }, [step]);

  const update = (patch: Partial<DebateSetup>) => {
    setSetup((previous) => {
      const next = { ...previous, ...patch };
      // If the grade changes, drop a suggested topic that doesn't fit the new level.
      if (patch.grade && patch.grade !== previous.grade && next.topicId) {
        const topic = findTopic(next.topicId);
        if (topic && !topic.levels.includes(patch.grade)) next.topicId = null;
      }
      return next;
    });
  };

  const goTo = (index: number) => {
    setStep(index);
    setMaxVisited((previous) => Math.max(previous, index));
  };

  const maxReachable = getMaxReachableStep(setup);
  const stepValid = isStepValid(step, setup);
  const hint = getStepHint(step, setup);
  const isLast = step === LAST_STEP;
  const topicText = getTopicText(setup);

  return (
    <section
      aria-label="Debate setup"
      className="rounded-3xl border border-line bg-white shadow-[0_1px_2px_rgba(22,27,36,0.04)]"
    >
      <div className="border-b border-line-soft px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
        <WizardProgress
          steps={WIZARD_STEPS}
          currentStep={step}
          isCompleted={(index) => index <= maxVisited && isStepValid(index, setup)}
          isReachable={(index) => index <= maxReachable}
          onSelect={goTo}
        />
      </div>

      <div ref={panelRef} className="px-5 py-6 sm:px-8 sm:py-8">
        <div key={step} className="animate-step-in">
          {step === 0 && (
            <GradeSelection value={setup.grade} onChange={(grade) => update({ grade })} />
          )}
          {step === 1 && <TopicSelection setup={setup} onChange={update} />}
          {step === 2 && (
            <SideSelection
              topicText={topicText}
              value={setup.side}
              onChange={(side) => update({ side })}
            />
          )}
          {step === 3 && (
            <DebateSettings
              length={setup.length}
              voiceMatch={setup.voiceMatch}
              onLengthChange={(length) => update({ length })}
              onVoiceChange={(voiceMatch) => update({ voiceMatch })}
            />
          )}
          {step === 4 && <DebateReview setup={setup} onEdit={goTo} />}
        </div>
      </div>

      <footer className="sticky bottom-0 z-20 rounded-b-3xl border-t border-line bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
        {hint && (
          <p id="wizard-hint" className="mb-2.5 flex items-start gap-1.5 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {hint}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="lg"
            disabled={step === 0}
            onClick={() => goTo(step - 1)}
            className="flex-1 sm:flex-none sm:min-w-32"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>

          {isLast ? (
            <Button
              variant="cta"
              size="lg"
              disabled={!stepValid}
              aria-describedby={hint ? "wizard-hint" : undefined}
              onClick={() => onStart(setup)}
              className="flex-[2] sm:flex-none sm:min-w-56"
            >
              <Play className="size-4 fill-current" aria-hidden="true" />
              Start the debate
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              disabled={!stepValid}
              aria-describedby={hint ? "wizard-hint" : undefined}
              onClick={() => goTo(step + 1)}
              className="flex-[2] sm:flex-none sm:min-w-40"
            >
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </footer>
    </section>
  );
}
