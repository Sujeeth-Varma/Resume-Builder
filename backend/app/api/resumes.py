from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.schemas.resume import ResumeCreate, ResumeUpdate, ResumeResponse
from app.api.auth import get_current_user
from app.api.profile import get_user_profile

router = APIRouter()

@router.post("", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def create_resume(
    resume_in: ResumeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Populate content from user profile if not provided
    content = resume_in.content
    if not content:
        profile = await get_user_profile(current_user.id, db)
        content = {
            "header": {
                "full_name": profile.full_name,
                "email": profile.email,
                "phone": profile.phone,
                "location": profile.location,
                "linkedin": profile.linkedin,
                "github": profile.github,
            },
            "summary": profile.summary or "",
            "skills": [{"name": s.name, "category": s.category} for s in profile.skills],
            "experience": [
                {
                    "job_title": e.job_title,
                    "company": e.company,
                    "location": e.location,
                    "start_date": e.start_date,
                    "end_date": e.end_date,
                    "responsibilities": e.responsibilities,
                    "achievements": e.achievements,
                }
                for e in profile.experience_items
            ],
            "projects": [
                {
                    "project_name": p.project_name,
                    "description": p.description,
                    "bullet_points": p.bullet_points,
                    "technologies": p.technologies,
                }
                for p in profile.projects
            ],
            "education": [
                {
                    "institution": ed.institution,
                    "degree": ed.degree,
                    "field_of_study": ed.field_of_study,
                    "start_date": ed.start_date,
                    "end_date": ed.end_date,
                }
                for ed in profile.education_items
            ]
        }

    new_resume = Resume(
        user_id=current_user.id,
        title=resume_in.title,
        target_role=resume_in.target_role,
        template_name=resume_in.template_name,
        content=content
    )
    db.add(new_resume)
    await db.commit()
    await db.refresh(new_resume)
    return new_resume


@router.get("", response_model=List[ResumeResponse])
async def list_resumes(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.user_id == current_user.id))
    return result.scalars().all()


@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume


@router.put("/{resume_id}", response_model=ResumeResponse)
async def update_resume(
    resume_id: str,
    resume_in: ResumeUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    for field, value in resume_in.model_dump(exclude_unset=True).items():
        setattr(resume, field, value)

    await db.commit()
    await db.refresh(resume)
    return resume


@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resume(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    await db.delete(resume)
    await db.commit()
    return None
