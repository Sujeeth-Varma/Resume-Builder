from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.user import User
from app.models.profile import Profile, Education, Experience, Project, Skill, Certification
from app.schemas.profile import (
    ProfileResponse, ProfileUpdate, BulkProfileOnboard,
    EducationCreate, EducationResponse,
    ExperienceCreate, ExperienceResponse,
    ProjectCreate, ProjectResponse,
    SkillCreate, SkillResponse,
    CertificationCreate, CertificationResponse
)
from app.api.auth import get_current_user

router = APIRouter()

async def get_user_profile(user_id: str, db: AsyncSession, user: User = None) -> Profile:
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
        name_val = user.name if user else "Candidate"
        email_val = user.email if user else "candidate@example.com"
        profile = Profile(user_id=user_id, full_name=name_val, email=email_val)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
    return profile


@router.get("", response_model=ProfileResponse)
async def read_profile(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await get_user_profile(current_user.id, db, user=current_user)


@router.put("", response_model=ProfileResponse)
async def update_profile(
    profile_in: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db, user=current_user)
    for field, value in profile_in.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)
    await db.commit()
    return await get_user_profile(current_user.id, db, user=current_user)


@router.post("/onboard", response_model=ProfileResponse)
async def onboard_profile(
    onboard_in: BulkProfileOnboard,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db, user=current_user)

    # 1. Update core profile fields
    profile.full_name = onboard_in.full_name
    profile.email = onboard_in.email
    profile.phone = onboard_in.phone
    profile.location = onboard_in.location
    profile.linkedin = onboard_in.linkedin
    profile.github = onboard_in.github
    profile.portfolio = onboard_in.portfolio
    profile.professional_title = onboard_in.professional_title
    profile.summary = onboard_in.summary

    # 2. Update education items
    if onboard_in.education_items:
        profile.education_items.clear()
        for edu in onboard_in.education_items:
            db.add(Education(**edu.model_dump(), profile_id=profile.id))

    # 3. Update experience items
    if onboard_in.experience_items:
        profile.experience_items.clear()
        for exp in onboard_in.experience_items:
            db.add(Experience(**exp.model_dump(), profile_id=profile.id))

    # 4. Update projects
    if onboard_in.projects:
        profile.projects.clear()
        for proj in onboard_in.projects:
            db.add(Project(**proj.model_dump(), profile_id=profile.id))

    # 5. Update skills
    if onboard_in.skills:
        profile.skills.clear()
        for sk in onboard_in.skills:
            db.add(Skill(**sk.model_dump(), profile_id=profile.id))

    # 6. Update certifications
    if onboard_in.certifications:
        profile.certifications.clear()
        for cert in onboard_in.certifications:
            db.add(Certification(**cert.model_dump(), profile_id=profile.id))

    await db.commit()
    return await get_user_profile(current_user.id, db, user=current_user)


# Education Endpoints
@router.post("/education", response_model=EducationResponse)
async def add_education(
    edu_in: EducationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db, user=current_user)
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
    profile = await get_user_profile(current_user.id, db, user=current_user)
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
    profile = await get_user_profile(current_user.id, db, user=current_user)
    proj = Project(**proj_in.model_dump(), profile_id=profile.id)
    db.add(proj)
    await db.commit()
    await db.refresh(proj)
    return proj


from app.services.nlp_service import nlp_service

# Skill Endpoints
@router.post("/skills", response_model=SkillResponse)
async def add_skill(
    skill_in: SkillCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    profile = await get_user_profile(current_user.id, db, user=current_user)
    skill_dict = skill_in.model_dump()
    if not skill_dict.get("category") or skill_dict.get("category") == "Other":
        skill_dict["category"] = nlp_service.categorize_skill(skill_dict["name"])

    skill = Skill(**skill_dict, profile_id=profile.id)
    db.add(skill)
    await db.commit()
    await db.refresh(skill)
    return skill
