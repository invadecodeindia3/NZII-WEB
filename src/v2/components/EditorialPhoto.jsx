import React, {useState} from 'react';
/** Photographs illustrate themes; they do not document NZII activities. */
export const EditorialPhoto = ({src, alt, className='', imageClassName='', priority=false, children}) => {
  const [broken, setBroken] = useState(false);
  return <div className={`nzi-photo relative isolate overflow-hidden bg-[#b5ccc5] ${className}`}>
    <img src={broken ? '/hero.jpg' : src} onError={() => setBroken(true)}
      alt={alt} decoding="async" loading={priority?'eager':'lazy'}
      className={`absolute inset-0 -z-10 h-full w-full object-cover ${imageClassName}`}/>
    {children}
  </div>;
};
