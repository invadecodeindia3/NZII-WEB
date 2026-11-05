import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  Check,
  Compass,
  Zap,
  Activity
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import { ALL_ARTIFACTS } from '../data/artifactsData';
import confetti from 'canvas-confetti';

export const ArtifactDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  const artifact = ALL_ARTIFACTS.find(item => item.id === id) || ALL_ARTIFACTS[0];

  const handleShare = () => {
    playSound(620);
    if (!ecoMode) {
      confetti({ particleCount: 30, spread: 60 });
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HEADER WITH VIDEO BACKGROUND (CENTER ALIGNED) ── */}
      <section className="relative w-full min-h-[540px] lg:min-h-[580px] flex flex-col justify-end pt-36 pb-16 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#050B14] text-white">
        
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

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-5">
          
          {/* Back link & breadcrumbs */}
          <RevealOnScroll direction="up" delay={40}>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/70">
              <Link 
                to="/research"
                onClick={() => playSound(480)}
                className="hover:text-teal transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Research & Case Studies</span>
              </Link>
              <span>/</span>
              <span className="text-teal font-bold uppercase">{artifact.category}</span>
            </div>
          </RevealOnScroll>

          {/* Badge */}
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <BookOpen className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                {artifact.type === 'case-study' ? 'Empirical Field Case Study' : 'Peer-Reviewed Research Article'}
              </span>
            </div>
          </RevealOnScroll>

          {/* Title */}
          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              {artifact.title}
            </h1>
          </RevealOnScroll>

          {/* Metadata pill */}
          <RevealOnScroll direction="up" delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal" />
                <span>{artifact.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal" />
                <span>{artifact.partner}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal" />
                <span>{artifact.readTime}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: TOP METRICS STRIP (CENTER ALIGNED) ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-10 border-b border-black/10 dark:border-white/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
          <div className={`p-5 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-[10px] font-mono uppercase text-teal font-bold block mb-1">Abatement Yield</span>
            <span className="text-xl font-mono font-bold text-coral">{artifact.co2eReduced}</span>
          </div>
          <div className={`p-5 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-[10px] font-mono uppercase text-teal font-bold block mb-1">Capital Mobilized</span>
            <span className="text-xl font-mono font-bold text-teal">{artifact.capex}</span>
          </div>
          <div className={`p-5 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-[10px] font-mono uppercase text-teal font-bold block mb-1">Time Horizon</span>
            <span className="text-xl font-mono font-bold text-emerald-500">{artifact.year}</span>
          </div>
          <div className={`p-5 rounded-xl border ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'}`}>
            <span className="text-[10px] font-mono uppercase text-teal font-bold block mb-1">Author Working Group</span>
            <span className="text-sm font-manrope font-bold block truncate">{artifact.author}</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MAIN ARTICLE CONTENT (CENTER ALIGNED SECTIONS) ── */}
      <section className="w-full max-w-[1280px] mx-auto px-[3vw] py-14 space-y-12">
        
        {/* Executive Summary */}
        <RevealOnScroll direction="up" delay={80}>
          <div className={`p-8 sm:p-10 rounded-2xl border space-y-4 ${
            isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#101520] border-[#1D2636]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal block">
              EXECUTIVE BRIEF
            </span>
            <h2 className={`font-manrope font-extrabold text-2xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
              Overview & Empirical Scope
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
              {artifact.summary}
            </p>
          </div>
        </RevealOnScroll>

        {/* 2-Column Challenge vs Engineered Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          <RevealOnScroll direction="up" delay={100}>
            <div className={`p-8 rounded-2xl border h-full space-y-3 ${
              isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center font-bold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className={`font-manrope font-extrabold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                The Decarbonization Challenge
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                {artifact.challenge}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={120}>
            <div className={`p-8 rounded-2xl border h-full space-y-3 ${
              isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className={`font-manrope font-extrabold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                Engineered Technological Solution
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                {artifact.solution}
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Technical Performance Grid */}
        {artifact.technicalMetrics && (
          <RevealOnScroll direction="up" delay={80}>
            <div className={`p-8 rounded-2xl border space-y-6 ${
              isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#101520] border-[#1D2636]'
            }`}>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal block text-center">
                TECHNICAL BENCHMARKS & PROCESS KINETICS
              </span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {artifact.technicalMetrics.map((met, i) => (
                  <div key={i} className={`p-4 rounded-xl border text-center ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#141A26] border-[#222E42]'
                  }`}>
                    <span className="text-[11px] font-mono opacity-60 block mb-1">{met.label}</span>
                    <span className="text-lg font-mono font-bold text-teal">{met.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Key Measured Outcomes List */}
        <RevealOnScroll direction="up" delay={80}>
          <div className={`p-8 sm:p-10 rounded-2xl border space-y-6 ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#10141C] border-[#1C2534]'
          }`}>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal block text-center">
              MEASURED FIELD OUTCOMES
            </span>
            <div className="grid sm:grid-cols-2 gap-4">
              {artifact.results.map((res, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5">
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <span className={`text-xs sm:text-sm font-manrope leading-relaxed ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {res}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Action Bar (Removed Download Button) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link
            to="/tools"
            onClick={() => playSound(500)}
            className="px-6 py-3.5 rounded-xl bg-teal text-white font-manrope font-bold text-xs hover:bg-teal-dark transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate Parameters in Tool Suite</span>
          </Link>
          <Link
            to="/simulator"
            onClick={() => playSound(480)}
            className="px-6 py-3.5 rounded-xl glass-capsule text-white border-white/20 hover:bg-white/10 font-manrope font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Decarbonization Sandbox</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SECTION 4: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Technical Methodology & Replication FAQs"
        subtitle="Clarifying data sources, thermodynamic models, and field deployment boundaries"
        faqs={artifact.faqs}
      />

      {/* ── SECTION 5: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="EMPIRICAL REPLICATION PORTAL"
        title="Explore India’s Decarbonization Sandbox"
        subtitle="Test 8,760h hourly unit commitment, adjust policy sliders, and simulate abatement across all 6 key sectors."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Explore Interactive Tools"
        secondaryCtaLink="/tools"
      />

    </div>
  );
};
