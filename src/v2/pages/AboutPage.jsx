import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight, ArrowDown, Network, MapPinned, ShieldCheck, Compass, Users, BookOpen, Building2, Landmark, Zap} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {EditorialPhoto} from '../components/EditorialPhoto';
import {HeroContourLines} from '../components/HeroContourLines';
import {editorialMedia} from '../data/editorialMedia';

// All visible copy is verbatim from the approved NZI About document.
const principles=[
 {name:'Rigorous',icon:'/icons/rigorous.png',iconDark:'/icons/rigorous-dark.png',desc:'Our research is designed to withstand scrutiny, drawing on robust methods, high-quality research and expertise across disciplines.'},
 {name:'Independent',icon:'/icons/independent.png',iconDark:'/icons/independent-dark.png',desc:'Our research questions are driven by the evidence and the challenges India needs to understand. NZI does not advocate for a predetermined pathway.'},
 {name:'Collaborative',icon:'/icons/collaborative.png',iconDark:'/icons/collaborative-dark.png',desc:'Complex questions require diverse expertise. We work across institutions, disciplines and stakeholder groups to strengthen how the transition is understood.'},
 {name:'Open',icon:'/icons/open.png',iconDark:'/icons/open-dark.png',desc:'We aim to make research, methods, models and data increasingly accessible so others can examine, use and build upon the work.'}
];
const approach=[
 {title:'Systems that connect',icon:'/icons/fields.png',image:editorialMedia.water,desc:'Energy, land, water, agriculture, forests, infrastructure and development outcomes influence one another. NZI brings these dimensions together to understand how a choice in one part of the system can create consequences elsewhere.'},
 {title:'National scale, local detail',icon:'/icons/clusters.png',image:editorialMedia.cities,desc:'National averages can hide significant differences between regions. Spatially resolved analysis helps examine where infrastructure may be required, where resources may be under pressure, and how the opportunities and impacts of the transition could vary across India.'}
];
const institutions=[
 {name:'School of Public Policy, IIT Delhi',role:'Lead Institution',icon:Landmark,description:'Leading the Net Zero India Initiative and bringing together its research, policy and interdisciplinary dimensions.'},
 {name:'Prayas Energy Group',role:'Research Partner',icon:Zap,description:'Contributing to energy-related analysis, including energy-demand modelling.'},
 {name:'Princeton University / Andlinger Center for Energy and the Environment',role:'Core Partner',icon:Building2,description:'Contributing to energy-system and supply-side modelling and related research.'}
];

const Eyebrow=({children,light=false})=><p className={"text-[11px] font-semibold uppercase tracking-[.18em] "+(light?'text-[#86d3c6]':'text-[#249a91]')}>{children}</p>;
const Title=({children,className=''})=><h2 className={"max-w-4xl text-[clamp(1.8rem,2.55vw,2.75rem)] font-semibold leading-[1.18] tracking-[-.04em] "+className}>{children}</h2>;
const Photo=({src,alt='',className='',children})=><EditorialPhoto src={src} alt={alt} className={className} imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]">{children}</EditorialPhoto>;

/** Decorative: one national block resolving into finer regional cells. */
const GranularityVisual=({light})=>{
 const tone=light?'#249a91':'#7bd4c6';
 const cells=Array.from({length:64},(_,i)=>i);
 return <div aria-hidden="true" className="flex items-center gap-4 sm:gap-6">
  <div className="h-20 w-20 shrink-0 rounded-xl sm:h-32 sm:w-32" style={{background:tone,opacity:.85}}/>
  <ArrowUpRight size={22} className="shrink-0 rotate-45 opacity-50"/>
  <div className="grid h-20 w-20 shrink-0 grid-cols-3 gap-1 sm:h-32 sm:w-32">{cells.slice(0,9).map(i=><span key={i} className="rounded-md" style={{background:i===4?'#E98D96':tone,opacity:.35+(i%4)*.15}}/>)}</div>
  <ArrowUpRight size={22} className="shrink-0 rotate-45 opacity-50"/>
  <div className="grid h-20 w-20 shrink-0 grid-cols-8 gap-[3px] sm:h-32 sm:w-32">{cells.map(i=><span key={i} className="rounded-[2px]" style={{background:[13,22,41,50].includes(i)?'#E98D96':tone,opacity:.2+((i*7)%5)*.17}}/>)}</div>
 </div>;
};

