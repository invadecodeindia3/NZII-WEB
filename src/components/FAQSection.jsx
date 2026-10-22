import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from './RevealOnScroll';

export const FAQSection = ({ 
  title = "Frequently Answered Scientific & Policy Questions", 
  subtitle = "Clarifying methodology, techno-economic assumptions, and data provenance", 
  faqs = [] 
}) => {
  const { theme, playSound } = useGame();
  const isLight = theme === 'light';
  const [openIndex, setOpenIndex] = useState(0);

  const defaultFaqs = [
    {
      q: "How does NZII calculate marginal abatement cost curves (MACC)?",
      a: "NZII couples bottom-up unit-commitment dispatch models with capital asset depreciation curves across 8,760 annual hours. We evaluate levelized cost of energy (LCOE), electrolyzer CAPEX, storage degradation, and fuel switching parity to determine the lowest $/ton CO2e abatement ranking."
    },
    {
      q: "Are the models compatible with India's Central Electricity Authority (CEA) baselines?",
      a: "Yes. All grid emission factors (national baseline average of 0.713 kg CO2/kWh) and state-by-state renewable potential curves are grounded in official CEA 2030 Generation Expansion Plans and grid stability reports."
    },
    {
      q: "Can corporate enterprises use this data for statutory SEBI BRSR Core assurance?",
      a: "Absolutely. Our emission factor library and activity data ingestion formats follow ISO 14064, GHG Protocol Corporate Standards, and SEBI BRSR Core guidelines with verifiable data provenance."
    },
    {
      q: "How does the platform model just transition in eastern coal-mining belts?",
      a: "We integrate district-level census data across 54 coal-dependent districts in Jharkhand, Odisha, and Chhattisgarh, modeling royalty revenue replacement, mine-site solar redevelopment, and labor force re-skilling dynamics through 2070."
    }
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className={`w-full py-20 px-[3vw] border-t transition-colors duration-500 ${
      isLight ? 'bg-[#FFFCF6] border-[#E6E2D8] text-[#1D3658]' : 'bg-[#162B46] border-white/10 text-[#FFFCF6]'
    }`}>
      <div className="w-full max-w-[1280px] mx-auto space-y-12">
        
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={60}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-teal/10 border border-teal/30">
              <HelpCircle className="w-3.5 h-3.5 text-teal" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                FAQ & METHODOLOGICAL FAQ
              </span>
            </div>
            <h2 className={`font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#1D3658]' : 'text-white'
            }`}>
              {title}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
            }`}>
              {subtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <RevealOnScroll key={idx} direction="up" delay={80 + idx * 40}>
                <div 
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isOpen 
                      ? isLight 
                        ? 'bg-white border-teal shadow-md ring-1 ring-teal/20' 
                        : 'bg-[#121824] border-teal shadow-lg ring-1 ring-teal/30'
                      : isLight 
                        ? 'bg-white border-[#E6E2D8] hover:border-teal/50' 
                        : 'bg-[#10141C] border-[#1C2534] hover:border-teal/30'
                  }`}
                >
                  <button
                    onClick={() => {
                      setOpenIndex(isOpen ? -1 : idx);
                      playSound(480);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className={`font-manrope font-extrabold text-base sm:text-lg transition-colors ${
                      isOpen ? 'text-teal' : isLight ? 'text-[#1D3658]' : 'text-white'
                    }`}>
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-teal text-white' : isLight ? 'bg-[#F1F5F9] text-[#64748B]' : 'bg-[#18202E] text-white/60'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                      isLight ? 'text-[#475569] border-[#E6E2D8]' : 'text-[#94A3B8] border-[#1E2636]'
                    }`}>
                      {item.a}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};
