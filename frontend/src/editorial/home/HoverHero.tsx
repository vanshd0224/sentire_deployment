import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import { EASE_OUT_EXPO, usePrefersReducedMotion } from "../motion";
import type { PageName } from "../../types/appTypes";
import type { PerfumeFilterOptions } from "../../components/Navbar";

/**
 * The opening, shot like wildlife film: one SENTIRE bottle holding station
 * in mid-air against a drifting bokeh of its own colours, the wordmark set
 * enormous behind it, the words and two glass cards in front. Every few
 * seconds it turns to show the PC on its back; then the words clear, it
 * flies out of frame, the light changes to the next fragrance, and the
 * next bottle flies in and holds.
 *
 * The bottle is the real one in CSS 3D — photographed front and back,
 * clear glass sides, a volume of juice inside, measured off the studio
 * shots. The bokeh is a dozen soft lights on CSS keyframes, so it moves on
 * the compositor with no script. The show waits off screen, in background
 * tabs and while a bottle is being dragged; anyone who asked for less
 * motion gets the first bottle, still, with its words.
 */

/* ── the flacon, in units of --s (measured off the studio shots) ─────── */

const BODY_W = 0.36;
const BODY_H = BODY_W * 1.365;
const BODY_D = BODY_W * 0.75;
const CAP_W = 0.273;
const CAP_H = 0.271;
const BOTTLE_H = BODY_H + CAP_H - 0.012;

const HOLD_MS = 6200; // each fragrance's time holding station
const u = (k: number) => `calc(var(--s) * ${k})`;
const A = (f: string) => `/assets/unbox/${f}`;

type Scent = {
  id: string;
  liquid: string; // the juice, rich enough to read through glass
  juice: string; //  the juice as photographed
  accent: string;
  deep: string;
  tint: string;
};

const SCENTS: Scent[] = [
  { id: "purple-oud", liquid: "#b394d6", juice: "#daced9", accent: "#8a5bb0", deep: "#4f2f6e", tint: "#f1eaf6" },
  { id: "deep-crush", liquid: "#e6b86f", juice: "#f5e0c5", accent: "#b8823f", deep: "#6e4a1f", tint: "#f7efe4" },
  { id: "midnight", liquid: "#e0b1b3", juice: "#e2d5d1", accent: "#9c6b6e", deep: "#5a3c3f", tint: "#f3ecec" },
  { id: "calantha", liquid: "#efbe9f", juice: "#ecdad0", accent: "#c07a58", deep: "#6f4330", tint: "#f7eee8" },
  { id: "rich", liquid: "#dd9ea6", juice: "#e2d4d2", accent: "#b0616a", deep: "#66353a", tint: "#f6ebec" },
  { id: "personna", liquid: "#e9bea9", juice: "#e4d5ce", accent: "#b07964", deep: "#654236", tint: "#f5eeea" },
  { id: "white-oud", liquid: "#e4dfd6", juice: "#beb2b7", accent: "#8d7f88", deep: "#4e454b", tint: "#f2f0f1" },
];

const product = (id: string) => ALL_PERFUMES.find((p) => p.id === id) as PerfumeProduct | undefined;
const cheapest = (p?: PerfumeProduct) => {
  const e = Object.entries(p?.prices ?? {}).filter(([, v]) => v) as [string, number][];
  return e.length ? e.reduce((a, b) => (b[1] < a[1] ? b : a)) : undefined;
};

/** Mix two #rrggbb colours; t = 0 is a, t = 1 is b. */
function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
}

/* ── a box in CSS 3D ─────────────────────────────────────────────────── */

type Faces = Partial<Record<"front" | "back" | "left" | "right" | "top", React.CSSProperties>>;

function Cuboid({ w, h, d, faces, style }: { w: number; h: number; d: number; faces: Faces; style?: React.CSSProperties }) {
  const at = (transform: string, box: React.CSSProperties, face?: React.CSSProperties) =>
    face && <div style={{ position: "absolute", transform, ...box, ...face }} />;
  const side = { top: 0, height: u(h), width: u(d), left: `calc(50% - ${u(d / 2)})` };
  const cap = { left: 0, width: u(w), height: u(d), top: `calc(50% - ${u(d / 2)})` };
  return (
    <div style={{ position: "absolute", width: u(w), height: u(h), transformStyle: "preserve-3d", ...style }}>
      {at(`translateZ(${u(d / 2)})`, { inset: 0 }, faces.front)}
      {at(`rotateY(180deg) translateZ(${u(d / 2)})`, { inset: 0 }, faces.back)}
      {at(`rotateY(90deg) translateZ(${u(w / 2)})`, side, faces.right)}
      {at(`rotateY(-90deg) translateZ(${u(w / 2)})`, side, faces.left)}
      {at(`rotateX(90deg) translateZ(${u(h / 2)})`, cap, faces.top)}
    </div>
  );
}

/* ── the bokeh: soft lights in the fragrance's colours, each on its own path ─
 *
 * One small canvas, drawn at a quarter of the hero's size and scaled up by
 * the browser. Out-of-focus light looks the same enlarged, and one layer is
 * far cheaper to move than a dozen screen-sized ones. Changing fragrance
 * blends the colours in place rather than cross-fading two copies.
 */

type RGB = [number, number, number];
const toRgb = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const css = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

/** Three for the sky behind, five for the lights. */
function paletteOf(s: Scent): RGB[] {
  return [
    mix(s.tint, s.accent, 0.28),
    mix(s.liquid, "#ffffff", 0.35),
    mix(s.accent, "#ffffff", 0.42),
    mix(s.accent, "#ffffff", 0.35),
    mix(s.liquid, "#ffffff", 0.2),
    mix(s.accent, "#ffffff", 0.6),
    mix(s.deep, s.accent, 0.35),
    "#ffffff",
  ].map(toRgb);
}

// position and size as fractions of the frame; drift in fractions too
const LIGHTS = [
  { x: 0.08, y: 0.12, r: 0.38, c: 3, a: 0.75, dx: 0.05, dy: 0.04, ds: 0.15, t: 19 },
  { x: 0.72, y: 0.08, r: 0.44, c: 4, a: 0.8, dx: -0.06, dy: 0.05, ds: 0.1, t: 23 },
  { x: 0.88, y: 0.58, r: 0.36, c: 5, a: 0.55, dx: -0.04, dy: -0.05, ds: 0.2, t: 17 },
  { x: 0.3, y: 0.7, r: 0.42, c: 6, a: 0.55, dx: 0.06, dy: -0.03, ds: 0.08, t: 21 },
  { x: 0.52, y: 0.3, r: 0.3, c: 7, a: 0.5, dx: -0.03, dy: 0.04, ds: 0.18, t: 15 },
  { x: -0.06, y: 0.55, r: 0.34, c: 4, a: 0.55, dx: 0.04, dy: -0.04, ds: 0.12, t: 25 },
];
const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  x: ((i * 37 + 11) % 100) / 100,
  y: ((i * 53 + 7) % 92) / 100,
  r: 6 + ((i * 7) % 14), // px at full size
  dx: ((i % 5) - 2) * 0.016,
  dy: ((i % 3) - 1) * 0.03,
  t: 11 + (i % 6) * 2,
  p: i * 1.3,
}));

