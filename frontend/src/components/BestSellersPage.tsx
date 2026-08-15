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

export default function BestSellersPage({
  onBackToHome,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart: _onOpenCart,
}: BestSellersPageProps) {
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<PerfumeProduct | null>(null);
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const bestSellers = ALL_PERFUMES.filter((p) =>
    ["seductive", "purple-oud", "calantha", "mirai", "deep-crush", "white-oud", "0809"].includes(p.id)
  );

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf9f5] text-ink font-sans">
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#c89b5a]/40 bg-[#120e0a] px-6 py-3 text-xs font-semibold tracking-wide text-white shadow-2xl animate-bounce">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c89b5a] animate-pulse" />
            {toastMessage}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="mb-8 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-ink/40">
          <button onClick={onBackToHome} className="hover:text-[#c89b5a] transition-colors cursor-pointer">
            Home
          </button>
          <span className="text-[#c89b5a]/50">•</span>
          <span className="text-ink font-semibold tracking-[0.2em]">Best Sellers</span>
        </div>

        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
            TOP RATED FORMULATIONS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
            Best Sellers Collection
          </h1>
          <p className="text-sm text-ink/60 mt-2 max-w-2xl">
            Our most coveted Extraits de Parfum — formulated with rare ingredients for extraordinary sillage and longevity.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((p) => {
            const currentSize = selectedProductSizes[p.id] || 50;
            const currentPrice = p.prices[currentSize] || p.prices[50];
            const currentMrp = p.mrps?.[currentSize] || Math.round(currentPrice * 1.35);
            const qtyInBag = getItemQuantity(p.id, currentSize);

            return (
              <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-4 shadow-sm hover:border-[#c89b5a]/50 hover:shadow-md transition-all">
                <div>
                  <div
                    onClick={() => setSelectedDetailProduct(p)}
                    className="relative aspect-square w-full rounded-xl bg-[#f6f2ec] overflow-hidden p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img src={p.img} alt={p.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-2 left-2 rounded-full bg-[#120e0a] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#c89b5a]">
                      Best Seller
                    </span>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 onClick={() => setSelectedDetailProduct(p)} className="font-display text-base font-bold text-ink cursor-pointer hover:text-[#c89b5a]">
                      {p.name}
                    </h3>
                    <p className="text-[10px] text-ink/60 truncate mt-0.5">{p.desc}</p>
                  </div>

                  <div className="flex justify-center gap-1.5 my-2">
                    {p.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedProductSizes((prev) => ({ ...prev, [p.id]: sz }))}
                        className={`rounded px-2.5 py-1 text-[9px] font-bold border transition-all cursor-pointer ${
                          currentSize === sz ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907]" : "bg-white text-ink border-black/15"
                        }`}
                      >
                        {sz}ML
                      </button>
                    ))}
                  </div>

                  <div className="flex items-baseline justify-center gap-2 mt-1">
                    <span className="font-bold text-sm text-ink">₹{currentPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-ink/40 line-through">MRP ₹{currentMrp.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {qtyInBag > 0 ? (
                  <div className="mt-3 flex items-center justify-between rounded-md bg-[#0b0907] text-white border border-[#c89b5a]/40 px-2 py-1.5">
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, -1)} className="text-xs font-bold text-[#c89b5a]">−</button>
                    <span className="text-[10px] font-bold text-[#e2c48e]">{qtyInBag} IN BAG</span>
                    <button onClick={() => onUpdateCartQuantity?.(p.id, currentSize, 1)} className="text-xs font-bold text-[#c89b5a]">+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart?.({ id: p.id, name: p.name, img: p.img }, currentSize, currentPrice);
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

      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          allProducts={ALL_PERFUMES}
        />
      )}
    </div>
  );
}
