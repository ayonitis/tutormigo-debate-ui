import { Coins, Info, Mic, MicOff } from "lucide-react";
import { StepHeader } from "@/components/debate/StepHeader";
import { SelectCard } from "@/components/ui/SelectCard";
import { cn } from "@/lib/cn";
import { DEBATE_LENGTHS } from "@/lib/debate/data";
import type { DebateLengthId } from "@/lib/debate/types";

interface DebateSettingsProps {
  length: DebateLengthId;
  voiceMatch: boolean;
  onLengthChange: (length: DebateLengthId) => void;
  onVoiceChange: (enabled: boolean) => void;
}

export function DebateSettings({
  length,
  voiceMatch,
  onLengthChange,
  onVoiceChange,
}: DebateSettingsProps) {
  return (
    <div>
      <StepHeader
        stepNumber={4}
        totalSteps={5}
        title="Make your debate your own."
        description="Choose how long you'd like to debate and whether you'd like to use voice."
      />

      <fieldset>
        <legend className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
          Debate length
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {DEBATE_LENGTHS.map((option) => {
            const Icon = option.icon;
            return (
              <SelectCard
                key={option.id}
                name="length"
                value={option.id}
                checked={length === option.id}
                onChange={() => onLengthChange(option.id)}
                className="sm:p-5"
              >
                <span className="flex items-center gap-3 pr-8">
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-700"
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="text-lg font-bold">{option.title}</span>
                </span>
                <span className="mt-3 block text-sm text-muted">{option.description}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-inset px-3 py-1 font-mono text-xs font-semibold text-ink">
                  {option.demoRounds} rounds
                  <span className="font-sans font-medium text-muted">· demo value</span>
                </span>
              </SelectCard>
            );
          })}
        </div>
      </fieldset>

      <section
        aria-labelledby="voice-title"
        className={cn(
          "mt-6 rounded-2xl border-2 p-4 transition-colors sm:p-5",
          voiceMatch ? "border-brand-500 bg-brand-50" : "border-line bg-white",
        )}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-xl",
              voiceMatch ? "bg-brand-500 text-white" : "bg-inset text-muted",
            )}
          >
            {voiceMatch ? <Mic className="size-6" /> : <MicOff className="size-6" />}
          </span>
          <div className="min-w-0 flex-1">
            <h3 id="voice-title" className="text-lg font-bold">
              Enable voice match
            </h3>
            <p id="voice-desc" className="mt-1 text-sm text-muted">
              Let your AI tutor respond using voice for a more conversational debate experience.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-1">
            <button
              type="button"
              role="switch"
              aria-checked={voiceMatch}
              aria-labelledby="voice-title"
              aria-describedby="voice-desc voice-credit"
              onClick={() => onVoiceChange(!voiceMatch)}
              className={cn(
                "relative h-8 w-14 rounded-full border-2 transition-colors",
                voiceMatch ? "border-brand-500 bg-brand-500" : "border-[#8a909b] bg-[#8a909b]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-0.5 size-6 rounded-full bg-white shadow transition-[left] duration-150",
                  voiceMatch ? "left-[26px]" : "left-0.5",
                )}
              />
            </button>
            <span className="font-mono text-xs font-bold uppercase" aria-hidden="true">
              {voiceMatch ? "On" : "Off"}
            </span>
          </div>
        </div>

        <div
          id="voice-credit"
          className={cn(
            "mt-4 flex items-start gap-2.5 rounded-xl p-3 text-sm",
            voiceMatch ? "bg-white text-ink ring-1 ring-brand-200" : "bg-elevated text-muted",
          )}
        >
          <Coins
            className={cn("mt-0.5 size-4 shrink-0", voiceMatch ? "text-brand-700" : "text-muted")}
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">
              {voiceMatch ? "Voice match is on. Uses credits when enabled." : "Uses credits when enabled."}
            </p>
            <p className="mt-0.5 flex items-start gap-1.5 text-xs text-muted">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              This is a frontend demo — no credits are actually deducted.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
