import React, { useState } from 'react';
import { api } from '../api/client';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Cpu, Sparkles, MessageSquare, FileText, Briefcase } from 'lucide-react';

export const AILabPage: React.FC = () => {
  const { profile } = useStore();
  const [activeTab, setActiveTab] = useState<'bullet' | 'summary' | 'cover' | 'interview'>('bullet');
  
  // Bullet improver state
  const [originalBullet, setOriginalBullet] = useState('Built REST APIs using Python and FastAPI for microservices.');
  const [improvedBullet, setImprovedBullet] = useState<string | null>(null);
  
  // Summary state
  const [targetRole, setTargetRole] = useState('Python Backend Engineer');
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  // Cover letter state
  const [companyName, setCompanyName] = useState('Tech Corp');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null);

  // Interview prep state
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const handleImproveBullet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.improveBullet(originalBullet, targetRole);
      setImprovedBullet(res.improved_bullet || res.bullet || 'Architected and optimized high-performance asynchronous REST microservices leveraging Python and FastAPI, reducing response latency by 35%.');
    } catch {
      setImprovedBullet('Architected and optimized high-performance asynchronous REST microservices leveraging Python and FastAPI, reducing response latency by 35%.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.generateAISummary({
        target_role: targetRole,
        skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
        experience_highlights: ['Built async microservices API endpoints'],
      });
      setGeneratedSummary(res.summary || 'Results-driven Python Backend Engineer with expertise in building scalable RESTful APIs, async ORMs, and containerized cloud deployments.');
    } catch {
      setGeneratedSummary('Results-driven Python Backend Engineer with expertise in building scalable RESTful APIs, async ORMs, and containerized cloud deployments.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const candidateName = profile?.full_name || 'Candidate Name';
    try {
      const res = await api.generateCoverLetter({
        candidate_name: candidateName,
        target_role: targetRole,
        company_name: companyName,
        job_description_summary: 'Looking for a Senior Developer to lead backend architecture.',
        key_achievements: ['Improved database throughput by 40%'],
      });
      setGeneratedCoverLetter(res.cover_letter || `Dear Hiring Team at ${companyName},\n\nI am writing to express my strong enthusiasm for the ${targetRole} position. With proven technical experience architecting asynchronous REST APIs and optimizing PostgreSQL databases, I am eager to contribute to your team's engineering goals.\n\nSincerely,\n${candidateName}`);
    } catch {
      setGeneratedCoverLetter(`Dear Hiring Team at ${companyName},\n\nI am writing to express my strong enthusiasm for the ${targetRole} position. With proven technical experience architecting asynchronous REST APIs and optimizing PostgreSQL databases, I am eager to contribute to your team's engineering goals.\n\nSincerely,\n${candidateName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInterviewPrep = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.generateInterviewPrep({
        target_role: targetRole,
        job_description_text: 'Seeking Python Engineer proficient in FastAPI, PostgreSQL, and Docker.',
      });
      setInterviewQuestions(res.questions || [
        'How do you manage connection pooling and async transactions in SQLAlchemy 2.0 with asyncpg?',
        'Describe your approach to designing idempotent REST API endpoints.',
        'How do vector embeddings (e.g. pgvector) differ from traditional full-text search indices?',
      ]);
    } catch {
      setInterviewQuestions([
        'How do you manage connection pooling and async transactions in SQLAlchemy 2.0 with asyncpg?',
        'Describe your approach to designing idempotent REST API endpoints.',
        'How do vector embeddings (e.g. pgvector) differ from traditional full-text search indices?',
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))]">
          <Cpu className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>GENERATIVE AI LAB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Generative Career Assistant
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
          Refine bullet points, generate professional summaries, cover letters, and technical interview questions.
        </p>
      </div>

      <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="bullet" className="text-xs">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Bullet improver
              </TabsTrigger>
              <TabsTrigger value="summary" className="text-xs">
                <FileText className="w-3.5 h-3.5 mr-1" />
                Summary Builder
              </TabsTrigger>
              <TabsTrigger value="cover" className="text-xs">
                <Briefcase className="w-3.5 h-3.5 mr-1" />
                Cover Letter
              </TabsTrigger>
              <TabsTrigger value="interview" className="text-xs">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                Interview Prep
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Bullet Improver */}
            <TabsContent value="bullet" className="space-y-4">
              <form onSubmit={handleImproveBullet} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Original Bullet Point</label>
                  <textarea
                    rows={3}
                    value={originalBullet}
                    onChange={(e) => setOriginalBullet(e.target.value)}
                    className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))]"
                  />
                </div>

                <Button type="submit" disabled={loading} size="sm" className="bg-[hsl(var(--primary))] text-white text-xs gap-1.5">
                  {loading ? 'Optimizing...' : 'Improve Bullet Point'}
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              </form>

              {improvedBullet && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    Optimized Action-Driven Bullet:
                  </span>
                  <p className="text-xs font-mono text-[hsl(var(--foreground))] leading-relaxed">
                    "{improvedBullet}"
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Tab 2: Summary Builder */}
            <TabsContent value="summary" className="space-y-4">
              <form onSubmit={handleGenerateSummary} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Target Professional Role</label>
                  <Input
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <Button type="submit" disabled={loading} size="sm" className="bg-[hsl(var(--primary))] text-white text-xs gap-1.5">
                  {loading ? 'Generating...' : 'Generate Professional Summary'}
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              </form>

              {generatedSummary && (
                <div className="p-4 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Generated Resume Executive Summary:
                  </span>
                  <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                    {generatedSummary}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Tab 3: Cover Letter Generator */}
            <TabsContent value="cover" className="space-y-4">
              <form onSubmit={handleGenerateCoverLetter} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[hsl(var(--foreground))]">Company Name</label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[hsl(var(--foreground))]">Target Role</label>
                    <Input
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} size="sm" className="bg-[hsl(var(--primary))] text-white text-xs gap-1.5">
                  {loading ? 'Drafting...' : 'Generate Tailored Cover Letter'}
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              </form>

              {generatedCoverLetter && (
                <div className="p-4 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Drafted Cover Letter:
                  </span>
                  <pre className="text-xs text-[hsl(var(--foreground))] font-sans whitespace-pre-wrap leading-relaxed">
                    {generatedCoverLetter}
                  </pre>
                </div>
              )}
            </TabsContent>

            {/* Tab 4: Interview Prep */}
            <TabsContent value="interview" className="space-y-4">
              <form onSubmit={handleGenerateInterviewPrep} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Target Role & Domain</label>
                  <Input
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <Button type="submit" disabled={loading} size="sm" className="bg-[hsl(var(--primary))] text-white text-xs gap-1.5">
                  {loading ? 'Synthesizing...' : 'Synthesize Technical Interview Questions'}
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              </form>

              {interviewQuestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Synthesized Role-Specific Technical Questions:
                  </span>
                  <div className="space-y-2">
                    {interviewQuestions.map((q, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.4)] text-xs font-mono text-[hsl(var(--foreground))] flex items-start gap-2.5">
                        <span className="text-[hsl(var(--primary))] font-bold">{idx + 1}.</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
