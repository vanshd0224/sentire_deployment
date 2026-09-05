import React, { useState, useEffect, useRef } from "react";
import type { PageName } from "../types/appTypes";

interface DiscoverySetPageProps {
  onBackToHome?: () => void;
  onAddToCart?: (item: any) => void;
  onOpenCart?: () => void;
  onNavigate?: (page: PageName) => void;
}

// Angles for the discovery set flip-top packaging
const BOX_ANGLES = [
  {
    id: "front",
    label: "Case Front",
    tagline: "SENTIRE DISCOVERY SET · 6 ML × 6",
    img: "/discovery/box_case_front.jpg?v=v8_4k_crisp",
    desc: "Matte black flip-top case with gold hot-stamped emblem and stepped interior architecture.",
  },
  {
    id: "warning",
    label: "The Manifesto",
    tagline: "“The COOLEST Thing SOMEBODY can OWN”",
    img: "/discovery/box_manifesto.jpg?v=v8_4k_crisp",
    desc: "The authentic back warning stamp: ‘WARNING: The COOLEST Thing SOMEBODY can OWN. just feel it’.",
  },
  {
    id: "rare",
    label: "Side Profile",
    tagline: "IRRESISTIBLY RARE",
    img: "/discovery/box_side_profile.jpg?v=v8_4k_crisp",
    desc: "Precision angled silhouette engineered for smooth one-hand flip opening.",
  },
  {
    id: "top",
    label: "Crest Monogram",
    tagline: "PC EMBLEM OF HAUTE PARFUMERIE",
    img: "/discovery/box_crest_monogram.jpg?v=v8_4k_crisp",
    desc: "Hand-finished cursive PC seal in reflective metallic gold on deep matte noir.",
  },
  {
    id: "minimal",
    label: "Tailored Case",
    tagline: "MINIMALIST LUXURY SILHOUETTE",
    img: "/discovery/box_tailored_case.jpg?v=v8_4k_crisp",
    desc: "Compact dimensions tailored to fit evening clutches, breast pockets, and carry-ons without spilling a drop.",
  },
];

