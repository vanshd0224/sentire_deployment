const posts = [
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/17749805/pexels-photo-17749805.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "124K",
    likes: "8.2K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/5240660/pexels-photo-5240660.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "89K",
    likes: "5.6K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/9790391/pexels-photo-9790391.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "210K",
    likes: "14.1K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/8217767/pexels-photo-8217767.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "67K",
    likes: "4.3K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/19906665/pexels-photo-19906665.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "312K",
    likes: "21.9K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/28606686/pexels-photo-28606686.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "156K",
    likes: "11.4K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/7290709/pexels-photo-7290709.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "98K",
    likes: "7.8K",
  },
  {
    type: "video",
    thumb: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=600",
    views: "183K",
    likes: "13.2K",
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
    <section className="w-full bg-[#0a0a0a] py-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          {/* Instagram wordmark */}
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
            className="font-display text-[22px] uppercase tracking-[0.28em] sm:text-[26px]"
            style={{ color: "#f5f0e8" }}
          >
            <span style={{ color: "rgba(245,240,220,0.4)", marginRight: "18px" }}>——</span>
            As Seen on Instagram
            <span style={{ color: "rgba(245,240,220,0.4)", marginLeft: "18px" }}>——</span>
          </h2>

          <p
            className="text-[11.5px] tracking-[0.12em] uppercase"
            style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-sans)" }}
          >
            Tag us with <span style={{ color: "#c89b5a" }}>#SentireForElite</span> to be featured
          </p>
        </div>

        {/* Grid on Desktop / Horizontal Rail on Mobile */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-2.5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {posts.map((post, i) => (
            <div
              key={i}
              className="group relative aspect-square shrink-0 w-[42vw] sm:w-auto snap-center cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-white/10"
            >
              {/* Thumbnail */}
              <img
                src={post.thumb}
                alt={`Sentire by PC luxury fragrance experience reel ${i + 1}`}
                width="300"
                height="300"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Reel indicator overlay for mobile */}
              <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs text-[10px]">
                ▶
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 transition-all duration-300 group-hover:bg-black/55">
                <div className="flex translate-y-3 flex-col items-center gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {/* Play / reel icon */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm">
                    <ReelIcon />
                  </span>
                  {/* Stats */}
                  <div className="flex items-center gap-3 text-white">
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 opacity-80">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <HeartIcon />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
