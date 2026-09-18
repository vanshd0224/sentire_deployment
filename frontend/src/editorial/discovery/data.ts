/**
 * Discovery Set content, lifted out of the page component so the page file
 * stays about layout and motion. Copy and imagery are unchanged.
 */
// Angles for the discovery set flip-top packaging
// Studio set: six angles on grey, ordered as a walk around the case so the
// turntable reads as the box turning. Print colour is the case's real
// chartreuse, so the copy no longer calls it gold.
export const BOX_ANGLES = [
  {
    id: "front",
    label: "Case Front",
    tagline: "SENTIRE DISCOVERY SET · 6 ML × 6",
    img: "/discovery/studio/box-front.webp",
    desc: "Matte black flip-top case with a hot-stamped emblem and stepped interior architecture.",
  },
  {
    id: "profile-right",
    label: "Tailored Case",
    tagline: "MINIMALIST LUXURY SILHOUETTE",
    img: "/discovery/studio/box-profile-right.webp",
    desc: "Compact dimensions tailored to fit evening clutches, breast pockets, and carry-ons without spilling a drop.",
  },
  {
    id: "rare",
    label: "Side Profile",
    tagline: "IRRESISTIBLY RARE",
    img: "/discovery/studio/box-rare.webp",
    desc: "Precision angled silhouette engineered for smooth one-hand flip opening.",
  },
  {
    id: "warning",
    label: "The Manifesto",
    tagline: "“The COOLEST Thing SOMEBODY can OWN”",
    img: "/discovery/studio/box-manifesto.webp",
    desc: "The authentic back warning stamp: ‘WARNING: The COOLEST Thing SOMEBODY can OWN. just feel it’.",
  },
  {
    id: "profile-left",
    label: "Flip-top Lid",
    tagline: "ANGLED MAGNETIC CLASP",
    img: "/discovery/studio/box-profile-left.webp",
    desc: "The slanted lid line marks the magnetic flip-top — one thumb opens the case.",
  },
  {
    id: "top",
    label: "Crest Monogram",
    tagline: "PC EMBLEM OF HAUTE PARFUMERIE",
    img: "/discovery/studio/box-monogram.webp",
    desc: "Hand-finished cursive PC seal hot-stamped on deep matte noir.",
  },
];

// The 6 original fragrances in the Discovery Set
export const DISCOVERY_FRAGRANCES = [
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
    layeringTip:
      "Layer 1 spray over Purple Oud to create a royal nautical contrast.",
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
    layeringTip:
      "The ultimate skin base. Layer with any citrus or floral top spray.",
  },
];

// Presets for the interactive Layering Studio
export const LAYERING_RECIPES = [
  {
    name: "Royal Berry Aquatica",
    base: "purple-oud",
    accent: "rich",
    ratio: "2 Sprays Purple Oud + 1 Spray Rich",
    description:
      "Deep Cambodian agarwood and berries brightened by an electric wave of ocean salt. Authoritative yet breezy.",
    vibe: "Executive Power & Summer Nights",
  },
  {
    name: "Spiced Tonka Mirage",
    base: "mirai",
    accent: "seductive",
    ratio: "2 Sprays MIRAI + 1 Spray Seductive",
    description:
      "Dark chocolate and roasted tonka kissed by zesty pink pepper and citrus. Sweet allure with a sharp bite.",
    vibe: "Irresistible Midnight Seduction",
  },
  {
    name: "Velvet Petal Woods",
    base: "deep-crush",
    accent: "calantha",
    ratio: "2 Sprays Deep Crush + 1 Spray CALANTHA",
    description:
      "Warm skin musk and tobacco wrapped in blooming French rose and jasmine. Soft, ultra-glamorous, and intimate.",
    vibe: "Golden Hour Romance",
  },
  {
    name: "Smoky Floral Velvet",
    base: "purple-oud",
    accent: "calantha",
    ratio: "1 Spray Purple Oud + 2 Sprays CALANTHA",
    description:
      "The richness of oud anchored under a bouquet of luminous white petals. Parisian haute perfumery personified.",
    vibe: "Gala & Signature Statement",
  },
];

