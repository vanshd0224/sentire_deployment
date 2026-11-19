/**
 * Our server (Cloud Run). The one place its address lives — when the
 * Google Cloud project changes, change it here (or set VITE_BACKEND_URL).
 */
export const BACKEND_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ||
  "https://ecommerce-backend-306952336272.asia-south1.run.app";
