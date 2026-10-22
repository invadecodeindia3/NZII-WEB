import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Network, MapPin, HeartPulse, BookOpen, Compass, Building2, Sprout, Users, Scale, Handshake, CalendarDays } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Footer } from '../components/Footer';
import { HeroContourLines } from '../components/HeroContourLines';
import { EditorialPhoto } from '../components/EditorialPhoto';
import { editorialMedia } from '../data/editorialMedia';
import { PUBLISHED_NEWS_EVENTS } from '../data/newsEvents';

const questionsOfTransition = [
  'Where should new energy infrastructure be built?',
  'How much land and water could different pathways require?',
  'What happens to jobs and livelihoods?',
  'How might energy choices affect air quality and health? Where will investment flow?',
  'And will the costs and benefits of the transition be shared equitably?'
];

const differences = [
  {title:'Integrated',desc:'Connecting energy and emissions with development and natural-resource outcomes.',icon:'/icons/integrated.png',iconLight:'/icons/integrated-light.png'},
  {title:'Spatially resolved',desc:'Moving beyond national averages to understand how pathways and impacts could differ across states, districts and places.',icon:'/icons/spatially.png',iconLight:'/icons/spatially-light.png'},
  {title:'Development-centred',desc:'Keeping employment, health, energy access, equity and economic development alongside mitigation.',icon:'/icons/development-centred.png',iconLight:'/icons/development-centred-light.png'},
  {title:'Rigorous & Open',desc:'Building robust research, models and datasets that others can examine, use and build upon.',icon:'/icons/rigorous-open.png',iconLight:'/icons/rigorous-open-light.png'}
];

const researchQuestions = [
  {title:"How might India's energy needs change?",desc:'Explore future demand across households, transport, industry and agriculture.',image:editorialMedia.energy},
  {title:'How could India meet those needs?',desc:'Understand different combinations of energy technologies, infrastructure and investment.',image:editorialMedia.solar},
  {title:'Where could the transition happen?',desc:"Explore where new infrastructure may be required and what this could mean across India's regions.",image:editorialMedia.cities},
  {title:'What resources could it require?',desc:'Examine interactions between energy infrastructure, land, water, agriculture, forests and biodiversity.',image:editorialMedia.forest},
  {title:'What could it mean for people?',desc:'Study implications for employment, health, energy access and equity.',image:editorialMedia.people},
  {title:'What choices and trade-offs emerge?',desc:"Understand how different development and mitigation choices interact on India's path to 2070.",image:editorialMedia.landscape}
];

const methodSteps = [
  {title:'Understand the possibilities',desc:"Data, stakeholder engagement and scenario development help identify the forces that could shape India's future."},
  {title:'Model different pathways',desc:'Integrated energy and land modelling explores how different development and mitigation futures could unfold.'},
  {title:'Understand their implications',desc:'Spatial and post-modelling analysis examines what those pathways could mean for infrastructure, resources, development, people and ecosystems.'},
  {title:'Make the evidence usable',desc:'Research, data, models and insights are shared to support further research and better-informed policy and planning.'}
];


const Label = ({children,light=false}) => <p className={"text-[11px] font-semibold uppercase tracking-[.18em] " + (light ? 'text-[#86d3c6]' : 'text-[#249a91]')}>{children}</p>;
const Title = ({children,className=''}) => <h2 className={"mt-3 max-w-4xl text-[clamp(1.8rem,2.55vw,2.75rem)] font-semibold leading-[1.18] tracking-[-.04em] " + className}>{children}</h2>;
const ArrowLink = ({to,children,dark=false}) => <Link to={to} className={"inline-flex items-center gap-2 text-sm font-semibold transition-[gap] duration-300 hover:gap-3 " + (dark ? 'text-[#9cdbcd]' : 'text-[#23988c]')}>{children}<ArrowUpRight size={17}/></Link>;
const Photo = ({src,alt='',className='',children}) => <EditorialPhoto src={src} alt={alt} className={className} imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]">{children}</EditorialPhoto>;

