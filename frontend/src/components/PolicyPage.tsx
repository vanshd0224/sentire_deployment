import type { ReactNode } from "react";
import type { PageName } from "../types/appTypes";

/**
 * The store's policies, each on its own page (payment gateways and the
 * e-commerce rules ask for them): privacy, terms, refunds & cancellations,
 * shipping. Built from what the site already promises customers.
 */

export type PolicySlug = "privacy-policy" | "terms-and-conditions" | "refund-policy" | "shipping-policy";

const BUSINESS = "S P Ventures";
const BRAND = "SENTIRE By PC";
const ADDRESS = "First Floor 109-110, Beriwal Tower, Subhash Nagar Shopping Centre, Jaipur, Rajasthan 302016, India";
const EMAIL = "support@sentirebypc.com";
const PHONE = "+91 99508 91935";
const HOURS = "Monday – Saturday, 10:00 AM – 7:00 PM IST (closed on Sundays and national holidays)";
const UPDATED = "3 October 2026";

const H = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-10 text-[20px] font-semibold text-ink">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{children}</p>
);
const L = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink/75">
    {items.map((x, i) => (
      <li key={i}>{x}</li>
    ))}
  </ul>
);
const Contact = () => (
  <>
    <H>Contact us</H>
    <P>
      {BUSINESS} ({BRAND})
      <br />
      {ADDRESS}
      <br />
      Email: <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> · Phone / WhatsApp:{" "}
      <a className="underline" href="tel:+919950891935">{PHONE}</a>
      <br />
      {HOURS}
    </P>
  </>
);

const TITLES: Record<PolicySlug, string> = {
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "refund-policy": "Refund & Cancellation Policy",
  "shipping-policy": "Shipping & Delivery Policy",
};

function Privacy() {
  return (
    <>
      <P>
        This policy explains how {BUSINESS}, which runs {BRAND} at sentirebypc.com, collects and uses your
        personal information when you visit the website or place an order.
      </P>
      <H>What we collect</H>
      <L
        items={[
          "Contact details: your name, mobile number and email address.",
          "Order details: delivery and billing address, the products you buy, coupons used and engraving text you ask for.",
          "Payment information: payments are processed by our checkout and payment partners (Shiprocket Checkout and Razorpay). We do not see or store your full card, UPI or bank details.",
          "Technical information: device and browser type, pages visited and how you reached the site (for example an advertisement), collected through cookies and similar technologies.",
        ]}
      />
      <H>How we use it</H>
      <L
        items={[
          "To process, ship and support your orders, and send order and delivery updates by SMS, WhatsApp or email.",
          "To verify your mobile number with a one-time password (OTP) when you log in.",
          "To respond to your enquiries and requests.",
          "To improve the website and measure our advertising (for example with the Meta Pixel and Google Analytics).",
          "To send offers and news, where you have agreed to receive them. You can opt out at any time.",
        ]}
      />
      <H>Who we share it with</H>
      <P>
        We share only what is needed with the partners who help us run the store: Shiprocket (checkout and
        shipping) and its courier partners, Razorpay (payments), MSG91 (SMS / OTP), and analytics and advertising
        providers such as Meta and Google. We do not sell your personal information. We may disclose information
        where the law requires it.
      </P>
      <H>Cookies</H>
      <P>
        We use cookies and local storage to keep your bag and login, remember your preferences, and understand how
        the site is used. You can block or delete cookies in your browser settings; some parts of the site may then
        not work properly.
      </P>
      <H>Keeping your information safe</H>
      <P>
        We use reasonable security measures, including encrypted (HTTPS) connections. We keep personal information
        only as long as needed for the purposes above and to meet legal, tax and accounting requirements.
      </P>
      <H>Your choices</H>
      <P>
        You can ask to see, correct or delete the personal information we hold about you by writing to {EMAIL}. We
        will respond within a reasonable time.
      </P>
      <H>Grievance officer</H>
      <P>
        For any complaint about how your information or your order is handled, contact our Grievance Officer at{" "}
        {EMAIL} or {PHONE} ({HOURS}). We acknowledge complaints within 48 hours and aim to resolve them within one
        month.
      </P>
      <H>Changes to this policy</H>
      <P>We may update this policy from time to time. The latest version is always on this page.</P>
      <Contact />
    </>
  );
}

