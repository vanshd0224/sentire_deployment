import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { TiltCard } from "../editorial/discovery/fx";
import { EASE_OUT_EXPO } from "../editorial/motion";
import type { PerfumeFilterOptions } from "./Navbar";

const categories = [
  {
    title: "Discovery Set",
    subtitle: "Six Scents. Find Yours.",
    image: "/images/curated-discovery-set-v5.jpg?v=v5_clean",
    page: "discovery-set" as const,
  },
  {
    title: "New Arrivals",
    subtitle: "Discover The Unseen",
    image: "/images/curated-new-arrivals.jpg",
    filter: { category: "bestsellers" },
    page: "new-arrivals" as const,
  },
  {
    title: "Best Sellers",
    subtitle: "Most Loved Essentials",
    image: "/images/curated-best-sellers.jpg",
    filter: { category: "bestsellers" },
    page: "bestsellers" as const,
  },
  {
    title: "Build Your Own Bundle",
    subtitle: "Curate Your Perfect Set",
    image: "/images/curated-byob.jpg",
    isByob: true,
  },
];

interface ShopByCategoryProps {
  onNavigate?: (
    page:
      | "home"
      | "perfumes"
      | "bestsellers"
      | "new-arrivals"
      | "about"
      | "byob"
      | "personalisation"
      | "discovery-set",
    filters?: PerfumeFilterOptions,
  ) => void;
}

export default function ShopByCategory({ onNavigate }: ShopByCategoryProps) {
  return (
    <section className="cv-section w-full bg-[#f2f2f0] py-14 md:py-20 overflow-hidden reveal-fade-up">
      {" "}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {" "}
        <SectionHeading
          title="Curated Collections"
          subtitle="Explore the realms of Haute Parfumerie by category & bespoke rituals"
        />{" "}
        {/* Mobile Horizontal Rail / Desktop 4-Column Grid */}
        <div className="mt-8 md:mt-12 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {" "}
          {categories.map((cat, i) => {
            const targetHref = cat.isByob
              ? "/byob"
              : cat.page === "bestsellers"
                ? "/bestsellers"
                : cat.page === "new-arrivals"
                  ? "/new-arrivals"
                  : cat.page === "discovery-set"
                    ? "/discovery-set"
                    : "/perfumes";

            return (
              <motion.a
                key={cat.title}
                data-cursor="Explore"
                initial={{ opacity: 0, y: 70, rotate: i % 2 ? 2.5 : -2.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
                href={targetHref}
                onClick={(e) => {
                  e.preventDefault();
                  if (cat.isByob) {
                    onNavigate?.("byob");
                  } else if (cat.page === "bestsellers") {
                    onNavigate?.("bestsellers");
                  } else if (cat.page === "new-arrivals") {
                    onNavigate?.("new-arrivals");
                  } else if (cat.page === "discovery-set") {
                    onNavigate?.("discovery-set");
                  } else {
                    onNavigate?.("perfumes", (cat as any).filter);
                  }
                }}
                className="group flex flex-col text-left cursor-pointer outline-none shrink-0 w-[78vw] sm:w-[280px] md:w-auto snap-center"
              >
                {" "}
                <TiltCard max={7}>
                  <div className="relative aspect-[3/4] md:aspect-[3/3.7] w-full overflow-hidden rounded-[4px] shadow-lg border border-[color:var(--accent)]/30 bg-[#120d09] group-hover:border-[color:var(--accent)] group-hover:shadow-[0_16px_36px_rgba(107,20,34,0.22)] transition-all duration-500">
                    {" "}
                    <img
                      src={cat.image}
                      alt={`SENTIRE ${cat.title} - ${cat.subtitle} luxury perfume collection`}
                      width="320"
                      height="400"
                      className="h-full w-full object-cover object-[center_top] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      loading="lazy"
                      decoding="async"
                    />{" "}
                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/85 via-[#080604]/20 to-transparent" />{" "}
                    {/* Floating Glass Pill */}
                    <div className="on-dark absolute bottom-4 left-4 right-4 p-3 rounded-[4px] bg-black/40 backdrop-blur-md border border-white/15 group-hover:border-[color:var(--accent)]/50 transition-colors">
                      {" "}
                      <span className="text-[8.5px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block">
                        {" "}
                        {cat.subtitle}
                      </span>{" "}
                      <p className="font-display text-base font-bold tracking-wide text-white uppercase mt-0.5">
                        {" "}
                        {cat.title}
                      </p>{" "}
                      <span className="mt-1 inline-flex items-center gap-1.5 text-[9.5px] max-sm:text-[12px] tracking-[0.06em] text-[#f2f2f0]/90 uppercase font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                        {" "}
                        Explore Collection{" "}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                </TiltCard>
              </motion.a>
            );
          })}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