// The 6 original fragrances in the Discovery Set
const DISCOVERY_FRAGRANCES = [
  {
    id: "purple-oud",
    name: "Purple Oud",
    tagline: "Berry-bright oud, magnetic and dominating",
    vibe: "MAGNETIC · DOMINATING · HIGH ENERGY",
    character: "Berry-Bright Oud",
    topNotes: "Wild Blackberry, Bitter Orange, Saffron",
    heartNotes: "Velvet Purple Rose, Spiced Plum, Amber",
    baseNotes: "Cambodian Agarwood (Oud), Cedar, Leather",
    img: "/discovery/travel_purple_oud.jpg?v=travel_photoshoot_v4",
    family: "Oud & Berry Gourmand",
    familyBadge: "Oriental Woody",
    colorHex: "#542159",
    liquidColor: "from-[#38133b]/90 to-[#6a2973]/70",
    sillage: "Heavy (9.5/10)",
    longevity: "12+ Hours",
    bestTime: "Night Out · Gala · Cold Weather",
    complimentScore: "98%",
    vialDescription:
      "A dark, intoxicating collision of jammy wild berries and smoky Cambodian oud. Opens luminous and turns into an authoritative aura that commands attention.",
    layeringRole: "base",
    layeringTip: "Apply on chest as a rich, smoky foundation.",
  },
  {
    id: "mirai",
    name: "MIRAI",
    tagline: "Sweet dark gourmand, boldly addictive",
    vibe: "SWEET DARK GOURMAND · BOLDLY ADDICTIVE",
    character: "Dark Gourmand",
    topNotes: "Dark Chocolate, Sweet Mandarin, Candied Almond",
    heartNotes: "Roasted Tonka Bean, Vanilla Caviar, Hazelnut",
    baseNotes: "Warm Ambergris, Cashmere Woods, Musks",
    img: "/discovery/travel_mirai.jpg?v=travel_photoshoot_v4",
    family: "Rich Gourmand",
    familyBadge: "Gourmand Oriental",
    colorHex: "#7a222b",
    liquidColor: "from-[#4a121a]/90 to-[#872835]/70",
    sillage: "Intimate to Strong (9/10)",
    longevity: "10-12 Hours",
    bestTime: "Date Night · Sunset · Cozy Evenings",
    complimentScore: "99%",
    vialDescription:
      "Decadent and deeply edible without being juvenile. Cocoa nibs dipped in sweet dark liquor with a warm caramel undertone that melts into your skin.",
    layeringRole: "base",
    layeringTip: "Perfect sweet anchor under fresh aquatic or citrus accents.",
  },
  {
    id: "calantha",
    name: "CALANTHA",
    tagline: "Warm feminine floral, softly glamorous",
    vibe: "WARM FEMININE FLORAL · SOFTLY GLAMOROUS",
    character: "Velvet Floral",
    topNotes: "Dewy White Jasmine, Neroli, Morning Dew",
    heartNotes: "Centifolia Rose, Lily of the Valley, Iris",
    baseNotes: "Creamy Sandalwood, Golden Amber, Cashmeran",
    img: "/discovery/travel_calantha.jpg?v=travel_photoshoot_v4",
    family: "Radiant Floral",
    familyBadge: "Floral Woody",
    colorHex: "#9b6845",
    liquidColor: "from-[#633b20]/90 to-[#b57a52]/70",
    sillage: "Radiant & Lingering (8.5/10)",
    longevity: "9-11 Hours",
    bestTime: "Golden Hour · Weddings · Brunch",
    complimentScore: "96%",
    vialDescription:
      "Softly luminous French petals whipped with creamy Australian sandalwood. It feels like slipping into silk sheets in a sunlight-drenched Parisian balcony.",
    layeringRole: "accent",
    layeringTip: "Spritz across neck and wrists over an oud or amber base.",
  },
  {
    id: "rich",
    name: "Rich",
    tagline: "Cool aquatic freshness, crisp and confident",
    vibe: "COOL AQUATIC FRESHNESS · CRISP & CONFIDENT",
    character: "Crisp Oceanic",
    topNotes: "Sparkling Sea Salt, Bergamot, Frozen Grapefruit",
    heartNotes: "Mediterranean Rosemary, Cyclamen, Aquatic Flora",
    baseNotes: "Driftwood, White Cedar, Ambergris",
    img: "/discovery/travel_rich.jpg?v=travel_photoshoot_v4",
    family: "Marine Aquatic",
    familyBadge: "Aquatic Fresh",
    colorHex: "#2b4b68",
    liquidColor: "from-[#173147]/90 to-[#376185]/70",
    sillage: "Crisp High Projection (9/10)",
    longevity: "8-10 Hours",
    bestTime: "Morning · Boardrooms · Summer Sun",
    complimentScore: "95%",
    vialDescription:
      "A high-voltage slap of crisp oceanic ozone followed by mineral salinity and chilled bergamot. The olfactory equivalent of a crisp linen shirt and a sea breeze.",
    layeringRole: "accent",
    layeringTip: "Layer 1 spray over Purple Oud to create a royal nautical contrast.",
  },
  {
    id: "seductive",
    name: "Seductive",
    tagline: "Citrus and spice, effortlessly charming",
    vibe: "CITRUS & SPICE · EFFORTLESSLY CHARMING",
    character: "Zesty Spiced Allure",
    topNotes: "Italian Limon, Pink Peppercorn, Cardamom",
    heartNotes: "Lavender Provence, Nutmeg, Clary Sage",
    baseNotes: "Golden Patchouli, Sensual Amber, Oakmoss",
    img: "/discovery/travel_seductive.jpg?v=travel_photoshoot_v4",
    family: "Spicy Citrus",
    familyBadge: "Citrus Aromatic",
    colorHex: "#7b6534",
    liquidColor: "from-[#4c3e1e]/90 to-[#9e8346]/70",
    sillage: "Effortless Magnetism (8.8/10)",
    longevity: "9-11 Hours",
    bestTime: "Everyday Luxury · Late Afternoon · Cocktails",
    complimentScore: "97%",
    vialDescription:
      "Sun-kissed Italian citrus cut with cracked pink pepper and smooth French lavender. Effortlessly charming, warm, and impossible to mistake for anyone else.",
    layeringRole: "accent",
    layeringTip: "Spray on wrists over Deep Crush for a cozy spiced warmth.",
  },
  {
    id: "deep-crush",
    name: "Deep Crush",
    tagline: "Musky warm freshness, quietly intimate",
    vibe: "MUSKY WARM FRESHNESS · QUIETLY INTIMATE",
    character: "Intimate Skin Musk",
    topNotes: "White Lavender, Bergamot Zest, Clean Linen",
    heartNotes: "Turkish Rose Petals, Flue-Cured Tobacco, Violet",
    baseNotes: "Warm Amber, Velvet Sandalwood, Skin Musk",
    img: "/discovery/travel_deep_crush.jpg?v=travel_photoshoot_v4",
    family: "Velvet Musk",
    familyBadge: "Musk Woody",
    colorHex: "#564b63",
    liquidColor: "from-[#352c3f]/90 to-[#726385]/70",
    sillage: "Second-Skin Intimate (8.2/10)",
    longevity: "10-12 Hours",
    bestTime: "Bedtime · Intimate Dinners · Everyday Signature",
    complimentScore: "96%",
    vialDescription:
      "A sensual whisper of warm skin, sun-dried tobacco leaf, and milky musk. It doesn’t announce itself loudly; it draws people closer until they ask what you are wearing.",
    layeringRole: "base",
    layeringTip: "The ultimate skin base. Layer with any citrus or floral top spray.",
  },
];

// Presets for the interactive Layering Studio
const LAYERING_RECIPES = [
  {
    name: "Royal Berry Aquatica",
    base: "purple-oud",
    accent: "rich",
    ratio: "2 Sprays Purple Oud + 1 Spray Rich",
    description: "Deep Cambodian agarwood and berries brightened by an electric wave of ocean salt. Authoritative yet breezy.",
    vibe: "Executive Power & Summer Nights",
  },
  {
    name: "Spiced Tonka Mirage",
    base: "mirai",
    accent: "seductive",
    ratio: "2 Sprays MIRAI + 1 Spray Seductive",
    description: "Dark chocolate and roasted tonka kissed by zesty pink pepper and citrus. Sweet allure with a sharp bite.",
    vibe: "Irresistible Midnight Seduction",
  },
  {
    name: "Velvet Petal Woods",
    base: "deep-crush",
    accent: "calantha",
    ratio: "2 Sprays Deep Crush + 1 Spray CALANTHA",
    description: "Warm skin musk and tobacco wrapped in blooming French rose and jasmine. Soft, ultra-glamorous, and intimate.",
    vibe: "Golden Hour Romance",
  },
  {
    name: "Smoky Floral Velvet",
    base: "purple-oud",
    accent: "calantha",
    ratio: "1 Spray Purple Oud + 2 Sprays CALANTHA",
    description: "The richness of oud anchored under a bouquet of luminous white petals. Parisian haute perfumery personified.",
    vibe: "Gala & Signature Statement",
  },
];

