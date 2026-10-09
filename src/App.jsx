import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

// Layout component to handle non-home pages
const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="w-full max-w-full min-h-screen font-manrope relative overflow-x-hidden flex flex-col justify-between">
      {/* Top Header */}
      <Header />

      {/* Main Page Views */}
      <main className="w-full flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/research" element={<ResearchHubPage />} />
          <Route path="/research/:slug" element={<ResearchThemePage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/:slug" element={<NewsEventDetailPage />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/consortium" element={<ConsortiumPage />} />
          <Route path="/simulator" element={<Navigate to="/research" replace />} />
          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* For non-home pages, render footer at root level */}
      {!isHome && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <ScrollToTop />
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}
