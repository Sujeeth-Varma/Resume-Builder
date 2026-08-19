from datetime import datetime
from typing import List, Dict
from pydantic import BaseModel, ConfigDict

class ATSAnalyzeRequest(BaseModel):
    resume_id: str
    job_description_id: str

class ATSAnalysisResponse(BaseModel):
    id: str
    resume_id: str
    job_description_id: str
    overall_score: float
    keyword_score: float
    semantic_score: float
    skills_score: float
    structure_score: float
    matched_keywords: List[str]
    missing_keywords: Dict[str, List[str]]
    recommendations: List[str]
    structure_issues: List[str]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
