import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { PageName } from "../types/appTypes";
import { EASE_OUT_EXPO, maskLine, softSpring, useMotionBudget } from "./motion";

interface HeroProps {
  onNavigate?: (page: PageName) => void;
}

const HEADLINE = ["Wear it", "like a", "signature."];

export default function EditorialHero({ onNavigate }: HeroProps) {
  const rich = useMotionBudget();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll parallax runs everywhere: two transforms, no layout, no repaint.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer depth is desktop-only.
  const px = useSpring(0, softSpring);
  const py = useSpring(0, softSpring);
  const rotateY = useTransform(px, [-1, 1], [6, -6]);
  const rotateX = useTransform(py, [-1, 1], [-5, 5]);
  const glare = useTransform(
    px,
    (x) =>
      `radial-gradient(60% 60% at ${28 + (x + 1) * 22}% 30%, rgba(255,255,255,0.45), transparent 70%)`,
  );

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rich) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper text-ink"
      aria-label="Sentire — extrait de parfum"
    >
      <div className="ed-container grid grid-cols-1 items-center gap-8 pb-14 pt-6 md:gap-10 md:pb-20 md:pt-12 lg:min-h-[86vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ── Type column ───────────────────────────────── */}
        <motion.div
          style={rich ? { y: textY, opacity: fade } : undefined}
          className="relative z-10"
        >
          <motion.p
            className="ed-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Extrait de parfum — 35% oil — Jaipur
          </motion.p>

          <h1 className="mt-5 font-serif text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.92] tracking-[-0.035em]">
            <span className="sr-only">Wear it like a signature.</span>
            <motion.span
              aria-hidden
              initial="hidden"
              animate="show"
              className="block"
            >
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block will-change-transform"
                    variants={maskLine}
                    custom={i}
                  >
                    {i === 2 ? (
                      <em className="font-normal italic">{line}</em>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            className="mt-5 max-w-md md:mt-7 text-[15px] leading-[1.7] text-ink-soft md:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT_EXPO }}
          >
            Eleven compositions blended at extrait strength, then engraved with
            your own photograph or name before they leave the atelier.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3 md:mt-9"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
          >
            <a
              href="/perfumes"
              onClick={(e) => {
                if (!onNavigate) return;
                e.preventDefault();
                onNavigate("perfumes");
              }}
              className="ed-btn ed-btn-solid"
            >
              Explore the library
            </a>
            <a
              href="/discovery-set"
              onClick={(e) => {
                if (!onNavigate) return;
                e.preventDefault();
                onNavigate("discovery-set");
              }}
              className="ed-btn ed-btn-line"
            >
              Discovery set — ₹549
            </a>
          </motion.div>

          <motion.dl
            className="order-last mt-8 grid max-w-lg grid-cols-3 gap-6 border-t md:mt-12 border-[color:var(--color-rule)] pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            {[
              ["35%+", "Perfume oil"],
              ["12 hrs", "On skin"],
              ["11", "Compositions"],
            ].map(([value, caption]) => (
              <div key={caption}>
                <dt className="font-serif text-2xl font-light leading-none md:text-3xl">
                  {value}
                </dt>
                <dd className="ed-label mt-2">{caption}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Image column ──────────────────────────────── */}
        <div
          className="relative"
          onPointerMove={handlePointer}
          onPointerLeave={resetPointer}
          style={{ perspective: 1200 }}
        >
          <motion.figure
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-paper-2 sm:aspect-[5/6] lg:aspect-[4/5]"
            style={
              rich
                ? { rotateX, rotateY, transformStyle: "preserve-3d" }
                : undefined
            }
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            <motion.img
              src="/assets/perfumes/purple-oud-50ml-1.webp?v=3"
              alt="Purple Oud extrait de parfum held above raw amethyst"
              width={1120}
              height={1400}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full scale-[1.08] object-cover will-change-transform"
              style={{ y: imageY }}
            />
            {rich && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: glare }}
              />
            )}
          </motion.figure>

          <motion.figcaption
            className="mt-4 flex items-start justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="ed-label">No. 08 — Purple Oud</p>
            <p className="max-w-[16rem] text-right text-[13px] leading-relaxed text-ink-soft">
              Cambodian oud, saffron, amethyst rose
            </p>
          </motion.figcaption>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="ed-container hidden pb-8 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="block h-8 w-px bg-ink/30"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="ed-label">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
