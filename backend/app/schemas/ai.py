from typing import Optional, List
from pydantic import BaseModel

class SummaryGenerateRequest(BaseModel):
    target_role: str
    skills: List[str] = []
    experience_highlights: List[str] = []

class SummaryGenerateResponse(BaseModel):
    summary: str

class BulletImproveRequest(BaseModel):
    raw_bullet: str
    target_role: Optional[str] = None
    technologies: List[str] = []

class BulletImproveResponse(BaseModel):
    improved_bullets: List[str] = []

class CoverLetterRequest(BaseModel):
    resume_id: str
    job_description_id: str
    company_name: Optional[str] = None

class CoverLetterResponse(BaseModel):
    cover_letter: str

class InterviewQuestionsRequest(BaseModel):
    resume_id: str
    job_description_id: str

class QuestionItem(BaseModel):
    question: str
    category: str  # Technical, Behavioral, Project, Role
    sample_answer: Optional[str] = None

class InterviewQuestionsResponse(BaseModel):
    questions: List[QuestionItem] = []
