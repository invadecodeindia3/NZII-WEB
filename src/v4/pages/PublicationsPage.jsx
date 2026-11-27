/**
 * V4 'Publications': NZII's papers, chapters, reports, presentations and datasets, from ../data/publications.js.
 * Filter by type; each entry links to its DOI or conference page where one exists.
 */
import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle, usePrototypeBehaviours } from '../hooks/usePrototypeBehaviours';
import { useDraftMotion } from '../hooks/pageMotions';
import { PUBLICATIONS, PUB_TYPES } from '../data/publications';
import '../styles/draft.css';
import '../styles/publications.css';

const Out = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const PublicationsPage = () => {
  const root = useRef(null);
  usePrototypeBehaviours(root);
  useDraftMotion(root);
  usePageTitle('Publications | Net Zero India Initiative');
  const [type, setType] = useState('all');
  const counts = useMemo(() => Object.fromEntries(PUB_TYPES.map((t) => [t.key, PUBLICATIONS.filter((p) => p.type === t.key).length])), []);
  const groups = PUB_TYPES.filter((t) => counts[t.key] && (type === 'all' || type === t.key)).map((t) => ({
    ...t,
    items: PUBLICATIONS.filter((p) => p.type === t.key).sort((a, b) => b.ym.localeCompare(a.ym)),
  }));

  return (
    <main id="content" ref={root}>
      <div className="container page">
        <section className="hero" id="overview">
          <div className="hero-text">
            <h1>Publications</h1>
            <hr className="rule" />
            <p className="lead">Papers, chapters, reports, conference presentations and datasets from the Net Zero India Initiative.</p>
          </div>
        </section>

        <div className="pub-filter" role="group" aria-label="Show">
          <button type="button" aria-pressed={type === 'all'} onClick={() => setType('all')}>All <span>{PUBLICATIONS.length}</span></button>
          {PUB_TYPES.filter((t) => counts[t.key]).map((t) => (
            <button key={t.key} type="button" className={`t-${t.key}`} aria-pressed={type === t.key} onClick={() => setType(t.key)}>{t.label} <span>{counts[t.key]}</span></button>
          ))}
        </div>

        {groups.map((g) => (
          <section key={g.key} className={`pub-group t-${g.key}`} aria-labelledby={`h-${g.key}`}>
            <h2 id={`h-${g.key}`}>{g.label}</h2>
            <ol className="pub-list">
              {g.items.map((p) => (
                <li key={p.title} className="pub">
                  <span className="pub-type">{p.status || g.one}</span>
                  <div className="pub-body">
                    <h3>{p.link ? <a href={p.link} target="_blank" rel="noopener">{p.title}<span className="sr-only"> (opens in a new tab)</span></a> : p.title}</h3>
                    <p className="pub-venue">{p.venue}{p.date && <span> · {p.date}</span>}</p>
                    {p.authors && <p className="pub-authors">{p.authors}</p>}
                    {p.note && <p className="pub-note">{p.note}</p>}
                    {(p.link || p.news) && (
                      <p className="pub-links">
                        {p.link && <a href={p.link} target="_blank" rel="noopener">{p.link.includes('doi.org') ? 'Read the paper' : 'Conference page'} <Out /><span className="sr-only"> (opens in a new tab)</span></a>}
                        {p.news && <Link to={p.news}>Read the news <span aria-hidden="true">→</span></Link>}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
};
