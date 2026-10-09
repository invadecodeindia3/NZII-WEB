import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search, BookOpen, CalendarDays } from 'lucide-react';
import {useGame} from '../context/GameContext';
import {RESEARCH_THEMES} from '../data/researchThemes';

const filters = ['All','Systems','Ecology','Society','Economy','Methods'];
const researchNotes = [
  {icon:BookOpen,heading:'Research concepts', text:'Browse illustrative topics while verified papers and studies are being prepared.',url:'/publications'},
  {icon:CalendarDays,heading:'News & events', text:'Follow institute announcements and approved event reports.',url:'/news-events'},
];

export const ResearchHubPage = () => {
 const {theme} = useGame();
 const light=theme==='light';
 const [category,setCategory]=useState('All');
 const [query,setQuery]=useState('');
 const results=RESEARCH_THEMES.filter(t=>(category==='All'||t.category===category) && [t.title,t.short,t.description].some(v=>v.toLowerCase().includes(query.toLowerCase())));
 return <div className={`min-h-screen pb-20 ${light?'bg-white text-slate-900':'bg-[#142439] text-white'}`}>
   <section className="bg-[#18354b] pt-44 pb-20 px-[4vw] text-white border-b border-white/10">
     <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] items-end gap-12">
       <div>
         <span className="text-xs font-mono tracking-[0.22em] uppercase text-teal-light">NZII / Research</span>
         <h1 className="font-manrope font-extrabold tracking-tight text-5xl sm:text-6xl xl:text-7xl mt-5 leading-[1.04]">Researching connected futures.</h1>
         <p className="text-base sm:text-lg text-white/70 leading-relaxed mt-7 max-w-2xl">Nine interconnected research themes spanning energy, ecology, society, finance and transparent methods. Our research agenda is designed to expand as new questions emerge.</p>
       </div>
       <div className="lg:border-l border-white/20 lg:pl-9">
         <p className="text-6xl font-manrope font-semibold text-teal-light">{RESEARCH_THEMES.length.toString().padStart(2,'0')}</p>
         <p className="font-mono text-xs mt-3 text-white/65 uppercase tracking-wider">Research themes</p>
         <p className="text-sm text-white/50 mt-3">Research themes are areas of inquiry, not claims of finished projects, teams or peer-reviewed outputs.</p>
       </div>
     </div>
   </section>
   <section className="max-w-7xl mx-auto px-[4vw] py-14">
     <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
       <div><p className="text-xs font-mono uppercase tracking-widest text-teal">Explore the agenda</p><h2 className="font-manrope text-3xl sm:text-4xl font-bold mt-2">Research themes</h2></div>
       <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${light?'border-slate-200 bg-slate-50':'border-white/15 bg-white/5'}`}>
         <Search size={17} className="text-teal"/><input aria-label="Search research themes" className="bg-transparent outline-none text-sm w-64 max-w-full" placeholder="Search themes" value={query} onChange={e=>setQuery(e.target.value)}/></label>
     </div>
     <div className="flex gap-2 overflow-x-auto pb-5 mb-3" role="group" aria-label="Research category filter">
       {filters.map(f=><button key={f} aria-pressed={category===f} onClick={()=>setCategory(f)} className={`px-4 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition-colors ${category===f?'bg-teal text-white border-teal':light?'border-slate-200 hover:border-teal':'border-white/15 hover:border-teal'}`}>{f}</button>)}
     </div>
     <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
       {results.map((t,i)=><Link key={t.slug} to={`/research/${t.slug}`} className={`group min-h-64 p-7 rounded-2xl border flex flex-col justify-between transition-all hover:border-teal hover:-translate-y-1 ${light?'border-slate-200 bg-slate-50':'border-white/10 bg-[#1c3346]'}`}>
         <div><div className="flex justify-between items-center"><span className="font-mono text-xs text-teal">{String(RESEARCH_THEMES.indexOf(t)+1).padStart(2,'0')} / {t.category}</span><ArrowUpRight size={19} className="text-teal transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></div>
         <h3 className="font-manrope text-2xl font-bold mt-7 tracking-tight">{t.title}</h3><p className={`text-sm leading-relaxed mt-3 ${light?'text-slate-600':'text-white/55'}`}>{t.short}</p></div>
         <span className="text-teal font-semibold text-xs mt-6 flex gap-2 items-center">Explore theme <ArrowRight size={15}/></span>
       </Link>)}
     </div>
     {results.length===0&&<p className="py-14 text-sm opacity-70">No research themes match that search.</p>}
   </section>
   <section className={`py-20 px-[4vw] ${light?'bg-slate-100':'bg-[#1c3346]'}`}><div className="max-w-7xl mx-auto">
     <p className="text-xs font-mono text-teal tracking-widest uppercase">Research infrastructure</p><h2 className="text-3xl font-manrope font-bold mt-2 mb-8">Explore the wider platform</h2>
     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{researchNotes.map(({icon:Icon,heading,text,url})=><Link key={heading} to={url} className={`rounded-2xl border p-6 hover:border-teal transition-colors ${light?'bg-white border-slate-200':'bg-[#244055] border-white/10'}`}><Icon className="text-teal" size={23}/><h3 className="font-bold mt-5">{heading}</h3><p className="text-xs opacity-70 mt-2 leading-relaxed">{text}</p><ArrowRight className="text-teal mt-5" size={17}/></Link>)}</div>
   </div></section>
 </div>;
};
