import React from 'react';
import {Link} from 'react-router-dom';
import {useGame} from '../context/GameContext';
export const Footer=()=>{
 const {theme}=useGame(),light=theme==='light';
 return <footer className={`border-t px-[5vw] py-14 ${light?'border-[#dce5e3] bg-[#edf4ef] text-[#1b3644]':'border-white/15 bg-[#102638] text-white'}`}>
 <div className="mx-auto max-w-[1440px] grid gap-9 md:grid-cols-[1.2fr_1fr]">
 <div><Link to="/" className="font-manrope text-3xl font-bold">NZI<span className="text-teal">.</span></Link><p className="mt-4 max-w-md text-sm leading-7 opacity-70">Net Zero India brings together research, modelling and diverse expertise to understand India's pathways to net zero and their implications.</p></div>
 <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">{[['About NZI','/about'],['Research','/research'],['Publications','/publications'],['News & Events','/news-events'],['People & Partners','/consortium'],['Contact','/contact']].map(([label,path])=><Link key={path} className="hover:text-teal" to={path}>{label}</Link>)}</nav>
 </div><div className="mx-auto mt-12 max-w-[1440px] border-t border-current/15 pt-6 text-xs opacity-55">Net Zero India · Research and knowledge</div></footer>;
};
