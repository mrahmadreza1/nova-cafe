"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ChatMessage = {
  id: string;
  role: "user" | "agent";
  text: string;
  productIds?: string[];
};

export type PlacedOrder = {
  id: string;
  number: string;
  table: number;
  total: number;
  etaMinutes: number;
  placedAt: number;
};

type SessionState = {
  /** از پارامتر QR میز خوانده می‌شود: /?table=12 */
  table: number;
  favorites: string[];
  messages: ChatMessage[];
  order: PlacedOrder | null;
  setTable: (t: number) => void;
  toggleFavorite: (id: string) => void;
  pushMessage: (m: Omit<ChatMessage, "id">) => void;
  resetChat: () => void;
  setOrder: (o: PlacedOrder | null) => void;
};

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: "سلام 👋 من نُوا هستم، سفارش‌گیر کافه. دنبال چیزی خنک هستید یا یک قهوهٔ جدی برای بیدار شدن؟",
};

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      table: 12,
      favorites: [],
      messages: [WELCOME],
      order: null,
      setTable: (table) => set({ table }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        })),
      pushMessage: (m) =>
        set((s) => ({
          messages: [...s.messages, { ...m, id: crypto.randomUUID() }],
        })),
      resetChat: () => set({ messages: [WELCOME] }),
      setOrder: (order) => set({ order }),
    }),
    { name: "nova-session", storage: createJSONStorage(() => sessionStorage) }
  )
);
