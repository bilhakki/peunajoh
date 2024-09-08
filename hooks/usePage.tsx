import { create } from "zustand";

export type Page =
  | "about-us"
  | "on-boarding"
  | "home"
  | "porsi-makan"
  | "rencana-makan"
  | "asupan-karbohidrat"
  | "kualitas-makanan"
  | "tentang-saya"
  | "diabetes"
  | "pola-makan-diabetes";

export interface UsePage {
  page: Page;
  setPage: (newPage: Page) => void;
}

export const usePage = create<UsePage>((set) => ({
  page: "home" as Page,
  setPage: (page: Page) => set((state: UsePage) => ({ page })),
}));
