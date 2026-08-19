# Enterprise AI Career Engine & Resume Optimization Platform

An intelligent, full-stack career automation platform combining **Generative AI, spaCy NLP, SentenceTransformers embeddings, PostgreSQL + pgvector, ReportLab PDF rendering, FastAPI, and Vite + React 18**.

The system enables candidates to manage structured profiles, analyze job descriptions against ATS standards, compute explainable vector-based compatibility scores, generate AI-tailored bullet points and cover letters, take software engineering skill assessments, and export ATS-compliant PDF resumes.

---

## Key Platform Modules

### 1. Structured Candidate Profile Engine
- Comprehensive candidate management covering contact details, professional summaries, work experience, education (with start/graduation month pickers), technical projects, certifications, and technical skills.
- Automated skill classification across Languages, Frameworks, Databases, Tools, Cloud & DevOps, and AI/ML categories.

### 2. Explainable 4-Part ATS Compatibility Engine
Computes an objective compatibility score out of 100 based on rigorous deterministic algorithms rather than black-box estimates:
- **Keyword Match (40%)**: Exact and partial term overlap.
- **Semantic Vector Similarity (30%)**: Cosine similarity using CPU-optimized 384-dimensional `all-MiniLM-L6-v2` dense embeddings.
- **Skill Coverage (20%)**: Extracted skill domain coverage via spaCy NLP models.
- **Structural Integrity (10%)**: Verification of standard resume section presence (Contact, Summary, Experience, Projects).
- Categorizes missing keywords by priority (High, Medium, Low) for targeted resume optimization.

### 3. Software Engineering Interview & Skill Assessment Platform
- **8 Dedicated Engineering Roles**: Full Stack AI, Backend Python/FastAPI, Frontend React/TypeScript, DevOps & Cloud, Data Science & ML, Java Spring Boot, Mobile App Development, and Cybersecurity Specialist.
- **STAR Interview FAQ Hub**: Comprehensive technical FAQs with structured Situation, Task, Action, Result (STAR) model answers.
- **Difficulty-Based Skill Tests**: Multiple-choice skill assessments across Fresher (10 Qs), Intermediate (15 Qs), and Senior (20 Qs) levels with automated score calculation and PostgreSQL attempt history tracking.
- **Custom JD Quiz Generator**: Dynamic 5 to 10 question quiz generator based on custom job description inputs.

### 4. Server-Side ReportLab PDF Rendering Engine
- Pixel-perfect, selectable-text ATS PDF output.
- Supports 3 styling templates: *Professional*, *Modern*, and *Minimalist*.

### 5. Generative AI Writing Assistant
- **Executive Summary Builder**: Synthesizes target-role executive summaries.
- **Bullet Point Optimizer**: Rewrites experience bullets into action-oriented, metric-backed statements.
- **Tailored Cover Letter Generator**: Generates role-specific and company-targeted cover letters.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Vite + React 18 + Tailwind v4 + Motion UI                   │
│   (Dashboard, Resumes & PDF, ATS Engine, Summary, Cover Letter, Interview)   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST API (JSON / JWT)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                              FastAPI Backend                                │
├──────────────────────────────────────┬──────────────────────────────────────┤
│      Deterministic Engine            │        Generative AI Engine          │
│  • spaCy (Skill & Keyword Extract)   │  • Google Gemini API                 │
│  • SentenceTransformers (Embeddings) │    - Executive Summaries            │
│  • ReportLab (ATS PDF Render)        │    - Bullet Point Improver           │
│  • Explainable ATS Scoring (0-100)   │    - Cover Letters & JD Quizzes      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Asyncpg / SQLAlchemy 2.0
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    PostgreSQL 16 + pgvector (Docker)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Backend (`/backend`)
- **FastAPI**: Asynchronous Python web framework with auto-generated OpenAPI documentation.
- **SQLAlchemy 2.0 (Async) + asyncpg**: Database ORM and async PostgreSQL driver.
- **PostgreSQL 16 + pgvector**: Relational database storing candidate profiles, quiz history, and 384-dimensional dense vectors.
- **spaCy (`en_core_web_sm`)**: Industrial NLP library for entity and skill extraction.
- **SentenceTransformers (`all-MiniLM-L6-v2`)**: Dense vector embedding model for semantic matching.
- **ReportLab**: Server-side PDF generation engine.
- **`uv`**: Ultra-fast Python package and project manager.

### Frontend (`/frontend`)
- **Vite + React 18 + TypeScript**: High-performance single page web application.
- **Tailwind CSS v4**: Modern utility-first styling with theme CSS variables.
- **Motion (`motion/react`)**: Smooth layout transitions and interactive UI elements.
- **Zustand**: Global state management (`useStore.ts`).
- **React Router v7**: Declarative routing with protected application guards (`ProtectedRoute`).
- **shadcn/ui**: Accessible UI primitives.

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+ or v22+)
- `uv` (Python project & package manager)

---

### Step 1: Start PostgreSQL + pgvector Database
```bash
docker compose up -d
```
Starts the PostgreSQL 16 container with `pgvector` enabled on port `5432`.

---

### Step 2: Initialize & Start Backend API
```bash
cd backend

# Synchronize virtual environment dependencies
uv sync

# Start FastAPI development server
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API Endpoint: `http://localhost:8000`
- OpenAPI Documentation: `http://localhost:8000/api/docs`

---

### Step 3: Start Frontend Application
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## Verification & Automated Testing

### Backend Test Suite
```bash
cd backend
uv run pytest tests/
```
Runs unit and integration tests covering authentication, candidate profiles, job analysis, ATS scoring, quiz attempts, and PDF rendering.

### Frontend Type Safety & Production Build Check
```bash
cd frontend
npm run build
```
Executes `tsc -b && vite build` verifying static type safety and production bundle compilation.

---

## License

MIT License.
