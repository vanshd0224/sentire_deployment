import { useState } from "react";
import { motion } from "framer-motion";
import type { PerfumeProduct } from "../data/perfumes";
import { EASE_OUT_EXPO } from "./motion";

interface ProductCardProps {
  product: PerfumeProduct;
  index?: number;
  onAddToCart?: (item: any, size?: number, price?: number) => void;
  onSelectProduct?: (product: any, size?: number) => void;
}

const BADGE_COPY: Record<string, string> = {
  bestseller: "Best seller",
  new: "New",
  exclusive: "Exclusive",
};

export default function ProductCard({
  product,
  index = 0,
  onAddToCart,
  onSelectProduct,
}: ProductCardProps) {
  const sizes = product.sizes ?? [50];
  const [size, setSize] = useState<number>(sizes.includes(50) ? 50 : sizes[0]);
  const [added, setAdded] = useState(false);

  const price = product.prices?.[size];
  const mrp = product.mrps?.[size];
  const image = product.sizeImages?.[size]?.[0] ?? product.img;
  const hoverImage = product.sizeImages?.[size]?.[1] ?? image;
  const soldOut = product.outOfStockSizes?.includes(size as 10 | 30 | 50);

  const handleAdd = () => {
    if (soldOut || !price) return;
    onAddToCart?.(
      {
        productId: product.id,
        id: product.id,
        name: product.name,
        price,
        image,
        size,
      },
      size,
      price,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      className="group flex h-full flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 4) * 0.06,
        ease: EASE_OUT_EXPO,
      }}
    >
      <button
        type="button"
        onClick={() => onSelectProduct?.(product, size)}
        className="relative block w-full cursor-pointer overflow-hidden rounded-[2px] bg-paper-2 text-left"
        aria-label={`View ${product.name}`}
      >
        <div className="aspect-[4/5] w-full">
          <img
            src={image}
            alt={`${product.name} extrait de parfum, ${size}ml`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {hoverImage !== image && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.02em] text-ink">
            {BADGE_COPY[product.badge] ?? product.badge}
          </span>
        )}
      </button>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-light leading-tight tracking-[-0.01em]">
            {product.name}
          </h3>
          <span className="ed-label shrink-0">{product.num}</span>
        </div>

        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
          {product.traces?.slice(0, 3).join(" · ")}
        </p>

        {/* Size selector — mono text toggles, 44px tap targets */}
        {sizes.length > 1 && (
          <div
            className="mt-4 flex items-center gap-1"
            role="group"
            aria-label="Choose size"
          >
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`min-h-[36px] cursor-pointer rounded-full px-3 font-mono text-[11px] transition-colors ${
                  size === s
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {s}ml
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          <p className="text-[15px]">
            <span className="tabular-nums">
              ₹{price?.toLocaleString("en-IN")}
            </span>
            {mrp && mrp > (price ?? 0) && (
              <span className="ml-2 font-mono text-[11px] text-stone line-through tabular-nums">
                ₹{mrp.toLocaleString("en-IN")}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            className="ed-link cursor-pointer text-[13px] font-medium disabled:cursor-not-allowed disabled:text-stone"
          >
            {soldOut ? "Sold out" : added ? "Added ✓" : "Add to bag"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
