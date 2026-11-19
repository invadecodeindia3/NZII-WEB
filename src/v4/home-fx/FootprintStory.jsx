/**
 * "Where India stands, and the road to 2070" — one section after the hero in the animated Home variants,
 * in the Home page's own layout, background and colours.
 *
 * Everything here is sourced:
 *  - the emissions figures come from Climate TRACE (snapshot + live refresh, see ../hooks/useIndiaEmissions);
 *  - the milestones are India's own stated targets (updated NDC, 2022; National Green Hydrogen Mission, 2023);
 *  - the dashed curves after the latest year are drawn only to show that many routes lead to net zero.
 *    They are NOT projections. Replace them with NZII's Reference scenario when the team shares it (see PATHS).
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIndiaEmissions } from '../hooks/useIndiaEmissions';
import { still } from './fx-utils';
import './footprint.css';

const GT = 1e9;
const NET_ZERO = 2070;
// brand colours only, as page tokens so they follow light and dark mode
const COLOURS = ['var(--coral)', 'var(--teal)', 'var(--lime)', 'var(--pink)', 'var(--ink)'];

const TARGETS = [
  { year: 2030, title: '45% lower emissions intensity', text: 'Emissions per unit of GDP, compared with 2005.' },
  { year: 2030, title: 'About 50% non-fossil power capacity', text: 'Share of installed electric power capacity from non-fossil sources.' },
  { year: 2030, title: '2.5–3 billion tonnes carbon sink', text: 'Additional CO₂e absorbed through forest and tree cover.' },
  { year: 2030, title: '5 million tonnes of green hydrogen', text: 'Produced each year under the National Green Hydrogen Mission.' },
  { year: NET_ZERO, title: 'Net-zero emissions', text: 'India’s commitment, announced at COP26.' },
];

// Illustrative shapes only: f(0) = 1 (today), f(1) = 0 (net zero). `g` lifts a later peak, `k` delays the fall.
const PATHS = [
  { g: 0, k: 1.25 },
  { g: 0.22, k: 2.1 },
  { g: 0.42, k: 3.4 },
];
const shapeAt = (t, { g, k }) => (1 + g * 4 * t * (1 - t)) * (1 - Math.pow(t, k));

// drawn close to the size it is shown at, so the axis text stays readable
const W = 700;
const H = 400;
const M = { l: 40, r: 22, t: 44, b: 32 };

export const FootprintStory = () => {
  const data = useIndiaEmissions();
  const root = useRef(null);
  const [p, setP] = useState(0); // 0 → 1 once, when the section arrives: counts the figure up and sweeps the years

  const totalGt = data.total / GT;
  const share = (data.total / data.worldTotal) * 100;
  const top = data.sectors[0] ? data.sectors[0].value : 1;
  const first = data.series[0].year;

  const chart = useMemo(() => {
    const last = data.series[data.series.length - 1];
    const peak = Math.max(...data.series.map((s) => s.total), ...PATHS.map((path) => Math.max(...Array.from({ length: 41 }, (_, i) => shapeAt(i / 40, path))) * last.total));
    const yMax = Math.ceil((peak / GT) * 1.05);
    const x = (year) => M.l + ((year - first) / (NET_ZERO - first)) * (W - M.l - M.r);
    const y = (v) => M.t + (1 - v / GT / yMax) * (H - M.t - M.b);
    const history = data.series.map((s, i) => `${i ? 'L' : 'M'}${x(s.year).toFixed(1)} ${y(s.total).toFixed(1)}`).join(' ');
    const fan = PATHS.map((path) =>
      Array.from({ length: 61 }, (_, i) => {
        const t = i / 60;
        return `${i ? 'L' : 'M'}${x(last.year + t * (NET_ZERO - last.year)).toFixed(1)} ${y(shapeAt(t, path) * last.total).toFixed(1)}`;
      }).join(' '),
    );
    const ticks = [];
    for (let v = 0; v <= yMax; v++) ticks.push(v);
    return { x, y, history, fan, ticks, years: [first, 2030, 2040, 2050, 2060, NET_ZERO], last };
  }, [data.series, first]);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (still() || !('IntersectionObserver' in window)) {
      setP(1);
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / 4200);
        setP(k);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    io.observe(el.querySelector('.fp-grid'));
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const count = 1 - Math.pow(1 - Math.min(1, p * 3), 3); // the figure settles in the first third
  const sweep = p < 0.12 ? 0 : (p - 0.12) / 0.88; // then the years run
  const eased = sweep * sweep * (3 - 2 * sweep);
  const year = Math.round(first + eased * (NET_ZERO - first));
  const cursorX = chart.x(first + eased * (NET_ZERO - first));

  return (
    <section className={`wrap sec fp${p > 0 ? ' fp-in' : ''}`} ref={root} aria-labelledby="h-fp">
      <div className="hl rv">
        <span className="eyebrow">Where India stands</span>
        <h2 id="h-fp">India’s emissions today, <span className="teal">and the road to {NET_ZERO}.</span></h2>
        <div className="rule" aria-hidden="true" />
      </div>

      <div className="fp-grid">
        <div className="fp-copy rv">
          <p className="fp-total">
            <span className="fp-num">{(totalGt * count).toFixed(2)}</span>
            <span className="fp-unit">Gt CO<sub>2</sub>e</span>
          </p>
          <p className="fp-sub">
            Billion tonnes of greenhouse gases in {data.latestYear}, {share.toFixed(1)}% of the world’s total. That is about{' '}
            {data.perPerson.india.toFixed(1)} tonnes for each person in India, against a world average of {data.perPerson.world.toFixed(1)}.
          </p>
          <ul className="fp-bars">
            {data.sectors.map((s, i) => (
              <li key={s.id} style={{ '--c': COLOURS[i % COLOURS.length], '--w': Math.max(1, (s.value / top) * 100) + '%', '--d': i * 0.06 + 's' }}>
                <span className="fp-bar-k">{s.label}</span>
                <span className="fp-bar-v">{(s.value / GT).toFixed(2)} Gt</span>
                <span className="fp-bar-t"><i /></span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="fp-chart rv">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`India’s emissions from ${first} to ${chart.last.year} in billion tonnes of CO₂e, followed by illustrative routes to net zero in ${NET_ZERO}`}>
            <defs>
              <clipPath id="fp-reveal"><rect x="0" y="0" width={cursorX} height={H} /></clipPath>
              <linearGradient id="fp-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e76f51" stopOpacity=".3" />
                <stop offset="1" stopColor="#e76f51" stopOpacity="0" />
              </linearGradient>
            </defs>
            {chart.ticks.map((v) => (
              <g key={v} className="fp-gridline">
                <line x1={M.l} x2={W - M.r} y1={chart.y(v * GT)} y2={chart.y(v * GT)} />
                <text x={M.l - 10} y={chart.y(v * GT) + 4} textAnchor="end">{v}</text>
              </g>
            ))}
            {chart.years.map((yr) => (
              <text key={yr} className="fp-xt" x={chart.x(yr)} y={H - 8} textAnchor="middle">{yr}</text>
            ))}
            <text className="fp-yl" x={M.l - 10} y={M.t - 12} textAnchor="end">Gt</text>
            {[2030, NET_ZERO].map((yr) => (
              <line key={yr} className={`fp-mile${year >= yr ? ' on' : ''}`} x1={chart.x(yr)} x2={chart.x(yr)} y1={M.t} y2={H - M.b} />
            ))}
            <g clipPath="url(#fp-reveal)">
              <path className="fp-area" d={`${chart.history} L${chart.x(chart.last.year).toFixed(1)} ${chart.y(0)} L${chart.x(first)} ${chart.y(0)} Z`} fill="url(#fp-area)" />
              {chart.fan.map((d, i) => <path key={i} className="fp-fan" d={d} />)}
              <path className="fp-hist" d={chart.history} />
              <circle className="fp-now" cx={chart.x(chart.last.year)} cy={chart.y(chart.last.total)} r="5.5" />
            </g>
            {p < 1 && <line className="fp-cursor" x1={cursorX} x2={cursorX} y1={M.t} y2={H - M.b} />}
            <circle className={`fp-zero${year >= NET_ZERO ? ' on' : ''}`} cx={chart.x(NET_ZERO)} cy={chart.y(0)} r="7" />
            <g className="fp-year" transform={`translate(${Math.min(W - M.r - 34, Math.max(M.l + 34, cursorX))} ${M.t - 14})`}>
              <rect x="-34" y="-22" width="68" height="26" rx="8" />
              <text textAnchor="middle" y="-4">{year}</text>
            </g>
          </svg>
          <figcaption>
            <span className="k hist">Measured, {first}–{chart.last.year}</span>
            <span className="k fan">Illustrative routes to net zero, not projections</span>
          </figcaption>
        </figure>
      </div>

      <ol className="fp-targets">
        {TARGETS.map((t) => (
          <li key={t.title} className={`card${year >= t.year ? ' on' : ''}${t.year === NET_ZERO ? ' end' : ''}`}>
            <span className="eyebrow c-teal">By {t.year}</span>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </li>
        ))}
      </ol>

      <p className="fp-source">
        Emissions: <a href={data.sourceUrl} target="_blank" rel="noopener">{data.source}</a>, greenhouse gases as CO₂e (100-year), excluding forestry and land use
        {data.live ? <> · <i className="fp-live" />live, retrieved {data.fetchedAt}</> : <> · retrieved {data.fetchedAt}</>}.
        {' '}Population: <a href={data.population.sourceUrl} target="_blank" rel="noopener">{data.population.source}</a> ({data.population.year}). Targets: India’s updated Nationally Determined Contribution (2022) and the National Green Hydrogen Mission (2023).
      </p>
    </section>
  );
};
