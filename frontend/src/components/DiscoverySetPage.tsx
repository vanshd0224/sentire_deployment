import React, { useState, useEffect } from "react";
import { PageName } from "../types/appTypes";

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
    img: "/occasion_cards/monday_boardroom_purple_oud.jpg"
  },
  {
    day: "Tuesday",
    name: "Clean Start",
    scent: "Mirai",
    conc: "6ml Extrait",
    desc: "Solar jasmine blossom, crisp green pear, and white cedarwood. The 8am reset when you need the world to feel light.",
    img: "/occasion_cards/tuesday_clean_start_mirai.jpg"
  },
  {
    day: "Wednesday",
    name: "Quiet Confidence",
    scent: "Rich",
    conc: "6ml Extrait",
    desc: "Pure Kashmiri saffron steeped in raw honey, bourbon vanilla beans, and aged sandalwood. Understated prestige.",
    img: "/occasion_cards/wednesday_quiet_confidence_rich.jpg"
  },
  {
    day: "Thursday",
    name: "Dinner Date",
    scent: "Seductive",
    conc: "6ml Extrait",
    desc: "Spiced plum and Turkish damask rose over Madagascar vanilla patchouli. An intimate sillage for candlelight.",
    img: "/occasion_cards/thursday_dinner_date_seductive.jpg"
  },
  {
    day: "Saturday",
    name: "Night Out",
    scent: "Deep Crush",
    conc: "6ml Extrait",
    desc: "Macerated dark plums, black cherries steeped in French cognac, charred oakwood, and roasted praline.",
    img: "/occasion_cards/saturday_night_out_deep_crush.jpg"
  },
  {
    day: "Sunday",
    name: "Slow Sunday",
    scent: "Calantha",
    conc: "6ml Extrait",
    desc: "Bourbon vanilla, lavender sprigs, and toasted tonka cashmere. Soft — for doing absolutely nothing, beautifully.",
    img: "/occasion_cards/sunday_slow_sunday_calantha.jpg"
  }
];

// 3 Auto-sliding carousel images
const CAROUSEL_IMAGES = [
  "/discovery_gallery/gallery_slide_1.jpg",
  "/discovery_gallery/gallery_slide_2.jpg",
  "/discovery_gallery/gallery_slide_3.jpg"
];

