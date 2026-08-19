from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict

class ResumeCreate(BaseModel):
    title: str
    target_role: Optional[str] = None
    template_name: str = "professional"
    content: Optional[Dict[str, Any]] = None

class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    target_role: Optional[str] = None
    template_name: Optional[str] = None
    content: Optional[Dict[str, Any]] = None

class ResumeResponse(BaseModel):
    id: str
    user_id: str
    title: str
    target_role: Optional[str] = None
    template_name: str
    content: Dict[str, Any]
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
