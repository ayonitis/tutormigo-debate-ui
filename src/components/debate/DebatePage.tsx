import { DebateIntroduction } from "@/components/debate/DebateIntroduction";
import { DebateWorkspace } from "@/components/debate/DebateWorkspace";

export function DebatePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DebateIntroduction />
      <DebateWorkspace />
    </div>
  );
}
