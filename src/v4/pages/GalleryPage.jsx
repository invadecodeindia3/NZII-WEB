/**
 * V4 'Gallery': photos and videos from NZII events, grouped by event (../data/gallery.js).
 * A photo opens full size; arrow keys move between photos of the whole gallery, Escape closes.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePageTitle, usePrototypeBehaviours } from '../hooks/usePrototypeBehaviours';
import { useDraftMotion } from '../hooks/pageMotions';
import { goToAnchor } from '../utils/dom';
import { GALLERY } from '../data/gallery';
import '../styles/draft.css';
import '../styles/gallery.css';

const Play = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;

export const GalleryPage = () => {
  const root = useRef(null);
  const dlg = useRef(null);
  usePrototypeBehaviours(root);
  useDraftMotion(root);
  usePageTitle('Gallery | Net Zero India Initiative');
  const { hash, key } = useLocation();
  const photos = useMemo(() => GALLERY.flatMap((g) => g.items.filter((it) => !it.video).map((it) => ({ ...it, event: g }))), []);
  const [at, setAt] = useState(-1);
  const nPhotos = GALLERY.reduce((n, g) => n + g.items.filter((i) => !i.video).length, 0);
  const nVideos = GALLERY.reduce((n, g) => n + g.items.filter((i) => i.video).length, 0);

  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => goToAnchor(decodeURIComponent(hash.slice(1)), { block: 'start' }), 60);
    return () => clearTimeout(t);
  }, [hash, key]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (at >= 0 && !d.open) d.showModal();
    if (at < 0 && d.open) d.close();
  }, [at]);

  const step = (n) => setAt((i) => (i + n + photos.length) % photos.length);
  const cur = at >= 0 ? photos[at] : null;

  return (
    <main id="content" ref={root}>
      <div className="container page">
        <section className="hero" id="overview">
          <div className="hero-text">
            <h1>Gallery</h1>
            <hr className="rule" />
            <p className="lead">Photographs and videos from NZII workshops, conferences and events.</p>
            <p className="gal-count">{nPhotos} photos · {nVideos} videos · {GALLERY.length} events</p>
          </div>
        </section>

        {GALLERY.map((g, gi) => (
          <section key={g.id} id={g.id} className="gal-event" style={{ '--gc': ['#2b9d8f', '#e76f51', '#a7c957', '#f28482'][gi % 4] }} aria-labelledby={`${g.id}-h`}>
            <header className="gal-head">
              <div>
                <p className="gal-meta">{g.meta}</p>
                <h2 id={`${g.id}-h`}>{g.title}</h2>
              </div>
              {g.news && <Link className="gal-news" to={`/v4/news-events#${g.news}`}>Read the news <span aria-hidden="true">→</span></Link>}
            </header>
            <ul className={`gal-grid n-${Math.min(g.items.length, 4)}`}>
              {g.items.map((it) => (
                <li key={it.src}>
                  {it.video ? (
                    <a className="gal-tile is-video" href={it.video} target="_blank" rel="noopener">
                      <img src={it.sm} width={it.w} height={it.h} alt={it.alt} loading="lazy" />
                      <span className="gal-play"><span className="gal-play-ic"><Play /></span>{it.label}<span className="sr-only"> (opens YouTube in a new tab)</span></span>
                    </a>
                  ) : (
                    <button type="button" className="gal-tile" onClick={() => setAt(photos.findIndex((p) => p.src === it.src))} aria-label={`Open photo: ${it.alt}`}>
                      <img src={it.sm} width={it.w} height={it.h} alt="" loading="lazy" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="gal-more">More photographs and videos will be added as NZII shares them.</p>
      </div>

      <dialog ref={dlg} className="gal-lb" aria-label="Photo" onClose={() => setAt(-1)} onClick={(e) => { if (e.target === e.currentTarget) setAt(-1); }}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}>
        {cur && (
          <figure className="gal-lb-in">
            <img key={cur.src} src={cur.src} width={cur.w} height={cur.h} alt={cur.alt} />
            <figcaption>
              <span><b>{cur.event.title}</b> · {cur.event.meta}</span>
              <span className="gal-lb-n">{at + 1} / {photos.length}</span>
            </figcaption>
            <button type="button" className="gal-lb-x" aria-label="Close" onClick={() => setAt(-1)}>×</button>
            <button type="button" className="gal-lb-p" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
            <button type="button" className="gal-lb-nx" aria-label="Next photo" onClick={() => step(1)}>›</button>
          </figure>
        )}
      </dialog>
    </main>
  );
};
