import React from 'react';
import {Link,useParams,Navigate} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight,Layers} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {RESEARCH_THEMES,getResearchTheme} from '../data/researchThemes';
import {themeMedia,editorialMedia} from '../data/editorialMedia';
import {EditorialPhoto} from '../components/EditorialPhoto';
export const ResearchThemePage=()=>{
 const {slug}=useParams(),{theme}=useGame(),light=theme==='light',item=getResearchTheme(slug);
 if(!item)return <Navigate to="/research" replace/>;
 const related=RESEARCH_THEMES.filter(t=>t.slug!==item.slug&&t.category===item.category).slice(0,3);
 const surface=light?'bg-white border-[#E6E2D8]':'bg-[#244166] border-white/10';
 return <div className={`min-h-screen ${light?'bg-[#FFFCF6] text-[#1D3658]':'bg-[#1D3658] text-[#FFFCF6]'}`}>
  <section className="relative isolate overflow-hidden bg-[#162B46] px-[3%] pb-12 pt-36 text-white sm:pb-16 sm:pt-40">
    <EditorialPhoto src={themeMedia[item.slug]||editorialMedia.landscape} alt="" className="pointer-events-none absolute inset-0 -z-20 h-full w-full" imageClassName="opacity-40"/>
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1D3658]/95 via-[#1D3658]/85 to-[#1D3658]/35"/>
    <div className="relative max-w-[1000px]"><Link to="/research" className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B9D8F]"><ArrowLeft size={15}/> All research themes</Link>
      <p className="mt-9 text-[10px] font-semibold uppercase tracking-[.2em] text-[#A7C957]">{item.category} / Research theme {String(RESEARCH_THEMES.indexOf(item)+1).padStart(2,'0')}</p>
      <h1 className="mt-4 text-[clamp(2.4rem,3.7vw,4rem)] font-semibold tracking-[-.045em]">{item.title}</h1>
      <p className="mt-4 max-w-[750px] text-[15px] leading-[1.8] text-white/85">{item.description}</p>
    </div>
  </section>
  <main className="px-[3%] py-14 sm:py-16">
    <div className="grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:gap-12">
      <section><p className="text-[10px] uppercase tracking-widest font-semibold text-[#2B9D8F]">Research directions</p><h2 className="mt-2 text-[clamp(1.8rem,2.5vw,2.7rem)] font-semibold">Questions we seek to investigate</h2>
        <div className="mt-7 grid gap-3">{item.questions.map((q,i)=><div className={`grid grid-cols-[36px_1fr] items-start gap-3 rounded-xl border p-5 ${surface}`} key={q}><span className="font-mono text-xs text-[#2B9D8F]">0{i+1}</span><p className="text-[15px] font-medium leading-[1.65]">{q}</p></div>)}</div>
      </section>
      <aside className={`h-fit rounded-2xl border p-6 ${surface}`}><Layers size={23} className="text-[#2B9D8F]"/><h2 className="mt-4 text-lg font-semibold">Potential approaches</h2>
        <ul className="mt-4 divide-y divide-current/10">{item.methods.map(method=><li key={method} className="py-3 text-[13px] leading-[1.6] opacity-75">{method}</li>)}</ul>
        <p className="mt-5 text-xs leading-[1.7] opacity-65">Research theme descriptions express questions and potential approaches, not completed or independently validated studies.</p>
      </aside>
    </div>
    {related.length>0&&<section className="mt-14"><h2 className="text-2xl font-semibold">Related research themes</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(t=><Link to={'/research/'+t.slug} key={t.slug} className={`group overflow-hidden rounded-2xl border ${surface}`}>
        <EditorialPhoto src={themeMedia[t.slug]} alt="" className="h-[145px]"/>
        <div className="flex items-center justify-between gap-3 p-5"><span className="text-[16px] font-semibold">{t.title}</span><ArrowUpRight size={16} className="shrink-0 text-[#2B9D8F]"/></div>
      </Link>)}</div>
    </section>}
  </main>
 </div>;
};
