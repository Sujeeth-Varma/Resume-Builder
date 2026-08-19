# AI Resume Assistant - Backend

FastAPI backend powered by spaCy, SentenceTransformers, Google Gemini API, and PostgreSQL + pgvector.

## Project Initialization & Dependency Management with `uv`

This project is initialized and managed using [`uv`](https://github.com/astral-sh/uv), an extremely fast Python package and project manager.

### 1. Initialize Project & Virtual Environment

```bash
# Initialize uv project (if starting fresh)
uv init --app --name backend .

# Create virtual environment with uv (without using standard python venv)
uv venv
```

### 2. Install Dependencies

```bash
# Install core dependencies from requirements.txt / pyproject.toml
uv pip install -r requirements.txt

# Install spaCy English NLP language model
uv pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl
```

### 3. Run Development Server

```bash
# Run backend server via uv
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Run Unit & Integration Tests

```bash
# Execute test suite via uv
uv run pytest tests/
```