export const HomePage = () => {
  const {theme,ecoMode}=useGame();
  const light=theme==='light';
  const page=light?'bg-[#fafbf8] text-[#183547]':'bg-[#142a3e] text-[#f4f8f6]';
  const paper=light?'bg-[#f1f5f0]':'bg-[#1b3749]';
  const panel=light?'bg-white border-[#dce5e1]':'bg-[#234053] border-white/10';
  const inkMuted=light?'text-[#5c707c]':'text-[#c5d2d7]';
  const line=light?'border-[#d8e1df]':'border-white/15';

  const verifiedNews=PUBLISHED_NEWS_EVENTS.find(item=>item.type==='news'&&!item.fictional);
  const verifiedEvent=PUBLISHED_NEWS_EVENTS.find(item=>item.type==='event'&&!item.fictional);
  const sampleEvent=PUBLISHED_NEWS_EVENTS.find(item=>item.type==='event'&&item.fictional);
  const displayEvent=verifiedEvent||sampleEvent;
  // Client document specifies editorial slots, not actual approved stories.
  const latest=[
    {tag:'Research & Publications',title:'Latest paper/report',image:editorialMedia.research,to:'/publications'},
    {tag:'News & Updates',title:'Latest project update',image:editorialMedia.landscape,to:'/news-events'},
    {tag:'Workshops & Events',title:'Latest consultation/event',image:editorialMedia.convening,to:'/news-events'}
  ];

  return <div className={"nzi-editorial nzi-doc-copy w-full overflow-x-clip " + page}>
    {/* HERO: 100svh desktop, accessible overflow on very short displays */}
    <section className={"nzi-home-hero nzi-feature-photo relative isolate flex min-h-[100svh] items-center overflow-hidden px-[3%] pb-12 pt-28 lg:h-[100svh] lg:min-h-0 lg:pb-10 lg:pt-[106px] " + (light?'bg-[#eaf2eb] text-[#153447]':'bg-[#102b3c] text-white')}>
      <img src="/hero.jpg" alt="" aria-hidden="true" fetchPriority="high" className={"hero-photo pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-[65%_50%] " + (light?'opacity-95':ecoMode?'opacity-55':'opacity-85')}/>
      <div className={"pointer-events-none absolute inset-0 -z-20 " + (light?'bg-[linear-gradient(90deg,rgba(247,251,247,.98)_0%,rgba(247,251,247,.92)_36%,rgba(247,251,247,.58)_63%,rgba(247,251,247,.06)_100%)]':'bg-[linear-gradient(90deg,rgba(12,36,51,.98)_0%,rgba(12,36,51,.87)_45%,rgba(12,36,51,.20)_100%)]')}/>
      {!ecoMode&&<HeroContourLines className={"decorative-lines pointer-events-none absolute -right-[7%] top-[12%] -z-10 h-[76%] w-[60%] " + (light?'text-[#1d9c92] opacity-50':'text-[#7bd4c6] opacity-55')}/>}
      <div className="relative grid w-full items-center gap-8 xl:grid-cols-[minmax(0,820px)_1fr]">
        <div className="min-w-0">
          <h1 className={"max-w-[780px] text-[clamp(2.2rem,3.75vw,4.05rem)] font-semibold leading-[1.1] tracking-[-.055em] "+(light?"text-[#153447]":"text-white")}>What will it take for India to reach net zero, and what will different paths mean for the country?</h1>
          <div className={"mt-6 max-w-[730px] space-y-3 text-[clamp(.88rem,1vw,1rem)] leading-[1.68] " + (light?'text-[#3e596a]':'text-white/85')}>
            <p>India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.</p>
            <p>Net Zero India brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.</p>
          </div>
          <div className="nzi-hero-actions mt-6 flex flex-wrap gap-3">
            <Link to="/research" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#24988d] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#197c74]">Explore Our Research <ArrowUpRight size={16}/></Link>
            <Link to="/about" className={"inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-3 text-[13px] font-semibold " + (light?'border-[#618b8b] text-[#214356] hover:bg-white/50':'border-white/50 text-white hover:bg-white/10')}>About Net Zero India <ArrowRight size={16}/></Link>
          </div>
        </div>
      </div>
    </section>

    {/* 02 — clear editorial asymmetry: image / questions / conclusion */}
    <section id="why-nzi" className="px-[3%] py-20 sm:py-24 lg:py-28 lg:py-24">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,.93fr)_minmax(0,1.07fr)] lg:gap-12">
        <div>
          <Title className="mt-0!">Net zero is not one destination with <em className={"font-normal "+(light?"text-[#A93E5B]":"text-[#F4A7B0]")}>one road.</em></Title>
          <p className={"mt-4 text-sm font-semibold " + inkMuted}>India's transition will involve choices.</p>
          <Photo src={editorialMedia.agriculture} alt="Illustrative landscape of agricultural land" className="group relative mt-7 h-[290px] rounded-[22px] sm:h-[360px] lg:h-[410px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/40 via-transparent to-transparent"/>
          </Photo>
        </div>
        <div className="flex flex-col justify-between">
          <div className={"rounded-[22px] border p-7 sm:p-9 " + panel}>
            <div className={"divide-y " + (light?'divide-[#dce5e1]':'divide-white/10')}>
              {questionsOfTransition.map((item,i)=><div key={item} className="flex gap-4 py-4">
                <span className={"w-7 shrink-0 pt-0.5 font-mono text-[11px] "+(i%2===1?(light?"text-[#AF4760]":"text-[#F4A7B0]"):"text-[#2aa99d]")}>0{i+1}</span>
                <p className="text-[clamp(.94rem,1.08vw,1.1rem)] font-medium leading-[1.48]">{item}</p>
              </div>)}
            </div>
          </div>
          <p className={"mt-6 max-w-[700px] border-l-[3px] border-[#2ca79d] pl-5 text-[14px] leading-[1.85] " + inkMuted}>These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.</p>
        </div>
      </div>
    </section>

    {/* 03 — no repetitive card wall: editorial photograph with two-by-two research principles */}
    <section className={"px-[3%] py-20 sm:py-24 lg:py-28 " + paper}>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div><Title className="mt-0!">A more complete picture of India’s net-zero transition</Title></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Photo src={editorialMedia.forest} alt="Illustrative green forest landscape" className="group relative h-[360px] rounded-[22px] lg:h-auto lg:min-h-[440px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2e37]/65 to-transparent"/>
        </Photo>
        <div className="grid gap-3 sm:grid-cols-2">
          {differences.map((d,i)=>{
            const iconSrc = light ? d.icon : d.iconLight;
            return <article key={d.title} className={"nzi-raise group flex min-h-[185px] flex-col justify-between rounded-[18px] border p-5 sm:min-h-[210px] sm:p-6 transition-all duration-300 " + (i===1?(light?"bg-[#FFF0F0] border-[#F0C5CA]":"bg-[#373747] border-[#AE687D]/30"):panel)}>
            <div className="flex items-center justify-between">
              <div className={"flex h-11 w-11 items-center justify-center rounded-xl p-2 transition-transform duration-300 group-hover:scale-105 " + (i===1?(light?"bg-[#AD4561]/10":"bg-[#F1A0A9]/15"):(light?"bg-[#2aa99d]/10":"bg-[#2aa99d]/15"))}>
                <img src={iconSrc} alt={d.title} className="h-full w-full object-contain" />
              </div>
              <span className={"font-mono text-xs " + (i===1?(light?"text-[#AD4561]":"text-[#F1A0A9]"):"text-[#2aa99d]")}>0{i+1}</span>
            </div>
            <div className="mt-7"><h3 className="text-[18px] font-semibold">{d.title}</h3><p className={"mt-2 text-[13px] leading-[1.65] " + inkMuted}>{d.desc}</p></div>
          </article>})}
        </div>
      </div>
    </section>

    {/* 04 — asymmetric magazine grid, not six equal-sized cards */}
    <section className={"px-[3%] py-20 sm:py-24 lg:py-28 " + (light?'bg-[#e9f1ed]':'bg-[#1b3b4f]')}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><Title className="mt-0!">One transition. <em className={"font-normal "+(light?"text-[#A93E5B]":"text-[#F3A3AD]")}>Many connected questions.</em></Title></div>
        <ArrowLink to="/research">Explore the Research</ArrowLink>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {researchQuestions.map((q,i)=><Link to="/research" key={q.title} className={"group relative isolate flex min-h-[270px] flex-col justify-end overflow-hidden rounded-[22px] border border-white/15 bg-[#1e4350] text-white md:min-h-[300px] " + (i===0?'lg:col-span-7 lg:min-h-[360px]':i===1?'lg:col-span-5':'lg:col-span-3')}>
          <img src={q.image} alt="" loading="lazy" decoding="async" className="nzi-card-image absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#092636]/95 via-[#153645]/40 to-transparent"/>
          <span className={"absolute left-5 top-5 rounded-full px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-sm "+(i===1||i===4?"bg-[#A64461]/90":"bg-[#153947]/75")}>0{i+1}</span>
          <div className="p-6 sm:p-8"><h3 className={"font-semibold leading-tight tracking-tight " + (i===0?'text-[clamp(1.55rem,2.2vw,2.25rem)]':'text-[clamp(1.16rem,1.35vw,1.45rem)]')}>{q.title}</h3><p className="mt-2 max-w-lg text-[13px] leading-[1.7] text-white/80">{q.desc}</p></div>
        </Link>)}
      </div>
    </section>

    {/* 05 — connected journey, no card grid */}
    <section className="px-[3%] py-20 sm:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:gap-16">
        <div>
          <Title className="mt-0!">From possible futures to evidence for decisions</Title>
          <div className="relative mt-9 space-y-0">
            <span aria-hidden="true" className={"absolute bottom-6 left-[19px] top-5 w-px " + (light?'bg-[#c0d3ce]':'bg-white/20')}/>
            {methodSteps.map((step,i)=><div className="relative flex gap-5 pb-7 last:pb-0" key={step.title}>
              <span className={"relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold text-white "+(i===2?"border-[#E98D96] bg-[#B34D65]":"border-[#2aa99d] bg-[#249b91]")}>{String(i+1).padStart(2,'0')}</span>
              <div className={"flex-1 border-b pb-6 last:border-b-0 " + line}><h3 className="text-[17px] font-semibold">{step.title}</h3><p className={"mt-2 max-w-[650px] text-[14px] leading-[1.75] " + inkMuted}>{step.desc}</p></div>
            </div>)}
          </div>
          <div className="mt-7"><ArrowLink to="/research/methodological-advances-modeling">Explore Our Approach</ArrowLink></div>
        </div>
        <Photo src={editorialMedia.research} alt="Illustrative research environment" className="group relative h-[330px] rounded-[22px] lg:min-h-[640px] lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#102b3d]/65 via-transparent to-transparent"/>
        </Photo>
      </div>
    </section>

    {/* 06 — atmospheric full-bleed quotation */}
    <section className="nzi-feature-photo relative isolate overflow-hidden bg-[#0c2936] px-[3%] py-20 text-white sm:py-24 lg:py-28">
      <img src={editorialMedia.landscape} alt="" loading="lazy" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-65"/>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,37,48,.94)_0%,rgba(8,37,48,.82)_57%,rgba(8,37,48,.30)_100%)]"/>
      <div className="max-w-[1000px]">
        <h2 className="max-w-4xl text-[clamp(2rem,3.5vw,3.8rem)] font-semibold leading-[1.18] tracking-[-.045em]">We are not looking for <em className="font-normal">the</em> pathway to net zero.</h2>
        <blockquote className="mt-7 border-l-[3px] border-[#E98D96] pl-5 sm:pl-7"><p className="max-w-[840px] text-[clamp(1.05rem,1.55vw,1.45rem)] leading-[1.65]">We are building the evidence to understand different pathways; their possibilities, consequences and trade-offs.</p>
          <p className="mt-5 max-w-[790px] text-[14px] leading-[1.75] text-white/80">So that decisions about India's transition can be informed by evidence that reflects the country's development priorities, resources and diversity.</p>
        </blockquote>
      </div>
    </section>

    {/* 07 — oversized feature, two smaller editorial tiles */}
    <section className="px-[3%] py-20 sm:py-24 lg:py-28">
      <div className="mb-8"><Title className="mt-0!">Explore our work</Title></div>
      <div className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
        <Link to="/research" className="group relative isolate flex min-h-[410px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#153c43] p-6 text-white sm:p-8 lg:min-h-[515px]">
          <img alt="" src={editorialMedia.solar} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#092f39]/95 via-[#0a3440]/45 to-[#183542]/20"/>
          <div className="flex justify-between"><span className="rounded-full border border-[#F7AEB6]/70 bg-[#8B4055]/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#FFD3D8]">Featured Research</span><ArrowUpRight size={21}/></div>
          <div>
            {/* Client doc slot: [Title / image / short description] — populate once a featured item is approved. */}
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#a7d8ce]">Read the research <ArrowRight size={16}/></span>
          </div>
        </Link>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {tag:'Open Calls & Collaborations',title:'Open Calls & Collaborations',desc:'Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative.',image:editorialMedia.people,url:'/contact',cta:'Explore Opportunities'},
            {tag:'Publications & Outputs',title:'Publications & Outputs',desc:'Working papers, policy briefs, reports, presentations, and other outputs from the initiative.',image:editorialMedia.research,url:'/publications',cta:'View all outputs'}
          ].map(card=><Link key={card.tag} to={card.url} className={"group grid min-h-[210px] overflow-hidden rounded-[22px] border sm:grid-cols-1 lg:grid-cols-[42%_1fr] " + panel}>
            <Photo src={card.image} alt="" className="hidden min-h-full sm:block lg:block"/>
            <div className="flex flex-col justify-between p-5"><div><Label>{card.tag}</Label><p className={"mt-5 text-[14px] leading-[1.8] " + inkMuted}>{card.desc}</p></div><span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-[#2fa99c]">{card.cta}<ArrowUpRight size={16}/></span></div>
          </Link>)}
        </div>
      </div>
    </section>

    {/* 08 — collaboration / brand associations only supplied by the client */}
    <section className={"px-[3%] py-20 sm:py-24 lg:py-28 " + paper}>
      <div className="grid items-center gap-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-14">
        <div className="group relative">
          <Photo src={editorialMedia.people} alt="Illustrative research collaboration" className="h-[380px] rounded-[22px] sm:h-[450px]"/>
          <div className="absolute -bottom-4 right-4 hidden sm:block"><Photo src={editorialMedia.forest} alt="" className={"h-32 w-36 rounded-2xl border-4 "+(light?"border-white":"border-[#1b3749]")}/></div>
        </div>
        <div><Title className="mt-0!">Built through collaboration. <em className="font-normal text-[#279d91]">Led from India.</em></Title>
          <p className={"mt-4 text-[14px] leading-[1.8] " + inkMuted}>Net Zero India brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.</p>
          <div className={"mt-7 rounded-[18px] border p-5 " + panel}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2aa99d]">Led by</p><p className="mt-2 text-[17px] font-semibold">School of Public Policy, IIT Delhi</p>
            <div className={"my-5 border-t " + line}/>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2aa99d]">Research Partners</p>
            <div className="mt-3 flex flex-wrap gap-2"><span className={"rounded-lg border px-3 py-2 text-[13px] font-semibold " + line}>Prayas Energy Group</span><span className={"rounded-lg border px-3 py-2 text-[13px] font-semibold " + line}>Princeton University</span></div>
          </div>
          <div className="mt-6"><ArrowLink to="/consortium">Meet the Team & Partners</ArrowLink></div>
        </div>
      </div>
    </section>

    {/* 09 — intentionally very quiet */}
    <section className={"border-y px-[3%] py-9 " + line}>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#2aa99d]"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E98D96]"/>Supported by</span>
        <span className="text-[19px] font-semibold tracking-tight">Schmidt Sciences <span className={"text-[12px] font-normal " + inkMuted}>/ AX programme</span></span>
        <span className="text-[19px] font-semibold tracking-tight">Giving Green</span>
        {/* Client doc also lists "Princeton University (if the relevant funding arrangement requires Princeton to appear here as well)" — omitted until that arrangement is confirmed. */}
      </div>
    </section>

    {/* 10 — refined editorial news cards */}
    <section className="px-[3%] py-20 sm:py-24 lg:py-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><Title className="mt-0!">Latest from Net Zero India</Title></div><ArrowLink to="/news-events">View All Updates</ArrowLink></div>
      <div className="grid gap-6 md:grid-cols-3">
        {latest.map(card=><Link to={card.to} key={card.tag} className={"group overflow-hidden rounded-[22px] border " + panel}>
          <Photo src={card.image} alt="" className="h-[180px] sm:h-[210px]"/>
          <div className="flex min-h-[200px] flex-col p-5"><Label>{card.tag}</Label><h3 className="mt-5 text-[19px] font-semibold leading-snug">{card.title}</h3></div>
        </Link>)}
      </div>
    </section>

    {/* FINAL — end on a photographic invitation */}
    <section className="nzi-feature-photo relative isolate overflow-hidden bg-[#122f43] px-[3%] py-20 text-white sm:py-24">
      <img alt="" src={editorialMedia.energy} loading="lazy" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-50"/>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#102c3d]/95 via-[#102c3d]/85 to-[#102c3d]/45"/>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <h2 className="max-w-4xl text-[clamp(2.1rem,3.4vw,3.6rem)] font-semibold leading-[1.18] tracking-[-.045em]">India's path to 2070 is still being written.</h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-white/80">Explore the research, evidence and ideas helping us understand the choices ahead.</p>
        </div>
        <Link to="/research" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#26998e] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#197c74]">Explore Our Research <ArrowRight size={17}/></Link>
      </div>
    </section>
    <Footer/>
  </div>;
};
