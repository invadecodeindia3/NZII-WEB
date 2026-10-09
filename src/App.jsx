import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Header } from './components/Header';
import { DataStatusNotice } from './components/DataStatusNotice';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SimulatorPage } from './pages/SimulatorPage';
import { SectorsPage } from './pages/SectorsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchHubPage } from './pages/ResearchHubPage';
import { ResearchThemePage } from './pages/ResearchThemePage';
import { NewsEventsPage, NewsEventDetailPage } from './pages/NewsEventsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DataPage } from './pages/DataPage';
import { PolicyPage } from './pages/PolicyPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ConsortiumPage } from './pages/ConsortiumPage';
import { ToolsPage } from './pages/ToolsPage';
import { ArtifactDetailPage } from './pages/ArtifactDetailPage';

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
      <DataStatusNotice />

      {/* Main Page Views */}
      <main className="w-full flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/simulate" element={<Navigate to="/simulator" replace />} />
          <Route path="/simulation" element={<Navigate to="/simulator" replace />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/research" element={<ResearchHubPage />} />
          <Route path="/research/:slug" element={<ResearchThemePage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/:slug" element={<NewsEventDetailPage />} />
          <Route path="/case-studies" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/consortium" element={<ConsortiumPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/case-studies/:id" element={<ArtifactDetailPage />} />
          <Route path="/articles/:id" element={<ArtifactDetailPage />} />
          <Route path="/artifacts/:id" element={<ArtifactDetailPage />} />
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
