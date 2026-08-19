from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.services.pdf_service import pdf_service
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/{resume_id}/download")
async def download_resume_pdf(
    resume_id: str,
    template: str = "professional",
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    pdf_bytes = pdf_service.generate_pdf(resume.content, template_name=template or resume.template_name)
    
    filename = f"{resume.title.replace(' ', '_')}_Resume.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
