import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { DISCOVERY_FRAGRANCES, displayName } from "./data";
import { usePrefersReducedMotion } from "../motion";

/**
 * The Discovery Set case as a real object: a CSS 3D box textured with the
 * studio photographs, lit so each panel darkens as it turns away, with the six
 * vials orbiting it and always facing you.
 *
 * Performance: the idle spin, the per-panel lighting, the floor shadow and the
 * orbit are all Web Animations on transform/opacity, so the compositor runs
 * them with no JavaScript and no style recalculation per frame. JavaScript
 * only touches the timeline while you drag, while the throw decays, or while
 * the page scroll turns the box. Everything pauses off-screen.
 */

const FACES = "/discovery/cube";
const BOX = { w: 204, h: 330, d: 152 }; // real proportions of the case
const START = -28; // resting angle, degrees
const SPIN_MS = 26000; // one idle revolution
const ORBIT_MS = 52000; // one orbit of the vials (opposite direction)
const SAMPLES = 24; // keyframes per revolution for the lighting curves

type Props = {
  /** 0 → 1 as the hero scrolls away; adds up to half a turn. */
  scrollTurn?: MotionValue<number>;
  onSelectVial?: (index: number) => void;
};

const deg = (d: number) => (d * Math.PI) / 180;
const sweep = (fn: (angle: number) => Keyframe) =>
  Array.from({ length: SAMPLES + 1 }, (_, k) =>
    fn(START + (360 * k) / SAMPLES),
  );

