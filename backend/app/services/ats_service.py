from typing import Dict, Any, List
from app.services.nlp_service import nlp_service
from app.services.embedding_service import embedding_service

class ATSService:
    def analyze_compatibility(self, resume_content: Any, job_raw_text: str) -> Dict[str, Any]:
        # 1. Prepare raw text strings
        if isinstance(resume_content, str):
            full_resume_text = resume_content
        elif isinstance(resume_content, dict):
            resume_text_blocks = []
            
            # Summary
            if resume_content.get("summary"):
                resume_text_blocks.append(resume_content["summary"])
                
            # Skills
            resume_skills_list = resume_content.get("skills", [])
            if isinstance(resume_skills_list, list):
                skill_names = [s.get("name", s) if isinstance(s, dict) else str(s) for s in resume_skills_list]
                resume_text_blocks.append(" ".join(skill_names))
                
            # Experience
            for exp in resume_content.get("experience", []):
                if isinstance(exp, dict):
                    resume_text_blocks.append(exp.get("job_title", ""))
                    resume_text_blocks.append(" ".join(exp.get("responsibilities", [])))
                    resume_text_blocks.append(" ".join(exp.get("achievements", [])))

            # Projects
            for proj in resume_content.get("projects", []):
                if isinstance(proj, dict):
                    resume_text_blocks.append(proj.get("project_name", ""))
                    resume_text_blocks.append(proj.get("description", ""))
                    resume_text_blocks.append(" ".join(proj.get("bullet_points", [])))

            full_resume_text = " ".join(resume_text_blocks)
        else:
            full_resume_text = str(resume_content or "")

        # 2. Extract Skills & Keywords
        resume_extracted_skills = set([s.lower() for s in nlp_service.extract_skills(full_resume_text)])
        job_extracted_skills = set([s.lower() for s in nlp_service.extract_skills(job_raw_text)])

        job_keywords = nlp_service.extract_keywords(job_raw_text)

        # 3. Calculate Component Scores
        
        # A. Skills Match (20%)
        if job_extracted_skills:
            matched_skills_set = resume_extracted_skills.intersection(job_extracted_skills)
            skills_ratio = len(matched_skills_set) / len(job_extracted_skills)
        else:
            skills_ratio = 1.0
        skills_score = round(skills_ratio * 20.0, 2)

        # B. Keyword Match (40%)
        matched_keywords = []
        missing_keywords_list = []
        for kw in job_keywords:
            if kw.lower() in full_resume_text.lower():
                matched_keywords.append(kw)
            else:
                missing_keywords_list.append(kw)

        keyword_ratio = len(matched_keywords) / max(1, len(job_keywords))
        keyword_score = round(keyword_ratio * 40.0, 2)

        # C. Semantic Similarity (30%)
        semantic_sim = embedding_service.compute_similarity(full_resume_text, job_raw_text)
        semantic_score = round(semantic_sim * 30.0, 2)

        # D. Resume Structure (10%)
        structure_score = 10.0
        structure_issues = []

        if isinstance(resume_content, dict):
            if not resume_content.get("summary") and not resume_content.get("objective") and not resume_content.get("career_objective"):
                structure_score -= 2.0
                structure_issues.append("Missing Professional Summary or Career Objective section.")
            if not resume_content.get("experience") and not resume_content.get("projects"):
                structure_score -= 4.0
                structure_issues.append("Missing both Experience and Projects sections.")
            if not resume_content.get("skills"):
                structure_score -= 2.0
                structure_issues.append("Missing dedicated Skills section.")
            if not resume_content.get("education"):
                structure_score -= 2.0
                structure_issues.append("Missing Education section.")
        else:
            lower_text = full_resume_text.lower()
            if not any(k in lower_text for k in ["summary", "objective", "career objective", "profile", "about", "overview", "executive summary"]):
                structure_score -= 2.0
                structure_issues.append("Missing Professional Summary or Career Objective section.")
            if not any(k in lower_text for k in ["experience", "work", "employment", "project", "projects"]):
                structure_score -= 4.0
                structure_issues.append("Missing both Experience and Projects sections.")
            if not any(k in lower_text for k in ["skill", "skills", "technologies", "tech"]):
                structure_score -= 2.0
                structure_issues.append("Missing dedicated Skills section.")
            if not any(k in lower_text for k in ["education", "academic", "degree", "university", "college"]):
                structure_score -= 2.0
                structure_issues.append("Missing Education section.")

        structure_score = round(max(0.0, structure_score), 2)

        # Total ATS Score
        overall_score = round(keyword_score + semantic_score + skills_score + structure_score, 1)

        # Categorize Missing Keywords by priority
        missing_skills = [s.title() for s in job_extracted_skills - resume_extracted_skills]
        
        high_priority = missing_skills[:5]
        medium_priority = missing_keywords_list[:5]
        low_priority = missing_keywords_list[5:10]

        # Actionable Recommendations
        recommendations = []
        if high_priority:
            recommendations.append(f"High Priority: Add missing core technical skills to your Skills section if applicable: {', '.join(high_priority)}.")
        if missing_keywords_list:
            recommendations.append(f"Consider integrating important job keywords like {', '.join(missing_keywords_list[:3])} into your experience or project bullet points.")
        if structure_issues:
            recommendations.extend(structure_issues)
        if semantic_score < 18.0:
            recommendations.append("Tailor your work experience bullet points to more closely mirror the specific responsibilities mentioned in the job description.")

        return {
            "overall_score": overall_score,
            "keyword_score": keyword_score,
            "semantic_score": semantic_score,
            "skills_score": skills_score,
            "structure_score": structure_score,
            "matched_keywords": [kw.title() for kw in matched_keywords],
            "missing_keywords": {
                "high_priority": high_priority,
                "medium_priority": [kw.title() for kw in medium_priority],
                "low_priority": [kw.title() for kw in low_priority],
            },
            "recommendations": recommendations,
            "structure_issues": structure_issues
        }

ats_service = ATSService()
