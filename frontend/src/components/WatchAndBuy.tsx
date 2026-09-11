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
  const [shareModalReel, setShareModalReel] = useState<ReelProduct | null>(null);
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

  const [activeVideoIndexes, setActiveVideoIndexes] = useState<Set<number>>(new Set());

  // Smart Video Playback Controller (Desktop: all visible play | Mobile: ONLY centered video plays)
  useEffect(() => {
    const updateVideoPlayback = () => {
      const isMobile = window.innerWidth < 768;
      const cards = document.querySelectorAll<HTMLElement>(".watch-carousel-card");
      const newActive = new Set<number>();

      if (isMobile) {
        // MOBILE: Find the video card closest to center of screen
        const screenCenterX = window.innerWidth / 2;
        let closestIndex: number | null = null;
        let minDistance = Infinity;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.right > 0 && rect.left < window.innerWidth) {
            const cardCenterX = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenterX - screenCenterX);
            if (dist < minDistance) {
              minDistance = dist;
              const idxAttr = card.getAttribute("data-index");
              if (idxAttr !== null) closestIndex = parseInt(idxAttr, 10);
            }
          }
        });

        if (closestIndex !== null) {
          newActive.add(closestIndex);
        }
      } else {
        // DESKTOP: All visible cards play simultaneously
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.right > -50 && rect.left < window.innerWidth + 50) {
            const idxAttr = card.getAttribute("data-index");
            if (idxAttr !== null) {
              newActive.add(parseInt(idxAttr, 10));
            }
          }
        });
      }

      setActiveVideoIndexes((prev) => {
        if (prev.size === newActive.size && [...newActive].every((i) => prev.has(i))) {
          return prev;
        }
        return newActive;
      });
    };

    updateVideoPlayback();
    const timer1 = setTimeout(updateVideoPlayback, 100);
    const timer2 = setTimeout(updateVideoPlayback, 400);
    const timer3 = setTimeout(updateVideoPlayback, 1000);
    const interval = setInterval(updateVideoPlayback, 600);

    const viewportEl = document.querySelector(".watch-carousel-viewport");
    if (viewportEl) {
      viewportEl.addEventListener("scroll", updateVideoPlayback, { passive: true });
    }

    window.addEventListener("scroll", updateVideoPlayback, { passive: true });
    window.addEventListener("touchmove", updateVideoPlayback, { passive: true });
    window.addEventListener("touchend", updateVideoPlayback, { passive: true });
    window.addEventListener("resize", updateVideoPlayback, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
      if (viewportEl) {
        viewportEl.removeEventListener("scroll", updateVideoPlayback);
      }
      window.removeEventListener("scroll", updateVideoPlayback);
      window.removeEventListener("touchmove", updateVideoPlayback);
      window.removeEventListener("touchend", updateVideoPlayback);
      window.removeEventListener("resize", updateVideoPlayback);
    };
  }, [trackIndex]);

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

  const handleShareClick = (e: React.MouseEvent, reel: ReelProduct) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/perfumes/${reel.id}`;

    // Try native Web Share API if on mobile device
    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      navigator
        .share({
          title: `Sentire ${reel.product}`,
          text: `Experience Sentire ${reel.product} Extrait de Parfum!`,
          url: shareUrl,
        })
        .catch(() => {
          setShareModalReel(reel);
        });
    } else {
      setShareModalReel(reel);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
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
          className="fixed z-[99999999] left-1/2 -translate-x-1/2 rounded-full border border-[#c89b5a]/60 bg-[#1c1917] px-6 py-3 text-xs font-bold text-white shadow-2xl flex items-center gap-2 animate-fadeIn"
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
          <div className="relative flex-1 overflow-x-auto scroll-smooth hide-scrollbar md:overflow-hidden watch-carousel-viewport">
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
                    data-index={i}
                    onClick={() => setActiveReelIndex(reelIndex)}
                    className="watch-carousel-card group flex shrink-0 flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                    style={{ width: `${cardWidth}px` }}
                  >
                    {/* Video Card - AUTOPLAY MUTED DIRECTLY ON LANDING PAGE */}
                    <div
                      className="relative overflow-hidden rounded-2xl bg-black shadow-md border border-black/10 h-[270px] sm:h-[340px] group-hover:shadow-xl transition-all duration-300"
                      style={{ width: `${cardWidth}px` }}
                    >
                      {activeVideoIndexes.has(i) ? (
                        <video
                          ref={(el) => {
                            if (el) {
                              el.muted = true;
                              const p = el.play();
                              if (p !== undefined) p.catch(() => {});
                            }
                          }}
                          src={reel.video}
                          poster={reel.thumb}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="watch-carousel-video h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={reel.thumb}
                          alt={reel.product}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
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
                onClick={(e) => handleShareClick(e, activeReel)}
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

      {/* ── MULTI-OPTION SHARE SHEET MODAL (WhatsApp, Instagram, FB, X, Copy Link) ── */}
      {shareModalReel && (
        <div
          className="fixed inset-0 z-[99999999] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn"
          onClick={() => setShareModalReel(null)}
        >
          <div
            className="w-full max-w-md bg-[#FAF6F0] rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#C89B5A]/40 text-[#1C1917] relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
              <h3 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wide text-[#1C1917]">
                Share Fragrance
              </h3>
              <button
                onClick={() => setShareModalReel(null)}
                className="h-8 w-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-xs font-bold text-black transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Product Preview Bar */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-black/10 mb-5 shadow-sm">
              <img src={shareModalReel.swatch} alt={shareModalReel.product} className="h-10 w-10 object-contain p-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold uppercase truncate text-black">{shareModalReel.product}</h4>
                <p className="text-[10px] text-black/60 truncate">{shareModalReel.notes}</p>
              </div>
              <span className="text-xs font-extrabold text-[#9e2a2b]">{shareModalReel.priceText}</span>
            </div>

            {/* Social Share Grid Icons */}
            <div className="grid grid-cols-4 gap-3 text-center mb-5">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out Sentire ${shareModalReel.product} Extrait de Parfum: ${window.location.origin}/perfumes/${shareModalReel.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.103-1.077z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-black/80">WhatsApp</span>
              </a>

              {/* Instagram */}
              <button
                onClick={() => {
                  copyToClipboard(`${window.location.origin}/perfumes/${shareModalReel.id}`);
                  window.open("https://instagram.com", "_blank");
                }}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-black/80">Instagram</span>
              </button>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/perfumes/${shareModalReel.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-black/80">Facebook</span>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out Sentire ${shareModalReel.product} Extrait de Parfum!`)}&url=${encodeURIComponent(`${window.location.origin}/perfumes/${shareModalReel.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-black/80">X / Twitter</span>
              </a>
            </div>

            {/* Copy Direct Link Section */}
            <div className="bg-white p-2 rounded-2xl border border-black/15 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/perfumes/${shareModalReel.id}`}
                className="flex-1 bg-transparent text-xs text-black font-mono px-2 outline-none select-all truncate"
              />
              <button
                onClick={() => copyToClipboard(`${window.location.origin}/perfumes/${shareModalReel.id}`)}
                className="bg-[#1C1917] hover:bg-[#c89b5a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
