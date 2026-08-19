from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from pydantic import BaseModel

from app.db.session import get_db
from app.models.user import User
from app.models.quiz import QuizAttempt
from app.api.auth import get_current_user
from app.services.interview_dataset import ROLES_DATASET
from app.services.nlp_service import nlp_service

router = APIRouter()

class QuizAttemptCreate(BaseModel):
    role_id: str
    role_title: str
    difficulty: str
    score: int
    total_questions: int
    percentage: float
    answers_summary: Optional[Dict[str, Any]] = None

class JDQuizRequest(BaseModel):
    job_description_text: str

@router.get("/roles")
async def get_interview_roles():
    """List software engineering roles with metadata and available test difficulties."""
    roles_list = []
    for role_id, data in ROLES_DATASET.items():
        roles_list.append({
            "id": data["id"],
            "title": data["title"],
            "category": data["category"],
            "icon": data["icon"],
            "description": data["description"],
            "skills": data["skills"],
            "requirements": data["requirements"],
            "faqs_count": len(data.get("faqs", [])),
            "question_counts": {
                "fresher": len(data["questions"].get("fresher", [])),
                "intermediate": len(data["questions"].get("intermediate", [])),
                "senior": len(data["questions"].get("senior", [])),
            }
        })
    return {"roles": roles_list}

@router.get("/roles/{role_id}")
async def get_interview_role_details(role_id: str, difficulty: str = "fresher"):
    """Get full role requirements, FAQs, and multiple choice question bank for difficulty."""
    if role_id not in ROLES_DATASET:
        raise HTTPException(status_code=404, detail="Requested software engineering role not found.")
    
    role = ROLES_DATASET[role_id]
    diff = difficulty.lower()
    if diff not in ["fresher", "intermediate", "senior"]:
        diff = "fresher"

    questions = role["questions"].get(diff, role["questions"].get("fresher", []))
    
    return {
        "id": role["id"],
        "title": role["title"],
        "category": role["category"],
        "icon": role["icon"],
        "description": role["description"],
        "skills": role["skills"],
        "requirements": role["requirements"],
        "faqs": role["faqs"],
        "difficulty": diff,
        "total_questions": len(questions),
        "questions": questions,
    }

@router.post("/attempts")
async def save_quiz_attempt(
    payload: QuizAttemptCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Save test attempt results to PostgreSQL database."""
    attempt = QuizAttempt(
        user_id=current_user.id,
        role_id=payload.role_id,
        role_title=payload.role_title,
        difficulty=payload.difficulty,
        score=payload.score,
        total_questions=payload.total_questions,
        percentage=payload.percentage,
        answers_summary=payload.answers_summary or {},
    )
    db.add(attempt)
    await db.commit()
    await db.refresh(attempt)
    return {
        "message": "Quiz attempt saved successfully!",
        "attempt_id": attempt.id,
        "percentage": attempt.percentage,
        "created_at": attempt.created_at.isoformat() if attempt.created_at else None,
    }

@router.get("/attempts")
async def get_quiz_attempts(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Fetch candidate test attempt history from PostgreSQL database."""
    stmt = (
        select(QuizAttempt)
        .where(QuizAttempt.user_id == current_user.id)
        .order_by(desc(QuizAttempt.created_at))
    )
    res = await db.execute(stmt)
    attempts = res.scalars().all()

    return {
        "attempts": [
            {
                "id": a.id,
                "role_id": a.role_id,
                "role_title": a.role_title,
                "difficulty": a.difficulty,
                "score": a.score,
                "total_questions": a.total_questions,
                "percentage": a.percentage,
                "created_at": a.created_at.isoformat() if a.created_at else None,
            }
            for a in attempts
        ]
    }

@router.post("/generate-jd-quiz")
async def generate_jd_quiz(payload: JDQuizRequest):
    """Generate 5-10 dynamic multiple choice questions from custom Job Description text."""
    jd_text = payload.job_description_text.strip()
    if not jd_text or len(jd_text) < 10:
        raise HTTPException(status_code=400, detail="Please provide a valid Job Description text.")

    extracted_skills = nlp_service.extract_skills(jd_text)
    keywords = nlp_service.extract_keywords(jd_text)

    top_skills = extracted_skills if extracted_skills else (keywords[:5] if keywords else ["Software Development"])

    # Dynamically structure 5-8 multiple choice questions based on extracted skills
    generated_questions = []
    for idx, skill in enumerate(top_skills[:7]):
        q_id = idx + 1
        sk_name = skill.title()
        generated_questions.append({
            "id": q_id,
            "question": f"In a job role requiring {sk_name}, which practice is considered an industry best-practice for production reliability?",
            "options": [
                f"Implementing automated testing, robust error logging, and clean component interfaces for {sk_name}",
                f"Disabling security headers and CORS checks when executing {sk_name}",
                f"Storing raw passwords and credentials inside public code repositories",
                f"Bypassing code review and deploying untested code directly to production"
            ],
            "correct": 0,
            "explanation": f"Automated testing, structured error logging, and clean interface boundaries are foundational for reliable {sk_name} implementations."
        })

    # Ensure at least 5 questions
    if len(generated_questions) < 5:
        defaults = [
            {
                "id": len(generated_questions) + 1,
                "question": "What is the primary benefit of writing automated unit and integration tests?",
                "options": [
                    "Catching regression bugs early and validating contract behavior before release",
                    "Slowing down the development speed intentionally",
                    "Increasing the physical weight of hard drives",
                    "Eliminating the need for source code"
                ],
                "correct": 0,
                "explanation": "Automated tests prevent regression bugs and enforce underlying function contracts."
            },
            {
                "id": len(generated_questions) + 2,
                "question": "Which HTTP status code indicates a successful backend API execution?",
                "options": ["200 OK", "404 Not Found", "500 Internal Error", "401 Unauthorized"],
                "correct": 0,
                "explanation": "200 OK is standard HTTP success status code."
            }
        ]
        generated_questions.extend(defaults[: 5 - len(generated_questions)])

    return {
        "job_title": "Custom Job Description Practice Test",
        "total_questions": len(generated_questions),
        "extracted_skills": top_skills,
        "questions": generated_questions
    }
