import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../api/client';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Server,
  Layout,
  Cloud,
  BarChart2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Target,
  ChevronRight,
  RotateCcw,
  History
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer_star: string;
  key_points: string[];
}

export const InterviewRoleDetailPage: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const [roleDetails, setRoleDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState<'fresher' | 'intermediate' | 'senior'>('fresher');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  // Quiz state
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    if (roleId) {
      fetchRoleDetails(roleId, selectedDifficulty);
    }
  }, [roleId, selectedDifficulty]);

  const fetchRoleDetails = async (id: string, diff: string) => {
    if (!roleDetails) setIsLoading(true);
    setError(null);
    try {
      const res = await api.getInterviewRoleDetails(id, diff);
      setRoleDetails(res);
      if (res.faqs && res.faqs.length > 0 && expandedFaqId === null) {
        setExpandedFaqId(res.faqs[0].id);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Role details not found.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDifficultyChange = (diff: 'fresher' | 'intermediate' | 'senior') => {
    setSelectedDifficulty(diff);
    setIsQuizActive(false);
    setIsQuizSubmitted(false);
    setQuizResult(null);
  };

  const startRoleQuiz = () => {
    if (!roleDetails?.questions || roleDetails.questions.length === 0) return;
    setQuizQuestions(roleDetails.questions);
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setIsQuizSubmitted(false);
    setQuizResult(null);
    setIsQuizActive(true);
  };

  const handleOptionSelect = (qIdx: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);

    const resultObj = { score, total, percentage };
    setQuizResult(resultObj);
    setIsQuizSubmitted(true);

    // Save attempt to PostgreSQL DB
    try {
      await api.saveQuizAttempt({
        role_id: roleDetails.id,
        role_title: roleDetails.title,
        difficulty: selectedDifficulty,
        score: score,
        total_questions: total,
        percentage: percentage,
        answers_summary: userAnswers,
      });
    } catch (err) {
      console.error('Failed to persist quiz result to DB', err);
    }
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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">
        <div className="w-6 h-6 border-2 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading role requirements & question bank for /interview-prep/{roleId}...</p>
      </div>
    );
  }

  if (error || !roleDetails) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <p className="text-sm font-mono text-rose-500 font-bold">{error || 'Requested role not found.'}</p>
        <Button onClick={() => navigate('/interview-prep')} variant="outline" className="text-xs font-mono">
          Back to Interview Prep Roles
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4">
        <Link
          to="/interview-prep"
          className="inline-flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Software Roles
        </Link>
        <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
          /interview-prep/<span className="text-[hsl(var(--primary))] font-bold">{roleId}</span>
        </span>
      </div>

      {/* Role Details & Test Setup Banner */}
      {!isQuizActive && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] shrink-0">
                    {renderIcon(roleDetails.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {roleDetails.category}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                      {roleDetails.title}
                    </h1>
                  </div>
                </div>

                {/* Difficulty selector tabs */}
                <div className="flex items-center gap-1.5 bg-[hsl(var(--secondary))] p-1 rounded-xl border border-[hsl(var(--border))] relative">
                  {[
                    { id: 'fresher', label: 'Fresher (10 Qs)' },
                    { id: 'intermediate', label: 'Intermediate (15 Qs)' },
                    { id: 'senior', label: 'Senior (20 Qs)' },
                  ].map((d) => {
                    const isSelected = selectedDifficulty === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleDifficultyChange(d.id as any)}
                        className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors duration-150 ${
                          isSelected
                            ? 'text-white font-bold'
                            : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-difficulty-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 bg-[hsl(var(--primary))] rounded-lg shadow-xs -z-0"
                          />
                        )}
                        <span className="relative z-10">{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed font-mono">
                {roleDetails.description}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[hsl(var(--border))]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[hsl(var(--muted-foreground))] mr-1">Core Tech:</span>
                  {roleDetails.skills.map((sk: string) => (
                    <Badge key={sk} variant="outline" className="font-mono text-xs bg-[hsl(var(--secondary))]">
                      {sk}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={startRoleQuiz}
                  className="w-full sm:w-auto text-xs font-mono font-semibold gap-2 bg-[hsl(var(--primary))] text-white px-6 py-2.5 shadow-xs"
                >
                  <Target className="w-4 h-4" />
                  Start {selectedDifficulty.toUpperCase()} Practice Test ({roleDetails.total_questions} Questions)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements & Top FAQs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Requirements Column */}
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Core Role Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs font-mono">
                {roleDetails.requirements.map((req: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border))]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shrink-0 mt-1.5" />
                    <span className="leading-relaxed text-[hsl(var(--foreground))]">{req}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQs Column */}
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Frequently Asked Technical & STAR FAQs ({roleDetails.faqs?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roleDetails.faqs?.map((faq: FAQItem) => {
                  const isExp = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border border-[hsl(var(--border))] rounded-xl overflow-hidden bg-[hsl(var(--card))]"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaqId(isExp ? null : faq.id)}
                        className="w-full p-3.5 text-left text-xs font-mono font-bold flex items-center justify-between gap-3 bg-[hsl(var(--secondary)/0.3)] hover:bg-[hsl(var(--secondary))] transition-colors"
                      >
                        <span className="text-[hsl(var(--foreground))]">Q: {faq.question}</span>
                        {isExp ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                      </button>
                      {isExp && (
                        <div className="p-4 text-xs font-mono space-y-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[hsl(var(--primary))]">STAR Model Answer:</span>
                            <p className="whitespace-pre-wrap leading-relaxed text-[hsl(var(--foreground))]">
                              {faq.answer_star}
                            </p>
                          </div>
                          {faq.key_points && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {faq.key_points.map((pt, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                                  • {pt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

          </div>
        </motion.div>
      )}

      {/* Interactive Practice Test Screen */}
      {isQuizActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Quiz Header Bar */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4">
            <button
              type="button"
              onClick={() => setIsQuizActive(false)}
              className="inline-flex items-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Test
            </button>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] font-bold">
                {roleDetails.title}
              </span>
              <Badge variant="outline" className="uppercase text-[10px]">
                {selectedDifficulty} Level
              </Badge>
            </div>
          </div>

          {/* Quiz Question Card */}
          {!isQuizSubmitted ? (
            <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))]">
              <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                  Question {currentQuestionIdx + 1} of {quizQuestions.length}
                </CardTitle>
                <span className="text-xs font-mono font-bold text-[hsl(var(--primary))]">
                  {Math.round(((currentQuestionIdx + 1) / quizQuestions.length) * 100)}% Progress
                </span>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-[hsl(var(--secondary))] overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--primary))] transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-base font-bold text-[hsl(var(--foreground))] leading-snug font-mono">
                  {quizQuestions[currentQuestionIdx]?.question}
                </h3>

                {/* Options (A, B, C, D) */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestionIdx]?.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                    const optionLabels = ['A', 'B', 'C', 'D'];
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleOptionSelect(currentQuestionIdx, optIdx)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 cursor-pointer font-mono text-xs ${
                          isSelected
                            ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] font-semibold shadow-xs'
                            : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--secondary)/0.5)] text-[hsl(var(--foreground))]'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-[hsl(var(--primary))] text-white'
                              : 'bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]'
                          }`}
                        >
                          {optionLabels[optIdx]}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                    className="text-xs font-mono"
                  >
                    Previous
                  </Button>

                  {currentQuestionIdx < quizQuestions.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrentQuestionIdx((p) => Math.min(quizQuestions.length - 1, p + 1))}
                      className="text-xs font-mono bg-[hsl(var(--primary))] text-white"
                    >
                      Next Question <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(userAnswers).length === 0}
                      className="text-xs font-mono bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Submit Test & Calculate Score
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Quiz Submitted Results Summary */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="border-[hsl(var(--border))] shadow-xs bg-[hsl(var(--card))] text-center py-8 px-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[hsl(var(--secondary))] border-4 border-[hsl(var(--primary))] text-[hsl(var(--primary))] flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-2xl font-extrabold font-mono">{quizResult?.percentage}%</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                    Test Completed ({quizResult?.score} / {quizResult?.total} Correct)
                  </h3>
                  <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                    Your test attempt has been saved to your account performance history.
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={startRoleQuiz}
                    className="text-xs font-mono gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Test
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/interview-prep')}
                    className="text-xs font-mono gap-1.5 bg-[hsl(var(--primary))] text-white"
                  >
                    <History className="w-3.5 h-3.5" /> View Attempt History
                  </Button>
                </div>
              </Card>

              {/* Question Breakdown Review */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold font-mono text-[hsl(var(--foreground))] uppercase tracking-wider">
                  Question-by-Question Detailed Review ({quizQuestions.length})
                </h3>

                {quizQuestions.map((q, idx) => {
                  const userChoice = userAnswers[idx];
                  const isCorrect = userChoice === q.correct;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                        isCorrect
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-rose-500/30 bg-rose-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold text-[hsl(var(--foreground))]">
                          Q{idx + 1}: {q.question}
                        </span>
                        {isCorrect ? (
                          <Badge className="bg-emerald-500 text-white shrink-0">Correct</Badge>
                        ) : (
                          <Badge className="bg-rose-500 text-white shrink-0">Incorrect</Badge>
                        )}
                      </div>

                      <div className="space-y-1 pt-1 text-[11px]">
                        <div className="text-[hsl(var(--muted-foreground))]">
                          Your Choice: <span className={isCorrect ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
                            {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-500 font-semibold">
                            Correct Answer: {q.options[q.correct]}
                          </div>
                        )}
                        <div className="p-2 rounded bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
                          Explanation: {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

    </div>
  );
};
