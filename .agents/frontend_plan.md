# Minimalist Frontend Architecture & Design Plan (Vite + React + Tailwind v4 + Motion + Zustand + React Router)

## Design Read & Aesthetic Vision

**Design Read**: Minimalist Career & Resume AI Assistant platform inspired by Zaro's editorial aesthetic (clean warm bone/sand neutral background tokens, crisp high-contrast typography, pill badges, subtle hairline borders, interactive prompt simulation bar, bento feature grid, and smooth Motion micro-interactions).

* **Dials**: `DESIGN_VARIANCE: 7` | `MOTION_INTENSITY: 6` | `VISUAL_DENSITY: 4`
* **Color System**: CSS variables defined in `@import "tailwindcss";` / `:root` tokens (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--muted`, `--accent`). Zero hardcoded hex values or inline font sizes.
* **Typography**: Clean sans display with monospace accents for metrics & ATS scores.
* **Micro-Interactions**: Motion (`motion/react`) spring physics for layout transitions, tab switching, interactive prompt simulation bar, hover cards, and score counters.

---

## 1. Installed Stack & Architecture

- **Framework**: Vite + React 18 + TypeScript (`frontend`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with CSS Variables in `index.css`
- **UI Components**: `shadcn/ui` (`card`, `button`, `badge`, `input`, `tabs`, `dialog`, `dropdown-menu`, `avatar`)
- **State Management**: `zustand` (`src/store/useStore.ts`)
- **Routing**: `react-router` v7 (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useLocation`)
- **Animations**: `motion` (`import { motion, AnimatePresence } from "motion/react"`)
- **HTTP Client**: `axios` (`src/api/client.ts` pointing to `http://localhost:8000/api`)

---

## 2. Component Structure

```
frontend/src/
├── api/
│   └── client.ts                 # Axios API wrapper for FastAPI endpoints
├── store/
│   └── useStore.ts               # Zustand store for auth, profile, resumes, ATS report, and active job
├── lib/
│   └── utils.ts                  # cn() helper for Tailwind and shadcn
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky frosted top navbar with route links and backend status indicator
│   │   └── Footer.tsx            # Minimalist editorial footer
│   ├── ui/                       # Installed Shadcn UI components
│   └── shared/
│       ├── MotionCard.tsx        # Motion-animated wrapper for bento tiles
│       ├── ScoreGauge.tsx        # Animated ATS 4-part score visualizer
│       └── PromptBar.tsx         # Interactive Zaro-inspired AI prompt widget
└── pages/
    ├── LandingPage.tsx           # Zaro-style Hero, interactive prompt bar, 3-tile bento, capability metrics
    ├── AuthPage.tsx              # Clean JWT login & registration tabbed form
    ├── DashboardPage.tsx         # Profile manager (Education, Experience, Projects, Skills taxonomy)
    ├── ResumeBuilderPage.tsx     # Resume template selection & ReportLab PDF downloader
    ├── ATSAnalyzerPage.tsx       # Target JD analyzer, pgvector embedding match, ATS score report & skill gaps
    └── AILabPage.tsx             # AI bullet point improver, summary builder, cover letter & interview prep
```

---

## 3. API Integration Scope

- `POST /api/auth/register` & `POST /api/auth/login` (Auth Session)
- `GET /api/profile` & `POST /api/profile/skills` (Candidate Profile)
- `POST /api/resumes` & `GET /api/resumes` (Resume Snapshots)
- `POST /api/jobs/analyze` (spaCy Skill Extraction & pgvector Embeddings)
- `POST /api/ats/analyze` (4-Part ATS Scoring Engine)
- `GET /api/pdf/{id}/download` (ReportLab PDF Stream)
- `POST /api/ai/summary`, `POST /api/ai/improve-bullet`, `POST /api/ai/cover-letter`, `POST /api/ai/interview-prep` (Generative AI)

---

## 4. Verification Plan

1. **Static Type Safety**: `npm run build` (`tsc -b && vite build`)
2. **Interactive Manual Testing**: Verify all 6 pages (`/`, `/auth`, `/dashboard`, `/resumes`, `/ats`, `/ai-lab`), navigation flows, Zustand store updates, Motion micro-interactions, and live backend HTTP calls.
