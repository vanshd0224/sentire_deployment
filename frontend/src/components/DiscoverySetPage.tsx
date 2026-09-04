import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageName } from "../types/appTypes";

// Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

interface DiscoverySetPageProps {
  onAddToCart?: (item: any, size?: number, price?: number) => void;
  onOpenCart?: () => void;
  onBackToHome?: () => void;
  onNavigate?: (page: PageName) => void;
}

// Scents Data for Sensory Radar & Note Pyramids
const SCENTS_DATA = [
  {
    name: "Purple Oud",
    tagline: "Exotic Woody Oriental",
    stage1Name: "Candied Violet Petals & Pink Pepper",
    stage1Desc: "A crystalline, sweet-floral opening that diffuses instantly off warm skin without synthetic harshness.",
    stage2Name: "Smoked Frankincense Resin & Myrrh",
    stage2Desc: "The core fragrance warms into a regal balsamic warmth, projecting an enigmatic aura.",
    stage3Name: "Wild Cambodian Agarwood & Ambergris",
    stage3Desc: "The final intimate skin signature. Deep, smoky, and dangerously memorable for hours.",
    longevity: "14+ Hours",
    longevityPct: 95,
    projection: "6–8 Feet (Magnetic)",
    projectionPct: 88,
    intensity: "9.4 / 10 (High Impact)",
    intensityPct: 94,
    concentration: "35% Pure Extrait",
    occasion: "Boardroom • Gala",
    season: "All-Season • Night",
    character: "Authoritative",
    moodDay: "Monday • The Boardroom",
    colorDot: "bg-purple-500 shadow-[0_0_10px_#a855f7]",
    auraQuote: "\"You don't enter a room to demand attention. Your presence settles over the space like frankincense smoke in an ancient sanctuary — quiet, immovable, and unforgettable.\""
  },
  {
    name: "Mirai",
    tagline: "Crisp Green Floral & Solar Woods",
    stage1Name: "Solar Jasmine & Crisp Green Pear",
    stage1Desc: "An invigorating 8am burst of sun-drenched orchard fruit and delicate morning blossom.",
    stage2Name: "White Tea Leaves & Moroccan Neroli",
    stage2Desc: "A luminous, clean heart that creates an aura of effortless composure throughout the working day.",
    stage3Name: "White Cedarwood & Soft Musk",
    stage3Desc: "A serene, clean-skin drydown that lingers close to collarbones like fresh sunlit linen.",
    longevity: "12+ Hours",
    longevityPct: 82,
    projection: "4–6 Feet (Radiant)",
    projectionPct: 75,
    intensity: "8.2 / 10 (Uplifting)",
    intensityPct: 82,
    concentration: "35% Pure Extrait",
    occasion: "Morning Reset • Executive Work",
    season: "Spring / Summer • Day",
    character: "Crisp & Luminous",
    moodDay: "Tuesday • Clean Start",
    colorDot: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
    auraQuote: "\"You move through chaotic mornings with an effortless calm that disarms everyone around you. Your scent is the crisp first breath of dawn.\""
  },
  {
    name: "Rich",
    tagline: "Spiced Saffron & Ambergris",
    stage1Name: "Pure Kashmiri Saffron & Raw Honey",
    stage1Desc: "A rich golden opening that commands immediate attention with velvet warmth.",
    stage2Name: "Damask Rose Absolute & Nutmeg",
    stage2Desc: "Spiced floral richness that blooms under body heat, exuding undeniable prestige.",
    stage3Name: "Bourbon Vanilla & Aged Sandalwood",
    stage3Desc: "A creamy, hypnotic drydown that leaves an unforgettable signature trail.",
    longevity: "16+ Hours",
    longevityPct: 98,
    projection: "8–10 Feet (Beast Sillage)",
    projectionPct: 96,
    intensity: "9.8 / 10 (Opulent)",
    intensityPct: 98,
    concentration: "35% Pure Extrait",
    occasion: "Signature Everyday • High Stakes",
    season: "All-Season • Day & Night",
    character: "Opulent Prestige",
    moodDay: "Wednesday • Quiet Confidence",
    colorDot: "bg-amber-500 shadow-[0_0_10px_#f59e0b]",
    auraQuote: "\"You never have to speak loudly because the room always leans in to listen. Your sillage is liquid gold that refuses to be ignored.\""
  },
  {
    name: "Seductive",
    tagline: "Intimate Amber & Spiced Florals",
    stage1Name: "Macerated Spiced Plum & Italian Bergamot",
    stage1Desc: "A tantalizing, juicy opening with a whisper of clove and velvet darkness.",
    stage2Name: "Turkish Damask Rose & Night Tuberose",
    stage2Desc: "A deep, narcotic floral heart formulated specifically for candlelit proximity.",
    stage3Name: "Madagascar Vanilla & Indonesian Patchouli",
    stage3Desc: "A sensual, magnetic trail that clings to skin and fabric long past midnight.",
    longevity: "14+ Hours",
    longevityPct: 92,
    projection: "5–7 Feet (Intimate to Magnetic)",
    projectionPct: 84,
    intensity: "9.0 / 10 (Magnetic)",
    intensityPct: 90,
    concentration: "35% Pure Extrait",
    occasion: "Dinner Date • Intimate Evenings",
    season: "Autumn / Winter • Evening",
    character: "Sensual & Dangerous",
    moodDay: "Thursday • Dinner Date",
    colorDot: "bg-rose-500 shadow-[0_0_10px_#f43f5e]",
    auraQuote: "\"You leave an intoxicating trace that turns casual glances into lingering memories. Dangerous, tender, and impossible to forget.\""
  },
  {
    name: "Deep Crush",
    tagline: "Charred Woods & French Cognac",
    stage1Name: "Macerated Black Cherry & French Cognac",
    stage1Desc: "An intoxicating rush of dark fruits steeped in oak barrels and roasted spices.",
    stage2Name: "French Lavender & Charred Oakwood",
    stage2Desc: "Smoky, aromatic complexity that cuts through crowded rooms with razor sharpness.",
    stage3Name: "Roasted Praline & Smoked Amber",
    stage3Desc: "A decadent, dark-gourmand drydown that projects magnetically until 4am.",
    longevity: "15+ Hours",
    longevityPct: 96,
    projection: "7–9 Feet (Party Sillage)",
    projectionPct: 92,
    intensity: "9.6 / 10 (Electric)",
    intensityPct: 96,
    concentration: "35% Pure Extrait",
    occasion: "Night Out • Gala & Afterparty",
    season: "All-Season • Deep Night",
    character: "Electric & Bold",
    moodDay: "Saturday • Night Out",
    colorDot: "bg-indigo-500 shadow-[0_0_10px_#6366f1]",
    auraQuote: "\"You bring electric energy into every room you enter. Midnight belongs to you, and your scent leaves an unforgettable headline.\""
  },
  {
    name: "Calantha",
    tagline: "Velvet Cashmere & Bourbon Vanilla",
    stage1Name: "Lavender Sprigs & Crushed White Florals",
    stage1Desc: "Soft, pillowy botanical freshness that wraps around skin like cashmere silk.",
    stage2Name: "Steamed Rice accord & White Sandalwood",
    stage2Desc: "A cocooning, intimate warmth designed for unhurried mornings and peaceful solitude.",
    stage3Name: "Toasted Tonka Bean & Bourbon Vanilla",
    stage3Desc: "A whisper-soft, golden drydown that feels like doing absolutely nothing, beautifully.",
    longevity: "12+ Hours",
    longevityPct: 84,
    projection: "3–5 Feet (Intimate Envelope)",
    projectionPct: 70,
    intensity: "7.8 / 10 (Comforting)",
    intensityPct: 78,
    concentration: "35% Pure Extrait",
    occasion: "Slow Sunday • Intimate Comfort",
    season: "All-Season • Anytime",
    character: "Cocooning & Serene",
    moodDay: "Sunday • Slow Sunday",
    colorDot: "bg-sky-400 shadow-[0_0_10px_#38bdf8]",
    auraQuote: "\"You understand the rare luxury of slow time. Your presence feels like a quiet sanctuary, wrapped in cashmere and soft light.\""
  }
];

