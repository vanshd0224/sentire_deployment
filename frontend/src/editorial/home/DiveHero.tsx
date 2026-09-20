import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import {
  EASE_OUT_EXPO,
  useMotionBudget,
  usePrefersReducedMotion,
} from "../motion";

/**
 * Home hero: "Come close." — the line printed on the Sentire box.
 *
 * One bottle stands in the light. Scroll, and the camera walks up to it and
 * through the label; the room turns into the juice itself, bubbles rising,
 * and you fly through the fragrance's notes — the words and its campaign
 * scenes hanging at different depths in real 3D space — until you surface
 * at the name, the price and the way to buy it. Pick a different bottle
 * and you dive into that one instead.
 *
 * Budget: one pinned stage, CSS 3D transforms only (the whole tunnel moves
 * as a single layer along z), bubbles on CSS keyframes. Nothing runs when
 * the page isn't scrolling except the bottle's slow float.
 */

type Dive = { id: string; juice: string; deep: string };

const DIVES: Dive[] = [
  { id: "mirai", juice: "#c2141f", deep: "#2a0306" },
  { id: "herrlich", juice: "#e58a2a", deep: "#3a1804" },
  { id: "white-oud", juice: "#d8c071", deep: "#2c2410" },
  { id: "seductive", juice: "#d3bb4f", deep: "#2a240a" },
  { id: "0809", juice: "#c6c060", deep: "#23220b" },
];

const BOTTLES = DIVES.map((d) => {
  const p = ALL_PERFUMES.find((x) => x.id === d.id) as PerfumeProduct;
  return {
    ...d,
    product: p,
    name: p?.name ?? d.id,
    notes: p?.traces ?? [],
    price: p ? (p.prices[50] ?? Object.values(p.prices)[0]) : 0,
    bottle: `/images/bottles/${d.id}-front`,
    scenes: [1, 2, 3, 4].map((n) => `/images/bottles/${d.id}-scene-${n}.webp`),
  };
});

function useIsMobile() {
  const [m, setM] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const u = () => setM(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  return m;
}

// Stable pseudo-random numbers, so the bubbles don't reshuffle on render.
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};


/**
 * Piecewise-linear map of a motion value, computed in JS. framer-motion 13
 * hands array-form scroll transforms of opacity to the browser's native
 * scroll timeline and gets partial ranges wrong (fades ran backwards), so
 * every scroll-driven value here goes through this instead.
 */
function lerpMap(v: number, i: number[], o: number[]) {
  if (v <= i[0]) return o[0];
  for (let k = 1; k < i.length; k++) {
    if (v <= i[k]) {
      const t = (v - i[k - 1]) / (i[k] - i[k - 1]);
      return o[k - 1] + (o[k] - o[k - 1]) * t;
    }
  }
  return o[o.length - 1];
}
function useMap(mv: MotionValue<number>, i: number[], o: number[]) {
  return useTransform(mv, (v) => lerpMap(v, i, o));
}

/* ── One thing hanging in the tunnel ─────────────────────────────── */

