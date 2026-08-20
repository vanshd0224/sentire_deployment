import React, { useState, useEffect, useMemo, useRef } from "react";
import { PerfumeOption } from "./BundleBuilderModal";

// Extended Perfume type for high-touch luxury editorial storytelling
export interface LuxuryPerfume extends PerfumeOption {
  quote: string;
  family: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  mood: string;
  occasion: string;
  concentration: string;
}

const LUXURY_PERFUMES: LuxuryPerfume[] = [
  {
    id: "purple-oud",
    name: "PURPLE OUD",
    sub: "Smoky Oud & Saffron",
    image: "/images/purple-oud.png",
    price: 4999,
    notes: ["Smoky Oud", "Saffron", "Amethyst Rose"],
    tag: "Bestseller",
    category: "woody",
    quote: "For nights that refuse to be forgotten. Smoky Cambodian oud entwined with saffron and velvet rose.",
    family: "AMBER / WOODY",
    topNotes: ["Saffron", "Calabrian Bergamot", "Cardamom"],
    heartNotes: ["Amethyst Rose", "Damask Rose", "Jasmine Sambac"],
    baseNotes: ["Cambodian Oud", "Smoky Amber", "Velvet Musk"],
    longevity: "12+ Hours",
    mood: "Magnetic · Intense · Opulent",
    occasion: "Evening Gala & Midnight Affairs",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
  },
  {
    id: "calantha",
    name: "CALANTHA",
    sub: "Sensual Floral & Amber",
    image: "/images/calantha.png",
    price: 4699,
    notes: ["Jasmine", "Amber", "Velvet Musk"],
    tag: "Iconic",
    category: "floral",
    quote: "An ethereal bouquet frozen in amber light. Luminous jasmines dancing over warm velvet musk.",
    family: "FLORAL / AMBER",
    topNotes: ["Pink Pepper", "Pear Blossom", "Mandarin"],
    heartNotes: ["Jasmine Sambac", "Velvet Rose", "White Lily"],
    baseNotes: ["Golden Amber", "Madagascar Vanilla", "Cedarwood"],
    longevity: "10+ Hours",
    mood: "Romantic · Alluring · Ethereal",
    occasion: "Intimate Dinners & Sunset Rituals",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
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
    quote: "Liquid gold bottled for royalty. Rich spices layered over rare silks and aged resinous woods.",
    family: "ORIENTAL / SPICE",
    topNotes: ["Cardamom", "Cinnamon Leaf", "Nutmeg"],
    heartNotes: ["Silk Accord", "Florentine Iris", "Benzoin"],
    baseNotes: ["Rich Amber", "Mysore Sandalwood", "Labdanum"],
    longevity: "14+ Hours",
    mood: "Majestic · Regal · Unforgettable",
    occasion: "Black Tie & Special Celebrations",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
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
    quote: "The quiet authority of bespoke leather and rare Florentine iris root. Command without words.",
    family: "LEATHER / WOODY",
    topNotes: ["Wild Thyme", "Raspberry", "Saffron"],
    heartNotes: ["Florentine Iris", "Tuscan Leather", "Olibanum"],
    baseNotes: ["Smoky Cedar", "Ambergris", "Haitian Vetiver"],
    longevity: "14+ Hours",
    mood: "Sophisticated · Commanding · Refined",
    occasion: "Executive Meetings & Private Soirées",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
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
    quote: "A dark gourmand secret. Velvet plum drenched in aged Madagascar vanilla and warm cashmere.",
    family: "GOURMAND / ORIENTAL",
    topNotes: ["Black Cherry", "Dark Plum", "Pink Pepper"],
    heartNotes: ["Damask Rose", "Patchouli", "Orchid"],
    baseNotes: ["Madagascar Vanilla", "Cashmere Wood", "Tonka Bean"],
    longevity: "12+ Hours",
    mood: "Intimate · Addictive · Hypnotic",
    occasion: "Late Rendezvous & Candlelit Evenings",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
  },
  {
    id: "white-oud",
    name: "WHITE OUD",
    sub: "Luminous Oud & Jasmine",
    image: "/images/product-white-oud.jpg",
    price: 4999,
    notes: ["White Oud", "Jasmine", "Soft Musk"],
    tag: "Pure",
    category: "woody",
    quote: "Purity meets profound depth. Luminous white oud paired with dew-kissed star jasmine petals.",
    family: "WOODIC / FLORAL",
    topNotes: ["Calabrian Bergamot", "White Tea Accord", "Neroli"],
    heartNotes: ["Star Jasmine", "Lily of the Valley", "White Iris"],
    baseNotes: ["White Oud", "Cashmeran", "Soft White Musk"],
    longevity: "10+ Hours",
    mood: "Luminous · Serene · Sublime",
    occasion: "Daytime Elegance & Spring Galas",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
  },
  {
    id: "midnight",
    name: "MIDNIGHT",
    sub: "Deep Amber & Bergamot",
    image: "/images/midnight.png",
    price: 4599,
    notes: ["Bergamot", "Dark Woods", "Amber"],
    tag: "Night",
    category: "fresh",
    quote: "The stillness of 2 AM captured in glass. Crisp bergamot melting into deep dark amber.",
    family: "FRESH / AMBER",
    topNotes: ["Sicilian Bergamot", "French Lavender", "Grapefruit"],
    heartNotes: ["Smoky Cedar", "Black Tea", "Nutmeg"],
    baseNotes: ["Deep Amber", "Haitian Vetiver", "Roasted Tonka"],
    longevity: "10+ Hours",
    mood: "Mysterious · Cool · Captivating",
    occasion: "Starlight Walks & Midnight Lounges",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
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
    quote: "Sunlight filtering through Mediterranean orange groves. Radiant, uplifting and crisp.",
    family: "CITRUS / FLORAL",
    topNotes: ["Calabrian Bergamot", "Green Mandarin", "Petitgrain"],
    heartNotes: ["Neroli", "Orange Blossom", "White Tea"],
    baseNotes: ["Clean Musk", "Cedarwood", "Crystal Amber"],
    longevity: "8+ Hours",
    mood: "Radiant · Joyful · Refreshing",
    occasion: "Morning Rituals & Summer Escapes",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
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
    quote: "An uncontrollable obsession of velvet rose dipped in creamy tonka bean and cardamom.",
    family: "FLORAL / SPICE",
    topNotes: ["Pink Cardamom", "Nutmeg", "Black Pepper"],
    heartNotes: ["Turkish Rose", "Damask Rose", "Violet"],
    baseNotes: ["Roasted Tonka", "Mysore Sandalwood", "Golden Amber"],
    longevity: "12+ Hours",
    mood: "Passionate · Hypnotic · Warm",
    occasion: "Autumn Evenings & Fireside Whispers",
    concentration: "Extrait de Parfum (35% Oil Concentration)"
  }
];

