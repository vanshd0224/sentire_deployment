import { motion } from "framer-motion";
import { DISCOVERY_FRAGRANCES } from "./data";
import { EASE_OUT_EXPO } from "../motion";

/**
 * Six vials on a shallow 3D arc. The active one faces you; neighbours turn
 * away and recede. Drag, swipe or tap to move. Six elements with transforms
 * only, so it runs on phones as well.
 */
export default function Coverflow({
  active,
  onChange,
}: {
  active: number;
  onChange: (index: number) => void;
}) {
  const n = DISCOVERY_FRAGRANCES.length;

  return (
    <div
      className="relative mx-auto h-[300px] w-full max-w-4xl select-none sm:h-[360px]"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -350)
            onChange(Math.min(n - 1, active + 1));
          else if (info.offset.x > 50 || info.velocity.x > 350)
            onChange(Math.max(0, active - 1));
        }}
      >
        {DISCOVERY_FRAGRANCES.map((f, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => onChange(i)}
              aria-label={`Show ${f.name}`}
              aria-pressed={i === active}
              className="absolute left-1/2 top-1/2 w-[190px] cursor-pointer sm:w-[240px]"
              initial={false}
              animate={{
                x: `calc(-50% + ${offset * 62}%)`,
                y: "-50%",
                rotateY: offset * -38,
                z: -abs * 140,
                scale: i === active ? 1 : 0.86,
                opacity: abs > 2 ? 0 : 1 - abs * 0.22,
              }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              style={{ zIndex: n - abs, transformStyle: "preserve-3d" }}
            >
              <div className="aspect-square overflow-hidden rounded-[2px] shadow-[0_30px_50px_-30px_rgba(0,0,0,0.95)]">
                <img
                  src={f.img}
                  alt={`${f.name} 6ML travel spray`}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                 width="600" height="600"/>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