function BokehCanvas({
  scent,
  px,
  py,
  running,
}: {
  scent: Scent;
  px: MotionValue<number>;
  py: MotionValue<number>;
  running: boolean;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const cur = useRef<RGB[]>(paletteOf(scent));
  const from = useRef<RGB[]>(cur.current);
  const to = useRef<RGB[]>(cur.current);
  const blendStart = useRef(0);
  const draw = useRef<(now: number) => void>(() => {});

  // a new fragrance: blend from wherever the colours are now
  useEffect(() => {
    from.current = cur.current.map((c) => [...c] as RGB);
    to.current = paletteOf(scent);
    blendStart.current = performance.now();
    draw.current(performance.now());
  }, [scent]);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d", { alpha: false });
    if (!c || !ctx) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width / 4));
      c.height = Math.max(1, Math.round(r.height / 4));
      draw.current(performance.now());
    };
    draw.current = (now: number) => {
      const W = c.width;
      const H = c.height;
      const k = Math.min(1, (now - blendStart.current) / 1400);
      const e = k * k * (3 - 2 * k);
      cur.current = from.current.map((f, i) => f.map((v, j) => v + (to.current[i][j] - v) * e) as RGB);
      const P = cur.current;
      const t = now / 1000;
      const ox = -px.get() * 0.012 * W;
      const oy = -py.get() * 0.012 * H;

      const sky = ctx.createLinearGradient(0, 0, W * 0.35, H);
      sky.addColorStop(0, css(P[0]));
      sky.addColorStop(0.48, css(P[1]));
      sky.addColorStop(1, css(P[2]));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      LIGHTS.forEach((l, i) => {
        const s = Math.sin((t / l.t) * Math.PI * 2 + i);
        const cx = (l.x + l.dx * s) * W + ox;
        const cy = (l.y + l.dy * s) * H + oy;
        const R = ((l.r * W) / 2) * (1 + l.ds * (0.5 + 0.5 * s));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, css(P[l.c], l.a));
        g.addColorStop(1, css(P[l.c], 0));
        ctx.fillStyle = g;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      });

      SPARKS.forEach((p) => {
        const s = Math.sin((t / p.t) * Math.PI * 2 + p.p);
        const cx = (p.x + p.dx * s) * W + ox * 1.6;
        const cy = (p.y + p.dy * s) * H + oy * 1.6;
        const R = (p.r / 8) * (1 + 0.3 * (0.5 + 0.5 * s));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, "rgba(255,255,255,0.85)");
        g.addColorStop(0.7, "rgba(255,255,255,0.25)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, [px, py]);

  // the lights drift only while someone can see them
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      // slow light needs no more than 30 frames a second
      if (now - last > 32) {
        draw.current(now);
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 -z-10 h-full w-full" />;
}

/* ── the water: light moving through a pool, in the fragrance's colours ────
 *
 * One fragment shader, drawn at half the hero's size and scaled up by the
 * browser (water light is soft anyway). The ground is the fragrance's own
 * gradient; over it, caustics — the bright net of light a moving surface
 * throws onto what lies beneath — drift slowly across the frame, two layers
 * flowing in different directions, with faint shafts of light from above.
 * A landing bottle, or a tap, sends a ripple out through all of it.
 * Changing fragrance blends the colours in place. Where WebGL isn't there,
 * the bokeh stands in.
 */

const WATER_VS = `attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;

const WATER_FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v;
uniform float uT, uAsp;
uniform vec2 uPar;
uniform vec3 uA, uB, uC, uG1, uG2, uLit;
uniform vec4 uR[4];

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// distance to the nearest cell wall: 0 on a wall, where the light gathers
float walls(vec2 p, float t) {
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(i + g);
      o = 0.5 + 0.4 * sin(t + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  return sqrt(d2) - sqrt(d1);
}

// one sheet of caustics: the cells, bent by the surface into curves
float sheet(vec2 p, float t) {
  p += 0.45 * vec2(sin(p.y * 1.6 + t * 0.55), sin(p.x * 1.4 - t * 0.5));
  float e = walls(p, t * 0.7);
  float l = 1.0 - smoothstep(0.0, 0.3, e);
  return l * l * l;
}

void main() {
  vec2 P = vec2(v.x * uAsp, v.y);

  // ripples: rings running out from where something touched the water
  vec2 warp = vec2(0.0);
  float ring = 0.0;
  for (int k = 0; k < 4; k++) {
    vec4 r = uR[k];
    float age = uT - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 4.0) continue;
    vec2 dv = P - r.xy;
    float d = length(dv);
    // a train of rings behind the front, fading as it spreads
    float w = d - age * 0.4;
    float fade = 1.0 - age / 4.0;
    float env = exp(-w * w * 28.0) * step(w, 0.02) * fade * fade * r.w;
    float wave = sin(w * 48.0) * env;
    warp += dv / (d + 1e-3) * wave * 0.045;
    ring += wave;
  }

  // the ground: this fragrance's gradient, with two slow pools of light
  float g = clamp((1.0 - v.y) * 0.9 + v.x * 0.28, 0.0, 1.0);
  vec3 col = g < 0.48 ? mix(uA, uB, g / 0.48) : mix(uB, uC, (g - 0.48) / 0.52);
  vec2 c1 = vec2((0.1 + 0.05 * sin(uT * 0.33)) * uAsp, 0.86 + 0.04 * sin(uT * 0.27));
  vec2 c2 = vec2((0.78 - 0.06 * sin(uT * 0.26)) * uAsp, 0.9 - 0.05 * sin(uT * 0.21));
  col = mix(col, uG1, 0.7 * exp(-dot(P - c1, P - c1) * 5.0));
  col = mix(col, uG2, 0.75 * exp(-dot(P - c2, P - c2) * 4.0));

  // shafts of light from the surface, leaning with it
  float a = v.x + (1.0 - v.y) * 0.32;
  float rays = pow(0.5 + 0.5 * sin(a * 20.0 + sin(a * 8.0 - uT * 0.23) * 2.4 + uT * 0.12), 4.0);
  col += rays * smoothstep(0.15, 1.0, v.y) * 0.06;

  // the caustics: two sheets, flowing different ways; brightest where they cross
  vec2 q = P + warp + uPar;
  float s1 = sheet(q * 2.7 + vec2(uT * 0.055, -uT * 0.03), uT);
  float s2 = sheet(q * 4.6 + vec2(-uT * 0.035, uT * 0.05) + 7.3, uT * 1.2);
  float lit = s1 * 0.6 + s2 * 0.3 + s1 * s2 * 0.45;
  // the surface isn't even: brighter patches drift through, dimmer ones between
  float patch = 0.5 + 0.5 * sin(q.x * 2.1 + uT * 0.21 + sin(q.y * 1.7 - uT * 0.17) * 1.8);
  lit *= 0.35 + 0.65 * patch;
  // quieter behind the words, lower left
  lit *= 1.0 - 0.6 * smoothstep(0.55, 0.05, v.x) * smoothstep(0.62, 0.1, v.y);
  col *= 1.0 - 0.03 * (1.0 - lit);
  col = mix(col, uLit, clamp(lit * 0.26, 0.0, 1.0));

  col += (uLit - col) * clamp(ring, 0.0, 1.0) * 0.8 - col * clamp(-ring, 0.0, 1.0) * 0.1;
  gl_FragColor = vec4(col, 1.0);
}`;

type Ripple = (x: number, y: number, strength?: number) => void;

function WaterCanvas({
  scent,
  px,
  py,
  running,
  ripple,
}: {
  scent: Scent;
  px: MotionValue<number>;
  py: MotionValue<number>;
  running: boolean;
  ripple: React.MutableRefObject<Ripple | null>;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);
  const cur = useRef<RGB[]>(paletteOf(scent));
  const from = useRef<RGB[]>(cur.current);
  const to = useRef<RGB[]>(cur.current);
  const blendStart = useRef(0);
  const draw = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    from.current = cur.current.map((c) => [...c] as RGB);
    to.current = paletteOf(scent);
    blendStart.current = performance.now();
    draw.current(performance.now());
  }, [scent]);

  useEffect(() => {
    const c = ref.current;
    const gl = c?.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!c || !gl) {
      setFailed(true);
      return;
    }
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, WATER_VS);
    const fs = shader(gl.FRAGMENT_SHADER, WATER_FS);
    const prog = gl.createProgram()!;
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uT = U("uT"), uAsp = U("uAsp"), uPar = U("uPar"), uR = U("uR[0]");
    const uCols = ["uA", "uB", "uC", "uG1", "uG2", "uLit"].map(U);

    const epoch = performance.now();
    const clock = (now: number) => ((now - epoch) / 1000) % 1800;
    const rings = new Float32Array(16); // x, y, start, strength — four at a time
    let slot = 0;

    const fit = () => {
      const r = c.getBoundingClientRect();
      // half size (less on a phone): the light is soft, and it's a quarter
      // of the work or less
      const k = r.width < 768 ? 0.4 : 0.5;
      c.width = Math.max(1, Math.round(r.width * k));
      c.height = Math.max(1, Math.round(r.height * k));
      gl.viewport(0, 0, c.width, c.height);
      draw.current(performance.now());
    };
    draw.current = (now: number) => {
      if (gl.isContextLost()) return;
      const k = Math.min(1, (now - blendStart.current) / 1400);
      const e = k * k * (3 - 2 * k);
      cur.current = from.current.map((f, i) => f.map((val, j) => val + (to.current[i][j] - val) * e) as RGB);
      const P = cur.current;
      // ground, pools of light, and the colour of the light itself
      [P[0], P[1], P[2], P[3], P[4], P[7]].forEach((col, i) => {
        const lit = i === 5 ? mixRgb(P[5], col, 0.7) : col;
        gl.uniform3f(uCols[i], lit[0] / 255, lit[1] / 255, lit[2] / 255);
      });
      gl.uniform1f(uT, clock(now));
      gl.uniform1f(uAsp, c.width / c.height);
      gl.uniform2f(uPar, -px.get() * 0.004, py.get() * 0.004);
      gl.uniform4fv(uR, rings);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    ripple.current = (x, y, strength = 1) => {
      const r = c.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const o = slot++ % 4;
      rings[o * 4] = (x / r.width) * (r.width / r.height);
      rings[o * 4 + 1] = 1 - y / r.height;
      rings[o * 4 + 2] = clock(performance.now());
      rings[o * 4 + 3] = strength;
    };
    const lost = (ev: Event) => {
      ev.preventDefault();
      setFailed(true);
    };
    c.addEventListener("webglcontextlost", lost);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => {
      ro.disconnect();
      c.removeEventListener("webglcontextlost", lost);
      ripple.current = null;
      draw.current = () => {};
    };
  }, [px, py, ripple]);

  // the water moves only while someone can see it
  useEffect(() => {
    if (!running || failed) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      // slow water needs no more than 30 frames a second
      if (now - last > 32) {
        draw.current(now);
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, failed]);

  if (failed) return <BokehCanvas scent={scent} px={px} py={py} running={running} />;
  return <canvas ref={ref} aria-hidden className="absolute inset-0 -z-10 h-full w-full" />;
}

