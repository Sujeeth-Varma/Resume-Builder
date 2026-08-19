import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector
from app.db.base import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    company_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    job_title: Mapped[str] = mapped_column(String, nullable=False)
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)

    # NLP Extracted features
    extracted_skills: Mapped[List[str]] = mapped_column(JSON, default=list)
    extracted_keywords: Mapped[List[str]] = mapped_column(JSON, default=list)
    extracted_requirements: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict)
    
    # 384-dimensional vector embedding for pgvector
    embedding = mapped_column(Vector(384), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="job_descriptions")
    ats_analyses = relationship("ATSAnalysis", back_populates="job_description", cascade="all, delete-orphan")
