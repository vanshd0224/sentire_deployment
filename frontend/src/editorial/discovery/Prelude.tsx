import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BoxStage from "./BoxStage";
import { Magnetic, Ticker } from "./fx";
import { EASE_OUT_EXPO } from "../motion";

/**
 * First view of the Discovery Set page: a dark studio with the case turning
 * in the light and the six vials orbiting it. Scrolling away turns the case
 * to its manifesto side and lifts the stage.
 */
export default function Prelude({
  onAdd,
  added,
  onExplore,
  onSelectVial,
  onHome,
}: {
  onAdd: () => void;
  added: boolean;
  onExplore: () => void;
  onSelectVial: (index: number) => void;
  onHome?: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const turn = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.35 + i * 0.08, ease: EASE_OUT_EXPO },
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-paper"
      style={{
        minHeight: "calc(100svh - 96px)",
        background:
          "radial-gradient(60% 55% at 50% 42%, #2c2925 0%, #191816 52%, #0e0d0c 100%)",
      }}
      aria-label="The Discovery Set"
    >
      {/* The word, set huge behind the object */}
      <motion.p
        aria-hidden
        className="pointer-events-none absolute left-0 top-[18%] z-0 whitespace-nowrap font-serif font-light italic leading-none text-transparent"
        style={{
          x: wordX,
          fontSize: "clamp(8rem, 26vw, 30rem)",
          WebkitTextStroke: "1px rgba(244,242,238,0.09)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
      >
        Discovery&nbsp;Discovery
      </motion.p>

      {/* Corner notes, set like a contact sheet */}
      <div className="ed-container relative z-20 flex justify-between pt-6">
        <motion.nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.04em] text-paper/55"
          {...reveal(0)}
        >
          <button onClick={onHome} className="cursor-pointer hover:text-paper">
            Home
          </button>
          <span aria-hidden> / </span>
          <span className="text-paper/80">The Discovery Set</span>
        </motion.nav>
        <motion.p
          className="hidden font-mono text-[11px] uppercase tracking-[0.04em] text-paper/55 sm:block"
          {...reveal(0)}
        >
          6 × 6ML · 36ML · ~360 sprays
        </motion.p>
      </div>

      {/* The object */}
      <motion.div
        className="absolute inset-x-0 top-[1%] z-10 h-[46%] sm:top-[2%] sm:h-[62%]"
        style={{ y: stageY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      >
        <BoxStage scrollTurn={turn} onSelectVial={onSelectVial} />
      </motion.div>

      {/* Type and purchase, pinned to the bottom of the stage */}
      <motion.div
        className="ed-container absolute inset-x-0 bottom-0 z-20 pb-8 md:pb-12"
        style={{ opacity: fade }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1
              className="font-serif font-light leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
            >
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.25, ease: EASE_OUT_EXPO }}
                >
                  The Discovery Set
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-[0.42em] font-medium tracking-[0.02em]"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.35, ease: EASE_OUT_EXPO }}
                >
                  6 × 6ML extrait de parfum
                </motion.span>
              </span>
            </h1>
            <motion.p
              className="mt-3 max-w-sm text-[15px] leading-relaxed text-paper/65"
              {...reveal(2)}
            >
              The Discovery Set — find the one that's yours before you commit to
              a full bottle.
            </motion.p>
          </div>

          <motion.div className="md:text-right" {...reveal(3)}>
            <div className="flex items-baseline gap-3 md:justify-end">
              <span className="font-sans text-[2.75rem] font-light leading-none tracking-[-0.02em]">
                <Ticker value={549} prefix="₹" />
              </span>
              <span className="font-mono text-[13px] text-paper/40 line-through">
                ₹999
              </span>
              <span className="font-mono text-[12px] text-[color:var(--color-print)]">
                Save 45%
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/50">
              ★ 4.9 · 428 verified reviews · selling fast
            </p>
            <div className="mt-5 flex flex-wrap gap-3 md:justify-end">
              <Magnetic>
                <motion.button
                  onClick={onAdd}
                  whileTap={{ scale: 0.97 }}
                  className="ed-btn bg-[color:var(--color-print)] font-medium !text-[#141414] hover:bg-paper"
                >
                  {added ? "Added to bag ✓" : "Add to bag — ₹549"}
                </motion.button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={onExplore}
                  className="ed-btn border border-paper/35 hover:border-paper"
                >
                  See what's inside ↓
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="mt-8 hidden text-center font-mono text-[10px] uppercase tracking-[0.06em] text-paper/35 md:block"
          {...reveal(5)}
        >
          Drag the case to turn it · tap a vial to read it · scroll to see the
          back
        </motion.p>
      </motion.div>
    </section>
  );
}
