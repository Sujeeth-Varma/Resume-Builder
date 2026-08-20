from typing import List, Optional, Dict, Any
from google import genai
from google.genai import types
from app.core.config import settings

class LLMService:
    def __init__(self):
        self._client = None

    @property
    def client(self) -> Optional[genai.Client]:
        if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY.startswith("your_gemini"):
            return None
        if self._client is None:
            self._client = genai.Client(api_key=settings.GEMINI_API_KEY)
        return self._client

    def generate_summary(self, target_role: str, skills: List[str], experience_highlights: List[str]) -> str:
        clean_skills = [s if isinstance(s, str) else (s.get("name") if isinstance(s, dict) else str(s)) for s in skills if s]
        clean_highlights = [h if isinstance(h, str) else (h.get("job_title") if isinstance(h, dict) else str(h)) for h in experience_highlights if h]
        
        skills_str = ", ".join(clean_skills[:5]) if clean_skills else "full-stack development, software engineering"

        if not self.client:
            return f"Results-driven {target_role} skilled in {skills_str}. Experienced in delivering robust software applications and collaborative development."

        prompt = f"""
        Act as an expert resume writer. Generate a concise, impactful 3-sentence professional summary for a candidate applying for the role of '{target_role}'.
        
        Candidate Skills: {', '.join(clean_skills)}
        Experience Highlights: {'; '.join(clean_highlights)}
        
        Guidelines:
        - Do not use first-person pronouns (I, my, me).
        - Focus on value delivery, technical proficiency, and impact.
        - Avoid fluff or generic clichés.
        """

        try:
            response = self.client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )
            return response.text.strip()
        except Exception as e:
            return f"Experienced {target_role} proficient in {skills_str} with a proven track record of software execution."

    def improve_bullet_points(self, raw_bullet: str, target_role: Optional[str] = None, technologies: List[str] = []) -> List[str]:
        if not self.client:
            tech_str = f" using {', '.join(technologies)}" if technologies else ""
            return [
                f"Developed and optimized key features{tech_str}, improving execution efficiency and code maintainability.",
                f"Collaborated with cross-functional engineering teams to implement scalable solutions for {raw_bullet}."
            ]

        prompt = f"""
        Act as an expert career assistant. Transform the following weak/raw bullet point into 2 distinct, action-oriented, high-impact resume bullet points.
        
        Raw Bullet Point: "{raw_bullet}"
        Target Role: {target_role or 'Software Engineer'}
        Technologies Used: {', '.join(technologies)}
        
        CRITICAL RULES:
        1. Start each bullet point with a strong action verb (e.g., Developed, Spearheaded, Implemented, Engineered, Optimized).
        2. DO NOT fabricate metrics or numbers that were not provided. Instead, use placeholders like [X%] or [Y users] if suggesting metrics.
        3. Keep each bullet point under 25 words.
        4. Return ONLY the 2 bullet points, separated by a newline starting with a bullet symbol (•).
        """

        try:
            response = self.client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )
            lines = [line.strip().lstrip("•*- ").strip() for line in response.text.strip().split("\n") if line.strip()]
            return [line for line in lines if len(line) > 5][:2]
        except Exception:
            return [f"Engineered solutions for {raw_bullet} using {', '.join(technologies[:3])}."]

    def generate_cover_letter(self, candidate_profile: Dict[str, Any], job_details: Dict[str, Any], company_name: Optional[str] = None) -> str:
        company = company_name or job_details.get("company_name") or "Hiring Team"
        role = job_details.get("job_title", "Target Role")
        
        raw_skills = candidate_profile.get("skills", [])
        clean_skills = [s if isinstance(s, str) else (s.get("name") if isinstance(s, dict) else str(s)) for s in raw_skills if s]
        skills_str = ", ".join(clean_skills[:6]) if clean_skills else "full-stack development, software engineering, problem solving"

        if not self.client:
            return f"""Dear Hiring Manager at {company},

I am writing to express my strong interest in the {role} position. With my background in {skills_str}, I am confident in my ability to contribute effectively to your team's goals.

In my recent projects and experience, I have consistently focused on building scalable, reliable, and efficient software solutions. I am eager to bring my problem-solving skills and technical expertise to {company}.

Thank you for your time and consideration.

Sincerely,
{candidate_profile.get('full_name', 'Candidate')}"""

        prompt = f"""
        Write a professional 3-paragraph Cover Letter for the following candidate applying for the '{role}' role at '{company}'.
        
        Candidate Name: {candidate_profile.get('full_name', 'Candidate')}
        Candidate Skills: {skills_str}
        Candidate Experience Summary: {candidate_profile.get('summary', '')}
        Job Description Excerpt: {job_details.get('raw_text', '')[:500]}
        
        Format as a professional cover letter. Do not fabricate experience.
        """

        try:
            response = self.client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )
            return response.text.strip()
        except Exception:
            return f"Dear Hiring Manager at {company},\n\nI am thrilled to apply for the {role} position..."

    def generate_interview_questions(self, candidate_profile: Dict[str, Any], job_details: Dict[str, Any]) -> List[Dict[str, str]]:
        if not self.client:
            return [
                {
                    "question": f"Can you explain your experience working with {candidate_profile.get('skills', ['key technologies'])[0]} in your recent project?",
                    "category": "Technical",
                    "sample_answer": "Structure your answer using the STAR method: Situation, Task, Action, and Result."
                },
                {
                    "question": f"How would you approach designing a scalable solution for the core responsibilities outlined in this {job_details.get('job_title', 'role')} description?",
                    "category": "Role",
                    "sample_answer": "Highlight system architecture, API design, and trade-off considerations."
                }
            ]

        prompt = f"""
        Based on the following candidate resume and job description, generate 4 tailored mock interview questions with sample answer guidance.
        
        Target Role: {job_details.get('job_title', 'Developer')}
        Candidate Skills: {', '.join(candidate_profile.get('skills', [])[:8])}
        Job Requirements: {job_details.get('raw_text', '')[:400]}
        
        Categorize into: Technical, Behavioral, Project, Role.
        Format as JSON array with keys: "question", "category", "sample_answer".
        """

        try:
            response = self.client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(response_mime_type="application/json")
            )
            import json
            return json.loads(response.text.strip())
        except Exception:
            return [
                {
                    "question": "Describe a challenging technical obstacle you faced in your recent project and how you resolved it.",
                    "category": "Technical",
                    "sample_answer": "Detail the root cause analysis and technical steps taken."
                }
            ]

llm_service = LLMService()
