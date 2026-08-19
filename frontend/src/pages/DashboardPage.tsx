import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, User, Briefcase, GraduationCap, Code, Layers, Award, CheckCircle2, Pencil, Trash2, X, Save, Globe, ExternalLink } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, profile, fetchProfile, addSkill, token } = useStore();

  // Skills input state
  const [newSkillName, setNewSkillName] = useState('');
  const [skillAddedSuccess, setSkillAddedSuccess] = useState(false);

  // Header Details Edit Form State
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerForm, setHeaderForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    professional_title: '',
    summary: '',
  });

  // Work Experience Form Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpIdx, setEditingExpIdx] = useState<number | null>(null);
  const [expForm, setExpForm] = useState({
    job_title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    respInput: '',
    responsibilities: [] as string[],
  });

  // Education Form Modal State
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEduIdx, setEditingEduIdx] = useState<number | null>(null);
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    cgpa: '',
    start_date: '',
    end_date: '',
    relevant_coursework: '',
  });

  // Project Form Modal State
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [editingProjIdx, setEditingProjIdx] = useState<number | null>(null);
  const [projForm, setProjForm] = useState({
    project_name: '',
    description: '',
    techInput: '',
    technologies: [] as string[],
    github_url: '',
    live_url: '',
  });

  // Certification Form Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertIdx, setEditingCertIdx] = useState<number | null>(null);
  const [certForm, setCertForm] = useState({
    certification_name: '',
    issuing_organization: '',
    issue_date: '',
    credential_url: '',
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setHeaderForm({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || (profile as any).phone_number || '',
        location: profile.location || '',
        linkedin: profile.linkedin || '',
        github: profile.github || '',
        portfolio: profile.portfolio || '',
        professional_title: profile.professional_title || '',
        summary: profile.summary || '',
      });
    }
  }, [profile]);

  const userSkills = profile?.skills || [];
  const userExperiences = profile?.experience_items || [];
  const userProjects = profile?.projects || [];
  const userEducation = profile?.education_items || [];
  const userCertifications = profile?.certifications || [];

  // Helper to sync complete profile state back to backend atomically
  const syncProfileToBackend = async (overrides: Partial<any> = {}) => {
    setSaveStatus('Saving changes...');
    try {
      const payload = {
        email: overrides.email ?? headerForm.email ?? profile?.email ?? user?.email ?? '',
        full_name: overrides.full_name ?? headerForm.full_name,
        phone: overrides.phone ?? headerForm.phone,
        location: overrides.location ?? headerForm.location,
        linkedin: overrides.linkedin ?? headerForm.linkedin,
        github: overrides.github ?? headerForm.github,
        portfolio: overrides.portfolio ?? headerForm.portfolio,
        professional_title: overrides.professional_title ?? headerForm.professional_title,
        summary: overrides.summary ?? headerForm.summary,
        experience_items: overrides.experience_items ?? userExperiences,
        education_items: overrides.education_items ?? userEducation,
        skills: overrides.skills ?? userSkills,
        projects: overrides.projects ?? userProjects,
        certifications: overrides.certifications ?? userCertifications,
      };
      await api.onboardProfile(payload as any);
      await fetchProfile();
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      setSaveStatus('Failed to save changes.');
    }
  };

  // 1. Header Details Save
  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    await syncProfileToBackend();
    setIsEditingHeader(false);
  };

  // 2. Add/Remove Skill
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const rawSkills = newSkillName.split(',').map(s => s.trim()).filter(Boolean);
    for (const skillName of rawSkills) {
      await addSkill(skillName, 'Other');
    }
    setNewSkillName('');
    setSkillAddedSuccess(true);
    setTimeout(() => setSkillAddedSuccess(false), 2000);
  };

  const handleRemoveSkill = async (idx: number) => {
    const updatedSkills = userSkills.filter((_, i) => i !== idx);
    await syncProfileToBackend({ skills: updatedSkills });
  };

  // 3. Work Experience Handlers
  const handleOpenExpModal = (idx?: number) => {
    if (typeof idx === 'number') {
      const target = userExperiences[idx];
      setEditingExpIdx(idx);
      setExpForm({
        job_title: target.job_title || '',
        company: target.company || '',
        location: target.location || '',
        start_date: target.start_date || '',
        end_date: target.end_date || '',
        respInput: '',
        responsibilities: target.responsibilities || [],
      });
    } else {
      setEditingExpIdx(null);
      setExpForm({
        job_title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        respInput: '',
        responsibilities: [],
      });
    }
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.job_title || !expForm.company) return;
    const newExpItem = {
      job_title: expForm.job_title,
      company: expForm.company,
      location: expForm.location,
      start_date: expForm.start_date,
      end_date: expForm.end_date,
      responsibilities: expForm.responsibilities,
    };

    let updatedExp = [...userExperiences];
    if (editingExpIdx !== null) {
      updatedExp[editingExpIdx] = newExpItem;
    } else {
      updatedExp.push(newExpItem);
    }
    await syncProfileToBackend({ experience_items: updatedExp });
    setIsExpModalOpen(false);
  };

  const handleDeleteExp = async (idx: number) => {
    const updatedExp = userExperiences.filter((_, i) => i !== idx);
    await syncProfileToBackend({ experience_items: updatedExp });
  };

  // 4. Education Handlers
  const handleOpenEduModal = (idx?: number) => {
    if (typeof idx === 'number') {
      const target = userEducation[idx];
      setEditingEduIdx(idx);
      setEduForm({
        institution: target.institution || '',
        degree: target.degree || '',
        field_of_study: target.field_of_study || '',
        cgpa: target.cgpa || '',
        start_date: target.start_date || '',
        end_date: target.end_date || '',
        relevant_coursework: target.relevant_coursework || '',
      });
    } else {
      setEditingEduIdx(null);
      setEduForm({
        institution: '',
        degree: '',
        field_of_study: '',
        cgpa: '',
        start_date: '',
        end_date: '',
        relevant_coursework: '',
      });
    }
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution || !eduForm.degree) return;
    const newEduItem = {
      institution: eduForm.institution,
      degree: eduForm.degree,
      field_of_study: eduForm.field_of_study,
      cgpa: eduForm.cgpa,
      start_date: eduForm.start_date,
      end_date: eduForm.end_date,
      relevant_coursework: eduForm.relevant_coursework,
    };

    let updatedEdu = [...userEducation];
    if (editingEduIdx !== null) {
      updatedEdu[editingEduIdx] = newEduItem;
    } else {
      updatedEdu.push(newEduItem);
    }
    await syncProfileToBackend({ education_items: updatedEdu });
    setIsEduModalOpen(false);
  };

  const handleDeleteEdu = async (idx: number) => {
    const updatedEdu = userEducation.filter((_, i) => i !== idx);
    await syncProfileToBackend({ education_items: updatedEdu });
  };

  // 5. Project Handlers
  const handleOpenProjModal = (idx?: number) => {
    if (typeof idx === 'number') {
      const target = userProjects[idx];
      setEditingProjIdx(idx);
      setProjForm({
        project_name: target.project_name || '',
        description: target.description || '',
        techInput: '',
        technologies: target.technologies || [],
        github_url: target.github_url || '',
        live_url: target.live_url || '',
      });
    } else {
      setEditingProjIdx(null);
      setProjForm({
        project_name: '',
        description: '',
        techInput: '',
        technologies: [],
        github_url: '',
        live_url: '',
      });
    }
    setIsProjModalOpen(true);
  };

  const handleSaveProj = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.project_name) return;
    const newProjItem = {
      project_name: projForm.project_name,
      description: projForm.description,
      technologies: projForm.technologies,
      github_url: projForm.github_url,
      live_url: projForm.live_url,
    };

    let updatedProj = [...userProjects];
    if (editingProjIdx !== null) {
      updatedProj[editingProjIdx] = newProjItem;
    } else {
      updatedProj.push(newProjItem);
    }
    await syncProfileToBackend({ projects: updatedProj });
    setIsProjModalOpen(false);
  };

  const handleDeleteProj = async (idx: number) => {
    const updatedProj = userProjects.filter((_, i) => i !== idx);
    await syncProfileToBackend({ projects: updatedProj });
  };

  // 6. Certification Handlers
  const handleOpenCertModal = (idx?: number) => {
    if (typeof idx === 'number') {
      const target = userCertifications[idx];
      setEditingCertIdx(idx);
      setCertForm({
        certification_name: target.certification_name || target.name || '',
        issuing_organization: target.issuing_organization || '',
        issue_date: target.issue_date || '',
        credential_url: target.credential_url || '',
      });
    } else {
      setEditingCertIdx(null);
      setCertForm({
        certification_name: '',
        issuing_organization: '',
        issue_date: '',
        credential_url: '',
      });
    }
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.certification_name) return;
    const newCertItem = {
      certification_name: certForm.certification_name,
      issuing_organization: certForm.issuing_organization,
      issue_date: certForm.issue_date,
      credential_url: certForm.credential_url,
    };

    let updatedCert = [...userCertifications];
    if (editingCertIdx !== null) {
      updatedCert[editingCertIdx] = newCertItem;
    } else {
      updatedCert.push(newCertItem);
    }
    await syncProfileToBackend({ certifications: updatedCert });
    setIsCertModalOpen(false);
  };

  const handleDeleteCert = async (idx: number) => {
    const updatedCert = userCertifications.filter((_, i) => i !== idx);
    await syncProfileToBackend({ certifications: updatedCert });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header & Personal Info Card */}
      <div className="border border-[hsl(var(--border))] rounded-2xl p-6 bg-[hsl(var(--card))] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
              <User className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
              <span>CANDIDATE PROFILE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {profile?.full_name || 'Candidate Name'}
            </h1>
            <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1 flex flex-wrap items-center gap-2">
              <span>{profile?.email || 'candidate@example.com'}</span>
              {profile?.phone && <span>· {profile.phone}</span>}
              {profile?.professional_title && <span>· {profile.professional_title}</span>}
              {profile?.location && <span>· {profile.location}</span>}
            </p>

            {(profile?.linkedin || profile?.github || profile?.portfolio) && (
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-[hsl(var(--primary))]">
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {profile?.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <Globe className="w-3.5 h-3.5" /> Portfolio
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setIsEditingHeader(!isEditingHeader)}
              className="text-xs font-mono gap-1.5 bg-[hsl(var(--primary))] text-white"
            >
              <Pencil className="w-3.5 h-3.5" />
              {isEditingHeader ? 'Cancel Editing' : 'Edit Personal Details'}
            </Button>
          </div>
        </div>

        {/* Inline Personal Details Edit Form */}
        {isEditingHeader && (
          <form onSubmit={handleSaveHeader} className="pt-4 border-t border-[hsl(var(--border))] space-y-3 bg-[hsl(var(--background))] p-4 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Full Name</label>
                <Input
                  value={headerForm.full_name}
                  onChange={(e) => setHeaderForm({ ...headerForm, full_name: e.target.value })}
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Email Address</label>
                <Input
                  value={headerForm.email}
                  onChange={(e) => setHeaderForm({ ...headerForm, email: e.target.value })}
                  placeholder="Email Address"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Professional Title</label>
                <Input
                  value={headerForm.professional_title}
                  onChange={(e) => setHeaderForm({ ...headerForm, professional_title: e.target.value })}
                  placeholder="Professional Title (e.g. Full Stack Developer)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Phone Number</label>
                <Input
                  value={headerForm.phone}
                  onChange={(e) => setHeaderForm({ ...headerForm, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Location</label>
                <Input
                  value={headerForm.location}
                  onChange={(e) => setHeaderForm({ ...headerForm, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Portfolio / Website URL</label>
                <Input
                  value={headerForm.portfolio}
                  onChange={(e) => setHeaderForm({ ...headerForm, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">LinkedIn Profile URL</label>
                <Input
                  value={headerForm.linkedin}
                  onChange={(e) => setHeaderForm({ ...headerForm, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">GitHub Profile URL</label>
                <Input
                  value={headerForm.github}
                  onChange={(e) => setHeaderForm({ ...headerForm, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Professional Bio / Summary</label>
              <textarea
                rows={3}
                value={headerForm.summary}
                onChange={(e) => setHeaderForm({ ...headerForm, summary: e.target.value })}
                className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none"
                placeholder="Brief summary of experience and domain expertise..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditingHeader(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[hsl(var(--primary))] text-white gap-1">
                <Save className="w-3.5 h-3.5" /> Save Details
              </Button>
            </div>
          </form>
        )}

        {saveStatus && (
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {saveStatus}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Skills & Certifications */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Skills Input Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-[hsl(var(--primary))]" />
                Technical & Professional Skills
              </CardTitle>
              <CardDescription className="text-xs">
                Add skills individually or paste comma-separated values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSkill} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Skills Input</label>
                  <Input
                    placeholder="e.g. Python, React, PostgreSQL, Docker, AWS"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white">
                  <Plus className="w-3.5 h-3.5" />
                  Add Skills
                </Button>

                {skillAddedSuccess && (
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Skills added to profile!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Profile Skills List Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[hsl(var(--primary))]" />
                Profile Skills ({userSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userSkills.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-2">
                  No skills added yet. Enter skills above.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((s, idx) => {
                    const skillName = typeof s === 'string' ? s : s.name;
                    return (
                      <Badge key={idx} variant="outline" className="font-mono text-xs px-2.5 py-1 gap-1.5 bg-[hsl(var(--secondary))]">
                        <span>{skillName}</span>
                        <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-rose-500 hover:font-bold">
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certifications Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-[hsl(var(--primary))]" />
                Certifications ({userCertifications.length})
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => handleOpenCertModal()} className="text-xs font-mono gap-1">
                <Plus className="w-3 h-3" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {isCertModalOpen && (
                <form onSubmit={handleSaveCert} className="p-3 rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.03)] space-y-2 text-xs">
                  <div className="font-mono font-bold text-[hsl(var(--primary))] flex justify-between items-center">
                    <span>{editingCertIdx !== null ? 'Edit Certification' : 'Add Certification'}</span>
                    <button type="button" onClick={() => setIsCertModalOpen(false)}>
                      <X className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                    </button>
                  </div>
                  <Input
                    placeholder="Certification Name *"
                    required
                    value={certForm.certification_name}
                    onChange={(e) => setCertForm({ ...certForm, certification_name: e.target.value })}
                  />
                  <Input
                    placeholder="Issuing Org (e.g. AWS)"
                    value={certForm.issuing_organization}
                    onChange={(e) => setCertForm({ ...certForm, issuing_organization: e.target.value })}
                  />
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">Issue Date</label>
                    <Input
                      type="month"
                      value={certForm.issue_date}
                      onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Credential URL"
                    value={certForm.credential_url}
                    onChange={(e) => setCertForm({ ...certForm, credential_url: e.target.value })}
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsCertModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[hsl(var(--primary))] text-white">
                      Save
                    </Button>
                  </div>
                </form>
              )}

              {userCertifications.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-2">
                  No certifications added yet.
                </div>
              ) : (
                userCertifications.map((c: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] flex justify-between items-center text-xs font-mono">
                    <div>
                      <div className="font-bold text-[hsl(var(--foreground))]">{c.certification_name || c.name}</div>
                      <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{c.issuing_organization} {c.issue_date ? `· ${c.issue_date}` : ''}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleOpenCertModal(idx)} className="p-1 h-6 w-6">
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteCert(idx)} className="p-1 h-6 w-6 text-rose-500">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Work Experience, Education & Projects Direct Editing */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Work Experience Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[hsl(var(--primary))]" />
                Professional Work Experience ({userExperiences.length})
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => handleOpenExpModal()} className="text-xs font-mono gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Add / Edit Experience Form Box */}
              {isExpModalOpen && (
                <form onSubmit={handleSaveExp} className="p-4 rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.03)] space-y-3">
                  <div className="text-xs font-mono font-bold text-[hsl(var(--primary))] flex justify-between items-center">
                    <span>{editingExpIdx !== null ? 'Edit Work Experience' : 'Add Work Experience'}</span>
                    <button type="button" onClick={() => setIsExpModalOpen(false)}>
                      <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="Job Title *"
                      required
                      value={expForm.job_title}
                      onChange={(e) => setExpForm({ ...expForm, job_title: e.target.value })}
                    />
                    <Input
                      placeholder="Company Name *"
                      required
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    />
                    <Input
                      placeholder="Location (e.g. Bengaluru, Remote)"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    />
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">Start Date</label>
                      <Input
                        type="month"
                        value={expForm.start_date}
                        onChange={(e) => setExpForm({ ...expForm, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">End Date (Leave blank if Present)</label>
                      <Input
                        type="month"
                        value={expForm.end_date}
                        onChange={(e) => setExpForm({ ...expForm, end_date: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  {/* Responsibilities list */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Key Responsibilities / Accomplishments</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add bullet point..."
                        value={expForm.respInput}
                        onChange={(e) => setExpForm({ ...expForm, respInput: e.target.value })}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          if (!expForm.respInput.trim()) return;
                          setExpForm({
                            ...expForm,
                            responsibilities: [...expForm.responsibilities, expForm.respInput.trim()],
                            respInput: '',
                          });
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {expForm.responsibilities.map((r, rIdx) => (
                        <div key={rIdx} className="text-xs font-mono flex items-center justify-between p-2 rounded bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                          <span>• {r}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setExpForm({
                                ...expForm,
                                responsibilities: expForm.responsibilities.filter((_, i) => i !== rIdx),
                              });
                            }}
                            className="text-[10px] text-rose-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsExpModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[hsl(var(--primary))] text-white">
                      Save Experience
                    </Button>
                  </div>
                </form>
              )}

              {userExperiences.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-6 text-center border border-dashed border-[hsl(var(--border))] rounded-xl">
                  No work experience entries. Click "Add Experience" above to add your employment history.
                </div>
              ) : (
                userExperiences.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] space-y-2 relative group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{exp.job_title}</h4>
                        <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{exp.company} {exp.location ? `· ${exp.location}` : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]">
                          {exp.start_date || 'Start'} - {exp.end_date || 'Present'}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenExpModal(idx)}
                          className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteExp(idx)}
                          className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="text-xs text-[hsl(var(--muted-foreground))] space-y-1 list-disc list-inside pt-1">
                        {exp.responsibilities.map((r: string, rIdx: number) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[hsl(var(--primary))]" />
                Education & Academics ({userEducation.length})
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => handleOpenEduModal()} className="text-xs font-mono gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Degree
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              
              {/* Add / Edit Education Form Box */}
              {isEduModalOpen && (
                <form onSubmit={handleSaveEdu} className="p-4 rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.03)] space-y-3">
                  <div className="text-xs font-mono font-bold text-[hsl(var(--primary))] flex justify-between items-center">
                    <span>{editingEduIdx !== null ? 'Edit Education' : 'Add Education'}</span>
                    <button type="button" onClick={() => setIsEduModalOpen(false)}>
                      <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="Institution / College Name *"
                      required
                      value={eduForm.institution}
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    />
                    <Input
                      placeholder="Degree (e.g. B.Tech) *"
                      required
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    />
                    <Input
                      placeholder="Field of Study (e.g. Computer Science)"
                      value={eduForm.field_of_study}
                      onChange={(e) => setEduForm({ ...eduForm, field_of_study: e.target.value })}
                    />
                    <Input
                      placeholder="CGPA / GPA"
                      value={eduForm.cgpa}
                      onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                    />
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">College Start Date</label>
                      <Input
                        type="month"
                        value={eduForm.start_date}
                        onChange={(e) => setEduForm({ ...eduForm, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">Graduation Date</label>
                      <Input
                        type="month"
                        value={eduForm.end_date}
                        onChange={(e) => setEduForm({ ...eduForm, end_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">Relevant Coursework</label>
                      <Input
                        placeholder="Relevant Coursework (e.g. AI/ML, Data Structures)"
                        value={eduForm.relevant_coursework}
                        onChange={(e) => setEduForm({ ...eduForm, relevant_coursework: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsEduModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[hsl(var(--primary))] text-white">
                      Save Education
                    </Button>
                  </div>
                </form>
              )}

              {userEducation.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-4 text-center border border-dashed border-[hsl(var(--border))] rounded-xl">
                  No education entries. Click "Add Degree" to specify your academic background.
                </div>
              ) : (
                userEducation.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">{edu.degree} in {edu.field_of_study}</h4>
                      <span className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                        {edu.institution} {edu.start_date || edu.end_date ? `· ${edu.start_date || ''} - ${edu.end_date || ''}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {edu.cgpa && <span className="text-xs font-mono font-semibold text-[hsl(var(--primary))]">GPA: {edu.cgpa}</span>}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenEduModal(idx)}
                        className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteEdu(idx)}
                        className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Technical Projects Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Code className="w-4 h-4 text-[hsl(var(--primary))]" />
                Technical Projects & Accomplishments ({userProjects.length})
              </CardTitle>
              <Button size="sm" variant="outline" onClick={() => handleOpenProjModal()} className="text-xs font-mono gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Add / Edit Project Form Box */}
              {isProjModalOpen && (
                <form onSubmit={handleSaveProj} className="p-4 rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.03)] space-y-3">
                  <div className="text-xs font-mono font-bold text-[hsl(var(--primary))] flex justify-between items-center">
                    <span>{editingProjIdx !== null ? 'Edit Project' : 'Add Project'}</span>
                    <button type="button" onClick={() => setIsProjModalOpen(false)}>
                      <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    </button>
                  </div>
                  <Input
                    placeholder="Project Name *"
                    required
                    value={projForm.project_name}
                    onChange={(e) => setProjForm({ ...projForm, project_name: e.target.value })}
                  />
                  <textarea
                    rows={3}
                    placeholder="Project Description & Key Outcomes"
                    value={projForm.description}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="GitHub Repository URL"
                      value={projForm.github_url}
                      onChange={(e) => setProjForm({ ...projForm, github_url: e.target.value })}
                    />
                    <Input
                      placeholder="Live Demo URL"
                      value={projForm.live_url}
                      onChange={(e) => setProjForm({ ...projForm, live_url: e.target.value })}
                    />
                  </div>

                  {/* Technologies tag input */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))] font-semibold">Technologies Used</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g. PyTorch, React)..."
                        value={projForm.techInput}
                        onChange={(e) => setProjForm({ ...projForm, techInput: e.target.value })}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          if (!projForm.techInput.trim()) return;
                          setProjForm({
                            ...projForm,
                            technologies: [...projForm.technologies, projForm.techInput.trim()],
                            techInput: '',
                          });
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {projForm.technologies.map((t, tIdx) => (
                        <Badge key={tIdx} variant="outline" className="font-mono text-xs px-2 py-0.5 gap-1">
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setProjForm({
                                ...projForm,
                                technologies: projForm.technologies.filter((_, i) => i !== tIdx),
                              });
                            }}
                            className="text-rose-500 hover:font-bold"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsProjModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[hsl(var(--primary))] text-white">
                      Save Project
                    </Button>
                  </div>
                </form>
              )}

              {userProjects.length === 0 ? (
                <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] py-6 text-center border border-dashed border-[hsl(var(--border))] rounded-xl">
                  No technical projects listed. Click "Add Project" to add your showcase projects.
                </div>
              ) : (
                userProjects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] space-y-2 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{proj.project_name}</h4>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 font-mono whitespace-pre-wrap">{proj.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenProjModal(idx)}
                          className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteProj(idx)}
                          className="p-1 h-7 w-7 text-[hsl(var(--muted-foreground))] hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map((t: string, tIdx: number) => (
                          <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};
