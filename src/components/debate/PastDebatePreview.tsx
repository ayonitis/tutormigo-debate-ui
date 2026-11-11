import { Bot, User } from "lucide-react";
import { PositionBadge } from "@/components/ui/PositionBadge";
import type { PastDebate } from "@/lib/debate/types";

interface PastDebatePreviewProps {
  debate: PastDebate;
}

export function PastDebatePreview({ debate }: PastDebatePreviewProps) {
  const percent = Math.round((debate.roundsDone / debate.totalRounds) * 100);
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Topic</p>
        <p className="mt-0.5 text-lg font-bold leading-snug">&ldquo;{debate.topic}&rdquo;</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">You argued</span>
          <PositionBadge side={debate.side} />
          <span className="text-muted">· Last active {debate.lastActivity.toLowerCase()}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>
            Round {debate.roundsDone} of {debate.totalRounds} complete
          </span>
          <span className="font-mono text-xs text-muted">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Debate progress"
          aria-valuemin={0}
          aria-valuemax={debate.totalRounds}
          aria-valuenow={debate.roundsDone}
          className="mt-1.5 h-2 overflow-hidden rounded-full bg-inset"
        >
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="space-y-3 rounded-2xl bg-elevated p-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
          Where you left off (sample)
        </p>
        <div className="flex gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white">
            <User className="size-4" aria-hidden="true" />
          </span>
          <p className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm ring-1 ring-line">
            <span className="mb-0.5 block text-xs font-bold">You</span>
            {debate.lastStudentPoint}
          </p>
        </div>
        <div className="flex gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
            <Bot className="size-4" aria-hidden="true" />
          </span>
          <p className="rounded-2xl rounded-tl-sm bg-brand-50 p-3 text-sm ring-1 ring-brand-200">
            <span className="mb-0.5 block text-xs font-bold text-brand-700">AI Tutor</span>
            {debate.lastTutorPoint}
          </p>
        </div>
      </div>
    </div>
  );
}
