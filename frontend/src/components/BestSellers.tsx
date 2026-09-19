import ProductCard from "../editorial/ProductCard";
import { DriftWord } from "../editorial/home/Kinetic";
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
    image: "/assets/seductive.png?v=12",
    badge: "Best Seller",
    rating: 4.93,
    reviewsCount: 59,
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
    image: "/assets/perfumes/purple-oud-50ml-2.png?v=3",
    badge: "Exclusive",
    rating: 4.95,
    reviewsCount: 60,
    prices: {
      50: { price: 1489, originalPrice: 1859 },
    },
  },
  {
    id: "calantha",
    name: "CALANTHA",
    notes: "Blooming Jasmine • Rose • Sandalwood Amber",
    image: "/assets/calantha.png?v=12",
    badge: "Best Seller",
    rating: 4.88,
    reviewsCount: 52,
    prices: {
      10: { price: 399, originalPrice: 449 },
      30: { price: 900, originalPrice: 1409 },
      50: { price: 1085, originalPrice: 1539 },
    },
  },
  {
    id: "deep-crush",
    name: "DEEP CRUSH",
    notes: "Lavender • Tobacco Woods • Sandalwood Amber",
    image: "/assets/deep-crush.png?v=12",
    badge: "Best Seller",
    rating: 4.91,
    reviewsCount: 54,
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
    price: number,
  ) => void;
  onUpdateCartQuantity?: (
    productId: string,
    size: number,
    delta: number,
  ) => void;
  onOpenCart?: () => void;
  onNavigate?: (page: any, filterOptions?: any) => void;
}

export default function BestSellers({
  onSelectProduct,
  onAddToCart,
  onOpenCart: _onOpenCart,
  onNavigate,
}: BestSellersProps) {
  return (
    <section className="bg-[#f2f2f0] py-16 sm:py-24 text-ink relative overflow-hidden">
      <DriftWord
        text="Best sellers — most loved — Best sellers — most loved —"
        className="top-4 sm:top-8"
      />{" "}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex items-end justify-between mb-12">
          {" "}
          <div>
            {" "}
            <span className="text-[10px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block mb-1">
              {" "}
              HAUTE PARFUMERIE
            </span>{" "}
            <SectionHeading
              title="BEST SELLERS"
              subtitle="Discover our most coveted, iconic fragrance creations."
            />{" "}
          </div>{" "}
          <button
            onClick={() => onNavigate?.("bestsellers")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] hover:text-black transition-colors cursor-pointer"
          >
            {" "}
            <span>Explore All</span> <span>→</span>{" "}
          </button>{" "}
        </div>{" "}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((p, i) => {
            const perfume = ALL_PERFUMES.find((ap) => ap.id === p.id);
            if (!perfume) return null;
            return (
              <ProductCard
                key={perfume.id}
                product={perfume}
                index={i}
                onAddToCart={(item, size, price) =>
                  onAddToCart?.(item, size ?? 50, price ?? item.price)
                }
                onSelectProduct={() => onSelectProduct?.(perfume)}
              />
            );
          })}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
