from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.job import JobDescription
from app.schemas.job import JobAnalyzeRequest, JobDescriptionResponse
from app.services.nlp_service import nlp_service
from app.services.embedding_service import embedding_service
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/analyze", response_model=JobDescriptionResponse, status_code=status.HTTP_201_CREATED)
async def analyze_job_description(
    job_in: JobAnalyzeRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Perform spaCy NLP extraction
    extracted_skills = nlp_service.extract_skills(job_in.raw_text)
    extracted_keywords = nlp_service.extract_keywords(job_in.raw_text)
    extracted_reqs = nlp_service.extract_requirements(job_in.raw_text)

    # Compute SentenceTransformer dense vector (384-dim)
    vec = embedding_service.get_embedding(job_in.raw_text)

    new_job = JobDescription(
        user_id=current_user.id,
        job_title=job_in.job_title,
        company_name=job_in.company_name,
        raw_text=job_in.raw_text,
        extracted_skills=extracted_skills,
        extracted_keywords=extracted_keywords,
        extracted_requirements=extracted_reqs,
        embedding=vec
    )
    db.add(new_job)
    await db.commit()
    await db.refresh(new_job)
    return new_job


@router.get("", response_model=List[JobDescriptionResponse])
async def list_jobs(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(JobDescription).where(JobDescription.user_id == current_user.id))
    return result.scalars().all()


@router.get("/{job_id}", response_model=JobDescriptionResponse)
async def get_job(
    job_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(JobDescription).where(JobDescription.id == job_id, JobDescription.user_id == current_user.id))
    job = result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found")
    return job
