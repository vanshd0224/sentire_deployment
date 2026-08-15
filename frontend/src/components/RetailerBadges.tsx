const logos = [
  { name: "Blinkit", src: "/logos/blinkit.png" },
  { name: "Myntra", src: "/logos/myntra.png" },
  { name: "Instamart", src: "/logos/instamart.png" },
  { name: "Flipkart", src: "/logos/flipkart.png" },
  { name: "Ajio", src: "/logos/ajio.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
];

// Repeat logos 4x for smooth infinite scroll
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

export default function RetailerBadges() {
  return (
    <section className="w-full bg-[#f8f5f1] border-y border-[#c89b5a]/15 py-3.5 overflow-hidden select-none">
      {/* Logos Marquee Loop Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f8f5f1] via-[#f8f5f1]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f8f5f1] via-[#f8f5f1]/80 to-transparent z-10 pointer-events-none" />

        <div className="ticker-track flex items-center gap-6 sm:gap-12 w-max">
          {marqueeLogos.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-center bg-white border border-[#c89b5a]/25 hover:border-[#c89b5a] rounded-lg px-4 py-2 transition-all duration-300 shadow-xs hover:shadow-md h-11 min-w-[120px]"
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-6 sm:h-8 w-auto max-w-[130px] object-contain filter-none opacity-100 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
