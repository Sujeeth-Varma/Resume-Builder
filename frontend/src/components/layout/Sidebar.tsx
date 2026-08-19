import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles, User, FileText, BarChart2, FileCode, MessageSquare, LogOut, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, profile, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Candidate Profile', icon: User },
    { path: '/resumes', label: 'Resumes & PDF', icon: FileText },
    { path: '/ats', label: 'ATS Engine', icon: BarChart2 },
    { path: '/summary-builder', label: 'Summary Builder', icon: PenTool },
    { path: '/cover-letter', label: 'Cover Letter', icon: FileCode },
    { path: '/interview-prep', label: 'Interview Prep', icon: MessageSquare },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 sticky top-0 h-dvh z-40 ${
        collapsed ? 'w-16 p-2 items-center' : 'w-64 p-4'
      }`}
    >
      {/* Top Header & Brand & Links */}
      <div className="w-full space-y-6">
        
        {/* Brand & Toggle Container */}
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <Link
              to="/"
              className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center text-white shadow-xs shrink-0"
              title="ResumeAI Career Engine"
            >
              <Sparkles className="w-5 h-5" />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(false)}
              className="w-10 h-8 flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] p-0 rounded-lg"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight leading-none text-[hsl(var(--foreground))]">
                  Resume<span className="text-[hsl(var(--primary))]">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-mono">
                  Career Engine
                </span>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(true)}
              className="p-1.5 h-8 w-8 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Candidate Profile Badge */}
        {!collapsed && (
          <div className="p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)] space-y-1">
            <div className="text-xs font-bold text-[hsl(var(--foreground))] truncate">
              {profile?.full_name || user?.name || 'Candidate'}
            </div>
            <div className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] truncate">
              {profile?.email || user?.email || 'candidate@example.com'}
            </div>
            {profile?.professional_title && (
              <Badge variant="outline" className="text-[10px] font-mono px-2 py-0.5 mt-1 border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))]">
                {profile.professional_title}
              </Badge>
            )}
          </div>
        )}

        {/* Nav Links */}
        <nav className="space-y-1.5 w-full flex flex-col items-center">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center transition-all ${
                  collapsed
                    ? 'w-10 h-10 justify-center rounded-xl'
                    : 'w-full gap-3 px-3 py-2.5 rounded-xl text-xs font-medium'
                } ${
                  isActive
                    ? 'bg-[hsl(var(--primary))] text-white shadow-xs font-semibold'
                    : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[hsl(var(--primary))]'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer & Logout */}
      <div className="w-full pt-4 border-t border-[hsl(var(--border))] flex justify-center">
        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate('/auth');
          }}
          className={`text-xs font-mono text-rose-500 border-rose-500/30 hover:bg-rose-500/10 ${
            collapsed ? 'w-10 h-10 p-0 justify-center rounded-xl' : 'w-full gap-2 justify-start px-3 py-2'
          }`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};
