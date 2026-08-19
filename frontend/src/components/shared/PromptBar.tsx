import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Cpu, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface PromptBarProps {
  onActionSelect?: (prompt: string) => void;
}

export const PromptBar: React.FC<PromptBarProps> = ({ onActionSelect }) => {
  const [selectedRole, setSelectedRole] = useState('Senior Backend Engineer');
  const [selectedGoal] = useState('ATS 90+ Score');
  const [inputValue, setInputValue] = useState(
    `Optimize my resume for ${selectedRole} and achieve ${selectedGoal}`
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedMessage, setCompletedMessage] = useState<string | null>(null);

  const roleOptions = ['Senior Backend Engineer', 'Full Stack Developer', 'AI Platform Lead', 'Data Engineer'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setCompletedMessage(null);

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedMessage(`AI Analysis triggered: "${inputValue}"`);
      if (onActionSelect) onActionSelect(inputValue);
    }, 1200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Zaro-Style Floating Card Prompt Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 sm:p-5 shadow-lg backdrop-blur-md"
      >
        {/* Main Input Text Prompt Display */}
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-[hsl(var(--foreground))] mb-4 leading-relaxed">
          <span className="text-[hsl(var(--muted-foreground))] font-normal">Turn my profile into a</span>
          
          {/* Interactive Role Selector Chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-xs font-mono text-[hsl(var(--primary))] font-semibold">
            <FileText className="w-3.5 h-3.5" />
            {selectedRole}
          </span>

          <span className="text-[hsl(var(--muted-foreground))] font-normal">resume targeting</span>

          {/* Interactive Goal Chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)] text-xs font-mono text-[hsl(var(--primary))] font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            {selectedGoal}
          </span>
        </div>

        {/* Dynamic Preset Switcher Bar */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[hsl(var(--border))] pt-3 mt-2">
          <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] mr-1">Presets:</span>
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setSelectedRole(role);
                setInputValue(`Optimize my resume for ${role} and achieve ${selectedGoal}`);
              }}
              className={`text-xs px-2.5 py-1 rounded-md transition-all font-mono ${
                selectedRole === role
                  ? 'bg-[hsl(var(--primary))] text-white font-medium shadow-xs'
                  : 'bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              {role.split(' ')[0]}
            </button>
          ))}

          {/* Run Action Button */}
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={isProcessing}
              className="rounded-full px-4 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground)/0.9)] text-xs font-medium gap-1.5 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Execute Optimization
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Confirmation banner */}
        {completedMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{completedMessage}</span>
          </motion.div>
        )}
      </motion.form>

      {/* Trust micro-badges below prompt bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[hsl(var(--muted-foreground))] mt-3">
        <span>Zero Data Retention</span>
        <span>•</span>
        <span>spaCy Skill Extraction</span>
        <span>•</span>
        <span>pgvector 384d Dense Match</span>
      </div>
    </div>
  );
};
