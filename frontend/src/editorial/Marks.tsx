import { motion } from "framer-motion";
import { EASE_OUT_EXPO, viewportOnce } from "./motion";

/** Same credentials the site already carries, set as a quiet index instead of badges. */
const MARKS: [string, string][] = [
  ["FDA approved", "U.S. verified"],
  ["Gentle formula", "Derm tested"],
  ["Phthalate free", "Non-toxic"],
  ["Triclosan free", "Pure & safe"],
  ["IFRA ethyl alcohol", "Certified 100%"],
  ["Cruelty free", "No animal testing"],
];

export default function Marks() {
  return (
    <section className="bg-ink py-14 text-paper md:py-20">
      <div className="ed-container">
        <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/55">
          Made responsibly
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {MARKS.map(([name, sub], i) => (
            <motion.div
              key={name}
              className="border-t border-paper/15 pt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: EASE_OUT_EXPO,
              }}
            >
              <p className="font-serif text-lg font-light leading-snug">
                {name}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.02em] text-paper/50">
                {sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
