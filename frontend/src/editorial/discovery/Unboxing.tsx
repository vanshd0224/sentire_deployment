import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BOX_ANGLES, DISCOVERY_FRAGRANCES } from "./data";
import { EASE_OUT_EXPO, useMotionBudget, viewportOnce } from "../motion";

const CASE = BOX_ANGLES[0];

/**
 * "Open the case": on desktop the section pins while the six vials slide out
 * from behind the case, fan into an arc, then settle into a row with their
 * names. Every value is a transform or opacity driven by one scroll progress,
 * so the compositor does all the work. Phones get a plain staggered grid.
 */
export default function Unboxing({
  onSelect,
}: {
  onSelect?: (index: number) => void;
}) {
  const rich = useMotionBudget();
  return rich ? (
    <PinnedUnboxing onSelect={onSelect} />
  ) : (
    <StackedUnboxing onSelect={onSelect} />
  );
}

function PinnedUnboxing({ onSelect }: { onSelect?: (index: number) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const caseScale = useTransform(p, [0, 0.35, 0.8], [1, 0.82, 0.7]);
  const caseY = useTransform(p, [0, 0.35, 0.8], ["0%", "-8%", "-34%"]);
  const caseOpacity = useTransform(p, [0.6, 0.85], [1, 0.12]);
  const hint = useTransform(p, [0, 0.12], [1, 0]);
  const caption = useTransform(p, [0.78, 0.92], [0, 1]);

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* The case */}
        <motion.img
          src={CASE.img}
          alt={CASE.desc}
          loading="lazy"
          className="relative z-20 h-[46vh] max-h-[420px] w-auto rounded-[2px] object-cover shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
          style={{ scale: caseScale, y: caseY, opacity: caseOpacity }}
        />

        {/* The six vials */}
        {DISCOVERY_FRAGRANCES.map((f, i) => (
          <Vial key={f.id} index={i} progress={p} onSelect={onSelect} />
        ))}

        <motion.p
          style={{ opacity: hint }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.02em] text-paper/55"
        >
          Scroll to open the case
        </motion.p>

        <motion.p
          style={{ opacity: caption }}
          className="absolute bottom-10 left-1/2 max-w-md -translate-x-1/2 text-center text-[14px] text-paper/70"
        >
          Six 6ML sprays, stepped so the full set is visible the moment you open
          it. Tap one to read it.
        </motion.p>
      </div>
    </div>
  );
}

function Vial({
  index,
  progress,
  onSelect,
}: {
  index: number;
  progress: MotionValue<number>;
  onSelect?: (index: number) => void;
}) {
  const f = DISCOVERY_FRAGRANCES[index];
  const n = DISCOVERY_FRAGRANCES.length;
  const offset = index - (n - 1) / 2; // -2.5 … 2.5

  // Three poses: hidden behind the case → fanned arc → flat row.
  const x = useTransform(
    progress,
    [0.1, 0.45, 0.85],
    ["0px", `${offset * 118}px`, `${offset * 172}px`],
  );
  const y = useTransform(
    progress,
    [0.1, 0.45, 0.85],
    ["0px", `${Math.abs(offset) * 26 - 30}px`, "150px"],
  );
  const rotate = useTransform(progress, [0.1, 0.45, 0.85], [0, offset * 9, 0]);
  const scale = useTransform(progress, [0.1, 0.45, 0.85], [0.55, 0.92, 1]);
  const opacity = useTransform(progress, [0.08, 0.2], [0, 1]);
  const label = useTransform(progress, [0.8, 0.95], [0, 1]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(index)}
      className="group absolute z-10 w-[150px] cursor-pointer text-left"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: 10 - Math.abs(Math.round(offset)),
      }}
      aria-label={`Read about ${f.name}`}
    >
      <div className="aspect-square overflow-hidden rounded-[2px] bg-paper/5 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)]">
        <img
          src={f.img}
          alt={`${f.name} 6ML travel spray`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <motion.div style={{ opacity: label }} className="mt-3">
        <p className="font-mono text-[10px] max-sm:text-[12px] uppercase tracking-[0.02em] text-paper/45">
          No. {String(index + 1).padStart(2, "0")}
        </p>
        <p className="font-serif text-[17px] font-light text-paper">{f.name}</p>
      </motion.div>
    </motion.button>
  );
}

function StackedUnboxing({ onSelect }: { onSelect?: (index: number) => void }) {
  return (
    <div className="ed-container pb-4 pt-2">
      <motion.img
        src={CASE.img}
        alt={CASE.desc}
        loading="lazy"
        className="mx-auto h-auto w-[62%] max-w-[300px] rounded-[2px] object-cover"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      />
      <div className="mt-8 grid grid-cols-3 gap-3">
        {DISCOVERY_FRAGRANCES.map((f, i) => (
          <motion.button
            key={f.id}
            type="button"
            onClick={() => onSelect?.(i)}
            className="cursor-pointer text-left"
            initial={{ opacity: 0, y: -28, rotate: ((i % 3) - 1) * 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE_OUT_EXPO }}
          >
            <div className="aspect-square overflow-hidden rounded-[2px] bg-paper/5">
              <img
                src={f.img}
                alt={f.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 font-serif text-[15px] font-light text-paper">
              {f.name}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
