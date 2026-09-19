import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ALL_PERFUMES, type PerfumeProduct } from "../../data/perfumes";
import {
  EASE_OUT_EXPO,
  useMotionBudget,
  usePrefersReducedMotion,
} from "../motion";
import { Magnetic, Ticker } from "../discovery/fx";
import { Curtain, useCurtain } from "./Curtain";

/**
 * Home hero: an index of scents. The names are the hero — set huge, one
 * per line, like the contents page of a book. Point at a name and it
 * stretches wide (Archivo's width axis), its bottle slides out and trails
 * the pointer, and the paper takes on that bottle's colour. Leave it alone
 * and it reads through the list by itself.
 *
 * Budget: seven images, transforms and one font-stretch transition on the
 * row you're pointing at. Nothing runs while the hero is off screen.
 */

const PICKS: { id: string; tint: string }[] = [
  { id: "purple-oud", tint: "#c9b3dd" },
  { id: "midnight", tint: "#d9b3bb" },
  { id: "calantha", tint: "#efcfc3" },
  { id: "personna", tint: "#efc0cf" },
  { id: "seductive", tint: "#bccbd9" },
  { id: "0809", tint: "#e3cfa6" },
  { id: "white-oud", tint: "#ecdcb0" },
];

type Row = {
  id: string;
  tint: string;
  name: string;
  notes: string;
  price: number;
  img: string;
  product: PerfumeProduct;
};

const ROWS: Row[] = PICKS.flatMap((p) => {
  const product = ALL_PERFUMES.find((x) => x.id === p.id);
  if (!product) return [];
  return [
    {
      ...p,
      name: product.name,
      notes: product.traces.slice(0, 3).join(", "),
      price: product.prices[50] ?? Object.values(product.prices)[0],
      img: product.img,
      product,
    },
  ];
});

