import { n, toman } from "@/lib/format";
import type { PlacedOrder } from "@/lib/store/session";

export function SuccessTicket({ order }: { order: PlacedOrder }) {
  const cells = [
    ["شمارهٔ سفارش", order.number],
    ["میز", n(order.table)],
    ["آماده تا", `${n(order.etaMinutes)} دقیقه`],
  ] as const;

  return (
    <div className="mx-1 mt-5 overflow-hidden rounded-[24px] border border-border bg-surface text-start shadow-card">
      <div className="flex gap-3.5 p-4">
        {cells.map(([label, value]) => (
          <div key={label} className="flex-1 text-center">
            <span className="block text-[11.5px] text-ink-3">{label}</span>
            <b className="text-lg font-bold -tracking-[0.02em]">{value}</b>
          </div>
        ))}
      </div>
      <div className="relative border-t border-dashed border-border-strong">
        <span className="absolute -start-[9px] -top-[9px] size-[18px] rounded-full bg-surface-2" />
        <span className="absolute -end-[9px] -top-[9px] size-[18px] rounded-full bg-surface-2" />
      </div>
      <div className="flex items-center justify-between px-4 py-3.5">
        <span className="text-[12.5px] text-ink-2">پرداخت در پایان، سر میز</span>
        <b className="text-base font-bold -tracking-[0.02em]">{toman(order.total)}</b>
      </div>
    </div>
  );
}
