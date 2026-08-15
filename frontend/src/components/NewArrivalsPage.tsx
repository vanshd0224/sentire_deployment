import { ALL_PERFUMES } from "../data/perfumes";
import { useState, useMemo } from "react";
import type { PerfumeProduct } from "./PerfumesPage";
import ProductDetailModal from "./ProductDetailModal";
import type { CartItem } from "./CartDrawer";

// NEW ARRIVALS PRODUCTS LIST (RICH, PURPLE OUD, CALANTHA, HERRLICH, MIDNIGHT, MIRAI)
const NEW_ARRIVALS_PRODUCTS: PerfumeProduct[] = ALL_PERFUMES.filter(p => p.badge === "new" || ["herrlich", "midnight", "0809", "rich", "personna"].includes(p.id));

interface NewArrivalsPageProps {
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

export default function NewArrivalsPage({
  onBackToHome,
  onOpenBundleModal: _onOpenBundleModal,
  onNavigate,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
}: NewArrivalsPageProps) {
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [cardSelectedSizes, setCardSelectedSizes] = useState<Record<string, number>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<PerfumeProduct | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PerfumeProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const getProductSize = (product: PerfumeProduct): number => {
    if (cardSelectedSizes[product.id]) return cardSelectedSizes[product.id];
    if (product.sizes.includes(50) && !(product.outOfStockSizes || []).includes(50)) return 50;
    const available = product.sizes.filter((s) => !(product.outOfStockSizes || []).includes(s));
    return available.length > 0 ? available[0] : product.sizes[0];
  };

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const filteredProducts = useMemo(() => {
    return NEW_ARRIVALS_PRODUCTS.filter((p) => {
      if (selectedFamily !== "all" && p.scentFamily !== selectedFamily) return false;
      if (selectedSizeFilter !== null) {
        if (!p.sizes.includes(selectedSizeFilter as 10 | 30 | 50)) return false;
      }
      return true;
    });
  }, [selectedFamily, selectedSizeFilter]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-ink font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#120e0a] px-5 py-3.5 text-xs font-medium tracking-wide text-white shadow-2xl border border-gold/30 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={onOpenCart}
            className="ml-2 text-[10px] font-bold uppercase tracking-wider text-gold underline hover:text-white transition-colors"
          >
            View Bag
          </button>
        </div>
      )}

      {/* ── BREADCRUMB & HEADER AREA ── */}
      <section className="bg-white border-b border-black/6 pt-6 pb-8 px-6 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/40">
              <li>
                <button onClick={onBackToHome} className="hover:text-gold transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>/</li>
              <li className="text-gold font-bold">New Arrivals</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-1">
                LATEST CREATIONS
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-ink">
                New Arrivals
              </h1>
            </div>
            <p className="max-w-md text-xs md:text-sm text-ink/60 font-light leading-relaxed">
              Explore our latest olfactory innovations. Handcrafted formulations featuring rare botanicals, precious woods, and captivating sillage.
            </p>
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER CONTROL BAR ── */}
      <div className="sticky top-[71px] z-30 bg-cream/95 backdrop-blur-md border-b border-black/10 py-3.5 px-6 lg:px-16 shadow-xs">
        <div className="mx-auto max-w-[1400px] flex flex-wrap items-center justify-between gap-4">
          {/* Family Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: "all", label: "All New Arrivals" },
              { id: "woody", label: "Woody & Oud" },
              { id: "fresh", label: "Fresh & Aquatic" },
              { id: "floral", label: "Floral & Gourmand" },
              { id: "ambar", label: "Amber & Spice" },
            ].map((family) => (
              <button
                key={family.id}
                onClick={() => setSelectedFamily(family.id)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedFamily === family.id
                    ? "bg-black text-white shadow-md"
                    : "bg-white/80 text-ink/70 hover:bg-black/5 hover:text-black border border-black/10"
                }`}
              >
                {family.label}
              </button>
            ))}
          </div>

          {/* Size Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mr-1 hidden sm:inline">
              Size:
            </span>
            {[
              { size: null, label: "All Sizes" },
              { size: 10, label: "10 ML" },
              { size: 30, label: "30 ML" },
              { size: 50, label: "50 ML" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSizeFilter(s.size)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedSizeFilter === s.size
                    ? "bg-gold text-white shadow-xs"
                    : "bg-white text-ink/60 hover:text-black border border-black/10"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <main className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-16 py-2 sm:py-12">
        <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
          <span className="text-xs font-medium tracking-wider text-ink/50 uppercase">
            Showing {filteredProducts.length} New Arrivals
          </span>

          {onNavigate && (
            <button
              onClick={() => onNavigate("byob")}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-gold hover:bg-gold hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span>✨ Build Custom Bundle (Save ₹300)</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="fraganote-grid">
          {filteredProducts.map((p) => {
            const currentSize = getProductSize(p);
            const currentPrice = p.prices[currentSize];
            const isOutOfStock = (p.outOfStockSizes || []).includes(currentSize as 10 | 30 | 50);
            const qtyInBag = getItemQuantity(p.id, currentSize);
            const notesString = p.traces && p.traces.length > 0 ? p.traces.slice(0, 2).join(" | ") : p.desc;
            const badgeText = p.badge === "exclusive" ? "EXCLUSIVE" : "NEW LAUNCH";

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
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(prod, size, price) => {
            onAddToCart?.(prod, size, price);
            showToast(`Added ${prod.name} (${size} ML) to Bag`);
          }}
        />
      )}

      {/* Full Detail Modal */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          onAddToCart={(prod, size, price) => {
            onAddToCart?.(prod, size, price);
            showToast(`Added ${prod.name} (${size} ML) to Bag`);
          }}
        />
      )}
    </div>
  );
}
