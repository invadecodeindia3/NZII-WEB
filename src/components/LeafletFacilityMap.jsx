import React, {useEffect, useRef, useState} from 'react';

/** Leaflet 1.9.4 / OpenStreetMap tiles.
 * External tiles require internet access and OSM usage policy compliance.
 * Markers show only the user's explicitly selected illustrative samples.
 */
const LIBRARY_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
let pending;
function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (!pending) {
    pending = new Promise((resolve,reject)=>{
      if (!document.querySelector('link[data-nzii-leaflet]')) {
        const css=document.createElement('link');css.rel='stylesheet';css.href=CSS_URL;css.dataset.nziiLeaflet='true';document.head.appendChild(css);
      }
      let script=document.querySelector('script[data-nzii-leaflet]');
      if (!script) {script=document.createElement('script');script.src=LIBRARY_URL;script.async=true;script.dataset.nziiLeaflet='true';document.head.appendChild(script);}
      script.addEventListener('load',()=>window.L?resolve(window.L):reject(new Error('Leaflet unavailable')),{once:true});
      script.addEventListener('error',()=>reject(new Error('Map library failed to load')),{once:true});
    }).catch(e=>{pending=undefined;throw e});
  }
  return pending;
}
export function LeafletFacilityMap({assets,selectedAssetId,onSelect,isLight}) {
  const el=useRef(null),map=useRef(null),points=useRef(null),callback=useRef(onSelect),[error,setError]=useState('');
  callback.current=onSelect;
  useEffect(()=>{
    let cancelled=false;
    loadLeaflet().then(L=>{
      if(cancelled||!el.current||map.current)return;
      map.current=L.map(el.current,{scrollWheelZoom:false,zoomControl:true,worldCopyJump:true}).setView([22.8,79],5);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
      }).addTo(map.current);
      points.current=L.layerGroup().addTo(map.current);
      setTimeout(()=>map.current?.invalidateSize(),100);
    }).catch(e=>{if(!cancelled)setError(e.message)});
    return ()=>{cancelled=true;if(map.current){map.current.remove();map.current=null;points.current=null}};
  },[]);
  useEffect(()=>{
    if(!map.current||!window.L||!points.current)return;
    const L=window.L;
    points.current.clearLayers();
    const valid=assets.filter(a=>Number.isFinite(Number(a.lat))&&Number.isFinite(Number(a.lng)));
    valid.forEach(asset=>{
      const pin=L.circleMarker([Number(asset.lat),Number(asset.lng)],{radius:asset.id===selectedAssetId?10:7,color:'#fff',weight:2,fillColor:asset.id===selectedAssetId?'#ff7769':'#14b8a6',fillOpacity:0.95});
      pin.addTo(points.current).bindTooltip(asset.name,{direction:'top'});
      pin.on('click',()=>callback.current(asset.id));
    });
    if(valid.length>0){const bounds=L.latLngBounds(valid.map(a=>[Number(a.lat),Number(a.lng)]));map.current.fitBounds(bounds.pad(0.22),{maxZoom:6});}
  },[assets,selectedAssetId,error]);
  return <div className="my-3 space-y-2">
    <div ref={el} role="region" aria-label="Interactive Leaflet map of illustrative facility locations" className="h-[360px] w-full rounded-xl border border-teal/25 overflow-hidden relative z-0 bg-[#14202b]"/>
    {error&&<p role="alert" className="text-xs text-amber-600">{error}. Map tiles require an internet connection.</p>}
    <p className="text-[10px] opacity-65 leading-relaxed">Leaflet map · OpenStreetMap tiles · Markers and emissions are illustrative and not audited. Select a marker to inspect a profile.</p>
  </div>;
}