// Occasions Wardrobe
const OCCASIONS = [
  {
    day: "Monday",
    name: "The Boardroom",
    scent: "Purple Oud",
    conc: "6ml Extrait",
    desc: "Smoked Cambodian agarwood, frankincense, and candied violet. Scent equivalent of commanding the room quietly.",
    img: "/occasion_cards/monday_boardroom_purple_oud.jpg",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  {
    day: "Tuesday",
    name: "Clean Start",
    scent: "Mirai",
    conc: "6ml Extrait",
    desc: "Solar jasmine blossom, crisp green pear, and white cedarwood. The 8am reset when you need the world to feel light.",
    img: "/occasion_cards/tuesday_clean_start_mirai.jpg",
    glow: "rgba(16, 185, 129, 0.15)"
  },
  {
    day: "Wednesday",
    name: "Quiet Confidence",
    scent: "Rich",
    conc: "6ml Extrait",
    desc: "Pure Kashmiri saffron steeped in raw honey, bourbon vanilla beans, and aged sandalwood. Understated prestige.",
    img: "/occasion_cards/wednesday_quiet_confidence_rich.jpg",
    glow: "rgba(245, 158, 11, 0.15)"
  },
  {
    day: "Thursday",
    name: "Dinner Date",
    scent: "Seductive",
    conc: "6ml Extrait",
    desc: "Spiced plum and Turkish damask rose over Madagascar vanilla patchouli. An intimate sillage for candlelight.",
    img: "/occasion_cards/thursday_dinner_date_seductive.jpg",
    glow: "rgba(244, 63, 94, 0.15)"
  },
  {
    day: "Saturday",
    name: "Night Out",
    scent: "Deep Crush",
    conc: "6ml Extrait",
    desc: "Macerated dark plums, black cherries steeped in French cognac, charred oakwood, and roasted praline.",
    img: "/occasion_cards/saturday_night_out_deep_crush.jpg",
    glow: "rgba(99, 102, 241, 0.15)"
  },
  {
    day: "Sunday",
    name: "Slow Sunday",
    scent: "Calantha",
    conc: "6ml Extrait",
    desc: "Bourbon vanilla, lavender sprigs, and toasted tonka cashmere. Soft — for doing absolutely nothing, beautifully.",
    img: "/occasion_cards/sunday_slow_sunday_calantha.jpg",
    glow: "rgba(56, 189, 248, 0.15)"
  }
];

// Master Campaign Gallery Images
const CAROUSEL_IMAGES = [
  {
    src: "/images/discovery/hero_dramatic_noir_travertine.jpg",
    title: "Master Campaign: Dramatic Noir on Travertine Stone Pedestal",
    tag: "Signature Composition"
  },
  {
    src: "/images/discovery/hero_light_travertine_botanical.jpg",
    title: "Warm Botanical: Natural Sunlight & Lavender Flora",
    tag: "Botanical Sunlight"
  },
  {
    src: "/images/discovery/hero_3_variations_mood.jpg",
    title: "Editorial Split: 3 Ambient Mood Variations",
    tag: "Atmospheric Palette"
  }
];

export default function DiscoverySetPage({
  onAddToCart,
  onOpenCart,
  onBackToHome,
  onNavigate
}: DiscoverySetPageProps) {
  // Hero Mood Switcher: "noir" vs "botanical"
  const [heroMood, setHeroMood] = useState<"noir" | "botanical">("noir");

  // Section 3 Active Scents
  const [activeScentIdx, setActiveScentIdx] = useState(0);

  // Section 4 Carousel & Quantity
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Section 5 4D Aura Matrix Vectors
  const [vectors, setVectors] = useState({ pace: 0, atmos: 0, time: 0, energy: 0 });

  // Auto slide effect for gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Compute matched scent for Aura Matrix
  const matchedScentIdx = (vectors.pace + vectors.atmos + vectors.time + vectors.energy) % 6;
  const matchedScent = SCENTS_DATA[matchedScentIdx];
  const matchedOccasion = OCCASIONS[matchedScentIdx];

  const handleAcquire = () => {
    if (onAddToCart) {
      onAddToCart(
        {
          id: "sentire-discovery-coffret-6x6ml",
          productId: "discovery-set-package",
          variantId: "46965136031905",
          name: "The Discovery Coffret (6 x 6ml Extrait de Parfum)",
          price: 549,
          originalPrice: 2400,
          quantity: quantity,
          size: 36,
          img: "/images/discovery/hero_dramatic_noir_travertine.jpg",
          image: "/images/discovery/hero_dramatic_noir_travertine.jpg"
        },
        36,
        549
      );
    }
  };

  const handleDirectCheckout = () => {
    handleAcquire();
    if (onOpenCart) onOpenCart();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentScent = SCENTS_DATA[activeScentIdx];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#14110D] font-sans selection:bg-[#B8863B]/20 selection:text-[#14110D]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .font-cormorant {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #DFB76C 0%, #B8863B 50%, #8C6221 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Top Announcement Bar */}
      <div className="w-full bg-[#14110D] text-[#E8DCC4] py-2 px-4 text-center text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold flex items-center justify-center gap-3 border-b border-[#B8863B]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8863B] animate-pulse"></span>
        <span>Complimentary ₹1,000 Voucher Enclosed In Every Discovery Set &bull; Free Express Shipping</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8863B] animate-pulse"></span>
      </div>

      {/* ================= SECTION 1: MASTER CAMPAIGN HERO (STONE PEDESTAL) ================= */}
      <section className="relative w-full overflow-hidden bg-[#FAF8F5] py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#F5EFE6] to-[#ECE3D5] border border-[#B8863B]/25 p-5 sm:p-8 lg:p-12 shadow-xl">
          
          {/* Header Eyebrow & Hero Mood Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-5 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-bold text-[#B8863B] uppercase">
                SENTIRE &bull; HAUTE PARFUMERIE
              </span>
              <span className="text-[10px] sm:text-xs bg-[#B8863B]/15 text-[#14110D] px-3 py-0.5 rounded-full border border-[#B8863B]/30 font-semibold tracking-wider">
                DISCOVERY SET &bull; 6 x 6ml
              </span>
            </div>

            {/* Mood Switcher Toggle */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-black/50 text-[11px] uppercase tracking-wider font-semibold">Mood:</span>
              <button
                onClick={() => setHeroMood("noir")}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  heroMood === "noir"
                    ? "bg-[#14110D] text-[#FAF8F5] shadow-md"
                    : "bg-white/80 text-[#14110D]/70 hover:bg-white border border-black/10"
                }`}
              >
                Dramatic Noir
              </button>
              <button
                onClick={() => setHeroMood("botanical")}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  heroMood === "botanical"
                    ? "bg-[#14110D] text-[#FAF8F5] shadow-md"
                    : "bg-white/80 text-[#14110D]/70 hover:bg-white border border-black/10"
                }`}
              >
                Warm Botanical
              </button>
            </div>
          </div>

          {/* Hero Grid: Split Layout (Desktop) / Seamless Flow (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Headlines & Badges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 space-y-6"
            >
              <div className="space-y-3">
                <motion.h1
                  variants={fadeInUp}
                  className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#14110D]"
                >
                  EXPLORE SIX SCENTS. <br />
                  <span className="gold-gradient-text italic font-medium">FIND YOURS.</span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-xs sm:text-sm lg:text-base text-[#14110D]/80 font-normal leading-relaxed max-w-xl"
                >
                  Six masterfully crafted 6ml extrait flacons composed with <strong className="text-[#14110D] font-bold">35% pure perfume oils</strong>. Experience the complete olfactory wardrobe across boardroom authority, golden date nights, and serene mornings before committing to full flacons.
                </motion.p>
              </div>

              {/* 4 Circular Gold Feature Badges (Matching Client Reference Layout) */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {/* Badge 1: 6 Unique Scents */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-[#B8863B]/30 hover:border-[#B8863B] shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-full border border-[#B8863B] flex items-center justify-center text-[#B8863B] mb-2 bg-[#B8863B]/10 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold tracking-wider text-[#14110D] uppercase">
                    6 UNIQUE SCENTS
                  </span>
                </div>

                {/* Badge 2: Pocket Friendly */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-[#B8863B]/30 hover:border-[#B8863B] shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-full border border-[#B8863B] flex items-center justify-center text-[#B8863B] mb-2 bg-[#B8863B]/10 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold tracking-wider text-[#14110D] uppercase">
                    POCKET FRIENDLY
                  </span>
                </div>

                {/* Badge 3: Perfect to Gift */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-[#B8863B]/30 hover:border-[#B8863B] shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-full border border-[#B8863B] flex items-center justify-center text-[#B8863B] mb-2 bg-[#B8863B]/10 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold tracking-wider text-[#14110D] uppercase">
                    PERFECT TO GIFT
                  </span>
                </div>

                {/* Badge 4: 35% Extrait Oil */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 border border-[#B8863B]/30 hover:border-[#B8863B] shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-full border border-[#B8863B] flex items-center justify-center text-[#B8863B] mb-2 bg-[#B8863B]/10 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold tracking-wider text-[#14110D] uppercase">
                    35% EXTRAIT OIL
                  </span>
                </div>
              </motion.div>

              {/* Price & Primary CTA Bar */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#14110D]">₹549</span>
                    <span className="text-base text-black/40 line-through">₹2,400</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAF5EC] text-[#248232] font-bold">
                      SAVE 77%
                    </span>
                  </div>
                  <span className="text-xs text-[#B8863B] font-semibold mt-0.5">
                    Includes ₹1,000 gift voucher inside
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("acquire-coffret")}
                  className="px-8 py-4 rounded-full bg-[#14110D] hover:bg-[#B8863B] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold shadow-xl transition-all flex items-center gap-3 cursor-pointer"
                >
                  <span>DISCOVER THE COLLECTION</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column: High-Res Master Stone Pedestal Artwork */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#B8863B]/30 shadow-2xl bg-black group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroMood}
                    src={
                      heroMood === "noir"
                        ? "/images/discovery/hero_dramatic_noir_travertine.jpg"
                        : "/images/discovery/hero_light_travertine_botanical.jpg"
                    }
                    alt="Sentire Discovery Set on Natural Chiseled Stone Pedestal"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAF8F5] bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <span className="tracking-widest uppercase font-semibold text-[#E8DCC4]">
                    6 Flacons on Slate Pedestal
                  </span>
                  <span className="text-[#B8863B] font-bold">35% Extrait Oil</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Floating Specs Ribbon */}
          <div className="mt-10 pt-6 border-t border-black/8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/70 border border-black/5 shadow-sm">
              <span className="text-[#B8863B]">⏳</span>
              <span className="text-[10px] sm:text-xs text-[#14110D] font-bold tracking-wider uppercase">
                LONG LASTING &bull; 14+ HRS
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/70 border border-black/5 shadow-sm">
              <span className="text-[#B8863B]">💎</span>
              <span className="text-[10px] sm:text-xs text-[#14110D] font-bold tracking-wider uppercase">
                FINEST EXTRAIT OILS
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/70 border border-black/5 shadow-sm">
              <span className="text-[#B8863B]">✨</span>
              <span className="text-[10px] sm:text-xs text-[#14110D] font-bold tracking-wider uppercase">
                SKIN FRIENDLY FORMULA
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/70 border border-black/5 shadow-sm">
              <span className="text-[#B8863B]">👑</span>
              <span className="text-[10px] sm:text-xs text-[#14110D] font-bold tracking-wider uppercase">
                PREMIUM COFFRET PACK
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2: THE OCCASION WARDROBE ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto border-t border-black/5" id="occasion-wardrobe">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center max-w-[720px] mx-auto mb-14"
        >
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
            The Occasion Wardrobe
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
            Different days ask for a <i className="font-cormorant italic text-[#B8863B]">different you.</i>
          </h2>
          <p className="text-xs sm:text-sm text-[#14110D]/70 max-w-lg mx-auto">
            Six signature extraits composed for the emotional rhythm of your week. Poured with 35% pure perfume oils.
          </p>
        </motion.div>

        {/* 6 Occasion Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {OCCASIONS.map((occ, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group bg-white rounded-2xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F1E9D8]">
                <img
                  src={occ.img}
                  alt={`Sentire ${occ.scent} for ${occ.day} ${occ.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-[#14110D] border border-black/5">
                  {occ.day}
                </div>
              </div>

              {/* Text */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-[#14110D] mb-1">
                    {occ.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#B8863B] font-bold block mb-2">
                    {occ.scent} &bull; {occ.conc}
                  </span>
                  <p className="text-xs sm:text-sm text-[#14110D]/75 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= SECTION 3: SENSORY NOTE PYRAMIDS & SILLAGE RADAR ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-[#F5EFE6] border-y border-black/8" id="scent-radar">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-[720px] mx-auto mb-12"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
              Interactive Olfactory Anatomy
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
              The Sensory Note Pyramids <i className="font-cormorant italic">&amp; Sillage Radar</i>
            </h2>
            <p className="text-xs sm:text-sm text-[#14110D]/70 max-w-md mx-auto">
              Inspect the precise 14-hour dry-down, projection cloud, and notes of each extrait flacon.
            </p>
          </motion.div>

          {/* 6 Flacon Selector Tray */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {SCENTS_DATA.map((scent, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScentIdx(idx)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeScentIdx === idx
                    ? "bg-[#14110D] text-white shadow-lg scale-105"
                    : "bg-white/80 text-[#14110D]/75 hover:bg-white border border-black/5 hover:border-[#B8863B]/40"
                }`}
              >
                {idx + 1}. {scent.name}
              </button>
            ))}
          </div>

          {/* Dual Interactive Display with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* Left: 3-Stage Bloom Timeline */}
              <div
                className="rounded-3xl p-6 sm:p-10 border border-[#A28D7A]/40 shadow-lg flex flex-col justify-between"
                style={{
                  background: "linear-gradient(150deg, #EDE2D1 0%, #DECDB6 100%)"
                }}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                    <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#14110D]">
                      {currentScent.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8863B] font-bold">
                      {currentScent.tagline}
                    </span>
                  </div>

                  <div className="space-y-6 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#B8863B]/30 pl-8">
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#B8863B] border-2 border-white shadow-sm" />
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#B8863B] block">
                        Stage I &bull; Opening (First 15–30 Mins)
                      </span>
                      <h4 className="font-cormorant text-lg sm:text-xl font-bold text-[#14110D]">
                        {currentScent.stage1Name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#14110D]/75 mt-1 leading-relaxed">
                        {currentScent.stage1Desc}
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#B8863B] border-2 border-white shadow-sm" />
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#B8863B] block">
                        Stage II &bull; Heart Bloom (2–6 Hours)
                      </span>
                      <h4 className="font-cormorant text-lg sm:text-xl font-bold text-[#14110D]">
                        {currentScent.stage2Name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#14110D]/75 mt-1 leading-relaxed">
                        {currentScent.stage2Desc}
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#B8863B] border-2 border-white shadow-sm" />
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#B8863B] block">
                        Stage III &bull; Base Drydown (8–14+ Hours)
                      </span>
                      <h4 className="font-cormorant text-lg sm:text-xl font-bold text-[#14110D]">
                        {currentScent.stage3Name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#14110D]/75 mt-1 leading-relaxed">
                        {currentScent.stage3Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Performance & Sillage Radar */}
              <div
                className="rounded-3xl p-6 sm:p-10 border border-[#A28D7A]/40 shadow-lg flex flex-col justify-between"
                style={{
                  background: "linear-gradient(150deg, #EDE2D1 0%, #DECDB6 100%)"
                }}
              >
                <div>
                  <div className="pb-4 border-b border-black/10 mb-6">
                    <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#14110D]">
                      Performance &amp; Sillage Radar
                    </h3>
                    <p className="text-xs text-[#14110D]/60 mt-1">
                      Laboratory measured on 35% pure extrait formulation
                    </p>
                  </div>

                  <div className="space-y-6 mb-8">
                    {/* Gauge 1 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Longevity on Skin</span>
                        <span className="text-[#B8863B]">{currentScent.longevity}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-black/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentScent.longevityPct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-[#B8863B] rounded-full"
                        />
                      </div>
                    </div>

                    {/* Gauge 2 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Projection / Sillage Cloud</span>
                        <span className="text-[#B8863B]">{currentScent.projection}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-black/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentScent.projectionPct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                          className="h-full bg-[#B8863B] rounded-full"
                        />
                      </div>
                    </div>

                    {/* Gauge 3 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Aroma Intensity</span>
                        <span className="text-[#B8863B]">{currentScent.intensity}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-black/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentScent.intensityPct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                          className="h-full bg-[#B8863B] rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4 Performance Metric Badges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/55 backdrop-blur-sm p-3 rounded-xl border border-black/8 shadow-sm">
                      <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Concentration</span>
                      <span className="text-xs font-bold text-[#14110D]">{currentScent.concentration}</span>
                    </div>
                    <div className="bg-white/55 backdrop-blur-sm p-3 rounded-xl border border-black/8 shadow-sm">
                      <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Best Occasion</span>
                      <span className="text-xs font-bold text-[#14110D]">{currentScent.occasion}</span>
                    </div>
                    <div className="bg-white/55 backdrop-blur-sm p-3 rounded-xl border border-black/8 shadow-sm">
                      <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Season</span>
                      <span className="text-xs font-bold text-[#14110D]">{currentScent.season}</span>
                    </div>
                    <div className="bg-white/55 backdrop-blur-sm p-3 rounded-xl border border-black/8 shadow-sm">
                      <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Scent Character</span>
                      <span className="text-xs font-bold text-[#14110D]">{currentScent.character}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= SECTION 4: ADD TO CART & LUXURY GALLERY ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto" id="acquire-coffret">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-[#B8863B]/30 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Interactive 3-Slide Carousel Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 bg-black flex items-center justify-center group shadow-xl">
                {CAROUSEL_IMAGES.map((item, idx) => (
                  <motion.img
                    key={idx}
                    src={item.src}
                    alt={item.title}
                    initial={false}
                    animate={{
                      opacity: currentSlide === idx ? 1 : 0,
                      scale: currentSlide === idx ? 1 : 1.05
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}

                {/* Image Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-[#FAF8F5] border border-white/10 flex items-center justify-between">
                  <span className="font-semibold">{CAROUSEL_IMAGES[currentSlide].title}</span>
                  <span className="text-[#B8863B] font-bold">{CAROUSEL_IMAGES[currentSlide].tag}</span>
                </div>

                {/* Arrows */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#14110D] flex items-center justify-center shadow-md transition-colors cursor-pointer backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  &larr;
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#14110D] flex items-center justify-center shadow-md transition-colors cursor-pointer backdrop-blur-sm"
                  aria-label="Next image"
                >
                  &rarr;
                </motion.button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {CAROUSEL_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      currentSlide === idx ? "border-[#B8863B] shadow-md scale-102" : "border-black/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt="Thumbnail" className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Acquisition Details & Direct Checkout */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block bg-[#B8863B]/10 text-[#B8863B] border border-[#B8863B]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                &#10022; ₹1,000 Voucher Enclosed
              </span>

              <h2 className="font-cormorant text-3xl sm:text-5xl font-bold text-[#14110D] leading-tight">
                The Discovery Coffret
              </h2>
              <p className="text-xs sm:text-sm text-[#14110D]/70">
                Six signature extraits de parfum (6ml each) hand-poured with 35% perfume oil concentration.
              </p>

              {/* Price block */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-black/10">
                <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#14110D]">
                  ₹{(549 * quantity).toLocaleString()}
                </span>
                <span className="text-sm text-[#14110D]/40 line-through">
                  ₹{(2400 * quantity).toLocaleString()}
                </span>
                <span className="bg-[#EAF5EC] text-[#248232] px-2.5 py-0.5 rounded-full text-xs font-bold">
                  Save ₹{(1851 * quantity).toLocaleString()} (77% Off)
                </span>
              </div>

              {/* Checklist */}
              <ul className="space-y-2 text-xs sm:text-sm text-[#14110D]/85">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8863B] font-bold">✓</span>
                  <span><strong>All 6 Signature Extraits:</strong> Calantha, Mirai, Purple Oud, Seductive, Deep Crush, Rich</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8863B] font-bold">✓</span>
                  <span><strong>₹1,000 Physical Gift Certificate:</strong> Redeemable toward any full 50ml flacon</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8863B] font-bold">✓</span>
                  <span><strong>35% Pure Oil Extrait Formulation:</strong> 12–14 Hours Long-Lasting Sillage</span>
                </li>
              </ul>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-black/15 rounded-full px-3 py-2.5 bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-sm font-bold px-2 hover:text-[#B8863B] cursor-pointer"
                    >
                      &minus;
                    </button>
                    <span className="text-sm font-bold px-3">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-sm font-bold px-2 hover:text-[#B8863B] cursor-pointer"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ y: -1 }}
                    onClick={handleAcquire}
                    className="flex-1 py-3.5 bg-[#14110D] hover:bg-[#B8863B] active:bg-[#B8863B] text-[#FAF8F5] text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-lg transition-colors cursor-pointer text-center"
                  >
                    ADD TO BAG &bull; ₹{(549 * quantity).toLocaleString()}
                  </motion.button>
                </div>

                {/* Express Checkout Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  onClick={handleDirectCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-[#C89B5A] to-[#B8863B] hover:from-[#B8863B] hover:to-[#9B702B] text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-xl transition-all cursor-pointer text-center"
                >
                  EXPRESS CHECKOUT (COD / UPI / CARDS) &rarr;
                </motion.button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[9.5px] sm:text-[10px] text-[#14110D]/60 pt-3 border-t border-black/8 font-medium">
                <div>✓ Free Express Shipping</div>
                <div>✓ Cash on Delivery (COD)</div>
                <div>✓ 100% Risk Free Discovery</div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 5: 4D SCENT AURA & TIME CHRONOMETER ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#FAF7F0] via-[#F5EFE4] to-[#EFE5D4] border-t border-black/8" id="aura-oracle">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center max-w-[720px] mx-auto mb-12"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
              4-Dimensional Olfactory Calibration
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
              The Scent Aura &bull; <i className="font-cormorant italic text-[#B8863B]">Time Chronometer</i>
            </h2>
            <p className="text-xs sm:text-sm text-[#14110D]/75 max-w-lg mx-auto">
              Calibrate your four instinctual vectors &mdash; Walking Pace, Atmosphere, Time Clock, and Signature Energy &mdash; to reveal which of the six extraits claims your aura.
            </p>
          </motion.div>

          {/* 4 Vectors Grid (2x2 Grid on Mobile, 4-Cols on Desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12"
          >
            {/* Vector 1 */}
            <motion.div variants={fadeInUp} className="bg-white border border-[#B8863B]/25 rounded-2xl p-4 sm:p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector I</span>
              <div className="font-cormorant text-base sm:text-lg text-[#14110D] font-bold mb-3">Walking Pace</div>
              {[
                "Slow & Unhurried",
                "Crisp & Purposeful",
                "Commanding & Heavy"
              ].map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVectors((v) => ({ ...v, pace: i }))}
                  className={`w-full py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.pace === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>

            {/* Vector 2 */}
            <motion.div variants={fadeInUp} className="bg-white border border-[#B8863B]/25 rounded-2xl p-4 sm:p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector II</span>
              <div className="font-cormorant text-base sm:text-lg text-[#14110D] font-bold mb-3">Atmosphere</div>
              {[
                "Rain on Polished Stone",
                "Warm Sunlit Linen",
                "Velvet & Candlelight"
              ].map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVectors((v) => ({ ...v, atmos: i }))}
                  className={`w-full py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.atmos === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>

            {/* Vector 3 */}
            <motion.div variants={fadeInUp} className="bg-white border border-[#B8863B]/25 rounded-2xl p-4 sm:p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector III</span>
              <div className="font-cormorant text-base sm:text-lg text-[#14110D] font-bold mb-3">Time Clock</div>
              {[
                "08:00 AM • Dawn",
                "02:00 PM • Focus",
                "11:30 PM • Midnight"
              ].map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVectors((v) => ({ ...v, time: i }))}
                  className={`w-full py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.time === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>

            {/* Vector 4 */}
            <motion.div variants={fadeInUp} className="bg-white border border-[#B8863B]/25 rounded-2xl p-4 sm:p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector IV</span>
              <div className="font-cormorant text-base sm:text-lg text-[#14110D] font-bold mb-3">Signature Energy</div>
              {[
                "Silent Magnetism",
                "Luminous Radiance",
                "Dangerous Allure"
              ].map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVectors((v) => ({ ...v, energy: i }))}
                  className={`w-full py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.energy === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Oracle Stage Match Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={matchedScentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#B8863B]/30 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left: Matched Product Image */}
              <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-[#B8863B]/30 bg-[#FAF8F5]">
                <img
                  src={matchedOccasion.img}
                  alt={`Matched Extrait: ${matchedScent.name}`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#14110D]/90 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#B8863B]/40">
                  98% Resonant
                </div>
              </div>

              {/* Right: Synthesis Narrative */}
              <div className="lg:col-span-7">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B8863B] font-bold block mb-2">
                  Calibration Confirmed &bull; Vector Synthesis
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#14110D] mb-1">
                  {matchedScent.name}
                </h3>
                <span className="text-xs sm:text-sm text-[#14110D]/70 font-semibold block mb-4">
                  {matchedScent.tagline} &bull; {matchedScent.moodDay}
                </span>

                <p className="text-xs sm:text-sm text-[#14110D]/85 italic pl-4 border-l-2 border-[#B8863B] mb-5 leading-relaxed">
                  {matchedScent.auraQuote}
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 border-y border-black/10 py-3 mb-6">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-widest text-black/50 block font-semibold">Primary Note</span>
                    <span className="text-xs font-bold text-[#14110D]">{matchedScent.stage1Name.split('&')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase tracking-widest text-black/50 block font-semibold">Projection</span>
                    <span className="text-xs font-bold text-[#14110D]">{matchedScent.projection.split('(')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] uppercase tracking-widest text-black/50 block font-semibold">Longevity</span>
                    <span className="text-xs font-bold text-[#14110D]">{matchedScent.longevity}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  onClick={() => scrollToSection("acquire-coffret")}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C89B5A] hover:bg-[#B8863B] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-colors cursor-pointer"
                >
                  CLAIM IN DISCOVERY SET (₹549) &rarr;
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
