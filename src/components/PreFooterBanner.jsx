import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from './RevealOnScroll';
import confetti from 'canvas-confetti';

export const PreFooterBanner = ({
  tag = "INTERACTIVE CLIMATE PLATFORM",
  title = "Ready to Accelerate India’s Net-Zero Transition?",
  subtitle = "Run 8,760h grid dispatch simulations, explore verified industrial case studies, and audit statutory carbon footprints with open scientific integrity.",
  primaryCtaText = "Launch Decarbonization Sandbox",
  primaryCtaLink = "/simulator",
  secondaryCtaText = "Contact Secretariat",
  secondaryCtaLink = "/contact"
}) => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  return (
    <section className={`w-full py-20 px-[3vw] border-t transition-colors duration-500 relative overflow-hidden ${
      isLight ? 'bg-[#FFFCF6] border-[#E6E2D8]' : 'bg-[#162B46] border-white/10'
    }`}>
      <div className="w-full max-w-[1720px] mx-auto">
        <RevealOnScroll direction="up" delay={80}>
          <div className={`p-10 md:p-16 2xl:p-20 rounded-xl text-center relative overflow-hidden border shadow-2xl ${
            isLight
              ? 'bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white border-teal/40'
              : 'bg-gradient-to-br from-[#121A26] via-[#0E1520] to-[#0A0E17] text-white border-[#222E42]'
          }`}>
            
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-teal/20 border border-teal/40">
                <Sparkles className="w-3.5 h-3.5 text-teal-light" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-light uppercase">
                  {tag}
                </span>
              </div>

              <h2 className="font-manrope font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                {title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal max-w-2xl mx-auto">
                {subtitle}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={primaryCtaLink}
                  onClick={() => {
                    playSound(620);
                    if (!ecoMode) {
                      confetti({ particleCount: 40, spread: 60 });
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#1D3658] font-manrope font-extrabold text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>{primaryCtaText}</span>
                  <div className="w-7 h-7 rounded-lg bg-teal text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </Link>

                <Link
                  to={secondaryCtaLink}
                  onClick={() => playSound(480)}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-manrope font-bold text-sm border border-white/20 transition-all cursor-pointer inline-flex items-center justify-center"
                >
                  {secondaryCtaText}
                </Link>
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
