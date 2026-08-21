import { useState } from "react";
import SentireLogo from "./SentireLogo";

interface FooterProps {
  onNavigate?: (page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "client-services" | "track-order") => void;
}

const shopLinks = ["All Perfumes", "10ml", "30ml", "50ml", "Best Sellers"];
const helpLinks = ["FAQs", "Shipping & Delivery", "Returns & Exchanges", "Track Your Order", "Contact Us"];
const aboutLinks = ["Our Story", "Ingredients", "Craftsmanship", "Sustainability", "Journal"];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4">
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2l1-3h-3v-1.5A.5.5 0 0 1 14.5 9H16z" strokeLinejoin="round" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4">
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="m10.5 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MobileAccordionColumn({ title, links, onNavigate }: { title: string; links: string[]; onNavigate?: FooterProps["onNavigate"] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-3 md:border-none md:py-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-[11.5px] font-semibold tracking-[0.12em] text-ink uppercase md:cursor-default"
      >
        <span>{title}</span>
        <span className="text-[#c89b5a] font-bold text-sm md:hidden">{isOpen ? "−" : "+"}</span>
      </button>
      <ul className={`mt-3 space-y-2.5 ${isOpen ? "block" : "hidden md:block"}`}>
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (link === "Our Story" || title === "About") {
                  onNavigate?.("about");
                } else if (link === "All Perfumes" || link === "10ml" || link === "30ml" || link === "50ml") {
                  onNavigate?.("perfumes");
                } else if (link === "Best Sellers") {
                  onNavigate?.("bestsellers");
                } else if (link === "Track Your Order") {
                  onNavigate?.("track-order");
                } else if (
                  link === "FAQs" ||
                  link === "Shipping & Delivery" ||
                  link === "Returns & Exchanges" ||
                  link === "Contact Us"
                ) {
                  onNavigate?.("client-services");
                }
              }}
              className="text-[12.5px] text-ink/70 transition-colors duration-300 hover:text-[#c89b5a]"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#f8f5f1] border-t border-[#c89b5a]/15">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:py-14 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-3 lg:col-span-1 pb-4 border-b border-black/10 sm:border-none sm:pb-0">
            <SentireLogo
              variant="footer"
              theme="light"
              animated={true}
              onClick={() => onNavigate?.("home")}
              className="!items-start"
            />
            <p className="mt-3 max-w-[240px] text-[12px] leading-relaxed text-ink/70">
              Crafted beyond time. Made for moments that become memories.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/sentireforelite?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-[#c89b5a] hover:text-[#c89b5a] min-h-[44px] min-w-[44px]"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-[#c89b5a] hover:text-[#c89b5a] min-h-[44px] min-w-[44px]"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-[#c89b5a] hover:text-[#c89b5a] min-h-[44px] min-w-[44px]"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <MobileAccordionColumn title="Shop" links={shopLinks} onNavigate={onNavigate} />
          <MobileAccordionColumn title="Help" links={helpLinks} onNavigate={onNavigate} />
          <MobileAccordionColumn title="About" links={aboutLinks} onNavigate={onNavigate} />

          <div className="pt-2 sm:pt-0">
            <h3 className="text-[11.5px] font-semibold tracking-[0.12em] text-ink uppercase">Need Help?</h3>
            <ul className="mt-3 space-y-2.5 text-[12px] text-ink/70">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4 text-[#c89b5a] shrink-0">
                  <path d="M4 5c0 8 7 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6z" />
                </svg>
                <a href="tel:+919950891935" className="hover:text-[#c89b5a] transition-colors">
                  +91 99508 91935
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4 text-[#c89b5a] shrink-0">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                support@sentirebypc.com
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4 text-[#c89b5a] shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
                Mon - Sat | 10AM - 7PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-[#f4efe8]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-5 py-4 text-[10.5px] text-ink/50 sm:flex-row sm:justify-between lg:px-12">
          <p>© 2024 Sentire by PC. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-[#c89b5a]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-[#c89b5a]">
              Terms & Conditions
            </a>
            <span className="flex items-center gap-1">
              Crafted with <span className="text-[#c89b5a]">♥</span> in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
