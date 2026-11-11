# TutorMigo Debate — Frontend Demo

A frontend-only, interactive recreation of the TutorMigo **Debate** setup experience: a guided
five-step wizard (grade → topic → side → customize → review), a "Past debates" sidebar, and
simulated start / continue previews. There is **no backend, authentication, AI call or payment**
involved. Everything runs from local React state and mock data.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- `lucide-react` icons
- `next/font` (Inter + JetBrains Mono, matching tutormigo.ai)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run build      # production build
```

No environment variables are needed for the demo.

## Project structure

```
src/
  app/                    layout, page, global styles, favicon (official TutorMigo icon)
  components/
    layout/               Navbar, MobileNavigation, BrandLogo
    debate/               DebatePage, DebateIntroduction, DebateWorkspace, DebateWizard,
                          WizardProgress, GradeSelection, TopicSelection, CustomTopicInput,
                          SideSelection, DebateSettings, DebateReview, PastDebatesSidebar,
                          PastDebateCard, DemoModal and the preview content components
    ui/                   Button, SelectCard, PositionBadge, AICompanion
  lib/
    debate/               types, mock data, validation helpers
    navigation.ts         nav items
public/assets/
  brand/                  official TutorMigo icon (unmodified, from tutormigo.ai)
  illustrations/          original AI-companion illustrations (see below)
```

## Notes on content

- **Branding:** colors, typography and the logo icon follow tutormigo.ai (indigo `#4761e4`
  primary, Inter + JetBrains Mono, 1.5rem card radius). The logo icon is the unmodified public
  asset.
- **Illustrations:** the three companion illustrations in `public/assets/illustrations` are
  original AI-generated artwork made for this demo. They are *not* official TutorMigo characters.
- **Round counts** (Quick = 3, Full = 5) are clearly labeled demo values.
- **Voice match** shows "Uses credits when enabled." No real credit price is stated, and no
  credits are deducted.
- Past-debate data and the start / continue previews are local mock content.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel (framework preset: Next.js, defaults are fine).
3. Deploy — no environment variables are required.

The project also contains the template's optional Drizzle/PostgreSQL files (`src/db`,
`/api/health`); the Debate demo does not use them.
