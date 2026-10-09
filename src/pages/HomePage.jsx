import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowDown, Network, MapPin, HeartPulse, BookOpen, Compass, Building2, Sprout, Users, Scale, Handshake, CalendarDays } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Footer } from '../components/Footer';
import { HeroContourLines } from '../components/HeroContourLines';
import { PUBLISHED_NEWS_EVENTS } from '../data/newsEvents';

const choices = [
  'Where should new energy infrastructure be built?',
  'How much land and water could different pathways require?',
  'What happens to jobs and livelihoods?',
  'How might energy choices affect air quality and health? Where will investment flow?',
  'And will the costs and benefits of the transition be shared equitably?'
];
const differences = [
  ['Integrated', 'Connecting energy and emissions with development and natural-resource outcomes.', Network],
  ['Spatially resolved', 'Moving beyond national averages to understand how pathways and impacts could differ across states, districts and places.', MapPin],
  ['Development-centred', 'Keeping employment, health, energy access, equity and economic development alongside mitigation.', HeartPulse],
  ['Rigorous & Open', 'Building robust research, models and datasets that others can examine, use and build upon.', BookOpen]
];
const questions = [
  ['How might India\'s energy needs change?', 'Explore future demand across households, transport, industry and agriculture.', Compass],
  ['How could India meet those needs?', 'Understand different combinations of energy technologies, infrastructure and investment.', Building2],
  ['Where could the transition happen?', 'Explore where new infrastructure may be required and what this could mean across India\'s regions.', MapPin],
  ['What resources could it require?', 'Examine interactions between energy infrastructure, land, water, agriculture, forests and biodiversity.', Sprout],
  ['What could it mean for people?', 'Study implications for employment, health, energy access and equity.', Users],
  ['What choices and trade-offs emerge?', 'Understand how different development and mitigation choices interact on India\'s path to 2070.', Scale]
];
const steps = [
  ['Understand the possibilities', 'Data, stakeholder engagement and scenario development help identify the forces that could shape India\'s future.'],
  ['Model different pathways', 'Integrated energy and land modelling explores how different development and mitigation futures could unfold.'],
  ['Understand their implications', 'Spatial and post-modelling analysis examines what those pathways could mean for infrastructure, resources, development, people and ecosystems.'],
  ['Make the evidence usable', 'Research, data, models and insights are shared to support further research and better-informed policy and planning.']
];
const TextLink = ({to, children}) => <Link to={to} className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline">{children}<ArrowUpRight size={17}/></Link>;

