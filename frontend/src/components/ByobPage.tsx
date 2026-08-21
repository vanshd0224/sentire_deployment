import React, { useState, useEffect, useMemo } from "react";

// ── 50ML EXCLUSIVE SIGNATURE COLLECTION ─────────────────────────────────────
export interface ByobPerfume {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  family: string;
  scentCategory: "all" | "woody" | "floral" | "fresh" | "oriental";
  price50ml: number;
  mrp50ml: number;
  badge?: string;
  image: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

export const BYOB_50ML_PERFUMES: ByobPerfume[] = [
  {
    id: "purple-oud",
    num: "No. 08",
    name: "PURPLE OUD",
    subtitle: "Smoky Cambodian Oud, Saffron & Amethyst Rose",
    family: "Woody / Oud",
    scentCategory: "woody",
    price50ml: 1489,
    mrp50ml: 1859,
    badge: "Crown Jewel",
    image: "/assets/perfumes/purple-oud-50ml-2.png?v=3",
    topNotes: ["Saffron", "Calabrian Bergamot"],
    heartNotes: ["Damask Rose", "Amethyst Petals"],
    baseNotes: ["Cambodian Oud", "Amberwood"],
  },
  {
    id: "calantha",
    num: "No. 01",
    name: "CALANTHA",
    subtitle: "Blooming Jasmine, Sandalwood & Amber",
    family: "Floral / Amber",
    scentCategory: "floral",
    price50ml: 1085,
    mrp50ml: 1539,
    badge: "Bestseller",
    image: "/assets/perfumes/calantha-50ml-3.png?v=3",
    topNotes: ["Pink Pepper", "Pear Blossom"],
    heartNotes: ["Star Jasmine", "Damask Rose"],
    baseNotes: ["Mysore Sandalwood", "Golden Amber"],
  },
  {
    id: "seductive",
    num: "No. 10",
    name: "SEDUCTIVE",
    subtitle: "Citric Limon, French Lavender & Velvet Amber",
    family: "Fresh / Amber",
    scentCategory: "fresh",
    price50ml: 1149,
    mrp50ml: 2099,
    badge: "Most Loved",
    image: "/assets/perfumes/seductive-50ml-2.png?v=3",
    topNotes: ["Citric Limon", "Sicilian Bergamot"],
    heartNotes: ["French Lavender", "Spicy Florals"],
    baseNotes: ["Velvet Amber", "Patchouli"],
  },
  {
    id: "deep-crush",
    num: "No. 02",
    name: "DEEP CRUSH",
    subtitle: "Lavender, Blonde Tobacco & Sandalwood",
    family: "Floral / Woody",
    scentCategory: "floral",
    price50ml: 1085,
    mrp50ml: 1539,
    badge: "Bestseller",
    image: "/assets/perfumes/deep-crush-50ml-3.png?v=3",
    topNotes: ["Aromatic Lavender", "Cardamom"],
    heartNotes: ["Turkish Rose", "Blonde Tobacco"],
    baseNotes: ["Sandalwood", "Amber Resin"],
  },
  {
    id: "0809",
    num: "No. 06",
    name: "0809",
    subtitle: "Sichuan Pepper, French Lavender & Ambroxan",
    family: "Oriental / Spice",
    scentCategory: "oriental",
    price50ml: 2889,
    mrp50ml: 4069,
    badge: "Prestige Icon",
    image: "/assets/perfumes/0809-50ml-1.png?v=10",
    topNotes: ["Sichuan Pepper", "Calabrian Bergamot"],
    heartNotes: ["French Lavender", "Star Anise"],
    baseNotes: ["Warm Ambroxan", "Cedarwood"],
  },
  {
    id: "white-oud",
    num: "No. 11",
    name: "WHITE OUD",
    subtitle: "Luminous Oud, Pink Pepper & Crystal Amber",
    family: "Woody / Floral",
    scentCategory: "woody",
    price50ml: 2889,
    mrp50ml: 4069,
    badge: "Rare Extrait",
    image: "/assets/perfumes/white-oud-50ml-1.png?v=2",
    topNotes: ["Pink Pepper", "Bergamot"],
    heartNotes: ["Star Jasmine", "White Iris"],
    baseNotes: ["White Oud Essence", "Crystal Ambergris"],
  },
  {
    id: "herrlich",
    num: "No. 03",
    name: "HERRLICH",
    subtitle: "Fresh Peach, Velvet Rose & Dark Chocolate",
    family: "Woody / Gourmand",
    scentCategory: "woody",
    price50ml: 2196,
    mrp50ml: 3069,
    badge: "New Arrival",
    image: "/assets/perfumes/herrlich-50ml-3.png?v=3",
    topNotes: ["Peach", "Bergamot"],
    heartNotes: ["Jasmine", "Velvet Rose"],
    baseNotes: ["Dark Chocolate", "Cedarwood"],
  },
  {
    id: "midnight",
    num: "No. 04",
    name: "MIDNIGHT",
    subtitle: "Dark Blackcurrant, Tuberose & Vanilla Musk",
    family: "Woody / Floral",
    scentCategory: "woody",
    price50ml: 1949,
    mrp50ml: 2709,
    badge: "Night Edition",
    image: "/assets/perfumes/midnight-50ml-1.png?v=2",
    topNotes: ["Blackcurrant", "Bergamot"],
    heartNotes: ["Night Tuberose", "White Jasmine"],
    baseNotes: ["Madagascar Vanilla", "Sensual Musk"],
  },
  {
    id: "mirai",
    num: "No. 05",
    name: "MIRAI",
    subtitle: "Amalfi Lemon, French Lavender & Patchouli",
    family: "Fresh / Citrus",
    scentCategory: "fresh",
    price50ml: 1679,
    mrp50ml: 2349,
    badge: "Bestseller",
    image: "/assets/perfumes/mirai-50ml-3.png?v=3",
    topNotes: ["Amalfi Lemon", "Bergamot"],
    heartNotes: ["French Lavender", "Black Pepper"],
    baseNotes: ["Indonesian Patchouli", "Clean Musk"],
  },
  {
    id: "rich",
    num: "No. 09",
    name: "RICH",
    subtitle: "Opulent Bergamot, Spiced Rose & Amber Resin",
    family: "Oriental / Amber",
    scentCategory: "oriental",
    price50ml: 1593,
    mrp50ml: 2259,
    badge: "Opulent Amber",
    image: "/assets/perfumes/rich-50ml-1.png?v=2",
    topNotes: ["Calabrian Bergamot", "Cardamom"],
    heartNotes: ["Spiced Damask Rose", "Silk Accord"],
    baseNotes: ["Amber Resin", "Mysore Sandalwood"],
  },
  {
    id: "personna",
    num: "No. 07",
    name: "PERSONNA",
    subtitle: "Sicilian Mandarin, Black Pepper & Spiced Rose",
    family: "Oriental / Spice",
    scentCategory: "oriental",
    price50ml: 1593,
    mrp50ml: 2259,
    badge: "Artisanal",
    image: "/assets/perfumes/personna-50ml-1.png?v=2",
    topNotes: ["Sicilian Mandarin", "Cardamom"],
    heartNotes: ["Spiced Rose", "Black Pepper"],
    baseNotes: ["Patchouli", "Soft Leather"],
  }
];

const BYOB_FAQS = [
  {
    q: "Why are all fragrances in the BYOB set 50ML Extraits?",
    a: "Every perfume in our BYOB collection is a full-size 50 ML Grand Flacon crafted with 35%+ pure perfume oil concentration for intense 12-14+ hour longevity."
  },
  {
    q: "How are bundle discounts applied?",
    a: "Discounts are applied automatically at checkout: Save ₹150 on The Duo (2 bottles), Save ₹250 on The Trio (3 bottles), and Save ₹400 on The Quatuor (4 bottles). Free express shipping is included on all bundles."
  },
  {
    q: "Can I choose multiple bottles of the same fragrance?",
    a: "Yes! You can curate any combination you like, including multiple bottles of your signature scent."
  },
  {
    q: "What is the 30-Day Discovery Guarantee?",
    a: "Your box includes complimentary matching sample trial vials. Try the sample vial first; if a scent isn't right for you, exchange the unopened 50ML bottle within 30 days."
  }
];

interface ByobPageProps {
  onBackToHome: () => void;
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
}

export default function ByobPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
  onOpenAccount: _onOpenAccount,
}: ByobPageProps) {
  // ── CORE BUNDLE STATE ──
  const [bundleSize, setBundleSize] = useState<number>(3); // 2, 3, or 4
  const [selected, setSelected] = useState<(ByobPerfume | null)[]>([
    BYOB_50ML_PERFUMES[0], // Purple Oud
    BYOB_50ML_PERFUMES[1], // Calantha
    BYOB_50ML_PERFUMES[2], // Seductive
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ── UI STATE ──
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickViewPerfume, setQuickViewPerfume] = useState<ByobPerfume | null>(null);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Change tier size
  const handleSizeChange = (newSize: number) => {
    setBundleSize(newSize);
    if (newSize > selected.length) {
      const diff = newSize - selected.length;
      setSelected([...selected, ...Array(diff).fill(null)]);
    } else {
      setSelected(selected.slice(0, newSize));
    }
    triggerToast(`Coffret updated to ${newSize} x 50ML`);
  };

  // Pricing calculations
  const filledCount = selected.filter(Boolean).length;
  const isComplete = filledCount === bundleSize;
  const progressPercent = Math.round((filledCount / bundleSize) * 100);

  const rawSubtotal = selected.reduce((sum, item) => sum + (item?.price50ml || 0), 0);
  const rawMrpTotal = selected.reduce((sum, item) => sum + (item?.mrp50ml || (item ? item.price50ml + 500 : 0)), 0);
  const discount = bundleSize === 2 ? 150 : bundleSize === 3 ? 250 : 400;
  const finalPrice = Math.max(0, rawSubtotal - (isComplete ? discount : 0));

  // Add / assign perfume
  const handleSelectPerfume = (perfume: ByobPerfume) => {
    if (activeSlot !== null && activeSlot < bundleSize) {
      const next = [...selected];
      next[activeSlot] = perfume;
      setSelected(next);
      setActiveSlot(null);
      triggerToast(`Added ${perfume.name} to Slot ${activeSlot + 1}`);
    } else {
      const emptyIdx = selected.findIndex((s) => s === null);
      if (emptyIdx !== -1) {
        const next = [...selected];
        next[emptyIdx] = perfume;
        setSelected(next);
        triggerToast(`Added ${perfume.name} to Slot ${emptyIdx + 1}`);
      } else {
        const next = [...selected];
        next[0] = perfume;
        setSelected(next);
        triggerToast(`Replaced Slot 1 with ${perfume.name}`);
      }
    }
  };

  const handleRemoveSlot = (slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const name = selected[slotIdx]?.name;
    const next = [...selected];
    next[slotIdx] = null;
    setSelected(next);
    if (name) triggerToast(`Removed ${name} from Slot ${slotIdx + 1}`);
  };

  // Add completed bundle to bag
  const handleAddBundleToBag = () => {
    if (!isComplete) return;
    setIsAdding(true);

    if (onAddToCart) {
      const perBottleDiscount = Math.round(discount / bundleSize);
      selected.forEach((item) => {
        if (item) {
          onAddToCart(
            {
              id: `${item.id}-50ml`,
              name: `${item.name} 50ML Extrait`,
              num: item.num,
              img: item.image,
            },
            50,
            Math.max(0, item.price50ml - perBottleDiscount)
          );
        }
      });
    }

    setTimeout(() => {
      setIsAdding(false);
      if (onOpenCart) onOpenCart();
    }, 400);
  };

  const filteredPerfumes = useMemo(() => {
    return BYOB_50ML_PERFUMES.filter((p) => {
      const matchesCat = activeCategory === "all" ? true : p.scentCategory === activeCategory;
      const matchesSearch =
        searchQuery.trim() === ""
          ? true
          : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.topNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.heartNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.baseNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-[#fcfaf7] text-[#1c1917] font-sans selection:bg-[#c89b5a] selection:text-white pb-28 lg:pb-16">
      
      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#c89b5a]/40 bg-[#120e0a]/95 px-5 py-2 text-xs font-medium tracking-wide text-[#e2c48e] shadow-xl backdrop-blur-md animate-in fade-in flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c89b5a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── TOP BREADCRUMB ── */}
      <div className="border-b border-black/[0.06] bg-white/80 backdrop-blur-sm px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-xs tracking-wider text-[#78716c]">
            <button onClick={onBackToHome} className="hover:text-[#c89b5a] transition-colors cursor-pointer">
              ← BOUTIQUE
            </button>
            <span className="text-black/20">/</span>
            <span className="font-semibold text-[#0b0907] uppercase tracking-widest">
              BUILD YOUR OWN BOX (50ML EXTRAITS)
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-bold text-[#a97f43] uppercase tracking-widest">
            35%+ EXTRAIT DE PARFUM
          </span>
        </div>
      </div>

      {/* ── HERO HEADER ── */}
      <section className="border-b border-black/[0.06] bg-gradient-to-b from-white via-[#fcfaf7] to-[#f7f2ea] px-6 py-10 sm:py-14 lg:px-12 text-center">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/30 bg-white px-4 py-1 shadow-xs">
            <span className="text-xs">✦</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a97f43]">
              HAUTE PARFUMERIE BESPOKE SET
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0b0907]">
            COMPOSE YOUR <span className="italic font-serif text-[#c89b5a] font-normal">50ML WARDROBE.</span>
          </h1>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-[#57534e] leading-relaxed">
            Curate a luxury presentation box of our signature <strong>50 ML Grand Flacons</strong>. Handcrafted with <strong>35%+ pure French perfume oils</strong> for 12+ hour longevity. Includes complimentary gift box and automatic bundle savings.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] font-semibold text-[#78716c]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#c89b5a]">✓</span> 35%+ Extrait Concentration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#c89b5a]">✓</span> 12+ Hour Longevity
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#c89b5a]">✓</span> Free Express Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#c89b5a]">✓</span> Save up to ₹400
            </span>
          </div>
        </div>
      </section>

      {/* ── STEP 1: SELECT COFFRET SIZE ── */}
      <section className="border-b border-black/[0.06] bg-white px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-5">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a97f43]">
              STEP 01 — SELECT BOX SIZE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0b0907]">
              CHOOSE NUMBER OF BOTTLES
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { size: 2, title: "THE DUO", sub: "2 × 50ML Bottles", save: "SAVE ₹150", desc: "Day & evening essentials" },
              { size: 3, title: "THE TRIO", sub: "3 × 50ML Bottles", save: "SAVE ₹250", desc: "Complete 3-scent wardrobe", badge: "MOST POPULAR" },
              { size: 4, title: "THE QUATUOR", sub: "4 × 50ML Bottles", save: "SAVE ₹400", desc: "Master collector set" },
            ].map((tier) => (
              <div
                key={tier.size}
                onClick={() => handleSizeChange(tier.size)}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 cursor-pointer transition-all ${
                  bundleSize === tier.size
                    ? "border-[#c89b5a] bg-[#fcfaf7] ring-2 ring-[#c89b5a] shadow-md"
                    : "border-black/10 bg-white hover:border-[#c89b5a]/60 hover:shadow-xs"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#c89b5a] px-3 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-xs">
                    {tier.badge}
                  </span>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold uppercase text-[#0b0907]">{tier.title}</h3>
                    <span className="rounded bg-[#0b0907] px-2 py-0.5 text-[9px] font-bold text-[#e2c48e]">
                      {tier.save}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#a97f43]">{tier.sub}</p>
                  <p className="text-[11px] text-[#78716c] pt-1">{tier.desc}</p>
                </div>

                <div className="mt-4 border-t border-black/[0.06] pt-3 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#78716c]">50ML Extraits</span>
                  <span className={bundleSize === tier.size ? "text-[#a97f43]" : "text-[#78716c]"}>
                    {bundleSize === tier.size ? "● SELECTED" : "SELECT →"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP 2: MAIN SCENT SELECTION & STICKY SCROLLABLE BOX TRAY ── */}
      <section className="px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a97f43]">
                STEP 02 — CHOOSE YOUR FRAGRANCES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#0b0907]">
                SELECT {bundleSize} SIGNATURE 50ML SCENTS
              </h2>
            </div>

            {/* Filter pills & search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-white p-1 border border-black/10 shadow-xs">
                {[
                  { id: "all", label: "ALL 11" },
                  { id: "woody", label: "WOODY / OUD" },
                  { id: "floral", label: "FLORAL" },
                  { id: "fresh", label: "FRESH" },
                  { id: "oriental", label: "AMBER / SPICE" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-[#0b0907] text-white"
                        : "text-[#78716c] hover:text-[#0b0907]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search scent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full border border-black/15 bg-white px-3.5 py-1 text-xs text-[#0b0907] placeholder-[#a8a29e] focus:border-[#c89b5a] focus:outline-none w-36"
              />
            </div>
          </div>

          {/* Two-Column Grid: Left Catalog (7 cols) + Right Sticky Scrollable Box Tray (5 cols) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* ── LEFT: 11 PERFUMES GRID ── */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {filteredPerfumes.map((perfume) => {
                  const assignedSlots = selected
                    .map((s, idx) => (s?.id === perfume.id ? idx + 1 : null))
                    .filter((idx): idx is number => idx !== null);
                  const isAssigned = assignedSlots.length > 0;

                  return (
                    <div
                      key={perfume.id}
                      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 ${
                        isAssigned
                          ? "border-[#c89b5a] ring-1 ring-[#c89b5a]/50 shadow-sm"
                          : "border-black/10 hover:border-[#c89b5a]/50 hover:shadow-md"
                      }`}
                    >
                      {/* Top badge */}
                      <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a97f43]">
                          {perfume.num} • {perfume.family}
                        </span>
                        {isAssigned && (
                          <span className="rounded-full bg-[#0b0907] px-2.5 py-0.5 text-[9px] font-bold text-[#e2c48e] uppercase">
                            SLOT 0{assignedSlots.join(", 0")}
                          </span>
                        )}
                      </div>

                      {/* Bottle image */}
                      <div
                        onClick={() => setQuickViewPerfume(perfume)}
                        className="my-3 flex aspect-square w-full items-center justify-center rounded-xl bg-[#faf7f2] p-4 cursor-pointer group-hover:bg-[#f5efe6] transition-colors"
                      >
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          className="h-full w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Details & CTA */}
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-display text-lg font-bold uppercase text-[#0b0907]">
                            {perfume.name}
                          </h3>
                          <div className="text-right">
                            <span className="font-bold text-sm text-[#0b0907]">
                              ₹{perfume.price50ml.toLocaleString("en-IN")}
                            </span>
                            <span className="block text-[10px] text-[#a8a29e] line-through">
                              ₹{perfume.mrp50ml.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#57534e] line-clamp-2">
                          {perfume.subtitle}
                        </p>

                        {/* Notes snippet */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {perfume.topNotes.concat(perfume.baseNotes).slice(0, 3).map((note, i) => (
                            <span key={i} className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[9px] text-[#78716c]">
                              {note}
                            </span>
                          ))}
                        </div>

                        {/* Add button */}
                        <div className="pt-2 flex gap-2">
                          <button
                            onClick={() => handleSelectPerfume(perfume)}
                            className={`flex-1 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isAssigned
                                ? "border border-[#c89b5a] bg-[#c89b5a]/15 text-[#a97f43] hover:bg-[#c89b5a] hover:text-black"
                                : "border border-black/10 bg-[#0b0907] text-white hover:bg-[#c89b5a] hover:text-black hover:border-[#c89b5a]"
                            }`}
                          >
                            {isAssigned ? "+ ADD AGAIN" : "+ ADD TO BOX"}
                          </button>

                          <button
                            onClick={() => setQuickViewPerfume(perfume)}
                            className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-xs text-[#78716c] hover:text-black hover:border-black/30 transition-colors cursor-pointer"
                            title="View Notes"
                          >
                            ℹ️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: STICKY FULLY-SCROLLABLE BOX TRAY (NO OVERFLOW CUTOFF) ── */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-[#c89b5a]/30 bg-white p-5 sm:p-6 space-y-4 shadow-xl scrollbar-thin">
                
                {/* Header & Progress */}
                <div className="border-b border-black/[0.06] pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase text-[#0b0907]">
                        YOUR BESPOKE BOX
                      </h3>
                      <span className="text-[11px] text-[#78716c]">
                        {bundleSize}-Bottle 50ML Collection
                      </span>
                    </div>
                    <span className="rounded-full bg-[#c89b5a]/15 px-2.5 py-0.5 text-xs font-bold text-[#a97f43]">
                      {filledCount} / {bundleSize} SLOTS
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-[#78716c]">
                      <span>{isComplete ? "✓ Box Complete — Discount Unlocked!" : `Select ${bundleSize - filledCount} more scent(s)`}</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                      <div
                        className="h-full rounded-full bg-[#c89b5a] transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Slots List (Scrollable if multiple) */}
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5">
                  {Array.from({ length: bundleSize }).map((_, slotIdx) => {
                    const item = selected[slotIdx];
                    const isActive = activeSlot === slotIdx;

                    return (
                      <div
                        key={slotIdx}
                        onClick={() => setActiveSlot(slotIdx)}
                        className={`flex items-center justify-between rounded-xl border p-2.5 cursor-pointer transition-all ${
                          isActive
                            ? "border-[#c89b5a] bg-[#fcfaf7] ring-2 ring-[#c89b5a]"
                            : item
                            ? "border-black/10 bg-white hover:border-[#c89b5a]/60"
                            : "border-dashed border-black/20 bg-[#faf7f2] hover:border-[#c89b5a]/60 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0b0907] text-[9px] font-bold text-[#e2c48e]">
                            0{slotIdx + 1}
                          </span>

                          {item ? (
                            <div className="flex items-center gap-2.5">
                              <img src={item.image} alt={item.name} className="h-9 w-9 object-contain" />
                              <div>
                                <h4 className="font-display text-xs font-bold uppercase text-[#0b0907] leading-tight">{item.name}</h4>
                                <span className="block text-[10px] text-[#a97f43] font-medium">50 ML • ₹{item.price50ml}</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="block text-xs font-semibold text-[#0b0907] leading-tight">EMPTY SLOT</span>
                              <span className="block text-[9px] text-[#a8a29e]">Click any perfume to assign</span>
                            </div>
                          )}
                        </div>

                        {item && (
                          <button
                            onClick={(e) => handleRemoveSlot(slotIdx, e)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-[#a8a29e] hover:bg-red-50 hover:text-red-500 cursor-pointer"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-black/[0.08] pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#78716c]">
                    <span>Subtotal ({bundleSize} × 50ML):</span>
                    <span>₹{rawSubtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-emerald-600">
                    <span>Bundle Savings:</span>
                    <span>{isComplete ? `− ₹${discount}` : `Unlock ₹${discount} OFF`}</span>
                  </div>

                  <div className="flex justify-between text-[#78716c]">
                    <span>Express Delivery:</span>
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between border-t border-black/[0.08] pt-2 font-display text-base font-bold text-[#0b0907]">
                    <span>Set Total:</span>
                    <div className="text-right">
                      <span className="block text-lg text-[#0b0907]">₹{finalPrice.toLocaleString("en-IN")}</span>
                      {rawMrpTotal > finalPrice && (
                        <span className="block text-[9px] font-sans font-normal text-emerald-600">
                          Save ₹{(rawMrpTotal - finalPrice).toLocaleString("en-IN")} total
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-1 space-y-2">
                  <button
                    onClick={handleAddBundleToBag}
                    disabled={!isComplete || isAdding}
                    className={`w-full rounded-2xl py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                      isComplete
                        ? "border border-[#c89b5a] bg-gradient-to-r from-[#c89b5a] via-[#e2c48e] to-[#c89b5a] text-[#0b0907] shadow-lg hover:scale-[1.01]"
                        : "border border-black/10 bg-black/5 text-[#a8a29e] cursor-not-allowed"
                    }`}
                  >
                    {isAdding
                      ? "ADDING TO BAG..."
                      : isComplete
                      ? `ADD ${bundleSize}-BOTTLE BOX TO BAG • ₹${finalPrice.toLocaleString("en-IN")} →`
                      : `SELECT ${bundleSize - filledCount} MORE SCENT(S)`}
                  </button>

                  <p className="text-[9px] text-center text-[#a8a29e]">
                    🔒 Includes 30-Day Discovery Guarantee & free trial sample vials
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SIMPLE FAQ ACCORDION ── */}
      <section className="border-t border-black/[0.06] bg-white px-6 py-14 lg:px-12">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a97f43]">
              ASSURANCES
            </span>
            <h2 className="font-display text-2xl uppercase tracking-tight text-[#0b0907]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="divide-y divide-black/[0.06]">
            {BYOB_FAQS.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-[#0b0907] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#c89b5a] font-bold text-base">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="mt-2 text-xs text-[#57534e] leading-relaxed">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK VIEW NOTES MODAL ── */}
      {quickViewPerfume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#c89b5a]/40 bg-white p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setQuickViewPerfume(null)}
              className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-xs text-[#78716c] hover:bg-black/10 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b border-black/[0.06] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a97f43]">
                {quickViewPerfume.family} • 35%+ EXTRAIT
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#0b0907]">{quickViewPerfume.name}</h3>
              <p className="text-xs text-[#57534e] mt-0.5">{quickViewPerfume.subtitle}</p>
            </div>

            <img src={quickViewPerfume.image} alt={quickViewPerfume.name} className="h-44 mx-auto object-contain drop-shadow-md" />

            <div className="rounded-2xl border border-black/[0.06] bg-[#faf7f2] p-4 space-y-2 text-xs">
              <div>
                <strong className="text-[10px] text-[#a97f43] uppercase block">TOP NOTES:</strong>
                <span className="text-[#0b0907]">{quickViewPerfume.topNotes.join(" • ")}</span>
              </div>
              <div>
                <strong className="text-[10px] text-[#a97f43] uppercase block">HEART NOTES:</strong>
                <span className="text-[#0b0907]">{quickViewPerfume.heartNotes.join(" • ")}</span>
              </div>
              <div>
                <strong className="text-[10px] text-[#a97f43] uppercase block">BASE NOTES:</strong>
                <span className="text-[#0b0907]">{quickViewPerfume.baseNotes.join(" • ")}</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleSelectPerfume(quickViewPerfume);
                setQuickViewPerfume(null);
              }}
              className="w-full rounded-full border border-[#c89b5a] bg-[#0b0907] py-3.5 text-xs font-bold uppercase tracking-wider text-[#e2c48e] hover:bg-[#c89b5a] hover:text-black transition-colors cursor-pointer"
            >
              + ADD {quickViewPerfume.name} TO BOX • ₹{quickViewPerfume.price50ml}
            </button>
          </div>
        </div>
      )}

      {/* ── MOBILE STICKY BOTTOM HUD (Docked at bottom-[64px]) ── */}
      <div className="lg:hidden fixed bottom-[64px] left-0 right-0 z-30 border-t border-black/10 bg-white/95 px-5 py-3 backdrop-blur-md flex items-center justify-between shadow-lg">
        <div>
          <span className="block text-[9px] font-bold uppercase tracking-wider text-[#a97f43]">
            {filledCount}/{bundleSize} FILLED • SAVE ₹{discount}
          </span>
          <span className="font-display text-base font-bold text-[#0b0907]">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={handleAddBundleToBag}
          disabled={!isComplete || isAdding}
          className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            isComplete
              ? "border border-[#c89b5a] bg-[#0b0907] text-[#e2c48e] shadow-md active:scale-95"
              : "border border-black/10 bg-black/5 text-[#a8a29e]"
          }`}
        >
          {isComplete ? "ADD TO BAG →" : `PICK (${bundleSize - filledCount})`}
        </button>
      </div>

    </div>
  );
}
