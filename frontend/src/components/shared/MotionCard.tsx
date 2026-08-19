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
      viewport={{ once: true }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-xs hover:shadow-md transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};
