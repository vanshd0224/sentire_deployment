import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import { EASE_OUT_EXPO, usePrefersReducedMotion } from "../motion";

/**
 * Home hero, kept quiet on purpose: the brand's own line, one photograph
 * at a time, a caption, two ways in. The only motion is a soft fade on
 * arrival and a slow change of bottle every few seconds.
 */

const FEATURED = ["purple-oud", "midnight", "calantha", "white-oud"];
const STEP_MS = 6000;

const SLIDES = FEATURED.flatMap((id) => {
  const p = ALL_PERFUMES.find((x) => x.id === id);
  return p ? [p] : [];
});

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: EASE_OUT_EXPO },
});

export default function ClassicHero({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: any) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const p = SLIDES[i];

  useEffect(() => {
    if (reduced || hold) return;
    const t = window.setTimeout(
      () => setI((n) => (n + 1) % SLIDES.length),
      STEP_MS,
    );
    return () => window.clearTimeout(t);
  }, [i, reduced, hold]);

  const go = (d: number) =>
    setI((n) => (n + d + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="hero-section relative w-full overflow-hidden bg-[#f2f2f0] text-ink"
      aria-label="Sentire"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 pb-14 pt-10 md:px-10 lg:min-h-[max(680px,calc(100svh-126px))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 lg:py-12">
        {/* ── Words ── */}
        <div className="contents lg:col-span-5 lg:block">
          <motion.p
            className="order-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px] lg:order-none"
            {...rise(0.1)}
          >
            Sentire by PC — Extrait de parfum
          </motion.p>

          <motion.h1
            className="order-2 mt-5 text-[clamp(3.2rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] lg:order-none"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
            }}
            {...rise(0.2)}
          >
            Crafted <em className="text-[#6b1422]">beyond</em>
            <br />
            time.
          </motion.h1>

          <motion.p
            className="order-4 mt-6 max-w-[27rem] text-[16px] leading-relaxed text-ink/70 lg:order-none lg:mt-7"
            {...rise(0.35)}
          >
            Extraits de parfum with 35% and more perfume oil, made for moments
            that become memories.
          </motion.p>

          <motion.div
            className="order-5 mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 lg:order-none"
            {...rise(0.45)}
          >
            <button
              type="button"
              onClick={() => onNavigate?.("perfumes")}
              className="cursor-pointer bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-[#6b1422]"
            >
              Shop the collection
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.("discovery-set")}
              className="group cursor-pointer text-[13px] font-medium text-ink"
            >
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-ink">
                Discovery Set, ₹549
              </span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>

          <motion.p
            className="order-6 mt-10 flex flex-wrap gap-y-1 border-t border-ink/12 pt-5 text-[13px] text-ink/55 lg:order-none lg:mt-14"
            {...rise(0.55)}
          >
            {[
              "35%+ perfume oil",
              "Up to 12 hours on skin",
              "Free shipping over ₹999",
            ].map((f, k) => (
              <span key={f} className="whitespace-nowrap">
                {k > 0 && <span className="mx-2 text-ink/25">·</span>}
                {f}
              </span>
            ))}
          </motion.p>
        </div>

        {/* ── Photograph ── */}
        <motion.figure
          className="order-3 mt-8 lg:order-none lg:col-span-7 lg:mt-0 lg:justify-self-end lg:pr-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.15 }}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
        >
          <button
            type="button"
            onClick={() =>
              onSelectProduct ? onSelectProduct(p) : onNavigate?.("perfumes")
            }
            className="relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-paper-2 lg:w-[min(480px,36vw)]"
            aria-label={`View ${p.name}`}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={p.id}
                src={p.img}
                alt={`${p.name} extrait de parfum, 50ml`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: { duration: STEP_MS / 1000 + 1.2, ease: "linear" },
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 1.2, ease: "easeInOut" },
                }}
              />
            </AnimatePresence>
          </button>

          <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-[13px] lg:w-[min(480px,36vw)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-ink">{p.name}</span>
                <span className="text-ink/50">
                  {" "}
                  — {p.traces.slice(0, 2).join(", ")}
                </span>
              </motion.span>
            </AnimatePresence>
            <span className="flex shrink-0 items-center gap-3 tabular-nums text-ink/50">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous fragrance"
                className="cursor-pointer px-1 text-ink/60 transition-colors hover:text-ink"
              >
                ←
              </button>
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next fragrance"
                className="cursor-pointer px-1 text-ink/60 transition-colors hover:text-ink"
              >
                →
              </button>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
