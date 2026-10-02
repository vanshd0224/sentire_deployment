import { useEffect, useState } from "react";
import { API_BASE, inr, partnerApi, sessionToken } from "../utils/partners";

/**
 * /partners — for influencers. Log in with phone + OTP; apply for a code
 * (approved in /admin); then share your link / coupon and follow your
 * orders and commission. Customers' details are never shown here.
 */

type Partner = {
  code: string;
  name: string;
  phone: string;
  instagram: string;
  upiId: string;
  status: "pending" | "approved" | "paused" | "rejected";
  commissionRate: number;
  discountOff: number;
  minOrder: number;
  clicks: number;
};
type Stats = { orders: number; sales: number; pending: number; earned: number; paid: number };
type Order = {
  orderId: string;
  orderNumber: string;
  placedAt: string;
  orderValue: number;
  commission: number;
  status: "pending" | "earned" | "cancelled" | "paid";
  paidAt?: string;
};
type Me = { partner: Partner | null; phone?: string; stats?: Stats; orders?: Order[] };

const SITE = "https://sentirebypc.com";
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };
const fmtDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
const STATUS_LABEL: Record<Order["status"], string> = {
  pending: "Awaiting delivery",
  earned: "Earned",
  cancelled: "Cancelled / returned",
  paid: "Paid",
};

const input =
  "w-full border border-ink/20 bg-white px-4 py-3 text-[15px] text-ink outline-none focus:border-ink";
const primaryBtn =
  "cursor-pointer bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-[#6b1422] disabled:cursor-wait disabled:opacity-60";

