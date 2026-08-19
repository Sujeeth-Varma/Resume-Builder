from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.job import JobDescription
from app.models.ats import ATSAnalysis
from app.schemas.ats import ATSAnalyzeRequest, ATSAnalysisResponse
from app.services.ats_service import ats_service
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/analyze", response_model=ATSAnalysisResponse, status_code=status.HTTP_201_CREATED)
async def analyze_ats(
    request: ATSAnalyzeRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Fetch Resume
    res_result = await db.execute(select(Resume).where(Resume.id == request.resume_id, Resume.user_id == current_user.id))
    resume = res_result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Fetch Job Description
    job_result = await db.execute(select(JobDescription).where(JobDescription.id == request.job_description_id, JobDescription.user_id == current_user.id))
    job = job_result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found")

    # Run deterministic ATS scoring pipeline
    report = ats_service.analyze_compatibility(resume.content, job.raw_text)

    analysis = ATSAnalysis(
        resume_id=resume.id,
        job_description_id=job.id,
        overall_score=report["overall_score"],
        keyword_score=report["keyword_score"],
        semantic_score=report["semantic_score"],
        skills_score=report["skills_score"],
        structure_score=report["structure_score"],
        matched_keywords=report["matched_keywords"],
        missing_keywords=report["missing_keywords"],
        recommendations=report["recommendations"],
        structure_issues=report["structure_issues"]
    )
    db.add(analysis)
    await db.commit()
    await db.refresh(analysis)
    return analysis


@router.get("/{analysis_id}", response_model=ATSAnalysisResponse)
async def get_ats_analysis(
    analysis_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ATSAnalysis)
        .join(Resume)
        .where(ATSAnalysis.id == analysis_id, Resume.user_id == current_user.id)
    )
    analysis = result.scalars().first()
    if not analysis:
        raise HTTPException(status_code=404, detail="ATS Analysis report not found")
    return analysis
