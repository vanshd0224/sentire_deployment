const INSTAGRAM_REELS = [
  {
    id: "1",
    url: "https://www.instagram.com/reel/DWKLAYhE7IH/?igsi=eDhudzFjdDg1OW1o",
    thumb: "/images/hero-celestial.png",
    title: "Aditya Rikhari Custom Gifting",
    views: "24.7K",
    likes: "3.2K",
  },
  {
    id: "2",
    url: "https://www.instagram.com/reel/DWkyo3CiMTw/?igsi=MTNuaDFzZmd5Z2N2eQ==",
    thumb: "/assets/perfumes/purple-oud-50ml-2.png?v=3",
    title: "Bespoke Engraving Atelier",
    views: "48.2K",
    likes: "6.1K",
  },
  {
    id: "3",
    url: "https://www.instagram.com/reel/DWmbB3Ukz0M/?igsi=dDEyZGkzeXZwcXh3",
    thumb: "/assets/calantha.png?v=11",
    title: "35%+ Extrait Longevity",
    views: "105K",
    likes: "12.4K",
  },
  {
    id: "4",
    url: "https://www.instagram.com/p/Dcc-eHmphhd/?igsi=MmR2cXM1d3RqMGY2",
    thumb: "/assets/seductive.png?v=11",
    title: "Jaipur Laser Etching",
    views: "32.4K",
    likes: "4.5K",
  },
  {
    id: "5",
    url: "https://www.instagram.com/reel/DWBygFPCYI7/?igsi=MXBxZHU0aXdoaGNvag==",
    thumb: "/images/hero-atmosphere.png",
    title: "Luxury Coffret Unboxing",
    views: "89.1K",
    likes: "9.8K",
  },
  {
    id: "6",
    url: "https://www.instagram.com/p/DceZnyizv2x/?igsi=cTZ0NWJ5d2FqeXU=",
    thumb: "/images/purple-oud-arrival.png",
    title: "Signature Flacon Collection",
    views: "54.6K",
    likes: "7.3K",
  },
];

// Reel icon SVG
function ReelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z" />
    </svg>
  );
}

// Heart icon
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-14 sm:py-20 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)"/>
              <defs>
                <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f09433"/>
                  <stop offset="0.25" stopColor="#e6683c"/>
                  <stop offset="0.5" stopColor="#dc2743"/>
                  <stop offset="0.75" stopColor="#cc2366"/>
                  <stop offset="1" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
            </svg>
            <span
              className="text-[13px] font-semibold tracking-[0.18em] text-white uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              @sentireforelite
            </span>
          </div>

          <h2
            className="font-display text-[22px] uppercase tracking-[0.28em] sm:text-[28px]"
            style={{ color: "#f5f0e8" }}
          >
            <span style={{ color: "rgba(245,240,220,0.4)", marginRight: "14px" }}>——</span>
            As Seen on Instagram
            <span style={{ color: "rgba(245,240,220,0.4)", marginLeft: "14px" }}>——</span>
          </h2>

          <p
            className="text-[11px] tracking-[0.14em] uppercase text-[#c89b5a]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Tag us with <span className="underline decoration-[#c89b5a]/40 underline-offset-4">#SentireForElite</span> to be featured
          </p>
        </div>

        {/* 6 Grid items on Desktop / Horizontal Rail on Mobile */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {INSTAGRAM_REELS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square shrink-0 w-[44vw] sm:w-auto snap-center block overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 hover:border-[#c89b5a]/60 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Thumbnail */}
              <img
                src={post.thumb}
                alt={post.title}
                width="300"
                height="300"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Reel indicator overlay badge */}
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm text-[11px] shadow-xs border border-white/10">
                ▶
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 group-hover:bg-black/70 transition-all duration-300">
                <div className="flex flex-col items-center gap-2 p-3 text-center transition-all duration-300">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform">
                    <ReelIcon />
                  </span>
                  
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e2c48e] line-clamp-1">
                    {post.title}
                  </span>

                  <div className="flex items-center gap-3 text-white/90 pt-0.5">
                    <span className="flex items-center gap-1 text-[10px] font-semibold">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 opacity-80">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold">
                      <HeartIcon />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://www.instagram.com/sentireforelite?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border px-7 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-all duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c89b5a";
              e.currentTarget.style.color = "#c89b5a";
              e.currentTarget.style.background = "rgba(200,155,90,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
