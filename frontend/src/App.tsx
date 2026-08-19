import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ATSAnalyzerPage } from './pages/ATSAnalyzerPage';
import { AILabPage } from './pages/AILabPage';

function App() {
  return (
    <Router>
      <div className="min-h-dvh flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-[hsl(var(--primary)/0.2)]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resumes" element={<ResumeBuilderPage />} />
            <Route path="/ats" element={<ATSAnalyzerPage />} />
            <Route path="/ai-lab" element={<AILabPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;