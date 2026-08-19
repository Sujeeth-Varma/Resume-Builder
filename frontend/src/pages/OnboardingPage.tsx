import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { api, type UserProfile } from '../api/client';
import { useStore } from '../store/useStore';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { User, Briefcase, GraduationCap, Code, Rocket, Award, ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, Sparkles } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchProfile, profile } = useStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Step 1: Basic Info
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [professionalTitle, setProfessionalTitle] = useState(profile?.professional_title || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [linkedin, setLinkedin] = useState(profile?.linkedin || '');
  const [github, setGithub] = useState(profile?.github || '');
  const [portfolio, setPortfolio] = useState(profile?.portfolio || '');
  const [summary, setSummary] = useState(profile?.summary || '');

  // Step 2: Experience Items
  const [experiences, setExperiences] = useState<Array<{
    job_title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    responsibilities: string[];
    respInput: string;
  }>>([]);

  // Step 3: Education Items
  const [educationList, setEducationList] = useState<Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    cgpa: string;
    relevant_coursework: string;
  }>>([]);

  // Step 4: Skills Taxonomy
  const [skillNameInput, setSkillNameInput] = useState('');
  const [skillsList, setSkillsList] = useState<Array<{ name: string; category: string }>>([]);

  // Step 5: Projects
  const [projectsList, setProjectsList] = useState<Array<{
    project_name: string;
    description: string;
    technologies: string[];
    techInput: string;
    github_url: string;
    live_url: string;
    role: string;
  }>>([]);

  // Step 6: Certifications
  const [certificationsList, setCertificationsList] = useState<Array<{
    certification_name: string;
    issuing_organization: string;
    issue_date: string;
    credential_url: string;
  }>>([]);

  useEffect(() => {
    if (profile) {
      if (profile.full_name) setFullName(profile.full_name);
      if (profile.email) setEmail(profile.email);
      if (profile.professional_title) setProfessionalTitle(profile.professional_title);
      if (profile.phone) setPhone(profile.phone);
      if (profile.location) setLocation(profile.location);
      if (profile.linkedin) setLinkedin(profile.linkedin);
      if (profile.github) setGithub(profile.github);
      if (profile.portfolio) setPortfolio(profile.portfolio);
      if (profile.summary) setSummary(profile.summary);

      if (profile.experience_items && profile.experience_items.length > 0) {
        setExperiences(profile.experience_items.map((e: any) => ({
          job_title: e.job_title || '',
          company: e.company || '',
          location: e.location || '',
          start_date: e.start_date || '',
          end_date: e.end_date || '',
          responsibilities: e.responsibilities || [],
          respInput: '',
        })));
      }

      if (profile.education_items && profile.education_items.length > 0) {
        setEducationList(profile.education_items.map((e: any) => ({
          institution: e.institution || '',
          degree: e.degree || '',
          field_of_study: e.field_of_study || '',
          start_date: e.start_date || '',
          end_date: e.end_date || '',
          cgpa: e.cgpa || '',
          relevant_coursework: e.relevant_coursework || '',
        })));
      }

      if (profile.skills && profile.skills.length > 0) {
        setSkillsList(profile.skills.map((s: any) => ({
          name: typeof s === 'string' ? s : s.name,
          category: typeof s === 'object' && s.category ? s.category : 'Other',
        })));
      }

      if (profile.projects && profile.projects.length > 0) {
        setProjectsList(profile.projects.map((p: any) => ({
          project_name: p.project_name || '',
          description: p.description || '',
          technologies: p.technologies || [],
          techInput: '',
          github_url: p.github_url || '',
          live_url: p.live_url || '',
          role: p.role || '',
        })));
      }

      if (profile.certifications && profile.certifications.length > 0) {
        setCertificationsList(profile.certifications.map((c: any) => ({
          certification_name: c.certification_name || c.name || '',
          issuing_organization: c.issuing_organization || '',
          issue_date: c.issue_date || '',
          credential_url: c.credential_url || '',
        })));
      }
    }
  }, [profile]);

  // Dynamic lists helper functions
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { job_title: '', company: '', location: '', start_date: '', end_date: '', responsibilities: [], respInput: '' }
    ]);
  };

  const removeExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', cgpa: '', relevant_coursework: '' }
    ]);
  };

  const removeEducation = (idx: number) => {
    setEducationList(educationList.filter((_, i) => i !== idx));
  };

  const autoClassifyCategory = (name: string): string => {
    const lower = name.toLowerCase().trim();
    if (['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'go', 'golang', 'rust', 'html', 'css', 'sql', 'r', 'php', 'bash', 'kotlin', 'swift'].some(k => lower.includes(k))) return 'Languages';
    if (['react', 'vue', 'next', 'angular', 'fastapi', 'flask', 'django', 'spring', 'node', 'express', 'pytorch', 'tensorflow', 'scikit', 'pandas', 'numpy', 'langchain', 'langgraph', 'tailwind', 'bootstrap'].some(k => lower.includes(k))) return 'Frameworks';
    if (['postgres', 'mysql', 'mongo', 'redis', 'sqlite', 'oracle', 'dynamo', 'elasticsearch', 'pinecone', 'qdrant', 'chroma', 'sqlalchemy'].some(k => lower.includes(k))) return 'Databases';
    if (['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'jenkins', 'terraform', 'linux', 'nginx', 'ci/cd', 'devops', 'cloud'].some(k => lower.includes(k))) return 'Cloud & DevOps';
    if (['git', 'github', 'jira', 'postman', 'swagger', 'rest', 'graphql', 'excel', 'powerbi', 'figma'].some(k => lower.includes(k))) return 'Tools';
    if (['ml', 'learning', 'nlp', 'spacy', 'opencv', 'llm', 'rag', 'embeddings'].some(k => lower.includes(k))) return 'AI & ML';
    return 'Other';
  };

  const addSkill = () => {
    if (!skillNameInput.trim()) return;
    const rawItems = skillNameInput.split(',').map(s => s.trim()).filter(Boolean);
    const newItems = rawItems.map(item => {
      const category = autoClassifyCategory(item);
      return { name: item, category };
    });
    setSkillsList([...skillsList, ...newItems]);
    setSkillNameInput('');
  };

  const removeSkill = (idx: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== idx));
  };

  const addProject = () => {
    setProjectsList([
      ...projectsList,
      { project_name: '', description: '', technologies: [], techInput: '', github_url: '', live_url: '', role: '' }
    ]);
  };

  const removeProject = (idx: number) => {
    setProjectsList(projectsList.filter((_, i) => i !== idx));
  };

  const addCertification = () => {
    setCertificationsList([
      ...certificationsList,
      { certification_name: '', issuing_organization: '', issue_date: '', credential_url: '' }
    ]);
  };

  const removeCertification = (idx: number) => {
    setCertificationsList(certificationsList.filter((_, i) => i !== idx));
  };

  const handleSubmitOnboarding = async () => {
    setSubmitting(true);
    try {
      const payload: UserProfile = {
        full_name: fullName.trim() || 'Candidate',
        email: email.trim(),
        phone: phone.trim() || undefined,
        location: location.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        github: github.trim() || undefined,
        portfolio: portfolio.trim() || undefined,
        professional_title: professionalTitle.trim() || undefined,
        summary: summary.trim() || undefined,
        education_items: educationList.map(e => ({
          institution: e.institution,
          degree: e.degree,
          field_of_study: e.field_of_study,
          start_date: e.start_date || undefined,
          end_date: e.end_date || undefined,
          cgpa: e.cgpa || undefined,
          relevant_coursework: e.relevant_coursework || undefined,
        })),
        experience_items: experiences.map(e => ({
          job_title: e.job_title,
          company: e.company,
          location: e.location || undefined,
          start_date: e.start_date || undefined,
          end_date: e.end_date || undefined,
          responsibilities: e.responsibilities,
        })),
        skills: skillsList.map(s => ({ name: s.name, category: s.category })),
        projects: projectsList.map(p => ({
          project_name: p.project_name,
          description: p.description,
          technologies: p.technologies,
          github_url: p.github_url || undefined,
          live_url: p.live_url || undefined,
          role: p.role || undefined,
        })),
        certifications: certificationsList.map(c => ({
          certification_name: c.certification_name,
          issuing_organization: c.issuing_organization,
          issue_date: c.issue_date || undefined,
          credential_url: c.credential_url || undefined,
        })),
      };

      await api.onboardProfile(payload);
      await fetchProfile();
      navigate('/dashboard');
    } catch {
      navigate('/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="font-mono text-xs px-3 py-1 bg-[hsl(var(--card))]">
          CANDIDATE ONBOARDING
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
          Build Your Candidate Profile
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
          Enter your authentic candidate details with native date inputs to store in PostgreSQL and generate custom ATS resumes.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          { step: 1, label: 'Profile', icon: User },
          { step: 2, label: 'Experience', icon: Briefcase },
          { step: 3, label: 'Education', icon: GraduationCap },
          { step: 4, label: 'Skills', icon: Code },
          { step: 5, label: 'Projects', icon: Rocket },
          { step: 6, label: 'Certs', icon: Award },
        ].map((item) => {
          const IconComponent = item.icon;
          const isActive = currentStep === item.step;
          const isDone = currentStep > item.step;
          return (
            <div
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                isActive
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-xs font-bold font-mono">
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <IconComponent className="w-3.5 h-3.5" />}
                <span>{item.step}</span>
              </div>
              <div className="text-[10px] font-mono mt-1 truncate">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* STEP 1: BASIC INFORMATION */}
      {currentStep === 1 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-[hsl(var(--primary))]" />
              Personal & Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Full Name *</label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Email Address *</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Professional Title</label>
                <Input value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} placeholder="e.g. Full Stack Developer" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Phone Number</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +91 9876543210" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Location</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Bengaluru, Karnataka" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Portfolio / Website</label>
                <Input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://yourportfolio.com" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">LinkedIn Profile</label>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">GitHub Profile</label>
                <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Professional Executive Summary / Career Objective</label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                placeholder="Brief summary or objective highlighting your technical background and career goals..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: EXPERIENCE */}
      {currentStep === 2 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[hsl(var(--primary))]" />
              Work & Professional Experience
            </CardTitle>
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1" onClick={addExperience}>
              <Plus className="w-3.5 h-3.5" /> Add Job Role
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {experiences.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-xl">
                No work experiences added yet. Click "Add Job Role" above to enter your career history.
              </div>
            ) : (
              experiences.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeExperience(idx)}
                    className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Job Title *</label>
                      <Input
                        placeholder="Job Title (e.g. Data Science Intern)"
                        value={exp.job_title}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].job_title = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Company Name *</label>
                      <Input
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].company = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Location</label>
                      <Input
                        placeholder="Location (e.g. Remote, Bengaluru)"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].location = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Start Date</label>
                      <Input
                        type="month"
                        value={exp.start_date}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].start_date = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">End Date (Leave blank if Present)</label>
                      <Input
                        type="month"
                        value={exp.end_date}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].end_date = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Key Responsibilities & Bullet Points</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add responsibility / accomplishment bullet..."
                        value={exp.respInput}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].respInput = e.target.value;
                          setExperiences(updated);
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          if (!exp.respInput.trim()) return;
                          const updated = [...experiences];
                          updated[idx].responsibilities.push(exp.respInput.trim());
                          updated[idx].respInput = '';
                          setExperiences(updated);
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="space-y-1">
                      {exp.responsibilities.map((r, rIdx) => (
                        <div key={rIdx} className="text-xs font-mono text-[hsl(var(--foreground))] flex items-center justify-between bg-[hsl(var(--card))] p-2 rounded border border-[hsl(var(--border))]">
                          <span>• {r}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...experiences];
                              updated[idx].responsibilities = updated[idx].responsibilities.filter((_, i) => i !== rIdx);
                              setExperiences(updated);
                            }}
                            className="text-[10px] text-rose-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* STEP 3: EDUCATION */}
      {currentStep === 3 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[hsl(var(--primary))]" />
              Education & Academic Background
            </CardTitle>
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1" onClick={addEducation}>
              <Plus className="w-3.5 h-3.5" /> Add Degree
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {educationList.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-xl">
                No education items added. Click "Add Degree" to specify your academic background.
              </div>
            ) : (
              educationList.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Institution / University *</label>
                      <Input
                        placeholder="College Name"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].institution = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Degree *</label>
                      <Input
                        placeholder="Degree (e.g. B.Tech)"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].degree = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Field of Study</label>
                      <Input
                        placeholder="Field of Study (e.g. CSE)"
                        value={edu.field_of_study}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].field_of_study = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">CGPA / GPA</label>
                      <Input
                        placeholder="CGPA (e.g. 9.03)"
                        value={edu.cgpa}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].cgpa = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">College Start Date</label>
                      <Input
                        type="month"
                        value={edu.start_date}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].start_date = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">College Graduation Date</label>
                      <Input
                        type="month"
                        value={edu.end_date}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].end_date = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Relevant Coursework</label>
                      <Input
                        placeholder="e.g. Data Structures, Algorithms, AI/ML, Database Systems"
                        value={edu.relevant_coursework}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].relevant_coursework = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* STEP 4: SKILLS */}
      {currentStep === 4 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Code className="w-4 h-4 text-[hsl(var(--primary))]" />
              Technical & Professional Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Type or paste skills (e.g. Python, React, PostgreSQL, Docker, AWS)"
                value={skillNameInput}
                onChange={(e) => setSkillNameInput(e.target.value)}
              />
              <Button type="button" onClick={addSkill} className="text-xs font-mono shrink-0">
                Add Skills
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsList.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-4">
                  No skills added yet. Enter skills above and click "Add Skills".
                </div>
              ) : (
                skillsList.map((sk, idx) => (
                  <Badge key={idx} variant="outline" className="font-mono text-xs px-3 py-1 gap-2 bg-[hsl(var(--secondary))]">
                    <span>{sk.name}</span>
                    <button type="button" onClick={() => removeSkill(idx)} className="text-rose-500 hover:font-bold">×</button>
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 5: PROJECTS */}
      {currentStep === 5 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[hsl(var(--primary))]" />
              Projects & Technical Portfolio
            </CardTitle>
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1" onClick={addProject}>
              <Plus className="w-3.5 h-3.5" /> Add Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {projectsList.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-xl">
                No projects added yet. Click "Add Project" to include technical accomplishments.
              </div>
            ) : (
              projectsList.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Input
                    placeholder="Project Name *"
                    value={proj.project_name}
                    onChange={(e) => {
                      const updated = [...projectsList];
                      updated[idx].project_name = e.target.value;
                      setProjectsList(updated);
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="Project Description & Key Accomplishments..."
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...projectsList];
                      updated[idx].description = e.target.value;
                      setProjectsList(updated);
                    }}
                    className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--card))] p-2.5 text-xs font-mono text-[hsl(var(--foreground))]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="GitHub Repository URL"
                      value={proj.github_url}
                      onChange={(e) => {
                        const updated = [...projectsList];
                        updated[idx].github_url = e.target.value;
                        setProjectsList(updated);
                      }}
                    />
                    <Input
                      placeholder="Live Demo URL"
                      value={proj.live_url}
                      onChange={(e) => {
                        const updated = [...projectsList];
                        updated[idx].live_url = e.target.value;
                        setProjectsList(updated);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* STEP 6: CERTIFICATIONS */}
      {currentStep === 6 && (
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-[hsl(var(--primary))]" />
              Certifications & Credentials
            </CardTitle>
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1" onClick={addCertification}>
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {certificationsList.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-xl">
                No certifications added yet. Click "Add Certification" to add your credentials.
              </div>
            ) : (
              certificationsList.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeCertification(idx)}
                    className="absolute top-3 right-3 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Certification Name *</label>
                      <Input
                        placeholder="Certification Name (e.g. AWS Solutions Architect)"
                        value={cert.certification_name}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[idx].certification_name = e.target.value;
                          setCertificationsList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Issuing Organization *</label>
                      <Input
                        placeholder="Issuing Org (e.g. Amazon Web Services, Coursera)"
                        value={cert.issuing_organization}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[idx].issuing_organization = e.target.value;
                          setCertificationsList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Issue Date</label>
                      <Input
                        type="month"
                        value={cert.issue_date}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[idx].issue_date = e.target.value;
                          setCertificationsList(updated);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Credential URL</label>
                      <Input
                        placeholder="https://verify.credential.com"
                        value={cert.credential_url}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[idx].credential_url = e.target.value;
                          setCertificationsList(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]">
        <Button
          variant="outline"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="text-xs font-mono gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-xs font-mono text-[hsl(var(--muted-foreground))]"
          >
            Skip for Now
          </Button>

          {currentStep < 6 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="text-xs font-mono gap-1 bg-[hsl(var(--primary))] text-white"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              disabled={submitting}
              onClick={handleSubmitOnboarding}
              className="text-xs font-mono gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {submitting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> Saving Profile...
                </>
              ) : (
                <>
                  Complete Onboarding & Generate Resumes <CheckCircle2 className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};