export const AboutPage=()=>{
 const {theme,ecoMode}=useGame(),light=theme==='light';
 const page=light?'bg-[#fafbf8] text-[#183547]':'bg-[#142a3e] text-[#f4f8f6]';
 const paper=light?'bg-[#f1f5f0]':'bg-[#1b3749]';
 const panel=light?'bg-white border-[#dce5e1]':'bg-[#234053] border-white/10';
 const inkMuted=light?'text-[#5c707c]':'text-[#c5d2d7]';
 const line=light?'border-[#d8e1df]':'border-white/15';
 const strong='font-semibold '+(light?'text-[#183547]':'text-white');
 const coral=light?'text-[#A93E5B]':'text-[#F4A7B0]';
 const body='text-[15px] leading-[1.85] '+inkMuted;

 return <div className={"nzi-editorial w-full overflow-x-clip "+page}>
  {/* Full-width banner */}
  <header className={"nzi-feature-photo relative isolate flex min-h-[86svh] items-end overflow-hidden px-[3%] pb-16 pt-36 sm:pb-20 "+(light?'bg-[#eaf2eb] text-[#153447]':'bg-[#102b3c] text-white')}>
   <img src={editorialMedia.landscape} alt="" aria-hidden="true" fetchPriority="high" className={"hero-photo pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center "+(light?'opacity-90':ecoMode?'opacity-50':'opacity-75')}/>
   <div className={"pointer-events-none absolute inset-0 -z-20 "+(light?'bg-[linear-gradient(90deg,rgba(247,251,247,.98)_0%,rgba(247,251,247,.9)_42%,rgba(247,251,247,.35)_100%)]':'bg-[linear-gradient(90deg,rgba(12,36,51,.97)_0%,rgba(12,36,51,.85)_48%,rgba(12,36,51,.25)_100%)]')}/>
   {!ecoMode&&<HeroContourLines className={"decorative-lines pointer-events-none absolute -right-[6%] top-[10%] -z-10 h-[80%] w-[58%] "+(light?'text-[#1d9c92] opacity-50':'text-[#7bd4c6] opacity-55')}/>}
   <div className="max-w-[860px]">
    <h1 className={"text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[1.08] tracking-[-.05em] "+(light?'text-[#153447]':'text-white')}>Building a deeper understanding of India’s path to net&nbsp;zero.</h1>
    <div className={"mt-7 grid gap-5 text-[clamp(.9rem,1vw,1.02rem)] leading-[1.75] sm:grid-cols-2 sm:gap-8 "+(light?'text-[#3e596a]':'text-white/85')}>
     <p>Net Zero India is a research initiative led by the <strong className={light?'font-semibold text-[#153447]':'font-semibold text-white'}>School of Public Policy, IIT Delhi</strong>, bringing together researchers and institutions to examine how India could reach net-zero emissions by 2070, and what different pathways could mean for the country’s development, people and natural resources.</p>
     <p className={"border-l-2 pl-5 "+(light?'border-[#BA5068]':'border-[#E98D96]')}>Our aim is to build rigorous, spatially detailed and accessible evidence that can strengthen research, inform policy and enable more inclusive conversations about India’s transition.</p>
    </div>
   </div>
   <a href="#development" aria-label="Scroll to next section" className={"absolute bottom-6 right-[3%] hidden h-11 w-11 items-center justify-center rounded-full border sm:inline-flex "+(light?'border-[#9bb7b3] text-[#456a73]':'border-white/40 text-white/80')}><ArrowDown size={17}/></a>
  </header>

  <main>
   {/* Why Net Zero India exists — narrative with pull quote */}
   <section id="development" className="px-[3%] py-20 sm:py-24 lg:py-28">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-16">
     <div className="lg:sticky lg:top-28 lg:self-start">
      <Title>India’s net-zero transition is also a <em className={"font-normal "+coral}>development transition.</em></Title>
      <p className={"mt-6 max-w-xl "+body}>India’s path to net zero will unfold alongside profound changes in its economy and society. In the decades leading to 2070, the country will continue to urbanise, build infrastructure, expand access to services, transform industries and respond to changing aspirations and patterns of consumption.</p>
      <div className="group mt-8 grid grid-cols-[1.3fr_1fr] gap-3">
       <Photo src={editorialMedia.agriculture} alt="Illustrative agricultural landscape" className="h-[220px] rounded-[20px] sm:h-[260px]"/>
       <Photo src={editorialMedia.solar} alt="Illustrative solar installation" className="mt-10 h-[220px] rounded-[20px] sm:h-[260px]"/>
      </div>
     </div>
     <div className="flex flex-col gap-6">
      <blockquote className={"rounded-[22px] border p-7 sm:p-9 "+panel}>
       <p className="text-[clamp(1.35rem,2vw,2rem)] font-semibold leading-[1.3] tracking-[-.03em]">The choices made along the way will shape <em className={"font-normal "+coral}>more than emissions.</em></p>
      </blockquote>
      <p className={body}>A rapid expansion of renewable energy, for instance, will require land and infrastructure. Where these are located can have implications for agriculture, forests, water and biodiversity. Changes in the energy system can create new employment opportunities while reshaping existing livelihoods. Technology and investment choices can influence energy access, public health and how the costs and benefits of the transition are distributed.</p>
      <div className="rounded-[22px] bg-[#1d4f5a] p-7 text-white sm:p-9">
       <p className="text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.5]"><strong className="font-semibold">Understanding India’s path to net zero therefore requires understanding climate and development together.</strong></p>
       <p className="mt-5 border-t border-white/20 pt-5 text-[14px] text-[#a7d8ce]">This is the starting point for Net Zero India.</p>
      </div>
     </div>
    </div>
   </section>

   {/* The gap — national to granular */}
   <section className={"px-[3%] py-20 sm:py-24 lg:py-28 "+paper}>
    <div className="flex flex-wrap items-end justify-between gap-8">
     <div className="max-w-3xl"><Title>Moving from national pathways to a more <em className={"font-normal "+coral}>granular picture.</em></Title>
      <p className="mt-5 text-[clamp(1.05rem,1.3vw,1.25rem)] font-medium leading-[1.55]">A growing body of research is exploring how India could reach net zero. Yet important questions remain.</p>
     </div>
     <GranularityVisual light={light}/>
    </div>
    <div className={"mt-12 grid gap-8 border-t pt-10 md:grid-cols-3 "+line}>
     <p className={body}>Many studies focus on national-level pathways, individual sectors or emissions outcomes. We still need a more connected understanding of where the transition could unfold, how different systems interact, and what different pathways could mean for people, resources and regions across India.</p>
     <div>
      <p className={"text-[17px] font-semibold leading-[1.5] "+coral}>Net Zero India was created to help build that understanding.</p>
      <p className={"mt-4 "+body}>The initiative combines research across energy, land and development outcomes with spatially detailed analysis. This allows it to explore not only how much India's energy system may need to change, but where those changes could take place and what their wider implications could be.</p>
     </div>
     <p className={body}>It brings questions of land, water, biodiversity, employment, health, energy access, equity and investment into the study of India's net-zero pathways — rather than treating them as separate conversations.</p>
    </div>
   </section>

   {/* What we are building — large statement / visual break */}
   <section className="nzi-feature-photo relative isolate overflow-hidden bg-[#0c2936] px-[3%] py-20 text-white sm:py-24 lg:py-28">
    <img src={editorialMedia.energy} alt="" loading="lazy" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"/>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,37,48,.95)_0%,rgba(8,37,48,.85)_55%,rgba(8,37,48,.45)_100%)]"/>
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
     <div>
      <Title className="text-white">Research that helps make the choices and consequences visible.</Title>
      <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-white/80">
       <p>Net Zero India is building a research and modelling initiative supported by an open knowledge and decision-support platform.</p>
       <p>Rather than identifying one prescribed route to net zero, the initiative explores <strong className="font-semibold text-white">multiple possible pathways</strong> and examines what changes under different assumptions and choices.</p>
      </div>
     </div>
     <div className="lg:pt-2">
      <p className="text-[13px] uppercase tracking-[.14em] text-[#86d3c6]">The aim is to make it possible to ask:</p>
      <blockquote className="mt-5 border-l-[3px] border-[#E98D96] pl-6"><p className="text-[clamp(1.7rem,3vw,3rem)] font-semibold leading-[1.15] tracking-[-.04em]">What happens if India takes one pathway rather than another?</p></blockquote>
     </div>
    </div>
    <div className="mt-12 grid gap-8 border-t border-white/20 pt-8 text-[14px] leading-[1.8] text-white/75 md:grid-cols-2">
     <p>And then examine that question across energy systems, infrastructure, land and natural resources, as well as development outcomes such as employment, health, energy access and equity.</p>
     <p>Over time, the models, data, scenarios and research generated through NZI are intended to become a resource that researchers can build upon and policymakers and other stakeholders can use to better understand the implications of long-term choices.</p>
    </div>
   </section>

   {/* Our approach — two image-led parts */}
   <section className="px-[3%] py-20 sm:py-24 lg:py-28">
    <Eyebrow>Our approach.</Eyebrow><Title className="mt-3">Built for the complexity of the transition.</Title>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
     {approach.map((a,i)=>{const Icon=a.icon;return <article key={a.title} className={"group nzi-raise overflow-hidden rounded-[22px] border "+panel}>
      <Photo src={a.image} alt="" className="h-[220px] sm:h-[260px]">
       <div className="absolute inset-0 bg-gradient-to-t from-[#092636]/70 to-transparent"/>
       <span className={"absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white backdrop-blur-sm "+(i===1?'bg-[#A64461]/90':'bg-[#153947]/75')}><Icon size={18}/></span>
       <h3 className="absolute bottom-5 left-6 right-6 text-[clamp(1.3rem,1.8vw,1.7rem)] font-semibold tracking-tight text-white">{a.title}</h3>
      </Photo>
      <p className={"p-6 sm:p-8 "+body}>{a.desc}</p>
     </article>})}
    </div>
   </section>

   {/* Our principles — four short principles, not clickable */}
   <section className={"relative isolate overflow-hidden px-[3%] py-20 sm:py-24 lg:py-28 "+paper}>
    <Title>Our principles</Title>
    <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
     {principles.map((p,i)=><div key={p.name} className={"group border-t-2 pt-6 "+(i===1?'border-[#E98D96]':'border-[#2AA99D]')}>
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D3658] p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-105 border border-white/10">
          <img src={p.icon} alt={p.name} className="h-full w-full object-contain" />
        </div>
        <span className={"font-mono text-xs "+(i===1?coral:'text-[#2aa99d]')}>0{i+1}</span>
      </div>
      <h3 className="mt-6 text-[22px] font-semibold tracking-tight">{p.name}</h3>
      <p className={"mt-3 text-[14px] leading-[1.75] "+inkMuted}>{p.desc}</p>
     </div>)}
    </div>
   </section>

   {/* Growing an ecosystem */}
   <section className="px-[3%] py-20 sm:py-24 lg:py-28">
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
     <div>
      <Title>Growing an ecosystem for <em className={"font-normal "+coral}>long-term research.</em></Title>
      <p className={"mt-6 "+body}>Net Zero India has been conceived as more than a single research output. It brings together a growing body of research, modelling, data, collaborations and engagement around one of India's defining long-term questions.</p>
      <p className={"mt-6 rounded-[18px] border p-6 text-[15px] leading-[1.8] "+panel+" "+inkMuted}>As the work develops, the ambition is for NZI to grow as an <strong className={strong}>open research platform</strong>, enabling new research, bringing different forms of expertise into the conversation and creating space for deeper engagement around India's development and mitigation choices.</p>
     </div>
     <div className="group relative">
      <Photo src={editorialMedia.research} alt="Illustrative research environment" className="h-[340px] rounded-[22px] sm:h-[420px]"/>
      <div className="absolute -bottom-5 -left-4 hidden sm:block"><Photo src={editorialMedia.forest} alt="" className={"h-32 w-40 rounded-2xl border-4 "+(light?'border-[#fafbf8]':'border-[#142a3e]')}/></div>
     </div>
    </div>
   </section>

   {/* Built through partnership */}
   <section className={"px-[3%] py-20 sm:py-24 lg:py-28 "+paper}>
    <div className="flex flex-wrap items-end justify-between gap-6">
     <Title>Built through partnership</Title>
     <p className={"max-w-xl "+body}>Net Zero India is led by the <strong className={strong}>School of Public Policy, IIT Delhi</strong>, in collaboration with research partners who bring complementary expertise to different parts of the initiative.</p>
    </div>
    <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
     {institutions.map((inst,i)=>{const Icon=inst.icon;return <article key={inst.name} className={"nzi-raise flex min-h-[260px] flex-col justify-between rounded-[22px] border p-7 "+(i===0?'border-transparent bg-[#1d4f5a] text-white':panel)}>
      <div className="flex items-start justify-between gap-4">
       <span className={"rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest "+(i===0?'bg-white/15 text-[#a7d8ce]':light?'bg-[#e3f1ed] text-[#1d7f77]':'bg-[#2aa99d]/20 text-[#90e4d6]')}>{inst.role}</span>
       <Icon size={22} strokeWidth={1.5} className={i===0?'text-[#a7d8ce]':'text-[#2aa99d]'}/>
      </div>
      <div className="mt-10"><h3 className="text-[clamp(1.15rem,1.4vw,1.4rem)] font-semibold leading-snug tracking-tight">{inst.name}</h3>
       <p className={"mt-3 text-[14px] leading-[1.75] "+(i===0?'text-white/80':inkMuted)}>{inst.description}</p></div>
     </article>})}
    </div>
    <div className={"mt-8 flex items-start gap-3 border-t pt-6 text-[14px] leading-[1.75] "+line+" "+inkMuted}>
     <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E98D96]"/>
     <p>The initiative is supported by organisations including Schmidt Sciences / AX programme, Giving Green and Princeton University through the relevant project support arrangement.</p>
    </div>
   </section>

   {/* The people behind Net Zero India */}
   <section className="px-[3%] py-20 sm:py-24 lg:py-28">
    <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
     <div className="group relative">
      <Photo src={editorialMedia.people} alt="Illustrative research collaboration" className="h-[360px] rounded-[22px] sm:h-[440px]"/>
      <div className="absolute -bottom-5 right-4 hidden sm:block"><Photo src={editorialMedia.convening} alt="" className={"h-32 w-40 rounded-2xl border-4 "+(light?'border-[#fafbf8]':'border-[#142a3e]')}/></div>
     </div>
     <div>
      <Eyebrow>The people behind Net Zero India</Eyebrow>
      <Title className="mt-3">A multidisciplinary team for a <em className={"font-normal "+coral}>multidimensional challenge.</em></Title>
      <p className={"mt-6 "+body}>Net Zero India brings together researchers working across public policy, energy systems, modelling, land, development and related fields.</p>
      <p className={"mt-4 "+body}>Together, the team combines different disciplines and institutional perspectives to examine India's transition as an interconnected challenge, and to build evidence that can stand up to academic scrutiny while remaining relevant to real-world decisions.</p>
      <Link to="/consortium" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#24988d] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#197c74]">Meet the People Behind NZI <ArrowUpRight size={16}/></Link>
     </div>
    </div>
   </section>

   {/* Full-width closing banner — no button */}
   <section className="nzi-feature-photo relative isolate overflow-hidden bg-[#122f43] px-[3%] py-20 text-white sm:py-28">
    <img alt="" src={editorialMedia.nature} loading="lazy" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-50"/>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#102c3d]/95 via-[#102c3d]/85 to-[#102c3d]/45"/>
    <p className="max-w-4xl text-[clamp(1.1rem,1.6vw,1.5rem)] leading-[1.6] text-white/80">India's journey to net zero will involve choices whose consequences will unfold over decades.</p>
    <h2 className="mt-6 max-w-5xl text-[clamp(2rem,3.4vw,3.6rem)] font-semibold leading-[1.15] tracking-[-.045em]"><strong className="font-semibold">Net Zero India exists to make those choices and what they could mean for the country, easier to understand.</strong></h2>
   </section>
  </main>
 </div>;
};
