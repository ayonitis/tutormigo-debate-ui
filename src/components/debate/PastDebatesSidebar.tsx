"use client";

import { useState } from "react";
import { PastDebateCard } from "@/components/debate/PastDebateCard";
import { AICompanion } from "@/components/ui/AICompanion";
import { PAST_DEBATES } from "@/lib/debate/data";
import type { PastDebate } from "@/lib/debate/types";

interface PastDebatesSidebarProps {
  onContinue: (debate: PastDebate) => void;
}

const PREVIEW_COUNT = 4;

export function PastDebatesSidebar({ onContinue }: PastDebatesSidebarProps) {
  const [showAll, setShowAll] = useState(false);
  const [previewEmpty, setPreviewEmpty] = useState(false);

  const debates = previewEmpty ? [] : PAST_DEBATES;
  const visible = showAll ? debates : debates.slice(0, PREVIEW_COUNT);
  const canExpand = debates.length > PREVIEW_COUNT;

  return (
    <aside
      id="past-debates"
      aria-labelledby="past-debates-heading"
      className="scroll-mt-24 rounded-3xl border border-line-soft bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="past-debates-heading" className="text-lg font-bold">
          Past debates
        </h2>
        {canExpand && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="min-h-9 rounded-lg px-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {debates.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-5 py-6 text-center">
          <AICompanion variant="empty" className="size-28" />
          <p className="mt-4 text-base font-bold">No debates yet</p>
          <p className="mt-1 text-sm text-muted">
            Your debate history will appear here once you complete your first debate.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((debate) => (
            <li key={debate.id}>
              <PastDebateCard debate={debate} onContinue={onContinue} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 border-t border-line pt-3">
        <button
          type="button"
          onClick={() => {
            setPreviewEmpty((value) => !value);
            setShowAll(false);
          }}
          aria-pressed={previewEmpty}
          className="min-h-9 rounded-lg px-2 text-xs font-semibold text-muted hover:bg-white hover:text-ink"
        >
          Demo: {previewEmpty ? "show sample history" : "preview empty state"}
        </button>
      </div>
    </aside>
  );
}
