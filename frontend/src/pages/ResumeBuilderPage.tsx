import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { FileText, Download, Plus, CheckCircle2, Sparkles, Layout, Check } from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const { resumes, fetchResumes, createResume, token } = useStore();

  const [title, setTitle] = useState('Senior Backend Engineer Resume');
  const [targetRole, setTargetRole] = useState('Python Engineer');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      fetchResumes();
    }
  }, [token, fetchResumes]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createResume(title, targetRole, selectedTemplate);
    setCreatedSuccess(true);
    setTimeout(() => setCreatedSuccess(false), 2500);
  };

  const handleDownload = async (resumeId: string) => {
    setDownloadingId(resumeId);
    try {
      await api.downloadPDF(resumeId);
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const templates = [
    { id: 'professional', name: 'Professional ATS', desc: 'Clean single-column layout optimized for high-volume ATS scanners.' },
    { id: 'modern', name: 'Modern Tech', desc: 'Minimalist layout with subtle vertical section accent dividers.' },
    { id: 'minimal', name: 'Minimalist Clean', desc: 'Airy typography layout with high visual contrast.' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
            <FileText className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            <span>RESUME BUILDER & PDF ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Structured Resumes & ReportLab PDF
          </h1>
          <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
            Generate pixel-perfect ATS-compliant downloadable PDF documents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Create New Resume Form */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4 text-[hsl(var(--primary))]" />
                Create Structured Resume
              </CardTitle>
              <CardDescription className="text-xs">
                Select a template and snapshot your current profile data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Resume Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Backend Engineer - Amazon"
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Target Role</label>
                  <Input
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Python Backend Lead"
                    className="text-xs"
                  />
                </div>

                {/* Template Selector */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">ReportLab Template</label>
                  <div className="space-y-2">
                    {templates.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                          selectedTemplate === tpl.id
                            ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--foreground))]'
                            : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--border)/0.8)]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{tpl.name}</span>
                          {selectedTemplate === tpl.id && <Check className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />}
                        </div>
                        <p className="text-[10px] opacity-80 mt-0.5">{tpl.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Resume
                </Button>

                {createdSuccess && (
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resume snapshot created!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Existing Resumes & Download Triggers */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layout className="w-4 h-4 text-[hsl(var(--primary))]" />
                Your Generated Resumes ({resumes.length})
              </CardTitle>
              <CardDescription className="text-xs">
                Click download to render server-side ReportLab ATS PDF documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumes.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-[hsl(var(--border))] rounded-xl text-xs font-mono text-[hsl(var(--muted-foreground))]">
                  No resumes created yet. Use the form on the left to create your first structured resume.
                </div>
              ) : (
                resumes.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{res.title}</h4>
                      <div className="flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                        <span>Target: {res.target_role || 'General'}</span>
                        <span>·</span>
                        <Badge variant="outline" className="text-[10px] uppercase font-mono">
                          {res.template_name}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      disabled={downloadingId === res.id}
                      onClick={() => handleDownload(res.id)}
                      className="rounded-lg text-xs font-mono gap-1.5 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground)/0.9)] shadow-xs shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      {downloadingId === res.id ? 'Rendering PDF...' : 'Download ATS PDF'}
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
