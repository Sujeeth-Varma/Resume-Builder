from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class EducationBase(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    cgpa: Optional[str] = None
    relevant_coursework: Optional[str] = None

class EducationCreate(EducationBase):
    pass

class EducationResponse(EducationBase):
    id: str
    profile_id: str
    model_config = ConfigDict(from_attributes=True)


class ExperienceBase(BaseModel):
    company: str
    job_title: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    responsibilities: List[str] = []
    achievements: List[str] = []
    technologies: List[str] = []

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: str
    profile_id: str
    model_config = ConfigDict(from_attributes=True)


class ProjectBase(BaseModel):
    project_name: str
    description: str
    bullet_points: List[str] = []
    technologies: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    role: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    profile_id: str
    model_config = ConfigDict(from_attributes=True)


class SkillBase(BaseModel):
    name: str
    category: str = "Other"

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: str
    profile_id: str
    model_config = ConfigDict(from_attributes=True)


class CertificationBase(BaseModel):
    certification_name: str
    issuing_organization: str
    issue_date: Optional[str] = None
    credential_url: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationResponse(CertificationBase):
    id: str
    profile_id: str
    model_config = ConfigDict(from_attributes=True)


class ProfileBase(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    professional_title: Optional[str] = None
    summary: Optional[str] = None

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    professional_title: Optional[str] = None
    summary: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: str
    user_id: str
    education_items: List[EducationResponse] = []
    experience_items: List[ExperienceResponse] = []
    projects: List[ProjectResponse] = []
    skills: List[SkillResponse] = []
    certifications: List[CertificationResponse] = []
    model_config = ConfigDict(from_attributes=True)
