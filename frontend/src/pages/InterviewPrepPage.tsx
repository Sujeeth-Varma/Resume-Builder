import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  MessageSquare,
  Cpu,
  Server,
  Layout,
  Cloud,
  BarChart2,
  ChevronRight,
  Award,
  History,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface RoleSummary {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  skills: string[];
  requirements: string[];
  faqs_count: number;
  question_counts: { fresher: number; intermediate: number; senior: number };
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface TestAttempt {
  id: string;
  role_id: string;
  role_title: string;
  difficulty: string;
  score: number;
  total_questions: number;
  percentage: number;
  created_at: string;
}

export const InterviewPrepPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'roles' | 'history' | 'jd-quiz'>('roles');

  // Role list state
  const [roles, setRoles] = useState<RoleSummary[]>([]);

  // History state
  const [history, setHistory] = useState<TestAttempt[]>([]);

  // AI JD Quiz State
  const [jdText, setJdText] = useState('');
  const [isGeneratingJDQuiz, setIsGeneratingJDQuiz] = useState(false);
  const [jdQuizQuestions, setJdQuizQuestions] = useState<Question[]>([]);
  const [jdUserAnswers, setJdUserAnswers] = useState<Record<number, number>>({});
  const [isJDQuizSubmitted, setIsJDQuizSubmitted] = useState(false);
  const [jdQuizResult, setJdQuizResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  // Load roles on mount
  useEffect(() => {
    fetchRoles();
    fetchHistory();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await api.getInterviewRoles();
      setRoles(res.roles || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.getQuizAttempts();
      setHistory(res.attempts || []);
    } catch (err) {
      console.error(err);
    }
  };

  // AI JD Quiz Handlers
  const handleGenerateJDQuiz = async () => {
    if (!jdText.trim()) return;
    setIsGeneratingJDQuiz(true);
    setJdQuizQuestions([]);
    setJdUserAnswers({});
    setIsJDQuizSubmitted(false);
    setJdQuizResult(null);
    try {
      const res = await api.generateJDQuiz(jdText);
      setJdQuizQuestions(res.questions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingJDQuiz(false);
    }
  };

  const handleSubmitJDQuiz = () => {
    let score = 0;
    jdQuizQuestions.forEach((q, idx) => {
      if (jdUserAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    const total = jdQuizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    setJdQuizResult({ score, total, percentage });
    setIsJDQuizSubmitted(true);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[hsl(var(--primary))]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[hsl(var(--primary))]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[hsl(var(--primary))]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-[hsl(var(--primary))]" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-[hsl(var(--primary))]" />;
      default:
        return <MessageSquare className="w-5 h-5 text-[hsl(var(--primary))]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-mono text-[hsl(var(--muted-foreground))] mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          <span>INTERVIEW PREPARATION & ASSESSMENT PLATFORM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Software Role FAQs & Skill Assessment Tests
        </h1>
        <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mt-1">
          Explore technical requirements, practice top interview FAQs, and take difficulty-based multiple-choice skill tests with result history tracking.
        </p>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'roles'
              ? 'bg-[hsl(var(--primary))] text-white shadow-xs'
              : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Software Roles & Tests
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('history');
            fetchHistory();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'history'
              ? 'bg-[hsl(var(--primary))] text-white shadow-xs'
              : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
          }`}
        >
          <History className="w-4 h-4" />
          My Test Attempts ({history.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('jd-quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'jd-quiz'
              ? 'bg-[hsl(var(--primary))] text-white shadow-xs'
              : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Custom JD AI Test
        </button>
      </div>

      {/* TAB 1: SOFTWARE ROLES & PRACTICE TESTS */}
      {activeTab === 'roles' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.1, ease: "linear" }}
                onClick={() => navigate(`/interview-prep/${role.id}`)}
                className="p-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.5)] hover:shadow-sm transition-colors duration-100 cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
                      {renderIcon(role.icon)}
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] bg-[hsl(var(--secondary))]">
                      {role.category}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      {role.title}
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-snug line-clamp-2">
                      {role.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.skills.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs font-mono text-[hsl(var(--primary))] font-semibold">
                  <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                    Fresher (10Q) • Int (15Q) • Sr (20Q)
                  </span>
                  <span className="flex items-center gap-1">
                    Explore Role <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 2: MY TEST ATTEMPTS HISTORY */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-[hsl(var(--primary))]" />
                Saved Performance History in Database ({history.length} Attempts)
              </CardTitle>
              <Button size="sm" variant="outline" onClick={fetchHistory} className="text-xs font-mono h-8">
                Refresh History
              </Button>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((att) => (
                    <div
                      key={att.id}
                      className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[hsl(var(--foreground))]">{att.role_title}</span>
                          <Badge variant="outline" className="uppercase text-[10px]">
                            {att.difficulty}
                          </Badge>
                        </div>
                        <div className="text-[11px] text-[hsl(var(--muted-foreground))]">
                          Attempt Date: {att.created_at ? new Date(att.created_at).toLocaleDateString() : 'Recent'}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-base font-bold text-[hsl(var(--primary))]">
                            {att.percentage}%
                          </div>
                          <div className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            {att.score} / {att.total_questions} Correct
                          </div>
                        </div>

                        <Badge
                          className={`text-xs px-2.5 py-1 ${
                            att.percentage >= 75
                              ? 'bg-emerald-500 text-white'
                              : att.percentage >= 50
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-500 text-white'
                          }`}
                        >
                          {att.percentage >= 75 ? 'Passed' : 'Needs Practice'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                  <p>No practice test attempts recorded yet.</p>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab('roles')}
                    className="text-xs font-mono bg-[hsl(var(--primary))] text-white"
                  >
                    Take a Practice Test Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* TAB 3: CUSTOM AI JD QUIZ */}
      {activeTab === 'jd-quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
                Generate Custom Practice Test from Target Job Description (5-10 Questions)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                  Paste Target Job Posting Text *
                </label>
                <textarea
                  rows={6}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the full job posting text here to extract technical skills and generate 5-10 practice questions..."
                  className="w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3.5 text-xs font-mono text-[hsl(var(--foreground))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]"
                />
              </div>

              <Button
                onClick={handleGenerateJDQuiz}
                disabled={isGeneratingJDQuiz || !jdText.trim()}
                className="w-full text-xs font-mono font-semibold gap-2 bg-[hsl(var(--primary))] text-white py-2.5 shadow-xs"
              >
                {isGeneratingJDQuiz ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    Extracting Job Skills & Building Custom Quiz...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Custom JD Practice Quiz
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI JD Quiz Component */}
          {jdQuizQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              {!isJDQuizSubmitted ? (
                <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
                  <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
                    <CardTitle className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                      Custom JD Practice Test ({jdQuizQuestions.length} Questions)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    {jdQuizQuestions.map((q, qIdx) => (
                      <div key={q.id} className="space-y-3 p-4 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))]">
                        <h4 className="text-xs font-mono font-bold text-[hsl(var(--foreground))]">
                          Q{qIdx + 1}: {q.question}
                        </h4>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSel = jdUserAnswers[qIdx] === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => setJdUserAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                                className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-colors ${
                                  isSel
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] font-bold'
                                    : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <Button
                      onClick={handleSubmitJDQuiz}
                      disabled={Object.keys(jdUserAnswers).length === 0}
                      className="w-full text-xs font-mono bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5"
                    >
                      Evaluate AI Practice Test Score
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                /* AI JD Quiz Results Summary */
                <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] text-center py-8 px-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[hsl(var(--secondary))] border-4 border-[hsl(var(--primary))] text-[hsl(var(--primary))] flex items-center justify-center mx-auto shadow-sm">
                    <span className="text-2xl font-extrabold font-mono">{jdQuizResult?.percentage}%</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                      Custom JD Test Completed ({jdQuizResult?.score} / {jdQuizResult?.total} Correct)
                    </h3>
                    <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                      Client-side validated result for target job posting.
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => {
                      setIsJDQuizSubmitted(false);
                      setJdQuizQuestions([]);
                    }}
                    className="text-xs font-mono gap-1.5 bg-[hsl(var(--primary))] text-white mx-auto"
                  >
                    Test Another Job Description
                  </Button>
                </Card>
              )}
            </motion.div>
          )}

        </motion.div>
      )}

    </div>
  );
};
