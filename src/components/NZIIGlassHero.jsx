import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Sun,
  Factory,
  Car,
  Trees,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';

// Left Card: High-Impact Decarbonization Frontlines & Empirical Tech Levers (with minimal line art icons)
const LEFT_CARD_INSIGHTS = [
  {
    title: '500 GW Non-Fossil Grid',
    desc: 'Modeling round-the-clock solar-wind hybrid deployment, 63 GW energy storage, and synchronous condensers to maintain grid frequency above 49.9 Hz.',
    Icon: Sun,
    tag: 'POWER SECTOR'
  },
  {
    title: 'Green Hydrogen at $1/kg Parity',
    desc: 'National Green Hydrogen Mission pathways replacing grey feedstock in steelmaking blast furnaces (DRI) and ammonia fertilizer plants.',
    Icon: Factory,
    tag: 'HEAVY INDUSTRY'
  },
  {
    title: '100% Railway Electrification',
    desc: 'Dedicated Freight Corridors (DFC) reducing transport logistics energy intensity while 70% commercial trucks shift to electric battery & fuel-cell drivetrains.',
    Icon: Car,
    tag: 'CLEAN MOBILITY'
  },
  {
    title: '3.0 Gt Agroforestry Sink',
    desc: 'Integrating PM-KUSUM solarized irrigation with commercial agroforestry, precision nitrogen management, and coastal mangrove restoration.',
    Icon: Trees,
    tag: 'NATURE-BASED SINKS'
  },
  {
    title: 'Circular Industrial Symbiosis',
    desc: 'Calcined clay LC3 cement blending and electric arc furnace scrap recycling to eliminate 40% of embodied industrial process emissions.',
    Icon: Layers,
    tag: 'CIRCULAR ECONOMY'
  }
];

// Right Card: Curated Institutional Research Blogs & Policy Insights (NO icon, clean editorial typography)
const RIGHT_CARD_BLOGS = [
  {
    title: 'Financing India’s $10.1T Transition',
    desc: 'New analysis detailing sovereign green bond frameworks, concessional blended finance, and domestic manufacturing CAPEX needed through 2070.',
    tag: 'POLICY BRIEF',
    readTime: '4 min read',
    link: '/publications'
  },
  {
    title: 'Just Transition in the Coal Belt',
    desc: 'Socioeconomic roadmaps for 3.6 million workers across Jharkhand, Odisha, and Chhattisgarh balancing regional revenues and clean industrial clusters.',
    tag: 'RESEARCH PAPER',
    readTime: '6 min read',
    link: '/publications'
  },
  {
    title: 'Panchamrit 2030 Interim Check',
    desc: 'Empirical model benchmarking India’s 50% non-fossil installed capacity milestone and carbon intensity reduction targets ahead of timeline.',
    tag: 'EXECUTIVE SUMMARY',
    readTime: '3 min read',
    link: '/publications'
  },
  {
    title: 'Grid Stability with 50% RE Penetration',
    desc: '8,760-hour unit commitment dispatch analysis ensuring seasonal monsoon resilience and agricultural pumping peak load balancing.',
    tag: 'TECHNICAL REPORT',
    readTime: '5 min read',
    link: '/publications'
  }
];

