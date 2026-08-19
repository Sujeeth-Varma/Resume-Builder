from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.user import User
from app.models.profile import Profile, Education, Experience, Project, Skill, Certification
from app.schemas.profile import (
    ProfileResponse, ProfileUpdate,
    EducationCreate, EducationResponse,
    ExperienceCreate, ExperienceResponse,
    ProjectCreate, ProjectResponse,
    SkillCreate, SkillResponse,
    CertificationCreate, CertificationResponse
)
from app.api.auth import get_current_user

router = APIRouter()

async def get_user_profile(user_id: str, db: AsyncSession) -> Profile:
    result = await db.execute(
        select(Profile)
        .options(
            selectinload(Profile.education_items),
            selectinload(Profile.experience_items),
            selectinload(Profile.projects),
            selectinload(Profile.skills),
            selectinload(Profile.certifications)
        )
        .where(Profile.user_id == user_id)
    )
    profile = result.scalars().first()
    if not profile:
        profile = Profile(user_id=user_id, full_name="User", email="user@example.com")
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
    return profile


@router.get("", response_model=ProfileResponse)
async def read_profile(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await get_user_profile(current_user.id, db)


@router.put("", response_model=ProfileResponse)
async def update_profile(
    profile_in: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db)
    for field, value in profile_in.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)
    await db.commit()
    return await get_user_profile(current_user.id, db)


# Education Endpoints
@router.post("/education", response_model=EducationResponse)
async def add_education(
    edu_in: EducationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db)
    edu = Education(**edu_in.model_dump(), profile_id=profile.id)
    db.add(edu)
    await db.commit()
    await db.refresh(edu)
    return edu


# Experience Endpoints
@router.post("/experience", response_model=ExperienceResponse)
async def add_experience(
    exp_in: ExperienceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db)
    exp = Experience(**exp_in.model_dump(), profile_id=profile.id)
    db.add(exp)
    await db.commit()
    await db.refresh(exp)
    return exp


# Project Endpoints
@router.post("/projects", response_model=ProjectResponse)
async def add_project(
    proj_in: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db)
    proj = Project(**proj_in.model_dump(), profile_id=profile.id)
    db.add(proj)
    await db.commit()
    await db.refresh(proj)
    return proj


# Skill Endpoints
@router.post("/skills", response_model=SkillResponse)
async def add_skill(
    skill_in: SkillCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db)
    skill = Skill(**skill_in.model_dump(), profile_id=profile.id)
    db.add(skill)
    await db.commit()
    await db.refresh(skill)
    return skill
