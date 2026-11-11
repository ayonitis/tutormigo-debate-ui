interface StepHeaderProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
}

export function StepHeader({ stepNumber, totalSteps, title, description }: StepHeaderProps) {
  return (
    <header className="mb-6">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-700">
        Step {stepNumber} of {totalSteps}
      </p>
      <h2
        tabIndex={-1}
        className="mt-1.5 scroll-mt-24 text-2xl font-bold tracking-tight text-ink outline-none sm:text-[1.75rem]"
      >
        {title}
      </h2>
      <p className="mt-1.5 max-w-xl text-base text-muted">{description}</p>
    </header>
  );
}
