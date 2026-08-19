import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, User, Briefcase, GraduationCap, Code, Layers, CheckCircle2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, fetchProfile, addSkill, token } = useStore();

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frameworks');
  const [skillAddedSuccess, setSkillAddedSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    await addSkill(newSkillName.trim(), newSkillCategory);
    setNewSkillName('');
    setSkillAddedSuccess(true);
    setTimeout(() => setSkillAddedSuccess(false), 2000);
  };

  const defaultSkills = [
    { name: 'Python', category: 'Programming Languages' },
    { name: 'FastAPI', category: 'Frameworks' },
    { name: 'PostgreSQL', category: 'Databases' },
    { name: 'Docker', category: 'Tools' },
    { name: 'AWS', category: 'Cloud' },
  ];

  const currentSkills = profile?.skills && profile.skills.length > 0 ? profile.skills : defaultSkills;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
            <User className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            <span>CANDIDATE PROFILE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            {profile?.full_name || 'Candidate Name'}
          </h1>
          <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
            {profile?.email || 'candidate@example.com'} · {profile?.professional_title || 'Software Engineer'}
          </p>
        </div>

        <Badge variant="outline" className="font-mono text-xs px-3 py-1 self-start sm:self-auto">
          Profile Sync Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Profile Summary & Skills Manager */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Add Skill Form Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-[hsl(var(--primary))]" />
                Add Skill to Taxonomy
              </CardTitle>
              <CardDescription className="text-xs">
                Enhance your profile for spaCy NLP matching.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSkill} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Skill Name</label>
                  <Input
                    placeholder="e.g. PyTorch, Redis, Kubernetes"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-1 text-xs font-mono text-[hsl(var(--foreground))]"
                  >
                    <option value="Languages">Languages</option>
                    <option value="Frameworks">Frameworks</option>
                    <option value="Databases">Databases</option>
                    <option value="Tools">Tools</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>

                <Button type="submit" size="sm" className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white">
                  <Plus className="w-3.5 h-3.5" />
                  Add Skill
                </Button>

                {skillAddedSuccess && (
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Skill added to profile!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Current Skills List Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[hsl(var(--primary))]" />
                Extracted Skills Taxonomy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] font-mono text-[hsl(var(--foreground))]"
                  >
                    {s.name || s}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Experience & Projects */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Work Experience Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[hsl(var(--primary))]" />
                Professional Work Experience
              </CardTitle>
              <CardDescription className="text-xs">
                Key role responsibility highlights evaluated by ATS semantic sentence transformer models.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">Senior Backend Developer</h4>
                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Tech Corp · San Francisco, CA</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]">2023 - Present</span>
                </div>
                <ul className="text-xs text-[hsl(var(--muted-foreground))] space-y-1 list-disc list-inside pt-1">
                  <li>Designed and scaled async FastAPI REST microservices for high-throughput API endpoints.</li>
                  <li>Integrated PostgreSQL pgvector dense vector similarity indices for instant semantic search.</li>
                  <li>Optimized API database latency by 42% through query optimization and caching.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technical Projects Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[hsl(var(--primary))]" />
                Technical Projects & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] space-y-2">
                <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">AI-Powered Resume Optimization Engine</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Full-stack asynchronous platform combining spaCy NLP, SentenceTransformers, and ReportLab PDF rendering.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['FastAPI', 'spaCy', 'SentenceTransformers', 'ReportLab', 'React', 'Zustand'].map((tech) => (
                    <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
};