const FAQS = [
  {
    q: "How does the SENTIRE Build Your Own Bundle work?",
    a: "Building your fragrance wardrobe is effortless: Select your preferred set size (The Duo 2-bottle, The Trio 3-bottle, or The Signature 4-bottle set). Next, explore our haute-parfumerie collection and select your scents. Personalise your set with custom monogramming, and receive exclusive bundle savings up to ₹300 automatically applied at checkout."
  },
  {
    q: "Can I select the same fragrance multiple times in one bundle?",
    a: "Yes. You may curate any combination—whether selecting three distinct fragrances for different occasions or multiple bottles of your ultimate signature scent."
  },
  {
    q: "Are all perfumes in the bundle full-size 50ML Extraits?",
    a: "Every fragrance in our bundle builder is a full-size 50 ML Extrait de Parfum crafted with haute-parfumerie oil concentrations (35%) for extraordinary longevity."
  },
  {
    q: "How does complimentary bottle personalisation work?",
    a: "You can engrave your initials or a short custom name onto your perfume presentation box or bottle. Our master artisan engravers apply high-precision metallic gold lettering prior to dispatch."
  },
  {
    q: "Can I send the bundle directly as a luxury gift?",
    a: "Absolutely. Simply enable the 'IS THIS A GIFT?' option during step 3. We will package your selected set in our SIGNATURE SENTIRE Black & Ivory Velvet Gift Box, include a custom handwritten parchment card, and exclude price invoices."
  },
  {
    q: "What is your return policy for bespoke bundles?",
    a: "Every bundle includes complimentary discovery sample vials corresponding to your chosen fragrances. Test the sample vials first; if any scent does not suit you, you may exchange unopened full-size bottles within 30 days."
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
  onOpenBundleModal?: () => void;
}

export default function ByobPage({ onBackToHome, onAddToCart, onOpenCart, onOpenBundleModal }: ByobPageProps) {
  // 1. Core State Management
  const [bundleSize, setBundleSize] = useState<number>(3); // 2, 3, or 4
  const [selected, setSelected] = useState<(LuxuryPerfume | null)[]>([
    LUXURY_PERFUMES[0],
    LUXURY_PERFUMES[1],
    LUXURY_PERFUMES[2],
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Quick View Drawer & Scent Table State
  const [quickViewPerfume, setQuickViewPerfume] = useState<LuxuryPerfume | null>(null);
  const [activeTableBottleId, setActiveTableBottleId] = useState<string>("purple-oud");
  
  // Personalisation & Gifting State
  const [monogram, setMonogram] = useState<string>("A R");
  const [engravingText, setEngravingText] = useState<string>("SENTIRE RITUAL");
  const [isGifting, setIsGifting] = useState<boolean>(false);
  const [giftRecipient, setGiftRecipient] = useState<string>("");
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [includeGiftWrap, setIncludeGiftWrap] = useState<boolean>(true);

  // UI Telemetry & Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState<boolean>(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Update selected array when bundle size changes
  const handleSizeChange = (newSize: number) => {
    setBundleSize(newSize);
    if (newSize > selected.length) {
      const extraCount = newSize - selected.length;
      setSelected([...selected, ...Array(extraCount).fill(null)]);
    } else {
      setSelected(selected.slice(0, newSize));
    }
    triggerToast(`Updated ritual collection size to ${newSize} bottles`);
  };

  // Calculations
  const filledCount = selected.filter(Boolean).length;
  const isComplete = filledCount === bundleSize;
  const progressPercent = Math.round((filledCount / bundleSize) * 100);

  const rawTotal = selected.reduce((sum, item) => sum + (item?.price || 0), 0);
  const discount = bundleSize === 2 ? 100 : bundleSize === 3 ? 200 : 300;
  const finalPrice = Math.max(0, rawTotal - (isComplete ? discount : 0));

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Adding / Replacing Perfume in Slot
  const handleSelectPerfume = (perfume: LuxuryPerfume) => {
    if (activeSlot !== null && activeSlot < bundleSize) {
      const next = [...selected];
      next[activeSlot] = perfume;
      setSelected(next);
      setActiveSlot(null);
      triggerToast(`Slot 0${activeSlot + 1} updated to ${perfume.name}`);
    } else {
      const emptyIdx = selected.findIndex((s) => s === null);
      if (emptyIdx !== -1) {
        const next = [...selected];
        next[emptyIdx] = perfume;
        setSelected(next);
        triggerToast(`${perfume.name} added to Slot 0${emptyIdx + 1}`);
      } else {
        const next = [...selected];
        next[0] = perfume;
        setSelected(next);
        triggerToast(`Replaced Slot 01 with ${perfume.name}`);
      }
    }
  };

  // Remove Scent from Slot
  const handleRemoveSlot = (slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const perfumeName = selected[slotIdx]?.name;
    const next = [...selected];
    next[slotIdx] = null;
    setSelected(next);
    if (perfumeName) triggerToast(`Removed ${perfumeName} from Slot 0${slotIdx + 1}`);
  };

  // Handle Add Completed Bundle to Bag
  const handleAddBundleToBag = () => {
    if (!isComplete) return;
    setAddedToCartSuccess(true);
    
    if (onAddToCart) {
      const perBottleDiscount = Math.round(discount / bundleSize);
      selected.forEach((item) => {
        if (item) {
          onAddToCart(
            {
              id: `${item.id}-${monogram.trim() || "std"}`,
              name: item.name + (monogram.trim() ? ` (Personalised '${monogram.trim()}')` : ""),
              num: item.tag,
              img: item.image,
            },
            50,
            Math.max(0, item.price - perBottleDiscount)
          );
        }
      });
    }

    setTimeout(() => {
      setShowCompletionModal(true);
    }, 400);
  };

  // Filter logic
  const filteredPerfumes = useMemo(() => {
    if (activeCategory === "all") return LUXURY_PERFUMES;
    if (activeCategory === "bestseller") return LUXURY_PERFUMES.filter((p) => p.tag === "Bestseller" || p.tag === "Signature");
    return LUXURY_PERFUMES.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen w-full bg-[#080706] text-[#F5F1EA] selection:bg-[#C8A55B] selection:text-black pb-[140px] lg:pb-0">
      
      {/* Toast HUD */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-none border border-[#C8A55B]/60 bg-[#080706]/95 px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-[#C8A55B] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-top-3">
          ✦ {toastMessage}
        </div>
      )}

      {/* ── STICKY TOP MINI BUNDLE BAR (Desktop only to prevent mobile clutter) ── */}
      <div className="hidden md:block sticky top-0 z-40 border-b border-[#C8A55B]/20 bg-[#080706]/90 px-6 py-3 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#BEB4A5] transition-colors hover:text-[#C8A55B] cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              BOUTIQUE
            </button>
            <span className="h-3 w-[1px] bg-[#C8A55B]/30" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C8A55B]">
              YOUR RITUAL — {filledCount} / {bundleSize} SELECTED
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-widest text-[#837D74]">RITUAL TOTAL</span>
              <span className="font-serif-luxe text-base font-medium text-[#FBF9F5]">
                ₹{finalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("step-02-builder");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-none border border-[#C8A55B] bg-[#C8A55B]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A55B] transition-all hover:bg-[#C8A55B] hover:text-black cursor-pointer"
            >
              {isComplete ? "REVIEW RITUAL" : "BUILD COLLECTION"}
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION — "COMPOSE YOUR OWN RITUAL" ── */}
      <section className="relative min-h-[85vh] overflow-hidden border-b border-[#C8A55B]/15 bg-gradient-to-b from-[#080706] via-[#13110F] to-[#080706] px-6 py-16 lg:px-16 lg:py-28">
        {/* Subtle background ambient particle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,165,91,0.12)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(190,180,165,0.08)_0%,transparent_60%)]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: High-Fashion Editorial Typography */}
          <div className="relative z-10 space-y-6 lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-10 bg-[#C8A55B]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8A55B]">
                A SENTIRE EXPERIENCE
              </span>
            </div>

            <h1 className="font-serif-luxe text-4xl font-normal tracking-tight sm:text-6xl lg:text-7xl leading-[1.05]">
              BUILD YOUR
              <span className="block font-serif-luxe italic text-[#C8A55B] font-light mt-1">
                OWN RITUAL.
              </span>
            </h1>

            <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-[#BEB4A5] sm:text-base">
              Curate a private fragrance wardrobe that feels unmistakably yours. Select your signature 50 ML Extrait de Parfums, create your custom set, and enjoy exclusive savings up to ₹300.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <button
                onClick={() => {
                  const el = document.getElementById("step-01-selector");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center justify-center overflow-hidden border border-[#C8A55B] bg-[#C8A55B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition-all hover:bg-transparent hover:text-[#C8A55B] cursor-pointer shadow-[0_0_25px_rgba(200,165,91,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  BEGIN YOUR BUNDLE
                  <span className="transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </button>

              <div className="space-y-1 text-center sm:text-left">
                <span className="block text-[11px] font-mono uppercase tracking-widest text-[#C8A55B]">
                  ✦ EXCLUSIVE BUNDLE SAVINGS
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-[#837D74]">
                  Save up to ₹300 when you build a set
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Still-Life Fragrance Composition */}
          <div className="relative z-10 flex justify-center lg:col-span-6">
            <div className="relative w-full max-w-lg overflow-hidden border border-[#C8A55B]/30 bg-[#13110F] p-4 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,165,91,0.18)_0%,transparent_70%)]" />
              
              {/* Product Still Life Banner */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080706]">
                <img
                  src="/images/build-bundle.png"
                  alt="SENTIRE Luxury Fragrance Wardrobe Composition"
                  className="h-full w-full object-cover object-center filter brightness-95 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13110F] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Architectural Telemetry Badge */}
              <div className="mt-4 flex items-center justify-between border-t border-[#C8A55B]/20 pt-4 text-[10px] font-mono uppercase tracking-widest text-[#BEB4A5]">
                <span>HAUTE PARFUMERIE</span>
                <span className="text-[#C8A55B]">50 ML EXTRAITS</span>
                <span>CRAFTED IN FRANCE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STEP 01 — BUNDLE SIZE SELECTOR ── */}
      <section id="step-01-selector" className="border-b border-[#C8A55B]/15 bg-[#F5F1EA] px-6 py-20 text-[#080706] lg:px-16">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#9A7A3F]">
              STEP 01 — SELECT COLLECTION SIZE
            </span>
            <h2 className="font-serif-luxe text-3xl font-normal sm:text-5xl uppercase tracking-tight text-[#080706]">
              HOW WOULD YOU LIKE <span className="block italic text-[#9A7A3F] font-light">TO BUILD YOUR COLLECTION?</span>
            </h2>
            <p className="mx-auto max-w-xl text-xs sm:text-sm font-light text-[#837D74]">
              Choose the size of your fragrance wardrobe. Each tier unlocks elevated savings and bespoke presentation.
            </p>
          </div>

          {/* 3 Architectural Bundle Size Invitation Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            
            {/* Card 1: THE DUO */}
            <div
              onClick={() => handleSizeChange(2)}
              className={`group relative flex flex-col justify-between border p-8 transition-all duration-300 cursor-pointer ${
                bundleSize === 2
                  ? "border-[#9A7A3F] bg-[#FBF9F5] shadow-[0_15px_40px_rgba(154,122,63,0.15)] ring-1 ring-[#9A7A3F]"
                  : "border-[#BEB4A5]/40 bg-[#EFE9DF] hover:border-[#9A7A3F]/60 hover:bg-[#FBF9F5]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#BEB4A5]/30 pb-3">
                  <span className="font-mono text-xs text-[#9A7A3F]">01</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#837D74]">2 BOTTLES</span>
                </div>

                <div>
                  <h3 className="font-serif-luxe text-2xl uppercase tracking-wide text-[#080706]">THE DUO</h3>
                  <p className="mt-1 text-xs font-light text-[#837D74]">“A pairing for every mood.”</p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#BEB4A5]/30 pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#080706]">SAVE ₹100</span>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${bundleSize === 2 ? "text-[#9A7A3F] font-bold" : "text-[#837D74]"}`}>
                  {bundleSize === 2 ? "✦ SELECTED" : "SELECT →"}
                </span>
              </div>
            </div>

            {/* Card 2: THE TRIO (MOST LOVED) */}
            <div
              onClick={() => handleSizeChange(3)}
              className={`group relative flex flex-col justify-between border p-8 transition-all duration-300 cursor-pointer ${
                bundleSize === 3
                  ? "border-[#9A7A3F] bg-[#FBF9F5] shadow-[0_15px_40px_rgba(154,122,63,0.2)] ring-1 ring-[#9A7A3F]"
                  : "border-[#BEB4A5]/40 bg-[#EFE9DF] hover:border-[#9A7A3F]/60 hover:bg-[#FBF9F5]"
              }`}
            >
              <span className="absolute -top-3 left-6 rounded-none bg-[#9A7A3F] px-3 py-0.5 text-[8px] font-mono uppercase tracking-[0.25em] text-white">
                MOST LOVED
              </span>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#BEB4A5]/30 pb-3">
                  <span className="font-mono text-xs text-[#9A7A3F]">02</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#837D74]">3 BOTTLES</span>
                </div>

                <div>
                  <h3 className="font-serif-luxe text-2xl uppercase tracking-wide text-[#080706]">THE TRIO</h3>
                  <p className="mt-1 text-xs font-light text-[#837D74]">“Your everyday fragrance wardrobe.”</p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#BEB4A5]/30 pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#9A7A3F]">SAVE ₹200</span>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${bundleSize === 3 ? "text-[#9A7A3F] font-bold" : "text-[#837D74]"}`}>
                  {bundleSize === 3 ? "✦ SELECTED" : "SELECT →"}
                </span>
              </div>
            </div>

            {/* Card 3: THE SIGNATURE SET */}
            <div
              onClick={() => handleSizeChange(4)}
              className={`group relative flex flex-col justify-between border p-8 transition-all duration-300 cursor-pointer ${
                bundleSize === 4
                  ? "border-[#9A7A3F] bg-[#FBF9F5] shadow-[0_15px_40px_rgba(154,122,63,0.15)] ring-1 ring-[#9A7A3F]"
                  : "border-[#BEB4A5]/40 bg-[#EFE9DF] hover:border-[#9A7A3F]/60 hover:bg-[#FBF9F5]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#BEB4A5]/30 pb-3">
                  <span className="font-mono text-xs text-[#9A7A3F]">03</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#837D74]">4 BOTTLES</span>
                </div>

                <div>
                  <h3 className="font-serif-luxe text-2xl uppercase tracking-wide text-[#080706]">THE SIGNATURE SET</h3>
                  <p className="mt-1 text-xs font-light text-[#837D74]">“A complete Sentire ritual.”</p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#BEB4A5]/30 pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#080706]">SAVE ₹300</span>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${bundleSize === 4 ? "text-[#9A7A3F] font-bold" : "text-[#837D74]"}`}>
                  {bundleSize === 4 ? "✦ SELECTED" : "SELECT →"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── STEP 02 — MAIN BUNDLE BUILDER (DISCOVERY MASONRY & STICKY VANITY TRAY) ── */}
      <section id="step-02-builder" className="relative z-20 border-b border-[#C8A55B]/15 bg-[#080706] px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A55B]/20 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8A55B]">
                STEP 02 — DISCOVER
              </span>
              <h2 className="font-serif-luxe text-3xl font-normal sm:text-5xl uppercase tracking-tight text-[#F5F1EA]">
                FIND THE NOTES <span className="italic text-[#C8A55B] font-light">THAT CALL TO YOU.</span>
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#BEB4A5]">
                Move by instinct. Explore each fragrance through its mood, family and signature notes.
              </p>
            </div>

            {/* Minimalist Olfactory Category Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 border-l border-[#C8A55B]/20 pl-4">
              {[
                { id: "all", label: "ALL" },
                { id: "bestseller", label: "BESTSELLERS" },
                { id: "floral", label: "FLORAL" },
                { id: "woody", label: "WOODY" },
                { id: "oriental", label: "AMBER" },
                { id: "fresh", label: "FRESH" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative py-1.5 px-3 text-[10px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "text-[#C8A55B] font-bold border-b border-[#C8A55B]"
                      : "text-[#837D74] hover:text-[#F5F1EA]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SPLIT EDITORIAL COMPOSITION */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* LEFT 68% — FRAGRANCE DISCOVERY MASONRY CATALOGUE */}
            <div className="space-y-12 lg:col-span-8">
              
              {/* Masonry Catalogue Layout */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {filteredPerfumes.map((perfume, idx) => {
                  const selectedInSlots = selected
                    .map((s, slotIdx) => (s?.id === perfume.id ? slotIdx + 1 : null))
                    .filter((sIdx): sIdx is number => sIdx !== null);
                  const isSelectedInBundle = selectedInSlots.length > 0;

                  return (
                    <div
                      key={perfume.id}
                      className={`group relative flex flex-col justify-between border bg-[#13110F] p-6 transition-all duration-500 hover:border-[#C8A55B]/60 ${
                        isSelectedInBundle
                          ? "border-[#C8A55B] ring-1 ring-[#C8A55B]/40"
                          : "border-[#C8A55B]/20"
                      } ${idx === 0 ? "sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center" : ""}`}
                    >
                      {/* Badge & Slot indicator */}
                      <div className="flex items-center justify-between border-b border-[#C8A55B]/15 pb-3">
                        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8A55B]">
                          {perfume.tag}
                        </span>
                        {isSelectedInBundle && (
                          <span className="bg-[#C8A55B] px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-black">
                            SLOT 0{selectedInSlots.join(", 0")}
                          </span>
                        )}
                      </div>

                      {/* Fragrance Imagery with 1.03x slow zoom */}
                      <div
                        onClick={() => setQuickViewPerfume(perfume)}
                        className="relative my-4 flex aspect-square w-full items-center justify-center overflow-hidden bg-[#080706] p-4 cursor-pointer"
                      >
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          className="h-full w-full object-contain filter brightness-95 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="border border-[#C8A55B] bg-[#080706]/90 px-4 py-2 text-[9px] font-mono uppercase tracking-[0.25em] text-[#C8A55B]">
                            VIEW SCENT →
                          </span>
                        </div>
                      </div>

                      {/* Fragrance Metadata */}
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-serif-luxe text-xl uppercase tracking-wider text-[#FBF9F5]">
                            {perfume.name}
                          </h3>
                          <span className="font-mono text-xs font-semibold text-[#C8A55B]">
                            ₹{perfume.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <p className="text-[11px] font-light text-[#BEB4A5]">
                          {perfume.family} · 50ML EXTRAIT
                        </p>

                        <p className="text-[10px] font-mono text-[#837D74] border-t border-[#C8A55B]/10 pt-2 truncate">
                          {perfume.notes.join(" • ")}
                        </p>

                        <button
                          onClick={() => handleSelectPerfume(perfume)}
                          className={`mt-4 w-full border py-3 text-[10px] font-semibold uppercase tracking-[0.25em] transition-all cursor-pointer ${
                            isSelectedInBundle
                              ? "border-[#C8A55B] bg-[#C8A55B]/20 text-[#C8A55B] hover:bg-[#C8A55B] hover:text-black"
                              : "border-[#C8A55B]/40 bg-transparent text-[#F5F1EA] hover:border-[#C8A55B] hover:bg-[#C8A55B] hover:text-black"
                          }`}
                        >
                          {isSelectedInBundle ? "+ ADD ANOTHER BOTTLE" : "+ ADD TO RITUAL"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editorial Story Interruption Card */}
              <div className="relative overflow-hidden border border-[#C8A55B]/30 bg-gradient-to-r from-[#13110F] via-[#1a1714] to-[#13110F] p-8 sm:p-12 text-center space-y-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C8A55B]">
                  THE SENTIRE PHILOSOPHY
                </span>
                <h3 className="font-serif-luxe text-2xl sm:text-4xl italic text-[#FBF9F5] leading-tight">
                  “FRAGRANCE SHOULD NEVER BE CHOSEN BY RULES.”
                </h3>
                <p className="mx-auto max-w-lg text-xs font-light text-[#BEB4A5]">
                  Follow memory. Follow instinct. Follow the notes that remain with you long after the sun sets.
                </p>
              </div>

            </div>

            {/* RIGHT 32% — STICKY "YOUR RITUAL" VANITY TRAY PANEL */}
            <div className="lg:col-span-4">
              <div className="sticky top-20 border border-[#C8A55B]/40 bg-[#080706] p-6 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Panel Header & Progress */}
                <div className="border-b border-[#C8A55B]/20 pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxe text-lg uppercase tracking-wider text-[#FBF9F5]">
                      YOUR RITUAL
                    </h3>
                    <span className="font-mono text-[10px] text-[#C8A55B]">
                      {filledCount} / {bundleSize} SELECTED
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="h-[2px] w-full bg-[#13110F]">
                    <div
                      className="h-full bg-[#C8A55B] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Bundle Slots — Presentation Case Mockup */}
                <div className="space-y-3">
                  {Array.from({ length: bundleSize }).map((_, slotIdx) => {
                    const item = selected[slotIdx];
                    const isActive = activeSlot === slotIdx;

                    return (
                      <div
                        key={slotIdx}
                        onClick={() => setActiveSlot(slotIdx)}
                        className={`group relative flex items-center justify-between border p-3 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "border-[#C8A55B] bg-[#C8A55B]/15"
                            : item
                            ? "border-[#C8A55B]/30 bg-[#13110F]"
                            : "border-dashed border-[#C8A55B]/20 bg-transparent hover:border-[#C8A55B]/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-[#C8A55B]">0{slotIdx + 1}</span>
                          
                          {item ? (
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-10 w-10 object-contain"
                              />
                              <div>
                                <h4 className="font-serif-luxe text-xs font-medium uppercase text-[#FBF9F5]">
                                  {item.name}
                                </h4>
                                <span className="text-[9px] font-mono text-[#837D74]">50 ML · ₹{item.price}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="block text-[11px] font-light text-[#BEB4A5]">
                                YOUR NEXT SCENT
                              </span>
                              <span className="block text-[9px] font-mono text-[#837D74]">
                                Select from palette
                              </span>
                            </div>
                          )}
                        </div>

                        {item && (
                          <button
                            onClick={(e) => handleRemoveSlot(slotIdx, e)}
                            className="text-xs text-[#837D74] hover:text-red-400 p-1 cursor-pointer"
                            title="Remove"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing & Telemetry Breakdown */}
                <div className="border-t border-[#C8A55B]/20 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#837D74]">
                    <span>SUBTOTAL</span>
                    <span>₹{rawTotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-[#C8A55B]">
                    <span>BUNDLE SAVINGS</span>
                    <span>− ₹{discount}</span>
                  </div>

                  <div className="flex justify-between border-t border-[#C8A55B]/20 pt-2 font-serif-luxe text-base font-normal text-[#FBF9F5]">
                    <span>YOUR BUNDLE</span>
                    <span>₹{finalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  <p className="text-[9px] font-mono text-[#837D74] text-center pt-1">
                    Complimentary express luxury shipping included
                  </p>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => {
                    if (isComplete) {
                      const el = document.getElementById("step-03-personalisation");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  disabled={!isComplete}
                  className={`w-full border py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all ${
                    isComplete
                      ? "border-[#C8A55B] bg-[#C8A55B] text-black hover:bg-transparent hover:text-[#C8A55B] cursor-pointer"
                      : "border-[#837D74]/30 bg-transparent text-[#837D74] cursor-not-allowed"
                  }`}
                >
                  {isComplete ? "CONTINUE TO PERSONALISATION →" : `SELECT ${bundleSize - filledCount} MORE FRAGRANCE(S)`}
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SIGNATURE FEATURE 1 — THE SCENT TABLE (PHYSICAL BOTTLE STAGE) ── */}
      <section className="border-b border-[#C8A55B]/15 bg-gradient-to-b from-[#080706] via-[#0d0b0a] to-[#080706] px-6 py-24 text-center lg:px-16">
        <div className="mx-auto max-w-6xl space-y-12">
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8A55B]">
              SIGNATURE EXPERIENCE
            </span>
            <h2 className="font-serif-luxe text-3xl sm:text-5xl uppercase tracking-tight text-[#F5F1EA]">
              THE SCENT TABLE
            </h2>
            <p className="mx-auto max-w-lg text-xs font-light text-[#BEB4A5]">
              Touch any bottle on our obsidian stone altar to experience its sensory accord and olfactory narrative.
            </p>
          </div>

          {/* Interactive Bottle Display Altar */}
          <div className="relative border border-[#C8A55B]/30 bg-[#13110F] p-8 sm:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,165,91,0.12)_0%,transparent_70%)]" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {LUXURY_PERFUMES.slice(0, 5).map((p) => {
                const isActive = activeTableBottleId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveTableBottleId(p.id)}
                    className={`group relative flex flex-col items-center border p-4 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "border-[#C8A55B] bg-[#C8A55B]/10 -translate-y-2 shadow-[0_10px_30px_rgba(200,165,91,0.2)]"
                        : "border-[#C8A55B]/15 bg-[#080706] hover:border-[#C8A55B]/50"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-28 w-full object-contain filter brightness-95 transition-transform group-hover:scale-105"
                    />
                    <span className="mt-3 font-serif-luxe text-xs uppercase tracking-wider text-[#FBF9F5]">
                      {p.name}
                    </span>
                    <span className="text-[9px] font-mono text-[#C8A55B]">{p.family}</span>
                  </div>
                );
              })}
            </div>

            {/* Active Bottle Story HUD */}
            {(() => {
              const activePerfume = LUXURY_PERFUMES.find((p) => p.id === activeTableBottleId) || LUXURY_PERFUMES[0];

              return (
                <div className="mt-10 border-t border-[#C8A55B]/20 pt-8 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8A55B]">
                      SCENT ACCORD — {activePerfume.name}
                    </span>
                    <h3 className="font-serif-luxe text-2xl italic text-[#FBF9F5]">
                      “{activePerfume.quote}”
                    </h3>
                    <p className="text-xs font-light text-[#BEB4A5]">
                      Top: {activePerfume.topNotes.join(" · ")} | Base: {activePerfume.baseNotes.join(" · ")}
                    </p>
                  </div>

                  <div className="md:col-span-4 flex justify-end">
                    <button
                      onClick={() => handleSelectPerfume(activePerfume)}
                      className="border border-[#C8A55B] bg-[#C8A55B] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-black transition-all hover:bg-transparent hover:text-[#C8A55B] cursor-pointer"
                    >
                      + ADD {activePerfume.name} TO RITUAL
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* ── STEP 03 — PERSONALISATION STUDIO ("LEAVE YOUR MARK") ── */}
      <section id="step-03-personalisation" className="border-b border-[#C8A55B]/15 bg-[#13110F] px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8A55B]">
              STEP 03 — MAKE IT YOURS
            </span>
            <h2 className="font-serif-luxe text-3xl font-normal sm:text-5xl uppercase tracking-tight text-[#F5F1EA]">
              LEAVE YOUR MARK.
            </h2>
            <p className="mx-auto max-w-lg text-xs sm:text-sm font-light text-[#BEB4A5]">
              Turn your curated collection into something unmistakably personal with bespoke metallic gold engraving.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Live Engraving Inputs */}
            <div className="space-y-6 lg:col-span-6 border border-[#C8A55B]/20 bg-[#080706] p-8">
              <h3 className="font-serif-luxe text-xl uppercase tracking-wider text-[#FBF9F5]">
                ENGRAVING & MONOGRAM STUDIO
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#BEB4A5] mb-2">
                    MONOGRAM INITIALS (UP TO 3 CHARS)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    className="w-full border border-[#C8A55B]/30 bg-[#13110F] px-4 py-3 font-serif-luxe text-lg text-[#C8A55B] focus:border-[#C8A55B] focus:outline-none"
                    placeholder="E.G. A R"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#BEB4A5] mb-2">
                    CUSTOM RITUAL NAME / DEDICATION
                  </label>
                  <input
                    type="text"
                    maxLength={24}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full border border-[#C8A55B]/30 bg-[#13110F] px-4 py-3 font-sans text-xs text-[#F5F1EA] focus:border-[#C8A55B] focus:outline-none"
                    placeholder="E.G. SENTIRE PRIVATE COLLECTION"
                  />
                </div>
              </div>



            </div>

            {/* Live Engraving Bottle Preview */}
            <div className="relative flex justify-center lg:col-span-6">
              <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden border border-[#C8A55B]/30 bg-[#080706] p-8 flex flex-col items-center justify-center text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,165,91,0.2)_0%,transparent_75%)]" />

                <img
                  src="/images/purple-oud.png"
                  alt="Personalised SENTIRE Perfume Bottle"
                  className="h-56 object-contain filter brightness-95"
                />

                {/* Engraved Monogram Overlay */}
                <div className="mt-4 border-t border-[#C8A55B]/30 pt-3 w-full">
                  <span className="font-serif-luxe text-2xl font-light text-[#C8A55B] tracking-widest block">
                    {monogram || "A R"}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#BEB4A5] block mt-1">
                    {engravingText || "SENTIRE RITUAL"}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── STEP 04 — FINAL BUNDLE REVIEW & CHECKOUT ── */}
      <section id="step-04-review" className="border-b border-[#C8A55B]/15 bg-[#080706] px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-12 text-center">
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8A55B]">
              STEP 04 — YOUR COLLECTION
            </span>
            <h2 className="font-serif-luxe text-3xl sm:text-6xl uppercase tracking-tight text-[#F5F1EA]">
              A RITUAL <span className="italic text-[#C8A55B] font-light">COMPOSED BY YOU.</span>
            </h2>
            <p className="mx-auto max-w-lg text-xs sm:text-sm font-light text-[#BEB4A5]">
              Review your bespoke fragrance wardrobe before adding your collection to your shopping bag.
            </p>
          </div>

          {/* Final Collection Presentation Card */}
          <div className="border border-[#C8A55B]/40 bg-[#13110F] p-8 sm:p-12 text-left space-y-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {selected.map((item, idx) => (
                <div key={idx} className="border border-[#C8A55B]/20 bg-[#080706] p-4 text-center space-y-2">
                  <span className="font-mono text-[9px] text-[#C8A55B]">SLOT 0{idx + 1}</span>
                  {item ? (
                    <>
                      <img src={item.image} alt={item.name} className="h-24 mx-auto object-contain" />
                      <h4 className="font-serif-luxe text-sm uppercase text-[#FBF9F5]">{item.name}</h4>
                      <span className="text-[9px] font-mono text-[#837D74]">50 ML EXT</span>
                    </>
                  ) : (
                    <div className="h-32 flex items-center justify-center text-[10px] text-[#837D74]">
                      [EMPTY SLOT]
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary & Price Telemetry */}
            <div className="border-t border-[#C8A55B]/20 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A55B]">
                  PERSONALISATION: {monogram ? `'${monogram}' ENGRAVED` : "STANDARD PRESENTATION"}
                </span>
                <p className="text-xs font-light text-[#BEB4A5]">
                  Includes SENTIRE Velvet Presentation Box & Complimentary Samples
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-xs text-[#837D74] line-through">₹{rawTotal.toLocaleString("en-IN")}</span>
                  <span className="font-serif-luxe text-3xl text-[#FBF9F5]">₹{finalPrice.toLocaleString("en-IN")}</span>
                </div>
                <span className="text-[10px] font-mono text-[#C8A55B]">YOU SAVE ₹{discount} WITH BUNDLE</span>
              </div>
            </div>

            {/* Final Add To Bag CTA */}
            <button
              onClick={handleAddBundleToBag}
              disabled={!isComplete}
              className={`w-full border py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all cursor-pointer ${
                isComplete
                  ? "border-[#C8A55B] bg-[#C8A55B] text-black hover:bg-transparent hover:text-[#C8A55B] shadow-[0_0_30px_rgba(200,165,91,0.3)]"
                  : "border-[#837D74]/30 bg-transparent text-[#837D74] cursor-not-allowed"
              }`}
            >
              ADD MY RITUAL TO BAG →
            </button>

          </div>

        </div>
      </section>

      {/* ── SERVICE PROMISE STRIP ── */}
      <section className="border-b border-[#C8A55B]/15 bg-[#080706] px-6 py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-6 md:grid-cols-5 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#BEB4A5]">
          <div>✦ RARE INGREDIENTS</div>
          <div>✦ EXPERTLY CRAFTED</div>
          <div>✦ 12+ HOUR LONGEVITY</div>
          <div>✦ LUXURY WRAPPING</div>
          <div>✦ COMPLIMENTARY DELIVERY</div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="border-b border-[#C8A55B]/15 bg-[#13110F] px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8A55B]">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-serif-luxe text-3xl font-normal sm:text-4xl uppercase tracking-tight text-[#F5F1EA]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-[#C8A55B]/15">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;

              return (
                <div key={idx} className="pt-4">
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left font-serif-luxe text-lg text-[#FBF9F5] py-2 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-sm font-mono text-[#C8A55B]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs font-light leading-relaxed text-[#BEB4A5] pb-4">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── QUICK VIEW SCENT DRAWER ── */}
      {quickViewPerfume && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl border-l border-[#C8A55B]/30 bg-[#080706] p-8 overflow-y-auto space-y-8 luxury-scrollbar">
            
            <button
              onClick={() => setQuickViewPerfume(null)}
              className="absolute top-6 right-6 text-sm text-[#837D74] hover:text-[#C8A55B] cursor-pointer"
            >
              ✕ CLOSE
            </button>

            <div className="space-y-2 border-b border-[#C8A55B]/20 pb-4">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8A55B]">
                {quickViewPerfume.family}
              </span>
              <h2 className="font-serif-luxe text-3xl uppercase text-[#FBF9F5]">
                {quickViewPerfume.name}
              </h2>
              <p className="font-serif-luxe text-sm italic text-[#C8A55B]">
                “{quickViewPerfume.quote}”
              </p>
            </div>

            <img
              src={quickViewPerfume.image}
              alt={quickViewPerfume.name}
              className="h-64 mx-auto object-contain"
            />

            {/* Scent Note Pyramid (TOP -> HEART -> BASE) */}
            <div className="space-y-4 border-t border-[#C8A55B]/20 pt-6">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C8A55B]">
                OLFACTORY NOTE PYRAMID
              </h4>

              <div className="space-y-3 text-xs">
                <div className="border-l border-[#C8A55B] pl-4">
                  <span className="block text-[9px] font-mono text-[#837D74]">TOP NOTES</span>
                  <span className="text-[#F5F1EA]">{quickViewPerfume.topNotes.join(" · ")}</span>
                </div>

                <div className="border-l border-[#C8A55B] pl-4">
                  <span className="block text-[9px] font-mono text-[#837D74]">HEART NOTES</span>
                  <span className="text-[#F5F1EA]">{quickViewPerfume.heartNotes.join(" · ")}</span>
                </div>

                <div className="border-l border-[#C8A55B] pl-4">
                  <span className="block text-[9px] font-mono text-[#837D74]">BASE NOTES</span>
                  <span className="text-[#F5F1EA]">{quickViewPerfume.baseNotes.join(" · ")}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                handleSelectPerfume(quickViewPerfume);
                setQuickViewPerfume(null);
              }}
              className="w-full border border-[#C8A55B] bg-[#C8A55B] py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:bg-transparent hover:text-[#C8A55B] cursor-pointer"
            >
              ADD {quickViewPerfume.name} TO RITUAL
            </button>

          </div>
        </div>
      )}

      {/* ── BUNDLE ADDED CONFIRMATION MODAL ── */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6 animate-in fade-in">
          <div className="w-full max-w-md border border-[#C8A55B]/50 bg-[#13110F] p-8 text-center space-y-6 shadow-[0_0_50px_rgba(200,165,91,0.3)]">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8A55B]">
              HAUTE PARFUMERIE
            </span>

            <h3 className="font-serif-luxe text-3xl uppercase text-[#FBF9F5]">
              YOUR RITUAL AWAITS.
            </h3>

            <p className="text-xs font-light text-[#BEB4A5]">
              Your bespoke {bundleSize}-fragrance collection has been added to your shopping bag.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  if (onOpenCart) onOpenCart();
                }}
                className="w-full border border-[#C8A55B] bg-[#C8A55B] py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black hover:bg-transparent hover:text-[#C8A55B] cursor-pointer"
              >
                VIEW SHOPPING BAG →
              </button>

              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full text-[10px] font-mono uppercase tracking-widest text-[#837D74] hover:text-[#F5F1EA] cursor-pointer"
              >
                CONTINUE EXPLORING
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE RITUAL PROGRESS BAR (above bottom nav) ── */}
      <div className="lg:hidden fixed bottom-[64px] left-0 right-0 z-30 border-t border-[#C8A55B]/30 bg-[#080706]/95 px-5 py-3 backdrop-blur-xl flex items-center justify-between">
        <div>
          <span className="block text-[9px] font-mono uppercase text-[#C8A55B]">
            YOUR RITUAL ({filledCount}/{bundleSize})
          </span>
          <span className="font-serif-luxe text-base text-[#FBF9F5]">
            ₹{finalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById("step-02-builder");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="border border-[#C8A55B] bg-[#C8A55B] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black cursor-pointer"
        >
          {isComplete ? "REVIEW ✓" : "BUILD →"}
        </button>
      </div>

    </div>
  );
}
