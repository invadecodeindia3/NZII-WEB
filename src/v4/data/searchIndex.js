// Everything the site search looks through: pages and their sections, people, news and events, and the open
// calls. People, calls and news come from their own data files, so the search follows them.
import { ADMIN, COLLABORATORS, CORE_PARTNERS, OPEN_CALLS, OPEN_CALLS_SITE, PAST, PIS, RESEARCHERS, personId } from './people';
import { NEWS } from './news';

const WHO = '/v4/who-we-are';
const person = (p, role, to) => ({ type: 'People', title: p.name, text: role || p.role || '', to });

const PAGES = [
  { title: 'Home', text: 'What will it take for India to reach net zero? Envisioning development-enhancing net-zero pathways for India. 2070 emissions pathways', to: '/v4' },
  { title: 'Who we are', text: 'The people behind the Net Zero India Initiative. School of Public Policy, IIT Delhi', to: WHO },
  { title: 'About NZII', text: 'Who we are. Principles: rigorous, independent, collaborative, open', to: `${WHO}#about-nzii` },
  { title: 'NZII team', text: 'Who we are. Leadership, principal investigators, researchers, admin and communications team, core partners', to: `${WHO}#iit-delhi-team` },
  { title: 'Collaborators', text: 'Who we are. Researchers and institutions working with NZII', to: `${WHO}#partners-and-collaborators` },
  { title: 'Advisory Committee', text: 'Who we are. Experts from industry, policy, forestry, biodiversity and energy modelling', to: `${WHO}#advisory` },
  { title: 'Funders', text: 'Who we are. Schmidt Sciences, Research Frontier Networks, RFN, Giving Green, Princeton University', to: `${WHO}#funders` },
  { title: 'Research', text: 'Research themes, models, energy, land, employment', to: '/v4/research' },
  { title: 'Publications', text: 'Papers, reports, working papers', to: '/v4/publications' },
  { title: 'News & Events', text: 'Workshops, talks, conferences, seminars, announcements', to: '/v4/news-events' },
  { title: 'Collaborate with us', text: 'Open calls for collaboration under RFNs, Schmidt Sciences, visiting researchers', to: '/v4/collaborate' },
  { title: 'Contact', text: 'Email, address, get in touch', to: '/v4/contact' },
  { title: 'Open Calls: overview', text: 'IIT Delhi – Schmidt Sciences Open Calls. Remuneration, honorarium, important dates', to: OPEN_CALLS_SITE, ext: true },
  { title: 'Open Calls: how to apply', text: 'Application steps, documents, research plan, CV, letter of recommendation, no objection certificate', to: `${OPEN_CALLS_SITE}#how-it-works`, ext: true },
  { title: 'Open Calls: FAQs', text: 'Frequently asked questions, eligibility, funding, selection', to: `${OPEN_CALLS_SITE}#faqs`, ext: true },
  { title: 'Open Calls: apply', text: 'Application form', to: `${OPEN_CALLS_SITE}#apply`, ext: true },
].map((p) => ({ type: 'Page', ...p }));

export const SEARCH_INDEX = [
  ...PAGES,
  ...OPEN_CALLS.calls.map((c) => ({ type: 'Open call', title: c.title, text: `Call ${c.no} · ${c.theme} · ${OPEN_CALLS.round} · stay ${c.stay}`, to: `${OPEN_CALLS_SITE}#call-${c.id}`, ext: true })),
  ...NEWS.map((n) => ({ type: 'News & Events', title: n.title, text: `${n.meta}. ${n.text}`, to: `/v4/news-events#${n.id}` })),
  ...PIS.map((p) => person(p, 'Principal Investigator, IIT Delhi', `${WHO}#${personId(p.name)}`)),
  ...RESEARCHERS.filter((p) => !p.alsoPi).map((p) => person(p, `${p.role}, IIT Delhi`, `${WHO}#${personId(p.name)}`)),
  ...ADMIN.map((p) => person(p, `${p.role}, IIT Delhi`, `${WHO}#${personId(p.name)}`)),
  ...CORE_PARTNERS.flatMap((org) => [
    { type: 'Partner', title: org.name, text: org.desc, to: `${WHO}#partner-teams` },
    ...org.team.map((p) => person(p, `${p.role ? p.role + ', ' : ''}${org.shortName || org.name}`, `${WHO}#${personId(p.name)}`)),
  ]),
  ...COLLABORATORS.map((p) => person(p, `Collaborator · ${p.role}`, `${WHO}#partners-and-collaborators`)),
  ...PAST.map((p) => person(p, `Past · ${p.role}`, `${WHO}#iitd-team`)),
];

const fold = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '');

/** Every word typed must appear; a match in the title counts for more than one in the text. */
export const search = (query, limit = 12) => {
  const words = fold(query).split(/[^a-z0-9]+/).filter(Boolean);
  if (!words.length) return [];
  return SEARCH_INDEX.map((item, i) => {
    const title = fold(item.title);
    const all = `${title} ${fold(item.text)} ${fold(item.type)}`;
    if (!words.every((w) => all.includes(w))) return null;
    const score = words.reduce((n, w) => n + (title.startsWith(w) ? 6 : title.includes(w) ? 4 : 1), 0);
    return { item, score, i };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((r) => r.item);
};
