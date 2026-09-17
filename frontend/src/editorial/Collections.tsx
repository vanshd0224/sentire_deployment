import { motion } from "framer-motion";
import type { PageName } from "../types/appTypes";
import { SectionHead } from "./Primitives";
import { EASE_OUT_EXPO, viewportOnce } from "./motion";

const ENTRIES: {
  title: string;
  caption: string;
  image: string;
  href: string;
  page?: PageName;
  byob?: boolean;
  tall?: boolean;
}[] = [
  {
    title: "Discovery set",
    caption: "Six vials · ₹549",
    image: "/images/curated-discovery-set-v5.webp",
    href: "/discovery-set",
    page: "discovery-set",
    tall: true,
  },
  {
    title: "Best sellers",
    caption: "Most worn this season",
    image: "/images/curated-best-sellers.webp",
    href: "/bestsellers",
    page: "bestsellers",
  },
  {
    title: "New arrivals",
    caption: "Latest from the bench",
    image: "/images/curated-new-arrivals.webp",
    href: "/new-arrivals",
    page: "new-arrivals",
  },
  {
    title: "Build your own bundle",
    caption: "Choose three, save more",
    image: "/images/curated-byob.webp",
    href: "/byob",
    byob: true,
    tall: true,
  },
];

interface CollectionsProps {
  onNavigate?: (page: PageName) => void;
  onOpenBundleModal?: () => void;
}

export default function Collections({ onNavigate, onOpenBundleModal }: CollectionsProps) {
  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="ed-container">
        <SectionHead label="Ways in" title="Start somewhere." />

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href={entry.href}
              onClick={(e) => {
                if (entry.byob && onOpenBundleModal) {
                  e.preventDefault();
                  onOpenBundleModal();
                  return;
                }
                if (entry.page && onNavigate) {
                  e.preventDefault();
                  onNavigate(entry.page);
                }
              }}
              className="group block cursor-pointer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.75, delay: i * 0.07, ease: EASE_OUT_EXPO }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-paper-2">
                <img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-2xl font-light tracking-[-0.01em]">{entry.title}</h3>
                <p className="ed-label mt-2">{entry.caption}</p>
                <span className="ed-link mt-3 inline-block text-[13px] font-medium">Open</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
