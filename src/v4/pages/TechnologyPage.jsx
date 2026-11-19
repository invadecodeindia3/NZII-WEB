import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const TechnologyPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Power Systems & Industrial Balancing',
      tag: 'ELECTROLYSIS & DISPATCH',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      description: 'Hour-by-hour dispatch modeling across national and state grids, evaluating renewable energy intermittency, storage requirements, and industrial electrification.',
      detail: 'Simulates 8,760 hours per year of grid dispatch across all 5 regional grids, resolving how green hydrogen, battery storage, and pumped hydro can replace thermal baseline generation.'
    },
    {
      num: '02',
      title: 'Spatial Leaching & Resource Downscaling',
      tag: 'SPATIAL RESOLUTION',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
      description: 'Downscaling national targets to 700+ districts, transmission corridors, river basins, and industrial clusters to detect physical bottlenecks before they emerge.',
      detail: 'Maps solar and wind power potential against agricultural land, water stress zones, and community rights, identifying least-conflict corridors for rapid deployment.'
    },
    {
      num: '03',
      title: 'Multi-System Development Coupling',
      tag: 'PRECIPITATION OF OUTCOMES',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      description: 'Connecting energy pathways with employment shifts, regional livelihoods, clean air gains, and macroeconomic investment flows.',
      detail: 'Ensures net-zero pathways expand human well-being, quantifying avoided air pollution deaths, regional coal transition requirements, and net job creation.'
    },
    {
      num: '04',
      title: 'Milestone & Policy Calibration',
      tag: 'HEATING & EXECUTION',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      description: 'Calibrating long-term 2070 targets back into concrete, actionable investment milestones for 2030, 2035, and 2047.',
      detail: 'Translates analytical findings into regulatory roadmaps, capital mobilization frameworks, and state policy briefs for immediate decision-making.'
    }
  ];

  const constraints = [
    {
      title: 'Chemical & Industrial Origin',
      desc: 'Nearly 45% of industrial emissions in cement and steel stem directly from chemical process reactions (such as limestone calcination) that cannot be eliminated by renewable power alone.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Not Solved by Fuel Switching',
      desc: 'Switching boilers to electricity or biomass does not address feedstocks. Solving deep decarbonization requires novel electrochemical pathways, green hydrogen, and carbon capture integration.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
      )
    },
    {
      title: 'Growing Proportion of Emissions',
      desc: 'As India’s passenger transport and urban electricity grids green rapidly, hard-to-abate industrial processes and agricultural emissions expand to over 65% of the residual footprint.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      title: 'Structural Spatial Constraints',
      desc: 'Solar and wind require 10-50x more land per MW than thermal plants. Land tenure, water scarcity, and state-level political economy make spatial planning the ultimate bottleneck.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    }
  ];

  const milestones = [
    {
      period: '2023 - 2024',
      title: 'Institutional Foundation at IIT Delhi',
      desc: 'Establishment of NZII Secretariat, constitution of National Advisory Committee, and development of multi-model integration protocols.'
    },
    {
      period: '2024 - 2025',
      title: 'Reference Scenario Formulation',
      desc: 'First baseline scenario modeling India’s energy demand, electricity supply, and land-sector emissions to 2070 presented to advisory leaders.'
    },
    {
      period: '2025 - 2026',
      title: 'Spatial Modeling & Consortium Expansion',
      desc: 'Downscaling to district-level land and transmission corridors in partnership with Princeton University’s NZx and leading Indian research bodies.'
    },
    {
      period: '2026 - 2030',
      title: 'State Roadmaps & Capital Mobilization',
      desc: 'Calibrated state implementation toolkits, industrial decarbonization pilots, and financial frameworks targeting India’s 2030 milestones.'
    }
  ];

  return (
    <div className="v4-root">
      {/* Background Architectural Grid Lines */}
      <div className="cura-line-grid" aria-hidden="true">
        <div className="cura-vertical-line"></div>
        <div className="cura-vertical-line hide-mobile"></div>
        <div className="cura-vertical-line hide-mobile"></div>
        <div className="cura-vertical-line"></div>
      </div>

      {/* 01 HERO SECTION */}
      <section className="cura-hero">
        <div className="cura-container">
          <div className="cura-hero-grid">
            <div>
              <div className="cura-pill is-orange">TECHNOLOGY &amp; SYSTEMS MODELING</div>
              <h1 className="cura-h1" style={{ marginBottom: '24px' }}>
                Electrochemical &amp; spatial modeling of India’s net-zero transition
              </h1>
              <p className="cura-lead" style={{ marginBottom: '36px' }}>
                NZII has engineered an integrated analytical architecture that targets decarbonization at the source: resolving energy supply, heavy industrial processes, and land-use systems.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a href="#how-it-works" className="cura-btn cura-btn-orange">
                  Explore Architecture ↓
                </a>
                <a href="#structural-constraints" className="cura-btn cura-btn-ghost">
                  Why Granular Modeling Matters
                </a>
              </div>
            </div>

            <div className="cura-hero-card">
              <img
                src="/assets/photos/12_Industry_Dec2024_photo1_room.jpg"
                alt="NZII Technology Research Group"
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(21, 19, 15, 0.95), transparent)'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange-soft)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  LABORATORY &amp; POLICY INTERFACE
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Decarbonization Systems Modeling Room • IIT Delhi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 TECHNOLOGY OVERVIEW / ABOUT */}
      <section className="cura-sec" id="overview">
        <div className="cura-container">
          <div className="cura-pill">TECHNOLOGY OVERVIEW</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
            <div>
              <h2 className="cura-h2" style={{ marginBottom: '24px' }}>
                Designed to remove transition bottlenecks at their source
              </h2>
              <h4 className="cura-h4" style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                NZII models the structural interactions between energy, heavy industry, land, and water — moving beyond high-level national averages.
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Traditional climate models often evaluate mitigation in isolation, missing the physical bottlenecks on the ground: electricity line congestion, district water stress, and the livelihood shifts of industrial workforces. Our analytical framework bridges macroeconomic ambition with spatial engineering reality.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--line-guide)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-orange)' }}>85%+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emissions Covered</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>700+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Districts Resolved</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-green-text)', background: 'var(--accent-green-bg)', display: 'inline-block', padding: '2px 8px', borderRadius: '4px' }}>2070</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Zero Milestone</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--line-strong)', aspectRatio: '16/11' }}>
              <img
                src="/assets/photos/12_Agriculture_Dec2024_photo1_room.jpg"
                alt="System Modeling Work"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 WHY PROCESS EMISSIONS DOMINATE / STRUCTURAL CONSTRAINTS */}
      <section className="cura-sec" id="structural-constraints">
        <div className="cura-container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
            <div className="cura-pill">STRUCTURAL CONSTRAINTS</div>
            <h2 className="cura-h2" style={{ marginBottom: '16px' }}>
              Why structural bottlenecks dominate India’s net-zero footprint
            </h2>
            <p className="cura-lead">
              Decarbonizing a fast-growing economy requires solving physical constraints that cannot be resolved through headline targets alone.
            </p>
          </div>

          <div className="cura-tech-grid">
            <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--line-card)' }}>
              <img
                src="/assets/photos/12_Urbanisation_Sep2024_photo2_group_exercise.jpg"
                alt="Analytical Working Session"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(21,19,15,0.95) 10%, transparent 60%)', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange-soft)', textTransform: 'uppercase' }}>
                  CRITICAL METRICS
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px' }}>
                  Industrial &amp; Spatial Decoupling
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Moving from national averages to local implementation pathways.
                </div>
              </div>
            </div>

            <div className="cura-tech-grid-cards">
              {constraints.map((c, i) => (
                <div key={i} className="cura-card">
                  <div className="cura-card-icon">
                    {c.icon}
                  </div>
                  <h4 className="cura-h4">{c.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 HOW IT WORKS (INTERACTIVE PROCESS PIPELINE) */}
      <section className="cura-sec" id="how-it-works">
        <div className="cura-container">
          <div className="cura-pill">HOW IT WORKS</div>
          <h2 className="cura-h2" style={{ marginBottom: '16px' }}>
            Addressing emissions at the source
          </h2>
          <p className="cura-lead" style={{ maxWidth: '720px', marginBottom: '50px' }}>
            NZII’s multi-layered analytical framework processes energy, industrial feedstock, spatial geography, and socio-economic indicators in a closed feedback loop.
          </p>

          <div className="cura-process-grid">
            <div>
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`cura-step-item ${activeStep === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="cura-step-num">{s.num} • {s.tag}</div>
                  <h3 className="cura-h3" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--line-strong)',
                borderRadius: '8px',
                padding: '40px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-orange-soft)' }}>
                    PHASE {steps[activeStep].num} ARCHITECTURE
                  </div>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(231,73,24,0.15)',
                    color: 'var(--accent-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {steps[activeStep].icon}
                  </div>
                </div>

                <h3 className="cura-h3" style={{ marginBottom: '16px', color: '#ffffff' }}>
                  {steps[activeStep].title}
                </h3>

                <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  {steps[activeStep].detail}
                </p>

                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderRadius: '6px',
                  border: '1px solid var(--line-guide)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    KEY MODELING OUTPUT
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Coupled optimization datasets feeding directly into the NZII Reference Scenario repository.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 PROPRIETARY SPOTLIGHT (NZII REFERENCE SCENARIO™) */}
      <section className="cura-sec">
        <div className="cura-container">
          <div className="cura-spotlight">
            <div style={{ maxWidth: '800px' }}>
              <div className="cura-pill is-dark">CORE MODELING ASSET</div>
              <h2 className="cura-h2" style={{ marginBottom: '20px' }}>
                NZII Reference Scenario™
              </h2>
              <p className="cura-lead" style={{ marginBottom: '32px' }}>
                A multi-model consensus baseline charting how India’s energy demand, electricity supply, and land-sector emissions could evolve to 2070 — presented to the NZII Advisory Committee.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link to="/v4/scenarios" className="cura-btn cura-btn-white">
                  Inspect Reference Results →
                </Link>
                <Link to="/v4/collaborate" className="cura-btn cura-btn-ghost">
                  Request Data Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 PROGRESS ROADMAP */}
      <section className="cura-sec" id="roadmap">
        <div className="cura-container">
          <div className="cura-pill">PROGRESS ROADMAP</div>
          <h2 className="cura-h2" style={{ marginBottom: '16px' }}>
            From analytical foundations to national deployment
          </h2>
          <p className="cura-lead" style={{ maxWidth: '720px', marginBottom: '50px' }}>
            NZII is advancing its analytical pipeline through staged milestones: from laboratory proof and multi-model consensus to state-level pilot implementation.
          </p>

          <div className="cura-roadmap-track">
            {milestones.map((m, idx) => (
              <div key={idx} className="cura-milestone">
                <div>
                  <div className="cura-milestone-year">{m.period}</div>
                  <h4 className="cura-h4" style={{ marginBottom: '12px' }}>{m.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </div>
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--line-card)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: idx <= 2 ? 'var(--accent-orange)' : 'var(--text-muted)' }}></div>
                  {idx <= 2 ? 'Completed / Active' : 'Target Milestone'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 ECOSYSTEM & COLLABORATORS */}
      <section className="cura-sec" id="collaborators">
        <div className="cura-container">
          <div className="cura-pill">THE NZII ECOSYSTEM</div>
          <h2 className="cura-h2" style={{ marginBottom: '16px' }}>
            Partners &amp; Collaborators
          </h2>
          <p className="cura-lead" style={{ maxWidth: '700px', marginBottom: '40px' }}>
            NZII works alongside premier academic institutions, independent research groups, and policy stakeholders to validate modeling pathways.
          </p>

          <div className="cura-partner-strip">
            <img src="/assets/logos/spp-iit-delhi.png" alt="IIT Delhi" className="cura-partner-logo" />
            <img src="/assets/logos/princeton-university.png" alt="Princeton University" className="cura-partner-logo" />
            <img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" className="cura-partner-logo" />
            <img src="/assets/logos/prayas-energy-group.png" alt="Prayas Energy Group" className="cura-partner-logo" />
            <img src="/assets/logos/giving-green.webp" alt="Giving Green" className="cura-partner-logo" />
          </div>
        </div>
      </section>

      {/* 08 FINAL CTA */}
      <section className="cura-final-cta">
        <div className="cura-container">
          <div className="cura-final-cta-in">
            <div className="cura-pill is-orange">GET INVOLVED</div>
            <h2 className="cura-h2">
              An upstream, systemic approach to India’s decarbonization
            </h2>
            <p className="cura-lead">
              NZII is building practical analytical pathways for decision-makers this decade — without losing sight of human development, economic growth, and regional equity.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <Link to="/v4/collaborate" className="cura-btn cura-btn-orange">
                Speak with our research team →
              </Link>
              <Link to="/v4/scenarios" className="cura-btn cura-btn-ghost">
                Explore Reference Scenarios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
