import { ScrollLean } from "../editorial/home/Kinetic";

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
    <section className="w-full bg-[#f2f2f0] border-y border-[color:var(--accent)]/15 py-3.5 overflow-hidden select-none">
      {" "}
      {/* Logos Marquee Loop Track */}
      <div className="relative w-full overflow-hidden">
        {" "}
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f2f2f0] via-[#f2f2f0]/80 to-transparent z-10 pointer-events-none" />{" "}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f2f2f0] via-[#f2f2f0]/80 to-transparent z-10 pointer-events-none" />{" "}
        <ScrollLean max={12}>
          <div className="ticker-track flex items-center gap-6 sm:gap-12 w-max">
            {" "}
            {marqueeLogos.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex h-11 min-w-[110px] items-center justify-center px-2"
              >
                {" "}
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-6 w-auto max-w-[120px] object-contain opacity-55 grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0 sm:h-7"
                />{" "}
              </div>
            ))}
          </div>{" "}
        </ScrollLean>
      </div>{" "}
    </section>
  );
}