function PhoneLogin({ onDone }: { onDone: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [req, setReq] = useState<{ reqId: string; ticket: string; exp: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const digits = phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (digits.length !== 10) return setError("Enter your 10-digit mobile number.");
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: `+91${digits}` }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.error || "We couldn't send the OTP.");
      setReq({ reqId: data.reqId, ticket: data.ticket, exp: data.exp });
      setOtp("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!req) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: `+91${digits}`, code: otp.trim(), ...req }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success || !data.token) throw new Error(data?.error || "That code didn't work.");
      localStorage.setItem("sentire_session_token", data.token);
      localStorage.setItem("sentire_user_phone", `+91${digits}`);
      localStorage.setItem("sentire_is_logged_in", "true");
      onDone();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      {!req ? (
        <form onSubmit={send} className="space-y-3">
          <label className="block text-[13px] text-ink/70" htmlFor="partner-phone">
            Your mobile number
          </label>
          <div className="flex">
            <span className="border border-r-0 border-ink/20 bg-white px-3 py-3 text-[15px] text-ink/60">+91</span>
            <input
              id="partner-phone"
              className={input}
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit number"
            />
          </div>
          <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
            {busy ? "Sending…" : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-3">
          <label className="block text-[13px] text-ink/70" htmlFor="partner-otp">
            Enter the OTP sent to +91 {digits}
          </label>
          <input
            id="partner-otp"
            className={`${input} tracking-[0.4em]`}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />
          <button type="submit" disabled={busy || otp.length < 4} className={`${primaryBtn} w-full`}>
            {busy ? "Checking…" : "Log in"}
          </button>
          <div className="flex justify-between text-[13px]">
            <button type="button" className="cursor-pointer text-ink/60 underline" onClick={() => setReq(null)}>
              Change number
            </button>
            <button type="button" className="cursor-pointer text-ink/60 underline" onClick={() => send()}>
              Resend OTP
            </button>
          </div>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-3 text-[13px] text-[#6b1422]">
          {error}
        </p>
      )}
    </div>
  );
}

function ApplyForm({ phone, onDone }: { phone?: string; onDone: () => void }) {
  const [form, setForm] = useState({ name: "", instagram: "", upiId: "", code: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: k === "code" ? e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") : e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await partnerApi("/apply", sessionToken(), { method: "POST", body: JSON.stringify(form) });
      onDone();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 text-left">
      <p className="text-[14px] text-ink/70">
        Logged in as {phone}. Tell us about you and pick your code — it becomes your link and
        your followers' coupon (₹150 off orders above ₹1,249).
      </p>
      <input className={input} placeholder="Your name" value={form.name} onChange={set("name")} required />
      <input className={input} placeholder="Instagram handle (e.g. @yourname)" value={form.instagram} onChange={set("instagram")} />
      <input className={input} placeholder="UPI ID for payouts (e.g. name@okaxis)" value={form.upiId} onChange={set("upiId")} />
      <input
        className={`${input} uppercase`}
        placeholder="Your code (e.g. ANSH150)"
        value={form.code}
        onChange={set("code")}
        minLength={4}
        maxLength={15}
        required
      />
      <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
        {busy ? "Sending…" : "Apply to partner with Sentire"}
      </button>
      {error && (
        <p role="alert" className="text-[13px] text-[#6b1422]">
          {error}
        </p>
      )}
    </form>
  );
}

function Dashboard({ me, onLogout }: { me: Required<Me>; onLogout: () => void }) {
  const p = me.partner!;
  const link = `${SITE}/r/${p.code}`;
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };
  const shareText = `Shop SENTIRE By PC extrait de parfum with my code ${p.code} — ₹${p.discountOff} off on orders above ₹${p.minOrder.toLocaleString("en-IN")}: ${link}`;
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "SENTIRE By PC", text: shareText, url: link });
        return;
      } catch {}
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener");
  };

  const tiles: [string, string][] = [
    ["Link clicks", String(p.clicks)],
    ["Orders", String(me.stats.orders)],
    ["Sales", inr(me.stats.sales)],
    ["Awaiting delivery", inr(me.stats.pending)],
    ["Earned — to be paid", inr(me.stats.earned)],
    ["Paid to you", inr(me.stats.paid)],
  ];

  return (
    <div className="space-y-10 text-left">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">Partner</p>
          <h2 className="mt-1 text-[clamp(2rem,5vw,3rem)] leading-none" style={serif}>
            Hello, {p.name.split(" ")[0]}.
          </h2>
        </div>
        <button type="button" onClick={onLogout} className="cursor-pointer text-[13px] text-ink/60 underline">
          Log out
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-ink/15 bg-white p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Your link</p>
          <p className="mt-2 break-all text-[15px] text-ink">{link}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => copy(link, "link")} className={primaryBtn}>
              {copied === "link" ? "Copied ✓" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={share}
              className="cursor-pointer border border-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
            >
              Share
            </button>
          </div>
        </div>
        <div className="border border-ink/15 bg-white p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Your coupon</p>
          <p className="mt-2 text-[28px] tracking-[0.08em] text-[#6b1422]" style={serif}>
            {p.code}
          </p>
          <p className="mt-1 text-[13px] text-ink/70">
            ₹{p.discountOff} off on orders above ₹{p.minOrder.toLocaleString("en-IN")}. Opening your link applies it
            automatically.
          </p>
          <button type="button" onClick={() => copy(p.code, "code")} className="mt-3 cursor-pointer text-[13px] text-ink underline">
            {copied === "code" ? "Copied ✓" : "Copy code"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {tiles.map(([k, v]) => (
          <div key={k} className="bg-[#f2f2f0] px-4 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">{k}</p>
            <p className="mt-1 text-[20px] text-ink">{v}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">Your orders</h3>
        {me.orders.length === 0 ? (
          <p className="mt-3 text-[14px] text-ink/60">No orders yet — share your link to get started.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/15 text-ink/55">
                  <th className="py-2 pr-3 font-medium">Date</th>
                  <th className="py-2 pr-3 font-medium">Order</th>
                  <th className="py-2 pr-3 font-medium">Order value</th>
                  <th className="py-2 pr-3 font-medium">Your {Math.round(p.commissionRate * 100)}%</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {me.orders.map((o) => (
                  <tr key={o.orderId} className="border-b border-ink/10">
                    <td className="py-2.5 pr-3">{fmtDate(o.placedAt)}</td>
                    <td className="py-2.5 pr-3 font-mono">#{o.orderNumber}</td>
                    <td className="py-2.5 pr-3">{inr(o.orderValue)}</td>
                    <td className="py-2.5 pr-3">{inr(o.commission)}</td>
                    <td className="py-2.5">{STATUS_LABEL[o.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="border-t border-ink/10 pt-6 text-[13px] leading-relaxed text-ink/70">
        <p>
          <strong className="text-ink">How you earn:</strong> {Math.round(p.commissionRate * 100)}% of the product value
          (after the discount, without COD charges or shipping) of every order placed through your link or code. It
          counts once the order is delivered, and is paid monthly
          {p.upiId ? ` to ${p.upiId}` : " by UPI"}. Cancelled or returned orders don't count.
        </p>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(() => Boolean(sessionToken()));

  const load = async () => {
    if (!sessionToken()) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setMe(await partnerApi<Me>("/me", sessionToken()));
      setLoggedIn(true);
    } catch (err: any) {
      if (err.status === 401) {
        localStorage.removeItem("sentire_session_token");
        setLoggedIn(false);
      } else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    localStorage.removeItem("sentire_session_token");
    setMe(null);
    setLoggedIn(false);
  };

  const p = me?.partner;
  return (
    <main className="min-h-[70svh] w-full bg-[#f2f2f0] px-5 py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        {!(loggedIn && p?.status === "approved") && (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">
              SENTIRE partners
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.95]" style={serif}>
              Share the scent.{" "}
              <em className="text-[#6b1422]" style={{ fontStyle: "italic" }}>
                Earn on every bottle.
              </em>
            </h1>
            <p className="mx-auto mt-5 mb-10 max-w-lg text-[16px] leading-relaxed text-ink/70">
              Your own link and coupon for your followers, and 15% of every order that comes through them.
            </p>
          </>
        )}

        {loading ? (
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
        ) : error ? (
          <p className="text-[14px] text-[#6b1422]">{error}</p>
        ) : !loggedIn ? (
          <PhoneLogin onDone={load} />
        ) : !p ? (
          <ApplyForm phone={me?.phone} onDone={load} />
        ) : p.status === "pending" ? (
          <p className="mx-auto max-w-md text-[15px] text-ink/70">
            Thanks, {p.name.split(" ")[0]} — your application for <strong className="text-ink">{p.code}</strong> is
            with our team. You'll see your link here as soon as it's approved.
          </p>
        ) : p.status !== "approved" ? (
          <p className="mx-auto max-w-md text-[15px] text-ink/70">
            Your partner account ({p.code}) isn't active right now. Please contact us if you think this is a mistake.
          </p>
        ) : (
          <Dashboard me={me as Required<Me>} onLogout={logout} />
        )}
      </div>
    </main>
  );
}
