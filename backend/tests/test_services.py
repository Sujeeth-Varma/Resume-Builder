import pytest
from app.services.nlp_service import nlp_service
from app.services.ats_service import ats_service
from app.services.pdf_service import pdf_service

def test_nlp_skill_extraction():
    sample_text = "Looking for a Backend Developer with 3+ years of experience in Python, FastAPI, PostgreSQL, Docker, AWS, and REST APIs."
    skills = nlp_service.extract_skills(sample_text)
    assert "Python" in skills
    assert "Fastapi" in skills or "FastAPI" in skills or "fastapi" in [s.lower() for s in skills]
    assert "Postgresql" in skills or "Postgres" in skills or "postgresql" in [s.lower() for s in skills]
    assert "Docker" in skills
    assert "AWS" in skills

def test_ats_scoring_engine():
    resume_content = {
        "summary": "Experienced Python Backend Engineer skilled in FastAPI, PostgreSQL, and REST API development.",
        "skills": [{"name": "Python"}, {"name": "FastAPI"}, {"name": "PostgreSQL"}, {"name": "Docker"}],
        "experience": [
            {
                "job_title": "Backend Developer",
                "company": "Tech Corp",
                "responsibilities": ["Built RESTful microservices using Python and FastAPI.", "Managed PostgreSQL databases."],
                "achievements": ["Improved API throughput by 35%."]
            }
        ],
        "education": [{"degree": "B.S.", "field_of_study": "Computer Science", "institution": "State University"}]
    }

    job_text = "Seeking Python Engineer with FastAPI, PostgreSQL, Docker, Kubernetes, AWS experience to develop REST APIs."

    report = ats_service.analyze_compatibility(resume_content, job_text)
    assert report["overall_score"] > 50.0
    assert report["keyword_score"] > 0
    assert report["semantic_score"] > 0
    assert "Python" in report["matched_keywords"] or "Fastapi" in report["matched_keywords"]

def test_pdf_generation():
    resume_content = {
        "full_name": "Sujeeth Candidate",
        "email": "sujeeth@example.com",
        "phone": "+1 234 567 890",
        "summary": "Results-driven Software Engineer with expertise in full-stack AI applications.",
        "skills": ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
        "experience": [
            {
                "job_title": "Software Developer Intern",
                "company": "Infosys",
                "start_date": "2024",
                "end_date": "Present",
                "responsibilities": ["Developed backend API endpoints", "Integrated AI tools"]
            }
        ]
    }

    pdf_bytes = pdf_service.generate_pdf(resume_content, template_name="professional")
    assert pdf_bytes.startswith(b"%PDF")
    assert len(pdf_bytes) > 1000
