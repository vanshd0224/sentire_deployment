import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { PageName } from "../types/appTypes";
import {
  BOX_ANGLES,
  DISCOVERY_FRAGRANCES,
  FAQS,
  LAYERING_RECIPES,
  PERKS,
  REVIEWS,
} from "../editorial/discovery/data";
import { Label, MaskedHeading, Rule } from "../editorial/Primitives";
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

export default function DiscoverySetPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
  onNavigate,
}: DiscoverySetPageProps) {
  const rich = useMotionBudget();

  const [angleIndex, setAngleIndex] = useState(0);
  const [fragranceIndex, setFragranceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [spraysPerDay, setSpraysPerDay] = useState(2);
  const [baseId, setBaseId] = useState("purple-oud");
  const [accentId, setAccentId] = useState("rich");
  const [showStickyBar, setShowStickyBar] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Slow drift on the packaging photograph as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
  const angle = BOX_ANGLES[angleIndex];

  const recipe = LAYERING_RECIPES.find(
    (r) => r.base === baseId && r.accent === accentId,
  ) ?? {
    name: `${DISCOVERY_FRAGRANCES.find((f) => f.id === baseId)?.name} × ${
      DISCOVERY_FRAGRANCES.find((f) => f.id === accentId)?.name
    }`,
    base: baseId,
    accent: accentId,
    ratio: "1 spray base + 1 spray accent",
    description: `A custom fusion of ${
      DISCOVERY_FRAGRANCES.find((f) => f.id === baseId)?.character
    } deepened with a spark of ${
      DISCOVERY_FRAGRANCES.find((f) => f.id === accentId)?.character
    }. Completely unique to your skin.`,
    vibe: "Bespoke",
  };

  const addToCart = () => {
    onAddToCart?.({
      productId: "discovery-set",
      name: "SENTIRE Discovery Set (6 × 6ML)",
      price: PRICE,
      size: 36,
      quantity,
      image: "/images/discovery-set/box-front.jpg",
      img: "/images/discovery-set/box-front.jpg",
      variantTitle: "6 × 6ML Travel Sprays (36ML Total)",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const days = Math.round(TOTAL_SPRAYS / spraysPerDay);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      {" "}
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="ed-container pb-2 pt-6">
        {" "}
        <ol className="ed-label flex items-center gap-2">
          {" "}
          <li>
            {" "}
            <button
              onClick={onBackToHome}
              className="cursor-pointer hover:text-ink"
            >
              {" "}
              Home
            </button>{" "}
          </li>{" "}
          <li aria-hidden>/</li>{" "}
          <li>
            {" "}
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="cursor-pointer hover:text-ink"
            >
              {" "}
              Haute parfumerie
            </button>{" "}
          </li>{" "}
          <li aria-hidden>/</li>{" "}
          <li className="text-ink">Discovery set</li>{" "}
        </ol>{" "}
      </nav>{" "}
      {/* ── Hero: gallery + purchase console ───────────────────── */}
      <section ref={heroRef} className="ed-container pb-12 pt-4 lg:pb-20">
        {" "}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {" "}
          {/* Gallery */}
          <div ref={galleryRef} className="lg:col-span-7">
            {" "}
            <motion.figure
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-ink sm:aspect-[5/4]"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
            >
              {" "}
              <AnimatePresence mode="wait">
                {" "}
                <motion.img
                  key={angle.id}
                  src={angle.img}
                  alt={angle.desc}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={rich ? { y: imageY } : undefined}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />{" "}
              </AnimatePresence>{" "}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 md:p-7">
                {" "}
                <AnimatePresence mode="wait">
                  {" "}
                  <motion.div
                    key={angle.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  >
                    {" "}
                    <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/60">
                      {" "}
                      {angle.tagline}
                    </p>{" "}
                    <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-paper/85">
                      {" "}
                      {angle.desc}
                    </p>{" "}
                  </motion.div>{" "}
                </AnimatePresence>{" "}
              </div>{" "}
            </motion.figure>{" "}
            {/* Angle switcher */}
            <div
              className="hide-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Packaging views"
            >
              {" "}
              {BOX_ANGLES.map((a, i) => (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={i === angleIndex}
                  onClick={() => setAngleIndex(i)}
                  className={`group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-[2px] bg-paper-2 transition-opacity md:h-24 md:w-24 ${
                    i === angleIndex
                      ? "opacity-100"
                      : "opacity-55 hover:opacity-90"
                  }`}
                >
                  {" "}
                  <img
                    src={a.img}
                    alt={a.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />{" "}
                  {i === angleIndex && (
                    <motion.span
                      layoutId="angle-underline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-clay"
                    />
                  )}
                </button>
              ))}
            </div>{" "}
          </div>{" "}
          {/* Purchase console */}
          <div className="lg:col-span-5">
            {" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              {" "}
              <Label>Sentire haute parfumerie</Label>{" "}
              <h1 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.03em]">
                {" "}
                The Discovery Set
              </h1>{" "}
              <p className="mt-3 font-serif text-xl font-light italic text-ink-soft">
                {" "}
                Six fragrances. One box. Find the one that's yours.
              </p>{" "}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                {" "}
                <span className="flex items-center gap-2 text-[14px]">
                  {" "}
                  <Stars /> <span className="tabular-nums">4.9</span>{" "}
                  <span className="text-ink-soft">(428 reviews)</span>{" "}
                </span>{" "}
                <span className="ed-label">In stock · ships in 24h</span>{" "}
              </div>{" "}
              {/* Price */}
              <div className="mt-7 border-y border-[color:var(--color-rule)] py-6">
                {" "}
                <div className="flex flex-wrap items-baseline gap-3">
                  {" "}
                  <span className="font-serif text-[2.75rem] font-light leading-none tabular-nums">
                    {" "}
                    ₹{PRICE}
                  </span>{" "}
                  <span className="font-mono text-[13px] text-stone line-through tabular-nums">
                    {" "}
                    ₹{MRP}
                  </span>{" "}
                  <span className="font-mono text-[12px] text-clay">
                    Save 45%
                  </span>{" "}
                </div>{" "}
                <p className="mt-3 text-[14px] text-ink-soft">
                  {" "}
                  ₹91.50 per 6ML travel spray — 36ML in total.
                </p>{" "}
              </div>{" "}
              <blockquote className="mt-6 border-l border-clay pl-5 font-serif text-[17px] font-light italic leading-[1.6] text-ink-soft">
                {" "}
                Choosing a signature scent shouldn't mean committing to a full
                bottle you've never smelled. Six 6ML sprays are enough to live
                with each one properly, on your own skin.
              </blockquote>{" "}
              {/* Six vials preview */}
              <div className="mt-8">
                {" "}
                <div className="flex items-baseline justify-between gap-4">
                  {" "}
                  <p className="ed-label">The six inside</p>{" "}
                  <p className="ed-label">Tap to preview</p>{" "}
                </div>{" "}
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {" "}
                  {DISCOVERY_FRAGRANCES.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => setFragranceIndex(i)}
                      aria-pressed={i === fragranceIndex}
                      title={f.name}
                      className={`aspect-[3/4] cursor-pointer overflow-hidden rounded-[2px] bg-paper-2 transition-opacity ${
                        i === fragranceIndex
                          ? "opacity-100 ring-1 ring-ink"
                          : "opacity-60 hover:opacity-90"
                      }`}
                    >
                      {" "}
                      <img
                        src={f.img}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />{" "}
                    </button>
                  ))}
                </div>{" "}
                <p className="mt-3 text-[13px] text-ink-soft">
                  {" "}
                  <span className="text-ink">{fragrance.name}</span> —{" "}
                  {fragrance.tagline}
                </p>{" "}
              </div>{" "}
              {/* Quantity + actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {" "}
                <div className="flex h-12 items-center rounded-full border border-[color:var(--color-rule)]">
                  {" "}
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="h-12 w-12 cursor-pointer text-lg"
                  >
                    {" "}
                    −
                  </button>{" "}
                  <span className="w-8 text-center tabular-nums">
                    {quantity}
                  </span>{" "}
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="h-12 w-12 cursor-pointer text-lg"
                  >
                    {" "}
                    +
                  </button>{" "}
                </div>{" "}
                <button
                  onClick={addToCart}
                  className="ed-btn ed-btn-solid min-w-[200px] flex-1"
                >
                  {" "}
                  {added
                    ? "Added to bag ✓"
                    : `Add to bag — ₹${PRICE * quantity}`}
                </button>{" "}
              </div>{" "}
              <button
                onClick={() => {
                  addToCart();
                  window.setTimeout(() => onOpenCart?.(), 200);
                }}
                className="ed-btn ed-btn-line mt-3 w-full"
              >
                {" "}
                Buy it now
              </button>{" "}
              {/* Perks */}
              <dl className="mt-8 space-y-3 border-t border-[color:var(--color-rule)] pt-6">
                {" "}
                {PERKS.map(([title, body]) => (
                  <div key={title} className="flex gap-4">
                    {" "}
                    <dt className="w-44 shrink-0 text-[14px]">{title}</dt>{" "}
                    <dd className="text-[14px] text-ink-soft">{body}</dd>{" "}
                  </div>
                ))}
              </dl>{" "}
            </motion.div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── What's inside: scent explorer ───────────────────────── */}
      <section className="bg-ink py-16 text-paper md:py-24">
        {" "}
        <div className="ed-container">
          {" "}
          <div className="h-px w-full bg-paper/20" />{" "}
          <p className="ed-label mt-5 !text-paper/55">What's inside</p>{" "}
          <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]">
            {" "}
            Six ways to smell like <em className="italic">yourself.</em>{" "}
          </h2>{" "}
          {/* Tabs */}
          <div className="hide-scrollbar mt-9 flex gap-6 overflow-x-auto border-b border-paper/15 pb-px">
            {" "}
            {DISCOVERY_FRAGRANCES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setFragranceIndex(i)}
                aria-pressed={i === fragranceIndex}
                className={`relative min-h-[44px] shrink-0 cursor-pointer pb-3 text-[15px] transition-colors ${
                  i === fragranceIndex
                    ? "text-paper"
                    : "text-paper/50 hover:text-paper/80"
                }`}
              >
                {" "}
                {f.name}
                {i === fragranceIndex && (
                  <motion.span
                    layoutId="scent-tab"
                    className="absolute inset-x-0 -bottom-px h-px bg-paper"
                  />
                )}
              </button>
            ))}
          </div>{" "}
          {/* Spotlight */}
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {" "}
              <div className="lg:col-span-5">
                {" "}
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-paper/5">
                  {" "}
                  <img
                    src={fragrance.img}
                    alt={`${fragrance.name} 6ML travel spray`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="lg:col-span-7">
                {" "}
                <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/55">
                  {" "}
                  {fragrance.familyBadge} — {fragrance.family}
                </p>{" "}
                <h3 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight">
                  {" "}
                  {fragrance.name}
                </h3>{" "}
                <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-paper/75">
                  {" "}
                  {fragrance.vialDescription}
                </p>{" "}
                {/* Note pyramid */}
                <dl className="mt-8 space-y-4">
                  {" "}
                  {[
                    ["Top", fragrance.topNotes],
                    ["Heart", fragrance.heartNotes],
                    ["Base", fragrance.baseNotes],
                  ].map(([label, notes], i) => (
                    <motion.div
                      key={label}
                      className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-t border-paper/12 pt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + i * 0.08,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      {" "}
                      <dt className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/50">
                        {" "}
                        {label}
                      </dt>{" "}
                      <dd className="font-serif text-[17px] font-light">
                        {notes}
                      </dd>{" "}
                    </motion.div>
                  ))}
                </dl>{" "}
                {/* Meters */}
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-paper/12 pt-6 sm:grid-cols-4">
                  {" "}
                  {[
                    ["Sillage", fragrance.sillage],
                    ["Longevity", fragrance.longevity],
                    ["Compliments", fragrance.complimentScore],
                    ["Best worn", fragrance.bestTime],
                  ].map(([k, v]) => (
                    <div key={k}>
                      {" "}
                      <p className="font-mono text-[11px] uppercase tracking-[0.02em] text-paper/50">
                        {k}
                      </p>{" "}
                      <p className="mt-1.5 text-[14px] leading-snug">
                        {v}
                      </p>{" "}
                    </div>
                  ))}
                </div>{" "}
                <p className="mt-7 border-l border-clay-light/60 pl-4 text-[14px] italic text-paper/70">
                  {" "}
                  {fragrance.layeringTip}
                </p>{" "}
              </div>{" "}
            </motion.div>{" "}
          </AnimatePresence>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Why 6ML + spray calculator ──────────────────────────── */}
      <section className="bg-paper py-16 md:py-24">
        {" "}
        <div className="ed-container">
          {" "}
          <Rule />{" "}
          <div className="pt-5 md:pt-7">
            {" "}
            <Label>Why 6ML</Label>{" "}
            <MaskedHeading
              text="A paper strip lies. Skin doesn't."
              className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]"
            />{" "}
          </div>{" "}
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-14">
            {" "}
            {[
              {
                k: "The mall blotter",
                items: [
                  "Alcohol flashes off in seconds",
                  "You never meet the base notes",
                  "No idea how it behaves on your skin",
                  "One rushed decision at the counter",
                ],
                muted: true,
              },
              {
                k: "A 6ML travel spray",
                items: [
                  "Around 60 sprays per vial",
                  "Wear it for a full day, twice over",
                  "See how your skin changes it",
                  "Decide after a week, not a minute",
                ],
                muted: false,
              },
            ].map((col, i) => (
              <motion.div
                key={col.k}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
                className={col.muted ? "opacity-60" : ""}
              >
                {" "}
                <h3 className="font-serif text-2xl font-light">{col.k}</h3>{" "}
                <ul className="mt-5 space-y-3">
                  {" "}
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-[color:var(--color-rule)] pt-3 text-[15px] text-ink-soft"
                    >
                      {" "}
                      {item}
                    </li>
                  ))}
                </ul>{" "}
              </motion.div>
            ))}
          </div>{" "}
          {/* Calculator */}
          <div className="mt-14 border-t border-[color:var(--color-rule)] pt-10">
            {" "}
            <div className="flex flex-wrap items-end justify-between gap-6">
              {" "}
              <div>
                {" "}
                <Label>How long it lasts</Label>{" "}
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light">
                  {" "}
                  36ML, at your pace.
                </h3>{" "}
              </div>{" "}
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Sprays per day"
              >
                {" "}
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSpraysPerDay(n)}
                    aria-pressed={spraysPerDay === n}
                    className={`min-h-[44px] cursor-pointer rounded-full px-4 font-mono text-[12px] transition-colors ${
                      spraysPerDay === n
                        ? "bg-ink text-paper"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {" "}
                    {n}/day
                  </button>
                ))}
              </div>{" "}
            </div>{" "}
            <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {" "}
              {[
                [
                  "Total sprays",
                  TOTAL_SPRAYS.toString(),
                  "60 sprays × 6 vials",
                ],
                ["Days of wear", `${days}`, `${(days / 30).toFixed(1)} months`],
                [
                  "Cost per day",
                  `₹${(PRICE / days).toFixed(2)}`,
                  "At extrait strength",
                ],
              ].map(([k, v, sub]) => (
                <div
                  key={k}
                  className="border-t border-[color:var(--color-rule)] pt-5"
                >
                  {" "}
                  <dt className="ed-label">{k}</dt>{" "}
                  <dd>
                    {" "}
                    <motion.p
                      key={v}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="mt-2 font-serif text-[2.25rem] font-light leading-none tabular-nums"
                    >
                      {" "}
                      {v}
                    </motion.p>{" "}
                    <p className="mt-2 text-[13px] text-ink-soft">{sub}</p>{" "}
                  </dd>{" "}
                </div>
              ))}
            </dl>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Layering lab ────────────────────────────────────────── */}
      <section className="bg-paper-2 py-16 md:py-24">
        {" "}
        <div className="ed-container">
          {" "}
          <Rule />{" "}
          <div className="pt-5 md:pt-7">
            {" "}
            <Label>Layering</Label>{" "}
            <MaskedHeading
              text="Make one nobody else owns."
              className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]"
            />{" "}
          </div>{" "}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {" "}
            <div className="space-y-8">
              {" "}
              <Picker
                title="Base — one spray on the chest"
                options={DISCOVERY_FRAGRANCES}
                value={baseId}
                onChange={setBaseId}
              />{" "}
              <Picker
                title="Accent — one spray on the wrists"
                options={DISCOVERY_FRAGRANCES.filter((f) => f.id !== baseId)}
                value={accentId}
                onChange={setAccentId}
              />{" "}
            </div>{" "}
            <AnimatePresence mode="wait">
              {" "}
              <motion.div
                key={recipe.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="border-t border-[color:var(--color-rule)] pt-6"
              >
                {" "}
                <p className="ed-label">{recipe.vibe}</p>{" "}
                <h3 className="mt-3 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight">
                  {" "}
                  {recipe.name}
                </h3>{" "}
                <p className="mt-4 text-[15px] leading-[1.75] text-ink-soft">
                  {recipe.description}
                </p>{" "}
                <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.02em] text-clay">
                  {" "}
                  {recipe.ratio}
                </p>{" "}
              </motion.div>{" "}
            </AnimatePresence>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Packaging ───────────────────────────────────────────── */}
      <section className="bg-ink py-16 text-paper md:py-24">
        {" "}
        <div className="ed-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {" "}
          <div>
            {" "}
            <div className="h-px w-full bg-paper/20" />{" "}
            <p className="ed-label mt-5 !text-paper/55">The case</p>{" "}
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]">
              {" "}
              “The coolest thing somebody can own.”
            </h2>{" "}
            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-paper/70">
              {" "}
              Matte black flip-top case, gold hot-stamped crest, stepped
              interior that holds each vial upright. An embossed card inside
              maps the six families, their pyramids and when to wear them.
            </p>{" "}
            <button
              onClick={addToCart}
              className="ed-btn mt-8 bg-paper !text-ink hover:bg-clay hover:!text-paper"
            >
              {" "}
              {added ? "Added to bag ✓" : `Add the set — ₹${PRICE}`}
            </button>{" "}
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {BOX_ANGLES.slice(0, 4).map((a, i) => (
              <motion.div
                key={a.id}
                className="aspect-square overflow-hidden rounded-[2px] bg-paper/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {" "}
                <img
                  src={a.img}
                  alt={a.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />{" "}
              </motion.div>
            ))}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Reviews ─────────────────────────────────────────────── */}
      <section className="bg-paper py-16 md:py-24">
        {" "}
        <div className="ed-container">
          {" "}
          <Rule />{" "}
          <div className="pt-5 md:pt-7">
            {" "}
            <Label>428 verified reviews</Label>{" "}
            <MaskedHeading
              text="What people say after a week."
              className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]"
            />{" "}
          </div>{" "}
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {" "}
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                className="border-t border-[color:var(--color-rule)] pt-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {" "}
                <Stars />{" "}
                <blockquote className="mt-4 font-serif text-[18px] font-light leading-[1.6] text-ink">
                  {" "}
                  “{r.quote}”
                </blockquote>{" "}
                <figcaption className="ed-label mt-5">
                  {r.name} — verified buyer
                </figcaption>{" "}
              </motion.figure>
            ))}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-paper pb-20 md:pb-28">
        {" "}
        <div className="ed-container">
          {" "}
          <Rule />{" "}
          <div className="pt-5 md:pt-7">
            {" "}
            <Label>Questions</Label>{" "}
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-0.025em]">
              {" "}
              Before you order.
            </h2>{" "}
          </div>{" "}
          <div className="mt-8 max-w-3xl">
            {" "}
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="border-t border-[color:var(--color-rule)]"
                >
                  {" "}
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
                  >
                    {" "}
                    <span className="font-serif text-[19px] font-light leading-snug">
                      {faq.q}
                    </span>{" "}
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="mt-1 shrink-0 text-xl leading-none text-ink-soft"
                      aria-hidden
                    >
                      {" "}
                      +
                    </motion.span>{" "}
                  </button>{" "}
                  <AnimatePresence initial={false}>
                    {" "}
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        {" "}
                        <p className="max-w-2xl pb-6 text-[15px] leading-[1.75] text-ink-soft">
                          {faq.a}
                        </p>{" "}
                      </motion.div>
                    )}
                  </AnimatePresence>{" "}
                </div>
              );
            })}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Closing CTA ─────────────────────────────────────────── */}
      <section className="bg-ink py-16 text-paper md:py-24">
        {" "}
        <div className="ed-container text-center">
          {" "}
          <h2 className="mx-auto max-w-2xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.025em]">
            {" "}
            Six to try. One to keep.
          </h2>{" "}
          <p className="mx-auto mt-4 max-w-md text-[15px] text-paper/70">
            {" "}
            ₹549 with free express shipping, and a VIP card toward your full
            50ML flacon.
          </p>{" "}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {" "}
            <button
              onClick={addToCart}
              className="ed-btn bg-paper !text-ink hover:bg-clay hover:!text-paper"
            >
              {" "}
              {added ? "Added to bag ✓" : "Add the set"}
            </button>{" "}
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="ed-btn ed-btn-line"
            >
              {" "}
              Browse full bottles
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Sticky purchase bar ─────────────────────────────────── */}
      <AnimatePresence>
        {" "}
        {showStickyBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 bottom-[62px] z-40 border-t border-[color:var(--color-rule)] bg-paper/95 backdrop-blur-sm lg:bottom-0"
          >
            {" "}
            <div className="ed-container flex items-center justify-between gap-4 py-3 lg:pr-28">
              {" "}
              <div className="min-w-0">
                {" "}
                <p className="truncate text-[14px]">
                  Discovery set — 6 × 6ML
                </p>{" "}
                <p className="font-mono text-[12px] text-ink-soft tabular-nums">
                  {" "}
                  ₹{PRICE}{" "}
                  <span className="text-stone line-through">₹{MRP}</span>{" "}
                </p>{" "}
              </div>{" "}
              <button
                onClick={addToCart}
                className="ed-btn ed-btn-solid shrink-0"
              >
                {" "}
                {added ? "Added ✓" : "Add to bag"}
              </button>{" "}
            </div>{" "}
          </motion.div>
        )}
      </AnimatePresence>{" "}
    </div>
  );
}

function Stars() {
  return (
    <span
      className="inline-flex gap-0.5 text-clay"
      aria-label="Rated 4.9 out of 5"
    >
      {" "}
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          fill="currentColor"
          aria-hidden
        >
          {" "}
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />{" "}
        </svg>
      ))}
    </span>
  );
}

function Picker({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: typeof DISCOVERY_FRAGRANCES;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      {" "}
      <p className="ed-label">{title}</p>{" "}
      <div className="mt-3 flex flex-wrap gap-2">
        {" "}
        {options.map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            aria-pressed={value === f.id}
            className={`min-h-[44px] cursor-pointer rounded-full px-4 text-[14px] transition-colors ${
              value === f.id
                ? "bg-ink text-paper"
                : "border border-[color:var(--color-rule)] text-ink-soft hover:text-ink"
            }`}
          >
            {" "}
            {f.name}
          </button>
        ))}
      </div>{" "}
    </div>
  );
}
