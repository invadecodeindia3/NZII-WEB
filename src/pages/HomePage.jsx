import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pbh.css';
import { useSanity } from '../sanity/useSanity';
import { homePageQuery } from '../sanity/queries';

export const HomePage = () => {
  const heroSvgRef = useRef(null);
  const { data: cms } = useSanity(homePageQuery);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    function css(v) { return getComputedStyle(root).getPropertyValue(v).trim(); }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    function still() { return reduce.matches || root.getAttribute('data-mode') === 'eco'; }

    const ns = 'http://www.w3.org/2000/svg';
    const PAL = ['#2b9d8f', '#a7c957', '#e76f51', '#f28482'];
    function rng(seed) {
      return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    }

    // Small dot clusters on photo corners
    function drawClusters() {
      document.querySelectorAll('svg[data-cluster]').forEach(function (svg, i) {
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        const r = rng(11 + i * 5);
        const bg = css('--bg') || '#fffcf6';
        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 7; x++) {
            const d = (x + y) / 10;
            if (r() > d) continue;
            const c = document.createElementNS(ns, 'circle');
            c.setAttribute('cx', 8 + x * 17);
            c.setAttribute('cy', 8 + y * 18);
            c.setAttribute('r', (1.5 + d * 5 * r()).toFixed(1));
            c.setAttribute('fill', d > 0.75 ? bg : PAL[Math.floor(r() * PAL.length)]);
            if (d <= 0.75) {
              c.setAttribute('class', 'pl');
              c.style.setProperty('--dl', ((6 - x) + (4 - y)) * 0.22 + 's');
            }
            svg.appendChild(c);
          }
        }
      });
    }
    drawClusters();

    window.addEventListener('nzii-mode', drawClusters);

    // Hero bubble illustration
    const svg = heroSvgRef.current || document.querySelector('.hero-svg');
    let cleanupHero = () => {};
    if (svg) {
      const order = ['pathways', 'community', 'innovation', 'research', 'netzero'];
      const items = [].slice.call(svg.querySelectorAll('.b')).map(function (el) {
        return {
          el: el,
          cx: +el.dataset.cx,
          cy: +el.dataset.cy,
          k: el.dataset.k || '',
          photo: el.classList.contains('photo'),
          s: 1,
          ts: 1,
          o: 1,
          to: 1,
          lbl: el.dataset.k ? svg.querySelector('.lbl[data-for="' + el.dataset.k + '"]') : null
        };
      });

      let di = 0;
      items.forEach(function (it) {
        if (it.photo) {
          const n = order.indexOf(it.k);
          it.start = 0.55 + n * 0.22;
          it.dur = 1.15;
        } else {
          it.start = 0.1 + (di++) * 0.05;
          it.dur = 0.55;
        }
      });

      const t0 = performance.now();
      let raf = 0;
      let focus = null;
      function easeOut(x) { return 1 - Math.pow(1 - x, 4); }
      function around(cx, cy, s) {
        return 'translate(' + cx + ' ' + cy + ') scale(' + s.toFixed(4) + ') translate(' + (-cx) + ' ' + (-cy) + ')';
      }

      function frame(now) {
        const t = (now - t0) / 1000;
        const calm = still();
        let busy = false;
        items.forEach(function (it) {
          const e = calm ? 1 : Math.min(1, Math.max(0, (t - it.start) / it.dur));
          if (e < 1) busy = true;
          const grow = it.photo ? (0.06 + 0.94 * easeOut(e)) : (0.3 + 0.7 * easeOut(e));
          it.ts = focus ? (focus === it ? 1.025 : 1) : 1;
          it.to = focus && focus !== it && it.photo ? 0.55 : 1;
          it.s += (it.ts - it.s) * 0.12;
          it.o += (it.to - it.o) * 0.12;
          if (Math.abs(it.ts - it.s) > 0.0005 || Math.abs(it.to - it.o) > 0.005) busy = true;
          it.el.setAttribute('transform', around(it.cx, it.cy, grow * it.s));
          it.el.style.opacity = (Math.min(1, e * 2.5) * it.o).toFixed(3);
          if (it.lbl && e > 0.6) it.lbl.classList.add('shown');
        });
        raf = busy ? requestAnimationFrame(frame) : 0;
      }

      function kick() {
        if (!raf) raf = requestAnimationFrame(frame);
      }

      const handlers = [];
      items.forEach(function (it) {
        if (!it.photo) return;
        const enter = function () {
          focus = it;
          svg.classList.add('focus');
          if (it.lbl) it.lbl.classList.add('on');
          kick();
        };
        const leave = function () {
          focus = null;
          svg.classList.remove('focus');
          if (it.lbl) it.lbl.classList.remove('on');
          kick();
        };
        it.el.addEventListener('pointerenter', enter);
        it.el.addEventListener('pointerleave', leave);
        handlers.push({ el: it.el, enter, leave });
      });

      kick();

      cleanupHero = () => {
        if (raf) cancelAnimationFrame(raf);
        handlers.forEach(h => {
          h.el.removeEventListener('pointerenter', h.enter);
          h.el.removeEventListener('pointerleave', h.leave);
        });
      };
    }

    // Cards dot spotlight
    const cardMoveHandlers = [];
    document.querySelectorAll('.card').forEach(function (el) {
      const handler = function (e) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      };
      el.addEventListener('pointermove', handler);
      cardMoveHandlers.push({ el, handler });
    });

    // Reveal on scroll
    const items = [].slice.call(document.querySelectorAll('.rv, .track'));
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      items.forEach(function (el, i) {
        el.style.transitionDelay = el.classList.contains('rv') ? ((i % 4) * 70) + 'ms' : '';
        io.observe(el);
      });
    } else {
      items.forEach(function (el) { el.classList.add('in'); });
    }

    return () => {
      window.removeEventListener('nzii-mode', drawClusters);
      cleanupHero();
      cardMoveHandlers.forEach(h => h.el.removeEventListener('pointermove', h.handler));
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div className="home-wrapper w-full">
{/* 01 Hero: original PBH design */}
<section className="hero" aria-labelledby="h-hero">
  <div className="hero-in">
    <div>
      <h1 id="h-hero">
        <span className="hl-1">{cms?.heroHeadline1 || "What will it take"}</span>{" "}
        <span className="hl-2">{cms?.heroHeadline2 || "for India to reach"}</span>{" "}
        <span className="hl-3">{cms?.heroHeadline3 || "net\u00A0zero?"}</span>
      </h1>
      <div className="hero-txt">
        <p>{cms?.heroParagraph1 || "India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods."}</p>
        <p>{cms?.heroParagraph2 || "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment."}</p>
      </div>
      <div className="hero-act">
        <a className="pri" href={cms?.heroButtonLink || "/about"}>
          {cms?.heroButtonText || "About the Net Zero India Initiative"}{" "}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
    <div className="hero-art">
    <svg ref={heroSvgRef} className="hero-svg" viewBox="1040 20 820 960" role="img" aria-label="Pathways, Community, Innovation, Research">
      <defs>
        <clipPath id="hc-inn"><circle cx="1259.19" cy="683.82" r="107.64"/></clipPath>
        <clipPath id="hc-cen"><circle cx="1418.59" cy="502.08" r="199.03"/></clipPath>
        <clipPath id="hc-res"><circle cx="1680.12" cy="604.52" r="140.86"/></clipPath>
        <clipPath id="hc-pat"><circle cx="1169.98" cy="330.23" r="89.22"/></clipPath>
        <clipPath id="hc-nz"><circle cx="1566.29" cy="236.64" r="188.99"/></clipPath>
      </defs>
      <text className="lbl" data-for="community" x="1361.64" y="758.9">Community</text>
      <text className="lbl" data-for="pathways" x="1208.1" y="152.93">Pathways</text>
      <text className="lbl" data-for="research" x="1678.51" y="439.16">Research</text>
      <g className="b photo" data-k="innovation" data-cx="1259.19" data-cy="683.82" data-d="14"><g clipPath="url(#hc-inn)"><g className="in"><image href={cms?.heroImageInnovation || "/assets/pbh/hero/innovation.jpg"} width="1280" height="720" transform="translate(1057.1693 564.6356) scale(.3318)" preserveAspectRatio="none"/></g></g></g>
      <g className="b photo" data-k="community" data-cx="1418.59" data-cy="502.08" data-d="8"><g clipPath="url(#hc-cen)"><g className="in"><image href={cms?.heroImageCentre || "/assets/pbh/hero/centre.jpg"} width="768" height="512" transform="translate(1219.5628 296.5158) scale(.803)" preserveAspectRatio="none"/></g></g></g>
      <g className="b photo" data-k="research" data-cx="1680.12" data-cy="604.52" data-d="12"><g clipPath="url(#hc-res)"><g className="in"><image href={cms?.heroImageResearch || "/assets/pbh/hero/research.jpg"} width="1557" height="1010" transform="translate(1425.4771 460.8054) scale(.285)" preserveAspectRatio="none"/></g></g></g>
      <g className="b" data-cx="1303.81" data-cy="230.29" data-d="26"><circle cx="1303.81" cy="230.29" r="44.61" fill="#2b9d8f"/></g>
      <g className="b" data-cx="1460.96" data-cy="922.5" data-d="22"><circle cx="1460.96" cy="922.5" r="44.61" fill="#a7c957"/></g>
      <g className="b" data-cx="1234.26" data-cy="401.12" data-d="24"><circle cx="1234.26" cy="401.12" r="44.61" fill="#a7c957"/></g>
      <g className="b" data-cx="1766.45" data-cy="362.71" data-d="30"><circle className="dn" cx="1766.45" cy="362.71" r="32.48"/></g>
      <g className="b" data-cx="1306.64" data-cy="632.4" data-d="28"><circle className="dn" cx="1306.64" cy="632.4" r="32.48"/></g>
      <g className="b" data-cx="1566.29" data-cy="814.13" data-d="20"><circle className="dn" cx="1566.29" cy="814.13" r="44.61"/></g>
      <g className="b photo" data-k="pathways" data-cx="1169.98" data-cy="330.23" data-d="18"><g clipPath="url(#hc-pat)"><g className="in"><image href={cms?.heroImagePathways || "/assets/pbh/hero/pathways.jpg"} width="350" height="196" transform="translate(1006.6743 234.8324) scale(.9735)" preserveAspectRatio="none"/></g></g></g>
      <g className="b" data-cx="1182.42" data-cy="559.22" data-d="30"><circle cx="1182.42" cy="559.22" r="37.05" fill="#e76f51"/></g>
      <g className="b" data-cx="1097.74" data-cy="581.65" data-d="34"><circle cx="1097.74" cy="581.65" r="27.1" fill="#f28482"/></g>
      <g className="b" data-cx="1712.33" data-cy="803.92" data-d="26"><circle cx="1712.33" cy="803.92" r="37.05" fill="#e76f51"/></g>
      <g className="b" data-cx="1761.08" data-cy="719.91" data-d="32"><circle cx="1761.08" cy="719.91" r="27.1" fill="#f28482"/></g>
      <text className="lbl" data-for="innovation" x="1219.38" y="866.84">Innovation</text>
      <g className="b photo" data-k="netzero" data-cx="1566.29" data-cy="236.64" data-d="10"><g clipPath="url(#hc-nz)"><g className="in"><image href={cms?.heroImageNetZero || "/assets/pbh/hero/netzero.jpg"} width="1200" height="652" transform="translate(1266.4716 17.4717) scale(.6433)" preserveAspectRatio="none"/></g></g></g>
    </svg>
    </div>
  </div>
</section>

{/* 02 Why NZII exists + The difference */}
<section className="wrap sec" aria-labelledby="h-why">
  <div className="why">
    <div className="why-copy">
      <div className="hl rv">
        <span className="eyebrow">{cms?.whyEyebrow || "Why NZII exists"}</span>
        <h2 id="h-why">
          {cms?.whyTitle || "Net zero can take many forms."}{" "}
          <span className="teal">{cms?.whyTitleAccent || "So can India’s path to\u00A0it."}</span>
        </h2>
        <div className="rule" aria-hidden="true"></div>
      </div>
      <h3 className="rv">{cms?.whySubhead || "India’s transition will involve choices."}</h3>
      <ul className="choices rv">
        {cms?.whyChoices && cms.whyChoices.length > 0 ? (
          cms.whyChoices.map((choice, i) => (
            <li key={i} className="c-teal">{choice}</li>
          ))
        ) : (
          <>
            <li className="c-teal">Where should new energy infrastructure be built?</li>
            <li className="c-teal">How much land and water could different pathways require?</li>
            <li className="c-teal">What happens to jobs and livelihoods?</li>
            <li className="c-teal">How might energy choices affect air quality and health?</li>
            <li className="c-teal">Where will investment flow?</li>
            <li className="c-teal">And will the costs and benefits of the transition be shared equitably?</li>
          </>
        )}
      </ul>
      <p className="closing rv">
        {cms?.whyClosing || "These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean."}
      </p>
    </div>
    <figure className="photo rv" style={{margin: 0}}>
      <img src={cms?.whyPhoto || "/assets/photos/12_Urbanisation_Sep2024_photo2_group_exercise.jpg"} alt="Participants working together in a group exercise at an NZII workshop on urbanisation, IIT Delhi" loading="lazy" />
      <svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg>
    </figure>
  </div>

  <div className="picture">
    <div className="pic-head rv">
      <h3>{cms?.pillarsTitle || "NZII presents a more complete picture of India’s net-zero transition"}</h3>
      <div className="rule" aria-hidden="true"></div>
      <p className="lead-in">{cms?.pillarsIntro || "That picture is more complete because our research\u00A0is:"}</p>
    </div>
    <div className="qual">
      {cms?.pillars && cms.pillars.length > 0 ? (
        cms.pillars.map((p, idx) => (
          <article key={idx} className="card c-teal rv">
            <span className="num">{p.num || `0${idx + 1}`}</span>
            <b>{p.title}</b>
            <p>{p.description}</p>
          </article>
        ))
      ) : (
        <>
          <article className="card c-teal rv"><span className="num">01</span><b>Integrated</b><p>Connecting energy and emissions with development and natural-resource outcomes.</p></article>
          <article className="card c-teal rv"><span className="num">02</span><b>Spatially resolved</b><p>Moving beyond national averages to understand how pathways and impacts could differ across states, districts and places.</p></article>
          <article className="card c-teal rv"><span className="num">03</span><b>Development-centred</b><p>Keeping employment, health, energy access, equity and economic development alongside mitigation.</p></article>
          <article className="card c-teal rv"><span className="num">04</span><b>Rigorous &amp; Open</b><p>Building robust research, models and datasets that others can examine, use and build upon.</p></article>
        </>
      )}
    </div>
  </div>
</section>

{/* 04 Led by India (old sections 8 + 9) */}
<section className="wrap sec" aria-labelledby="h-led">
  <div className="led">
    <figure className="photo rv" style={{margin: 0}}>
      <img src={cms?.pillarsPhoto || "/assets/photos/12_Agriculture_Dec2024_photo2_room.jpg"} alt="Researchers and practitioners in discussion at an NZII workshop on agriculture, IIT Delhi" loading="lazy" />
      <svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg>
    </figure>
    <div className="led-copy">
      <div className="hl rv">
        <span className="eyebrow">{cms?.ledEyebrow || "Collaborative model"}</span>
        <h2 id="h-led">
          {cms?.ledTitle || "Led by India."}{" "}
          <span className="teal">{cms?.ledTitleAccent || "Built through collaboration."}</span>
        </h2>
        <div className="rule" aria-hidden="true"></div>
      </div>
      <p className="rv">
        {cms?.ledDescription || "The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition."}
      </p>
      <div className="insts rv">
        <div><span className="eyebrow c-teal">Led by</span><div className="logos"><span className="lg"><img src="/assets/logos/spp-iit-delhi.png" alt="School of Public Policy, IIT Delhi" /></span></div><b>School of Public Policy, IIT&nbsp;Delhi</b></div>
        <div><span className="eyebrow c-teal">Core partners</span><div className="logos"><span className="lg"><img src="/assets/logos/prayas-energy-group.png" alt="Prayas (Energy Group)" /></span><span className="lg"><img src="/assets/logos/princeton-university.png" alt="Princeton University" /></span></div><b>Prayas (Energy Group)<br />Princeton University</b></div>
      </div>
      <div className="rv"><a className="btn line" href="/about#people">Meet the team &amp; partners <span className="ar" aria-hidden="true">→</span></a></div>
    </div>
  </div>
  <div className="support rv">
    <span className="eyebrow c-teal">Supported by</span>
    <span className="lg"><img src="/assets/logos/schmidt-sciences.svg" alt="Schmidt Sciences" /></span>
    <span className="lg"><img src="/assets/logos/giving-green.webp" alt="Giving Green" /></span>
    <span className="lg"><img src="/assets/logos/princeton-university.png" alt="Princeton University" /></span>
  </div>
</section>

{/* 05 Explore our work */}
<section className="wrap sec" aria-labelledby="h-work">
  <div className="hl rv" style={{marginBottom: "clamp(40px, 5vw, 64px)"}}>
    <h2 id="h-work" className="one">
      {cms?.workTitle || "Explore"}{" "}
      <span className="teal">{cms?.workTitleAccent || "our work"}</span>
    </h2>
    <div className="rule" aria-hidden="true"></div>
  </div>
  <div className="work">
    <div className="card feat c-teal rv static">
      <div className="photo"><img src={cms?.workFeaturedPhoto || "/assets/photos/12_Agriculture_Dec2024_photo1_room.jpg"} alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
      <div className="body">
        <span className="eyebrow c-teal">{cms?.workFeaturedEyebrow || "Featured research"}</span>
        <h3>{cms?.workFeaturedTitle || "First results from NZII’s Reference scenario"}</h3>
        <p>{cms?.workFeaturedDescription || "A baseline of how India’s energy demand, electricity supply and land-sector emissions could evolve to 2070, presented to NZII’s Advisory Committee in September 2026."}</p>
      </div>
    </div>
    <div className="side">
      <a className="card c-teal rv" href={cms?.workGetInvolvedButtonLink || "/consortium"}>
        <span className="eyebrow c-teal">{cms?.workGetInvolvedEyebrow || "Get involved"}</span>
        <h3>{cms?.workGetInvolvedTitle || "Explore Our Collaborations"}</h3>
        <p>{cms?.workGetInvolvedDescription || "Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative."}</p>
        <span className="go">{cms?.workGetInvolvedButtonText || "Explore opportunities"} <span className="ar" aria-hidden="true">→</span></span>
      </a>
    </div>
  </div>
</section>

{/* 06 Latest from NZII */}
<section className="wrap sec" aria-labelledby="h-news">
  <div className="head">
    <div className="hl rv">
      <h2 id="h-news" className="one">
        {cms?.newsTitle || "Latest from the"}{" "}
        <span className="teal">{cms?.newsTitleAccent || "Net Zero India Initiative"}</span>
      </h2>
      <div className="rule" aria-hidden="true"></div>
    </div>
  </div>
  <div className="news">
    {cms?.newsCards && cms.newsCards.length > 0 ? (
      cms.newsCards.map((n, i) => (
        <div key={i} className="card c-teal rv static">
          <div className="photo">
            {n.photo && <img src={n.photo} alt={n.title || ""} loading="lazy" />}
            <svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg>
          </div>
          <div className="body">
            <span className="eyebrow c-teal">{n.eyebrow || "News & Updates"}</span>
            <h3>{n.title}</h3>
            {n.date && <time>{n.date}</time>}
          </div>
        </div>
      ))
    ) : (
      <>
        <div className="card c-teal rv static">
          <div className="photo"><img src="/assets/photos/03_Launch_Jul2024_photo1_room.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
          <div className="body"><span className="eyebrow c-teal">News &amp; Updates</span><h3>NZII presents its development-compatible approach at Princeton’s NZx workshop</h3><time dateTime="2026-09">September 2026</time></div>
        </div>
        <div className="card c-teal rv static">
          <div className="photo"><img src="/assets/photos/12_Urbanisation_Sep2024_photo1_group.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
          <div className="body"><span className="eyebrow c-teal">Workshops &amp; Events</span><h3>Workshop asks how land for solar and wind can be governed fairly</h3><time dateTime="2026-05">May 2026</time></div>
        </div>
        <div className="card c-teal rv static">
          <div className="photo"><img src="/assets/photos/12_Industry_Dec2024_photo1_room.jpg" alt="" loading="lazy" /><svg className="cluster" data-cluster viewBox="0 0 120 90" aria-hidden="true"></svg></div>
          <div className="body"><span className="eyebrow c-teal">Research &amp; Publications</span><h3>NZII researchers write the opening chapter of the ICEF report</h3><time dateTime="2026-04">April 2026</time></div>
        </div>
      </>
    )}
  </div>
</section>

{/* 07 Final CTA */}
<section className="wrap final" aria-labelledby="h-cta">
  <div className="final-in rv">
    <h2 id="h-cta">
      {cms?.ctaTitle || "India’s path to 2070"}{" "}
      <span className="teal">{cms?.ctaTitleAccent || "is still being written."}</span>
    </h2>
    <div className="rule" aria-hidden="true"></div>
    <p>{cms?.ctaDescription || "Explore the research, evidence and ideas helping us understand the choices ahead."}</p>
  </div>
</section>
    </div>
  );
};
