import { useState } from "react";
import { motion } from "framer-motion";
import { Label, MaskedHeading, Rule } from "./Primitives";
import { EASE_OUT_EXPO, viewportOnce } from "./motion";

const STEPS = [
  {
    n: "01",
    title: "Blended at extrait strength",
    body: "35%+ perfume oil against the 15% of a standard eau de parfum, so a single application carries through the day rather than the hour.",
    image: "/images/purple-oud.webp",
    alt: "Purple Oud flacon on dark stone",
  },
  {
    n: "02",
    title: "Engraved before it ships",
    body: "Your photograph or your name is laser-etched into the glass at our Jaipur atelier — the bottle leaves as one of one.",
    image: "/images/curated-personalisation.webp",
    alt: "Personalised engraving on a Sentire flacon",
  },
  {
    n: "03",
    title: "Six to try, one to keep",
    body: "The discovery set puts six compositions on your skin for ₹549, and its value comes off your first full bottle.",
    image: "/images/curated-discovery-set-v5.webp",
    alt: "Sentire discovery set of six vials",
  },
];

/**
 * Sticky image column on desktop; a simple stacked story on phones.
 * The image swap is opacity-only, which the compositor handles for free.
 */
export default function Atelier() {
  // The sticky picture follows whichever step is in view — one class swap per
  // step rather than a value recomputed on every frame.
  const [active, setActive] = useState(0);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="ed-container">
        <Rule />
        <div className="pt-5 md:pt-7">
          <Label>The house</Label>
          <MaskedHeading
            text="What makes it last."
            className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5.5vw,4rem)] font-light leading-[1.02] tracking-[-0.025em]"
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Sticky media */}
          <div className="lg:sticky lg:top-24 lg:h-[70vh]">
            <div className="relative h-[52vh] w-full overflow-hidden rounded-[2px] bg-paper-2 lg:h-full">
              {STEPS.map((step, i) => (
                <img
                  key={step.n}
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Steps */}
          <ol className="flex flex-col">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                onViewportEnter={() => setActive(i)}
                className="border-t border-[color:var(--color-rule)] py-8 first:border-t-0 first:pt-0 md:py-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ ...viewportOnce, once: false, amount: 0.5 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              >
                <div className="flex gap-6 md:gap-10">
                  <span className="ed-label pt-2">{step.n}</span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight tracking-[-0.015em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-[1.75] text-ink-soft">{step.body}</p>
                    {/* Phones see the image inline instead of the sticky column */}
                    <div className="mt-6 aspect-[3/2] w-full overflow-hidden rounded-[2px] bg-paper-2 lg:hidden">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