export const NZIIGlassHero = () => {
  const { playSound } = useGame();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Cycling states for left (frontline levers) and right (blogs)
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [leftFade, setLeftFade] = useState(true);
  const [rightFade, setRightFade] = useState(true);

  // Rotate left card every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLeftFade(false);
      setTimeout(() => {
        setLeftIndex((prev) => (prev + 1) % LEFT_CARD_INSIGHTS.length);
        setLeftFade(true);
      }, 350);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Rotate right card every 6.5 seconds (offset by 3.2 seconds for natural rhythm)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setRightFade(false);
        setTimeout(() => {
          setRightIndex((prev) => (prev + 1) % RIGHT_CARD_BLOGS.length);
          setRightFade(true);
        }, 350);
      }, 6500);
      return () => clearInterval(timer);
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  // Handle video ready / playing
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setVideoLoaded(true);
      video.addEventListener('canplay', handlePlay);
      video.addEventListener('playing', handlePlay);
      video.play().catch(() => {
        // Fallback: if browser blocks autoplay, release the loader after brief timeout
        setTimeout(() => setVideoLoaded(true), 800);
      });
      return () => {
        video.removeEventListener('canplay', handlePlay);
        video.removeEventListener('playing', handlePlay);
      };
    }
  }, []);

  // Fallback safety timeout for pre-loader (max 2 seconds)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setVideoLoaded(true);
    }, 2200);
    return () => clearTimeout(safetyTimer);
  }, []);

  const currentLeft = LEFT_CARD_INSIGHTS[leftIndex];
  const currentRight = RIGHT_CARD_BLOGS[rightIndex];
  const LeftIcon = currentLeft.Icon;

  return (
    <div className="fixed top-0 left-0 w-full h-screen min-h-[720px] flex flex-col justify-between px-[3vw] pt-28 pb-10 overflow-hidden select-none antialiased z-0 pointer-events-auto bg-[#050B14]">
      
      {/* ── 0. PRE-LOADER: ELEGANT MINIMALIST SCREEN UNTIL VIDEO LOADS ── */}
      <div 
        className={`fixed inset-0 z-50 bg-[#050B14] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none select-none ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
            <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <span className="font-manrope font-extrabold text-white text-sm tracking-widest uppercase block">
              NZII
            </span>
            <span className="text-[11px] font-mono text-white/40 tracking-wider uppercase mt-1 block">
              Initializing Decarbonization Sandbox
            </span>
          </div>
        </div>
      </div>

      {/* ── 1. BACKGROUND VIDEO LAYER (Starts playing seamlessly under preloader) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
      >
        
      </video>

      {/* ── 2. CINEMATIC OVERLAY & NATURAL NEUTRAL CONTRAST ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10"></div>

      {/* ── 3. CENTER CONTENT: EXACT 2-LINE HEADLINE & INTERACTIVE CTA ── */}
      <div className="relative z-20 max-w-5xl mx-auto my-auto text-center flex flex-col items-center px-4">
        
        {/* Main Headline: Strictly 2 lines */}
        <h1 className="hero-title font-manrope text-4xl sm:text-6xl md:text-[68px] lg:text-[72px] font-bold tracking-tight text-white leading-[1.08] mb-5 animate-hero-entrance max-w-4xl">
          Researching India&apos;s <br className="hidden sm:inline" />
          sustainable future.
        </h1>

        {/* Subtitle */}
        <p className="font-manrope text-base sm:text-lg md:text-[19px] text-white/95 font-normal leading-relaxed max-w-2xl mb-8 animate-hero-sub-entrance">
          Interdisciplinary research across energy, land, livelihoods, finance, biodiversity and society—supported by open methods and transparent data.
        </p>

        {/* Exact Button: Clean white pill with brand teal circle and horizontal ArrowRight */}
        <div className="animate-hero-btn-entrance">
          <Link
            to="/simulator"
            onClick={() => {
              playSound(620);
              confetti({ particleCount: 50, spread: 70 });
            }}
            className="group inline-flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-white text-navy font-manrope font-semibold text-[15px] shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(13,148,136,0.35)] hover:scale-105 active:scale-100 transition-all cursor-pointer"
          >
            <span className="text-navy font-bold tracking-tight">Explore Net-Zero Pathways</span>
            <div className="w-8 h-8 rounded-full bg-teal group-hover:bg-teal-dark text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-sm">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── 4. BOTTOM FLOATING DARK TRANSPARENT GLASS PANELS (ZERO BLUE TINT) ── */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-end justify-between gap-6 pointer-events-auto">
        
        {/* Bottom Left Card: Frontlines & Technological Insights (With Line Art Icon) */}
        <div className="glass-panel w-full sm:w-[430px] min-h-[175px] p-7 rounded-[28px] text-left transition-all hover:border-white/30 flex flex-col justify-center animate-float-left hover:[animation-play-state:paused]">
          <div 
            className={`transition-all duration-300 transform ${
              leftFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Top row: Line art icon + Category tag */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-teal-light">
                <LeftIcon className="w-4 h-4 stroke-[1.75]" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-teal-light uppercase px-2 py-0.5 rounded bg-teal/10">
                {currentLeft.tag}
              </span>
            </div>

            <h3 className="glass-card-title font-manrope font-bold text-lg sm:text-xl text-white mb-2 tracking-tight">
              {currentLeft.title}
            </h3>
            <p className="font-manrope text-xs sm:text-[13.5px] text-white/80 leading-relaxed font-normal">
              {currentLeft.desc}
            </p>
          </div>
        </div>

        {/* Bottom Right Card: Curated Institutional Blogs & Papers (NO ICON) */}
        <div className="glass-panel w-full sm:w-[430px] min-h-[175px] p-7 rounded-[28px] text-left transition-all hover:border-white/30 flex flex-col justify-center animate-float-right hover:[animation-play-state:paused]">
          <div 
            className={`transition-all duration-300 transform ${
              rightFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Top row: Blog Category tag + Read time indicator (NO ICON) */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-300 uppercase px-2 py-0.5 rounded bg-amber-400/10">
                {currentRight.tag}
              </span>
              <span className="text-[11px] font-mono text-white/40">
                {currentRight.readTime}
              </span>
            </div>

            <Link 
              to={currentRight.link}
              onClick={() => playSound(480)}
              className="group/blog block cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="glass-card-title font-manrope font-bold text-lg sm:text-xl text-white mb-2 tracking-tight group-hover/blog:text-teal-light transition-colors">
                  {currentRight.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/blog:text-teal-light transition-colors shrink-0 mt-1" />
              </div>
              <p className="font-manrope text-xs sm:text-[13.5px] text-white/80 leading-relaxed font-normal">
                {currentRight.desc}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
