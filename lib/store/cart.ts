"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Addon, Product } from "@/content/menu";
import { SERVICE_RATE } from "@/lib/format";

export type CartLine = {
  key: string;
  product: Product;
  qty: number;
  addons: Addon[];
};

type CartState = {
  lines: CartLine[];
  /** پیشنهادهایی که کاربر در مرحلهٔ مرور رد کرده تا دوباره نمایش داده نشوند */
  rejected: string[];
  add: (product: Product, qty?: number, addons?: Addon[]) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  reject: (productId: string) => void;
  clear: () => void;
};

const keyOf = (p: Product, a: Addon[]) =>
  `${p.id}|${a.map((x) => x.id).sort().join(",")}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      rejected: [],
      add: (product, qty = 1, addons = []) =>
        set((s) => {
          const key = keyOf(product, addons);
          const found = s.lines.find((l) => l.key === key);
          return {
            lines: found
              ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
              : [...s.lines, { key, product, qty, addons }],
          };
        }),
      setQty: (key, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.key !== key)
              : s.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      reject: (productId) =>
        set((s) => ({ rejected: [...new Set([...s.rejected, productId])] })),
      clear: () => set({ lines: [], rejected: [] }),
    }),
    {
      name: "nova-cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

/* ---------------------- سلکتورهای مشتق ---------------------- */

export const lineTotal = (l: CartLine) =>
  l.qty * (l.product.price + l.addons.reduce((a, x) => a + x.price, 0));

export const subtotalOf = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + lineTotal(l), 0);

export const serviceOf = (lines: CartLine[]) =>
  Math.round(subtotalOf(lines) * SERVICE_RATE);

export const totalOf = (lines: CartLine[]) =>
  subtotalOf(lines) + serviceOf(lines);

export const countOf = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + l.qty, 0);
