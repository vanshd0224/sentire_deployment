import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import type { CartItem } from "./CartDrawer";
import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";

interface BestSellersPageProps {
  onBackToHome: () => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
}

interface DisplayProduct {
  id: string;
  name: string;
  notes: string;
  image: string;
  badge: string;
  family: string;
  mood: string;
  prices: Record<number, { price: number; originalPrice: number }>;
}

const BEST_SELLERS_DATA: DisplayProduct[] = [
  {
    id: "seductive",
    name: "SEDUCTIVE",
    notes: "Citric Limon • Fresh Lavender • Velvet Amber",
    image: "/assets/seductive.png?v=11",
    badge: "BEST SELLER",
    family: "floral",
    mood: "date-night",
    prices: {
      10: { price: 459, originalPrice: 649 },
      30: { price: 999, originalPrice: 1409 },
      50: { price: 1149, originalPrice: 2099 },
    },
  },
  {
    id: "purple-oud",
    name: "PURPLE OUD",
    notes: "Cambodian Oud • Saffron • Amethyst Rose",
    image: "/assets/perfumes/purple-oud-50ml-2.png?v=3",
    badge: "EXCLUSIVE",
    family: "woody",
    mood: "party",
    prices: {
      50: { price: 1489, originalPrice: 1859 },
    },
  },
  {
    id: "calantha",
    name: "CALANTHA",
    notes: "Blooming Jasmine • Rose • Sandalwood Amber",
    image: "/assets/calantha.png?v=11",
    badge: "BEST SELLER",
    family: "floral",
    mood: "date-night",
    prices: {
      10: { price: 399, originalPrice: 449 },
      30: { price: 900, originalPrice: 1409 },
      50: { price: 1085, originalPrice: 1539 },
    },
  },
  {
    id: "mirai",
    name: "MIRAI",
    notes: "Zesty Lemon • Lavender • Earthy Patchouli",
    image: "/assets/mirai.png?v=11",
    badge: "BEST SELLER",
    family: "fresh",
    mood: "daily",
    prices: {
      10: { price: 459, originalPrice: 649 },
      30: { price: 1199, originalPrice: 1809 },
      50: { price: 1679, originalPrice: 2349 },
    },
  },
  {
    id: "deep-crush",
    name: "DEEP CRUSH",
    notes: "Lavender • Tobacco Woods • Sandalwood Amber",
    image: "/assets/deep-crush.png?v=11",
    badge: "BEST SELLER",
    family: "woody",
    mood: "party",
    prices: {
      10: { price: 350, originalPrice: 419 },
      30: { price: 899, originalPrice: 1319 },
      50: { price: 1085, originalPrice: 1539 },
    },
  },
  {
    id: "white-oud",
    name: "WHITE OUD",
    notes: "Essence of Oud • Pink Pepper • Luminous Amber",
    image: "/assets/white-oud.png?v=11",
    badge: "BEST SELLER",
    family: "woody",
    mood: "party",
    prices: {
      10: { price: 659, originalPrice: 779 },
      30: { price: 1493, originalPrice: 2099 },
      50: { price: 2889, originalPrice: 4069 },
    },
  },
];

