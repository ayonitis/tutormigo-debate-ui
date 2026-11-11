"use client";

import { useState } from "react";
import { DebateStartPreview } from "@/components/debate/DebateStartPreview";
import { DebateWizard } from "@/components/debate/DebateWizard";
import { DemoModal } from "@/components/debate/DemoModal";
import { PastDebatePreview } from "@/components/debate/PastDebatePreview";
import { PastDebatesSidebar } from "@/components/debate/PastDebatesSidebar";
import { Button } from "@/components/ui/Button";
import type { DebateSetup, PastDebate } from "@/lib/debate/types";

/** Owns the demo-only UI state: wizard reset key and which preview modal is open. */
export function DebateWorkspace() {
  const [wizardKey, setWizardKey] = useState(0);
  const [startedSetup, setStartedSetup] = useState<DebateSetup | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [pastDebate, setPastDebate] = useState<PastDebate | null>(null);
  const [pastOpen, setPastOpen] = useState(false);

  const openStart = (setup: DebateSetup) => {
    setStartedSetup(setup);
    setStartOpen(true);
  };

  const openPast = (debate: PastDebate) => {
    setPastDebate(debate);
    setPastOpen(true);
  };

  return (
    <>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_22.5rem]">
        <DebateWizard key={wizardKey} onStart={openStart} />
        <PastDebatesSidebar onContinue={openPast} />
      </div>

      <DemoModal
        open={startOpen && startedSetup !== null}
        onClose={() => setStartOpen(false)}
        eyebrow="Debate starting soon"
        title="Your debate is set up!"
        footer={
          <>
            <Button variant="secondary" size="lg" onClick={() => setStartOpen(false)}>
              Back to setup
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setStartOpen(false);
                setWizardKey((key) => key + 1);
              }}
            >
              Start a new setup
            </Button>
          </>
        }
      >
        {startedSetup && <DebateStartPreview setup={startedSetup} />}
      </DemoModal>

      <DemoModal
        open={pastOpen && pastDebate !== null}
        onClose={() => setPastOpen(false)}
        eyebrow="Continue debate"
        title="Pick up where you left off"
        footer={
          <Button variant="primary" size="lg" onClick={() => setPastOpen(false)}>
            Close preview
          </Button>
        }
      >
        {pastDebate && <PastDebatePreview debate={pastDebate} />}
      </DemoModal>
    </>
  );
}
