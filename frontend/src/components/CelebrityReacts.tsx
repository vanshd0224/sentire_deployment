import { useState } from "react";

const CELEBRITY_IMAGES = [
  "/images/celebrities/IMG-20260807-WA0002.jpg",
  "/images/celebrities/IMG-20260807-WA0003.jpg",
  "/images/celebrities/IMG-20260807-WA0007.jpg",
  "/images/celebrities/IMG-20260807-WA0008.jpg",
  "/images/celebrities/IMG-20260807-WA0013.jpg",
  "/images/celebrities/IMG-20260807-WA0016.jpg",
  "/images/celebrities/IMG-20260807-WA0022.jpg",
  "/images/celebrities/IMG-20260807-WA0023.jpg",
  "/images/celebrities/IMG-20260807-WA0024.jpg",
  "/images/celebrities/IMG-20260807-WA0031.jpg",
];

export default function CelebrityReacts() {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Duplicate items twice to ensure a seamless, continuous infinite marquee
  const marqueeItems = [...CELEBRITY_IMAGES, ...CELEBRITY_IMAGES];

  const handlePrev = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === 0 ? CELEBRITY_IMAGES.length - 1 : (prev as number) - 1,
    );
  };

  const handleNext = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === CELEBRITY_IMAGES.length - 1 ? 0 : (prev as number) + 1,
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden py-14 lg:py-20 bg-[#121110] text-[#eeebe5] border-t border-b border-[#a4492e]/20"
      aria-label="Celebrity Reacts to Sentire"
      id="celebrity-reacts"
    >
      {" "}
      {/* Dynamic inline styles for infinite marquee animation */}
      <style>{`
        @keyframes celebMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-celeb-marquee {
          display: flex;
          width: max-content;
          animation: celebMarquee 35s linear infinite;
        }
      `}</style>{" "}
      {/* Background ambient gold radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(164, 73, 46,0.12) 0%, transparent 75%)",
        }}
      />{" "}
      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-10 w-full max-w-[1440px] px-5 md:px-10 lg:mb-14">
        {" "}
        <div className="h-px w-full bg-paper/20" />{" "}
        <p className="ed-label mt-5 !text-paper/55">Worn by</p>{" "}
        <h2 className="mt-3 font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
          {" "}
          Celebrity reacts <em className="italic">to Sentire.</em>{" "}
        </h2>{" "}
      </div>{" "}
      {/* Moving Loop Container (Infinite Photo Marquee) */}
      <div className="celeb-marquee-wrapper relative z-10 w-full overflow-hidden py-2 cursor-pointer">
        {" "}
        {/* Left & Right edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 md:w-32 bg-gradient-to-r from-[#121110] to-transparent" />{" "}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 md:w-32 bg-gradient-to-l from-[#121110] to-transparent" />{" "}
        <div className="animate-celeb-marquee gap-5 md:gap-7 px-4">
          {" "}
          {marqueeItems.map((imgSrc, idx) => {
            const originalIndex = idx % CELEBRITY_IMAGES.length;
            return (
              <div
                key={`${imgSrc}-${idx}`}
                onClick={() => setActiveModalIndex(originalIndex)}
                className="group relative flex-shrink-0 w-60 md:w-72 aspect-[3/4] rounded-xl overflow-hidden border border-[#a4492e]/30 bg-[#140e0a] shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#a4492e] hover:shadow-[0_12px_30px_rgba(164, 73, 46,0.3)]"
              >
                {" "}
                <img
                  src={imgSrc}
                  alt={`Celebrity ${originalIndex + 1}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />{" "}
                {/* Subtle hover overlay highlight */}
                <div className="absolute inset-0 bg-[#a4492e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />{" "}
              </div>
            );
          })}
        </div>{" "}
      </div>{" "}
      {/* Fullscreen Photo Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActiveModalIndex(null)}
        >
          {" "}
          <div
            className="relative max-w-3xl max-h-[90vh] rounded-2xl border border-[#a4492e]/40 bg-[#120d09] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* Close Button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#a4492e]/40 bg-[#121110]/80 text-[#a4492e] transition-all hover:bg-[#a4492e] hover:text-[#121110]"
              aria-label="Close celebrity modal"
            >
              {" "}
              ✕
            </button>{" "}
            {/* Photo View */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[80vh]">
              {" "}
              <img
                src={CELEBRITY_IMAGES[activeModalIndex]}
                alt={`Celebrity ${activeModalIndex + 1}`}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />{" "}
            </div>{" "}
            {/* Lightbox Navigation Controls */}
            <div className="flex items-center justify-between p-4 bg-[#120d09] border-t border-[#a4492e]/20">
              {" "}
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 rounded-lg border border-[#a4492e]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a4492e] transition-all hover:bg-[#a4492e]/10"
              >
                {" "}
                ← Prev Photo
              </button>{" "}
              <span className="text-xs text-[#eeebe5]/60 font-mono">
                {" "}
                {activeModalIndex + 1} / {CELEBRITY_IMAGES.length}
              </span>{" "}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg border border-[#a4492e]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a4492e] transition-all hover:bg-[#a4492e]/10"
              >
                {" "}
                Next Photo →
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </section>
  );
}
