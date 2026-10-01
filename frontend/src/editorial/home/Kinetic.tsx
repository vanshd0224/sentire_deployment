import { useEffect, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE_OUT_EXPO, useMotionBudget } from "../motion";

/**
 * Words rise out of their own line, one after another, the first time the
 * heading scrolls into view. Each word is clipped by its own box, so the
 * motion is transform-only and the text is real, selectable text.
 */
export function KineticText({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "108%", rotate: 4 },
              show: {
                y: "0%",
                rotate: 0,
                transition: {
                  duration: 0.95,
                  delay: delay + i * stagger,
                  ease: EASE_OUT_EXPO,
                },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/** A hairline that draws itself from the left when it scrolls into view. */
export function DrawnRule({ light = false }: { light?: boolean }) {
  return (
    <motion.div
      className="h-px w-full origin-left"
      style={{
        background: light ? "rgba(242,242,240,0.22)" : "var(--color-rule)",
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
    />
  );
}

/**
 * A huge outlined word that slides sideways behind a section as you scroll
 * past it. Pure decoration: absolutely positioned, ignores the pointer and
 * never affects layout.
 */
export function DriftWord({
  text,
  light = false,
  className = "",
  from = 12,
  to = -22,
}: {
  text: string;
  light?: boolean;
  className?: string;
  from?: number;
  to?: number;
}) {
  // A CSS scroll-driven animation (.drift-word, a view() timeline): the
  // browser moves it as the section crosses the screen, with no JavaScript.
  // (framer's useScroll re-measured the page whenever anything resized,
  // which stalled the animation in the hero at the top.) Where unsupported,
  // or on a phone, the word simply stands still.
  // Its clipping wrappers (here and the section) must use overflow: clip,
  // not hidden: a hidden box is a scroll container, and view() would follow
  // that box (which never scrolls) instead of the page.
  const rich = useMotionBudget();
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 select-none overflow-clip ${className}`}
    >
      <p
        className={`font-serif whitespace-nowrap uppercase leading-[0.8] ${rich ? "drift-word" : ""}`}
        style={
          {
            "--drift-from": `${from}%`,
            "--drift-to": `${to}%`,
            transform: `translateX(${from}%)`,
            fontSize: "clamp(5rem, 17vw, 17rem)",
            color: "transparent",
            WebkitTextStroke: light
              ? "1px rgba(242,242,240,0.13)"
              : "1px rgba(22,22,22,0.09)",
          } as CSSProperties
        }
      >
        {text}
      </p>
    </div>
  );
}

/**
 * Leans its children in the direction you scroll, harder the faster you go,
 * and springs back when you stop. One transform on one element.
 */
export function ScrollLean({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  // Scroll speed from a passive listener (scrollY over time) — no layout
  // reads, unlike framer's useScroll, which measured the page on resize.
  const rich = useMotionBudget();
  const lean = useMotionValue(0);
  const skewX = useSpring(lean, { stiffness: 260, damping: 40 });
  useEffect(() => {
    if (!rich) return;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let rest = 0;
    const onScroll = () => {
      const now = performance.now();
      const v = ((window.scrollY - lastY) / Math.max(8, now - lastT)) * 1000; // px/s
      lastY = window.scrollY;
      lastT = now;
      lean.set(Math.max(-max, Math.min(max, (-v / 2500) * max)));
      window.clearTimeout(rest);
      rest = window.setTimeout(() => lean.set(0), 90);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(rest);
    };
  }, [rich, max, lean]);
  return (
    <motion.div className={className} style={{ skewX: rich ? skewX : 0 }}>
      {children}
    </motion.div>
  );
}
