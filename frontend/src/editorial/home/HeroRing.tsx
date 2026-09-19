import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import { EASE_OUT_EXPO, usePrefersReducedMotion } from "../motion";

/**
 * Home hero: the five bottles standing in a ring in 3D space, cut out of
 * the studio photographs. Each bottle keeps turning towards you as it goes
 * round, and as it passes behind the ring it turns its back: the label
 * gives way to the gold PC, the way a real bottle would.
 *
 * The bottle facing you colours the room with its juice, writes its name
 * behind the ring, and flips the little mood card to its campaign scene.
 * Drag or swipe to spin it; scrolling tilts the ring into perspective.
 *
 * Budget: plain CSS 3D transforms on ten images, driven by one rAF loop
 * that sleeps when the hero is off screen or idle. No WebGL.
 */

type Look = {
  id: string;
  glow: string; // juice colour, used for the room light
  deep: string; // darker tone for the big name
};

const LOOKS: Look[] = [
  { id: "mirai", glow: "#d8323b", deep: "#6e0c14" },
  { id: "herrlich", glow: "#f0a24a", deep: "#8a4210" },
  { id: "white-oud", glow: "#e8d894", deep: "#6d5f2a" },
  { id: "seductive", glow: "#e7dc8a", deep: "#5f5a22" },
  { id: "0809", glow: "#dcd67c", deep: "#4f4c1c" },
];

const N = LOOKS.length;
const STEP = 360 / N;
const DWELL_MS = 3400;

