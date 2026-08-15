import os
import re

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components"

# 1. Refactor BestSellers.tsx to dynamically map from ALL_PERFUMES
bs_path = os.path.join(src_dir, "BestSellers.tsx")
with open(bs_path, "r", encoding="utf-8") as f:
    code = f.read()

bs_code = """import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import type { CartItem } from "./CartDrawer";

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
  const bestSellers = ALL_PERFUMES.filter(p => p.badge === "bestseller" || ["calantha", "deep-crush", "seductive", "white-oud"].includes(p.id));
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 4).map((p) => {
            const currentSize = selectedSizes[p.id] || 50;
            const price = p.prices[currentSize] || p.prices[10];
            const mrp = p.mrps?.[currentSize] || Math.round(price * 1.35);
            const qty = getQuantity(p.id, currentSize);

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-3 sm:p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => onSelectProduct?.(p)}
                    className="relative aspect-square w-full rounded-xl bg-[#f6f2ec] overflow-hidden p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={p.img} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 rounded-full bg-[#120e0a] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#c89b5a]">
                      Best Seller
                    </span>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 onClick={() => onSelectProduct?.(p)} className="font-display text-base font-bold text-ink cursor-pointer hover:text-[#c89b5a]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] text-ink/60 truncate mt-0.5">{p.desc}</p>
                  </div>

                  <div className="flex justify-center gap-1.5 my-2">
                    {p.sizes.map((sz) => (
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
                    <span className="font-bold text-sm text-ink">₹{price.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-ink/40 line-through">MRP ₹{mrp.toLocaleString("en-IN")}</span>
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
                      onAddToCart?.({ id: p.id, name: p.name, num: p.num, img: p.img }, currentSize, price);
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
"""

with open(bs_path, "w", encoding="utf-8") as f:
    f.write(bs_code)
print("SUCCESS: Refactored BestSellers.tsx to use ALL_PERFUMES master prices!")

# 2. Refactor NewArrivals.tsx to dynamically map from ALL_PERFUMES
na_path = os.path.join(src_dir, "NewArrivals.tsx")
na_code = """import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import type { CartItem } from "./CartDrawer";

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
  onOpenPerfumesPage?: (size?: number, mood?: string, category?: string, collection?: string) => void;
}

export default function NewArrivals({
  onSelectProduct,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart: _onOpenCart,
  onOpenPerfumesPage,
}: NewArrivalsProps) {
  const newArrivals = ALL_PERFUMES.filter(p => p.badge === "new" || ["herrlich", "midnight", "0809", "rich"].includes(p.id));
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
            onClick={() => onOpenPerfumesPage?.(undefined, undefined, "new")}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c89b5a] hover:text-black transition-colors"
          >
            <span>Explore All</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.slice(0, 4).map((p) => {
            const currentSize = selectedSizes[p.id] || 50;
            const price = p.prices[currentSize] || p.prices[10];
            const mrp = p.mrps?.[currentSize] || Math.round(price * 1.35);
            const qty = getQuantity(p.id, currentSize);

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-3 sm:p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => onSelectProduct?.(p)}
                    className="relative aspect-square w-full rounded-xl bg-[#f6f2ec] overflow-hidden p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={p.img} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 rounded-full bg-[#c89b5a] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black">
                      New Launch
                    </span>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 onClick={() => onSelectProduct?.(p)} className="font-display text-base font-bold text-ink cursor-pointer hover:text-[#c89b5a]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] text-ink/60 truncate mt-0.5">{p.desc}</p>
                  </div>

                  <div className="flex justify-center gap-1.5 my-2">
                    {p.sizes.map((sz) => (
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
                    <span className="font-bold text-sm text-ink">₹{price.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-ink/40 line-through">MRP ₹{mrp.toLocaleString("en-IN")}</span>
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
                      onAddToCart?.({ id: p.id, name: p.name, num: p.num, img: p.img }, currentSize, price);
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
"""

with open(na_path, "w", encoding="utf-8") as f:
    f.write(na_code)
print("SUCCESS: Refactored NewArrivals.tsx to use ALL_PERFUMES master prices!")
