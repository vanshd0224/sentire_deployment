import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { PageName } from "../types/appTypes";
import { EASE_OUT_EXPO, useMotionBudget, viewportOnce } from "./motion";

interface CampaignProps {
  onNavigate?: (page: PageName) => void;
}

/** Full-bleed campaign band; the picture drifts slowly behind the type. */
export default function Campaign({ onNavigate }: CampaignProps) {
  const rich = useMotionBudget();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden md:h-[80vh]">
        <motion.img
          src="/images/curated-personalisation.webp"
          alt="A Sentire flacon engraved with a photograph"
          loading="lazy"
          decoding="async"
          style={rich ? { y } : undefined}
          className="absolute inset-0 h-[116%] w-full object-cover object-center will-change-transform"
        />
        {/* The festival artwork is pale, so the type needs a real scrim to stay legible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />

        <div className="ed-container absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="max-w-xl"
          >
            <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.02em] text-paper/70">
              Personalisation
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]">
              Your name, <em className="italic">on the glass.</em>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/75">
              Laser engraving of a photograph, a name or a date — complimentary
              with every 50ml flacon, finished in our Jaipur atelier.
            </p>
            <a
              href="/personalised-perfume"
              onClick={(e) => {
                if (!onNavigate) return;
                e.preventDefault();
                onNavigate("personalisation");
              }}
              className="ed-btn mt-7 bg-paper !text-ink hover:bg-clay hover:!text-paper"
            >
              Personalise a bottle
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
