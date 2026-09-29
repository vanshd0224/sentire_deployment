import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PerfumeProduct } from "../../data/perfumes";
import type { CartItem } from "../../components/CartDrawer";
import { getPerfumeReviews, getPerfumeReviewStats, type Review } from "../../data/reviews";
import { trackViewContent } from "../../utils/analytics";
import ProductCard from "../ProductCard";
import { EASE_OUT_EXPO } from "../motion";

/*
 * The product page, in the house style: the bottle large on the left, the
 * decision on the right (it stays in view on a laptop), then the scent, the
 * story, what people say and what else to try — type-led, thin rules, the
 * wine accent, the same cards as the rest of the site. Each of the house
 * signatures gets its own light tint behind the photographs, the colours
 * the home page uses for it.
 */

type AddPayload = {
  id: string;
  name: string;
  num?: string;
  img: string;
  isPersonalised?: boolean;
  engravingText?: string;
  engravingDate?: string;
};

interface ProductPageProps {
  product: PerfumeProduct & { initialSize?: number };
  onClose: () => void;
  cartItems?: CartItem[];
  onAddToCart?: (product: AddPayload, size: number, price: number) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
  onSelectProduct?: (product: PerfumeProduct, size?: number) => void;
  allProducts?: PerfumeProduct[];
}

// the home hero's colours for the house signatures
const TINTS: Record<string, { tint: string; deep: string }> = {
  "purple-oud": { tint: "#efe8f5", deep: "#4f2f6e" },
  "deep-crush": { tint: "#f5ede2", deep: "#6e4a1f" },
  midnight: { tint: "#f3ecec", deep: "#5a3c3f" },
  calantha: { tint: "#f6ede7", deep: "#6f4330" },
  rich: { tint: "#f5eaeb", deep: "#66353a" },
  personna: { tint: "#f4ede9", deep: "#654236" },
  "white-oud": { tint: "#f0eef0", deep: "#4e454b" },
};

const SIZE_NAME: Record<number, string> = { 10: "Travel spray", 30: "Signature flacon", 50: "Extrait de parfum" };
const ENGRAVING_FEE = 200;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Split a perfume's notes into top, heart and base. */
function pyramid(traces: string[] = []) {
  const n = traces.length;
  if (n <= 3) return { top: traces.slice(0, 1), heart: traces.slice(1, 2), base: traces.slice(2) };
  const top = Math.ceil(n / 3);
  const heart = Math.ceil((n - top) / 2);
  return { top: traces.slice(0, top), heart: traces.slice(top, top + heart), base: traces.slice(top + heart) };
}

const Stars = ({ value, className = "" }: { value: number; className?: string }) => (
  <span className={`inline-flex gap-[2px] ${className}`} aria-label={`${value.toFixed(1)} out of 5`}>
    {[0, 1, 2, 3, 4].map((i) => {
      const fill = Math.max(0, Math.min(1, value - i));
      return (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
          <defs>
            <linearGradient id={`s${i}-${Math.round(value * 10)}`}>
              <stop offset={`${fill * 100}%`} stopColor="currentColor" />
              <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#s${i}-${Math.round(value * 10)})`}
            d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L10 14.9l-5.3 2.9 1.1-5.9L1.4 7.8l6-.8z"
          />
        </svg>
      );
    })}
  </span>
);

