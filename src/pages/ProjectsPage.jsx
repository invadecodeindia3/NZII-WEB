import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  TrendingDown, 
  ArrowUpRight, 
  Calendar, 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Factory, 
  Car, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileText,
  DollarSign,
  Activity,
  Award,
  Globe2,
  Compass,
  FileSpreadsheet,
  Clock
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { ALL_ARTIFACTS } from '../data/artifactsData';
import confetti from 'canvas-confetti';

export const ProjectsPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const caseStudies = ALL_ARTIFACTS.filter(a => a.type === 'case-study');
  const researchArticles = ALL_ARTIFACTS.filter(a => a.type === 'article');

  const filteredArtifacts = ALL_ARTIFACTS.filter(item => {
    const matchTab = activeTab === 'all' || 
                     (activeTab === 'case-studies' && item.type === 'case-study') ||
                     (activeTab === 'articles' && item.type === 'article');
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.partner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const caseStudiesFaqs = [
    {
      q: "How are emissions reductions audited for these field pilots?",
      a: "Reductions are measured against verified Central Electricity Authority (CEA) baselines and direct continuous emission monitoring system (CEMS) stack data, audited by accredited third-party validation agencies."
    },
    {
      q: "Can other industrial enterprises replicate the Jamshedpur H2-DRI pilot?",
      a: "Yes. The complete engineering process flow diagram (PFD), electrolyzer sizing matrix, and gas preheating thermodynamic calculations are published as open-source engineering dossiers on each individual case study page."
    },
    {
      q: "What is the payback period for 1.2 MW MCS highway fast-charging plazas?",
      a: "Based on NH44 commercial freight traffic of 14,000 daily trucks, average CAPEX payback is 4.3 years at standard commercial electricity tariffs with solar-plus-storage peak shaving."
    },
    {
      q: "How do case study findings feed back into the national simulator?",
      a: "Empirical cost curves, electrolyzer efficiencies, and clinker substitution ratios measured in the field are automatically ingested to update our national marginal abatement cost curves (MACC)."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HERO HEADER (CENTER ALIGNED) ── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-20 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#050B14] text-white">
        
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 scale-105"
        >
          
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <BookOpen className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Field Pilots & Research Intelligence
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Field Case Studies & Perspectives
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Empirical deployment blueprints, commercial-scale pilot validations, and peer-reviewed technical analyses from the industrial frontlines of India’s energy transition.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Field Pilots Documented</span>
                <span className="text-2xl font-mono font-bold text-teal-light">4 Mega-Pilots</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Verified Abatement</span>
                <span className="text-2xl font-mono font-bold text-coral">6.9 Mt/yr</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Research Articles</span>
                <span className="text-2xl font-mono font-bold text-teal">3 Deep Dives</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: MACRO IMPACT SUMMARY STRIP (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-16 border-b border-black/10 dark:border-white/10 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Total Pilot Capex</span>
            <span className="text-2xl font-mono font-bold text-coral">$1.33 Billion</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Mobilized across 4 industrial states</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Direct Abatement</span>
            <span className="text-2xl font-mono font-bold text-teal">6.9 Million Tons</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>CO2e removed annually from baselines</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Clean Tech Parity</span>
            <span className="text-2xl font-mono font-bold text-emerald-500">&lt; 5 Years</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Average investment payback cycle</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Audit Provenance</span>
            <span className="text-2xl font-mono font-bold text-teal">100% CEMS</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Continuous telemetry verification</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SEARCH & TABS FILTER BAR (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] pt-12 space-y-8">
        <RevealOnScroll direction="up" delay={80}>
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm max-w-4xl mx-auto ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#101520] border-[#1D2636]'
          }`}>
            <div className="relative w-full sm:w-1/2">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-[#94A3B8]' : 'text-white/40'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies, partner facilities, locations..."
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                  isLight 
                    ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                    : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { key: 'all', label: 'All Artifacts (7)' },
                { key: 'case-studies', label: 'Case Studies (4)' },
                { key: 'articles', label: 'Research Articles (3)' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); playSound(480); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-teal text-white shadow-sm'
                      : isLight
                        ? 'bg-white border border-[#CBD5E1] text-[#334155] hover:border-teal'
                        : 'bg-[#18202E] border border-[#2B384E] text-white/70 hover:border-teal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── SECTION 4: CASE STUDIES & RESEARCH ARTICLES GRID (WITH DIRECT PAGE LINKS) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-12 border-b border-black/10 dark:border-white/10 space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredArtifacts.map((item, idx) => (
            <RevealOnScroll key={item.id} direction="up" delay={80 + (idx % 2) * 60}>
              <div className={`p-8 sm:p-10 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 shadow-sm ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] hover:border-teal hover:shadow-xl' 
                  : 'bg-[#101520] border-[#1D2636] hover:border-teal hover:bg-[#141A26] hover:shadow-2xl'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-teal uppercase tracking-wider px-2.5 py-1 rounded bg-teal/10 border border-teal/20">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-coral">
                      {item.co2eReduced}
                    </span>
                  </div>

                  <Link
                    to={`/case-studies/${item.id}`}
                    onClick={() => playSound(520)}
                    className="block group"
                  >
                    <h3 className={`font-manrope font-extrabold text-xl sm:text-2xl tracking-tight leading-snug transition-colors ${
                      isLight ? 'text-[#0F172A] group-hover:text-teal' : 'text-white group-hover:text-teal'
                    }`}>
                      {item.title}
                    </h3>
                  </Link>

                  <div className={`flex flex-wrap items-center gap-3 text-xs font-mono ${
                    isLight ? 'text-[#64748B]' : 'text-white/50'
                  }`}>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal" />
                      <span>{item.location}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-teal" />
                      <span>{item.partner}</span>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
                  }`}>
                    {item.summary}
                  </p>

                  <div className={`pt-4 border-t space-y-2 ${
                    isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                  }`}>
                    <span className="text-[10px] font-mono font-bold uppercase text-teal block">
                      Key Measured Outcomes
                    </span>
                    {item.results.slice(0, 2).map((res, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-manrope">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span className={isLight ? 'text-[#334155]' : 'text-white/85'}>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-6 mt-6 border-t flex items-center justify-between ${
                  isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                }`}>
                  <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/40'}`}>
                    CAPEX: {item.capex} • {item.readTime}
                  </span>
                  
                  {/* Renamed clean link reading case study / research article */}
                  <Link
                    to={`/case-studies/${item.id}`}
                    onClick={() => playSound(520)}
                    className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{item.type === 'case-study' ? 'Read Case Study' : 'Read Research Article'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: PILOT REPLICATION TOOLKIT (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <RevealOnScroll direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal">
              REPLICATION ARCHITECTURE
            </span>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              How Enterprises Scale Validated Pilots
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Each case study is accompanied by an open engineering package enabling plant operators and municipal utilities to replicate proven configurations.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1D2636]'}`}>
            <span className="font-mono text-xl font-bold text-teal block mb-2">01. Open PFD Diagrams</span>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Full process flow diagrams, heat exchange balances, and hydrogen injection schematics formatted for industrial engineers.
            </p>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1D2636]'}`}>
            <span className="font-mono text-xl font-bold text-teal block mb-2">02. CAPEX Financial Models</span>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Excel financial models containing debt-equity structures, concessionary loan terms, and carbon offset yield projections.
            </p>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#11151F] border-[#1D2636]'}`}>
            <span className="font-mono text-xl font-bold text-teal block mb-2">03. Vendor Sourcing Matrix</span>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Directory of domestic and international vendors for electrolyzers, LC3 calcination kilns, and megawatt charging dispensers.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Field Pilots & Methodology FAQs"
        subtitle="Addressing empirical audit protocols, replication parameters, and CEMS sensor integration"
        faqs={caseStudiesFaqs}
      />

      {/* ── SECTION 7: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="EMPIRICAL DECARBONIZATION PLATFORM"
        title="Explore National Emissions Across 1,400+ Industrial Facilities"
        subtitle="Access our Climate TRACE asset radar to inspect point-source emissions, facility trends, and optimized decarbonization pathways."
        primaryCtaText="Explore Spatial Emissions Radar"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