export default function DiscoverySetPage({
  onAddToCart,
  onOpenCart,
  onBackToHome,
  onNavigate
}: DiscoverySetPageProps) {
  // Section 3 Active Scents
  const [activeScentIdx, setActiveScentIdx] = useState(0);

  // Section 4 Carousel & Quantity
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Section 5 4D Aura Matrix Vectors
  const [vectors, setVectors] = useState({ pace: 0, atmos: 0, time: 0, energy: 0 });

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3800);
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
          productId: "discovery-set",
          name: "The Discovery Coffret (6 x 6ml Extrait de Parfum)",
          price: 549,
          originalPrice: 2400,
          quantity: quantity,
          size: 36,
          img: "/discovery_gallery/gallery_slide_1.jpg",
          image: "/discovery_gallery/gallery_slide_1.jpg"
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      {/* ================= SECTION 1: CAMPAIGN COVER HERO ================= */}
      {/* Mobile Layout (md:hidden) - Zero Text Collision, Crisp Readability */}
      <section className="block md:hidden w-full bg-[#FAF8F5]">
        {/* Photoshoot Image Header (Full 3:2 Landscape Uncropped Frame) */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#FAF8F5] flex items-center justify-center">
          <img
            src="/discovery_hero_cover.jpg"
            alt="Sentire 6-Flacon Luxury Discovery Coffret"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Content Block */}
        <div className="px-5 py-6 -mt-5 relative z-10 bg-[#FAF8F5] rounded-t-3xl border-t border-black/5 shadow-sm">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
            The Atelier Anthology &bull; 35% Extrait
          </span>
          <h1 className="font-cormorant text-4xl font-normal leading-[1.05] text-[#14110D] mb-3 tracking-[-0.01em]">
            Six moods.<br />
            <i className="font-cormorant italic font-normal text-[#14110D]">One case.</i>
          </h1>
          <p className="text-xs leading-relaxed text-[#14110D]/80 font-medium mb-5">
            You are never just one fragrance. You are whoever the morning demands, and whoever midnight desires &mdash; six hand-poured extrait flacons composed to drape across your skin like liquid velvet.
          </p>

          {/* Mobile Micro Specs Tray */}
          <div className="grid grid-cols-3 gap-1.5 border-y border-black/10 py-3 mb-6 bg-[#F5EFE6]/70 rounded-xl px-2.5">
            <div className="text-center">
              <span className="text-[8px] uppercase tracking-wider text-[#14110D]/50 block font-semibold">Flacons</span>
              <span className="text-[11px] font-bold text-[#14110D]">6 Extraits (6ml)</span>
            </div>
            <div className="text-center border-x border-black/10 px-1">
              <span className="text-[8px] uppercase tracking-wider text-[#14110D]/50 block font-semibold">Concentration</span>
              <span className="text-[11px] font-bold text-[#14110D]">35% Pure Oil</span>
            </div>
            <div className="text-center">
              <span className="text-[8px] uppercase tracking-wider text-[#14110D]/50 block font-semibold">Offering</span>
              <span className="text-[11px] font-bold text-[#14110D]">
                ₹549 <span className="text-[9px] text-[#B8863B] font-semibold">(Net ₹99)</span>
              </span>
            </div>
          </div>

          {/* Direct Black Pill Button */}
          <button
            onClick={() => scrollToSection("acquire-coffret")}
            className="w-full py-3.5 bg-[#14110D] active:bg-[#B8863B] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-lg transition-all text-center cursor-pointer mb-2"
          >
            Acquire Discovery Set &rarr;
          </button>
        </div>
      </section>

      {/* Desktop Layout (hidden md:flex) - High Editorial Silk Layout */}
      <section className="hidden md:flex relative w-full overflow-hidden bg-[#FAF8F5] min-h-[580px] lg:min-h-[720px] items-center">
        {/* Full-bleed background photoshoot image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/discovery_hero_cover.jpg"
            alt="Sentire 6-Flacon Luxury Discovery Coffret with Matte Black Box and Golden Amber Accents"
            className="w-full h-full object-cover object-[center_35%] filter brightness-[1.02] contrast-[1.01]"
          />
          {/* Subtle natural vignette for perfect typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/85 via-[#FAF8F5]/45 to-transparent w-full md:w-[65%]" />
        </div>

        {/* Hero Top-Left Editorial Placement */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 md:py-16 w-full">
          <div className="max-w-[540px]">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.32em] text-[#B8863B] block mb-3">
              The Atelier Anthology &bull; 35% Extrait
            </span>
            <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.02] text-[#14110D] mb-4 tracking-[-0.02em]">
              Six moods.<br />
              <i className="font-cormorant italic font-normal text-[#14110D]">One case.</i>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#14110D]/85 font-medium mb-8">
              You are never just one fragrance. You are whoever the morning demands, and whoever midnight desires &mdash; six hand-poured extrait flacons composed to drape across your skin like liquid velvet.
            </p>

            {/* Micro Specs Tray */}
            <div className="grid grid-cols-3 gap-4 border-y border-black/10 py-3 mb-8">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Flacons</span>
                <span className="text-xs sm:text-sm font-bold text-[#14110D]">6 Extraits (6ml)</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Concentration</span>
                <span className="text-xs sm:text-sm font-bold text-[#14110D]">35% Pure Oil</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#14110D]/50 block font-semibold">Offering</span>
                <span className="text-xs sm:text-sm font-bold text-[#14110D]">
                  ₹549 <span className="text-[10px] text-[#B8863B] font-semibold">(Net ₹99)</span>
                </span>
              </div>
            </div>

            {/* Direct Black Pill Button */}
            <button
              onClick={() => scrollToSection("acquire-coffret")}
              className="px-8 py-4 bg-[#14110D] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-xl hover:bg-[#B8863B] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-3"
            >
              <span>Acquire Discovery Set &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: THE OCCASION WARDROBE ================= */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto border-t border-black/5" id="occasion-wardrobe">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
            The Occasion Wardrobe
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
            Different days ask for a <i className="font-cormorant italic">different you.</i>
          </h2>
          <p className="text-sm sm:text-base text-[#14110D]/70 max-w-lg mx-auto">
            Six signature extraits composed for the rhythm of your week. Poured with 35% pure perfume oils.
          </p>
        </div>

        {/* 6 Occasion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {OCCASIONS.map((occ, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
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
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-[#14110D] mb-1">
                    {occ.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#B8863B] font-semibold block mb-3">
                    {occ.scent} &bull; {occ.conc}
                  </span>
                  <p className="text-xs sm:text-sm text-[#14110D]/75 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 3: SENSORY NOTE PYRAMIDS & SILLAGE RADAR ================= */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 bg-[#F5EFE6] border-y border-black/8" id="scent-radar">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
              Interactive Olfactory Visualization
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
              The Sensory Note Pyramids <i className="font-cormorant italic">&amp; Sillage Radar</i>
            </h2>
            <p className="text-sm sm:text-base text-[#14110D]/70 max-w-md mx-auto">
              Because you cannot smell through a screen, we mapped the precise 14-hour dry-down and projection anatomy of every flacon.
            </p>
          </div>

          {/* 6 Flacon Selector Tray */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {SCENTS_DATA.map((scent, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScentIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeScentIdx === idx
                    ? "bg-[#14110D] text-white shadow-lg scale-105"
                    : "bg-white/80 text-[#14110D]/75 hover:bg-white border border-black/5 hover:border-[#B8863B]/40"
                }`}
              >
                {idx + 1}. {scent.name}
              </button>
            ))}
          </div>

          {/* Dual Interactive Display with Sampled Warm Linen / Travertine Cream-Brown Background */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: 3-Stage Bloom Timeline */}
            <div
              className="rounded-3xl p-8 sm:p-10 border border-[#A28D7A]/40 shadow-lg flex flex-col justify-between"
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
              className="rounded-3xl p-8 sm:p-10 border border-[#A28D7A]/40 shadow-lg flex flex-col justify-between"
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
                      <div
                        className="h-full bg-[#B8863B] rounded-full transition-all duration-700"
                        style={{ width: `${currentScent.longevityPct}%` }}
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
                      <div
                        className="h-full bg-[#B8863B] rounded-full transition-all duration-700"
                        style={{ width: `${currentScent.projectionPct}%` }}
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
                      <div
                        className="h-full bg-[#B8863B] rounded-full transition-all duration-700"
                        style={{ width: `${currentScent.intensityPct}%` }}
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
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: ADD TO CART & LUXURY GALLERY ================= */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto" id="acquire-coffret">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Auto-Sliding 3-Photo Gallery Carousel (Full 2:3 Portrait Uncropped Frame) */}
          <div className="relative w-full min-h-[500px] sm:min-h-[620px] aspect-[2/3] max-h-[660px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-black/8 bg-[#ECE3D5] flex items-center justify-center">
            {CAROUSEL_IMAGES.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Sentire Discovery Set View ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000 ${
                  currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              />
            ))}

            {/* Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#14110D] flex items-center justify-center shadow-md transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Previous image"
            >
              &larr;
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#14110D] flex items-center justify-center shadow-md transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Next image"
            >
              &rarr;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {CAROUSEL_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: High-Converting Acquisition Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/8 shadow-xl">
            <span className="inline-block bg-[#B8863B]/10 text-[#B8863B] border border-[#B8863B]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              &#10022; ₹1,000 Voucher Enclosed
            </span>

            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#14110D] mb-2">
              The Discovery Coffret
            </h2>
            <p className="text-xs sm:text-sm text-[#14110D]/70 mb-6">
              Six signature extraits de parfum (6ml each) hand-poured with 35% perfume oil concentration.
            </p>

            {/* Price block */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-black/10 mb-6">
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
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#14110D]/85 mb-8">
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
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-black/15 rounded-full px-4 py-3 bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-sm font-bold px-2 hover:text-[#B8863B] cursor-pointer"
                  >
                    &minus;
                  </button>
                  <span className="text-sm font-bold px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-sm font-bold px-2 hover:text-[#B8863B] cursor-pointer"
                  >
                    &#43;
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAcquire}
                  className="flex-1 py-4 bg-[#14110D] hover:bg-[#B8863B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all cursor-pointer text-center"
                >
                  ADD TO BAG &bull; ₹{(549 * quantity).toLocaleString()}
                </button>
              </div>

              {/* Express Checkout Button */}
              <button
                onClick={handleDirectCheckout}
                className="w-full py-4 bg-gradient-to-r from-[#C89B5A] to-[#B8863B] hover:from-[#B8863B] hover:to-[#9B702B] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-xl transition-all cursor-pointer text-center"
              >
                EXPRESS CHECKOUT (COD / UPI) &rarr;
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#14110D]/60 mt-6 pt-4 border-t border-black/8 font-medium">
              <div>✓ Free Express Shipping</div>
              <div>✓ Cash on Delivery (COD)</div>
              <div>✓ Net ₹99 Discovery</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: 4D SCENT AURA & TIME CHRONOMETER (WARM CREAMY VELVET) ================= */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-[#FAF7F0] via-[#F5EFE4] to-[#EFE5D4] border-t border-black/8" id="aura-oracle">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8863B] block mb-2">
              4-Dimensional Olfactory Calibration
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-normal text-[#14110D] mb-4">
              The Scent Aura &bull; <i className="font-cormorant italic text-[#B8863B]">Time Chronometer</i>
            </h2>
            <p className="text-sm sm:text-base text-[#14110D]/75 max-w-lg mx-auto">
              Calibrate your four instinctual vectors &mdash; Walking Pace, Atmosphere, Time Clock, and Signature Energy &mdash; to reveal which of the six extraits claims your aura.
            </p>
          </div>

          {/* 4 Vectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Vector 1 */}
            <div className="bg-white border border-[#B8863B]/25 rounded-2xl p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector I</span>
              <div className="font-cormorant text-lg text-[#14110D] font-bold mb-3">Walking Pace</div>
              {[
                "Slow & Unhurried",
                "Crisp & Purposeful",
                "Commanding & Heavy"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setVectors((v) => ({ ...v, pace: i }))}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.pace === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Vector 2 */}
            <div className="bg-white border border-[#B8863B]/25 rounded-2xl p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector II</span>
              <div className="font-cormorant text-lg text-[#14110D] font-bold mb-3">Atmosphere</div>
              {[
                "Rain on Polished Stone",
                "Warm Sunlit Linen",
                "Velvet & Candlelight"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setVectors((v) => ({ ...v, atmos: i }))}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.atmos === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Vector 3 */}
            <div className="bg-white border border-[#B8863B]/25 rounded-2xl p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector III</span>
              <div className="font-cormorant text-lg text-[#14110D] font-bold mb-3">Time Clock</div>
              {[
                "08:00 AM • Pristine Dawn",
                "02:00 PM • High Focus",
                "11:30 PM • Deep Midnight"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setVectors((v) => ({ ...v, time: i }))}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.time === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Vector 4 */}
            <div className="bg-white border border-[#B8863B]/25 rounded-2xl p-5 shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-[#B8863B] font-bold block mb-1">Vector IV</span>
              <div className="font-cormorant text-lg text-[#14110D] font-bold mb-3">Signature Energy</div>
              {[
                "Silent Magnetism",
                "Luminous Radiance",
                "Dangerous Allure"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setVectors((v) => ({ ...v, energy: i }))}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold mb-2 text-left transition-all cursor-pointer ${
                    vectors.energy === i
                      ? "bg-[#14110D] text-white shadow-md"
                      : "bg-[#FAF8F5] text-[#14110D]/70 hover:bg-[#B8863B]/10 hover:text-[#14110D] border border-black/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Oracle Stage Match Card */}
          <div className="bg-white border border-[#B8863B]/30 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Matched Product Image */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-[#B8863B]/30 bg-[#FAF8F5]">
              <img
                src={matchedOccasion.img}
                alt={`Matched Extrait: ${matchedScent.name}`}
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
              <h3 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#14110D] mb-1">
                {matchedScent.name}
              </h3>
              <span className="text-xs sm:text-sm text-[#14110D]/70 font-semibold block mb-4">
                {matchedScent.tagline} &bull; {matchedScent.moodDay}
              </span>

              <p className="text-sm sm:text-base text-[#14110D]/85 italic pl-4 border-l-2 border-[#B8863B] mb-6 leading-relaxed">
                {matchedScent.auraQuote}
              </p>

              <div className="grid grid-cols-3 gap-3 border-y border-black/10 py-3 mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-black/50 block font-semibold">Primary Note</span>
                  <span className="text-xs font-bold text-[#14110D]">{matchedScent.stage1Name.split('&')[0]}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-black/50 block font-semibold">Projection</span>
                  <span className="text-xs font-bold text-[#14110D]">{matchedScent.projection.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-black/50 block font-semibold">Longevity</span>
                  <span className="text-xs font-bold text-[#14110D]">{matchedScent.longevity}</span>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("acquire-coffret")}
                className="w-full sm:w-auto px-8 py-4 bg-[#C89B5A] hover:bg-[#B8863B] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all cursor-pointer"
              >
                CLAIM IN DISCOVERY SET (₹1,099) &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
