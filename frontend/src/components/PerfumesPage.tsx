import { ALL_PERFUMES } from "../data/perfumes";
import { useState, useMemo, useEffect } from "react";
import type { PerfumeFilterOptions } from "./Navbar";
import ProductDetailModal from "./ProductDetailModal";

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

const ALL_SIZES_PRODUCTS: PerfumeProduct[] = ALL_PERFUMES;

const EXCLUSIVE_PURPLE_OUD: PerfumeProduct = {
  id: "purple-oud",
    sizeImages: {
      "10": [
            "/assets/purple-oud.png",
            "/assets/purple-oud.png",
            "/assets/purple-oud.png"
      ],
      "30": [
            "/assets/purple-oud.png",
            "/assets/purple-oud.png",
            "/assets/purple-oud.png"
      ],
      "50": [
            "/assets/purple-oud.png",
            "/assets/purple-oud.png",
            "/assets/purple-oud.png"
      ]
},
  num: "No. 11",
  name: "Purple Oud",
  desc: "Smoky Cambodian Oud, Saffron & Amethyst Rose",
  fullDesc: "Purple Oud by SENTIRE By PC is a majestic, brooding composition created exclusively for connoisseurs of deep, magnetic sillage. Opens with smoky Cambodian oud and fiery saffron threads, evolving into a heart of velvety amethyst rose, and settling into a long-lasting base of warm amberwood and dark resinous accords.",
  scentFamily: "woody",
  moods: ["party", "date-night"],
  sizes: [10, 30, 50],
  outOfStockSizes: [10, 30],
  prices: { 10: 799, 30: 1499, 50: 1489 },
  badge: "exclusive",
  img: "/assets/purple-oud.png",
  traces: ["Cambodian Oud", "Fiery Saffron", "Amethyst Rose", "Amberwood"],
};

