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
        img: image,
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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: Math.min(index, 4) * 0.06,
            ease: EASE_OUT_EXPO,
          },
        },
      }}
    >
      <button
        type="button"
        onClick={() => onSelectProduct?.(product, size)}
        className="relative block w-full cursor-pointer overflow-hidden rounded-[2px] bg-paper-2 text-left"
        aria-label={`View ${product.name}`}
        data-cursor="View"
      >
        <motion.div
          className="aspect-[4/5] w-full"
          // Driven by the card above: an element clipped to nothing never
          // counts as "in view", so it can't trigger its own reveal.
          variants={{
            hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
            show: {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              transition: {
                duration: 1.2,
                delay: Math.min(index, 4) * 0.08,
                ease: EASE_OUT_EXPO,
              },
            },
          }}
        >
          <img
            src={image}
            alt={`${product.name} extrait de parfum, ${size}ml`}
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
             width="600" height="600"/>
          )}
        </motion.div>

        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-paper/90 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-ink shadow-xs border border-black/10 max-w-[85%] truncate">
            {BADGE_COPY[product.badge] ?? product.badge}
          </span>
        )}
      </button>

      <div className="mt-3 flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-1 min-w-0">
          <h3
            onClick={() => onSelectProduct?.(product, size)}
            className="pc-name text-sm sm:text-base font-bold text-ink leading-tight truncate cursor-pointer hover:underline hover:text-[#6b1422] transition-colors flex-1 min-w-0"
          >
            {product.name}
          </h3>
          <span className="ed-label text-[10px] sm:text-xs text-ink-soft shrink-0 font-mono ml-1">{product.num}</span>
        </div>

        <p className="mt-1 text-[11px] sm:text-[12px] leading-snug text-ink-soft truncate">
          {product.traces?.slice(0, 3).join(" · ")}
        </p>

        {/* Size selector — mono text toggles, compact tap targets */}
        {sizes.length > 1 && (
          <div
            className="mt-2.5 flex items-center gap-1.5 flex-wrap"
            role="group"
            aria-label="Choose size"
          >
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`on-dark h-6 sm:h-7 min-w-[32px] cursor-pointer rounded-full px-2.5 font-mono text-[10px] sm:text-[11px] transition-colors flex items-center justify-center font-medium ${
                  size === s
                    ? "bg-ink text-paper font-semibold"
                    : "bg-paper-2/60 text-ink-soft hover:text-ink"
                }`}
              >
                {s}ml
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="text-xs sm:text-sm font-bold text-ink">
            <span className="tabular-nums">
              ₹{price?.toLocaleString("en-IN")}
            </span>
            {mrp && mrp > (price ?? 0) && (
              <span className="ml-1.5 font-mono text-[10px] sm:text-[11px] text-stone line-through tabular-nums font-normal">
                ₹{mrp.toLocaleString("en-IN")}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            className="ed-link cursor-pointer whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-[#6b1422] hover:text-black transition-colors disabled:cursor-not-allowed disabled:text-stone"
          >
            {soldOut ? "Sold out" : added ? "Added ✓" : "Add to bag"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