const mixRgb = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as RGB;

/* ── the mist: spray, trails and bursts in the fragrance's colour ─────────
 *
 * Soft puffs stamped from one pre-rendered sprite on a half-resolution
 * canvas. The loop only runs while there is mist in the air; between
 * sprays it stops altogether.
 */

type Puff = { x: number; y: number; vx: number; vy: number; r: number; grow: number; life: number; max: number; a: number };

function useMist(canvas: React.RefObject<HTMLCanvasElement | null>, tint: string) {
  const puffs = useRef<Puff[]>([]);
  const raf = useRef(0);
  const sprite = useRef<HTMLCanvasElement | null>(null);
  const RES = 0.5;

  useEffect(() => {
    const s = document.createElement("canvas");
    s.width = s.height = 64;
    const g = s.getContext("2d");
    if (g) {
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, `${tint}f0`);
      grd.addColorStop(0.4, `${tint}8c`);
      grd.addColorStop(1, `${tint}00`);
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
    }
    sprite.current = s;
  }, [tint]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width * RES));
      c.height = Math.max(1, Math.round(r.height * RES));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [canvas]);

  const run = useCallback(() => {
    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      const spr = sprite.current;
      if (!c || !ctx || !spr) {
        raf.current = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, c.width, c.height);
      const ps = puffs.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life += dt;
        if (p.life >= p.max) {
          ps[i] = ps[ps.length - 1];
          ps.pop();
          continue;
        }
        const d = Math.exp(-2.4 * dt); // air brakes it hard…
        p.vx *= d;
        p.vy = p.vy * d - 16 * dt; //    …and warm air lifts it
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += p.grow * dt;
        const t = p.life / p.max;
        ctx.globalAlpha = p.a * Math.min(1, t * 7) * (1 - t) * (1 - t);
        const R = p.r * RES;
        ctx.drawImage(spr, p.x * RES - R, p.y * RES - R, R * 2, R * 2);
      }
      ctx.globalAlpha = 1;
      if (ps.length) raf.current = requestAnimationFrame(tick);
      else {
        raf.current = 0;
        ctx.clearRect(0, 0, c.width, c.height);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [canvas]);

  /** Emit n puffs at (x, y) in CSS px, heading `angle` (radians) ± spread/2. */
  return useCallback(
    (x: number, y: number, n: number, angle: number, spread: number, speed: number, size: number, alpha: number) => {
      for (let i = 0; i < n; i++) {
        const ang = angle + (Math.random() - 0.5) * spread;
        const sp = speed * (0.35 + Math.random() * 0.9);
        puffs.current.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          r: size * (0.5 + Math.random() * 0.8),
          grow: size * (0.8 + Math.random() * 1.4),
          life: 0,
          max: 0.9 + Math.random() * 1.3,
          a: alpha,
        });
      }
      if (puffs.current.length > 900) puffs.current.splice(0, puffs.current.length - 900);
      run();
    },
    [run],
  );
}

/* ── glints: the trail a bottle leaves in flight ──────────────────────────
 *
 * Tiny four-point sparkles, like light catching the glass as it moves —
 * crisp, so they get their own full-resolution canvas. They twinkle, fall
 * away and are gone in about a second; the loop stops when they are.
 */

type Glint = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; ph: number };

