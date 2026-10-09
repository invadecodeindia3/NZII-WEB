import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useGame} from '../context/GameContext';

/** Single observer per route: cheap, passive reveal effects; no scroll handlers on cards. */
export const MotionController=()=>{
 const {pathname}=useLocation();
 const {ecoMode}=useGame();
 useEffect(()=>{
   const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   document.documentElement.classList.toggle('nzi-motion-enabled',!ecoMode&&!reduce);
   if(ecoMode||reduce)return;
   let observer;
   const frame=requestAnimationFrame(()=>{
     const targets=Array.from(document.querySelectorAll('main section:not(.nzi-home-hero), main article, main .motion-reveal'));
     observer=new IntersectionObserver(entries=>{
       for(const item of entries){
         if(item.isIntersecting){
           item.target.classList.add('nzi-visible');
           observer.unobserve(item.target);
         }
       }
     },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
     targets.forEach(el=>{el.classList.add('nzi-reveal');observer.observe(el)});
   });
   return ()=>{cancelAnimationFrame(frame);observer?.disconnect()};
 },[pathname,ecoMode]);
 return null;
};
