import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

/**
 * Motion budget.
 *
 * Phones get transform/opacity reveals only. Pointer-tracked tilt, pinned
 * horizontal rails and anything that runs every frame are reserved for
 * machines that can afford them, so a mid-range Android never drops frames.
 */
export function useMotionBudget() {
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");

    const evaluate = () => {
      const cores = navigator.hardwareConcurrency ?? 4;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      setRich(!reduced.matches && fine.matches && wide.matches && cores >= 4 && memory >= 4);
    };

    evaluate();
    reduced.addEventListener("change", evaluate);
    fine.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      fine.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, []);

  return rich;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const softSpring: Transition = { type: "spring", stiffness: 220, damping: 30, mass: 0.9 };

/** Word/line mask reveal — the line slides out from behind its own clip. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.06 * i, ease: EASE_OUT_EXPO },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 * i, ease: EASE_OUT_EXPO },
  }),
};

/** Image uncovers itself: cheap on the GPU, no layout work. */
export const imageWipe: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
