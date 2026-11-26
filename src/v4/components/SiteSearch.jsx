import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { search } from '../data/searchIndex';
import '../styles/search.css';

const Glass = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></svg>
);

const SUGGEST = ['Winter School', 'Open calls', 'Biodiversity', 'COP 31', 'Funders'];

/**
 * Keyword search over the whole site: pages, people, news and events, and the open calls.
 * Opens from the header button, or with "/" or Ctrl/⌘ + K. Arrow keys move, Enter opens, Escape closes.
 */
export const SiteSearch = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [at, setAt] = useState(0);
  const input = useRef(null);
  const btn = useRef(null);
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open && input.current) input.current.focus();
  }, [open]);
  useEffect(() => setAt(0), [q]);
  useEffect(() => setOpen(false), [pathname, hash]);

  const close = () => {
    setOpen(false);
    if (btn.current) btn.current.focus();
  };
  const go = (item) => {
    if (!item) return;
    setOpen(false);
    setQ('');
    if (item.ext) window.open(item.to, '_blank', 'noopener');
    else navigate(item.to);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setAt((n) => Math.min(n + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setAt((n) => Math.max(n - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[at]); }
  };

  return (
    <>
      <button type="button" className="hd-search" ref={btn} aria-label="Search the site" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Glass />
      </button>
      {open && createPortal(
        <div className="v4-shell sx-wrap" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="sx" role="dialog" aria-modal="true" aria-label="Search the site" onKeyDown={onKeyDown}>
            <div className="sx-bar">
              <Glass size={20} />
              <input
                ref={input}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search people, news, events, open calls…"
                aria-label="Search by keyword"
                aria-controls="sx-list"
                aria-activedescendant={results[at] ? `sx-${at}` : undefined}
                autoComplete="off"
              />
              <button type="button" className="sx-x" onClick={close}>Esc</button>
            </div>
            {q.trim() === '' ? (
              <div className="sx-hint">
                <span>Try</span>
                {SUGGEST.map((s) => <button key={s} type="button" onClick={() => setQ(s)}>{s}</button>)}
              </div>
            ) : results.length === 0 ? (
              <p className="sx-none" role="status">Nothing found for “{q.trim()}”. Try a name, a topic or a month.</p>
            ) : (
              <ul className="sx-list" id="sx-list" role="listbox" aria-label="Results">
                {results.map((r, i) => (
                  <li key={r.to + r.title} id={`sx-${i}`} role="option" aria-selected={i === at} className={i === at ? 'on' : undefined} onMouseEnter={() => setAt(i)} onClick={() => go(r)}>
                    <span className={`sx-type t-${r.type.split(' ')[0].toLowerCase()}`}>{r.type}</span>
                    <span className="sx-txt"><b>{r.title}{r.ext && <span aria-hidden="true"> ↗</span>}</b>{r.text && <span>{r.text}</span>}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="sx-foot" aria-live="polite">{q.trim() && results.length > 0 ? `${results.length} result${results.length === 1 ? '' : 's'} · ` : ''}↑ ↓ to move · Enter to open</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
