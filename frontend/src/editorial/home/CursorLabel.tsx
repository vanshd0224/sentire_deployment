import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { useMotionBudget } from "../motion";

/**
 * A small blush disc that trails the pointer and says what a click will do
 * ("Drag", "View", "Play") over anything marked with data-cursor. The real
 * cursor stays; this only appears where there's something to say.
 * Desktop with a fine pointer only.
 */
export function CursorLabel() {
  const rich = useMotionBudget();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!rich) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const leave = () => setLabel(null);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [rich, x, y]);

  if (!rich) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[99990]"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {label && (
          <motion.div
            key="disc"
            className="absolute left-4 top-4 grid h-[74px] w-[74px] place-items-center rounded-full bg-[#e7bcc3] text-[11px] font-semibold uppercase tracking-[0.08em] text-ink shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={label}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Wine hairline across the top of the window, filling as you read down. */
export function ScrollProgress() {
  // Desktop only: on a phone this spring ran on every scroll frame for a
  // 3px decoration, and phones need those frames for the page itself.
  const rich = useMotionBudget();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  if (!rich) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[99980] h-[3px] origin-left bg-[#6b1422]"
      style={{ scaleX }}
    />
  );
}
