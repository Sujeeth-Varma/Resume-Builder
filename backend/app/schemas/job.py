from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict

class JobAnalyzeRequest(BaseModel):
    job_title: str
    company_name: Optional[str] = None
    raw_text: str

class JobDescriptionResponse(BaseModel):
    id: str
    user_id: str
    job_title: str
    company_name: Optional[str] = None
    raw_text: str
    extracted_skills: List[str] = []
    extracted_keywords: List[str] = []
    extracted_requirements: Dict[str, Any] = {}
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
