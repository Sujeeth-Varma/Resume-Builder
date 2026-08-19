import { create } from 'zustand';
import { api } from '../api/client';
import type { UserProfile, ATSReport, JobDescription } from '../api/client';

interface AppState {
  token: string | null;
  user: { name?: string; email?: string } | null;
  profile: UserProfile | null;
  resumes: any[];
  activeResumeId: string | null;
  activeJob: JobDescription | null;
  latestATSReport: ATSReport | null;
  isBackendOnline: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setToken: (token: string | null) => void;
  checkHealth: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  addSkill: (name: string, category: string) => Promise<void>;
  fetchResumes: () => Promise<void>;
  createResume: (title: string, target_role?: string, template_name?: string) => Promise<any>;
  analyzeJob: (job_title: string, company_name: string, raw_text: string) => Promise<JobDescription | null>;
  runATSAnalysis: (resumeId: string, jobId: string) => Promise<ATSReport | null>;
  logout: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  token: localStorage.getItem('access_token'),
  user: null,
  profile: null,
  resumes: [],
  activeResumeId: null,
  activeJob: null,
  latestATSReport: null,
  isBackendOnline: false,
  isLoading: false,
  error: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
    set({ token });
  },

  checkHealth: async () => {
    const health = await api.checkHealth();
    set({ isBackendOnline: !!health });
  },

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const profile = await api.getProfile();
      set({ profile, user: { name: profile.full_name, email: profile.email }, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.detail || 'Failed to fetch profile' });
    }
  },

  addSkill: async (name: string, category: string) => {
    try {
      await api.addSkill(name, category);
      await get().fetchProfile();
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to add skill' });
    }
  },

  fetchResumes: async () => {
    try {
      const resumes = await api.getResumes();
      set({ resumes });
      if (resumes.length > 0 && !get().activeResumeId) {
        set({ activeResumeId: resumes[0].id });
      }
    } catch (err: any) {
      console.error('Failed to fetch resumes:', err);
    }
  },

  createResume: async (title: string, target_role?: string, template_name = 'professional') => {
    try {
      set({ isLoading: true });
      const newResume = await api.createResume({ title, target_role, template_name });
      await get().fetchResumes();
      set({ activeResumeId: newResume.id, isLoading: false });
      return newResume;
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.detail || 'Failed to create resume' });
      return null;
    }
  },

  analyzeJob: async (job_title, company_name, raw_text) => {
    try {
      set({ isLoading: true, error: null });
      const job = await api.analyzeJob({ job_title, company_name, raw_text });
      set({ activeJob: job, isLoading: false });
      return job;
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.detail || 'Failed to analyze job description' });
      return null;
    }
  },

  runATSAnalysis: async (resumeId, jobId) => {
    try {
      set({ isLoading: true, error: null });
      const report = await api.analyzeATS(resumeId, jobId);
      set({ latestATSReport: report, isLoading: false });
      return report;
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.detail || 'Failed to calculate ATS compatibility score' });
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ token: null, user: null, profile: null, resumes: [], activeResumeId: null, latestATSReport: null });
  },
}));
