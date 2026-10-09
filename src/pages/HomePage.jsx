import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sun,
  Factory,
  Car,
  Trees,
  Layers,
  Cpu,
  ArrowRight,
  Database,
  Radio,
  BarChart3,
  MapPin,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { NZIIGlassHero } from '../components/NZIIGlassHero';
import { InteractiveDecarbDial } from '../components/InteractiveDecarbDial';
import { SpatialEmissionsTerminal } from '../components/SpatialEmissionsTerminal';
import { BreakthroughTechPillars } from '../components/BreakthroughTechPillars';
import { AsymmetricCaseStudiesSection } from '../components/AsymmetricCaseStudiesSection';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { Footer } from '../components/Footer';

import { RESEARCH_THEMES } from '../data/researchThemes';
import { PUBLISHED_NEWS_EVENTS } from '../data/newsEvents';

export const HomePage = () => {
  const {
    levers,
    updateLever,
    calculatedEmissions,
    targetYear,
    reductionPercent,
    playSound,
    impactScore,
    theme,
    ecoMode
  } = useGame();

  const isLight = theme === 'light';

  // Dynamic counter ticker animation for Hero headline metric
  const [displayEmissions, setDisplayEmissions] = useState(calculatedEmissions);

  useEffect(() => {
    let start = displayEmissions;
    const end = calculatedEmissions;
    if (start === end || ecoMode) {
      setDisplayEmissions(end);
      return;
    }
    const diff = end - start;
    const step = diff > 0 ? 15 : -15;
    const timer = setInterval(() => {
      start += step;
      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        setDisplayEmissions(end);
        clearInterval(timer);
      } else {
        setDisplayEmissions(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [calculatedEmissions, ecoMode]);

  return (
    <div className={`w-full flex flex-col relative transition-colors duration-500 ${isLight ? 'bg-[#FFFFFF]' : 'bg-[#080808]'}`}>
      
      {/* ----------------------------------------------------
          SECTION 1: FIXED HERO (Pins to viewport behind flowing content)
         ---------------------------------------------------- */}
      <NZIIGlassHero />

      {/* Spacer matching viewport height */}
      <div className="w-full h-screen min-h-[760px] pointer-events-none"></div>

      {/* ----------------------------------------------------
          SCROLLING CONTENT: SECTION 2 HAS ROUNDED CORNERS (rounded-t-[36px] md:rounded-t-[48px])
          Flows seamlessly over the fixed Hero with clean white styling in Light mode
         ---------------------------------------------------- */}
      <div 
        className={`relative z-30 w-full rounded-t-[36px] md:rounded-t-[48px] overflow-hidden transition-colors duration-500 shadow-[0_-30px_70px_rgba(0,0,0,0.8)] ${
          isLight 
            ? 'bg-[#FFFFFF] text-[#0F172A]' 
            : 'bg-[#0E0E10] text-[#F1F5F9]'
        }`}
      >

<section className="px-[4vw] py-20 border-b border-white/10">
  <div className="max-w-7xl mx-auto">
    <p className="font-mono uppercase tracking-widest text-xs text-teal">NZII Research Agenda</p>
    <div className="flex flex-wrap justify-between gap-4 items-end mt-2 mb-8"><div><h2 className="font-manrope text-4xl sm:text-5xl font-extrabold tracking-tight">Nine disciplines. One connected future.</h2><p className="text-sm opacity-70 mt-4 max-w-3xl">Research across energy, land, livelihoods, finance, biodiversity, justice, mobility, modelling and FAIR data.</p></div>
      <Link to="/research" className="text-teal text-sm font-bold">All research themes →</Link></div>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{RESEARCH_THEMES.map((t,i)=><Link to={'/research/'+t.slug} key={t.slug} className="rounded-2xl border border-current/15 p-6 hover:border-teal transition-colors min-h-44 flex flex-col justify-between">
      <span className="text-teal font-mono text-xs">{String(i+1).padStart(2,'0')}</span><div><h3 className="text-xl font-manrope font-bold mt-4">{t.title}</h3><p className="text-sm opacity-65 mt-2">{t.short}</p></div></Link>)}</div>
  </div>
</section>
<section className="px-[4vw] py-16 border-b border-white/10"><div className="max-w-7xl mx-auto">
  <div className="flex justify-between flex-wrap gap-4 items-end"><div><p className="text-xs font-mono tracking-widest uppercase text-teal">News & Events</p><h2 className="font-manrope text-3xl font-bold mt-2">From the research community</h2></div>
   <Link to="/news-events" className="text-teal text-sm font-bold">Explore News & Events →</Link></div>
  {PUBLISHED_NEWS_EVENTS.length===0?<p className="text-sm opacity-65 mt-5">The six fictional example events below illustrate the intended editorial format. Actual event blurbs are being prepared.</p>:<div className="grid md:grid-cols-3 gap-4 mt-6">{PUBLISHED_NEWS_EVENTS.slice(0,3).map(e=><Link key={e.slug} to={'/news-events/'+e.slug} className="p-6 border border-current/15 rounded-xl hover:border-teal"><p className="text-teal text-xs uppercase">{e.fictional ? "FICTIONAL EXAMPLE" : e.type}</p><h3 className="font-bold mt-3">{e.title}</h3><p className="opacity-65 text-sm mt-2">{e.excerpt}</p></Link>)}</div>}
</div></section>
        {/* ----------------------------------------------------
            SECTION 3: REAL-TIME SPATIAL EMISSIONS OBSERVATORY & FACILITY RADAR
           ---------------------------------------------------- */}
        <SpatialEmissionsTerminal />

        {/* ----------------------------------------------------
            SECTION 4: SECTORAL FRONTLINES (Gamified Levers Grid)
           ---------------------------------------------------- */}
        <section 
          className={`w-full py-20 md:py-28 px-[3vw] relative overflow-hidden transition-colors duration-500 border-b ${
            isLight ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#0E0E10] border-[#1C1C22]'
          }`}
        >
          <div className="w-full max-w-[1720px] mx-auto">
            {/* Harmonized Center-Aligned Section Header */}
            <RevealOnScroll direction="up" delay={100}>
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/10 border border-teal/30">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                    National Action Matrix
                  </span>
                </div>
                <h2 
                  className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Six Key Decarbonization Frontlines
                </h2>
                <p 
                  className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                    isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'
                  }`}
                >
                  Click any frontline card to boost its policy lever (+10%) and watch the national model recalculate in real-time.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>Current Impact Score:</span>
                  <span className="px-3.5 py-1 rounded-full bg-teal/15 text-teal font-mono font-bold text-xs border border-teal/30">
                    {impactScore} PTS
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 relative z-10">
              {[
                {
                  title: 'Power & Grid Infrastructure',
                  icon: Sun,
                  stat: '68% of Total GHG',
                  target: 'Over 500GW Clean Power by 2030',
                  color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
                  actionKey: 'cleanGrid',
                  description: 'Phasing down unabated coal baseload, deploying round-the-clock solar & wind with multi-hour pumped hydro energy storage.'
                },
                {
                  title: 'Heavy Industry & Steelmaking',
                  icon: Factory,
                  stat: 'Hard-to-Abate 24%',
                  target: 'Green Hydrogen at $1/kg parity',
                  color: 'text-coral bg-coral/10 border-coral/20',
                  actionKey: 'industrialEff',
                  description: 'Transitioning blast furnaces to direct reduced iron (DRI) with hydrogen, carbon capture in cement, and secondary scrap recycling.'
                },
                {
                  title: 'Clean Mobility & Rail Freight',
                  icon: Car,
                  stat: 'Fastest Growing 14%',
                  target: '70% Electric Commercial Fleet',
                  color: 'text-teal bg-teal/10 border-teal/20',
                  actionKey: 'evAdoption',
                  description: '100% railway electrification, Dedicated Freight Corridors (DFC), heavy truck hydrogen corridors, and rapid 2W/3W/Bus battery EV shifts.'
                },
                {
                  title: 'Agri-Solar & Agroforestry Sinks',
                  icon: Trees,
                  stat: 'Biogenic GHG & Carbon Sink',
                  target: '3 Billion Ton CO2e Sink by 2030',
                  color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
                  actionKey: 'reforestation',
                  description: 'Precision nitrogen management, solarized agricultural pumps (PM-KUSUM), wetland conservation, and commercial agroforestry.'
                },
                {
                  title: 'Green Hydrogen & Derivatives',
                  icon: Layers,
                  stat: 'Cross-Sector Vector',
                  target: '5 MMT Annual Production by 2030',
                  color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
                  actionKey: 'greenH2',
                  description: 'National Green Hydrogen Mission mandate for ammonia fertilizers, refineries, and clean methanol for shipping.'
                },
                {
                  title: 'Smart Circular Economy & Waste',
                  icon: Cpu,
                  stat: 'Urban & Industrial Efficiency',
                  target: '35% Primary Material Replacement',
                  color: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
                  actionKey: 'gridModernization',
                  description: 'AI-driven grid load balancing, industrial symbiosis, scrap steel melting, and municipal solid waste biomethanation (CBG).'
                }
              ].map((sector, index) => {
                const currentVal = levers[sector.actionKey] || 0;
                return (
                  <RevealOnScroll 
                    key={sector.title} 
                    direction="up" 
                    delay={100 + index * 80}
                  >
                    <div
                      onClick={() => {
                        updateLever(sector.actionKey, Math.min(100, currentVal + 10));
                        playSound(580);
                        if (!ecoMode) {
                          confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
                        }
                      }}
                      className={`group p-7 2xl:p-9 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative overflow-hidden h-full ${
                        isLight
                          ? 'bg-[#F8FAFC] border border-[#E2E8F0] hover:border-teal hover:shadow-xl'
                          : 'bg-[#17171A] border border-[#27272D] hover:border-teal hover:bg-[#1C1C21] hover:shadow-2xl'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-2xl ${sector.color} border transition-transform group-hover:scale-110`}>
                            <sector.icon className="w-6 h-6" />
                          </div>
                          <span 
                            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                              isLight ? 'bg-[#E2E8F0] text-[#334155]' : 'bg-[#222228] text-[#A1A1AA]'
                            }`}
                          >
                            {sector.stat}
                          </span>
                        </div>
                        <div>
                          <h3 
                            className={`font-manrope font-bold text-lg 2xl:text-xl transition-colors ${
                              isLight 
                                ? 'text-[#0F172A] group-hover:text-teal' 
                                : 'text-white group-hover:text-teal'
                            }`}
                          >
                            {sector.title}
                          </h3>
                          <p 
                            className={`text-xs 2xl:text-sm mt-2 leading-relaxed ${
                              isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'
                            }`}
                          >
                            {sector.description}
                          </p>
                        </div>
                      </div>

                      <div 
                        className={`pt-6 mt-6 border-t space-y-2 ${
                          isLight ? 'border-[#E2E8F0]' : 'border-[#27272D]'
                        }`}
                      >
                        <div className="flex justify-between text-xs font-mono">
                          <span className={isLight ? 'text-[#64748B] font-medium' : 'text-[#71717A] font-medium'}>
                            Policy Level
                          </span>
                          <span className="font-bold text-teal">{currentVal}%</span>
                        </div>
                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-[#E2E8F0]' : 'bg-[#27272D]'}`}>
                          <div
                            className="h-full bg-teal transition-all duration-500 rounded-full"
                            style={{ width: `${currentVal}%` }}
                          ></div>
                        </div>
                        <div className={`text-[11px] font-mono pt-1 flex items-center justify-between ${isLight ? 'text-[#94A3B8]' : 'text-[#71717A]'}`}>
                          <span>Target: {sector.target}</span>
                          <span className="text-teal font-bold group-hover:underline">+10% Boost</span>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------
            SECTION 5: BREAKTHROUGH DEEP-TECH PILLARS
           ---------------------------------------------------- */}
        <RevealOnScroll direction="up" delay={150}>
          <BreakthroughTechPillars />
        </RevealOnScroll>

        {/* ----------------------------------------------------
            SECTION 6: ASYMMETRIC CONTRAST SECTION - BLOGS & FIELD CASE STUDIES
           ---------------------------------------------------- */}
        <AsymmetricCaseStudiesSection />

        {/* ----------------------------------------------------
            SECTION 7: FULL-VIEWPORT INTERACTIVE DECARBONIZATION CONSOLE
           ---------------------------------------------------- */}
        <section 
          className={`w-full py-20 md:py-28 px-[3vw] flex flex-col items-center justify-center transition-colors duration-500 border-b ${
            isLight ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#080808] border-[#1C1C22]'
          }`}
        >
          <RevealOnScroll direction="up" delay={100}>
            <div className="w-full max-w-2xl mx-auto text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/10 border border-teal/30">
                <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                  National Simulation Engine
                </span>
              </div>
              <h2 
                className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
                  isLight ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                Interactive Decarbonization Dial
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={200} className="w-full flex justify-center">
            <InteractiveDecarbDial displayEmissions={displayEmissions} />
          </RevealOnScroll>
        </section>

        {/* ----------------------------------------------------
            SECTION 8: CORE MODELING PILLARS
           ---------------------------------------------------- */}
        <section 
          className={`w-full py-20 md:py-28 px-[3vw] relative transition-colors duration-500 border-b ${
            isLight ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#121214] border-[#1C1C22]'
          }`}
        >
          <div className="w-full max-w-[1720px] mx-auto">
            <RevealOnScroll direction="up" delay={100}>
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/10 border border-teal/30">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                    Methodological Integrity
                  </span>
                </div>
                <h2 
                  className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Empirical Foundations of NZII
                </h2>
                <p 
                  className={`text-sm 2xl:text-base leading-relaxed ${
                    isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'
                  }`}
                >
                  Bridging academic climate science, macroeconomic equilibrium modeling, and bottom-up grid dispatch simulations.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Bottom-Up Sectoral Dispatch',
                  desc: 'Hourly 8,760-hour unit commitment models reflecting India’s seasonal monsoon wind shifts, solar diurnal patterns, and agricultural pumping loads.'
                },
                {
                  step: '02',
                  title: 'Just Transition & Livelihoods',
                  desc: 'Socioeconomic mapping across 54 coal-dependent districts in Jharkhand, Odisha, and Chhattisgarh, balancing worker re-skilling and regional revenue.'
                },
                {
                  step: '03',
                  title: 'Capital & Infrastructure Scaling',
                  desc: 'Granular CAPEX projections detailing $10.1 trillion in clean energy investments, transmission corridors, and battery manufacturing gigafactories.'
                }
              ].map((pillar, i) => (
                <RevealOnScroll 
                  key={pillar.step} 
                  direction="up" 
                  delay={120 + i * 120}
                >
                  <div
                    className={`p-8 2xl:p-10 rounded-3xl transition-all flex flex-col justify-between h-full ${
                      isLight
                        ? 'bg-[#F8FAFC] border border-[#E2E8F0] hover:border-teal hover:shadow-xl'
                        : 'bg-[#18181C] border border-[#27272D] hover:border-teal hover:bg-[#1E1E24] hover:shadow-2xl'
                    }`}
                  >
                    <div>
                      <span className="text-3xl 2xl:text-4xl font-mono font-bold text-teal/40 block mb-4">
                        {pillar.step}
                      </span>
                      <h3 
                        className={`font-manrope font-bold text-xl mb-3 ${
                          isLight ? 'text-[#0F172A]' : 'text-white'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p 
                        className={`text-xs 2xl:text-sm leading-relaxed ${
                          isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                    <div 
                      className={`pt-6 mt-6 border-t flex items-center justify-between ${
                        isLight ? 'border-[#E2E8F0]' : 'border-[#27272D]'
                      }`}
                    >
                      <span className={`text-xs font-mono ${isLight ? 'text-[#94A3B8]' : 'text-[#71717A]'}`}>
                        Audited by NZII
                      </span>
                      <ArrowRight className="w-4 h-4 text-teal" />
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------
            SECTION 9: INSTITUTIONAL CTA BANNER
           ---------------------------------------------------- */}
        <section 
          className={`w-full py-20 px-[3vw] relative transition-colors duration-500 ${
            isLight ? 'bg-[#FFFFFF]' : 'bg-[#080808]'
          }`}
        >
          <RevealOnScroll direction="up" delay={150}>
            <div 
              className={`w-full max-w-[1720px] mx-auto rounded-3xl p-10 md:p-16 2xl:p-20 text-center relative overflow-hidden shadow-2xl border ${
                isLight
                  ? 'bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white border-teal/40'
                  : 'bg-gradient-to-br from-[#18181C] via-[#202026] to-[#121215] text-white border-[#33333C]'
              }`}
            >
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="text-xs font-mono font-bold tracking-widest text-teal-light uppercase">
                  Interactive Decarbonization Sandbox
                </span>
                <h2 className="font-manrope font-extrabold text-3xl sm:text-5xl 2xl:text-6xl tracking-tight">
                  Model India’s 2070 Net-Zero Transition
                </h2>
                <p className="text-sm 2xl:text-base text-white/80 leading-relaxed font-light">
                  Stress-test grid stability, adjust sectoral levers, and simulate carbon emissions abatement in real time with our full interactive engine.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/simulator"
                    onClick={() => {
                      playSound(620);
                      if (!ecoMode) {
                        confetti({ particleCount: 50, spread: 70 });
                      }
                    }}
                    className="px-8 py-4 rounded-full bg-white text-[#0F172A] font-manrope font-bold text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3 cursor-pointer"
                  >
                    <span>Launch Pathway Sandbox</span>
                    <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </Link>
                  <Link
                    to="/research"
                    onClick={() => playSound(480)}
                    className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-manrope font-semibold text-sm border border-white/20 transition-all cursor-pointer"
                  >
                    Explore Research & Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Institutional Detailed Footer */}
        <RevealOnScroll direction="up" delay={80}>
          <Footer />
        </RevealOnScroll>
      </div>
    </div>
  );
};
