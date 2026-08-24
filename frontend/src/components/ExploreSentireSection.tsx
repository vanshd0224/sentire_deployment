interface ExploreSentireProps {
  onNavigate?: (page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order") => void;
}

const exploreLinks = [
  {
    title: "All Perfumes",
    description: "Explore our complete 35%+ pure perfume oil extrait de parfum collection.",
    href: "/perfumes",
    page: "perfumes" as const,
    badge: "11 Extraits",
  },
  {
    title: "Best Sellers",
    description: "Discover the signatures our clients return to time and time again.",
    href: "/bestsellers",
    page: "bestsellers" as const,
    badge: "Most Coveted",
  },
  {
    title: "New Arrivals",
    description: "Meet the latest high-concentration formulations and new creations.",
    href: "/new-arrivals",
    page: "new-arrivals" as const,
    badge: "Latest Releases",
  },
  {
    title: "Product Personalisation",
    description: "Complimentary laser photo, name, and date bottle engraving on 50ml flacons.",
    href: "/personalised-perfume",
    page: "personalisation" as const,
    badge: "Free Atelier Engraving",
  },
  {
    title: "Build Your Own Bundle",
    description: "Curate your custom fragrance wardrobe with multi-bottle bundle savings.",
    href: "/byob",
    page: "byob" as const,
    badge: "Custom Coffret",
  },
  {
    title: "Track Your Order",
    description: "Follow your SENTIRE Jaipur maison shipment and live delivery status.",
    href: "/track-order",
    page: "track-order" as const,
    badge: "Express Dispatch",
  },
];

export default function ExploreSentireSection({ onNavigate }: ExploreSentireProps) {
  return (
    <section className="w-full bg-[#faf7f2] py-12 sm:py-16 border-t border-[#c89b5a]/15" aria-label="Explore SENTIRE Navigation">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] mb-2">
            Haute Parfumerie Directory
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink font-semibold tracking-tight">
            Explore SENTIRE
          </h2>
          <p className="text-xs sm:text-sm text-ink/65 mt-2">
            Direct navigation across our artisanal fragrance collections, bespoke atelier services, and client concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {exploreLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.(item.page);
              }}
              className="group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-black/5 hover:border-[#c89b5a]/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#c89b5a] bg-[#c89b5a]/10 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-sm text-[#c89b5a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-[#c89b5a] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-ink/65 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center text-[11px] font-semibold text-[#8C6228]">
                <span>Explore {item.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
