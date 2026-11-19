/**
 * V4 'Who we are' — one page with four parts: About NZII, NZII team, Collaborators and Funders.
 * Built from the NZII Version 2 prototype (NZII_Who_We_Are_Page.html). Names and links live in ../data/people.js.
 */
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CollaboratorCards } from '../components/CollaboratorCards';
import { PeopleIndiaMap } from '../components/PeopleIndiaMap';
import { useWhoMotion } from '../hooks/useWhoMotion';
import { ProfileLinks, TeamMember } from '../components/PeopleBits';
import { goToAnchor, spotlight } from '../utils/dom';
import { ADMIN, COLLABORATORS, CORE_PARTNERS, OPEN_CALLS_SITE, PAST, PIS, RESEARCHERS, personId } from '../data/people';
import { usePageTitle } from '../hooks/usePrototypeBehaviours';
import '../styles/who-we-are.css';
import '../styles/who-motion.css';

const PRINCIPLES = [
  { c: 'teal', title: 'Rigorous', text: 'Research designed to withstand scrutiny.' },
  { c: 'lime', title: 'Independent', text: 'NZII does not advocate for a predetermined pathway.' },
  { c: 'coral', title: 'Collaborative', text: 'We work across institutions, disciplines and stakeholder groups.' },
  { c: 'pink', title: 'Open', text: 'We aim to make research, methods, models and data increasingly accessible.' },
];

