import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ScoreGauge } from '../components/shared/ScoreGauge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Target, Sparkles, AlertCircle, Cpu, FileText, ArrowRight } from 'lucide-react';

export const ATSAnalyzerPage: React.FC = () => {
  const { resumes, activeResumeId, analyzeJob, runATSAnalysis, latestATSReport, isLoading, error } = useStore();

  const [jobTitle, setJobTitle] = useState('Senior Python Backend Engineer');
  const [companyName, setCompanyName] = useState('Tech Corp');
  const [rawText, setRawText] = useState(
    'We are seeking a Senior Python Backend Engineer with strong expertise in FastAPI, PostgreSQL, Docker, AWS, microservices, and REST API design. Experience with SentenceTransformers, pgvector, and automated test-driven development (pytest) is a plus.'
  );

  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    // 1. Analyze Job Description via spaCy + pgvector embedding API
    const job = await analyzeJob(jobTitle, companyName, rawText);
    if (job) {
      setExtractedSkills(job.extracted_skills || []);
      
      // 2. Select resume ID (active or default)
      const resumeIdToUse = activeResumeId || (resumes.length > 0 ? resumes[0].id : 'default_resume');
      
      // 3. Calculate 4-part ATS compatibility score
      await runATSAnalysis(resumeIdToUse, job.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
          <Target className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>ATS COMPATIBILITY ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Job Description & ATS Compatibility Scoring
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1">
          Paste a target job posting to extract spaCy NLP skills and compute local 384d SentenceTransformers vector similarity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Job Description Input Form */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[hsl(var(--primary))]" />
                Target Job Description Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Job Title</label>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Company Name (Optional)</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Raw Job Posting Text</label>
                  <textarea
                    rows={7}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                    placeholder="Paste job posting text here..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      Computing Vector Match...
                    </>
                  ) : (
                    <>
                      Run ATS Compatibility Analysis
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: ATS Compatibility Score Report */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Extracted Skills Bar */}
          {extractedSkills.length > 0 && (
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  spaCy NLP Extracted Technical Skills ({extractedSkills.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((sk) => (
                    <Badge key={sk} variant="outline" className="font-mono text-xs px-2.5 py-1 bg-[hsl(var(--secondary))]">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Full Score Gauge Report */}
          {latestATSReport ? (
            <ScoreGauge report={latestATSReport} />
          ) : (
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
              <CardContent className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                  No ATS Analysis Generated Yet
                </h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-sm mx-auto">
                  Paste a target job description in the form on the left and click "Run ATS Compatibility Analysis" to compute scores.
                </p>
              </CardContent>
            </Card>
          )}

        </div>

      </div>
    </div>
  );
};
