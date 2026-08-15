import { ALL_PERFUMES } from "../data/perfumes";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import type { CartItem } from "./CartDrawer";
import { PerfumeProduct, getPerfumeProductById } from "../data/perfumes";

interface ProductItem {
  id: string;
  name: string;
  notes: string;
  image: string;
  badge: string;
  rating: number;
  prices: Record<number, { price: number; originalPrice: number }>;
  outOfStockSizes?: number[];
}

const newArrivals: ProductItem[] = [
  {
    id: "rich",
    name: "RICH",
    notes: "Amber • Silk & Rose • Warm Spice",
    image: "/assets/rich.png",
    badge: "New Launch",
    rating: 4.9,
    prices: {
      10: { price: 799, originalPrice: 1199 },
      30: { price: 1499, originalPrice: 2199 },
      50: { price: 2499, originalPrice: 3499 },
    },
  },
  {
    id: "purple-oud",
    name: "PURPLE OUD",
    notes: "Smoky Oud • Saffron • Amethyst Rose",
    image: "/assets/purple-oud.png",
    badge: "Crown Jewel",
    rating: 4.95,
    prices: {
      50: { price: 4999, originalPrice: 6999 },
    },
    outOfStockSizes: [10, 30],
  },
  {
    id: "calantha",
    name: "CALANTHA",
    notes: "White Floral • Blooming Jasmine • Fresh Petals",
    image: "/assets/calantha.png",
    badge: "New Launch",
    rating: 4.85,
    prices: {
      10: { price: 799, originalPrice: 1199 },
      30: { price: 1499, originalPrice: 2199 },
      50: { price: 2499, originalPrice: 3499 },
    },
  },
  {
    id: "herrlich",
    name: "HERRLICH",
    notes: "Golden Amber • Exotic Spice • Velvet Musk",
    image: "/assets/herrlich.png",
    badge: "New Launch",
    rating: 4.88,
    prices: {
      10: { price: 799, originalPrice: 1199 },
      30: { price: 1499, originalPrice: 2199 },
      50: { price: 2499, originalPrice: 3499 },
    },
  },
];

interface NewArrivalsProps {
  onNavigate?: (page: "home" | "perfumes" | "bestsellers" | "new-arrivals") => void;
  cartItems?: CartItem[];
  onAddToCart?: (product: { id: string; name: string; img: string }, size: number, price: number) => void;
  onUpdateCartQuantity?: (productId: string, size: number, delta: number) => void;
  onSelectProduct?: (product: PerfumeProduct) => void;
}

