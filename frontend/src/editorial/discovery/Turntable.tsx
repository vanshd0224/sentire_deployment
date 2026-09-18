import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { BOX_ANGLES } from "./data";
import { EASE_OUT_EXPO, useMotionBudget } from "../motion";

/**
 * The case photographed from five angles, presented like an object on a
 * turntable: each change turns the print through 90° in 3D, and the photo can
 * be dragged (or swiped) to turn it. The prints are ~340px wide, so the stage
 * shows them at print size rather than stretching them soft.
 */
export default function Turntable() {
  const rich = useMotionBudget();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const angle = BOX_ANGLES[index];

  const go = (next: number) => {
    const n = (next + BOX_ANGLES.length) % BOX_ANGLES.length;
    setState([n, next > index ? 1 : -1]);
  };

  // Pointer tilt on the stage (desktop).
  const px = useSpring(0, { stiffness: 160, damping: 20 });
  const py = useSpring(0, { stiffness: 160, damping: 20 });
  const tiltY = useTransform(px, [-1, 1], [-7, 7]);
  const tiltX = useTransform(py, [-1, 1], [5, -5]);

  return (
    <div>
      <div
        className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[2px] sm:aspect-[5/4]"
        style={{
          perspective: 1400,
          // Matches the studio backdrop the case was shot on (light top-right, falling off bottom-left).
          background:
            "linear-gradient(215deg, #e2e2e2 0%, #d6d6d6 38%, #c6c6c6 70%, #b5b5b5 100%)",
        }}
        onPointerMove={(e) => {
          if (!rich) return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width) * 2 - 1);
          py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {/* Frame counter, printed like a contact-sheet number */}
        <p className="ed-label absolute left-5 top-5 z-10 tabular-nums">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(BOX_ANGLES.length).padStart(2, "0")}
        </p>
        <p className="ed-label absolute right-5 top-5 z-10 hidden sm:block">
          Drag to turn
        </p>

        <motion.div
          className="relative h-[96%] w-auto"
          style={
            rich
              ? {
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
        >
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.img
              key={angle.id}
              src={angle.img}
              alt={angle.desc}
              custom={dir}
              draggable={false}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400)
                  go(index + 1);
                else if (info.offset.x > 60 || info.velocity.x > 400)
                  go(index - 1);
              }}
              variants={{
                enter: (d: number) => ({
                  rotateY: d >= 0 ? 80 : -80,
                  opacity: 0,
                  scale: 0.94,
                }),
                center: { rotateY: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({
                  rotateY: d >= 0 ? -80 : 80,
                  opacity: 0,
                  scale: 0.94,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className="h-full w-auto cursor-grab select-none object-contain active:cursor-grabbing"
              style={{
                backfaceVisibility: "hidden",
                // Feather the square photo into the stage so only the case reads.
                WebkitMaskImage:
                  "radial-gradient(ellipse 54% 58% at 50% 50%, #000 74%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 54% 58% at 50% 50%, #000 74%, transparent 100%)",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Prev / next */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          {[
            ["Previous angle", -1, "M15 6l-6 6 6 6"],
            ["Next angle", 1, "M9 6l6 6-6 6"],
          ].map(([label, step, d]) => (
            <button
              key={label as string}
              onClick={() => go(index + (step as number))}
              aria-label={label as string}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d={d as string}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 min-h-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={angle.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            <p className="ed-label">
              {angle.label} — {angle.tagline}
            </p>
            <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink-soft">
              {angle.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div
        className="hide-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Packaging views"
      >
        {BOX_ANGLES.map((a, i) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={i === index}
            aria-label={a.label}
            onClick={() => go(i)}
            className={`relative h-[72px] w-[60px] shrink-0 cursor-pointer overflow-hidden rounded-[2px] transition-opacity ${
              i === index ? "opacity-100" : "opacity-50 hover:opacity-85"
            }`}
          >
            <img
              src={a.img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {i === index && (
              <motion.span
                layoutId="turntable-mark"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-clay"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
