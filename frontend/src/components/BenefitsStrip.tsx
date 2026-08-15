const benefits = [
  {
    title: "Rare Ingredients",
    subtitle: "Sourced from around the world",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-6 w-6 text-gold">
        <path d="M12 2 3 9l9 13 9-13z" strokeLinejoin="round" />
        <path d="M3 9h18M9 9l3 13 3-13" />
      </svg>
    ),
  },
  {
    title: "Expertly Crafted",
    subtitle: "By master perfumers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-6 w-6 text-gold">
        <path d="M9 2h6v4l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3z" strokeLinejoin="round" />
        <path d="M7 13h10" />
      </svg>
    ),
  },
  {
    title: "Long Lasting",
    subtitle: "Unforgettable presence",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-6 w-6 text-gold">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Luxury Experience",
    subtitle: "More than a fragrance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-6 w-6 text-gold">
        <path d="M3 11 21 3l-8 18-2-8z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BenefitsStrip() {
  return (
    <section className="w-full bg-[#0b0907] text-white border-y border-white/8 reveal-fade-up">
      <div
        className="mx-auto max-w-[1440px] px-6 py-8 sm:py-10 lg:px-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Responsive: 2-col on mobile, 4-col on sm+ */}
        <style>{`
          @media (min-width: 640px) {
            .benefits-grid-inner {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className="benefits-cell flex items-center gap-3 sm:gap-4 py-5 px-4 sm:px-6 bg-[#0b0907] transition-colors duration-300 hover:bg-[#120f0b]"
          >
            <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-[#c89b5a]/20">
              {b.icon}
            </span>
            <div>
              <p
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f5f0e8" }}
              >
                {b.title}
              </p>
              <p style={{ marginTop: "2px", fontSize: "10px", color: "rgba(245,240,232,0.5)", fontWeight: 300, fontFamily: "var(--font-sans)" }}>
                {b.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
