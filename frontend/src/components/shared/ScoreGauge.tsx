import React from 'react';
import { motion } from 'motion/react';
import type { ATSReport } from '../../api/client';
import { AlertTriangle, Layers, Target, Cpu, FileCheck } from 'lucide-react';

interface ScoreGaugeProps {
  report: ATSReport;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ report }) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 50) return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'Excellent Compatibility';
    if (score >= 50) return 'Moderate Match';
    return 'Action Required';
  };

  const scoreItems = [
    {
      title: 'Exact & Partial Keyword Match',
      weight: '40%',
      score: report.keyword_score,
      maxScore: 40,
      icon: Target,
      desc: 'Matches specific technical terms, tools, and methodologies in Job Description.',
    },
    {
      title: 'Semantic Embedding Similarity',
      weight: '30%',
      score: report.semantic_score,
      maxScore: 30,
      icon: Cpu,
      desc: 'Cosine similarity calculated via local 384-dimensional all-MiniLM-L6-v2 vectors.',
    },
    {
      title: 'Skill Taxonomy Overlap',
      weight: '20%',
      score: report.skills_score,
      maxScore: 20,
      icon: Layers,
      desc: 'spaCy NLP extracted technical and soft skills coverage.',
    },
    {
      title: 'ATS Resume Structure',
      weight: '10%',
      score: report.structure_score,
      maxScore: 10,
      icon: FileCheck,
      desc: 'Verification of essential sections (Contact, Summary, Experience, Projects).',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Overall Score Header Banner */}
      <div className={`p-6 rounded-2xl border ${getScoreColor(report.overall_score)} flex flex-col sm:flex-row items-center justify-between gap-6`}>
        <div className="flex items-center gap-5">
          {/* Big Score Circle */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-current bg-[hsl(var(--card))] shadow-sm shrink-0">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-3xl font-extrabold font-mono tracking-tight"
            >
              {Math.round(report.overall_score)}
            </motion.span>
            <span className="absolute bottom-2 text-[10px] uppercase font-mono tracking-wider opacity-70">
              / 100
            </span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-widest opacity-80">
              Overall ATS Compatibility
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {getScoreLabel(report.overall_score)}
            </h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Computed deterministically from keyword, semantic embedding, and NLP taxonomy layers.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-xs font-mono text-right">
          <span className="px-2.5 py-1 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            Matched Keywords: {report.matched_keywords.length}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            Missing Skills: {(report.missing_keywords?.high?.length || 0) + (report.missing_keywords?.medium?.length || 0)}
          </span>
        </div>
      </div>

      {/* 4-Part Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scoreItems.map((item, idx) => {
          const Icon = item.icon;
          const percentage = Math.min(100, Math.round((item.score / item.maxScore) * 100));
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[hsl(var(--foreground))]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">
                      Weight: {item.weight}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-[hsl(var(--foreground))]">
                    {item.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    /{item.maxScore}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[hsl(var(--secondary))] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 + 0.2 }}
                  className="h-full bg-[hsl(var(--primary))] rounded-full"
                />
              </div>

              <p className="text-[11px] text-[hsl(var(--muted-foreground))] leading-snug">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Missing Skills Priority Badges */}
      {report.missing_keywords && (
        <div className="p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Missing Priority Requirements
          </h4>

          <div className="space-y-2">
            {report.missing_keywords.high?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">High Priority:</span>
                {report.missing_keywords.high.map((kw) => (
                  <span key={kw} className="text-xs px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 font-mono">
                    + {kw}
                  </span>
                ))}
              </div>
            )}

            {report.missing_keywords.medium?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Medium Priority:</span>
                {report.missing_keywords.medium.map((kw) => (
                  <span key={kw} className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 font-mono">
                    + {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
