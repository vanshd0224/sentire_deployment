import React, { useRef, useState, useEffect } from "react";
import { ALL_PERFUMES } from "../data/perfumes";

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
  initialLikes: number;
}

const rawReels = [
  {
    id: "purple-oud",
    thumb: "/images/watch/purple-oud.jpg",
    video: "/videos/watch/purple-oud.mp4",
    product: "Purple Oud 50ml",
    notes: "Cambodian Oud • Amethyst Rose • Saffron",
    swatch: "/assets/purple-oud.png",
    initialLikes: 1420,
  },
  {
    id: "calantha",
    thumb: "/images/watch/calantha.jpg",
    video: "/videos/watch/calantha.mp4",
    product: "Calantha 50ml",
    notes: "Velvet Rose • Amethyst Oud • Warm Amber",
    swatch: "/assets/calantha.png",
    initialLikes: 1180,
  },
  {
    id: "deep-crush",
    thumb: "/images/watch/deep-crush.jpg",
    video: "/videos/watch/deep-crush.mp4",
    product: "Deep Crush 50ml",
    notes: "Black Cherry • Dark Vanilla • Seductive Musk",
    swatch: "/assets/deep-crush.png",
    initialLikes: 950,
  },
  {
    id: "midnight",
    thumb: "/images/watch/midnight.jpg",
    video: "/videos/watch/midnight.mp4",
    product: "Midnight 50ml",
    notes: "Dark Violet • Midnight Jasmine • Cedarwood",
    swatch: "/assets/midnight.png",
    initialLikes: 1310,
  },
  {
    id: "personna",
    thumb: "/images/watch/personna.jpg",
    video: "/videos/watch/personna.mp4",
    product: "Personna 50ml",
    notes: "Italian Bergamot • Iris Root • Oakmoss",
    swatch: "/assets/personna.png",
    initialLikes: 890,
  },
  {
    id: "rich",
    thumb: "/images/watch/rich.jpg",
    video: "/videos/watch/rich.mp4",
    product: "Rich 50ml",
    notes: "Golden Honey • Tonka Bean • Roasted Coffee",
    swatch: "/assets/rich.png",
    initialLikes: 1040,
  },
  {
    id: "herrlich",
    thumb: "/images/watch/herrlich.jpg",
    video: "/videos/watch/herrlich.mp4",
    product: "Herrlich 50ml",
    notes: "Smoky Birch • Leather Accord • Golden Amber",
    swatch: "/assets/herrlich.png",
    initialLikes: 760,
  },
  {
    id: "mirai",
    thumb: "/images/watch/mirai.jpg",
    video: "/videos/watch/mirai.mp4",
    product: "Mirai 50ml",
    notes: "White Tea • Cashmere Blossom • Soft Sandalwood",
    swatch: "/assets/mirai.png",
    initialLikes: 1120,
  },
  {
    id: "0809",
    thumb: "/images/watch/0809.jpg",
    video: "/videos/watch/0809.mp4",
    product: "0809 Signature 50ml",
    notes: "Spiced Cinnamon • Tobacco Leaf • Vanilla Bean",
    swatch: "/assets/0809.png",
    initialLikes: 1560,
  },
  {
    id: "seductive",
    thumb: "/images/watch/seductive.jpg",
    video: "/videos/watch/seductive.mp4",
    product: "Seductive 50ml",
    notes: "Red Plum • Orchid Petals • White Amber",
    swatch: "/assets/seductive.png",
    initialLikes: 990,
  },
  {
    id: "white-oud",
    thumb: "/images/watch/white-oud.jpg",
    video: "/videos/watch/white-oud.mp4",
    product: "White Oud 50ml",
    notes: "White Musks • Saffron Spice • Agarwood",
    swatch: "/assets/white-oud.png",
    initialLikes: 1280,
  },
];

const reels: ReelProduct[] = rawReels.map((r) => {
  const pData = ALL_PERFUMES.find((p) => p.id === r.id);
  const price = pData?.prices[50] ?? 1199;
  const mrp = pData?.mrps?.[50] ?? Math.round(price * 1.4);
  const discountPct = Math.round(((mrp - price) / mrp) * 100);

  return {
    ...r,
    price,
    priceText: `₹ ${price.toLocaleString("en-IN")}`,
    original: `₹ ${mrp.toLocaleString("en-IN")}`,
    badge: `${discountPct}% off`,
  };
});

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
  onSelectProduct?: (product: any, size?: number) => void;
}