const STEP_MS = 2600;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export default function IndexHero({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate?: (page: any) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}) {
  const rich = useMotionBudget();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const curtain = useCurtain();
  const [ready, setReady] = useState(!curtain);
  const base = curtain ? 0.05 : 0.2;

  const [active, setActive] = useState(0);
  const [pointing, setPointing] = useState(false);
  const row = ROWS[active];

  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: 0.3 });

  // Reads through the list on its own until someone points at it.
  useEffect(() => {
    if (!ready || pointing || !inView || reduced) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % ROWS.length),
      STEP_MS,
    );
    return () => window.clearTimeout(t);
  }, [active, pointing, inView, reduced, ready]);

  // The bottle: follows the pointer while you're on the list, otherwise
  // parks beside whichever name is active.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.7 });
  const y = useSpring(my, { stiffness: 170, damping: 22, mass: 0.7 });
  const vx = useVelocity(x);
  const rotate = useTransform(vx, [-1800, 0, 1800], [-14, 0, 14], {
    clamp: true,
  });

  const FW = mobile ? 100 : 240;
  const FH = Math.round(FW * 1.25);

  useEffect(() => {
    if (pointing && rich) return;
    const list = listRef.current;
    const li = rowRefs.current[active];
    if (!list || !li) return;
    const cy = li.offsetTop + li.offsetHeight / 2;
    mx.set(list.clientWidth - FW - (mobile ? 0 : 24));
    my.set(cy - FH / 2);
  }, [active, pointing, rich, mobile, FW, FH, mx, my, ready]);

  const open = (r: Row) =>
    onSelectProduct ? onSelectProduct(r.product) : onNavigate?.("perfumes");

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full overflow-hidden bg-[#f2f2f0] text-ink"
      aria-label="The Sentire fragrances"
    >
      {curtain && !ready && <Curtain onDone={() => setReady(true)} />}

      {/* The paper takes on the colour of the bottle you're looking at */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[25%] top-[-20%] h-[140%] w-[110%] transition-[color] duration-[1200ms] lg:-right-[10%] lg:w-[80%]"
        style={{
          color: row.tint,
          background:
            "radial-gradient(closest-side, currentColor 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 pb-12 pt-10 md:px-10 lg:min-h-[max(700px,calc(100svh-126px))] lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-14 lg:pt-12">
        {/* ── Copy ── */}
        <div className="contents lg:relative lg:z-10 lg:col-span-4 lg:flex lg:flex-col">
          <motion.p
            className="order-1 font-mono text-[11px] uppercase text-ink/55 max-sm:text-[12px] lg:order-none"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: base, ease: EASE_OUT_EXPO }}
          >
            Sentire by PC · Extrait de parfum
          </motion.p>

          <h1 className="order-2 mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] lg:order-none lg:mt-6">
            {[
              { t: "Seven extraits.", cls: "font-serif uppercase" },
              { t: "One of them", cls: "accent-italic text-[#6b1422]" },
              { t: "is you.", cls: "accent-italic text-[#6b1422]" },
            ].map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${l.cls} ${i ? "text-[1.18em] leading-[0.92]" : ""}`}
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : {}}
                  transition={{
                    duration: 1,
                    delay: base + 0.08 + i * 0.09,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {l.t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="order-4 mt-6 max-w-[26rem] text-[16px] leading-relaxed text-ink/70 lg:order-none"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: base + 0.4,
              ease: EASE_OUT_EXPO,
            }}
          >
            35% and more perfume oil in every bottle, so it lasts the whole day.
            Can&rsquo;t pick? Try six of them in the ₹549 Discovery Set.
          </motion.p>

          <motion.div
            className="order-5 mt-7 flex flex-wrap items-center gap-3 lg:order-none"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: base + 0.5,
              ease: EASE_OUT_EXPO,
            }}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigate?.("perfumes")}
                className="group relative cursor-pointer overflow-hidden rounded-full bg-ink px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-paper"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-[#6b1422] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative">Shop all perfumes</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigate?.("discovery-set")}
                className="cursor-pointer rounded-full border border-ink/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                Discovery Set · ₹549
              </button>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="order-6 mt-10 grid max-w-[26rem] grid-cols-3 border-t border-ink/15 pt-5 lg:order-none lg:mt-auto"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: base + 0.7 }}
          >
            {[
              { v: 35, s: "%+", l: "Perfume oil" },
              { v: 12, s: "h", l: "On skin, up to" },
              { v: 999, p: "₹", l: "Free shipping over" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`flex flex-col-reverse ${i ? "border-l border-ink/15 pl-4" : "pr-4"}`}
              >
                <dt className="mt-1.5 text-[12px] text-ink/55">{s.l}</dt>
                <dd className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] leading-none">
                  <Ticker value={s.v} prefix={s.p ?? ""} suffix={s.s ?? ""} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── The index ── */}
        <div className="relative order-3 mt-8 lg:order-none lg:col-span-8 lg:mt-0">
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-2 font-mono text-[11px] uppercase text-ink/55 max-sm:text-[12px]">
            <span>Index of scents</span>
            <span>{mobile ? "Tap a name" : "Point at a name"}</span>
          </div>

          <ul
            ref={listRef}
            className="relative"
            onPointerMove={(e) => {
              if (!rich) return;
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - r.left + 28);
              my.set(e.clientY - r.top - FH / 2);
            }}
            onPointerEnter={() => rich && setPointing(true)}
            onPointerLeave={() => setPointing(false)}
            data-cursor="View"
          >
            {ROWS.map((r, i) => {
              const on = i === active;
              return (
                <li
                  key={r.id}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="border-b border-ink/15"
                >
                  <button
                    type="button"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => (mobile && !on ? setActive(i) : open(r))}
                    className="grid w-full cursor-pointer grid-cols-[2.2rem_1fr] items-baseline gap-2 py-1.5 text-left lg:grid-cols-[3rem_1fr] lg:py-1"
                    aria-label={`${r.name}: ${r.notes}. ₹${r.price}`}
                  >
                    <span
                      className={`font-mono text-[11px] tabular-nums transition-colors duration-500 max-sm:text-[12px] ${on ? "text-[#6b1422]" : "text-ink/40"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="block"
                      style={{ overflowX: "visible", overflowY: "clip" }}
                    >
                      <motion.span
                        className={`block whitespace-nowrap font-serif uppercase leading-[1.02] ${mobile ? "transition-colors" : "transition-[font-stretch,color,padding]"} duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "text-ink" : "text-ink/22"}`}
                        style={{
                          fontSize: mobile
                            ? "clamp(1.7rem, 8.2vw, 2.7rem)"
                            : "clamp(2.6rem, 5.2vw, 5.4rem)",
                          fontStretch: on ? (mobile ? "84%" : "125%") : "66%",
                          paddingLeft: on ? "0.14em" : "0em",
                        }}
                        initial={{ y: "105%" }}
                        animate={ready ? { y: "0%" } : {}}
                        transition={{
                          y: {
                            duration: 1,
                            delay: base + 0.15 + i * 0.06,
                            ease: EASE_OUT_EXPO,
                          },
                        }}
                      >
                        {r.name}
                      </motion.span>
                    </span>
                  </button>
                </li>
              );
            })}

            {/* The bottle */}
            {ready && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-20"
                style={{
                  x,
                  y,
                  rotate: rich ? rotate : 0,
                  width: FW,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: pointing ? 1.06 : 1 }}
                transition={{
                  duration: 0.8,
                  delay: base + 0.5,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <div className="overflow-hidden rounded-[3px] bg-paper shadow-[0_30px_60px_-20px_rgba(22,22,22,0.45)]">
                  <div
                    className="relative w-full overflow-hidden bg-paper-2"
                    style={{ height: FH }}
                  >
                    {ROWS.map((r, i) => (
                      <motion.img
                        key={r.id}
                        src={r.img}
                        alt=""
                        draggable={false}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={false}
                        animate={{
                          clipPath:
                            i === active
                              ? "inset(0% 0% 0% 0%)"
                              : "inset(100% 0% 0% 0%)",
                          scale: i === active ? 1 : 1.18,
                          zIndex: i === active ? 2 : 1,
                        }}
                        transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                      />
                    ))}
                  </div>
                  {!mobile && (
                    <div className="px-3.5 py-3">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={row.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-[12.5px] leading-snug text-ink/70">
                            {row.notes}
                          </p>
                          <p className="mt-1 flex justify-between text-[13px] tabular-nums">
                            <span>₹{row.price.toLocaleString("en-IN")}</span>
                            <span className="font-mono text-[11px] text-ink/50">
                              50ML
                            </span>
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </ul>

          {/* Mobile: what the active name is, and a way in */}
          <div className="mt-4 flex min-h-[3.5rem] items-center justify-between gap-4 lg:hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={row.id}
                className="text-[13px] leading-snug text-ink/70"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {row.notes}
                <br />
                <span className="tabular-nums text-ink">
                  ₹{row.price.toLocaleString("en-IN")} · 50ML
                </span>
              </motion.p>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => open(row)}
              className="shrink-0 cursor-pointer rounded-full bg-ink px-4 py-2.5 text-[12px] font-semibold uppercase text-paper"
            >
              View {row.name} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
