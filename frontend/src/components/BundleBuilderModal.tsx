import { useState, useEffect } from "react";

export interface PerfumeOption {
  id: string;
  name: string;
  sub: string;
  image: string;
  price: number;
  notes: string[];
  tag: string;
  category: "floral" | "woody" | "fresh" | "oriental" | "bestseller";
}

const PERFUMES: PerfumeOption[] = [
  {
    id: "calantha",
    name: "CALANTHA",
    sub: "Sensual Floral & Amber",
    image: "/images/calantha.png",
    price: 4699,
    notes: ["Jasmine", "Amber", "Velvet Musk"],
    tag: "Bestseller",
    category: "floral",
  },
  {
    id: "purple-oud",
    name: "PURPLE OUD",
    sub: "Smoky Oud & Saffron",
    image: "/images/purple-oud.png",
    price: 4999,
    notes: ["Smoky Oud", "Saffron", "Amethyst Rose"],
    tag: "New",
    category: "woody",
  },
  {
    id: "rich",
    name: "RICH",
    sub: "Opulent Golden Amber",
    image: "/images/rich.png",
    price: 4999,
    notes: ["Amber", "Silk Accord", "Warm Spice"],
    tag: "Luxury",
    category: "oriental",
  },
  {
    id: "herrlich",
    name: "HERRLICH",
    sub: "Noble Leather & Iris",
    image: "/images/herrlich.png",
    price: 5299,
    notes: ["Tuscan Leather", "Iris", "Smoky Cedar"],
    tag: "Signature",
    category: "woody",
  },
  {
    id: "seductive",
    name: "SEDUCTIVE",
    sub: "Intense Vanilla & Plum",
    image: "/images/seductive.png",
    price: 4899,
    notes: ["Madagascar Vanilla", "Dark Plum", "Patchouli"],
    tag: "Romantic",
    category: "oriental",
  },
  {
    id: "white-oud",
    name: "WHITE OUD",
    sub: "Luminous Oud & Jasmine",
    image: "/images/product-white-oud.jpg",
    price: 4999,
    notes: ["White Oud", "Jasmine", "Soft Musk"],
    tag: "Iconic",
    category: "woody",
  },
  {
    id: "midnight",
    name: "MIDNIGHT",
    sub: "Deep Amber & Bergamot",
    image: "/images/hero-bg.png",
    price: 4599,
    notes: ["Bergamot", "Dark Woods", "Amber"],
    tag: "Night",
    category: "fresh",
  },
  {
    id: "mirai",
    name: "MIRAI",
    sub: "Fresh Citrus & Neroli",
    image: "/images/mirai.png",
    price: 4799,
    notes: ["Calabrian Bergamot", "Neroli", "Clean Musk"],
    tag: "Fresh",
    category: "fresh",
  },
  {
    id: "deep-crush",
    name: "DEEP CRUSH",
    sub: "Intense Tonka & Spiced Rose",
    image: "/images/deep-crush.png",
    price: 4899,
    notes: ["Tonka Bean", "Spiced Rose", "Sandalwood"],
    tag: "Velvet",
    category: "floral",
  },
];

export interface BundleBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
}

