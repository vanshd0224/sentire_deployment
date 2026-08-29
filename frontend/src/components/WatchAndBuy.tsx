import React, { useRef, useState, useEffect } from "react";

export interface ReelProduct {
  id: string;
  thumb: string;
  video: string;
  product: string;
  notes: string;
  price: number;
  priceText: string;
  original: string;
  badge: string;
  swatch: string;
}

const reels: ReelProduct[] = [
  {
    id: "calantha",
    thumb: "/images/watch/watch-1.jpg",
    video: "/videos/watch/watch-1.mp4",
    product: "Calantha 50ml",
    notes: "Velvet Rose • Amethyst Oud • Warm Amber",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/calantha.png",
  },
  {
    id: "deep-crush",
    thumb: "/images/watch/watch-2.jpg",
    video: "/videos/watch/watch-2.mp4",
    product: "Deep Crush 50ml",
    notes: "Black Cherry • Dark Vanilla • Seductive Musk",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/deep-crush.png",
  },
  {
    id: "herrlich",
    thumb: "/images/watch/watch-3.jpg",
    video: "/videos/watch/watch-3.mp4",
    product: "Herrlich 50ml",
    notes: "Smoky Birch • Leather Accord • Golden Amber",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/herrlich.png",
  },
  {
    id: "midnight",
    thumb: "/images/watch/watch-4.jpg",
    video: "/videos/watch/watch-4.mp4",
    product: "Midnight 50ml",
    notes: "Dark Violet • Midnight Jasmine • Cedarwood",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/midnight.png",
  },
  {
    id: "mirai",
    thumb: "/images/watch/watch-5.jpg",
    video: "/videos/watch/watch-5.mp4",
    product: "Mirai 50ml",
    notes: "White Tea • Cashmere Blossom • Soft Sandalwood",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/mirai.png",
  },
  {
    id: "0809",
    thumb: "/images/watch/watch-6.jpg",
    video: "/videos/watch/watch-6.mp4",
    product: "0809 Signature 50ml",
    notes: "Spiced Cinnamon • Tobacco Leaf • Vanilla Bean",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/0809.png",
  },
  {
    id: "personna",
    thumb: "/images/watch/watch-7.jpg",
    video: "/videos/watch/watch-7.mp4",
    product: "Personna 50ml",
    notes: "Italian Bergamot • Iris Root • Oakmoss",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/personna.png",
  },
  {
    id: "purple-oud",
    thumb: "/images/watch/watch-8.jpg",
    video: "/videos/watch/watch-8.mp4",
    product: "Purple Oud 50ml",
    notes: "Cambodian Oud • Amethyst Rose • Saffron",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/purple-oud.png",
  },
  {
    id: "rich",
    thumb: "/images/watch/watch-9.jpg",
    video: "/videos/watch/watch-9.mp4",
    product: "Rich 50ml",
    notes: "Golden Honey • Tonka Bean • Roasted Coffee",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/rich.png",
  },
  {
    id: "seductive",
    thumb: "/images/watch/watch-10.jpg",
    video: "/videos/watch/watch-10.mp4",
    product: "Seductive 50ml",
    notes: "Red Plum • Orchid Petals • White Amber",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/seductive.png",
  },
  {
    id: "white-oud",
    thumb: "/images/watch/watch-11.jpg",
    video: "/videos/watch/watch-11.mp4",
    product: "White Oud 50ml",
    notes: "White Musks • Saffron Spice • Agarwood",
    price: 1199,
    priceText: "₹1,199",
    original: "₹1,699",
    badge: "29% OFF",
    swatch: "/assets/white-oud.png",
  },
];

const GAP = 16;
const TOTAL = reels.length;

const CLONE_COUNT = TOTAL;
const track = [
  ...reels.slice(-CLONE_COUNT),
  ...reels,
  ...reels.slice(0, CLONE_COUNT),
];
const ORIGIN = CLONE_COUNT;

interface WatchAndBuyProps {
  onAddToCart?: (product: { id: string; name: string; img: string }, size: number, price: number) => void;
  onOpenCart?: () => void;
}

