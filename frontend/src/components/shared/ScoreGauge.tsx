import React from 'react';
import { motion } from 'motion/react';
import type { ATSReport } from '../../api/client';
import { Layers, Target, Cpu, FileCheck, CheckCircle2, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ScoreGaugeProps {
  report: ATSReport;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ report }) => {
  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'Strong Candidate Match';
    if (score >= 50) return 'Moderate Compatibility';
    return 'Optimization Recommended';
  };

  const scoreItems = [
    {
      title: 'Keyword Match & Density',
      weight: '40%',
      score: report.keyword_score,
      maxScore: 40,
      icon: Target,
      desc: 'Matches specific technical terms, tools, and methodologies in Job Description.',
    },
    {
      title: 'Semantic Vector Similarity',
      weight: '30%',
      score: report.semantic_score,
      maxScore: 30,
      icon: Cpu,
      desc: 'Cosine similarity calculated via local 384-dimensional all-MiniLM-L6-v2 vectors.',
    },
    {
      title: 'Technical Skill Overlap',
      weight: '20%',
      score: report.skills_score,
      maxScore: 20,
      icon: Layers,
      desc: 'spaCy NLP extracted technical and domain skill coverage.',
    },
    {
      title: 'ATS Document Structure',
      weight: '10%',
      score: report.structure_score,
      maxScore: 10,
      icon: FileCheck,
      desc: 'Verification of essential sections (Contact, Summary, Experience, Projects, Education).',
    },
  ];

  // Helper to extract missing keyword arrays safely
  const highPriority = report.missing_keywords?.high_priority || report.missing_keywords?.high || [];
  const mediumPriority = report.missing_keywords?.medium_priority || report.missing_keywords?.medium || [];
  const lowPriority = report.missing_keywords?.low_priority || report.missing_keywords?.low || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-6"
    >
      {/* Overall Score Banner */}
      <div className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-5">
          {/* Score Badge */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.6)] shadow-xs shrink-0">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 15 }}
              className="text-3xl font-extrabold font-mono tracking-tight text-[hsl(var(--primary))]"
            >
              {Math.round(report.overall_score)}
            </motion.span>
            <span className="absolute bottom-2 text-[10px] uppercase font-mono tracking-wider text-[hsl(var(--muted-foreground))]">
              / 100
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[10px] font-mono tracking-wider uppercase mb-1 text-[hsl(var(--muted-foreground))]">
              <CheckCircle2 className="w-3 h-3 text-[hsl(var(--primary))]" /> Overall ATS Score
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {getScoreLabel(report.overall_score)}
            </h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Evaluated via keyword density, 384d semantic embedding vectors, and spaCy NLP layers.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-xs font-mono text-right">
          <span className="px-3 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
            Matched Keywords: {report.matched_keywords?.length || 0}
          </span>
          <span className="px-3 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
            Missing Terms: {highPriority.length + mediumPriority.length + lowPriority.length}
          </span>
        </div>
      </div>

      {/* 4-Part Component Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scoreItems.map((item, idx) => {
          const Icon = item.icon;
          const percentage = Math.min(100, Math.round((item.score / item.maxScore) * 100));
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 + 0.1 }}
              className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] shrink-0 border border-[hsl(var(--border))]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">
                      Weight: {item.weight}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-base font-bold text-[hsl(var(--foreground))]">
                    {item.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    /{item.maxScore}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[hsl(var(--secondary))] overflow-hidden border border-[hsl(var(--border)/0.5)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.08 + 0.2 }}
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

      {/* Matched Keywords Section */}
      {report.matched_keywords && report.matched_keywords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--foreground))] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
              Matched Job Keywords ({report.matched_keywords.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {report.matched_keywords.map((kw, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-mono font-medium"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Missing Keywords by Priority */}
      {(highPriority.length > 0 || mediumPriority.length > 0 || lowPriority.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-4 shadow-xs"
        >
          <h4 className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--foreground))] font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[hsl(var(--primary))]" />
            Missing Keywords & Terms
          </h4>

          <div className="space-y-3">
            {highPriority.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase text-[hsl(var(--foreground))] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />
                  High Priority Skills to Add:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {highPriority.map((kw: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-mono font-semibold"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mediumPriority.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))]" />
                  Medium Priority Keywords:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mediumPriority.map((kw: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] font-mono"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {lowPriority.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase text-[hsl(var(--muted-foreground))]" />
                <div className="flex flex-wrap gap-1.5">
                  {lowPriority.map((kw: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] font-mono"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Actionable Recommendations Section */}
      {report.recommendations && report.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] space-y-3 shadow-xs"
        >
          <h4 className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--foreground))] font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
            Actionable Recommendations ({report.recommendations.length})
          </h4>
          <div className="space-y-2">
            {report.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border))] text-xs font-mono text-[hsl(var(--foreground))] flex items-start gap-2.5"
              >
                <ArrowUpRight className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Structure Issues Alert */}
      {report.structure_issues && report.structure_issues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] space-y-2 text-xs font-mono"
        >
          <div className="font-bold flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <AlertCircle className="w-4 h-4 shrink-0 text-[hsl(var(--primary))]" />
            Structural formatting warnings:
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-[hsl(var(--muted-foreground))]">
            {report.structure_issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};
