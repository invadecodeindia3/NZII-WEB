import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Building, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Globe2, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Compass,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';
import confetti from 'canvas-confetti';

export const ContactPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formBusy, setFormBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Research Partnership',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formBusy) return;
    setFormBusy(true);
    setFormError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_NZII_API_BASE || ''}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.status !== 'accepted') {
        throw new Error(typeof result.detail === 'string' ? result.detail : 'Contact submission is not yet available.');
      }
      setFormSubmitted(true);
    } catch (error) {
      setFormError(error.message || 'Unable to submit.');
    } finally {
      setFormBusy(false);
    }
  };

  const contactFaqs = [
    {
      q: "What is the typical response time for data and research inquiries?",
      a: "Our coordination desk responds to academic data requests and research inquiries within 24 business hours. Complex modeling advisory requests are routed to specific taskforce leads within 3 working days."
    },
    {
      q: "How can industrial plant operators request custom decarbonization modeling?",
      a: "Select 'Plant Decarbonization Modeling' in the inquiry form and provide high-level facility parameters (annual MWh consumption, thermal fuel mix, crude output). Our engineering leads will schedule a scoping session."
    },
    {
      q: "Are Secretariat briefings available for government ministries and state SERCs?",
      a: "Yes. The Secretariat provides non-partisan briefings on power sector dispatch, time-of-day tariffs, and just transition frameworks to state and central government departments without advisory fees."
    },
    {
      q: "Can media organizations request quotes and visual data charts?",
      a: "Yes. High-resolution vector charts, SVG infographics, and expert quotes from our scientific fellows are provided freely under CC-BY attribution."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFCF6] text-[#1D3658]' : 'bg-[#1D3658] text-[#FFFCF6]'
    }`}>
      
      {/* ── SECTION 1: CINEMATIC HERO HEADER (CENTER ALIGNED) ── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-20 px-[3vw] overflow-hidden select-none border-b border-white/10 bg-[#14263D] text-white">
        
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/80 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10"></div>

        <div className="relative z-20 w-full max-w-[1280px] mx-auto text-center space-y-6">
          <RevealOnScroll direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl glass-capsule border border-white/20 mx-auto">
              <Mail className="w-3.5 h-3.5 text-teal-light" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal-light uppercase">
                Institutional Collaboration & Inquiries
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80}>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
              Connect with the Pathways Secretariat
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal text-white/85">
              Collaborate on state-level decarbonization simulations, request raw 8,760h grid datasets, or coordinate joint policy briefs with our research fellows.
            </p>
          </RevealOnScroll>

          {/* Status Glass HUD (Center Aligned) */}
          <RevealOnScroll direction="up" delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-teal-light font-bold block mb-0.5">Response SLA</span>
                <span className="text-2xl font-mono font-bold text-teal-light">&lt; 24 Hours</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl border border-white/15 text-center min-w-[170px]">
                <span className="text-[10px] font-mono uppercase text-white/60 font-bold block mb-0.5">Secretariat Hub</span>
                <span className="text-2xl font-mono font-bold text-coral">New Delhi</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── SECTION 2: 2-COLUMN DISPATCH FORM & COORDINATION DESK ── */}
      <section className="w-full max-w-[1720px] mx-auto px-[3vw] py-14 border-b border-black/10 dark:border-white/10 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="up" delay={80}>
              <div className={`p-8 sm:p-10 rounded-xl border ${
                isLight 
                  ? 'bg-white border-[#E6E2D8] shadow-sm' 
                  : 'bg-[#162B46] border-white/10 shadow-xl'
              }`}>
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-teal/20 text-teal border border-teal/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className={`font-manrope font-extrabold text-2xl ${
                      isLight ? 'text-[#1D3658]' : 'text-white'
                    }`}>
                      Inquiry received
                    </h3>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${
                      isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                    }`}>
                      Your inquiry was accepted by the secure backend. The team will contact you if a reply is required.
                    </p>
                    <textarea readOnly aria-label="Copy enquiry draft" className="w-full min-h-36 rounded-lg border p-3 bg-transparent text-sm" value={`Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nInquiry: ${formData.inquiryType}\nMessage: ${formData.message}`} />
                    <button onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-teal text-white text-xs font-manrope font-bold hover:bg-teal-dark transition-all cursor-pointer mt-4"
                    >
                      Edit Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className={`font-manrope font-extrabold text-2xl tracking-tight mb-1 ${
                        isLight ? 'text-[#1D3658]' : 'text-white'
                      }`}>
                        Research Enquiry Draft
                      </h2>
                      <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                        Submission is available after secure notifications and hosting have been configured.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono font-semibold mb-2 ${
                          isLight ? 'text-[#334155]' : 'text-white/80'
                        }`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Researcher / Policy Lead"
                          className={`w-full px-4 py-3 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                            isLight 
                              ? 'bg-[#F4F1E8] border-[#CBD5E1] text-[#1D3658] focus:border-teal' 
                              : 'bg-[#1D3658] border-[#2A3446] text-white focus:border-teal'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs font-mono font-semibold mb-2 ${
                          isLight ? 'text-[#334155]' : 'text-white/80'
                        }`}>
                          Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@institution.ac.in"
                          className={`w-full px-4 py-3 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                            isLight 
                              ? 'bg-[#F4F1E8] border-[#CBD5E1] text-[#1D3658] focus:border-teal' 
                              : 'bg-[#1D3658] border-[#2A3446] text-white focus:border-teal'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono font-semibold mb-2 ${
                          isLight ? 'text-[#334155]' : 'text-white/80'
                        }`}>
                          Organization / University *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. IIT Bombay / Ministry of Power"
                          className={`w-full px-4 py-3 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                            isLight 
                              ? 'bg-[#F4F1E8] border-[#CBD5E1] text-[#1D3658] focus:border-teal' 
                              : 'bg-[#1D3658] border-[#2A3446] text-white focus:border-teal'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs font-mono font-semibold mb-2 ${
                          isLight ? 'text-[#334155]' : 'text-white/80'
                        }`}>
                          Inquiry Domain *
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all cursor-pointer ${
                            isLight 
                              ? 'bg-[#F4F1E8] border-[#CBD5E1] text-[#1D3658] focus:border-teal' 
                              : 'bg-[#1D3658] border-[#2A3446] text-white focus:border-teal'
                          }`}
                        >
                          <option value="Research Partnership">Research Partnership</option>
                          <option value="Raw 8760h Data Request">Raw 8,760h Data Request</option>
                          <option value="Plant Decarbonization Modeling">Plant Decarbonization Modeling</option>
                          <option value="Policy Technical Advisory">Policy Technical Advisory</option>
                          <option value="Media & Briefing">Media & Briefing</option>
                          <option value="SEBI BRSR Assurance Integration">SEBI BRSR Assurance Integration</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono font-semibold mb-2 ${
                        isLight ? 'text-[#334155]' : 'text-white/80'
                      }`}>
                        Research Details & Scope *
                      </label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your research scope, modeling questions, or required dataset formats..."
                        className={`w-full px-4 py-3 rounded-lg text-xs sm:text-sm font-manrope outline-none border transition-all ${
                          isLight 
                            ? 'bg-[#F4F1E8] border-[#CBD5E1] text-[#1D3658] focus:border-teal' 
                            : 'bg-[#1D3658] border-[#2A3446] text-white focus:border-teal'
                        }`}
                      ></textarea>
                    </div>

                    {formError && <p role="alert" className="text-xs text-red-500">{formError}</p>}
                    <button
                      type="submit"
                      disabled={formBusy}
                      className="w-full py-3.5 rounded-xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{formBusy ? 'Submitting…' : 'Submit Enquiry'}</span>
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Institutional Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <RevealOnScroll direction="up" delay={120}>
              <div className={`relative isolate overflow-hidden p-8 rounded-xl border space-y-6 ${
                isLight ? 'bg-[#F4F1E8] border-[#E6E2D8]' : 'bg-[#162B46] border-white/10'
              }`}>
                {/* Subtle watermark */}
                <div 
                  aria-hidden="true" 
                  className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-[360px] w-[360px] select-none opacity-[0.035] sm:opacity-[0.045]"
                  style={{
                    backgroundImage: 'url(/patterns/pattern-2.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                />
                <h3 className={`font-manrope font-extrabold text-xl ${
                  isLight ? 'text-[#1D3658]' : 'text-white'
                }`}>
                  Secretariat Coordination Hubs
                </h3>

                <div className="space-y-4 text-xs font-manrope">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal shrink-0 mt-1" />
                    <div>
                      <span className="font-bold block text-teal">Principal Research Secretariat</span>
                      <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>
                        Hauz Khas Academic Enclave, IIT Delhi Campus, New Delhi 110016
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-teal shrink-0 mt-1" />
                    <div>
                      <span className="font-bold block text-teal">Direct Research Inquiries</span>
                      <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>
                        secretariat@netzeroindia.org • data@netzeroindia.org
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-teal shrink-0 mt-1" />
                    <div>
                      <span className="font-bold block text-teal">Coordination Desk</span>
                      <span className={isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}>
                        +91 11 2659 7135 (Mon–Fri, 09:30–18:00 IST)
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t ${
                  isLight ? 'border-[#E6E2D8]' : 'border-white/10'
                }`}>
                  <span className="text-[10px] font-mono font-bold uppercase text-teal block mb-1">
                    Direct Taskforce Dispatch
                  </span>
                  <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>
                    Inquiries regarding power grid unit-commitment, hydrogen steelmaking, or just transition mapping are routed directly to accredited taskforce leads.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Contact & Collaboration FAQs"
        subtitle="Answers regarding data access agreements, research advisory, and plant modeling requests"
        faqs={contactFaqs}
      />

      {/* ── SECTION 4: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="OPEN DATA ACCESS"
        title="Explore India’s Open Energy & Emissions Datasets"
        subtitle="Access 8,760h hourly solar and wind profiles, industrial hydrogen demand tables, and state coal transition matrices."
        primaryCtaText="Access Data Repository"
        primaryCtaLink="/data"
        secondaryCtaText="Launch Decarbonization Sandbox"
        secondaryCtaLink="/simulator"
      />

    </div>
  );
};
