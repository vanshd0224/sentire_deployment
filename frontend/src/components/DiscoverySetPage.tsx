import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { PageName } from "../types/appTypes";
import {
  BOX_ANGLES,
  CLOSING,
  DISCOVERY_FRAGRANCES,
  FAQS,
  LAYERING_RECIPES,
  PACKAGING_FEATURES,
  PACKAGING_WARNING,
  PAPER_STRIP,
  PERKS,
  REVIEWS,
  RITUAL,
  RITUAL_QUOTE,
  SENTIRE_WAY,
  SPECS,
  WHY_6ML_QUOTE,
} from "../editorial/discovery/data";
import Turntable from "../editorial/discovery/Turntable";
import Unboxing from "../editorial/discovery/Unboxing";
import Coverflow from "../editorial/discovery/Coverflow";
import {
  Magnetic,
  StrikeLine,
  Ticker,
  TiltCard,
} from "../editorial/discovery/fx";
import { MaskedHeading } from "../editorial/Primitives";
import {
  EASE_OUT_EXPO,
  useMotionBudget,
  viewportOnce,
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

// The live layering studio pairs the three warm bases with the three bright accents.
const BASES = DISCOVERY_FRAGRANCES.slice(0, 3);
const ACCENTS = DISCOVERY_FRAGRANCES.slice(3);

export default function DiscoverySetPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
  onNavigate,
}: DiscoverySetPageProps) {
  const [fragranceIndex, setFragranceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [spraysPerDay, setSpraysPerDay] = useState(2);
  const [baseId, setBaseId] = useState(BASES[0].id);
  const [accentId, setAccentId] = useState(ACCENTS[0].id);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const onScroll = () => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) setShowStickyBar(rect.bottom < 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fragrance = DISCOVERY_FRAGRANCES[fragranceIndex];
  const base = DISCOVERY_FRAGRANCES.find((f) => f.id === baseId)!;
  const accent = DISCOVERY_FRAGRANCES.find((f) => f.id === accentId)!;
  const recipe = LAYERING_RECIPES.find(
    (r) => r.base === baseId && r.accent === accentId,
  ) ?? {
    name: `${base.name} × ${accent.name}`,
    ratio: `2 sprays ${base.name} + 1 spray ${accent.name}`,
    description: `A custom fusion of ${base.character.toLowerCase()} deepened with a spark of ${accent.character.toLowerCase()}. Completely unique to your skin.`,
    vibe: "Bespoke personal alchemy",
  };

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

  const showFragrance = (i: number) => {
    setFragranceIndex(i);
    explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="ed-container pb-2 pt-6">
        <ol className="ed-label flex flex-wrap items-center gap-2">
          <li>
            <button
              onClick={onBackToHome}
              className="cursor-pointer hover:text-ink"
            >
              Home
            </button>
          </li>
          <li aria-hidden>/</li>
          <li>
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="cursor-pointer hover:text-ink"
            >
              Haute parfumerie
            </button>
          </li>
          <li aria-hidden>/</li>
          <li className="text-ink">Discovery set (6 × 6ML)</li>
        </ol>
      </nav>

      {/* ── 1. Hero: gallery + purchase console ────────────────── */}
      <section ref={heroRef} className="ed-container pb-14 pt-4 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            <Turntable />

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[color:var(--color-rule)] pt-5">
              {SPECS.map(([k, v]) => (
                <div key={k}>
                  <dt className="ed-label">{k}</dt>
                  <dd className="mt-1.5 text-[14px]">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="lg:col-span-5">
            <HeroConsole
              fragranceIndex={fragranceIndex}
              setFragranceIndex={setFragranceIndex}
              quantity={quantity}
              setQuantity={setQuantity}
              added={added}
              onAdd={addToCart}
              onBuyNow={() => {
                addToCart();
                window.setTimeout(() => onOpenCart?.(), 200);
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. What's inside ───────────────────────────────────── */}
      <section className="overflow-x-clip bg-ink text-paper">
        <div className="ed-container pb-4 pt-16 md:pt-24">
          <div className="h-px w-full bg-paper/20" />
          <p className="ed-label mt-5 !text-paper/55">The 6ML curation</p>
          <MaskedHeading
            text="What's inside the case."
            className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]"
          />
          <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-paper/70">
            Six 6ML sprays, presented in a matte black flip-top case with a gold
            SENTIRE emblem and an oxblood interior. Each vial sits in a stepped
            layout so the full set is visible the moment you open it. A
            scent-map card inside guides you through all six.
          </p>
        </div>

        <Unboxing onSelect={showFragrance} />

        {/* Explorer */}
        <div
          ref={explorerRef}
          className="ed-container scroll-mt-24 pb-16 pt-10 md:pb-24"
        >
          <div
            className="hide-scrollbar flex gap-6 overflow-x-auto border-b border-paper/15"
            role="tablist"
          >
            {DISCOVERY_FRAGRANCES.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={i === fragranceIndex}
                onClick={() => setFragranceIndex(i)}
                className={`relative min-h-[44px] shrink-0 cursor-pointer pb-3 text-[15px] transition-colors ${
                  i === fragranceIndex
                    ? "text-paper"
                    : "text-paper/45 hover:text-paper/80"
                }`}
              >
                {f.name}
                {i === fragranceIndex && (
                  <motion.span
                    layoutId="scent-tab"
                    className="absolute inset-x-0 -bottom-px h-px bg-paper"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Coverflow active={fragranceIndex} onChange={setFragranceIndex} />
              <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.02em] text-paper/40">
                Drag or tap to turn
              </p>
            </div>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fragrance.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  {/* Vial label, set like the printed sticker */}
                  <div className="inline-flex flex-col border border-paper/25 px-4 py-3 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.06em] text-paper/70">
                    <span>Sentire haute · 6ML extrait</span>
                    <span className="text-paper">{fragrance.name}</span>
                    <span>55–60 sprays · anodised atomiser</span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/55">
                      {fragrance.familyBadge}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-clay-light">
                      Compliment index {fragrance.complimentScore}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-none">
                    {fragrance.name}
                  </h3>
                  <p className="mt-3 font-serif text-lg font-light italic text-paper/70">
                    {fragrance.tagline}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-paper/75">
                    {fragrance.vialDescription}
                  </p>

                  <dl className="mt-7">
                    {[
                      ["Top", fragrance.topNotes],
                      ["Heart", fragrance.heartNotes],
                      ["Base", fragrance.baseNotes],
                    ].map(([label, notes], i) => (
                      <motion.div
                        key={label}
                        className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-t border-paper/12 py-3.5"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.12 + i * 0.08,
                          ease: EASE_OUT_EXPO,
                        }}
                      >
                        <dt className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/45">
                          {label}
                        </dt>
                        <dd className="font-serif text-[17px] font-light">
                          {notes}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>

                  <div className="grid grid-cols-3 gap-5 border-t border-paper/12 pt-5">
                    {[
                      ["Projection", fragrance.sillage],
                      ["Longevity", fragrance.longevity],
                      ["Best setting", fragrance.bestTime],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/45">
                          {k}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-snug">{v}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 border-l border-clay-light/60 pl-4 text-[14px] leading-relaxed text-paper/70">
                    <span className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/50">
                      Layering role ({fragrance.layeringRole}) —{" "}
                    </span>
                    {fragrance.layeringTip}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* The six, as cards */}
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {DISCOVERY_FRAGRANCES.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <TiltCard className="h-full">
                  <button
                    type="button"
                    onClick={() => showFragrance(i)}
                    className="flex h-full w-full cursor-pointer flex-col text-left"
                  >
                    <div className="aspect-square overflow-hidden rounded-[2px]">
                      <img
                        src={f.img}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.02em] text-paper/45">
                      No. {String(i + 1).padStart(2, "0")} · {f.character}
                    </p>
                    <p className="mt-1 font-serif text-[19px] font-light">
                      {f.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-paper/60">
                      {f.tagline}
                    </p>
                    <p className="mt-auto pt-3 text-[13px] text-paper/80">
                      <span className="ed-link">View notes</span>
                    </p>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Why 6ML matters ─────────────────────────────────── */}
      <section className="bg-paper py-16 md:py-24">
        <div className="ed-container">
          <div className="h-px w-full bg-[color:var(--color-rule)]" />
          <p className="ed-label mt-5">The scent science</p>
          <MaskedHeading
            text="Why 6ML matters."
            className="mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]"
          />
          <motion.blockquote
            className="mt-6 max-w-3xl font-serif text-[clamp(1.15rem,2.2vw,1.5rem)] font-light italic leading-[1.55] text-ink-soft"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            “{WHY_6ML_QUOTE}”
          </motion.blockquote>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <ComparisonColumn data={PAPER_STRIP} negative />
            <ComparisonColumn data={SENTIRE_WAY} />
          </div>

          {/* Calculator */}
          <div className="mt-16 border-t border-[color:var(--color-rule)] pt-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="ed-label">Calculate your wear time across 36ML</p>
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light">
                  Choose your average daily sprays.
                </h3>
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
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={`relative ${spraysPerDay === n ? "text-paper" : "text-ink-soft"}`}
                    >
                      {n} {n === 1 ? "spray" : "sprays"} / day
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="border-t border-[color:var(--color-rule)] pt-5">
                <dt className="ed-label">Total sprays</dt>
                <dd className="mt-2 font-serif text-[3rem] font-light leading-none">
                  <Ticker value={TOTAL_SPRAYS} />
                </dd>
                <p className="mt-2 text-[13px] text-ink-soft">
                  60 sprays × 6 vials
                </p>
              </div>
              <div className="border-t border-[color:var(--color-rule)] pt-5">
                <dt className="ed-label">Days of continuous wear</dt>
                <dd className="mt-2 font-serif text-[3rem] font-light leading-none">
                  <Ticker value={days} />
                </dd>
                <p className="mt-2 text-[13px] text-ink-soft">
                  {(days / 30).toFixed(1)} months of fragrance
                </p>
              </div>
              <div className="border-t border-[color:var(--color-rule)] pt-5">
                <dt className="ed-label">Cost per day</dt>
                <dd className="mt-2 font-serif text-[3rem] font-light leading-none">
                  <Ticker value={PRICE / days} decimals={2} prefix="₹" />
                </dd>
                <p className="mt-2 text-[13px] text-ink-soft">
                  Haute perfumery value
                </p>
              </div>
            </dl>

            {/* Twelve months, filled by how long the set lasts */}
            <div className="mt-10" aria-hidden>
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }).map((_, m) => {
                  const fill = Math.max(0, Math.min(1, days / 30 - m));
                  return (
                    <div
                      key={m}
                      className="h-2 overflow-hidden rounded-full bg-paper-2"
                    >
                      <motion.div
                        className="h-full origin-left bg-ink"
                        initial={false}
                        animate={{ scaleX: fill }}
                        transition={{
                          duration: 0.6,
                          delay: m * 0.03,
                          ease: EASE_OUT_EXPO,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.02em] text-stone">
                <span>Month 1</span>
                <span>Month 12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. How to wear the set + layering lab ──────────────── */}
      <section className="bg-paper-2 py-16 md:py-24">
        <div className="ed-container">
          <div className="h-px w-full bg-[color:var(--color-rule)]" />
          <p className="ed-label mt-5">The 3-step scent ritual</p>
          <MaskedHeading
            text="How to wear the set."
            className="mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]"
          />
          <p className="mt-6 max-w-3xl font-serif text-[clamp(1.15rem,2.2vw,1.5rem)] font-light italic leading-[1.55] text-ink-soft">
            “{RITUAL_QUOTE}”
          </p>

          <Ritual />

          {/* Layering laboratory */}
          <div className="mt-20 border-t border-[color:var(--color-rule)] pt-10">
            <p className="ed-label">Interactive scent alchemist</p>
            <h3 className="mt-3 font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-[-0.02em]">
              The layering laboratory.
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              Pair a warm base with a bright top note to create a formula that
              exists nowhere else.
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="space-y-8 lg:col-span-5">
                <Picker
                  step="Step A — deep base"
                  where="Chest & pulse points"
                  options={BASES}
                  value={baseId}
                  onChange={setBaseId}
                />
                <Picker
                  step="Step B — bright accent"
                  where="Neck & collar"
                  options={ACCENTS}
                  value={accentId}
                  onChange={setAccentId}
                />
              </div>

              <div className="lg:col-span-7">
                <Blend base={base} accent={accent} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={recipe.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    className="mt-8"
                  >
                    <p className="ed-label">Custom blend formula</p>
                    <h4 className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-tight">
                      {recipe.name}
                    </h4>
                    <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.02em] text-clay">
                      Ratio: {recipe.ratio}
                    </p>
                    <p className="mt-4 max-w-lg font-serif text-[18px] font-light italic leading-[1.6] text-ink-soft">
                      “{recipe.description}”
                    </p>
                    <p className="ed-label mt-4">Vibe: {recipe.vibe}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Packaging ───────────────────────────────────────── */}
      <section className="bg-ink py-16 text-paper md:py-24">
        <div className="ed-container grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Spotlight />
          </div>

          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/55">
              Actual packaging copy
            </p>
            <p className="mt-3 font-serif text-xl font-light italic text-paper/80">
              “{PACKAGING_WARNING}”
            </p>
            <h2 className="mt-8 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]">
              Matte black. Oxblood velvet. Stepped revelation.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-paper/70">
              From the weighted tactile snap of the flip-top magnetic clasp to
              the rich oxblood interior tiering, the Discovery Set was designed
              not as sample packaging, but as a keepsake.
            </p>

            <ol className="mt-8">
              {PACKAGING_FEATURES.map((feat, i) => (
                <motion.li
                  key={feat.title}
                  className="grid grid-cols-[40px_1fr] gap-4 border-t border-paper/15 py-5"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <span className="font-mono text-[12px] text-paper/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-light">
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-paper/65">
                      {feat.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <Magnetic className="mt-6">
              <button
                onClick={addToCart}
                className="ed-btn bg-paper !text-ink hover:bg-clay hover:!text-paper"
              >
                {added ? "Added to bag ✓" : `Acquire the set — ₹${PRICE}`}
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ── 6. Reviews ─────────────────────────────────────────── */}
      <section id="reviews" className="scroll-mt-24 bg-paper py-16 md:py-24">
        <div className="ed-container">
          <div className="h-px w-full bg-[color:var(--color-rule)]" />
          <p className="ed-label mt-5">Real impressions</p>
          <MaskedHeading
            text="Loved by scent connoisseurs."
            className="mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]"
          />
          <p className="mt-4 text-[15px] text-ink-soft">
            Verified buyers on skin chemistry, projection, and the 6ML format.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                className="border-t border-ink pt-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <Stars />
                <blockquote className="mt-4 font-serif text-[19px] font-light leading-[1.55]">
                  “{r.quote}”
                </blockquote>
                <figcaption className="ed-label mt-5">
                  {r.name} — verified buyer
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ─────────────────────────────────────────────── */}
      <section className="bg-paper-2 py-16 md:py-24">
        <div className="ed-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="ed-label">Curated answers</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]">
              Frequently asked questions.
            </h2>
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

      {/* ── 8. Closing ─────────────────────────────────────────── */}
      <ClosingBand
        added={added}
        onAdd={addToCart}
        onBrowse={() => onNavigate?.("perfumes")}
      />

      {/* ── Sticky purchase bar ────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 bottom-[62px] z-40 border-t border-[color:var(--color-rule)] bg-paper/95 backdrop-blur-sm lg:bottom-0"
          >
            <div className="ed-container flex items-center justify-between gap-4 py-3 pr-24 lg:pr-28">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={BOX_ANGLES[0].img}
                  alt=""
                  className="hidden h-11 w-9 rounded-[2px] object-cover sm:block"
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px]">
                    Discovery set — 6 × 6ML
                  </p>
                  <p className="font-mono text-[12px] tabular-nums text-ink-soft">
                    ₹{PRICE}{" "}
                    <span className="text-stone line-through">₹{MRP}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="ed-btn ed-btn-solid shrink-0"
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

function HeroConsole({
  fragranceIndex,
  setFragranceIndex,
  quantity,
  setQuantity,
  added,
  onAdd,
  onBuyNow,
}: {
  fragranceIndex: number;
  setFragranceIndex: (i: number) => void;
  quantity: number;
  setQuantity: (fn: (q: number) => number) => void;
  added: boolean;
  onAdd: () => void;
  onBuyNow: () => void;
}) {
  const f = DISCOVERY_FRAGRANCES[fragranceIndex];
  const item = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE_OUT_EXPO },
  });

  return (
    <div className="lg:sticky lg:top-28">
      <motion.p className="ed-label" {...item(0)}>
        Sentire haute parfumerie
      </motion.p>
      <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1] tracking-[-0.035em]">
        <span className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            The Discovery Set
          </motion.span>
        </span>
      </h1>
      <motion.p
        className="mt-3 font-serif text-xl font-light italic text-ink-soft"
        {...item(2)}
      >
        Six fragrances. One box. Find the one that's yours.
      </motion.p>

      <motion.div
        className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
        {...item(3)}
      >
        <span className="flex items-center gap-2 text-[14px]">
          <Stars />
          <span className="tabular-nums">4.9</span>
          <a href="#reviews" className="ed-link text-ink-soft">
            428 verified reviews
          </a>
        </span>
        <span className="ed-label !text-clay">Selling fast</span>
      </motion.div>

      <motion.div
        className="mt-7 border-y border-[color:var(--color-rule)] py-6"
        {...item(4)}
      >
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-[3rem] font-light leading-none">
            <Ticker value={PRICE} prefix="₹" />
          </span>
          <span className="font-mono text-[13px] tabular-nums text-stone line-through">
            ₹{MRP}
          </span>
          <span className="font-mono text-[12px] text-clay">Save 45%</span>
        </div>
        <p className="mt-3 flex flex-wrap justify-between gap-2 text-[14px] text-ink-soft">
          <span>Only ₹91.50 per 6ML travel spray</span>
          <span className="flex items-center gap-2 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
            </span>
            In stock & ready to ship
          </span>
        </p>
      </motion.div>

      <motion.blockquote
        className="mt-6 border-l border-clay pl-5 font-serif text-[17px] font-light italic leading-[1.6] text-ink-soft"
        {...item(5)}
      >
        “Choosing a signature scent shouldn't mean committing to a full bottle
        you've never smelled. The Discovery Set gives you six of our fragrances
        in 6ML travel sprays — enough to live with each one properly, on your
        own skin, across your own days.”
      </motion.blockquote>

      <motion.div className="mt-8" {...item(6)}>
        <div className="flex items-baseline justify-between gap-4">
          <p className="ed-label">The six fragrances included</p>
          <p className="ed-label">Tap to preview</p>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2">
          {DISCOVERY_FRAGRANCES.map((fr, i) => (
            <button
              key={fr.id}
              onClick={() => setFragranceIndex(i)}
              aria-pressed={i === fragranceIndex}
              title={fr.name}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-[2px]"
            >
              <img
                src={fr.img}
                alt={fr.name}
                loading="lazy"
                className={`h-full w-full object-cover transition-all duration-300 ${
                  i === fragranceIndex
                    ? "scale-105"
                    : "opacity-55 grayscale-[40%] hover:opacity-90"
                }`}
              />
              {i === fragranceIndex && (
                <motion.span
                  layoutId="console-vial"
                  className="absolute inset-0 rounded-[2px] ring-1 ring-inset ring-ink"
                />
              )}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={f.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-[13px] text-ink-soft"
          >
            <span className="text-ink">{f.name}</span> — {f.tagline}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-wrap items-center gap-3"
        {...item(7)}
      >
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
            onClick={onAdd}
            whileTap={{ scale: 0.97 }}
            className="ed-btn ed-btn-solid w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "added" : "add"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {added
                  ? "Added to bag ✓"
                  : `Add to bag — ₹${(PRICE * quantity).toLocaleString("en-IN")}`}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </Magnetic>
      </motion.div>

      <motion.button
        onClick={onBuyNow}
        className="ed-btn ed-btn-line mt-3 w-full"
        {...item(8)}
      >
        Instant buy & checkout
      </motion.button>

      <motion.dl
        className="mt-8 space-y-3 border-t border-[color:var(--color-rule)] pt-6"
        {...item(9)}
      >
        {PERKS.map(([title, body]) => (
          <div
            key={title}
            className="grid grid-cols-[minmax(0,11rem)_1fr] gap-4"
          >
            <dt className="text-[14px]">{title}</dt>
            <dd className="text-[14px] text-ink-soft">{body}</dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}

function ComparisonColumn({
  data,
  negative = false,
}: {
  data: typeof PAPER_STRIP;
  negative?: boolean;
}) {
  return (
    <div className={negative ? "text-ink-soft" : ""}>
      <p className={`ed-label ${negative ? "" : "!text-clay"}`}>
        {data.kicker}
      </p>
      <h3 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2rem)] font-light">
        {data.title}
      </h3>
      <p className="mt-1.5 text-[14px] text-ink-soft">{data.sub}</p>
      <ul className="mt-6">
        {data.points.map(([title, body], i) => (
          <motion.li
            key={title}
            className="grid grid-cols-[22px_1fr] gap-3 border-t border-[color:var(--color-rule)] py-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT_EXPO }}
          >
            <span
              aria-hidden
              className={`mt-0.5 font-mono text-[13px] ${negative ? "text-stone" : "text-ink"}`}
            >
              {negative ? "×" : "✓"}
            </span>
            <p className="text-[15px] leading-relaxed">
              {negative ? (
                <StrikeLine delay={0.3 + i * 0.12}>
                  <span className="text-ink">{title}.</span>
                </StrikeLine>
              ) : (
                <span className="text-ink">{title}.</span>
              )}{" "}
              <span className="text-ink-soft">{body}</span>
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Three steps joined by a rule that draws itself as you scroll through them. */
function Ritual() {
  const ref = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol
      ref={ref}
      className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[18px] hidden h-px bg-[color:var(--color-rule)] md:block"
      />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-[18px] hidden h-px origin-left bg-ink md:block"
        style={{ scaleX: draw }}
      />
      {RITUAL.map((step, i) => (
        <motion.li
          key={step.n}
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_OUT_EXPO }}
        >
          <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[12px] text-paper">
            {step.n}
          </span>
          <h3 className="mt-5 font-serif text-2xl font-light">{step.title}</h3>
          <p className="mt-2 max-w-sm text-[15px] leading-[1.7] text-ink-soft">
            {step.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

function Picker({
  step,
  where,
  options,
  value,
  onChange,
}: {
  step: string;
  where: string;
  options: typeof DISCOVERY_FRAGRANCES;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="ed-label !text-ink">{step}</p>
        <p className="ed-label">{where}</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {options.map((f) => {
          const on = value === f.id;
          return (
            <motion.button
              key={f.id}
              onClick={() => onChange(f.id)}
              aria-pressed={on}
              whileTap={{ scale: 0.97 }}
              className={`cursor-pointer rounded-[2px] border p-2 text-left transition-colors ${
                on
                  ? "border-ink bg-paper"
                  : "border-[color:var(--color-rule)] hover:border-ink/40"
              }`}
            >
              <div className="aspect-square overflow-hidden rounded-[2px]">
                <img
                  src={f.img}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover transition-all duration-300 ${on ? "" : "opacity-70 grayscale-[30%]"}`}
                />
              </div>
              <p className="mt-2 font-serif text-[16px] font-light leading-tight">
                {f.name}
              </p>
              <p className="text-[12px] text-ink-soft">{f.character}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Two washes of colour — one per fragrance — drifting together. Multiply
 * blending on paper mixes them where they overlap, like two inks on a blotter.
 */
function Blend({
  base,
  accent,
}: {
  base: (typeof DISCOVERY_FRAGRANCES)[number];
  accent: (typeof DISCOVERY_FRAGRANCES)[number];
}) {
  return (
    <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-[2px] bg-paper sm:h-[260px]">
      <motion.div
        className="absolute h-40 w-40 rounded-full mix-blend-multiply sm:h-52 sm:w-52"
        animate={{
          x: -42,
          backgroundColor: base.colorHex,
          scale: [0.9, 1, 0.97, 1],
        }}
        initial={{ x: -140 }}
        transition={{
          duration: 1.1,
          ease: EASE_OUT_EXPO,
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ opacity: 0.8 }}
      />
      <motion.div
        className="absolute h-40 w-40 rounded-full mix-blend-multiply sm:h-52 sm:w-52"
        animate={{
          x: 42,
          backgroundColor: accent.colorHex,
          scale: [1, 0.95, 1.02, 1],
        }}
        initial={{ x: 140 }}
        transition={{
          duration: 1.1,
          ease: EASE_OUT_EXPO,
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ opacity: 0.7 }}
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[11px] uppercase tracking-[0.02em] text-ink-soft">
        <span>Base · {base.name}</span>
        <span>Accent · {accent.name}</span>
      </div>
    </div>
  );
}

/** The manifesto print, lit by a torch that follows the cursor (desktop). */
function Spotlight() {
  const rich = useMotionBudget();
  const x = useSpring(50, { stiffness: 140, damping: 22 });
  const y = useSpring(40, { stiffness: 140, damping: 22 });
  const mask = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, transparent 0px, transparent 110px, rgba(21,20,18,0.82) 230px)`;
  const img = BOX_ANGLES.find((a) => a.id === "warning") ?? BOX_ANGLES[1];

  return (
    <div
      className="relative mx-auto aspect-[5/6] w-full max-w-[460px] overflow-hidden rounded-[2px]"
      onPointerMove={(e) => {
        if (!rich) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.img
        src={img.img}
        alt={img.desc}
        loading="lazy"
        className="h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
      />
      {rich && (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ background: mask }}
        />
      )}
      {rich && (
        <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.02em] text-paper/50">
          Move to read the box
        </p>
      )}
    </div>
  );
}

function ClosingBand({
  added,
  onAdd,
  onBrowse,
}: {
  added: boolean;
  onAdd: () => void;
  onBrowse: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const fanOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-paper md:py-28"
    >
      {/* The six vials fanned faintly behind the type */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
        style={{ opacity: fanOpacity }}
      >
        {DISCOVERY_FRAGRANCES.map((f, i) => (
          <FanVial key={f.id} src={f.img} offset={i - 2.5} spread={spread} />
        ))}
      </motion.div>

      <div className="ed-container relative text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/55">
          {CLOSING.kicker}
        </p>
        <MaskedHeading
          text={CLOSING.title}
          className="mx-auto mt-4 max-w-3xl justify-center font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] [&>span]:justify-center"
        />
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
          {CLOSING.body}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <button
              onClick={onAdd}
              className="ed-btn bg-paper !text-ink hover:bg-clay hover:!text-paper"
            >
              {added ? "Added to bag ✓" : `Add to cart — ₹${PRICE}`}
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={onBrowse}
              className="ed-btn border border-paper/40 hover:border-paper"
            >
              Explore full 50ML bottles
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function FanVial({
  src,
  offset,
  spread,
}: {
  src: string;
  offset: number;
  spread: MotionValue<number>;
}) {
  const x = useTransform(spread, (v) => offset * 150 * v);
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      className="absolute h-32 w-32 rounded-[2px] object-cover opacity-25 sm:h-44 sm:w-44"
      style={{ x, rotate: offset * 7, y: Math.abs(offset) * 14 }}
    />
  );
}

function Stars() {
  return (
    <span
      className="inline-flex gap-0.5 text-clay"
      aria-label="Rated 4.9 out of 5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
