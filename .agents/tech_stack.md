# Technology Stack & Tools Reference

## 1. Overview

This document provides a reference for the technology stack, software tools, libraries, and frameworks selected for the AI-Powered Resume Optimization & Career Assistant application.

---

## 2. Core Technology Stack

### 2.1 Generative AI & LLM Layer
* **Tool / Library**: Google Gemini API (`google-genai` SDK, `gemini-2.0-flash`)
* **Purpose**: Generates and refines professional summaries, experience and project bullet points, cover letters, and tailored interview questions.
* **Selection Rationale**: High-speed, high-quality output available on a free tier, eliminating external API usage costs.

### 2.2 Local Embeddings & Semantic Similarity
* **Tool / Library**: SentenceTransformers (`all-MiniLM-L6-v2`)
* **Purpose**: Computes 384-dimensional dense vector embeddings for resume sections and job descriptions to perform cosine similarity calculations.
* **Selection Rationale**: Runs 100% locally on CPU with zero latency overhead and zero external API expense.

### 2.3 Natural Language Processing (NLP)
* **Tool / Library**: spaCy (`en_core_web_sm`)
* **Purpose**: Performs text cleaning, tokenization, part-of-speech tagging, and deterministic extraction of skills, tools, and technical requirements.
* **Selection Rationale**: Fast, deterministic entity extraction independent of LLM calls.

### 2.4 Backend Framework
* **Tool / Library**: FastAPI (Python 3.10+)
* **Purpose**: Serves asynchronous REST APIs for authentication, profile management, resume CRUD, job analysis, ATS scoring, AI generation, and PDF export.
* **Selection Rationale**: Native async support, high performance, automatic Pydantic validation, and OpenAPI documentation generation.

### 2.5 Database & Vector Storage
* **Tool / Library**: PostgreSQL 16 + `pgvector`
* **Purpose**: Relational storage for users, master profiles, resumes, version history, job descriptions, and ATS analysis metrics, alongside vector embedding storage.
* **Selection Rationale**: Robust relational data structure with integrated vector similarity search via `pgvector`.

### 2.6 Database ORM & Migrations
* **Tool / Library**: SQLAlchemy 2.0 (Async) & Alembic
* **Purpose**: Handles async database connections, object-relational mapping, and database migration tracking.
* **Selection Rationale**: Industry standard async ORM for Python with support for pgvector types.

### 2.7 Document Generation
* **Tool / Library**: ReportLab
* **Purpose**: Renders server-side ATS-friendly PDF documents.
* **Selection Rationale**: Generates clean, machine-readable PDFs with selectable text, custom font styling, and consistent layout formatting across ATS templates.

### 2.8 Frontend Architecture
* **Tool / Library**: React 18, TypeScript, Vite
* **Purpose**: Provides a responsive single-page web application interface.
* **Selection Rationale**: Type safety, modular component hierarchy, and instant hot-module reloading during development.

### 2.9 UI Styling & Visualizations
* **Tool / Library**: Tailwind CSS, Recharts, Lucide React
* **Purpose**: Delivers modern UI design, dark/light theme support, responsive navigation, dynamic chart rendering for ATS score breakdowns, and icon components.
* **Selection Rationale**: High visual appeal, utility-first layout flexibility, and dynamic dashboard metrics.

### 2.10 Security & Authentication
* **Tool / Library**: PyJWT, Passlib (Bcrypt)
* **Purpose**: Encrypts user passwords and issues stateless JWT tokens for API endpoint authorization.
* **Selection Rationale**: Secure, standard authentication approach.

### 2.11 Infrastructure & Containerization
* **Tool / Library**: Docker & Docker Compose
* **Purpose**: Orchestrates PostgreSQL with `pgvector` image (`pgvector/pgvector:pg16`).
* **Selection Rationale**: Simplifies local development setup without requiring manual system database installations.

---

## 3. Technology Matrix

| Layer | Primary Technology | Supplementary Tools |
| :--- | :--- | :--- |
| Frontend | React 18, TypeScript, Vite | Tailwind CSS, Recharts, Lucide React, Axios |
| Backend API | FastAPI (Python 3.10+) | Pydantic v2, PyJWT, Passlib, Uvicorn |
| Database | PostgreSQL 16 | pgvector extension, SQLAlchemy 2.0 Async, Alembic |
| Machine Learning / NLP | spaCy, SentenceTransformers | Scikit-learn, NumPy |
| Generative AI | Google Gemini API (2.0 Flash) | google-genai Python SDK |
| Document Rendering | ReportLab | Python PDF utilities |
| Containerization | Docker | Docker Compose |
