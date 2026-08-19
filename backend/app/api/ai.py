from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.job import JobDescription
from app.schemas.ai import (
    SummaryGenerateRequest, SummaryGenerateResponse,
    BulletImproveRequest, BulletImproveResponse,
    CoverLetterRequest, CoverLetterResponse,
    InterviewQuestionsRequest, InterviewQuestionsResponse
)
from app.services.llm_service import llm_service
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/summary", response_model=SummaryGenerateResponse)
async def generate_summary(
    req: SummaryGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    summary = llm_service.generate_summary(req.target_role, req.skills, req.experience_highlights)
    return {"summary": summary}


@router.post("/improve-bullet", response_model=BulletImproveResponse)
async def improve_bullet(
    req: BulletImproveRequest,
    current_user: User = Depends(get_current_user)
):
    bullets = llm_service.improve_bullet_points(req.raw_bullet, req.target_role, req.technologies)
    return {"improved_bullets": bullets}


@router.post("/cover-letter", response_model=CoverLetterResponse)
async def generate_cover_letter(
    req: CoverLetterRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res_result = await db.execute(select(Resume).where(Resume.id == req.resume_id, Resume.user_id == current_user.id))
    resume = res_result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    job_result = await db.execute(select(JobDescription).where(JobDescription.id == req.job_description_id, JobDescription.user_id == current_user.id))
    job = job_result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found")

    letter = llm_service.generate_cover_letter(
        candidate_profile=resume.content,
        job_details={"job_title": job.job_title, "company_name": req.company_name or job.company_name, "raw_text": job.raw_text},
        company_name=req.company_name or job.company_name
    )
    return {"cover_letter": letter}


@router.post("/interview-questions", response_model=InterviewQuestionsResponse)
async def generate_interview_questions(
    req: InterviewQuestionsRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res_result = await db.execute(select(Resume).where(Resume.id == req.resume_id, Resume.user_id == current_user.id))
    resume = res_result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    job_result = await db.execute(select(JobDescription).where(JobDescription.id == req.job_description_id, JobDescription.user_id == current_user.id))
    job = job_result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found")

    questions = llm_service.generate_interview_questions(
        candidate_profile=resume.content,
        job_details={"job_title": job.job_title, "company_name": job.company_name, "raw_text": job.raw_text}
    )
    return {"questions": questions}
