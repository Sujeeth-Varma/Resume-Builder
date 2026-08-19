import React from 'react';
import { motion } from 'motion/react';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionCard: React.FC<MotionCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.1,
        ease: 'easeOut',
        opacity: { duration: 0.25, delay, ease: 'easeOut' },
      }}
      className={`rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-xs hover:border-[hsl(var(--primary)/0.35)] hover:shadow-md transition-colors duration-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};