function Terms() {
  return (
    <>
      <P>
        These terms apply to your use of sentirebypc.com and to purchases from {BRAND}, a brand of {BUSINESS}, Jaipur.
        By using the website or placing an order you agree to them.
      </P>
      <H>Products and prices</H>
      <L
        items={[
          "All prices are in Indian Rupees (INR) and include applicable taxes.",
          "We take care to show products, colours and prices accurately. If a pricing error is found after you order, we will contact you before dispatch and, if you prefer, cancel the order with a full refund.",
          "Products are for personal use and subject to availability.",
        ]}
      />
      <H>Orders</H>
      <P>
        Your order is confirmed once our checkout shows the order confirmation. We may cancel an order (with a full
        refund of any amount paid) if a product is unavailable, the delivery address cannot be served, or the order
        appears fraudulent.
      </P>
      <H>Payment</H>
      <L
        items={[
          "Online payments (UPI, cards, net banking, wallets) are processed securely through Shiprocket Checkout and Razorpay.",
          "Cash on Delivery is available on eligible orders; any COD charge is shown at checkout before you place the order.",
        ]}
      />
      <H>Coupons and offers</H>
      <P>
        Coupon codes carry their own conditions (such as a minimum order value), cannot be exchanged for cash, and
        only one discount applies to an order unless stated otherwise. Where more than one applies, the checkout
        gives you the better discount. We may change or end offers at any time.
      </P>
      <H>Personalised (engraved) products</H>
      <P>
        Engraving is made exactly to the text you provide, so please check it carefully before ordering.
      </P>
      <H>Shipping, cancellations and returns</H>
      <P>
        Delivery is covered by our Shipping &amp; Delivery Policy. All sales are final: orders cannot be cancelled,
        returned, exchanged or replaced once placed (see our Refund &amp; Cancellation Policy).
      </P>
      <H>Use of the website</H>
      <P>
        All content on this website — text, images, logos and designs — belongs to {BUSINESS} and may not be copied
        or used without permission. You agree not to misuse the website or attempt to disrupt it.
      </P>
      <H>Liability</H>
      <P>
        To the extent permitted by law, our liability for any order is limited to the amount paid for that order. We
        are not responsible for delays caused by events beyond our control. Fragrances may affect people with
        sensitive skin or allergies — please read the notes and patch test before use.
      </P>
      <H>Governing law</H>
      <P>These terms are governed by the laws of India. Courts at Jaipur, Rajasthan have jurisdiction.</P>
      <Contact />
    </>
  );
}

function Refunds() {
  return (
    <>
      <P>
        Please check the fragrance, size, quantity, delivery address and any engraving text carefully before you
        place your order. All sales are final.
      </P>
      <H>Cancellations</H>
      <P>Orders cannot be cancelled or changed once they have been placed.</P>
      <H>Returns, exchanges and replacements</H>
      <P>
        We do not accept returns or exchanges, and we do not offer replacements, once an order has been placed. If
        the outer package looks opened or badly damaged when the courier delivers it, please do not accept the
        parcel and contact us.
      </P>
      <H>Refunds</H>
      <P>A refund is made only in these cases, to the original payment method:</P>
      <L
        items={[
          "We cancel your order because a product is unavailable or your pincode can't be served.",
          "Your payment was debited but no order was created.",
        ]}
      />
      <P>
        Such refunds are usually processed within 5–7 business days (your bank may take a little longer to show
        them). Cash on Delivery orders are not charged until delivery, so they need no refund.
      </P>
      <H>Questions</H>
      <P>
        Write to {EMAIL} or WhatsApp {PHONE} with your order number.
      </P>
      <Contact />
    </>
  );
}

function Shipping() {
  return (
    <>
      <L
        items={[
          "We ship across India from Jaipur, through Shiprocket and its courier partners.",
          "Orders are dispatched within 24 hours (personalised / engraved orders need about one more day).",
          "Delivery usually takes 2–4 business days to major cities and up to 7 business days to other locations. Delivery dates shown at checkout are estimates.",
          "Shipping charges, if any, and any Cash on Delivery charge are shown at checkout before you place the order.",
          "Once your order ships, you receive the courier tracking link by SMS / WhatsApp. You can also follow your order on our Track Order page with your order number and phone number.",
          "Please make sure your address and phone number are correct. If a parcel is returned because the address was wrong or the recipient was unavailable after delivery attempts, we will contact you to arrange re-delivery.",
          "If the outer package looks opened or badly damaged at delivery, please do not accept it and contact us.",
        ]}
      />
      <Contact />
    </>
  );
}

export default function PolicyPage({
  slug,
  onNavigate,
}: {
  slug: PolicySlug;
  onNavigate?: (page: PageName) => void;
}) {
  return (
    <main className="w-full bg-[#f2f2f0] px-5 py-20 text-ink sm:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">
          {BRAND} · Policies
        </p>
        <h1 className="mt-3 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          {TITLES[slug]}
        </h1>
        <p className="mt-3 text-[13px] text-ink/55">Last updated: {UPDATED}</p>
        {slug === "privacy-policy" && <Privacy />}
        {slug === "terms-and-conditions" && <Terms />}
        {slug === "refund-policy" && <Refunds />}
        {slug === "shipping-policy" && <Shipping />}
        <nav className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-6 text-[13px]">
          {(Object.keys(TITLES) as PolicySlug[])
            .filter((s) => s !== slug)
            .map((s) => (
              <a
                key={s}
                href={`/${s}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(s as PageName);
                }}
                className="underline text-ink/70 hover:text-ink"
              >
                {TITLES[s]}
              </a>
            ))}
        </nav>
      </article>
    </main>
  );
}