export const FAQS = [
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

export const REVIEWS = [
  {
    quote:
      "The 6ML size is pure genius. I wore Purple Oud to an evening event and received three separate compliment inquiries. I bought the 50ML flacon the next morning!",
    name: "Aarav M.",
  },
  {
    quote:
      "The box warning says 'The COOLEST Thing SOMEBODY can OWN' and honestly it's not exaggerating. The matte black case and oxblood interior look incredible on my vanity.",
    name: "Rhea K.",
  },
  {
    quote:
      "Layering MIRAI with Seductive gives you this insane warm spiced cocoa aroma that lasts till the morning after. For ₹549 this is without question the best discovery set in India.",
    name: "Kabir S.",
  },
];

export const PERKS = [
  ["Free express shipping", "Across India, arrives in 2–4 days"],
  ["Zero-risk discovery", "VIP card inside, redeemable against a 50ML flacon"],
  ["Leak-proof travel sprays", "Anodised, cabin-bag approved"],
];

// ── Copy restored from the live page ───────────────────────────────────────

export const SPECS: [string, string][] = [
  ["Volume", "6 × 6ML (36ML)"],
  ["Spray count", "~360 fine mists"],
  ["Portability", "TSA & clutch safe"],
];

export const WHY_6ML_QUOTE =
  "Each vial holds roughly 55 to 60 sprays — around a month of wear if you're using it a couple of times a day. This isn't a paper strip in a store. It's enough to know how a fragrance behaves on you, in the evening, hours after you put it on.";

export const PAPER_STRIP = {
  kicker: "The outdated mall way",
  title: "Department store paper strip",
  sub: "Why 80% of full-bottle blind purchases end in regret",
  points: [
    [
      "Fades in 10 minutes",
      "Paper blotters don't have warmth, natural skin oils, or perspiration.",
    ],
    [
      "Masks the drydown",
      "You only smell top notes; base amber and agarwood never bloom properly.",
    ],
    [
      "Olfactory fatigue",
      "Store air is saturated with 50 other perfumes, confusing your senses.",
    ],
    [
      "High financial risk",
      "Forcing a ₹2,000–₹5,000 blind purchase after a 5-second sniff.",
    ],
  ],
};

export const SENTIRE_WAY = {
  kicker: "The Sentire way",
  title: "Sentire 6ML travel extrait",
  sub: "True intimate luxury tested on your skin across weeks",
  points: [
    [
      "55 to 60 fine-mist sprays",
      "One full month of real daily skin wear per fragrance.",
    ],
    [
      "True skin chemistry",
      "Observe how body heat transforms delicate florals and rich Cambodian oud across 12 hours.",
    ],
    [
      "Clutch & carry-on safe",
      "Anodised leak-proof protective overcap prevents accidental spills in transit.",
    ],
    [
      "Total freedom",
      "Find your genuine signature fragrance without spending thousands up front.",
    ],
  ],
};

export const RITUAL_QUOTE =
  "Give each fragrance its own day. Notice which one people mention. Then try layering two — a warm base under something brighter — and you'll have a scent nobody else is wearing.";

export const RITUAL = [
  {
    n: "01",
    title: "Give each its own day",
    body: "Apply on pulse points (inside wrists, side of neck) in the morning. Notice how the top citrus or berries soften into warm amber and florals as your body temperature rises throughout the day.",
  },
  {
    n: "02",
    title: "The compliment test",
    body: "Pay attention to what strangers, friends, and partners notice. A signature scent isn't just what smells pleasant in a bottle; it's what leaves an unforgettable scent trail in your wake.",
  },
  {
    n: "03",
    title: "Layer like an alchemist",
    body: "Never smell like anyone else. Lay down a deep, warm base (Purple Oud or MIRAI) and veil it with an aquatic or citrus high note (Rich or Seductive). Use the layering studio below.",
  },
];

export const PACKAGING_WARNING =
  "WARNING: The COOLEST Thing SOMEBODY can OWN. just feel it";

export const PACKAGING_FEATURES = [
  {
    title: "Stepped tiered architecture",
    body: "Each 6ML vial rests in an elevated staircase tray, allowing you to view all six bottles simultaneously the instant you flip the case open.",
  },
  {
    title: "Oxblood velvet interior",
    body: "Deep burgundy velvet lining cushions the glass vials against vibration and shock, preserving the concentrated perfume oils during flights and commute.",
  },
  {
    title: "Included scent-map guide card",
    body: "An embossed heavy-stock card tucked into the lid guides your journey through olfactory families, notes pyramids, and compliment profiles.",
  },
];

export const CLOSING = {
  kicker: "36ML · 6 travel sprays · ₹549",
  title: "Find the scent that belongs to your skin.",
  body: "Six distinct olfactory identities in fine-mist travel vials. Dispatched within 24 hours with express courier tracking across India.",
};

/** "PURPLE OUD" / "MIRAI" → "Purple Oud" / "Mirai" for display. */
export const displayName = (name: string) =>
  name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
