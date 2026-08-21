const items = [
  // ── Promo messages ──────────────────────────────────
  {
    text: "Use Code PC100 — ₹100 Off on Orders Above ₹999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-3.5 w-3.5 shrink-0">
        <rect x="2" y="6" width="20" height="12" rx="1.5" />
        <path d="M7 12h2m3 0h5" strokeLinecap="round" />
        <circle cx="9" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    text: "Use Code PC200 — ₹200 Off on Orders Above ₹1,999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-3.5 w-3.5 shrink-0">
        <rect x="2" y="6" width="20" height="12" rx="1.5" />
        <path d="M7 12h2m3 0h5" strokeLinecap="round" />
        <circle cx="9" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  // ── Existing brand messages ──────────────────────────
  {
    text: "Complimentary Shipping on All Orders Above ₹999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-3.5 w-3.5 shrink-0">
        <path d="M2 7h13v9H2z" strokeLinejoin="round" />
        <path d="M15 10h3.5L21 13v3h-6z" strokeLinejoin="round" />
        <circle cx="6.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    text: "COD Available",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-3.5 w-3.5 shrink-0">
        <rect x="2" y="6" width="20" height="12" rx="1.5" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
];

/** Thin gold diamond separator between items */
const Separator = () => (
  <span className="mx-8 text-[#c89b5a] select-none" aria-hidden="true">
    ◆
  </span>
);

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#080705] text-[#f8f5f1] border-b border-[#c89b5a]/15 overflow-hidden select-none">
      {/* Mobile single-line rotating ticker / desktop marquee */}
      <div className="relative h-7 flex items-center overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        <div className="ticker-track flex items-center py-1 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-sans font-medium">
          {/* First copy */}
          {items.map((item, i) => (
            <span key={`a-${i}`} className="flex items-center gap-2 px-4 whitespace-nowrap snap-center">
              <span className="text-[#c89b5a]">{item.icon}</span>
              <span className="text-white/90">{item.text}</span>
              <Separator />
            </span>
          ))}
          {/* Duplicate copy for seamless loop */}
          {items.map((item, i) => (
            <span key={`b-${i}`} className="flex items-center gap-2 px-4 whitespace-nowrap snap-center">
              <span className="text-[#c89b5a]">{item.icon}</span>
              <span className="text-white/90">{item.text}</span>
              <Separator />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
