import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { DISCOVERY_FRAGRANCES, displayName } from "./data";
import { EASE_OUT_EXPO, useMotionBudget, viewportOnce } from "../motion";

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
 * Phones get six full-height panels that reveal as you scroll.
 */
export default function ScentReel({
  onPick,
}: {
  onPick?: (index: number) => void;
}) {
  const rich = useMotionBudget();
  return rich ? (
    <PinnedReel onPick={onPick} />
  ) : (
    <StackedReel onPick={onPick} />
  );
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
      <div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
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
          <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-paper/60">
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
            />
          </motion.button>
        </div>

        <div className="col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-paper/60">
            No. 0{index + 1} · {f.familyBadge}
          </p>
          <motion.h3
            className="mt-3 font-serif font-light leading-[0.9] tracking-[-0.04em]"
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
                  <dt className="font-mono text-[10px] uppercase tracking-[0.04em] text-paper/50">
                    {k}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-snug text-paper/90">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/55">
              {f.longevity} · {f.sillage} · {f.bestTime}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StackedReel({ onPick }: { onPick?: (index: number) => void }) {
  return (
    <div>
      {DISCOVERY_FRAGRANCES.map((f, i) => (
        <section
          key={f.id}
          className="relative overflow-hidden py-16 text-paper"
          style={{ backgroundColor: tone(f.colorHex) }}
          aria-label={f.name}
        >
          <p
            aria-hidden
            className="pointer-events-none absolute -right-4 top-4 font-serif text-[11rem] font-light leading-none text-paper/[0.07]"
          >
            0{i + 1}
          </p>
          <div className="ed-container relative">
            <motion.button
              type="button"
              onClick={() => onPick?.(i)}
              className="block aspect-square w-[72%] max-w-[300px] overflow-hidden rounded-[2px] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, rotate: -4, y: 30 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            >
              <img
                src={f.img}
                alt={`${f.name} 6ML travel spray`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/60">
                No. 0{i + 1} · {f.familyBadge}
              </p>
              <h3 className="mt-2 font-serif text-[3.5rem] font-light leading-[0.95] tracking-[-0.03em]">
                {displayName(f.name)}
              </h3>
              <p className="mt-3 font-serif text-xl font-light italic text-paper/80">
                {f.tagline}.
              </p>
              <dl className="mt-6 space-y-3 border-t border-paper/20 pt-4">
                {[
                  ["Opens with", f.topNotes],
                  ["Settles into", f.heartNotes],
                  ["Dries down to", f.baseNotes],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[108px_1fr] gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.04em] text-paper/50">
                      {k}
                    </dt>
                    <dd className="text-[15px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/55">
                {f.longevity} · {f.bestTime}
              </p>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
