import ProductCard from "../editorial/ProductCard";
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
    reviewsCount: 51,
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
    notes: "Blooming Florals • Jasmine • Sandalwood Amber",
    image: "/assets/calantha.png?v=12",
    badge: "New Release",
    rating: 4.88,
    reviewsCount: 52,
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
    reviewsCount: 46,
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

export default function NewArrivals({
  onSelectProduct,
  onAddToCart,
  onOpenCart: _onOpenCart,
  onNavigate,
}: NewArrivalsProps) {




  return (
    <section className="bg-gradient-to-b from-[#f2f2f0] to-[#f2f2f0] py-16 sm:py-24 text-ink relative border-t border-black/5">
      {" "}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex items-end justify-between mb-12">
          {" "}
          <div>
            {" "}
            <span className="text-[10px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block mb-1">
              {" "}
              HAUTE SELECTION
            </span>{" "}
            <SectionHeading
              title="NEW ARRIVALS"
              subtitle="Experience our latest luxury formulations and extraits."
            />{" "}
          </div>{" "}
          <button
            onClick={() => onNavigate?.("new-arrivals")}
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
