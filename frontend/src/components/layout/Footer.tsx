import React from 'react';
import { Sparkles, Shield, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-[hsl(var(--primary))] flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
            ResumeAI · Career Optimization & ATS Scoring Platform
          </span>
        </div>

        {/* System badges & compliance */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>Zero Data Sharing</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <Cpu className="w-3 h-3 text-[hsl(var(--primary))]" />
            <span>spaCy + pgvector Engine</span>
          </div>
        </div>

        {/* Right copyright */}
        <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
