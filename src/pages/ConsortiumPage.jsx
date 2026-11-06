import React, { useEffect } from "react";
import "../styles/people.css";
import { useSanity } from "../sanity/useSanity";
import { advisoryQuery, collaborationsPageQuery, collaboratorsQuery } from "../sanity/queries";

/* ====================================================================
   Collaborator pop-up data  (matches collab-data in NZII_People_Page.html)
   ==================================================================== */
const COLLAB_DATA = {
  newsBase: "https://nzi-web.vercel.app/news-events",
  people: {
    "anurag-gumber": {
      name: "Anurag Gumber", initials: "AG",
      photo: "/assets/people/collab-anurag-gumber.jpg",
      scholar: "https://scholar.google.com/citations?user=3Ys1yoAAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/anurag-gumber/",
      role: "Assistant Professor, HKUST (Guangzhou)",
      news: [{ id: "2026-01-anurag-gumber", title: "Anurag Gumber on how much capital India's net-zero transition could need", meta: "January 2026 · IIT Delhi", date: "2026-01" }]
    },
    "sarath-guttikunda": {
      name: "Sarath Guttikunda", initials: "SG",
      photo: "/assets/people/collab-sarath-guttikunda.jpg",
      scholar: "https://scholar.google.com/citations?user=XyEvdnMAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/sarath-guttikunda-3a01149/",
      role: "Founder, UrbanEmissions.info", news: []
    },
    "narasimha-rao": {
      name: "Narasimha Rao", initials: "NR",
      photo: "/assets/people/collab-narasimha-rao.jpg",
      scholar: "https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/narasimhadrao/",
      role: "Professor of Energy Systems, Yale School of the Environment", news: []
    },
    "sara-constantino": {
      name: "Sara Constantino", initials: "SC",
      photo: "/assets/people/collab-sara-constantino.jpg",
      scholar: "https://scholar.google.com/citations?user=3ShGgmcAAAAJ&hl=en",
      role: "Assistant Professor, Stanford University", news: []
    },
    "pranab-choudhury": {
      name: "Pranab Choudhury", initials: "PC",
      photo: "/assets/people/collab-pranab-choudhury.jpg",
      scholar: "https://scholar.google.com/citations?user=SPz4QrwAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/prchoudhury/",
      role: "Co-founder & CEO, Landstack", news: []
    },
    "shalini-dhyani": {
      name: "Shalini Dhyani", initials: "SD",
      photo: "/assets/people/collab-shalini-dhyani.jpg",
      scholar: "https://scholar.google.com/citations?user=alsuByQAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/shalini-d-84b81332/",
      role: "Principal Scientist, CSIR-NEERI", news: []
    },
    "ps-roy": {
      name: "PS Roy", initials: "PR",
      photo: "/assets/people/collab-ps-roy.jpg",
      scholar: "https://scholar.google.com/citations?user=DyxITKYAAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/parth-sarathi-roy-74831761/",
      role: "Former Director, NRSC Hyderabad", news: []
    }
  }
};

/* Open Calls data */
const OC_CALLS = [
  { id: "employment", no: 1, theme: "Employment", title: "Modelling employment shifts in India's energy transition", stay: "3 to 6 months" },
  { id: "biodiversity", no: 2, theme: "Biodiversity", title: "Modelling multitaxa habitat suitability and optimising spatial buffers for long-term biodiversity persistence", stay: "Up to 6 months" },
  { id: "capital", no: 3, theme: "Capital mobilisation", title: "Modelling capital mobilisation for India's energy transition", stay: "3 to 6 months" },
  { id: "agent-based", no: 4, theme: "Agent-based modelling", title: "Agent-based modelling of India's energy transition", stay: "3 to 6 months" }
];
const OC_SITE = "/collaborations";

/* ====================================================================
   SVG icons
   ==================================================================== */
const GsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/>
    <path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/>
  </svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/>
  </svg>
);

/* ====================================================================
   ConsortiumPage component
   ==================================================================== */