const FAQS = [
  {
    q: "How many sprays does each 6ML vial hold?",
    a: "Each 6ML glass travel vial delivers approximately 55 to 60 ultra-fine sprays. That means with 2 sprays every single day, one single vial will last an entire month — giving you 6 months (360 sprays) of combined wear across the entire set.",
  },
  {
    q: "Why is testing on skin so much better than paper blotters?",
    a: "Paper blotters evaporate in 10 minutes and completely fail to interact with your body temperature, skin pH, and natural sebum. Extrait de Parfum evolves in three distinct stages over 8 to 12 hours. The 6ML size gives you enough volume to live with each fragrance across hot days, air-conditioned rooms, and evenings.",
  },
  {
    q: "Are the vials leak-proof for traveling in bags and flights?",
    a: "Yes. Every vial features an anodized matte black protective overcap engineered with an internal tension ring that locks tight. They are 100% compliant with airport TSA hand-luggage regulations and won’t leak inside a clutch, gym bag, or dopp kit.",
  },
  {
    q: "What oil concentration are the fragrances formulated at?",
    a: "All six fragrances in the SENTIRE Discovery Set are formulated at Haute Extrait de Parfum concentration (35%+ pure perfume oil load), ensuring profound projection and 10 to 14 hours of persistent longevity on skin and fabric.",
  },
  {
    q: "Can I redeem my purchase towards a full 50ML flacon?",
    a: "Yes! Every Discovery Set box comes with an exclusive VIP redemption card inside. Once you find your signature scent, use the enclosed code at checkout to apply a special privilege discount toward your full 50ML bottle.",
  },
  {
    q: "How fast is express delivery across India?",
    a: "All Discovery Set orders are dispatched within 24 hours from our Mumbai studio via premium express air couriers. Delivery typically takes 2 to 4 business days with real-time SMS tracking at every step.",
  },
];