export const HomePage = () => {
  const { theme, displayMode, ecoMode } = useGame();
  const light = theme === 'light';
  const canvas = light ? 'bg-[#f9faf7] text-[#182b46]' : displayMode==='eco' ? 'bg-[#102334] text-[#f0f5ef]' : 'bg-[#142a3e] text-[#f6f7f5]';
  const soft = light ? 'bg-[#eef4f0]' : displayMode==='eco' ? 'bg-[#152c3c]' : 'bg-[#20394c]';
  const muted = light ? 'text-[#5f6e78]' : 'text-[#c0cbd1]';
  const edge = light ? 'border-[#dfe5e4]' : 'border-white/15';
  const confirmedNews = PUBLISHED_NEWS_EVENTS.find(entry => entry.type === 'news' && !entry.fictional);
  const confirmedEvent = PUBLISHED_NEWS_EVENTS.find(entry => entry.type === 'event' && !entry.fictional);
  const sampleEvent = PUBLISHED_NEWS_EVENTS.find(entry => entry.type === 'event' && entry.fictional);
  const displayedEvent = confirmedEvent || sampleEvent;

  return <div className={'w-full ' + canvas}>
    {/* 1. HERO — photograph, clear typography, restrained pathway lines */}
    <section className={`relative isolate flex min-h-[780px] items-center overflow-hidden px-[3vw] pb-24 pt-36 sm:min-h-[840px] sm:pt-40 ${light?'bg-[#edf3ee] text-[#173650]':'bg-[#102b40] text-white'}`}>
      <img className={`hero-photo pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-[65%_center] ${ecoMode?'opacity-55':light?'opacity-60':'opacity-80'}`}
        src="/hero.jpg" alt="" aria-hidden="true" decoding="async" fetchPriority="high"/>
      <div className={`pointer-events-none absolute inset-0 -z-20 ${light
        ? 'bg-[linear-gradient(90deg,rgba(249,251,247,0.99)_0%,rgba(249,251,247,0.91)_42%,rgba(249,251,247,0.3)_100%)]'
        : 'bg-[linear-gradient(90deg,rgba(11,33,49,0.98)_0%,rgba(11,33,49,0.88)_44%,rgba(11,33,49,0.24)_100%)]'}`}/>
      <HeroContourLines className={`decorative-lines pointer-events-none absolute -right-[6%] top-[12%] -z-10 h-[77%] w-[65%] ${light?'text-[#1a928c] opacity-65':'text-[#86ddcf] opacity-70'}`}/>
      <div className="relative w-full">
        <div className="max-w-[1010px]">
          <p className={`mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] ${light?'text-[#176e72]':'text-[#a8d36b]'}`}><span className="h-px w-8 bg-current"/>Net Zero India</p>
          <h1 className="text-[clamp(2.65rem,5.25vw,5.85rem)] font-semibold leading-[1.09] tracking-[-0.05em]">What will it take for India to reach net zero, and what will different paths mean for the country?</h1>
          <div className={`mt-8 max-w-[790px] space-y-4 text-[clamp(.96rem,1.17vw,1.125rem)] leading-[1.86] ${light?'text-[#38576c]':'text-white/85'}`}>
            <p>India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.</p>
            <p>Net Zero India brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/research" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#268f89] px-6 py-3 text-sm font-bold text-white hover:bg-[#16756d]">Explore Our Research <ArrowUpRight size={17}/></Link>
            <Link to="/about" className={`inline-flex min-h-12 items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold ${light?'border-[#8aa6a5] text-[#173650] hover:bg-white/40':'border-white/50 text-white hover:bg-white/10'}`}>About Net Zero India <ArrowRight size={17}/></Link>
          </div>
        </div>
      </div>
      <a href="#why-nzi" className={`absolute bottom-7 left-[3%] inline-flex items-center gap-2 text-[11px] uppercase tracking-wider ${light?'text-[#436777]':'text-white/70'}`}>Discover more <ArrowDown size={16}/></a>
      {!ecoMode&&<div className={`absolute bottom-7 right-[3%] hidden text-right lg:block ${light?'text-[#274d5c]':'text-white/70'}`}><span className="block text-3xl font-semibold">2070</span><span className="text-[10px] uppercase tracking-wider">India's net-zero commitment</span></div>}
    </section>

    {/* 2. WHY NZI EXISTS — replaces the removed 9-card grid; editorial, not another card wall */}
    <section id="why-nzi" className="px-[3vw] py-24 sm:py-28">
      <div className="mx-auto grid max-w-none gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">01 / Why NZI exists</p>
          <h2 className="mt-6 max-w-[650px] text-[clamp(2.5rem,4.3vw,4.9rem)] font-semibold leading-[1.1] tracking-[-0.05em]">Net zero is not one destination with <em className="font-normal text-teal">one road.</em></h2>
          <p className={'mt-8 text-lg leading-[1.8] ' + muted}>India's transition will involve choices.</p>
          <p className={'mt-6 max-w-xl text-base leading-[1.85] ' + muted}>These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.</p>
        </div>
        <div className={'border-t ' + edge}>
          {choices.map((item,i) => <div key={item} className={'grid grid-cols-[42px_1fr] items-start gap-3 border-b py-6 sm:py-7 ' + edge}>
            <span className="pt-1 text-xs font-mono text-teal">0{i+1}</span>
            <p className="max-w-2xl text-[clamp(1.15rem,1.6vw,1.55rem)] font-medium leading-[1.43] tracking-tight">{item}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 3. THE DIFFERENCE */}
    <section className={'px-[3vw] py-24 sm:py-28 ' + soft}>
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">02 / The difference</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.4rem,4.15vw,4.6rem)] font-semibold leading-tight tracking-[-0.05em]">A more complete picture of India’s net-zero transition</h2>
        <div className="mt-12 grid gap-x-9 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {differences.map(([title, description, Icon],i) => <div key={title} className={'border-t pt-6 ' + edge}>
            <div className="flex items-center justify-between text-teal"><Icon size={25} strokeWidth={1.6}/><span className="font-mono text-xs">0{i+1}</span></div>
            <h3 className="mt-8 text-xl font-semibold">{title}</h3>
            <p className={'mt-3 text-sm leading-[1.8] ' + muted}>{description}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 4. WHAT NZI IS TRYING TO UNDERSTAND */}
    <section className="bg-[#18354b] px-[3vw] py-24 text-white sm:py-28">
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#9dcc5d]">03 / What NZI is trying to understand</p>
        <h2 className="mt-6 max-w-5xl text-[clamp(2.5rem,4.6vw,5rem)] font-semibold leading-tight tracking-[-0.05em]">One transition. <em className="font-normal text-[#a8ce4c]">Many connected questions.</em></h2>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2 xl:grid-cols-3">
          {questions.map(([title,description,Icon],i) => <div key={title} className="border-t border-white/20 py-8">
            <div className="flex items-center justify-between text-[#55b9a5]"><Icon size={23} strokeWidth={1.7}/><span className="font-mono text-xs text-white/60">0{i+1}</span></div>
            <h3 className="mt-8 text-xl font-semibold leading-snug">{title}</h3>
            <p className="mt-4 text-sm leading-[1.8] text-white/70">{description}</p>
          </div>)}
        </div>
        <div className="mt-7"><Link to="/research" className="inline-flex items-center gap-2 font-semibold text-[#a8ce4c]">Explore the Research <ArrowRight size={18}/></Link></div>
      </div>
    </section>

    {/* 5. HOW IT WORKS */}
    <section className="px-[3vw] py-24 sm:py-28">
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">04 / How it works</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.4rem,4.3vw,4.7rem)] font-semibold leading-tight tracking-[-0.05em]">From possible futures to evidence for decisions</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(([title,description],i) => <div key={title} className={'border-t-2 pt-7 ' + (i===0 ? 'border-teal' : edge)}>
            <div className="mb-12 flex items-center justify-between text-teal"><span className="font-mono text-2xl">0{i+1}</span>{i<3 && <ArrowRight size={20}/>}</div>
            <h3 className="text-xl font-semibold">{title}</h3><p className={'mt-4 text-sm leading-[1.85] ' + muted}>{description}</p>
          </div>)}
        </div>
        <div className="mt-11"><TextLink to="/research">Explore Our Approach</TextLink></div>
      </div>
    </section>

    {/* 6. PHILOSOPHY */}
    <section className="bg-[#dce8e0] px-[3vw] py-24 text-[#1b3644] sm:py-28">
      <div className="mx-auto max-w-[1140px]">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#278778]">05 / A guiding philosophy</p>
        <h2 className="mt-8 text-[clamp(2.6rem,4.8vw,5.3rem)] font-semibold leading-[1.15] tracking-[-0.05em]">We are not looking for <em className="font-normal">the</em> pathway to net zero.</h2>
        <div className="mt-10 border-l-2 border-[#2ba99b] pl-7">
          <p className="text-xl leading-[1.65] sm:text-2xl">We are building the evidence to understand different pathways; their possibilities, consequences and trade-offs.</p>
          <p className="mt-5 text-base leading-[1.9] text-[#3f5e63]">So that decisions about India's transition can be informed by evidence that reflects the country's development priorities, resources and diversity.</p>
        </div>
      </div>
    </section>

    {/* 7. FEATURED RESEARCH / KNOWLEDGE */}
    <section className="px-[3vw] py-24 sm:py-28">
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">06 / Research & knowledge</p>
        <h2 className="mt-6 text-[clamp(2.4rem,4.3vw,4.7rem)] font-semibold tracking-[-0.05em]">Explore our work</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr]">
          <Link to="/research" className="group flex min-h-[350px] flex-col justify-between rounded-2xl bg-[#224c58] p-8 text-white">
            <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#b0dba0]">Featured Research <ArrowUpRight size={19}/></span>
            <div><h3 className="text-[clamp(1.9rem,2.5vw,3rem)] font-semibold leading-[1.2]">Exploring India's transition pathways</h3><p className="mt-4 text-sm text-white/75">Browse the research themes and questions guiding the initiative.</p></div>
            <span className="text-sm font-semibold">Read the research →</span>
          </Link>
          <Link to="/contact" className={'flex min-h-[350px] flex-col justify-between rounded-2xl border p-8 ' + edge}>
            <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-teal">Open Calls & Collaborations <Handshake size={20}/></span>
            <div><h3 className="text-2xl font-semibold leading-[1.2]">Research grows through collaboration.</h3><p className={'mt-4 text-sm leading-[1.7] ' + muted}>Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative.</p></div>
            <span className="text-sm font-semibold text-teal">Explore Opportunities →</span>
          </Link>
          <Link to="/publications" className={'flex min-h-[350px] flex-col justify-between rounded-2xl border p-8 ' + edge}>
            <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-teal">Publications & Outputs <BookOpen size={20}/></span>
            <div><h3 className="text-2xl font-semibold leading-[1.2]">Research for further work.</h3><p className={'mt-4 text-sm leading-[1.7] ' + muted}>Working papers, policy briefs, reports, presentations, and other outputs from the initiative.</p></div>
            <span className="text-sm font-semibold text-teal">View all outputs →</span>
          </Link>
        </div>
      </div>
    </section>

    {/* 8. THE PEOPLE / COLLABORATIVE MODEL */}
    <section className={'px-[3vw] py-24 sm:py-28 ' + soft}>
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">07 / People & collaboration</p>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div><h2 className="max-w-3xl text-[clamp(2.4rem,4.1vw,4.7rem)] font-semibold leading-[1.15] tracking-[-0.05em]">Built through collaboration. <em className="font-normal text-teal">Led from India.</em></h2>
            <p className={'mt-7 text-base leading-[1.85] ' + muted}>Net Zero India brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.</p>
          </div>
          <div>
            <div className={'border-b pb-7 ' + edge}><p className="text-xs font-mono uppercase tracking-widest text-teal">Led by</p><p className="mt-3 text-2xl font-semibold">School of Public Policy, IIT Delhi</p></div>
            <div className="pt-7"><p className="text-xs font-mono uppercase tracking-widest text-teal">Research Partners</p><p className="mt-4 text-xl font-semibold">Prayas Energy Group</p><p className="mt-2 text-xl font-semibold">Princeton University</p>
              <p className={'mt-5 text-xs leading-[1.7] ' + muted}>Partner names supplied by the client. Official logo files and preferred brand lockups are pending.</p></div>
          </div>
        </div>
        <div className="mt-10"><TextLink to="/consortium">Meet the Team & Partners</TextLink></div>
      </div>
    </section>

    {/* 9. SUPPORT */}
    <section className={'border-y px-[3vw] py-14 ' + edge}>
      <div className="mx-auto flex max-w-none flex-wrap items-center gap-x-16 gap-y-7">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-teal">Supported by</h2>
        <span className="text-xl font-semibold">Schmidt Sciences <small className={'text-sm font-normal ' + muted}>/ AX programme</small></span>
        <span className="text-xl font-semibold">Giving Green</span>
      </div>
    </section>

    {/* 10. LATEST FROM NZI: editorial placeholders, no fabricated outcomes */}
    <section className="px-[3vw] py-24 sm:py-28">
      <div className="mx-auto max-w-none">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">08 / News and knowledge</p>
        <h2 className="mt-6 text-[clamp(2.4rem,4.1vw,4.7rem)] font-semibold tracking-[-0.05em]">Latest from Net Zero India</h2>
        <div className="mt-11 grid gap-7 md:grid-cols-3">
          <Link to="/publications" className={'flex min-h-[230px] flex-col justify-between border-t-2 border-teal pt-6 '}>
            <span className="text-xs uppercase tracking-wider text-teal">Research & Publications</span><div><h3 className="mt-4 text-xl font-semibold">Working papers, policy briefs and research outputs</h3><p className={'mt-3 text-xs ' + muted}>Illustrative research concepts while verified outputs are prepared.</p></div><span className="text-sm font-semibold text-teal">View research →</span>
          </Link>
          <Link to="/news-events" className={'flex min-h-[230px] flex-col justify-between border-t-2 pt-6 ' + edge}>
            <span className="text-xs uppercase tracking-wider text-teal">News & Updates</span><div><h3 className="mt-4 text-xl font-semibold">{confirmedNews ? confirmedNews.title : 'Latest project update'}</h3><p className={'mt-3 text-xs ' + muted}>{confirmedNews ? confirmedNews.excerpt : 'News blurbs will appear after editorial approval.'}</p></div><span className="text-sm font-semibold text-teal">View updates →</span>
          </Link>
          <Link to={displayedEvent ? '/news-events/' + displayedEvent.slug : '/news-events'} className={'flex min-h-[230px] flex-col justify-between border-t-2 pt-6 ' + edge}>
            <span className="text-xs uppercase tracking-wider text-teal">Workshops & Events</span><div><h3 className="mt-4 text-xl font-semibold">{displayedEvent ? displayedEvent.title : 'Latest consultation or event'}</h3><p className={'mt-3 text-xs ' + muted}>{displayedEvent && displayedEvent.fictional ? 'Fictional example — not a scheduled or completed event.' : displayedEvent ? displayedEvent.excerpt : 'Approved event blurbs will appear here.'}</p></div><span className="text-sm font-semibold text-teal">View all updates →</span>
          </Link>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="bg-[#173448] px-[3vw] py-24 text-white sm:py-28">
      <div className="mx-auto flex max-w-none flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div><h2 className="max-w-4xl text-[clamp(2.7rem,4.8vw,5.7rem)] font-semibold leading-[1.1] tracking-[-0.055em]">India's path to 2070 is still being written.</h2><p className="mt-6 max-w-2xl text-lg leading-[1.7] text-white/70">Explore the research, evidence and ideas helping us understand the choices ahead.</p></div>
        <Link to="/research" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#2ba99b] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#218b81]">Explore Our Research <ArrowRight size={17}/></Link>
      </div>
    </section>
    <Footer/>
  </div>;
};
