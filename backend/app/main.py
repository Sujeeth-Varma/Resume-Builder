from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.models import Base

# API Routers
from app.api.auth import router as auth_router
from app.api.profile import router as profile_router
from app.api.resumes import router as resumes_router
from app.api.jobs import router as jobs_router
from app.api.ats import router as ats_router
from app.api.ai import router as ai_router
from app.api.pdf import router as pdf_router
from app.api.interview import router as interview_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables on startup for quick local deployment
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(profile_router, prefix=f"{settings.API_V1_STR}/profile", tags=["User Profile"])
app.include_router(resumes_router, prefix=f"{settings.API_V1_STR}/resumes", tags=["Resumes"])
app.include_router(jobs_router, prefix=f"{settings.API_V1_STR}/jobs", tags=["Job Analysis"])
app.include_router(ats_router, prefix=f"{settings.API_V1_STR}/ats", tags=["ATS Compatibility"])
app.include_router(ai_router, prefix=f"{settings.API_V1_STR}/ai", tags=["AI Generation"])
app.include_router(pdf_router, prefix=f"{settings.API_V1_STR}/pdf", tags=["PDF Generation"])
app.include_router(interview_router, prefix=f"{settings.API_V1_STR}/interview", tags=["Interview Prep"])

@app.get("/")
async def root():
    return {
        "message": "AI-Powered Resume Optimization & Career Assistant API is running",
        "docs": f"{settings.API_V1_STR}/docs"
    }
