import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../api/client';
import { useStore } from '../store/useStore';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, fetchProfile } = useStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('candidate@example.com');
  const [password, setPassword] = useState('securepassword123');
  const [name, setName] = useState('Candidate Name');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await api.login(email, password);
      setToken(data.access_token);
      await fetchProfile();
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      await api.register({ name, email, password });
      const loginData = await api.login(email, password);
      setToken(loginData.access_token);
      await fetchProfile();
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))]">
          <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>AUTHENTICATION</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Welcome to ResumeAI
        </h1>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Sign in or create an account to start optimizing your resume.
        </p>
      </div>

      <Card className="border-[hsl(var(--border))] shadow-md bg-[hsl(var(--card))]">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Password</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] text-xs font-medium gap-2"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Full Name</label>
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Candidate Name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[hsl(var(--foreground))]">Password</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] text-xs font-medium gap-2"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
