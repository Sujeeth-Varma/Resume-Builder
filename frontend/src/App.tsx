import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router';
import { useStore } from './store/useStore';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ATSAnalyzerPage } from './pages/ATSAnalyzerPage';
import { SummaryBuilderPage } from './pages/SummaryBuilderPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { InterviewRoleDetailPage } from './pages/InterviewRoleDetailPage';

// Protected Route Guard: Redirects unauthenticated candidates to /auth
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useStore();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  const { token } = useStore();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-dvh flex flex-col md:flex-row bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-[hsl(var(--primary)/0.2)]">
      {token && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Page */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Candidate Application Routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resumes"
              element={
                <ProtectedRoute>
                  <ResumeBuilderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ats"
              element={
                <ProtectedRoute>
                  <ATSAnalyzerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summary-builder"
              element={
                <ProtectedRoute>
                  <SummaryBuilderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cover-letter"
              element={
                <ProtectedRoute>
                  <CoverLetterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-prep"
              element={
                <ProtectedRoute>
                  <InterviewPrepPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-prep/:roleId"
              element={
                <ProtectedRoute>
                  <InterviewRoleDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!token && isLandingPage && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;