export default function BestSellersPage({
  onBackToHome,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart: _onOpenCart,
}: BestSellersPageProps) {
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PerfumeProduct | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
  const [activeCategoryPill, setActiveCategoryPill] = useState("all");
  const [selectedMood, setSelectedMood] = useState("all");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rank");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const showToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const filteredProducts = BEST_SELLERS_DATA.filter((p) => {
    if (activeCategoryPill === "woody" && p.family !== "woody") return false;
    if (activeCategoryPill === "floral" && p.family !== "floral") return false;
    if (selectedMood !== "all" && p.mood !== selectedMood) return false;
    if (selectedFamily !== "all" && p.family !== selectedFamily) return false;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] text-ink font-sans">
      {addedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#c89b5a]/40 bg-[#120e0a] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-2xl animate-bounce">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c89b5a] animate-pulse" />
            {addedToast}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Breadcrumb matching Screenshot 111 */}
        <div className="mb-6 flex items-center gap-2 text-[11px] font-medium tracking-wider text-ink/50 uppercase">
          <button onClick={onBackToHome} className="hover:text-[#c89b5a] transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-ink font-bold">BEST SELLERS</span>
        </div>

        {/* Pre-title & Title matching Screenshot 111 */}
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
            👑 HAUTE PARFUMERIE • TOP 6 BEST SELLERS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-normal text-ink tracking-tight">
            Best Sellers
          </h1>
          <p className="text-sm text-ink/60 mt-2 max-w-3xl">
            Our 6 most coveted Extraits de Parfum — Seductive, Purple Oud, Calantha, Mirai, Deep Crush, and White Oud.
          </p>
        </div>

        {/* Filter Pills matching Screenshot 111 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <button
            onClick={() => setActiveCategoryPill("all")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "all" ? "bg-[#0b0907] text-white shadow" : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            All 6 Best Sellers
          </button>
          <button
            onClick={() => setActiveCategoryPill("woody")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "woody" ? "bg-[#0b0907] text-white shadow" : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            Woody & Oud
          </button>
          <button
            onClick={() => setActiveCategoryPill("floral")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "floral" ? "bg-[#0b0907] text-white shadow" : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            Floral & Gourmand
          </button>
          <button
            onClick={() => setActiveCategoryPill("oriental")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "oriental" ? "bg-[#0b0907] text-white shadow" : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            Oriental & Spice
          </button>
          <button
            onClick={() => setActiveCategoryPill("50ml")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "50ml" ? "bg-[#0b0907] text-white shadow" : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            50 ML Exclusives
          </button>
        </div>

        {/* Dropdowns Row matching Screenshot 111 */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-black/10">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[#c89b5a]"
            >
              <option value="all">All Moods</option>
              <option value="party">Evening & Party</option>
              <option value="date-night">Date Night</option>
              <option value="daily">Signature Daily</option>
            </select>

            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[#c89b5a]"
            >
              <option value="all">All Scent Families</option>
              <option value="woody">Woody & Oud</option>
              <option value="floral">Floral & Amber</option>
              <option value="fresh">Fresh & Citrus</option>
            </select>

            <div className="flex items-center rounded-full bg-white border border-black/15 p-1 text-xs font-bold">
              <button
                onClick={() => setSelectedSizeFilter("all")}
                className={`rounded-full px-3 py-1 transition-all ${
                  selectedSizeFilter === "all" ? "bg-[#c89b5a] text-black" : "text-ink/60"
                }`}
              >
                ALL SIZES
              </button>
              <button
                onClick={() => setSelectedSizeFilter("10")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "10" ? "bg-[#c89b5a] text-black" : "text-ink/60"
                }`}
              >
                10 ML
              </button>
              <button
                onClick={() => setSelectedSizeFilter("30")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "30" ? "bg-[#c89b5a] text-black" : "text-ink/60"
                }`}
              >
                30 ML
              </button>
              <button
                onClick={() => setSelectedSizeFilter("50")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "50" ? "bg-[#c89b5a] text-black" : "text-ink/60"
                }`}
              >
                50 ML
              </button>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[#c89b5a]"
          >
            <option value="rank">Sort by Rank</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Section Subhead matching Screenshot 111 */}
        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
            TOP RATED FORMULATIONS
          </span>
          <h2 className="font-display text-2xl font-bold text-ink">
            Showing {filteredProducts.length} Best Sellers
          </h2>
        </div>

        {/* Grid of Cards matching Screenshot 111 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const fullProd = ALL_PERFUMES.find((ap) => ap.id === p.id);
            const availableSizes = fullProd?.sizes || Object.keys(p.prices).map(Number);
            const currentSize = selectedSizes[p.id] || (availableSizes.includes(50) ? 50 : availableSizes[0]);
            const priceInfo = p.prices[currentSize] || p.prices[availableSizes[0]] || { price: 999, originalPrice: 1409 };
            const qty = getItemQuantity(p.id, currentSize);
            const displayImage = (fullProd?.sizeImages && (fullProd.sizeImages[currentSize as keyof typeof fullProd.sizeImages]?.[0] || (fullProd.sizeImages as any)[String(currentSize)]?.[0])) || fullProd?.img || p.image;

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => fullProd && setSelectedDetailProduct(fullProd)}
                    className="relative aspect-square w-full rounded-xl bg-[#f6f2ec] overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <img src={displayImage} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 rounded-full bg-[#120e0a] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#c89b5a]">
                      {p.badge}
                    </span>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 onClick={() => fullProd && setSelectedDetailProduct(fullProd)} className="font-display text-lg font-bold text-ink cursor-pointer hover:text-[#c89b5a]">
                      {p.name}
                    </h3>
                    <p className="text-xs text-ink/60 truncate mt-0.5">{p.notes}</p>
                  </div>

                  <div className="flex justify-center gap-1.5 my-3">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSizes((prev) => ({ ...prev, [p.id]: sz }))}
                        className={`rounded px-3 py-1 text-[10px] font-bold border transition-all cursor-pointer ${
                          currentSize === sz ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907]" : "bg-white text-ink border-black/15"
                        }`}
                      >
                        {sz}ML
                      </button>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-center gap-2 my-2">
                    <span className="font-sans font-bold text-base text-ink tabular-nums inline-flex items-baseline gap-0.5">₹{priceInfo.price.toLocaleString("en-IN")}</span>
                    <span className="font-sans text-xs text-ink/40 line-through tabular-nums inline-flex items-baseline gap-0.5">MRP ₹{priceInfo.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {qty > 0 ? (
                  <div className="mt-3 flex items-center justify-between rounded-md bg-[#0b0907] text-white border border-[#c89b5a]/40 px-3 py-2">
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, -1)} className="text-sm font-bold text-[#c89b5a]">−</button>
                    <span className="text-xs font-bold text-[#e2c48e]">{qty} IN BAG</span>
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, 1)} className="text-sm font-bold text-[#c89b5a]">+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart?.({ id: p.id, name: p.name, img: p.image }, currentSize, priceInfo.price);
                      showToast(`Added ${p.name} (${currentSize}ML) to Bag`);
                    }}
                    className="mt-3 w-full rounded-md bg-[#0b0907] py-2.5 text-xs font-bold uppercase tracking-widest text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all border border-[#c89b5a]/40 cursor-pointer"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          allProducts={ALL_PERFUMES}
        />
      )}
    </div>
  );
}
