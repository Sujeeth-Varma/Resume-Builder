import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.db.base import Base
from app.db.session import get_db

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

TestingSessionLocal = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def override_get_db():
    async with TestingSessionLocal() as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
async def setup_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.anyio
async def test_full_api_workflow():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        # 1. Root Endpoint
        res = await client.get("/")
        assert res.status_code == 200
        assert "API is running" in res.json()["message"]

        # 2. Register User
        reg_payload = {
            "name": "Alex Candidate",
            "email": "candidate@example.com",
            "password": "securepassword123"
        }
        res = await client.post("/api/auth/register", json=reg_payload)
        assert res.status_code == 201, res.text
        user_id = res.json()["id"]
        assert user_id is not None

        # 3. Login User
        login_data = {
            "username": "candidate@example.com",
            "password": "securepassword123"
        }
        res = await client.post("/api/auth/login", data=login_data)
        assert res.status_code == 200, res.text
        token = res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 4. Fetch Profile
        res = await client.get("/api/profile", headers=headers)
        assert res.status_code == 200
        assert res.json()["full_name"] == "Alex Candidate"

        # 5. Add Skill to Profile
        res = await client.post("/api/profile/skills", json={"name": "Python", "category": "Programming Languages"}, headers=headers)
        assert res.status_code == 200
        res = await client.post("/api/profile/skills", json={"name": "FastAPI", "category": "Frameworks"}, headers=headers)
        assert res.status_code == 200

        # 6. Create Resume
        res_payload = {
            "title": "Backend Developer - Target Role",
            "target_role": "Python Backend Engineer",
            "template_name": "professional"
        }
        res = await client.post("/api/resumes", json=res_payload, headers=headers)
        assert res.status_code == 201, res.text
        resume_id = res.json()["id"]

        # 7. Analyze Job Description
        job_payload = {
            "job_title": "Senior Python Backend Engineer",
            "company_name": "Tech Corp",
            "raw_text": "We are seeking a Python Backend Engineer with strong expertise in FastAPI, PostgreSQL, Docker, AWS, and REST API design."
        }
        res = await client.post("/api/jobs/analyze", json=job_payload, headers=headers)
        assert res.status_code == 201, res.text
        job_id = res.json()["id"]
        assert "Python" in res.json()["extracted_skills"]

        # 8. Run ATS Compatibility Score
        ats_payload = {
            "resume_id": resume_id,
            "job_description_id": job_id
        }
        res = await client.post("/api/ats/analyze", json=ats_payload, headers=headers)
        assert res.status_code == 201, res.text
        report = res.json()
        assert report["overall_score"] > 0
        assert "keyword_score" in report
        assert "semantic_score" in report
        assert "skills_score" in report

        # 9. Download ATS PDF
        res = await client.get(f"/api/pdf/{resume_id}/download", headers=headers)
        assert res.status_code == 200
        assert res.headers["content-type"] == "application/pdf"
        assert len(res.content) > 500

        # 10. AI Summary Endpoint (with string list & object skills)
        ai_summary_payload = {
            "target_role": "Python Engineer",
            "skills": [{"name": "Python"}, {"name": "FastAPI"}],
            "experience_highlights": ["Built backend REST APIs"]
        }
        res = await client.post("/api/ai/summary", json=ai_summary_payload, headers=headers)
        assert res.status_code == 200
        assert "summary" in res.json()
        assert "[object Object]" not in res.json()["summary"]

        # 11. AI Cover Letter Endpoint (Direct form fields payload)
        cover_letter_payload = {
            "candidate_name": "Alex Candidate",
            "target_role": "Senior Full Stack AI Developer",
            "company_name": "Echo Brains Tech",
            "job_description_summary": "Proficient in Python, React, FastAPI",
            "key_achievements": ["Data Science Intern"]
        }
        res = await client.post("/api/ai/cover-letter", json=cover_letter_payload, headers=headers)
        assert res.status_code == 200, res.text
        assert "cover_letter" in res.json()
        assert len(res.json()["cover_letter"]) > 50