function useGlints(canvas: React.RefObject<HTMLCanvasElement | null>) {
  const glints = useRef<Glint[]>([]);
  const raf = useRef(0);
  const dpr = useRef(1);
  const sprite = useMemo(() => {
    if (typeof document === "undefined") return null;
    const s = document.createElement("canvas");
    s.width = s.height = 48;
    const g = s.getContext("2d");
    if (!g) return s;
    const core = g.createRadialGradient(24, 24, 0, 24, 24, 9);
    core.addColorStop(0, "rgba(255,255,255,1)");
    core.addColorStop(0.35, "rgba(255,248,232,0.85)");
    core.addColorStop(1, "rgba(255,244,220,0)");
    g.fillStyle = core;
    g.fillRect(0, 0, 48, 48);
    // the four rays
    for (const [w, h] of [
      [48, 2],
      [2, 48],
    ]) {
      const ray = w > h ? g.createLinearGradient(0, 0, 48, 0) : g.createLinearGradient(0, 0, 0, 48);
      ray.addColorStop(0, "rgba(255,255,255,0)");
      ray.addColorStop(0.5, "rgba(255,255,255,0.95)");
      ray.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = ray;
      g.fillRect((48 - w) / 2, (48 - h) / 2, w, h);
    }
    return s;
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      dpr.current = Math.min(1.5, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.round(r.width * dpr.current));
      c.height = Math.max(1, Math.round(r.height * dpr.current));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [canvas]);

  const run = useCallback(() => {
    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx || !sprite) {
        raf.current = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = dpr.current;
      ctx.clearRect(0, 0, c.width, c.height);
      const gs = glints.current;
      for (let i = gs.length - 1; i >= 0; i--) {
        const p = gs[i];
        p.life += dt;
        if (p.life >= p.max) {
          gs[i] = gs[gs.length - 1];
          gs.pop();
          continue;
        }
        p.vx *= Math.exp(-3 * dt);
        p.vy = p.vy * Math.exp(-3 * dt) + 38 * dt; // they drift down as they fade
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.max;
        const twinkle = 0.55 + 0.45 * Math.sin(p.ph + p.life * 26);
        ctx.globalAlpha = Math.min(1, t * 10) * (1 - t) * twinkle;
        const R = p.r * k * (1 - t * 0.4);
        ctx.drawImage(sprite, p.x * k - R, p.y * k - R, R * 2, R * 2);
      }
      ctx.globalAlpha = 1;
      if (gs.length) raf.current = requestAnimationFrame(tick);
      else {
        raf.current = 0;
        ctx.clearRect(0, 0, c.width, c.height);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [canvas, sprite]);

  /** Scatter n glints around (x, y), within ± spreadX / spreadY px. */
  return useCallback(
    (x: number, y: number, n: number, spreadX: number, spreadY: number, size: number) => {
      for (let i = 0; i < n; i++) {
        glints.current.push({
          x: x + (Math.random() - 0.5) * spreadX,
          y: y + (Math.random() - 0.5) * spreadY,
          vx: (Math.random() - 0.5) * 30,
          vy: (Math.random() - 0.5) * 20,
          r: size * (0.45 + Math.random() * 0.8),
          life: 0,
          max: 0.55 + Math.random() * 0.6,
          ph: Math.random() * 6.28,
        });
      }
      if (glints.current.length > 400) glints.current.splice(0, glints.current.length - 400);
      run();
    },
    [run],
  );
}

/* ── the spray: an atomiser fired at the lens ───────────────────────────────
 *
 * Every droplet lives in 3D: the bottle's plane is z = 0 and the camera
 * sits F in front of it. The pump throws a narrow cone of droplets
 * straight out at you; each is projected with real perspective — the
 * nearer it comes the larger it draws and the further it moves out from
 * the nozzle — so the cone opens toward you. Focus is on the bottle:
 * droplets there are crisp specks, and the ones that reach you swell into
 * soft, clear, out-of-focus discs and are gone as they pass the lens.
 * Fine droplets brake hard in the air and sink; only the heavier ones make
 * it all the way. The loop runs only while there are droplets in the air.
 */

type Drop = { x: number; y: number; z: number; vx: number; vy: number; vz: number; r: number; drag: number; life: number; max: number; sx: number; sy: number };

function dropSprite(rim: string, blur: 0 | 1 | 2) {
  const S = blur === 2 ? 64 : 32;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d");
  if (!g) return c;
  const m = S / 2;
  const R = S * 0.48;
  if (blur === 2) {
    // out of focus: an even, soft-edged disc of light — no rim, or it reads as a bubble
    const d = g.createRadialGradient(m, m, 0, m, m, R);
    d.addColorStop(0, "rgba(255,255,255,0.42)");
    d.addColorStop(0.55, "rgba(255,255,255,0.36)");
    d.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = d;
    g.fillRect(0, 0, S, S);
    return c;
  }
  // in focus (or nearly): clear on top, the fragrance's shade underneath —
  // so it shows against a light ground — and a bright point of light
  const body = g.createRadialGradient(m, m, 0, m, m, R);
  body.addColorStop(0, `rgba(255,255,255,${blur ? 0.7 : 0.85})`);
  body.addColorStop(blur ? 0.6 : 0.55, `${rim}${blur ? "1a" : "24"}`);
  body.addColorStop(1, `${rim}00`);
  g.fillStyle = body;
  g.fillRect(0, 0, S, S);
  const under = g.createRadialGradient(m, m + R * 0.4, 0, m, m + R * 0.4, R * 0.5);
  under.addColorStop(0, `${rim}${blur ? "18" : "2a"}`);
  under.addColorStop(1, `${rim}00`);
  g.fillStyle = under;
  g.fillRect(0, 0, S, S);
  const hi = g.createRadialGradient(m - R * 0.18, m - R * 0.22, 0, m - R * 0.18, m - R * 0.22, R * (blur ? 0.5 : 0.34));
  hi.addColorStop(0, `rgba(255,255,255,${blur ? 0.7 : 1})`);
  hi.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = hi;
  g.fillRect(0, 0, S, S);
  return c;
}

function useDroplets(canvas: React.RefObject<HTMLCanvasElement | null>, rim: string) {
  const drops = useRef<Drop[]>([]);
  const origin = useRef({ x: 0, y: 0, F: 1000, g: 400 });
  const raf = useRef(0);
  const dpr = useRef(1);
  const dirty = useRef<[number, number, number, number] | null>(null);
  const sprites = useRef<HTMLCanvasElement[] | null>(null);

  useEffect(() => {
    sprites.current = [dropSprite(rim, 0), dropSprite(rim, 1), dropSprite(rim, 2)];
  }, [rim]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      dpr.current = Math.min(1.25, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.round(r.width * dpr.current));
      c.height = Math.max(1, Math.round(r.height * dpr.current));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [canvas]);

  const run = useCallback(() => {
    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      const sp = sprites.current;
      if (!c || !ctx || !sp) {
        raf.current = 0;
        return;
      }
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      const k = dpr.current;
      const { x: ox, y: oy, F, g } = origin.current;
      const was = dirty.current;
      if (was) ctx.clearRect(was[0], was[1], was[2] - was[0], was[3] - was[1]);
      const ds = drops.current;
      for (let i = ds.length - 1; i >= 0; i--) {
        const d = ds[i];
        d.life += dt;
        // gone once it passes the lens, or runs out of life
        if (d.life >= d.max || d.z > F * 0.9) {
          ds[i] = ds[ds.length - 1];
          ds.pop();
          continue;
        }
        const drag = Math.exp(-d.drag * dt);
        d.vx *= drag;
        d.vz *= drag;
        d.vy = d.vy * drag + g * dt; // and it sinks
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.z += d.vz * dt;
      }
      // far ones first, so the near ones pass in front
      ds.sort((a, b) => a.z - b.z);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      for (const d of ds) {
        const p = F / (F - d.z); // perspective: nearer, larger and further out
        const t = d.life / d.max;
        const R = Math.min(F * 0.03, Math.max(0.7, d.r * p));
        const blur = p < 1.5 ? 0 : p < 2.6 ? 1 : 2;
        // out of focus, the light spreads thin
        const focus = blur === 0 ? 1 : blur === 1 ? 0.85 : Math.max(0.16, 0.85 - (p - 2.6) * 0.08);
        ctx.globalAlpha = Math.min(1, t * 14) * (1 - t * t) * focus;
        const cx = ox + d.x * p, cy = oy + d.y * p;
        // rushing at you, it smears along its path: a streak behind the drop
        if (blur < 2 && d.sx === d.sx && dt > 0 && p > 1.15) {
          const f = 0.02 / dt;
          const tx = cx - (cx - d.sx) * f, ty = cy - (cy - d.sy) * f;
          if (Math.abs(cx - tx) + Math.abs(cy - ty) > R * 4) {
            const a = ctx.globalAlpha;
            ctx.globalAlpha = a * 0.3;
            ctx.lineWidth = R * 0.8 * k;
            ctx.beginPath();
            ctx.moveTo(tx * k, ty * k);
            ctx.lineTo(cx * k, cy * k);
            ctx.stroke();
            ctx.globalAlpha = a;
            if ((tx - R) * k < x0) x0 = (tx - R) * k;
            if ((ty - R) * k < y0) y0 = (ty - R) * k;
            if ((tx + R) * k > x1) x1 = (tx + R) * k;
            if ((ty + R) * k > y1) y1 = (ty + R) * k;
          }
        }
        d.sx = cx;
        d.sy = cy;
        const px = (cx - R) * k, py = (cy - R) * k, w = R * 2 * k;
        ctx.drawImage(sp[blur], px, py, w, w);
        if (px < x0) x0 = px;
        if (py < y0) y0 = py;
        if (px + w > x1) x1 = px + w;
        if (py + w > y1) y1 = py + w;
      }
      dirty.current = ds.length ? [Math.floor(x0) - 2, Math.floor(y0) - 2, Math.ceil(x1) + 2, Math.ceil(y1) + 2] : null;
      ctx.globalAlpha = 1;
      if (ds.length) raf.current = requestAnimationFrame(tick);
      else {
        raf.current = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        dirty.current = null;
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [canvas]);

  /**
   * One pulse of the pump from the nozzle at (x, y), straight out at the
   * viewer: n droplets, `s` the scene's scale in px (sets the distances,
   * the speed and the size of a droplet).
   */
  return useCallback(
    (x: number, y: number, n: number, s: number) => {
      const o = origin.current;
      // new pulses fire from where the nozzle is now; droplets already out keep their place
      const dx = x - o.x, dy = y - o.y;
      if (drops.current.length && (dx || dy)) {
        const F = o.F;
        for (const d of drops.current) {
          const p = F / (F - d.z);
          d.x -= dx / p;
          d.y -= dy / p;
          d.sx = NaN;
        }
      }
      origin.current = { x, y, F: 2.3 * s, g: 0.8 * s };
      for (let i = 0; i < n; i++) {
        // mostly a fine mist; a few heavier drops that carry all the way to you
        const heavy = Math.random() < 0.2;
        const r = 0.7 + 0.005 * s * (heavy ? 1.1 + Math.random() * 0.5 : 0.35 + Math.random() ** 2 * 0.8);
        const v = 2.1 * s * (0.55 + Math.random() * 0.6) * (heavy ? 1.1 : 1);
        // a narrow cone around the line to the lens
        const th = Math.min(0.75, 0.24 * Math.sqrt(-2 * Math.log(1 - Math.random() * 0.999)));
        const ph = Math.random() * Math.PI * 2;
        drops.current.push({
          x: (Math.random() - 0.5) * 0.01 * s,
          y: (Math.random() - 0.5) * 0.01 * s,
          z: 0,
          vx: Math.cos(ph) * Math.tan(th) * v,
          vy: Math.sin(ph) * Math.tan(th) * v - 0.08 * v,
          vz: v * Math.cos(th),
          r,
          drag: heavy ? 0.4 + Math.random() * 0.3 : 1.6 + Math.random() * 1.2,
          life: 0,
          max: 1.1 + Math.random() * 1.0,
          sx: NaN,
          sy: NaN,
        });
      }
      if (drops.current.length > 1200) drops.current.splice(0, drops.current.length - 1200);
      run();
    },
    [run],
  );
}

/* ── the hero ─────────────────────────────────────────────────────────── */

const rise: Variants = {
  out: { opacity: 0, y: 22, transition: { duration: 0.3, ease: [0.6, 0, 0.9, 0.5] } },
  in: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};
const group: Variants = {
  out: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  in: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const letter: Variants = {
  out: (slam: boolean) => ({ opacity: 0, y: slam ? "-10%" : "28%", scale: slam ? 1.9 : 0.94 }),
  in: (slam: boolean) => ({
    opacity: 1,
    y: "0%",
    scale: 1,
    transition: slam ? { duration: 0.42, ease: [0.3, 1.35, 0.5, 1] } : { duration: 1.2, ease: EASE_OUT_EXPO },
  }),
};
const mask: Variants = {
  out: { y: "105%", transition: { duration: 0.35, ease: [0.6, 0, 0.9, 0.5] } },
  in: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

export default function HoverHero({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: PageName, filters?: PerfumeFilterOptions) => void;
  onSelectProduct?: (p: PerfumeProduct) => void;
}) {
  const reduce = usePrefersReducedMotion();
  const section = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [words, setWords] = useState(false);
  const [mark, setMark] = useState(false); // the wordmark, once it has landed, stays
  const [bang, setBang] = useState(0);
  const [sweep, setSweep] = useState(0); // a band of light across the frame on each change
  const [notes, setNotes] = useState<{ key: number; from: { x: number; y: number } } | null>(null);
  const [phone, setPhone] = useState(false);
  const [lens, setLens] = useState<{ key: number; drops: { x: number; y: number; r: number; delay: number; slide: number }[] } | null>(null);
  const [idle, setIdle] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const scent = SCENTS[active];
  const p = product(scent.id);
  const name = p?.name ?? scent.id;
  const price: [string, number] | undefined = p?.prices?.[50] ? ["50", p.prices[50]] : cheapest(p);

  // the bottle's flight, and its hover
  const bx = useMotionValue(-1.6);
  const by = useMotionValue(0.6);
  const brot = useMotionValue(-22);
  const bsc = useMotionValue(0); // unseen until its entrance
  const spin = useMotionValue(-80);
  const wobble = useMotionValue(0);
  const float = useMotionValue(0);
  const px = useSpring(0, { stiffness: 50, damping: 16 });
  const py = useSpring(0, { stiffness: 50, damping: 16 });
  const cardRY = useTransform(px, (v) => v * 0.6);
  const cardRX = useTransform(py, (v) => v * -0.6);

  const turn = useTransform(() => spin.get() + wobble.get() + px.get() * 0.9);
  const bottle = useTransform(
    () =>
      `translate3d(calc(var(--s) * ${bx.get()}), calc(var(--s) * ${by.get() + float.get()}), 0) rotateZ(${brot.get()}deg) rotateX(${py.get() * -0.4}deg) rotateY(${turn.get()}deg) scale(${bsc.get()})`,
  );
  const capT = useTransform(() => `rotateY(${-turn.get()}deg)`); // a sphere faces you from anywhere
  const shadowOpacity = useTransform(() => Math.max(0, 0.55 - Math.abs(by.get()) * 0.6 - Math.abs(bx.get()) * 0.35 - float.get() * 3));
  const shadowScale = useTransform(() => 1 - float.get() * 2.2);
  const shadowX = useTransform(() => `calc(-50% + var(--s) * ${bx.get()})`);

  const liveRef = useRef(true);
  const dragging = useRef(false);
  const phoneRef = useRef(false);
  phoneRef.current = phone;
  const unit = useRef<HTMLDivElement | null>(null); // measures --s in px
  const mistCanvas = useRef<HTMLCanvasElement | null>(null);
  const glintCanvas = useRef<HTMLCanvasElement | null>(null);
  const dropCanvas = useRef<HTMLCanvasElement | null>(null);
  const letterEls = useRef<(HTMLSpanElement | null)[]>([]);
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);
  const mist = useMist(mistCanvas, mix(scent.accent, "#ffffff", 0.62));
  const glint = useGlints(glintCanvas);
  const drop = useDroplets(dropCanvas, scent.deep);
  const ripple = useRef<Ripple | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const vis = () => setTabVisible(!document.hidden);
    vis();
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  const live = onScreen && tabVisible;
  liveRef.current = live;

  /* ── the show ─────────────────────────────────────────────────────────
   * First: the wordmark slams in letter by letter, the frame takes the hit,
   * and the bottle bursts out from behind it. Then, for every fragrance:
   * it lands, sprays, and its notes come out of the mist; it holds station
   * and turns; the words clear and it spins away into the distance,
   * trailing mist, and the next one flies in — the letters parting as it
   * passes.
   */
  // Repositioning between moves uses jump(), not set(): set() reads the
  // leap as velocity, and the next spring would fling the bottle off frame.
  useEffect(() => {
    if (reduce) {
      bx.jump(0);
      by.jump(0);
      brot.jump(0);
      bsc.jump(1);
      spin.jump(-18);
      setMark(true);
      setWords(true);
      return;
    }
    let cancelled = false;
    const running: AnimationPlaybackControls[] = [];
    const go = (mv: MotionValue<number>, to: number | number[], o: object) => {
      const c = animate(mv, to as never, o as never);
      running.push(c);
      return c;
    };
    const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
    const hold = async (ms: number) => {
      let t = 0;
      while (t < ms && !cancelled) {
        await wait(60);
        if (liveRef.current && !dragging.current) t += 60;
      }
    };
    const sPx = () => unit.current?.offsetWidth || 300;
    // where the bottle is on screen right now, in px from the hero's corner
    const at = (part: "body" | "nozzle") => {
      const r = section.current?.getBoundingClientRect();
      const s = sPx();
      const sc = bsc.get();
      const x = (r?.width ?? 0) * (phoneRef.current ? 0.5 : 0.55) + bx.get() * s;
      const y = (r?.height ?? 0) * (phoneRef.current ? 0.37 : 0.46) + (by.get() + float.get()) * s;
      return part === "nozzle" ? { x, y: y - (BOTTLE_H / 2 - CAP_H * 0.92) * s * sc } : { x, y: y + 0.06 * s * sc };
    };
    // in flight: glints in its wake, and the letters part as it passes
    const flight = () => {
      const sec = section.current?.getBoundingClientRect();
      const letters = letterEls.current.map((el) => {
        const r = el?.getBoundingClientRect();
        return el && r && sec ? { el, x: r.left + r.width / 2 - sec.left, h: r.height } : null;
      });
      let raf = 0;
      let frame = 0;
      const tick = () => {
        const s = sPx();
        const pt = at("body");
        const sc = bsc.get();
        // light catching the glass as it moves: a few sparkles off its body
        if (!phoneRef.current || frame++ % 2 === 0) {
          glint(pt.x, pt.y - 0.12 * s * sc, 2, BODY_W * s * sc * 1.2, BOTTLE_H * s * sc * 0.9, 9);
        }
        for (const l of letters) {
          if (!l) continue;
          const d = (l.x - pt.x) / (s * 0.7);
          const f = Math.exp(-d * d);
          l.el.style.transform = `translateY(${-f * l.h * 0.14}px) rotate(${Math.sign(d) * f * 8}deg)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(raf);
        for (const l of letters) {
          if (!l) continue;
          l.el.style.transition = "transform 0.9s cubic-bezier(0.2, 1.5, 0.35, 1)";
          l.el.style.transform = "";
          window.setTimeout(() => (l.el.style.transition = ""), 950);
        }
      };
    };
    // one press of the atomiser, fired straight out at you: a burst of mist
    // opening toward the lens, droplets streaking past, and a few that land
    // on the glass
    const spray = async () => {
      const s = sPx();
      const phone = phoneRef.current;
      const n0 = at("nozzle");
      mist(n0.x, n0.y, phone ? 22 : 40, 0, Math.PI * 2, 600 * (s / 500), 0.09 * s, 0.3);
      const box = section.current?.getBoundingClientRect();
      const W = box?.width ?? 0;
      const H = box?.height ?? 0;
      setLens({
        key: Date.now(),
        drops: Array.from({ length: phone ? 5 : 9 }, () => {
          const a = Math.random() * Math.PI * 2;
          const dist = s * (0.12 + 0.95 * Math.sqrt(Math.random()));
          const size = phone ? 3.5 + Math.random() ** 2 * 5 : 4.5 + Math.random() ** 2 * 7;
          return {
            x: Math.min(W - 12, Math.max(12, n0.x + Math.cos(a) * dist)),
            y: Math.min(H - 12, Math.max(12, n0.y + Math.sin(a) * dist * 0.85)),
            r: size,
            delay: 0.3 + Math.random() * 0.45,
            slide: (6 + Math.random() * 26) * (size / 12),
          };
        }),
      });
      for (let k = 0; k < 6 && !cancelled; k++) {
        const n = at("nozzle");
        drop(n.x, n.y, phone ? 80 : 140, s);
        if (k) mist(n.x, n.y, phone ? 4 : 7, 0, Math.PI * 2, 220 * (s / 500), 0.06 * s, 0.12);
        if (k < 3) glint(n.x, n.y, 2, 0.06 * s, 0.06 * s, phone ? 6 : 8);
        await wait(70);
      }
    };
    const shake = () => {
      running.push(animate(shakeX, [0, -11, 9, -6, 4, -2, 0], { duration: 0.5, ease: "easeOut" }));
      running.push(animate(shakeY, [0, 6, -5, 3, -1, 0], { duration: 0.45, ease: "easeOut" }));
    };

    (async () => {
      let i = 0;
      let first = true;
      await wait(200);
      while (!cancelled) {
        setActive(i);
        if (first) {
          // the wordmark slams in, and the frame takes the hit; the words
          // arrive with it, so the page says what it is straight away
          setMark(true);
          setWords(true);
          await wait(800);
          if (cancelled) return;
          shake();
          // the bottle bursts out from behind it
          bx.jump(0);
          by.jump(-0.05);
          brot.jump(0);
          bsc.jump(0.1);
          spin.jump(-430);
          const b = at("body");
          const s = sPx();
          mist(b.x, b.y, phoneRef.current ? 60 : 130, 0, Math.PI * 2, 520 * (s / 500), 0.06 * s, 0.26);
          setBang((k) => k + 1);
          ripple.current?.(b.x, b.y, 1.3);
          go(spin, -16, { duration: 1.6, ease: EASE_OUT_EXPO });
          go(by, 0, { duration: 1.1, ease: EASE_OUT_EXPO });
          await go(bsc, 1.12, { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] });
          if (cancelled) return;
          await go(bsc, 1, { type: "spring", stiffness: 140, damping: 11 });
        } else {
          // in from the lower left, banking, glinting
          bx.jump(-1.7);
          by.jump(0.55);
          brot.jump(-24);
          bsc.jump(0.84);
          spin.jump(-95);
          const stop = flight();
          go(bx, 0, { type: "spring", stiffness: 55, damping: 14, mass: 1.1 });
          go(by, 0, { type: "spring", stiffness: 55, damping: 13, mass: 1.1 });
          go(brot, 0, { type: "spring", stiffness: 60, damping: 11 });
          go(bsc, 1, { duration: 1.2, ease: EASE_OUT_EXPO });
          go(spin, -16, { type: "spring", stiffness: 45, damping: 10 });
          await wait(1050);
          stop();
          const b = at("body");
          ripple.current?.(b.x, b.y, 1);
        }
        first = false;
        if (cancelled) return;
        // it lands, sprays, and its notes come out of the mist
        setWords(true);
        setIdle(true);
        void spray();
        await wait(200);
        if (cancelled) return;
        setNotes({ key: Date.now(), from: at("nozzle") });
        await hold(HOLD_MS * 0.45);
        if (cancelled) return;
        // it turns once, showing the PC on its back
        await go(spin, spin.get() + 360, { duration: 1.8, ease: [0.45, 0, 0.25, 1] });
        if (cancelled) return;
        spin.jump(spin.get() - 360);
        await hold(HOLD_MS * 0.55);
        if (cancelled) return;
        setNotes(null);
        setWords(false);
        setIdle(false);
        go(wobble, 0, { duration: 0.4 });
        go(float, 0, { duration: 0.4 });
        await wait(380);
        if (cancelled) return;
        // it spins away into the distance, glinting, as light sweeps the frame
        setSweep((k) => k + 1);
        const stop = flight();
        const away = { duration: 0.95, ease: [0.55, 0, 0.9, 0.35] };
        go(brot, 32, away);
        go(spin, spin.get() + 540, away);
        go(bsc, 0.38, away);
        go(by, -0.95, away);
        await go(bx, 1.5, away);
        stop();
        if (cancelled) return;
        i = (i + 1) % SCENTS.length;
      }
    })();
    return () => {
      cancelled = true;
      running.forEach((c) => c.stop());
    };
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── holding station: a hummingbird's hover, not a bob ───────────── */
  useEffect(() => {
    if (!idle || !live || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const w0 = wobble.get();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const e = Math.min(1, t / 0.9);
      float.set((Math.sin(t * 1.7) * 0.018 + Math.sin(t * 4.3) * 0.004) * e);
      if (!dragging.current) wobble.set(w0 * (1 - e) + Math.sin(t * 0.8) * 14 * e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idle, live, reduce, float, wobble]);

  /* ── drag the bottle to turn it ──────────────────────────────────── */
  const from = useRef(0);
  const down = (e: React.PointerEvent) => {
    if (!idle) return;
    dragging.current = true;
    from.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    spin.set(spin.get() + (e.clientX - from.current) * 0.9);
    from.current = e.clientX;
  };
  const up = () => {
    if (!dragging.current) return;
    dragging.current = false;
    animate(spin, Math.round(spin.get() / 180) * 180 - 16, { type: "spring", stiffness: 90, damping: 14 });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = section.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };

  const scentNotes = useMemo(
    () => (p?.desc ?? "").split(/,|&| and /).map((t) => t.trim()).filter(Boolean).slice(0, 3),
    [p],
  );

  const openProduct = () => (p && onSelectProduct ? onSelectProduct(p) : onNavigate?.("perfumes"));

  // the wordmark: measured once, then sized to span the frame
  const markMeasure = useRef<HTMLSpanElement | null>(null);
  const [markPx, setMarkPx] = useState(0);
  useLayoutEffect(() => {
    const fit = () => {
      const m = markMeasure.current;
      const sec = section.current;
      if (!m || !sec) return;
      const per100 = m.getBoundingClientRect().width;
      if (per100) setMarkPx(Math.round(Math.min((sec.getBoundingClientRect().width * 0.9 * 100) / per100, 300)));
    };
    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => window.removeEventListener("resize", fit);
  }, []);

  const glassSide: React.CSSProperties = {
    background: [
      "linear-gradient(90deg, rgba(255,255,255,.78) 0%, rgba(255,255,255,.08) 9%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,.08) 91%, rgba(255,255,255,.72) 100%)",
      `linear-gradient(180deg, rgba(255,255,255,.22) 0%, ${scent.juice}55 8%, ${scent.juice}60 55%, ${scent.juice}50 80%, rgba(255,255,255,.08) 84%, rgba(255,255,255,.16) 100%)`,
    ].join(", "),
  };
  const liquidFace: React.CSSProperties = {
    background: `linear-gradient(90deg, ${scent.liquid}8c, ${scent.liquid}c8 50%, ${scent.liquid}8c)`,
    borderRadius: "12% / 8%",
  };
  const liquidSide: React.CSSProperties = {
    background: `linear-gradient(90deg, ${scent.liquid}a0, ${scent.liquid}e0 50%, ${scent.liquid}a0)`,
    borderRadius: "14% / 8%",
  };

  return (
    <section
      ref={section}
      id="top"
      aria-label="Sentire by PC — extrait de parfum"
      onPointerMove={onPointerMove}
      onPointerDown={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ripple.current?.(e.clientX - r.left, e.clientY - r.top, 0.8);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative isolate h-[clamp(440px,calc(100svh-162px),760px)] w-full select-none overflow-hidden text-[#161416] [--s:min(74vw,300px)] md:h-[max(620px,min(960px,calc(100svh-126px)))] md:[--s:clamp(340px,37vw,620px)]"
    >
      {/* the water: light moving through a pool in this fragrance's colours */}
      <WaterCanvas scent={scent} px={px} py={py} running={live && !reduce} ripple={ripple} />
      {/* a little air at the foot so the words sit on something */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2"
        style={{ background: `linear-gradient(180deg, transparent, ${mix(scent.tint, "#ffffff", 0.35)}cc)` }}
      />

      <div ref={unit} aria-hidden className="invisible absolute" style={{ width: u(1) }} />
      <motion.div className="absolute inset-0" style={{ x: shakeX, y: shakeY }}>
      {/* the wordmark, enormous, behind the bottle */}
      <span ref={markMeasure} aria-hidden className="invisible absolute left-0 top-0 whitespace-nowrap font-serif font-light uppercase leading-none" style={{ fontSize: 100 }}>
        Sentire
      </span>
      <motion.p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] z-0 flex -translate-x-1/2 whitespace-nowrap font-serif font-light uppercase leading-[0.9] md:top-[9%]"
        style={{ fontSize: markPx || "18vw" }}
        variants={group}
        initial="out"
        animate={mark ? "in" : "out"}
      >
        {"SENTIRE".split("").map((ch, i) => (
          <span key={i} ref={(el) => void (letterEls.current[i] = el)} className="inline-block">
          <motion.span
            variants={letter}
            custom={!reduce}
            className="inline-block"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.96) 12%, rgba(255,255,255,0.35) 62%, rgba(255,255,255,0) 92%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {ch}
          </motion.span>
          </span>
        ))}
      </motion.p>

      {/* a band of studio light passes across the frame as the fragrance changes */}
      {sweep > 0 && !reduce && (
        <motion.span
          key={`sweep-${sweep}`}
          aria-hidden
          className="pointer-events-none absolute inset-y-[-15%] left-0 z-[1] w-[38%]"
          style={{
            rotate: 10,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0))",
          }}
          initial={{ x: "-110%", opacity: 0 }}
          animate={{
            x: "300%",
            opacity: [0, 1, 1, 0],
            transition: { duration: 1.6, ease: [0.45, 0, 0.25, 1], opacity: { duration: 1.6, times: [0, 0.15, 0.8, 1] } },
          }}
        />
      )}

      {/* the shock ring as the bottle bursts through */}
      {bang > 0 && !reduce && (
        <motion.span
          key={`bang-${bang}`}
          aria-hidden
          className="pointer-events-none absolute left-[50%] top-[37%] z-[1] rounded-full border-2 md:left-[55%] md:top-[46%]"
          style={{ width: u(0.9), height: u(0.9), marginLeft: u(-0.45), marginTop: u(-0.45), borderColor: scent.accent }}
          initial={{ scale: 0.15, opacity: 0.9 }}
          animate={{ scale: 3.2, opacity: 0, transition: { duration: 1.3, ease: [0.1, 0.8, 0.3, 1] } }}
        />
      )}

      {/* a pulse in the fragrance's colour as each bottle settles */}
      <AnimatePresence>
        {words && !reduce && (
          <motion.span
            key={`pulse-${active}`}
            aria-hidden
            className="pointer-events-none absolute left-[50%] top-[37%] z-[1] rounded-full border-[1.5px] md:left-[55%] md:top-[46%]"
            style={{ width: u(0.9), height: u(0.9), marginLeft: u(-0.45), marginTop: u(-0.45), borderColor: scent.accent }}
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 1.9, opacity: 0, transition: { duration: 1.7, ease: EASE_OUT_EXPO } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          />
        )}
      </AnimatePresence>

      {/* the bottle's shadow on the air below it */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-[calc(37%+var(--s)*0.47)] z-[1] rounded-full md:left-[55%] md:top-[calc(46%+var(--s)*0.47)]"
        style={{
          width: u(0.62),
          height: u(0.09),
          x: shadowX,
          opacity: shadowOpacity,
          scale: shadowScale,
          background: "radial-gradient(closest-side, rgba(40,20,30,0.45), rgba(40,20,30,0))",
        }}
      />

      {/* the bottle, holding station */}
      <div className="absolute left-[50%] top-[37%] z-[2] md:left-[55%] md:top-[46%]" style={{ perspective: "1400px" }}>
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={`${name} — drag to turn it, Enter to open`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onKeyDown={(e) => e.key === "Enter" && openProduct()}
          className="absolute cursor-grab touch-pan-y active:cursor-grabbing"
          style={{
            left: u(-BODY_W / 2),
            top: u(-BOTTLE_H / 2),
            width: u(BODY_W),
            height: u(BOTTLE_H),
            transformStyle: "preserve-3d",
            transform: bottle,
          }}
        >
          <motion.img
            src={A("bottle-cap.webp")}
            alt=""
            draggable={false}
            className="absolute"
            style={{ left: u((BODY_W - CAP_W) / 2), top: 0, width: u(CAP_W), height: u(CAP_H), transform: capT }}
          />
          <Cuboid
            w={BODY_W * 0.86}
            h={BODY_H * 0.875}
            d={BODY_D * 0.8}
            style={{ top: u(CAP_H - 0.012 + BODY_H * 0.06), left: u(BODY_W * 0.07) }}
            faces={{
              front: liquidFace,
              back: liquidFace,
              left: liquidSide,
              right: liquidSide,
              top: { background: `linear-gradient(180deg, rgba(255,255,255,.55), ${scent.liquid}c0)` },
            }}
          />
          <Cuboid
            w={BODY_W}
            h={BODY_H}
            d={BODY_D}
            style={{ top: u(CAP_H - 0.012), left: 0 }}
            faces={{
              front: { backgroundImage: `url(${A(`body-${scent.id}.webp`)})`, backgroundSize: "100% 100%", backfaceVisibility: "hidden" },
              back: { backgroundImage: `url(${A(`back-${scent.id}.webp`)})`, backgroundSize: "100% 100%", backfaceVisibility: "hidden" },
              left: glassSide,
              right: glassSide,
              top: {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.1) 14%, rgba(255,255,255,.04) 86%, rgba(255,255,255,.5) 100%)",
              },
            }}
          />
          {/* studio light running down the front of the glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute overflow-hidden"
            style={{
              left: 0,
              top: u(CAP_H - 0.012),
              width: u(BODY_W),
              height: u(BODY_H),
              transform: `translateZ(${u(BODY_D / 2 + 0.002)})`,
              backfaceVisibility: "hidden",
              borderRadius: "4%",
            }}
          >
            <span
              className="hv-glint absolute left-[-30%] h-[34%] w-[160%]"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.42) 50%, rgba(255,255,255,0))" }}
            />
          </div>
        </motion.div>
      </div>

      <canvas ref={mistCanvas} aria-hidden className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />
      <canvas ref={dropCanvas} aria-hidden className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />
      <canvas ref={glintCanvas} aria-hidden className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />

      {/* the notes, coming out of the spray and hanging in the air */}
      <AnimatePresence>
        {notes &&
          scentNotes.map((note, k) => {
            const W = section.current?.offsetWidth ?? 0;
            const H = section.current?.offsetHeight ?? 0;
            const s = unit.current?.offsetWidth ?? 300;
            const spots = phone
              ? [{ x: -0.5, y: -0.5 }, { x: 0.5, y: -0.3 }, { x: 0.52, y: 0.1 }]
              : [{ x: -0.8, y: -0.3 }, { x: 0.74, y: -0.44 }, { x: 0.86, y: -0.06 }];
            const half = (note.length * (phone ? 12.5 : 15) * 0.66 + (phone ? 36 : 44)) / 2;
            const cx = W * (phone ? 0.5 : 0.55);
            const cy = H * (phone ? 0.37 : 0.46);
            const tx = Math.max(half + 8, Math.min(W - half - 8, cx + spots[k % 3].x * s));
            const ty = Math.max(28, Math.min(H * (phone ? 0.5 : 0.62), cy + spots[k % 3].y * s));
            return (
              <motion.div
                key={`${notes.key}-${k}`}
                className="pointer-events-none absolute left-0 top-0 z-[4]"
                initial={{ x: notes.from.x, y: notes.from.y, scale: 0.2, opacity: 0, rotate: (k - 1) * 22 }}
                animate={{
                  x: tx,
                  y: ty,
                  scale: 1,
                  opacity: 1,
                  rotate: (k - 1) * -3,
                  transition: { type: "spring", stiffness: 110, damping: 13, delay: 0.12 + k * 0.14 },
                }}
                exit={{ y: ty - 40, opacity: 0, scale: 0.9, transition: { duration: 0.45, ease: "easeIn", delay: k * 0.05 } }}
              >
                <span
                  className="hv-float block whitespace-nowrap rounded-full border bg-white/90 px-3.5 py-1.5 font-serif text-[12.5px] italic shadow-[0_12px_28px_-14px_rgba(40,20,30,0.5)] md:px-4 md:py-2 md:text-[15px]"
                  style={{ borderColor: `${scent.accent}66`, color: scent.deep, animationDelay: `${k * -1.1}s` }}
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-[2px] rounded-full" style={{ backgroundColor: scent.accent }} />
                  {note}
                </span>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* a tag riding beside the bottle, like a field note */}
      <motion.div
        className="pointer-events-none absolute left-[55%] top-[46%] z-[3] hidden md:block"
        initial={false}
        animate={words ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: words ? 0.8 : 0.25, delay: words ? 0.5 : 0, ease: EASE_OUT_EXPO }}
      >
        <span
          className="absolute whitespace-nowrap rounded-full border border-white/70 bg-white/55 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em]"
          style={{ left: u(0.34), top: u(-0.3), color: scent.deep }}
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-[1px] rounded-full" style={{ backgroundColor: scent.accent }} />
          {p?.num} · {name}
        </span>
      </motion.div>

      {/* ── the words, in front ─────────────────────────────────────────── */}
      <motion.div
        className="ed-container absolute inset-x-0 bottom-[4%] z-[4] md:bottom-[8%]"
        variants={group}
        initial="out"
        animate={words ? "in" : "out"}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[34rem]">
            <motion.p variants={rise} className="font-mono text-[11px] uppercase tracking-[0.12em] max-sm:text-[12px]" style={{ color: scent.deep }}>
              Sentire by PC · Extrait de parfum<span className="max-md:hidden"> · Jaipur</span>
            </motion.p>
            <h1 className="mt-3 font-serif font-light leading-[0.95] tracking-[-0.03em]" style={{ fontSize: "clamp(2.3rem, 4.6vw, 4.4rem)" }}>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={mask} className="block">
                  Longer than
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={mask} className="block italic" style={{ color: scent.deep }}>
                  a memory.
                </motion.span>
              </span>
            </h1>
            <motion.p variants={rise} className="hv-desc mt-3 max-w-md text-[14.5px] leading-relaxed text-[#161416]/75 md:mt-4 md:text-[15.5px]">
              {name} — {p?.desc}. Extrait de parfum, 35%+ perfume oil.
            </motion.p>
            <motion.div variants={rise} className="mt-4 flex flex-wrap items-center gap-4 md:mt-5">
              <button
                type="button"
                onClick={() => onNavigate?.("perfumes")}
                className="min-h-[46px] cursor-pointer rounded-full px-6 text-[12.5px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-700"
                style={{ backgroundColor: scent.deep }}
              >
                Discover all perfumes
              </button>
              <button
                type="button"
                onClick={openProduct}
                className="min-h-[46px] cursor-pointer text-[12.5px] font-medium uppercase tracking-[0.1em] underline max-md:hidden decoration-[#161416]/30 underline-offset-[6px] transition-colors hover:decoration-[#161416]"
              >
                View {name} →
              </button>
            </motion.div>
          </div>

          {/* two stepped glass cards carrying the numbers */}
          <div className="hidden items-end gap-3 md:flex">
            <motion.figure variants={rise} className="w-[176px] overflow-hidden rounded-[14px] border border-white/70 bg-gradient-to-b from-white/75 to-white/45 p-2 shadow-[0_24px_50px_-28px_rgba(40,20,30,0.5)]" style={{ rotateX: cardRX, rotateY: cardRY, transformPerspective: 900 }}>
              <img src={A("case-open.webp")} alt="The SENTIRE case, open" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[9px] object-cover" draggable={false} />
              <figcaption className="px-1.5 pb-1 pt-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#161416]/55">Extrait strength</p>
                <p className="mt-1 font-serif text-[1.9rem] font-light leading-none" style={{ color: scent.deep }}>
                  35%+
                </p>
                <p className="mt-1 text-[11.5px] text-[#161416]/60">perfume oil</p>
              </figcaption>
            </motion.figure>
            <motion.figure variants={rise} className="mb-10 w-[176px] overflow-hidden rounded-[14px] border border-white/70 bg-gradient-to-b from-white/75 to-white/45 p-2 shadow-[0_24px_50px_-28px_rgba(40,20,30,0.5)]" style={{ rotateX: cardRX, rotateY: cardRY, transformPerspective: 900 }}>
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[9px]" style={{ background: `radial-gradient(closest-side, #ffffff, ${scent.tint})` }}>
                <img src={`/assets/hero3d/${scent.id}.webp`} alt="" loading="lazy" decoding="async" className="h-[88%] w-auto object-contain" draggable={false} />
              </div>
              <figcaption className="px-1.5 pb-1 pt-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#161416]/55">{name}</p>
                <p className="mt-1 font-serif text-[1.9rem] font-light leading-none" style={{ color: scent.deep }}>
                  {price ? `₹${price[1].toLocaleString("en-IN")}` : "—"}
                </p>
                <p className="mt-1 text-[11.5px] text-[#161416]/60">{price ? `${price[0]}ml` : "extrait de parfum"}</p>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </motion.div>
      </motion.div>

      {/* drops of the spray that reached you, on the glass */}
      {lens && !reduce && (
        <div key={lens.key} aria-hidden className="pointer-events-none absolute inset-0 z-[6]">
          {lens.drops.map((d, i) => (
            <motion.span
              key={i}
              className="absolute block"
              style={{
                left: d.x - d.r,
                top: d.y - d.r,
                width: d.r * 2,
                height: d.r * 2.12,
                borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
                backdropFilter: "blur(0.8px) brightness(1.12)",
                WebkitBackdropFilter: "blur(0.8px) brightness(1.12)",
                background: `radial-gradient(circle at 34% 27%, rgba(255,255,255,0.95) 0 9%, rgba(255,255,255,0) 18%), radial-gradient(ellipse at 55% 80%, rgba(255,255,255,0.5), rgba(255,255,255,0) 48%), radial-gradient(circle at 50% 46%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.35) 100%)`,
                boxShadow: `inset 0 ${-d.r * 0.22}px ${d.r * 0.3}px rgba(40,20,30,0.14), inset 0 ${d.r * 0.18}px ${d.r * 0.3}px rgba(255,255,255,0.7), 0 ${d.r * 0.16}px ${d.r * 0.26}px rgba(40,20,30,0.1)`,
              }}
              initial={{ opacity: 0, scale: 0.2, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.2, 1.18, 1, 1],
                y: [0, 0, d.slide * 0.3, d.slide],
                transition: { duration: 2.9, delay: d.delay, times: [0, 0.05, 0.55, 1], ease: "easeOut" },
              }}
              onAnimationComplete={i === 0 ? () => window.setTimeout(() => setLens((l) => (l?.key === lens.key ? null : l)), 900) : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
