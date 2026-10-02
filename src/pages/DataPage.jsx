import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ExternalLink, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  Globe2,
  FileSpreadsheet,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { Link } from 'react-router-dom';

export const DataPage = () => {
  const { playSound, theme } = useGame();
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const datasets = [
    {
      id: 'cea-hourly-generation-2025',
      title: 'CEA Hourly Grid Generation & Marginal Emissions Factors',
      category: 'Power & Grid',
      format: 'PARQUET / CSV',
      size: '240 MB',
      records: '8,760 Hours • 5 Regions',
      updated: 'Monthly Sync',
      tag: 'STATUTORY CEA',
      desc: 'Sub-hourly electricity generation telemetry across solar, wind, coal baseload, nuclear, and pumped hydro with marginal CO2e/MWh calculation factors for all 5 synchronous regional grids.'
    },
    {
      id: 'point-source-radar-1400',
      title: 'Spatial Point-Source Emissions Inventory: 1,400+ Facilities',
      category: 'Heavy Industry',
      format: 'GEOJSON / SHP',
      size: '85 MB',
      records: '1,420 Assets Mapped',
      updated: 'Sentinel-5P Aligned',
      tag: 'SATELLITE AUDIT',
      desc: 'Plant-level Scope 1 emissions, stack thermal coordinates, and historical combustion volumes for primary steelworks, cement kilns, and thermal power stations.'
    },
    {
      id: 'district-transition-coal-54',
      title: '54 Coal-Dependent Districts: Macro Socio-Economic Index',
      category: 'Just Transition',
      format: 'JSON / XLSX',
      size: '42 MB',
      records: '54 Districts • 360 Wards',
      updated: 'Quarterly',
      tag: 'SOCIO-ECONOMIC',
      desc: 'District Mineral Foundation (DMF) royalty distributions, formal and informal mining labor dependencies, and local renewable manufacturing employment multipliers.'
    },
    {
      id: 'macc-marginal-abatement-curves',
      title: 'Marginal Abatement Cost Curves (MACC) Parameter Matrix',
      category: 'Finance & Carbon',
      format: 'CSV / PYTHON DICT',
      size: '18 MB',
      records: '240 Sectoral Levers',
      updated: 'Annual Calibration',
      tag: 'MACC SOLVER',
      desc: 'Polynomial capital expenditure response surfaces, levelized hydrogen cost curves, and carbon shadow pricing matrices calibrated for national optimization algorithms.'
    }
  ];

  const dataFaqs = [
    {
      q: "How frequently is the CEA generation and emissions dataset updated?",
      a: "The Central Electricity Authority telemetry pipeline runs monthly automated reconciliations against regional load dispatch center (RLDC) logs and national grid settlement reports."
    },
    {
      q: "What license applies to datasets accessed from the portal?",
      a: "All datasets published by the NetZero India Initiative are released under the Creative Commons Attribution 4.0 International (CC-BY 4.0) license for public, academic, and commercial research."
    },
    {
      q: "Can researchers access the raw Gurobi and PyPSA model files?",
      a: "Yes. Model formulation code, constraint matrices, and unit-commitment scripts are hosted on our GitHub Open Science repository."
    },
    {
      q: "How are facility-level point source emissions verified?",
      a: "Emissions are cross-calibrated using direct continuous emission monitoring system (CEMS) telemetry, company annual disclosures, and Sentinel-5P TROPOMI satellite tropospheric NO2 observations."
    }
  ];

  const filteredDatasets = datasets.filter(ds => {
    const matchCat = activeCategory === 'all' || 
                     (activeCategory === 'power' && ds.category === 'Power & Grid') ||
                     (activeCategory === 'industry' && ds.category === 'Heavy Industry') ||
                     (activeCategory === 'transition' && ds.category === 'Just Transition') ||
                     (activeCategory === 'finance' && ds.category === 'Finance & Carbon');
    const matchSearch = ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ds.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ds.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

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
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video (1).mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <Database className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Open Science Data Repository
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              National Energy & Emissions Datasets
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Empirical hourly dispatch profiles, high-resolution geospatial facility coordinates, and district-level economic indicators published freely under CC-BY 4.0.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Records Index</span>
                <span className="text-2xl font-mono font-bold text-teal-light">4.8M Data Points</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Asset Registry</span>
                <span className="text-2xl font-mono font-bold text-coral">1,400+ Facilities</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: MACRO DATA SUMMARY STRIP (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-16 border-b border-black/10 dark:border-white/10 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Time Granularity</span>
            <span className="text-2xl font-mono font-bold text-teal">Sub-Hourly</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>8,760 annual dispatch intervals</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Geospatial Resolution</span>
            <span className="text-2xl font-mono font-bold text-coral">District Level</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>700+ administrative districts</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Audit Standard</span>
            <span className="text-2xl font-mono font-bold text-emerald-500">ISO 14064</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Statutory SEBI BRSR alignment</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Access Protocol</span>
            <span className="text-2xl font-mono font-bold text-teal">REST & GraphQL</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Open Science JSON endpoints</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SEARCH & FILTER BAR (CENTER ALIGNED) ── */}
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
                placeholder="Search datasets, formats, keywords..."
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                  isLight 
                    ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                    : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { key: 'all', label: 'All Datasets' },
                { key: 'power', label: 'Power & Grid' },
                { key: 'industry', label: 'Heavy Industry' },
                { key: 'transition', label: 'Just Transition' },
                { key: 'finance', label: 'Finance & MACC' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveCategory(tab.key); playSound(480); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.key
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

      {/* ── SECTION 4: DATASET CARDS (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-12 border-b border-black/10 dark:border-white/10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredDatasets.map((ds, i) => (
            <RevealOnScroll key={ds.id} direction="up" delay={80 + i * 60}>
              <div className={`p-8 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal hover:shadow-xl' 
                  : 'bg-[#101520] border-[#1D2636] shadow-md hover:border-teal hover:bg-[#141A26] hover:shadow-2xl'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-teal uppercase tracking-wider px-2.5 py-1 rounded bg-teal/10 border border-teal/20">
                      {ds.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-coral">
                      {ds.format}
                    </span>
                  </div>

                  <h3 className={`font-manrope font-extrabold text-xl tracking-tight leading-snug ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {ds.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
                  }`}>
                    {ds.desc}
                  </p>
                  
                  <div className={`flex items-center gap-3 text-xs font-mono mt-4 pt-4 border-t ${
                    isLight ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1D2636] text-white/50'
                  }`}>
                    <span>{ds.records}</span>
                    <span>•</span>
                    <span>{ds.size}</span>
                  </div>
                </div>

                <div className={`pt-5 mt-5 border-t flex items-center justify-between ${
                  isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                }`}>
                  <Link 
                    to="/simulator"
                    onClick={() => playSound(500)}
                    className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Simulate in Sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link 
                    to="/tools"
                    onClick={() => playSound(480)}
                    className={`text-xs font-manrope font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                      isLight ? 'text-[#334155] hover:text-teal' : 'text-white/70 hover:text-teal'
                    }`}
                  >
                    <span>Open in Tool Suite</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Open Science Data FAQs"
        subtitle="Clarifying our API access tiers, update cadences, and CEA verification protocols"
        faqs={dataFaqs}
      />

      {/* ── SECTION 6: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="OPEN SCIENCE ARCHIVE"
        title="Simulate National Energy Transitions in Real Time"
        subtitle="Our simulation models are open source under the CC-BY 4.0 license. Explore dispatch simulations and policy scenarios."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
