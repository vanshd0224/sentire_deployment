import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DISCOVERY_FRAGRANCES, displayName } from "./data";
import { EASE_OUT_EXPO } from "../motion";

/**
 * "Twelve hours in four seconds." Press and hold a vial: it sprays, and a
 * clock runs the fragrance through its day on skin — opening, heart,
 * drydown — while its notes drift up out of the mist.
 *
 * Cost: the mist is a small canvas that only draws while you hold or while
 * the last particles fade; the clock is one rAF loop that runs only while
 * held. Nothing animates when you're not touching it.
 */

const HOLD_MS = 4200; // time to fast-forward twelve hours
const STAGES = [
  { key: "top", label: "Opening", from: 0, to: 0.33, hours: "0–1 h" },
  { key: "heart", label: "Heart", from: 0.33, to: 0.7, hours: "1–5 h" },
  { key: "base", label: "Drydown", from: 0.7, to: 1.01, hours: "5–12 h" },
] as const;

// A real atomiser doesn't stream: each pump throws a short, fast cone of
// fine droplets that brake hard in the air, and leaves a soft cloud behind
// that hangs, spreads and drifts up. So the mist is two populations — spray
// (tiny, quick, gone in half a second) and haze (big, faint, slow) — fired
// in pulses while the vial is held.
type Droplet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
  a: number;
};
type Haze = Droplet & { grow: number; seed: number };

const PUMP_MS = 430; // one press of the pump
const BURST_MS = 170; // how long each press actually sprays
const AIM = -0.1; // radians; nozzle points slightly up and to the right
const CONE = 0.24; // half-angle of the spray cone
const MAX_DROPS = 700;
const MAX_HAZE = 70;

// One soft sprite, drawn once, stamped for every haze puff (far cheaper
// than a radial gradient per particle per frame).
let sprite: HTMLCanvasElement | null = null;
function hazeSprite() {
  if (sprite) return sprite;
  sprite = document.createElement("canvas");
  sprite.width = sprite.height = 128;
  const g = sprite.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.15)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return sprite;
}

