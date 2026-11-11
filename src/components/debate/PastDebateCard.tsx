import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PositionBadge } from "@/components/ui/PositionBadge";
import type { PastDebate } from "@/lib/debate/types";

interface PastDebateCardProps {
  debate: PastDebate;
  onContinue: (debate: PastDebate) => void;
}

export function PastDebateCard({ debate, onContinue }: PastDebateCardProps) {
  return (
    <article className="rounded-2xl border border-line-soft bg-white p-4 transition-colors hover:border-brand-200">
      <h3 className="text-sm font-bold leading-snug">{debate.topic}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Clock className="size-3.5" aria-hidden="true" />
          {debate.lastActivity}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          You: <PositionBadge side={debate.side} size="sm" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs text-muted">
          Round {debate.roundsDone} of {debate.totalRounds}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onContinue(debate)}
          aria-label={`Continue debate: ${debate.topic}`}
        >
          Continue
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
