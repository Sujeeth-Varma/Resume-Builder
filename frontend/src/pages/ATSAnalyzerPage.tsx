import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { api, type ATSReport } from '../api/client';
import { ScoreGauge } from '../components/shared/ScoreGauge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Target, Sparkles, AlertCircle, Cpu, FileText, ArrowRight, UploadCloud, Database, FileUp, CheckCircle2, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

export const ATSAnalyzerPage: React.FC = () => {
  const { resumes, activeResumeId, analyzeJob, runATSAnalysis, latestATSReport, isLoading, error } = useStore();

  const [mode, setMode] = useState<'upload' | 'dump' | 'profile'>('upload');

  // Target Job Posting Fields
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobText, setJobText] = useState('');

  // 1. File Upload & Drag/Drop & Paste State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedResumeText, setExtractedResumeText] = useState<string>('');
  const [showExtractedText, setShowExtractedText] = useState<boolean>(false);
  const [uploadATSReport, setUploadATSReport] = useState<ATSReport | null>(null);
  const [uploadAnalyzing, setUploadAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 2. Dump mode state
  const [rawResumeText, setRawResumeText] = useState('');
  const [rawATSReport, setRawATSReport] = useState<ATSReport | null>(null);
  const [rawAnalyzing, setRawAnalyzing] = useState(false);
  const [rawError, setRawError] = useState<string | null>(null);

  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  // Clipboard (Ctrl + V) event listener for easy pasting
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (mode !== 'upload') return;
      
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        const pastedFile = e.clipboardData.files[0];
        if (['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(pastedFile.type) || pastedFile.name.match(/\.(pdf|docx|txt)$/i)) {
          setSelectedFile(pastedFile);
          setUploadError(null);
          e.preventDefault();
          return;
        }
      }
      
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.clipboardData) {
        const text = e.clipboardData.getData('text');
        if (text && text.trim().length > 20) {
          setRawResumeText(text);
          setMode('dump');
          setUploadError('Pasted text detected! Switched to Raw Text mode.');
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [mode]);

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setSelectedFile(droppedFile);
      setUploadError(null);
    }
  };

  // 1. File Upload Form Handler
  const handleFileUploadAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select or drag-and-drop a resume file (.pdf, .docx, or .txt).');
      return;
    }
    if (!jobText.trim()) {
      setUploadError('Please enter target job description text on the right.');
      return;
    }

    setUploadAnalyzing(true);
    setUploadError(null);
    try {
      const res = await api.uploadAndAnalyzeATS(selectedFile, jobText);
      setUploadATSReport(res);
      setExtractedResumeText(res.extracted_resume_text);
    } catch (err: any) {
      setUploadError(err.response?.data?.detail || 'Failed to extract file text and calculate ATS score.');
    } finally {
      setUploadAnalyzing(false);
    }
  };

  // 2. Profile-based ATS analysis handler
  const handleProfileAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobText.trim()) return;

    const job = await analyzeJob(jobTitle || 'Target Role', companyName, jobText);
    if (job) {
      setExtractedSkills(job.extracted_skills || []);
      const resumeIdToUse = activeResumeId || (resumes.length > 0 ? resumes[0].id : 'default_resume');
      await runATSAnalysis(resumeIdToUse, job.id);
    }
  };

  // 3. Raw Dump ATS analysis handler
  const handleRawDumpAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawResumeText.trim() || !jobText.trim()) {
      setRawError('Please provide both raw resume text and job posting text.');
      return;
    }

    setRawAnalyzing(true);
    setRawError(null);
    try {
      const report = await api.analyzeRawATS(rawResumeText, jobText);
      setRawATSReport(report);
    } catch (err: any) {
      setRawError(err.response?.data?.detail || 'Failed to analyze dumped resume.');
    } finally {
      setRawAnalyzing(false);
    }
  };

  const currentReport =
    mode === 'upload' ? uploadATSReport : mode === 'dump' ? rawATSReport : latestATSReport;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
          <Target className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>ATS COMPATIBILITY ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          ATS Score & Resume File Analyzer
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1">
          Upload any PDF or Word resume document, drag-and-drop, or paste (Ctrl + V) to extract text and analyze SentenceTransformers 384d vector compatibility.
        </p>
      </div>

      {/* Prominent Mode Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            id: 'upload',
            title: 'Upload Resume File',
            subtitle: 'PDF / Word File (Drag-and-Drop or Ctrl + V)',
            icon: FileUp,
          },
          {
            id: 'dump',
            title: 'Paste Raw Text',
            subtitle: 'Copy-Paste Existing Resume Text',
            icon: UploadCloud,
          },
          {
            id: 'profile',
            title: 'Use DB Profile',
            subtitle: 'Evaluate Candidate Profile in DB',
            icon: Database,
          },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id as any)}
              className={`p-4 rounded-xl border text-left transition-colors duration-150 flex items-start gap-3.5 cursor-pointer shadow-xs ${
                isSelected
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.06)]'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--secondary)/0.5)]'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div
                  className={`text-xs font-bold font-mono transition-colors ${
                    isSelected ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]'
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-[11px] font-mono text-[hsl(var(--muted-foreground))] leading-tight">
                  {item.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input Form & Upload Dropzone */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[hsl(var(--primary))]" />
                {mode === 'upload'
                  ? 'Resume File Upload & Target Job'
                  : mode === 'dump'
                  ? 'Dump Resume & Target Job'
                  : 'Target Job Posting Input'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div key={mode} className="transition-opacity duration-150">
                  {/* MODE 1: RESUME FILE UPLOAD DROPZONE */}
                  {mode === 'upload' && (
                    <form onSubmit={handleFileUploadAnalyze} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Upload Resume Document (.pdf, .docx, .txt) *
                        </label>
                        
                        {/* Sleek File Upload Dropzone with Dedicated Logo & Drag-Drop & Ctrl+V support */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`p-6 border border-dashed rounded-2xl text-center transition-all duration-300 space-y-3 ${
                            isDragging
                              ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.12)] scale-[1.01]'
                              : 'border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.3)] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary)/0.03)]'
                          }`}
                        >
                          {/* Logo Badge */}
                          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)] text-[hsl(var(--primary))] flex items-center justify-center mx-auto shadow-xs">
                            <FileUp className="w-6 h-6" />
                          </div>

                          <div className="space-y-1">
                            <input
                              type="file"
                              accept=".pdf,.docx,.txt"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedFile(e.target.files[0]);
                                  setUploadError(null);
                                }
                              }}
                              className="hidden"
                              id="ats-resume-file-input"
                            />
                            <motion.label
                              htmlFor="ats-resume-file-input"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-white text-xs font-mono font-semibold cursor-pointer hover:bg-[hsl(var(--primary)/0.9)] shadow-xs transition-colors"
                            >
                              <FileCode className="w-4 h-4" />
                              {selectedFile ? 'Change File' : 'Click to Upload Resume File'}
                            </motion.label>
                            <p className="text-[11px] font-mono text-[hsl(var(--muted-foreground))] pt-1">
                              or drag & drop file here or press <span className="px-1.5 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] font-bold text-[hsl(var(--foreground))] font-mono">Ctrl + V</span>
                            </p>
                          </div>

                          <div className="flex justify-center gap-1.5 pt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">.PDF</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">.DOCX</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">.TXT</span>
                          </div>
                        </div>

                        {selectedFile && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-300 flex items-center justify-between shadow-xs">
                            <span className="truncate flex items-center gap-2 font-semibold">
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" /> {selectedFile.name}
                            </span>
                            <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded">
                              {Math.round(selectedFile.size / 1024)} KB
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Paste Target Job Description Text *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={jobText}
                          onChange={(e) => setJobText(e.target.value)}
                          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                          placeholder="Paste target job description text here..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={uploadAnalyzing}
                        className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white shadow-xs py-2.5"
                      >
                        {uploadAnalyzing ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            Extracting Details & Scoring...
                          </>
                        ) : (
                          <>
                            Extract File & Compute ATS Score
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </Button>

                      {uploadError && (
                        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{uploadError}</span>
                        </div>
                      )}
                    </form>
                  )}

                  {/* MODE 2: RAW TEXT DUMP */}
                  {mode === 'dump' && (
                    <form onSubmit={handleRawDumpAnalyze} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Paste Raw Resume Text *
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={rawResumeText}
                          onChange={(e) => setRawResumeText(e.target.value)}
                          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                          placeholder="Paste full text of your existing resume here..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Paste Target Job Posting Text *
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={jobText}
                          onChange={(e) => setJobText(e.target.value)}
                          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                          placeholder="Paste target job description text here..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={rawAnalyzing}
                        className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white shadow-xs"
                      >
                        {rawAnalyzing ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            Analyzing Resume Dump...
                          </>
                        ) : (
                          <>
                            Compute ATS Score & Recommendations
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </Button>

                      {rawError && (
                        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{rawError}</span>
                        </div>
                      )}
                    </form>
                  )}

                  {/* MODE 3: PROFILE DB */}
                  {mode === 'profile' && (
                    <form onSubmit={handleProfileAnalyze} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">Job Title</label>
                        <Input
                          placeholder="e.g. Senior Software Engineer"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Company Name (Optional)
                        </label>
                        <Input
                          placeholder="e.g. Acme Corp"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                          Raw Job Posting Text *
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={jobText}
                          onChange={(e) => setJobText(e.target.value)}
                          className="w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                          placeholder="Paste job description text here..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-xs font-medium gap-1.5 bg-[hsl(var(--primary))] text-white shadow-xs"
                      >
                        {isLoading ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            Computing Vector Match...
                          </>
                        ) : (
                          <>
                            Run ATS Compatibility Analysis
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </Button>

                      {error && (
                        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </form>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Extracted Details & Score Gauge Report */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Extracted Resume Text Disclosure Box (For File Upload Mode) */}
          {mode === 'upload' && extractedResumeText && (
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  Extracted Document Text ({extractedResumeText.length} characters)
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowExtractedText(!showExtractedText)}
                  className="text-xs font-mono gap-1"
                >
                  {showExtractedText ? 'Hide Text' : 'View Extracted Text'}
                  {showExtractedText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </Button>
              </CardHeader>
              {showExtractedText && (
                <CardContent>
                  <pre className="p-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[11px] font-mono text-[hsl(var(--foreground))] whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {extractedResumeText}
                  </pre>
                </CardContent>
              )}
            </Card>
          )}

          {/* spaCy Extracted Skills Bar */}
          {extractedSkills.length > 0 && (
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  spaCy NLP Extracted Technical Skills ({extractedSkills.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((sk) => (
                    <Badge key={sk} variant="outline" className="font-mono text-xs px-2.5 py-1 bg-[hsl(var(--secondary))]">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Score Gauge Report */}
          {currentReport ? (
            <ScoreGauge report={currentReport} />
          ) : (
                <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
                  <CardContent className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] flex items-center justify-center mx-auto">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      No ATS Analysis Generated Yet
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-sm mx-auto">
                      {mode === 'upload'
                        ? 'Click "Click to Upload Resume File", drag & drop a PDF/DOCX file, or press Ctrl+V, then enter the target job description and click "Extract File & Compute ATS Score".'
                        : mode === 'dump'
                        ? 'Paste your raw resume text and job description on the left, then click "Compute ATS Score & Recommendations".'
                        : 'Paste a target job description on the left and click "Run ATS Compatibility Analysis".'}
                    </p>
                  </CardContent>
                </Card>
              )}

        </div>

      </div>
    </div>
  );
};
