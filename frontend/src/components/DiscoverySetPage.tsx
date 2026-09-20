import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { PageName } from "../types/appTypes";
import {
  DISCOVERY_FRAGRANCES,
  FAQS,
  REVIEWS,
  displayName,
} from "../editorial/discovery/data";
import Prelude from "../editorial/discovery/Prelude";
import ScentReel from "../editorial/discovery/ScentReel";
import SprayTest from "../editorial/discovery/SprayTest";
import { Magnetic, StrikeLine, Ticker } from "../editorial/discovery/fx";
import {
  EASE_OUT_EXPO,
  viewportOnce,
  useMotionBudget,
} from "../editorial/motion";

interface DiscoverySetPageProps {
  onBackToHome?: () => void;
  onAddToCart?: (item: any) => void;
  onOpenCart?: () => void;
  onNavigate?: (page: PageName) => void;
}

const PRICE = 549;
const MRP = 999;
const TOTAL_SPRAYS = 360;
const byId = (id: string) => DISCOVERY_FRAGRANCES.find((f) => f.id === id)!;
const title = displayName;

// Lightest to deepest, so the week builds.
const WEEK = [
  "rich",
  "seductive",
  "calantha",
  "deep-crush",
  "mirai",
  "purple-oud",
].map(byId);

const INTRO =
  "Nobody should buy a full bottle after smelling a paper strip for five seconds. So all six of our extraits go into one case, six millilitres each. That is enough to wear every one for a week, on your own skin, on ordinary days, before you decide.";

