import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight, Search, BookOpen, CalendarDays, ArrowRight} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {RESEARCH_THEMES} from '../data/researchThemes';
import {themeMedia, editorialMedia} from '../data/editorialMedia';
import {EditorialPhoto} from '../components/EditorialPhoto';

const FILTERS=['All','Systems','Ecology','Society','Economy','Methods'];
export const ResearchHubPage=()=>{
 const {theme}=useGame(),light=theme==='light';
 const [filter,setFilter]=useState('All'),[search,setSearch]=useState('');
 const results=RESEARCH_THEMES.filter(t=>(filter==='All'||t.category===filter)&&[t.title,t.short,t.description].some(v=>v.toLowerCase().includes(search.trim().toLowerCase())));
 const surface=light?'bg-white border-[#dce4e1]':'bg-[#20384b] border-white/10', muted=light?'text-[#5b6e7a]':'text-white/70';
 return <div className={\`min-h-screen pb-20 \${light?'bg-[#fafbf8] text-[#183449]':'bg-[#142a3e] text-white'}\`}>
  <section className="relative isolate overflow-hidden bg-[#1b3b4d] px-[3%] pb-12 pt-36 text-white sm:pb-16 sm:pt-40">
    <EditorialPhoto src={editorialMedia.landscape} alt="" className="pointer-events-none absolute inset-0 -z-20 h-full w-full" imageClassName="opacity-45"/>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#163144]/95 via-[#163144]/85 to-[#163144]/35"/>
    <div className="relative grid items-end gap-8 lg:grid-cols-[1.3fr_.7fr]">
      <div><p className="text-[10px] uppercase font-semibold tracking-[.2em] text-[#8bd4c5]">NZII / Research agenda</p>
        <h1 className="mt-4 max-w-[760px] text-[clamp(2.3rem,3.5vw,3.75rem)] font-semibold tracking-[-.045em] leading-tight">Researching connected futures.</h1>
        <p className="mt-5 max-w-[760px] text-[15px] leading-[1.8] text-white/80">Nine interconnected research themes spanning energy, ecology, society, finance and transparent methods. Our research agenda is designed to expand as new questions emerge.</p>
      </div>
      <div className="lg:ml-auto lg:max-w-[350px]"><p className="text-3xl font-semibold text-[#a9d381]">09 <span className="text-sm font-medium text-white/70">research themes</span></p><p className="mt-2 text-[13px] leading-[1.65] text-white/70">Areas of inquiry, rather than claims of completed projects or peer-reviewed outputs.</p></div>
    </div>
  </section>
  <section className="px-[3%] py-12 sm:py-16">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#2aa99d]">Explore the agenda</p><h2 className="mt-2 text-[clamp(1.8rem,2.5vw,2.6rem)] font-semibold tracking-tight">Our research themes</h2></div>
      <label className={\`flex items-center gap-2 rounded-xl border px-4 py-3 \${surface}\`}><Search size={17} className="text-[#2aa99d]"/><span className="sr-only">Search research themes</span><input value={search} onChange={e=>setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[13px] outline-none sm:w-64" placeholder="Search themes"/></label>
    </div>
    <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter research themes">{FILTERS.map(f=><button type="button" key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f} className={\`rounded-full border px-4 py-2 text-xs font-semibold transition-colors \${filter===f?'border-[#2aa99d] bg-[#248f87] text-white':light?'border-[#d4e0dc] text-[#456470] hover:border-[#2aa99d]':'border-white/20 text-white/80 hover:border-[#2aa99d]'}\`}>{f}</button>)}</div>
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {results.map(t=><Link to={'/research/'+t.slug} key={t.slug} className={\`group overflow-hidden rounded-2xl border transition-colors hover:border-[#2aa99d] \${surface}\`}>
        <EditorialPhoto src={themeMedia[t.slug]||editorialMedia.landscape} alt={'Illustrative image for '+t.title} className="h-[160px] sm:h-[190px]" imageClassName="transition-transform duration-500 group-hover:scale-105"/>
        <div className="flex min-h-[166px] flex-col p-5"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-widest text-[#2aa99d]">{t.category} · {String(RESEARCH_THEMES.indexOf(t)+1).padStart(2,'0')}</span><ArrowUpRight size={16} className="text-[#2aa99d]"/></div>
          <h3 className="mt-3 text-[19px] font-semibold leading-snug">{t.title}</h3><p className={\`mt-2 text-[13px] leading-[1.65] \${muted}\`}>{t.short}</p>
        </div>
      </Link>)}
    </div>
    {results.length===0&&<p className="py-12 text-sm opacity-70">No themes match this search.</p>}
  </section>
  <section className={\`px-[3%] py-14 \${light?'bg-[#eaf1ed]':'bg-[#1c3547]'}\`}>
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#2aa99d]">Research and knowledge</p><h2 className="mt-2 text-[clamp(1.7rem,2.5vw,2.6rem)] font-semibold">Follow the work</h2></div></div>
    <div className="mt-7 grid gap-4 md:grid-cols-2">
      {[{icon:BookOpen,title:'Publications & outputs',text:'Explore illustrative working-paper concepts while approved publications are prepared.',photo:editorialMedia.research,to:'/publications'},{icon:CalendarDays,title:'News & events',text:'Follow editorial updates and clearly labelled fictional event examples.',photo:editorialMedia.convening,to:'/news-events'}].map(({icon:Icon,title,text,photo,to})=><Link to={to} key={title} className={\`group flex overflow-hidden rounded-2xl border \${surface}\`}>
        <EditorialPhoto src={photo} alt="" className="hidden w-[35%] shrink-0 sm:block"/><div className="flex-1 p-6"><Icon size={22} className="text-[#2aa99d]"/><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className={\`mt-2 text-[13px] leading-[1.7] \${muted}\`}>{text}</p><ArrowRight size={17} className="mt-4 text-[#2aa99d]"/></div>
      </Link>)}
    </div>
  </section>
 </div>;
};
