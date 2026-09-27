"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { SuccessTicket } from "@/components/order/SuccessTicket";
import { TrackingSteps, TRACK_STEPS } from "@/components/order/TrackingSteps";
import { AgentAvatar } from "@/components/agent/Avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/store/session";
import { n } from "@/lib/format";
import { EASE } from "@/lib/motion";

/* یک مسیر، دو حالت: ابتدا رسید موفقیت، سپس رهگیری.
   پس از ثبت سفارش، محصول از «فروشنده» به «نمایشگر وضعیت» تبدیل می‌شود. */
export default function OrderPage() {
  const order = useSession((s) => s.order);
  const resetChat = useSession((s) => s.resetChat);
  const setOrder = useSession((s) => s.setOrder);
  const [view, setView] = useState<"success" | "track">("success");
  const [step, setStep] = useState(0);

  /* در محیط واقعی این را با اشتراک realtime روی KDS جایگزین کنید */
  useEffect(() => {
    if (view !== "track" || step >= TRACK_STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 4200);
    return () => clearTimeout(t);
  }, [view, step]);

  if (!order)
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center text-ink-2">
        سفارش فعالی وجود ندارد.{" "}
        <Link href="/menu" className="text-primary">
          شروع سفارش
        </Link>
      </div>
    );

  const finish = () => {
    setOrder(null);
    resetChat();
  };

  if (view === "success")
    return (
      <main className="flex flex-1 flex-col px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.08, 1], opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto mb-4 grid size-[86px] place-items-center rounded-full bg-success-soft text-success"
        >
          <Check className="size-9" strokeWidth={2.6} />
        </motion.div>
        <h1 className="text-[21px] font-bold -tracking-[0.03em]">سفارش ثبت شد</h1>
        <p className="mt-1.5 text-[13.8px] text-ink-2">
          سفارش‌تان روی صفحهٔ آشپزخانه رفت. سرآشپز شروع کرده است.
        </p>

        <SuccessTicket order={order} />

        <div className="mt-6 flex flex-col gap-2.5">
          <Button size="lg" block onClick={() => setView("track")}>
            رهگیری سفارش
          </Button>
          <Link href="/" onClick={finish}>
            <Button variant="quiet" block>
              سفارش جدید
            </Button>
          </Link>
        </div>
      </main>
    );

  return (
    <>
      <AppBar title="رهگیری سفارش" subtitle={`سفارش ${order.number}`} backTo="/" />
      <div className="flex-1 overflow-y-auto pt-5">
        <div className="px-5 pb-5 text-center">
          <span className="inline-flex rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
            {TRACK_STEPS[step].title}
          </span>
          <h2 className="mb-1 mt-3 text-[22px] font-bold -tracking-[0.03em]">
            {step < 3
              ? `حدود ${n(Math.max(1, order.etaMinutes - step * 3))} دقیقهٔ دیگر`
              : "سفارش تحویل شد"}
          </h2>
          <p className="text-[12.5px] text-ink-3">
            سفارش {order.number} · میز {n(order.table)}
          </p>
        </div>

        <TrackingSteps current={step} />

        <div className="px-4 pb-6">
          <div className="flex items-start gap-2.5 rounded-[24px] border border-border bg-surface p-4 shadow-card">
            <AgentAvatar />
            <div className="text-[13.2px] leading-[1.85]">
              {step < 2
                ? "اگر چیزی جا مانده تا قبل از آماده شدن می‌توانید اضافه کنید."
                : "امیدوارم بپسندید. بازخوردتان به باریستا منتقل می‌شود."}
              {step < 2 && (
                <Link href="/menu" className="mt-2.5 block">
                  <Button variant="ghost" block>
                    افزودن به همین سفارش
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <Link href="/" onClick={finish} className="mt-2.5 block">
            <Button variant="quiet" block>
              پایان و سفارش جدید
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
