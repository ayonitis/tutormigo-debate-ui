import { CheckCircle2, CircleDashed } from "lucide-react";
import { useState } from "react";
import { CustomTopicInput } from "@/components/debate/CustomTopicInput";
import { StepHeader } from "@/components/debate/StepHeader";
import { SelectCard } from "@/components/ui/SelectCard";
import { cn } from "@/lib/cn";
import { FEATURED_TOPICS, TOPIC_CATEGORIES } from "@/lib/debate/data";
import type { DebateSetup, TopicCategoryId } from "@/lib/debate/types";
import { getMoreTopicsForGrade, getTopicText } from "@/lib/debate/validation";

interface TopicSelectionProps {
  setup: DebateSetup;
  onChange: (patch: Partial<DebateSetup>) => void;
}

type CategoryFilter = TopicCategoryId | "all";

const categoryById = Object.fromEntries(TOPIC_CATEGORIES.map((c) => [c.id, c])) as Record<
  TopicCategoryId,
  (typeof TOPIC_CATEGORIES)[number]
>;

export function TopicSelection({ setup, onChange }: TopicSelectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const suggestedActive = setup.topicMode === "suggested";
  const customActive = setup.topicMode === "custom";
  const topicText = getTopicText(setup);

  const gradeTopics = getMoreTopicsForGrade(setup.grade);
  const visibleTopics =
    filter === "all" ? gradeTopics : gradeTopics.filter((topic) => topic.category === filter);

  const selectSuggested = (topicId: string) =>
    onChange({ topicMode: "suggested", topicId });

  return (
    <div>
      <StepHeader
        stepNumber={2}
        totalSteps={5}
        title="What would you like to debate?"
        description="Pick a suggested topic or bring your own idea."
      />

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3",
          topicText ? "border-for-100 bg-for-50" : "border-line bg-elevated",
        )}
      >
        {topicText ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-for-600" aria-hidden="true" />
        ) : (
          <CircleDashed className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
            {customActive ? "Your own topic" : "Your debate topic"}
          </p>
          <p className={cn("break-words text-base font-semibold", !topicText && "text-muted")}>
            {topicText ?? "Nothing selected yet"}
          </p>
          {topicText && <p className="text-xs font-semibold text-for-700">Ready to debate</p>}
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
          Featured topics
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {FEATURED_TOPICS.map((topic) => {
            const category = categoryById[topic.category];
            const Icon = category.icon;
            return (
              <SelectCard
                key={topic.id}
                name="topic"
                value={topic.id}
                checked={suggestedActive && setup.topicId === topic.id}
                onChange={() => selectSuggested(topic.id)}
                className="sm:p-5"
              >
                <span className="flex items-center gap-2 pr-8">
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-700"
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="text-xs font-semibold text-muted">{category.label}</span>
                </span>
                <span className="mt-3 block text-base font-bold leading-snug text-ink">
                  {topic.title}
                </span>
                <span className="mt-1.5 block text-sm text-muted">{topic.blurb}</span>
              </SelectCard>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <CustomTopicInput
          value={setup.customTopic}
          active={customActive}
          onChange={(value) => onChange({ customTopic: value, topicMode: "custom" })}
          onUse={() => onChange({ topicMode: "custom" })}
          onSwitchToSuggested={() => onChange({ topicMode: "suggested" })}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
          More topics for your grade
        </legend>

        <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
          {[{ id: "all" as const, label: "All" }, ...TOPIC_CATEGORIES].map((category) => {
            const selected = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
                  selected
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="max-h-72 overflow-y-auto rounded-2xl border border-line bg-white">
          {visibleTopics.length === 0 ? (
            <p className="p-4 text-sm text-muted">No topics in this category for your grade yet.</p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {visibleTopics.map((topic) => {
                const checked = suggestedActive && setup.topicId === topic.id;
                const category = categoryById[topic.category];
                return (
                  <li key={topic.id}>
                    <label
                      className={cn(
                        "flex min-h-14 cursor-pointer items-center gap-3 px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-brand-500",
                        checked ? "bg-brand-50" : "hover:bg-elevated",
                      )}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={topic.id}
                        checked={checked}
                        onChange={() => selectSuggested(topic.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border-2",
                          checked ? "border-brand-500 bg-brand-500" : "border-line bg-white",
                        )}
                      >
                        {checked && <span className="size-1.5 rounded-full bg-white" />}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold sm:text-base">
                        {topic.title}
                      </span>
                      <span className="hidden shrink-0 rounded-full bg-inset px-2.5 py-0.5 text-xs font-semibold text-muted sm:inline">
                        {category.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </fieldset>
    </div>
  );
}