export default function DiscoverySetPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
  onNavigate,
}: DiscoverySetPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [spraysPerDay, setSpraysPerDay] = useState(2);
  const [sprayPick, setSprayPick] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const preludeEnd = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const onScroll = () => {
      const past = (preludeEnd.current?.getBoundingClientRect().top ?? 1) < 0;
      const order = orderRef.current?.getBoundingClientRect();
      const orderVisible = order
        ? order.top < window.innerHeight && order.bottom > 0
        : false;
      setShowStickyBar(past && !orderVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const days = Math.round(TOTAL_SPRAYS / spraysPerDay);

  const addToCart = () => {
    onAddToCart?.({
      productId: "discovery-set",
      name: "SENTIRE Discovery Set (6 × 6ML)",
      price: PRICE,
      size: 36,
      quantity,
      image: "/discovery/studio/box-front.jpg",
      img: "/discovery/studio/box-front.jpg",
      variantTitle: "6 × 6ML Travel Sprays (36ML Total)",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const pickForSpray = (i: number) => {
    setSprayPick(i);
    sprayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toReel = () =>
    reelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="ds min-h-screen bg-paper text-ink antialiased">
      {/* ── 1. The case ─────────────────────────────────────────── */}
      <Prelude
        onAdd={addToCart}
        added={added}
        onHome={onBackToHome}
        onExplore={toReel}
        onSelectVial={toReel}
      />
      <div ref={preludeEnd} />

      {/* ── 2. Why a set: a paragraph that lights up as you read ── */}
      <section className="cv-section bg-paper py-24 md:py-36">
        <div className="ed-container">
          <p className="ed-label">Why a set</p>
          <LitParagraph text={INTRO} />
        </div>
      </section>

      {/* ── 3. The six ─────────────────────────────────────────── */}
      <div ref={reelRef}>
        <ScentReel onPick={pickForSpray} />
      </div>

      {/* ── 4. A week with the set ─────────────────────────────── */}
      <Week />

      {/* ── 5. The numbers ─────────────────────────────────────── */}
      <section className="cv-section on-dark bg-ink py-20 text-paper md:py-28">
        <div className="ed-container">
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em]">
            How far 36ML goes
          </h2>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {(
              [
                [6, "", "ML", "in each vial"],
                [60, "~", "", "sprays per vial"],
                [30, "~", "", "days per vial, at two sprays a day"],
                [35, "", "%+", "perfume oil — extrait strength"],
              ] as const
            ).map(([v, pre, suf, label]) => (
              <div key={label} className="border-t border-paper/20 pt-5">
                <dd className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-none">
                  <Ticker value={v} prefix={pre} suffix={suf} />
                </dd>
                <dt className="mt-3 max-w-[14rem] text-[14px] leading-snug text-paper/60">
                  {label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-6 border-t border-paper/20 pt-8 md:grid-cols-2">
            <p className="text-[17px] leading-relaxed text-paper/55">
              <StrikeLine>
                A paper strip: five seconds, top notes only, in a room of fifty
                other perfumes.
              </StrikeLine>
            </p>
            <p className="text-[17px] leading-relaxed">
              Your skin: twelve hours, the whole drydown, and what people say
              when they're standing next to you.
            </p>
          </div>

          {/* Calculator */}
          <div className="mt-16 rounded-[2px] border border-paper/15 p-6 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/55">
                  How long will 36ML last you?
                </p>
                <p className="mt-2 font-serif text-2xl font-light">
                  Pick your sprays a day.
                </p>
              </div>
              <div
                className="flex flex-wrap gap-1"
                role="group"
                aria-label="Sprays per day"
              >
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSpraysPerDay(n)}
                    aria-pressed={spraysPerDay === n}
                    className="relative min-h-[44px] cursor-pointer rounded-full px-4 text-[13px]"
                  >
                    {spraysPerDay === n && (
                      <motion.span
                        layoutId="spray-pill"
                        className="absolute inset-0 rounded-full bg-[color:var(--color-print)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={`relative ${spraysPerDay === n ? "text-[#141414]" : "text-paper/60"}`}
                    >
                      {n} a day
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat label="Days" value={<Ticker value={days} />} />
              <Stat
                label="Months"
                value={<Ticker value={days / 30} decimals={1} />}
              />
              <Stat
                label="Per day"
                value={<Ticker value={PRICE / days} decimals={2} prefix="₹" />}
              />
            </div>
            <div className="mt-8 grid grid-cols-12 gap-1.5" aria-hidden>
              {Array.from({ length: 12 }).map((_, m) => (
                <div
                  key={m}
                  className="h-1.5 overflow-hidden rounded-full bg-paper/10"
                >
                  <motion.div
                    className="h-full origin-left bg-[color:var(--color-print)]"
                    initial={false}
                    animate={{
                      scaleX: Math.max(0, Math.min(1, days / 30 - m)),
                    }}
                    transition={{
                      duration: 0.6,
                      delay: m * 0.03,
                      ease: EASE_OUT_EXPO,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Spray test ─────────────────────────────────────── */}
      <div ref={sprayRef} className="scroll-mt-20">
        <SprayTest key={sprayPick} startIndex={sprayPick} />
      </div>

      {/* ── 7. Reviews ─────────────────────────────────────────── */}
      <Reviews />

      {/* ── 8. What's in the box ───────────────────────────────── */}
      <section
        ref={orderRef}
        id="order"
        className="scroll-mt-20 bg-paper py-20 md:py-28"
      >
        <div className="ed-container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em]">
              What's in the box
            </h2>
            <div className="mt-10 flex items-end gap-5">
              <motion.img
                src="/discovery/studio/box-front.webp"
                alt="The Discovery Set case"
                loading="lazy"
                className="w-[44%] max-w-[240px] rounded-[2px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
              <div className="grid flex-1 grid-cols-3 gap-2">
                {DISCOVERY_FRAGRANCES.map((f, i) => (
                  <motion.img
                    key={f.id}
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    className="aspect-square w-full rounded-[2px] object-cover"
                    initial={{ opacity: 0, y: 20, rotate: ((i % 3) - 1) * 5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.06,
                      ease: EASE_OUT_EXPO,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ul className="border-t border-[color:var(--color-rule)]">
              {[
                [
                  "Six 6ML travel sprays",
                  "Purple Oud, Mirai, Calantha, Rich, Seductive and Deep Crush — at extrait strength.",
                ],
                [
                  "The case",
                  "Matte black flip-top with a magnetic clasp and a stepped tray, so all six stand in view.",
                ],
                [
                  "A scent map",
                  "Families, notes and when to wear each, on a card in the lid.",
                ],
              ].map(([t, b], i) => (
                <motion.li
                  key={t}
                  className="grid grid-cols-[28px_1fr] gap-3 border-b border-[color:var(--color-rule)] py-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <span className="font-mono text-[12px] text-stone">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-serif text-[21px] font-light">{t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                      {b}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="font-sans text-[3.25rem] font-light leading-none tracking-[-0.02em]">
                ₹{PRICE}
              </span>
              <span className="font-mono text-[13px] text-stone line-through">
                ₹{MRP}
              </span>
              <span className="font-mono text-[12px] text-clay">Save 45%</span>
            </div>
            <p className="mt-2 text-[14px] text-ink-soft">
              ₹91.50 a vial · 4.9 from 428 reviews
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-full border border-[color:var(--color-rule)]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-12 w-12 cursor-pointer text-lg"
                >
                  −
                </button>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={quantity}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-8 text-center tabular-nums"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="h-12 w-12 cursor-pointer text-lg"
                >
                  +
                </button>
              </div>
              <Magnetic className="min-w-[200px] flex-1">
                <motion.button
                  onClick={addToCart}
                  whileTap={{ scale: 0.97 }}
                  className="ed-btn ed-btn-solid w-full"
                >
                  {added
                    ? "Added to bag ✓"
                    : `Add to bag — ₹${(PRICE * quantity).toLocaleString("en-IN")}`}
                </motion.button>
              </Magnetic>
            </div>
            <button
              onClick={() => {
                addToCart();
                window.setTimeout(() => onOpenCart?.(), 200);
              }}
              className="ed-btn ed-btn-line mt-3 w-full"
            >
              Buy it now
            </button>

            <p className="mt-6 font-mono text-[11px] max-sm:text-[12px] uppercase leading-relaxed tracking-[0.04em] text-ink-soft">
              Dispatched within 24 hours · free express shipping, 2–4 days ·
              leak-proof, cabin-bag safe
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. Questions ───────────────────────────────────────── */}
      <section className="cv-section bg-paper-2 py-20 md:py-28">
        <div className="ed-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.025em]">
              Questions
            </h2>
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="ed-link mt-6 cursor-pointer text-[14px]"
            >
              Or go straight to the full bottles
            </button>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="border-t border-[color:var(--color-rule)] last:border-b"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-serif text-[19px] font-light leading-snug">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="mt-0.5 shrink-0 text-2xl font-light leading-none text-ink-soft"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-[15px] leading-[1.75] text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sticky purchase bar ────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 bottom-[62px] z-40 border-t border-white/10 bg-[#141312] text-paper lg:bottom-0"
          >
            <div className="ed-container flex items-center justify-between gap-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/discovery/cube/front.webp"
                  alt=""
                  className="hidden h-11 w-7 rounded-[1px] object-cover sm:block"
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px]">
                    The Discovery Set — 6 × 6ML
                  </p>
                  <p className="font-mono text-[12px] tabular-nums text-paper/60">
                    ₹{PRICE}{" "}
                    <span className="text-paper/35 line-through">₹{MRP}</span>
                  </p>
                </div>
              </div>
              {/* mr-* leaves room for the floating concierge button bottom-right */}
              <button
                onClick={addToCart}
                className="ed-btn mr-20 shrink-0 bg-[color:var(--color-print)] !text-[#141414] hover:bg-paper lg:mr-24"
              >
                {added ? "Added ✓" : "Add to bag"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/50">
        {label}
      </p>
      <p className="mt-2 font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-none">
        {value}
      </p>
    </div>
  );
}

/** A paragraph whose words light up one by one as it scrolls through the view. */
function LitParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  // One motion value per word means ~40 style writes per scroll frame. Worth
  // it on a laptop, not on a phone — there the paragraph is simply read.
  const rich = useMotionBudget();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="mt-6 max-w-5xl font-serif font-light leading-[1.18] tracking-[-0.02em]"
      style={{ fontSize: "clamp(1.9rem, 4.4vw, 4rem)" }}
    >
      {rich ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <LitWord
                key={i}
                word={w}
                progress={scrollYProgress}
                start={i / words.length}
                end={(i + 1) / words.length}
              />
            ))}
          </span>
        </>
      ) : (
        text
      )}
    </p>
  );
}

function LitWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Seven days laid out as a strip; a rule draws across them as you scroll. */
function Week() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });

  return (
    <section className="cv-section bg-paper py-20 md:py-28">
      <div className="ed-container">
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em]">
          Wear one a day for six days
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
          Lightest first, deepest last. Wear each on pulse points in the morning
          and notice which one people ask about by evening.
        </p>

        <div ref={ref} className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[11px] hidden h-px bg-[color:var(--color-rule)] md:block"
          />
          <motion.div
            aria-hidden
            className="on-dark absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-ink md:block"
            style={{ scaleX: draw }}
          />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 md:grid-cols-7">
            {WEEK.map((f, i) => (
              <motion.li
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <span className="relative z-10 inline-flex h-6 items-center bg-paper pr-2 font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-ink-soft">
                  Day {i + 1}
                </span>
                <motion.div
                  className="mt-4 aspect-square overflow-hidden rounded-[2px]"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <p className="mt-3 font-serif text-[19px] font-light">
                  {title(f.name)}
                </p>
                <p className="text-[13px] leading-snug text-ink-soft">
                  {f.character}
                </p>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO }}
            >
              <span className="relative z-10 inline-flex h-6 items-center bg-paper pr-2 font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-clay">
                Day 7
              </span>
              <div className="on-dark mt-4 flex aspect-square items-center justify-center rounded-[2px] bg-ink p-4 text-center">
                <p className="font-serif text-[22px] font-light italic leading-tight text-paper">
                  Wear the one they asked about.
                </p>
              </div>
              <p className="mt-3 font-serif text-[19px] font-light">
                Your signature
              </p>
              <p className="text-[13px] leading-snug text-ink-soft">
                Then order the full 50ML
              </p>
            </motion.li>
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Quotes on two rows drifting in opposite directions; pauses under the cursor. */
function Reviews() {
  const quotes = [...REVIEWS, ...REVIEWS];
  return (
    <section className="cv-section on-dark overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="ed-container">
        <p className="font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/55">
          4.9 · 428 verified reviews
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em]">
          Reviews
        </h2>
      </div>
      <div className="group mt-14 space-y-5">
        {[0, 1].map((row) => (
          <div key={row} className="flex overflow-hidden">
            <div
              className="ed-marquee flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused]"
              style={{
                animation: `${row ? "edMarqueeR" : "edMarqueeL"} ${row ? 58 : 48}s linear infinite`,
              }}
            >
              {[...quotes, ...quotes].map((r, i) => (
                <figure
                  key={`${row}-${i}`}
                  className="w-[78vw] max-w-[440px] shrink-0 rounded-[2px] border border-paper/15 p-6 sm:w-[440px]"
                >
                  <p className="font-mono text-[11px] max-sm:text-[12px] text-[color:var(--color-print)]">
                    ★★★★★
                  </p>
                  <blockquote className="mt-3 font-serif text-[18px] font-light leading-[1.55] text-paper/90">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-[11px] max-sm:text-[12px] uppercase tracking-[0.04em] text-paper/45">
                    {r.name} — verified buyer
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
