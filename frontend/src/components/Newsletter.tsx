import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KineticText } from "../editorial/home/Kinetic";
import { EASE_OUT_EXPO } from "../editorial/motion";

/**
 * Newsletter strip. Same arrangement as before — words on the left, the
 * form on the right — set like a letter rather than a banner: a large
 * line of type, a single underlined field and an arrow.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="w-full border-b border-black/5 bg-[#f2f2f0] py-14 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-12">
        <div>
          <p className="font-mono text-[11px] uppercase text-ink/55 max-sm:text-[12px]">
            Letters from Sentire
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.9rem,4vw,3.25rem)] leading-[0.98] text-ink">
            <KineticText text="Be the first" />{" "}
            <em className="text-[#6b1422]">
              <KineticText text="to smell it." delay={0.15} />
            </em>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
            New launches, restocks and the odd private offer. Unsubscribe
            any time.
          </p>
        </div>

        <form
          className="w-full max-w-md lg:mb-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.p
                key="thanks"
                className="border-b border-ink py-3 text-[17px] text-ink"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                Thank you. See you in your inbox.
              </motion.p>
            ) : (
              <motion.div
                key="form"
                className="group relative flex items-center"
                exit={{ opacity: 0, y: -10 }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border-0 border-b border-ink/25 bg-transparent py-3 pr-14 text-[17px] text-ink placeholder:text-ink/35 focus:outline-none"
                 name="newsletter-input-1"/>
                {/* underline that fills in wine when you type */}
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#6b1422] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-0 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink text-paper transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-[#6b1422]"
                >
                  →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
