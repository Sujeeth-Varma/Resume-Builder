# AI-Powered Resume Optimization & Career Assistant - Project Plan

## 1. Project Overview

An intelligent, full-stack, free-of-cost career assistant platform combining **Generative AI, NLP, keyword analysis, semantic embeddings, and deterministic scoring**. It empowers job seekers to create professional resumes, analyze target job descriptions, receive explainable ATS compatibility reports, generate tailored bullet points, produce cover letters, download ATS-compliant PDFs, and practice interview questions.

---

## 2. Technology Stack & Tools Breakdown

### 2.1 Backend Architecture
* **FastAPI (Python 3.10+)**: High-performance, asynchronous Python web framework providing automatic OpenAPI docs, Pydantic data validation, and native async support.
* **SQLAlchemy 2.0 (Async) + Alembic**: Python ORM and migration tool for schema management.
* **Google Gemini API (`google-genai` SDK / `gemini-2.0-flash`)**: Free tier LLM powering generative text capabilities (Summary generation, bullet point rewriting, cover letters, and interview question synthesis).
* **SentenceTransformers (`all-MiniLM-L6-v2`)**: Local CPU-friendly embedding model producing 384-dimensional dense vectors. Runs 100% free locally for high-speed, zero-cost semantic similarity calculations.
* **spaCy (`en_core_web_sm`)**: Industrial-strength NLP library for deterministic entity extraction, skill taxonomy matching, and POS tagging from resumes and job descriptions.
* **ReportLab**: Server-side Python library generating ATS-friendly, pixel-perfect downloadable PDF documents (selectable text, structured section formatting, template variations).
* **PyJWT & Passlib (Bcrypt)**: Secure user password hashing and stateless JWT token authentication.

### 2.2 Frontend Architecture
* **React 18 + TypeScript**: Type-safe, component-driven user interface with interactive state management.
* **Vite**: Modern, ultra-fast frontend build tool and development server.
* **Tailwind CSS**: Utility-first CSS framework for crafting a dynamic, modern, responsive glassmorphic dark/light UI with custom color palettes and smooth animations.
* **Lucide React / Heroicons & Recharts**: Icons and dynamic visual reporting charts for ATS score breakdowns (Keyword Match 40%, Semantic Match 30%, Skills Match 20%, Structure 10%).
* **Axios**: Promised-based HTTP client with automatic JWT header authorization interceptors.

### 2.3 Database & Infrastructure
* **PostgreSQL 16 + `pgvector`**: Relational database with vector similarity extension, running cleanly via Docker container (`pgvector/pgvector:pg16`).
* **Docker Compose**: Containerized environment for instant database orchestration.

---

## 3. Core System Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            React + TypeScript UI                            │
│  (Profile Manager, Resume Builder, JD Analyzer, ATS Report, PDF Download)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST API (JSON / JWT)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                               FastAPI Backend                               │
├──────────────────────────────────────┬──────────────────────────────────────┤
│      Deterministic Engine            │        Generative AI Engine          │
│  • spaCy (Skill & Keyword Extract)   │  • Google Gemini 2.0 Flash          │
│  • SentenceTransformers (Embeddings) │    - Professional Summaries        │
│  • ReportLab (ATS PDF Render)        │    - Bullet Point Optimizer         │
│  • Explainable ATS Scoring (0-100)   │    - Cover Letter & Interview Qs    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Asyncpg / SQLAlchemy
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                       PostgreSQL + pgvector (Docker)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Explainable ATS Scoring Formula

The system computes an objective, explainable score out of 100 rather than relying on black-box LLM estimations:

1. **Keyword Match (40%)**: Exact and partial keyword overlap between resume and JD requirements.
2. **Semantic Similarity (30%)**: Cosine similarity between dense embeddings of resume experience and JD responsibilities (`all-MiniLM-L6-v2`).
3. **Skills Match (20%)**: Percentage of required technical & soft skills present in candidate profile.
4. **Resume Structure (10%)**: Verification of key sections (Contact info, Summary, Education, Experience, Projects, Skills).

---

## 5. Detailed Component Plan

### Phase 1: Infrastructure & Database
- Setup Docker Compose with PostgreSQL + `pgvector`.
- Configure SQLAlchemy async models (`User`, `Profile`, `Education`, `Experience`, `Project`, `Skill`, `Resume`, `JobDescription`, `ATSAnalysis`).
- Create environment configs (`.env.example`).

### Phase 2: FastAPI Backend Core
- Auth API: JWT registration, login, token refresh, password hashing.
- Profile API: CRUD endpoints for reusable user profiles.
- NLP & Embedding Services: spaCy skill extractor + `all-MiniLM-L6-v2` SentenceTransformer.
- ATS Engine: 4-part scoring module with missing skill priority categorization (High, Medium, Low).
- Gemini AI Service: Bullet improver (with anti-hallucination metrics prompts), summary builder, cover letter & interview Qs endpoints.
- ReportLab PDF Service: 3 ATS templates (Professional, Modern, Minimal).

### Phase 3: React Frontend Application
- Modern UI Layout: Glassmorphic theme, responsive sidebar, navigation bar.
- Profile & Resume Builder: Form components with inline AI generation buttons ("Generate Summary", "Improve Bullet").
- JD Analyzer & ATS Dashboard: Paste JD, view extracted requirements, animated score gauges, missing skill badges, before/after score optimizer.
- PDF Previewer & Downloader.
- Cover Letter & Interview Prep modules.

---

## 6. Verification & Quality Assurance Plan

1. **Backend Unit & Integration Testing**: `pytest` coverage for ATS scoring logic, spaCy extraction, embedding calculations, and ReportLab PDF rendering.
2. **Frontend Build Verification**: TypeScript static check (`tsc`) & Vite production bundle validation.
3. **End-to-End Validation**:
   - Create candidate profile.
   - Generate AI bullets and professional summary.
   - Analyze a real-world Job Description.
   - Run ATS analyzer, review missing keywords, apply optimization, verify score increase.
   - Download ATS-compliant PDF resume.
