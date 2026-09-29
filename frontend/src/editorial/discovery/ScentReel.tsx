import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { DISCOVERY_FRAGRANCES, displayName } from "./data";
import { useMotionBudget } from "../motion";

type Fragrance = (typeof DISCOVERY_FRAGRANCES)[number];

/** Each fragrance's liquid colour, pushed dark so type stays legible on it. */
function tone(hex: string, k = 0.42) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k);
  const g = Math.round(((n >> 8) & 255) * k);
  const b = Math.round((n & 255) * k);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * The six, one at a time. On desktop the section pins and the fragrances
 * slide past sideways while the whole room changes to each one's colour.
 * Phones get the same sideways reel as a swipeable carousel that advances
 * on its own — native scroll-snap rather than a scroll-hijacked pin, which
 * is what keeps it smooth on a phone.
 */
export default function ScentReel({
  onPick,
}: {
  onPick?: (index: number) => void;
}) {
  const rich = useMotionBudget();
  return rich ? <PinnedReel onPick={onPick} /> : <SwipeReel onPick={onPick} />;
}

function PinnedReel({ onPick }: { onPick?: (index: number) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const n = DISCOVERY_FRAGRANCES.length;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  const x = useTransform(p, [0, 1], ["0vw", `-${(n - 1) * 100}vw`]);
  const bar = useTransform(p, [0, 1], [1 / n, 1]);

  return (
    <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="on-dark sticky top-0 h-screen overflow-hidden bg-ink text-paper">
        {/* One painted layer per fragrance, cross-faded — opacity only, so the
            room changes colour without repainting a full screen every frame. */}
        {DISCOVERY_FRAGRANCES.map((f, i) => (
          <RoomTone
            key={f.id}
            index={i}
            colour={tone(f.colorHex)}
            progress={p}
          />
        ))}
        <div className="ed-container absolute inset-x-0 top-0 z-20 flex items-center justify-between pt-24">
          <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/60">
            The six, one at a time
          </p>
          <div className="h-px w-40 overflow-hidden bg-paper/20">
            <motion.div
              className="h-full origin-left bg-paper"
              style={{ scaleX: bar }}
            />
          </div>
        </div>

        <motion.div
          className="relative flex h-full will-change-transform"
          style={{ x, width: `${n * 100}vw` }}
        >
          {DISCOVERY_FRAGRANCES.map((f, i) => (
            <Panel key={f.id} f={f} index={i} progress={p} onPick={onPick} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function RoomTone({
  index,
  colour,
  progress,
}: {
  index: number;
  colour: string;
  progress: MotionValue<number>;
}) {
  const n = DISCOVERY_FRAGRANCES.length;
  const c = index / (n - 1);
  const w = 1 / (n - 1);
  const opacity = useTransform(progress, [c - w, c, c + w], [0, 1, 0]);
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      style={{ backgroundColor: colour, opacity, willChange: "opacity" }}
    />
  );
}

function Panel({
  f,
  index,
  progress,
  onPick,
}: {
  f: Fragrance;
  index: number;
  progress: MotionValue<number>;
  onPick?: (index: number) => void;
}) {
  const n = DISCOVERY_FRAGRANCES.length;
  const centre = index / (n - 1);
  const span = 1 / (n - 1);
  // Local position: -1 (arriving from the right) → 0 (centred) → 1 (leaving).
  const local = useTransform(
    progress,
    [centre - span, centre, centre + span],
    [-1, 0, 1],
  );
  const imgRotate = useTransform(local, [-1, 0, 1], [-28, 0, 22]);
  const imgY = useTransform(local, [-1, 0, 1], ["14%", "0%", "-10%"]);
  const nameX = useTransform(local, [-1, 0, 1], ["22%", "0%", "-30%"]);
  const detailOpacity = useTransform(local, [-0.5, 0, 0.5], [0, 1, 0]);
  const number = useTransform(local, [-1, 0, 1], ["40%", "0%", "-40%"]);
  const shadow = useMotionTemplate`0 60px 90px -40px rgba(0,0,0,0.85)`;

  return (
    <section
      className="relative flex h-full w-screen shrink-0 items-center"
      aria-label={f.name}
    >
      {/* Oversized number behind everything */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute right-[4vw] top-1/2 -translate-y-1/2 font-serif font-light leading-none text-paper/[0.06]"
        style={{ y: number, fontSize: "clamp(14rem, 34vw, 36rem)" }}
      >
        0{index + 1}
      </motion.p>

      <div className="ed-container relative grid w-full grid-cols-12 items-center gap-10">
        <div
          className="col-span-5 flex justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.button
            type="button"
            onClick={() => onPick?.(index)}
            className="relative aspect-square w-[min(34vw,380px)] cursor-pointer overflow-hidden rounded-[2px]"
            style={{ rotateY: imgRotate, y: imgY, boxShadow: shadow }}
            aria-label={`Layer with ${f.name}`}
          >
            <img
              src={f.img}
              alt={`${f.name} 6ML travel spray`}
              loading="lazy"
              className="h-full w-full object-cover"
             width="600" height="600"/>
          </motion.button>
        </div>

        <div className="col-span-7">
          <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/60">
            No. 0{index + 1} · {f.familyBadge}
          </p>
          <motion.h3
            className="ds-reel-name mt-3 font-serif font-light leading-[0.9] tracking-[-0.04em]"
            style={{ x: nameX, fontSize: "clamp(4rem, 9vw, 9.5rem)" }}
          >
            {displayName(f.name)}
          </motion.h3>
          <motion.div style={{ opacity: detailOpacity }}>
            <p className="mt-4 max-w-lg font-serif text-2xl font-light italic text-paper/80">
              {f.tagline}.
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-6 border-t border-paper/20 pt-5">
              {[
                ["Opens with", f.topNotes],
                ["Settles into", f.heartNotes],
                ["Dries down to", f.baseNotes],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/50">
                    {k}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-snug text-paper/90">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/55">
              {f.longevity} · {f.sillage} · {f.bestTime}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/** How long each fragrance holds the screen before the next one takes it. */
const DWELL_MS = 2600;
/** After a swipe or a tap, give the reader a little longer on their pick. */
const DWELL_AFTER_TOUCH_MS = 5000;

const SPRING = { type: "spring", stiffness: 190, damping: 22, mass: 0.9 } as const;

/*
 * Every piece of a panel reads the travel direction (`custom`) so a forward
 * change and a backward swipe mirror each other. The parent only
 * orchestrates; each child owns its own enter / centre / exit.
 */
const panelVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const bottleVariants: Variants = {
  enter: (d: number) => ({
    x: d * 240,
    rotate: d * 24,
    rotateY: d * -70,
    scale: 0.55,
    opacity: 0,
  }),
  center: {
    x: 0,
    rotate: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    transition: SPRING,
  },
  exit: (d: number) => ({
    x: d * -240,
    rotate: d * -18,
    rotateY: d * 60,
    scale: 0.6,
    opacity: 0,
    transition: { duration: 0.34, ease: [0.55, 0, 0.9, 0.4] },
  }),
};

const rise: Variants = {
  enter: { y: 26, opacity: 0 },
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { y: -14, opacity: 0, transition: { duration: 0.22 } },
};

const letter: Variants = {
  enter: { y: "110%", rotate: 10 },
  center: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { y: "-110%", transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] } },
};

const numberVariants: Variants = {
  enter: (d: number) => ({ x: d * 90, rotate: d * 14, opacity: 0 }),
  center: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    x: d * -90,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

/**
 * The phone reel. A timer hands the screen from one fragrance to the next,
 * so it moves on every time, whatever the reader is doing with the page.
 * The new colour floods out from the bottle, the old bottle is flung out
 * one side as the new one spins in from the other, and the name is set
 * letter by letter. Swipe to take over; the progress bars show the clock.
 *
 * Only transform and opacity animate, so it stays on the compositor. It
 * stops while off screen or in a background tab.
 */
function SwipeReel({ onPick }: { onPick?: (index: number) => void }) {
  const n = DISCOVERY_FRAGRANCES.length;
  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [touched, setTouched] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const root = useRef<HTMLElement | null>(null);

  const running = onScreen && tabVisible;
  const dwell = touched ? DWELL_AFTER_TOUCH_MS : DWELL_MS;
  const f = DISCOVERY_FRAGRANCES[index];

  const go = useCallback(
    (d: number, byHand: boolean) => {
      setPage(([i]) => [(i + d + n) % n, d]);
      setTouched(byHand);
      setNonce((k) => k + 1);
    },
    [n],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(1, false), dwell);
    return () => window.clearTimeout(id);
  }, [running, dwell, index, nonce, go]);

  const name = displayName(f.name);

  return (
    <section
      ref={root}
      className="on-dark relative isolate overflow-hidden text-paper"
      aria-roledescription="carousel"
      aria-label="The six, one at a time"
      style={{ backgroundColor: tone(DISCOVERY_FRAGRANCES[0].colorHex) }}
    >
      {/* The new colour floods out from the bottle and covers the old one;
          the old flood lingers underneath until it is fully covered. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`flood-${index}`}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[58%] -z-10 aspect-square w-[1500px] rounded-full"
          style={{
            backgroundColor: tone(f.colorHex),
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.95, ease: [0.65, 0, 0.35, 1] } }}
          exit={{ opacity: 0, transition: { delay: 0.95, duration: 0.01 } }}
        />
      </AnimatePresence>

      <div className="ed-container relative flex items-center justify-between pt-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-paper/60">
          The six, one at a time
        </p>
        <p className="font-mono text-[12px] tabular-nums tracking-[0.04em] text-paper/60">
          0{index + 1} / 0{n}
        </p>
      </div>

      {/* Story-style clock: the lit bar fills while its fragrance holds. */}
      <div className="ed-container relative mt-3 flex gap-1.5" aria-hidden>
        {DISCOVERY_FRAGRANCES.map((g, i) => (
          <span
            key={g.id}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/20"
          >
            {i < index && <span className="block h-full w-full bg-paper/80" />}
            {i === index && (
              <motion.span
                key={`${index}-${nonce}-${running}`}
                className="block h-full w-full origin-left bg-paper"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: running ? 1 : 0 }}
                transition={{ duration: dwell / 1000, ease: "linear" }}
              />
            )}
          </span>
        ))}
      </div>

      <div className="relative min-h-[560px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={f.id}
            custom={dir}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.55}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x + info.velocity.x * 0.2;
              if (swipe < -70) go(1, true);
              else if (swipe > 70) go(-1, true);
            }}
            className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            aria-label={f.name}
          >
            <motion.p
              aria-hidden
              custom={dir}
              variants={numberVariants}
              className="pointer-events-none absolute -right-4 top-0 font-serif text-[8.5rem] font-light leading-none text-paper/[0.09]"
            >
              0{index + 1}
            </motion.p>

            <div className="ed-container relative pb-12 pt-6">
              <motion.p
                variants={rise}
                className="font-mono text-[11.5px] uppercase tracking-[0.06em] text-paper/65"
              >
                No. 0{index + 1} · {f.familyBadge}
              </motion.p>

              <h3
                className="ds-reel-name mt-1.5 overflow-hidden pb-[0.06em] font-serif text-[2.6rem] font-light leading-[0.95] tracking-[-0.03em]"
                aria-label={name}
              >
                {Array.from(name).map((ch, k) => (
                  <motion.span
                    key={`${f.id}-${k}`}
                    variants={letter}
                    className="inline-block will-change-transform"
                    aria-hidden
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                ))}
              </h3>

              <motion.p
                variants={rise}
                className="mt-2 font-serif text-[17px] font-light italic leading-snug text-paper/80"
              >
                {f.tagline}.
              </motion.p>

              <div className="mt-5 flex justify-center" style={{ perspective: 900 }}>
                <motion.button
                  type="button"
                  custom={dir}
                  variants={bottleVariants}
                  onClick={() => onPick?.(index)}
                  className="block aspect-square w-[58%] max-w-[208px] overflow-hidden rounded-[2px] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.85)] will-change-transform"
                  aria-label={`Layer with ${f.name}`}
                >
                  <img
                    src={f.img}
                    alt={`${f.name} 6ML travel spray`}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover"
                    width="600"
                    height="600"
                  />
                </motion.button>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-x-3 border-t border-paper/20 pt-3.5">
                {[
                  ["Opens with", f.topNotes],
                  ["Settles into", f.heartNotes],
                  ["Dries down to", f.baseNotes],
                ].map(([k, v]) => (
                  <motion.div key={k} variants={rise}>
                    <dt className="font-mono text-[10px] uppercase leading-tight tracking-[0.05em] text-paper/55">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-[12.5px] leading-[1.35] text-paper/90">
                      {v}
                    </dd>
                  </motion.div>
                ))}
              </dl>

              <motion.p
                variants={rise}
                className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.05em] text-paper/60"
              >
                {f.longevity} · {f.bestTime}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload the neighbours so the next bottle never arrives blank. */}
      <div className="hidden" aria-hidden>
        {DISCOVERY_FRAGRANCES.map((g) => (
          <img key={g.id} src={g.img} alt="" loading="eager" />
        ))}
      </div>

      <div className="ed-container relative flex items-center justify-between pb-12">
        <button
          type="button"
          onClick={() => go(-1, true)}
          className="min-h-[44px] cursor-pointer font-mono text-[12px] uppercase tracking-[0.05em] text-paper/70 hover:text-paper"
          aria-label="Previous fragrance"
        >
          ← Prev
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-paper/45">
          Swipe or tap
        </p>
        <button
          type="button"
          onClick={() => go(1, true)}
          className="min-h-[44px] cursor-pointer font-mono text-[12px] uppercase tracking-[0.05em] text-paper/70 hover:text-paper"
          aria-label="Next fragrance"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
