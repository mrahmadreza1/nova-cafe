"use client";

import { Check } from "lucide-react";
import { n } from "@/lib/format";
import { cn } from "@/lib/utils";

export const TRACK_STEPS = [
  { title: "ثبت شد", hint: "سفارش شما در صف آشپزخانه قرار گرفت" },
  { title: "در حال آماده‌سازی", hint: "باریستا مشغول آماده‌سازی است" },
  { title: "آماده تحویل", hint: "سفارش روی پیشخوان است" },
  { title: "تحویل داده شد", hint: "نوش جان — ممنون که نُوا را انتخاب کردید" },
] as const;

export function TrackingSteps({ current }: { current: number }) {
  const pct = (current / (TRACK_STEPS.length - 1)) * 100;

  return (
    <>
      <div className="mx-5 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div
          className="h-full rounded-full bg-gradient-to-l from-[#5B8DEF] to-[#1F53E0] transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="px-5 py-5">
        {TRACK_STEPS.map((s, i) => {
          const done = i < current;
          const now = i === current;
          return (
            <li key={s.title} className="relative flex gap-3.5 pb-6 last:pb-0">
              {i < TRACK_STEPS.length - 1 && (
                <span
                  className={cn(
                    "absolute start-[15px] top-8 bottom-0.5 w-0.5 rounded",
                    done ? "bg-success" : "bg-border"
                  )}
                />
              )}
              <span
                className={cn(
                  "z-10 grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] transition-all duration-500",
                  done && "border-success bg-success text-white",
                  now && "border-primary bg-primary text-white shadow-[0_0_0_5px_var(--color-primary-soft)]",
                  !done && !now && "border-border bg-surface-2 text-ink-3"
                )}
              >
                {done ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">{n(i + 1)}</span>
                )}
              </span>
              <div>
                <b className={cn("block text-[14.5px] -tracking-[0.02em]", now && "text-primary")}>
                  {s.title}
                </b>
                <span className="text-[12.5px] text-ink-3">{s.hint}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
