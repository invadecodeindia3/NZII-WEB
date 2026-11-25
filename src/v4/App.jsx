/**
 * V4 App — the NZII Version 2 prototype (nzii-version2.lovable.app) rebuilt page for page in React.
 * Every page lives under /v4 so a reload keeps the visitor in this version of the site.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from '../context/GameContext';
import { VersionToggle } from '../components/VersionToggle';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomeVariantSwitch } from './components/HomeVariantSwitch';
import { ScrollThread } from './components/ScrollThread';
import { HomePage } from './pages/HomePage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { CollaboratePage } from './pages/CollaboratePage';
import { DraftPage } from './pages/DraftPage';
import './styles/v4-base.css';

// Route → the page key used to pick that page's header/footer styling (`v4-p-<key>` on the shell).
const PAGES = [
  { path: '/v4', key: 'home', element: <HomePage key="exact" /> },
  // Two animated designs of the same Home page, for comparison
  { path: '/v4/home-a', key: 'home', element: <HomePage key="a" variant="a" /> },
  { path: '/v4/home-soft', key: 'home', element: <HomePage key="soft" variant="soft" /> },
  { path: '/v4/who-we-are', key: 'who', element: <WhoWeArePage /> },
  { path: '/v4/research', key: 'draft', element: <DraftPage name="Research" /> },
  { path: '/v4/publications', key: 'draft', element: <DraftPage name="Publications" /> },
  { path: '/v4/news-events', key: 'news', element: <NewsEventsPage /> },
  { path: '/v4/collaborate', key: 'collab', element: <CollaboratePage /> },
  { path: '/v4/contact', key: 'draft', element: <DraftPage name="Contact" /> },
];

// Old addresses and the prototype's own file names lead to the matching V4 page.
const REDIRECTS = {
  '/': '/v4',
  '/v4/home-b': '/v4/home-soft',
  '/v4/about': '/v4/who-we-are',
  '/v4/consortium': '/v4/collaborate',
  '/v4/NZII_Home_Page.html': '/v4',
  '/v4/NZII_Who_We_Are_Page.html': '/v4/who-we-are',
  '/v4/NZII_Research_Page.html': '/v4/research',
  '/v4/NZII_Publications_Page.html': '/v4/publications',
  '/v4/NZII_News_Events_Page.html': '/v4/news-events',
  '/v4/NZII_People_Page.html': '/v4/collaborate',
  '/v4/NZII_Contact_Page.html': '/v4/contact',
};

// The Open Calls microsite is a page of its own outside this app (public/open-calls/index.html).
const ToOpenCalls = () => {
  useEffect(() => {
    window.location.replace('/open-calls/index.html' + window.location.hash);
  }, []);
  return null;
};

const normalise = (pathname) => pathname.replace(/\/+$/, '') || '/';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const current = PAGES.find((p) => p.path === normalise(pathname)) || PAGES[0];
  return (
    <div className={`v4-shell v4-body v4-p-${current.key}`}>
      <a className="skip" href="#content">Skip to content</a>
      <SiteHeader />
      <Routes>
        {PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={p.element} />
        ))}
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="/v4/open-calls" element={<ToOpenCalls />} />
        <Route path="/v4/NZII_Open_Calls_Microsite.html" element={<ToOpenCalls />} />
        <Route path="*" element={<Navigate to="/v4" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <ScrollToTop />
        <AppContent />
        <ScrollThread />
        <HomeVariantSwitch />
        <VersionToggle current="v4" />
      </GameProvider>
    </BrowserRouter>
  );
}
