/**
 * The Earth, turned to face India, with labelled markers. It is drawn in the brand palette (navy seas, land
 * from teal through lime to cream with height) from a satellite image and an elevation map, with no borders.
 * three.js is loaded only when this component mounts. The globe eases round to India when it scrolls into
 * view, sways gently, and can be dragged. If WebGL is not available a still, drawn sphere is shown instead.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { still } from './fx-utils';
import './globe.css';

const DEG = Math.PI / 180;
const toVec = (lat, lon, r = 1) => {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return [-(Math.sin(phi) * Math.cos(theta)) * r, Math.cos(phi) * r, Math.sin(phi) * Math.sin(theta) * r];
};
// rotation that brings central India to the middle of the view
const [ix, , iz] = toVec(21, 79);
const HOME_Y = Math.atan2(-ix, iz);
const HOME_X = 0.24; // India sits a little above the middle, clear of the lower label

// Brand palette for the drawn Earth: [r, g, b]
const SEA = { light: [29, 54, 88], dark: [38, 70, 112] };
const LAND = [
  [0, [32, 125, 114]], // lowland: deep teal
  [0.12, [43, 157, 143]], // teal
  [0.45, [167, 201, 87]], // hills: lime
  [1, [255, 252, 246]], // highest ground and ice: cream
];
const landColour = (t) => {
  for (let i = 1; i < LAND.length; i++) {
    if (t <= LAND[i][0]) {
      const [t0, a] = LAND[i - 1];
      const [t1, b] = LAND[i];
      const k = (t - t0) / (t1 - t0);
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
    }
  }
  return LAND[LAND.length - 1][1];
};
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** Paint the brand-coloured map: sea where the satellite image is blue and the land is at sea level. */
const paintEarth = async (dark) => {
  const [photo, height] = await Promise.all([loadImage('/assets/globe/earth-blue-marble.jpg'), loadImage('/assets/globe/earth-topology.png')]);
  const W = 2048;
  const H = 1024;
  const read = (img) => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, W, H);
    return g.getImageData(0, 0, W, H).data;
  };
  const p = read(photo);
  const e = read(height);
  const out = document.createElement('canvas');
  out.width = W;
  out.height = H;
  const ctx = out.getContext('2d');
  const image = ctx.createImageData(W, H);
  const d = image.data;
  const sea = dark ? SEA.dark : SEA.light;
  for (let i = 0; i < d.length; i += 4) {
    const elev = e[i];
    const blue = p[i + 2] > p[i] + 10 && p[i + 2] > p[i + 1] + 4;
    const c = elev <= 2 && blue ? sea : landColour(Math.min(1, elev / 215));
    d[i] = c[0];
    d[i + 1] = c[1];
    d[i + 2] = c[2];
    d[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return out;
};

export const Globe3D = ({ cities, ariaLabel }) => {
  const host = useRef(null);
  const chips = useRef({});
  const lines = useRef({});
  const [failed, setFailed] = useState(false);
  const { displayMode } = useGame(); // the seas are repainted for dark mode
  // the scene is built once per set of places; label text can change without rebuilding it
  const placesKey = cities.map((c) => [c.id, c.lat, c.lon, c.dx, c.dy].join(':')).join('|');
  const places = useRef(cities);
  places.current = cities;

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    const calm = still();
    const dark = document.documentElement.getAttribute('data-mode') !== 'light';
    let dead = false;
    let cleanup = () => {};

    import('three')
      .then((THREE) => {
        if (dead) return;
        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          setFailed(true);
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0, 3);
        scene.add(new THREE.AmbientLight(0xffffff, 1.15));
        const sun = new THREE.DirectionalLight(0xffffff, 1.7);
        sun.position.set(-2.5, 3, 5); // from the upper left, so the subcontinent is well lit
        scene.add(sun);

        const group = new THREE.Group();
        scene.add(group);
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({ color: dark ? 0x264670 : 0x1d3658 });
        paintEarth(dark)
          .then((canvas) => {
            if (dead) return;
            const map = new THREE.CanvasTexture(canvas);
            map.colorSpace = THREE.SRGBColorSpace;
            map.anisotropy = 4;
            material.map = map;
            material.color.set(0xffffff);
            material.needsUpdate = true;
          })
          .catch(() => { /* the plain navy sphere stays */ });
        Object.assign(material, {
            bumpMap: loader.load('/assets/globe/earth-topology.png'),
            bumpScale: 0.09,
            specular: new THREE.Color(0x1c2a33),
            shininess: 9,
        });
        const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), material);
        group.add(earth);

        const pins = places.current.map((c) => {
          const pin = new THREE.Object3D();
          pin.position.set(...toVec(c.lat, c.lon, 1.01));
          earth.add(pin);
          return { ...c, pin };
        });

        let size = 0;
        const resize = () => {
          size = el.clientWidth || 400;
          renderer.setSize(size, size, false);
          renderer.domElement.style.width = renderer.domElement.style.height = '100%';
        };
        resize();
        const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
        if (ro) ro.observe(el);

        // rotation: starts turned away, eases to India once in view; dragging adds an offset that springs back
        let rotY = calm ? HOME_Y : HOME_Y - 2.4;
        let seen = calm;
        let dragX = 0;
        let dragY = 0;
        let dragging = null;
        let visible = true;
        let raf = 0;
        const v = new THREE.Vector3();
        const t0 = performance.now();
        let last = t0;

        const render = (now) => {
          raf = 0;
          const t = (now - t0) / 1000;
          // eased by elapsed time, so the turn takes the same couple of seconds on any device
          const dt = Math.min(0.1, (now - last) / 1000);
          last = now;
          if (seen) rotY += (HOME_Y - rotY) * (1 - Math.exp(-dt * 2.4));
          if (!dragging) {
            const back = Math.exp(-dt * 3.5);
            dragX *= back;
            dragY *= back;
          }
          // the globe turns on a little as the page scrolls, as if the years were passing
          const turn = calm ? 0 : Math.min(0.9, window.scrollY * 0.001);
          earth.rotation.y = rotY + dragX + turn + (calm ? 0 : Math.sin(t * 0.35) * 0.06);
          earth.rotation.x = 0;
          group.rotation.x = HOME_X + dragY + turn * 0.16 + (calm ? 0 : Math.sin(t * 0.27) * 0.03);
          renderer.render(scene, camera);

          const k = size / 620;
          pins.forEach((p) => {
            v.setFromMatrixPosition(p.pin.matrixWorld);
            const front = v.z > 0.2;
            v.project(camera);
            const x = (v.x * 0.5 + 0.5) * size;
            const y = (v.y * -0.5 + 0.5) * size;
            const chip = chips.current[p.id];
            const line = lines.current[p.id];
            const cx = x + p.dx * k;
            const cy = y + p.dy * k;
            if (chip) {
              chip.style.transform = `translate(-50%, -50%) translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
              chip.style.opacity = front ? 1 : 0;
            }
            if (line) {
              line.setAttribute('x1', x.toFixed(1));
              line.setAttribute('y1', y.toFixed(1));
              line.setAttribute('x2', cx.toFixed(1));
              line.setAttribute('y2', cy.toFixed(1));
              line.style.opacity = front ? 1 : 0;
              // the marker and its pulse sit on the place itself
              for (let dotEl = line.nextSibling; dotEl; dotEl = dotEl.nextSibling) {
                dotEl.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
                dotEl.style.opacity = front ? 1 : 0;
              }
            }
          });
          if (visible && !calm) raf = requestAnimationFrame(render);
        };
        const kick = () => {
          if (!raf) raf = requestAnimationFrame(render);
        };

        const onDown = (e) => {
          dragging = { x: e.clientX, y: e.clientY, dx: dragX, dy: dragY };
          el.setPointerCapture?.(e.pointerId);
        };
        const onMove = (e) => {
          if (!dragging) return;
          dragX = dragging.dx + (e.clientX - dragging.x) * 0.006;
          dragY = Math.max(-0.6, Math.min(0.6, dragging.dy + (e.clientY - dragging.y) * 0.004));
          if (calm) kick();
        };
        const onUp = () => {
          dragging = null;
        };
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onUp);

        let io = null;
        if ('IntersectionObserver' in window) {
          io = new IntersectionObserver((es) => {
            visible = es[0].isIntersecting;
            if (visible) {
              if (es[0].intersectionRatio > 0.3) seen = true;
              kick();
            }
          }, { threshold: [0, 0.3, 0.6] });
          io.observe(el);
        } else {
          seen = true;
        }
        // the still version draws once the picture has loaded
        const again = setInterval(() => calm && kick(), 600);
        setTimeout(() => clearInterval(again), 4000);
        kick();

        cleanup = () => {
          if (raf) cancelAnimationFrame(raf);
          clearInterval(again);
          if (ro) ro.disconnect();
          if (io) io.disconnect();
          el.removeEventListener('pointerdown', onDown);
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerup', onUp);
          el.removeEventListener('pointercancel', onUp);
          scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
              ['map', 'bumpMap'].forEach((m) => o.material[m] && o.material[m].dispose());
              o.material.dispose();
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
        if (dead) cleanup();
      })
      .catch(() => setFailed(true));

    return () => {
      dead = true;
      cleanup();
    };
  }, [placesKey, displayMode]);

  return (
    <div className={`fp-globe${failed ? ' is-still' : ''}`} role="img" aria-label={ariaLabel || 'The Earth, turned to India'}>
      <div className="fp-globe-ball" ref={host} />
      {!failed && <div className="fp-globe-shade" aria-hidden="true" />}
      {!failed && (
        <>
          <svg className="fp-globe-lines" aria-hidden="true">
            {cities.map((c) => (
              <g key={c.id} style={{ color: c.c }}>
                <line ref={(n) => { lines.current[c.id] = n; }} />
                {c.pulse && <g><circle className="pulse" r="7" /><circle className="pulse late" r="7" /></g>}
                <g><circle className="pin" r="5" /></g>
              </g>
            ))}
          </svg>
          <div className="fp-globe-chips" aria-hidden="true">
            {cities.map((c) => (
              <div key={c.id} className={`fp-chip${c.tag ? ' tag' : ''}`} style={{ '--c': c.c }} ref={(n) => { chips.current[c.id] = n; }}>
                {c.tag ? (
                  <span>{c.label}</span>
                ) : (
                  // keyed by its text, so each new fact fades in
                  <div className="fp-chip-in" key={c.label + c.metric}>
                    <span>{c.label}</span>
                    <b>{c.metric}</b>
                    {(c.lines || [c.sub]).filter(Boolean).map((t) => <small key={t}>{t}</small>)}
                  </div>
                )}
                {c.steps > 1 && <i className="fp-chip-steps">{Array.from({ length: c.steps }, (_, k) => <i key={k} className={k === c.step ? 'on' : undefined} />)}</i>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