const THIRTY_ML_PRODUCTS: PerfumeProduct[] = [
  {
    id: "bijou",
    num: "No. 12",
    name: "Bijou",
    desc: "Scintillating Jewels · Floral & Sandalwood",
    fullDesc: "Bijou by SENTIRE By PC transcends traditional gender boundaries to embody sophistication and glamour. Inspired by the scintillating world of precious jewels, this unisex fragrance is designed to ignite the senses and create an unforgettable experience. The scent opens with delicate floral notes that evoke elegance, captivating the senses with an enchanting aroma. As it evolves, it reveals a warm and sensual finish with notes of sandalwood, patchouli, vanilla, and musk that wrap you in an aura of pure luxury.",
    scentFamily: "floral",
    moods: ["casual", "regular"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/bijou.jpg",
    traces: ["Floral Bouquet", "Sandalwood", "Patchouli", "Vanilla", "Musk"],
  },
  {
    id: "dapper",
    num: "No. 13",
    name: "Dapper",
    desc: "Bold Tobacco, Clove & Cedarwood",
    fullDesc: "Dapper is an exquisite fragrance that transcends gender norms, enveloping the wearer in an aura of sophistication and timeless elegance. The olfactory embodiment of the contemporary individual who effortlessly commands attention, it opens with invigorating notes of tobacco, clove, and cedarwood. As Dapper unfolds, the heart reveals a harmonious blend of spices and woods, leaving a warm embrace of cedarwood and sandalwood that lingers delicately on the skin.",
    scentFamily: "fresh",
    moods: ["sports", "regular"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/dapper.jpg",
    traces: ["Tobacco", "Clove", "Cedarwood", "Sandalwood"],
  },
  {
    id: "le-chocolat",
    num: "No. 14",
    name: "Le Chocolat",
    desc: "Decadent Dark Cocoa, Creamy Vanilla & Cinnamon",
    fullDesc: "Le Chocolat by SENTIRE By PC is a decadent and indulgent fragrance that celebrates the rich, complex, and utterly irresistible aroma of chocolate. Opens with top notes of dark chocolate and cocoa, creating an immediate sense of warmth and richness. The heart reveals a blend of creamy vanilla and spicy cinnamon, grounded by base accords of amber, sandalwood, and sensual musk that transport you to a world of pure indulgence.",
    scentFamily: "oriental",
    moods: ["date-night", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/le-chocolat.jpg",
    traces: ["Dark Chocolate", "Cocoa", "Creamy Vanilla", "Cinnamon", "Sandalwood"],
  },
  {
    id: "pc-leather",
    num: "No. 15",
    name: "PC Leather",
    desc: "Fine Italian Leather & Warm Woody Spices",
    fullDesc: "PC Leather is an opulent fragrance capturing the luxurious essence of fine leather. Designed for individuals who appreciate sophistication and timeless style, it features a rich blend of leather notes, complemented by hints of warm spices and woody undertones. Opens with an intense leather aroma, unfolding into a harmonious heart of spices and woods exuding warmth and depth with notes of sandalwood, amber, and musk.",
    scentFamily: "woody",
    moods: ["party", "date-night"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/pc-leather.jpg",
    traces: ["Fine Leather", "Warm Spices", "Sandalwood", "Amber", "Musk"],
  },
  {
    id: "quantillion",
    num: "No. 16",
    name: "Quantillion",
    desc: "Vibrant Mandarin, Rose & Opulent Amberwood",
    fullDesc: "Quantillion by SENTIRE By PC is a fragrance that embodies the essence of sophistication and luxury. Designed for those who seek a scent that exuded elegance, it opens with top notes of bergamot and mandarin that provide an immediate sense of freshness. The heart reveals a rich blend of rose, jasmine, black pepper, and cardamom, concluding on grounded accords of patchouli, vetiver, and opulent amberwood.",
    scentFamily: "citrus",
    moods: ["sports", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/quantillion.jpg",
    traces: ["Mandarin", "Bergamot", "Rose", "Cardamom", "Amberwood"],
  },
  {
    id: "reiz",
    num: "No. 17",
    name: "Reiz",
    desc: "Effervescent Lemon, Cinnamon & Mysterious Musk",
    fullDesc: "Reiz embodies the charm and confidence of the modern individual. Meticulously crafted to radiate sophistication and allure, it opens with an effervescent blend of juicy lemon and zesty orange. As Reiz unfolds, the heart reveals enchanting notes of cinnamon and cardamom, concluding with a mysterious musk base that provides a comforting and intriguing essence lingering delicately on the skin.",
    scentFamily: "fresh",
    moods: ["regular", "sports"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/reiz.jpg",
    traces: ["Juicy Lemon", "Zesty Orange", "Cinnamon", "Cardamom", "Musk"],
  },
  {
    id: "sent-aura",
    num: "No. 18",
    name: "Sent-Aura",
    desc: "Fresh Pear, Green Tea & Ethereal Violet",
    fullDesc: "Sent-Aura by SENTIRE By PC captures the essence of ethereal beauty and spiritual tranquility. Designed for those who appreciate the delicate balance between elegance and serenity, it opens with top notes of bergamot and pear. The heart reveals a harmonious blend of lily of the valley, green tea, violet, and jasmine, settling onto warm, comforting base notes of amber and cedarwood.",
    scentFamily: "floral",
    moods: ["regular", "casual"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/sent-aura.jpg",
    traces: ["Pear", "Bergamot", "Green Tea", "Lily of Valley", "Cedarwood"],
  },
  {
    id: "vanaco",
    num: "No. 19",
    name: "Vanaco",
    desc: "Exhilarating Citrus, Black Pepper & Earthy Oakmoss",
    fullDesc: "Vanaco by SENTIRE By PC is a fragrance that embodies the spirit of adventure and the allure of the unknown. Opens with a vibrant burst of citrus—lemon and grapefruit—that immediately invigorates the senses. As the citrus notes begin to mellow, the heart reveals black pepper, cardamom, lavender, and geranium, supported by rich earthy base accords of vetiver, patchouli, oakmoss, and warm amber.",
    scentFamily: "ambar",
    moods: ["date-night", "regular"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/vanaco.jpg",
    traces: ["Lemon", "Grapefruit", "Black Pepper", "Cardamom", "Oakmoss"],
  },
  {
    id: "woo-dy",
    num: "No. 20",
    name: "Woo-Dy",
    desc: "Crisp Cedarwood, Cypress & Creamy Sandalwood",
    fullDesc: "Woo-Dy by SENTIRE By PC is a sophisticated and earthy fragrance that captures the essence of nature's finest woods. Opens with top notes of fresh cedarwood and cypress, evoking the serene and calming atmosphere of a dense forest. The heart reveals creamy sandalwood and smoky vetiver, concluding on warm, resinous base accords of amber and musk that linger beautifully.",
    scentFamily: "woody",
    moods: ["casual", "regular"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/woo-dy.jpg",
    traces: ["Cedarwood", "Cypress", "Sandalwood", "Vetiver", "Resinous Amber"],
  },
  {
    id: "zephyrine",
    num: "No. 21",
    name: "Zephyrine",
    desc: "Airy Citrus Breeze, Jasmine & Smooth Sandalwood",
    fullDesc: "Zephyrine by SENTIRE By PC captures the essence of a gentle breeze, offering a scent that is light, airy, and utterly captivating. Opens with top notes of fresh lemon and bergamot for immediate clarity. The heart reveals delicate jasmine, lavender, rosemary, and thyme, settling gracefully into warm, comforting base notes of resinous amber and smooth sandalwood.",
    scentFamily: "floral",
    moods: ["casual", "regular"],
    sizes: [10, 30, 50],
    outOfStockSizes: [50],
    prices: { 10: 799, 30: 1499, 50: 2499 },
    img: "/assets/zephyrine.jpg",
    traces: ["Lemon", "Bergamot", "Jasmine", "Rosemary", "Smooth Sandalwood"],
  },
];

import type { CartItem } from "./CartDrawer";

interface PerfumesPageProps {
  onBackToHome: () => void;
  onOpenBundleModal?: () => void;
  initialFilters?: PerfumeFilterOptions;
  cartItems?: CartItem[];
  onAddToCart?: (product: { id: string; name: string; num?: string; img: string }, size: number, price: number) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
}

export default function PerfumesPage({
  onBackToHome,
  onOpenBundleModal: _onOpenBundleModal,
  initialFilters,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
}: PerfumesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilters?.category || "all");
  const [selectedMood, setSelectedMood] = useState<string>(initialFilters?.mood || "all");
  const [selectedSizes, setSelectedSizes] = useState<number[]>(initialFilters?.size ? [initialFilters.size] : []);
  const [selectedScents, setSelectedScents] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialFilters?.collection || "all");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, number>>({});
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<PerfumeProduct | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PerfumeProduct | null>(null);

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.size !== undefined) {
        setSelectedSizes([initialFilters.size]);
      } else {
        setSelectedSizes([]);
      }

      if (initialFilters.mood !== undefined) {
        setSelectedMood(initialFilters.mood);
      } else {
        setSelectedMood("all");
      }

      if (initialFilters.category !== undefined) {
        setSelectedCategory(initialFilters.category);
      } else {
        setSelectedCategory("all");
      }

      if (initialFilters.collection !== undefined) {
        setSelectedCollection(initialFilters.collection);
      } else {
        setSelectedCollection("all");
      }
    }
  }, [initialFilters]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedMood !== "all") count++;
    if (selectedCategory !== "all") count++;
    count += selectedSizes.length;
    count += selectedScents.length;
    if (selectedCollection !== "all") count++;
    return count;
  }, [selectedMood, selectedCategory, selectedSizes, selectedScents, selectedCollection]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedMood("all");
    setSelectedSizes([]);
    setSelectedScents([]);
    setSelectedCollection("all");
  };

  const filterProduct = (p: PerfumeProduct) => {
    if (selectedCategory === "bestsellers" && p.badge !== "bestseller") return false;
    if (selectedCategory === "woody-oud" && p.scentFamily !== "woody") return false;
    if (selectedCategory === "fresh-aquatic" && p.scentFamily !== "fresh" && p.scentFamily !== "citrus") return false;
    if (selectedCategory === "floral-gourmand" && p.scentFamily !== "floral" && p.scentFamily !== "oriental") return false;
    if (selectedCategory === "50ml-exclusive" && p.id !== "purple-oud") return false;

    if (selectedMood !== "all" && !p.moods.includes(selectedMood)) return false;
    if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s as 10 | 30 | 50))) return false;
    if (selectedScents.length > 0 && !selectedScents.includes(p.scentFamily)) return false;
    if (selectedCollection === "50ml-exclusive" && p.id !== "purple-oud") return false;
    return true;
  };

  const sortProducts = (list: PerfumeProduct[]) => {
    const copy = [...list];
    if (sortOption === "bestselling") {
      return copy.sort((a, b) => (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0));
    }
    if (sortOption === "newest") {
      return copy.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
    }
    if (sortOption === "price-asc") {
      return copy.sort((a, b) => a.prices[a.sizes[0]] - b.prices[b.sizes[0]]);
    }
    if (sortOption === "price-desc") {
      return copy.sort((a, b) => b.prices[b.sizes[0]] - a.prices[a.sizes[0]]);
    }
    return copy;
  };

  const allProductsList = useMemo(
    () => [EXCLUSIVE_PURPLE_OUD, ...ALL_SIZES_PRODUCTS, ...THIRTY_ML_PRODUCTS],
    []
  );

  const filteredAllSizes = useMemo(
    () => sortProducts(ALL_SIZES_PRODUCTS.filter(filterProduct)),
    [selectedCategory, selectedMood, selectedSizes, selectedScents, selectedCollection, sortOption]
  );
  const filteredThirtyMl = useMemo(
    () => sortProducts(THIRTY_ML_PRODUCTS.filter(filterProduct)),
    [selectedCategory, selectedMood, selectedSizes, selectedScents, selectedCollection, sortOption]
  );
  const filteredUnifiedList = useMemo(
    () => sortProducts(allProductsList.filter(filterProduct)),
    [allProductsList, selectedCategory, selectedMood, selectedSizes, selectedScents, selectedCollection, sortOption]
  );

  const handleProductSizeSelect = (productId: string, size: number) => {
    setSelectedProductSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const getProductSize = (p: PerfumeProduct): number => {
    // 1. If manually selected for this specific product, use it
    if (selectedProductSizes[p.id] && p.sizes.includes(selectedProductSizes[p.id] as any)) {
      return selectedProductSizes[p.id];
    }
    // 2. If a size filter is active (e.g. 10 ML), default to that active size!
    if (selectedSizes.length > 0) {
      const activeSize = selectedSizes[0];
      if (p.sizes.includes(activeSize as any)) {
        return activeSize;
      }
    }
    // 3. When no size filter is applied, auto-select 50 ML if in stock!
    const outStock = p.outOfStockSizes || [];
    if (p.sizes.includes(50) && !outStock.includes(50)) {
      return 50;
    }
    // Otherwise select largest available in-stock size
    const inStock = p.sizes.filter((s) => !outStock.includes(s));
    if (inStock.length > 0) {
      return inStock[inStock.length - 1];
    }
    return p.sizes[0];
  };

  const renderProductCard = (p: PerfumeProduct) => {
    const currentSize = getProductSize(p);
    const currentPrice = p.prices[currentSize] || p.prices[p.sizes[0]] || 799;
    const isOutOfStock = p.outOfStockSizes?.includes(currentSize as any) ?? false;
    const qtyInBag = getItemQuantity(p.id, currentSize);
    const notesString = p.traces && p.traces.length > 0 ? p.traces.slice(0, 2).join(" · ") : p.desc;
    const badgeText = p.badge === "bestseller" ? "BEST SELLER" : p.badge === "new" ? "NEW LAUNCH" : p.badge ? p.badge.toUpperCase() : null;

    return (
      <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-3 sm:p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
        {/* Top Content */}
        <div>
          {/* Media box */}
          <div
            onClick={() => setSelectedDetailProduct(p)}
            className="relative w-full aspect-square rounded-xl bg-[#f6f2ec] overflow-hidden p-2 flex items-center justify-center cursor-pointer"
            title={`View info for ${p.name}`}
          >
            {badgeText && (
              <span className="absolute top-2 left-2 z-10 rounded-full bg-gradient-to-r from-[#1a120a] to-[#0d0906] text-[#c89b5a] text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 border border-[#c89b5a]/40 shadow-sm">
                {badgeText}
              </span>
            )}
            <img
              src={(p.sizeImages && p.sizeImages[currentSize]?.[0]) || p.img}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-white/95 text-ink text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md border border-[#c89b5a]/40">
                Quick View
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="mt-3 text-center">
            <h3
              onClick={() => setSelectedDetailProduct(p)}
              className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-ink hover:text-[#c89b5a] transition-colors cursor-pointer inline-block truncate max-w-full"
              title={`View info for ${p.name}`}
            >
              {p.name}
            </h3>
            <p
              onClick={() => setSelectedDetailProduct(p)}
              className="text-[10px] text-ink/60 mt-0.5 truncate cursor-pointer hover:text-ink/90 transition-colors"
            >
              {notesString}
            </p>

            {/* Scent Info link */}
            <button
              type="button"
              onClick={() => setSelectedDetailProduct(p)}
              className="mt-1 mb-1 inline-flex items-center justify-center gap-1 text-[9.5px] font-bold tracking-widest text-[#c89b5a] hover:text-ink uppercase transition-colors cursor-pointer"
            >
              <span>View Scent Info</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Size Pills */}
            <div className="flex items-center justify-center gap-1.5 my-2">
              {p.sizes.map((sz) => {
                const isSizeOut = Boolean(p.outOfStockSizes?.includes(sz as any));
                const isSelected = currentSize === sz;

                if (isSizeOut) {
                  return (
                    <button
                      key={sz}
                      disabled
                      type="button"
                      className="rounded px-2.5 py-1 text-[9px] font-semibold tracking-wider bg-stone-100 text-stone-400 border border-stone-200 opacity-40 line-through cursor-not-allowed select-none"
                      title="Out of stock in this size"
                    >
                      {sz}ML
                    </button>
                  );
                }

                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductSizeSelect(p.id, sz);
                    }}
                    className={`rounded px-2.5 py-1 text-[9px] font-semibold tracking-wider border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907] font-bold shadow-xs scale-105"
                        : "bg-[#fdfbf7] text-[#1e1e1e] border-black/15 hover:border-[#c89b5a] hover:text-[#c89b5a]"
                    }`}
                  >
                    {sz}ML
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Cart Stepper */}
        <div className="mt-2 text-center">
          <div className="flex items-baseline justify-center gap-1.5 text-center">
            <span className="font-bold text-xs sm:text-sm text-ink">₹{currentPrice.toLocaleString()}</span>
            <span className="text-[10px] text-ink/40 line-through">MRP ₹{(p.mrps && p.mrps[currentSize] ? p.mrps[currentSize] : Math.round(currentPrice * 1.35)).toLocaleString()}</span>
          </div>

          {isOutOfStock ? (
            <button disabled className="mt-2 w-full rounded-md bg-stone-200 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 cursor-not-allowed">
              Out of Stock
            </button>
          ) : qtyInBag > 0 ? (
            <div className="mt-2 flex items-center justify-between rounded-md bg-[#0b0907] text-white border border-[#c89b5a]/40 px-2 py-1.5 shadow-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity?.(p.id, currentSize, -1);
                }}
                className="flex h-5 w-5 items-center justify-center text-xs font-bold text-[#c89b5a] hover:bg-white/10 rounded transition-all cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-[10px] font-extrabold text-[#e2c48e] tracking-wider uppercase">
                {qtyInBag} IN BAG ({currentSize}ML)
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity?.(p.id, currentSize, 1);
                }}
                className="flex h-5 w-5 items-center justify-center text-xs font-bold text-[#c89b5a] hover:bg-white/10 rounded transition-all cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.({ id: p.id, name: p.name, num: p.num, img: p.img }, currentSize, currentPrice);
                showToast(`Added ${p.name} (${currentSize}ML) to Bag`);
              }}
              className="mt-2 w-full rounded-md bg-[#0b0907] py-2 text-[10px] font-bold uppercase tracking-widest text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all shadow-xs border border-[#c89b5a]/40 cursor-pointer"
            >
              Add to Bag
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] text-ink font-sans selection:bg-gold/20 selection:text-ink">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full border border-gold/30 bg-[#120e0a] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-2xl transition-all animate-bounce">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            {toastMessage}
          </span>
        </div>
      )}

      {/* ── MOBILE EDITORIAL HERO ── */}
      <section className="block sm:hidden border-b border-black/5 bg-gradient-to-b from-[#f4eee5] via-[#faf6f0] to-[#fbf9f5] pt-6 pb-6 px-4">
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-ink/40 mb-2">
          <button onClick={onBackToHome} className="hover:text-[#c89b5a] transition-colors cursor-pointer">
            Home
          </button>
          <span className="text-[#c89b5a]/50">•</span>
          <span className="text-ink font-semibold">Perfume Library</span>
        </div>
        <span className="inline-block rounded-full border border-[#c89b5a]/40 bg-[#c89b5a]/10 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] mb-2">
          SENTIRE BY PC
        </span>
        <h1 className="font-display text-2xl text-ink font-normal leading-tight tracking-tight">
          The Perfume Library
        </h1>
        <p className="mt-1.5 text-xs text-ink/65 leading-relaxed font-light">
          An extraordinary repertoire of artisanal extraits and eau de parfums crafted with rare botanicals and noble woods.
        </p>

        {/* Fraganote-inspired Horizontal Scrollable Quick Filter Chips */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all ${
              selectedCategory === "all"
                ? "bg-[#0b0907] text-[#c89b5a] shadow-xs"
                : "bg-white border border-black/10 text-ink/70"
            }`}
          >
            All Fragrances
          </button>
          <button
            onClick={() => setSelectedCategory("bestsellers")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all ${
              selectedCategory === "bestsellers"
                ? "bg-[#0b0907] text-[#c89b5a] shadow-xs"
                : "bg-white border border-black/10 text-ink/70"
            }`}
          >
            ✨ Bestsellers
          </button>
          <button
            onClick={() => setSelectedCategory("woody-oud")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all ${
              selectedCategory === "woody-oud"
                ? "bg-[#0b0907] text-[#c89b5a] shadow-xs"
                : "bg-white border border-black/10 text-ink/70"
            }`}
          >
            🪵 Woody & Oud
          </button>
          <button
            onClick={() => setSelectedCategory("fresh-aquatic")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all ${
              selectedCategory === "fresh-aquatic"
                ? "bg-[#0b0907] text-[#c89b5a] shadow-xs"
                : "bg-white border border-black/10 text-ink/70"
            }`}
          >
            🌊 Fresh Aquatic
          </button>
          <button
            onClick={() => setSelectedCategory("floral-gourmand")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all ${
              selectedCategory === "floral-gourmand"
                ? "bg-[#0b0907] text-[#c89b5a] shadow-xs"
                : "bg-white border border-black/10 text-ink/70"
            }`}
          >
            🌸 Floral & Gourmand
          </button>
        </div>
      </section>

      {/* ── LUXURY EDITORIAL HERO DESKTOP ── */}
      <section className="hidden sm:block relative z-30 border-b border-black/5 bg-gradient-to-b from-[#f4eee5] via-[#faf6f0] to-[#fbf9f5] pt-14 pb-16 px-6 lg:px-16">
        {/* Subtle Ambient Background Light */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl opacity-70" />

        <div className="relative mx-auto max-w-[1400px]">
          {/* Top Breadcrumb */}
          <div className="mb-6 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-ink/40">
            <button onClick={onBackToHome} className="hover:text-gold transition-colors duration-200 cursor-pointer">
              Home
            </button>
            <span className="text-gold/50">•</span>
            <span className="text-ink font-semibold tracking-[0.2em]">Haute Parfumerie</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-gold mb-3">
                SENTIRE BY PC
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-[1.08] tracking-tight">
                The Perfume Library
              </h1>
              <p className="mt-4 text-xs sm:text-sm lg:text-base text-ink/65 leading-relaxed font-light">
                An extraordinary repertoire of artisanal extraits and eau de parfums. Each formulation is crafted with rare botanicals, noble woods, and precious resins designed to leave an unforgettable signature.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:self-end">
              {/* Custom Luxury Sort Dropdown & Sub-Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-3 rounded-full border border-gold/40 bg-[#120e0a] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md hover:border-gold hover:bg-[#1a140f] transition-all cursor-pointer group"
                >
                  <span className="text-gold font-bold">Sort By:</span>
                  <span className="text-white/90 font-medium">
                    {
                      [
                        { id: "featured", label: "Curated Collection" },
                        { id: "bestselling", label: "Best Sellers First" },
                        { id: "newest", label: "New Arrivals" },
                        { id: "price-asc", label: "Price: Low to High" },
                        { id: "price-desc", label: "Price: High to Low" },
                      ].find((s) => s.id === sortOption)?.label || "Curated Collection"
                    }
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                    <div className="absolute right-0 top-full mt-2.5 z-50 w-72 rounded-2xl border border-gold/30 bg-[#14100c]/95 p-2 shadow-2xl backdrop-blur-xl animate-fadeIn">
                      <div className="px-3.5 py-2 border-b border-white/10 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gold block mb-0.5">
                          Haute Parfumerie Order
                        </span>
                        <span className="text-[11px] text-white/50">Select preferred sort arrangement</span>
                      </div>

                      <div className="space-y-1">
                        {[
                          { id: "featured", label: "Curated Collection", sub: "Handpicked signature lineup" },
                          { id: "bestselling", label: "Best Sellers First", sub: "Most popular formulations" },
                          { id: "newest", label: "New Arrivals", sub: "Latest artisanal releases" },
                          { id: "price-asc", label: "Price: Low to High", sub: "Accessible luxury formulations" },
                          { id: "price-desc", label: "Price: High to Low", sub: "Prestige extraits & coffrets" },
                        ].map((option) => {
                          const isSelected = sortOption === option.id;

                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSortOption(option.id);
                                setIsSortOpen(false);
                              }}
                              className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-gold/20 border border-gold/40 text-gold"
                                  : "hover:bg-white/5 text-white/80 hover:text-white"
                              }`}
                            >
                              <div>
                                <span className={`block text-xs font-semibold tracking-wide ${isSelected ? "text-gold" : "text-white"}`}>
                                  {option.label}
                                </span>
                                <span className="block text-[10px] text-white/40 mt-0.5">{option.sub}</span>
                              </div>
                              {isSelected && (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white shadow-xs ml-2">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY CONTROL BAR & QUICK CATEGORIES ── */}
      <section className="sticky top-[71px] z-30 border-b border-black/8 bg-[#fbf9f5]/95 backdrop-blur-md px-6 lg:px-16 py-3.5 shadow-sm transition-all">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 rounded-full border border-ink/20 bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-gold hover:border-gold transition-all cursor-pointer shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              All Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="h-4 w-px bg-black/10 mx-1" />

            {[
              { id: "all", label: "All Fragrances" },
              { id: "bestsellers", label: "Best Sellers" },
              { id: "woody-oud", label: "Woody & Oud" },
              { id: "fresh-aquatic", label: "Fresh & Aquatic" },
              { id: "floral-gourmand", label: "Floral & Gourmand" },
              { id: "50ml-exclusive", label: "50 ML Exclusive" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gold text-white font-semibold shadow-sm"
                    : "bg-white/80 border border-black/8 text-ink/70 hover:border-gold/50 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold uppercase tracking-wider text-ink/40 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear ({activeFilterCount})
              </button>
            )}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-gold transition-all cursor-pointer shadow-xs"
              >
                <span>🛍️ Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER (FULL WIDTH RESPONSIVE GRID) ── */}
      <main className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-16 py-2 sm:py-12 space-y-6 sm:space-y-16">
        {/* UNIFIED GRID WHEN A SIZE FILTER IS ACTIVE */}
        {selectedSizes.length > 0 ? (
          <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
                  CURATED COLLECTION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                  Available in {selectedSizes[0]} ML Formulations
                </h2>
              </div>
              <span className="text-xs font-medium tracking-wider text-ink/40 uppercase">
                {filteredUnifiedList.length} Formulations
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {filteredUnifiedList.map(renderProductCard)}
            </div>
          </section>
        ) : (
          <>
            {/* ── SECTION 1: PURPLE OUD — VOGUE STYLE HIGH LUXURY BANNER (TOP HERO PRODUCT) ── */}
            <section className="relative overflow-hidden rounded-2xl bg-[#0a0705] border border-[#c89b5a]/30 text-white p-5 sm:p-8 lg:p-16 shadow-2xl">
              <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#c89b5a]/15 blur-3xl opacity-60" />

              <div className="relative z-10 flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-7 space-y-3 sm:space-y-6 w-full text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/40 bg-[#c89b5a]/15 px-3 py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c89b5a] animate-ping" />
                    HAUTE PARFUMERIE · 50 ML EXCLUSIVE
                  </div>

                  <h2
                    onClick={() => setSelectedDetailProduct(EXCLUSIVE_PURPLE_OUD)}
                    className="font-display text-3xl sm:text-4xl lg:text-6xl text-white font-normal leading-[1.05] tracking-tight cursor-pointer hover:text-[#c89b5a] transition-colors"
                  >
                    Purple Oud
                  </h2>

                  <p className="text-xs sm:text-sm lg:text-base text-white/70 font-light leading-relaxed max-w-xl">
                    A majestic, brooding composition of smoky Cambodian oud, fiery saffron threads, and velvety amethyst rose. Created exclusively for connoisseurs of deep, magnetic sillage.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#c89b5a]/70 block">
                        Exclusive Edition
                      </span>
                      <div className="flex items-baseline gap-2"><span className="font-display text-2xl sm:text-3xl font-normal text-[#c89b5a]">₹1,489</span><span className="text-sm text-white/40 line-through">MRP ₹1,859</span></div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                      {(() => {
                        const purpleOudQty = getItemQuantity(EXCLUSIVE_PURPLE_OUD.id, 50);
                        if (purpleOudQty > 0) {
                          return (
                            <div className="flex-1 sm:flex-none flex items-center gap-3 rounded-full bg-[#120e0a] border border-[#c89b5a] px-6 py-2.5 text-white shadow-lg">
                              <button
                                onClick={() => onUpdateCartQuantity?.(EXCLUSIVE_PURPLE_OUD.id, 50, -1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all cursor-pointer"
                              >
                                −
                              </button>
                              <span className="text-xs font-extrabold text-[#e2c48e] uppercase tracking-wider px-2">
                                {purpleOudQty} IN BAG (50ML)
                              </span>
                              <button
                                onClick={() => onUpdateCartQuantity?.(EXCLUSIVE_PURPLE_OUD.id, 50, 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          );
                        }

                        return (
                          <button
                            onClick={() => {
                              onAddToCart?.(
                                { id: EXCLUSIVE_PURPLE_OUD.id, name: EXCLUSIVE_PURPLE_OUD.name, num: EXCLUSIVE_PURPLE_OUD.num, img: "/assets/purple-oud-banner.png?v=4" },
                                50,
                                1489
                              );
                              showToast("Added Purple Oud (50 ML) to Bag");
                            }}
                            className="flex-1 sm:flex-none rounded-full bg-[#c89b5a] px-4 py-3 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-black hover:bg-[#a97f43] transition-all shadow-lg cursor-pointer min-h-[44px]"
                          >
                            Acquire 50 ML Bottle
                          </button>
                        );
                      })()}
                      <button
                        onClick={() => setSelectedDetailProduct(EXCLUSIVE_PURPLE_OUD)}
                        className="flex-1 sm:flex-none rounded-full border border-[#c89b5a]/40 bg-white/5 px-4 py-3 sm:px-6 sm:py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all cursor-pointer min-h-[44px]"
                      >
                        Explore Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center w-full">
                  <div
                    onClick={() => setSelectedDetailProduct(EXCLUSIVE_PURPLE_OUD)}
                    className="relative aspect-square w-full max-w-[280px] sm:w-80 lg:w-96 overflow-hidden rounded-2xl border border-[#c89b5a]/30 bg-[#14100b] p-3 sm:p-4 shadow-2xl group cursor-pointer"
                  >
                    <img
                      src={"/assets/purple-oud-banner.png?v=4"}
                      alt="Purple Oud"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 2: AVAILABLE IN 10 / 30 / 50 ML ── */}
            {filteredAllSizes.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-end justify-between border-b border-black/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
                      SIGNATURE COLLECTION
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                      Available in 10 / 30 / 50 ML
                    </h2>
                  </div>
                  <span className="text-xs font-medium tracking-wider text-ink/40 uppercase">
                    {filteredAllSizes.length} Formulations
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                  {filteredAllSizes.map(renderProductCard)}
                </div>
              </section>
            )}

        {/* SECTION 3: AVAILABLE IN 10 / 30 ML */}
        {filteredThirtyMl.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
                  ESSENTIAL EDITION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                  Available in 10 / 30 ML
                </h2>
              </div>
              <span className="text-xs font-medium tracking-wider text-ink/40 uppercase">
                {filteredThirtyMl.length} Formulations
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {filteredThirtyMl.map(renderProductCard)}
            </div>
          </section>
        )}
      </>
    )}

        {/* ── SECTION 4: LUXURY BRAND PROMISE & BUNDLE BANNERS ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-xl border border-black/8 bg-white p-6 text-center space-y-2 shadow-xs">
            <span className="text-2xl block">📦</span>
            <h4 className="font-display text-lg text-ink font-medium">Complimentary Shipping</h4>
            <p className="text-xs text-ink/60 font-light">
              Free insured express delivery on all orders above ₹999 across India.
            </p>
          </div>

          <div className="rounded-xl border border-black/8 bg-white p-6 text-center space-y-2 shadow-xs">
            <span className="text-2xl block">✨</span>
            <h4 className="font-display text-lg text-ink font-medium">Haute Samples Included</h4>
            <p className="text-xs text-ink/60 font-light">
              Receive two complimentary 2ml extrait samples with every full-size bottle.
            </p>
          </div>


        </section>
      </main>

      {/* ── RESPONSIVE FILTER DRAWER / MOBILE BOTTOM SHEET ── */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end bg-black/60 backdrop-blur-sm transition-all">
          <div className="fixed inset-0" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="relative w-full md:max-w-md bg-[#fbf9f5] max-h-[90vh] md:max-h-full md:h-full rounded-t-3xl md:rounded-none overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between z-10 glass-bottom-sheet md:shadow-2xl border-t border-gold/40 md:border-t-0">
            
            {/* Mobile Drag Handle Bar */}
            <div className="w-12 h-1.5 rounded-full bg-black/20 mx-auto mb-4 md:hidden" />

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">HAUTE FILTERS</span>
                  <h3 className="font-display text-2xl text-ink font-medium">Refine Selection</h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="rounded-full flex min-w-[44px] min-h-[44px] items-center justify-center text-ink/50 hover:text-ink hover:bg-black/5 transition-all cursor-pointer"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              {/* By Size */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Bottle Size</h4>
                <div className="flex gap-3">
                  {[10, 30, 50].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        if (selectedSizes.includes(sz)) setSelectedSizes((prev) => prev.filter((s) => s !== sz));
                        else setSelectedSizes((prev) => [...prev, sz]);
                      }}
                      className={`flex-1 rounded-xl py-3 min-h-[44px] text-xs font-semibold tracking-wider transition-all cursor-pointer active:scale-95 ${
                        selectedSizes.includes(sz)
                          ? "bg-ink text-white shadow-md border border-gold/40"
                          : "border border-black/10 bg-white text-ink/70 hover:border-gold"
                      }`}
                    >
                      {sz} ML
                    </button>
                  ))}
                </div>
              </div>

              {/* By Mood */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Olfactory Mood</h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {[
                    { id: "party", label: "Party & Night" },
                    { id: "date-night", label: "Date Night & Romance" },
                    { id: "regular", label: "Everyday Signature" },
                    { id: "sports", label: "Sports & Energetic" },
                    { id: "casual", label: "Casual & Relaxed" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMood(selectedMood === m.id ? "all" : m.id)}
                      className={`rounded-xl p-3 min-h-[44px] text-left text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                        selectedMood === m.id
                          ? "bg-gold text-white font-semibold shadow-sm"
                          : "border border-black/10 bg-white text-ink/70 hover:border-gold/50"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* By Scent Family */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Fragrance Family</h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {["woody", "fresh", "ambar", "citrus", "oriental", "floral"].map((sc) => (
                    <button
                      key={sc}
                      onClick={() => {
                        if (selectedScents.includes(sc)) setSelectedScents((prev) => prev.filter((s) => s !== sc));
                        else setSelectedScents((prev) => [...prev, sc]);
                      }}
                      className={`rounded-xl p-3 min-h-[44px] text-left text-xs font-medium capitalize transition-all cursor-pointer active:scale-95 ${
                        selectedScents.includes(sc)
                          ? "bg-gold text-white font-semibold shadow-sm"
                          : "border border-black/10 bg-white text-ink/70 hover:border-gold/50"
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 flex gap-3 mt-6">
              <button
                onClick={clearAllFilters}
                className="flex-1 rounded-full border border-black/20 py-3.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-ink hover:bg-black/5 cursor-pointer active:scale-95"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 rounded-full bg-gold py-3.5 min-h-[44px] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b88a48] shadow-md cursor-pointer active:scale-95"
              >
                Apply ({filteredUnifiedList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESTORED COMPACT QUICK VIEW MODAL (When clicking "Quick View" button) ── */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded-2xl bg-[#fbf9f5] border border-gold/30 p-8 shadow-2xl relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-ink/50 hover:text-ink text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="aspect-[4/5] rounded-xl bg-[#f4eee6] p-4 flex items-center justify-center">
              <img
                src={quickViewProduct.img}
                alt={quickViewProduct.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  {quickViewProduct.num}
                </span>
                <h3 className="font-display text-3xl font-medium text-ink">{quickViewProduct.name}</h3>
                <p className="text-xs font-semibold text-gold mt-1 uppercase tracking-wider">{quickViewProduct.desc}</p>
                {quickViewProduct.fullDesc && (
                  <p className="text-xs text-ink/70 font-light mt-2 leading-relaxed">
                    {quickViewProduct.fullDesc}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-black/8 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40">Key Notes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.traces.map((note) => (
                      <span key={note} className="rounded-full bg-gold/10 px-3 py-1 text-[10px] font-medium text-gold">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-display font-semibold text-ink">
                    ₹{quickViewProduct.prices[quickViewProduct.sizes[quickViewProduct.sizes.length - 1]].toLocaleString()}
                  </span>
                  <span className="text-xs text-ink/50">
                    Sizes: {quickViewProduct.sizes.join("ml, ")}ml
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart?.(
                        { id: quickViewProduct.id, name: quickViewProduct.name, num: quickViewProduct.num, img: quickViewProduct.img },
                        quickViewProduct.sizes[0],
                        quickViewProduct.prices[quickViewProduct.sizes[0]]
                      );
                      showToast(`Added ${quickViewProduct.name} to Bag`);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 rounded-full bg-gold py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#b88a48] transition-all shadow-md cursor-pointer"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => {
                      const p = quickViewProduct;
                      setQuickViewProduct(null);
                      setSelectedDetailProduct(p);
                    }}
                    className="rounded-full border border-ink/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-white transition-all cursor-pointer"
                  >
                    Full Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DEEP DOWN DETAILS PDP MODAL (When clicking Image or Title) ── */}
      <ProductDetailModal
        product={selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
        onOpenCart={onOpenCart}
        onSelectProduct={(p) => setSelectedDetailProduct(p)}
        allProducts={allProductsList}
      />

      {/* ── SCENT FINDER QUIZ MODAL ── */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#fbf9f5] border border-gold/30 p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsQuizOpen(false);
                setQuizStep(0);
              }}
              className="absolute top-5 right-5 text-ink/50 hover:text-ink text-lg"
            >
              ✕
            </button>

            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
              HAUTE PARFUMERIE CONCIERGE
            </span>
            <h3 className="font-display text-2xl font-normal text-ink">Signature Scent Profiler</h3>
            <p className="text-xs text-ink/60 mt-1 mb-6">Answer 3 questions to discover your fragrance match.</p>

            {quizStep === 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/80">
                  1. What atmosphere resonates with your spirit?
                </p>
                {[
                  "Fresh Ocean Mist & Bergamot",
                  "Warm Cozy Vanilla & Sandalwood",
                  "Smoky Cambodian Oud & Saffron",
                  "Sweet Cocoa Gourmand & Hazelnut",
                ].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => setQuizStep(1)}
                    className="w-full rounded-xl border border-black/10 bg-white p-3.5 text-left text-xs font-medium text-ink hover:border-gold hover:bg-gold/5 transition-all cursor-pointer"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/80">
                  2. Which occasion will this fragrance elevate?
                </p>
                {[
                  "Everyday Signature Signature",
                  "Gala Evening & High-Party",
                  "Intimate Romantic Date Night",
                  "Executive Professional Presence",
                ].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => setQuizStep(2)}
                    className="w-full rounded-xl border border-black/10 bg-white p-3.5 text-left text-xs font-medium text-ink hover:border-gold hover:bg-gold/5 transition-all cursor-pointer"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-5 text-center py-4">
                <div className="text-4xl animate-bounce">✨</div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">Match Found</span>
                  <h4 className="font-display text-2xl font-normal text-ink mt-1">White Oud &amp; Deep Crush</h4>
                  <p className="text-xs text-ink/65 mt-2 max-w-sm mx-auto leading-relaxed">
                    A harmonious pair of pristine white floral amber and warm gourmand sandalwood.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsQuizOpen(false);
                    setQuizStep(0);
                    showToast("Fragrance match applied to collection");
                  }}
                  className="rounded-full bg-gold px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#b88a48] transition-all shadow-md"
                >
                  Explore Match
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal Window */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onOpenCart={onOpenCart}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          allProducts={allProductsList}
        />
      )}
    </div>
  );
}
