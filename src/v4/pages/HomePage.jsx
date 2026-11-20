/**
 * V4 'Home' page.
 * Markup converted from the NZII Version 2 prototype (NZII_Home_Page.html); styles in ../styles/home.css.
 */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle, usePrototypeBehaviours } from '../hooks/usePrototypeBehaviours';
import { OpenCallsPopup } from '../components/OpenCallsPopup';
import { HomeFxA } from '../home-fx/HomeFxA';
import { FootprintStory } from '../home-fx/FootprintStory';
import '../styles/home.css';
import '../home-fx/home-polish.css';
import '../home-fx/home-soft.css';

// `variant`: 'exact' is the prototype as is; 'a' (Blueprint) adds the animation layer in full brand colour;
// 'soft' is the same Blueprint with a quieter, mostly teal palette.
export const HomePage = ({ variant = 'exact' }) => {
  const root = useRef(null);
  usePrototypeBehaviours(root);
  usePageTitle('Net Zero India Initiative | Research, pathways and evidence');

  // The hero collage rests while it is off screen, so scrolling the rest of the page stays smooth.
  useEffect(() => {
    const ah = root.current && root.current.querySelector('.ah');
    if (!ah || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => ah.classList.toggle('off', !e.isIntersecting)), { rootMargin: '80px' });
    io.observe(ah);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <main id="content" ref={root} className={variant === 'exact' ? undefined : variant === 'soft' ? 'fx-a fx-soft' : 'fx-a'}>
      <section className="hero" aria-labelledby="h-hero">
        <div className="hero-in">
          <div>
            <h1 id="h-hero"><span className="hl-1">What will it take</span> <span className="hl-2">for India to reach</span> <span className="hl-3">net&nbsp;zero?</span></h1>
            <div className="hero-txt">
              <p>India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.</p>
              <p>The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.</p>
            </div>
            <div className="hero-act">
              <Link className="pri" to="/v4/research">Explore our research <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></Link>
              <Link className="sec" to="/v4/who-we-are">About the Net Zero India Initiative <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link>
            </div>
          </div>
          <div className="hero-art">
          <div className="ah" role="img" aria-label="A collage of India’s transition: women at work in the fields, a solar technician on a rooftop, wind turbines, a city with chimneys and a river">
            <svg className="ah-svg" viewBox="0 0 800 720" aria-hidden="true">
              <defs>
                <clipPath id="ah-isl"><path d="M19.5,517.8 L24.4,514.1 L28.1,512.8 L31.9,510.7 L36.8,507.2 L42.7,502.2 L49.4,504.1 L55.0,497.5 L62.7,499.5 L69.5,493.4 L77.5,488.6 L84.4,487.7 L89.9,484.2 L97.8,486.4 L104.9,482.7 L113.6,479.2 L120.9,475.1 L127.1,474.0 L136.1,473.3 L142.3,472.5 L149.9,468.7 L157.8,469.5 L163.5,466.9 L171.5,467.1 L179.3,461.7 L187.4,459.1 L193.3,461.6 L200.2,458.4 L207.4,458.2 L216.8,456.3 L224.7,453.3 L231.9,453.9 L239.2,451.9 L247.6,454.0 L254.3,451.2 L260.9,450.6 L270.1,451.6 L278.1,446.4 L284.6,448.1 L291.2,446.3 L299.2,443.5 L306.3,447.4 L314.0,443.7 L322.1,447.6 L328.8,444.8 L337.4,447.6 L345.5,447.5 L351.5,444.9 L359.2,448.1 L368.1,443.8 L373.5,444.7 L381.1,446.7 L389.5,445.8 L395.5,447.3 L403.9,448.8 L413.0,450.2 L419.4,450.3 L427.4,447.3 L435.6,452.6 L443.3,453.3 L449.7,451.4 L456.8,453.6 L464.5,450.7 L472.7,452.3 L481.0,452.5 L488.0,454.3 L496.2,456.8 L504.1,461.3 L513.6,457.8 L520.7,460.3 L529.0,460.1 L538.3,466.8 L545.4,464.7 L552.5,463.3 L561.3,465.4 L570.6,465.5 L576.6,471.4 L586.0,466.8 L594.1,466.6 L602.0,472.9 L610.9,471.3 L617.7,468.7 L625.8,470.9 L635.5,469.9 L643.7,465.2 L654.0,468.6 L663.1,465.9 L672.1,463.6 L679.7,460.4 L689.0,455.4 L697.2,455.2 L706.4,456.2 L716.8,453.0 L724.9,455.1 L733.0,449.9 L738.5,448.3 L745.8,447.5 L753.3,452.1 L760.3,449.5 L765.1,452.8 L768.9,453.0 L775.2,456.0 L779.0,456.3 L780.9,461.4 L784.7,464.5 L788.9,465.8 L790.0,473.1 L792.7,472.5 L793.0,476.8 L796.3,485.8 L795.6,490.7 L798.4,494.7 L797.6,499.2 L797.2,501.0 L799.7,510.3 L798.4,517.4 L798.0,522.3 L798.6,523.2 L796.7,528.9 L796.0,535.7 L795.4,539.5 L794.2,547.5 L793.9,549.6 L793.4,557.7 L791.8,563.1 L790.6,566.1 L789.2,568.3 L787.1,575.0 L784.2,584.5 L782.3,588.0 L781.5,594.1 L777.6,599.3 L775.4,606.4 L770.9,610.1 L767.9,613.5 L765.2,619.7 L760.6,626.1 L756.8,628.3 L751.3,632.9 L745.5,637.7 L739.9,640.2 L733.6,645.7 L727.8,648.2 L721.1,646.6 L712.9,653.4 L705.6,650.1 L695.7,654.0 L686.9,654.2 L678.2,658.4 L670.8,661.1 L660.0,661.1 L651.6,658.4 L642.5,664.7 L630.8,665.4 L621.3,663.3 L612.6,666.2 L600.3,664.4 L590.9,664.6 L579.8,665.2 L570.9,664.1 L560.1,667.6 L548.2,667.8 L539.3,669.8 L526.8,673.6 L517.6,674.3 L504.5,670.4 L492.9,674.4 L481.8,670.8 L470.4,676.4 L459.6,672.7 L446.0,677.4 L435.1,676.4 L421.9,672.7 L411.5,675.3 L398.0,678.8 L387.7,678.1 L374.5,678.5 L362.9,678.6 L352.3,675.2 L341.3,678.9 L329.4,673.6 L318.9,674.1 L306.7,673.4 L295.3,673.4 L284.6,673.8 L274.4,673.4 L262.4,672.3 L250.7,670.8 L239.1,670.3 L229.2,673.2 L216.7,672.1 L207.8,669.0 L196.7,670.3 L185.4,671.9 L174.7,668.8 L165.6,670.7 L154.9,668.5 L146.6,665.8 L136.6,662.5 L127.3,659.4 L118.9,661.5 L111.6,655.8 L103.3,658.1 L98.0,654.6 L89.1,649.5 L82.2,648.2 L75.0,645.5 L68.8,646.0 L64.2,640.4 L56.5,640.0 L50.8,633.1 L44.6,630.0 L40.5,627.6 L35.0,624.2 L29.8,619.3 L25.8,616.8 L21.5,610.9 L18.7,608.8 L15.9,607.2 L13.5,604.5 L10.6,602.4 L7.5,595.2 L6.8,590.4 L4.6,589.7 L1.2,586.9 L2.4,581.5 L1.0,578.5 L-0.9,572.4 L-0.4,570.1 L0.6,565.8 L0.2,561.9 L1.3,556.3 L0.9,547.8 L2.1,545.7 L3.4,544.6 L6.5,539.2 L8.7,535.6 L11.0,527.5 L14.4,528.5 L16.8,523.7Z" /></clipPath>
                <clipPath id="ah-panels"><path d="M236,590 L506,566 L568,646 L204,676Z" /></clipPath>
                <filter id="ah-soft" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#14243a" floodOpacity=".16" /></filter>
              </defs>
              <g className="ah-l ah-cloud" style={{ '--d': '0.3s', animationDuration: '.9s,15s,auto' }}><g transform="translate(30 128) scale(1.05)"><circle cx="0" cy="0" r="26" /><circle cx="28" cy="-14" r="32" /><circle cx="62" cy="-6" r="27" /><circle cx="88" cy="4" r="19" /><circle cx="44" cy="8" r="24" /><circle cx="14" cy="8" r="20" /></g></g><g className="ah-l ah-cloud" style={{ '--d': '0.4s', animationDuration: '.9s,19s,auto' }}><g transform="translate(622 92) scale(0.8)"><circle cx="0" cy="0" r="26" /><circle cx="28" cy="-14" r="32" /><circle cx="62" cy="-6" r="27" /><circle cx="88" cy="4" r="19" /><circle cx="44" cy="8" r="24" /><circle cx="14" cy="8" r="20" /></g></g>
              <g className="ah-l ah-city" style={{ '--d': '.35s' }}><g transform="translate(300.0 176.0) scale(0.6)"><rect x="520" y="370" width="40" height="70" /><rect x="562" y="328" width="30" height="112" /><rect x="594" y="354" width="46" height="86" /><rect x="644" y="298" width="28" height="142" /><rect x="674" y="344" width="44" height="96" /><rect x="720" y="316" width="34" height="124" /><rect x="756" y="360" width="40" height="80" /><g className="wn"><path d="M527,386h26" /><path d="M527,404h26" /><path d="M527,422h26" /><path d="M569,344h16" /><path d="M569,362h16" /><path d="M569,380h16" /><path d="M569,398h16" /><path d="M569,416h16" /><path d="M601,370h32" /><path d="M601,388h32" /><path d="M601,406h32" /><path d="M601,424h32" /><path d="M651,314h14" /><path d="M651,332h14" /><path d="M651,350h14" /><path d="M651,368h14" /><path d="M651,386h14" /><path d="M651,404h14" /><path d="M651,422h14" /><path d="M681,360h30" /><path d="M681,378h30" /><path d="M681,396h30" /><path d="M681,414h30" /><path d="M727,332h20" /><path d="M727,350h20" /><path d="M727,368h20" /><path d="M727,386h20" /><path d="M727,404h20" /><path d="M727,422h20" /><path d="M763,376h26" /><path d="M763,394h26" /><path d="M763,412h26" /></g>
                <path className="stk" d="M694,440 L700,262 L712,262 L718,440Z" /><path className="stk" d="M734,440 L739,292 L749,292 L754,440Z" />
                <circle className="smk s1" cx="706" cy="246" r="11" /><circle className="smk s2" cx="744" cy="276" r="9" /><circle className="smk s3" cx="716" cy="226" r="7" /></g></g>
              <path className="ah-l ah-hill" style={{ '--d': '.2s' }} d="M60.0,470.0 L69.0,464.1 L80.0,457.5 L92.6,450.5 L106.4,443.4 L121.2,436.2 L136.8,429.4 L152.7,423.2 L168.8,417.7 L184.7,413.2 L200.0,410.0 L215.2,408.2 L230.7,407.5 L246.5,407.9 L262.6,409.0 L278.8,410.6 L295.0,412.6 L311.4,414.8 L327.7,416.9 L343.9,418.7 L360.0,420.0 L375.9,421.2 L391.7,422.6 L407.4,424.1 L423.0,425.7 L438.8,427.2 L454.6,428.6 L470.5,429.6 L486.7,430.3 L503.2,430.5 L520.0,430.0 L537.6,428.6 L556.2,426.1 L575.4,422.9 L594.9,419.2 L614.4,415.4 L633.5,411.7 L652.0,408.4 L669.4,405.8 L685.6,404.3 L700.0,404.0 L713.0,404.9 L725.2,406.5 L736.5,408.9 L746.8,411.8 L756.2,415.4 L764.8,419.5 L772.5,424.0 L779.2,429.0 L785.0,434.3 L790.0,440.0 L797.0,446.6 L807.8,454.5 L820.2,463.3 L832.5,472.7 L842.5,482.2 L848.3,491.6 L848.0,500.5 L839.4,508.4 L820.8,515.0 L790.0,520.0 L741.9,523.5 L675.7,525.9 L595.9,527.5 L507.0,528.2 L413.8,528.1 L320.6,527.4 L232.0,526.2 L152.7,524.5 L87.2,522.4 L40.0,520.0 L10.3,517.1 L-7.2,513.4 L-14.4,509.0 L-13.2,504.1 L-5.6,498.8 L6.4,493.1 L20.9,487.3 L36.0,481.4 L49.7,475.6Z" />
              <g className="ah-l ah-t t3" style={{ '--d': '0.5s' }}><path className="tw" d="M36.5,484.0 L38.6,366.0 L41.4,366.0 L43.5,484.0Z" /><g className="bl" style={{ transformOrigin: '40.0px 366.0px', animationDuration: '7s' }}><g transform="translate(40.0 366.0)"><path className="bd" d="M0,0 C3,-6 4,-49.6 0,-59.0 C-3,-49.6 -2,-6 0,0Z" /><path className="bd" d="M0,0 C3,-6 4,-49.6 0,-59.0 C-3,-49.6 -2,-6 0,0Z" transform="rotate(120)" /><path className="bd" d="M0,0 C3,-6 4,-49.6 0,-59.0 C-3,-49.6 -2,-6 0,0Z" transform="rotate(240)" /></g></g><circle className="hb" cx="40.0" cy="366.0" r="2.6" /></g><g className="ah-l ah-t t1" style={{ '--d': '0.45s' }}><path className="tw" d="M105.6,470.0 L109.4,256.0 L114.6,256.0 L118.4,470.0Z" /><g className="bl" style={{ transformOrigin: '112.0px 256.0px', animationDuration: '9s' }}><g transform="translate(112.0 256.0)"><path className="bd" d="M0,0 C3,-6 4,-89.9 0,-107.0 C-3,-89.9 -2,-6 0,0Z" /><path className="bd" d="M0,0 C3,-6 4,-89.9 0,-107.0 C-3,-89.9 -2,-6 0,0Z" transform="rotate(120)" /><path className="bd" d="M0,0 C3,-6 4,-89.9 0,-107.0 C-3,-89.9 -2,-6 0,0Z" transform="rotate(240)" /></g></g><circle className="hb" cx="112.0" cy="256.0" r="4.7" /></g><g className="ah-l ah-t t2" style={{ '--d': '0.55s' }}><path className="tw" d="M174.0,458.0 L176.4,326.0 L179.6,326.0 L182.0,458.0Z" /><g className="bl" style={{ transformOrigin: '178.0px 326.0px', animationDuration: '11s' }}><g transform="translate(178.0 326.0)"><path className="bd" d="M0,0 C3,-6 4,-55.4 0,-66.0 C-3,-55.4 -2,-6 0,0Z" /><path className="bd" d="M0,0 C3,-6 4,-55.4 0,-66.0 C-3,-55.4 -2,-6 0,0Z" transform="rotate(120)" /><path className="bd" d="M0,0 C3,-6 4,-55.4 0,-66.0 C-3,-55.4 -2,-6 0,0Z" transform="rotate(240)" /></g></g><circle className="hb" cx="178.0" cy="326.0" r="2.9" /></g>
              <g className="ah-l ah-island" style={{ '--d': '.3s' }} filter="url(#ah-soft)">
                <path className="paper" d="M19.5,517.8 L24.4,514.1 L28.1,512.8 L31.9,510.7 L36.8,507.2 L42.7,502.2 L49.4,504.1 L55.0,497.5 L62.7,499.5 L69.5,493.4 L77.5,488.6 L84.4,487.7 L89.9,484.2 L97.8,486.4 L104.9,482.7 L113.6,479.2 L120.9,475.1 L127.1,474.0 L136.1,473.3 L142.3,472.5 L149.9,468.7 L157.8,469.5 L163.5,466.9 L171.5,467.1 L179.3,461.7 L187.4,459.1 L193.3,461.6 L200.2,458.4 L207.4,458.2 L216.8,456.3 L224.7,453.3 L231.9,453.9 L239.2,451.9 L247.6,454.0 L254.3,451.2 L260.9,450.6 L270.1,451.6 L278.1,446.4 L284.6,448.1 L291.2,446.3 L299.2,443.5 L306.3,447.4 L314.0,443.7 L322.1,447.6 L328.8,444.8 L337.4,447.6 L345.5,447.5 L351.5,444.9 L359.2,448.1 L368.1,443.8 L373.5,444.7 L381.1,446.7 L389.5,445.8 L395.5,447.3 L403.9,448.8 L413.0,450.2 L419.4,450.3 L427.4,447.3 L435.6,452.6 L443.3,453.3 L449.7,451.4 L456.8,453.6 L464.5,450.7 L472.7,452.3 L481.0,452.5 L488.0,454.3 L496.2,456.8 L504.1,461.3 L513.6,457.8 L520.7,460.3 L529.0,460.1 L538.3,466.8 L545.4,464.7 L552.5,463.3 L561.3,465.4 L570.6,465.5 L576.6,471.4 L586.0,466.8 L594.1,466.6 L602.0,472.9 L610.9,471.3 L617.7,468.7 L625.8,470.9 L635.5,469.9 L643.7,465.2 L654.0,468.6 L663.1,465.9 L672.1,463.6 L679.7,460.4 L689.0,455.4 L697.2,455.2 L706.4,456.2 L716.8,453.0 L724.9,455.1 L733.0,449.9 L738.5,448.3 L745.8,447.5 L753.3,452.1 L760.3,449.5 L765.1,452.8 L768.9,453.0 L775.2,456.0 L779.0,456.3 L780.9,461.4 L784.7,464.5 L788.9,465.8 L790.0,473.1 L792.7,472.5 L793.0,476.8 L796.3,485.8 L795.6,490.7 L798.4,494.7 L797.6,499.2 L797.2,501.0 L799.7,510.3 L798.4,517.4 L798.0,522.3 L798.6,523.2 L796.7,528.9 L796.0,535.7 L795.4,539.5 L794.2,547.5 L793.9,549.6 L793.4,557.7 L791.8,563.1 L790.6,566.1 L789.2,568.3 L787.1,575.0 L784.2,584.5 L782.3,588.0 L781.5,594.1 L777.6,599.3 L775.4,606.4 L770.9,610.1 L767.9,613.5 L765.2,619.7 L760.6,626.1 L756.8,628.3 L751.3,632.9 L745.5,637.7 L739.9,640.2 L733.6,645.7 L727.8,648.2 L721.1,646.6 L712.9,653.4 L705.6,650.1 L695.7,654.0 L686.9,654.2 L678.2,658.4 L670.8,661.1 L660.0,661.1 L651.6,658.4 L642.5,664.7 L630.8,665.4 L621.3,663.3 L612.6,666.2 L600.3,664.4 L590.9,664.6 L579.8,665.2 L570.9,664.1 L560.1,667.6 L548.2,667.8 L539.3,669.8 L526.8,673.6 L517.6,674.3 L504.5,670.4 L492.9,674.4 L481.8,670.8 L470.4,676.4 L459.6,672.7 L446.0,677.4 L435.1,676.4 L421.9,672.7 L411.5,675.3 L398.0,678.8 L387.7,678.1 L374.5,678.5 L362.9,678.6 L352.3,675.2 L341.3,678.9 L329.4,673.6 L318.9,674.1 L306.7,673.4 L295.3,673.4 L284.6,673.8 L274.4,673.4 L262.4,672.3 L250.7,670.8 L239.1,670.3 L229.2,673.2 L216.7,672.1 L207.8,669.0 L196.7,670.3 L185.4,671.9 L174.7,668.8 L165.6,670.7 L154.9,668.5 L146.6,665.8 L136.6,662.5 L127.3,659.4 L118.9,661.5 L111.6,655.8 L103.3,658.1 L98.0,654.6 L89.1,649.5 L82.2,648.2 L75.0,645.5 L68.8,646.0 L64.2,640.4 L56.5,640.0 L50.8,633.1 L44.6,630.0 L40.5,627.6 L35.0,624.2 L29.8,619.3 L25.8,616.8 L21.5,610.9 L18.7,608.8 L15.9,607.2 L13.5,604.5 L10.6,602.4 L7.5,595.2 L6.8,590.4 L4.6,589.7 L1.2,586.9 L2.4,581.5 L1.0,578.5 L-0.9,572.4 L-0.4,570.1 L0.6,565.8 L0.2,561.9 L1.3,556.3 L0.9,547.8 L2.1,545.7 L3.4,544.6 L6.5,539.2 L8.7,535.6 L11.0,527.5 L14.4,528.5 L16.8,523.7Z" />
                <image href="/assets/hero-collage/fields.webp" x="-30" y="430" width="860" height="356" preserveAspectRatio="xMidYMid slice" clipPath="url(#ah-isl)" />
                <path className="rv" clipPath="url(#ah-isl)" d="M560,720 C610,680 680,664 740,650 C770,642 800,628 830,612 L830,720Z" />
                <g className="wv" clipPath="url(#ah-isl)"><path d="M640,690 q10,-7 20,0 t20,0 t20,0" /><path d="M712,668 q10,-7 20,0 t20,0" /><path d="M744,690 q10,-7 20,0 t20,0" /></g>
                <path className="edge" d="M19.5,517.8 L24.4,514.1 L28.1,512.8 L31.9,510.7 L36.8,507.2 L42.7,502.2 L49.4,504.1 L55.0,497.5 L62.7,499.5 L69.5,493.4 L77.5,488.6 L84.4,487.7 L89.9,484.2 L97.8,486.4 L104.9,482.7 L113.6,479.2 L120.9,475.1 L127.1,474.0 L136.1,473.3 L142.3,472.5 L149.9,468.7 L157.8,469.5 L163.5,466.9 L171.5,467.1 L179.3,461.7 L187.4,459.1 L193.3,461.6 L200.2,458.4 L207.4,458.2 L216.8,456.3 L224.7,453.3 L231.9,453.9 L239.2,451.9 L247.6,454.0 L254.3,451.2 L260.9,450.6 L270.1,451.6 L278.1,446.4 L284.6,448.1 L291.2,446.3 L299.2,443.5 L306.3,447.4 L314.0,443.7 L322.1,447.6 L328.8,444.8 L337.4,447.6 L345.5,447.5 L351.5,444.9 L359.2,448.1 L368.1,443.8 L373.5,444.7 L381.1,446.7 L389.5,445.8 L395.5,447.3 L403.9,448.8 L413.0,450.2 L419.4,450.3 L427.4,447.3 L435.6,452.6 L443.3,453.3 L449.7,451.4 L456.8,453.6 L464.5,450.7 L472.7,452.3 L481.0,452.5 L488.0,454.3 L496.2,456.8 L504.1,461.3 L513.6,457.8 L520.7,460.3 L529.0,460.1 L538.3,466.8 L545.4,464.7 L552.5,463.3 L561.3,465.4 L570.6,465.5 L576.6,471.4 L586.0,466.8 L594.1,466.6 L602.0,472.9 L610.9,471.3 L617.7,468.7 L625.8,470.9 L635.5,469.9 L643.7,465.2 L654.0,468.6 L663.1,465.9 L672.1,463.6 L679.7,460.4 L689.0,455.4 L697.2,455.2 L706.4,456.2 L716.8,453.0 L724.9,455.1 L733.0,449.9 L738.5,448.3 L745.8,447.5 L753.3,452.1 L760.3,449.5 L765.1,452.8 L768.9,453.0 L775.2,456.0 L779.0,456.3 L780.9,461.4 L784.7,464.5 L788.9,465.8 L790.0,473.1 L792.7,472.5 L793.0,476.8 L796.3,485.8 L795.6,490.7 L798.4,494.7 L797.6,499.2 L797.2,501.0 L799.7,510.3 L798.4,517.4 L798.0,522.3 L798.6,523.2 L796.7,528.9 L796.0,535.7 L795.4,539.5 L794.2,547.5 L793.9,549.6 L793.4,557.7 L791.8,563.1 L790.6,566.1 L789.2,568.3 L787.1,575.0 L784.2,584.5 L782.3,588.0 L781.5,594.1 L777.6,599.3 L775.4,606.4 L770.9,610.1 L767.9,613.5 L765.2,619.7 L760.6,626.1 L756.8,628.3 L751.3,632.9 L745.5,637.7 L739.9,640.2 L733.6,645.7 L727.8,648.2 L721.1,646.6 L712.9,653.4 L705.6,650.1 L695.7,654.0 L686.9,654.2 L678.2,658.4 L670.8,661.1 L660.0,661.1 L651.6,658.4 L642.5,664.7 L630.8,665.4 L621.3,663.3 L612.6,666.2 L600.3,664.4 L590.9,664.6 L579.8,665.2 L570.9,664.1 L560.1,667.6 L548.2,667.8 L539.3,669.8 L526.8,673.6 L517.6,674.3 L504.5,670.4 L492.9,674.4 L481.8,670.8 L470.4,676.4 L459.6,672.7 L446.0,677.4 L435.1,676.4 L421.9,672.7 L411.5,675.3 L398.0,678.8 L387.7,678.1 L374.5,678.5 L362.9,678.6 L352.3,675.2 L341.3,678.9 L329.4,673.6 L318.9,674.1 L306.7,673.4 L295.3,673.4 L284.6,673.8 L274.4,673.4 L262.4,672.3 L250.7,670.8 L239.1,670.3 L229.2,673.2 L216.7,672.1 L207.8,669.0 L196.7,670.3 L185.4,671.9 L174.7,668.8 L165.6,670.7 L154.9,668.5 L146.6,665.8 L136.6,662.5 L127.3,659.4 L118.9,661.5 L111.6,655.8 L103.3,658.1 L98.0,654.6 L89.1,649.5 L82.2,648.2 L75.0,645.5 L68.8,646.0 L64.2,640.4 L56.5,640.0 L50.8,633.1 L44.6,630.0 L40.5,627.6 L35.0,624.2 L29.8,619.3 L25.8,616.8 L21.5,610.9 L18.7,608.8 L15.9,607.2 L13.5,604.5 L10.6,602.4 L7.5,595.2 L6.8,590.4 L4.6,589.7 L1.2,586.9 L2.4,581.5 L1.0,578.5 L-0.9,572.4 L-0.4,570.1 L0.6,565.8 L0.2,561.9 L1.3,556.3 L0.9,547.8 L2.1,545.7 L3.4,544.6 L6.5,539.2 L8.7,535.6 L11.0,527.5 L14.4,528.5 L16.8,523.7Z" />
              </g>
              <g className="ah-l ah-panelg" style={{ '--d': '.6s' }} filter="url(#ah-soft)"><image href="/assets/hero-collage/solar-panels.webp" x="190" y="550" width="400" height="210" preserveAspectRatio="xMidYMid slice" clipPath="url(#ah-panels)" />
                <path className="edge thin" d="M236,590 L506,566 L568,646 L204,676Z" /></g>
            </svg>
            <span className="ah-fig ah-walker" style={{ '--d': '.8s' }}><img src="/assets/hero-collage/farmer-walking.svg" width="368" height="1000" alt="" /></span>
            <span className="ah-fig ah-wa" style={{ '--d': '.9s' }}><img src="/assets/hero-collage/woman-a.svg" width="278" height="1000" alt="" /></span>
            <span className="ah-fig ah-wb" style={{ '--d': '.95s' }}><img src="/assets/hero-collage/woman-b.svg" width="267" height="1000" alt="" /></span>
            <span className="ah-fig ah-wc" style={{ '--d': '1s' }}><img src="/assets/hero-collage/women-c.svg" width="584" height="1000" alt="" /></span>
            <span className="ah-fig ah-sa" style={{ '--d': '1.1s' }}><img src="/assets/hero-collage/sowing-a.svg" width="782" height="1000" alt="" /></span>
            <span className="ah-fig ah-sb" style={{ '--d': '1.15s' }}><img src="/assets/hero-collage/sowing-b.svg" width="670" height="1000" alt="" /></span>
            <span className="ah-fig ah-worker" style={{ '--d': '1.2s' }}><img src="/assets/hero-collage/solar-worker.svg" width="980" height="1000" alt="" /></span>
            <svg className="ah-svg ah-front" viewBox="0 0 800 720" aria-hidden="true">
              <g className="ah-l ah-deco" style={{ '--d': '1.25s' }}>
                <g className="cross"><path d="M760,24 v40 M740,44 h40" /></g>
                <g className="tri"><path d="M36,22 L70,80 L2,80Z" /><path className="st" d="M26,46 h20 M18,58 h36 M10,70 h52" /></g>
                <g className="arc"><path d="M30,690 a44,44 0 0 1 88,0" /></g>
              </g>
            </svg>
          </div>
          </div>
        </div>
      </section>
      {/* the emissions section is part of V4 B only */}
      {variant === 'soft' && <FootprintStory />}
      <section className="wrap sec" aria-labelledby="h-why">
        <div className="why">
          <div className="why-copy">
            <div className="hl rv">
              <span className="eyebrow">Why NZII exists</span>
              <h2 id="h-why">Net zero can take many forms. <span className="teal">So can India’s path to&nbsp;it.</span></h2>
              <div className="rule" aria-hidden="true"></div>
            </div>
            <h3 className="rv">India’s transition will involve choices.</h3>
            <ul className="choices rv">
              <li className="c-teal">Where should new energy infrastructure be built?</li>
              <li className="c-teal">How much land and water could different pathways require?</li>
              <li className="c-teal">What happens to jobs and livelihoods?</li>
              <li className="c-teal">How might energy choices affect air quality and health?</li>
              <li className="c-teal">Where will investment flow?</li>
              <li className="c-teal">And will the costs and benefits of the transition be shared equitably?</li>
            </ul>
            <p className="closing rv">These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.</p>
          </div>
          <figure className="photo rv" style={{ margin: '0' }}>
            <img src="/assets/photos/12_Urbanisation_Sep2024_photo2_group_exercise.jpg" alt="Participants working together in a group exercise at an NZII workshop on urbanisation, IIT Delhi" loading="lazy" />
            <svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg>
          </figure>
        </div>
        <div className="picture">
          <div className="pic-head rv">
            <h3>NZII presents a more complete picture of India’s net-zero transition</h3>
            <div className="rule" aria-hidden="true"></div>
            <p className="lead-in" id="qual-lead">That picture is more complete because our research&nbsp;is:</p>
          </div>
          <div className="qual qual-ph" role="region" aria-labelledby="qual-lead" tabIndex={0}>
            <article className="qcard rv">
              <figure className="photo"><img src="/assets/photos/qualities/card-integrated.jpg" srcSet="/assets/photos/qualities/card-integrated-sm.jpg 360w, /assets/photos/qualities/card-integrated.jpg 720w" sizes="(max-width:560px) 78vw, (max-width:1000px) 46vw, 23vw" width="720" height="800" alt="Farmers working a chickpea field beneath wind turbines, Tamil Nadu" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure>
              <span className="num">01</span>
              <h4>Integrated</h4>
              <p>Connecting energy and emissions with development and natural-resource outcomes.</p>
            </article>
            <article className="qcard rv">
              <figure className="photo"><img src="/assets/photos/qualities/card-spatial.jpg" srcSet="/assets/photos/qualities/card-spatial-sm.jpg 360w, /assets/photos/qualities/card-spatial.jpg 720w" sizes="(max-width:560px) 78vw, (max-width:1000px) 46vw, 23vw" width="720" height="800" alt="Farm plots seen from above, Punjab" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure>
              <span className="num">02</span>
              <h4>Spatially resolved</h4>
              <p>Moving beyond national averages to understand how pathways and impacts could differ across states, districts and places.</p>
            </article>
            <article className="qcard rv">
              <figure className="photo"><img src="/assets/photos/qualities/card-development.jpg" srcSet="/assets/photos/qualities/card-development-sm.jpg 360w, /assets/photos/qualities/card-development.jpg 720w" sizes="(max-width:560px) 78vw, (max-width:1000px) 46vw, 23vw" width="720" height="800" alt="Women at work in a green field, Gujarat" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure>
              <span className="num">03</span>
              <h4>Development-centred</h4>
              <p>Keeping employment, health, energy access, equity and economic development alongside mitigation.</p>
            </article>
            <article className="qcard rv">
              <figure className="photo"><img src="/assets/photos/qualities/card-open.jpg?v=2" srcSet="/assets/photos/qualities/card-open-sm.jpg?v=2 360w, /assets/photos/qualities/card-open.jpg?v=2 720w" sizes="(max-width:560px) 78vw, (max-width:1000px) 46vw, 23vw" width="720" height="800" alt="Participants map together on a laptop at an OpenStreetMap session, Wiki Conference India, Mohali" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></figure>
              <span className="num">04</span>
              <h4>Rigorous &amp; Open</h4>
              <p>Building robust research, models and datasets that others can examine, use and build upon.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="h-led">
        <div className="led">
          <figure className="photo rv" style={{ margin: '0' }}>
            <img src="/assets/photos/12_Agriculture_Dec2024_photo2_room.jpg" alt="Researchers and practitioners in discussion at an NZII workshop on agriculture, IIT Delhi" loading="lazy" />
            <svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg>
          </figure>
          <div className="led-copy">
            <div className="hl rv">
              <span className="eyebrow">Collaborative model</span>
              <h2 id="h-led">Led by India. <span className="teal">Built through collaboration.</span></h2>
              <div className="rule" aria-hidden="true"></div>
            </div>
            <p className="rv">The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.</p>
            <div className="insts rv">
              <div><span className="eyebrow c-teal">Led by</span><div className="logos"><span className="lg"><img src="/assets/logos/spp-iit-delhi.png" alt="School of Public Policy, IIT Delhi" /></span></div><b>School of Public Policy, IIT&nbsp;Delhi</b></div>
              <div><span className="eyebrow c-teal">Core partners</span><div className="logos"><span className="lg"><img src="/assets/logos/prayas-energy-group.png" alt="Prayas (Energy Group)" /></span><span className="lg"><img src="/assets/logos/princeton-university.png" alt="Princeton University" /></span></div><b>Prayas (Energy Group)<br />Princeton University</b></div>
            </div>
            <div className="rv"><Link className="btn line" to="/v4/who-we-are#iit-delhi-team">Meet the team &amp; partners <span className="ar" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
        <div className="support rv">
          <span className="eyebrow c-teal">Supported by</span>
          <span className="lg"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" /></span>
          <span className="lg"><img src="/assets/logos/giving-green.webp" alt="Giving Green" /></span>
          <span className="lg"><img src="/assets/logos/princeton-university.png" alt="Princeton University" /></span>
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="h-work">
        <div className="hl rv" style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
          <h2 id="h-work" className="one">Explore <span className="teal">our work</span></h2>
          <div className="rule" aria-hidden="true"></div>
        </div>
        <div className="work">
          <Link className="card feat c-teal rv" to="/v4/research">
            <div className="photo"><img src="/assets/photos/12_Agriculture_Dec2024_photo1_room.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
            <div className="body">
              <span className="eyebrow c-teal">Featured research</span>
              <h3>First results from NZII’s Reference scenario</h3>
              <p>A baseline of how India’s energy demand, electricity supply and land-sector emissions could evolve to 2070, presented to NZII’s Advisory Committee in September 2026.</p>
              <span className="go">Read the update <span className="ar" aria-hidden="true">→</span></span>
            </div>
          </Link>
          <div className="side">
            <Link className="card c-teal rv" to="/v4/collaborate">
              <span className="eyebrow c-teal">Get involved</span>
              <h3>Collaborate with us</h3>
              <p>Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative.</p>
              <span className="go">Explore opportunities <span className="ar" aria-hidden="true">→</span></span>
            </Link>
            <Link className="card c-teal rv" to="/v4/publications">
              <span className="eyebrow c-teal">Library</span>
              <h3>Publications &amp; Outputs</h3>
              <p>Working papers, policy briefs, reports, presentations, and other outputs from the initiative.</p>
              <span className="go">View all outputs <span className="ar" aria-hidden="true">→</span></span>
            </Link>
          </div>
        </div>
      </section>
      <section className="wrap sec" aria-labelledby="h-news">
        <div className="head">
          <div className="hl rv">
            <h2 id="h-news" className="one">Latest from the <span className="teal">Net Zero India Initiative</span></h2>
            <div className="rule" aria-hidden="true"></div>
          </div>
          <Link className="go rv" to="/v4/news-events">View all updates <span className="ar" aria-hidden="true">→</span></Link>
        </div>
        <div className="news">
          <Link className="card c-teal rv" to="/v4/news-events">
            <div className="photo"><img src="/assets/photos/03_Launch_Jul2024_photo1_room.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
            <div className="body"><span className="eyebrow c-teal">News &amp; Updates</span><h3>NZII presents its development-compatible approach at Princeton’s NZx workshop</h3><time dateTime="2026-09">September 2026</time></div>
          </Link>
          <Link className="card c-teal rv" to="/v4/news-events">
            <div className="photo"><img src="/assets/photos/12_Urbanisation_Sep2024_photo1_group.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
            <div className="body"><span className="eyebrow c-teal">Workshops &amp; Events</span><h3>Workshop asks how land for solar and wind can be governed fairly</h3><time dateTime="2026-05">May 2026</time></div>
          </Link>
          <Link className="card c-teal rv" to="/v4/publications">
            <div className="photo"><img src="/assets/photos/12_Industry_Dec2024_photo1_room.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
            <div className="body"><span className="eyebrow c-teal">Research &amp; Publications</span><h3>NZII researchers write the opening chapter of the ICEF report</h3><time dateTime="2026-04">April 2026</time></div>
          </Link>
        </div>
      </section>
      <section className="wrap final" aria-labelledby="h-cta">
        <div className="final-in rv">
          <h2 id="h-cta">India’s path to 2070 <span className="teal">is still being written.</span></h2>
          <div className="rule" aria-hidden="true"></div>
          <p>Explore the research, evidence and ideas helping us understand the choices ahead.</p>
          <Link className="btn" to="/v4/research">Explore our research <span className="ar" aria-hidden="true">→</span></Link>
        </div>
      </section>
      </main>
      <OpenCallsPopup heroSelector="#content .hero" smart={variant !== 'exact'} />
      {variant !== 'exact' && <HomeFxA rootRef={root} />}
    </>
  );
};
