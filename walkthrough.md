# System Architecture, Flow Diagrams & Operational Guide

This document provides a comprehensive overview of how the **AI Career Engine & Resume Optimization Platform** works, including architectural flow diagrams, data pipelines, module interactions, and execution flows.

---

## High-Level System Architecture

The application is built on a decoupled full-stack architecture combining a single-page React frontend, asynchronous FastAPI backend services, local NLP vector engines, and a PostgreSQL database with `pgvector` extension.

```mermaid
graph TD
    Client["Client Browser (Vite + React 18 + Tailwind v4 + Motion)"]
    API["FastAPI Application Backend (Python 3.12 / Uvicorn)"]
    DB[("PostgreSQL 16 + pgvector Database (Docker Container)")]
    
    spaCy["spaCy NLP Engine (en_core_web_sm)"]
    ST["SentenceTransformers (all-MiniLM-L6-v2 384d Vectors)"]
    PDF["ReportLab Server-Side PDF Engine"]
    Gemini["Google Gemini Generative AI API"]

    Client <-->|REST APIs / Bearer JWT| API
    API <-->|SQLAlchemy 2.0 Async / asyncpg| DB
    API -->|Skill & Keyword Extraction| spaCy
    API -->|Dense Vector Cosine Match| ST
    API -->|Pixel-Perfect PDF Render| PDF
    API -->|Summaries, Cover Letters & JD Quizzes| Gemini
```

---

## Candidate Journey & Execution Flow

```mermaid
graph LR
    Auth["1. Authentication (/auth)"] --> Onboard["2. Onboarding Wizard (/onboarding)"]
    Onboard --> DB[("3. Candidate Profile DB")]
    DB --> Dashboard["4. Dashboard Manager (/dashboard)"]
    DB --> ATS["5. ATS Vector Engine (/ats)"]
    DB --> Resume["6. ReportLab PDF Builder (/resumes)"]
    DB --> Prep["7. Skill Assessment Tests (/interview-prep)"]
```

### Step 1: Candidate Authentication & Authorization
1. Candidates register or log in on `/auth`.
2. FastAPI hashes passwords using bcrypt and issues signed JWT access tokens with configurable expiration (`ACCESS_TOKEN_EXPIRE_MINUTES`).
3. Frontend stores the token in Zustand state (`frontend/src/store/useStore.ts`).
4. Protected routes (`ProtectedRoute`) enforce authentication across all candidate application pages.

### Step 2: Profile Onboarding & Persistence
1. Newly registered candidates are automatically routed to `/onboarding`.
2. The multi-step wizard collects Personal Info, Work Experience, Education (with native month pickers), Technical Projects, Technical Skills, and Certifications.
3. Upon completion, data is submitted to `POST /api/profile/onboard` and stored atomically in PostgreSQL.

### Step 3: Candidate Dashboard & Profile Editing
1. Candidates can update any section of their profile directly on `/dashboard`.
2. Date inputs use HTML5 month pickers (`type="month"`) for precise start and graduation/end dates.
3. Profile skills are automatically categorized into Languages, Frameworks, Databases, Tools, Cloud & DevOps, and AI/ML.

---

## 4-Part Deterministic ATS Compatibility Engine Pipeline

The ATS engine evaluates a candidate's resume or profile against a target job description through a transparent, 4-part scoring algorithm:

```mermaid
graph TD
    JobText["Target Job Description"]
    ResumeText["Candidate Resume / Profile / Document"]
    
    subgraph ATS Engine Pipeline
        KW["1. Keyword Overlap (40%)<br/>Exact & Partial String Matching"]
        Vec["2. Semantic Vector Similarity (30%)<br/>SentenceTransformers 384d Cosine Distance"]
        Skill["3. spaCy Skill Coverage (20%)<br/>Extracted Technical Entity Overlap"]
        Struct["4. Section Structure Check (10%)<br/>Contact, Summary, Experience, Projects"]
    end
    
    JobText --> KW
    JobText --> Vec
    JobText --> Skill
    
    ResumeText --> KW
    ResumeText --> Vec
    ResumeText --> Skill
    ResumeText --> Struct
    
    KW --> Score["Final ATS Compatibility Score (0 - 100)"]
    Vec --> Score
    Skill --> Score
    Struct --> Score
    
    Score --> Recommendations["Priority Keyword Recommendations<br/>(High, Medium, Low)"]
```