const BOTTLES = LOOKS.map((l) => {
  const p = ALL_PERFUMES.find((x) => x.id === l.id) as PerfumeProduct;
  const src = (side: "front" | "back") => ({
    src: `/images/bottles/${l.id}-${side}-lg.webp`,
    srcSet: `/images/bottles/${l.id}-${side}-sm.webp 300w, /images/bottles/${l.id}-${side}-lg.webp 485w`,
  });
  return {
    ...l,
    product: p,
    name: p?.name ?? l.id,
    notes: p?.traces.slice(0, 3).join(" · ") ?? "",
    price: p ? (p.prices[50] ?? Object.values(p.prices)[0]) : 0,
    front: src("front"),
    back: src("back"),
    mood: `/images/bottles/${l.id}-mood.webp`,
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

/** Index of the bottle facing the viewer for a ring angle (degrees). */
function frontIndex(angle: number) {
  const k = Math.round(-angle / STEP);
  return ((k % N) + N) % N;
}

export default function HeroRing({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: any) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [active, setActive] = useState(0);
  const b = BOTTLES[active];

  const sectionRef = useRef<HTMLElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ring state, outside React so the loop never re-renders the tree
  const s = useRef({
    angle: 0, // current (deg)
    target: 0, // where it's heading
    vel: 0,
    dragging: false,
    lastX: 0,
    lastMove: 0,
    idleSince: performance.now(),
    tilt: -6, // deg, driven by scroll
    lift: 0, // px, driven by scroll
    visible: true,
    raf: 0,
    running: false,
    timer: 0,
  });

  const R = mobile ? 172 : 360;
  const W = mobile ? 132 : 232;

  // Scroll: tilt the ring back and lift it as the hero leaves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // no automatic turn while the page is being scrolled
    const st = s.current;
    st.idleSince = performance.now();
    if (!st.running && !st.dragging) scheduleNext();
    // phones skip the tilt: re-tilting ten 3D images on every scroll frame
    // is the one thing here a mid-range phone notices
    if (mobile || reduced) return;
    s.current.tilt = -6 + p * 30;
    s.current.lift = -p * 120;
    kick();
  });

  function render() {
    const st = s.current;
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `translate3d(0, ${st.lift}px, ${-R}px) rotateX(${st.tilt}deg) rotateY(${st.angle}deg)`;
    // bottles fade a little as they go round the back
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const a = ((((i * STEP + st.angle) % 360) + 540) % 360) - 180; // -180..180, 0 = front
      const abs = Math.abs(a);
      // turn most of the way back towards the viewer, so side bottles
      // read as bottles rather than slivers
      el.style.transform = `rotateY(${i * STEP}deg) translateZ(${R}px) rotateY(${-(a * 0.72)}deg)`;
      const depth = (Math.cos((a * Math.PI) / 180) + 1) / 2; // 1 front, 0 back
      el.style.opacity = String(0.3 + 0.7 * depth);
      // past the sides it shows its back: label -> gold PC
      const t = Math.min(1, Math.max(0, (abs - 95) / 55));
      const back = t * t * (3 - 2 * t);
      const [fr, bk] = Array.from(el.children) as HTMLElement[];
      if (fr) fr.style.opacity = String(1 - back);
      if (bk) bk.style.opacity = String(back);
    }
    const f = frontIndex(st.angle);
    setActive((prev) => (prev === f ? prev : f));
  }

  // After a bottle settles the loop stops; a timer wakes it for the next.
  function scheduleNext() {
    const st = s.current;
    window.clearTimeout(st.timer);
    if (reduced || !st.visible) return;
    const wait = Math.max(200, st.idleSince + DWELL_MS - performance.now());
    st.timer = window.setTimeout(() => {
      if (st.dragging || !st.visible) return;
      st.target -= STEP;
      st.idleSince = performance.now();
      kick();
    }, wait);
  }

  function tick() {
    const st = s.current;
    if (!st.dragging) {
      // critically damped spring toward the target
      st.vel = st.vel * 0.78 + (st.target - st.angle) * 0.075;
      st.angle += st.vel;
    }
    render();
    const settled =
      !st.dragging &&
      Math.abs(st.target - st.angle) < 0.02 &&
      Math.abs(st.vel) < 0.02;
    if (settled) {
      st.angle = st.target;
      render();
      st.running = false;
      scheduleNext();
    } else if (st.visible) {
      st.raf = requestAnimationFrame(tick);
    } else {
      st.running = false;
    }
  }

  function kick() {
    const st = s.current;
    if (st.running || !st.visible) {
      if (!st.running) render();
      return;
    }
    window.clearTimeout(st.timer);
    st.running = true;
    st.raf = requestAnimationFrame(tick);
  }

  // run only while on screen and the tab is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const st = s.current;
    const io = new IntersectionObserver(([e]) => {
      st.visible = e.isIntersecting && !document.hidden;
      if (st.visible) {
        st.idleSince = performance.now();
        kick();
      }
    });
    io.observe(el);
    const vis = () => {
      st.visible = !document.hidden;
      if (st.visible) kick();
    };
    document.addEventListener("visibilitychange", vis);
    kick();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
      cancelAnimationFrame(st.raf);
      window.clearTimeout(st.timer);
      st.running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [R]);

  const goTo = (i: number) => {
    const st = s.current;
    // shortest way round to bottle i
    const cur = frontIndex(st.angle);
    let d = i - cur;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    st.target = (Math.round(st.angle / STEP) - d) * STEP;
    st.idleSince = performance.now() + 4000; // linger after a choice
    kick();
  };
  const step = (d: number) => goTo((active + d + N) % N);

  // drag / swipe
  const onDown = (e: React.PointerEvent) => {
    const st = s.current;
    st.dragging = true;
    st.lastX = e.clientX;
    st.lastMove = performance.now();
    st.vel = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    kick();
  };
  const onMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    const now = performance.now();
    const dt = Math.max(1, now - st.lastMove);
    st.lastMove = now;
    const deg = dx * (mobile ? 0.55 : 0.32);
    st.angle += deg;
    st.vel = (deg / dt) * 16;
  };
  const onUp = () => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    // throw: carry the flick, then settle on the nearest bottle
    const thrown = st.angle + st.vel * 9;
    st.target = Math.round(thrown / STEP) * STEP;
    st.vel = 0;
    st.idleSince = performance.now() + 3000;
    kick();
  };

  const shop = () =>
    b.product && onSelectProduct
      ? onSelectProduct(b.product)
      : onNavigate?.("perfumes");

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full overflow-hidden bg-[#f3efe9] text-ink"
      aria-label="The Sentire fragrances"
    >
      <h1 className="sr-only">Sentire by PC — extrait de parfum</h1>

      {/* the room takes the colour of the bottle facing you */}
      {/* One small glow per bottle, scaled up by the GPU and cross-faded:
          no large repaints when the colour changes. */}
      {BOTTLES.map((bt, i) => (
        <div
          key={bt.id}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] h-[120px] w-[140px] transition-opacity duration-[1100ms] will-change-[opacity]"
          style={{
            background: `radial-gradient(closest-side, ${bt.glow}, transparent)`,
            transform: "translate(-50%, -50%) scale(9)",
            opacity: i === active ? 0.5 : 0,
          }}
        />
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(243,239,233,0), #ece6de 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 pt-8 md:px-10 lg:h-[max(720px,calc(100svh-126px))] lg:px-12 lg:pt-10">
        {/* ── top line ── */}
        <div className="relative z-20 flex items-start justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">
              Sentire by PC — Extrait de parfum 35%+
            </p>
            <p
              className="mt-2 text-[clamp(1.9rem,3.2vw,3rem)] leading-[0.95]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Crafted <em className="text-[#6b1422]">beyond</em> time.
            </p>
          </motion.div>

          {/* mood card: flips to the scene of the bottle facing you */}
          <div className="hidden lg:block" style={{ perspective: 900 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={b.id}
                className="w-[210px] overflow-hidden rounded-[3px] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              >
                <img
                  src={b.mood}
                  alt={`${b.name} campaign`}
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="flex justify-between px-1 pb-0.5 pt-1.5 font-mono text-[10px] uppercase text-ink/55">
                  <span>The mood</span>
                  <span>{b.name}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* ── stage ── */}
        <div
          className="relative -mx-5 h-[470px] cursor-grab select-none active:cursor-grabbing md:-mx-10 lg:mx-0 lg:h-auto lg:flex-1"
          style={{ touchAction: "pan-y" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onLostPointerCapture={onUp}
          data-cursor="Drag"
          aria-hidden
        >
          {/* the name, huge, behind the ring */}
          <div className="pointer-events-none absolute inset-x-0 top-[2%] flex justify-center lg:top-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={b.id}
                className="whitespace-nowrap font-serif uppercase leading-[0.85] transition-colors duration-700"
                style={{
                  fontSize: mobile
                    ? "clamp(2.2rem, 11.5vw, 4.2rem)"
                    : "clamp(4.5rem, 10.5vw, 10.5rem)",
                  color: b.deep,
                }}
                initial="in"
                animate="show"
                exit="out"
              >
                {Array.from(b.name).map((ch, k) => (
                  <motion.span
                    key={k}
                    className="inline-block"
                    variants={{
                      in: { y: "70%", opacity: 0 },
                      show: {
                        y: "0%",
                        opacity: 0.92,
                        transition: {
                          duration: 0.8,
                          delay: 0.05 + k * 0.035,
                          ease: EASE_OUT_EXPO,
                        },
                      },
                      out: {
                        y: "-40%",
                        opacity: 0,
                        transition: { duration: 0.35, delay: k * 0.015 },
                      },
                    }}
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* the ring */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: mobile ? 900 : 1500,
              perspectiveOrigin: "50% 38%",
            }}
          >
            <div
              ref={ringRef}
              className="relative"
              style={{
                width: W,
                height: W / 0.54,
                transformStyle: "preserve-3d",
                marginTop: mobile ? 70 : 110,
              }}
            >
              {BOTTLES.map((bt, i) => (
                <div
                  key={bt.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{
                    transform: `rotateY(${i * STEP}deg) translateZ(${R}px)`,
                  }}
                >
                  <img
                    {...bt.front}
                    sizes={mobile ? "132px" : "232px"}
                    alt=""
                    draggable={false}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "auto"}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                  <img
                    {...bt.back}
                    sizes={mobile ? "132px" : "232px"}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain"
                    style={{ opacity: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── bottom line ── */}
        <div className="relative z-20 flex flex-col gap-6 pb-10 pt-4 lg:flex-row lg:items-end lg:justify-between lg:pb-10 lg:pt-0">
          <div className="min-h-[7.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[11px] uppercase text-ink/50 max-sm:text-[12px]">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(N).padStart(2, "0")} · {b.notes}
                </p>
                <p className="mt-1 text-[15px] tabular-nums text-ink/80">
                  {b.name} · 50ML · ₹{b.price.toLocaleString("en-IN")}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={shop}
                className="cursor-pointer bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-[#6b1422]"
              >
                Shop {b.name}
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("discovery-set")}
                className="group cursor-pointer text-[13px] font-medium text-ink"
              >
                <span className="border-b border-ink/30 pb-1 group-hover:border-ink">
                  Discovery Set, ₹549
                </span>
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* pick a bottle */}
          <div className="flex flex-col gap-2 lg:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45 max-sm:text-[12px]">
              Drag the bottles to spin them
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous bottle"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper"
              >
                ←
              </button>
              <div
                className="flex flex-wrap gap-1.5"
                role="tablist"
                aria-label="Fragrances"
              >
                {BOTTLES.map((bt, i) => (
                  <button
                    key={bt.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => goTo(i)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                      i === active
                        ? "bg-ink text-paper"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {bt.name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next bottle"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
