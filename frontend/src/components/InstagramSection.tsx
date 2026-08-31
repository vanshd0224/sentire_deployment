const INSTAGRAM_REELS = [
  {
    id: "1",
    url: "https://www.instagram.com/reel/DWKLAYhE7IH/?igsi=eDhudzFjdDg1OW1o",
    thumb: "/images/instagram/ig-1.jpg",
  },
  {
    id: "2",
    url: "https://www.instagram.com/reel/DctGKrQymJp/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    thumb: "/images/instagram/ig-2.jpg",
  },
  {
    id: "3",
    url: "https://www.instagram.com/reel/DctGKrQymJp/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    thumb: "/images/instagram/ig-3.jpg",
  },
  {
    id: "4",
    url: "https://www.instagram.com/p/Dcc-eHmphhd/?igsi=MmR2cXM1d3RqMGY2",
    thumb: "/images/instagram/ig-4.jpg",
  },
  {
    id: "5",
    url: "https://www.instagram.com/reel/DWBygFPCYI7/?igsi=MXBxZHU0aXdoaGNvag==",
    thumb: "/images/instagram/ig-5.jpg",
  },
  {
    id: "6",
    url: "https://www.instagram.com/p/DceZnyizv2x/?igsi=cTZ0NWJ5d2FqeXU=",
    thumb: "/images/instagram/ig-6.jpg",
  },
];

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

        {/* 6 Clean Reel Grid Cards */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {INSTAGRAM_REELS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square shrink-0 w-[44vw] sm:w-auto snap-center block overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 hover:border-[#c89b5a]/60 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Real Instagram Reel Cover Image */}
              <img
                src={post.thumb}
                alt={`Sentire Instagram Reel ${post.id}`}
                width="300"
                height="300"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Top-right play icon badge (just like user's original design) */}
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm text-[11px] shadow-xs border border-white/10 transition-transform group-hover:scale-110">
                ▶
              </div>

              {/* Hover highlight overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
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
