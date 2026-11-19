/**
 * The Collaborate page's graphic: the initiative at the centre, the current collaborators around it, and one
 * open place in the circle for whoever is reading. Lines draw out from the centre and a small pulse travels
 * along each, towards NZII. Decorative: the collaborators are named in full further down the page.
 */
import React from 'react';

const W = 420;
const H = 400;
const C = { x: W / 2, y: H / 2 };
const RX = 152;
const RY = 144;
const RINGS = ['var(--coral)', 'var(--teal)', 'var(--lime)', 'var(--pink)'];

export const CollabNetwork = ({ people }) => {
  // the collaborators take every place but the top right, which is left open
  const slots = people.length + 1;
  const open = 1;
  const at = (k) => {
    const a = (-90 + (360 / slots) * k) * (Math.PI / 180);
    return { x: C.x + Math.cos(a) * RX, y: C.y + Math.sin(a) * RY };
  };
  const nodes = [];
  let p = 0;
  for (let k = 0; k < slots; k++) nodes.push({ k, ...at(k), person: k === open ? null : people[p++] });

  return (
    <figure className="cn" aria-label={`The Net Zero India Initiative with its ${people.length} collaborators around it, and an open place for a new collaborator`} role="img">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          {nodes.filter((n) => n.person).map((n) => (
            <clipPath key={n.k} id={`cn-clip-${n.k}`}><circle cx={n.x} cy={n.y} r="27" /></clipPath>
          ))}
        </defs>
        <ellipse className="cn-orbit" cx={C.x} cy={C.y} rx={RX} ry={RY} />
        {nodes.map((n) => (
          <g key={n.k} className={`cn-link${n.person ? '' : ' open'}`} style={{ '--i': n.k }}>
            <line x1={C.x} y1={C.y} x2={n.x} y2={n.y} pathLength="1" />
            {n.person && (
              <circle className="cn-pulse" r="3.2">
                <animateMotion dur={`${3.4 + (n.k % 3) * 0.6}s`} begin={`${1.6 + n.k * 0.35}s`} repeatCount="indefinite" path={`M${n.x} ${n.y} L${C.x} ${C.y}`} />
              </circle>
            )}
          </g>
        ))}
        {nodes.map((n) =>
          n.person ? (
            <g key={n.k} className="cn-node" style={{ '--i': n.k, '--ring': RINGS[n.k % RINGS.length] }}>
              <circle className="cn-ring" cx={n.x} cy={n.y} r="31.5" />
              <image href={n.person.photo} x={n.x - 27} y={n.y - 27} width="54" height="54" preserveAspectRatio="xMidYMid slice" clipPath={`url(#cn-clip-${n.k})`} />
            </g>
          ) : (
            <g key={n.k} className="cn-node you" style={{ '--i': n.k }}>
              <circle className="cn-you-halo" cx={n.x} cy={n.y} r="31.5" />
              <circle className="cn-you" cx={n.x} cy={n.y} r="27" />
              <path d={`M${n.x - 9} ${n.y}h18M${n.x} ${n.y - 9}v18`} />
              <text x={n.x} y={n.y + 50} textAnchor="middle">You?</text>
            </g>
          ),
        )}
        <g className="cn-core">
          <circle className="halo" cx={C.x} cy={C.y} r="58" />
          <circle cx={C.x} cy={C.y} r="44" />
          <text x={C.x} y={C.y + 1} textAnchor="middle">NZII</text>
          <text className="sub" x={C.x} y={C.y + 17} textAnchor="middle">IIT DELHI</text>
        </g>
      </svg>
    </figure>
  );
};