export default function BundleBuilderModal({
  isOpen,
  onClose,
  onAddToCart,
}: BundleBuilderModalProps) {
  const [selected, setSelected] = useState<(PerfumeOption | null)[]>([
    PERFUMES[0], // Calantha
    PERFUMES[1], // Purple Oud
    PERFUMES[2], // Rich
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keyboard shortcut: close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPerfume = (perfume: PerfumeOption) => {
    if (activeSlot !== null) {
      const next = [...selected];
      next[activeSlot] = perfume;
      setSelected(next);
      setActiveSlot(null);
      triggerToast(`Added ${perfume.name} to Slot ${activeSlot + 1}`);
    } else {
      const emptyIdx = selected.findIndex((s) => s === null);
      const targetIdx = emptyIdx !== -1 ? emptyIdx : 0;
      const next = [...selected];
      next[targetIdx] = perfume;
      setSelected(next);
      triggerToast(`Added ${perfume.name} to Slot ${targetIdx + 1}`);
    }
  };

  const handleRemoveSlot = (slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const perfumeName = selected[slotIdx]?.name;
    const next = [...selected];
    next[slotIdx] = null;
    setSelected(next);
    if (perfumeName) {
      triggerToast(`Removed ${perfumeName} from Slot ${slotIdx + 1}`);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filledCount = selected.filter(Boolean).length;
  const isComplete = filledCount === 3;
  const progressPercent = Math.round((filledCount / 3) * 100);

  const rawTotal = selected.reduce((sum, item) => sum + (item?.price || 0), 0);
  const discount = 300; // ₹300 bundle discount
  const finalPrice = Math.max(0, rawTotal - (isComplete ? discount : 0));

  const handleAddToCart = () => {
    if (!isComplete) return;
    setAddedToCart(true);

    // Call external cart callback for each selected item if passed
    if (onAddToCart) {
      selected.forEach((item) => {
        if (item) {
          onAddToCart(
            { id: item.id, name: item.name, num: item.tag, img: item.image },
            50,
            Math.round(item.price - discount / 3)
          );
        }
      });
    }

    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1800);
  };

  const filteredPerfumes =
    activeCategory === "all"
      ? PERFUMES
      : activeCategory === "bestseller"
      ? PERFUMES.filter((p) => p.tag === "Bestseller" || p.tag === "Luxury")
      : PERFUMES.filter((p) => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center overflow-y-auto bg-black/85 p-0 sm:p-6 backdrop-blur-xl transition-all duration-300 animate-in fade-in">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Luxury Glassmorphic Modal Window / Mobile Bottom Sheet */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[94vh] overflow-hidden rounded-t-3xl md:rounded-3xl border-t md:border border-[#c89b5a]/40 bg-[#0d0906] text-cream shadow-[0_25px_80px_rgba(200,155,90,0.25)] transition-all duration-300 glass-bottom-sheet"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Mobile Drag Handle Bar */}
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mt-3 -mb-1 md:hidden shrink-0" />
        {/* ── HEADER HERO BANNER & REAL-TIME ₹300 SAVINGS TRACKER ── */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden border-b border-[#c89b5a]/30 px-6 py-7 text-center sm:py-9">
          {/* Background image preview blend with gold aura */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity transition-opacity duration-700 hover:opacity-35"
            style={{ backgroundImage: `url('/images/build-bundle.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0906] via-[#0d0906]/85 to-[#0d0906]/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-black/60 text-cream/70 backdrop-blur-md transition-all hover:border-[#c89b5a] hover:bg-[#c89b5a] hover:text-black cursor-pointer shadow-lg active:scale-95 touch-manipulation"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Filigree Gold Header Accent */}
          <div className="relative z-10 mb-2 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#c89b5a]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c89b5a]">
              SENTIRE HAUTE PARFUMERIE
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#c89b5a]" />
          </div>

          <h2 className="font-display relative z-10 text-2xl uppercase tracking-widest text-white sm:text-4xl">
            BUILD YOUR <span className="text-[#c89b5a] drop-shadow-[0_0_15px_rgba(200,155,90,0.5)]">3-BOTTLE BUNDLE</span>
          </h2>

          {/* Real-time ₹300 Savings & Slot Progress Banner */}
          <div className="relative z-10 mt-4 flex flex-col items-center gap-3 w-full max-w-md">
            {/* Savings Badge */}
            <div
              className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-xs transition-all duration-500 backdrop-blur-md ${
                isComplete
                  ? "border-[#c89b5a] bg-gradient-to-r from-[#c89b5a]/30 via-[#e2c48e]/20 to-[#c89b5a]/30 text-white shadow-[0_0_25px_rgba(200,155,90,0.4)]"
                  : "border-[#c89b5a]/40 bg-[#c89b5a]/10 text-[#e2c48e]"
              }`}
            >
              <span className="flex h-5 items-center rounded bg-[#c89b5a] px-2 text-[10px] font-black uppercase text-black">
                ₹300 OFF
              </span>
              <span className="font-semibold tracking-wide">
                {isComplete ? (
                  <span className="text-emerald-300 font-bold">
                    🎉 ₹300 Discount &amp; Free Shipping Unlocked!
                  </span>
                ) : (
                  <span>
                    Select <strong className="text-white">{3 - filledCount}</strong> more fragrance(s) to unlock ₹300 savings
                  </span>
                )}
              </span>
            </div>

            {/* Liquid Gold Slot Progress Bar */}
            <div className="w-full space-y-1.5 px-4">
              <div className="flex items-center justify-between text-[11px] font-semibold text-cream/70">
                <span className="uppercase tracking-wider">Bundle Progress</span>
                <span className="text-[#c89b5a]">{filledCount} of 3 Slots Filled ({progressPercent}%)</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c89b5a] via-[#e2c48e] to-[#c89b5a] transition-all duration-500 shadow-[0_0_12px_rgba(200,155,90,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── TOAST NOTIFICATION POPUP INSIDE MODAL ── */}
        {toastMessage && (
          <div className="absolute top-24 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[#c89b5a]/60 bg-black/90 px-5 py-2 text-xs font-semibold text-[#e2c48e] shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-lg animate-in fade-in slide-in-from-top-2">
            ✨ {toastMessage}
          </div>
        )}

        {/* ── MODAL BODY ── */}
        <div className="max-h-[68vh] overflow-y-auto p-4 sm:p-7 space-y-7 hide-scrollbar">
          {/* 3-BOTTLE BUNDLE VISUALIZER SLOTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c89b5a]">
                Interactive 3-Bottle Visualizer
              </p>
              <span className="text-[11px] text-cream/50">
                {activeSlot !== null ? `Editing Slot ${activeSlot + 1}` : "Click any slot to swap perfume"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[0, 1, 2].map((slotIdx) => {
                const item = selected[slotIdx];
                const isActive = activeSlot === slotIdx;

                return (
                  <div
                    key={slotIdx}
                    onClick={() => setActiveSlot(slotIdx)}
                    className={`group relative flex cursor-pointer flex-col items-center rounded-2xl border p-2.5 sm:p-4 transition-all duration-300 touch-manipulation ${
                      isActive
                        ? "border-[#c89b5a] bg-[#c89b5a]/20 shadow-[0_0_30px_rgba(200,155,90,0.45)] ring-2 ring-[#c89b5a]/60 scale-[1.02]"
                        : item
                        ? "border-[#c89b5a]/40 bg-white/[0.04] hover:border-[#c89b5a] hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(200,155,90,0.2)]"
                        : "border-dashed border-white/20 bg-transparent hover:border-[#c89b5a]/60 hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Slot badge */}
                    <div className="flex w-full items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                      <span className="rounded bg-black/70 px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-widest text-[#c89b5a]">
                        SLOT {slotIdx + 1}
                      </span>
                      {item ? (
                        <span className="text-[8px] sm:text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5 sm:gap-1">
                          ✓ Filled
                        </span>
                      ) : (
                        <span className="text-[8px] sm:text-[9px] text-cream/40 uppercase tracking-wider">Empty</span>
                      )}
                    </div>

                    {item ? (
                      <div className="flex w-full flex-col items-center text-center space-y-1.5">
                        {/* Remove button */}
                        <button
                          onClick={(e) => handleRemoveSlot(slotIdx, e)}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-cream/60 transition-all hover:bg-red-500/80 hover:text-white cursor-pointer active:scale-90"
                          title="Remove perfume"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>

                        {/* Gold Aura Glowing Bottle Preview */}
                        <div className="relative my-1 flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#1a140f] to-[#0d0906] p-1.5 sm:p-2 border border-[#c89b5a]/20 shadow-[0_0_15px_rgba(200,155,90,0.15)] group-hover:border-[#c89b5a]/50">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,155,90,0.2)_0,transparent_70%)] opacity-60" />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div>
                          <span className="rounded bg-[#c89b5a]/15 px-1.5 py-0.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-[#e2c48e]">
                            {item.tag}
                          </span>
                          <h4 className="font-display mt-0.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white truncate max-w-[90px] sm:max-w-none">
                            {item.name}
                          </h4>
                          <p className="text-[9px] sm:text-[11px] text-[#c89b5a] truncate max-w-[90px] sm:max-w-none">{item.sub}</p>
                        </div>

                        {/* Key Notes Chips */}
                        <div className="hidden sm:flex flex-wrap justify-center gap-1">
                          {item.notes.slice(0, 2).map((n, i) => (
                            <span key={i} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-cream/70">
                              {n}
                            </span>
                          ))}
                        </div>

                        <p className="text-[10px] sm:text-xs font-bold text-white pt-0.5">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ) : (
                      <div className="flex min-h-[120px] sm:min-h-[160px] flex-col items-center justify-center text-center space-y-2">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-dashed border-[#c89b5a]/60 text-[#c89b5a] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#c89b5a] group-hover:bg-[#c89b5a]/10">
                          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-cream/70">Tap to Select</span>
                        <span className="hidden sm:block text-[10px] text-cream/40">Pick any scent from palette</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── FRAGRANCE PALETTE & CATEGORY FILTER ── */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-cream/90">
                  {activeSlot !== null
                    ? `Selecting Fragrance for Slot ${activeSlot + 1}`
                    : "Fragrance Palette"}
                </h3>
                <p className="text-[11px] text-cream/50 mt-0.5">
                  Select 3 scents to complete your bespoke luxury bundle
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All" },
                  { id: "bestseller", label: "Bestsellers" },
                  { id: "floral", label: "Floral" },
                  { id: "woody", label: "Woody & Oud" },
                  { id: "oriental", label: "Amber & Spice" },
                  { id: "fresh", label: "Fresh Citrus" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer touch-manipulation ${
                      activeCategory === cat.id
                        ? "bg-[#c89b5a] text-black shadow-[0_0_12px_rgba(200,155,90,0.5)]"
                        : "bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance Options Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
              {filteredPerfumes.map((perfume) => {
                const selectedInSlots = selected
                  .map((s, idx) => (s?.id === perfume.id ? idx + 1 : null))
                  .filter((idx): idx is number => idx !== null);

                const isSelected = selectedInSlots.length > 0;

                return (
                  <button
                    key={perfume.id}
                    onClick={() => handleSelectPerfume(perfume)}
                    className={`group relative flex flex-col justify-between items-center rounded-xl border p-2.5 sm:p-3.5 text-center transition-all duration-300 cursor-pointer touch-manipulation ${
                      isSelected
                        ? "border-[#c89b5a] bg-[#c89b5a]/15 shadow-[0_0_15px_rgba(200,155,90,0.25)]"
                        : "border-white/10 bg-white/[0.04] hover:border-[#c89b5a]/60 hover:bg-white/[0.08]"
                    }`}
                  >
                    {/* Tag Badge Overlay */}
                    <span className="absolute top-2 left-2 rounded-full bg-[#c89b5a]/20 border border-[#c89b5a]/40 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#e2c48e] backdrop-blur-xs">
                      {perfume.tag}
                    </span>

                    {/* Selected Badge */}
                    {isSelected && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#c89b5a] px-2 py-0.5 text-[8px] font-extrabold text-black shadow-md">
                        Slot {selectedInSlots.join(", ")}
                      </span>
                    )}

                    {/* 1:1 Square Media Frame */}
                    <div className="mt-5 mb-2 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#1a140f] to-[#0d0906] p-2 flex items-center justify-center border border-white/5">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="w-full text-center space-y-0.5">
                      <span className="font-display text-[11px] sm:text-xs uppercase tracking-wider text-white font-bold block truncate">
                        {perfume.name} 50ML
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] text-[#c89b5a] font-normal block truncate">
                        {perfume.sub.replace("&", "|")}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-white block mt-1">
                        ₹{perfume.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Add to Bundle CTA Button */}
                    <span className="mt-2.5 w-full rounded-md border border-[#c89b5a]/40 bg-white/5 py-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-[#e2c48e] transition-colors group-hover:bg-[#c89b5a] group-hover:text-black">
                      {isSelected ? "Add Again +" : "+ Select"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MODAL FOOTER & CHECKOUT BAR ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#c89b5a]/30 bg-black/80 px-6 py-4 backdrop-blur-md sm:flex-row sm:px-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center gap-2.5">
                {rawTotal > 0 && (
                  <span className="text-xs text-cream/50 line-through">
                    ₹{rawTotal.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xl font-bold text-white">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                {isComplete && (
                  <span className="rounded bg-[#c89b5a] px-2 py-0.5 text-[10px] font-extrabold text-black uppercase shadow-[0_0_10px_rgba(200,155,90,0.5)]">
                    SAVED ₹300
                  </span>
                )}
              </div>
              <p className="text-[11px] text-cream/60 mt-0.5">
                {isComplete
                  ? "✓ Bundle Complete • Complimentary Express Delivery"
                  : `Select ${3 - filledCount} more fragrance(s) to apply discount`}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!isComplete || addedToCart}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              addedToCart
                ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : isComplete
                ? "bg-gradient-to-r from-[#c89b5a] via-[#e2c48e] to-[#c89b5a] text-black shadow-[0_0_25px_rgba(200,155,90,0.5)] hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(200,155,90,0.7)]"
                : "cursor-not-allowed bg-white/10 text-white/40"
            }`}
          >
            {addedToCart ? (
              <>
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Bundle Added to Shopping Bag! 🎉</span>
              </>
            ) : (
              <>
                <span>Add 3-Bottle Bundle • ₹{finalPrice.toLocaleString("en-IN")}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

