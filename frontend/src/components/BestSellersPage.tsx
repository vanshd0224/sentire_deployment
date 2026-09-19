import { useState, useEffect, useRef } from "react";
import ProductCard from "../editorial/ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import type { CartItem } from "./CartDrawer";
import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";

interface BestSellersPageProps {
  onBackToHome: () => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number,
  ) => void;
  onUpdateCartQuantity?: (
    productId: string,
    size: number,
    delta: number,
  ) => void;
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
  const [selectedDetailProduct, setSelectedDetailProduct] =
    useState<PerfumeProduct | null>(null);

  const isFirstRender = useRef(true);

  // Sync address bar URL whenever selectedDetailProduct opens or closes in BestSellersPage
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith("/perfumes/")) {
        const slug = path.replace("/perfumes/", "").split("/")[0].split(".")[0];
        if (slug && slug !== "index" && slug !== "all") {
          const found = ALL_PERFUMES.find(
            (p) => p.id.toLowerCase() === slug.toLowerCase(),
          );
          if (found) {
            setSelectedDetailProduct(found);
            return;
          }
        }
      }
    }

    if (selectedDetailProduct) {
      try {
        const targetUrl = `/perfumes/${selectedDetailProduct.id}`;
        if (window.location.pathname !== targetUrl) {
          window.history.pushState(null, "", targetUrl);
        }
      } catch (e) {}
    } else {
      if (
        window.location.pathname.startsWith("/perfumes/") &&
        window.location.pathname !== "/perfumes"
      ) {
        try {
          window.history.pushState(null, "", "/bestsellers");
        } catch (e) {}
      }
    }
  }, [selectedDetailProduct]);
  const [activeCategoryPill, setActiveCategoryPill] = useState("all");
  const [selectedMood, setSelectedMood] = useState("all");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rank");



  const filteredProducts = BEST_SELLERS_DATA.filter((p) => {
    if (activeCategoryPill === "woody" && p.family !== "woody") return false;
    if (activeCategoryPill === "floral" && p.family !== "floral") return false;
    if (selectedMood !== "all" && p.mood !== selectedMood) return false;
    if (selectedFamily !== "all" && p.family !== selectedFamily) return false;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#f2f2f0] text-ink font-sans">
      {" "}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-32 sm:pb-20">
        {" "}
        {/* Breadcrumb matching Screenshot 111 */}
        <div className="mb-6 flex items-center gap-2 text-[11px] max-sm:text-[12px] font-medium tracking-wider text-ink/50 uppercase">
          {" "}
          <button
            onClick={onBackToHome}
            className="hover:text-[color:var(--accent)] transition-colors cursor-pointer"
          >
            {" "}
            Home
          </button>{" "}
          <span>/</span>{" "}
          <span className="text-ink font-bold">BEST SELLERS</span>{" "}
        </div>{" "}
        {/* Pre-title & Title matching Screenshot 111 */}
        <div className="mb-8">
          {" "}
          <span className="text-[10px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block mb-1">
            {" "}
            HAUTE PARFUMERIE • TOP 6 BEST SELLERS
          </span>{" "}
          <h1 className="font-display text-4xl sm:text-5xl font-normal text-ink tracking-tight">
            {" "}
            Best Sellers
          </h1>{" "}
          <p className="text-sm text-ink/60 mt-2 max-w-3xl">
            {" "}
            Discover SENTIRE By PC best-selling extraits de parfum, including
            our most-loved oud, woody, fresh and signature fragrances.
          </p>{" "}
        </div>{" "}
        {/* Filter Pills matching Screenshot 111 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          {" "}
          <button
            onClick={() => setActiveCategoryPill("all")}
            className={`on-dark rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "all"
                ? "bg-[#111111] text-white shadow"
                : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            {" "}
            All 6 Best Sellers
          </button>{" "}
          <button
            onClick={() => setActiveCategoryPill("woody")}
            className={`on-dark rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "woody"
                ? "bg-[#111111] text-white shadow"
                : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            {" "}
            Woody & Oud
          </button>{" "}
          <button
            onClick={() => setActiveCategoryPill("floral")}
            className={`on-dark rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "floral"
                ? "bg-[#111111] text-white shadow"
                : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            {" "}
            Floral & Gourmand
          </button>{" "}
          <button
            onClick={() => setActiveCategoryPill("oriental")}
            className={`on-dark rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "oriental"
                ? "bg-[#111111] text-white shadow"
                : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            {" "}
            Oriental & Spice
          </button>{" "}
          <button
            onClick={() => setActiveCategoryPill("50ml")}
            className={`on-dark rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategoryPill === "50ml"
                ? "bg-[#111111] text-white shadow"
                : "bg-white text-ink border border-black/10 hover:border-black/30"
            }`}
          >
            {" "}
            50 ML Exclusives
          </button>{" "}
        </div>{" "}
        {/* Dropdowns Row matching Screenshot 111 */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-black/10">
          {" "}
          <div className="flex flex-wrap items-center gap-3">
            {" "}
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[color:var(--accent)]"
            >
              {" "}
              <option value="all">All Moods</option>{" "}
              <option value="party">Evening & Party</option>{" "}
              <option value="date-night">Date Night</option>{" "}
              <option value="daily">Signature Daily</option>{" "}
            </select>{" "}
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[color:var(--accent)]"
            >
              {" "}
              <option value="all">All Scent Families</option>{" "}
              <option value="woody">Woody & Oud</option>{" "}
              <option value="floral">Floral & Amber</option>{" "}
              <option value="fresh">Fresh & Citrus</option>{" "}
            </select>{" "}
            <div className="flex items-center rounded-full bg-white border border-black/15 p-1 text-xs font-bold">
              {" "}
              <button
                onClick={() => setSelectedSizeFilter("all")}
                className={`rounded-full px-3 py-1 transition-all ${
                  selectedSizeFilter === "all"
                    ? "bg-[#6b1422] text-white"
                    : "text-ink/60"
                }`}
              >
                {" "}
                ALL SIZES
              </button>{" "}
              <button
                onClick={() => setSelectedSizeFilter("10")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "10"
                    ? "bg-[#6b1422] text-white"
                    : "text-ink/60"
                }`}
              >
                {" "}
                10 ML
              </button>{" "}
              <button
                onClick={() => setSelectedSizeFilter("30")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "30"
                    ? "bg-[#6b1422] text-white"
                    : "text-ink/60"
                }`}
              >
                {" "}
                30 ML
              </button>{" "}
              <button
                onClick={() => setSelectedSizeFilter("50")}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  selectedSizeFilter === "50"
                    ? "bg-[#6b1422] text-white"
                    : "text-ink/60"
                }`}
              >
                {" "}
                50 ML
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full bg-white border border-black/15 px-4 py-2 text-xs font-semibold text-ink cursor-pointer focus:outline-none focus:border-[color:var(--accent)]"
          >
            {" "}
            <option value="rank">Sort by Rank</option>{" "}
            <option value="price-low">Price: Low to High</option>{" "}
            <option value="price-high">Price: High to Low</option>{" "}
          </select>{" "}
        </div>{" "}
        {/* Section Subhead matching Screenshot 111 */}
        <div className="mb-8">
          {" "}
          <span className="text-[10px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block mb-1">
            {" "}
            TOP RATED FORMULATIONS
          </span>{" "}
          <h2 className="font-display text-2xl font-bold text-ink">
            {" "}
            Showing {filteredProducts.length} Best Sellers
          </h2>{" "}
        </div>{" "}
        {/* Grid of Cards matching Screenshot 111 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {filteredProducts.map((p, i) => {
            const perfume = ALL_PERFUMES.find((ap) => ap.id === p.id);
            if (!perfume) return null;
            return (
              <ProductCard
                key={perfume.id}
                product={perfume}
                index={i}
                onAddToCart={(item, size, price) =>
                  onAddToCart?.(item, size ?? 50, price ?? item.price)
                }
                onSelectProduct={() => setSelectedDetailProduct(perfume)}
              />
            );
          })}
        </div>{" "}
      </div>{" "}
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