function tone(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.round(((n >> 16) & 255) * k)}, ${Math.round(((n >> 8) & 255) * k)}, ${Math.round((n & 255) * k)})`;
}

export default function SprayTest({ startIndex = 0 }: { startIndex?: number }) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0); // 0 → 1 across the twelve hours
  const [holding, setHolding] = useState(false);
  const f = DISCOVERY_FRAGRANCES[index];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drops = useRef<Droplet[]>([]);
  const haze = useRef<Haze[]>([]);
  const heldFor = useRef(0); // ms since the finger went down
  const flash = useRef(0); // nozzle flash, 1 → 0
  const raf = useRef(0);
  const last = useRef(0);
  const held = useRef(false);
  const prog = useRef(0);

  const stage =
    STAGES.find((s) => progress >= s.from && progress < s.to) ?? STAGES[2];
  const notes = { top: f.topNotes, heart: f.heartNotes, base: f.baseNotes }[
    stage.key
  ];
  const hour = Math.min(12, Math.floor(progress * 12));

  const loop = useCallback((now: number) => {
    const dt = Math.min(50, now - (last.current || now));
    last.current = now;

    if (held.current && prog.current < 1) {
      prog.current = Math.min(1, prog.current + dt / HOLD_MS);
      setProgress(prog.current);
    }

    // Mist
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      const w = c.width;
      const h = c.height;
      const u = w / 360; // one CSS-ish unit at this canvas size
      const k = dt / 16.67; // frame step relative to 60fps
      const nx = w * 0.53;
      const ny = h * 0.13;

      if (held.current) {
        const before = heldFor.current;
        heldFor.current += dt;
        const phase = heldFor.current % PUMP_MS;
        if (
          Math.floor(before / PUMP_MS) !==
            Math.floor(heldFor.current / PUMP_MS) ||
          before === 0
        )
          flash.current = 1;
        if (phase < BURST_MS && drops.current.length < MAX_DROPS) {
          // Strongest at the start of the stroke, tailing off.
          const strength = 1 - phase / BURST_MS;
          const n = Math.round((10 + 26 * strength) * k);
          for (let i = 0; i < n; i++) {
            // Gaussian-ish angle: most droplets near the axis
            const ang =
              AIM +
              ((Math.random() + Math.random() + Math.random()) / 1.5 - 1) *
                CONE;
            const sp = (7 + Math.random() * 9) * u * (0.55 + 0.45 * strength);
            drops.current.push({
              x: nx + Math.random() * 2 * u,
              y: ny + (Math.random() - 0.5) * 2 * u,
              vx: Math.cos(ang) * sp,
              vy: Math.sin(ang) * sp,
              r: (0.35 + Math.random() ** 3 * 1.4) * u,
              life: 0,
              max: 22 + Math.random() * 26,
              a: 0.35 + Math.random() * 0.45,
            });
          }
          if (haze.current.length < MAX_HAZE && Math.random() < 0.9 * k) {
            const ang = AIM + (Math.random() - 0.5) * CONE * 1.4;
            const sp = (3.5 + Math.random() * 4) * u;
            haze.current.push({
              x: nx + 10 * u,
              y: ny,
              vx: Math.cos(ang) * sp,
              vy: Math.sin(ang) * sp,
              r: (10 + Math.random() * 12) * u,
              grow: (0.5 + Math.random() * 0.6) * u,
              life: 0,
              max: 110 + Math.random() * 70,
              a: 0.12 + Math.random() * 0.1,
              seed: Math.random() * 6.28,
            });
          }
        }
      }

      ctx.clearRect(0, 0, w, h);

      // Haze: slow, spreading, rising, wobbling
      const img = hazeSprite();
      const hz = haze.current;
      for (let i = hz.length - 1; i >= 0; i--) {
        const p = hz[i];
        p.life += k;
        if (p.life >= p.max) {
          hz[i] = hz[hz.length - 1];
          hz.pop();
          continue;
        }
        const drag = Math.pow(0.955, k);
        p.vx *= drag;
        p.vy = p.vy * drag - 0.018 * u * k; // warm air lifts it
        p.x += (p.vx + Math.sin(p.life * 0.05 + p.seed) * 0.25 * u) * k;
        p.y += p.vy * k;
        p.r += p.grow * k * (1 - p.life / p.max);
        const t = p.life / p.max;
        // fade in quickly, out slowly
        ctx.globalAlpha = p.a * Math.min(1, t * 8) * (1 - t) * (1 - t);
        ctx.drawImage(img, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }

      // Droplets: fast, braking hard, falling a touch as they slow
      ctx.fillStyle = "#fff";
      const dr = drops.current;
      const drag = Math.pow(0.935, k);
      for (let i = dr.length - 1; i >= 0; i--) {
        const p = dr[i];
        p.life += k;
        if (p.life >= p.max) {
          dr[i] = dr[dr.length - 1];
          dr.pop();
          continue;
        }
        p.vx *= drag;
        p.vy = p.vy * drag + 0.03 * u * k;
        p.x += p.vx * k;
        p.y += p.vy * k;
        const t = p.life / p.max;
        ctx.globalAlpha = p.a * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }

      // Nozzle flash: a dense white bloom right at the tip on each press
      if (flash.current > 0.01) {
        ctx.globalAlpha = 0.5 * flash.current;
        const r = 14 * u;
        ctx.drawImage(img, nx - r * 0.4, ny - r * 0.55, r * 1.8, r * 1.1);
        flash.current *= Math.pow(0.8, k);
      }
      ctx.globalAlpha = 1;
    }

    if (held.current || drops.current.length || haze.current.length)
      raf.current = requestAnimationFrame(loop);
    else last.current = 0;
  }, []);

  const start = () => {
    if (prog.current >= 1) {
      prog.current = 0;
      setProgress(0);
    }
    held.current = true;
    heldFor.current = 0;
    setHolding(true);
    cancelAnimationFrame(raf.current);
    last.current = 0;
    raf.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    held.current = false;
    setHolding(false);
  };

  // Size the canvas to its box at device resolution (capped at 2x).
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = c.getBoundingClientRect();
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const pick = (i: number) => {
    stop();
    prog.current = 0;
    setProgress(0);
    setIndex(i);
  };

  return (
    <section
      className="relative overflow-hidden py-20 text-paper transition-colors duration-700 md:py-28"
      style={{ backgroundColor: tone(f.colorHex, 0.32 + progress * 0.1) }}
      aria-label="Spray test"
    >
      <div className="ed-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-serif">Hold to spray</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/70">
              Press and hold a vial to see how it changes on skin, from the
              first hour to the twelfth. What you smell leaving the house is not
              what you smell coming home.
            </p>
          </div>
          {/* Twelve-hour dial */}
          <div className="flex items-center gap-4" aria-live="polite">
            <svg
              viewBox="0 0 100 100"
              className="h-20 w-20 -rotate-90 md:h-24 md:w-24"
              aria-hidden
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(242, 242, 240,0.15)"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--color-print)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - progress)}
              />
            </svg>
            <div>
              <p className="font-serif text-[2.6rem] leading-none tabular-nums">
                {hour}h
              </p>
              <p className="font-mono text-[11px] max-sm:text-[12px] uppercase text-paper/55">
                on skin
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* The vial you hold */}
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              <motion.button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  start();
                }}
                onPointerUp={stop}
                onPointerLeave={stop}
                onPointerCancel={stop}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={(e) =>
                  (e.key === " " || e.key === "Enter") && !holding && start()
                }
                onKeyUp={stop}
                className="relative block h-full w-full cursor-pointer touch-none select-none overflow-hidden rounded-[2px]"
                animate={{ scale: holding ? 0.97 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-label={`Hold to spray ${displayName(f.name)}`}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={f.id}
                    src={f.img}
                    alt={`${displayName(f.name)} 6ML travel spray`}
                    draggable={false}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  />
                </AnimatePresence>
                <canvas
                  ref={canvasRef}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-center font-mono text-[11px] max-sm:text-[12px] uppercase text-paper/85">
                  {progress >= 1
                    ? "Hold again to replay"
                    : holding
                      ? "Spraying…"
                      : "Press & hold"}
                </span>
              </motion.button>
            </div>

            {/* Choose a vial */}
            <div
              className="mx-auto mt-5 grid max-w-[360px] grid-cols-6 gap-2"
              role="tablist"
              aria-label="Choose a fragrance"
            >
              {DISCOVERY_FRAGRANCES.map((v, i) => (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={displayName(v.name)}
                  onClick={() => pick(i)}
                  className={`aspect-square cursor-pointer overflow-hidden rounded-[2px] transition-opacity ${
                    i === index
                      ? "opacity-100 ring-2 ring-[color:var(--color-print)]"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={v.img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* What you'd smell right now */}
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] max-sm:text-[12px] uppercase text-paper/55">
              {displayName(f.name)}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {STAGES.map((s) => {
                const fill = Math.max(
                  0,
                  Math.min(1, (progress - s.from) / (s.to - s.from)),
                );
                const on = s.key === stage.key && progress > 0;
                return (
                  <div key={s.key}>
                    <div className="h-1 overflow-hidden rounded-full bg-paper/15">
                      <div
                        className="h-full origin-left bg-[color:var(--color-print)]"
                        style={{ transform: `scaleX(${fill})` }}
                      />
                    </div>
                    <p
                      className={`mt-2 font-mono text-[11px] max-sm:text-[12px] uppercase ${on ? "text-paper" : "text-paper/45"}`}
                    >
                      {s.label}
                    </p>
                    <p className="text-[12px] text-paper/40">{s.hours}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${f.id}-${stage.key}-${progress > 0}`}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                >
                  {progress === 0 ? (
                    <p className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.05]">
                      Hold the vial to begin.
                    </p>
                  ) : (
                    <>
                      <p className="font-mono text-[11px] max-sm:text-[12px] uppercase text-[color:var(--color-print)]">
                        {stage.label} · {stage.hours}
                      </p>
                      <p className="mt-3 font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.02]">
                        {notes}
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {progress >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/75"
                >
                  {f.longevity} on skin · {f.sillage}. Best worn: {f.bestTime}.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