export default function WatchAndBuy({ onAddToCart, onOpenCart, onSelectProduct }: WatchAndBuyProps) {
  const [cardWidth, setCardWidth] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 220
  );
  const [trackIndex, setTrackIndex] = useState(ORIGIN);
  const [animated, setAnimated] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [likesMap, setLikesMap] = useState<{ [id: string]: { count: number; liked: boolean } }>(() => {
    const map: { [id: string]: { count: number; liked: boolean } } = {};
    reels.forEach((r) => {
      map[r.id] = { count: r.initialLikes, liked: false };
    });
    return map;
  });

  const transitioning = useRef(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth < 640 ? 180 : 220);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeReelIndex !== null) {
      setIsMuted(false);
      setIsPlaying(true);
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = 0;
        modalVideoRef.current.muted = false;
        modalVideoRef.current.play().catch(() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            setIsMuted(true);
            modalVideoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [activeReelIndex]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (modalVideoRef.current) modalVideoRef.current.muted = nextMute;
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

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

  const triggerAdd = (e: React.MouseEvent, reel: ReelProduct) => {
    e.stopPropagation();
    onAddToCart?.({ id: reel.id, name: reel.product, img: reel.swatch }, 50, reel.price);
    showToast(`Added ${reel.product} to Bag!`);
    onOpenCart?.();
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikesMap((prev) => {
      const curr = prev[id] || { count: 1000, liked: false };
      const nextLiked = !curr.liked;
      const nextCount = nextLiked ? curr.count + 1 : curr.count - 1;
      return { ...prev, [id]: { count: nextCount, liked: nextLiked } };
    });
  };

  const handleShare = (e: React.MouseEvent, reel: ReelProduct) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/perfumes/${reel.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("Link Copied to Clipboard!");
      }).catch(() => {
        showToast("Link Copied!");
      });
    } else {
      showToast("Link Copied!");
    }
  };

  return (
    <section className="w-full bg-[#FAF6F0] py-12 sm:py-16 overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="fixed z-[9999999] left-1/2 -translate-x-1/2 rounded-full border border-[#c89b5a]/60 bg-[#1c1917] px-6 py-3 text-xs font-bold text-white shadow-2xl flex items-center gap-2 animate-fadeIn"
          style={{ bottom: "calc(74px + env(safe-area-inset-bottom, 8px) + 12px)" }}
        >
          <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          {toastMsg}
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Carousel Heading */}
        <h2 className="flex items-center justify-center gap-4 sm:gap-6 font-display text-[20px] tracking-[0.25em] text-[#1c1917] uppercase sm:text-[26px]">
          <span className="h-px w-8 bg-[#1c1917]/25 sm:w-14" />
          Watch &amp; Buy
          <span className="h-px w-8 bg-[#1c1917]/25 sm:w-14" />
        </h2>

        {/* Carousel Viewport with Floating Scroll Arrows */}
        <div className="relative mt-8 sm:mt-10 flex items-center">
          {/* Scroll Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-2 z-20 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-md border border-black/10 hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Viewport */}
          <div className="relative flex-1 overflow-x-auto scroll-smooth hide-scrollbar md:overflow-hidden">
            {/* Track */}
            <div
              className="flex will-change-transform gap-4 px-2"
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
                    className="group flex shrink-0 flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                    style={{ width: `${cardWidth}px` }}
                  >
                    {/* Video Card - AUTOPLAY MUTED DIRECTLY ON LANDING PAGE */}
                    <div
                      className="relative overflow-hidden rounded-2xl bg-black shadow-md border border-black/10 h-[270px] sm:h-[340px] group-hover:shadow-xl transition-all duration-300"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <video
                        src={reel.video}
                        poster={reel.thumb}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Product Info Bar Below Card (Fragranote Style: Title, Price + Discount, (+) Add Button) */}
                    <div className="mt-2.5 flex items-center justify-between gap-1 px-1">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] sm:text-[12px] font-bold text-[#1c1917] uppercase tracking-wide">
                          {reel.product}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] sm:text-[12px] font-extrabold text-[#1c1917]">{reel.priceText}</span>
                          <span className="text-[10px] text-[#78716c] line-through">{reel.original}</span>
                          <span className="text-[9px] font-bold text-white bg-[#9e2a2b] px-1.5 py-0.5 rounded">
                            {reel.badge}
                          </span>
                        </div>
                      </div>

                      {/* Circular (+) Quick Add Button */}
                      <button
                        onClick={(e) => triggerAdd(e, reel)}
                        aria-label={`Add ${reel.product} to cart`}
                        className="h-7 w-7 rounded-full border border-black/80 text-black flex items-center justify-center text-base font-bold hover:bg-black hover:text-white transition-all shrink-0 cursor-pointer shadow-sm ml-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-2 z-20 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-md border border-black/10 hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Interactive Full-Screen Reel Modal Player (FRAGRANOTE STYLE) ── */}
      {activeReel && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveReelIndex(null)}
        >
          <div
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-black flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls Overlay */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-end p-3.5 gap-2 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
              <button
                onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-colors cursor-pointer text-xs"
                aria-label="Toggle mute"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
              <button
                onClick={() => setActiveReelIndex(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-colors cursor-pointer text-xs font-bold"
                aria-label="Close reel"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={togglePlayPause}>
              <video
                ref={modalVideoRef}
                key={activeReel.video}
                src={activeReel.video}
                poster={activeReel.thumb}
                autoPlay
                loop
                playsInline
                preload="auto"
                muted={isMuted}
                className="w-full h-full object-cover"
              />

              {/* Play / Pause Indicator */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white border border-white/40 shadow-2xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
                      <path d="M6 4l14 8-14 8V4z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Action Buttons Overlay (Like & Share) */}
            <div className="absolute right-3 bottom-28 z-30 flex flex-col gap-4 items-center">
              {/* Like Button */}
              <button
                onClick={(e) => toggleLike(e, activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all ${
                  likesMap[activeReel.id]?.liked ? "bg-red-600 text-white border-red-500 scale-110" : "bg-black/60 text-white hover:bg-white hover:text-black"
                }`}>
                  <svg viewBox="0 0 24 24" fill={likesMap[activeReel.id]?.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-[10px] text-white font-bold tracking-wide shadow-sm">
                  {likesMap[activeReel.id]?.count ? (likesMap[activeReel.id].count / 1000).toFixed(1) + "k" : "1.1k"}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={(e) => handleShare(e, activeReel)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] text-white font-bold tracking-wide shadow-sm">Share</span>
              </button>
            </div>

            {/* Bottom Floating White Product Card (Fragranote Reel Interface) */}
            <div className="relative z-30 mt-auto p-3">
              <div className="bg-white text-black p-3.5 rounded-2xl shadow-2xl flex flex-col gap-2.5 border border-black/10">
                {/* Top Row: Thumbnail, Product Title, Price & Link Icon */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => {
                      const pData = ALL_PERFUMES.find((p) => p.id === activeReel.id);
                      if (pData) onSelectProduct?.(pData);
                    }}
                    className="h-11 w-11 shrink-0 rounded-lg bg-[#FAF6F0] p-1 border border-black/10 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    <img src={activeReel.swatch} alt={activeReel.product} className="h-full w-full object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4
                        onClick={() => {
                          const pData = ALL_PERFUMES.find((p) => p.id === activeReel.id);
                          if (pData) onSelectProduct?.(pData);
                        }}
                        className="text-xs sm:text-sm font-bold text-black truncate cursor-pointer hover:underline"
                      >
                        {activeReel.product}
                      </h4>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 text-black/60 shrink-0">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-extrabold text-black">{activeReel.priceText}</span>
                      <span className="text-[10px] text-black/40 line-through">{activeReel.original}</span>
                      <span className="text-[9px] font-bold text-white bg-[#9e2a2b] px-1 rounded">
                        {activeReel.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ADD TO CART Button */}
                <button
                  onClick={(e) => {
                    triggerAdd(e, activeReel);
                    setActiveReelIndex(null);
                  }}
                  className="w-full py-2.5 px-4 bg-black hover:bg-[#1c1917] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
