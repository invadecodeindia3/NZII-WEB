import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useGame} from '../context/GameContext';
import {EditorialPhoto} from '../components/EditorialPhoto';
import {editorialMedia} from '../data/editorialMedia';

const principles=[
 ['Rigorous','Our research is designed to withstand scrutiny, drawing on robust methods, high-quality research and expertise across disciplines.'],
 ['Independent','Our research questions are driven by the evidence and the challenges India needs to understand. NZI does not advocate for a predetermined pathway.'],
 ['Collaborative','Complex questions require diverse expertise. We work across institutions, disciplines and stakeholder groups to strengthen how the transition is understood.'],
 ['Open','We aim to make research, methods, models and data increasingly accessible so others can examine, use and build upon the work.']
];
const institutions=[
 {name:'School of Public Policy, IIT Delhi',role:'Lead Institution',description:'Leading the Net Zero India Initiative and bringing together its research, policy and interdisciplinary dimensions.'},
 {name:'Prayas Energy Group',role:'Research Partner',description:'Contributing to energy-related analysis, including energy-demand modelling.'},
 {name:'Princeton University / Andlinger Center for Energy and the Environment',role:'Core Partner',description:'Contributing to energy-system and supply-side modelling and related research.'}
];
export const AboutPage=()=>{
 const {theme}=useGame(),light=theme==='light';
 const ink=light?'bg-[#fafbf8] text-[#193548]':'bg-[#142a3e] text-white';
 const soft=light?'bg-[#edf4ef]':'bg-[#1c374a]';
 const card=light?'border-[#d8e2de] bg-white':'border-white/15 bg-[#203c4e]';
 const subtle=light?'text-[#526b77]':'text-white/75';
 const title='text-[clamp(1.9rem,2.7vw,3rem)] font-semibold leading-[1.2] tracking-tight';
 return <div className={ink}>
  <header className="relative isolate overflow-hidden bg-[#143647] px-[3%] pb-20 pt-40 text-white sm:pb-28">
   <img src={editorialMedia.landscape} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"/>
   <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#123548]/95 via-[#123548]/85 to-[#123548]/35"/>
   <div className="max-w-5xl"><h1 className="text-[clamp(2.4rem,4vw,4.2rem)] font-semibold tracking-tight">Building a deeper understanding of India’s path to net zero.</h1>
    <p className="mt-8 text-base leading-[1.9]">Net Zero India is a research initiative led by the School of Public Policy, IIT Delhi, bringing together researchers and institutions to examine how India could reach net-zero emissions by 2070, and what different pathways could mean for the country’s development, people and natural resources.</p>
    <p className="mt-5 text-base leading-[1.9]">Our aim is to build rigorous, spatially detailed and accessible evidence that can strengthen research, inform policy and enable more inclusive conversations about India’s transition.</p>
   </div>
  </header>
  <main>
   <section className="px-[3%] py-24 sm:py-28"><div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
    <div><h2 className={title}>India’s net-zero transition is also a development transition.</h2>
     <div className={'mt-8 space-y-6 text-[15px] leading-[1.9] '+subtle}>
      <p>India’s path to net zero will unfold alongside profound changes in its economy and society. In the decades leading to 2070, the country will continue to urbanise, build infrastructure, expand access to services, transform industries and respond to changing aspirations and patterns of consumption.</p>
      <p>The choices made along the way will shape more than emissions.</p>
      <p>A rapid expansion of renewable energy, for instance, will require land and infrastructure. Where these are located can have implications for agriculture, forests, water and biodiversity. Changes in the energy system can create new employment opportunities while reshaping existing livelihoods. Technology and investment choices can influence energy access, public health and how the costs and benefits of the transition are distributed.</p>
      <p>Understanding India’s path to net zero therefore requires understanding climate and development together.</p><p>This is the starting point for Net Zero India.</p>
     </div>
    </div><EditorialPhoto src={editorialMedia.agriculture} alt="Illustrative agricultural landscape" className="h-[440px] rounded-2xl"/></div></section>
   <section className={soft+' px-[3%] py-24 sm:py-28'}><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
    <div><h2 className={title}>Moving from national pathways to a more granular picture.</h2><EditorialPhoto src={editorialMedia.forest} alt="Illustrative forest landscape" className="mt-9 h-[320px] rounded-2xl"/></div>
    <div className={'space-y-6 text-[15px] leading-[1.9] '+subtle}>
      <p>A growing body of research is exploring how India could reach net zero. Yet important questions remain.</p>
      <p>Many studies focus on national-level pathways, individual sectors or emissions outcomes. We still need a more connected understanding of where the transition could unfold, how different systems interact, and what different pathways could mean for people, resources and regions across India.</p>
      <p>Net Zero India was created to help build that understanding.</p>
      <p>The initiative combines research across energy, land and development outcomes with spatially detailed analysis. This allows it to explore not only how much India's energy system may need to change, but where those changes could take place and what their wider implications could be.</p>
      <p>It brings questions of land, water, biodiversity, employment, health, energy access, equity and investment into the study of India's net-zero pathways — rather than treating them as separate conversations.</p>
    </div></div></section>
   <section className="px-[3%] py-24 sm:py-28"><h2 className={title}>Research that helps make the choices and consequences visible.</h2><div className="mt-8 grid gap-12 lg:grid-cols-2">
    <div className={'space-y-6 text-[15px] leading-[1.9] '+subtle}>
      <p>Net Zero India is building a research and modelling initiative supported by an open knowledge and decision-support platform.</p>
      <p>Rather than identifying one prescribed route to net zero, the initiative explores multiple possible pathways and examines what changes under different assumptions and choices.</p>
      <p>The aim is to make it possible to ask:</p>
    </div><div className={'rounded-2xl border p-8 '+card}><p className="text-[clamp(1.3rem,2vw,2rem)] font-medium leading-relaxed">What happens if India takes one pathway rather than another?</p></div>
    </div>
    <p className={'mt-7 max-w-5xl text-[15px] leading-[1.9] '+subtle}>And then examine that question across energy systems, infrastructure, land and natural resources, as well as development outcomes such as employment, health, energy access and equity.</p>
    <p className={'mt-5 max-w-5xl text-[15px] leading-[1.9] '+subtle}>Over time, the models, data, scenarios and research generated through NZI are intended to become a resource that researchers can build upon and policymakers and other stakeholders can use to better understand the implications of long-term choices.</p>
   </section>
   <section className={soft+' px-[3%] py-24 sm:py-28'}><h2 className={title}>Built for the complexity of the transition.</h2>
    <div className="mt-12 grid gap-8 md:grid-cols-2">
     <div className={'rounded-2xl border p-8 '+card}><h3 className="text-2xl font-semibold">Systems that connect</h3><p className={'mt-5 text-[15px] leading-[1.9] '+subtle}>Energy, land, water, agriculture, forests, infrastructure and development outcomes influence one another. NZI brings these dimensions together to understand how a choice in one part of the system can create consequences elsewhere.</p></div>
     <div className={'rounded-2xl border p-8 '+card}><h3 className="text-2xl font-semibold">National scale, local detail</h3><p className={'mt-5 text-[15px] leading-[1.9] '+subtle}>National averages can hide significant differences between regions. Spatially resolved analysis helps examine where infrastructure may be required, where resources may be under pressure, and how the opportunities and impacts of the transition could vary across India.</p></div>
    </div>
   </section>
   <section className="px-[3%] py-24 sm:py-28"><h2 className={title}>Our principles</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {principles.map(([name,description])=><div key={name} className="border-t-2 border-[#2AA99D] pt-6"><h3 className="text-xl font-semibold">{name}</h3><p className={'mt-4 text-[14px] leading-[1.85] '+subtle}>{description}</p></div>)}
   </div></section>
   <section className={soft+' px-[3%] py-24 sm:py-28'}><h2 className={title}>Growing an ecosystem for long-term research.</h2>
    <p className={'mt-8 max-w-5xl text-[15px] leading-[1.9] '+subtle}>Net Zero India has been conceived as more than a single research output. It brings together a growing body of research, modelling, data, collaborations and engagement around one of India's defining long-term questions.</p>
    <p className={'mt-5 max-w-5xl text-[15px] leading-[1.9] '+subtle}>As the work develops, the ambition is for NZI to grow as an open research platform, enabling new research, bringing different forms of expertise into the conversation and creating space for deeper engagement around India's development and mitigation choices.</p>
   </section>
   <section className="px-[3%] py-24 sm:py-28"><h2 className={title}>Built through partnership</h2>
    <p className={'mt-6 max-w-5xl text-[15px] leading-[1.9] '+subtle}>Net Zero India is led by the School of Public Policy, IIT Delhi, in collaboration with research partners who bring complementary expertise to different parts of the initiative.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-3">{institutions.map(i=><div key={i.name} className={'rounded-2xl border p-7 '+card}><p className="text-xs font-semibold uppercase tracking-wide text-[#2AA99D]">{i.role}</p><h3 className="mt-3 text-xl font-semibold">{i.name}</h3><p className={'mt-5 text-[14px] leading-[1.8] '+subtle}>{i.description}</p></div>)}</div>
    <p className={'mt-8 max-w-5xl text-[14px] leading-[1.85] '+subtle}>The initiative is supported by organisations including Schmidt Sciences / AX programme, Giving Green and Princeton University through the relevant project support arrangement.</p>
   </section>
   <section className={soft+' px-[3%] py-24 sm:py-28'}><div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
    <div><h2 className={title}>A multidisciplinary team for a multidimensional challenge.</h2>
      <p className={'mt-7 text-[15px] leading-[1.9] '+subtle}>Net Zero India brings together researchers working across public policy, energy systems, modelling, land, development and related fields.</p>
      <p className={'mt-5 text-[15px] leading-[1.9] '+subtle}>Together, the team combines different disciplines and institutional perspectives to examine India's transition as an interconnected challenge, and to build evidence that can stand up to academic scrutiny while remaining relevant to real-world decisions.</p>
      <Link to="/consortium" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2AA99D]">Meet the People Behind NZI <ArrowUpRight size={17}/></Link>
    </div><EditorialPhoto src={editorialMedia.people} alt="Illustrative group collaboration" className="h-[330px] rounded-2xl"/></div>
   </section>
   <section className="bg-[#18384B] px-[3%] py-24 text-white"><h2 className="max-w-5xl text-[clamp(1.9rem,3vw,3.2rem)] font-semibold leading-[1.2]">India's journey to net zero will involve choices whose consequences will unfold over decades.</h2>
    <p className="mt-6 max-w-4xl text-xl leading-[1.7] text-white/80">Net Zero India exists to make those choices and what they could mean for the country, easier to understand.</p>
   </section>
  </main>
 </div>;
};