export const ConsortiumPage = () => {
  const { data: pageCms } = useSanity(collaborationsPageQuery);
  const { data: sanityAdvisory } = useSanity(advisoryQuery);
  const { data: sanityCollabs } = useSanity(collaboratorsQuery);

  useEffect(() => {
    // ---- Open Calls tiles + feature panel ----
    const list = document.getElementById("theme-list");
    const feat = document.getElementById("feature");
    if (list && feat) {
      const days = null; // deadline TBC
      const S = { cls: "s-open", label: "Live", open: true, days: null };
      const when = "Deadline to be confirmed";

      list.innerHTML = OC_CALLS.map(c =>
        `<li class="tile"><a href="${OC_SITE}#call-${c.id}">` +
        `<span class="tile-top"><span class="call-no">Call ${c.no} · ${c.theme}</span></span>` +
        `<b>${c.title}</b><span class="tile-meta">Stay: ${c.stay}</span>` +
        `<span class="tile-go" aria-hidden="true">↗</span></a></li>`
      ).join("");

      feat.innerHTML =
        `<div class="call-top"><span class="st ${S.cls}">${S.label}</span><b class="round">Round 2</b></div>` +
        `<dl class="facts-mini"><div><dt>Deadline</dt><dd class="tbc">To be confirmed</dd></div>` +
        `<div><dt>Honorarium</dt><dd class="tbc">To be confirmed</dd></div></dl>` +
        `<a class="btn" href="${OC_SITE}">Explore Open Calls <span class="ar" aria-hidden="true">↗</span></a>` +
        `<a class="go" href="${OC_SITE}#how-it-works">How to apply <span class="ar" aria-hidden="true">→</span></a>`;
    }

    // ---- Dot field (SVG, one dot per person) ----
    const ns = "http://www.w3.org/2000/svg";
    const root = document.documentElement;
    const drawDotsIn = (svg) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const base = getComputedStyle(root).getPropertyValue("--dot-base").trim() || "#1d3658";
      const cols = [base, "#2b9d8f", "#a7c957", "#e76f51", "#f28482"];
      let seed = 7;
      function r() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 16; x++) {
          const px = x / 15;
          if (r() > 0.25 + px * 0.7) continue;
          const c = document.createElementNS(ns, "circle");
          c.setAttribute("cx", 12 + x * 25);
          c.setAttribute("cy", 12 + y * 24.5);
          c.setAttribute("r", (2 + px * 8 * r()).toFixed(1));
          c.setAttribute("fill", px < 0.35 ? base : cols[Math.floor(r() * cols.length)]);
          svg.appendChild(c);
        }
      }
    };
    document.querySelectorAll("svg.dots:not([data-people])").forEach(drawDotsIn);

    // ---- Collaborator pop-up ----
    const P = COLLAB_DATA.people;
    const NEWS_BASE = COLLAB_DATA.newsBase;
    let cur = null, pinned = false, tOpen = 0, tClose = 0, tHide = 0;
    const mouse = matchMedia("(hover:hover) and (pointer:fine)");
    const phone = matchMedia("(max-width:640px)");

    const pop = document.createElement("div");
    pop.className = "pp";
    pop.id = "person-pop";
    pop.hidden = true;
    pop.tabIndex = -1;
    document.body.appendChild(pop);

    const esc = (v) => String(v).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

    function buildPop(b) {
      const p = P[b.dataset.person];
      if (!p) return;
      const news = (p.news || []).slice(0, 2);
      const newsHtml = news.length
        ? `<ul class="pp-news">${news.map(n =>
          `<li><a href="${esc(NEWS_BASE + "/" + n.id)}">${esc(n.title)}<span class="pp-meta">${esc(n.meta)}</span></a></li>`
        ).join("")}</ul>`
        : "";
      const links = [
        p.scholar ? `<a class="pp-lk" href="${esc(p.scholar)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} on Google Scholar" title="Google Scholar"><GsIcon/></a>` : "",
        p.linkedin ? `<a class="pp-lk" href="${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} on LinkedIn" title="LinkedIn"><LiIcon/></a>` : ""
      ].join("").replace(/<GsIcon\/>/g, '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z"/><path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z"/></svg>').replace(/<LiIcon\/>/g, '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z"/></svg>');

      pop.innerHTML =
        `<div class="pp-inner">` +
        `<div class="pp-head"><img class="pp-photo" src="${esc(p.photo)}" alt="" loading="lazy">` +
        `<div class="pp-info"><b class="pp-name">${esc(p.name)}</b><span class="pp-role muted">${esc(p.role || "")}</span>` +
        `${links ? `<span class="plinks pp-links">${links}</span>` : ""}</div></div>` +
        `${newsHtml}` +
        `</div><button type="button" class="pp-close" aria-label="Close">×</button>`;
    }

    function positionPop(b) {
      const rect = b.closest("li").getBoundingClientRect();
      const ph = phone.matches;
      pop.style.position = "fixed";
      if (ph) {
        pop.style.left = "16px";
        pop.style.right = "16px";
        pop.style.width = "auto";
        pop.style.top = Math.min(rect.bottom + 8, window.innerHeight - 320) + "px";
      } else {
        const pw = Math.min(340, window.innerWidth - 32);
        const left = Math.min(Math.max(16, rect.left + rect.width / 2 - pw / 2), window.innerWidth - pw - 16);
        pop.style.left = left + "px";
        pop.style.width = pw + "px";
        pop.style.right = "auto";
        const spaceBelow = window.innerHeight - rect.bottom - 8;
        pop.style.top = spaceBelow > 200 ? (rect.bottom + 8 + window.scrollY) + "px" : (rect.top - 8 + window.scrollY) + "px";
        pop.style.transform = spaceBelow > 200 ? "none" : "translateY(-100%)";
      }
    }

    function openPop(b, pin) {
      clearTimeout(tHide);
      buildPop(b);
      positionPop(b);
      pop.hidden = false;
      pinned = pin;
      cur = b;
      b.setAttribute("aria-expanded", "true");
      b.setAttribute("aria-controls", "person-pop");
      if (pin) { pop.focus(); }
    }

    function closePop(refocus) {
      const b = cur;
      clearTimeout(tHide);
      tHide = setTimeout(() => { pop.hidden = true; }, matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 230);
      if (b) { b.setAttribute("aria-expanded", "false"); b.removeAttribute("aria-controls"); }
      if (refocus && b) b.focus();
      cur = null;
      pinned = false;
    }

    function closeSoon() { clearTimeout(tClose); tClose = setTimeout(() => { if (!pinned) closePop(false); }, 220); }

    document.querySelectorAll(".pp-btn[data-person]").forEach(b => {
      const li = b.closest("li");
      li.addEventListener("pointerenter", e => {
        if (e.pointerType !== "mouse" || !mouse.matches || pinned) return;
        clearTimeout(tClose); clearTimeout(tOpen);
        if (cur !== b) tOpen = setTimeout(() => openPop(b, false), 140);
      });
      li.addEventListener("pointerleave", e => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(tOpen); closeSoon();
      });
    });

    pop.addEventListener("pointerenter", () => clearTimeout(tClose));
    pop.addEventListener("pointerleave", e => { if (e.pointerType === "mouse" && !pinned) closeSoon(); });
    document.addEventListener("click", e => {
      const b = e.target.closest(".pp-btn[data-person]");
      if (b) { if (cur === b && pinned) closePop(true); else openPop(b, true); return; }
      if (e.target.closest(".pp-close")) { closePop(true); return; }
      if (cur && !pop.contains(e.target)) closePop(false);
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && cur) closePop(true); });
    pop.addEventListener("focusout", e => {
      const t = e.relatedTarget;
      if (cur && pinned && t && !pop.contains(t) && t !== cur) closePop(false);
    });

    // ---- Card cursor spotlights ----
    const handlePointerMove = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    };
    const cards = document.querySelectorAll(".card");
    cards.forEach(el => el.addEventListener("pointermove", handlePointerMove));

    return () => {
      cards.forEach(el => el.removeEventListener("pointermove", handlePointerMove));
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    };
  }, []);

  // Make all rv elements visible immediately after CMS data loads
  useEffect(() => {
    if (!pageCms && !sanityAdvisory && !sanityCollabs) return;
    document.querySelectorAll('.rv').forEach(function (el) {
      el.classList.add('in');
    });
  }, [pageCms, sanityAdvisory, sanityCollabs]);

  return (
    <div className="container page people-wrapper" style={{ paddingTop: "clamp(112px,10vw,144px)" }}>

      {/* ---- Open Calls ---- */}
      <section className="oc-start" id="open-calls">
        <div className="oc-head">
          <span className="label">{pageCms?.introLabel || "Explore Our Collaborations"}</span>
          <h1>{pageCms?.introHeadline || <>IIT Delhi's Open Calls for Collaboration under&nbsp;<abbr title="Research Frontier Networks">RFNs</abbr></>}</h1>
          <hr className="rule" />
          <p className="lead">{pageCms?.introLead || "Through the open calls for collaboration, funded by Schmidt Sciences, the IIT Delhi NZII team aims to identify and address emergent capacity deficits across several thematic areas of the Net Zero India Initiative (NZII). In this round, we release four calls for collaboration along the following themes; each theme is described in detail in the corresponding links\u00A0below."}</p>
        </div>
        <aside className="home-side oc-side" aria-label="Current round">
          <div className="panel feature" id="feature"></div>
        </aside>
        <ul className="tiles" id="theme-list"></ul>
      </section>

      {/* ---- Collaborators ---- */}
      <section className="section" id="collaborators">
        <h2>{pageCms?.collaboratorsTitle || "Meet the collaborators"}</h2>
        <div className="group current">
          <ul className="pis big compact collab-cards">
            {sanityCollabs && sanityCollabs.length > 0 ? (
              sanityCollabs.map((c, i) => (
                <li key={c._id || i} className="card">
                  {c.photo ? (
                    <img className="photo" src={c.photo} alt={c.name || ""} loading="lazy" />
                  ) : (
                    <img className="photo" src={`/assets/people/collab-${(c.name||'').toLowerCase().replace(/\s+/g,'-')}.jpg`} alt="" loading="lazy" onError={(e)=>{e.target.style.display='none'}} />
                  )}
                  <span className="pi-txt">
                    <b>{c.name}</b>
                    {c.role && <span className="muted">{c.role}</span>}
                    {(c.scholar || c.linkedin) && (
                      <span className="plinks">
                        {c.scholar && (
                          <a className="plk" href={c.scholar} target="_blank" rel="noopener" aria-label={`${c.name} on Google Scholar`} title="Google Scholar"><GsIcon /></a>
                        )}
                        {c.linkedin && (
                          <a className="plk" href={c.linkedin} target="_blank" rel="noopener" aria-label={`${c.name} on LinkedIn`} title="LinkedIn"><LiIcon /></a>
                        )}
                      </span>
                    )}
                  </span>
                </li>
              ))
            ) : (
              <>
            <li className="card">
              <img className="photo" src="/assets/people/collab-anurag-gumber.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b><button type="button" className="pp-btn" data-person="anurag-gumber" aria-haspopup="dialog" aria-expanded="false">Anurag Gumber<span className="pp-ic" aria-hidden="true"></span></button></b>
                <span className="muted">Assistant Professor, HKUST (Guangzhou)</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=3Ys1yoAAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Anurag Gumber on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/anurag-gumber/" target="_blank" rel="noopener" aria-label="Anurag Gumber on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-sarath-guttikunda.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b>Sarath Guttikunda</b>
                <span className="muted">Founder, UrbanEmissions.info</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=XyEvdnMAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Sarath Guttikunda on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/sarath-guttikunda-3a01149/" target="_blank" rel="noopener" aria-label="Sarath Guttikunda on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-narasimha-rao.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b><button type="button" className="pp-btn" data-person="narasimha-rao" aria-haspopup="dialog" aria-expanded="false">Narasimha Rao<span className="pp-ic" aria-hidden="true"></span></button></b>
                <span className="muted">Professor of Energy Systems, Yale School of the Environment</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Narasimha Rao on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/narasimhadrao/" target="_blank" rel="noopener" aria-label="Narasimha Rao on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-sara-constantino.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b>Sara Constantino</b>
                <span className="muted">Assistant Professor, Stanford University</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=3ShGgmcAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Sara Constantino on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-pranab-choudhury.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b><button type="button" className="pp-btn" data-person="pranab-choudhury" aria-haspopup="dialog" aria-expanded="false">Pranab Choudhury<span className="pp-ic" aria-hidden="true"></span></button></b>
                <span className="muted">Co-founder &amp; CEO, Landstack</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=SPz4QrwAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Pranab Choudhury on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/prchoudhury/" target="_blank" rel="noopener" aria-label="Pranab Choudhury on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-shalini-dhyani.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b><button type="button" className="pp-btn" data-person="shalini-dhyani" aria-haspopup="dialog" aria-expanded="false">Shalini Dhyani<span className="pp-ic" aria-hidden="true"></span></button></b>
                <span className="muted">Principal Scientist, CSIR-NEERI</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=alsuByQAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Shalini Dhyani on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/shalini-d-84b81332/" target="_blank" rel="noopener" aria-label="Shalini Dhyani on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
            <li className="card">
              <img className="photo" src="/assets/people/collab-ps-roy.jpg" alt="" loading="lazy" />
              <span className="pi-txt">
                <b>PS Roy</b>
                <span className="muted">Former Director, NRSC Hyderabad</span>
                <span className="plinks">
                  <a className="plk" href="https://scholar.google.com/citations?user=DyxITKYAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="PS Roy on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a>
                  <a className="plk" href="https://www.linkedin.com/in/parth-sarathi-roy-74831761/" target="_blank" rel="noopener" aria-label="PS Roy on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a>
                </span>
              </span>
            </li>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* ---- Advisory Committee ---- */}
      <section className="section" id="advisory">
        <h2>{pageCms?.advisoryTitle || "Advisory Committee"}</h2>
        <ul className="team-list cols-4">
          {sanityAdvisory && sanityAdvisory.length > 0 ? (
            sanityAdvisory.map((m, idx) => (
              <li key={m._id || idx}>
                <span className="av" aria-hidden="true">{m.initials || m.name?.slice(0, 2)?.toUpperCase()}</span>
                <b>{m.name}</b>
                {m.role && <span className="role">{m.role}</span>}
                {(m.scholar || m.linkedin) && (
                  <span className="plinks">
                    {m.scholar && (
                      <a className="plk" href={m.scholar} target="_blank" rel="noopener" aria-label={`${m.name} on Google Scholar (opens in a new tab)`} title="Google Scholar">
                        <GsIcon />
                      </a>
                    )}
                    {m.linkedin && (
                      <a className="plk" href={m.linkedin} target="_blank" rel="noopener" aria-label={`${m.name} on LinkedIn (opens in a new tab)`} title="LinkedIn">
                        <LiIcon />
                      </a>
                    )}
                  </span>
                )}
              </li>
            ))
          ) : (
            <>
              <li><span className="av" aria-hidden="true">AM</span><b>Ajay Mathur</b><span className="role">SPP, IIT Delhi</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=kCsLryIAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Ajay Mathur on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/ajay-mathur-3666b3334/" target="_blank" rel="noopener" aria-label="Ajay Mathur on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">NR</span><b>NH Ravindranath</b><span className="role">Professor, Indian Institute of Science</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=INRlltAAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="NH Ravindranath on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">SB</span><b>Sutirtha Bhattacharya</b><span className="role">Former Chairman & MD, Coal India Limited</span></li>
              <li><span className="av" aria-hidden="true">JR</span><b>Joyashree Roy</b><span className="role">Asian Institute of Technology, Thailand</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=BUPe_h4AAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Joyashree Roy on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/joyashree-roy-716722182/" target="_blank" rel="noopener" aria-label="Joyashree Roy on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">ND</span><b>Navroz Dubash</b><span className="role">Professor, Princeton University</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=jfpM418AAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Navroz Dubash on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/navroz-k-dubash-bb2b58151/" target="_blank" rel="noopener" aria-label="Navroz Dubash on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">AL</span><b>Ashok Lavasa</b><span className="role">Former Finance and MoEFCC Secretary</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/ashok-lavasa-31322480/" target="_blank" rel="noopener" aria-label="Ashok Lavasa on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">BP</span><b>Balachandra Patil</b><span className="role">Professor, Indian Institute of Science</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=adNmZG4AAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Balachandra Patil on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/balachandra-patil-685b126/" target="_blank" rel="noopener" aria-label="Balachandra Patil on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">MP</span><b>Minal Pathak</b><span className="role">Ahmedabad University</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=SbnZ-BsAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Minal Pathak on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/minal-pathak-318827130/" target="_blank" rel="noopener" aria-label="Minal Pathak on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">KA</span><b>Kiran Ananth</b><span className="role">Executive Director – Energy Efficiency, Renewable Energy & Green Entrepreneurship, CII</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/kiranananth/" target="_blank" rel="noopener" aria-label="Kiran Ananth on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">SC</span><b>Shoibal Chakravarty</b><span className="role">Professor, Indian Institute of Science</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=BMNFCO8AAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Shoibal Chakravarty on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/shoibalc/" target="_blank" rel="noopener" aria-label="Shoibal Chakravarty on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">NA</span><b>Nagaraj Adve</b><span className="role">Founder member, Teachers Against the Climate Crisis (TACC)</span></li>
              <li><span className="av" aria-hidden="true">GT</span><b>Gautam Talukdar</b><span className="role">Wildlife Institute of India</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=RGeadBIAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Gautam Talukdar on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">PR</span><b>PS Roy</b><span className="role">Former Director, NRSC Hyderabad</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=DyxITKYAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="PS Roy on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/parth-sarathi-roy-74831761/" target="_blank" rel="noopener" aria-label="PS Roy on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">SS</span><b>Sushil Saigal</b><span className="role">TNC</span></li>
              <li><span className="av" aria-hidden="true">DP</span><b>Deepender Pandey</b><span className="role">Former Director, Forest Survey of India (FSI)</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/devendra-pandey-6553782b/" target="_blank" rel="noopener" aria-label="Deepender Pandey on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">NR</span><b>Narasimha Rao</b><span className="role">Professor of Energy Systems, Yale School of the Environment</span><span className="plinks"><a className="plk" href="https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en" target="_blank" rel="noopener" aria-label="Narasimha Rao on Google Scholar (opens in a new tab)" title="Google Scholar"><GsIcon /></a><a className="plk" href="https://www.linkedin.com/in/narasimhadrao/" target="_blank" rel="noopener" aria-label="Narasimha Rao on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">BJ</span><b>Bharath Jairaj</b><span className="role">Executive Director, WRI</span><span className="plinks"><a className="plk" href="https://www.linkedin.com/in/bharathjairaj/" target="_blank" rel="noopener" aria-label="Bharath Jairaj on LinkedIn (opens in a new tab)" title="LinkedIn"><LiIcon /></a></span></li>
              <li><span className="av" aria-hidden="true">AS</span><b>Ajay Shankar</b><span className="role">The Energy & Resources Institute (TERI)</span></li>
              <li><span className="av" aria-hidden="true">GS</span><b>Gauri Singh</b><span className="role">International Renewable Energy Agency (IRENA)</span></li>
              <li><span className="av" aria-hidden="true">PS</span><b>Praveer Sinha</b><span className="role">Tata Power</span></li>
            </>
          )}
        </ul>
      </section>

    </div>
  );
};
