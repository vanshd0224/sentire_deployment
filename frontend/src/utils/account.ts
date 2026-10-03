import { API_BASE, sessionToken } from "./partners";

/*
 * The logged-in customer (phone + OTP): their name and the orders placed
 * with their number, from our server, so My Orders works on any device.
 */
export const isLoggedIn = () => Boolean(sessionToken());

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}/api/account${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken()}`, ...(init.headers || {}) },
  });
  const data = await res.json().catch(() => null);
  if (res.status === 401) {
    // session expired: log in again next time
    try {
      localStorage.removeItem("sentire_session_token");
    } catch {}
  }
  if (!res.ok || !data?.ok) throw new Error(data?.error || "Something went wrong.");
  return data as T;
}

export const fetchAccount = () => call<{ phone: string; name: string; email: string }>("/me");

export const saveProfile = (name: string) =>
  call<{ saved: boolean }>("/profile", { method: "POST", body: JSON.stringify({ name }) });

export type AccountOrder = {
  orderId: string;
  number: string;
  placedAt: string | null;
  status: string;
  paymentType: string | null;
  total: number | null;
  edd: string | null;
  items: { variantId: string; quantity: number; price: number | null }[];
};

export const fetchMyOrders = (fresh = false) =>
  call<{ orders: AccountOrder[] }>(`/orders${fresh ? "?fresh=1" : ""}`).then((d) => d.orders);
