import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { DISCOVERY_FRAGRANCES } from "./data";
import { usePrefersReducedMotion } from "../motion";

/**
 * The Discovery Set case as a real object: a CSS 3D box textured with the six
 * studio photographs, lit so each panel darkens as it turns away, with the six
 * vials orbiting it. Drag to spin (with inertia); it idles on its own; the page
 * scroll turns it round to the manifesto on the back.
 *
 * CSS 3D rather than WebGL: eleven composited layers, no extra library, and it
 * holds 60fps on mid-range phones. The spin loop pauses when off-screen.
 */

const FACES = "/discovery/cube";
// Real proportions of the case (front 204 × 330, depth 152).
const BOX = { w: 204, h: 330, d: 152 };
const IDLE_SPEED = 14; // degrees per second
const RING_SPEED = -7;

type Props = {
  /** 0 → 1 as the hero scrolls away; adds up to half a turn. */
  scrollTurn?: MotionValue<number>;
  onSelectVial?: (index: number) => void;
};

export default function BoxStage({ scrollTurn, onSelectVial }: Props) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stageRef, { amount: 0.1 });
  const [scale, setScale] = useState(1);
  const [ringR, setRingR] = useState(330);

  // Size the object to the viewport.
  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.min(1.05, Math.max(0.5, Math.min(w / 1000, h / 920)));
      setScale(s);
      setRingR(Math.min(w * 0.42, 360) / (w < 640 ? 1.05 : 1));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Rotation state: base angle (idle + drag inertia) plus the scroll turn.
  const base = useMotionValue(-28);
  const ring = useMotionValue(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const rotateY = useMotionValue(-28);
  const tiltTarget = useMotionValue(-13);
  const rotateX = useSpring(tiltTarget, { stiffness: 90, damping: 18 });

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    const dt = Math.min(delta, 50) / 1000;
    if (!dragging.current) {
      // Inertia decays back toward the idle spin.
      velocity.current +=
        ((reduced ? 0 : IDLE_SPEED) - velocity.current) * Math.min(1, dt * 1.6);
      base.set(base.get() + velocity.current * dt);
    }
    if (!reduced) ring.set(ring.get() + RING_SPEED * dt);
    rotateY.set(base.get() + (scrollTurn?.get() ?? 0) * 180);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect && e.pointerType === "mouse") {
      tiltTarget.set(-13 + ((e.clientY - rect.top) / rect.height - 0.5) * -14);
    }
    if (!dragging.current) return;
    const dx = e.movementX;
    base.set(base.get() + dx * 0.55);
    velocity.current = dx * 0.55 * 60;
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const { w, h, d } = BOX;

  return (
    <div
      ref={stageRef}
      className="relative h-full w-full touch-pan-y select-none"
      style={{ perspective: 1500, perspectiveOrigin: "50% 42%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        endDrag();
        tiltTarget.set(-13);
      }}
    >
      {/* Floor shadow, widening as the box turns diagonal */}
      <FloorShadow rotateY={rotateY} scale={scale} />

      <motion.div
        className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing"
        style={{
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          rotateX,
          scale,
        }}
      >
        {/* The case */}
        <motion.div style={{ transformStyle: "preserve-3d", rotateY }}>
          <Face
            src={`${FACES}/front.webp`}
            width={w}
            height={h}
            transform={`translateZ(${d / 2}px)`}
            normal={0}
            rotateY={rotateY}
            alt="Case front: SENTIRE Discovery Set, 6 ml × 6 parfum"
          />
          <Face
            src={`${FACES}/right.webp`}
            width={d}
            height={h}
            transform={`rotateY(90deg) translateZ(${w / 2}px)`}
            normal={90}
            rotateY={rotateY}
          />
          <Face
            src={`${FACES}/back.webp`}
            width={w}
            height={h}
            transform={`rotateY(180deg) translateZ(${d / 2}px)`}
            normal={180}
            rotateY={rotateY}
            alt="Case back: WARNING — The coolest thing somebody can own. Just feel it."
          />
          <Face
            src={`${FACES}/left.webp`}
            width={d}
            height={h}
            transform={`rotateY(-90deg) translateZ(${w / 2}px)`}
            normal={270}
            rotateY={rotateY}
            alt="Case side: Irresistibly rare"
          />
          <Face
            src={`${FACES}/top.webp`}
            width={w}
            height={d}
            transform={`rotateX(90deg) translateZ(${h / 2}px)`}
            rotateY={rotateY}
            top
          />
          <div
            className="absolute bg-[#121212]"
            style={{
              width: w,
              height: d,
              left: -w / 2,
              top: -d / 2,
              transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* The six vials, orbiting and always facing you */}
        <motion.div style={{ transformStyle: "preserve-3d", rotateY: ring }}>
          {DISCOVERY_FRAGRANCES.map((f, i) => (
            <OrbitVial
              key={f.id}
              index={i}
              src={f.img}
              name={f.name}
              radius={ringR / scale}
              ring={ring}
              onSelect={onSelectVial}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Face({
  src,
  width,
  height,
  transform,
  normal = 0,
  rotateY,
  top = false,
  alt = "",
}: {
  src: string;
  width: number;
  height: number;
  transform: string;
  normal?: number;
  rotateY: MotionValue<number>;
  top?: boolean;
  alt?: string;
}) {
  // Key light from the front-left: a panel darkens as it turns away, and a
  // soft sheen slides across it with the angle.
  const light = useTransform(rotateY, (r: number) => {
    const a = ((normal + r) * Math.PI) / 180;
    const facing = Math.cos(a);
    const shade = 0.72 * (1 - Math.max(0, facing)) + 0.08;
    const sheen = 50 + Math.sin(a) * 60;
    return `linear-gradient(100deg, transparent ${sheen - 18}%, rgba(255,255,255,${0.1 * Math.max(0, facing)}) ${sheen}%, transparent ${sheen + 18}%), rgba(0,0,0,${shade.toFixed(3)})`;
  });

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        width,
        height,
        left: -width / 2,
        top: -height / 2,
        transform,
        backfaceVisibility: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover"
      />
      {top ? (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/30" />
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{ background: light }}
        />
      )}
    </div>
  );
}

function FloorShadow({
  rotateY,
  scale,
}: {
  rotateY: MotionValue<number>;
  scale: number;
}) {
  // Projected footprint of the box: w·|cos| + d·|sin|.
  const sx = useTransform(rotateY, (r) => {
    const a = (r * Math.PI) / 180;
    return (
      (BOX.w * Math.abs(Math.cos(a)) + BOX.d * Math.abs(Math.sin(a))) / BOX.w
    );
  });
  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-10 w-[240px] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl"
      style={{ scaleX: sx, scale, y: (BOX.h / 2) * scale * 0.9 }}
    />
  );
}

function OrbitVial({
  index,
  src,
  name,
  radius,
  ring,
  onSelect,
}: {
  index: number;
  src: string;
  name: string;
  radius: number;
  ring: MotionValue<number>;
  onSelect?: (i: number) => void;
}) {
  const angle = index * 60;
  // Counter-rotate so each vial faces the viewer wherever it is on the orbit.
  const face = useTransform(ring, (r) => -(angle + r));
  // Vials passing behind the case dim slightly, which sells the depth.
  const dim = useTransform(ring, (r) => {
    const a = ((angle + r) * Math.PI) / 180;
    return 0.55 + 0.45 * Math.max(0, Math.cos(a));
  });

  return (
    <div
      className="absolute"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${index % 2 ? 36 : -24}px)`,
      }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect?.(index)}
        className="group absolute -left-[46px] -top-[46px] w-[92px] cursor-pointer text-left"
        style={{ rotateY: face, opacity: dim }}
        whileHover={{ scale: 1.08 }}
        aria-label={`Read about ${name}`}
      >
        <div className="aspect-square overflow-hidden rounded-[2px] shadow-[0_18px_30px_-18px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
          <img
            src={src}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-1.5 text-center font-mono text-[10px] uppercase tracking-[0.04em] text-paper/60 transition-colors group-hover:text-[color:var(--color-print)]">
          {name}
        </p>
      </motion.button>
    </div>
  );
}
