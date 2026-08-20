import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Sparkles, FileCode, Check, Copy, Download, Briefcase } from 'lucide-react';

export const CoverLetterPage: React.FC = () => {
  const { profile } = useStore();

  const [jobTitle, setJobTitle] = useState('Senior Full Stack AI Developer');
  const [companyName, setCompanyName] = useState('Echo Brains Tech');
  const [jobDescription, setJobDescription] = useState('We are seeking an experienced Full Stack AI Developer proficient in Python, React, FastAPI, RAG, and LangChain.');
  const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'confident'>('professional');

  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle || !companyName) return;
    setIsGenerating(true);

    const achievements = (profile?.experience_items || [])
      .map((e: any) => (typeof e === 'string' ? e : e?.job_title))
      .filter(Boolean);
    const skillNames = (profile?.skills || [])
      .map((s: any) => (typeof s === 'string' ? s : s?.name))
      .filter(Boolean);

    try {
      const res = await api.generateCoverLetter({
        candidate_name: profile?.full_name || 'Candidate',
        target_role: jobTitle,
        company_name: companyName,
        job_description_summary: jobDescription,
        key_achievements: achievements,
      });
      setGeneratedLetter(res.cover_letter);
    } catch (err) {
      // Clean, professional fallback template
      const candidateName = profile?.full_name || 'Candidate';
      const skillsList = (skillNames.length > 0 ? skillNames : ['Python', 'FastAPI', 'React', 'AI/ML']).slice(0, 5).join(', ');
      
      const letter = `Dear Hiring Manager at ${companyName},

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With a solid technical foundation in ${skillsList}, I am confident in my ability to deliver immediate value to your engineering team.

My background includes hands-on experience developing end-to-end full-stack applications, designing robust RESTful APIs, and building scalable software solutions. Having reviewed your job requirements, I am excited about the prospect of contributing to ${companyName}'s key initiatives.

I would welcome the opportunity to discuss how my technical expertise and problem-solving skills align with your team's goals. Thank you for your time and consideration.

Sincerely,
${candidateName}`;
      setGeneratedLetter(letter);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedLetter) return;
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
          <FileCode className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>AI COVER LETTER GENERATOR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Tailored Cover Letter Generator
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1">
          Generate customized, professional cover letters tailored to your candidate profile and target job application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Controls */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[hsl(var(--primary))]" />
                Job & Company Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Target Job Title *</label>
                <Input
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Company Name *</label>
                <Input
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google / Acme Corp"
                  className="text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Job Description Keywords</label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job posting text or key skills..."
                  className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Tone</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'professional', label: 'Formal' },
                    { id: 'enthusiastic', label: 'Eager' },
                    { id: 'confident', label: 'Direct' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id as any)}
                      className={`p-2 rounded-lg border text-center text-xs font-mono transition-colors ${
                        tone === t.id
                          ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold'
                          : 'border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !jobTitle || !companyName}
                className="w-full text-xs font-mono font-semibold gap-2 bg-[hsl(var(--primary))] text-white shadow-xs py-2.5"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    Generating Cover Letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Cover Letter
                  </>
                )}
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Letter Display & Export */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Generated Cover Letter
                </CardTitle>
                {generatedLetter && (
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadTxt}
                      className="text-xs font-mono gap-1.5 h-8"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download .txt
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <textarea
                  rows={14}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  placeholder="Enter Job Title & Company Name on the left and click 'Generate Cover Letter'..."
                  className="w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-4 text-xs font-mono text-[hsl(var(--foreground))] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </CardContent>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
