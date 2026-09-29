import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMotionBudget, usePrefersReducedMotion } from "../motion";

/**
 * Number that counts up the first time it scrolls into view, and springs to
 * any new value afterwards (the spray calculator re-uses it).
 */
export function Ticker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (!inView) return;
    if (reduced) spring.jump(value);
    else mv.set(value);
  }, [inView, value, mv, spring, reduced]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${v.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        }
      }),
    [spring, prefix, suffix, decimals],
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Button that leans toward the cursor. Desktop pointers only. */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const rich = useMotionBudget();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!rich) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts under the cursor with a soft light patch. Desktop only. */
export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const rich = useMotionBudget();
  const px = useSpring(0.5, { stiffness: 180, damping: 20 });
  const py = useSpring(0.5, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(px, [0, 1], [-max, max]);
  const rotateX = useTransform(py, [0, 1], [max, -max]);
  const light = useTransform(
    [px, py] as never,
    ([x, y]: number[]) =>
      `radial-gradient(40% 40% at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.22), transparent 70%)`,
  );

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        className="relative h-full"
        style={
          rich ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined
        }
        onPointerMove={(e) => {
          if (!rich || e.pointerType === "touch") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        {rich && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: light }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** A line of text struck through by a rule that draws itself. */
export function StrikeLine({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline">
      {children}
      <motion.span
        aria-hidden
        className="absolute left-0 top-1/2 h-px w-full origin-left bg-ink/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
