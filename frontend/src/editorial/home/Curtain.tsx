import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO, usePrefersReducedMotion } from "../motion";

/* ── First-visit curtain ─────────────────────────────────────────────── */

export function useCurtain() {
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

export function Curtain({ onDone }: { onDone: () => void }) {
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
