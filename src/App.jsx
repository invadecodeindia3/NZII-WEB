import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Header } from './components/Header';
import { MotionController } from './components/MotionController';
import { Footer } from './components/Footer';
import { VersionToggle } from './components/VersionToggle';
import { HomePage } from './pages/HomePage';
import { ResearchHubPage } from './pages/ResearchHubPage';
import { ResearchThemePage } from './pages/ResearchThemePage';
import { NewsEventsPage, NewsEventDetailPage } from './pages/NewsEventsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ConsortiumPage } from './pages/ConsortiumPage';

// Scroll to top upon URL route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout component to handle page rendering
const AppContent = () => {
  return (
    <div className="w-full max-w-full min-h-screen relative overflow-x-hidden flex flex-col justify-between" style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Top Header */}
      <Header />

      {/* Main Page Views */}
      <main className="w-full flex-grow relative z-10" id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/NZII_Home_Page.html" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/NZII_About_Page.html" element={<AboutPage />} />
          <Route path="/consortium" element={<ConsortiumPage />} />
          <Route path="/collaborations" element={<ConsortiumPage />} />
          <Route path="/NZII_People_Page.html" element={<ConsortiumPage />} />
          <Route path="/research" element={<ResearchHubPage />} />
          <Route path="/research/:slug" element={<ResearchThemePage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/:slug" element={<NewsEventDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/publications" element={<PublicationsPage />} />

          {/* Prototype calculators and data pages redirect to research */}
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/simulate" element={<Navigate to="/research" replace />} />
          <Route path="/simulation" element={<Navigate to="/research" replace />} />
          <Route path="/tools" element={<Navigate to="/research" replace />} />
          <Route path="/data" element={<Navigate to="/research" replace />} />
          <Route path="/solutions" element={<Navigate to="/research" replace />} />
          <Route path="/sectors" element={<Navigate to="/research" replace />} />
          <Route path="/policy" element={<Navigate to="/research" replace />} />
          <Route path="/case-studies" element={<Navigate to="/research" replace />} />
          <Route path="/projects" element={<Navigate to="/research" replace />} />
          <Route path="/case-studies/:id" element={<Navigate to="/research" replace />} />
          <Route path="/articles/:id" element={<Navigate to="/research" replace />} />
          <Route path="/artifacts/:id" element={<Navigate to="/research" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Consistent Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <ScrollToTop />
        <MotionController />
        <AppContent />
        <VersionToggle current="v3" />
      </GameProvider>
    </BrowserRouter>
  );
}
