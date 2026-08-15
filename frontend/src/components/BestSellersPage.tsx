import { ALL_PERFUMES } from "../data/perfumes";
import { useState, useMemo } from "react";
import type { PerfumeProduct } from "./PerfumesPage";
import ProductDetailModal from "./ProductDetailModal";
import type { CartItem } from "./CartDrawer";

// EXACT 6 BEST SELLER PRODUCTS LIST (SEDUCTIVE, PURPLE OUD, CALANTHA, MIRAI, DEEP CRUSH, WHITE OUD)
const BEST_SELLER_PRODUCTS: PerfumeProduct[] = ALL_PERFUMES.filter(p => p.badge === "bestseller" || ["calantha", "deep-crush", "seductive", "white-oud", "mirai"].includes(p.id));

interface BestSellersPageProps {
  onBackToHome?: () => void;
  onOpenBundleModal?: () => void;
  onNavigate?: (page: string) => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
}

export default function BestSellersPage({
  onBackToHome,
  onOpenBundleModal: _onOpenBundleModal,
  onNavigate,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
}: BestSellersPageProps) {
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, number>>({});
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PerfumeProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [selectedScent, setSelectedScent] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("rank");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProductSizeSelect = (productId: string, size: number) => {
    setSelectedProductSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const getProductSize = (p: PerfumeProduct): number => {
    if (selectedProductSizes[p.id] && p.sizes.includes(selectedProductSizes[p.id] as any)) {
      return selectedProductSizes[p.id];
    }
    if (selectedSizeFilter) {
      if (p.sizes.includes(selectedSizeFilter as any)) {
        return selectedSizeFilter;
      }
    }
    const outStock = p.outOfStockSizes || [];
    if (p.sizes.includes(50) && !outStock.includes(50)) {
      return 50;
    }
    const inStock = p.sizes.filter((s) => !outStock.includes(s));
    if (inStock.length > 0) {
      return inStock[inStock.length - 1];
    }
    return p.sizes[0];
  };

  const filteredProducts = useMemo(() => {
    let list = BEST_SELLER_PRODUCTS.filter((p) => {
      if (selectedCategory === "woody" && p.scentFamily !== "woody") return false;
      if (selectedCategory === "floral" && p.scentFamily !== "floral") return false;
      if (selectedCategory === "oriental" && p.scentFamily !== "oriental") return false;
      if (selectedCategory === "exclusive" && p.badge !== "exclusive") return false;

      if (selectedMood !== "all" && !p.moods.includes(selectedMood)) return false;
      if (selectedScent !== "all" && p.scentFamily !== selectedScent) return false;
      if (selectedSizeFilter && !p.sizes.includes(selectedSizeFilter as any)) return false;
      return true;
    });

    const copy = [...list];
    if (sortOption === "price-asc") {
      return copy.sort((a, b) => a.prices[a.sizes[0]] - b.prices[b.sizes[0]]);
    }
    if (sortOption === "price-desc") {
      return copy.sort((a, b) => b.prices[b.sizes[0]] - a.prices[a.sizes[0]]);
    }
    return copy;
  }, [selectedCategory, selectedSizeFilter, selectedMood, selectedScent, sortOption]);

  return (
    <div className="min-h-screen bg-cream text-ink pb-24">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-gold/40 bg-[#120e0a] px-6 py-4 text-white shadow-2xl animate-bounce">
          <span className="text-xl">✨</span>
          <span className="text-xs font-semibold tracking-wide text-gold">{toastMessage}</span>
        </div>
      )}

      {/* ELEGANT MINIMALIST PAGE HEADER (HERO REMOVED AS REQUESTED) */}
      <section className="bg-cream pt-8 pb-6 border-b border-black/10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold mb-3">
            <button onClick={onBackToHome} className="hover:underline cursor-pointer text-gold">
              Home
            </button>
            <span>/</span>
            <span className="text-ink/60">Best Sellers</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-1">
                👑 HAUTE PARFUMERIE · TOP 6 BEST SELLERS
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-ink font-medium tracking-tight">
                Best Sellers
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-ink/60 font-light max-w-xl">
                Our 6 most coveted Extraits de Parfum — Seductive, Purple Oud, Calantha, Mirai, Deep Crush, and White Oud.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate?.("byob")}
                className="rounded-full border border-gold/60 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-white transition-all cursor-pointer shadow-xs"
              >
                BYOB Bundle Builder →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERLY PLACED STICKY FILTER BAR (SCROLLS CLEANLY UNDER STICKY NAVBAR) */}
      <section className="sticky top-[71px] z-30 border-b border-black/10 bg-cream/95 backdrop-blur-md py-3 shadow-xs">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          {/* Scent & Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: "all", label: "All 6 Best Sellers" },
              { id: "woody", label: "Woody & Oud" },
              { id: "floral", label: "Floral & Gourmand" },
              { id: "oriental", label: "Oriental & Spice" },
              { id: "exclusive", label: "50 ML Exclusives" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-ink text-white shadow-md"
                    : "bg-white text-ink/70 border border-black/10 hover:border-gold hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls: Mood, Scent, Size Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mood Dropdown */}
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink outline-none focus:border-gold cursor-pointer"
            >
              <option value="all">All Moods</option>
              <option value="party">Party & Glamour</option>
              <option value="regular">Everyday Signature</option>
              <option value="sports">Sports & Fresh</option>
              <option value="date-night">Date Night</option>
              <option value="casual">Casual & Relaxed</option>
            </select>

            {/* Scent Dropdown */}
            <select
              value={selectedScent}
              onChange={(e) => setSelectedScent(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink outline-none focus:border-gold cursor-pointer"
            >
              <option value="all">All Scent Families</option>
              <option value="woody">Woody & Oud</option>
              <option value="floral">Floral Bouquet</option>
              <option value="oriental">Oriental & Spicy</option>
              <option value="fresh">Fresh & Aquatic</option>
            </select>

            {/* Size Pills */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-black/10">
              <button
                onClick={() => setSelectedSizeFilter(null)}
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSizeFilter === null ? "bg-gold text-white" : "text-ink/60 hover:text-ink"
                }`}
              >
                All Sizes
              </button>
              {[10, 30, 50].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(sz)}
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSizeFilter === sz ? "bg-gold text-white" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {sz} ML
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink outline-none focus:border-gold cursor-pointer"
            >
              <option value="rank">Sort by Rank</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* BEST SELLERS GRID CATALOG */}
      <section className="mx-auto max-w-[1440px] px-2.5 sm:px-6 lg:px-12 py-2 sm:py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold block mb-1">
              TOP RATED FORMULATIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
              Showing {filteredProducts.length} Best Sellers
            </h2>
          </div>
          <span className="text-xs font-medium tracking-wider text-ink/40 uppercase">
            100% Authentic Extrait de Parfum
          </span>
        </div>

        <div className="fraganote-grid">
          {filteredProducts.map((p) => {
            const currentSize = getProductSize(p);
            const currentPrice = p.prices[currentSize];
            const isOutOfStock = p.outOfStockSizes?.includes(currentSize as any) ?? false;
            const qtyInBag = getItemQuantity(p.id, currentSize);
            const notesString = p.traces && p.traces.length > 0 ? p.traces.slice(0, 2).join(" | ") : p.desc;
            const badgeText = p.badge === "exclusive" ? "EXCLUSIVE" : "BEST SELLER";

            return (
              <div key={p.id} className="fraganote-card">
                <div>
                  <div onClick={() => setSelectedDetailProduct(p)} className="fraganote-media-box cursor-pointer">
                    <img src={p.img} alt={p.name} loading="lazy" />
                    {badgeText && <span className="fraganote-badge">{badgeText}</span>}
                  </div>
                  <div onClick={() => setSelectedDetailProduct(p)} className="cursor-pointer">
                    <h3 className="fraganote-title">{p.name.toUpperCase()} {currentSize}ML</h3>
                    <p className="fraganote-notes">{notesString}</p>
                    <div className="fraganote-price-row">
                      <span className="fraganote-price-current">₹{currentPrice.toLocaleString()}</span>
                      <span className="fraganote-price-mrp">MRP ₹{(p.mrps && p.mrps[currentSize] ? p.mrps[currentSize] : Math.round(currentPrice * 1.35)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {isOutOfStock ? (
                  <button disabled className="fraganote-btn opacity-50 cursor-not-allowed">Out of Stock</button>
                ) : qtyInBag > 0 ? (
                  <div className="w-full mt-2 flex items-center justify-between border border-black bg-black text-white py-1 px-2.5 rounded-md text-[10px] font-bold">
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, -1)} className="text-white hover:text-gold px-1.5">−</button>
                    <span>{qtyInBag} IN BAG</span>
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, 1)} className="text-white hover:text-gold px-1.5">+</button>
                  </div>
                ) : (
                  <button onClick={() => { onAddToCart?.({ id: p.id, name: p.name, num: p.num, img: p.img }, currentSize, currentPrice); showToast(`Added ${p.name} to Bag`); }} className="fraganote-btn">
                    Add to cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onOpenCart={onOpenCart}
          onSelectProduct={(prod) => setSelectedDetailProduct(prod)}
          allProducts={BEST_SELLER_PRODUCTS}
        />
      )}
    </div>
  );
}
