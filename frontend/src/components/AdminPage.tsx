import { useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { API_BASE, inr, partnerApi } from "../utils/partners";

/**
 * /admin — influencer partners, their orders and payouts. Sign in with
 * Google; the server only lets in emails on its ADMIN_EMAILS list.
 */

type Stats = { orders: number; sales: number; pending: number; earned: number; paid: number };
type Partner = {
  id: string;
  code: string;
  name: string;
  phone: string;
  instagram: string;
  upiId: string;
  status: "pending" | "approved" | "paused" | "rejected";
  commissionRate: number;
  clicks: number;
  createdAt: string;
  stats: Stats;
};
type Order = {
  orderId: string;
  orderNumber: string;
  code: string;
  placedAt: string;
  orderValue: number;
  commission: number;
  paymentType: string;
  status: "pending" | "earned" | "cancelled" | "paid";
  shipmentStatus: string;
  paidAt?: string;
  payoutRef?: string;
};

type Enquiry = {
  _id: string;
  referenceId: string;
  category?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  orderNumber?: string;
  queryType?: string;
  message: string;
  createdAt: string;
};

const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };
const btn =
  "cursor-pointer border border-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper disabled:opacity-50";
const darkBtn =
  "cursor-pointer bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper hover:bg-[#6b1422] disabled:cursor-wait disabled:opacity-60";
const field = "border border-ink/20 bg-white px-3 py-2 text-[14px] outline-none focus:border-ink";
const fmtDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

