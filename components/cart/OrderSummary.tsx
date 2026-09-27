import { n, toman } from "@/lib/format";
import { serviceOf, subtotalOf, totalOf, type CartLine } from "@/lib/store/cart";

export function OrderSummary({ lines }: { lines: CartLine[] }) {
  return (
    <div className="rounded-[24px] border border-border bg-surface-2 px-4 py-4">
      <div className="mb-2 flex justify-between text-[13.5px] text-ink-2">
        <span>جمع اقلام</span>
        <span>{toman(subtotalOf(lines))}</span>
      </div>
      <div className="mb-2 flex justify-between text-[13.5px] text-ink-2">
        <span>خدمات میز ({n(9)}٪)</span>
        <span>{toman(serviceOf(lines))}</span>
      </div>
      <div className="mt-3 flex justify-between border-t border-dashed border-border-strong pt-3 text-base font-bold -tracking-[0.02em]">
        <span>قابل پرداخت</span>
        <span>{toman(totalOf(lines))}</span>
      </div>
    </div>
  );
}
