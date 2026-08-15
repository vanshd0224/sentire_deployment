export default function Newsletter() {
  return (
    <section className="w-full border-b border-black/5 bg-cream py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-12">
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <span className="hidden shrink-0 text-gold sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-8 w-8">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
            </svg>
          </span>
          <div>
            <p className="text-[13px] font-medium tracking-[0.05em] text-ink uppercase">Be the First to Know</p>
            <p className="mt-0.5 text-[11.5px] text-ink/50">
              Join our community for exclusive offers, new launches and fragrance stories.
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-ink/10 lg:block" />

        <form className="flex w-full max-w-md flex-col sm:flex-row items-stretch gap-2.5 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full border border-black/15 bg-white px-4 py-3 text-[12px] text-ink placeholder:text-ink/40 focus:border-[#c89b5a] focus:outline-none rounded-md sm:rounded-none sm:rounded-l-md"
            style={{ fontFamily: "var(--font-sans)" }}
          />
          <button
            type="submit"
            className="btn-luxe-gold shrink-0 sm:rounded-none sm:rounded-r-md"
            style={{ padding: "12px 24px", fontSize: "10px" }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
