import SectionHeading from "./SectionHeading";
import type { PerfumeFilterOptions } from "./Navbar";

const categories = [
  { title: "New Arrivals", subtitle: "Latest Masterpieces", image: "/images/purple-oud-arrival.png", filter: { category: "bestsellers" }, page: "new-arrivals" as const },
  { title: "Best Sellers", subtitle: "Iconic House Signatures", image: "/images/product-white-oud.jpg", filter: { category: "bestsellers" }, page: "bestsellers" as const },
  { title: "Product Personalisation", subtitle: "Bespoke Engraving Atelier", image: "/images/category-personalisation.jpg", filter: { category: "all" }, page: "personalisation" as const },
  { title: "BYOB Discovery Box", subtitle: "Curate Custom Coffret", image: "/images/build-bundle.png", isByob: true },
];

interface ShopByCategoryProps {
  onNavigate?: (page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation", filters?: PerfumeFilterOptions) => void;
}

export default function ShopByCategory({ onNavigate }: ShopByCategoryProps) {
  return (
    <section className="w-full bg-[#f8f5f1] py-14 md:py-20 overflow-hidden reveal-fade-up">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <SectionHeading title="Curated Collections" subtitle="Explore the realms of Haute Parfumerie by category & bespoke rituals" />

        {/* Mobile Horizontal Rail / Desktop Grid */}
        <div className="mt-8 md:mt-12 flex md:grid md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={(e) => {
                e.preventDefault();
                if (cat.isByob) {
                  onNavigate?.("byob");
                } else if (cat.page === "about") {
                  onNavigate?.("about");
                } else if (cat.page === "bestsellers") {
                  onNavigate?.("bestsellers");
                } else if (cat.page === "new-arrivals") {
                  onNavigate?.("new-arrivals");
                } else if (cat.page === "personalisation") {
                  onNavigate?.("personalisation");
                } else {
                  onNavigate?.("perfumes", cat.filter);
                }
              }}
              className="group flex flex-col text-left transition-transform duration-500 hover:-translate-y-2 cursor-pointer outline-none shrink-0 w-[78vw] sm:w-[320px] md:w-auto snap-center"
            >
              <div className="relative aspect-[3/4] md:aspect-[3/3.7] w-full overflow-hidden rounded-2xl shadow-lg border border-[#c89b5a]/30 bg-[#120d09] group-hover:border-[#c89b5a] group-hover:shadow-[0_16px_36px_rgba(200,155,90,0.22)] transition-all duration-500">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/85 via-[#080604]/20 to-transparent" />

                {/* Floating Glass Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 group-hover:border-[#c89b5a]/50 transition-colors">
                  <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                    {cat.subtitle}
                  </span>
                  <p className="font-display text-base font-bold tracking-wide text-white uppercase mt-0.5">
                    {cat.title}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[9.5px] tracking-widest text-[#f8f5f1]/90 uppercase font-semibold group-hover:text-[#c89b5a] transition-colors">
                    Explore Collection <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
