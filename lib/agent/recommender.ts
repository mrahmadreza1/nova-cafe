/* ============================================================
   موتور پیشنهاد مکمل — مستقل از مدل زبانی.
   دو مزیت: پیشنهادها قابل توضیح‌اند و اگر مدل قطع شود محصول
   همچنان می‌فروشد.
   در محیط واقعی، ماتریس زیر را از سفارش‌های تاریخی بسازید:
     lift(A→B) = P(B|A) / P(B)
   ============================================================ */

import { getProduct, products, type Product } from "@/content/menu";

/** نرخ هم‌رخدادی مشاهده‌شده: چند درصد سفارش‌های حاوی A، شامل B هم بوده‌اند */
export const coOccurrence: Record<string, Record<string, number>> = {
  lat: { cheesecake: 0.68, brownie: 0.41, cookie: 0.33 },
  ame: { croissant: 0.52, cookie: 0.29 },
  esp: { brownie: 0.44, cookie: 0.31, water: 0.22 },
  cap: { croissant: 0.57 },
  cb: { cookie: 0.34, nuts: 0.28 },
  ice: { cheesecake: 0.36 },
  cheesecake: { lat: 0.71, ame: 0.38 },
  brownie: { esp: 0.49 },
  croissant: { cap: 0.61, ame: 0.44 },
  omelette: { ame: 0.47, lem: 0.25 },
  pasta: { lem: 0.39, water: 0.3 },
  bowl: { lem: 0.42 },
  sandwich: { lem: 0.45 },
};

export type Suggestion = {
  product: Product;
  score: number;
  /** جمله‌ای که در رابط کاربری کنار پیشنهاد نمایش داده می‌شود */
  reason: string;
};

const FALLBACK = ["cookie", "brownie", "esp", "water"];

/** تا سقف `limit` پیشنهاد مکمل برای اقلام فعلی سبد */
export function pairingsFor(productIds: string[], limit = 4): Suggestion[] {
  const inCart = new Set(productIds);
  const scores = new Map<string, { score: number; from: string }>();

  for (const id of productIds) {
    const row = coOccurrence[id] ?? {};
    for (const [target, rate] of Object.entries(row)) {
      if (inCart.has(target)) continue;
      const prev = scores.get(target);
      if (!prev || rate > prev.score) scores.set(target, { score: rate, from: id });
    }
  }

  const ranked: Suggestion[] = [...scores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .flatMap(([id, { score, from }]) => {
      const product = getProduct(id);
      const source = getProduct(from);
      if (!product || !source) return [];
      const pct = new Intl.NumberFormat("fa-IR").format(Math.round(score * 100));
      return [{
        product,
        score,
        reason: `${pct}٪ کسانی که ${source.name} سفارش داده‌اند، ${product.name} هم گرفته‌اند`,
      }];
    });

  if (ranked.length >= limit) return ranked.slice(0, limit);

  const filler = FALLBACK.filter(
    (id) => !inCart.has(id) && !ranked.some((r) => r.product.id === id)
  )
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p))
    .map((product) => ({ product, score: 0, reason: "انتخاب پرتکرار مهمان‌ها" }));

  return [...ranked, ...filler].slice(0, limit);
}

/** پیشنهاد اولیه وقتی هنوز سبد خالی است */
export function popularPicks(limit = 3): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}