export default function ProductPage({
  product,
  onClose,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
  onSelectProduct,
  allProducts = [],
}: ProductPageProps) {
  const sizes = product.sizes?.length ? product.sizes : ([50] as (10 | 30 | 50)[]);
  const soldOutSizes = product.outOfStockSizes ?? [];
  const pickDefault = () => {
    const passed = product.initialSize;
    if (passed && sizes.includes(passed as 10 | 30 | 50)) return passed;
    const inStock = sizes.filter((s) => !soldOutSizes.includes(s));
    return inStock.includes(50) ? 50 : inStock[inStock.length - 1] ?? sizes[0];
  };
  const [size, setSize] = useState<number>(pickDefault);
  const [shot, setShot] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [engrave, setEngrave] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [engravingDate, setEngravingDate] = useState("");
  const [pin, setPin] = useState(() => {
    try {
      return localStorage.getItem("sentire_user_pincode") || "";
    } catch {
      return "";
    }
  });
  const [delivery, setDelivery] = useState<{ text: string; cod?: boolean } | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [notify, setNotify] = useState("");
  const [notified, setNotified] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [writing, setWriting] = useState(false);
  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [draft, setDraft] = useState({ author: "", rating: 5, title: "", comment: "" });
  const gallery = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);

  const colours = TINTS[product.id] ?? { tint: "#e8e8e5", deep: "#6b1422" };
  const images = useMemo(() => {
    const set = product.sizeImages?.[size] ?? product.sizeImages?.[String(size) as never];
    return set?.length ? set : [product.img];
  }, [product, size]);

  // a new product: start at the top, with its default size, and count the view
  useEffect(() => {
    const s = pickDefault();
    setSize(s);
    setShot(0);
    setEngrave(false);
    setEngravingText("");
    setEngravingDate("");
    setVisibleReviews(6);
    setExtraReviews([]);
    setNotified(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    try {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: product.prices?.[s] ?? product.prices?.[50] ?? 0,
        category: product.scentFamily || "Perfumes",
        variant: s,
      });
    } catch {}
  }, [product.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // the address follows the chosen size
  useEffect(() => {
    try {
      window.history.replaceState(window.history.state, "", `/perfumes/${product.id}/${size}ml`);
    } catch {}
    setShot(0);
    gallery.current?.scrollTo({ left: 0 });
    if (size !== 50) setEngrave(false);
  }, [size, product.id]);

  // on a phone the page has its own bar at the bottom; the chat bubble steps aside
  useEffect(() => {
    document.body.classList.add("product-page-open");
    return () => document.body.classList.remove("product-page-open");
  }, []);

  // Esc closes the enlarged photograph
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setShot((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setShot((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  // the price
  const engraved = size === 50 && engrave && (engravingText.trim() !== "" || engravingDate !== "");
  const base = product.prices?.[size] ?? 0;
  const price = base + (engraved ? ENGRAVING_FEE : 0);
  const mrp = (product.mrps?.[size] ?? 0) + (engraved ? ENGRAVING_FEE : 0);
  const off = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const soldOut = soldOutSizes.includes(size as 10 | 30 | 50);
  const inBag =
    cartItems.find((c) => c.productId === product.id && c.size === size && Boolean(c.isPersonalised) === engraved)
      ?.quantity ?? 0;

  const payload = (): AddPayload => ({
    id: product.id,
    name: product.name,
    num: product.num,
    img: images[0] ?? product.img,
    isPersonalised: engraved,
    engravingText: engraved ? engravingText.trim() : "",
    engravingDate: engraved ? engravingDate : "",
  });
  const add = () => {
    if (soldOut || !base) return;
    onAddToCart?.(payload(), size, price);
  };
  const buyNow = () => {
    add();
    onOpenCart?.();
  };

  const share = async () => {
    const url = `${window.location.origin}/perfumes/${product.id}/${size}ml`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `SENTIRE By PC — ${product.name}`, text: product.desc, url });
        return;
      }
    } catch {
      return; // they closed the share sheet
    }
    try {
      await navigator.clipboard.writeText(url);
      flash("Link copied");
    } catch {
      flash(url);
    }
  };

  const checkPin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const p = pin.trim();
    if (!/^\d{6}$/.test(p)) {
      setPinError("Enter a 6-digit pincode");
      return;
    }
    setPinError(null);
    setChecking(true);
    try {
      const res = await fetch(
        `https://ecommerce-backend-1041917436859.asia-south1.run.app/api/pincode/check?pincode=${p}`,
      );
      const data = await res.json();
      if (data?.success) {
        setDelivery({ text: data.delivery_text || "Delivery available", cod: data.cod_available });
        try {
          localStorage.setItem("sentire_user_pincode", p);
        } catch {}
      } else {
        setPinError(data?.message || "We couldn't check that pincode");
      }
    } catch {
      setDelivery({
        text: p.startsWith("302") ? "Delivered within 24 hours in Jaipur" : "Delivered in 2–3 business days",
        cod: true,
      });
    } finally {
      setChecking(false);
    }
  };

  // reviews
  const reviews = useMemo(() => [...extraReviews, ...getPerfumeReviews(product.id)], [product.id, extraReviews]);
  const stats = useMemo(() => getPerfumeReviewStats(product.id, extraReviews), [product.id, extraReviews]);
  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.author || !draft.title || !draft.comment) return;
    setExtraReviews((r) => [
      { id: `mine-${Date.now()}`, author: draft.author, rating: draft.rating, date: "Just now", title: draft.title, comment: draft.comment, verified: false },
      ...r,
    ]);
    setDraft({ author: "", rating: 5, title: "", comment: "" });
    setWriting(false);
    flash("Thank you for your review");
  };

  const notes = pyramid(product.traces);
  const others = useMemo(() => {
    const same = allProducts.filter((p) => p.id !== product.id && p.scentFamily === product.scentFamily);
    const rest = allProducts.filter((p) => p.id !== product.id && p.scentFamily !== product.scentFamily);
    return [...same, ...rest].slice(0, 4);
  }, [allProducts, product]);

  const onGalleryScroll = () => {
    const g = gallery.current;
    if (!g) return;
    setShot(Math.round(g.scrollLeft / g.clientWidth));
  };

  return (
    <article className="bg-paper pb-24 text-ink md:pb-0">
      {/* the way back, and where we are */}
      <div className="ed-container flex items-center justify-between gap-4 pt-4 md:pt-3">
        <button
          type="button"
          onClick={onClose}
          className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
          All fragrances
        </button>
        <nav aria-label="Breadcrumb" className="ed-label hidden truncate sm:block">
          <span>Home</span>
          <span className="mx-2 opacity-50">/</span>
          <span>Perfumes</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="ed-container mt-2 grid gap-8 md:mt-2 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* ── the photographs ── */}
        <section aria-label={`${product.name} photographs`} className="md:col-span-7">
          {/* phone: swipe through; laptop: the lead image with the rest below */}
          <div className="relative -mx-5 md:mx-0">
            <div
              ref={gallery}
              onScroll={onGalleryScroll}
              className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto md:hidden"
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setShot(i);
                    setLightbox(true);
                  }}
                  className="aspect-square w-full shrink-0 snap-center cursor-zoom-in"
                  style={{ backgroundColor: colours.tint }}
                  aria-label={`Enlarge photograph ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${product.name} extrait de parfum, ${size}ml — photograph ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            {images.length > 1 && (
              <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[3px] rounded-full transition-all duration-300 ${i === shot ? "w-6 bg-ink" : "w-3 bg-ink/25"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* laptop: the photograph fits the screen, thumbnails beside it */}
          <div
            className="hidden md:flex md:gap-3 lg:gap-4"
            style={{ height: "clamp(400px, calc(100svh - 215px), 760px)" }}
          >
            {images.length > 1 && (
              <div className="flex w-[64px] shrink-0 flex-col gap-3 lg:w-[80px]">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`Show photograph ${i + 1}`}
                    aria-pressed={i === shot}
                    className={`aspect-square w-full cursor-pointer overflow-hidden rounded-[2px] transition-opacity ${
                      i === shot ? "opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: colours.tint }}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="group relative h-full min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-[2px]"
              style={{ backgroundColor: colours.tint }}
              aria-label="Enlarge photograph"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={images[shot]}
                  src={images[shot]}
                  alt={`${product.name} extrait de parfum, ${size}ml`}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.45 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                />
              </AnimatePresence>
              {product.badge && (
                <span className="ed-label absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[10px] text-ink">
                  {product.badge === "bestseller" ? "Best seller" : product.badge}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* ── the decision ── */}
        <section className="md:col-span-5">
          <div className="md:sticky md:top-[112px]">
            <motion.p
              className="ed-label"
              style={{ color: colours.deep }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              {product.num} · Extrait de parfum · 35%+ oil
            </motion.p>
            <h1
              className="mt-3 font-serif font-light leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.9rem)" }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  key={product.id}
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                >
                  {product.name}
                </motion.span>
              </span>
            </h1>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft md:mt-1.5">{product.desc}</p>

            <button
              type="button"
              onClick={() => reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft hover:text-ink"
            >
              <Stars value={stats.averageRating} className="text-ink" />
              <span className="tabular-nums">{stats.averageRating.toFixed(1)}</span>
              <span className="ed-link">{stats.count} reviews</span>
            </button>

            {/* price */}
            <div className="mt-5 flex items-baseline gap-3 border-t border-rule pt-4">
              <span className="text-[1.9rem] font-medium tabular-nums tracking-[-0.02em]">{inr(price)}</span>
              {off > 0 && (
                <>
                  <span className="text-[15px] text-stone line-through tabular-nums">{inr(mrp)}</span>
                  <span className="ed-label" style={{ color: "#6b1422" }}>
                    {off}% off
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-[12px] text-stone">Inclusive of taxes · Free shipping over ₹999</p>

            {/* size */}
            <fieldset className="mt-5 md:mt-4">
              <legend className="ed-label mb-3 flex w-full justify-between">
                <span>Size</span>
                <span className="normal-case tracking-normal text-ink-soft">{SIZE_NAME[size]}</span>
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((s) => {
                  const out = soldOutSizes.includes(s);
                  const on = s === size;
                  const p = product.prices?.[s];
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={on}
                      className={`relative flex min-h-[64px] cursor-pointer flex-col items-center justify-center rounded-[2px] border px-2 py-2.5 transition-colors ${
                        on ? "border-ink bg-ink text-paper" : "border-rule bg-transparent text-ink hover:border-ink"
                      } ${out ? "opacity-50" : ""}`}
                    >
                      <span className="text-[15px] font-medium">{s} ml</span>
                      <span className={`mt-0.5 text-[12px] tabular-nums ${on ? "text-paper/70" : "text-ink-soft"}`}>
                        {out ? "Sold out" : p ? inr(p) : ""}
                      </span>
                      {s === 50 && !out && (
                        <span
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-[1px] text-[9px] font-medium uppercase tracking-[0.12em] ${
                            on ? "bg-[#6b1422] text-paper" : "bg-paper text-[#6b1422] ring-1 ring-[#6b1422]/30"
                          }`}
                        >
                          Engravable
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* engraving */}
            <div className="mt-4 border-y border-rule">
              {size === 50 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEngrave((v) => !v)}
                    aria-expanded={engrave}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 text-left"
                  >
                    <span>
                      <span className="block text-[14px] font-medium">Engrave it</span>
                      <span className="block text-[12.5px] text-ink-soft">
                        {engraved
                          ? [engravingText && `“${engravingText}”`, engravingDate].filter(Boolean).join(" · ")
                          : `A name or a date on the flacon, + ${inr(ENGRAVING_FEE)}`}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule text-[15px] transition-transform"
                      style={{ transform: engrave ? "rotate(45deg)" : undefined }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {engrave && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-3 pb-4 sm:grid-cols-[1fr_auto]">
                          <label className="block">
                            <span className="ed-label">Name or initials</span>
                            <input
                              id="pdp-engrave-text"
                              name="engrave-text"
                              type="text"
                              maxLength={15}
                              value={engravingText}
                              onChange={(e) => setEngravingText(e.target.value)}
                              placeholder="e.g. A. SHARMA"
                              className="mt-1.5 w-full rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[15px] uppercase tracking-[0.08em] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-stone focus:border-ink"
                            />
                          </label>
                          <label className="block">
                            <span className="ed-label">Date (optional)</span>
                            <input
                              id="pdp-engrave-date"
                              name="engrave-date"
                              type="date"
                              value={engravingDate}
                              onChange={(e) => setEngravingDate(e.target.value)}
                              className="mt-1.5 w-full rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-ink"
                            />
                          </label>
                          <p className="text-[12px] text-stone sm:col-span-2">
                            Up to 15 characters. Engraved in-house in Jaipur within 24 hours, so it doesn't delay dispatch.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSize(50);
                    window.setTimeout(() => setEngrave(true), 0);
                  }}
                  className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 text-left"
                >
                  <span>
                    <span className="block text-[14px] font-medium">Engraving</span>
                    <span className="block text-[12.5px] text-ink-soft">Available on the 50 ml flacon</span>
                  </span>
                  <span className="ed-link shrink-0 text-[12.5px] font-medium">Switch to 50 ml</span>
                </button>
              )}
            </div>

            {/* buy */}
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              {soldOut ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (notify) setNotified(true);
                  }}
                  className="w-full"
                >
                  <p className="text-[14px] font-medium">{size} ml is sold out</p>
                  {notified ? (
                    <p className="mt-2 text-[13px] text-ink-soft">We'll email you the moment it's back.</p>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <input
                        id="pdp-notify"
                        name="notify-email"
                        type="email"
                        required
                        value={notify}
                        onChange={(e) => setNotify(e.target.value)}
                        placeholder="Your email"
                        className="min-w-0 flex-1 rounded-full border border-rule bg-transparent px-4 text-[14px] outline-none focus:border-ink"
                      />
                      <button type="submit" className="ed-btn ed-btn-solid">
                        Notify me
                      </button>
                    </div>
                  )}
                </form>
              ) : inBag > 0 ? (
                <div className="flex min-h-[48px] flex-1 items-center justify-between rounded-full border border-ink px-2">
                  <button
                    type="button"
                    onClick={() => onUpdateCartQuantity?.(product.id, size, -1)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-ink hover:text-paper"
                    aria-label="One fewer"
                  >
                    −
                  </button>
                  <span className="text-[14px] font-medium">{inBag} in your bag</span>
                  <button
                    type="button"
                    onClick={() => onUpdateCartQuantity?.(product.id, size, 1)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-ink hover:text-paper"
                    aria-label="One more"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button type="button" onClick={add} className="ed-btn ed-btn-solid flex-1">
                  Add to bag — {inr(price)}
                </button>
              )}
              {!soldOut && (
                <button type="button" onClick={buyNow} className="ed-btn ed-btn-line flex-1">
                  Buy it now
                </button>
              )}
            </div>

            {/* delivery */}
            <form onSubmit={checkPin} className="mt-6">
              <label htmlFor="pdp-pincode" className="ed-label">
                Delivery
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-rule focus-within:border-ink">
                <input
                  id="pdp-pincode"
                  name="pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, ""));
                    setDelivery(null);
                  }}
                  placeholder="Enter your pincode"
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-stone"
                />
                <button type="submit" disabled={checking} className="ed-link cursor-pointer text-[13px] font-medium">
                  {checking ? "Checking…" : "Check"}
                </button>
              </div>
              {pinError && <p className="mt-2 text-[12.5px] text-[#6b1422]">{pinError}</p>}
              {delivery && (
                <p className="mt-2 text-[13px] text-ink">
                  {delivery.text}
                  {delivery.cod ? " · Cash on delivery available" : ""}
                </p>
              )}
            </form>

            {/* assurances */}
            <ul className="mt-6 grid grid-cols-3 border-y border-rule text-center">
              {[
                ["Ships in 24h", "from Jaipur"],
                ["Free shipping", "over ₹999"],
                ["Cruelty free", "IFRA-certified alcohol"],
              ].map(([a, b], i) => (
                <li key={a} className={`px-2 py-3.5 ${i ? "border-l border-rule" : ""}`}>
                  <span className="block text-[12.5px] font-medium">{a}</span>
                  <span className="block text-[11.5px] text-stone">{b}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={share}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink-soft hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ed-link">Share this fragrance</span>
            </button>
          </div>
        </section>
      </div>

      {/* ── the scent ── */}
      <section className="ed-container mt-16 border-t border-rule pt-10 md:mt-24 md:pt-14" aria-labelledby="pdp-scent">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="ed-label">The scent</p>
            <h2 id="pdp-scent" className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light">
              How it unfolds
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">{product.fullDesc || product.desc}</p>
          </div>
          <ol className="md:col-span-7">
            {(
              [
                ["Top", "The first minutes", notes.top],
                ["Heart", "The first hours", notes.heart],
                ["Base", "Into the evening", notes.base],
              ] as const
            ).map(([tier, when, list], i) =>
              list.length ? (
                <motion.li
                  key={tier}
                  className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-rule py-5 first:border-t sm:grid-cols-[140px_1fr]"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT_EXPO }}
                >
                  <span>
                    <span className="ed-label block text-ink">{tier}</span>
                    <span className="block text-[12px] text-stone">{when}</span>
                  </span>
                  <span className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-tight tracking-[-0.02em]">
                    {list.join(", ")}
                  </span>
                </motion.li>
              ) : null,
            )}
          </ol>
        </div>

        {/* how it wears */}
        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            ["Concentration", "35%+ perfume oil", 1],
            ["Longevity", "12–16 hours", 0.92],
            ["Sillage", "A magnetic trail", 0.88],
          ].map(([k, v, f]) => (
            <div key={k as string}>
              <dt className="ed-label">{k}</dt>
              <dd className="mt-1.5 text-[16px]">{v}</dd>
              <div className="mt-3 h-px w-full bg-rule">
                <motion.div
                  className="h-px origin-left bg-ink"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: f as number }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                />
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* ── the details ── */}
      <section className="ed-container mt-14 md:mt-20" aria-label="Details">
        <div className="md:ml-auto md:w-7/12">
          {[
            [
              "Shipping",
              "Free shipping on orders above ₹999 across India. Orders are processed within 24 hours in Jaipur and travel by break-proof express courier with transit insurance: typically 24–48 hours to metro cities and 2–4 days elsewhere.",
            ],
            [
              "Damaged or wrong item",
              "If a bottle arrives damaged or we've sent the wrong one, submit a Return & Exchange request with photos and our Jaipur concierge will dispatch an express replacement.",
            ],
            [
              "How to wear it",
              "Two sprays on pulse points — wrists, neck, behind the ears. At extrait strength, less goes further; let it settle for a few minutes before you judge it.",
            ],
          ].map(([title, body]) => (
            <details key={title} className="group border-b border-rule first:border-t">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                {title}
                <span aria-hidden className="text-lg transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-5 text-[14px] leading-relaxed text-ink-soft">{body}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── what people say ── */}
      <section
        ref={reviewsRef}
        id="reviews"
        className="ed-container mt-16 scroll-mt-28 border-t border-rule pt-10 md:mt-24 md:pt-14"
        aria-labelledby="pdp-reviews"
      >
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="ed-label">Reviews</p>
            <h2 id="pdp-reviews" className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light">
              What people say
            </h2>
            <div className="mt-6 flex items-end gap-3">
              <span className="font-serif text-[4rem] font-light leading-none tracking-[-0.04em]">
                {stats.averageRating.toFixed(1)}
              </span>
              <span className="pb-2">
                <Stars value={stats.averageRating} className="text-ink" />
                <span className="block text-[12.5px] text-ink-soft">{stats.count} reviews</span>
              </span>
            </div>
            <div className="mt-5 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const n = stats.ratingBreakdown[star as 1 | 2 | 3 | 4 | 5] || 0;
                const pct = stats.count ? (n / stats.count) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-[12px] text-ink-soft">
                    <span className="w-3 tabular-nums">{star}</span>
                    <span className="h-px flex-1 bg-rule">
                      <span className="block h-px bg-ink" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="w-8 text-right tabular-nums">{Math.round(pct)}%</span>
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={() => setWriting((w) => !w)} className="ed-btn ed-btn-line mt-6">
              {writing ? "Cancel" : "Write a review"}
            </button>
          </div>

          <div className="md:col-span-8">
            <AnimatePresence initial={false}>
              {writing && (
                <motion.form
                  onSubmit={submitReview}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="grid gap-3 border-b border-rule pb-6 sm:grid-cols-2">
                    <input
                      id="pdp-review-name"
                      name="review-name"
                      required
                      value={draft.author}
                      onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                      placeholder="Your name"
                      className="rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[14px] outline-none focus:border-ink"
                    />
                    <select
                      id="pdp-review-rating"
                      name="review-rating"
                      value={draft.rating}
                      onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                      className="rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[14px] outline-none focus:border-ink"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {r} star{r > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <input
                      id="pdp-review-title"
                      name="review-title"
                      required
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                      placeholder="In a few words"
                      className="rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[14px] outline-none focus:border-ink sm:col-span-2"
                    />
                    <textarea
                      id="pdp-review-text"
                      name="review-text"
                      required
                      rows={3}
                      value={draft.comment}
                      onChange={(e) => setDraft({ ...draft, comment: e.target.value })}
                      placeholder="How does it wear on you?"
                      className="rounded-[2px] border border-rule bg-transparent px-3 py-2.5 text-[14px] outline-none focus:border-ink sm:col-span-2"
                    />
                    <button type="submit" className="ed-btn ed-btn-solid sm:col-span-2 sm:justify-self-start">
                      Post review
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <ul className="grid gap-x-10 sm:grid-cols-2">
              {reviews.slice(0, visibleReviews).map((r) => (
                <li key={r.id} className="border-b border-rule py-6">
                  <div className="flex items-center justify-between gap-3">
                    <Stars value={r.rating} className="text-ink" />
                    <span className="text-[12px] text-stone">{r.date}</span>
                  </div>
                  <p className="mt-3 text-[15px] font-medium leading-snug">{r.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{r.comment}</p>
                  <p className="mt-3 text-[12px] text-ink-soft">
                    {r.author}
                    {r.verified && <span className="text-stone"> · Verified buyer</span>}
                  </p>
                </li>
              ))}
            </ul>
            {visibleReviews < reviews.length && (
              <button
                type="button"
                onClick={() => setVisibleReviews((v) => Math.min(v + 8, reviews.length))}
                className="ed-btn ed-btn-line mt-8"
              >
                More reviews ({reviews.length - visibleReviews})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── what else to try ── */}
      {others.length > 0 && (
        <section className="ed-container mt-16 border-t border-rule pb-16 pt-10 md:mt-24 md:pb-24 md:pt-14" aria-labelledby="pdp-more">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="ed-label">You may also like</p>
              <h2 id="pdp-more" className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light">
                More from the house
              </h2>
            </div>
            <button type="button" onClick={onClose} className="ed-link hidden shrink-0 cursor-pointer text-[13px] font-medium sm:block">
              All fragrances →
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {others.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                onSelectProduct={(prod, s) => onSelectProduct?.(prod, s)}
                onAddToCart={(item, s, pr) =>
                  onAddToCart?.({ id: p.id, name: p.name, num: p.num, img: item.image ?? p.img }, s ?? 50, pr ?? item.price)
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* ── phone: the decision stays within reach ── */}
      {!soldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">
                {product.name} · {size} ml
              </p>
              <p className="text-[15px] font-medium tabular-nums">
                {inr(price)}
                {off > 0 && <span className="ml-2 text-[12px] font-normal text-stone line-through">{inr(mrp)}</span>}
              </p>
            </div>
            {inBag > 0 ? (
              <button type="button" onClick={onOpenCart} className="ed-btn ed-btn-line shrink-0 px-5">
                View bag ({inBag})
              </button>
            ) : (
              <button type="button" onClick={add} className="ed-btn ed-btn-solid shrink-0 px-6">
                Add to bag
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── a photograph, large ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} photograph`}
            className="fixed inset-0 z-[120] flex flex-col bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="ed-label">
                {product.name} · {shot + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-rule text-lg hover:border-ink"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6" onClick={() => setLightbox(false)}>
              <img
                src={images[shot]}
                alt={`${product.name} extrait de parfum`}
                className="max-h-full max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShot((i) => (i - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper/90 ring-1 ring-rule hover:ring-ink"
                    aria-label="Previous photograph"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShot((i) => (i + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper/90 ring-1 ring-rule hover:ring-ink"
                    aria-label="Next photograph"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confirmation */}
      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            className="fixed bottom-24 left-1/2 z-[130] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-[13px] text-paper md:bottom-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </article>
  );
}
