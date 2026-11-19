/** V4 site footer, as in the NZII Version 2 prototype. */
import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/v4/who-we-are', label: 'Who we are' },
  { to: '/v4/research', label: 'Research' },
  { to: '/v4/publications', label: 'Publications' },
  { to: '/v4/news-events', label: 'News & Events' },
  { to: '/v4/collaborate', label: 'Collaborate with us' },
  { to: '/v4/contact', label: 'Contact' },
];

export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="ft-top">
      <div className="ft-brand">
        <Link to="/v4" style={{ display: 'inline-flex' }}>
          <img className="logo-l" alt="Net Zero India Initiative" src="/assets/logos/nzii-logo-colour.svg" width="1497" height="692" loading="lazy" />
          <img className="logo-d" alt="Net Zero India Initiative" src="/assets/logos/nzii-logo-pale-yellow.svg" width="1497" height="692" loading="lazy" />
        </Link>
        <p>The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the&nbsp;environment.</p>
        <Link className="ft-cta" to="/v4/research">
          Explore our research{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
        </Link>
      </div>
      <nav className="ft-nav" aria-label="Footer navigation">
        {LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      </nav>
    </div>
    <div className="ft-bottom">
      <span>Net Zero India Initiative · Research, pathways and evidence</span>
      <span>Made for curiosity, grounded in evidence.</span>
    </div>
  </footer>
);
