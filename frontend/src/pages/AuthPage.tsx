import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../api/client';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, fetchProfile } = useStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      if (activeTab === 'login') {
        const data = await api.login(email, password);
        setToken(data.access_token);
        await fetchProfile();
        navigate('/dashboard');
      } else {
        await api.register({ name, email, password });
        const loginData = await api.login(email, password);
        setToken(loginData.access_token);
        await fetchProfile();
        navigate('/onboarding');
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.detail ||
          (activeTab === 'login' ? 'Invalid email or password credentials' : 'Registration failed')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center pt-12 sm:pt-16 pb-8 px-4">
      
      {/* Top Header & Centered Form Box (Fixed Top Offset) */}
      <div className="w-full max-w-sm mx-auto space-y-6">
        
        {/* Brand & Heading */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))] text-white flex items-center justify-center mx-auto shadow-sm mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Welcome to ResumeAI
          </h1>
          <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
            AI career engine & resume optimization platform
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[hsl(var(--secondary))] p-1 rounded-xl border border-[hsl(var(--border))] relative">
          {[
            { id: 'login', label: 'Sign In' },
            { id: 'register', label: 'Create Account' },
          ].map((t) => {
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTab(t.id as any);
                  setErrorMessage(null);
                }}
                className={`flex-1 relative py-2 rounded-lg text-xs font-mono font-bold transition-colors z-10 ${
                  isSelected
                    ? 'text-[hsl(var(--foreground))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="auth-tab-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-[hsl(var(--card))] rounded-lg shadow-xs border border-[hsl(var(--border))] -z-10"
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Notification */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs font-mono text-rose-600 dark:text-rose-400 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form with Static Email & Password at top and Bottom-Expanding Full Name */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input (Static Top) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[hsl(var(--muted-foreground))]" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-9 text-xs font-mono rounded-xl bg-[hsl(var(--card))]"
              />
            </div>
          </div>

          {/* Password Input (Static Top) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[hsl(var(--muted-foreground))]" />
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={activeTab === 'login' ? 'Enter password' : 'Create password'}
                className="pl-9 pr-9 text-xs font-mono rounded-xl bg-[hsl(var(--card))]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Full Name Input (Smooth Downward Expansion & Upward Collapse) */}
          <AnimatePresence>
            {activeTab === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{
                  height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.15, ease: 'linear' },
                  marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                }}
                className="overflow-hidden space-y-1.5"
              >
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-3 text-[hsl(var(--muted-foreground))]" />
                  <Input
                    type="text"
                    required={activeTab === 'register'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Candidate Name"
                    className="pl-9 text-xs font-mono rounded-xl bg-[hsl(var(--card))]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button with Smooth Layout Motion */}
          <motion.div layout transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] text-xs font-mono font-bold gap-2 shadow-xs"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  {activeTab === 'login' ? 'Authenticating...' : 'Registering...'}
                </>
              ) : (
                <>
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>
        </form>

      </div>

      {/* Footer Legal Terms Note */}
      <p className="text-[11px] font-mono text-[hsl(var(--muted-foreground))] text-center max-w-sm pt-6">
        By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>

    </div>
  );
};
