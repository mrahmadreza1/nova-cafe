"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { AgentAvatar } from "@/components/agent/Avatar";
import { Thumb } from "@/components/ui/thumb";
import { Button } from "@/components/ui/button";
import { useCart, totalOf, countOf } from "@/lib/store/cart";
import { useSession } from "@/lib/store/session";
import { useToast } from "@/lib/store/toast";
import { pairingsFor } from "@/lib/agent/recommender";
import { slideOutRow } from "@/lib/motion";
import { n, toman } from "@/lib/format";

/* تنها دروازهٔ اجباری کل جریان: اینجا ایجنت نقش فروشنده را بازی می‌کند.
   پیشنهاد رد شده دیگر تکرار نمی‌شود. */
export default function ReviewPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const reject = useCart((s) => s.reject);
  const rejected = useCart((s) => s.rejected);
  const clear = useCart((s) => s.clear);
  const table = useSession((s) => s.table);
  const setOrder = useSession((s) => s.setOrder);
  const showToast = useToast((s) => s.show);
  const [placing, setPlacing] = useState(false);

  const suggestions = useMemo(
    () =>
      pairingsFor(lines.map((l) => l.product.id), 6)
        .filter((s) => !rejected.includes(s.product.id))
        .slice(0, 4),
    [lines, rejected]
  );

  const eta = Math.max(5, 4 + countOf(lines) * 2);

  async function place() {
    setPlacing(true);
    const total = totalOf(lines);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table,
          total,
          items: lines.map((l) => ({ name: l.product.name, qty: l.qty })),
        }),
      });
      const { order } = await res.json();
      setOrder({
        id: order.id,
        number: order.number,
        table,
        total,
        etaMinutes: eta,
        placedAt: Date.now(),
      });
      clear();
      router.push(`/order/${order.id}`);
    } catch {
      showToast("ثبت سفارش انجام نشد. دوباره تلاش کنید");
      setPlacing(false);
    }
  }

  /* نگهبانِ «سبد خالی» فقط وقتی فعال شود که کاربر خودش با سبد خالی
     به این صفحه آمده باشد — نه در حین ثبت سفارش، وقتی clear() سبد را
     همان لحظه خالی می‌کند اما هنوز به صفحهٔ موفقیت نرسیده‌ایم. بدون
     شرط !placing، این ری‌دایرکت با router.push به /order برخورد
     می‌کرد و کاربر به‌جای صفحهٔ موفقیت، سبدِ خالی را می‌دید. */
  useEffect(() => {
    if (lines.length === 0 && !placing) {
      router.replace("/cart");
    }
  }, [lines.length, placing, router]);

  if (lines.length === 0 && !placing) return null;

  return (
    <>
      <AppBar
        title="مرور سفارش"
        subtitle="نُوا سفارش شما را بررسی می‌کند"
        backTo="/cart"
      />

      <div className="flex-1 overflow-y-auto p-4">
        <section className="rounded-[24px] border border-primary-line bg-gradient-to-bl from-primary-soft to-surface p-4 shadow-card">
          <div className="flex items-start gap-2.5">
            <AgentAvatar />
            <p className="text-[13.8px] leading-[1.9]">
              سفارش شما را مرور کردم. زمان آماده‌سازی حدود{" "}
              <b>{n(eta)} دقیقه</b> است و همه‌چیز موجود است.
            </p>
          </div>
          <div className="mt-3.5 rounded-[18px] border border-border bg-surface p-3">
            {lines.map((l) => (
              <div key={l.key} className="flex justify-between py-1 text-[13.2px]">
                <span>
                  {l.product.name}
                  {l.qty > 1 && <span className="text-xs text-ink-3"> ×{n(l.qty)}</span>}
                </span>
                <span className="text-ink-2">{n(l.product.price * l.qty)}</span>
              </div>
            ))}
          </div>
        </section>

        {suggestions.length > 0 && (
          <>
            <h3 className="mb-2.5 mt-6 flex items-center gap-2 text-[15px] font-bold -tracking-[0.02em]">
              <Sparkles className="size-[17px] text-primary" strokeWidth={1.8} />
              پیشنهادهای تکمیلی
            </h3>
            <AnimatePresence initial={false}>
              {suggestions.map(({ product, reason }) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={slideOutRow}
                  initial="show"
                  animate="show"
                  exit="exit"
                  className="mb-2 flex items-center gap-3 rounded-[18px] border border-border bg-surface p-2.5"
                >
                  <Thumb
                    category={product.category}
                    emoji={product.emoji}
                    className="size-[46px] rounded-[13px] text-[22px]"
                  />
                  <div className="min-w-0 flex-1">
                    <b className="block text-[13.5px]">{product.name}</b>
                    <span className="line-clamp-1 text-[11.5px] text-ink-3">{reason}</span>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() => reject(product.id)}
                      className="rounded-xl bg-surface-2 px-3 py-1.5 text-[12.5px] text-ink-3"
                    >
                      نه
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        add(product);
                        reject(product.id);
                        showToast(`${product.name} اضافه شد`);
                      }}
                      className="rounded-xl bg-primary px-3 py-1.5 text-[12.5px] font-semibold text-white"
                    >
                      افزودن
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}

        <div className="mt-3 flex justify-between rounded-[24px] border border-border bg-surface-2 px-4 py-4 text-base font-bold -tracking-[0.02em]">
          <span>قابل پرداخت</span>
          <span>{toman(totalOf(lines))}</span>
        </div>
      </div>

      <div className="glass safe-b sticky bottom-0 flex items-center gap-3 border-t border-border px-4 pt-3">
        <Button variant="ghost" onClick={() => router.push("/cart")}>
          ویرایش سبد
        </Button>
        <Button size="lg" className="flex-1" onClick={place} disabled={placing}>
          {placing ? "در حال ثبت…" : "ثبت سفارش"}
        </Button>
      </div>
    </>
  );
}
