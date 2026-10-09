import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowDown, Network, MapPin, HeartPulse, BookOpen, Compass, Building2, Sprout, Users, Scale, Handshake, CalendarDays } from 'lucide-react';
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
  {title:'Integrated',desc:'Connecting energy and emissions with development and natural-resource outcomes.',icon:Network},
  {title:'Spatially resolved',desc:'Moving beyond national averages to understand how pathways and impacts could differ across states, districts and places.',icon:MapPin},
  {title:'Development-centred',desc:'Keeping employment, health, energy access, equity and economic development alongside mitigation.',icon:HeartPulse},
  {title:'Rigorous & Open',desc:'Building robust research, models and datasets that others can examine, use and build upon.',icon:BookOpen}
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

const PageLabel = ({children})=><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#2fa99c]">{children}</p>;
const SectionTitle = ({children,className=''})=><h2 className={'mt-3 text-[clamp(1.85rem,2.65vw,2.9rem)] font-semibold leading-[1.18] tracking-[-.035em] '+className}>{children}</h2>;
const SmallLink=({to,children})=><Link className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2fa99c] hover:underline" to={to}>{children}<ArrowUpRight size={16}/></Link>;

export const HomePage = () => {
  const {theme, displayMode, ecoMode}=useGame();
  const light=theme==='light';
  const palette=light?'bg-[#fafbf8] text-[#193346]':'bg-[#142a3e] text-[#f5f9f7]';
  const alternative=light?'bg-[#f0f5f0]':'bg-[#1b3446]';
  const surface=light?'bg-white border-[#dce4e1]':'bg-[#20384b] border-white/10';
  const muted=light?'text-[#586c76]':'text-[#c4d0d4]';
  const border=light?'border-[#d5dfdc]':'border-white/15';
  const actualNews=PUBLISHED_NEWS_EVENTS.find(e=>e.type==='news'&&!e.fictional);
  const actualEvent=PUBLISHED_NEWS_EVENTS.find(e=>e.type==='event'&&!e.fictional);
  const sampleEvent=PUBLISHED_NEWS_EVENTS.find(e=>e.type==='event'&&e.fictional);
  const latestEvent=actualEvent||sampleEvent;
  const latest=[
    {tag:'Research & Publications',title:'Working papers, policy briefs and research outputs',subtitle:'Illustrative research concepts while verified outputs are prepared.',image:editorialMedia.research,url:'/publications'},
    {tag:'News & Updates',title:actualNews?.title||'Latest project updates',subtitle:actualNews?.excerpt||'News blurbs will appear here after editorial approval.',image:editorialMedia.landscape,url:actualNews?'/news-events/'+actualNews.slug:'/news-events'},
    {tag:'Workshops & Events',title:latestEvent?.title||'Latest consultation and events',subtitle:latestEvent?.fictional?'Fictional event example — no event has been scheduled.':latestEvent?.excerpt||'Approved event details will appear here.',image:editorialMedia.convening,url:latestEvent?'/news-events/'+latestEvent.slug:'/news-events'}
  ];

  return <div className={'w-full overflow-x-clip '+palette}>
    {/* Full-viewport desktop hero. On very small phones it may grow to avoid clipping content. */}
    <section className={\`nzi-home-hero relative isolate flex min-h-[100svh] items-center overflow-hidden px-[3%] pb-12 pt-[100px] lg:h-[100svh] lg:min-h-0 lg:pb-12 lg:pt-[104px] \${light?'bg-[#e6f0e8] text-[#16364b]':'bg-[#142c40] text-white'}\`}>
      <img src="/hero.jpg" alt="" aria-hidden="true" fetchPriority="high" decoding="async"
        className={\`hero-photo pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-[67%_center] \${light?'opacity-55':ecoMode?'opacity-55':'opacity-85'}\`}/>
      <div className={\`pointer-events-none absolute inset-0 -z-20 \${light
        ? 'bg-[linear-gradient(90deg,rgba(250,251,247,.98)_0%,rgba(250,251,247,.91)_42%,rgba(250,251,247,.16)_100%)]'
        : 'bg-[linear-gradient(90deg,rgba(10,34,50,.98)_0%,rgba(10,34,50,.88)_40%,rgba(10,34,50,.12)_100%)]'}\`}/>
      {!ecoMode&&<HeroContourLines className={\`decorative-lines pointer-events-none absolute -right-[5%] top-[15%] -z-10 h-[70%] w-[58%] \${light?'text-[#128f85] opacity-50':'text-[#8ad6c9] opacity-60'}\`}/>}
      <div className="relative w-full">
        <div className="max-w-[780px]">
          <span className={\`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[.22em] \${light?'text-[#137d79]':'text-[#aad56d]'}\`}><span className="h-px w-7 bg-current"/>Net Zero India</span>
          <h1 className="mt-5 text-[clamp(2rem,3.55vw,3.9rem)] font-semibold leading-[1.12] tracking-[-.045em] sm:mt-6">
            What will it take for India to reach net zero, and what will different paths mean for the country?
          </h1>
          <div className={\`mt-5 max-w-[690px] space-y-3 text-[clamp(.86rem,.98vw,.99rem)] leading-[1.63] \${light?'text-[#3b5868]':'text-[#e0eaec]'}\`}>
            <p>India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.</p>
            <p>Net Zero India brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link to="/research" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#258f86] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1a716d]">Explore Our Research <ArrowUpRight size={15}/></Link>
            <Link to="/about" className={\`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold \${light?'border-[#719e9b] text-[#173e4b] hover:bg-white/50':'border-white/45 text-white hover:bg-white/10'}\`}>About Net Zero India <ArrowRight size={15}/></Link>
          </div>
        </div>
      </div>
      <a href="#why-nzi" aria-label="Discover why NZI exists" className={\`absolute bottom-4 left-[3%] hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] sm:inline-flex \${light?'text-[#456878]':'text-white/65'}\`}>Discover more <ArrowDown size={14}/></a>
    </section>

    {/* Why NZI exists — asymmetrical photo editorial with a compact question panel */}
    <section id="why-nzi" className="px-[3%] py-16 sm:py-20">
      <div className="grid items-start gap-9 xl:grid-cols-[.93fr_1.07fr] xl:gap-14">
        <div>
          <PageLabel>01 / Why NZI exists</PageLabel>
          <SectionTitle>Net zero is not one destination with <em className="font-normal text-[#30a598]">one road.</em></SectionTitle>
          <p className={'mt-4 text-sm font-semibold '+muted}>India's transition will involve choices.</p>
          <p className={'mt-4 max-w-[690px] text-[14px] leading-[1.8] '+muted}>These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.</p>
          <EditorialPhoto src={editorialMedia.agriculture} alt="Illustrative agricultural landscape in India" className="mt-7 h-[200px] w-full rounded-2xl sm:h-[290px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#102c3a]/30 to-transparent"/>
          </EditorialPhoto>
        </div>
        <div className={'overflow-hidden rounded-2xl border '+surface}>
          <div className={'flex items-center justify-between border-b px-6 py-5 '+border}>
            <span className="text-xs font-semibold">Questions shaping the transition</span><span className="font-mono text-[11px] text-[#36aca0]">01—05</span>
          </div>
          {questionsOfTransition.map((q,i)=><div key={q} className={'grid grid-cols-[32px_1fr] gap-3 border-b px-5 py-4 last:border-b-0 sm:px-6 '+border}>
            <span className="pt-0.5 font-mono text-[11px] text-[#32a99d]">0{i+1}</span><p className="text-[clamp(.97rem,1.1vw,1.2rem)] font-medium leading-[1.5]">{q}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* The difference — four designed cards and a strong supporting photograph */}
    <section className={'px-[3%] py-16 sm:py-20 '+alternative}>
      <div className="grid items-end gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div><PageLabel>02 / The difference</PageLabel><SectionTitle className="max-w-[700px]">A more complete picture of India’s net-zero transition</SectionTitle></div>
        <p className={'max-w-[470px] text-[14px] leading-[1.75] lg:ml-auto '+muted}>A connected understanding of energy, development, natural resources and the people affected by different pathways.</p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <EditorialPhoto src={editorialMedia.forest} alt="Illustrative forest and natural landscape" className="h-[330px] rounded-2xl sm:h-[490px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#102b3d]/70 via-transparent to-transparent"/>
          <span className="absolute bottom-6 left-6 max-w-[290px] text-sm font-medium leading-[1.5] text-white">Understanding the connections between systems, regions and resources.</span>
        </EditorialPhoto>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {differences.map((item,i)=>{const Icon=item.icon;return <div key={item.title} className={'flex min-h-[180px] flex-col justify-between rounded-2xl border p-4 sm:min-h-[225px] sm:p-5 '+surface}>
            <div className="flex items-center justify-between text-[#2da99e]"><Icon size={22} strokeWidth={1.5}/><span className="font-mono text-[10px]">0{i+1}</span></div>
            <div><h3 className="text-[clamp(1rem,1.24vw,1.3rem)] font-semibold">{item.title}</h3><p className={'mt-2 text-[12px] leading-[1.65] '+muted}>{item.desc}</p></div>
          </div>})}
        </div>
      </div>
    </section>

    {/* Connected questions — image-led small cards */}
    <section className="bg-[#193c4d] px-[3%] py-16 text-white sm:py-20">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><PageLabel>03 / What NZI is trying to understand</PageLabel><SectionTitle className="max-w-3xl">One transition. <em className="font-normal text-[#a6d276]">Many connected questions.</em></SectionTitle></div>
        <SmallLink to="/research">Explore the Research</SmallLink>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {researchQuestions.map((q,i)=><Link to="/research" key={q.title} className="group overflow-hidden rounded-2xl border border-white/15 bg-[#24485a] hover:border-[#80d0c5]">
          <EditorialPhoto src={q.image} alt={'Illustrative imagery for '+q.title} className="h-[150px] sm:h-[178px]" imageClassName="transition-transform duration-500 group-hover:scale-105">
            <span className="absolute left-4 top-4 rounded-full bg-[#102d3b]/70 px-3 py-1 font-mono text-[10px] text-white">0{i+1}</span>
          </EditorialPhoto>
          <div className="p-5"><h3 className="text-[clamp(1.05rem,1.25vw,1.3rem)] font-semibold leading-snug">{q.title}</h3><p className="mt-2 text-[13px] leading-[1.7] text-white/70">{q.desc}</p></div>
        </Link>)}
      </div>
    </section>

    {/* How it works — evidence-oriented, paired photography and ordered steps */}
    <section className="px-[3%] py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
        <div>
          <PageLabel>04 / How it works</PageLabel>
          <SectionTitle>From possible futures to evidence for decisions</SectionTitle>
          <EditorialPhoto src={editorialMedia.research} alt="Illustrative researcher at work" className="mt-7 h-[260px] rounded-2xl sm:h-[330px]"/>
          <div className="mt-6"><SmallLink to="/research/methodological-advances-modeling">Explore Our Approach</SmallLink></div>
        </div>
        <div className={'overflow-hidden rounded-2xl border '+surface}>
          {methodSteps.map((item,i)=><div key={item.title} className={'grid grid-cols-[42px_1fr] gap-3 border-b px-5 py-5 last:border-b-0 sm:grid-cols-[54px_1fr] sm:px-7 sm:py-6 '+border}>
            <span className="font-mono text-[15px] text-[#2da99e]">{String(i+1).padStart(2,'0')}</span>
            <div><h3 className="text-lg font-semibold">{item.title}</h3><p className={'mt-2 text-[13px] leading-[1.72] '+muted}>{item.desc}</p></div>
          </div>)}
        </div>
      </div>
    </section>

    {/* Guiding philosophy */}
    <section className="bg-[#e2ece5] px-[3%] py-16 text-[#18384b] sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div><PageLabel>05 / A guiding philosophy</PageLabel>
          <SectionTitle className="max-w-[810px]">We are not looking for <em className="font-normal">the</em> pathway to net zero.</SectionTitle>
          <div className="mt-6 max-w-[760px] border-l-[3px] border-[#2aa99d] pl-5">
            <p className="text-[clamp(1.1rem,1.45vw,1.5rem)] leading-[1.55]">We are building the evidence to understand different pathways; their possibilities, consequences and trade-offs.</p>
            <p className="mt-4 text-[14px] leading-[1.75] text-[#4d6870]">So that decisions about India's transition can be informed by evidence that reflects the country's development priorities, resources and diversity.</p>
          </div>
        </div>
        <EditorialPhoto src={editorialMedia.landscape} alt="Illustrative landscape representing possible futures" className="h-[270px] rounded-2xl sm:h-[365px]"/>
      </div>
    </section>

    {/* Featured research / knowledge */}
    <section className="px-[3%] py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><PageLabel>06 / Research & knowledge</PageLabel><SectionTitle>Explore our work</SectionTitle></div><SmallLink to="/research">Explore research themes</SmallLink>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {tag:'Featured Research',title:"Exploring India's transition pathways",desc:'Browse the research themes and questions guiding the initiative.',image:editorialMedia.solar,to:'/research',action:'Read the research'},
          {tag:'Open Calls & Collaborations',title:'Research grows through collaboration',desc:'Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative.',image:editorialMedia.people,to:'/contact',action:'Explore Opportunities'},
          {tag:'Publications & Outputs',title:'Research for further work',desc:'Working papers, policy briefs, reports, presentations, and other outputs from the initiative.',image:editorialMedia.research,to:'/publications',action:'View all outputs'},
        ].map(item=><Link key={item.tag} to={item.to} className={'group overflow-hidden rounded-2xl border transition-colors hover:border-[#2fa99c] '+surface}>
          <EditorialPhoto src={item.image} alt={'Illustrative photo for '+item.tag} className="h-[185px] sm:h-[215px]" imageClassName="transition-transform duration-500 group-hover:scale-105"/>
          <div className="flex min-h-[210px] flex-col p-5"><PageLabel>{item.tag}</PageLabel>
            <h3 className="mt-3 text-[clamp(1.1rem,1.5vw,1.45rem)] font-semibold leading-[1.28]">{item.title}</h3>
            <p className={'mt-2 text-[13px] leading-[1.68] '+muted}>{item.desc}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-[#2fa99c]">{item.action} <ArrowUpRight size={15}/></span>
          </div>
        </Link>)}
      </div>
    </section>

    {/* Collaborators */}
    <section className={'px-[3%] py-16 sm:py-20 '+alternative}>
      <div className="grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <EditorialPhoto src={editorialMedia.people} alt="Illustrative research collaboration photograph" className="order-2 h-[300px] rounded-2xl lg:order-1 lg:h-[410px]"/>
        <div className="order-1 lg:order-2">
          <PageLabel>07 / People & collaboration</PageLabel><SectionTitle>Built through collaboration. <em className="font-normal text-[#2fa99c]">Led from India.</em></SectionTitle>
          <p className={'mt-4 text-[14px] leading-[1.8] '+muted}>Net Zero India brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.</p>
          <div className={'mt-6 grid gap-4 border-t pt-5 '+border}>
            <div><span className="text-[10px] font-semibold uppercase tracking-widest text-[#2fa99c]">Led by</span><p className="mt-1 text-lg font-semibold">School of Public Policy, IIT Delhi</p></div>
            <div><span className="text-[10px] font-semibold uppercase tracking-widest text-[#2fa99c]">Research Partners</span><p className="mt-1 text-[15px] font-semibold">Prayas Energy Group · Princeton University</p></div>
          </div>
          <div className="mt-6"><SmallLink to="/consortium">Meet the Team & Partners</SmallLink></div>
        </div>
      </div>
    </section>

    {/* Quieter supporter strip */}
    <section className={'border-y px-[3%] py-9 '+border}>
      <div className="flex flex-wrap items-center gap-x-16 gap-y-5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2fa99c]">Supported by</span>
        <span className="text-[17px] font-semibold">Schmidt Sciences <span className={'text-[13px] font-normal '+muted}>/ AX programme</span></span>
        <span className="text-[17px] font-semibold">Giving Green</span>
      </div>
    </section>

    {/* Latest */}
    <section className="px-[3%] py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><PageLabel>08 / News and knowledge</PageLabel><SectionTitle>Latest from Net Zero India</SectionTitle></div><SmallLink to="/news-events">View All Updates</SmallLink>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {latest.map(item=><Link to={item.url} key={item.tag} className={'group overflow-hidden rounded-2xl border hover:border-[#2fa99c] '+surface}>
          <EditorialPhoto src={item.image} alt={'Illustrative image for '+item.tag} className="h-[175px]" imageClassName="transition-transform duration-500 group-hover:scale-105"/>
          <div className="min-h-[165px] p-5"><PageLabel>{item.tag}</PageLabel><h3 className="mt-3 text-[17px] font-semibold leading-[1.38]">{item.title}</h3><p className={'mt-2 text-[12px] leading-[1.65] '+muted}>{item.subtitle}</p></div>
        </Link>)}
      </div>
    </section>

    {/* Final invitation */}
    <section className="bg-[#183648] px-[3%] py-16 text-white sm:py-20">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div><PageLabel>Research for India's future</PageLabel>
          <SectionTitle className="max-w-[900px] text-white">India's path to 2070 is still being written.</SectionTitle>
          <p className="mt-4 max-w-[750px] text-[15px] leading-[1.75] text-white/75">Explore the research, evidence and ideas helping us understand the choices ahead.</p>
        </div>
        <Link to="/research" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#258f86] px-6 py-3 text-sm font-semibold text-white hover:bg-[#176e6a]">Explore Our Research <ArrowRight size={16}/></Link>
      </div>
    </section>
    <Footer/>
  </div>;
};
