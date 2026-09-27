"use client";

import { n } from "@/lib/format";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-surface-2 p-1">
      <button
        type="button"
        aria-label="کاهش تعداد"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid size-[30px] place-items-center rounded-full bg-surface text-base font-semibold shadow-card transition active:scale-90"
      >
        −
      </button>
      <span className="min-w-[30px] text-center text-[14.5px] font-bold">
        {n(value)}
      </span>
      <button
        type="button"
        aria-label="افزایش تعداد"
        onClick={() => onChange(value + 1)}
        className="grid size-[30px] place-items-center rounded-full bg-surface text-base font-semibold shadow-card transition active:scale-90"
      >
        +
      </button>
    </div>
  );
}
