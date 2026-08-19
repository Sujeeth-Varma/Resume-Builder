import re
from typing import List, Dict, Set, Any

# Curated Technical & Soft Skill Taxonomy Dictionary
KNOWN_SKILLS = {
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "go", "golang", "rust", "ruby", "php", "sql", "html", "css", "kotlin", "swift",
    # Frameworks & Libraries
    "react", "react.js", "next.js", "vue", "vue.js", "angular", "node.js", "express", "fastapi", "flask", "django", "spring", "spring boot", "dot net", ".net", "hibernate", "tailwind", "bootstrap",
    # Databases
    "postgresql", "postgres", "mysql", "mongodb", "redis", "oracle", "sqlite", "dynamodb", "elasticsearch", "cassandra", "neo4j",
    # Cloud & DevOps
    "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "jenkins", "terraform", "ansible", "gitlab ci", "github actions", "linux", "nginx",
    # Tools & Concepts
    "git", "github", "gitlab", "jira", "postman", "rest api", "restful api", "graphql", "microservices", "system design", "agile", "scrum", "ci/cd",
    # AI/ML & Data
    "machine learning", "deep learning", "nlp", "spacy", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy", "opencv", "llm", "rag", "embeddings",
    # Soft Skills
    "communication", "problem solving", "leadership", "teamwork", "time management", "critical thinking", "adaptability"
}

class NLPService:
    def __init__(self):
        pass

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        text = text.lower()
        text = re.sub(r'[\r\n\t]+', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def extract_skills(self, text: str) -> List[str]:
        cleaned = self.clean_text(text)
        found_skills: Set[str] = set()

        for skill in KNOWN_SKILLS:
            # Word boundary regex search to prevent false partial matches
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, cleaned):
                # Standardize names
                normalized_name = skill.title() if skill not in ["aws", "gcp", "sql", "html", "css", "ci/cd", "nlp", "llm", "rag"] else skill.upper()
                found_skills.add(normalized_name)

        return sorted(list(found_skills))

    def extract_keywords(self, text: str) -> List[str]:
        cleaned = self.clean_text(text)
        words = re.findall(r'\b[a-zA-Z0-9\+\#\.\-]{3,}\b', cleaned)
        stopwords = {
            "the", "and", "for", "with", "this", "that", "from", "have", "will", "your",
            "must", "should", "ability", "work", "years", "experience", "strong", "team",
            "working", "building", "developing", "role", "candidate", "knowledge", "understanding"
        }
        filtered = [w for w in words if w not in stopwords and not w.isdigit()]
        
        # Frequency analysis
        freq: Dict[str, int] = {}
        for w in filtered:
            freq[w] = freq.get(w, 0) + 1
            
        sorted_keywords = sorted(freq.keys(), key=lambda k: freq[k], reverse=True)
        return sorted_keywords[:30]

    def extract_requirements(self, text: str) -> Dict[str, Any]:
        cleaned = self.clean_text(text)
        
        # Experience match
        exp_match = re.search(r'(\d+\+?\s*(?:-\s*\d+)?\s*(?:years?|yrs?))', cleaned)
        experience_req = exp_match.group(1) if exp_match else "Not explicitly specified"

        # Education match
        education_req = "Not explicitly specified"
        if "bachelor" in cleaned or "b.s" in cleaned or "bs" in cleaned or "degree" in cleaned:
            education_req = "Bachelor's Degree in Computer Science or related field"
        elif "master" in cleaned or "m.s" in cleaned or "ms" in cleaned:
            education_req = "Master's Degree in Computer Science or related field"

        return {
            "experience_years": experience_req,
            "education": education_req,
            "extracted_skills_count": len(self.extract_skills(text))
        }

nlp_service = NLPService()
