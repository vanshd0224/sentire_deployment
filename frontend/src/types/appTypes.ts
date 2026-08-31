export type PageName =
  | "home"
  | "perfumes"
  | "bestsellers"
  | "new-arrivals"
  | "byob"
  | "about"
  | "client-services"
  | "track-order"
  | "personalised-perfume"
  | "extrait-de-parfum";

export interface PerfumeProduct {
  id: string;
  num: string;
  name: string;
  desc: string;
  fullDesc?: string;
  scentFamily: "woody" | "fresh" | "ambar" | "citrus" | "oriental" | "floral";
  moods: string[];
  sizes: (10 | 30 | 50)[];
  outOfStockSizes?: (10 | 30 | 50)[];
  prices: Record<number, number>;
  mrps?: Record<number, number>;
  badge?: "bestseller" | "new" | "exclusive" | null;
  img: string;
  sizeImages?: Record<number, string[]>;
  traces: string[];
}