### ATS Input Modes
1. **Document File Upload**: Accepts PDF (`pypdf`), DOCX (`python-docx`), or TXT files.
2. **Raw Text Dump**: Paste raw resume text directly into the evaluation editor.
3. **Database Candidate Profile**: Evaluates stored PostgreSQL candidate profile data.

---

## Technical Interview & Skill Assessment Pipeline

```mermaid
graph TD
    RoleSelect["Select Engineering Role (/interview-prep)"]
    RoleDetail["Navigate to Role Page (/interview-prep/:roleId)"]
    STAR["Review Technical FAQs & STAR Model Answers"]
    SelectDiff["Select Test Difficulty<br/>(Fresher: 10Q | Intermediate: 15Q | Senior: 20Q)"]
    TakeTest["Take Interactive Multiple Choice Assessment"]
    Evaluate["Score Calculation & Detailed Option Explanations"]
    SaveHistory[("Persist Quiz Attempt to PostgreSQL Database")]

    RoleSelect --> RoleDetail
    RoleDetail --> STAR
    RoleDetail --> SelectDiff
    SelectDiff --> TakeTest
    TakeTest --> Evaluate
    Evaluate --> SaveHistory
```

### Operational Steps for Interview Prep
1. **Role Exploration**: Candidates select from 8 software engineering roles (Full Stack AI, Backend Python, Frontend React, DevOps AWS, Data Science ML, Java Spring Boot, Mobile App, Cybersecurity).
2. **Dynamic Deep-Linking**: Navigates to `/interview-prep/:roleId` with clean URL routing.
3. **STAR FAQs Review**: Candidates read top technical questions paired with Situation, Task, Action, Result (STAR) model answers.
4. **Interactive Skill Tests**: Candidates take multiple choice tests with smooth Framer Motion `layoutId` difficulty tab transitions.
5. **Database Attempt History**: Test results (score, total, percentage, answers) are persisted to the database and displayed under "My Test Attempts".
6. **Custom JD Quiz Generator**: Converts custom job posting text into a 5-10 question skill evaluation quiz.

---

## ReportLab Server-Side PDF Rendering Pipeline

```mermaid
graph LR
    ProfileDB[("PostgreSQL Candidate Profile")] --> Fetch["Fetch Profile Data"]
    Fetch --> Template["Select Template Style<br/>(Professional / Modern / Minimalist)"]
    Template --> ReportLab["ReportLab Flowable Engine"]
    ReportLab --> PDFStream["Binary PDF Stream (application/pdf)"]
    PDFStream --> Browser["Client Browser Direct Download"]
```

### PDF Rendering Features
- Zero HTML canvas rasterization; uses true native vector text rendering.
- Text in generated PDFs is 100% searchable and selectable by automated ATS parsers.
- Clean typography hierarchy, strict layout boundaries, and bullet point formatting.

---

## Verification & Build Validation Commands

### 1. Database Service Status
```bash
docker compose up -d
```
Verifies PostgreSQL 16 container status with `pgvector` extension on port `5432`.

### 2. Backend Automated Test Suite
```bash
cd backend
uv run pytest tests/
```
Executes pytest suites for auth, profile, job parsing, ATS scoring, quiz attempts, and PDF rendering.

### 3. Frontend Production Build Check
```bash
cd frontend
npm run build
```
Executes TypeScript type checking (`tsc -b`) and Vite production bundle compilation.
