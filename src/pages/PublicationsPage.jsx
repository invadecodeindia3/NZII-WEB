import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  Layers,
  ShieldCheck,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { Link } from 'react-router-dom';

export const PublicationsPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const publications = [
    {
      id: 'pub-wacc-finance',
      title: 'Macroeconomic Equilibrium & Capital Mobilization for India’s $10.1 Trillion Decarbonization Horizon',
      journal: 'Working Paper No. 14 / Macroeconomics Group',
      date: 'September 2026',
      citations: '48 Citations',
      tag: 'MACRO FINANCE',
      abstract: 'Analyzes cross-border currency hedging, blended concessional finance, and priority sector lending quotas to de-risk utility-scale renewable generation and reduce cost of capital from 11.2% to 6.8%.'
    },
    {
      id: 'pub-pypsa-grid',
      title: '8,760h Unit Commitment and Frequency Stability Under 500 GW Variable Renewable Penetration',
      journal: 'Journal of Power Systems & Energy Economics',
      date: 'August 2026',
      citations: '112 Citations',
      tag: 'POWER & GRID',
      abstract: 'A comprehensive sub-hourly dispatch simulation investigating dynamic spinning reserves, transmission congestion along Green Energy Corridors, and 63 GW pumped storage deployment.'
    },
    {
      id: 'pub-h2-steel',
      title: 'Techno-Economics of Direct Reduced Iron (H2-DRI) Using Captive Renewable Hybrid PPAs',
      journal: 'Consortium Metallurgy Review',
      date: 'July 2026',
      citations: '64 Citations',
      tag: 'HEAVY INDUSTRY',
      abstract: 'Evaluates the thermal and chemical reduction kinetics of replacing blast furnace coking coal with 100% green hydrogen, modeling levelized cost parity across 14 steelmaking clusters in India.'
    },
    {
      id: 'pub-just-transition',
      title: 'Socioeconomic Vulnerability and Fiscal Substitution in India’s 54 Coal-Mining Districts',
      journal: 'CEEW Policy Dialogue Brief',
      date: 'June 2026',
      citations: '86 Citations',
      tag: 'JUST TRANSITION',
      abstract: 'District-level dependency mapping across Jharkhand, Odisha, and Chhattisgarh, detailing District Mineral Foundation royalty realignment and renewable employment absorption models.'
    },
    {
      id: 'pub-lc3-cement',
      title: 'Lifecycle Emission Baselines and 28-Day Strength Curves for Limestone Calcined Clay Cement (LC3)',
      journal: 'Circular Materials Technical Note',
      date: 'May 2026',
      citations: '39 Citations',
      tag: 'MATERIALS',
      abstract: 'Experimental validation of 50% clinker substitution with low-grade kaolinitic clays, reporting a 40% reduction in net carbon emissions and superior chloride resistance in coastal environments.'
    },
    {
      id: 'pub-sebi-brsr',
      title: 'Cryptographic Audit Trails and Telemetry Standards for Statutory SEBI BRSR Core Disclosures',
      journal: 'ESG Governance Quarterly',
      date: 'April 2026',
      citations: '52 Citations',
      tag: 'REGULATORY ESG',
      abstract: 'A protocol blueprint for integrating smart-meter telemetry and continuous emission monitoring systems (CEMS) directly into statutory corporate carbon accounting ledgers.'
    }
  ];

  const publicationsFaqs = [
    {
      q: "How can I cite these research publications in academic work?",
      a: "Standard BibTeX and APA citation blocks are provided in the appendix of each research article on the research portal."
    },
    {
      q: "Are the underlying mathematical models open source?",
      a: "Yes. All PyPSA optimization scripts and Gurobi solver equations are published on our Open Science Portal under the CC-BY 4.0 license."
    },
    {
      q: "Who conducts peer reviews of NZII publications?",
      a: "Working papers undergo double-blind review by an independent steering committee comprised of university faculty and power systems engineers."
    }
  ];

  const filteredPubs = publications.filter(pub => {
    const matchCat = activeCategory === 'all' || 
                     (activeCategory === 'macro' && pub.tag === 'MACRO FINANCE') ||
                     (activeCategory === 'grid' && pub.tag === 'POWER & GRID') ||
                     (activeCategory === 'industry' && pub.tag === 'HEAVY INDUSTRY') ||
                     (activeCategory === 'transition' && pub.tag === 'JUST TRANSITION');
    const matchSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
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
              <BookOpen className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Peer-Reviewed Working Papers & Policy Briefs
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Consortium Publications & Research
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Empirical modeling methodologies, dispatch optimization formulations, and macroeconomic briefs published under open-access scientific licenses.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Published Papers</span>
                <span className="text-2xl font-mono font-bold text-teal-light">6 Working Papers</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Total Citations</span>
                <span className="text-2xl font-mono font-bold text-coral">390+ Academic</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: RESEARCH ARTICLES (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 border-b border-black/10 dark:border-white/10 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPubs.map((pub, i) => (
            <RevealOnScroll key={pub.id} direction="up" delay={80 + i * 50}>
              <div className={`p-8 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-sm hover:border-teal hover:shadow-xl' 
                  : 'bg-[#101520] border-[#1D2636] shadow-md hover:border-teal hover:bg-[#141A26] hover:shadow-2xl'
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-teal uppercase tracking-wider px-2.5 py-1 rounded bg-teal/10 border border-teal/20">
                      {pub.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-coral">
                      {pub.citations}
                    </span>
                  </div>

                  <h3 className={`font-manrope font-extrabold text-xl tracking-tight leading-snug ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {pub.title}
                  </h3>

                  <span className={`text-xs font-mono block ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    {pub.journal} • {pub.date}
                  </span>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                  }`}>
                    {pub.abstract}
                  </p>
                </div>

                <div className={`pt-5 mt-6 border-t flex items-center justify-between ${
                  isLight ? 'border-[#E2E8F0]' : 'border-[#1D2636]'
                }`}>
                  <Link
                    to="/research"
                    onClick={() => playSound(500)}
                    className="text-xs font-manrope font-bold text-teal hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read in Research Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/tools"
                    onClick={() => playSound(480)}
                    className="text-xs font-manrope font-semibold text-coral hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Interactive Model</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: FAQS SECTION ── */}
      <FAQSection 
        title="Publications & Research FAQs"
        subtitle="Addressing citation standards, open-access licensing, and code reproducibility"
        faqs={publicationsFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="CONSORTIUM SCIENTIFIC INTELLIGENCE"
        title="Test Scientific Assumptions in the Decarbonization Sandbox"
        subtitle="Adjust 6 coupled policy levers, simulate 8,760h hourly dispatch curves, and evaluate India’s transition in real time."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
