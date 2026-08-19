import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UserProfile {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  professional_title?: string;
  summary?: string;
  education_items?: any[];
  experience_items?: any[];
  projects?: any[];
  skills?: any[];
  certifications?: any[];
}

export interface ATSReport {
  id?: string;
  overall_score: number;
  keyword_score: number;
  semantic_score: number;
  skills_score: number;
  structure_score: number;
  matched_keywords: string[];
  missing_keywords: {
    high: string[];
    medium: string[];
    low: string[];
  };
  recommendations: string[];
  structure_issues: string[];
}

export interface JobDescription {
  id: string;
  job_title: string;
  company_name?: string;
  raw_text: string;
  extracted_skills: string[];
  extracted_keywords: string[];
}

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await axios.get('http://localhost:8000/');
      return res.data;
    } catch {
      return null;
    }
  },

  // Auth
  register: async (payload: { name: string; email: string; password: string }) => {
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
  },

  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const res = await apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (res.data.access_token) {
      localStorage.setItem('access_token', res.data.access_token);
    }
    return res.data;
  },

  // Profile
  getProfile: async (): Promise<UserProfile> => {
    const res = await apiClient.get('/profile');
    return res.data;
  },

  addSkill: async (name: string, category: string = 'Other') => {
    const res = await apiClient.post('/profile/skills', { name, category });
    return res.data;
  },

  addExperience: async (exp: { job_title: string; company: string; location?: string; start_date?: string; end_date?: string; responsibilities: string[] }) => {
    const res = await apiClient.post('/profile/experience', exp);
    return res.data;
  },

  addProject: async (proj: { project_name: string; description: string; bullet_points: string[]; technologies: string[] }) => {
    const res = await apiClient.post('/profile/projects', proj);
    return res.data;
  },

  addEducation: async (edu: { institution: string; degree: string; field_of_study: string; start_date?: string; end_date?: string }) => {
    const res = await apiClient.post('/profile/education', edu);
    return res.data;
  },

  // Resumes
  getResumes: async () => {
    const res = await apiClient.get('/resumes');
    return res.data;
  },

  createResume: async (payload: { title: string; target_role?: string; template_name?: string }) => {
    const res = await apiClient.post('/resumes', payload);
    return res.data;
  },

  // Job Analysis
  analyzeJob: async (payload: { job_title: string; company_name?: string; raw_text: string }): Promise<JobDescription> => {
    const res = await apiClient.post('/jobs/analyze', payload);
    return res.data;
  },

  // ATS Compatibility Score
  analyzeATS: async (resumeId: string, jobDescriptionId: string): Promise<ATSReport> => {
    const res = await apiClient.post('/ats/analyze', {
      resume_id: resumeId,
      job_description_id: jobDescriptionId,
    });
    return res.data;
  },

  // Download PDF
  downloadPDF: async (resumeId: string) => {
    const res = await apiClient.get(`/pdf/${resumeId}/download`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume_${resumeId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // AI Service
  generateAISummary: async (payload: { target_role: string; skills: string[]; experience_highlights: string[] }) => {
    const res = await apiClient.post('/ai/summary', payload);
    return res.data;
  },

  improveBullet: async (bulletText: string, targetRole?: string) => {
    const res = await apiClient.post('/ai/improve-bullet', { original_bullet: bulletText, target_role: targetRole });
    return res.data;
  },

  generateCoverLetter: async (payload: { candidate_name: string; target_role: string; company_name: string; job_description_summary: string; key_achievements: string[] }) => {
    const res = await apiClient.post('/ai/cover-letter', payload);
    return res.data;
  },

  generateInterviewPrep: async (payload: { target_role: string; job_description_text: string }) => {
    const res = await apiClient.post('/ai/interview-prep', payload);
    return res.data;
  },
};
