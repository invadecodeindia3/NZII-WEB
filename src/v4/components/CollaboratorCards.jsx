import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ProfileLinks } from './PeopleBits';
import { spotlight } from '../utils/dom';

/**
 * Collaborator cards. A collaborator with NZII news gets a pop-up listing it:
 * with a mouse it opens on hover (after a short pause) and stays while the pointer is on the card or the
 * pop-up; a click, tap or Enter pins it open. Escape or a click elsewhere closes it.
 */
export const CollaboratorCards = ({ people, newsTo = '/v4/news-events' }) => {
  const [openKey, setOpenKey] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [shown, setShown] = useState(false);
  const [side, setSide] = useState('below');
  const cardRefs = useRef({});
  const btnRefs = useRef({});
  const popRef = useRef(null);
  const timers = useRef({ open: 0, close: 0 });
  const person = people.find((p) => p.key === openKey) || null;

  const clearTimers = () => {
    clearTimeout(timers.current.open);
    clearTimeout(timers.current.close);
  };

  const close = useCallback((refocusKey) => {
    clearTimers();
    setOpenKey(null);
    setPinned(false);
    setShown(false);
    if (refocusKey && btnRefs.current[refocusKey]) btnRefs.current[refocusKey].focus();
  }, []);

  const place = useCallback(() => {
    const pop = popRef.current;
    const card = cardRefs.current[openKey];
    if (!pop || !card) return;
    if (matchMedia('(max-width:640px)').matches) {
      // phones: the stylesheet turns the pop-up into a bottom sheet
      pop.style.top = '';
      pop.style.left = '';
      pop.style.width = '';
      return;
    }
    const r = card.getBoundingClientRect();
    pop.style.width = r.width + 'px';
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const gap = 8;
    const above = r.bottom + gap + h > window.innerHeight - 16 && r.top - gap - h > 16;
    setSide(above ? 'above' : 'below');
    pop.style.left = Math.min(Math.max(16, r.left), vw - w - 16) + window.scrollX + 'px';
    pop.style.top = (above ? r.top - gap - h : r.bottom + gap) + window.scrollY + 'px';
  }, [openKey]);

  useLayoutEffect(() => {
    if (!openKey) return undefined;
    place();
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [openKey, place]);

  useEffect(() => {
    if (openKey && pinned && popRef.current) popRef.current.focus({ preventScroll: true });
  }, [openKey, pinned]);

  useEffect(() => {
    if (!openKey) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close(openKey);
    };
    const onClick = (e) => {
      if (popRef.current && popRef.current.contains(e.target)) return;
      if (e.target.closest && e.target.closest('.pp-btn')) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener('resize', place);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', place);
    };
  }, [openKey, close, place]);

  useEffect(() => clearTimers, []);

  const closeSoon = () => {
    clearTimeout(timers.current.close);
    timers.current.close = setTimeout(() => close(), 220);
  };

  const hoverable = () => matchMedia('(hover:hover) and (pointer:fine)').matches;

  const cardHandlers = (key) => ({
    onPointerEnter: (e) => {
      if (e.pointerType !== 'mouse' || !hoverable() || pinned) return;
      clearTimers();
      if (openKey !== key) {
        timers.current.open = setTimeout(() => {
          setShown(false);
          setPinned(false);
          setOpenKey(key);
        }, 140);
      }
    },
    onPointerLeave: (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(timers.current.open);
      if (openKey === key && !pinned) closeSoon();
    },
  });

  const toggle = (key) => {
    clearTimers();
    if (openKey === key && pinned) {
      close(key);
      return;
    }
    if (openKey !== key) setShown(false);
    setOpenKey(key);
    setPinned(true);
  };

  return (
    <>
      <ul className="pis big compact collab-cards">
        {people.map((p) => {
          const hasNews = p.news && p.news.length > 0;
          return (
            <li
              key={p.key}
              className="card"
              ref={(el) => { cardRefs.current[p.key] = el; }}
              onPointerMove={spotlight}
              {...(hasNews ? cardHandlers(p.key) : {})}
            >
              <img className="photo" src={p.photo} alt="" loading="lazy" />
              <span className="pi-txt">
                <b>
                  {hasNews ? (
                    <button
                      type="button"
                      className="pp-btn"
                      ref={(el) => { btnRefs.current[p.key] = el; }}
                      aria-haspopup="dialog"
                      aria-expanded={openKey === p.key}
                      aria-controls={openKey === p.key ? 'person-pop' : undefined}
                      onClick={() => toggle(p.key)}
                    >
                      {p.name}
                      <span className="pp-ic" aria-hidden="true" />
                    </button>
                  ) : (
                    p.name
                  )}
                </b>
                <span className="muted">{p.role}</span>
                <ProfileLinks person={p} />
              </span>
            </li>
          );
        })}
      </ul>

      {person &&
        createPortal(
          <div className="v4-shell v4-p-who">
            {pinned && <div className="pp-scrim" onClick={() => close()} />}
            <div
              ref={popRef}
              className={`pp ${side}${shown ? ' on' : ''}`}
              id="person-pop"
              role="dialog"
              aria-labelledby="pp-name"
              tabIndex={-1}
              onPointerEnter={() => clearTimeout(timers.current.close)}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse' && !pinned) closeSoon();
              }}
            >
              <button type="button" className="pp-x" aria-label="Close" onClick={() => close(person.key)}>×</button>
              <div className="pp-head">
                <span className="pp-ph" aria-hidden="true"><img src={person.photo} alt="" /></span>
                <div>
                  <p className="pp-name" id="pp-name">{person.name}</p>
                  {person.role && <p className="pp-role">{person.role}</p>}
                </div>
              </div>
              <div className="pp-sec">
                <span className="pp-lbl">News &amp; Events</span>
                <ul className="pp-news">
                  {person.news.map((n) => (
                    <li key={n.id}>
                      <Link to={`${newsTo}#${n.id}`} onClick={() => close()}>
                        <span className="t">{n.title}<span className="ar" aria-hidden="true">→</span></span>
                        <time dateTime={n.date}>{n.meta}</time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