function csv(rows: (string | number)[][]) {
  return rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
}
function download(name: string, text: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"partners" | "orders" | "payouts" | "enquiries">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState({ code: "", status: "" });
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", phone: "", code: "", instagram: "", upiId: "" });
  const [editing, setEditing] = useState<Partner | null>(null);

  useEffect(() => onAuthStateChanged(auth, (u) => (setUser(u), setReady(true))), []);

  const api = async <T,>(path: string, init?: RequestInit) => {
    if (!user) throw new Error("Please sign in.");
    return partnerApi<T>(path, await user.getIdToken(), init);
  };

  const loadEnquiries = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Couldn't load enquiries.");
      setEnquiries(data.enquiries || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const load = async () => {
    setError(null);
    loadEnquiries();
    try {
      const [p, o] = await Promise.all([
        api<{ partners: Partner[] }>("/admin/partners"),
        api<{ orders: Order[] }>("/admin/orders"),
      ]);
      setPartners(p.partners);
      setOrders(o.orders);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const run = async (fn: () => Promise<string | void>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const msg = await fn();
      if (msg) setNotice(msg);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const setStatus = (p: Partner, status: Partner["status"]) =>
    run(async () => {
      await api(`/admin/partners/${p.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      return `${p.code} is now ${status}.`;
    });

  const addPartner = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      await api("/admin/partners", { method: "POST", body: JSON.stringify({ ...draft, status: "approved" }) });
      setDraft({ name: "", phone: "", code: "", instagram: "", upiId: "" });
      setAdding(false);
      return "Partner added and approved.";
    });
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const { id, name, phone, code, instagram, upiId } = editing;
    run(async () => {
      await api(`/admin/partners/${id}`, { method: "PATCH", body: JSON.stringify({ name, phone, code, instagram, upiId }) });
      setEditing(null);
      return "Saved.";
    });
  };

  const sync = () =>
    run(async () => {
      const r = await api<{ orders: { scanned: number; recorded: number }; deliveries: { checked: number; earned: number; cancelled: number } }>(
        "/admin/sync",
        { method: "POST" },
      );
      return `Checked ${r.orders.scanned} Shiprocket orders (${r.orders.recorded} new partner orders); ${r.deliveries.checked} awaiting delivery → ${r.deliveries.earned} delivered, ${r.deliveries.cancelled} cancelled.`;
    });

  const setOrderStatus = (o: Order, status: Order["status"]) =>
    run(async () => {
      await api(`/admin/orders/${o.orderId}`, { method: "PATCH", body: JSON.stringify({ status }) });
    });

  const payout = (p: Partner) => {
    const reference = window.prompt(
      `Mark ${inr(p.stats.earned)} as paid to ${p.name} (${p.upiId || "no UPI saved"})?\nUPI transaction / reference (optional):`,
      "",
    );
    if (reference === null) return;
    run(async () => {
      const r = await api<{ orders: number; amount: number }>(`/admin/partners/${p.id}/payout`, {
        method: "POST",
        body: JSON.stringify({ reference }),
      });
      return `Marked ${inr(r.amount)} (${r.orders} orders) as paid to ${p.name}.`;
    });
  };

  const shownOrders = useMemo(
    () =>
      orders.filter(
        (o) => (!filter.code || o.code === filter.code) && (!filter.status || o.status === filter.status),
      ),
    [orders, filter],
  );
  const due = partners.filter((p) => p.stats.earned > 0);

  if (!ready) return <main className="min-h-[60svh] bg-[#f2f2f0]" />;

  if (!user) {
    return (
      <main className="flex min-h-[70svh] items-center justify-center bg-[#f2f2f0] px-5 py-24 text-center text-ink">
        <div>
          <h1 className="text-[clamp(2.2rem,6vw,3.6rem)] leading-none" style={serif}>
            Admin
          </h1>
          <p className="mt-4 text-[15px] text-ink/70">Sign in with your admin Google account.</p>
          <button
            type="button"
            className={`${darkBtn} mt-8`}
            onClick={() => signInWithPopup(auth, new GoogleAuthProvider()).catch((e) => setError(e.message))}
          >
            Sign in with Google
          </button>
          {error && <p className="mt-4 text-[13px] text-[#6b1422]">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70svh] bg-[#f2f2f0] px-4 py-16 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Admin · {user.email}</p>
            <h1 className="mt-1 text-[clamp(2rem,5vw,3rem)] leading-none" style={serif}>
              SENTIRE admin
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={darkBtn} disabled={busy} onClick={sync}>
              {busy ? "Working…" : "Sync orders & deliveries"}
            </button>
            <button type="button" className={btn} onClick={() => signOut(auth)}>
              Sign out
            </button>
          </div>
        </div>

        {error && <p className="mt-5 border border-[#6b1422]/30 bg-white px-4 py-3 text-[13px] text-[#6b1422]">{error}</p>}
        {notice && <p className="mt-5 border border-ink/15 bg-white px-4 py-3 text-[13px] text-ink/80">{notice}</p>}

        <div className="mt-8 flex gap-6 border-b border-ink/15 text-[13px] font-semibold uppercase tracking-[0.08em]">
          {(["enquiries", "partners", "orders", "payouts"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`-mb-px cursor-pointer border-b-2 pb-3 ${tab === t ? "border-ink text-ink" : "border-transparent text-ink/50"}`}
            >
              {t === "payouts"
                ? `Payouts${due.length ? ` (${due.length})` : ""}`
                : t === "enquiries"
                  ? `Customer messages${enquiries?.length ? ` (${enquiries.length})` : ""}`
                  : t}
            </button>
          ))}
        </div>

        {tab === "enquiries" && (
          <section className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[13px] text-ink/70">
                Messages from the Client Services form on the website (newest first).
              </p>
              <button type="button" className={btn} onClick={loadEnquiries}>
                Refresh
              </button>
            </div>
            {enquiries === null ? (
              <p className="py-6 text-[14px] text-ink/60">Loading…</p>
            ) : enquiries.length === 0 ? (
              <p className="py-6 text-[14px] text-ink/60">No messages yet.</p>
            ) : (
              enquiries.map((q) => {
                const name = `${q.firstName} ${q.lastName || ""}`.trim();
                const digits = String(q.phone || "").replace(/\D/g, "").slice(-10);
                return (
                  <article key={q._id} className="border border-ink/15 bg-white px-4 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">
                        {name} <span className="font-mono text-[12px] font-normal text-ink/50">{q.referenceId}</span>
                      </p>
                      <p className="text-[12px] text-ink/50">
                        {new Date(q.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.06em] text-ink/55">
                      {[q.queryType || q.category, q.orderNumber && `Order ${q.orderNumber}`].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-ink/85">{q.message}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
                      <a
                        className={btn}
                        href={`mailto:${q.email}?subject=${encodeURIComponent(`Re: your SENTIRE enquiry ${q.referenceId}`)}`}
                      >
                        Reply by email · {q.email}
                      </a>
                      {digits.length === 10 && (
                        <a
                          className={btn}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://wa.me/91${digits}?text=${encodeURIComponent(`Hi ${q.firstName}, this is SENTIRE By PC about your message ${q.referenceId}.`)}`}
                        >
                          WhatsApp · {q.phone}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </section>
        )}

        {tab === "partners" && (
          <section className="mt-6 space-y-5">
            {!adding ? (
              <button type="button" className={btn} onClick={() => setAdding(true)}>
                + Add partner
              </button>
            ) : (
              <form onSubmit={addPartner} className="grid gap-2 border border-ink/15 bg-white p-4 sm:grid-cols-3">
                <input className={field} placeholder="Name" required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                <input className={field} placeholder="Phone (10 digits)" required value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                <input className={`${field} uppercase`} placeholder="Code (e.g. ANSH150)" required value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} />
                <input className={field} placeholder="Instagram" value={draft.instagram} onChange={(e) => setDraft({ ...draft, instagram: e.target.value })} />
                <input className={field} placeholder="UPI ID" value={draft.upiId} onChange={(e) => setDraft({ ...draft, upiId: e.target.value })} />
                <div className="flex gap-2">
                  <button type="submit" className={darkBtn} disabled={busy}>Add</button>
                  <button type="button" className={btn} onClick={() => setAdding(false)}>Cancel</button>
                </div>
              </form>
            )}

            {editing && (
              <form onSubmit={saveEdit} className="grid gap-2 border border-ink/15 bg-white p-4 sm:grid-cols-3">
                <p className="sm:col-span-3 text-[13px] font-semibold">Edit {editing.code}</p>
                <input className={field} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <input className={field} value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
                <input className={`${field} uppercase`} value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })} />
                <input className={field} placeholder="Instagram" value={editing.instagram} onChange={(e) => setEditing({ ...editing, instagram: e.target.value })} />
                <input className={field} placeholder="UPI ID" value={editing.upiId} onChange={(e) => setEditing({ ...editing, upiId: e.target.value })} />
                <div className="flex gap-2">
                  <button type="submit" className={darkBtn} disabled={busy}>Save</button>
                  <button type="button" className={btn} onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-ink/15 text-ink/55">
                    {["Partner", "Code", "Phone / UPI", "Status", "Clicks", "Orders", "Sales", "Awaiting", "To pay", "Paid", ""].map((h) => (
                      <th key={h} className="py-2 pr-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p) => (
                    <tr key={p.id} className="border-b border-ink/10 align-top">
                      <td className="py-2.5 pr-3">
                        {p.name}
                        {p.instagram && <div className="text-ink/50">{p.instagram}</div>}
                      </td>
                      <td className="py-2.5 pr-3 font-mono">{p.code}</td>
                      <td className="py-2.5 pr-3">
                        {p.phone}
                        <div className="text-ink/50">{p.upiId || "—"}</div>
                      </td>
                      <td className="py-2.5 pr-3 capitalize">{p.status}</td>
                      <td className="py-2.5 pr-3">{p.clicks}</td>
                      <td className="py-2.5 pr-3">{p.stats.orders}</td>
                      <td className="py-2.5 pr-3">{inr(p.stats.sales)}</td>
                      <td className="py-2.5 pr-3">{inr(p.stats.pending)}</td>
                      <td className="py-2.5 pr-3 font-semibold">{inr(p.stats.earned)}</td>
                      <td className="py-2.5 pr-3">{inr(p.stats.paid)}</td>
                      <td className="py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {p.status !== "approved" && (
                            <button type="button" className={btn} disabled={busy} onClick={() => setStatus(p, "approved")}>Approve</button>
                          )}
                          {p.status === "approved" && (
                            <button type="button" className={btn} disabled={busy} onClick={() => setStatus(p, "paused")}>Pause</button>
                          )}
                          {p.status === "pending" && (
                            <button type="button" className={btn} disabled={busy} onClick={() => setStatus(p, "rejected")}>Reject</button>
                          )}
                          <button type="button" className={btn} onClick={() => setEditing(p)}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {partners.length === 0 && (
                    <tr>
                      <td colSpan={11} className="py-6 text-ink/60">No partners yet. Add one, or share sentirebypc.com/partners so influencers can apply.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "orders" && (
          <section className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <select className={field} value={filter.code} onChange={(e) => setFilter({ ...filter, code: e.target.value })}>
                <option value="">All partners</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.code}>{p.code}</option>
                ))}
              </select>
              <select className={field} value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                <option value="">All statuses</option>
                <option value="pending">Awaiting delivery</option>
                <option value="earned">Earned (to pay)</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                type="button"
                className={btn}
                onClick={() =>
                  download(
                    "sentire-partner-orders.csv",
                    csv([
                      ["Date", "Order", "Partner", "Order value", "Commission", "Payment", "Status", "Shipment", "Paid on", "Payout ref"],
                      ...shownOrders.map((o) => [
                        fmtDate(o.placedAt), o.orderNumber, o.code, o.orderValue, o.commission, o.paymentType, o.status, o.shipmentStatus, fmtDate(o.paidAt), o.payoutRef || "",
                      ]),
                    ]),
                  )
                }
              >
                Download CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-ink/15 text-ink/55">
                    {["Date", "Order", "Partner", "Value", "Commission", "Payment", "Status", "Shipment", ""].map((h) => (
                      <th key={h} className="py-2 pr-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shownOrders.map((o) => (
                    <tr key={o.orderId} className="border-b border-ink/10">
                      <td className="py-2.5 pr-3">{fmtDate(o.placedAt)}</td>
                      <td className="py-2.5 pr-3 font-mono">#{o.orderNumber}</td>
                      <td className="py-2.5 pr-3 font-mono">{o.code}</td>
                      <td className="py-2.5 pr-3">{inr(o.orderValue)}</td>
                      <td className="py-2.5 pr-3">{inr(o.commission)}</td>
                      <td className="py-2.5 pr-3">{/CASH/i.test(o.paymentType) ? "COD" : o.paymentType ? "Prepaid" : "—"}</td>
                      <td className="py-2.5 pr-3 capitalize">{o.status}</td>
                      <td className="py-2.5 pr-3 text-ink/60">{o.shipmentStatus || "—"}</td>
                      <td className="py-2.5">
                        {o.status === "pending" || o.status === "earned" ? (
                          <button type="button" className={btn} disabled={busy} onClick={() => setOrderStatus(o, "cancelled")}>Cancel</button>
                        ) : o.status === "cancelled" ? (
                          <button type="button" className={btn} disabled={busy} onClick={() => setOrderStatus(o, "pending")}>Restore</button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                  {shownOrders.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-6 text-ink/60">No orders here yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "payouts" && (
          <section className="mt-6 space-y-3">
            <p className="text-[13px] text-ink/70">
              Commission on delivered orders that hasn't been paid yet. Pay by UPI, then mark it paid here.
              Run "Sync orders &amp; deliveries" first so delivered orders are counted.
            </p>
            {due.length === 0 ? (
              <p className="py-6 text-[14px] text-ink/60">Nothing to pay right now.</p>
            ) : (
              due.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border border-ink/15 bg-white px-4 py-3">
                  <div>
                    <p className="font-semibold">
                      {p.name} <span className="font-mono text-ink/50">{p.code}</span>
                    </p>
                    <p className="text-[13px] text-ink/60">UPI: {p.upiId || "not saved — ask the partner"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[18px]">{inr(p.stats.earned)}</span>
                    <button type="button" className={darkBtn} disabled={busy} onClick={() => payout(p)}>Mark paid</button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}
      </div>
    </main>
  );
}
