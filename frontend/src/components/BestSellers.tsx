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
    id: "seductive",
    name: "SEDUCTIVE",
    notes: "Citric Limon • Fresh Lavender • Velvet Amber",
    image: "/assets/seductive.png?v=4",
    badge: "Best Seller",
    rating: 4.91,
    reviewsCount: 165,
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
    image: "/assets/purple-oud-banner.png?v=4",
    badge: "Crown Jewel",
    rating: 4.95,
    reviewsCount: 98,
    prices: {
      10: { price: 659, originalPrice: 779 },
      30: { price: 1199, originalPrice: 1409 },
      50: { price: 1489, originalPrice: 1859 },
    },
  },
  {
    id: "calantha",
    name: "CALANTHA",
    notes: "Blooming Jasmine • Rose • Sandalwood Amber",
    image: "/assets/calantha.png?v=4",
    badge: "Most Loved",
    rating: 4.85,
    reviewsCount: 116,
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
    image: "/assets/mirai.png?v=4",
    badge: "Customer Favorite",
    rating: 4.87,
    reviewsCount: 132,
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
    image: "/assets/deep-crush.png?v=4",
    badge: "Iconic Scent",
    rating: 4.9,
    reviewsCount: 142,
    prices: {
      10: { price: 350, originalPrice: 419 },
      30: { price: 899, originalPrice: 1319 },
      50: { price: 1085, originalPrice: 1539 },
    },
  },
];

interface BestSellersProps {
  onSelectProduct?: (product: PerfumeProduct) => void;
  cartItems?: CartItem[];
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onOpenCart?: () => void;
  onOpenPerfumesPage?: (size?: number, mood?: string, category?: string, collection?: string) => void;
}

export default function BestSellers({
  onSelectProduct,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart: _onOpenCart,
  onOpenPerfumesPage,
}: BestSellersProps) {
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
    <section className="bg-[#fbf9f5] py-16 sm:py-24 text-ink relative">
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
              HAUTE PARFUMERIE
            </span>
            <SectionHeading title="BEST SELLERS" subtitle="Discover our most coveted, iconic fragrance creations." />
          </div>
          <button
            onClick={() => onOpenPerfumesPage?.(undefined, undefined, "bestsellers")}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c89b5a] hover:text-black transition-colors"
          >
            <span>Explore All</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((p) => {
            const currentSize = selectedSizes[p.id] || 50;
            const priceInfo = p.prices[currentSize] || p.prices[50];
            const qty = getQuantity(p.id, currentSize);
            const fullProd = ALL_PERFUMES.find(ap => ap.id === p.id);

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => fullProd && onSelectProduct?.(fullProd)}
                    className="relative aspect-square w-full rounded-xl bg-[#f6f2ec] overflow-hidden p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 rounded-full bg-[#120e0a] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#c89b5a]">
                      {p.badge}
                    </span>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 onClick={() => fullProd && onSelectProduct?.(fullProd)} className="font-display text-base font-bold text-ink cursor-pointer hover:text-[#c89b5a]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] text-ink/60 truncate mt-0.5">{p.notes}</p>
                  </div>

                  <div className="flex justify-center gap-1.5 my-2">
                    {[10, 30, 50].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSizeSelect(p.id, sz)}
                        className={`rounded px-2.5 py-1 text-[9px] font-bold border transition-all cursor-pointer ${
                          currentSize === sz ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907]" : "bg-white text-ink border-black/15"
                        }`}
                      >
                        {sz}ML
                      </button>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-center gap-2 mt-1">
                    <span className="font-bold text-sm text-ink">₹{priceInfo.price.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-ink/40 line-through">MRP ₹{priceInfo.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {qty > 0 ? (
                  <div className="mt-3 flex items-center justify-between rounded-md bg-[#0b0907] text-white border border-[#c89b5a]/40 px-2 py-1.5">
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, -1)} className="text-xs font-bold text-[#c89b5a]">−</button>
                    <span className="text-[10px] font-bold text-[#e2c48e]">{qty} IN BAG</span>
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, 1)} className="text-xs font-bold text-[#c89b5a]">+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart?.({ id: p.id, name: p.name, img: p.image }, currentSize, priceInfo.price);
                      showToast(`Added ${p.name} (${currentSize}ML) to Bag`);
                    }}
                    className="mt-3 w-full rounded-md bg-[#0b0907] py-2 text-[10px] font-bold uppercase tracking-widest text-[#c89b5a] hover:bg-[#c89b5a] hover:text-black transition-all border border-[#c89b5a]/40"
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
