const items = [
  {
    text: "USE CODE PC100 FOR ₹100 OFF",
    icon: "♦",
  },
  {
    text: "USE CODE PC200 FOR ₹200 OFF",
    icon: "♦",
  },
  {
    text: "COMPLIMENTARY LASER PHOTO & NAME ENGRAVING",
    icon: "♦",
  },
  {
    text: "COMPLIMENTARY SHIPPING ON ALL ORDERS ABOVE ₹999",
    icon: "♦",
  },
];

export default function AnnouncementBar() {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .sentire-announcement-bar {
          display: block !important;
          background-color: #000000 !important;
          border-bottom: 1px solid rgba(200, 155, 90, 0.25);
        }
        .sentire-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 20s linear infinite;
        }
      `}</style>
      <div className="sentire-announcement-bar w-full text-[#f8f5f1] overflow-hidden select-none py-1.5 z-50">
        <div className="sentire-marquee-track text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-white">
          {/* First Loop */}
          {items.map((item, i) => (
            <span key={`m1-${i}`} className="inline-flex items-center whitespace-nowrap px-4 sm:px-8">
              <span>{item.text}</span>
              <span className="ml-4 sm:ml-8 text-[#c89b5a]">{item.icon}</span>
            </span>
          ))}
          {/* Duplicate Loop for Infinite Seamless Scroll */}
          {items.map((item, i) => (
            <span key={`m2-${i}`} className="inline-flex items-center whitespace-nowrap px-4 sm:px-8">
              <span>{item.text}</span>
              <span className="ml-4 sm:ml-8 text-[#c89b5a]">{item.icon}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
