import React,{useState} from 'react';
import {Link,useParams,Navigate} from 'react-router-dom';
import {CalendarDays, ArrowLeft, ArrowRight, MapPin, Newspaper} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {PUBLISHED_NEWS_EVENTS, getNewsEvent, IDENTIFIED_EVENT_COUNT} from '../data/newsEvents';
import {getResearchTheme} from '../data/researchThemes';

export const NewsEventsPage=()=>{
 const {theme}=useGame(),light=theme==='light',[filter,setFilter]=useState('all');
 const list=PUBLISHED_NEWS_EVENTS.filter(e=>filter==='all'||(filter==='events'&&e.type==='event')||(filter==='news'&&e.type==='news'));
 return <div className={`min-h-screen ${light?'bg-[#FFFCF6] text-[#1D3658]':'bg-[#1D3658] text-[#FFFCF6]'}`}>
  <header className="pt-44 pb-20 px-[4vw] bg-[#14263D] text-white"><div className="max-w-7xl mx-auto">
   <p className="text-xs font-mono text-teal-light uppercase tracking-widest">NZII / Updates</p>
   <h1 className="font-manrope font-extrabold text-5xl sm:text-7xl tracking-tight mt-5">News & Events</h1>
   <p className="text-white/65 max-w-2xl mt-6 leading-relaxed">Explore fictional event examples illustrating the planned research programme. These are not actual, scheduled or completed NZII events. Confirmed updates will be published once approved.</p>
  </div></header>
  <main className="max-w-7xl mx-auto px-[4vw] py-14">
   <div role="note" className={`mb-8 p-5 border-l-4 border-amber-500 rounded-xl ${light?'bg-amber-50 text-slate-800':'bg-amber-500/10 text-white'}`}><strong>Fictional examples for website demonstration.</strong> The six sample events below are not confirmed programmes and must not be confused with the 15 events whose editorial blurbs are still pending.</div>
   <div className="flex gap-2 mb-8" role="group" aria-label="Filter updates">{[['all','All updates'],['news','News'],['events','Events']].map(([k,label])=><button key={k} aria-pressed={filter===k} onClick={()=>setFilter(k)} className={`px-5 py-2.5 rounded-full text-xs font-semibold border ${filter===k?'bg-teal border-teal text-white':light?'border-slate-200':'border-white/15'}`}>{label}</button>)}</div>
   {list.length===0?<div className={`border rounded-2xl p-10 sm:p-16 text-center ${light?'bg-[#F4F1E8] border-[#E6E2D8]':'bg-[#162B46] border-white/10'}`}>
    <CalendarDays size={32} className="text-teal mx-auto"/><h2 className="font-manrope text-2xl font-bold mt-5">Stories are being prepared</h2><p className="max-w-xl mx-auto text-sm opacity-65 leading-relaxed mt-3">The client has identified {IDENTIFIED_EVENT_COUNT} events. Editorial blurbs and source details are awaiting approval; no headlines, dates or outcomes will be invented.</p>
    <Link to="/research" className="text-teal font-semibold text-sm inline-flex gap-2 items-center mt-7">Explore research themes <ArrowRight size={17}/></Link>
   </div>:<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{list.slice().sort((a,b)=>(b.eventDate||b.publishedAt||'').localeCompare(a.eventDate||a.publishedAt||'')).map(e=><Link to={`/news-events/${e.slug}`} key={e.slug} className={`rounded-2xl border p-7 hover:border-teal flex flex-col justify-between min-h-64 ${light?'bg-[#F4F1E8] border-[#E6E2D8]':'bg-[#162B46] border-white/10'}`}>
    <div><p className="text-xs uppercase tracking-widest font-mono text-teal">{e.fictional ? 'FICTIONAL EVENT EXAMPLE' : e.type} / {e.dateLabel||e.eventDate}</p><h2 className="font-bold text-xl mt-5">{e.title}</h2><p className="text-sm opacity-65 leading-relaxed mt-3">{e.excerpt}</p></div><div className="mt-7 flex gap-2 items-center text-sm text-teal font-semibold">{e.fictional ? 'Explore sample concept' : 'Read more'} <ArrowRight size={16}/></div></Link>)}</div>}
  </main>
 </div>;
};
export const NewsEventDetailPage=()=>{
 const {slug}=useParams(),{theme}=useGame(),light=theme==='light',e=getNewsEvent(slug);
 if(!e)return <Navigate replace to="/news-events"/>;
 return <div className={`min-h-screen ${light?'bg-[#FFFCF6] text-[#1D3658]':'bg-[#1D3658] text-[#FFFCF6]'}`}>
  <header className="pt-40 pb-14 px-[4vw] bg-[#14263D] text-white"><div className="max-w-4xl mx-auto"><Link to="/news-events" className="inline-flex items-center gap-2 text-teal-light text-sm"><ArrowLeft size={15}/> All news & events</Link>
  <p className="mt-12 text-xs text-teal-light uppercase font-mono">{e.type} · {e.dateLabel||e.eventDate}</p><h1 className="font-manrope text-4xl sm:text-6xl font-bold mt-4 tracking-tight">{e.title}</h1><p className="text-white/70 text-lg leading-relaxed mt-7">{e.excerpt}</p></div></header>
  <article className="max-w-4xl mx-auto px-[4vw] py-16">{e.fictional&&<div role="note" className={`mb-8 p-5 border-l-4 border-amber-500 rounded-xl ${light?'bg-amber-50':'bg-amber-500/10'}`}><strong>Fictional demonstration event.</strong> This event has not been announced, scheduled or held. All programme details are illustrative.</div>}<div className="text-sm opacity-65 flex flex-wrap gap-6 mb-10">{e.location&&<span className="inline-flex gap-2 items-center"><MapPin size={16}/>{e.location}</span>}{e.dateLabel&&<span className="inline-flex gap-2 items-center"><CalendarDays size={16}/>{e.dateLabel}</span>}</div>
  {(e.body||[]).map((p,i)=><p className="text-base leading-8 mb-6" key={i}>{p}</p>)}
  <div className="mt-10 flex flex-wrap gap-2">{(e.themeSlugs||[]).map(s=>{const t=getResearchTheme(s);return t&&<Link to={`/research/${t.slug}`} key={s} className="text-xs text-teal border border-teal/20 rounded-full px-3 py-2">{t.title}</Link>})}</div></article>
 </div>;
};
