import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { PromptBar } from '../components/shared/PromptBar';
import { MotionCard } from '../components/shared/MotionCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, ArrowRight, FileCheck, Layers, Target, Download } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 py-8 sm:py-12">
      
      {/* HERO SECTION (Zaro Aesthetic: Warm background, clean display type, max 20 words subtext) */}
      <section className="relative text-center max-w-4xl mx-auto px-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>AI-POWERED CAREER ASSISTANT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[hsl(var(--foreground))] leading-[1.1]"
        >
          One workspace. Three engines. <br className="hidden sm:inline" />
          <span className="text-[hsl(var(--primary))]">Each one makes your resume better.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
        >
          Combine spaCy NLP, SentenceTransformers embeddings, and ReportLab PDF rendering into one free platform.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button
            size="lg"
            className="rounded-full px-6 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground)/0.9)] text-sm font-medium gap-2 shadow-sm"
            onClick={() => navigate('/dashboard')}
          >
            Build Your Profile
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-6 text-sm font-medium gap-2 border-[hsl(var(--border))]"
            onClick={() => navigate('/ats')}
          >
            Test ATS Engine
          </Button>
        </motion.div>

        {/* Floating Zaro Interactive Prompt Simulation Bar */}
        <div className="pt-8">
          <PromptBar onActionSelect={() => navigate('/ats')} />
        </div>
      </section>

      {/* 3-TILE ZARO BENTO GRID */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))] tracking-tight">
            Designed for Explainable Compatibility
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Tile 1 */}
          <MotionCard delay={0.1} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] tracking-tight">
                1. Your Context, Captured.
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                Structured candidate profiles containing skills taxonomy, work experiences, education, and technical projects.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border))] font-mono text-[11px] space-y-1.5 text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center justify-between">
                <span>• Python & FastAPI</span>
                <span className="text-emerald-500">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• PostgreSQL & pgvector</span>
                <span className="text-emerald-500">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• ReportLab PDF Render</span>
                <span className="text-emerald-500">Verified</span>
              </div>
            </div>
          </MotionCard>

          {/* Bento Tile 2 */}
          <MotionCard delay={0.2} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] tracking-tight">
                2. Your ATS Engine, Scoring.
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                4-part deterministic score formula (40% Keyword, 30% Semantic Embeddings, 20% Skills, 10% Structure).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border))] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span>ATS Compatibility</span>
                <span className="font-bold text-[hsl(var(--primary))]">88.5 / 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[hsl(var(--border))] overflow-hidden">
                <div className="w-[88.5%] h-full bg-[hsl(var(--primary))] rounded-full" />
              </div>
            </div>
          </MotionCard>

          {/* Bento Tile 3 */}
          <MotionCard delay={0.3} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] tracking-tight">
                3. Your PDF Resume, Downloaded.
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                Pixel-perfect server-side ReportLab PDF generation with selectable text and structured formatting.
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs font-mono gap-2 rounded-lg border-[hsl(var(--border))]"
              onClick={() => navigate('/resumes')}
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
              Download PDF Template
            </Button>
          </MotionCard>

        </div>
      </section>

      {/* FEATURE METRICS STRIP */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold font-mono text-[hsl(var(--foreground))]">40%</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-wider mt-1">
              Keyword Overlap
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold font-mono text-[hsl(var(--foreground))]">384d</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-wider mt-1">
              Vector Embeddings
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold font-mono text-[hsl(var(--foreground))]">100%</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-wider mt-1">
              Deterministic Formula
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold font-mono text-[hsl(var(--foreground))]">$0</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-wider mt-1">
              100% Free & Open Source
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="p-10 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)] space-y-4">
          <Badge variant="outline" className="font-mono text-xs px-3 py-1">
            Get Started Today
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Ready to pass ATS screeners with confidence?
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            Analyze your target job description, optimize your bullets, and download a tailored PDF resume.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              className="rounded-full px-8 bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] text-sm font-medium gap-2 shadow-sm"
              onClick={() => navigate('/ats')}
            >
              Start Free ATS Analysis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
