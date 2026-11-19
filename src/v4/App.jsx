import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/cura.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TechnologyPage } from './pages/TechnologyPage';
import { VersionToggle } from '../components/VersionToggle';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="v4-body min-h-screen flex flex-col justify-between" style={{ backgroundColor: '#15130f', color: '#edeee8' }}>
        <Header />
        <main className="w-full flex-grow relative z-10" id="content">
          <Routes>
            <Route path="/v4" element={<TechnologyPage />} />
            <Route path="/v4/technology" element={<TechnologyPage />} />
            <Route path="/v4/*" element={<TechnologyPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="*" element={<Navigate to="/v4" replace />} />
          </Routes>
        </main>
        <Footer />
        <VersionToggle current="v4" />
      </div>
    </BrowserRouter>
  );
}