// Placeholder photographs from NZII convenings (to be reviewed with the imagery guidelines).
const STRIP = [
  { file: 'strip-launch-22', alt: 'Participants at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
  { file: 'strip-launch-16', alt: 'Discussion at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
  { file: 'strip-agri-05', alt: 'An NZII workshop on agriculture, IIT Delhi, December 2024' },
  { file: 'strip-launch-04', alt: 'Participants listening at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
];

export const WhoWeArePage = () => {
  const root = useRef(null);
  useWhoMotion(root);
  usePageTitle('Who we are | Net Zero India Initiative');
  const { hash, key } = useLocation();

  // A link to a section (#funders) or a person (#person-…) scrolls there; a person is highlighted.
  useEffect(() => {
    if (!hash) return undefined;
    const id = decodeURIComponent(hash.slice(1));
    const t = setTimeout(() => {
      const isPerson = id.startsWith('person-');
      goToAnchor(id, { flash: isPerson, block: isPerson ? 'center' : 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [hash, key]);

  return (
    <main id="content" ref={root}>
        <div className="container page">
          <div className="ww-part" id="about-nzii">
            <section className="hero" id="overview">
              <div className="hero-text">
                <h1>The people behind the <span className="teal">Net Zero India Initiative</span></h1>
                <hr className="rule" />
                <p className="lead">The Net Zero India Initiative is a research initiative led by the School of Public Policy, IIT Delhi, aimed at building rigorous, spatially detailed, and accessible evidence that can inform policy and enable more inclusive conversations about India’s&nbsp;transition.</p>
                <p className="lead">Started in 2024, the NZII comprises a diverse team of more than 30 researchers across 4&nbsp;institutions.</p>
                <p className="lead">We are continuously building collaborations to further this work across disciplinary boundaries.</p>
              </div>
              <PeopleIndiaMap />
            </section>

            <section className="section" id="principles">
              <h2>Our principles</h2>
              <ul className="p2">
                {PRINCIPLES.map((p) => (
                  <li key={p.title} style={{ '--c': `var(--${p.c})` }}><b>{p.title}</b><span>{p.text}</span></li>
                ))}
              </ul>
            </section>
          </div>

          <section className="ww-part" id="iit-delhi-team" aria-label="NZII team">
            <div className="hero ww-sub">
              <div className="hero-text">
                <h2 className="ww-h">NZII team</h2>
                <hr className="rule" />
                <p className="lead">A multidisciplinary team for a multidimensional&nbsp;challenge.</p>
              </div>
            </div>

            <section className="section" id="team">
              <h3 className="ww-subh">NZII Leadership</h3>
              <ul className="pis big ww-pis">
                {PIS.map((pi) => (
                  <li key={pi.name} className="card" id={personId(pi.name)} onPointerMove={spotlight}>
                    <img className="photo" src={pi.photo} alt="" loading="lazy" />
                    <span className="pi-txt">
                      <b>{pi.name}</b>
                      <span className="label">Principal Investigator</span>
                      <span className="muted">IIT&nbsp;Delhi</span>
                      <ProfileLinks person={pi} />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="team" id="iitd-team">
                <h3 className="ww-subh">IIT Delhi</h3>
                <div className="team-cols">
                  <div className="team-col research">
                    <h4 className="th">Researchers<span className="th-n" aria-label={`${RESEARCHERS.length} people`}>{RESEARCHERS.length}</span></h4>
                    <ul className="team-list cols-3">
                      {RESEARCHERS.map((p) => <TeamMember key={p.name} person={p} />)}
                    </ul>
                  </div>
                  <div className="team-col admin">
                    <h4 className="th">Admin and Communications team<span className="th-n" aria-label={`${ADMIN.length} people`}>{ADMIN.length}</span></h4>
                    <ul className="team-list cols-1">
                      {ADMIN.map((p) => <TeamMember key={p.name} person={p} />)}
                    </ul>
                  </div>
                </div>
                <details className="past">
                  <summary>Past researchers and collaborators</summary>
                  <ul className="team-list cols-4">
                    {PAST.map((p) => <TeamMember key={p.name} person={p} anchor={false} />)}
                  </ul>
                </details>
              </div>

              <div className="team" id="partner-teams">
                <h3 className="ww-subh">Core Partners</h3>
                <div className="team-cols orgs">
                  {CORE_PARTNERS.map((org) => (
                    <div key={org.key} className={`team-col org ${org.key}`}>
                      <span className="cp-logo"><img src={org.logo} alt="" width="160" height="60" loading="lazy" /></span>
                      <h3>{org.name}</h3>
                      <p className="cp-desc">{org.desc}</p>
                      <ul className="team-list cols-2">
                        {org.team.map((p) => <TeamMember key={p.name} person={p} />)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="ww-strip" tabIndex={0} role="region" aria-label="Photos from NZII convenings">
              {STRIP.map((ph) => (
                <figure key={ph.file} className="ww-photo">
                  <img
                    src={`/assets/photos/who/${ph.file}.jpg`}
                    srcSet={`/assets/photos/who/${ph.file}-sm.jpg 450w, /assets/photos/who/${ph.file}.jpg 900w`}
                    sizes="(max-width:820px) 74vw, 24vw"
                    width="900"
                    height="675"
                    alt={ph.alt}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </section>

          <section className="ww-part" id="partners-and-collaborators" aria-label="Collaborators">
            <div className="hero ww-sub">
              <div className="hero-text">
                <h2 className="ww-h">Collaborators</h2>
                <hr className="rule" />
                <p className="lead">The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the&nbsp;transition.</p>
              </div>
            </div>

            <section className="section" id="collaborators-sec">
              <h2 className="sr-only">Meet the collaborators</h2>
              <div id="collaborators">
                <div className="group current">
                  <CollaboratorCards people={COLLABORATORS} />
                </div>
              </div>
            </section>

            <section className="section" id="advisory">
              <h2>Advisory Committee</h2>
              <p className="adv-line">The Advisory Committee brings together experts and representatives from diverse stakeholder groups, including industry, policy, forestry, biodiversity and energy modelling, to provide multidisciplinary perspectives and strategic guidance to the initiative.</p>
            </section>
          </section>

          <section className="ww-part" id="funders" aria-label="Funders">
            <div className="hero ww-sub">
              <div className="hero-text">
                <h2 className="ww-h">Funders</h2>
                <hr className="rule" />
              </div>
            </div>

            <section className="section">
              <article className="ww-feature">
                <div className="ww-logo">
                  <img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" />
                  <span>Schmidt Sciences / AX programme</span>
                </div>
                <div className="ww-txt">
                  <h2>Research Frontier Networks by Schmidt&nbsp;Sciences</h2>
                  <p>The Schmidt Sciences Climate Center is funding Research Frontier Networks (RFNs), designed to cultivate regional talent and develop context-specific tools (e.g., regional databases, energy models, dashboards) that advance earth system research and inform energy and carbon transition pathways. Each RFN serves as an interdisciplinary, cross-sector research hub where academic institutes, research scientists, industry experts, and government representatives collaborate to address global climate challenges with solutions tailored to local needs. The RFN model targets national and sub-national scale research in the Global South, beginning in India with IIT Delhi as one hub, and expanding to other countries over time.</p>
                  <a className="btn" href={OPEN_CALLS_SITE} target="_blank" rel="noopener">
                    IIT Delhi – Schmidt Sciences Open Calls <span className="ar" aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </article>
              <ul className="sup-tiles ww-two">
                <li><span className="sup-logo"><img src="/assets/logos/giving-green.webp" alt="" /></span><span className="sup-name">Giving Green</span></li>
                <li><span className="sup-logo"><img src="/assets/logos/princeton-university.png" alt="" /></span><span className="sup-name">Princeton University</span></li>
              </ul>
            </section>
          </section>

          <section className="g1 ww-part" id="involved">
            <h2>Get involved</h2>
            <div className="rule" aria-hidden="true" />
            <div className="btns">
              <Link className="btn" to="/v4/research">Explore our research <span className="ar" aria-hidden="true">→</span></Link>
              <Link className="btn line" to="/v4/collaborate">Collaborate with us <span className="ar" aria-hidden="true">→</span></Link>
              <Link className="btn line" to="/v4/publications">Publications <span className="ar" aria-hidden="true">→</span></Link>
              <Link className="btn line" to="/v4/contact">Contact us <span className="ar" aria-hidden="true">→</span></Link>
            </div>
          </section>
        </div>
    </main>
  );
};
