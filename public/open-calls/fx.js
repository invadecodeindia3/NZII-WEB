/* Motion layer for the Open Calls microsite. Adds nothing to the content and changes none of the page's own
   behaviour: it marks existing elements so fx.css can bring them in as they are reached, and keeps a few
   content-linked effects in step with the scroll. If this script does not run, the page is simply still. */
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var main = document.querySelector('main');
  if (!main) return;

  // What arrives, and how. The first group an element matches wins.
  var GROUPS = [
    ['hr.rule, div.rule', 'rule'],
    ['.hero-text > *, .cover > *, .ac-head > *', 'rise'],
    ['.glance > li', 'rise'],
    ['.tline', 'mark'],
    ['.tline > li', 'rise'],
    ['.tiles > li, .cards > li, .cards > .card', 'rise'],
    ['.expect > li', 'wipe'],
    ['.apply-steps > li', 'rise'],
    ['.docs .doc', 'pop'],
    ['.offers > li, .about-card, .contacts > li, .mail-act, .round-top, .promise, .sub, .fcard, .toc', 'rise'],
    ['#feature, .facts', 'right'],
    ['#filters > *, .before li, .callopt, .mchip, .person, .refs li', 'pop'],
    ['.section > h1, .section > h2, .section > h3, .section > .label, .section > p, .section > .tbl', 'rise'],
    ['.bullets > li, .numbered > li', 'pop'],
    ['#faq-list details, .faq-group details', 'rise']
  ];

  root.classList.add('fx-on');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      io.unobserve(el);
      el.classList.add('fx-in');
      if (el.__fxCount) countUp(el);
      // once it has arrived, let go, so the element's own hover and focus transitions take over again
      setTimeout(function () {
        if (!el.classList.contains('fx-in')) return;
        el.removeAttribute('data-fx');
        el.setAttribute('data-fxd', '');
      }, 2600);
    });
  }, { rootMargin: '0px 0px -6% 0px' });

  function tag() {
    GROUPS.forEach(function (g) {
      var seen = new Map();
      main.querySelectorAll(g[0]).forEach(function (el) {
        if (el.hasAttribute('data-fx') || el.hasAttribute('data-fxd')) return;
        var n = seen.get(el.parentNode) || 0;
        seen.set(el.parentNode, n + 1);
        el.__fx = g[1];
        el.setAttribute('data-fx', g[1]);
        el.style.setProperty('--i', Math.min(n, 8));
        if (el.parentNode.classList && el.parentNode.classList.contains('glance')) el.__fxCount = true;
        io.observe(el);
      });
    });
    bloom();
    buildNetwork();
    dress();
  }

  // The figures in "the round at a glance" count up: 4 calls, up to 6 months.
  function countUp(li) {
    var b = li.querySelector('b');
    if (!b || b.classList.contains('tbc') || b.__fxDone) return;
    var m = b.textContent.match(/\d+/);
    if (!m) return;
    b.__fxDone = true;
    var full = b.textContent, to = +m[0], t0 = performance.now();
    (function step(now) {
      var k = Math.min(1, (now - t0) / 900);
      b.textContent = full.replace(/\d+/, String(Math.round(to * (1 - Math.pow(1 - k, 3)))));
      if (k < 1) requestAnimationFrame(step); else b.textContent = full;
    })(t0);
  }

  // The hero's dot field blooms from left to right; the beacons (one for each call) come last.
  function bloom() {
    main.querySelectorAll('svg.dots').forEach(function (svg) {
      if (svg.__fxN === svg.childNodes.length) return;
      svg.__fxN = svg.childNodes.length;
      var late = 0;
      [].forEach.call(svg.children, function (c) {
        if (c.tagName === 'circle') c.style.setProperty('--fx-d', Math.round(+c.getAttribute('cx') * 1.9) + 'ms');
        else c.style.setProperty('--fx-d', 900 + late++ * 140 + 'ms');
      });
    });
  }

  var ICONS = {
    employment: '<g class="a-p1"><circle cx="9" cy="8" r="3.2"/><path d="M2.8 20c.4-3.6 2.9-5.6 6.2-5.6s5.8 2 6.2 5.6"/></g><g class="a-p2"><circle cx="17.2" cy="9.2" r="2.4"/><path d="M17.4 14.2c2.2.3 3.6 1.9 3.9 4.3"/></g>',
    biodiversity: '<g class="a-leaf"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14z"/><path class="a-vein" pathLength="1" d="M5 19c3-4.5 6-7.5 10-10"/></g>',
    capital: '<path d="M3 20h18"/><path class="a-bar" d="M6 20v-5"/><path class="a-bar b2" d="M11 20v-9"/><path class="a-bar b3" d="M16 20v-6"/><path class="a-line" pathLength="1" d="M5 9l5-4 4 3 6-5"/><path class="a-tip" d="M16.5 3H20v3.5"/>',
    'agent-based': '<g class="a-net"><path d="M12 7.3v4M10.6 14.1 6.5 16.5M13.4 14.1l4.1 2.4"/><circle class="a-n" cx="12" cy="5" r="2.3"/><circle class="a-n n2" cx="5" cy="18" r="2.3"/><circle class="a-n n3" cx="19" cy="18" r="2.3"/><circle cx="12" cy="13" r="1.7"/></g>'
  };
  var TINTS = ['#e76f51', '#a7c957', '#2b9d8f', '#f28482'];
  // The hero graphic says what the headline says. Two rings, IIT Delhi and Schmidt Sciences, come together;
  // where they overlap are the open calls of this round, one dot each, opening that call. Beneath them a
  // line falls from today to net zero in 2070, the transition the collaboration is for.
  function buildNetwork() {
    var art = main.querySelector('#open-calls .hero-art');
    var tiles = main.querySelectorAll('#theme-list a');
    if (!art || !tiles.length || art.querySelector('.fx-net')) return;
    var n = tiles.length, dots = '';
    [].forEach.call(tiles, function (a, i) {
      var id = (a.getAttribute('href').split('#call-')[1] || '').trim(), no = (a.querySelector('.call-no') || a).textContent.trim();
      var cols = n > 2 ? 2 : 1, x = 280 + (cols === 2 ? (i % 2 ? 19 : -19) : 0), y = 216 + (Math.floor(i / cols) - (Math.ceil(n / cols) - 1) / 2) * 38;
      dots += '<a class="cd" href="#call-' + esc(id) + '" style="--c:' + TINTS[i % 4] + ';--i:' + i + '" aria-label="' + esc(no) + '"><title>' + esc(no) + '</title>' +
        '<circle class="hit" cx="' + x + '" cy="' + y + '" r="19"/><circle class="thr" cx="' + x + '" cy="' + y + '" r="12"/><circle class="dot" cx="' + x + '" cy="' + y + '" r="12"/></a>';
    });
    var fall = 'M66 420 C 210 420, 330 462, 474 462';
    art.insertAdjacentHTML('beforeend', '<svg class="fx-net" viewBox="0 0 560 500" role="group" aria-label="IIT Delhi and Schmidt Sciences, with the open calls of this round where they meet. Each dot opens a call.">' +
      '<defs><linearGradient id="fx-fall" gradientUnits="userSpaceOnUse" x1="66" y1="0" x2="474" y2="0"><stop offset="0" stop-color="#e76f51"/><stop offset=".55" stop-color="#a7c957"/><stop offset="1" stop-color="#2b9d8f"/></linearGradient></defs>' +
      '<g class="pair"><g class="side l"><g class="spin"><circle class="dash" cx="200" cy="205" r="166"/><circle class="rider" cx="200" cy="39" r="7"/></g><circle class="disc" cx="200" cy="205" r="150"/>' +
      '<text class="nm" x="126" y="200" text-anchor="middle">IIT</text><text class="nm" x="126" y="229" text-anchor="middle">Delhi</text></g>' +
      '<g class="side r"><g class="spin"><circle class="dash" cx="360" cy="205" r="166"/><circle class="rider" cx="360" cy="371" r="7"/></g><circle class="disc" cx="360" cy="205" r="150"/>' +
      '<text class="nm" x="436" y="200" text-anchor="middle">Schmidt</text><text class="nm" x="436" y="229" text-anchor="middle">Sciences</text></g>' +
      '<g class="meet"><path class="lens" d="M280 78.1 A150 150 0 0 1 280 331.9 A150 150 0 0 1 280 78.1Z"/><text class="oc" x="280" y="146" text-anchor="middle">Open calls</text>' + dots + '</g></g>' +
      '<g class="fall"><path class="way" d="' + fall + '" pathLength="1"/><circle class="from" cx="66" cy="420" r="8"/><text class="yr" x="66" y="398" text-anchor="middle">2026</text>' +
      '<circle class="thr" cx="474" cy="462" r="13"/><circle class="zero" cx="474" cy="462" r="13"/><text class="yr b" x="498" y="459">2070</text><text class="yr s" x="498" y="475">Net zero</text>' +
      '<circle class="go" r="6.5" opacity="0"><animateMotion dur="5s" begin="2.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .3 1" path="' + fall + '"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur="5s" begin="2.4s" repeatCount="indefinite"/></circle></g></svg>');
    art.classList.add('has-net');
  }

  // ── A graphic for each view, drawn from that view's own content, in the brand colours ──
  var INK = 'var(--ink, #1d3658)', PAPER = 'var(--bg, #fffcf6)', NAVY = '#1d3658';
  var PARTS = ['#e76f51', '#a7c957', '#2b9d8f', '#f28482', INK];
  function inkOn(c) { return c === INK ? PAPER : NAVY; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function callIds() { return [].map.call(main.querySelectorAll('#theme-list a'), function (a) { return (a.getAttribute('href').split('#call-')[1] || '').trim(); }); }
  function tintOf(id) { var i = callIds().indexOf(id); return TINTS[(i < 0 ? 0 : i) % TINTS.length]; }
  function icon(id) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[id] || '<circle cx="12" cy="12" r="4"/>') + '</svg>'; }
  // the graphic sits in the empty space to the right of a view's heading
  function host(pageId, headSel, cls) {
    var page = document.getElementById(pageId);
    var head = page && page.querySelector(headSel);
    if (!head || page.querySelector(':scope > .fx-art')) return null;
    var d = document.createElement('div');
    d.className = 'fx-art ' + cls;
    d.__head = head;
    page.classList.add('fx-has-art');
    page.appendChild(d);
    return d;
  }

  // All calls: one disc for each call of the round, in its colour with its icon, joined in a chain.
  // A disc opens its call; a disc and its card light each other up.
  function buildCalls() {
    var tiles = main.querySelectorAll('#theme-list a');
    if (!tiles.length) return;
    var d = host('all-calls', '.ac-head', 'fx-calls');
    if (!d) return;
    var n = tiles.length, SPOTS = [[92, 150, 60], [212, 96, 48], [326, 162, 66], [428, 86, 42]];
    var orbs = '', chain = '';
    [].forEach.call(tiles, function (a, i) {
      var id = (a.getAttribute('href').split('#call-')[1] || '').trim();
      var no = (a.querySelector('.call-no') || a).textContent.split('·');
      var sp = n === 4 ? SPOTS[i] : [60 + (380 / Math.max(1, n - 1)) * i, i % 2 ? 150 : 100, 40];
      var x = sp[0], y = sp[1], r = sp[2], s = r / 21, up = i % 2 === 1, tint = TINTS[i % 4], last = i === n - 1 && n > 1;
      chain += (i ? ' L' : 'M') + x + ' ' + y;
      orbs += '<a class="orb" href="#call-' + esc(id) + '" data-call="' + esc(id) + '" style="--i:' + i + ';--c:' + tint + ';--k:' + (-0.05 - i * 0.04).toFixed(2) + '" aria-label="' + esc(no.join(':')) + '">' +
        '<g class="orb-p"><g class="orb-b"><g class="orb-s"><circle class="thr" cx="' + x + '" cy="' + y + '" r="' + r + '"/><circle class="ring" cx="' + x + '" cy="' + y + '" r="' + (r + 9) + '"/><circle class="disc" cx="' + x + '" cy="' + y + '" r="' + r + '"/>' +
        '<g class="ic" transform="translate(' + (x - 12 * s).toFixed(1) + ' ' + (y - 12 * s).toFixed(1) + ') scale(' + s.toFixed(2) + ')">' + (ICONS[id] || '') + '</g></g>' +
        '<circle class="sat" style="fill:' + TINTS[(i + 2) % 4] + '" cx="' + (x + r + 9) + '" cy="' + y + '" r="5.5"><animateTransform attributeName="transform" type="rotate" from="' + (i * 90) + ' ' + x + ' ' + y + '" to="' + (i * 90 + (i % 2 ? -360 : 360)) + ' ' + x + ' ' + y + '" dur="' + (9 + i * 2.5) + 's" repeatCount="indefinite"/></circle></g></g>' +
        '<text class="t1" x="' + (last ? x + r : x) + '" y="' + (up ? y - r - 36 : y + r + 32) + '" text-anchor="' + (last ? 'end' : 'middle') + '">' + esc((no[0] || '').trim()) + '</text>' +
        '<text class="t2" x="' + (last ? x + r : x) + '" y="' + (up ? y - r - 20 : y + r + 48) + '" text-anchor="' + (last ? 'end' : 'middle') + '">' + esc((no[1] || '').trim()) + '</text></a>';
    });
    d.innerHTML = '<svg viewBox="0 0 480 280" role="group" aria-label="The calls of this round. Each one links to its page.">' +
      '<path class="chain" d="' + chain + '" pathLength="1"/><circle class="run" r="4.5" opacity="0"><animateMotion dur="7s" begin="1.6s" repeatCount="indefinite" path="' + chain + '"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.92;1" dur="7s" begin="1.6s" repeatCount="indefinite"/></circle>' + orbs + '</svg>';
    var list = document.getElementById('call-list');
    function pair(e, on) {
      var li = e.target.closest && e.target.closest('li.card'), a = li && li.querySelector('h3 a');
      var id = a && a.getAttribute('href').split('#call-')[1];
      d.querySelectorAll('.orb').forEach(function (o) { o.classList.toggle('on', on && o.getAttribute('data-call') === id); });
    }
    if (list) { list.addEventListener('mouseover', function (e) { pair(e, true); }); list.addEventListener('mouseleave', function (e) { pair(e, false); }); }
    d.addEventListener('mouseover', function (e) {
      var o = e.target.closest && e.target.closest('.orb'), id = o && o.getAttribute('data-call');
      main.querySelectorAll('#call-list li.card').forEach(function (li) { var a = li.querySelector('h3 a'); li.classList.toggle('fx-hot', !!id && !!a && a.getAttribute('href').split('#call-')[1] === id); });
    });
    d.addEventListener('mouseleave', function () { main.querySelectorAll('#call-list li.fx-hot').forEach(function (li) { li.classList.remove('fx-hot'); }); });
  }

  // Call cards carry their call's colour and icon.
  function dressCards() {
    main.querySelectorAll('.cards > li.card').forEach(function (li) {
      var a = li.querySelector('h3 a'), top = li.querySelector('.call-top');
      if (!a || !top || top.querySelector('.fx-ic')) return;
      var id = (a.getAttribute('href').split('#call-')[1] || '').trim();
      li.style.setProperty('--tc', tintOf(id));
      li.classList.add('fx-card');
      top.insertAdjacentHTML('afterbegin', '<span class="fx-ic" aria-hidden="true">' + icon(id) + '</span>');
    });
  }

  // A call's own page takes that call's colour: its icon, its rules, its numbered sections.
  function dressCall() {
    var p = document.getElementById('call'), top = p && p.querySelector('.cover .call-top');
    if (!top || top.querySelector('.fx-ic')) return;
    var id = (location.hash.match(/^#call-(.+)$/) || [])[1] || '';
    p.style.setProperty('--tc', tintOf(id));
    p.classList.add('fx-callpage');
    top.insertAdjacentHTML('afterbegin', '<span class="fx-ic big" aria-hidden="true">' + icon(id) + '</span>');
  }

  // FAQs: the questions themselves, asked one after another as a conversation. The question is typed out in
  // its group's colour, an answer is on its way, and choosing the bubble opens that question in the list.
  // The questions shown come from the group being read; the group list below follows the scroll.
  function buildFaq() {
    var groups = main.querySelectorAll('#faq-list .faq-group');
    if (!groups.length) return;
    var d = host('faqs', '.cover', 'fx-faq');
    if (!d) return;
    var nav = '';
    [].forEach.call(groups, function (g, i) {
      var c = PARTS[[2, 0, 1, 3, 4][i % 5]], h = g.querySelector('h2');
      g.style.setProperty('--gc', c); g.style.setProperty('--gt', inkOn(c)); g.classList.add('fx-fg');
      nav += '<li style="--gc:' + c + ';--gt:' + inkOn(c) + ';--i:' + i + '"><button type="button" data-g="' + i + '"><span class="n">' + g.querySelectorAll('details').length + '</span><span class="t">' + esc(h ? h.textContent.trim() : '') + '</span></button></li>';
    });
    d.innerHTML = '<div class="fx-stick"><div class="fx-chat"><button type="button" class="q"><span class="who"></span><span class="txt"></span></button>' +
      '<div class="a" aria-hidden="true"><i></i><i></i><i></i></div></div><ol class="fx-qnav" aria-label="Question groups">' + nav + '</ol></div>';
    var chat = d.querySelector('.fx-chat'), q = chat.querySelector('.q'), who = q.querySelector('.who'), txt = q.querySelector('.txt');
    var k = -1, grp = -1, cur = null, typing = 0, faq = document.getElementById('faqs');
    function ask() {
      if (faq.hidden || chat.matches(':hover') || q === document.activeElement) return;
      var g = groups[d.__grp || 0], list = g.querySelectorAll('details');
      if (!list.length) return;
      if (grp !== (d.__grp || 0)) { grp = d.__grp || 0; k = -1; }
      k = (k + 1) % list.length;
      cur = list[k];
      var full = cur.querySelector('summary').textContent.trim(), n = 0;
      chat.style.setProperty('--gc', g.style.getPropertyValue('--gc')); chat.style.setProperty('--gt', g.style.getPropertyValue('--gt'));
      who.textContent = (g.querySelector('h2') || g).textContent.trim();
      q.setAttribute('aria-label', full);
      chat.classList.remove('go'); void chat.offsetWidth; chat.classList.add('go');
      clearInterval(typing); txt.textContent = '';
      typing = setInterval(function () { n += 2; txt.textContent = full.slice(0, n); if (n >= full.length) clearInterval(typing); }, 28);
    }
    d.__ask = function () { if (grp !== (d.__grp || 0)) { clearInterval(loop); loop = setInterval(ask, 4600); ask(); } };
    var loop = setInterval(ask, 4600);
    ask();
    q.addEventListener('click', function () {
      if (!cur) return;
      cur.open = true;
      window.scrollTo({ top: cur.getBoundingClientRect().top + window.scrollY - 160, behavior: 'smooth' });
    });
    d.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-g]');
      var g = b && groups[+b.getAttribute('data-g')];
      if (g) window.scrollTo({ top: g.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    });
  }

  // Apply: a ring in six parts round a disc, at the top of the "Applying to" panel, which stays beside the
  // form all the way down. The arcs take their colours one after another as you move through the form, the
  // arc of a completed part fills, and the disc shows the number and colour of the part you are on. The four
  // small dots on the turning ring are the four documents; each fills when its PDF is chosen.
  function buildApply() {
    var lis = main.querySelectorAll('#steps-nav > li'), panel = main.querySelector('#apply .form-side .panel');
    if (!lis.length || !panel || panel.querySelector('.fx-ring')) return;
    var d = document.createElement('div');
    d.className = 'fx-ring';
    var n = lis.length, C = 110, R = 98, segs = '', docs = '', zones = main.querySelectorAll('#fs-docs .dz');
    function pt(deg, r) { var a = (deg - 90) * Math.PI / 180; return [(C + Math.cos(a) * r).toFixed(1), (C + Math.sin(a) * r).toFixed(1)]; }
    [].forEach.call(lis, function (li, i) {
      var c = PARTS[i % 5], fs = document.getElementById(li.getAttribute('data-fs')), a0 = (360 / n) * i + 6, a1 = (360 / n) * (i + 1) - 6;
      li.style.setProperty('--pc', c); li.style.setProperty('--pt', inkOn(c));
      var card = fs && fs.closest('.fcard');
      if (card) { card.style.setProperty('--pc', c); card.style.setProperty('--pt', inkOn(c)); card.classList.add('fx-part'); card.__fxLi = li; }
      var p = 'M' + pt(a0, R).join(' ') + ' A' + R + ' ' + R + ' 0 0 1 ' + pt(a1, R).join(' ');
      segs += '<g class="stn" data-i="' + i + '" style="--pc:' + c + ';--i:' + i + '"><title>' + esc(li.textContent.trim()) + '</title><path class="hit" d="' + p + '"/><path class="trk" d="' + p + '"/><path class="seg" pathLength="1" d="' + p + '"/></g>';
    });
    [].forEach.call(zones, function (z, i) {
      var f = z.closest('.field'), l = f && f.querySelector('.flabel'), q = pt((360 / zones.length) * i + 45, 78);
      docs += '<circle class="doc" data-z="' + i + '" style="--c:' + TINTS[i % 4] + '" r="5" cx="' + q[0] + '" cy="' + q[1] + '"><title>' + esc(l ? l.textContent.trim() : '') + '</title></circle>';
    });
    d.innerHTML = '<svg viewBox="0 0 220 220" role="group" aria-label="Your application: its parts and documents">' + segs +
      '<g class="inner"><circle class="dash" cx="110" cy="110" r="78"/>' + docs + '</g>' +
      '<circle class="core" cx="110" cy="110" r="56"/><text class="c1" x="110" y="126" text-anchor="middle"></text></svg>';
    panel.insertBefore(d, panel.firstChild);
    // beside the heading: the six parts as a chain of linked rings, one application made of six parts.
    // The ring of the part you are on is filled and named; a completed part is filled and ticked.
    var ch = host('apply', '.cover', 'fx-chain'), links = '';
    if (ch) {
      [].forEach.call(lis, function (li, i) {
        var x = 52 + i * 72, c = PARTS[i % 5];
        links += '<g class="lk" data-i="' + i + '" style="--pc:' + c + ';--pt:' + inkOn(c) + ';--i:' + i + '"><title>' + esc(li.textContent.trim()) + '</title><g class="lk-b"><circle class="o" cx="' + x + '" cy="64" r="44"/>' +
          '<text class="num" x="' + x + '" y="72" text-anchor="middle">' + (i + 1) + '</text><path class="tick" d="M' + (x - 13) + ' 64 l9 9 l17 -19"/></g></g>';
      });
      ch.innerHTML = '<svg viewBox="0 0 464 166" role="group" aria-label="The parts of the application">' + links + '<text class="nm" x="52" y="146" text-anchor="middle"></text></svg>';
      ch.addEventListener('click', function (e) { var k = e.target.closest && e.target.closest('.lk'), a = k && lis[+k.getAttribute('data-i')].querySelector('a'); if (a) a.click(); });
    }
    var c1 = d.querySelector('.c1');
    d.addEventListener('click', function (e) {
      var s = e.target.closest && e.target.closest('.stn'), dc = e.target.closest && e.target.closest('.doc');
      var a = s ? lis[+s.getAttribute('data-i')].querySelector('a') : dc ? main.querySelector('#steps-nav > li[data-fs="fs-docs"] a') : null;
      if (a) a.click();
    });
    function sync() {
      var at = 0;
      [].forEach.call(lis, function (li, i) { if (li.classList.contains('cur')) at = i; });
      [].forEach.call(lis, function (li, i) {
        var st = d.querySelector('.stn[data-i="' + i + '"]');
        st.classList.toggle('done', li.classList.contains('done')); st.classList.toggle('cur', i === at); st.classList.toggle('past', i < at);
      });
      main.querySelectorAll('.fx-part').forEach(function (c) { c.classList.toggle('fx-cur', c.__fxLi.classList.contains('cur')); });
      [].forEach.call(zones, function (z, i) { d.querySelector('.doc[data-z="' + i + '"]').classList.toggle('has', z.classList.contains('has')); });
      if (ch) {
        [].forEach.call(ch.querySelectorAll('.lk'), function (k, i) { k.classList.toggle('cur', i === at); k.classList.toggle('done', lis[i].classList.contains('done')); });
        var nm = ch.querySelector('.nm'), t = lis[at].textContent.trim();
        if (nm.textContent !== t) nm.textContent = t;
        nm.style.translate = (at * 72) + 'px 0';
        nm.setAttribute('text-anchor', at === 0 ? 'start' : at === lis.length - 1 ? 'end' : 'middle');
        nm.setAttribute('x', at === 0 ? 8 : at === lis.length - 1 ? 96 : 52);
      }
      if (c1.textContent !== String(at + 1)) {
        c1.textContent = String(at + 1);
        d.style.setProperty('--pc', PARTS[at % 5]); d.style.setProperty('--pt', inkOn(PARTS[at % 5]));
        c1.classList.remove('tick'); void c1.getBoundingClientRect(); c1.classList.add('tick');
      }
    }
    new MutationObserver(sync).observe(document.getElementById('apply'), { attributes: true, attributeFilter: ['class'], subtree: true });
    sync();
  }

  // Application received: a burst of brand dots.
  function burst() {
    var p = document.getElementById('submitted');
    if (!p || p.hidden || p.__fxB) return;
    p.__fxB = 1;
    var b = document.createElement('div'), h = '';
    b.className = 'fx-burst'; b.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 44; i++) {
      var a = Math.random() * Math.PI * 2, r = 18 + Math.random() * 42;
      h += '<i style="--x:' + (Math.cos(a) * r).toFixed(1) + 'vw;--y:' + (Math.sin(a) * r * 0.6).toFixed(1) + 'vh;--c:' + ['#e76f51', '#a7c957', '#2b9d8f', '#f28482', '#1d3658'][i % 5] + ';--s:' + (8 + Math.round(Math.random() * 16)) + 'px;--d:' + Math.round(Math.random() * 350) + 'ms"></i>';
    }
    b.innerHTML = h;
    document.body.appendChild(b);
    setTimeout(function () { b.remove(); p.__fxB = 0; }, 4200);
  }

  // Home, the "Live now" tab: it takes the colour of the call it shows and turns through every live call
  // of the round. A dial carries the call's icon inside turning rings, throbs while the round is live, and
  // its inner ring runs down the time until the next call. It waits while the pointer is on it.
  function buildLive() {
    var f = document.getElementById('feature'), tiles = main.querySelectorAll('#theme-list a');
    var st = f && f.querySelector('.st'), h = f && f.querySelector('h3 a');
    if (!st || !h || !tiles.length || f.querySelector('.fx-dial') || !st.classList.contains('s-open')) return;
    var calls = [].map.call(tiles, function (a, i) {
      return { id: (a.getAttribute('href').split('#call-')[1] || '').trim(), no: (a.querySelector('.call-no') || a).textContent.trim(), title: (a.querySelector('b') || a).textContent.trim(), c: TINTS[i % 4] };
    });
    var at = Math.max(0, calls.map(function (c) { return '#call-' + c.id; }).indexOf(h.getAttribute('href')));
    f.classList.add('fx-live');
    f.insertAdjacentHTML('afterbegin', '<div class="fx-dial"><svg viewBox="0 0 140 140" aria-hidden="true">' +
      '<circle class="thr" cx="70" cy="70" r="46"/><circle class="thr b" cx="70" cy="70" r="46"/>' +
      '<circle class="arc" cx="70" cy="70" r="62"/><circle class="dotring" cx="70" cy="70" r="55"/>' +
      '<circle class="face" cx="70" cy="70" r="47"/><circle class="cd" cx="70" cy="70" r="47" pathLength="1" transform="rotate(-90 70 70)"/>' +
      '<g class="ic" transform="translate(46 46) scale(2)"></g></svg>' +
      '<div class="fx-pips" role="group" aria-label="Live calls">' + calls.map(function (c, i) { return '<button type="button" data-i="' + i + '" style="--c:' + c.c + '" aria-label="' + esc(c.no) + '"></button>'; }).join('') + '</div></div>');
    var cd = f.querySelector('.cd'), ic = f.querySelector('.fx-dial .ic'), no = f.querySelector('.call-no'), btn = f.querySelector('a.btn:not(.line)');
    function show(i) {
      at = (i + calls.length) % calls.length;
      var c = calls[at];
      f.style.setProperty('--tc', c.c);
      ic.innerHTML = ICONS[c.id] || '';
      if (no) no.textContent = c.no;
      h.textContent = c.title; h.setAttribute('href', '#call-' + c.id);
      if (btn) btn.setAttribute('href', '#call-' + c.id);
      [].forEach.call(f.querySelectorAll('.fx-pips button'), function (b, k) { b.classList.toggle('on', k === at); });
      f.classList.remove('fx-swap'); void f.offsetWidth; f.classList.add('fx-swap');
    }
    cd.addEventListener('animationend', function () { show(at + 1); });
    f.querySelector('.fx-pips').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(+b.getAttribute('data-i')); });
    show(at);
  }

  // Home tiles carry their call's colour; "Important dates" gets the round's name behind it.
  function dressHome() {
    main.querySelectorAll('#theme-list > li').forEach(function (li, i) { if (!li.style.getPropertyValue('--tc')) li.style.setProperty('--tc', TINTS[i % 4]); });
    var t = document.getElementById('hw-timeline'), r = document.querySelector('#g-status b');
    if (t && r && !t.hasAttribute('data-ghost')) t.setAttribute('data-ghost', r.textContent.trim());
  }

  function dress() { buildLive(); dressHome(); buildCalls(); dressCards(); dressCall(); buildFaq(); buildApply(); burst(); }

  // What follows the scroll inside those graphics: where they sit, how far the discs have drifted,
  // which group of questions and which section of a call is being read.
  function follow() {
    var mid = window.innerHeight * 0.42;
    main.querySelectorAll('.page:not([hidden]) > .fx-art').forEach(function (d) {
      var top = d.__head.offsetTop + 'px';
      if (d.style.top !== top) d.style.top = top;
      d.style.setProperty('--fx-y', Math.round(window.scrollY));
    });
    var tl = document.getElementById('tline');
    if (tl && tl.offsetParent) {
      var tr = tl.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.9 - tr.top) / (vh * 0.5)));
      tl.style.setProperty('--fx-t', p.toFixed(3));
      tl.parentNode.style.setProperty('--fx-t', p.toFixed(3));
      [].forEach.call(tl.children, function (li, i) { li.classList.toggle('fx-hit', p > (i + 0.35) / tl.children.length); });
    }
    var faq = document.getElementById('faqs');
    if (faq && !faq.hidden) {
      var at = 0, gs = faq.querySelectorAll('.faq-group'), art = faq.querySelector('.fx-faq');
      [].forEach.call(gs, function (g, i) { if (g.getBoundingClientRect().top < mid) at = i; });
      if (art && gs.length) {
        [].forEach.call(art.querySelectorAll('.fx-qnav li'), function (li, i) { li.classList.toggle('on', i === at); });
        art.__grp = at; if (art.__ask) art.__ask();
      }
    }
    var call = document.getElementById('call');
    if (call && !call.hidden) {
      var cur = '', toc = call.querySelectorAll('.toc a');
      call.querySelectorAll('.detail-main > .section').forEach(function (s) { if (s.getBoundingClientRect().top < mid) cur = s.id; });
      [].forEach.call(toc, function (a, i) { a.classList.toggle('fx-at', cur ? a.getAttribute('data-goto') === cur : i === 0); });
    }
  }

  // When a view is opened again from its tab, its contents arrive again.
  function replay() {
    main.querySelectorAll('.page:not([hidden]) [data-fxd], .page:not([hidden]) [data-fx].fx-in').forEach(function (el) {
      el.removeAttribute('data-fxd');
      el.classList.remove('fx-in');
      el.setAttribute('data-fx', el.__fx || 'rise');
      io.observe(el);
    });
  }

  // Scroll-linked: the reading thread, and the path through "How to apply".
  var thread = document.createElement('div');
  thread.className = 'fx-thread';
  thread.setAttribute('aria-hidden', 'true');
  thread.innerHTML = '<i></i>';
  document.body.appendChild(thread);
  var raf = 0;
  function onFrame() {
    raf = 0;
    var max = Math.max(1, root.scrollHeight - window.innerHeight);
    thread.firstChild.style.transform = 'scaleX(' + Math.min(1, Math.max(0, window.scrollY / max)) + ')';
    var steps = main.querySelector('.apply-steps');
    if (steps && steps.offsetParent) {
      var line = window.innerHeight * 0.62, r = steps.getBoundingClientRect();
      steps.style.setProperty('--fx-p', Math.min(1, Math.max(0, (line - r.top - 44) / Math.max(1, r.height - 88))).toFixed(4));
      [].forEach.call(steps.children, function (li) {
        li.classList.toggle('fx-reached', li.getBoundingClientRect().top < line - 22);
      });
    }
    follow();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(onFrame); }
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);

  // The page draws its calls, filters and call pages itself; mark whatever it adds.
  var pending = 0;
  new MutationObserver(function () {
    clearTimeout(pending);
    pending = setTimeout(function () { tag(); kick(); }, 60);
  }).observe(main, { childList: true, subtree: true });
  window.addEventListener('hashchange', function () { setTimeout(function () { replay(); tag(); kick(); }, 40); });

  tag();
  kick();
})();