export default function DiscoverySetPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
  onNavigate,
}: DiscoverySetPageProps) {
  // State management
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [selectedFragranceIndex, setSelectedFragranceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Spray simulator state
  const [spraysPerDay, setSpraysPerDay] = useState(2);

  // Layering laboratory state
  const [selectedBaseId, setSelectedBaseId] = useState("purple-oud");
  const [selectedAccentId, setSelectedAccentId] = useState("rich");

  // Sticky bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 120);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute active layering recipe or fallback
  const activeRecipe =
    LAYERING_RECIPES.find(
      (r) => r.base === selectedBaseId && r.accent === selectedAccentId
    ) || {
      name: `${DISCOVERY_FRAGRANCES.find((f) => f.id === selectedBaseId)?.name} × ${
        DISCOVERY_FRAGRANCES.find((f) => f.id === selectedAccentId)?.name
      }`,
      base: selectedBaseId,
      accent: selectedAccentId,
      ratio: "1 Spray Base + 1 Spray Accent",
      description: `A custom signature fusion of ${
        DISCOVERY_FRAGRANCES.find((f) => f.id === selectedBaseId)?.character
      } deepened with a spark of ${
        DISCOVERY_FRAGRANCES.find((f) => f.id === selectedAccentId)?.character
      }. Completely unique to your skin.`,
      vibe: "Bespoke Personal Alchemist",
    };

  const handleAddToCart = () => {
    const item = {
      productId: "discovery-set",
      name: "SENTIRE Discovery Set (6 × 6ML)",
      price: 549,
      size: 36,
      quantity,
      image: "/images/discovery-set/box-front.jpg",
      img: "/images/discovery-set/box-front.jpg",
      variantTitle: "6 × 6ML Travel Sprays (36ML Total)",
    };

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);

    onAddToCart?.(item);
  };

  const currentFragrance = DISCOVERY_FRAGRANCES[selectedFragranceIndex];
  const currentAngle = BOX_ANGLES[selectedAngleIndex];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#19140f] selection:bg-[#c89b5a] selection:text-white font-sans antialiased">
      {/* ── Breadcrumb Navigation ── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#19140f]/60 font-medium">
          <button
            onClick={onBackToHome}
            className="hover:text-[#c89b5a] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate?.("perfumes")}
            className="hover:text-[#c89b5a] transition-colors cursor-pointer"
          >
            Haute Parfumerie
          </button>
          <span>/</span>
          <span className="text-[#c89b5a] font-semibold">
            Discovery Set (6 × 6ML)
          </span>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          HERO PRODUCT SHOWCASE (Split Luxury Grid)
      ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Product Photography Suite (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Stage Display */}
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full bg-[#0b0907] rounded-2xl overflow-hidden border border-[#c89b5a]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] group">
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-extrabold bg-[#0b0907] text-[#d4af37] border border-[#c89b5a]/40 shadow-sm">
                  ★ Hero Flagship
                </span>
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold bg-[#faf8f5]/90 text-[#4a121a] border border-[#4a121a]/20 backdrop-blur-sm">
                  Oxblood Velvet Case
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] font-bold bg-[#d4af37]/20 text-[#7a591e] border border-[#c89b5a]/40 backdrop-blur-sm">
                  36ML · 6 SPRAYS
                </span>
              </div>

              {/* Main Image with Smooth Fade */}
              <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-out overflow-hidden">
                <img
                  src={currentAngle.img}
                  alt={`SENTIRE Discovery Set - ${currentAngle.label}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Angle Description Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b0907]/90 via-[#0b0907]/50 to-transparent p-5 text-white flex flex-col justify-end">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                  Angle {selectedAngleIndex + 1} of {BOX_ANGLES.length} · {currentAngle.label}
                </p>
                <p className="text-sm sm:text-base font-serif italic text-white/95 mt-0.5">
                  {currentAngle.tagline}
                </p>
                <p className="text-[11px] text-white/70 font-sans line-clamp-1 mt-0.5">
                  {currentAngle.desc}
                </p>
              </div>
            </div>

            {/* Thumbnail Angle Switcher */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {BOX_ANGLES.map((angle, idx) => {
                const isActive = idx === selectedAngleIndex;
                return (
                  <button
                    key={angle.id}
                    onClick={() => setSelectedAngleIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-1.5 flex flex-col items-center justify-center cursor-pointer ${
                      isActive
                        ? "border-[#c89b5a] bg-white shadow-md ring-2 ring-[#c89b5a]/30 scale-[1.02]"
                        : "border-[#e0d6c8] bg-[#f5ede2]/60 hover:border-[#c89b5a]/50 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={angle.img}
                      alt={angle.label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span
                      className={`absolute bottom-1 inset-x-1 text-[8px] sm:text-[9px] font-semibold text-center truncate px-1 rounded ${
                        isActive
                          ? "bg-[#0b0907] text-[#d4af37]"
                          : "bg-white/85 text-[#19140f]/80"
                      }`}
                    >
                      {angle.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick trust strip */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#c89b5a]/20 text-center">
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#c89b5a]/15 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#c89b5a] font-bold">Volume</p>
                <p className="text-xs font-semibold text-[#19140f] mt-0.5">6 × 6ML (36ML)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#c89b5a]/15 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#c89b5a] font-bold">Spray Count</p>
                <p className="text-xs font-semibold text-[#19140f] mt-0.5">~360 Fine Mists</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-[#c89b5a]/15 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#c89b5a] font-bold">Portability</p>
                <p className="text-xs font-semibold text-[#19140f] mt-0.5">TSA & Clutch Safe</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Intent & Purchasing Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Brand kicker */}
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-[#c89b5a]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#c89b5a] font-extrabold">
                  SENTIRE HAUTE PARFUMERIE
                </span>
              </div>

              {/* Title & Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.1] font-serif font-normal text-[#120e0b] tracking-tight">
                SENTIRE Discovery Set
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-serif italic text-[#c89b5a] font-medium">
                Six fragrances. One box. Find the one that's yours.
              </p>
            </div>

            {/* Rating and Social Proof Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#e5dcce]">
              <div className="flex items-center text-[#d4af37] text-sm">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-[#c89b5a]">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs font-bold text-[#19140f]">4.9</span>
              <span className="text-xs text-[#19140f]/60 underline">
                (428 verified reviews)
              </span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#4a121a]/10 text-[#4a121a] rounded">
                Selling Fast
              </span>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#f6f1ea] to-[#efe7db] border border-[#c89b5a]/30 shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#19140f] tabular-nums">
                  ₹549
                </span>
                <span className="text-base text-[#19140f]/45 line-through tabular-nums">
                  ₹999
                </span>
                <span className="px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider bg-[#4a121a] text-[#f7e7ce] rounded-full">
                  Save 45%
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#19140f]/80">
                <span className="font-medium text-[#846124]">
                  ⚡ Only ₹91.50 per 6ML travel spray
                </span>
                <span className="font-semibold text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Narrative Editorial Quote */}
            <blockquote className="border-l-2 border-[#c89b5a] pl-4 py-1 text-sm sm:text-base font-serif italic text-[#19140f]/85 leading-relaxed bg-[#f9f5ef]/70 rounded-r-lg">
              “Choosing a signature scent shouldn't mean committing to a full bottle you've never smelled. The SENTIRE Discovery Set gives you six of our fragrances in 6ML travel sprays — enough to live with each one properly, on your own skin, across your own days.”
            </blockquote>

            {/* Six Vials Mini-Switcher Preview */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#19140f]/75 mb-2.5 flex items-center justify-between">
                <span>The Six Fragrances Included:</span>
                <span className="text-[#c89b5a] text-[10px] lowercase italic font-serif">
                  tap to preview below
                </span>
              </p>
              <div className="grid grid-cols-6 gap-2">
                {DISCOVERY_FRAGRANCES.map((frag, idx) => {
                  const isSelected = idx === selectedFragranceIndex;
                  return (
                    <button
                      key={frag.id}
                      onClick={() => setSelectedFragranceIndex(idx)}
                      className={`group relative p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#c89b5a] bg-white shadow-md ring-2 ring-[#c89b5a]/30"
                          : "border-[#e6ded1] bg-[#f8f3eb] hover:border-[#c89b5a]/40"
                      }`}
                      title={frag.name}
                    >
                      <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-lg">
                        <img
                          src={frag.img}
                          alt={frag.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-center truncate w-full mt-1 text-[#19140f]">
                        {frag.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#19140f]/70 mt-2 font-medium">
                Active preview: <strong className="text-[#c89b5a]">{currentFragrance.name}</strong> — {currentFragrance.tagline}
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Qty Pill */}
                <div className="flex items-center border border-[#c89b5a]/40 rounded-xl bg-white px-2 py-1 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-9 flex items-center justify-center text-lg font-bold text-[#19140f] hover:text-[#c89b5a] disabled:opacity-30 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-8 h-9 flex items-center justify-center text-lg font-bold text-[#19140f] hover:text-[#c89b5a] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    addedAnimation
                      ? "bg-emerald-700 text-white scale-[0.99]"
                      : "bg-[#0b0907] hover:bg-[#201914] text-[#d4af37] hover:shadow-[0_10px_25px_rgba(200,155,90,0.35)] active:scale-[0.98]"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <span>✓ Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add To Cart</span>
                      <span>·</span>
                      <span className="tabular-nums">₹{(549 * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Fast Buy Now */}
              <button
                onClick={() => {
                  handleAddToCart();
                  setTimeout(() => onOpenCart?.(), 200);
                }}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-[#d4af37] via-[#c89b5a] to-[#a37c3f] text-[#0b0907] hover:brightness-105 shadow-md active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                Instant Buy & Checkout Now →
              </button>
            </div>

            {/* Perks & Shipping Guarantees */}
            <div className="pt-2 border-t border-[#e2d8c9] space-y-2 text-xs text-[#19140f]/75">
              <div className="flex items-center gap-2.5">
                <span className="text-[#c89b5a] text-base">✈</span>
                <span><strong>Free Express Shipping</strong> across India (Arrives in 2-4 days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#c89b5a] text-base">🔒</span>
                <span><strong>Zero-Risk Discovery</strong>: Includes VIP discount card for full 50ML flacon</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#c89b5a] text-base">🛡</span>
                <span><strong>Anodized Leak-Proof Sprays</strong>: 100% TSA carry-on and purse approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: "WHAT'S INSIDE" — STEPPED VIALS SCENT EXPLORER
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0d0a08] text-[#fbf8f3] relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c89b5a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#4a121a]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-extrabold bg-[#c89b5a]/15 text-[#d4af37] border border-[#c89b5a]/30">
              The 6ML Curation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              What’s Inside the Case
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-white/80 leading-relaxed">
              Six 6ML sprays, presented in a matte black flip-top case with a gold SENTIRE emblem and an oxblood interior. Each vial sits in a stepped layout so the full set is visible the moment you open it. A scent-map card inside guides you through all six.
            </p>
          </div>

          {/* Stepped Scent Selector Tabs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DISCOVERY_FRAGRANCES.map((frag, idx) => {
              const isActive = idx === selectedFragranceIndex;
              return (
                <button
                  key={frag.id}
                  onClick={() => setSelectedFragranceIndex(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#c89b5a] text-[#0b0907] shadow-[0_0_20px_rgba(200,155,90,0.4)] font-bold scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: frag.colorHex }}
                  />
                  <span>{frag.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Fragrance Deep-Dive Spotlight Card */}
          <div className="mt-10 bg-gradient-to-b from-[#18130f] to-[#120e0b] border border-[#c89b5a]/35 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Upright Authentic Vial Showcase (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                {/* Glowing radial disc */}
                <div
                  className="w-64 sm:w-80 aspect-square rounded-full absolute -z-10 blur-2xl opacity-30"
                  style={{ backgroundColor: currentFragrance.colorHex }}
                />

                <div className="relative aspect-[3/5] w-64 sm:w-72 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-between shadow-2xl backdrop-blur-md group">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    <span>SENTIRE HAUTE</span>
                    <span className="text-[#d4af37]">6ML EXTRAIT</span>
                  </div>

                  <div className="h-4/5 w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={currentFragrance.img}
                      alt={currentFragrance.name}
                      className="max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="w-full text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      {currentFragrance.name}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>55–60 Sprays · Anodized Atomiser</span>
                </div>
              </div>

              {/* Right: Scent Identity & Notes Breakdown (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-extrabold bg-[#c89b5a]/20 text-[#d4af37] border border-[#c89b5a]/40">
                      {currentFragrance.familyBadge}
                    </span>
                    <span className="text-xs text-white/50 font-mono">
                      Compliment Index: {currentFragrance.complimentScore}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-white">
                    {currentFragrance.name}
                  </h3>
                  <p className="text-base sm:text-lg font-serif italic text-[#c89b5a] mt-1">
                    {currentFragrance.tagline}
                  </p>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed font-sans">
                    {currentFragrance.vialDescription}
                  </p>
                </div>

                {/* Olfactory Note Pyramid */}
                <div className="space-y-3 bg-black/40 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89b5a] w-14 shrink-0 pt-0.5">
                      Top
                    </span>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">
                      {currentFragrance.topNotes}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89b5a] w-14 shrink-0 pt-0.5">
                      Heart
                    </span>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">
                      {currentFragrance.heartNotes}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89b5a] w-14 shrink-0 pt-0.5">
                      Base
                    </span>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">
                      {currentFragrance.baseNotes}
                    </span>
                  </div>
                </div>

                {/* Sillage, Longevity & Wear Context Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-[#c89b5a] font-bold">Projection / Sillage</p>
                    <p className="text-xs font-semibold text-white mt-1">{currentFragrance.sillage}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-[#c89b5a] font-bold">Skin Longevity</p>
                    <p className="text-xs font-semibold text-white mt-1">{currentFragrance.longevity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-[#c89b5a] font-bold">Best Setting</p>
                    <p className="text-xs font-semibold text-white mt-1 truncate">{currentFragrance.bestTime}</p>
                  </div>
                </div>

                {/* Layering Pro-Tip */}
                <div className="p-3.5 rounded-xl bg-[#4a121a]/20 border border-[#4a121a]/40 flex items-center gap-3">
                  <span className="text-base text-[#d4af37]">✨</span>
                  <div className="text-xs">
                    <strong className="text-[#d4af37] uppercase tracking-wider">Layering Role ({currentFragrance.layeringRole}):</strong>{" "}
                    <span className="text-white/80">{currentFragrance.layeringTip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of all 6 Vials for Fast Comparison */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCOVERY_FRAGRANCES.map((frag, idx) => (
              <div
                key={frag.id}
                onClick={() => setSelectedFragranceIndex(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  idx === selectedFragranceIndex
                    ? "bg-[#1f1914] border-[#c89b5a] shadow-[0_10px_30px_rgba(200,155,90,0.15)]"
                    : "bg-[#14100d] border-white/8 hover:border-white/20 hover:bg-[#1a1410]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 aspect-[3/4] shrink-0 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={frag.img}
                      alt={frag.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c89b5a]">
                      No. 0{idx + 1} · {frag.character}
                    </span>
                    <h4 className="text-lg font-serif text-white mt-0.5">
                      {frag.name}
                    </h4>
                    <p className="text-xs font-serif italic text-white/70 mt-1">
                      {frag.tagline}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                  <span>{frag.family}</span>
                  <span className="text-[#c89b5a] font-medium group-hover:underline">
                    View Notes →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: "WHY 6ML MATTERS" — REAL SKIN WEAR VS PAPER STRIP
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#faf5ee] border-y border-[#c89b5a]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-extrabold bg-[#0b0907] text-[#d4af37]">
              The Scent Science
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18130f]">
              Why 6ML Matters
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-[#19140f]/80 leading-relaxed">
              “Each vial holds roughly 55 to 60 sprays — around a month of wear if you're using it a couple of times a day. This isn't a paper strip in a store. It's enough to know how a fragrance behaves on you, in the evening, hours after you put it on.”
            </p>
          </div>

          {/* Comparison Matrix: Paper Strip vs SENTIRE 6ML */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* The Old Way: Mall Paper Strip */}
            <div className="p-8 rounded-3xl bg-white border border-red-200/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold bg-red-100 text-red-700">
                  The Outdated Mall Way
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#18130f]">
                Department Store Paper Strip
              </h3>
              <p className="text-xs text-[#19140f]/60 mt-1">
                Why 80% of full-bottle blind purchases end in regret
              </p>

              <ul className="mt-6 space-y-4 text-xs sm:text-sm text-[#19140f]/75">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Fades in 10 Minutes</strong>: Paper blotters don't have warmth, natural skin oils, or perspiration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Masks the Drydown</strong>: You only smell top notes; base amber and agarwood never bloom properly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Olfactory Fatigue</strong>: Store air is saturated with 50 other perfumes, confusing your senses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>High Financial Risk</strong>: Forcing a ₹2,000–₹5,000 blind purchase after a 5-second sniff.</span>
                </li>
              </ul>
            </div>

            {/* The SENTIRE Way: 6ML Luxury Vials */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1b1511] to-[#0b0907] text-white border-2 border-[#c89b5a] shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-extrabold bg-[#d4af37] text-[#0b0907]">
                  The SENTIRE Way
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#d4af37]">
                SENTIRE 6ML Travel Extrait
              </h3>
              <p className="text-xs text-white/60 mt-1">
                True intimate luxury tested on your skin across weeks
              </p>

              <ul className="mt-6 space-y-4 text-xs sm:text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span><strong>55 to 60 Fine-Mist Sprays</strong>: One full month of real daily skin wear per fragrance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span><strong>True Skin Chemistry</strong>: Observe how body heat transforms delicate florals and rich Cambodian oud across 12 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span><strong>Clutch & Carry-on Safe</strong>: Anodized leak-proof protective overcap prevents accidental spills in transit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span><strong>Total Freedom</strong>: Find your genuine signature fragrance without spending thousands up front.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Spray Calculator */}
          <div className="mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#c89b5a]/30 shadow-md">
            <div className="text-center max-w-xl mx-auto">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#18130f]">
                Calculate Your Wear Time Across 36ML
              </h4>
              <p className="text-xs text-[#19140f]/70 mt-1">
                Choose your average daily sprays to see how long the set lasts you:
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {[1, 2, 3, 4].map((sprays) => (
                <button
                  key={sprays}
                  onClick={() => setSpraysPerDay(sprays)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    spraysPerDay === sprays
                      ? "bg-[#0b0907] text-[#d4af37] shadow-md scale-105"
                      : "bg-[#f5ede2] text-[#19140f]/70 hover:bg-[#c89b5a]/20"
                  }`}
                >
                  {sprays} {sprays === 1 ? "Spray / Day" : "Sprays / Day"}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e6dcce]">
                <p className="text-[10px] uppercase tracking-widest text-[#c89b5a] font-extrabold">Total Sprays</p>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#18130f] mt-1">360</p>
                <p className="text-[11px] text-[#19140f]/60 mt-0.5">60 sprays × 6 vials</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e6dcce]">
                <p className="text-[10px] uppercase tracking-widest text-[#c89b5a] font-extrabold">Days of Continuous Wear</p>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#4a121a] mt-1">
                  {Math.round(360 / spraysPerDay)} Days
                </p>
                <p className="text-[11px] text-[#19140f]/60 mt-0.5">
                  {(360 / spraysPerDay / 30).toFixed(1)} months of fragrance
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#e6dcce]">
                <p className="text-[10px] uppercase tracking-widest text-[#c89b5a] font-extrabold">Cost Per Day</p>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#18130f] mt-1">
                  ₹{(549 / (360 / spraysPerDay)).toFixed(2)}
                </p>
                <p className="text-[11px] text-[#19140f]/60 mt-0.5">Haute perfumery value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: "HOW TO WEAR THE SET" & INTERACTIVE LAYERING LAB
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-extrabold bg-[#c89b5a]/20 text-[#846124] border border-[#c89b5a]/30">
              The 3-Step Scent Ritual
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#19140f]">
              How to Wear the Set
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-[#19140f]/80 leading-relaxed">
              “Give each fragrance its own day. Notice which one people mention. Then try layering two — a warm base under something brighter — and you'll have a scent nobody else is wearing.”
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#e8dfd2] shadow-sm relative group hover:border-[#c89b5a] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0b0907] text-[#d4af37] font-serif font-bold text-xl flex items-center justify-center mb-6">
                01
              </div>
              <h3 className="text-xl font-serif font-bold text-[#19140f]">
                Give Each Its Own Day
              </h3>
              <p className="text-xs sm:text-sm text-[#19140f]/75 mt-3 leading-relaxed">
                Apply on pulse points (inside wrists, side of neck) in the morning. Notice how the top citrus or berries soften into warm amber and florals as your body temperature rises throughout the day.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#e8dfd2] shadow-sm relative group hover:border-[#c89b5a] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0b0907] text-[#d4af37] font-serif font-bold text-xl flex items-center justify-center mb-6">
                02
              </div>
              <h3 className="text-xl font-serif font-bold text-[#19140f]">
                The Compliment Test
              </h3>
              <p className="text-xs sm:text-sm text-[#19140f]/75 mt-3 leading-relaxed">
                Pay attention to what strangers, friends, and partners notice. A signature scent isn't just what smells pleasant in a bottle; it's what leaves an unforgettable scent trail in your wake.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-[#e8dfd2] shadow-sm relative group hover:border-[#c89b5a] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0b0907] text-[#d4af37] font-serif font-bold text-xl flex items-center justify-center mb-6">
                03
              </div>
              <h3 className="text-xl font-serif font-bold text-[#19140f]">
                Layer Like an Alchemist
              </h3>
              <p className="text-xs sm:text-sm text-[#19140f]/75 mt-3 leading-relaxed">
                Never smell like anyone else. Lay down a deep, warm base (Purple Oud or MIRAI) and veil it with an aquatic or citrus high note (Rich or Seductive). Use our Layering Studio below!
              </p>
            </div>
          </div>

          {/* ── THE INTERACTIVE LAYERING LABORATORY ── */}
          <div className="mt-16 bg-gradient-to-br from-[#120e0b] via-[#1a1410] to-[#0c0907] rounded-3xl p-6 sm:p-12 text-white border border-[#c89b5a]/40 shadow-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] font-extrabold bg-[#d4af37]/20 text-[#d4af37] border border-[#c89b5a]/30">
                Interactive Scent Alchemist
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white">
                SENTIRE Layering Laboratory
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                Pair a warm base with a bright top note to create a bespoke formula that exists nowhere else.
              </p>
            </div>

            {/* Pairing Selectors */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* SELECT BASE NOTE */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c89b5a] flex items-center justify-between">
                  <span>Step A: Choose Deep Base Note</span>
                  <span className="text-white/40">Chest & Pulse Points</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {DISCOVERY_FRAGRANCES.slice(0, 3).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedBaseId(f.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedBaseId === f.id
                          ? "border-[#c89b5a] bg-[#c89b5a]/20 text-white font-bold"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-xs font-serif">{f.name}</p>
                      <p className="text-[9px] text-white/50 truncate">{f.character}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECT ACCENT NOTE */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c89b5a] flex items-center justify-between">
                  <span>Step B: Choose Bright Accent Note</span>
                  <span className="text-white/40">Neck & Collar</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {DISCOVERY_FRAGRANCES.slice(3, 6).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedAccentId(f.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedAccentId === f.id
                          ? "border-[#c89b5a] bg-[#c89b5a]/20 text-white font-bold"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-xs font-serif">{f.name}</p>
                      <p className="text-[9px] text-white/50 truncate">{f.character}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Blend Output Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1e1712] via-[#241a15] to-[#1e1712] border border-[#c89b5a]/50 text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b0907] border border-[#c89b5a]/40 text-[#d4af37] text-[10px] font-mono tracking-widest uppercase">
                <span>✦ Custom Blend Formula</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-serif text-white">
                {activeRecipe.name}
              </h4>
              <p className="text-xs sm:text-sm font-mono text-[#d4af37] uppercase tracking-wider">
                Ratio: {activeRecipe.ratio}
              </p>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/80 font-serif italic leading-relaxed">
                "{activeRecipe.description}"
              </p>
              <p className="text-[11px] text-white/50 uppercase tracking-widest pt-2">
                Vibe: {activeRecipe.vibe}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: PACKAGING & CRAFT ("THE COOLEST THING SOMEBODY CAN OWN")
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0a0705] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: The Authentic Warning Box Shot (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-[#c89b5a]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <img
                  src="/images/discovery-set/box-warning.jpg"
                  alt="WARNING: The COOLEST Thing SOMEBODY can OWN"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                    ACTUAL PACKAGING COPY
                  </span>
                  <p className="text-lg font-serif italic text-white mt-1">
                    “WARNING: The COOLEST Thing SOMEBODY can OWN. just feel it”
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Architectural Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-extrabold bg-[#4a121a] text-[#f7e7ce] border border-[#c89b5a]/40">
                Packaging Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
                Matte Black. Oxblood Velvet. Stepped Revelation.
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-serif italic">
                From the weighted tactile snap of the flip-top magnetic clasp to the rich oxblood interior tiering, the SENTIRE Discovery Set was designed not as sample packaging, but as a luxury keepsake flacon collection.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c89b5a]/20 text-[#d4af37] flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Stepped Tiered Architecture
                    </h4>
                    <p className="text-xs text-white/70 mt-0.5">
                      Each 6ML vial rests in an elevated staircase tray, allowing you to view all six bottles simultaneously the instant you flip the case open.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c89b5a]/20 text-[#d4af37] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Oxblood Velvet Interior
                    </h4>
                    <p className="text-xs text-white/70 mt-0.5">
                      Deep burgundy velvet lining cushions the glass vials against vibration and shock, preserving the concentrated perfume oils during flights and commute.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c89b5a]/20 text-[#d4af37] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Included Scent-Map Guide Card
                    </h4>
                    <p className="text-xs text-white/70 mt-0.5">
                      An embossed heavy-stock card tucked into the lid guides your journey through olfactory families, notes pyramids, and compliment profiles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-8 rounded-xl bg-[#c89b5a] text-[#0b0907] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  Acquire the Set — ₹549
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: CUSTOMER REVIEWS & UNBOXING LOVE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#faf6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89b5a] font-extrabold">
              Real Impressions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#19140f]">
              Loved by Scent Connoisseurs
            </h2>
            <p className="text-xs sm:text-sm text-[#19140f]/70">
              Verified buyers on skin chemistry, projection, and the 6ML format.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5dccd] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center text-[#c89b5a] text-xs">
                  ★★★★★
                </div>
                <p className="text-sm font-serif italic text-[#19140f]/90 mt-3 leading-relaxed">
                  “The 6ML size is pure genius. I wore Purple Oud to an evening event and received three separate compliment inquiries. I bought the 50ML flacon the next morning!”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0e8dc] flex items-center justify-between text-xs">
                <span className="font-bold text-[#19140f]">Aarav M.</span>
                <span className="text-emerald-700 font-medium">✓ Verified Buyer</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dccd] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center text-[#c89b5a] text-xs">
                  ★★★★★
                </div>
                <p className="text-sm font-serif italic text-[#19140f]/90 mt-3 leading-relaxed">
                  “The box warning says ‘The COOLEST Thing SOMEBODY can OWN’ and honestly it’s not exaggerating. The matte black case and oxblood interior look incredible on my vanity.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0e8dc] flex items-center justify-between text-xs">
                <span className="font-bold text-[#19140f]">Rhea K.</span>
                <span className="text-emerald-700 font-medium">✓ Verified Buyer</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5dccd] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center text-[#c89b5a] text-xs">
                  ★★★★★
                </div>
                <p className="text-sm font-serif italic text-[#19140f]/90 mt-3 leading-relaxed">
                  “Layering MIRAI with Seductive gives you this insane warm spiced cocoa aroma that lasts till the morning after. For ₹549 this is without question the best discovery set in India.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f0e8dc] flex items-center justify-between text-xs">
                <span className="font-bold text-[#19140f]">Kabir S.</span>
                <span className="text-emerald-700 font-medium">✓ Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: FAQ ACCORDION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f4ece1] border-t border-[#c89b5a]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89b5a] font-extrabold">
              Curated Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#19140f]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#e2d7c7] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-[#19140f] hover:text-[#c89b5a] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono text-[#c89b5a] ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-[#19140f]/80 leading-relaxed border-t border-[#f5ede2] pt-3 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM CALL TO ACTION BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0b0907] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.28em] font-extrabold bg-[#c89b5a]/20 text-[#d4af37] border border-[#c89b5a]/40">
            36ML · 6 TRAVEL SPRAYS · ₹549
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif">
            Find the Scent That Belongs to Your Skin.
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-white/80 max-w-xl mx-auto">
            Six distinct olfactory identities in fine-mist travel vials. Dispatched within 24 hours with express courier tracking across India.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="py-4 px-8 rounded-xl bg-[#c89b5a] hover:bg-[#d4af37] text-[#0b0907] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              Add To Cart — ₹549
            </button>
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="py-4 px-8 rounded-xl bg-transparent border border-white/30 hover:border-[#c89b5a] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Explore Full 50ML Bottles
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STICKY MOBILE PURCHASE BAR (Appears on Scroll)
      ───────────────────────────────────────────────────────────── */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0b0907]/95 backdrop-blur-xl border-t border-[#c89b5a]/40 p-3 sm:p-4 text-white shadow-2xl transition-all animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/images/discovery-set/box-front.jpg"
                alt="Discovery Set"
                className="w-10 h-10 object-contain rounded-lg bg-[#1a1410] border border-[#c89b5a]/30 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-serif font-bold text-white truncate">
                  SENTIRE Discovery Set
                </p>
                <p className="text-[10px] text-[#d4af37] font-mono truncate">
                  6 × 6ML · ₹549 (Save 45%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAddToCart}
                className="py-2.5 px-5 rounded-xl bg-[#c89b5a] hover:bg-[#d4af37] text-[#0b0907] font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Add to Cart</span>
                <span className="hidden sm:inline">· ₹549</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
