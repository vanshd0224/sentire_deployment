import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import {
  EASE_OUT_EXPO,
  useMotionBudget,
  usePrefersReducedMotion,
} from "../motion";
import { Magnetic, Ticker } from "../discovery/fx";

/**
 * Home hero. "Perfume for ___" — the blank is an occasion, and each
 * occasion has its bottle. The bottles stand in a 3D fan of their own
 * studio films; only the one facing you plays. Swipe, drag, click a
 * neighbour, or leave it and it turns on its own.
 *
 * Budget: one <video> at a time, transforms only, pointer tilt and scroll
 * parallax on capable desktops only. The fan pauses when off screen.
 */

const OCCASIONS: { id: string; occasion: string; tint: string }[] = [
  { id: "purple-oud", occasion: "the wedding.", tint: "#6d3f8f" },
  { id: "midnight", occasion: "2 a.m. drives.", tint: "#7a2436" },
  { id: "calantha", occasion: "Sunday brunch.", tint: "#b98274" },
  { id: "personna", occasion: "first dates.", tint: "#b8607e" },
  { id: "seductive", occasion: "the boardroom.", tint: "#4f7394" },
  { id: "0809", occasion: "the afterparty.", tint: "#8a6a3c" },
  { id: "white-oud", occasion: "golden hour.", tint: "#a8843f" },
];

const TURN_MS = 5200;

type Slide = {
  id: string;
  occasion: string;
  tint: string;
  name: string;
  price: number;
  notes: string;
  video: string;
  poster: string;
  product: PerfumeProduct;
};

const SLIDES: Slide[] = OCCASIONS.flatMap((o) => {
  const p = ALL_PERFUMES.find((x) => x.id === o.id);
  if (!p) return [];
  return [
    {
      ...o,
      name: p.name,
      price: p.prices[50] ?? Object.values(p.prices)[0],
      notes: p.traces.slice(0, 3).join(" · "),
      video: `/videos/watch/${o.id}.mp4`,
      poster: `/images/home/reel-${o.id}.webp`,
      product: p,
    },
  ];
});

const NOTES = Array.from(
  new Set(SLIDES.flatMap((s) => s.product.traces.slice(0, 3))),
);

// Film grain, drawn once by the browser from a tiny SVG filter.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function wrap(d: number, n: number) {
  const m = ((d % n) + n) % n;
  return m > n / 2 ? m - n : m;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

/* ── First-visit curtain ─────────────────────────────────────────────── */

function useCurtain() {
  const reduced = usePrefersReducedMotion();
  const [show] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return false;
      if (sessionStorage.getItem("sentire-curtain")) return false;
      sessionStorage.setItem("sentire-curtain", "1");
      return true;
    } catch {
      return false;
    }
  });
  return show && !reduced;
}

