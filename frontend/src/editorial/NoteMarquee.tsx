import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { usePrefersReducedMotion } from "./motion";

const NOTES = [
  "Cambodian oud",
  "Saffron",
  "Amethyst rose",
  "Tobacco woods",
  "Blooming jasmine",
  "Dark chocolate",
  "Tuberose",
  "Patchouli",
  "Velvet amber",
  "Fresh lavender",
];

/**
 * A single line of notes that drifts, speeds up with the scroll and flips
 * direction when you scroll back. One transform on one element — safe on mobile.
 */
export default function NoteMarquee() {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * -1.6 * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {NOTES.map((note) => (
        <span key={note} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-[clamp(1.6rem,4vw,3.25rem)] font-light italic text-ink">
            {note}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-clay" />
        </span>
      ))}
    </span>
  );

  return (
    <section
      className="border-y border-[color:var(--color-rule)] bg-paper py-6 md:py-9"
      aria-label="Notes in the collection"
    >
      <div className="overflow-hidden">
        <motion.div className="flex flex-nowrap will-change-transform" style={{ x }}>
          {row}
          {row}
          {row}
          {row}
        </motion.div>
      </div>
    </section>
  );
}
