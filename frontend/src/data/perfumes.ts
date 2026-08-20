export interface PerfumeProduct {
  id: string;
  num: string;
  name: string;
  desc: string;
  fullDesc?: string;
  scentFamily: "woody" | "fresh" | "ambar" | "citrus" | "oriental" | "floral";
  moods: string[];
  sizes: (10 | 30 | 50)[];
  outOfStockSizes?: (10 | 30 | 50)[];
  prices: Record<number, number>;
  mrps?: Record<number, number>;
  badge?: "bestseller" | "new" | "exclusive" | null;
  img: string;
  sizeImages?: Record<number, string[]>;
  traces: string[];
}

export const ALL_PERFUMES: PerfumeProduct[] = [
  {
    id: "calantha",
    num: "No. 01",
    name: "Calantha",
    desc: "Blooming Florals · Refined Beauty",
    fullDesc: "Calantha captures the essence of blooming flowers in a luxurious, timeless scent that transcends traditional gender boundaries. Features delicate florals, jasmine, rose, and warm sandalwood.",
    scentFamily: "floral",
    moods: ["regular", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 399, 30: 900, 50: 1085 },
    mrps: { 10: 449, 30: 1409, 50: 1539 },
    badge: "bestseller",
    img: "/assets/perfumes/calantha-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/calantha-10ml-1.png?v=2", "/assets/perfumes/calantha-10ml-2.png?v=2", "/assets/perfumes/calantha-10ml-3.png?v=2"],
      30: ["/assets/perfumes/calantha-30ml-1.png?v=2", "/assets/perfumes/calantha-30ml-2.png?v=2", "/assets/perfumes/calantha-30ml-3.png?v=2"],
      50: ["/assets/perfumes/calantha-50ml-1.png?v=2", "/assets/perfumes/calantha-50ml-2.png?v=2", "/assets/perfumes/calantha-50ml-3.png?v=2"]
    },
    traces: ["Jasmine", "Rose", "Lily of Valley", "Sandalwood", "Amber"]
  },
  {
    id: "deep-crush",
    num: "No. 02",
    name: "Deep Crush",
    desc: "Invigorating Lavender & Warm Tobacco Woods",
    fullDesc: "Deep Crush is a captivating fragrance designed for the modern individual. Welcomed by lavender and rose, revealing warm tobacco and musky amber.",
    scentFamily: "floral",
    moods: ["regular", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 350, 30: 899, 50: 1085 },
    mrps: { 10: 419, 30: 1319, 50: 1539 },
    badge: "bestseller",
    img: "/assets/perfumes/deep-crush-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/deep-crush-10ml-1.png?v=2", "/assets/perfumes/deep-crush-10ml-2.png?v=2", "/assets/perfumes/deep-crush-10ml-3.png?v=2"],
      30: ["/assets/perfumes/deep-crush-30ml-1.png?v=2", "/assets/perfumes/deep-crush-30ml-2.png?v=2", "/assets/perfumes/deep-crush-30ml-3.png?v=2"],
      50: ["/assets/perfumes/deep-crush-50ml-1.png?v=2", "/assets/perfumes/deep-crush-50ml-2.png?v=2", "/assets/perfumes/deep-crush-50ml-3.png?v=2"]
    },
    traces: ["Lavender", "Rose", "Tobacco", "Sandalwood", "Amber"]
  },
  {
    id: "herrlich",
    num: "No. 03",
    name: "Herrlich",
    desc: "Fresh Fruits, Bouquet & Decadent Chocolate",
    fullDesc: "Herrlich is a luxurious perfume presenting fresh bergamot and peach top notes, a heart of jasmine and rose, and a base of dark chocolate.",
    scentFamily: "woody",
    moods: ["date-night", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 550, 30: 1499, 50: 2196 },
    mrps: { 10: 639, 30: 2129, 50: 3069 },
    badge: "new",
    img: "/assets/perfumes/herrlich-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/herrlich-10ml-1.png?v=2", "/assets/perfumes/herrlich-10ml-2.png?v=2", "/assets/perfumes/herrlich-10ml-3.png?v=2"],
      30: ["/assets/perfumes/herrlich-30ml-1.png?v=2", "/assets/perfumes/herrlich-30ml-2.png?v=2", "/assets/perfumes/herrlich-30ml-3.png?v=2"],
      50: ["/assets/perfumes/herrlich-50ml-1.png?v=2", "/assets/perfumes/herrlich-50ml-2.png?v=2", "/assets/perfumes/herrlich-50ml-3.png?v=2"]
    },
    traces: ["Bergamot", "Peach", "Jasmine", "Rose", "Dark Chocolate"]
  },
  {
    id: "midnight",
    num: "No. 04",
    name: "Midnight",
    desc: "Blackcurrant, Tuberose & Sensual Vanilla Musk",
    fullDesc: "Midnight encapsulates the allure of the night, beginning with bergamot and blackcurrant, transitioning into rich tuberose and warm vanilla musk.",
    scentFamily: "woody",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 549, 30: 1399, 50: 1949 },
    mrps: { 10: 649, 30: 2129, 50: 2709 },
    badge: "new",
    img: "/assets/perfumes/midnight-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/midnight-10ml-1.png?v=2", "/assets/perfumes/midnight-10ml-2.png?v=2", "/assets/perfumes/midnight-10ml-3.png?v=2"],
      30: ["/assets/perfumes/midnight-30ml-1.png?v=2", "/assets/perfumes/midnight-30ml-2.png?v=2", "/assets/perfumes/midnight-30ml-3.png?v=2"],
      50: ["/assets/perfumes/midnight-50ml-1.png?v=2", "/assets/perfumes/midnight-50ml-2.png?v=2", "/assets/perfumes/midnight-50ml-3.png?v=2"]
    },
    traces: ["Blackcurrant", "Bergamot", "Tuberose", "Vanilla", "Musk"]
  },
  {
    id: "mirai",
    num: "No. 05",
    name: "Mirai",
    desc: "Vibrant Citrus, Lavender & Earthy Patchouli",
    fullDesc: "Mirai opens with zesty lemon and bergamot, leading to aromatic lavender and black pepper, settled over earthy patchouli.",
    scentFamily: "fresh",
    moods: ["regular", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 459, 30: 1199, 50: 1679 },
    mrps: { 10: 649, 30: 1809, 50: 2349 },
    badge: "bestseller",
    img: "/assets/perfumes/mirai-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/mirai-10ml-1.png?v=2", "/assets/perfumes/mirai-10ml-2.png?v=2", "/assets/perfumes/mirai-10ml-3.png?v=2"],
      30: ["/assets/perfumes/mirai-30ml-1.png?v=2", "/assets/perfumes/mirai-30ml-2.png?v=2", "/assets/perfumes/mirai-30ml-3.png?v=2"],
      50: ["/assets/perfumes/mirai-50ml-1.png?v=2", "/assets/perfumes/mirai-50ml-2.png?v=2", "/assets/perfumes/mirai-50ml-3.png?v=2"]
    },
    traces: ["Lemon", "Bergamot", "Lavender", "Black Pepper", "Patchouli"]
  },
  {
    id: "0809",
    num: "No. 06",
    name: "0809",
    desc: "Sichuan Pepper, Lavender & Warm Ambroxan",
    fullDesc: "0809 is an iconic formulation blending spicy Sichuan pepper with soothing French lavender and deep ambroxan.",
    scentFamily: "oriental",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 699, 30: 1994, 50: 2889 },
    mrps: { 10: 779, 30: 2759, 50: 4069 },
    badge: "bestseller",
    img: "/assets/perfumes/0809-50ml-1.png?v=2",
    sizeImages: {
      10: [
        '/assets/perfumes/0809-10ml-1.png?v=10',
        '/assets/perfumes/0809-10ml-2.png?v=10',
        '/assets/perfumes/0809-10ml-3.png?v=10'
      ],
      30: [
        '/assets/perfumes/0809-30ml-1.png?v=10',
        '/assets/perfumes/0809-30ml-2.png?v=10',
        '/assets/perfumes/0809-30ml-3.png?v=10'
      ],
      50: [
        '/assets/perfumes/0809-50ml-1.png?v=10',
        '/assets/perfumes/0809-50ml-2.png?v=10',
        '/assets/perfumes/0809-50ml-3.png?v=10'
      ]
    },
    traces: ["Sichuan Pepper", "Lavender", "Star Anise", "Nutmeg", "Ambroxan"]
  },
  {
    id: "personna",
    num: "No. 07",
    name: "Personna",
    desc: "Mandarin, Bergamot & Spiced Rose Accord",
    fullDesc: "Personna weaves mandarin and bergamot into a heart of spiced rose and cardamom, creating an unforgettable aura.",
    scentFamily: "oriental",
    moods: ["regular", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 495, 30: 1219, 50: 1593 },
    mrps: { 10: 689, 30: 1409, 50: 2259 },
    badge: null,
    img: "/assets/perfumes/personna-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/personna-10ml-1.png?v=2", "/assets/perfumes/personna-10ml-2.png?v=2", "/assets/perfumes/personna-10ml-3.png?v=2"],
      30: ["/assets/perfumes/personna-30ml-1.png?v=2", "/assets/perfumes/personna-30ml-2.png?v=2", "/assets/perfumes/personna-30ml-3.png?v=2"],
      50: ["/assets/perfumes/personna-50ml-1.png?v=2", "/assets/perfumes/personna-50ml-2.png?v=2", "/assets/perfumes/personna-50ml-3.png?v=2"]
    },
    traces: ["Mandarin", "Bergamot", "Rose", "Cardamom", "Patchouli"]
  },
  {
    id: "purple-oud",
    num: "No. 08",
    name: "Purple Oud",
    desc: "Smoky Cambodian Oud, Fiery Saffron & Amethyst Rose",
    fullDesc: "Purple Oud is a majestic composition of smoky Cambodian oud, fiery saffron threads, and velvety amethyst rose.",
    scentFamily: "woody",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 659, 30: 1199, 50: 1489 },
    mrps: { 10: 779, 30: 1409, 50: 1859 },
    badge: "exclusive",
    img: "/assets/perfumes/purple-oud-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/purple-oud-10ml-1.png?v=2", "/assets/perfumes/purple-oud-10ml-2.png?v=2", "/assets/perfumes/purple-oud-10ml-3.png?v=2"],
      30: ["/assets/perfumes/purple-oud-30ml-1.png?v=2", "/assets/perfumes/purple-oud-30ml-2.png?v=2", "/assets/perfumes/purple-oud-30ml-3.png?v=2"],
      50: ["/assets/perfumes/purple-oud-50ml-1.png?v=2", "/assets/perfumes/purple-oud-50ml-2.png?v=2", "/assets/perfumes/purple-oud-50ml-3.png?v=2"]
    },
    traces: ["Cambodian Oud", "Fiery Saffron", "Amethyst Rose", "Amberwood"]
  },
  {
    id: "rich",
    num: "No. 09",
    name: "Rich",
    desc: "Opulent Bergamot, Spiced Rose & Velvet Amber Musk",
    fullDesc: "Rich exudes luxury with bergamot and mandarin opening notes, moving into a heart of spiced rose and velvet amber.",
    scentFamily: "ambar",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 559, 30: 1287, 50: 1593 },
    mrps: { 10: 779, 30: 1809, 50: 2259 },
    badge: "new",
    img: "/assets/perfumes/rich-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/rich-10ml-1.png?v=2", "/assets/perfumes/rich-10ml-2.png?v=2", "/assets/perfumes/rich-10ml-3.png?v=2"],
      30: ["/assets/perfumes/rich-30ml-1.png?v=2", "/assets/perfumes/rich-30ml-2.png?v=2", "/assets/perfumes/rich-30ml-3.png?v=2"],
      50: ["/assets/perfumes/rich-50ml-1.png?v=2", "/assets/perfumes/rich-50ml-2.png?v=2", "/assets/perfumes/rich-50ml-3.png?v=2"]
    },
    traces: ["Bergamot", "Mandarin", "Spiced Rose", "Patchouli", "Amber Musk"]
  },
  {
    id: "seductive",
    num: "No. 10",
    name: "Seductive",
    desc: "Citric Limon, Fresh Lavender & Velvet Amber",
    fullDesc: "Seductive offers a magnetic scent bubble with top notes of limon and lavender, settling onto spicy florals and velvet amber.",
    scentFamily: "fresh",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 459, 30: 999, 50: 1149 },
    mrps: { 10: 649, 30: 1409, 50: 2099 },
    badge: "bestseller",
    img: "/assets/perfumes/seductive-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/seductive-10ml-1.png?v=2", "/assets/perfumes/seductive-10ml-2.png?v=2", "/assets/perfumes/seductive-10ml-3.png?v=2"],
      30: ["/assets/perfumes/seductive-30ml-1.png?v=2", "/assets/perfumes/seductive-30ml-2.png?v=2", "/assets/perfumes/seductive-30ml-3.png?v=2"],
      50: ["/assets/perfumes/seductive-50ml-1.png?v=2", "/assets/perfumes/seductive-50ml-2.png?v=2", "/assets/perfumes/seductive-50ml-3.png?v=2"]
    },
    traces: ["Citric Limon", "Fresh Lavender", "Spicy Floral", "Patchouli", "Amber"]
  },
  {
    id: "white-oud",
    num: "No. 11",
    name: "White Oud",
    desc: "Essence of Oud, Pink Pepper & Luminous Amber",
    fullDesc: "White Oud strips traditional oud back to something luminous, crisp, and quietly magnetic.",
    scentFamily: "woody",
    moods: ["regular", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [],
    prices: { 10: 659, 30: 1493, 50: 2889 },
    mrps: { 10: 779, 30: 2089, 50: 4069 },
    badge: "bestseller",
    img: "/assets/perfumes/white-oud-50ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/white-oud-10ml-1.png?v=2", "/assets/perfumes/white-oud-10ml-2.png?v=2", "/assets/perfumes/white-oud-10ml-3.png?v=2"],
      30: ["/assets/perfumes/white-oud-30ml-1.png?v=2", "/assets/perfumes/white-oud-30ml-2.png?v=2", "/assets/perfumes/white-oud-30ml-3.png?v=2"],
      50: ["/assets/perfumes/white-oud-50ml-1.png?v=2", "/assets/perfumes/white-oud-50ml-2.png?v=2", "/assets/perfumes/white-oud-50ml-3.png?v=2"]
    },
    traces: ["Essence of Oud", "Lavender", "Pink Pepper", "Vetiver", "Labdanum"]
  },
  {
    id: "zephyrine",
    num: "No. 12",
    name: "Zephyrine",
    desc: "Airy Citrus Breeze, Jasmine & Smooth Sandalwood",
    fullDesc: "Zephyrine by SENTIRE By PC captures the essence of a gentle breeze, offering a scent that is light, airy, and utterly captivating. Opens with top notes of fresh lemon and bergamot for immediate clarity. The heart reveals delicate jasmine, lavender, rosemary, and thyme, settling gracefully into warm, comforting base notes of resinous amber and smooth sandalwood.",
    scentFamily: "floral",
    moods: ["casual", "regular"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/zephyrine-30ml-1.png?v=2",
    sizeImages: {
      10: ["/assets/perfumes/zephyrine-10ml-1.png?v=2", "/assets/perfumes/zephyrine-10ml-2.png?v=2", "/assets/perfumes/zephyrine-10ml-3.png?v=2"],
      30: ["/assets/perfumes/zephyrine-30ml-1.png?v=2", "/assets/perfumes/zephyrine-30ml-2.png?v=2", "/assets/perfumes/zephyrine-30ml-3.png?v=2"]
    },
    traces: ["Lemon", "Bergamot", "Jasmine", "Rosemary", "Smooth Sandalwood"]
  },
  {
    id: "bijou",
    num: "No. 13",
    name: "Bijou",
    desc: "Scintillating Jewels · Floral & Sandalwood",
    fullDesc: "Bijou by SENTIRE By PC transcends traditional gender boundaries to embody sophistication and glamour. Inspired by the scintillating world of precious jewels, this unisex fragrance is designed to ignite the senses and create an unforgettable experience.",
    scentFamily: "floral",
    moods: ["casual", "regular"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/bijou-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/bijou-10ml-1.png?v=2",
        "/assets/perfumes/bijou-10ml-2.png?v=2",
        "/assets/perfumes/bijou-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/bijou-30ml-1.png?v=2",
        "/assets/perfumes/bijou-30ml-2.png?v=2",
        "/assets/perfumes/bijou-30ml-3.png?v=2"
      ]
    },
    traces: ["Floral Bouquet", "Sandalwood", "Patchouli", "Vanilla", "Musk"]
  },
  {
    id: "dapper",
    num: "No. 14",
    name: "Dapper",
    desc: "Bold Tobacco, Clove & Cedarwood",
    fullDesc: "Dapper is an exquisite fragrance that transcends gender norms, enveloping the wearer in an aura of sophistication and timeless elegance.",
    scentFamily: "fresh",
    moods: ["sports", "regular"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/dapper-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/dapper-10ml-1.png?v=2",
        "/assets/perfumes/dapper-10ml-2.png?v=2",
        "/assets/perfumes/dapper-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/dapper-30ml-1.png?v=2",
        "/assets/perfumes/dapper-30ml-2.png?v=2",
        "/assets/perfumes/dapper-30ml-3.png?v=2"
      ]
    },
    traces: ["Tobacco", "Clove", "Cedarwood", "Sandalwood"]
  },
  {
    id: "le-chocolat",
    num: "No. 15",
    name: "Le Chocolat",
    desc: "Decadent Dark Cocoa, Creamy Vanilla & Cinnamon",
    fullDesc: "Le Chocolat by SENTIRE By PC is a decadent and indulgent fragrance that celebrates the rich, complex, and utterly irresistible aroma of chocolate.",
    scentFamily: "oriental",
    moods: ["date-night", "casual"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/le-chocolat-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/le-chocolat-10ml-1.png?v=2",
        "/assets/perfumes/le-chocolat-10ml-2.png?v=2",
        "/assets/perfumes/le-chocolat-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/le-chocolat-30ml-1.png?v=2",
        "/assets/perfumes/le-chocolat-30ml-2.png?v=2",
        "/assets/perfumes/le-chocolat-30ml-3.png?v=2"
      ]
    },
    traces: ["Dark Chocolate", "Cocoa", "Creamy Vanilla", "Cinnamon", "Sandalwood"]
  },
  {
    id: "pc-leather",
    num: "No. 16",
    name: "PC Leather",
    desc: "Fine Italian Leather & Warm Woody Spices",
    fullDesc: "PC Leather is an opulent fragrance capturing the luxurious essence of fine leather. Designed for individuals who appreciate sophistication and timeless style.",
    scentFamily: "woody",
    moods: ["party", "date-night"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/pc-leather.jpg",
    traces: ["Fine Leather", "Warm Spices", "Sandalwood", "Amber", "Musk"]
  },
  {
    id: "quantillion",
    num: "No. 17",
    name: "Quantillion",
    desc: "Vibrant Mandarin, Rose & Opulent Amberwood",
    fullDesc: "Quantillion by SENTIRE By PC is a fragrance that embodies the essence of sophistication and luxury.",
    scentFamily: "citrus",
    moods: ["sports", "casual"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/quantillion.jpg",
    traces: ["Mandarin", "Bergamot", "Rose", "Cardamom", "Amberwood"]
  },
  {
    id: "reiz",
    num: "No. 18",
    name: "Reiz",
    desc: "Effervescent Lemon, Cinnamon & Mysterious Musk",
    fullDesc: "Reiz embodies the charm and confidence of the modern individual. Meticulously crafted to radiate sophistication and allure.",
    scentFamily: "fresh",
    moods: ["regular", "sports"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/reiz-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/reiz-10ml-1.png?v=2",
        "/assets/perfumes/reiz-10ml-2.png?v=2",
        "/assets/perfumes/reiz-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/reiz-30ml-1.png?v=2",
        "/assets/perfumes/reiz-30ml-2.png?v=2",
        "/assets/perfumes/reiz-30ml-3.png?v=2"
      ]
    },
    traces: ["Juicy Lemon", "Zesty Orange", "Cinnamon", "Cardamom", "Musk"]
  },
  {
    id: "sent-aura",
    num: "No. 19",
    name: "Sent-Aura",
    desc: "Fresh Pear, Green Tea & Ethereal Violet",
    fullDesc: "Sent-Aura by SENTIRE By PC captures the essence of ethereal beauty and spiritual tranquility.",
    scentFamily: "floral",
    moods: ["regular", "casual"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/sent-aura-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/sent-aura-10ml-1.png?v=2",
        "/assets/perfumes/sent-aura-10ml-2.png?v=2",
        "/assets/perfumes/sent-aura-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/sent-aura-30ml-1.png?v=2",
        "/assets/perfumes/sent-aura-30ml-2.png?v=2",
        "/assets/perfumes/sent-aura-30ml-3.png?v=2"
      ]
    },
    traces: ["Pear", "Bergamot", "Green Tea", "Lily of Valley", "Cedarwood"]
  },
  {
    id: "vanaco",
    num: "No. 20",
    name: "Vanaco",
    desc: "Exhilarating Citrus, Black Pepper & Earthy Oakmoss",
    fullDesc: "Vanaco by SENTIRE By PC is a fragrance that embodies the spirit of adventure and the allure of the unknown.",
    scentFamily: "ambar",
    moods: ["date-night", "regular"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/vanaco-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/vanaco-10ml-1.png?v=2",
        "/assets/perfumes/vanaco-10ml-2.png?v=2",
        "/assets/perfumes/vanaco-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/vanaco-30ml-1.png?v=2",
        "/assets/perfumes/vanaco-30ml-2.png?v=2",
        "/assets/perfumes/vanaco-30ml-3.png?v=2"
      ]
    },
    traces: ["Lemon", "Grapefruit", "Black Pepper", "Cardamom", "Oakmoss"]
  },
  {
    id: "woo-dy",
    num: "No. 21",
    name: "Woo-Dy",
    desc: "Crisp Cedarwood, Cypress & Creamy Sandalwood",
    fullDesc: "Woo-Dy by SENTIRE By PC is a sophisticated and earthy fragrance that captures the essence of nature's finest woods.",
    scentFamily: "woody",
    moods: ["casual", "regular"],
    sizes: [10, 30],
    outOfStockSizes: [],
    prices: { 10: 799, 30: 1499 },
    mrps: { 10: 999, 30: 1999 },
    badge: "new",
    img: "/assets/perfumes/woo-dy-30ml-1.png?v=2",
    sizeImages: {
      10: [
        "/assets/perfumes/woo-dy-10ml-1.png?v=2",
        "/assets/perfumes/woo-dy-10ml-2.png?v=2",
        "/assets/perfumes/woo-dy-10ml-3.png?v=2"
      ],
      30: [
        "/assets/perfumes/woo-dy-30ml-1.png?v=2",
        "/assets/perfumes/woo-dy-30ml-2.png?v=2",
        "/assets/perfumes/woo-dy-30ml-3.png?v=2"
      ]
    },
    traces: ["Cedarwood", "Cypress", "Sandalwood", "Vetiver", "Resinous Amber"]
  }
];
