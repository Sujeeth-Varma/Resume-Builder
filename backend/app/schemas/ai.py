from typing import Optional, List, Union, Any
from pydantic import BaseModel, field_validator

class SummaryGenerateRequest(BaseModel):
    target_role: str
    skills: List[Union[str, dict, Any]] = []
    experience_highlights: List[Union[str, dict, Any]] = []

    @field_validator('skills', mode='before')
    def normalize_skills(cls, v):
        if isinstance(v, list):
            result = []
            for item in v:
                if isinstance(item, str):
                    result.append(item)
                elif isinstance(item, dict):
                    name = item.get("name") or item.get("skill_name") or str(item)
                    result.append(name)
                else:
                    result.append(str(item))
            return result
        return v

    @field_validator('experience_highlights', mode='before')
    def normalize_highlights(cls, v):
        if isinstance(v, list):
            result = []
            for item in v:
                if isinstance(item, str):
                    result.append(item)
                elif isinstance(item, dict):
                    title = item.get("job_title") or item.get("company") or str(item)
                    result.append(title)
                else:
                    result.append(str(item))
            return result
        return v

class SummaryGenerateResponse(BaseModel):
    summary: str

class BulletImproveRequest(BaseModel):
    raw_bullet: str
    target_role: Optional[str] = None
    technologies: List[str] = []

class BulletImproveResponse(BaseModel):
    improved_bullets: List[str] = []

class CoverLetterRequest(BaseModel):
    resume_id: Optional[str] = None
    job_description_id: Optional[str] = None
    candidate_name: Optional[str] = None
    target_role: Optional[str] = None
    company_name: Optional[str] = None
    job_description_summary: Optional[str] = None
    key_achievements: List[Union[str, dict, Any]] = []

    @field_validator('key_achievements', mode='before')
    def normalize_achievements(cls, v):
        if isinstance(v, list):
            result = []
            for item in v:
                if isinstance(item, str):
                    result.append(item)
                elif isinstance(item, dict):
                    title = item.get("job_title") or item.get("company") or str(item)
                    result.append(title)
                else:
                    result.append(str(item))
            return result
        return v

class CoverLetterResponse(BaseModel):
    cover_letter: str

class InterviewQuestionsRequest(BaseModel):
    resume_id: Optional[str] = None
    job_description_id: Optional[str] = None

class QuestionItem(BaseModel):
    question: str
    category: str  # Technical, Behavioral, Project, Role
    sample_answer: Optional[str] = None

class InterviewQuestionsResponse(BaseModel):
    questions: List[QuestionItem] = []

