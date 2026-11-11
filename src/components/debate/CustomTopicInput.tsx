import { CheckCircle2, CircleAlert, PencilLine, Undo2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  CUSTOM_TOPIC_MAX,
  CUSTOM_TOPIC_MIN,
  getCustomTopicStatus,
} from "@/lib/debate/validation";

interface CustomTopicInputProps {
  value: string;
  active: boolean;
  onChange: (value: string) => void;
  onUse: () => void;
  onSwitchToSuggested: () => void;
}

export function CustomTopicInput({
  value,
  active,
  onChange,
  onUse,
  onSwitchToSuggested,
}: CustomTopicInputProps) {
  const [touched, setTouched] = useState(false);
  const status = getCustomTopicStatus(value);
  const showFeedback = active && (touched || value.length > 0);
  const hasError = showFeedback && status !== "valid";

  let message = `Tip: phrase it as a question, like "Should…?" or "Is…?" (${CUSTOM_TOPIC_MIN}–${CUSTOM_TOPIC_MAX} characters).`;
  if (showFeedback) {
    if (status === "empty") message = "Type a topic to use your own idea.";
    else if (status === "short")
      message = `Add a few more words — at least ${CUSTOM_TOPIC_MIN} characters (${value.trim().length} so far).`;
    else message = "Looks great — your topic is ready.";
  }

  return (
    <section
      aria-labelledby="custom-topic-heading"
      className={cn(
        "rounded-2xl border-2 p-4 transition-colors sm:p-5",
        active ? "border-brand-500 bg-brand-50" : "border-dashed border-brand-300 bg-white",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-700"
          >
            <PencilLine className="size-5" />
          </span>
          <div>
            <h3 id="custom-topic-heading" className="text-base font-bold">
              Bring your own idea
            </h3>
            <p className="text-sm text-muted">Debate anything you&apos;re curious about.</p>
          </div>
        </div>
        {active ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
            Using your topic
          </span>
        ) : (
          <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-muted">
            Not in use
          </span>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="custom-topic" className="text-sm font-semibold">
          Your debate topic
        </label>
        <input
          id="custom-topic"
          type="text"
          value={value}
          maxLength={CUSTOM_TOPIC_MAX}
          autoComplete="off"
          placeholder="e.g. Should kids learn to code in school?"
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={hasError}
          aria-describedby="custom-topic-help"
          className={cn(
            "mt-1.5 min-h-12 w-full rounded-xl border-2 bg-white px-4 text-base text-ink placeholder:text-[#7b8088]",
            hasError ? "border-against-600" : "border-line focus:border-brand-500",
          )}
        />
        <div className="mt-2 flex items-start justify-between gap-3">
          <p
            id="custom-topic-help"
            aria-live="polite"
            className={cn(
              "flex items-start gap-1.5 text-sm",
              hasError ? "font-medium text-against-700" : "text-muted",
              showFeedback && status === "valid" && "font-medium text-for-700",
            )}
          >
            {hasError && <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
            {showFeedback && status === "valid" && (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            <span>{message}</span>
          </p>
          <span className="shrink-0 font-mono text-xs text-muted" aria-hidden="true">
            {value.length}/{CUSTOM_TOPIC_MAX}
          </span>
        </div>
      </div>

      {active ? (
        <Button variant="ghost" size="sm" className="mt-3 -ml-3" onClick={onSwitchToSuggested}>
          <Undo2 className="size-4" aria-hidden="true" />
          Switch back to suggested topics
        </Button>
      ) : (
        status === "valid" && (
          <Button variant="secondary" size="sm" className="mt-3" onClick={onUse}>
            Use my topic
          </Button>
        )
      )}
    </section>
  );
}
