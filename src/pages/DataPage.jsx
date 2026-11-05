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
import { SOURCE_CATALOG } from '../data/sourceCatalog';

export const DataPage = () => {
  const { playSound, theme } = useGame();
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // A source registry is not an inventory of ingested or audited datasets.
  const datasets = SOURCE_CATALOG;
  const dataFaqs = [
    { q: 'Is every source already ingested?', a: 'No. This catalogue identifies independent publishers, not completed ingestions. Datasets are public only after licensing checks, provenance, quality assurance and reviewer approval.' },
    { q: 'Does NZII supply any of this data?', a: 'No. The sources here are published independently of NZII. We retain each primary-source URL and its original licensing requirements.' },
    { q: 'Can I download national datasets?', a: 'Open an official publisher link to find available datasets. Locally hosted files and API results are enabled only after ingestion and scientific review.' },
    { q: 'Are simulations already research-grade?', a: 'No. The current browser scenarios are demonstrative. Research-grade models require documented equations, test datasets, uncertainty assessment, baseline comparisons and expert approval.' }
  ];

  const filteredDatasets = datasets.filter(ds => {
    const matchCat = activeCategory === 'all' || ds.categoryKey === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    return matchCat && [ds.title, ds.desc, ds.tag, ds.category].some(v => v.toLowerCase().includes(q));
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
          
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <Database className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                INDEPENDENT DATA SOURCE REGISTER
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              India Climate Data Sources
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Independent public data providers covering all six decarbonisation sectors. Source availability does not imply ingestion, redistribution permission or scientific verification.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Identified Sources</span>
                <span className="text-2xl font-mono font-bold text-teal-light">{datasets.length} Sources</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Ingestion Status</span>
                <span className="text-2xl font-mono font-bold text-coral">Staging</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: MACRO DATA SUMMARY STRIP (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-16 border-b border-black/10 dark:border-white/10 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Update Frequency</span>
            <span className="text-2xl font-mono font-bold text-teal">Source-specific</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Check original publisher's update schedule</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Coverage</span>
            <span className="text-2xl font-mono font-bold text-coral">National + Regional</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Resolution depends on source</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Scientific Approval</span>
            <span className="text-2xl font-mono font-bold text-emerald-500">Pending</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>No third-party audit yet</span>
          </div>
          <div className={`p-6 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Procurement Policy</span>
            <span className="text-2xl font-mono font-bold text-teal">Free Only</span>
            <span className={`text-xs block mt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>Source terms apply independently</span>
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
                placeholder="Search source, sector, or publisher..."
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                  isLight 
                    ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                    : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { key: 'all', label: 'All Sources' },
                { key: 'power', label: 'Power & Grid' },
                { key: 'industry', label: 'Heavy Industry' },
                { key: 'transport', label: 'Transport' },
                { key: 'agriculture', label: 'Agriculture & Land' },
                { key: 'transition', label: 'Just Transition' },
                { key: 'finance', label: 'Finance & Carbon' },
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
                      {ds.status}
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
                    <span>{ds.updated}</span>
                    <span>•</span>
                    <span>{ds.category}</span>
                  </div>
                </div>

                <div className={`pt-5 mt-5 border-t flex items-center justify-between ${
                  isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                }`}>
                  <a
                    href={ds.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound(500)}
                    className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Visit Publisher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link 
                    to="/tools"
                    onClick={() => playSound(480)}
                    className={`text-xs font-manrope font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                      isLight ? 'text-[#334155] hover:text-teal' : 'text-white/70 hover:text-teal'
                    }`}
                  >
                    <span>Explore Prototype Tools</span>
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
        subtitle="Explaining independence, provenance, publisher licensing and approval status"
        faqs={dataFaqs}
      />

      {/* ── SECTION 6: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="INDEPENDENT PUBLIC SOURCES"
        title="Explore Illustrative Scenarios"
        subtitle="Models and locally ingested data will be released after independent scientific review and license assessment."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
