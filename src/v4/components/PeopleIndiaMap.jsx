/**
 * The 'Who we are' hero graphic: the dotted India from the NZII logo.
 * The dots bloom into place in a quick, soft wave that spreads out from Delhi (about a second in all), then
 * breathe very gently; a slow ripple spreads from Delhi, where the initiative is led. Purely decorative.
 * (It replaces the square dot field, PeopleDots, which is kept in this folder.)
 */
import React, { useMemo } from 'react';
import { INDIA_COLOURS, INDIA_DOTS, INDIA_H, INDIA_W } from '../data/indiaDots';

const DELHI = { x: 372, y: 318 }; // roughly where Delhi sits in the logo's map box
const PAD = 70;
const FURTHEST = 820; // distance from Delhi to the far corner of the map, for the timing of the wave

const rng = (seed) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

export const PeopleIndiaMap = () => {
  const dots = useMemo(() => {
    const rnd = rng(31);
    return INDIA_DOTS.map(([x, y, r, c], i) => ({
      i, x: x + PAD, y: y + PAD, r, fill: INDIA_COLOURS[c], navy: INDIA_COLOURS[c] === '#213b5f',
      // each dot appears where it belongs; the further from Delhi, the (slightly) later
      delay: (0.1 + (Math.hypot(x - DELHI.x, y - DELHI.y) / FURTHEST) * 0.75).toFixed(2),
      breathe: (6 + rnd() * 6).toFixed(1), phase: (rnd() * 6).toFixed(1),
    }));
  }, []);

  return (
    <div className="pdots-wrap im-wrap">
      <svg className="im" viewBox={`0 0 ${INDIA_W + PAD * 2} ${INDIA_H + PAD * 2}`} role="img" aria-label="India, drawn in the dots of the Net Zero India Initiative logo">
        <g className="im-ripples">
          <circle cx={DELHI.x + PAD} cy={DELHI.y + PAD} r="560" />
          <circle cx={DELHI.x + PAD} cy={DELHI.y + PAD} r="560" />
        </g>
        {dots.map((d) => (
          <g key={d.i} className="im-g" style={{ '--d': d.delay + 's', '--b': d.breathe + 's', '--ph': '-' + d.phase + 's' }}>
            <circle className={`im-c${d.navy ? ' navy' : ''}`} cx={d.x} cy={d.y} r={d.r} fill={d.fill} />
          </g>
        ))}
      </svg>
    </div>
  );
};
