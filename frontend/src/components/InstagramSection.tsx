import { motion } from "framer-motion";
import { KineticText } from "../editorial/home/Kinetic";
import { EASE_OUT_EXPO } from "../editorial/motion";
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
    url: "https://www.instagram.com/reel/DctGKrQymJp/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    thumb: "/images/instagram/ig-2.jpg",
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
    <section className="on-dark w-full bg-[#0a0a0a] py-14 sm:py-20 border-t border-white/10">
      {" "}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {" "}
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          {" "}
          <div className="flex items-center gap-2.5">
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              aria-hidden
            >
              {" "}
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5.5"
                stroke="url(#ig-grad)"
                strokeWidth="1.8"
              />{" "}
              <circle
                cx="12"
                cy="12"
                r="4.5"
                stroke="url(#ig-grad)"
                strokeWidth="1.8"
              />{" "}
              <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad)" />{" "}
              <defs>
                {" "}
                <linearGradient
                  id="ig-grad"
                  x1="2"
                  y1="22"
                  x2="22"
                  y2="2"
                  gradientUnits="userSpaceOnUse"
                >
                  {" "}
                  <stop stopColor="#f09433" />{" "}
                  <stop offset="0.25" stopColor="#e6683c" />{" "}
                  <stop offset="0.5" stopColor="#dc2743" />{" "}
                  <stop offset="0.75" stopColor="#cc2366" />{" "}
                  <stop offset="1" stopColor="#bc1888" />{" "}
                </linearGradient>{" "}
              </defs>{" "}
            </svg>{" "}
            <span
              className="text-[13px] font-semibold tracking-[0.06em] text-white uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {" "}
              @sentireforelite
            </span>{" "}
          </div>{" "}
          <h2
            className="font-serif text-[clamp(1.9rem,4.5vw,3.25rem)] font-light leading-[1.04] tracking-[-0.02em]"
            style={{ color: "#f2f2f0" }}
          >
            <KineticText text="As seen on" />{" "}
            <em className="text-[#e7bcc3]">
              <KineticText text="Instagram." delay={0.2} />
            </em>
          </h2>{" "}
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "rgba(242, 242, 240,0.65)" }}
          >
            {" "}
            Tag{" "}
            <span className="underline decoration-white/30 underline-offset-4">
              #SentireForElite
            </span>{" "}
            to be featured
          </p>{" "}
        </div>{" "}
        {/* 6 Clean Reel Grid Cards */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {" "}
          {INSTAGRAM_REELS.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              data-cursor="Play"
              initial={{
                opacity: 0,
                y: 60,
                rotate: i % 2 ? 6 : -6,
                scale: 0.9,
              }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.07, ease: EASE_OUT_EXPO }}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square shrink-0 w-[44vw] sm:w-auto snap-center block overflow-hidden rounded-[2px] bg-neutral-900 border border-white/10 hover:border-[color:var(--accent)]/60 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {" "}
              {/* Real Instagram Reel Cover Image */}
              <img
                src={post.thumb}
                alt={`Sentire Instagram Reel ${post.id}`}
                width="300"
                height="300"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />{" "}
              {/* Top-right play icon badge (just like user's original design) */}
              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm text-[11px] max-sm:text-[12px] shadow-xs border border-white/10 transition-transform group-hover:scale-110">
                {" "}
                ▶
              </div>{" "}
              {/* Hover highlight overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />{" "}
            </motion.a>
          ))}
        </div>{" "}
        {/* CTA */}
        <div className="mt-8 flex justify-center">
          {" "}
          <a
            href="https://www.instagram.com/sentireforelite?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border px-7 py-3 text-[13px] font-medium transition-all duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6b1422";
              e.currentTarget.style.color = "#6b1422";
              e.currentTarget.style.background = "rgba(107,20,34,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden
            >
              {" "}
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />{" "}
              <circle
                cx="12"
                cy="12"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />{" "}
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />{" "}
            </svg>{" "}
            Follow us on Instagram
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
