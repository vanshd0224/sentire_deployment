import { useState } from "react";
import SectionHeading from "./SectionHeading";
import type { CartItem } from "./CartDrawer";
import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";

interface ProductItem {
  id: string;
  name: string;
  notes: string;
  image: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  prices: Record<number, { price: number; originalPrice: number }>;
}

const products: ProductItem[] = [
  {
    id: "rich",
    name: "RICH",
    notes: "Opulent Bergamot • Spiced Rose • Velvet Amber Musk",
    image: "/assets/rich.png?v=12",
    badge: "New Launch",
    rating: 4.93,
    reviewsCount: 54,
    prices: {
      10: { price: 559, originalPrice: 779 },
      30: { price: 1287, originalPrice: 1809 },
      50: { price: 1593, originalPrice: 2259 },
    },
  },
  {
    id: "purple-oud",
    name: "PURPLE OUD",
    notes: "Smoky Cambodian Oud • Fiery Saffron • Amethyst Rose",
    image: "/assets/purple-oud-arrival.png?v=12",
    badge: "Exclusive",
    rating: 4.95,
    reviewsCount: 88,
    prices: {
      10: { price: 659, originalPrice: 779 },
      30: { price: 1199, originalPrice: 1409 },
      50: { price: 1489, originalPrice: 1859 },
    },
  },
  {
    id: "calantha",
    name: "CALANTHA",
    notes: "Blooming Florals • Jasmine • Sandalwood Amber",
    image: "/assets/calantha.png?v=12",
    badge: "New Release",
    rating: 4.88,
    reviewsCount: 112,
    prices: {
      10: { price: 399, originalPrice: 449 },
      30: { price: 900, originalPrice: 1409 },
      50: { price: 1085, originalPrice: 1539 },
    },
  },
  {
    id: "herrlich",
    name: "HERRLICH",
    notes: "Fresh Bergamot • Jasmine Rose • Dark Chocolate",
    image: "/assets/herrlich.png?v=12",
    badge: "New Launch",
    rating: 4.92,
    reviewsCount: 48,
    prices: {
      10: { price: 550, originalPrice: 639 },
      30: { price: 1499, originalPrice: 2129 },
      50: { price: 2196, originalPrice: 3069 },
    },
  },
];

interface NewArrivalsProps {
  onSelectProduct?: (product: PerfumeProduct) => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
  onNavigate?: (page: any, filterOptions?: any) => void;
}

export default function NewArrivals({
  onSelectProduct,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart: _onOpenCart,
  onNavigate,
}: NewArrivalsProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleSizeSelect = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const getQuantity = (productId: string, size: number) => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const showToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section className="bg-gradient-to-b from-[#faf6f0] to-[#fbf9f5] py-16 sm:py-24 text-ink relative border-t border-black/5">
      {addedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#c89b5a]/40 bg-[#120e0a] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-2xl animate-bounce">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c89b5a] animate-pulse" />
            {addedToast}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
              HAUTE SELECTION
            </span>
            <SectionHeading title="NEW ARRIVALS" subtitle="Experience our latest luxury formulations and extraits." />
          </div>
          <button
            onClick={() => onNavigate?.("new-arrivals")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c89b5a] hover:text-black transition-colors cursor-pointer"
          >
            <span>Explore All</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {products.map((p) => {
            const currentSize = selectedSizes[p.id] || 50;
            const priceInfo = p.prices[currentSize] || p.prices[50];
            const qty = getQuantity(p.id, currentSize);
            const fullProd = ALL_PERFUMES.find(ap => ap.id === p.id);

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-black/8 bg-white p-2.5 sm:p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => fullProd && onSelectProduct?.(fullProd)}
                    className="relative aspect-square w-full rounded-lg sm:rounded-xl bg-[#f6f2ec] overflow-hidden p-1.5 sm:p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 rounded-full bg-[#c89b5a] px-2 sm:px-2.5 py-0.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-black">
                      {p.badge}
                    </span>
                  </div>

                  <div className="mt-2 sm:mt-3 text-center">
                    <h3 onClick={() => fullProd && onSelectProduct?.(fullProd)} className="font-display text-xs sm:text-base font-bold text-ink cursor-pointer hover:text-[#c89b5a] leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-ink/60 truncate mt-0.5">{p.notes}</p>
                  </div>

                  <div className="flex justify-center gap-1 sm:gap-1.5 my-1.5 sm:my-2">
                    {[10, 30, 50].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSizeSelect(p.id, sz)}
                        className={`rounded px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-bold border transition-all cursor-pointer ${
                          currentSize === sz ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907]" : "bg-white text-ink border-black/15"
                        }`}
                      >
                        {sz}ML
                      </button>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                    <span className="font-bold text-xs sm:text-sm text-ink">₹{priceInfo.price.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] sm:text-[10px] text-ink/40 line-through">MRP ₹{priceInfo.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {qty > 0 ? (
                  <div className="mt-2 sm:mt-3 flex items-center justify-between rounded-md bg-[#0b0907] text-white border border-[#c89b5a]/40 px-1.5 sm:px-2 py-1 sm:py-1.5">
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, -1)} className="text-xs font-bold text-[#c89b5a]">−</button>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#e2c48e]">{qty} IN BAG</span>
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, 1)} className="text-xs font-bold text-[#c89b5a]">+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart?.({ id: p.id, name: p.name, img: p.image }, currentSize, priceInfo.price);
                      showToast(`Added ${p.name} (${currentSize}ML) to Bag`);
                    }}
                    className="mt-2 sm:mt-3 w-full rounded-md bg-[#0b0907] py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all border border-[#c89b5a]/40 cursor-pointer"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
