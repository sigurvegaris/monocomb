"use client";

import { useEffect, useRef } from "react";

const SEG = 48;

// Things clients tell us about their current site. They line up as the visitor combs.
const WORDS = [
  "need a website??",
  "logo maybe",
  "booking thing",
  "link my insta",
  "it loads slow",
  "nephew built it",
  "show the products",
  "mobile is broken",
];

type Strand = { y: number; waves: { f: number; p: number; a: number }[]; kink: number; pts: { t: number }[] };
type Word = { el: HTMLSpanElement; i: number; t: number; rx: number; ry: number; rot: number; cx: number; cy: number };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const autoRef = useRef<() => void>(() => {});

  useEffect(() => {
    const hero = heroRef.current!;
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let strands: Strand[] = [];
    const words: Word[] = wordRefs.current.map((el, i) => ({
      el,
      i,
      t: 1,
      rx: rnd(0.42, 0.8),
      ry: rnd(0.08, 0.36),
      rot: rnd(-28, 28),
      cx: 0,
      cy: 0,
    }));

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = hero.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(H / 9);
      const old = strands;
      strands = [];
      for (let i = 0; i < n; i++) {
        const prev = old[i];
        const waves = [0, 1, 2].map(() => ({ f: rnd(1, 5), p: rnd(0, 6.28), a: rnd(20, 70) }));
        const pts = [];
        for (let j = 0; j <= SEG; j++) pts.push({ t: prev?.pts[j] ? prev.pts[j].t : 1 });
        strands.push({ y: (i + 0.5) * (H / n), waves, kink: rnd(-1, 1), pts });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const col = getComputedStyle(document.documentElement).getPropertyValue("--strand").trim();
      let sum = 0;
      let cnt = 0;
      for (const s of strands) {
        let st = 0;
        ctx.beginPath();
        for (let j = 0; j <= SEG; j++) {
          const u = j / SEG;
          const p = s.pts[j];
          let dy = 0;
          let dx = 0;
          for (const w of s.waves) {
            dy += Math.sin(u * w.f * 6.28 + w.p) * w.a;
            dx += Math.cos(u * w.f * 4 + w.p) * w.a * 0.35;
          }
          dy += Math.sin(u * 30 + s.kink * 9) * 8 * s.kink;
          const x = u * W + dx * p.t;
          const y = s.y + dy * p.t;
          if (j) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          st += p.t;
          sum += p.t;
          cnt++;
        }
        const tidy = 1 - st / (SEG + 1);
        ctx.strokeStyle = `rgba(${col},${0.16 + tidy * 0.5})`;
        ctx.lineWidth = 0.8 + tidy * 0.4;
        ctx.stroke();
      }
      const done = cnt ? 1 - sum / cnt : 0;
      const pct = Math.round(done * 100);
      pctRef.current!.textContent = `Combed ${pct}%`;
      barRef.current!.style.width = `${pct}%`;
      headlineRef.current!.style.filter = `blur(${1 - Math.min(1, done * 1.25)}px)`;
    }

    function placeWords() {
      const narrow = W < 640;
      for (const w of words) {
        const fx = narrow ? 16 : W - 210;
        const fy = (narrow ? 50 : 60) + w.i * 28;
        const sx = Math.max(8, Math.min(w.rx * W, W - w.el.offsetWidth - 12));
        const sy = w.ry * H;
        const x = fx + (sx - fx) * w.t;
        const y = fy + (sy - fy) * w.t;
        w.el.style.transform = `translate(${x}px,${y}px) rotate(${w.rot * w.t}deg)`;
        w.el.classList.toggle("done", w.t < 0.08);
        w.el.style.display = narrow && w.t < 0.08 && w.i > 4 ? "none" : "";
        w.cx = x + 60;
        w.cy = y + 10;
      }
    }

    function combAt(x: number, y: number, strength: number) {
      const R = Math.max(60, H * 0.14);
      for (const s of strands) {
        if (Math.abs(s.y - y) > R * 1.6) continue;
        for (let j = 0; j <= SEG; j++) {
          const d = Math.hypot((j / SEG) * W - x, (s.y - y) * 0.8);
          if (d < R) s.pts[j].t *= 1 - strength * (1 - d / R);
        }
      }
    }

    function combWords(x: number, y: number) {
      for (const w of words) if (Math.hypot(w.cx - x, w.cy - y) < 110) w.t *= 0.8;
    }

    function finish() {
      strands.forEach((s) => s.pts.forEach((p) => (p.t = 0)));
      words.forEach((w) => (w.t = 0));
      frame();
    }

    let raf = 0;
    function frame() {
      raf = 0;
      draw();
      placeWords();
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    let last: { x: number; y: number } | null = null;
    function move(e: PointerEvent) {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (last) {
        const steps = Math.max(1, Math.ceil(Math.hypot(x - last.x, y - last.y) / 14));
        for (let k = 1; k <= steps; k++) {
          const ix = last.x + ((x - last.x) * k) / steps;
          const iy = last.y + ((y - last.y) * k) / steps;
          combAt(ix, iy, 0.22);
          combWords(ix, iy);
        }
        queue();
      }
      last = { x, y };
    }
    const leave = () => (last = null);
    const down = (e: PointerEvent) => {
      last = null;
      move(e);
    };

    const timers: number[] = [];
    autoRef.current = () => {
      if (reduce) return finish();
      const rows = 6;
      let sweep = 0;
      const step = () => {
        const y = ((sweep + 0.5) / rows) * H;
        for (let x = -40; x < W + 40; x += 22) {
          combAt(x, y + Math.sin(x / 80) * 20, 0.5);
          combWords(x, y);
        }
        frame();
        sweep++;
        if (sweep < rows) timers.push(window.setTimeout(step, 120));
        else timers.push(window.setTimeout(finish, 160));
      };
      step();
    };

    build();
    frame();

    let rt = 0;
    const resize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        build();
        frame();
      }, 120);
    };
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    hero.addEventListener("pointerdown", down);
    window.addEventListener("resize", resize);
    scheme.addEventListener("change", draw);

    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointerdown", down);
      window.removeEventListener("resize", resize);
      scheme.removeEventListener("change", draw);
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="Comb the tangle">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="wrap hint">
        <span className="mono">Drag across the tangle to comb it</span>
      </div>
      <div aria-hidden="true">
        {WORDS.map((w, i) => (
          <span
            key={w}
            className="tangle-word"
            ref={(el) => {
              if (el) wordRefs.current[i] = el;
            }}
          >
            {w}
          </span>
        ))}
      </div>
      <div className="wrap hero-copy">
        <h1 ref={headlineRef}>
          Bad hair day for your <em>website?</em>
        </h1>
        <div className="hero-meta">
          <div>
            <p>
              Monocomb untangles messy sites into clean ones: a solid backend, easy to use, and built around what you
              sell.
            </p>
            <div className="hero-cta">
              <a className="cta" href="#call">
                Book a 15-min call
              </a>
              <a className="cta quiet" href="#strands">
                Browse the strands
              </a>
            </div>
          </div>
          <div className="meter">
            <span className="mono" ref={pctRef}>
              Combed 0%
            </span>
            <div className="meter-bar">
              <span ref={barRef} />
            </div>
            <button className="ghost" type="button" onClick={() => autoRef.current()}>
              Comb it for me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
