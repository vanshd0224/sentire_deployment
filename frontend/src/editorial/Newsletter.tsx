import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, viewportOnce } from "./motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="ed-container">
        <motion.div
          className="grid gap-8 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-[1fr_1fr] md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <div>
            <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Letters from the bench.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              New compositions, restocks and the occasional note on how a fragrance is built. No
              more than twice a month.
            </p>
          </div>

          <form
            className="flex flex-col justify-end"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              setDone(true);
            }}
          >
            <label htmlFor="ed-newsletter" className="ed-label">
              Email address
            </label>
            <div className="mt-3 flex items-center gap-4 border-b border-ink/25 pb-3 focus-within:border-ink">
              <input
                id="ed-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-h-[44px] w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-stone"
              />
              <button type="submit" className="ed-link shrink-0 cursor-pointer text-[14px] font-medium">
                {done ? "Thank you" : "Subscribe"}
              </button>
            </div>
            <p aria-live="polite" className="mt-3 h-5 text-[13px] text-ink-soft">
              {done ? "You're on the list." : ""}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
