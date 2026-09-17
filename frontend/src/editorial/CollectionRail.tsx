import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { PerfumeProduct } from "../data/perfumes";
import ProductCard from "./ProductCard";
import { SectionHead } from "./Primitives";
import { useMotionBudget } from "./motion";

interface CollectionRailProps {
  label: string;
  title: string;
  products: PerfumeProduct[];
  href: string;
  /** "pinned" travels sideways as you scroll; "grid" is a plain four-up. */
  layout?: "pinned" | "grid";
  onViewAll?: () => void;
  onAddToCart?: (item: any, size?: number, price?: number) => void;
  onSelectProduct?: (product: any, size?: number) => void;
}

/**
 * Desktop: the section pins and the row travels sideways with the scroll.
 * Phones: a plain scroll-snap rail — the browser's own compositor does the work,
 * so there is no scroll listener and nothing to drop frames.
 */
export default function CollectionRail({
  label,
  title,
  products,
  href,
  layout = "pinned",
  onViewAll,
  onAddToCart,
  onSelectProduct,
}: CollectionRailProps) {
  const rich = useMotionBudget();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);

  const pinned = rich && layout === "pinned";

  useEffect(() => {
    if (!pinned) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, products.length]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 140, damping: 26, mass: 0.6 });

  const viewAll = (
    <a
      href={href}
      onClick={(e) => {
        if (!onViewAll) return;
        e.preventDefault();
        onViewAll();
      }}
      className="ed-link shrink-0 text-[14px] font-medium"
    >
      View all ({products.length})
    </a>
  );

  if (!pinned) {
    return (
      <section className="bg-paper py-14 md:py-20">
        <div className="ed-container">
          <SectionHead label={label} title={title} action={viewAll} />
        </div>
        {/* Desktop grid, phone rail */}
        <div className="ed-container mt-10 hidden gap-x-6 gap-y-12 lg:grid lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
        <div className="hide-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:gap-6 md:px-10 lg:hidden">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-[34vw]"
            >
              <ProductCard
                product={product}
                index={i}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      className="relative bg-paper"
      style={{ height: `${distance + 900}px` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
        <div className="ed-container">
          <SectionHead label={label} title={title} action={viewAll} />
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex gap-8 pl-10 will-change-transform"
        >
          {products.map((product, i) => (
            <div key={product.id} className="w-[22vw] min-w-[280px] shrink-0">
              <ProductCard
                product={product}
                index={i}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
          <div className="flex w-[18vw] min-w-[220px] shrink-0 items-center">
            <a
              href={href}
              onClick={(e) => {
                if (!onViewAll) return;
                e.preventDefault();
                onViewAll();
              }}
              className="ed-btn ed-btn-line"
            >
              View all
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
