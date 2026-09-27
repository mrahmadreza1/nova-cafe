"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { n } from "@/lib/format";
import { fadeUp } from "@/lib/motion";
import type { KitchenOrder, OrderStatus } from "@/app/api/orders/route";

const COLUMNS: {
  status: OrderStatus;
  label: string;
  color: string;
  next?: OrderStatus;
  cta?: string;
}[] = [
  { status: "new", label: "جدید", color: "#2F6BFF", next: "preparing", cta: "شروع آماده‌سازی" },
  { status: "preparing", label: "در حال آماده‌سازی", color: "#C77700", next: "ready", cta: "آماده شد" },
  { status: "ready", label: "آماده", color: "#12A150", next: "done", cta: "تحویل شد" },
  { status: "done", label: "تحویل شده", color: "#8D97AB" },
];

/** پنل آشپزخانه. در محیط واقعی پشت احراز هویت کارکنان قرار بگیرد
 *  و polling زیر با اشتراک realtime جایگزین شود. */
export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);

  const load = async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const move = async (id: string, status: OrderStatus) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  };

  return (
    <main className="min-h-dvh bg-surface-2 p-6">
      <header className="mb-5 flex flex-wrap items-center gap-3.5">
        <h1 className="text-[22px] font-bold -tracking-[0.03em]">پنل آشپزخانه</h1>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
          <span className="size-[7px] animate-pulse rounded-full bg-success" />
          اتصال زنده
        </span>
      </header>

      <div className="grid gap-3.5 lg:grid-cols-4">
        {COLUMNS.map((col) => {
          const list = orders.filter((o) => o.status === col.status);
          return (
            <section
              key={col.status}
              className="min-h-[320px] rounded-[24px] border border-border bg-surface p-3.5"
            >
              <h2 className="mb-3 flex items-center gap-2 text-[13.5px] font-bold">
                <span className="size-2 rounded-full" style={{ background: col.color }} />
                {col.label}
                <span className="ms-auto text-xs font-medium text-ink-3">
                  {n(list.length)}
                </span>
              </h2>

              <AnimatePresence initial={false}>
                {list.map((o) => (
                  <motion.article
                    key={o.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="mb-2.5 rounded-[18px] border border-border bg-surface-2 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <b className="text-sm -tracking-[0.02em]">سفارش {o.number}</b>
                      <span className="text-xs text-ink-2">میز {n(o.table)}</span>
                    </div>
                    <ul className="text-[12.5px] leading-8 text-ink-2">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{it.name}</span>
                          <span>×{n(it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    {col.next && (
                      <button
                        type="button"
                        onClick={() => move(o.id, col.next!)}
                        className="mt-2.5 w-full rounded-xl border border-border bg-surface py-2 text-[12.5px] font-semibold transition hover:border-primary hover:bg-primary hover:text-white"
                      >
                        {col.cta}
                      </button>
                    )}
                  </motion.article>
                ))}
              </AnimatePresence>

              {list.length === 0 && (
                <p className="py-6 text-center text-xs text-ink-3">
                  سفارشی در این وضعیت نیست
                </p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
