import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import { useSanity } from "../sanity/useSanity";
import { aboutPageQuery } from "../sanity/queries";

export const AboutPage = () => {
  const { data: cms } = useSanity(aboutPageQuery);

  useEffect(() => {
    // 1. Draw small corner dot clusters
    const ns = "http://www.w3.org/2000/svg";
    const PAL = ["#2b9d8f", "#a7c957", "#e76f51", "#f28482"];
    const root = document.documentElement;
    const bg = getComputedStyle(root).getPropertyValue("--bg").trim() || "#fffcf6";

    document.querySelectorAll("svg[data-cluster]").forEach((svg, i) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      let seed = 11 + i * 5;
      function r() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 7; x++) {
          const d = (x + y) / 10;
          if (r() > d) continue;
          const c = document.createElementNS(ns, "circle");
          c.setAttribute("cx", 8 + x * 17);
          c.setAttribute("cy", 8 + y * 18);
          c.setAttribute("r", (1.5 + d * 5 * r()).toFixed(1));
          c.setAttribute("fill", d > 0.75 ? bg : PAL[Math.floor(r() * PAL.length)]);
          if (d <= 0.75) {
            c.setAttribute("class", "pl");
            c.style.setProperty("--dl", (6 - x + (4 - y)) * 0.22 + "s");
          }
          svg.appendChild(c);
        }
      }
    });

    // 2. People hero dots
    const peopleLayout = (svg) => {
      if (!matchMedia("(max-width:900px)").matches) {
        const sw = (svg.parentNode && svg.parentNode.getBoundingClientRect().width) || 520;
        const sc = Math.max(16, Math.min(28, Math.floor((sw / 1.28 - 24) / 25) + 1));
        const k = sw / (24 + (sc - 1) * 25);
        const ht = document.querySelector(".hero .hero-text");
        const th = ht ? ht.getBoundingClientRect().height : 0;
        const sr = Math.max(9, Math.min(24, Math.floor((th / k - 24) / 24.5) + 1));
        return { mode: "side-" + sc + "x" + sr, cols: sc, rows: sr };
      }
      const w = (svg.parentNode && svg.parentNode.getBoundingClientRect().width) || 360;
      return w >= 520
        ? { mode: "band", cols: 24, rows: 7 }
        : w >= 400
        ? { mode: "mid", cols: 18, rows: 8 }
        : { mode: "phone", cols: 13, rows: 10 };
    };

    const drawPeopleDots = (svg) => {
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const tip = svg.parentNode.querySelector(".pdot-tip");
      const wrap = svg.parentNode;
      const groups = [
        ["pi", ".pis li"],
        ["res", "#iitd-team .team-col.research li"],
        ["adm", "#iitd-team .team-col.admin li"],
        ["org", "#partner-teams li"],
      ];
      const people = [];
      groups.forEach((g) => {
        document.querySelectorAll(g[1]).forEach((li) => {
          const b = li.querySelector("b");
          if (!b) return;
          const c = b.cloneNode(true);
          c.querySelectorAll(".gs-ar").forEach((x) => x.remove());
          const name = c.textContent.trim();
          let role = li.querySelector(".role,.label");
          role = role ? role.textContent.trim() : "";
          if (g[0] === "pi") role = "Principal Investigator";
          const org = li.closest(".team-col.org");
          if (org) {
            const h = org.querySelector("h3");
            role = (role ? role + ", " : "") + (h ? h.textContent.trim() : "");
          }
          if (!li.id)
            li.id = "person-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          people.push({
            g: g[0],
            lead: g[0] === "pi" || li.classList.contains("is-lead"),
            name,
            role,
            id: li.id,
          });
        });
      });

      const L = peopleLayout(svg);
      const C = L.cols;
      const Rw = L.rows;
      const W = 24 + (C - 1) * 25;
      const H = 24 + (Rw - 1) * 24.5;
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.dataset.mode = L.mode;
      const x0 = Math.floor(C * 0.36);
      const all = [];
      for (let x = x0; x < C; x++)
        for (let y = 0; y < Rw; y++) if ((x + y) % 3 === 0) all.push([x, y]);

      const cells = [];
      for (let k = 0; k < people.length && k < all.length; k++)
        cells.push(all[Math.floor((k * all.length) / people.length)]);
      const taken = {};
      cells.forEach((c) => {
        taken[c[0] + "," + c[1]] = 1;
      });

      const base = getComputedStyle(root).getPropertyValue("--dot-base").trim() || "#1d3658";
      const fcols = [base, "#2b9d8f", "#a7c957", "#e76f51", "#f28482"];
      let seed = 7;
      function rr() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      for (let fy = 0; fy < Rw; fy++) {
        for (let fx = 0; fx < C; fx++) {
          const px = fx / (C - 1);
          if (rr() > 0.25 + px * 0.7) continue;
          const fc = document.createElementNS(ns, "circle");
          fc.setAttribute("cx", 12 + fx * 25);
          fc.setAttribute("cy", 12 + fy * 24.5);
          fc.setAttribute("r", (2 + px * 8 * rr()).toFixed(1));
          fc.setAttribute("fill", px < 0.35 ? base : fcols[Math.floor(rr() * fcols.length)]);
          if (taken[fx + "," + fy]) continue;
          fc.setAttribute("class", "pfield");
          svg.appendChild(fc);
        }
      }

      function hide() {
        if (tip) {
          tip.hidden = true;
          tip.classList.remove("below");
        }
      }

      function show(c, p) {
        if (!tip) return;
        tip.innerHTML = "<b></b><span></span>";
        tip.firstChild.textContent = p.name;
        tip.lastChild.textContent = p.role;
        tip.classList.remove("below");
        tip.hidden = false;
        const r = c.getBoundingClientRect();
        const w = wrap.getBoundingClientRect();
        const tw = tip.offsetWidth;
        const th = tip.offsetHeight;
        const left = Math.max(tw / 2, Math.min(w.width - tw / 2, r.left + r.width / 2 - w.left));
        const below = r.top - th - 14 < 80;
        tip.classList.toggle("below", below);
        tip.style.left = left + "px";
        tip.style.top = ((below ? r.bottom : r.top) - w.top) + "px";
      }

      people.forEach((p, i) => {
        if (!cells[i]) return;
        const a = document.createElementNS(ns, "a");
        a.setAttribute("href", "#" + p.id);
        a.setAttribute("class", "pdot pd-" + p.g + (p.lead ? " lead" : ""));
        a.setAttribute("aria-label", p.name + (p.role ? ", " + p.role : ""));
        const cx = 12 + cells[i][0] * 25;
        const cy = 12 + cells[i][1] * 24.5;
        const hitc = document.createElementNS(ns, "circle");
        hitc.setAttribute("cx", cx);
        hitc.setAttribute("cy", cy);
        hitc.setAttribute("r", 16);
        hitc.setAttribute("class", "phit");
        a.appendChild(hitc);
        const c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", cx);
        c.setAttribute("cy", cy);
        c.setAttribute("r", p.g === "pi" ? 8.5 : 7);
        a.appendChild(c);
        a.addEventListener("pointerenter", (e) => {
          if (e.pointerType === "mouse") show(c, p);
        });
        a.addEventListener("focus", () => show(c, p));
        a.addEventListener("pointerleave", hide);
        a.addEventListener("blur", hide);
        a.addEventListener("click", (e) => {
          hide();
          const t = document.getElementById(p.id);
          if (!t) return;
          e.preventDefault();
          t.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth",
            block: "center",
          });
          try {
            history.replaceState(null, "", "#" + p.id);
          } catch (err) {}
          t.classList.remove("pflash");
          void t.offsetWidth;
          t.classList.add("pflash");
          setTimeout(() => t.classList.remove("pflash"), 2200);
        });
        svg.appendChild(a);
      });
    };

    const pdotsSvg = document.querySelector("svg.pdots");
    if (pdotsSvg) {
      drawPeopleDots(pdotsSvg);
    }

    const handleResize = () => {
      const svg = document.querySelector("svg.pdots");
      if (svg && svg.dataset.mode !== peopleLayout(svg).mode) {
        drawPeopleDots(svg);
      }
    };
    window.addEventListener("resize", handleResize);

    // 3. Card cursor spotlights
    const handlePointerMove = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    };

    const cards = document.querySelectorAll(".card");
    cards.forEach((el) => el.addEventListener("pointermove", handlePointerMove));

    return () => {
      window.removeEventListener("resize", handleResize);
      cards.forEach((el) => el.removeEventListener("pointermove", handlePointerMove));
    };
  }, []);

  // Re-observe rv elements that render after CMS data loads
  useEffect(() => {
    if (!cms) return;
    const all = [].slice.call(document.querySelectorAll('.rv'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      all.forEach(function (el, i) {
        if (!el.classList.contains('in')) { el.style.transitionDelay = ((i % 4) * 70) + 'ms'; io.observe(el); }
      });
      return () => io.disconnect();
    } else {
      all.forEach(function (el) { el.classList.add('in'); });
    }
  }, [cms]);

  return (
    <div className="container page about-wrapper w-full">
      <section className="hero" id="overview">
      <div className="hero-text">
        <h1>
          {cms?.heroHeadline || "Building a deeper understanding of India’s path to"}{" "}
          <span className="teal">{cms?.heroHeadlineAccent || "net\u00A0zero."}</span>
        </h1>
        <hr className="rule" />
        <p className="lead">{cms?.heroParagraph1 || "The Net Zero India Initiative is a research initiative led by the School of Public Policy, IIT Delhi, aimed at building rigorous, spatially detailed, and accessible evidence that can inform policy and enable more inclusive conversations about India’s\u00A0transition."}</p>
        <p className="lead">{cms?.heroParagraph2 || "Started in 2024, the NZII comprises a diverse team of more than 30 researchers across 4\u00A0institutions."}</p>
      </div>
      {/*  Hero dots (2 Nov, Aswini): one dot per person listed in "The people behind the NZII" (past researchers left out),
           in their team colour; hover shows the name, a click jumps to the person  */}
      <div className="pdots-wrap"><svg className="dots pdots" viewBox="0 0 400 220" data-people role="group" aria-label="The NZII team, one dot per person"></svg><div className="pdot-tip" hidden></div></div>
    </section>

    <section className="section" id="principles">
      <h2>{cms?.principlesTitle || "Our principles"}</h2>
      <ul className="p2">
        {cms?.principles && cms.principles.length > 0 ? (
          cms.principles.map((pr, idx) => (
            <li key={idx} style={{ "--c": `var(--${pr.color || "teal"})` }}>
              <b>{pr.title}</b>
              <span>{pr.description}</span>
            </li>
          ))
        ) : (
          <>
            <li style={{ "--c": "var(--teal)" }}><b>Rigorous</b><span>Research designed to withstand&nbsp;scrutiny.</span></li>
            <li style={{ "--c": "var(--lime)" }}><b>Independent</b><span>NZII does not advocate for a predetermined&nbsp;pathway.</span></li>
            <li style={{ "--c": "var(--coral)" }}><b>Collaborative</b><span>We work across institutions, disciplines and stakeholder&nbsp;groups.</span></li>
            <li style={{ "--c": "var(--pink)" }}><b>Open</b><span>We aim to make research, methods, models and data increasingly&nbsp;accessible.</span></li>
          </>
        )}
      </ul>
    </section>

    <section className="section" id="partners">
      <h2>{cms?.partnersTitle || "Built through partnership"}</h2>
      <div className="partners">
        <div className="partner card"><span className="lg"><img src="assets/logos/spp-iit-delhi.png" alt="School of Public Policy, IIT Delhi" /></span><span className="eyebrow">Lead Institution</span><b>School of Public Policy, IIT&nbsp;Delhi</b><span className="muted">Leading the initiative and bringing together its research, policy and interdisciplinary&nbsp;dimensions.</span></div>
        <div className="partner card"><span className="lg"><img src="assets/logos/prayas-energy-group.png" alt="Prayas (Energy Group)" /></span><span className="eyebrow">Core Partner</span><b>Prayas (Energy Group)</b><span className="muted">Energy-related analysis, including energy-demand&nbsp;modelling.</span></div>
        <div className="partner card"><span className="lg"><img src="assets/logos/princeton-university.png" alt="Princeton University" /></span><span className="eyebrow">Core Partner</span><b>Princeton University / Andlinger Center for Energy and the Environment</b><span className="muted">Energy-system and supply-side modelling and related&nbsp;research.</span></div>
      </div>
      <div className="supported">
        <span className="eyebrow">Supported by</span>
        <ul className="sup-tiles">
          <li><span className="sup-logo"><img src="assets/logos/schmidt-sciences.svg" alt="" /></span><span className="sup-name">Schmidt Sciences / AX programme</span></li>
          <li><span className="sup-logo"><img src="assets/logos/giving-green.webp" alt="" /></span><span className="sup-name">Giving Green</span></li>
          <li><span className="sup-logo"><img src="assets/logos/princeton-university.png" alt="" /></span><span className="sup-name">Princeton University</span></li>
        </ul>
      </div>
    </section>

    <section className="section" id="people">
      <h2>{cms?.peopleTitle || "The people behind the Net Zero India\u00A0Initiative"}</h2>
      <p className="muted">{cms?.peopleSubtitle || "A multidisciplinary team for a multidimensional\u00A0challenge."}</p>
      <span className="eyebrow pi-label"><span>{cms?.piSectionTitle || "Meet the PIs"}</span></span>
      <ul className="pis big compact">
        {cms?.pis && cms.pis.length > 0 ? (
          cms.pis.map((pi, idx) => (
            <li key={idx} className="card">
              {pi.photo ? <img className="photo" src={pi.photo} alt={pi.name || ""} loading="lazy" /> : <img className="photo" src={`assets/people/pi-${(pi.name||'').toLowerCase().replace(/\s+/g,'-')}.jpg`} alt="" loading="lazy" onError={(e)=>{e.target.style.display='none'}} />}
              <span className="pi-txt">
                <b>{pi.name}</b>
                <span className="label">{pi.role || "Principal Investigator"}</span>
                <span className="muted">{pi.institution || "IIT Delhi"}</span>
                <span className="plinks">
                  {pi.scholar && (
                    <a className="plk" href={pi.scholar} target="_blank" rel="noopener" aria-label={`${pi.name} on Google Scholar`} title="Google Scholar">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg>
                    </a>
                  )}
                  {pi.linkedin && (
                    <a className="plk" href={pi.linkedin} target="_blank" rel="noopener" aria-label={`${pi.name} on LinkedIn`} title="LinkedIn">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg>
                    </a>
                  )}
                </span>
              </span>
            </li>
          ))
        ) : (
          <>
            <li className="card"><img className="photo" src="assets/people/pi-kaveri-iychettira.jpg" alt="" loading="lazy" /><span className="pi-txt"><b>Kaveri Iychettira</b><span className="label">Principal Investigator</span><span className="muted">IIT&nbsp;Delhi</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=0yQF0u8AAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Kaveri Iychettira on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a><a className="plk" href="https://www.linkedin.com/in/kiychettira/" target="_blank" rel="noopener" aria-label="Kaveri Iychettira on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></span></li>
            <li className="card"><img className="photo" src="assets/people/pi-ambuj-sagar.jpg" alt="" loading="lazy" /><span className="pi-txt"><b>Ambuj Sagar</b><span className="label">Principal Investigator</span><span className="muted">IIT&nbsp;Delhi</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=k8Lrh_4AAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Ambuj Sagar on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a><a className="plk" href="https://www.linkedin.com/in/ambuj-sagar-1983379/" target="_blank" rel="noopener" aria-label="Ambuj Sagar on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></span></li>
            <li className="card"><img className="photo" src="assets/people/pi-rajarshi-dasgupta.jpg" alt="" loading="lazy" /><span className="pi-txt"><b>Rajarshi Dasgupta</b><span className="label">Principal Investigator</span><span className="muted">IIT&nbsp;Delhi</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=KfcluxcAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Rajarshi Dasgupta on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a><a className="plk" href="https://www.linkedin.com/in/drrajarshidasgupta/" target="_blank" rel="noopener" aria-label="Rajarshi Dasgupta on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></span></li>
          </>
        )}
      </ul>
      <div className="team" id="iitd-team">
        <span className="eyebrow"><span>IIT&nbsp;Delhi</span></span>
        <div className="team-cols">
          <div className="team-col research">
            <h3>Researchers</h3>
            <ul className="team-list cols-3">
            <li className="is-lead"><span className="av" aria-hidden="true">TK</span><b>Tarun Khanna</b><span className="role">Lead</span></li>
            <li><span className="av" aria-hidden="true">SG</span><b>Srishti Gwal</b><span className="role">Postdoctoral Fellow</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=uodwEL4AAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Srishti Gwal on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">AS</span><b>Aditya Sharma</b><span className="role">Postdoctoral Fellow</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=I8oSB0AAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Aditya Sharma on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">SB</span><b>Subhadip Bhattacharya</b><span className="role">Postdoctoral Fellow</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=jvTl6zIAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Subhadip Bhattacharya on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a><a className="plk" href="https://www.linkedin.com/in/subhadip-bhattacharya-2b98281b" target="_blank" rel="noopener" aria-label="Subhadip Bhattacharya on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">SP</span><b>Shashank Prabhakar</b><span className="role">Postdoctoral Fellow</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=mX0zyNMAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Shashank Prabhakar on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">SB</span><b>Senjuty Bhowmik</b><span className="role">Postdoctoral Fellow</span></li>
            <li><span className="av" aria-hidden="true">SS</span><b>Somya Srivastava</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">AA</span><b>Anshul Angira</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">SP</span><b>Satyam Prakash</b><span className="role">Research Associate</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/satyam-prakash04/" target="_blank" rel="noopener" aria-label="Satyam Prakash on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">MB</span><b>Mallika Bhuyan</b><span className="role">Research Associate</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=5CkvpKkAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Mallika Bhuyan on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">AR</span><b>AN Rohith</b><span className="role">Researcher</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=qKYOv2oAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="AN Rohith on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            </ul>
          </div>
          <div className="team-col admin">
            <h3>Admin and Communications team</h3>
            <ul className="team-list cols-1">
            <li><span className="av" aria-hidden="true">AM</span><b>Ashwini Mudgal</b><span className="role">Project Manager</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/ashwini-mudgal-9443774/" target="_blank" rel="noopener" aria-label="Ashwini Mudgal on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">EB</span><b>Ekta Baranwal</b><span className="role">Postdoctoral Fellow &amp; Coordinator</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/dr-ekta-baranwal-10963732/" target="_blank" rel="noopener" aria-label="Ekta Baranwal on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">VS</span><b>Varsha Seharawat</b><span className="role">Senior Project Assistant</span></li>
            <li><span className="av" aria-hidden="true">MD</span><b>Manash Pratim Deka</b><span className="role">Project Assistant</span></li>
            <li><span className="av" aria-hidden="true">MN</span><b>Manoj Singh Negi</b><span className="role">Communications Expert</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/negimanoj/" target="_blank" rel="noopener" aria-label="Manoj Singh Negi on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg></a></span></li>
            </ul>
          </div>
        </div>
        <details className="past">
          <summary>Past researchers</summary>
          <ul className="team-list cols-4">
            <li><span className="av" aria-hidden="true">AC</span><b>Akhil Chauhan</b><span className="role">Research Associate</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=MF0VIhEAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Akhil Chauhan on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li><span className="av" aria-hidden="true">AG</span><b>Anuj Gurjar</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">DM</span><b>Divyangi Mishra</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">AB</span><b>Aishwarya Bhave</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">MS</span><b>Manpreet Singh</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">SD</span><b>Susan Das</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">YV</span><b>Yeshu Vashishtha</b><span className="role">Research Associate</span></li>
            <li><span className="av" aria-hidden="true">NS</span><b>Niranjan S</b><span className="role">Intern</span></li>
          </ul>
        </details>
      </div>
      <div className="team" id="partner-teams">
        <span className="eyebrow"><span>Core Partners</span></span>
        <div className="team-cols orgs">
          <div className="team-col org prayas">
            <h3>Prayas (Energy Group)</h3>
            <ul className="team-list cols-2">
            <li className="is-lead"><span className="av" aria-hidden="true">AS</span><b>Ashok Sreenivas</b><span className="role">Lead</span></li>
            <li className="is-lead"><span className="av" aria-hidden="true">SD</span><b>Srihari Dukkipati</b><span className="role">Lead</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=MCoCRpkAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Srihari Dukkipati on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">NP</span><b>Narendra Pai</b></li>
            <li className="no-role"><span className="av" aria-hidden="true">AK</span><b>Aniruddha Ketkar</b></li>
            <li className="no-role"><span className="av" aria-hidden="true">VN</span><b>Varun Nair</b></li>
            </ul>
          </div>
          <div className="team-col org princeton">
            <h3>Princeton University</h3>
            <ul className="team-list cols-2">
            <li className="is-lead"><span className="av" aria-hidden="true">CG</span><b>Chris Greig</b><span className="role">Lead</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=AxDVkNMAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Chris Greig on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">AP</span><b>Andrew Pascale</b><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=LfEPhqYAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Andrew Pascale on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">GH</span><b>Ganesh Hegde</b><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=tg57FhcAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Ganesh Hegde on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">MN</span><b>Malini Nambiar</b><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=cbwiuSAAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Malini Nambiar on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">LB</span><b>Luca Bonaldo</b><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=-mUhRVkAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Luca Bonaldo on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            <li className="no-role"><span className="av" aria-hidden="true">JJ</span><b>Jesse Jenkins</b><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=iCJvalsAAAAJ&amp;hl=en" target="_blank" rel="noopener" aria-label="Jesse Jenkins on Google Scholar (opens in a new tab)" title="Google Scholar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg></a></span></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="more">Read more about the Net Zero India Initiative team on our <a href="/consortium">Explore Our Collaborations</a>&nbsp;page.</p>
    </section>

    <section className="g1" id="involved">
      <h2>Get involved</h2>
      <div className="rule" aria-hidden="true"></div>
      <div className="btns">
        <a className="btn" href="/consortium">Explore Our Collaborations <span className="ar" aria-hidden="true">→</span></a>
      </div>
    </section>
    </div>
  );
};