export default function WatchAndBuy({ onAddToCart, onOpenCart }: WatchAndBuyProps) {
  const [cardWidth, setCardWidth] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 190 : 224
  );
  const [trackIndex, setTrackIndex] = useState(ORIGIN);
  const [animated, setAnimated] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const transitioning = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth < 640 ? 190 : 224);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTransitionEnd = () => {
    transitioning.current = false;
    let next = trackIndex;

    if (trackIndex < ORIGIN) {
      next = trackIndex + TOTAL;
    } else if (trackIndex >= ORIGIN + TOTAL) {
      next = trackIndex - TOTAL;
    }

    if (next !== trackIndex) {
      setAnimated(false);
      setTrackIndex(next);
    }
  };

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const scroll = (dir: "left" | "right") => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setTrackIndex((prev) => prev + (dir === "right" ? 3 : -3));
  };

  const step = cardWidth + GAP;
  const offset = trackIndex * step;

  const activeReel = activeReelIndex !== null ? reels[activeReelIndex] : null;

  const handleNextReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      setActiveReelIndex((activeReelIndex + 1) % reels.length);
    }
  };

  const handlePrevReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      setActiveReelIndex((activeReelIndex - 1 + reels.length) % reels.length);
    }
  };

  const triggerAdd = (reel: ReelProduct) => {
    onAddToCart?.({ id: reel.id, name: reel.product, img: reel.swatch }, 50, reel.price);
    setToastMsg(`Added ${reel.product} to Bag!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <section className="w-full bg-cream py-14 sm:py-20 reveal-fade-up overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed z-50 left-1/2 -translate-x-1/2 rounded-full border border-[#c89b5a]/60 bg-[#0b0907] px-6 py-3 text-xs font-bold text-white shadow-2xl flex items-center gap-2"
          style={{ bottom: "calc(74px + env(safe-area-inset-bottom, 8px) + 12px)" }}>
          <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          {toastMsg}
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-4 sm:gap-6 font-display text-[22px] tracking-[0.28em] text-ink uppercase sm:text-[28px]">
          <span className="h-px w-10 bg-ink/25 sm:w-16" />
          Watch & Buy
          <span className="h-px w-10 bg-ink/25 sm:w-16" />
        </h2>
        <p className="text-center text-[10.5px] sm:text-[11.5px] text-ink/60 uppercase tracking-[0.2em] font-medium mt-1">
          Experience Haute Parfumerie in Motion
        </p>

        {/* Controls row */}
        <div className="mt-8 sm:mt-12 flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="z-10 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-white text-ink shadow-sm transition-all duration-200 hover:border-[#c89b5a] hover:text-[#c89b5a] hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Viewport */}
          <div className="relative flex-1 overflow-x-auto scroll-smooth hide-scrollbar md:overflow-hidden">
            {/* Left fade */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 hidden md:block"
              style={{ background: "linear-gradient(to right, #f8f5f1 20%, transparent)" }}
            />
            {/* Right fade */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 hidden md:block"
              style={{ background: "linear-gradient(to left, #f8f5f1 20%, transparent)" }}
            />

            {/* Track */}
            <div
              className="flex will-change-transform gap-4 md:gap-4 px-2"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: animated ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {track.map((reel, i) => {
                const reelIndex = i % reels.length;

                return (
                  <div
                    key={i}
                    onClick={() => setActiveReelIndex(reelIndex)}
                    className="group flex shrink-0 flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                    style={{ width: `${cardWidth}px` }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative overflow-hidden rounded-2xl bg-black shadow-lg border border-[#c89b5a]/30 h-[250px] sm:h-[330px] group-hover:border-[#c89b5a] group-hover:shadow-[0_12px_32px_rgba(200,155,90,0.25)] transition-all duration-300"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <img
                        src={reel.thumb}
                        alt={`Sentire ${reel.product} luxury fragrance application and sillage demonstration`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                        width="220"
                        height="330"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                      {/* Play button with golden glow */}
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0b0907]/60 text-[#f5f0e8] backdrop-blur-md border border-[#d4af37]/50 shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0b0907] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 sm:ml-1 h-5 w-5 sm:h-6 sm:w-6">
                            <path d="M6 4l14 8-14 8V4z" />
                          </svg>
                        </span>
                      </span>

                      {/* Discount Tag */}
                      <span className="absolute top-3 left-3 rounded-md bg-gradient-to-r from-[#1a120a] to-[#0d0906] px-2.5 py-1 text-[8.5px] sm:text-[9.5px] font-bold tracking-wider text-[#d4af37] border border-[#c89b5a]/50 shadow-md">
                        {reel.badge}
                      </span>
                    </div>

                    {/* Product info */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-[#f4eee6] p-0.5 shadow-sm">
                        <img src={reel.swatch} alt={`Sentire ${reel.product} flacon`} width="40" height="40" className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[10.5px] sm:text-[12px] font-bold tracking-wide text-ink uppercase leading-tight group-hover:text-[#c89b5a] transition-colors">
                          {reel.product}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className="text-[11.5px] sm:text-[13px] font-bold text-ink">{reel.priceText}</span>
                          <span className="text-[10px] sm:text-[11px] text-ink/40 line-through">{reel.original}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="z-10 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-white text-ink shadow-sm transition-all duration-200 hover:border-[#c89b5a] hover:text-[#c89b5a] hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Interactive Video Reel Modal Player ── */}
      {activeReel && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 p-0 sm:p-4 md:p-6 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActiveReelIndex(null)}
        >
          <div
            className="relative w-full h-full sm:h-auto sm:max-w-sm md:max-w-md aspect-[9/16] max-h-full sm:max-h-[85vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border-0 sm:border border-[#c89b5a]/50 bg-black flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls Gradient */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
              <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] font-bold tracking-widest text-[#d4af37] border border-white/20 uppercase shadow-md">
                {activeReel.badge}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted((p) => !p)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-[#c89b5a] hover:text-black transition-colors cursor-pointer shadow-md"
                  aria-label="Toggle mute"
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <button
                  onClick={() => setActiveReelIndex(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-[#c89b5a] hover:text-black transition-colors cursor-pointer shadow-md"
                  aria-label="Close reel"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Instant Preloaded Faststart Video Player */}
            <video
              ref={videoRef}
              src={activeReel.video}
              poster={activeReel.thumb}
              autoPlay
              loop
              playsInline
              preload="auto"
              muted={isMuted}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Bottom Scrim & Product Action Drawer */}
            <div className="relative z-20 mt-auto p-4 sm:p-5 pb-8 sm:pb-5 bg-gradient-to-t from-black via-black/85 to-transparent">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl">
                <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-md">
                  <img src={activeReel.swatch} alt={activeReel.product} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">
                    {activeReel.product}
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-white/70 truncate">{activeReel.notes}</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xs font-bold text-[#d4af37]">{activeReel.priceText}</span>
                    <span className="text-[10px] text-white/50 line-through">{activeReel.original}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    triggerAdd(activeReel);
                    setActiveReelIndex(null);
                    onOpenCart?.();
                  }}
                  className="btn-luxe-gold shrink-0 cursor-pointer shadow-lg active:scale-95"
                  style={{ padding: "9px 15px", fontSize: "9px" }}
                >
                  Buy Now
                </button>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex items-center justify-between mt-3 px-2">
                <button
                  onClick={handlePrevReel}
                  className="text-xs text-white/80 hover:text-[#d4af37] font-semibold tracking-wider cursor-pointer"
                >
                  ← Prev Reel
                </button>
                <span className="text-[10px] text-white/60 font-mono">
                  {(activeReelIndex ?? 0) + 1} / {reels.length}
                </span>
                <button
                  onClick={handleNextReel}
                  className="text-xs text-white/80 hover:text-[#d4af37] font-semibold tracking-wider cursor-pointer"
                >
                  Next Reel →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
