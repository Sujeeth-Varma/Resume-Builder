import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from sqlalchemy import String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class ATSAnalysis(Base):
    __tablename__ = "ats_analyses"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    resume_id: Mapped[str] = mapped_column(String, ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False)
    job_description_id: Mapped[str] = mapped_column(String, ForeignKey("job_descriptions.id", ondelete="CASCADE"), nullable=False)

    overall_score: Mapped[float] = mapped_column(Float, nullable=False)
    
    # Detailed breakdown scores
    keyword_score: Mapped[float] = mapped_column(Float, nullable=False)  # Out of 40
    semantic_score: Mapped[float] = mapped_column(Float, nullable=False)  # Out of 30
    skills_score: Mapped[float] = mapped_column(Float, nullable=False)  # Out of 20
    structure_score: Mapped[float] = mapped_column(Float, nullable=False)  # Out of 10

    matched_keywords: Mapped[List[str]] = mapped_column(JSON, default=list)
    missing_keywords: Mapped[Dict[str, List[str]]] = mapped_column(JSON, default=dict)  # High, Medium, Low priority
    recommendations: Mapped[List[str]] = mapped_column(JSON, default=list)
    structure_issues: Mapped[List[str]] = mapped_column(JSON, default=list)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    resume = relationship("Resume", back_populates="ats_analyses")
    job_description = relationship("JobDescription", back_populates="ats_analyses")
