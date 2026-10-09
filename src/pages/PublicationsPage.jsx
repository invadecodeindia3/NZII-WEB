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

  // Fictional examples for interface prototyping. These do not represent publications,
  // completed studies, peer reviews, real citations or institutional affiliations.
  const publications = [
    {
      id: 'pub-wacc-finance',
      title: 'Financing Pathways for India's Long-Term Energy Transition',
      tag: 'MACRO FINANCE',
      abstract: 'A proposed study examining how blended finance, currency risk and the cost of capital could shape clean-energy investments. Research questions and scenarios are illustrative; no completed findings are presented.'
    },
    {
      id: 'pub-pypsa-grid',
      title: 'Exploring Power-System Flexibility in a High-Renewables India',
      tag: 'POWER & GRID',
      abstract: 'A hypothetical research brief on hourly dispatch, storage, grid congestion and reliability under changing renewable-energy penetration. No calibrated dispatch simulation or validated outcome is claimed.'
    },
    {
      id: 'pub-h2-steel',
      title: 'Potential Pathways for Hydrogen-Based Steelmaking',
      tag: 'HEAVY INDUSTRY',
      abstract: 'A concept note outlining questions about hydrogen-based direct reduced iron, clean-power procurement, input costs and infrastructure readiness. Figures and conclusions would require independent modelling.'
    },
    {
      id: 'pub-just-transition',
      title: 'A Research Framework for Coal-Region Economic Transition',
      tag: 'JUST TRANSITION',
      abstract: 'An illustrative study design for understanding employment exposure, regional fiscal dependence and local transition options. No fieldwork, district-level findings or third-party validation are implied.'
    },
    {
      id: 'pub-lc3-cement',
      title: 'Investigating Low-Carbon Cement Alternatives',
      tag: 'MATERIALS',
      abstract: 'A proposed technical literature review on clinker substitution, calcined clay availability and potential lifecycle emissions outcomes. No laboratory testing or material-performance result has been completed.'
    },
    {
      id: 'pub-sebi-brsr',
      title: 'Designing Traceable Corporate Carbon-Disclosure Workflows',
      tag: 'REGULATORY ESG',
      abstract: 'A speculative implementation concept for linking activity data, emission factors and audit trails to corporate sustainability reporting. It is not statutory advice or a validated compliance methodology.'
    }
  ];

  const publicationsFaqs = [
    {
      q: 'Are these real, published academic papers?',
      a: 'No. All six entries are fictional research concepts created to demonstrate the platform’s intended information architecture. None is represented as a published study.'
    },
    {
      q: 'Can I cite the concept notes in academic work?',
      a: 'No. They have no journal publication, DOI, authorship record, peer-review status or verified findings. Consult primary literature and official datasets instead.'
    },
    {
      q: 'When will real research appear here?',
      a: 'Verified papers will be added only when an actual document, author details, publication venue or working-paper record, source links and review status can be checked.'
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
                        pub.tag.toLowerCase().includes(searchQuery.toLowerCase());
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
                FICTIONAL RESEARCH CONCEPTS
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Illustrative Research Library
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Six fictional research concepts showing topics the platform could explore. These are interface examples only—not published papers, completed studies or verified scientific results.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Research Concepts</span>
                <span className="text-2xl font-mono font-bold text-teal-light">6 Fictional Concepts</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Publication Status</span>
                <span className="text-2xl font-mono font-bold text-coral">Not Published</span>
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
                    <span className="text-xs font-mono font-bold text-coral uppercase">
                      FICTIONAL
                    </span>
                  </div>

                  <h3 className={`font-manrope font-extrabold text-xl tracking-tight leading-snug ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {pub.title}
                  </h3>

                  <span className={`text-xs font-mono block ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    Concept Note • Illustrative Only • Not Peer Reviewed
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
                    <span>Explore Research Topics</span>
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
        title="Illustrative Research Concepts — FAQs"
        subtitle="Clarifying fictional status, citation limitations and future verification"
        faqs={publicationsFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER ── */}
      <PreFooterBanner 
        tag="EXPLORE A CONCEPTUAL RESEARCH FRAMEWORK"
        title="Test Scientific Assumptions in the Decarbonization Sandbox"
        subtitle="Experiment with illustrative policy controls and prototype calculators. Outputs are not validated national emissions projections."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
