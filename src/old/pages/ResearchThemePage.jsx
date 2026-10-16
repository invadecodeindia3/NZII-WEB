import React from 'react';
import {Link,useParams,Navigate} from 'react-router-dom';
import {ArrowLeft,ArrowRight,BookOpen,Layers,Database} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {RESEARCH_THEMES,getResearchTheme} from '../data/researchThemes';

export const ResearchThemePage=()=>{
 const {slug}=useParams(),{theme}=useGame(),light=theme==='light',item=getResearchTheme(slug);
 if(!item)return <Navigate to="/research" replace/>;
 const related=RESEARCH_THEMES.filter(t=>t.slug!==item.slug&&(t.category===item.category)).slice(0,3);
 return <div className={`min-h-screen ${light?'bg-white text-slate-900':'bg-[#090d14] text-white'}`}>
  <header className="pt-40 pb-20 px-[4vw] bg-[#0c1920] text-white"><div className="max-w-6xl mx-auto">
   <Link className="inline-flex gap-2 text-xs text-teal-light items-center hover:underline" to="/research"><ArrowLeft size={16}/> All research themes</Link>
   <p className="font-mono text-xs uppercase tracking-widest text-teal-light mt-12">{item.category} / Research Theme {String(RESEARCH_THEMES.indexOf(item)+1).padStart(2,'0')}</p>
   <h1 className="font-manrope text-5xl sm:text-6xl max-w-5xl font-extrabold tracking-tight mt-5">{item.title}</h1>
   <p className="max-w-3xl text-lg mt-6 leading-relaxed text-white/70">{item.description}</p>
  </div></header>
  <main className="max-w-6xl mx-auto px-[4vw] py-16">
   <div className="grid md:grid-cols-[1.5fr_1fr] gap-10">
    <section><p className="text-xs font-mono uppercase tracking-widest text-teal">Research directions</p><h2 className="font-manrope text-3xl font-bold mt-3 mb-8">Questions we seek to investigate</h2>
     <div className="space-y-4">{item.questions.map((q,i)=><div key={q} className={`p-6 rounded-2xl border flex gap-5 ${light?'bg-slate-50 border-slate-200':'bg-[#141d2a] border-white/10'}`}><span className="font-mono text-sm text-teal">0{i+1}</span><p className="text-base font-semibold leading-relaxed">{q}</p></div>)}</div>
    </section>
    <aside className={`rounded-2xl border p-7 self-start ${light?'bg-slate-50 border-slate-200':'bg-[#141d2a] border-white/10'}`}>
     <Layers size={24} className="text-teal"/><h2 className="font-bold text-xl mt-5">Potential approaches</h2>
     <ul className="mt-5 space-y-3">{item.methods.map(m=><li key={m} className="text-sm opacity-75 border-b border-current/10 pb-3">{m}</li>)}</ul>
     <p className="mt-7 text-xs opacity-65 leading-relaxed">This is a research agenda, not a declaration of completed studies, validated findings or named project teams.</p>
    </aside>
   </div>
   <section className="border-t border-current/10 mt-16 pt-12"><p className="font-mono text-xs uppercase tracking-widest text-teal">Relevant resources</p>
    <div className="grid sm:grid-cols-2 gap-4 mt-6">{item.links.map(link=><Link key={link.path} to={link.path} className={`rounded-xl border p-5 flex justify-between items-center gap-2 hover:border-teal ${light?'border-slate-200':'border-white/15'}`}>{link.text}<ArrowRight className="text-teal" size={17}/></Link>)}</div>
   </section>
   {related.length>0&&<section className="mt-16 border-t border-current/10 pt-12"><h2 className="text-2xl font-bold mb-6">Related research themes</h2><div className="grid md:grid-cols-3 gap-4">{related.map(t=><Link key={t.slug} to={`/research/${t.slug}`} className={`p-6 rounded-xl border hover:border-teal ${light?'border-slate-200':'border-white/15'}`}>{t.title}<ArrowRight size={17} className="text-teal mt-3"/></Link>)}</div></section>}
  </main>
 </div>;
};