export default function BoxStage({ scrollTurn, onSelectVial }: Props) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const vialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spin = useRef<Animation[]>([]); // box + lighting + shadow, one shared clock
  const orbit = useRef<Animation[]>([]); // ring + counter-rotations
  const [scale, setScale] = useState(1);
  const [ringR, setRingR] = useState(330);

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setScale(Math.min(1.05, Math.max(0.5, Math.min(w / 1000, h / 920))));
      setRingR(Math.min(w * 0.42, 360) / (w < 640 ? 1.05 : 1));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Build the compositor animations once the faces are in the DOM.
  useLayoutEffect(() => {
    const opts: KeyframeAnimationOptions = {
      duration: SPIN_MS,
      iterations: Infinity,
      easing: "linear",
    };
    const list: Animation[] = [];

    if (boxRef.current) {
      list.push(
        boxRef.current.animate(
          [
            { transform: `rotateY(${START}deg)` },
            { transform: `rotateY(${START + 360}deg)` },
          ],
          opts,
        ),
      );
    }
    // Lighting: each side panel darkens as it turns away from the key light.
    [0, 90, 180, 270].forEach((normal, i) => {
      const el = shadeRefs.current[i];
      if (!el) return;
      list.push(
        el.animate(
          sweep((a) => ({
            opacity: 0.72 * (1 - Math.max(0, Math.cos(deg(normal + a)))) + 0.06,
          })),
          opts,
        ),
      );
    });
    // Floor shadow follows the box's projected footprint: w·|cos| + d·|sin|.
    if (shadowRef.current) {
      list.push(
        shadowRef.current.animate(
          sweep((a) => ({
            transform: `translateX(-50%) scaleX(${(
              (BOX.w * Math.abs(Math.cos(deg(a))) +
                BOX.d * Math.abs(Math.sin(deg(a)))) /
              BOX.w
            ).toFixed(3)})`,
          })),
          opts,
        ),
      );
    }
    spin.current = list;

    const oOpts: KeyframeAnimationOptions = {
      duration: ORBIT_MS,
      iterations: Infinity,
      easing: "linear",
    };
    const o: Animation[] = [];
    if (ringRef.current) {
      o.push(
        ringRef.current.animate(
          [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-360deg)" }],
          oOpts,
        ),
      );
    }
    vialRefs.current.forEach((el, i) => {
      if (!el) return;
      const angle = i * 60;
      // Counter-rotate so the vial keeps facing the viewer, and dim it as it passes behind.
      o.push(
        el.animate(
          Array.from({ length: SAMPLES + 1 }, (_, k) => {
            const t = k / SAMPLES;
            const a = angle - 360 * t;
            return {
              transform: `rotateY(${-angle + 360 * t}deg)`,
              opacity: (0.55 + 0.45 * Math.max(0, Math.cos(deg(a)))).toFixed(3),
            };
          }),
          oOpts,
        ),
      );
    });
    orbit.current = o;

    return () => {
      list.forEach((a) => a.cancel());
      o.forEach((a) => a.cancel());
    };
  }, [ringR, scale]);

  // Pause everything off-screen and under reduced motion (drag still works).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const all = () => [...spin.current, ...orbit.current];
    const io = new IntersectionObserver(
      ([entry]) =>
        all().forEach((a) =>
          entry.isIntersecting && !reduced ? a.play() : a.pause(),
        ),
      { threshold: 0.05 },
    );
    io.observe(stage);
    if (reduced) all().forEach((a) => a.pause());
    return () => io.disconnect();
  }, [reduced, ringR, scale]);

  // Turn the box by moving its shared clock; keeps lighting and shadow in step.
  const turnBy = (degrees: number) => {
    spin.current.forEach((a) => {
      const t = Number(a.currentTime ?? 0) + (degrees / 360) * SPIN_MS;
      a.currentTime = ((t % SPIN_MS) + SPIN_MS) % SPIN_MS;
    });
  };

  // Page scroll adds up to half a turn — only runs while the page is scrolling.
  const lastTurn = useRef(0);
  const fallback = useSpring(0);
  useMotionValueEvent(scrollTurn ?? fallback, "change", (v) => {
    turnBy((v - lastTurn.current) * 180);
    lastTurn.current = v;
  });

  // Drag with a throw: the playback rate kicks up, then eases back to idle.
  const drag = useRef<{ x: number; t: number; v: number } | null>(null);
  const throwRaf = useRef(0);
  const setRate = (r: number) =>
    spin.current.forEach((a) => (a.playbackRate = r));
  const tilt = useSpring(-13, { stiffness: 90, damping: 18 });

  const onPointerDown = (e: React.PointerEvent) => {
    cancelAnimationFrame(throwRaf.current);
    drag.current = { x: e.clientX, t: performance.now(), v: 0 };
    spin.current.forEach((a) => a.pause());
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      const r = stageRef.current?.getBoundingClientRect();
      if (r) tilt.set(-13 + ((e.clientY - r.top) / r.height - 0.5) * -14);
    }
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    turnBy(dx * 0.55);
    d.v = (dx * 0.55) / Math.max(1, now - d.t); // degrees per ms
    d.x = e.clientX;
    d.t = now;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    if (reduced) return;
    const idle = 360 / SPIN_MS; // degrees per ms
    let rate = Math.max(-12, Math.min(12, d.v / idle));
    setRate(rate);
    spin.current.forEach((a) => a.play());
    const decay = () => {
      rate += (1 - rate) * 0.06;
      setRate(rate);
      if (Math.abs(rate - 1) > 0.02)
        throwRaf.current = requestAnimationFrame(decay);
      else setRate(1);
    };
    throwRaf.current = requestAnimationFrame(decay);
  };
  useEffect(() => () => cancelAnimationFrame(throwRaf.current), []);

  const { w, h, d } = BOX;

  const face = (
    key: string,
    width: number,
    height: number,
    transform: string,
    shadeIndex: number | null,
    alt = "",
  ) => (
    <div
      key={key}
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
        src={`${FACES}/${key}.webp`}
        alt={alt}
        draggable={false}
        decoding="async"
        className="h-full w-full object-cover"
      />
      {shadeIndex === null ? (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/30" />
      ) : (
        <div
          ref={(el) => {
            shadeRefs.current[shadeIndex] = el;
          }}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.1, willChange: "opacity" }}
        />
      )}
    </div>
  );

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
        tilt.set(-13);
      }}
    >
      {/* Floor shadow; its width follows the box via the shared clock */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translateY(${(BOX.h / 2) * scale * 0.9}px) scale(${scale})`,
        }}
        aria-hidden
      >
        <div
          ref={shadowRef}
          className="h-10 w-[240px] rounded-[50%] bg-black/70 blur-2xl"
          style={{ willChange: "transform" }}
        />
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing"
        style={{
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          rotateX: tilt,
          scale,
        }}
      >
        {/* The case */}
        <div
          ref={boxRef}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {face(
            "front",
            w,
            h,
            `translateZ(${d / 2}px)`,
            0,
            "Case front: SENTIRE Discovery Set, 6 ml × 6 parfum",
          )}
          {face("right", d, h, `rotateY(90deg) translateZ(${w / 2}px)`, 1)}
          {face(
            "back",
            w,
            h,
            `rotateY(180deg) translateZ(${d / 2}px)`,
            2,
            "Case back: WARNING — The coolest thing somebody can own. Just feel it.",
          )}
          {face(
            "left",
            d,
            h,
            `rotateY(-90deg) translateZ(${w / 2}px)`,
            3,
            "Case side: Irresistibly rare",
          )}
          {face("top", w, d, `rotateX(90deg) translateZ(${h / 2}px)`, null)}
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
        </div>

        {/* The six vials, orbiting and always facing you */}
        <div
          ref={ringRef}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {DISCOVERY_FRAGRANCES.map((f, i) => (
            <div
              key={f.id}
              className="absolute"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${i * 60}deg) translateZ(${ringR / scale}px) translateY(${i % 2 ? 36 : -24}px)`,
              }}
            >
              <div
                ref={(el) => {
                  vialRefs.current[i] = el;
                }}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectVial?.(i)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="group absolute -left-[46px] -top-[46px] w-[92px] cursor-pointer text-left transition-transform duration-300 hover:scale-[1.08]"
                  aria-label={`Read about ${displayName(f.name)}`}
                >
                  <div className="aspect-square overflow-hidden rounded-[2px] shadow-[0_18px_30px_-18px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
                    <img
                      src={f.img}
                      alt=""
                      draggable={false}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[10px] uppercase tracking-[0.04em] text-paper/60 transition-colors group-hover:text-[color:var(--color-print)]">
                    {displayName(f.name)}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
