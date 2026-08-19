import io
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

class PDFService:
    def generate_pdf(self, resume_content: Dict[str, Any], template_name: str = "professional") -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        story = []

        # Color schemes by template
        if template_name == "modern":
            primary_color = colors.HexColor("#1e3a8a")  # Deep blue
            secondary_color = colors.HexColor("#3b82f6")
        elif template_name == "minimal":
            primary_color = colors.HexColor("#111827")  # Dark gray
            secondary_color = colors.HexColor("#4b5563")
        else:  # professional
            primary_color = colors.HexColor("#0f172a")  # Slate
            secondary_color = colors.HexColor("#334155")

        # Custom Paragraph Styles
        name_style = ParagraphStyle(
            'HeaderName',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=primary_color,
            alignment=TA_CENTER if template_name != "minimal" else TA_LEFT
        )

        contact_style = ParagraphStyle(
            'HeaderContact',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#475569"),
            alignment=TA_CENTER if template_name != "minimal" else TA_LEFT
        )

        section_heading_style = ParagraphStyle(
            'SectionHeading',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=15,
            textColor=primary_color,
            spaceAfter=4,
            spaceBefore=8
        )

        title_style = ParagraphStyle(
            'ItemTitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=13,
            textColor=colors.HexColor("#0f172a")
        )

        subtitle_style = ParagraphStyle(
            'ItemSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#64748b")
        )

        body_style = ParagraphStyle(
            'BodyTextCustom',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#1e293b"),
            spaceAfter=3
        )

        bullet_style = ParagraphStyle(
            'BulletCustom',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            leftIndent=12,
            firstLineIndent=-8,
            textColor=colors.HexColor("#334155"),
            spaceAfter=2
        )

        # 1. Header Section
        header = resume_content.get("header", {})
        name = header.get("full_name") or resume_content.get("full_name", "Candidate Name")
        story.append(Paragraph(name.upper(), name_style))
        story.append(Spacer(1, 4))

        contact_parts = []
        if header.get("email") or resume_content.get("email"):
            contact_parts.append(header.get("email") or resume_content.get("email"))
        if header.get("phone") or resume_content.get("phone"):
            contact_parts.append(header.get("phone") or resume_content.get("phone"))
        if header.get("location") or resume_content.get("location"):
            contact_parts.append(header.get("location") or resume_content.get("location"))
        if header.get("linkedin") or resume_content.get("linkedin"):
            contact_parts.append(header.get("linkedin") or resume_content.get("linkedin"))
        if header.get("github") or resume_content.get("github"):
            contact_parts.append(header.get("github") or resume_content.get("github"))

        contact_line = "  |  ".join([p for p in contact_parts if p])
        story.append(Paragraph(contact_line, contact_style))
        story.append(Spacer(1, 8))
        story.append(HRFlowable(width="100%", thickness=1, color=secondary_color, spaceAfter=8))

        # 2. Professional Summary
        summary = resume_content.get("summary")
        if summary:
            story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading_style))
            story.append(Paragraph(summary, body_style))
            story.append(Spacer(1, 6))

        # 3. Skills Section
        skills = resume_content.get("skills", [])
        if skills:
            story.append(Paragraph("SKILLS", section_heading_style))
            if isinstance(skills, list):
                skill_names = [s.get("name", s) if isinstance(s, dict) else str(s) for s in skills]
                skills_str = ", ".join(skill_names)
                story.append(Paragraph(skills_str, body_style))
            story.append(Spacer(1, 6))

        # 4. Experience Section
        experience = resume_content.get("experience", [])
        if experience:
            story.append(Paragraph("EXPERIENCE", section_heading_style))
            for exp in experience:
                if isinstance(exp, dict):
                    title_line = f"<b>{exp.get('job_title', '')}</b> — {exp.get('company', '')}"
                    date_line = f"{exp.get('start_date', '')} – {exp.get('end_date', '')}"
                    story.append(Paragraph(f"{title_line} <font color='#64748b'>({date_line})</font>", title_style))
                    
                    bullets = exp.get("responsibilities", []) + exp.get("achievements", [])
                    for b in bullets:
                        story.append(Paragraph(f"• {b}", bullet_style))
                    story.append(Spacer(1, 4))
            story.append(Spacer(1, 4))

        # 5. Projects Section
        projects = resume_content.get("projects", [])
        if projects:
            story.append(Paragraph("PROJECTS", section_heading_style))
            for proj in projects:
                if isinstance(proj, dict):
                    proj_name = proj.get("project_name", "")
                    techs = ", ".join(proj.get("technologies", []))
                    tech_suffix = f" [{techs}]" if techs else ""
                    story.append(Paragraph(f"<b>{proj_name}</b>{tech_suffix}", title_style))
                    
                    if proj.get("description"):
                        story.append(Paragraph(proj["description"], body_style))
                    
                    for b in proj.get("bullet_points", []):
                        story.append(Paragraph(f"• {b}", bullet_style))
                    story.append(Spacer(1, 4))
            story.append(Spacer(1, 4))

        # 6. Education Section
        education = resume_content.get("education", [])
        if education:
            story.append(Paragraph("EDUCATION", section_heading_style))
            for edu in education:
                if isinstance(edu, dict):
                    degree_str = f"<b>{edu.get('degree', '')} in {edu.get('field_of_study', '')}</b>"
                    inst_str = edu.get("institution", "")
                    dates = f"{edu.get('start_date', '')} – {edu.get('end_date', '')}"
                    story.append(Paragraph(f"{degree_str} — {inst_str} <font color='#64748b'>({dates})</font>", body_style))
            story.append(Spacer(1, 4))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

pdf_service = PDFService()