function Curtain({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1000);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setOpen(false), 160);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100000] flex flex-col justify-between bg-[#0e0c0d] p-6 text-paper md:p-10"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <p className="font-mono text-[11px] uppercase text-paper/50">
            Extrait de parfum · 35%+
          </p>
          <div className="overflow-hidden">
            <motion.p
              className="font-serif text-[clamp(3.5rem,15vw,13rem)] uppercase leading-[0.82]"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            >
              Sentire
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-mono text-[11px] uppercase text-paper/50">
              By PC
            </p>
            <p className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-none tabular-nums">
              {String(count).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── The occasion line ───────────────────────────────────────────────── */

function Occasion({ text }: { text: string }) {
  return (
    <span className="relative block h-[1.08em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial="in"
          animate="show"
          exit="out"
        >
          {Array.from(text).map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ transformOrigin: "50% 100%" }}
              variants={{
                in: { y: "105%", rotateX: -80, opacity: 0 },
                show: {
                  y: "0%",
                  rotateX: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    delay: 0.12 + i * 0.022,
                    ease: EASE_OUT_EXPO,
                  },
                },
                out: {
                  y: "-105%",
                  opacity: 0,
                  transition: {
                    duration: 0.4,
                    delay: i * 0.012,
                    ease: [0.7, 0, 0.84, 0],
                  },
                },
              }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── One card in the fan ─────────────────────────────────────────────── */

function FanCard({
  slide,
  d,
  mobile,
  introDelay,
  onPick,
  onShop,
}: {
  slide: Slide;
  d: number;
  mobile: boolean;
  introDelay: number | null;
  onPick: () => void;
  onShop: () => void;
}) {
  const a = Math.abs(d);
  const front = d === 0;
  const W = mobile ? 208 : 272;
  const H = Math.round((W * 16) / 9);
  const spread = mobile ? 112 : 176;
  const hidden = a > (mobile ? 2 : 3);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: W,
        height: H,
        marginLeft: -W / 2,
        marginTop: -H / 2,
        zIndex: 30 - a,
        pointerEvents: hidden ? "none" : "auto",
      }}
      initial={
        introDelay !== null
          ? { x: 0, y: 160, z: -300, rotateY: 0, rotateZ: 0, opacity: 0 }
          : false
      }
      animate={{
        x: d * spread * (1 - a * 0.07),
        y: a * (mobile ? 10 : 22),
        z: -a * 150,
        rotateY: d * -24,
        rotateZ: d * 2.4,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 19,
        mass: 0.9,
        delay: introDelay !== null ? introDelay + a * 0.09 : 0,
      }}
    >
      <div
        role={front ? undefined : "button"}
        tabIndex={front || hidden ? -1 : 0}
        aria-label={front ? undefined : `Show ${slide.name}`}
        onClick={front ? undefined : onPick}
        onKeyDown={(e) => !front && e.key === "Enter" && onPick()}
        className={`relative h-full w-full overflow-hidden rounded-[3px] bg-black shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 ${front ? "" : "cursor-pointer"}`}
      >
        {front ? (
          <video
            key={slide.id}
            src={slide.video}
            poster={slide.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={slide.poster}
            alt=""
            draggable={false}
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
        {/* side cards sink into the dark */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#0e0c0d]"
          animate={{ opacity: front ? 0 : Math.min(0.72, 0.3 + a * 0.16) }}
          transition={{ duration: 0.5 }}
        />
        {/* sheen that slides across on arrival */}
        {front && (
          <motion.div
            key={`sheen-${slide.id}`}
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "0%" }}
            animate={{ x: "420%" }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.15 }}
          />
        )}
        <AnimatePresence>
          {front && (
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-16 text-paper"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
            >
              <p className="font-serif text-[20px] uppercase leading-none">
                {slide.name}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-paper/70">
                {slide.notes}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[14px] tabular-nums">
                  ₹{slide.price.toLocaleString("en-IN")}
                  <span className="ml-1 text-[11px] text-paper/50">50ML</span>
                </p>
                <button
                  type="button"
                  onClick={onShop}
                  className="cursor-pointer rounded-full bg-paper px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:bg-[#e7bcc3]"
                >
                  Shop →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

export default function HomeHero({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: any) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}) {
  const rich = useMotionBudget();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const curtain = useCurtain();
  const [ready, setReady] = useState(!curtain);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const slide = SLIDES[active];

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const dragged = useRef(false);

  // First paint: cards fly out of a stack once the curtain lifts.
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setIntro(false), 1600);
    return () => window.clearTimeout(t);
  }, [ready]);
  const base = curtain ? 0.05 : 0.25;

  const go = (i: number) => setActive(((i % n) + n) % n);

  // Turns on its own while visible, not hovered, and motion is allowed.
  useEffect(() => {
    if (!ready || paused || !inView || reduced) return;
    const t = window.setTimeout(() => go(active + 1), TURN_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, inView, reduced, ready]);

  // Pointer tilt and a glow that follows the cursor (capable desktops).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18 });
  const smy = useSpring(my, { stiffness: 90, damping: 18 });
  const tiltY = useTransform(smx, [-0.5, 0.5], [9, -9]);
  const tiltX = useTransform(smy, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(smx, [-0.5, 0.5], ["-18%", "18%"]);
  const glowY = useTransform(smy, [-0.5, 0.5], ["-14%", "14%"]);

  // Scroll-out: copy lifts away, fan sinks, the wordmark slides.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const copyO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fanY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fanS = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const markX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  const shop = () =>
    onSelectProduct ? onSelectProduct(slide.product) : onNavigate?.("perfumes");

  const headline = useMemo(() => Array.from("Perfume for"), []);

  return (
    <section
      ref={sectionRef}
      className="hero-section on-dark relative w-full overflow-hidden bg-[#0e0c0d] text-paper select-none"
      aria-label="Sentire fragrances"
      onPointerMove={(e) => {
        if (!rich) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {curtain && !ready && <Curtain onDone={() => setReady(true)} />}

      {/* Colour of the bottle facing you, bleeding into the room */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[-10%] h-[130%] w-[95%] transition-[color] duration-[1400ms] lg:-right-[8%] lg:w-[75%]"
        style={{
          color: slide.tint,
          background:
            "radial-gradient(closest-side, currentColor 0%, transparent 100%)",
          opacity: 0.55,
          x: rich ? glowX : 0,
          y: rich ? glowY : 0,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Wordmark, outlined, sliding as you leave */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute bottom-[3.2rem] left-0 whitespace-nowrap font-serif uppercase leading-[0.78] md:bottom-[3.6rem]"
        style={{
          x: rich ? markX : 0,
          fontSize: "clamp(6rem, 25vw, 27rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(242,242,240,0.075)",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: base + 0.4 }}
      >
        Sentire&nbsp;Sentire
      </motion.p>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-6 px-5 pb-24 pt-12 md:px-10 lg:min-h-[max(720px,calc(100svh-126px))] lg:grid-cols-12 lg:gap-4 lg:px-12 lg:pb-28 lg:pt-10">
        {/* ── Copy ── */}
        <motion.div
          className="relative z-10 lg:col-span-6"
          style={{ y: rich ? copyY : 0, opacity: rich ? copyO : 1 }}
        >
          <motion.p
            className="font-mono text-[11px] uppercase text-paper/60 max-sm:text-[12px]"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: base, ease: EASE_OUT_EXPO }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[#e7bcc3]" />
            Extrait de parfum · 35%+ concentration
          </motion.p>

          <h1 className="mt-5 leading-[0.9]">
            <span className="block overflow-hidden font-serif uppercase text-[clamp(2.6rem,6.4vw,6rem)]">
              {headline.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : {}}
                  transition={{
                    duration: 1,
                    delay: base + 0.1 + i * 0.03,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </span>
            <span
              className="mt-1 block text-[#e7bcc3] text-[clamp(3rem,7.6vw,7.2rem)]"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                perspective: 600,
              }}
            >
              {ready ? (
                <Occasion text={slide.occasion} />
              ) : (
                <span className="block h-[1.08em]" />
              )}
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-[30rem] text-[16px] leading-relaxed text-paper/70"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: base + 0.5,
              ease: EASE_OUT_EXPO,
            }}
          >
            Seven extraits, each made for a moment. Strong enough to be there
            from the first hello to the last dance. Not sure yet? Try six of
            them in the ₹549 Discovery Set.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: base + 0.62,
              ease: EASE_OUT_EXPO,
            }}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigate?.("perfumes")}
                className="group relative cursor-pointer overflow-hidden rounded-full bg-paper px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-[#e7bcc3] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative">Explore fragrances →</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigate?.("discovery-set")}
                className="cursor-pointer rounded-full border border-paper/30 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                Discovery Set · ₹549
              </button>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-10 grid max-w-[30rem] grid-cols-3 border-t border-paper/15 pt-5"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: base + 0.8 }}
          >
            {[
              { v: 35, s: "%+", l: "Perfume oil" },
              { v: 12, s: "h", l: "On skin, up to" },
              { v: 999, p: "₹", l: "Free shipping over" },
            ].map((x, i) => (
              <div
                key={x.l}
                className={`flex flex-col-reverse ${i ? "border-l border-paper/15 pl-4" : "pr-4"}`}
              >
                <dt className="mt-1.5 text-[12px] text-paper/55">{x.l}</dt>
                <dd className="font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-none">
                  <Ticker value={x.v} prefix={x.p ?? ""} suffix={x.s ?? ""} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── The fan ── */}
        <motion.div
          className="relative z-10 h-[440px] lg:col-span-6 lg:h-[640px]"
          style={{ y: rich ? fanY : 0, scale: rich ? fanS : 1 }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          data-cursor="Drag"
        >
          <motion.div
            className="absolute inset-0 touch-pan-y"
            style={{
              perspective: 1500,
              rotateX: rich ? tiltX : 0,
              rotateY: rich ? tiltY : 0,
              transformStyle: "preserve-3d",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -400) go(active + 1);
              else if (info.offset.x > 50 || info.velocity.x > 400)
                go(active - 1);
              window.setTimeout(() => (dragged.current = false), 60);
            }}
          >
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {ready &&
                SLIDES.map((s, i) => (
                  <FanCard
                    key={s.id}
                    slide={s}
                    d={wrap(i - active, n)}
                    mobile={mobile}
                    introDelay={intro ? base + 0.35 : null}
                    onPick={() => !dragged.current && go(i)}
                    onShop={() => !dragged.current && shop()}
                  />
                ))}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="absolute inset-x-0 -bottom-4 z-40 flex items-center justify-center gap-4 lg:bottom-0">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous fragrance"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              ←
            </button>
            <div className="w-28">
              <p className="text-center font-mono text-[11px] tabular-nums text-paper/70 max-sm:text-[12px]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(n).padStart(2, "0")}
              </p>
              <div className="mt-1.5 h-px overflow-hidden bg-paper/20">
                <div
                  key={active}
                  className="hero-turn h-full origin-left bg-[#e7bcc3]"
                  style={{
                    animationDuration: `${TURN_MS}ms`,
                    animationPlayState:
                      paused || !inView || !ready ? "paused" : "running",
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next fragrance"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Notes, running along the floor */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-paper/10 bg-[#0e0c0d]/70 py-3">
        <div
          className="flex w-max gap-8 whitespace-nowrap font-mono text-[11px] uppercase text-paper/55 max-sm:text-[12px]"
          style={{ animation: "edMarqueeL 60s linear infinite" }}
        >
          {[...NOTES, ...NOTES].map((note, i) => (
            <span key={i} className="flex items-center gap-8">
              {note}
              <span className="text-[#e7bcc3]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
