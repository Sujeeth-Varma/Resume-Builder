import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Cpu, Menu, X, Sparkles, FileText, User, BarChart2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { token, user, isBackendOnline, checkHealth, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const navLinks = [
    { path: '/', label: 'Overview', icon: Sparkles },
    { path: '/dashboard', label: 'Profile', icon: User },
    { path: '/resumes', label: 'Resumes', icon: FileText },
    { path: '/ats', label: 'ATS Engine', icon: BarChart2 },
    { path: '/ai-lab', label: 'AI Lab', icon: Cpu },
  ];

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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[hsl(var(--secondary)/0.6)] p-1 rounded-full border border-[hsl(var(--border))]">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[hsl(var(--foreground))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-[hsl(var(--card))] rounded-full border border-[hsl(var(--border))] shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Status Pill & User Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[hsl(var(--muted-foreground))]">
              {isBackendOnline ? 'API Connected' : 'Offline'}
            </span>
          </div>

          {token ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs px-2.5 py-1">
                {user?.name || 'Candidate'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="text-xs rounded-full px-4 bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] shadow-xs"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]'
                        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary)/0.5)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[hsl(var(--primary))]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {isBackendOnline ? 'API Connected' : 'Offline'}
              </div>
              {token ? (
                <Button size="sm" variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Sign Out
                </Button>
              ) : (
                <Button size="sm" onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}>
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