function TunnelItem({
  cam,
  z,
  x,
  y,
  rotate,
  spacing,
  near,
  children,
}: {
  cam: MotionValue<number>;
  z: number;
  x: string;
  y: string;
  rotate: number;
  spacing: number;
  near: number; // perspective distance: things fade before they reach you
  children: React.ReactNode;
}) {
  // where this item is relative to the camera
  const opacity = useTransform(cam, (c) => {
    const d = z + c; // < 0: ahead of you, > 0: passing you
    const fadeIn = Math.min(
      1,
      Math.max(0, (d + spacing * 3.2) / (spacing * 1.4)),
    );
    const fadeOut = Math.min(1, Math.max(0, (near * 0.72 - d) / (near * 0.4)));
    return fadeIn * fadeOut;
  });
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        z,
        rotate,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */

export default function DiveHero({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: any) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}) {
  const rich = useMotionBudget();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [pick, setPick] = useState(0);
  const b = BOTTLES[pick];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [hdr, setHdr] = useState(72);
  useEffect(() => {
    const h = document.querySelector("header");
    if (!h) return;
    const u = () => setHdr(h.getBoundingClientRect().height);
    u();
    const ro = new ResizeObserver(u);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);
  // which layer takes clicks: the intro before the dive, the outro after
  const [phase, setPhase] = useState<"intro" | "inside" | "out">("intro");
  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const SPACING = mobile ? 620 : 860;
  const NEAR = mobile ? 700 : 950;
  // words and scenes, interleaved: note, scene, note, scene …
  const items = b.notes.slice(0, 5).flatMap((note, i) => {
    const out: { kind: "note" | "scene"; value: string; n: number }[] = [
      { kind: "note", value: note, n: i },
    ];
    if (i < 4) out.push({ kind: "scene", value: b.scenes[i], n: i });
    return out;
  });
  const DEPTH = (items.length + 0.6) * SPACING;

  // ── timeline ──
  const introO = useMap(p, [0, 0.1], [1, 0]);
  const introY = useMap(p, [0, 0.12], [0, -60]);
  const bottleS = useMap(p, [0, 0.1, 0.27], [1, 1.6, 9]);
  const bottleO = useMap(p, [0.15, 0.23], [1, 0]);
  const worldO = useMap(p, [0.12, 0.24], [0, 1]);
  const cam = useMap(p, [0.26, 0.88], [0, DEPTH]);
  const tunnelO = useMap(p, [0.22, 0.3, 0.86, 0.92], [0, 1, 1, 0]);
  const outroO = useMap(p, [0.87, 0.95], [0, 1]);
  const outroY = useMap(p, [0.87, 0.97], [40, 0]);
  const hintO = useMap(p, [0, 0.05], [1, 0]);

  // depth readout: "23 / 50 ML"
  const mlRef = useRef<HTMLSpanElement | null>(null);
  useMotionValueEvent(p, "change", (v) => {
    const next = v < 0.08 ? "intro" : v > 0.88 ? "out" : "inside";
    setPhase((cur) => (cur === next ? cur : next));
    const ml = Math.round(Math.min(1, Math.max(0, (v - 0.26) / 0.62)) * 50);
    if (mlRef.current) mlRef.current.textContent = String(ml).padStart(2, "0");
  });

  // the bottle leans towards the pointer before you dive (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 80,
    damping: 16,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 80,
    damping: 16,
  });

  const shop = () =>
    b.product && onSelectProduct
      ? onSelectProduct(b.product)
      : onNavigate?.("perfumes");

  const skip = () => {
    const el = sectionRef.current;
    if (!el) return;
    const end =
      el.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
    window.scrollTo({ top: end, behavior: "smooth" });
  };

  const choose = (i: number) => {
    setPick(i);
    const el = sectionRef.current;
    // if you've already dived, start the new bottle from the top
    if (el && el.getBoundingClientRect().top < -40) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  const Picker = ({ light = false }: { light?: boolean }) => (
    <div
      className="flex flex-wrap gap-1.5"
      role="tablist"
      aria-label="Choose a bottle"
    >
      {BOTTLES.map((bt, i) => (
        <button
          key={bt.id}
          type="button"
          role="tab"
          aria-selected={i === pick}
          onClick={() => choose(i)}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full border py-1 pl-1 pr-3 text-[12px] transition-colors ${
            i === pick
              ? light
                ? "border-paper bg-paper text-ink"
                : "border-ink bg-ink text-paper"
              : light
                ? "border-paper/30 text-paper/80 hover:border-paper"
                : "border-ink/20 text-ink/70 hover:border-ink/50"
          }`}
        >
          <span
            className="h-4 w-4 rounded-full ring-1 ring-black/10"
            style={{
              background: `radial-gradient(circle at 35% 30%, #fff, ${bt.juice} 60%)`,
            }}
          />
          {bt.name}
        </button>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full bg-[#f3efe9]"
      style={{
        height: reduced
          ? `calc(100svh - ${hdr}px)`
          : mobile
            ? "300vh"
            : "360vh",
      }}
      aria-label="Come close: dive into a Sentire fragrance"
    >
      <div
        className="sticky w-full overflow-hidden"
        style={{ top: hdr, height: `calc(100svh - ${hdr}px)` }}
        onPointerMove={(e) => {
          if (!rich) return;
          mx.set(e.clientX / window.innerWidth - 0.5);
          my.set(e.clientY / window.innerHeight - 0.5);
        }}
      >
        {/* ── the studio ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[52%] h-[120px] w-[120px] transition-[background] duration-700"
          style={{
            background: `radial-gradient(closest-side, ${b.juice}, transparent)`,
            transform: "translate(-50%, -50%) scale(7)",
            opacity: 0.35,
          }}
        />

        {/* ── inside the juice ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: worldO,
            background: `radial-gradient(120% 90% at 50% 45%, ${b.juice} 0%, ${b.deep} 78%)`,
          }}
        >
          {!reduced &&
            Array.from({ length: mobile ? 16 : 28 }).map((_, i) => {
              const size = 3 + rnd(i, 1) * (mobile ? 12 : 18);
              return (
                <span
                  key={i}
                  className="dive-bubble absolute bottom-[-40px] rounded-full"
                  style={{
                    left: `${rnd(i, 2) * 100}%`,
                    width: size,
                    height: size,
                    animationDuration: `${7 + rnd(i, 3) * 9}s`,
                    animationDelay: `${-rnd(i, 4) * 14}s`,
                    opacity: 0.35 + rnd(i, 5) * 0.5,
                  }}
                />
              );
            })}
        </motion.div>

        {/* ── the tunnel of notes ── */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: tunnelO,
            perspective: NEAR,
            perspectiveOrigin: "50% 50%",
          }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0"
            style={{ z: cam, transformStyle: "preserve-3d" }}
          >
            {items.map((it, k) => {
              const side = k % 4 < 2 ? -1 : 1;
              const z = -(k + 1) * SPACING;
              if (it.kind === "note")
                return (
                  <TunnelItem
                    key={`${b.id}-n-${k}`}
                    cam={cam}
                    z={z}
                    x={`${side * (mobile ? 6 : 15)}vw`}
                    y={`${(rnd(k, 7) - 0.5) * 18}vh`}
                    rotate={(rnd(k, 8) - 0.5) * 6}
                    spacing={SPACING}
                    near={NEAR}
                  >
                    <div className="text-center text-paper">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 max-sm:text-[12px]">
                        Note {String(it.n + 1).padStart(2, "0")}
                      </p>
                      <p
                        className="mt-2 whitespace-nowrap leading-[0.9]"
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontStyle: "italic",
                          fontSize: mobile
                            ? "clamp(2.8rem, 15vw, 4.6rem)"
                            : "clamp(5rem, 9vw, 9.5rem)",
                          textShadow: "0 10px 40px rgba(0,0,0,0.35)",
                        }}
                      >
                        {it.value}
                      </p>
                    </div>
                  </TunnelItem>
                );
              return (
                <TunnelItem
                  key={`${b.id}-s-${k}`}
                  cam={cam}
                  z={z}
                  x={`${-side * (mobile ? 22 : 30)}vw`}
                  y={`${(rnd(k, 9) - 0.5) * 22}vh`}
                  rotate={(rnd(k, 10) - 0.5) * 10}
                  spacing={SPACING}
                  near={NEAR}
                >
                  <img
                    src={it.value}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="block rounded-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                    style={{
                      width: mobile ? 180 : 300,
                      aspectRatio: "4 / 5",
                      objectFit: "cover",
                    }}
                  />
                </TunnelItem>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── the bottle you walk into ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center pt-10"
          style={{ opacity: bottleO }}
        >
          <motion.div
            style={{
              scale: reduced ? 1 : bottleS,
              transformOrigin: "50% 60%",
              rotateX: rich ? rx : 0,
              rotateY: rich ? ry : 0,
              transformPerspective: 1200,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={b.id}
                src={`${b.bottle}-${mobile ? "lg" : "xl"}.webp`}
                alt={`${b.name} extrait de parfum, 50ml`}
                fetchPriority="high"
                decoding="async"
                className={`${reduced ? "" : "dive-float"} h-[54svh] w-auto select-none lg:h-[68svh]`}
                draggable={false}
                initial={{ opacity: 0, y: 30, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -20, rotate: 4 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── intro words ── */}
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-8 pt-8 md:px-10 lg:px-12 lg:pb-10 lg:pt-10"
          style={{
            opacity: introO,
            y: introY,
            pointerEvents: phase === "intro" ? "auto" : "none",
          }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <motion.p
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              >
                Sentire by PC — Extrait de parfum 35%+
              </motion.p>
              <h1
                className="mt-2 leading-[0.85] text-ink"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: mobile
                    ? "clamp(3.6rem, 19vw, 6rem)"
                    : "clamp(5rem, 10vw, 10.5rem)",
                }}
              >
                {["Come", "close."].map((w, k) => (
                  <span
                    key={w}
                    className="inline-block overflow-hidden pb-[0.08em] pr-[0.12em] align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      style={
                        k
                          ? { fontStyle: "italic", color: "#6b1422" }
                          : undefined
                      }
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 1.1,
                        delay: 0.1 + k * 0.12,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>
            <p className="hidden max-w-[16rem] pt-2 text-right text-[14px] leading-relaxed text-ink/60 lg:block">
              It&rsquo;s written on every Sentire box. Scroll, and step inside
              the bottle.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50 max-sm:text-[12px]">
                Choose a bottle to dive into
              </p>
              <Picker />
            </div>
            <motion.button
              type="button"
              onClick={skip}
              style={{ opacity: hintO }}
              className="group flex cursor-pointer items-center gap-3 self-start text-[13px] text-ink lg:self-auto"
            >
              <span className="relative h-10 w-6 rounded-full border border-ink/40">
                <span className="dive-wheel absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-ink" />
              </span>
              <span>
                Scroll to step inside
                <span className="block text-[11px] text-ink/45 group-hover:text-ink">
                  or skip the dive
                </span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* depth gauge, while you're inside */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-24 left-5 z-10 text-left font-mono text-[11px] uppercase text-paper/70 max-sm:text-[12px] lg:bottom-auto lg:left-auto lg:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:text-right"
          style={{ opacity: tunnelO }}
        >
          <p>Inside {b.name}</p>
          <p className="mt-1 text-[2rem] leading-none text-paper tabular-nums">
            <span ref={mlRef}>00</span>
            <span className="text-[12px] text-paper/60"> / 50 ML</span>
          </p>
        </motion.div>

        {/* ── surfacing ── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center text-paper"
          style={{
            opacity: outroO,
            y: outroY,
            pointerEvents: phase === "out" ? "auto" : "none",
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/65 max-sm:text-[12px]">
            You were inside
          </p>
          <p
            className="mt-2 font-serif uppercase leading-[0.85]"
            style={{
              fontSize: mobile
                ? "clamp(3rem, 16vw, 5rem)"
                : "clamp(5rem, 11vw, 11rem)",
            }}
          >
            {b.name}
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/80">
            {b.notes.join(" · ")}
          </p>
          <p className="mt-1 text-[15px] tabular-nums text-paper">
            50ML · ₹{b.price.toLocaleString("en-IN")}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={shop}
              className="cursor-pointer bg-paper px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white"
            >
              Shop {b.name}
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.("discovery-set")}
              className="cursor-pointer border-b border-paper/40 pb-1 text-[13px] text-paper hover:border-paper"
            >
              Try all six, ₹549 →
            </button>
          </div>
          <div className="mt-8">
            <p className="mb-2 font-mono text-[11px] uppercase text-paper/55 max-sm:text-[12px]">
              Dive into another
            </p>
            <Picker light />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
