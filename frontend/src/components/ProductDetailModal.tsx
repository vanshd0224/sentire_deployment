import { useState, useMemo, useEffect, useRef } from "react";
import type { PerfumeProduct } from "./PerfumesPage";
import type { CartItem } from "./CartDrawer";
import { getPerfumeReviews, getPerfumeReviewStats, type Review } from "../data/reviews";

interface ScentNote {
  name: string;
  tier: "Top Note" | "Heart Note" | "Base Note";
  icon: string;
  desc: string;
  intensity: number;
}

interface ProductDetailModalProps {
  product: PerfumeProduct | null;
  onClose: () => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
  allProducts?: PerfumeProduct[];
}

export default function ProductDetailModal({
  product,
  onClose,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
  onSelectProduct,
  allProducts = [],
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(() => product?.sizes[0] || 50);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [pincode, setPincode] = useState<string>("");
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<ScentNote | null>(null);
  const [notifyEmail, setNotifyEmail] = useState<string>("");
  const [notifySubmitted, setNotifySubmitted] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);

  const handleShare = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!product) return;

    const shareUrl = `${window.location.origin}/perfumes/${product.id}`;
    const shareTitle = `SENTIRE By PC - ${product.name}`;
    const shareText = `Discover ${product.name} Extrait de Parfum by SENTIRE By PC. Luxury 35% oil concentration.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        showToast("Shared successfully!");
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShareLink(true);
      showToast("Link copied to clipboard! 🔗");
      setTimeout(() => setCopiedShareLink(false), 2500);
    } catch (err) {
      showToast("Link copied to clipboard! 🔗");
    }
  };

  // Review Form State
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>("");
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewTitle, setNewReviewTitle] = useState<string>("");
  const [newReviewComment, setNewReviewComment] = useState<string>("");

  // Local reviews state per product
  const [customReviews, setCustomReviews] = useState<Record<string, Review[]>>({});
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(6);

  // Product Personalisation State
  const [isPersonalising, setIsPersonalising] = useState<boolean>(false);
  const [engravingText, setEngravingText] = useState<string>("");
  const [includeDate, setIncludeDate] = useState<boolean>(false);
  const [engravingDate, setEngravingDate] = useState<string>("");

  // Keyboard listener: close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && product) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset selected size, image index & scroll modal to top when product changes
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      const outStock = product.outOfStockSizes || [];
      const inStock = product.sizes.filter((s) => !outStock.includes(s));
      const defaultSz = inStock.includes(50) ? 50 : inStock[inStock.length - 1] || product.sizes[0];
      setSelectedSize(defaultSz);
      setSelectedImageIndex(0);
      setSelectedNote(null);
      setNotifySubmitted(false);
      setVisibleReviewsCount(6);

      if (modalContainerRef.current) {
        modalContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [product]);

  // Collapse personalisation if a non-50ML size (10ml / 30ml) is selected
  useEffect(() => {
    if (selectedSize !== 50) {
      setIsPersonalising(false);
    }
  }, [selectedSize]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl(url);
    }
  };

  const removePhotoFile = () => {
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
  };

  // Helper for cart quantity (matches exact size and personalisation status)
  const cartQty = useMemo(() => {
    if (!product) return 0;
    const item = cartItems.find(
      (ci) => ci.productId === product.id && ci.size === selectedSize && Boolean(ci.isPersonalised) === Boolean(hasPersonalisation)
    );
    return item ? item.quantity : 0;
  }, [cartItems, product, selectedSize, hasPersonalisation]);

  // Comprehensive Scent Pyramid Notes & Tags
  const scentPyramid = useMemo(() => {
    if (!product) return { top: [], heart: [], base: [] };

    const traces = product.traces || [];
    const t0 = traces[0] || "Calabrian Bergamot";
    const t1 = traces[1] || "French Jasmine";
    const t2 = traces[2] || "Smoky Oud";
    const t3 = traces[3] || "Golden Amber";

    const topNotes: ScentNote[] = [
      {
        name: t0,
        tier: "Top Note",
        icon: "🍋",
        desc: "Bright, sparkling opening accord that creates an instantaneous uplifting aroma.",
        intensity: 85,
      },
      {
        name: "Pink Pepper",
        tier: "Top Note",
        icon: "🌶️",
        desc: "Warm spicy sparkle adding vibrant energetic character to initial spritz.",
        intensity: 75,
      },
    ];

    const heartNotes: ScentNote[] = [
      {
        name: t1,
        tier: "Heart Note",
        icon: "🌸",
        desc: "Opulent floral heart unfolding 15 minutes after application.",
        intensity: 90,
      },
      {
        name: "Velvet Rose Accord",
        tier: "Heart Note",
        icon: "🌹",
        desc: "Deep, romantic bouquet giving rich texture and unisex elegance.",
        intensity: 88,
      },
    ];

    const baseNotes: ScentNote[] = [
      {
        name: t2,
        tier: "Base Note",
        icon: "🪵",
        desc: "Precious rare wood base anchoring long-lasting persistence.",
        intensity: 95,
      },
      {
        name: t3,
        tier: "Base Note",
        icon: "✨",
        desc: "Radiant golden resin providing warm velvet sillage on dry-down.",
        intensity: 92,
      },
      {
        name: "Madagascar Vanilla & Musk",
        tier: "Base Note",
        icon: "🍦",
        desc: "Smooth comforting embrace leaving an indelible memory trail.",
        intensity: 90,
      },
    ];

    return { top: topNotes, heart: heartNotes, base: baseNotes };
  }, [product]);

  // Verified Customer Reviews for this product
  const productReviews: Review[] = useMemo(() => {
    if (!product) return [];
    const baseReviews = getPerfumeReviews(product.id);
    return [...(customReviews[product.id] || []), ...baseReviews];
  }, [product, customReviews]);

  // Dynamic review statistics
  const reviewStats = useMemo(() => {
    if (!product) {
      return {
        count: 0,
        averageRating: 4.9,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }
    return getPerfumeReviewStats(product.id, customReviews[product.id] || []);
  }, [product, customReviews]);

  // Gallery Images for Product (3-3 Photos per size: 10ML, 30ML, 50ML)
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.sizeImages) {
      if (product.sizeImages[selectedSize]) return product.sizeImages[selectedSize];
      if ((product.sizeImages as any)[String(selectedSize)]) return (product.sizeImages as any)[String(selectedSize)];
    }
    const fallbackImg = product.img || (product as any).image || "/assets/perfumes/purple-oud-50ml-2.png?v=3";
    return [fallbackImg, fallbackImg, fallbackImg];
  }, [product, selectedSize]);

  // Recommended products (excluding current)
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  }, [allProducts, product]);

  if (!product) return null;

  const hasPersonalisation = selectedSize === 50 && (isPersonalising || engravingText.trim() !== "" || (includeDate && engravingDate !== ""));
  const basePrice = product.prices[selectedSize] || product.prices[product.sizes[0]] || 799;
  const currentPrice = basePrice + (hasPersonalisation ? 200 : 0);
  const originalPrice = product.mrps && product.mrps[selectedSize] ? product.mrps[selectedSize] + (hasPersonalisation ? 200 : 0) : Math.round(currentPrice * 1.35);
  const discountPercent = originalPrice > currentPrice && originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryStatus("Please enter a valid 6-digit Pincode");
      return;
    }
    setIsCheckingPincode(true);
    setDeliveryStatus(null);
    setTimeout(() => {
      setIsCheckingPincode(false);
      setDeliveryStatus("✅ Express Delivery available! Guaranteed delivery within 48-72 hours with free insurance.");
    }, 600);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewComment) return;

    const newRev: Review = {
      id: `custom-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: "Just now",
      title: newReviewTitle,
      comment: newReviewComment,
      verified: true,
    };

    setCustomReviews((prev) => ({
      ...prev,
      [product.id]: [newRev, ...(prev[product.id] || [])],
    }));

    setNewReviewAuthor("");
    setNewReviewTitle("");
    setNewReviewComment("");
    setIsWritingReview(false);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySubmitted(true);
    setTimeout(() => {
      setNotifySubmitted(false);
      setNotifyEmail("");
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overflow-y-auto bg-black/85 p-0 sm:p-6 backdrop-blur-xl transition-all duration-300 animate-in fade-in">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card Window / Mobile Bottom Sheet */}
      <div ref={modalContainerRef} className="relative z-10 w-full max-w-6xl max-h-[94vh] md:max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-[#fcfbf7] border-t md:border border-[#c89b5a]/40 shadow-[0_25px_80px_rgba(0,0,0,0.8)] text-[#1e1e1e] transition-all duration-300 hide-scrollbar glass-bottom-sheet md:glass-card-luxury">
        {/* Mobile Drag Handle Bar */}
        <div className="w-12 h-1.5 rounded-full bg-black/20 mx-auto mt-3 -mb-1 md:hidden shrink-0" />
        {/* Sticky Header Action Buttons (Close Button + Share Button directly below it) */}
        <div className="sticky top-4 right-4 z-30 float-right flex flex-col items-center gap-2.5">
          {/* 1. Close Button (✕) */}
          <button
            onClick={onClose}
            className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 text-[#1e1e1e]/70 shadow-lg backdrop-blur-md transition-all hover:bg-[#c89b5a] hover:text-white cursor-pointer active:scale-95 touch-manipulation"
            aria-label="Close modal"
            title="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* 2. Share Button (directly below Cross button) */}
          <button
            onClick={handleShare}
            className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 text-[#1e1e1e]/80 shadow-lg backdrop-blur-md transition-all hover:bg-[#c89b5a] hover:text-white cursor-pointer active:scale-95 touch-manipulation border border-black/5"
            aria-label="Share product"
            title="Share this perfume"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>

        {/* ── BREADCRUMB ── */}
        <div className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1e1e1e]/40">
          <span>Home</span> <span className="mx-1.5">•</span> <span>Fragrances</span> <span className="mx-1.5">•</span>{" "}
          <span className="text-[#c89b5a] font-bold">{product.name}</span>
        </div>

        {/* ── TOP BUY BOX GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 lg:p-10">
          {/* LEFT COLUMN: MULTI-IMAGE GALLERY & SCENT PYRAMID ACCORD */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Featured Image Box */}
            <div className="relative aspect-square sm:aspect-[4/5] max-h-60 sm:max-h-96 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#f5efe6] to-[#ebe3d5] border border-black/8 p-3 sm:p-6 flex items-center justify-center group shadow-md">
              <img
                src={galleryImages[selectedImageIndex] || product.img}
                alt={`Sentire ${product.name} personalised perfume bottle with 35%+ perfume oil concentration and laser engraving`}
                width="500"
                height="600"
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-[#120e0a] px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#c89b5a] shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-3 justify-center">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-14 w-14 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border-2 bg-[#f5efe6] p-1.5 transition-all cursor-pointer touch-manipulation ${
                    selectedImageIndex === idx
                      ? "border-[#c89b5a] scale-105 shadow-md ring-2 ring-[#c89b5a]/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select fragrance view ${idx + 1}`}
                >
                  <img src={img} alt={`Sentire ${product.name} view ${idx + 1}`} width="80" height="80" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: BUY BOX & INTERACTIVE SIZE SELECTOR */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a]">
                  {product.num} · EXTRAIT DE PARFUM
                </span>
                <span className="rounded-full bg-[#c89b5a]/10 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#c89b5a]">
                  UNISEX LUXURY
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-[#1e1e1e] font-medium tracking-tight">
                {product.name}
              </h1>

              {/* Star rating summary & Share action */}
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500 text-sm">★★★★★</div>
                  <span className="text-xs font-semibold text-[#1e1e1e]">{reviewStats.averageRating.toFixed(1)}</span>
                  <span className="text-xs text-[#1e1e1e]/40">({reviewStats.count} Verified Reviews)</span>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-full border border-[#c89b5a]/40 bg-[#c89b5a]/10 px-3.5 py-1 text-[11px] font-bold text-[#c89b5a] hover:bg-[#c89b5a] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation"
                  title="Share this perfume"
                  aria-label="Share this perfume"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>{copiedShareLink ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>

            {/* Price & Discounts */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-black/8">
              <span className="font-sans font-bold text-3xl text-[#1e1e1e] tracking-tight tabular-nums inline-flex items-baseline gap-0.5">
                ₹{currentPrice.toLocaleString("en-IN")}
              </span>
              <span className="font-sans text-sm text-[#1e1e1e]/40 line-through tabular-nums inline-flex items-baseline gap-0.5">₹{originalPrice.toLocaleString("en-IN")}</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {discountPercent}% OFF
              </span>
              <span className="text-[10px] text-[#1e1e1e]/40 block font-light">Taxes Included • Free Shipping</span>
            </div>

            {/* ── INTERACTIVE BOTTLE SIZE SELECTOR ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c89b5a] block">
                  SELECT BOTTLE VOLUME
                </span>
                <span className="text-[11px] text-[#1e1e1e]/50 font-medium">
                  Selected: <strong className="text-[#1e1e1e]">{selectedSize} ML</strong>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((sz) => {
                  const isOutOfStock = Boolean(product.outOfStockSizes?.includes(sz));
                  const isSelected = selectedSize === sz;
                  const itemPrice = product.prices[sz] || currentPrice;
                  const perMl = Math.round(itemPrice / sz);
                  const isBestValue = sz === 50;

                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`group relative flex flex-col items-center justify-between rounded-2xl p-3.5 text-center transition-all cursor-pointer ${
                        isSelected
                          ? isOutOfStock
                            ? "bg-stone-800 text-white border-2 border-stone-600 shadow-md"
                            : "bg-[#120e0a] text-white border-2 border-[#c89b5a] shadow-[0_0_20px_rgba(200,155,90,0.3)] scale-[1.02]"
                          : isOutOfStock
                          ? "border border-stone-200 bg-stone-100/70 text-stone-400"
                          : "border border-black/12 bg-white text-[#1e1e1e] hover:border-[#c89b5a] hover:bg-[#c89b5a]/5"
                      }`}
                    >
                      {/* Best Value & Personalisation Badge */}
                      {isBestValue && !isOutOfStock && (
                        <span className="absolute -top-2.5 rounded-full bg-[#c89b5a] px-2 py-0.5 text-[8px] font-extrabold text-black uppercase tracking-wider shadow-sm">
                          ✨ Best Value · Personalisable
                        </span>
                      )}

                      {/* Selected check mark */}
                      {isSelected && (
                        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#c89b5a] text-[9px] text-black font-bold">
                          ✓
                        </span>
                      )}

                      <div className="my-1">
                        <span
                          className={`font-display text-sm font-bold block ${
                            isOutOfStock ? "line-through decoration-red-500/80" : ""
                          }`}
                        >
                          {sz} ML
                        </span>
                        <span className="text-[9px] opacity-70 block mt-0.5">
                          {sz === 10 ? "Travel Purse Spray" : sz === 30 ? "Signature Flacon" : "Extrait De Parfum"}
                        </span>
                      </div>

                      <div className="mt-2 border-t border-white/10 pt-1.5 w-full">
                        <span
                          className={`block text-xs font-bold ${
                            isOutOfStock ? "text-red-500" : isSelected ? "text-[#e2c48e]" : "text-[#c89b5a]"
                          }`}
                        >
                          {isOutOfStock ? "Out of Stock" : `₹${itemPrice.toLocaleString("en-IN")}`}
                        </span>
                        {!isOutOfStock && (
                          <span className="text-[8px] text-black/50 block font-medium group-hover:text-black/70">
                            (₹{perMl}/ml)
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Quantity Stepper & Add to Bag / Buy Now */}
            <div className="space-y-3 pt-2">
              {(() => {
                const isSelectedSizeOut = Boolean(product.outOfStockSizes?.includes(selectedSize as (10 | 30 | 50)));

                if (isSelectedSizeOut) {
                  return (
                    <div className="space-y-3 w-full">
                      <button
                        disabled
                        className="w-full rounded-full border border-stone-300 bg-stone-100 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 cursor-not-allowed text-center shadow-xs"
                      >
                        🚫 Out of Stock in {selectedSize} ML
                      </button>

                      {/* Notify Me Form */}
                      <form onSubmit={handleNotifySubmit} className="rounded-xl border border-[#c89b5a]/30 bg-[#c89b5a]/5 p-3.5 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a] block">
                          📩 Get Notified When {selectedSize}ML Restocks
                        </span>
                        {notifySubmitted ? (
                          <p className="text-xs font-semibold text-emerald-700">
                            ✓ Success! We will email you the moment stock arrives.
                          </p>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Enter your email address"
                              value={notifyEmail}
                              onChange={(e) => setNotifyEmail(e.target.value)}
                              className="flex-1 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-[#c89b5a]"
                            />
                            <button
                              type="submit"
                              className="rounded-xl bg-[#c89b5a] px-4 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#b88a48] transition-all cursor-pointer"
                            >
                              Notify Me
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  );
                }

                return (
                  <div className="flex gap-3">
                    {cartQty > 0 ? (
                      <div className="flex-1 flex items-center justify-between rounded-full border-2 border-[#c89b5a] bg-[#120e0a] px-6 py-3 text-white shadow-md">
                        <span className="text-xs font-bold text-[#c89b5a] uppercase tracking-wider">In Bag:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateCartQuantity?.(product.id, selectedSize, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#c89b5a] hover:bg-[#c89b5a] hover:text-white transition-all cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold text-white px-2">{cartQty}</span>
                          <button
                            onClick={() => onUpdateCartQuantity?.(product.id, selectedSize, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#c89b5a] hover:bg-[#c89b5a] hover:text-white transition-all cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          onAddToCart?.(
                            {
                              id: product.id,
                              name: product.name,
                              num: product.num,
                              img: product.img,
                              isPersonalised: hasPersonalisation,
                              engravingText: hasPersonalisation ? engravingText.trim() : "",
                              engravingDate: hasPersonalisation && includeDate ? engravingDate : "",
                            },
                            selectedSize,
                            currentPrice
                          )
                        }
                        className="flex-1 rounded-full border border-[#c89b5a]/50 bg-[#c89b5a]/15 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#c89b5a] hover:bg-[#c89b5a] hover:text-white transition-all shadow-md cursor-pointer"
                      >
                        Add to Bag — ₹{currentPrice.toLocaleString("en-IN")}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onAddToCart?.(
                          {
                            id: product.id,
                            name: product.name,
                            num: product.num,
                            img: product.img,
                            isPersonalised: hasPersonalisation,
                            engravingText: hasPersonalisation ? engravingText.trim() : "",
                            engravingDate: hasPersonalisation && includeDate ? engravingDate : "",
                          },
                          selectedSize,
                          currentPrice
                        );
                        onOpenCart?.();
                        onClose();
                      }}
                      className="flex-1 rounded-full bg-[#1e1e1e] py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#c89b5a] transition-all shadow-lg cursor-pointer"
                    >
                      Buy It Now
                    </button>
                  </div>
                );
              })()}

              {/* Product Personalisation Section (Available ONLY for 50ML) */}
              <div className="space-y-3">
                {selectedSize !== 50 ? (
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-dashed border-[#c89b5a]/40 bg-[#fdfbf7] p-3.5 shadow-xs transition-all">
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c89b5a]/15 text-[#c89b5a] text-sm font-bold">
                        🔒
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#1e1e1e]/70">
                            Product Personalisation
                          </span>
                          <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[9px] font-bold text-amber-900 uppercase tracking-wider">
                            50ML ONLY
                          </span>
                        </div>
                        <span className="text-[11px] text-[#1e1e1e]/60 block mt-0.5">
                          Bottle personalisation &amp; custom engraving is exclusively available for 50ML flacons.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSize(50);
                        setIsPersonalising(true);
                      }}
                      className="shrink-0 rounded-xl bg-gradient-to-r from-[#c89b5a] to-[#b88a48] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      ✨ Switch to 50ML
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPersonalising(!isPersonalising)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
                      isPersonalising || engravingText || includeDate
                        ? "border-[#c89b5a] bg-[#c89b5a]/10 text-[#1e1e1e] shadow-md"
                        : "border-[#c89b5a]/40 bg-gradient-to-r from-[#c89b5a]/5 via-amber-500/5 to-[#c89b5a]/5 hover:border-[#c89b5a] hover:bg-[#c89b5a]/10 text-[#1e1e1e]"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c89b5a]/20 text-[#c89b5a] text-sm font-bold">
                        ✒️
                      </span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#1e1e1e] block">
                          Product Personalisation
                        </span>
                        <span className="text-[11px] text-[#1e1e1e]/65 block mt-0.5">
                          {engravingText || includeDate
                            ? `Custom Engraving: ${[
                                engravingText ? `"${engravingText}"` : null,
                                includeDate && engravingDate ? `Date: ${engravingDate}` : null,
                              ]
                                .filter(Boolean)
                                .join(" • ")} (+ ₹200)`
                            : "Add custom bottle name & date engraving (+ ₹200)"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#c89b5a] hover:underline shrink-0 ml-2">
                      {isPersonalising ? "Close" : (engravingText || includeDate) ? "Edit (₹200)" : "+ Add (₹200)"}
                    </span>
                  </button>
                )}

                {/* Interactive Personalisation Panel */}
                {isPersonalising && (
                  <div className="rounded-2xl border border-[#c89b5a]/30 bg-[#fdfbf7] p-4 space-y-4 shadow-sm animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-black/8 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c89b5a]">
                        Custom Bottle Engraving
                      </span>
                      <span className="text-[10px] font-semibold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                        + ₹200 FEE
                      </span>
                    </div>

                    {/* 1. Custom Name / Monogram Engraving */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#1e1e1e]/80 block">
                        Custom Name or Monogram (Max 15 Characters)
                      </label>
                      <input
                        type="text"
                        maxLength={15}
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        placeholder="e.g. R.S. ALEXANDER"
                        className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs text-[#1e1e1e] placeholder:text-[#1e1e1e]/30 focus:border-[#c89b5a] focus:outline-none shadow-xs font-serif tracking-widest uppercase"
                      />
                    </div>

                    {/* 2. Date Engraving Toggle & Picker */}
                    <div className="space-y-2.5 pt-2 border-t border-black/8">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-[#1e1e1e]/80 block">
                          Include Date Engraving?
                        </label>
                        <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white p-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIncludeDate(false);
                              setEngravingDate("");
                            }}
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              !includeDate ? "bg-[#1e1e1e] text-white shadow-xs" : "text-[#1e1e1e]/60 hover:text-[#1e1e1e]"
                            }`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => setIncludeDate(true)}
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              includeDate ? "bg-[#c89b5a] text-white shadow-xs" : "text-[#1e1e1e]/60 hover:text-[#1e1e1e]"
                            }`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>

                      {includeDate && (
                        <div className="space-y-1.5 pt-1 animate-in fade-in">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a] block">
                            Select Engraving Date
                          </label>
                          <input
                            type="date"
                            value={engravingDate}
                            onChange={(e) => setEngravingDate(e.target.value)}
                            className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs text-[#1e1e1e] focus:border-[#c89b5a] focus:outline-none shadow-xs font-medium"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPersonalising(false)}
                      className="w-full rounded-xl bg-[#c89b5a] py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#b88a48] transition-all shadow-xs cursor-pointer mt-2"
                    >
                      Save Personalisation Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="rounded-2xl border border-black/10 bg-white p-4 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e1e1e]/50 block">
                DELIVERY &amp; AVAILABILITY CHECKER
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^\d]/g, ""))}
                  className="flex-1 rounded-xl border border-black/15 bg-cream/50 px-4 py-2 text-xs font-medium outline-none focus:border-[#c89b5a]"
                />
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="rounded-xl bg-[#1e1e1e] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c89b5a] transition-all cursor-pointer"
                >
                  {isCheckingPincode ? "Checking..." : "Verify"}
                </button>
              </form>
              {deliveryStatus && <p className="text-xs font-medium text-[#1e1e1e]/80 pt-1">{deliveryStatus}</p>}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-3 border-t border-black/10 text-[9px] font-bold text-[#1e1e1e] uppercase">
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-cream/40 border border-black/5 hover:border-black/20 transition-all">
                <span className="text-base">🧪</span>
                <span className="leading-tight text-[9px]">IFRA Certified Ethyl Alcohol</span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-cream/40 border border-black/5 hover:border-black/20 transition-all">
                <span className="text-base">🛡️</span>
                <span className="leading-tight text-[9px]">FDA Approved</span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-cream/40 border border-black/5 hover:border-black/20 transition-all">
                <span className="text-base">🌿</span>
                <span className="leading-tight text-[9px]">Gentle Formula</span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-cream/40 border border-black/5 hover:border-black/20 transition-all">
                <span className="text-base">🐇</span>
                <span className="leading-tight text-[9px]">Cruelty Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ACCORDION TABS SECTION ── */}
        <div className="border-t border-black/10 px-6 lg:px-10 py-8 bg-white space-y-6">
          <div className="flex border-b border-black/10 overflow-x-auto gap-8 text-xs font-bold uppercase tracking-[0.18em]">
            {[
              { id: "description", label: "Description" },
              { id: "notes", label: "Fragrance Notes" },
              { id: "longevity", label: "Longevity & Sillage" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab.id ? "border-[#c89b5a] text-[#c89b5a]" : "border-transparent text-[#1e1e1e]/50 hover:text-[#1e1e1e]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-4 text-xs text-[#1e1e1e]/80 leading-relaxed font-light">
            {activeTab === "description" && (
              <div className="space-y-3 max-w-3xl">
                <p className="text-sm text-[#1e1e1e] font-normal leading-relaxed">
                  {product.fullDesc || product.desc}
                </p>
                <p>
                  Crafted by master perfumers using rare cold-pressed essential oils and pure extrait de parfum concentration. Each bottle undergoes a 90-day aging process to allow rich woody and floral accords to marry harmoniously.
                </p>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                <div className="rounded-xl border border-black/8 p-4 bg-[#fbf9f5] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a] block">Top Notes</span>
                  <p className="font-medium text-[#1e1e1e]">{product.traces[0] || "Fresh Bergamot"}, Pink Pepper</p>
                </div>
                <div className="rounded-xl border border-black/8 p-4 bg-[#fbf9f5] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a] block">Heart Notes</span>
                  <p className="font-medium text-[#1e1e1e]">{product.traces[1] || "Blooming Jasmine"}, Rose Accord</p>
                </div>
                <div className="rounded-xl border border-black/8 p-4 bg-[#fbf9f5] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a] block">Base Notes</span>
                  <p className="font-medium text-[#1e1e1e]">{product.traces[2] || "Sandalwood"}, Amber &amp; Velvet Musk</p>
                </div>
              </div>
            )}

            {activeTab === "longevity" && (
              <div className="space-y-4 max-w-xl">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1e1e1e] mb-1">
                    <span>Longevity: 12-16 Hours</span>
                    <span className="text-[#c89b5a]">Very High (Extrait)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-black/10">
                    <div className="h-full w-[92%] rounded-full bg-[#c89b5a]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1e1e1e] mb-1">
                    <span>Sillage &amp; Projection</span>
                    <span className="text-[#c89b5a]">Magnetic Trail</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-black/10">
                    <div className="h-full w-[88%] rounded-full bg-[#c89b5a]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-2 max-w-2xl">
                <p>• Complimentary Express Shipping on all orders above ₹999 across India.</p>
                <p>• Orders are dispatched within 24 hours in rigid tamper-evident coffret packaging.</p>
                <p>• 7-Day Hassle-Free Returns &amp; Exchanges policy.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── EDITORIAL MOOD BANNER ── */}
        <div className="relative overflow-hidden bg-[#0d0906] text-white p-8 lg:p-14 border-t border-[#c89b5a]/30">
          <div className="max-w-2xl space-y-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c89b5a]">HAUTE PARFUMERIE STORY</span>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-normal leading-tight">
              The Essence of {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Inspired by moments of intense emotion and effortless allure. Step into the light wearing a scent that leaves an indelible memory long after you have departed.
            </p>
          </div>
        </div>

        {/* ── RECOMMENDED PRODUCTS ── */}
        {recommendedProducts.length > 0 && (
          <div className="px-6 lg:px-10 py-10 border-t border-black/10 bg-[#fbf9f5] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-[#1e1e1e] font-medium">You Might Also Like</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c89b5a]">Curated Suggestions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedProducts.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    if (modalContainerRef.current) {
                      modalContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    onSelectProduct?.(rec);
                  }}
                  className="group rounded-2xl border border-[#e8e2d9] bg-white p-4 transition-all duration-300 hover:shadow-xl hover:border-[#c89b5a]/50 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/5] rounded-xl bg-[#f5efe6] p-4 flex items-center justify-center mb-3 overflow-hidden">
                      <img
                        src={rec.img}
                        alt={`Sentire ${rec.name} luxury perfume flacon with 35%+ oil concentration`}
                        width="250"
                        height="300"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c89b5a]">{rec.num}</span>
                    <h4 className="font-display text-lg font-medium text-[#1e1e1e] group-hover:text-[#c89b5a] transition-colors">
                      {rec.name}
                    </h4>
                    <p className="text-xs text-[#1e1e1e]/60 font-light truncate">{rec.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/8 flex items-center justify-between">
                    <span className="font-sans font-bold text-sm text-[#1e1e1e] tabular-nums inline-flex items-baseline gap-0.5">₹{rec.prices[50] || rec.prices[30] || 799}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c89b5a]">View Product →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VERIFIED CUSTOMER REVIEWS & RATINGS ── */}
        <div className="px-6 lg:px-10 py-12 border-t border-black/10 bg-white space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
            <div>
              <h3 className="font-display text-2xl text-[#1e1e1e] font-medium">Customer Reviews</h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex text-amber-500 text-lg">★★★★★</div>
                <span className="font-display text-xl font-bold text-[#1e1e1e]">{reviewStats.averageRating.toFixed(1)} out of 5</span>
                <span className="text-xs text-[#1e1e1e]/50">Based on {reviewStats.count} verified customer reviews</span>
              </div>
            </div>

            <button
              onClick={() => setIsWritingReview((prev) => !prev)}
              className="rounded-full bg-[#1e1e1e] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#c89b5a] transition-all shadow-md cursor-pointer"
            >
              {isWritingReview ? "Cancel Review" : "Write a Review"}
            </button>
          </div>

          {/* Rating Breakdown & Highlights Box */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 rounded-2xl border border-black/8 bg-[#fbf9f5] p-5 sm:p-6">
            <div className="sm:col-span-5 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-black/8 pb-4 sm:pb-0 sm:pr-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#1e1e1e]">{reviewStats.averageRating.toFixed(1)}</span>
                <span className="text-xs text-[#1e1e1e]/50 font-medium">/ 5.0</span>
              </div>
              <div className="flex text-amber-500 text-sm mt-1">★★★★★</div>
              <span className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1">
                <span>✓</span> 100% Verified Purchases across India
              </span>
              <span className="text-[11px] text-[#1e1e1e]/50 mt-0.5">
                {reviewStats.count} fragrance lovers rated this creation
              </span>
            </div>

            <div className="sm:col-span-7 space-y-1.5 justify-center flex flex-col">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviewStats.ratingBreakdown[star as keyof typeof reviewStats.ratingBreakdown] || 0;
                const pct = reviewStats.count > 0 ? Math.round((count / reviewStats.count) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-[#1e1e1e]/70 font-medium text-[11px] shrink-0">{star} stars</span>
                    <div className="h-2 flex-1 rounded-full bg-black/10 overflow-hidden">
                      <div className="h-full rounded-full bg-[#c89b5a]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-9 text-right text-[11px] text-[#1e1e1e]/50 font-mono shrink-0">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write Review Form */}
          {isWritingReview && (
            <form onSubmit={handleAddReview} className="rounded-2xl border border-[#c89b5a]/40 bg-[#c89b5a]/5 p-6 space-y-4 animate-in fade-in">
              <h4 className="font-display text-lg font-medium text-[#1e1e1e]">Share Your Fragrance Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1e1e1e]/60 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Ananya Roy"
                    className="w-full rounded-xl border border-black/15 bg-white p-3 text-xs font-medium outline-none focus:border-[#c89b5a]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1e1e1e]/60 block mb-1">
                    Rating
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full rounded-xl border border-black/15 bg-white p-3 text-xs font-medium outline-none focus:border-[#c89b5a]"
                  >
                    <option value={5}>★★★★★ 5 Stars - Outstanding</option>
                    <option value={4}>★★★★☆ 4 Stars - Great</option>
                    <option value={3}>★★★☆☆ 3 Stars - Average</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1e1e1e]/60 block mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable Sillage &amp; Elegant Packaging!"
                  className="w-full rounded-xl border border-black/15 bg-white p-3 text-xs font-medium outline-none focus:border-[#c89b5a]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1e1e1e]/60 block mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the scent, longevity, and how it made you feel..."
                  className="w-full rounded-xl border border-black/15 bg-white p-3 text-xs font-medium outline-none focus:border-[#c89b5a]"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#c89b5a] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#b88a48] transition-all shadow-md cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {productReviews.slice(0, visibleReviewsCount).map((rev) => (
              <div key={rev.id} className="rounded-2xl border border-black/8 bg-[#fdfbf7] p-5 sm:p-6 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-[#1e1e1e]">{rev.author}</span>
                    {rev.verified && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#1e1e1e]/40 font-light">{rev.date}</span>
                </div>
                <div className="flex text-amber-500 text-xs">{"★".repeat(rev.rating)}</div>
                <h5 className="font-semibold text-[#1e1e1e] text-sm pt-1">{rev.title}</h5>
                <p className="text-xs text-[#1e1e1e]/70 font-light leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Load More Reviews Button */}
          {visibleReviewsCount < productReviews.length && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVisibleReviewsCount((prev) => Math.min(prev + 8, productReviews.length))}
                className="rounded-full border border-[#c89b5a] bg-[#c89b5a]/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#c89b5a] hover:bg-[#c89b5a] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Load More Reviews (+8) · {productReviews.length - visibleReviewsCount} Remaining
              </button>
              <button
                type="button"
                onClick={() => setVisibleReviewsCount(productReviews.length)}
                className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1e1e1e]/70 hover:border-black/30 hover:text-[#1e1e1e] transition-all cursor-pointer"
              >
                View All ({productReviews.length})
              </button>
            </div>
          )}
        </div>

        {/* ── STICKY MOBILE COMMERCE ACTION BAR ── */}
        <div className="sticky bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-[#c89b5a]/30 bg-[#120e0a] px-4 py-3 text-white shadow-2xl md:hidden">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#c89b5a] block">
              {product.name} • {selectedSize}ML
            </span>
            <span className="font-display text-lg font-bold text-white">
              ₹{currentPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={() => {
              onAddToCart?.(
                { id: product.id, name: product.name, num: product.num, img: product.img },
                selectedSize,
                currentPrice
              );
              onOpenCart?.();
              onClose();
            }}
            className="rounded-full bg-[#c89b5a] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-black hover:bg-[#a97f43] transition-all shadow-md active:scale-95 cursor-pointer min-h-[44px]"
          >
            Add to Bag →
          </button>
        </div>
      </div>
    </div>
  );
}
