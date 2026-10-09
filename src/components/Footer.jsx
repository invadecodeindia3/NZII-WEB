import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useGame} from '../context/GameContext';
const NAV=[['About NZI','/about'],['Research','/research'],['Publications','/publications'],['News & Events','/news-events'],['People & Partners','/consortium'],['Contact','/contact']];
export const Footer=()=>{
 const {displayMode}=useGame(),light=displayMode==='light',eco=displayMode==='eco';
 return <footer className={`site-footer border-t py-16 ${light?'border-[#dce5e3] bg-[#eef4ef] text-[#173650]':eco?'border-[#355168] bg-[#0d2030] text-[#e5f1ed]':'border-white/15 bg-[#102a3d] text-[#f0f8f5]'}`} style={{paddingInline:'1.5%'}}>
  <div className="grid w-full gap-12 border-b border-current/15 pb-14 lg:grid-cols-[1.2fr_1fr]">
   <div className="max-w-xl">
    <Link to="/" className="inline-flex items-center gap-3 font-manrope text-3xl font-bold tracking-tight">NZI<span className="text-[#2fa99e]">.</span></Link>
    <p className="mt-5 text-[15px] leading-8 opacity-75">Net Zero India brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.</p>
    <Link to="/research" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#2fa99e]">Explore our research <ArrowUpRight size={16}/></Link>
   </div>
   <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-4 self-start text-sm sm:grid-cols-3">
    {NAV.map(([label,path])=><Link key={path} to={path} className="min-w-0 font-medium opacity-80 transition-opacity hover:opacity-100">{label}</Link>)}
   </nav>
  </div>
  <div className="flex flex-wrap items-center justify-between gap-3 pt-7 text-xs opacity-60">
   <span>Net Zero India · Research, pathways and evidence</span><span>Made for curiosity, grounded in evidence.</span>
  </div>
 </footer>;
};
