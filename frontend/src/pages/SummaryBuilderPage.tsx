import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sparkles, FileText, Check, Copy, Save, CheckCircle2, UserCheck } from 'lucide-react';

export const SummaryBuilderPage: React.FC = () => {
  const { profile, fetchProfile, user } = useStore();

  const [jobTitle, setJobTitle] = useState(profile?.professional_title || 'Full Stack AI Developer');
  const [tone, setTone] = useState<'executive' | 'technical' | 'objective' | 'concise'>('technical');
  const [generatedSummary, setGeneratedSummary] = useState<string>(profile?.summary || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSaveStatus(null);
    try {
      const res = await api.generateAISummary({
        target_role: jobTitle,
        skills: profile?.skills || ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
        experience_highlights: (profile?.experience_items || []).map(e => e.job_title),
      });
      setGeneratedSummary(res.summary);
    } catch (err) {
      // Fallback generator based on profile details
      const userSkills = (profile?.skills || ['Python', 'React', 'AI/ML']).slice(0, 5).join(', ');
      const userRole = jobTitle || profile?.professional_title || 'Software Engineer';
      
      let sample = '';
      if (tone === 'objective') {
        sample = `Aspiring ${userRole} skilled in ${userSkills}. Seeking high-impact software engineering roles to architect reliable, scalable web applications and AI workflows.`;
      } else if (tone === 'executive') {
        sample = `Results-driven ${userRole} with hands-on expertise in ${userSkills}. Proven track record of shipping end-to-end applications, optimizing API throughput, and collaborating across engineering teams.`;
      } else if (tone === 'concise') {
        sample = `Focused ${userRole} proficient in ${userSkills}. Dedicated to clean code, robust backend design, and modern frontend interfaces.`;
      } else {
        sample = `Full Stack ${userRole} with strong expertise in ${userSkills}. Experienced in REST API architecture, database design, and modern web application development.`;
      }
      setGeneratedSummary(sample);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedSummary) return;
    navigator.clipboard.writeText(generatedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToProfile = async () => {
    if (!generatedSummary) return;
    setSaveStatus('Saving to Candidate Profile...');
    try {
      const payload = {
        email: profile?.email || user?.email || '',
        full_name: profile?.full_name || user?.name || 'Candidate',
        professional_title: profile?.professional_title || jobTitle,
        location: profile?.location || '',
        summary: generatedSummary,
        experience_items: profile?.experience_items || [],
        education_items: profile?.education_items || [],
        skills: profile?.skills || [],
        projects: profile?.projects || [],
      };
      await api.onboardProfile(payload as any);
      await fetchProfile();
      setSaveStatus('Summary saved to Profile!');
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (err) {
      setSaveStatus('Failed to save to profile.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
          <FileText className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>AI SUMMARY & OBJECTIVE BUILDER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Professional Summary & Career Objective Generator
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1">
          Craft high-impact professional summaries or career objectives tailored to your target job role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Generator Controls */}
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
              Summary Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Target Job Title</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Full Stack AI Developer"
                className="text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Style & Tone</label>
              <div className="space-y-2">
                {[
                  { id: 'technical', label: 'Technical & Hands-On' },
                  { id: 'objective', label: 'Career Objective (Entry/Mid)' },
                  { id: 'executive', label: 'Executive & Senior' },
                  { id: 'concise', label: 'Concise (2-3 Sentences)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-colors flex items-center justify-between ${
                      tone === item.id
                        ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] font-bold'
                        : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.4)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {tone === item.id && <Check className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full text-xs font-mono font-semibold gap-2 bg-[hsl(var(--primary))] text-white shadow-xs py-2.5"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate AI Summary
                </>
              )}
            </Button>

          </CardContent>
        </Card>

        {/* Right Column: Output & Action Buttons */}
        <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] md:col-span-2 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[hsl(var(--primary))]" />
                Generated Summary Result
              </CardTitle>
              {generatedSummary && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="text-xs font-mono gap-1.5 h-8"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                rows={7}
                value={generatedSummary}
                onChange={(e) => setGeneratedSummary(e.target.value)}
                placeholder="Click 'Generate AI Summary' on the left to produce a custom tailored summary..."
                className="w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-4 text-xs font-mono text-[hsl(var(--foreground))] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
              />
              <p className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                You can edit the text directly above before copying or saving to your candidate profile.
              </p>
            </CardContent>
          </div>

          <CardContent className="pt-0">
            {generatedSummary && (
              <div className="space-y-2 pt-2 border-t border-[hsl(var(--border))]">
                <Button
                  onClick={handleSaveToProfile}
                  className="w-full text-xs font-mono font-semibold gap-2 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.8)] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] py-2.5"
                >
                  <Save className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Save as Primary Profile Summary
                </Button>
                {saveStatus && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-300 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{saveStatus}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
