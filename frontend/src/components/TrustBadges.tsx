interface QualityBadge {
  id: string;
  name: string;
  sub: string;
  cardStyle: string;
  textStyle: string;
  subStyle: string;
  icon: React.ReactNode;
}

const qualityBadges: QualityBadge[] = [
  {
    id: "fda",
    name: "FDA APPROVED",
    sub: "U.S. VERIFIED",
    cardStyle: "bg-sky-50/90 border-sky-200/90 hover:border-sky-400 hover:shadow-sky-100/50",
    textStyle: "text-sky-950 font-bold",
    subStyle: "bg-sky-600/10 text-sky-700 border-sky-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-md shadow-sky-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35 4.5-1.2 8-6.1 8-11.35V5l-8-3z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M9 12l2.2 2.2 4.3-4.5" stroke="#ffffff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    id: "gentle",
    name: "GENTLE FORMULA",
    sub: "DERM TESTED",
    cardStyle: "bg-rose-50/90 border-rose-200/90 hover:border-rose-400 hover:shadow-rose-100/50",
    textStyle: "text-rose-950 font-bold",
    subStyle: "bg-rose-600/10 text-rose-700 border-rose-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-white shadow-md shadow-rose-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ffffff" fillOpacity="0.3" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11.5c1.5 1.5 4.5 1.5 6 0" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    id: "phthalate",
    name: "PHTHALATE FREE",
    sub: "NON-TOXIC",
    cardStyle: "bg-emerald-50/90 border-emerald-200/90 hover:border-emerald-400 hover:shadow-emerald-100/50",
    textStyle: "text-emerald-950 font-bold",
    subStyle: "bg-emerald-600/10 text-emerald-700 border-emerald-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-md shadow-emerald-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} fill="currentColor" fillOpacity="0.2" />
          <path d="M9 14.5c2-2.5 5.5-2.5 6 0M12 7.5v4" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
          <path d="M10 6h4" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      </div>
    ),
  },
  {
    id: "triclosan",
    name: "TRICLOSAN FREE",
    sub: "PURE SAFE",
    cardStyle: "bg-cyan-50/90 border-cyan-200/90 hover:border-cyan-400 hover:shadow-cyan-100/50",
    textStyle: "text-cyan-950 font-bold",
    subStyle: "bg-cyan-600/10 text-cyan-700 border-cyan-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-white shadow-md shadow-cyan-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 3v4m0 10v4M3 12h4m10 0h4" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" stroke="#ffffff" strokeWidth={1.8} fill="currentColor" fillOpacity="0.3" />
          <path d="M9.5 12l1.8 1.8 3.2-3.3" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    id: "ifra-alcohol",
    name: "IFRA ETHYL ALCOHOL",
    sub: "CERTIFIED 100%",
    cardStyle: "bg-amber-50/90 border-amber-200/90 hover:border-amber-400 hover:shadow-amber-100/50",
    textStyle: "text-amber-950 font-bold",
    subStyle: "bg-amber-600/10 text-amber-800 border-amber-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white shadow-md shadow-amber-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="12" cy="11" r="7" stroke="#ffffff" strokeWidth={1.8} fill="#ffffff" fillOpacity="0.25" />
          <path d="M9 17.5l-1.5 4.5 4.5-2.5 4.5 2.5-1.5-4.5" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.4" />
          <path d="M9.5 11l1.8 1.8 3.2-3.3" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    id: "cruelty-free",
    name: "CRUELTY FREE",
    sub: "NO ANIMAL TESTING",
    cardStyle: "bg-purple-50/90 border-purple-200/90 hover:border-purple-400 hover:shadow-purple-100/50",
    textStyle: "text-purple-950 font-bold",
    subStyle: "bg-purple-600/10 text-purple-700 border-purple-300/40",
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-700 text-white shadow-md shadow-purple-500/25 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 20.5c-4.5 0-7.5-3-7.5-6.5C4.5 11.5 6 9 9 7.5c0-3.5 1.5-6 3-6s3 2.5 3 6c3 1.5 4.5 4 4.5 6.5 0 3.5-3 6.5-7.5 6.5z" fill="#ffffff" fillOpacity="0.3" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9.5" cy="13.5" r="1" fill="#ffffff" />
          <circle cx="14.5" cy="13.5" r="1" fill="#ffffff" />
        </svg>
      </div>
    ),
  },
];

const marqueeBadges = [...qualityBadges, ...qualityBadges, ...qualityBadges, ...qualityBadges];

export default function TrustBadges() {
  return (
    <section className="w-full bg-[#fdfbf7] border-y border-[#c89b5a]/20 py-4.5 overflow-hidden relative">
      {/* Infinite Scroll Marquee Loop */}
      <div className="relative w-full overflow-hidden group">
        {/* Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fdfbf7] via-[#fdfbf7]/90 to-transparent z-10 pointer-events-none" />

        <div className="ticker-track flex items-center gap-4 sm:gap-6 w-max py-1">
          {marqueeBadges.map((badge, index) => (
            <div
              key={`${badge.id}-${index}`}
              className={`flex items-center gap-3 px-4 py-2 border rounded-xl transition-all duration-300 shadow-xs hover:shadow-md cursor-default shrink-0 group/badge ${badge.cardStyle}`}
            >
              <div className="transition-transform duration-300 group-hover/badge:scale-110">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11.5px] font-black tracking-[0.06em] uppercase whitespace-nowrap ${badge.textStyle}`}>
                    {badge.name}
                  </span>
                </div>
                <span className={`text-[8.5px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded border w-max mt-0.5 ${badge.subStyle}`}>
                  {badge.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




