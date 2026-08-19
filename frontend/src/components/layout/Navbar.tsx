import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Cpu, Menu, X, Sparkles, FileText, User, BarChart2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { token, user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // When logged in, navigation lives in the left Sidebar. Render compact mobile header for mobile devices only.
  if (token) {
    return (
      <header className="md:hidden sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] glass-panel">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-[hsl(var(--foreground))]">ResumeAI</span>
          </Link>

          <Button variant="ghost" size="sm" className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 pt-3 pb-6 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {[
                  { path: '/dashboard', label: 'Candidate Profile', icon: User },
                  { path: '/onboarding', label: 'Onboarding Wizard', icon: Sparkles },
                  { path: '/resumes', label: 'Resumes', icon: FileText },
                  { path: '/ats', label: 'ATS Engine', icon: BarChart2 },
                  { path: '/ai-lab', label: 'AI Lab', icon: Cpu },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg ${
                        isActive ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[hsl(var(--primary))]" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-[hsl(var(--border))] flex justify-between items-center">
                <Badge variant="outline" className="text-xs">{user?.name || 'Candidate'}</Badge>
                <Button size="sm" variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Sign Out
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }

  // Public Landing Navbar (when logged out)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] glass-panel transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Mark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight leading-none text-[hsl(var(--foreground))]">
              Resume<span className="text-[hsl(var(--primary))]">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-mono">
              Career Engine
            </span>
          </div>
        </Link>

        {/* Public Auth Actions */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="text-xs rounded-full px-4 bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] shadow-xs"
            onClick={() => navigate('/auth')}
          >
            Sign In / Register
          </Button>
        </div>
      </div>
    </header>
  );
};
