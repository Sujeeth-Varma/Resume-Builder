# AI-Powered Resume Optimization & Career Assistant

An intelligent, full-stack, free-of-cost career assistant platform combining **Generative AI, spaCy NLP, local SentenceTransformers embeddings, PostgreSQL + pgvector, ReportLab PDF rendering, FastAPI, and Vite + React 18**.

It empowers job seekers to build candidate profiles, analyze target job descriptions, compute explainable ATS compatibility scores, generate AI-tailored bullet points, draft cover letters, and download pixel-perfect ATS-compliant PDFs.

---

## 🌟 Key Features

1. **Structured Candidate Profile & Taxonomy**:
   - Manage work experience, education, technical projects, and skills categorized by domain (Languages, Frameworks, Databases, Tools, Cloud, Soft Skills).

2. **4-Part Deterministic ATS Compatibility Engine**:
   - Computes an objective, explainable score out of 100 rather than black-box estimations:
     - **Keyword Match (40%)**: Exact & partial overlap of terms and tools.
     - **Semantic Similarity (30%)**: Cosine similarity via local CPU-friendly 384-dimensional `all-MiniLM-L6-v2` dense vectors.
     - **Skill Taxonomy Overlap (20%)**: spaCy NLP extracted skills coverage.
     - **Resume Structure (10%)**: Verification of essential sections (Contact, Summary, Experience, Projects).
   - Categorizes missing keywords into High, Medium, and Low priority tags.

3. **Server-Side ReportLab PDF Generator**:
   - Pixel-perfect, selectable text ATS PDF downloads in 3 structured templates: *Professional*, *Modern*, and *Minimalist*.

4. **Generative AI Career Assistant**:
   - **Bullet Point Optimizer**: Rewrites experience bullets into action-driven, metric-focused statements.
   - **Executive Summary Builder**: Synthesizes target-role executive summaries.
   - **Tailored Cover Letter Generator**: Drafts role and company-specific cover letters.
   - **Technical Interview Prep**: Synthesizes role-specific technical interview questions.

5. **Zaro-Inspired Minimalist Frontend**:
   - Built with React 18, Vite, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Zustand state management, React Router v7, and `shadcn/ui`.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Vite + React 18 + Tailwind v4 + Motion UI                   │
│   (Overview, Profile Manager, Resume Builder, ATS Analyzer, AI Lab)         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST API (JSON / JWT)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                              FastAPI Backend                                │
├──────────────────────────────────────┬──────────────────────────────────────┤
│      Deterministic Engine            │        Generative AI Engine          │
│  • spaCy (Skill & Keyword Extract)   │  • Google Gemini API / Fallbacks    │
│  • SentenceTransformers (Embeddings) │    - Executive Summaries            │
│  • ReportLab (ATS PDF Render)        │    - Bullet Point Improver           │
│  • Explainable ATS Scoring (0-100)   │    - Cover Letter & Interview Qs    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Asyncpg / SQLAlchemy 2.0
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    PostgreSQL 16 + pgvector (Docker)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack Breakdown

### Backend (`/backend`)
- **FastAPI**: Asynchronous Python web framework with auto-generated OpenAPI docs.
- **SQLAlchemy 2.0 (Async) + asyncpg**: Database ORM and async driver.
- **PostgreSQL 16 + `pgvector`**: Relational database storing 384-dimensional dense vectors.
- **spaCy (`en_core_web_sm`)**: Industrial NLP library for entity & skill extraction.
- **SentenceTransformers (`all-MiniLM-L6-v2`)**: Zero-cost local CPU dense vector model.
- **ReportLab**: Server-side PDF generation engine.
- **`uv`**: Ultra-fast Python package and project manager.

### Frontend (`/frontend`)
- **Vite + React 18 + TypeScript**: Lightning-fast web application.
- **Tailwind CSS v4**: Utility CSS with theme CSS variables (`index.css`).
- **Motion (`motion/react`)**: Micro-interactions, spring physics, and animated score gauges.
- **Zustand**: Clean global state management (`useStore.ts`).
- **React Router v7**: Multi-page routing (`BrowserRouter`, `Routes`, `Route`).
- **shadcn/ui**: Accessible UI primitives (`card`, `button`, `badge`, `input`, `tabs`, `dialog`, `dropdown-menu`, `avatar`).

---

## 🚀 Quickstart Guide

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) v18+ or v22+
- [`uv`](https://github.com/astral-sh/uv) (Python project & package manager)

---

### Step 1: Start PostgreSQL + pgvector Database
```bash
docker compose up -d
```
*This starts the PostgreSQL 16 container with `pgvector` enabled on port `5432`.*

---

### Step 2: Initialize & Run Backend
```bash
cd backend

# Create virtual environment and install dependencies using uv
uv venv
uv pip install -r requirements.txt
uv pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl

# Start FastAPI development server
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API Endpoint: `http://localhost:8000`
- Interactive OpenAPI Docs: `http://localhost:8000/api/docs`

---

### Step 3: Run Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🧪 Verification & Testing

### Backend Unit & Integration Tests
```bash
cd backend
uv run pytest tests/
```
*Executes all 4 unit & integration test suites covering auth, profile, job analysis, ATS scoring, and PDF generation.*

### Frontend Production Build Check
```bash
cd frontend
npm run build
```
*Runs `tsc -b && vite build` verifying static type safety and production bundle compilation.*

---

## 📄 License

MIT License. Free and open source for all job seekers.