export default function NewArrivals({
  onNavigate,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onSelectProduct,
}: NewArrivalsProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    "rich": 50,
    "purple-oud": 50,
    "calantha": 50,
    "herrlich": 50,
  });

  const getItemQuantity = (productId: string, size: number): number => {
    const item = cartItems.find((ci) => ci.productId === productId && ci.size === size);
    return item ? item.quantity : 0;
  };

  const setCardSize = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleSelectProduct = (productId: string) => {
    const fullProduct = getPerfumeProductById(productId);
    if (fullProduct && onSelectProduct) {
      onSelectProduct(fullProduct);
    }
  };

  return (
    <section id="new-arrivals" className="w-full bg-[#fbf9f5] px-3 sm:px-6 py-10 sm:py-20 border-t border-black/5 reveal-fade-up">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title="New Arrivals" subtitle="The latest olfactory masterpieces from our Parisian atelier" />

        <div className="mt-6 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => {
              const currentSize = selectedSizes[product.id] || 50;
              const priceInfo = product.prices[currentSize] || product.prices[50];
              const qty = getItemQuantity(product.id, currentSize);
              const formattedNotes = product.notes.replace(/•/g, "·");
              const discountPercent = Math.round(
                ((priceInfo.originalPrice - priceInfo.price) / priceInfo.originalPrice) * 100
              );

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-2.5 sm:p-5 shadow-sm hover:border-[#c89b5a]/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle ambient light glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#c89b5a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Media container - Expanded aspect ratio & prominent bottle scaling */}
                  <div>
                    <div
                      onClick={() => handleSelectProduct(product.id)}
                      className="relative w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#fbf8f3] to-[#f4ede2] overflow-hidden flex items-center justify-center cursor-pointer border border-black/5"
                      title={`View details for ${product.name}`}
                    >
                      {/* Badge Top Left - Compact & Never Colliding */}
                      {product.badge && (
                        <span className="absolute top-2 left-2 z-10 rounded-full bg-gradient-to-r from-[#1a120a] to-[#0d0906] text-[#c89b5a] text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#c89b5a]/50 shadow-md">
                          {product.badge}
                        </span>
                      )}

                      {/* Rating Bottom Right - Beautiful Frosted Glass, zero overlap with top badge */}
                      <span className="absolute bottom-2 right-2 z-10 rounded-full bg-black/75 backdrop-blur-md text-[#f5f0e8] text-[8px] sm:text-[9.5px] font-bold px-2 py-0.5 shadow-sm border border-white/15 flex items-center gap-1">
                        <span className="text-amber-400 text-[9px] sm:text-[10px]">★</span> {product.rating}
                      </span>

                      {/* Full prominent perfume bottle photo */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Quick View overlay */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                        <span className="bg-white text-ink text-[9.5px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-lg border border-[#c89b5a]/50 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span>Quick View</span>
                          <span className="text-[#c89b5a]">✦</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-3 text-center">
                      <h3
                        onClick={() => handleSelectProduct(product.id)}
                        className="font-sans text-xs sm:text-[14px] font-bold uppercase tracking-wider text-ink hover:text-[#c89b5a] transition-colors cursor-pointer inline-block truncate max-w-full"
                        title={`View info for ${product.name}`}
                      >
                        {product.name}
                      </h3>
                      <p
                        onClick={() => handleSelectProduct(product.id)}
                        className="text-[9.5px] sm:text-[11px] text-ink/60 mt-0.5 truncate cursor-pointer hover:text-ink/90 transition-colors"
                      >
                        {formattedNotes}
                      </p>

                      {/* Text Button to View Info */}
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product.id)}
                        className="mt-1 mb-1.5 inline-flex items-center justify-center gap-1 text-[9px] sm:text-[9.5px] font-bold tracking-wider text-[#c89b5a] hover:text-ink uppercase transition-colors cursor-pointer"
                        title={`View scent info for ${product.name}`}
                      >
                        <span>View Scent Pyramid</span>
                        <span aria-hidden="true">→</span>
                      </button>

                      {/* Size Pills */}
                      <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-1.5">
                        {[10, 30, 50].map((sz) => {
                          const isOutOfStock = !product.prices[sz] || product.outOfStockSizes?.includes(sz);
                          const isSelected = currentSize === sz;

                          if (isOutOfStock) {
                            return (
                              <button
                                key={sz}
                                disabled
                                type="button"
                                className="rounded px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8.5px] sm:text-[9px] font-semibold tracking-wider bg-stone-100 text-stone-400 border border-stone-200 opacity-40 line-through cursor-not-allowed select-none"
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
                                setCardSize(product.id, sz);
                              }}
                              className={`rounded px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8.5px] sm:text-[9px] font-bold tracking-wider border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#0b0907] text-[#c89b5a] border-[#0b0907] shadow-sm scale-105"
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

                  {/* Pricing & Add to Cart */}
                  <div className="mt-1 text-center">
                    <div className="flex items-baseline justify-center gap-1.5 text-center">
                      <span className="font-bold text-xs sm:text-sm text-ink">₹{priceInfo.price.toLocaleString("en-IN")}</span>
                      <span className="text-[9.5px] sm:text-[10px] text-ink/45 line-through">MRP ₹{priceInfo.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-[#c89b5a] uppercase">{discountPercent}% OFF</span>
                    </div>

                    {qty > 0 ? (
                      <div className="mt-2 flex items-center justify-between rounded-lg bg-[#0b0907] text-white border border-[#c89b5a]/50 px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md">
                        <button
                          onClick={() => onUpdateCartQuantity?.(product.id, currentSize, -1)}
                          className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-xs sm:text-sm font-bold text-[#c89b5a] hover:bg-white/10 rounded transition-all cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-[9.5px] sm:text-[10px] font-bold text-[#f5f0e8] tracking-wider uppercase">
                          {qty} <span className="text-[8px] sm:text-[8.5px] font-normal text-[#c89b5a] uppercase">In Bag</span>
                        </span>
                        <button
                          onClick={() => onUpdateCartQuantity?.(product.id, currentSize, 1)}
                          className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-xs sm:text-sm font-bold text-[#c89b5a] hover:bg-white/10 rounded transition-all cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            onAddToCart({ id: product.id, name: product.name, img: product.image }, currentSize, priceInfo.price);
                          } else {
                            onNavigate?.("new-arrivals");
                          }
                        }}
                        className="btn-luxe-card mt-1.5"
                      >
                        Add to Bag • {currentSize}ml
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={() => onNavigate?.("new-arrivals")}
            className="btn-luxe-ghost"
            style={{ padding: "12px 30px", fontSize: "10.5px" }}
          >
            Explore All New Launches →
          </button>
        </div>
      </div>
    </section>
  );
}
