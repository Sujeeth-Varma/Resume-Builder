import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI-Powered Resume Optimization Assistant"
    API_V1_STR: str = "/api"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://resume_user:resume_password@localhost:5432/resume_builder_db"
    SYNC_DATABASE_URL: str = "postgresql+psycopg2://resume_user:resume_password@localhost:5432/resume_builder_db"
    
    # Security
    JWT_SECRET: str = "super_secret_jwt_key_change_in_production_123456789"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # AI Configuration
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.0-flash"
    
    # NLP & Embeddings
    EMBEDDING_MODEL_NAME: str = "all-MiniLM-L6-v2"
    SPACY_MODEL_NAME: str = "en_core_web_sm"

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
