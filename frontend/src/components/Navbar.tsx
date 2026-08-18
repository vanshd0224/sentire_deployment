import { useState, useRef, useEffect } from "react";
import SentireLogo from "./SentireLogo";

export interface PerfumeFilterOptions {
  size?: number;
  mood?: string;
  category?: string;
  collection?: string;
}

const navLinks = [
  {
    label: "Perfumes",
    mega: {
      categories: [
        {
          title: "Shop by Size",
          items: [
            { label: "10 ml — Trial Discovery", sub: "Perfect to test on skin", filter: { size: 10 } },
            { label: "30 ml — Voyage Flacon", sub: "Ideal for travel & gifting", filter: { size: 30 } },
            { label: "50 ml — Grand Flacon", sub: "Signature Haute Extrait", filter: { size: 50 } },
          ],
        },
        {
          title: "Shop by Mood & Sillage",
          items: [
            { label: "Party & Gala", sub: "Magnetic, opulent & bold", filter: { mood: "party" } },
            { label: "Signature Everyday", sub: "Effortless French elegance", filter: { mood: "regular" } },
            { label: "Sport & Riviera", sub: "Fresh aquatic & zesty citrus", filter: { mood: "sports" } },
            { label: "Date Night & Intimate", sub: "Sensual amber & dark rose", filter: { mood: "date-night" } },
            { label: "Casual & Serene", sub: "Clean tea accords & soft woods", filter: { mood: "casual" } },
          ],
        },
      ],
      featured: {
        label: "New Arrival • Crown Jewel",
        name: "Purple Oud",
        sub: "Cambodian oud entwined with saffron & velvet amethyst rose",
        img: "/images/purple-oud-arrival.png",
        filter: { category: "50ml-exclusive" },
      },
    },
  },
  { label: "Best Sellers", href: "#best-sellers", filter: { category: "bestsellers" } },
  { label: "New Arrivals", href: "#new-arrivals", filter: { category: "bestsellers" } },
  { label: "BYOB Box", href: "#" },
  { label: "Product Personalisation", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Client Services", href: "#client-services" },
  { label: "Track Order", href: "#" },
];

interface NavbarProps {
  onOpenBundleModal?: () => void;
  onNavigate?: (
    page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order",
    filters?: PerfumeFilterOptions
  ) => void;
  currentPage?: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order";
  cartCount?: number;
  onOpenAccount?: () => void;
  onOpenCart?: () => void;
  onSelectProduct?: (product: any) => void;
}

export const SEARCHABLE_PRODUCTS = [
  { id: "calantha", num: "No. 01", name: "Calantha", desc: "Blooming Florals · Sandalwood & Amber", price: 799, img: "/assets/calantha.png", notes: "Jasmine, Rose, Lily of Valley", scentFamily: "floral", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Jasmine", "Rose", "Lily of Valley", "Sandalwood", "Amber"] },
  { id: "deep-crush", num: "No. 02", name: "Deep Crush", desc: "Lavender & Warm Tobacco Woods", price: 799, img: "/assets/deep-crush.png", notes: "Lavender, Rose, Tobacco, Sandalwood", scentFamily: "floral", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Lavender", "Rose", "Tobacco", "Sandalwood", "Amber"] },
  { id: "herrlich", num: "No. 03", name: "Herrlich", desc: "Fresh Fruits & Decadent Chocolate", price: 799, img: "/assets/herrlich.png", notes: "Bergamot, Apple, Jasmine, Chocolate", scentFamily: "woody", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Bergamot", "Apple", "Chocolate"] },
  { id: "sports-mode", num: "No. 04", name: "Sports Mode", desc: "Aquatic Sea Breeze & Citrus Bergamot", price: 799, img: "/assets/sports-mode.png", notes: "Sea Water, Bergamot, Rosemary", scentFamily: "fresh", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Sea Water", "Bergamot", "Rosemary"] },
  { id: "black-forest", num: "No. 05", name: "Black Forest", desc: "Earthy Vetiver & Dark Amber Woods", price: 799, img: "/assets/black-forest.png", notes: "Vetiver, Earthy Moss, Dark Amber", scentFamily: "woody", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Vetiver", "Earthy Moss", "Dark Amber"] },
  { id: "glorious", num: "No. 06", name: "Glorious", desc: "Sparkling Citrus & Velvet White Musk", price: 799, img: "/assets/glorious.png", notes: "Sparkling Citrus, White Musk, Jasmine", scentFamily: "citrus", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Sparkling Citrus", "White Musk"] },
  { id: "gourmet", num: "No. 07", name: "Gourmet", desc: "Warm Vanilla & Roasted Tonka Bean", price: 799, img: "/assets/gourmet.png", notes: "Warm Vanilla, Roasted Tonka, Hazelnut", scentFamily: "oriental", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Warm Vanilla", "Tonka Bean"] },
  { id: "rich", num: "No. 08", name: "Rich", desc: "Opulent Bergamot & Spiced Rose", price: 799, img: "/assets/rich.png", notes: "Bergamot, Spiced Rose, Patchouli", scentFamily: "ambar", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Bergamot", "Spiced Rose"] },
  { id: "seductive", num: "No. 09", name: "Seductive", desc: "Citric Limon & Velvet Amber", price: 799, img: "/assets/seductive.png", notes: "Limon, Lavender, Patchouli Amber", scentFamily: "oriental", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Limon", "Lavender"] },
  { id: "white-oud", num: "No. 10", name: "White Oud", desc: "Smoky Oud & Resinous Amber", price: 799, img: "/assets/white-oud.png", notes: "Essence of Oud, Lavender, Labdanum", scentFamily: "woody", sizes: [10, 30, 50], prices: { 10: 799, 30: 1499, 50: 2499 }, traces: ["Essence of Oud", "Lavender"] },
  { id: "purple-oud", num: "No. 11", name: "Purple Oud", desc: "Smoky Cambodian Oud & Saffron", price: 4999, img: "/assets/purple-oud.png", notes: "Cambodian Oud, Fiery Saffron, Rose", scentFamily: "woody", sizes: [50], prices: { 50: 4999 }, traces: ["Cambodian Oud", "Fiery Saffron"] },
  { id: "bijou", num: "No. 12", name: "Bijou", desc: "Floral Bouquet & Sandalwood", price: 799, img: "/assets/bijou.jpg", notes: "Floral Bouquet, Sandalwood, Musk", scentFamily: "floral", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Floral Bouquet", "Sandalwood"] },
  { id: "dapper", num: "No. 13", name: "Dapper", desc: "Rich Tobacco & Clove Spices", price: 799, img: "/assets/dapper.jpg", notes: "Tobacco, Clove, Cedarwood", scentFamily: "woody", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Tobacco", "Clove"] },
  { id: "le-chocolat", num: "No. 14", name: "Le Chocolat", desc: "Dark Cocoa & Creamy Vanilla", price: 799, img: "/assets/le-chocolat.jpg", notes: "Dark Chocolate, Cocoa, Vanilla", scentFamily: "oriental", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Dark Chocolate", "Cocoa"] },
  { id: "pc-leather", num: "No. 15", name: "PC Leather", desc: "Fine Italian Leather & Spices", price: 799, img: "/assets/pc-leather.jpg", notes: "Fine Leather, Warm Spices, Amber", scentFamily: "woody", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Fine Leather", "Spices"] },
  { id: "quantillion", num: "No. 16", name: "Quantillion", desc: "Mandarin & Amberwood", price: 799, img: "/assets/quantillion.jpg", notes: "Mandarin, Bergamot, Amberwood", scentFamily: "citrus", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Mandarin", "Amberwood"] },
  { id: "reiz", num: "No. 17", name: "Reiz", desc: "Lemon & Cinnamon Spices", price: 799, img: "/assets/reiz.jpg", notes: "Juicy Lemon, Cinnamon, Musk", scentFamily: "fresh", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Juicy Lemon", "Cinnamon"] },
  { id: "sent-aura", num: "No. 18", name: "Sent-Aura", desc: "Fresh Pear & Green Tea", price: 799, img: "/assets/sent-aura.jpg", notes: "Pear, Green Tea, Cedarwood", scentFamily: "floral", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Pear", "Green Tea"] },
  { id: "vanaco", num: "No. 19", name: "Vanaco", desc: "Exhilarating Citrus & Oakmoss", price: 799, img: "/assets/vanaco.jpg", notes: "Lemon, Black Pepper, Oakmoss", scentFamily: "ambar", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Lemon", "Oakmoss"] },
  { id: "woody", num: "No. 20", name: "Woody", desc: "Smoky Oud & Cedarwood", price: 799, img: "/assets/woody.jpg", notes: "Smoky Oud, Cedarwood, Amber", scentFamily: "woody", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Smoky Oud", "Cedarwood"] },
  { id: "zephyrine", num: "No. 21", name: "Zephyrine", desc: "Lemon & Smooth Sandalwood", price: 799, img: "/assets/perfumes/zephyrine-30ml-1.png?v=2", notes: "Lemon, Jasmine, Rosemary", scentFamily: "floral", sizes: [10, 30], prices: { 10: 799, 30: 1499 }, traces: ["Lemon", "Jasmine"] },
];

export default function Navbar({
  onOpenBundleModal,
  onNavigate,
  currentPage,
  cartCount = 0,
  onOpenAccount,
  onOpenCart,
  onSelectProduct,
}: NavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartPop, setCartPop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 140); };

  // Keyboard shortcut: Cmd+K or Ctrl+K to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  useEffect(() => {
    if (cartCount > 0) {
      setCartPop(true);
      const t = setTimeout(() => setCartPop(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const searchResults = searchQuery.trim() === "" ? [] : SEARCHABLE_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.scentFamily.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes badgePop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.35); color: #d4af37; }
          100% { transform: scale(1); }
        }
        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #18130f;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          background: transparent;
          border: none;
          outline: none;
        }
        .nav-icon-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(200, 155, 90, 0.14);
          transform: scale(0);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-icon-btn:hover::before { transform: scale(1); }
        .nav-icon-btn:hover { color: #c89b5a; }
        .nav-icon-btn svg { position: relative; z-index: 1; transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        .nav-icon-btn:hover svg { transform: scale(1.12); }
        .nav-icon-btn.active { background: #0b0907; color: #c89b5a; box-shadow: 0 0 0 1px rgba(200,155,90,.45), 0 4px 16px rgba(0,0,0,.2); }
        .nav-icon-btn.active::before { transform: scale(0); }
      `}</style>

      <header className="sticky top-0 z-50 w-full border-b border-[#c89b5a]/20 bg-white/95 backdrop-blur-2xl shadow-xs transition-all">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-12">

          {/* Left: Mobile Hamburger + Animated Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Toggle Mobile Navigation"
              onClick={() => setMobileNavOpen(true)}
              className="flex md:!hidden lg:!hidden nav-icon-btn shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Motion Animated Logo */}
            <SentireLogo
              variant="navbar"
              theme="light"
              animated={true}
              onClick={() => onNavigate?.("home")}
              className="shrink-0"
            />
          </div>

          {/* ── Main Navigation Links ── */}
          <nav className="hidden items-center gap-4 lg:gap-7 md:flex">
            {navLinks.map((link) => {
              const showMega = Boolean(link.mega && currentPage !== "perfumes");
              const isCurrent =
                (currentPage === "perfumes" && link.label === "Perfumes") ||
                (currentPage === "bestsellers" && link.label === "Best Sellers") ||
                (currentPage === "new-arrivals" && link.label === "New Arrivals") ||
                (currentPage === "about" && link.label === "About Us") ||
                (currentPage === "byob" && link.label.includes("BYOB")) ||
                (currentPage === "personalisation" && link.label.includes("Personalisation")) ||
                (currentPage === "client-services" && link.label === "Client Services") ||
                (currentPage === "track-order" && link.label.includes("Track"));

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={showMega ? openMega : undefined}
                  onMouseLeave={showMega ? closeMega : undefined}
                >
                  <a
                    href={link.href || "#"}
                    onClick={(e) => {
                      if (link.label === "Perfumes") {
                        e.preventDefault();
                        onNavigate?.("perfumes");
                        setMegaOpen(false);
                      } else if (link.label === "Best Sellers") {
                        e.preventDefault();
                        onNavigate?.("bestsellers");
                        setMegaOpen(false);
                      } else if (link.label === "New Arrivals") {
                        e.preventDefault();
                        onNavigate?.("new-arrivals");
                        setMegaOpen(false);
                      } else if (link.label === "About Us") {
                        e.preventDefault();
                        onNavigate?.("about");
                        setMegaOpen(false);
                      } else if (link.label.includes("Personalisation")) {
                        e.preventDefault();
                        onNavigate?.("personalisation");
                        setMegaOpen(false);
                      } else if (link.label.includes("BYOB")) {
                        e.preventDefault();
                        onNavigate?.("byob");
                        setMegaOpen(false);
                      } else if (link.label === "Client Services") {
                        e.preventDefault();
                        onNavigate?.("client-services");
                        setMegaOpen(false);
                      } else if (link.label.includes("Track")) {
                        e.preventDefault();
                        onNavigate?.("track-order");
                        setMegaOpen(false);
                      } else if (currentPage !== "home" && link.href && link.href.startsWith("#")) {
                        onNavigate?.("home");
                      }
                    }}
                    className={`group relative flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 py-1 ${
                      isCurrent
                        ? "text-[#c89b5a] font-bold"
                        : "text-[#1e1e1e]/85 hover:text-[#c89b5a]"
                    }`}
                  >
                    {link.label}
                    {showMega && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
                        className={`h-3 w-3 transition-transform duration-200 ${megaOpen ? "rotate-180 text-[#c89b5a]" : ""}`}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                    <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#c89b5a] transition-all duration-300 ${isCurrent ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* ── Action Icons Suite ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Expanding search bar */}
            <div className="relative">
              <div
                className="flex items-center overflow-hidden rounded-full"
                style={{
                  width: searchOpen ? "280px" : "40px",
                  background: searchOpen ? "#f5f0e8" : "transparent",
                  boxShadow: searchOpen ? "0 0 0 1.5px rgba(200,155,90,.45), 0 6px 24px rgba(0,0,0,.08)" : "none",
                  transition: "width .35s cubic-bezier(.4,0,.2,1), background .2s, box-shadow .2s",
                }}
              >
                <button
                  aria-label="Search Fragrances"
                  onClick={() => {
                    setSearchOpen((p) => !p);
                    if (searchOpen) setSearchQuery("");
                  }}
                  className={`nav-icon-btn shrink-0 ${searchOpen ? "active" : ""}`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                  title="Search (Ctrl+K)"
                >
                  {searchOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-[16px] w-[16px]">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-[17px] w-[17px]">
                      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                    </svg>
                  )}
                </button>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes, woody, oud…"
                  className="w-full bg-transparent pr-3 text-[12px] text-[#1e1e1e] placeholder-ink/40 outline-none"
                  style={{ opacity: searchOpen ? 1 : 0, pointerEvents: searchOpen ? "auto" : "none", transition: "opacity .2s ease .1s", fontFamily: "var(--font-sans)" }}
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                />
              </div>

              {/* Live Search Results Dropdown Popover */}
              {searchOpen && searchQuery.trim() !== "" && (
                <div className="absolute right-0 top-full mt-2.5 z-50 w-84 sm:w-96 rounded-2xl border border-[#c89b5a]/40 bg-[#fdfbf8] p-3.5 shadow-2xl backdrop-blur-2xl animate-fadeIn max-h-[420px] overflow-y-auto luxury-scrollbar">
                  <div className="flex items-center justify-between border-b border-black/8 pb-2 px-2 mb-2.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#c89b5a]">
                      Olfactory Discovery ({searchResults.length})
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[10.5px] text-ink/50 hover:text-ink cursor-pointer font-medium"
                    >
                      Clear
                    </button>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="py-8 text-center text-xs text-ink/60 font-medium">
                      <p>No fragrances found for "{searchQuery}"</p>
                      <p className="text-[10.5px] text-[#c89b5a] mt-1">Try "Oud", "Lavender", "Amber", or "Floral"</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onNavigate?.("perfumes");
                            onSelectProduct?.(product);
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 rounded-xl border border-black/6 bg-white p-2.5 hover:border-[#c89b5a] hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="h-12 w-12 shrink-0 rounded-lg bg-[#f6f2ec] p-1 flex items-center justify-center overflow-hidden border border-black/5">
                            <img src={product.img} alt={product.name} className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] font-bold uppercase tracking-wider text-[#c89b5a] block">
                                {product.num}
                              </span>
                              <span className="text-[8px] font-semibold uppercase px-1.5 py-0.2 rounded bg-[#c89b5a]/10 text-[#c89b5a] border border-[#c89b5a]/20">
                                {product.scentFamily}
                              </span>
                            </div>
                            <h4 className="font-display text-xs font-bold text-ink truncate group-hover:text-[#c89b5a] transition-colors mt-0.5">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-ink/55 truncate mt-0.5">{product.notes}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-ink block">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-[#c89b5a] font-medium group-hover:underline">
                              View Scent →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hidden h-5 w-px bg-ink/12 sm:block" />

            {/* Account Icon */}
            <button
              aria-label="Account Login / Profile"
              id="navbar-account-btn"
              className="nav-icon-btn flex cursor-pointer"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenAccount?.(); }}
              title="Account & Orders"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-[18px] w-[18px]">
                <circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c1.5-4 4-6 7.5-6s6 2 7.5 6" />
              </svg>
            </button>

            {/* Shopping Bag Icon */}
            <button
              aria-label="Shopping Bag"
              className="nav-icon-btn relative cursor-pointer"
              onClick={() => onOpenCart?.()}
              title="View Shopping Bag"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-[18px] w-[18px]">
                <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[8.5px] font-bold text-white shadow-md"
                  style={{
                    background: "linear-gradient(135deg,#c89b5a,#d4af37)",
                    boxShadow: "0 2px 8px rgba(200,155,90,.6)",
                    animation: cartPop ? "badgePop .38s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mega Menu ── */}
        {megaOpen && currentPage !== "perfumes" && (() => {
          const link = navLinks.find((l) => l.mega);
          if (!link?.mega) return null;
          const { categories, featured } = link.mega;
          return (
            <div
              className="absolute left-0 right-0 top-full z-50 w-full"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              style={{ animation: "megaIn .24s cubic-bezier(.16,1,.3,1) both" }}
            >
              <div className="h-px w-full" />
              <div
                className="mx-auto max-w-[1440px] overflow-hidden border border-black/8 bg-white/98 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
                style={{ borderRadius: "0 0 20px 20px" }}
              >
                <div className="flex">
                  {/* Category columns */}
                  <div className="flex flex-1 gap-0 divide-x divide-ink/8">
                    {categories.map((cat) => (
                      <div key={cat.title} className="flex-1 px-8 py-8">
                        <p className="mb-4 text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#c89b5a]"
                          style={{ fontFamily: "var(--font-sans)" }}>
                          {cat.title}
                        </p>
                        <ul className="space-y-1">
                          {cat.items.map((item) => (
                            <li key={item.label}>
                              <button
                                onClick={() => {
                                  setMegaOpen(false);
                                  onNavigate?.("perfumes", item.filter);
                                }}
                                className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-200 hover:bg-[#faf6f0] cursor-pointer"
                              >
                                <span>
                                  <span className="block text-[13px] font-semibold text-ink transition-colors duration-200 group-hover:text-[#c89b5a]"
                                    style={{ fontFamily: "var(--font-sans)" }}>
                                    {item.label}
                                  </span>
                                  <span className="block text-[11px] text-ink/50"
                                    style={{ fontFamily: "var(--font-sans)" }}>
                                    {item.sub}
                                  </span>
                                </span>
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6}
                                  className="h-3.5 w-3.5 translate-x-0 text-ink/20 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#c89b5a] group-hover:opacity-100">
                                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured Card - Full Bleed Editorial Luxury */}
                  <button
                    onClick={() => {
                      setMegaOpen(false);
                      onNavigate?.("perfumes", featured.filter);
                    }}
                    className="group relative flex w-80 shrink-0 flex-col overflow-hidden text-left cursor-pointer border-l border-[#c89b5a]/30"
                    style={{ background: "#0d0906" }}
                  >
                    {/* Full-bleed background image with smooth zoom on hover */}
                    <div className="relative h-full min-h-[320px] w-full overflow-hidden">
                      <img
                        src={featured.img}
                        alt={featured.name}
                        className="h-full w-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-90"
                      />
                      {/* Ambient gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-[#080604]/45 to-black/20" />

                      {/* Content on image */}
                      <div className="absolute inset-0 p-7 flex flex-col justify-end">
                        <span
                          className="self-start rounded-full bg-[#c89b5a]/25 backdrop-blur-md border border-[#c89b5a]/50 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-[#d4af37] mb-2 shadow-sm"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {featured.label}
                        </span>
                        <h4 className="font-display text-[22px] font-bold uppercase tracking-wide text-white leading-tight">
                          {featured.name}
                        </h4>
                        <p
                          className="mt-1 text-[11px] leading-relaxed text-[#f8f5f1]/75 line-clamp-2"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {featured.sub}
                        </p>
                        {/* CTA with gold arrow */}
                        <div
                          className="mt-4 flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-all duration-300 group-hover:text-white group-hover:gap-2.5"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <span>Discover Fragrance</span>
                          <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-3 transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M1 5h12M8 1l5 4-5 4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </header>

      {/* ── Mobile Slide-out Drawer ── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[99999] flex md:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md animate-fadeIn"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#faf7f2] h-full shadow-2xl p-6 flex flex-col justify-between animate-drawerSlideInLeft border-r border-[#c89b5a]/30 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <SentireLogo variant="navbar" theme="light" />
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="h-9 w-9 rounded-full bg-black/5 flex items-center justify-center text-ink cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileNavOpen(false);
                      if (link.label === "Perfumes") onNavigate?.("perfumes");
                      else if (link.label === "Best Sellers") onNavigate?.("bestsellers");
                      else if (link.label === "New Arrivals") onNavigate?.("new-arrivals");
                      else if (link.label === "About Us") onNavigate?.("about");
                      else if (link.label.includes("Personalisation")) onNavigate?.("personalisation");
                      else if (link.label.includes("BYOB")) onNavigate?.("byob");
                      else if (link.label === "Client Services") onNavigate?.("client-services");
                      else if (link.label.includes("Track")) onNavigate?.("track-order");
                      else onNavigate?.("home");
                    }}
                    className="w-full text-left py-3 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-ink hover:bg-black/5 hover:text-[#c89b5a] transition-all flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#c89b5a]">→</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 space-y-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenAccount?.();
                }}
                className="w-full py-3 bg-[#0b0907] text-[#d4af37] text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                Sign In / My Account
              </button>
              <p className="text-center text-[10px] text-ink/40 uppercase tracking-widest pt-2">
                Born in Heaven, Worn on Earth
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
