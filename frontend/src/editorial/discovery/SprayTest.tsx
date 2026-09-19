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

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
};

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
  const particles = useRef<Particle[]>([]);
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
      if (held.current) {
        // An atomiser fires sideways from the nozzle in a widening cone.
        for (let i = 0; i < 4; i++) {
          particles.current.push({
            x: w * 0.53,
            y: h * 0.13,
            vx: (2.4 + Math.random() * 3.2) * (w / 360),
            vy: (-0.7 + Math.random() * 1.4) * (w / 360),
            r: (3 + Math.random() * 6) * (w / 360),
            life: 0,
            max: 45 + Math.random() * 40,
          });
        }
        if (particles.current.length > 160)
          particles.current.splice(0, particles.current.length - 160);
      }
      ctx.clearRect(0, 0, w, h);
      particles.current = particles.current.filter((p) => p.life < p.max);
      for (const p of particles.current) {
        p.life += dt / 16;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vx *= 0.965;
        p.vy -= 0.012;
        p.r += 0.9 * (w / 360);
        const a = 0.16 * (1 - p.life / p.max);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(255,255,255,${a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (held.current || particles.current.length)
      raf.current = requestAnimationFrame(loop);
    else last.current = 0;
  }, []);

  const start = () => {
    if (prog.current >= 1) {
      prog.current = 0;
      setProgress(0);
    }
    held.current = true;
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
                stroke="rgba(244,242,238,0.15)"
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
              <p className="font-mono text-[11px] uppercase text-paper/55">
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
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-center font-mono text-[11px] uppercase text-paper/85">
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
            <p className="font-mono text-[11px] uppercase text-paper/55">
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
                      className={`mt-2 font-mono text-[11px] uppercase ${on ? "text-paper" : "text-paper/45"}`}
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
                      <p className="font-mono text-[11px] uppercase text-[color:var(--color-print)]">
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
