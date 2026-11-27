/**
 * V4 'News & Events' page.
 * Markup converted from the NZII Version 2 prototype (NZII_News_Events_Page.html); styles in ../styles/news-events.css.
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { galleryFor } from '../data/gallery';
import { UPCOMING } from '../data/upcoming';
import { usePageTitle, usePrototypeBehaviours } from '../hooks/usePrototypeBehaviours';
import { useEventDialogs, useYearFolding } from '../hooks/useNewsEvents';
import { useNewsMotion } from '../hooks/pageMotions';
import { NewsRail } from '../components/NewsRail';
import { Highlights } from '../components/Highlights';
import '../styles/news-events.css';
import '../styles/news-extras.css';

export const NewsEventsPage = () => {
  const root = useRef(null);
  usePrototypeBehaviours(root);
  usePageTitle('News & Events | Net Zero India Initiative');
  useEventDialogs(root);
  useYearFolding(root);
  useNewsMotion(root);

  return (
    <>
      <main id="content" ref={root}>
        <div className="container page">
          <section className="hero" id="overview">
            <div className="hero-text">
              <h1>News &amp; <span className="teal">Events</span></h1>
              <hr className="rule" />
            </div>
          </section>
          <Highlights />
          <section className="ev-sec" aria-labelledby="h-events">
            <h2 id="h-events" className="sr-only">Events</h2>
            <NewsRail rootRef={root} />
            <div className="ev-time">
            <section className="ev-year" aria-labelledby="y-2027">
              <h3 className="ev-y" id="y-2027">2027</h3>
              <ol className="ev-list">
              <li className="ev" id="2027-01-winter-school">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <span className="ev-flag up">Upcoming</span>
                    <p className="ev-meta">January 2027 · R&amp;I Park, IIT Delhi</p><h4>Winter School 2027: Nature-based Solutions for Resilience in a Warming World</h4>
                    <p className="ev-sum">A three-day residential Winter School on Nature-based Solutions at IIT Delhi, 11–13 January 2027, for postgraduate students, doctoral scholars and early-career researchers.</p>
                    <button type="button" className="ev-open" data-dialog="d-2027-01-winter-school" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              </ol>
            </section>
            <section className="ev-year" aria-labelledby="y-2026">
              <h3 className="ev-y" id="y-2026">2026</h3>
              <ol className="ev-list">
              <li className="ev" id="2026-11-cop31">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <span className="ev-flag">Latest</span>
                    <div className="ev-who"><img className="ev-face" src="/assets/people/pi-kaveri-iychettira.jpg" alt="Kaveri Iychettira" width="900" height="900" loading="lazy" /><div><p className="ev-meta">November 2026 · COP 31</p><h4>Kaveri Iychettira speaks at COP 31</h4></div></div>
                    <p className="ev-sum">Kaveri Iychettira, Principal Investigator of the Net Zero India Initiative, gave talks at COP 31. A fuller account will follow.</p>
                  </div>
                </article>
              </li>
              <li className="ev ev-feature" id="2026-09-nzx-princeton">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-media">
                  <figure className="ev-media"><img src="/assets/photos/events/2026-09-nzx.jpg" srcSet="/assets/photos/events/2026-09-nzx-sm.jpg 500w, /assets/photos/events/2026-09-nzx.jpg 1000w, /assets/photos/events/2026-09-nzx-xl.jpg 1600w" sizes="(max-width:999px) 92vw, 34vw" width="1000" height="667" alt="NZII researchers with colleagues at the Global Net Zero X workshop, Princeton University, September 2026" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure><div className="ev-txt">
                    <p className="ev-meta">September 2026 · Princeton University, United States</p><h4>NZII presents its development-compatible approach at Princeton’s NZx workshop</h4>
                    <p className="ev-sum">At Princeton, NZII shared its finding that most Indian energy scenarios give little attention to development, along with its participatory approach and early results.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-09-nzx-princeton" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2026-09-advisory-committee">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <p className="ev-meta">September 2026 · IIT Delhi (hybrid)</p><h4>Advisory Committee reviews NZII’s first Reference scenario results</h4>
                    <p className="ev-sum">NZII presented first Reference scenario results on how India’s energy demand, power supply and land-sector emissions could evolve to 2070, and asked how to close the emissions gap.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-09-advisory-committee" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2026-05-land-governance">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <p className="ev-meta">May 2026 · IIT Delhi</p><h4>Workshop asks how land for solar and wind can be governed fairly</h4>
                    <p className="ev-sum">Land recorded as “wasteland” often supports grazing and farming. Participants called for fairer ways to site solar and wind so the transition stays fast and just.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-05-land-governance" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2026-04-icef-report">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-badge">
                  <div className="ev-txt"><span className="ev-badge"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" loading="lazy" /></span>
                    <p className="ev-meta">April 2026</p><h4>NZII researchers lead the opening chapter of the ICEF report</h4>
                    <p className="ev-sum">IIT Delhi researchers wrote the opening chapter of a Schmidt Sciences report, arguing that India’s energy transition is as much social and economic as technological.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-04-icef-report" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2026-02-open-calls">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-badge">
                  <div className="ev-txt"><span className="ev-badge"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" loading="lazy" /></span>
                    <p className="ev-meta">February 2026</p><h4>NZII and Schmidt Sciences bring researchers to IIT Delhi through first round of open calls</h4>
                    <p className="ev-sum">Researchers selected through open calls with Schmidt Sciences will join NZII at IIT Delhi to study jobs, air pollution, forest carbon and the water, food and energy nexus.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-02-open-calls" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2026-01-anurag-gumber">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <div className="ev-who"><img className="ev-face" src="/assets/people/collab-anurag-gumber.jpg" alt="Anurag Gumber" width="900" height="900" loading="lazy" /><div><p className="ev-meta">January 2026 · IIT Delhi</p><h4>Anurag Gumber on how much capital India’s net-zero transition could need</h4></div></div>
                    <p className="ev-sum">HKUST’s Anurag Gumber showed how widely estimates of decarbonisation capital vary, and taught students to weigh investing in clean technology now against waiting.</p>
                    <button type="button" className="ev-open" data-dialog="d-2026-01-anurag-gumber" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              </ol>
            </section>
            <section className="ev-year" aria-labelledby="y-2025">
              <h3 className="ev-y" id="y-2025">2025</h3>
              <ol className="ev-list">
              <li className="ev" id="2025-12-macro-workshop">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <p className="ev-meta">December 2025 · IIT Delhi</p><h4>Hands-on training in Macro, a core model behind NZII’s energy pathways</h4>
                    <p className="ev-sum">Princeton researchers introduced Macro, a model NZII uses to explore how India’s energy system could evolve to 2070, and helped participants run it themselves.</p>
                    <button type="button" className="ev-open" data-dialog="d-2025-12-macro-workshop" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2025-11-narasimha-rao">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <div className="ev-who"><img className="ev-face" src="/assets/people/collab-narasimha-rao.jpg" alt="Narasimha Rao" width="900" height="900" loading="lazy" /><div><p className="ev-meta">November 2025 · IIT Delhi</p><h4>Narasimha Rao on judging the energy transition by people’s living standards</h4></div></div>
                    <p className="ev-sum">Yale’s Narasimha Rao explored how the energy transition can be judged by what it means for people’s living standards, not by emissions alone.</p>
                    <button type="button" className="ev-open" data-dialog="d-2025-11-narasimha-rao" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2025-10-chris-greig">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <p className="ev-meta">October 2025 · School of Public Policy, IIT Delhi</p><h4>Chris Greig on what it will take to deliver net-zero pledges</h4>
                    <p className="ev-sum">Princeton’s Chris Greig argued that net-zero pledges built on large-scale models miss systemic challenges that limit how fast the transition can move, and that delivering clean infrastructure needs a rethink.</p>
                    <button type="button" className="ev-open" data-dialog="d-2025-10-chris-greig" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2025-10-advisory-committee">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card">
                  <div className="ev-txt">
                    <p className="ev-meta">October 2025 · IIT Delhi</p><h4>Advisory Committee reviews NZII’s research plan and commitment to open data</h4>
                    <p className="ev-sum">NZII set out its research plan, committed to open models and data, and asked its Advisory Committee how to make the work count in policy and at COP.</p>
                    <button type="button" className="ev-open" data-dialog="d-2025-10-advisory-committee" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2025-01-conference">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-media">
                  <div className="ev-media ev-vids"><a className="ev-vid" href="https://youtu.be/leUxPr9g_5w" target="_blank" rel="noopener"><img src="/assets/photos/events/2025-01-conference-day1-portrait.jpg" srcSet="/assets/photos/events/2025-01-conference-day1-portrait-sm.jpg 450w, /assets/photos/events/2025-01-conference-day1-portrait.jpg 900w" sizes="(max-width:999px) 46vw, 17vw" width="900" height="900" alt="A speaker on Day 1 of the conference on India’s path to net zero, India Habitat Centre, New Delhi, January 2025" loading="lazy" /><span className="ev-play"><span className="ev-play-ic" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>Watch Day 1<span className="sr-only"> (opens in a new tab)</span></span></a><a className="ev-vid" href="https://youtu.be/3Y0-CJzP-_g" target="_blank" rel="noopener"><img src="/assets/photos/events/2025-01-conference-day2-portrait.jpg" srcSet="/assets/photos/events/2025-01-conference-day2-portrait-sm.jpg 450w, /assets/photos/events/2025-01-conference-day2-portrait.jpg 900w" sizes="(max-width:999px) 46vw, 17vw" width="900" height="900" alt="A speaker on Day 2 of the conference on India’s path to net zero, India Habitat Centre, New Delhi, January 2025" loading="lazy" /><span className="ev-play"><span className="ev-play-ic" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>Watch Day 2<span className="sr-only"> (opens in a new tab)</span></span></a></div><div className="ev-txt">
                    <p className="ev-meta">January 2025 · India Habitat Centre, New Delhi</p><h4>Conference explores how India’s path to net zero can also serve development</h4>
                    <p className="ev-sum">Policymakers and researchers spent two days on the land, power, jobs and data questions that stand between India’s development goals and net zero.</p>
                    <button type="button" className="ev-open" data-dialog="d-2025-01-conference" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              </ol>
            </section>
            <section className="ev-year" aria-labelledby="y-2024">
              <h3 className="ev-y" id="y-2024">2024</h3>
              <ol className="ev-list">
              <li className="ev" id="2024-11-giving-green">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-badge">
                  <div className="ev-txt"><span className="ev-badge"><img src="/assets/logos/giving-green.webp" alt="Giving Green" loading="lazy" /></span>
                    <p className="ev-meta">November 2024</p><h4>Giving Green Fund backs research on development-compatible net zero for India</h4>
                    <p className="ev-sum">A Giving Green Fund grant supports IIT Delhi and Prayas research on how India can reach net zero by 2070 while meeting its development goals.</p>
                    <button type="button" className="ev-open" data-dialog="d-2024-11-giving-green" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2024-09-sector-workshops">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-media">
                  <figure className="ev-media"><img src="/assets/photos/events/2024-sector-urban.jpg" srcSet="/assets/photos/events/2024-sector-urban-sm.jpg 500w, /assets/photos/events/2024-sector-urban.jpg 1000w, /assets/photos/events/2024-sector-urban-xl.jpg 1600w" sizes="(max-width:999px) 92vw, 34vw" width="1000" height="667" alt="Participants at the NZII workshop on the future of India’s urbanisation, IIT Delhi, September 2024" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure><div className="ev-txt">
                    <p className="ev-meta">September to December 2024 · IIT Delhi</p><h4>Four sector workshops ground NZII’s scenarios in real-world constraints</h4>
                    <p className="ev-sum">Experts on cities, forests, industry and farming flagged where NZII’s scenarios meet practical limits, from gaps in urban policy implementation to the need for round-the-clock clean power.</p>
                    <button type="button" className="ev-open" data-dialog="d-2024-09-sector-workshops" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              <li className="ev" id="2024-07-launch">
                <span className="ev-node" aria-hidden="true"></span>
                <article className="card ev-card has-media">
                  <figure className="ev-media"><img src="/assets/photos/events/2024-07-launch.jpg" srcSet="/assets/photos/events/2024-07-launch-sm.jpg 500w, /assets/photos/events/2024-07-launch.jpg 1000w, /assets/photos/events/2024-07-launch-xl.jpg 1600w" sizes="(max-width:999px) 92vw, 34vw" width="1000" height="667" alt="Participants at the launch and scenarios workshop of the Net Zero India Initiative, IIT Delhi, July 2024" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure><div className="ev-txt">
                    <p className="ev-meta">July 2024 · IIT Delhi</p><h4>Net Zero India Initiative launches by mapping the forces shaping India’s path to 2070</h4>
                    <p className="ev-sum">Forty-five stakeholders ranked low-cost finance, global cooperation and the pace of innovation among the forces that could most shape India’s path to 2070.</p>
                    <button type="button" className="ev-open" data-dialog="d-2024-07-launch" aria-haspopup="dialog">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                  </div>
                </article>
              </li>
              </ol>
            </section>
            </div>
          </section>
        </div>
      <dialog className="evd" id="d-2027-01-winter-school" aria-labelledby="dt-2027-01-winter-school" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">11–13 January 2027 · R&amp;I Park, IIT Delhi</p><h2 id="dt-2027-01-winter-school">Winter School 2027: Nature-based Solutions for Resilience in a Warming World</h2>
            <p className="evd-sum">A three-day residential Winter School on Nature-based Solutions at IIT Delhi, 11–13 January 2027, for postgraduate students, doctoral scholars and early-career researchers.</p>
            <p className="evd-body">IIT Delhi, with Schmidt Sciences under the Research Frontier Networks programme and as part of the Net Zero India Initiative, is organising a three-day residential, interdisciplinary Winter School on Nature-based Solutions (NbS). It brings together perspectives from climate change, ecology, geospatial science, socio-ecological systems and public policy to examine the growing role of Nature-based Solutions in addressing interconnected environmental and societal challenges.</p>
            <p className="evd-body">Day 1 covers the concepts, evolution and principles of NbS, global frameworks and socio-ecological resilience. Day 2 turns to spatial thinking and Earth Observation, landscapes and ecosystems, and evidence for decision-making. Day 3 looks at benefits and trade-offs, governance, finance and incentives, and translating evidence into policy and scaling NbS.</p>
            <p className="evd-body">The experts are Dr. Emmanuelle Cohen-Shacham, Dr. Parth Sarathi Roy, Dr. Shalini Dhyani (CSIR-NEERI) and Dr. Rajarshi Dasgupta (School of Public Policy, IIT Delhi). The Winter School is open to postgraduate students, doctoral scholars and early-career researchers; seats are limited and only shortlisted candidates are invited. Applications closed on 15 November 2026, with participants selected by 30 November 2026.</p>
            <a className="evd-flyer" href={UPCOMING.pdf} target="_blank" rel="noopener"><img src={UPCOMING.flyer} width="1400" height="2027" loading="lazy" alt="Flyer: Winter School 2027, Nature-based Solutions for Resilience in a Warming World, 11–13 January 2027, R&I Park, IIT Delhi. Organised by the School of Public Policy, IIT Delhi, funded by Schmidt Sciences." /><span className="sr-only"> (opens the flyer as a PDF in a new tab)</span></a>
            <p className="evd-links"><a href={UPCOMING.pdf} target="_blank" rel="noopener">Flyer (PDF)<span className="sr-only"> (opens in a new tab)</span></a><a href="https://spp.iitd.ac.in/news" target="_blank" rel="noopener">School of Public Policy notice<span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2024-07-launch" aria-labelledby="dt-2024-07-launch" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <figure className="evd-pic"><img src="/assets/photos/events/2024-07-launch.jpg" srcSet="/assets/photos/events/2024-07-launch-sm.jpg 500w, /assets/photos/events/2024-07-launch.jpg 1000w, /assets/photos/events/2024-07-launch-xl.jpg 1600w" sizes="(max-width:820px) 100vw, 760px" width="1000" height="667" alt="Participants at the launch and scenarios workshop of the Net Zero India Initiative, IIT Delhi, July 2024" loading="lazy" /></figure><div className="evd-txt">
            <p className="ev-meta">July 2024 · IIT Delhi</p><h2 id="dt-2024-07-launch">Net Zero India Initiative launches by mapping the forces shaping India’s path to 2070</h2>
            <p className="evd-sum">Forty-five stakeholders ranked low-cost finance, global cooperation and the pace of innovation among the forces that could most shape India’s path to 2070.</p>
            <p className="evd-body">The Net Zero India Initiative (NZII) began with a launch and scenarios workshop that brought together 45 participants from government, industry, academia and civil society. Organisations represented included CEA, Grid India, IRENA, TERI and Yale University. Participants identified the factors that could most shape India’s development and mitigation pathways to 2070, then ranked them by impact and uncertainty. Five stood out: access to low-cost finance, global and domestic cooperation, shifts in consumer behaviour, the pace of technological innovation, and the variability and severity of climate change. These insights became the starting point for NZII’s scenarios.</p>
            <p className="evd-links"><Link to={`/v4/gallery#${galleryFor('2024-07-launch')}`}>Photos in the gallery</Link></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2024-09-sector-workshops" aria-labelledby="dt-2024-09-sector-workshops" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <figure className="evd-pic"><img src="/assets/photos/events/2024-sector-urban.jpg" srcSet="/assets/photos/events/2024-sector-urban-sm.jpg 500w, /assets/photos/events/2024-sector-urban.jpg 1000w, /assets/photos/events/2024-sector-urban-xl.jpg 1600w" sizes="(max-width:820px) 100vw, 760px" width="1000" height="667" alt="Participants at the NZII workshop on the future of India’s urbanisation, IIT Delhi, September 2024" loading="lazy" /></figure><div className="evd-txt">
            <p className="ev-meta">September to December 2024 · IIT Delhi</p><h2 id="dt-2024-09-sector-workshops">Four sector workshops ground NZII’s scenarios in real-world constraints</h2>
            <p className="evd-sum">Experts on cities, forests, industry and farming flagged where NZII’s scenarios meet practical limits, from gaps in urban policy implementation to the need for round-the-clock clean power.</p>
            <p className="evd-body">To ground its scenarios in the realities of individual sectors, NZII held four workshops with 65 experts from government, industry, academia and civil society. They covered the future of India’s urbanisation (September) and forests (October), emerging technologies for decarbonising steel, cement and petrochemicals (December), and the future of agriculture (December). Participants included NDMA, WRI India, The Nature Conservancy India, Jindal Steel and IOCL. Urban experts flagged gaps between policy and implementation in city governments. Industry experts expected steel and cement demand to keep rising, and saw efficiency, renewable power and recycling as the most realistic near-term routes to cutting emissions. Their inputs shaped NZII’s sector-level scenario narratives.</p>
            <p className="evd-links"><Link to={`/v4/gallery#${galleryFor('2024-09-sector-workshops')}`}>Photos in the gallery</Link></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2024-11-giving-green" aria-labelledby="dt-2024-11-giving-green" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt"><span className="ev-badge evd-badge"><img src="/assets/logos/giving-green.webp" alt="Giving Green" /></span>
            <p className="ev-meta">November 2024</p><h2 id="dt-2024-11-giving-green">Giving Green Fund backs research on development-compatible net zero for India</h2>
            <p className="evd-sum">A Giving Green Fund grant supports IIT Delhi and Prayas research on how India can reach net zero by 2070 while meeting its development goals.</p>
            <p className="evd-body">Prof. <a className="ev-person" href="https://scholar.google.com/citations?user=0yQF0u8AAAAJ&hl=en" target="_blank" rel="noopener">Kaveri Iychettira<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> and Prof. <a className="ev-person" href="https://scholar.google.com/citations?user=KfcluxcAAAAJ&hl=en" target="_blank" rel="noopener">Rajarshi Dasgupta<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> of the School of Public Policy, IIT Delhi, received the Giving Green Fund for 2024-25. The grant, made jointly with Prayas (Energy Group), supports research on development-compatible pathways for India to reach net-zero emissions by 2070. Working with Princeton University, the consortium aims to help central and state governments, the private sector and communities understand what economy-wide net zero would take, and what it would mean for development and sustainability.</p>
            <p className="ev-links"><a className="ev-link" href="https://www.givinggreen.earth/mitigation-research/prayas-and-iit-delhi" target="_blank" rel="noopener">Read more on Giving Green <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2025-01-conference" aria-labelledby="dt-2025-01-conference" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-pic evd-vids"><a className="ev-vid" href="https://youtu.be/leUxPr9g_5w" target="_blank" rel="noopener"><img src="/assets/photos/events/2025-01-conference-day1-portrait.jpg" srcSet="/assets/photos/events/2025-01-conference-day1-portrait-sm.jpg 450w, /assets/photos/events/2025-01-conference-day1-portrait.jpg 900w" sizes="(max-width:820px) 50vw, 380px" width="900" height="900" alt="A speaker on Day 1 of the conference on India’s path to net zero, India Habitat Centre, New Delhi, January 2025" loading="lazy" /><span className="ev-play"><span className="ev-play-ic" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>Watch Day 1<span className="sr-only"> (opens in a new tab)</span></span></a><a className="ev-vid" href="https://youtu.be/3Y0-CJzP-_g" target="_blank" rel="noopener"><img src="/assets/photos/events/2025-01-conference-day2-portrait.jpg" srcSet="/assets/photos/events/2025-01-conference-day2-portrait-sm.jpg 450w, /assets/photos/events/2025-01-conference-day2-portrait.jpg 900w" sizes="(max-width:820px) 50vw, 380px" width="900" height="900" alt="A speaker on Day 2 of the conference on India’s path to net zero, India Habitat Centre, New Delhi, January 2025" loading="lazy" /><span className="ev-play"><span className="ev-play-ic" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>Watch Day 2<span className="sr-only"> (opens in a new tab)</span></span></a></div><div className="evd-txt">
            <p className="ev-meta">January 2025 · India Habitat Centre, New Delhi</p><h2 id="dt-2025-01-conference">Conference explores how India’s path to net zero can also serve development</h2>
            <p className="evd-sum">Policymakers and researchers spent two days on the land, power, jobs and data questions that stand between India’s development goals and net zero.</p>
            <p className="evd-body">Organised by Prof. <a className="ev-person" href="https://scholar.google.com/citations?user=0yQF0u8AAAAJ&hl=en" target="_blank" rel="noopener">Kaveri Iychettira<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> and Prof. <a className="ev-person" href="https://scholar.google.com/citations?user=k8Lrh_4AAAAJ&hl=en" target="_blank" rel="noopener">Ambuj Sagar<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> of the School of Public Policy, IIT Delhi, with Schmidt Sciences, a two-day conference on India’s path to net zero brought together policymakers, researchers, industry experts and other stakeholders. Day 1 looked at the gap between development, mitigation and sustainability: land as a resource, the changing role of electricity distribution companies, and workforce transitions. Day 2 turned to modelling methods and data, equity and energy access, and the case for open data platforms and shared frameworks. TERI partnered on the event and hosted a third day, on finance, with its own invitations.</p>
            <p className="evd-links"><Link to={`/v4/gallery#${galleryFor('2025-01-conference')}`}>Photos and videos in the gallery</Link></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2025-10-advisory-committee" aria-labelledby="dt-2025-10-advisory-committee" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">October 2025 · IIT Delhi</p><h2 id="dt-2025-10-advisory-committee">Advisory Committee reviews NZII’s research plan and commitment to open data</h2>
            <p className="evd-sum">NZII set out its research plan, committed to open models and data, and asked its Advisory Committee how to make the work count in policy and at COP.</p>
            <p className="evd-body">NZII’s Advisory Committee met to review the initiative’s progress. The research team presented its four research questions, its scenarios and its plans to make NZII’s models and data openly available. The team sought the committee’s views on its methods, on building wider stakeholder engagement in and ownership of NZII, on the policy issues NZII’s work should feed into, and on planning for uptake at COP and other global platforms.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2025-10-chris-greig" aria-labelledby="dt-2025-10-chris-greig" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">October 2025 · School of Public Policy, IIT Delhi</p><h2 id="dt-2025-10-chris-greig">Chris Greig on what it will take to deliver net-zero pledges</h2>
            <p className="evd-sum">Princeton’s <a className="ev-person" href="https://scholar.google.com/citations?user=AxDVkNMAAAAJ&hl=en" target="_blank" rel="noopener">Chris Greig<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> argued that net-zero pledges built on large-scale models miss systemic challenges that limit how fast the transition can move, and that delivering clean infrastructure needs a rethink.</p>
            <p className="evd-body">Dr. <a className="ev-person" href="https://scholar.google.com/citations?user=AxDVkNMAAAAJ&hl=en" target="_blank" rel="noopener">Chris Greig<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, Senior Research Scientist at Princeton University’s Andlinger Center for Energy and the Environment and a principal investigator on NZII, gave a seminar titled “To achieve net-zero, we must confront three systemic failures.” Many countries and companies have pledged net zero by mid-century without detailed plans for getting there, relying instead on large-scale models. Dr. Greig argued that these models fail to capture systemic challenges that constrain the speed of the transition, and that delivering low-emissions infrastructure needs a fundamental rethink. He co-led Princeton’s Net-Zero America study and spent three decades in the private sector before moving to research.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2025-11-narasimha-rao" aria-labelledby="dt-2025-11-narasimha-rao" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <div className="evd-who"><img className="ev-face" src="/assets/people/collab-narasimha-rao.jpg" alt="Narasimha Rao" width="900" height="900" /><div><p className="ev-meta">November 2025 · IIT Delhi</p><h2 id="dt-2025-11-narasimha-rao">Narasimha Rao on judging the energy transition by people’s living standards</h2></div></div>
            <p className="evd-sum">Yale’s <a className="ev-person" href="https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en" target="_blank" rel="noopener">Narasimha Rao<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> explored how the energy transition can be judged by what it means for people’s living standards, not by emissions alone.</p>
            <p className="evd-body">Dr. <a className="ev-person" href="https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en" target="_blank" rel="noopener">Narasimha D. Rao<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, Professor of Energy Systems at the Yale School of the Environment, led a workshop and a seminar at NZII. The workshop on energy transitions covered the technology options for buildings, transport and industry, global progress on climate policy and national pledges, and questions of climate equity and fair effort from a Global South perspective. The seminar, “Quantifying Wellbeing in Sustainability Research,” explored how transitions can be judged by what they mean for people’s living standards, not by emissions alone. Dr. Rao also worked with the NZII team on its approach to energy demand modelling.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2025-12-macro-workshop" aria-labelledby="dt-2025-12-macro-workshop" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">December 2025 · IIT Delhi</p><h2 id="dt-2025-12-macro-workshop">Hands-on training in Macro, a core model behind NZII’s energy pathways</h2>
            <p className="evd-sum">Princeton researchers introduced Macro, a model NZII uses to explore how India’s energy system could evolve to 2070, and helped participants run it themselves.</p>
            <p className="evd-body">Macro, an energy system model developed at Princeton University’s ZERO Lab, led by Prof. <a className="ev-person" href="https://scholar.google.com/citations?user=iCJvalsAAAAJ&hl=en" target="_blank" rel="noopener">Jesse Jenkins<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, explores how energy infrastructure across sectors could be built and run at lowest cost. It is one of the core tools NZII uses to explore India’s pathways to net zero by 2070. At a workshop open to students, researchers and staff, <a className="ev-person" href="https://scholar.google.com/citations?user=-mUhRVkAAAAJ&hl=en" target="_blank" rel="noopener">Luca Bonaldo<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> of the ZERO Lab, and <a className="ev-person" href="https://scholar.google.com/citations?user=LfEPhqYAAAAJ&hl=en" target="_blank" rel="noopener">Andrew Pascale<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> and <a className="ev-person" href="https://scholar.google.com/citations?user=tg57FhcAAAAJ&hl=en" target="_blank" rel="noopener">Ganesh Hegde<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> of Princeton’s Andlinger Center, introduced the model with national, regional and sectoral examples such as steel, cement and aluminium. In the afternoon, participants installed and ran Macro on their own laptops.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-01-anurag-gumber" aria-labelledby="dt-2026-01-anurag-gumber" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <div className="evd-who"><img className="ev-face" src="/assets/people/collab-anurag-gumber.jpg" alt="Anurag Gumber" width="900" height="900" /><div><p className="ev-meta">January 2026 · IIT Delhi</p><h2 id="dt-2026-01-anurag-gumber">Anurag Gumber on how much capital India’s net-zero transition could need</h2></div></div>
            <p className="evd-sum">HKUST’s <a className="ev-person" href="https://scholar.google.com/citations?user=3Ys1yoAAAAAJ&hl=en" target="_blank" rel="noopener">Anurag Gumber<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> showed how widely estimates of decarbonisation capital vary, and taught students to weigh investing in clean technology now against waiting.</p>
            <p className="evd-body">How much investment India’s transition to net zero will need is still an open question. NZII hosted Dr. <a className="ev-person" href="https://scholar.google.com/citations?user=3Ys1yoAAAAAJ&hl=en" target="_blank" rel="noopener">Anurag Gumber<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, Assistant Professor of Climate Infrastructure and Finance at the Hong Kong University of Science and Technology (Guangzhou), for a seminar and two workshops. His seminar on China’s decarbonisation pathways showed how widely estimates of capital needs vary across models, and compared a renewables-led pathway with a nuclear-led one. The workshops taught students how to value the choice between investing in a low-carbon technology now and waiting for costs to fall. Capital allocation is one of the development outcomes NZII assesses across its pathways.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-02-open-calls" aria-labelledby="dt-2026-02-open-calls" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt"><span className="ev-badge evd-badge"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" /></span>
            <p className="ev-meta">February 2026</p><h2 id="dt-2026-02-open-calls">NZII and Schmidt Sciences bring researchers to IIT Delhi through first round of open calls</h2>
            <p className="evd-sum">Researchers selected through open calls with Schmidt Sciences will join NZII at IIT Delhi to study jobs, air pollution, forest carbon and the water, food and energy nexus.</p>
            <p className="evd-body">IIT Delhi partnered with Schmidt Sciences, under its Research Frontier Networks programme, to launch NZII’s first round of open calls for collaborative research. The calls invite researchers to help fill capacity gaps in four themes: employment shifts in the energy transition, energy infrastructure pathways and air pollution, India’s forest carbon, and the water, food and energy nexus. They received 21 applications, 19 of them eligible: seven each on air pollution and the nexus, four on employment and three on forest carbon. Researchers have now been selected and will spend time in residence at IIT Delhi, with work expected to begin in early 2027.</p>
            <p className="ev-links"><a className="ev-link" href="https://spp.iitd.ac.in/news/76" target="_blank" rel="noopener">Read the open call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-04-icef-report" aria-labelledby="dt-2026-04-icef-report" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt"><span className="ev-badge evd-badge"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" /></span>
            <p className="ev-meta">April 2026</p><h2 id="dt-2026-04-icef-report">NZII researchers lead the opening chapter of the ICEF report</h2>
            <p className="evd-sum">IIT Delhi researchers wrote the opening chapter of a Schmidt Sciences report, arguing that India’s energy transition is as much social and economic as technological.</p>
            <p className="evd-body">Researchers at IIT Delhi wrote the first chapter of India’s Climate and Energy Frontiers (ICEF), a Schmidt Sciences report built from seven conferences led by Indian institutions. The chapter, “Catalyzing Climate Transition Pathways in India for Development and Sustainability,” is by <a className="ev-person" href="https://scholar.google.com/citations?user=L6fD9DwAAAAJ&hl=en" target="_blank" rel="noopener">Dwarkeshwar Dutt<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, <a className="ev-person" href="https://scholar.google.com/citations?user=qQUpMk4AAAAJ&hl=en" target="_blank" rel="noopener">Medhavi Sandhani<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>, <a className="ev-person" href="https://scholar.google.com/citations?user=0yQF0u8AAAAJ&hl=en" target="_blank" rel="noopener">Kaveri Iychettira<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a> and <a className="ev-person" href="https://scholar.google.com/citations?user=k8Lrh_4AAAAJ&hl=en" target="_blank" rel="noopener">Ambuj Sagar<span className="sr-only"> (Google Scholar, opens in a new tab)</span></a>. It draws on the January 2025 conference that IIT Delhi hosted with Schmidt Sciences. Its central argument: the energy transition is not solely a technological shift but a deeply social and economic one. The chapter calls for India-specific models that can trace effects on jobs, land, local finances and communities. NZII’s work is designed to help address that gap.</p>
            <p className="ev-links"><a className="ev-link" href="https://www.schmidtsciences.org/icef/" target="_blank" rel="noopener">Read the ICEF report <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-05-land-governance" aria-labelledby="dt-2026-05-land-governance" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">May 2026 · IIT Delhi</p><h2 id="dt-2026-05-land-governance">Workshop asks how land for solar and wind can be governed fairly</h2>
            <p className="evd-sum">Land recorded as “wasteland” often supports grazing and farming. Participants called for fairer ways to site solar and wind so the transition stays fast and just.</p>
            <p className="evd-body">Solar and wind projects need large areas of land, and where they are built affects farms, forests, water and the communities who depend on them. A two-day workshop at IIT Delhi, held by the School of Public Policy with Landstack and Princeton University, brought together policymakers, researchers, investors and community representatives. Comparing the land models of six leading renewable energy states, participants noted that land recorded as “wasteland” often supports grazing, water access and rainfed farming. They called for mapping of commons, recognition of tenants and women farmers, and fair benefit-sharing, so that India’s renewable energy expansion stays fast and also just.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-09-advisory-committee" aria-labelledby="dt-2026-09-advisory-committee" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <div className="evd-txt">
            <p className="ev-meta">September 2026 · IIT Delhi (hybrid)</p><h2 id="dt-2026-09-advisory-committee">Advisory Committee reviews NZII’s first Reference scenario results</h2>
            <p className="evd-sum">NZII presented first Reference scenario results on how India’s energy demand, power supply and land-sector emissions could evolve to 2070, and asked how to close the emissions gap.</p>
            <p className="evd-body">At the Advisory Committee’s third meeting, held in a hybrid format alongside workshops on the research programme, the research team presented the first outputs from NZII’s Reference scenario, a baseline of how India’s energy demand, electricity supply and land-sector emissions could evolve to 2070 if current trends continue. Sector teams shared detailed results for energy supply, industry, transport, homes, agriculture, and land use and forests. The team sought the committee’s guidance on framing the results for policy audiences, on the credibility of the Reference scenario, and on how to close the remaining emissions gap.</p>
          </div>
        </div>
      </dialog>
      <dialog className="evd" id="d-2026-09-nzx-princeton" aria-labelledby="dt-2026-09-nzx-princeton" closedby="any">
        <div className="evd-in">
          <button type="button" className="evd-x" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
          <figure className="evd-pic"><img src="/assets/photos/events/2026-09-nzx.jpg" srcSet="/assets/photos/events/2026-09-nzx-sm.jpg 500w, /assets/photos/events/2026-09-nzx.jpg 1000w, /assets/photos/events/2026-09-nzx-xl.jpg 1600w" sizes="(max-width:820px) 100vw, 760px" width="1000" height="667" alt="NZII researchers with colleagues at the Global Net Zero X workshop, Princeton University, September 2026" loading="lazy" /></figure><div className="evd-txt">
            <p className="ev-meta">September 2026 · Princeton University, United States</p><h2 id="dt-2026-09-nzx-princeton">NZII presents its development-compatible approach at Princeton’s NZx workshop</h2>
            <p className="evd-sum">At Princeton, NZII shared its finding that most Indian energy scenarios give little attention to development, along with its participatory approach and early results.</p>
            <p className="evd-body">NZII researchers presented their work at the Global Net Zero X (NZx) workshop at Princeton University, which brought together teams from Princeton’s network of country-level net-zero studies. The network grew out of the Net-Zero America study and includes projects in Australia, China, Poland, Brazil and India. NZII shared why India needs a new kind of study: its review of Indian energy modelling studies found that most scenarios centre on mitigation and technology, with little attention to development or to stakeholders’ views. The team also presented its participatory approach to building scenarios and early results from its energy demand, electricity supply and land-sector models.</p>
            <p className="ev-links"><a className="ev-link" href="https://acee.princeton.edu/acee-news/the-ongoing-impact-of-princetons-net-zero-initiative/" target="_blank" rel="noopener">Read more from the Andlinger Center <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className="sr-only"> (opens in a new tab)</span></a></p>
            <p className="evd-links"><Link to={`/v4/gallery#${galleryFor('2026-09-nzx-princeton')}`}>Photos in the gallery</Link></p>
          </div>
        </div>
      </dialog>
      </main>
    </>
  );
};
