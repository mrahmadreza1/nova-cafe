"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Thumb } from "@/components/ui/thumb";
import { QuantityStepper } from "./QuantityStepper";
import { lineTotal, useCart, type CartLine as Line } from "@/lib/store/cart";
import { slideOutRow } from "@/lib/motion";
import { toman } from "@/lib/format";

export function CartLineRow({ line }: { line: Line }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  return (
    <motion.div
      layout
      variants={slideOutRow}
      initial="show"
      animate="show"
      exit="exit"
      className="mb-2.5 flex items-center gap-3 rounded-[18px] border border-border bg-surface p-3 shadow-card"
    >
      <Thumb
        category={line.product.category}
        emoji={line.product.emoji}
        className="size-[54px] rounded-[14px] text-[25px]"
      />
      <div className="min-w-0 flex-1">
        <b className="block text-[13.8px] font-semibold">{line.product.name}</b>
        {line.addons.length > 0 && (
          <span className="text-[11.5px] text-ink-3">
            {line.addons.map((a) => a.name).join(" · ")}
          </span>
        )}
        <span className="mt-0.5 block text-[12.5px] font-bold">
          {toman(lineTotal(line))}
        </span>
      </div>
      <QuantityStepper value={line.qty} onChange={(q) => setQty(line.key, q)} min={0} />
      <button
        type="button"
        aria-label={`حذف ${line.product.name}`}
        onClick={() => remove(line.key)}
        className="rounded-[10px] p-1.5 text-ink-3 transition hover:bg-danger-soft hover:text-danger"
      >
        <Trash2 className="size-4" strokeWidth={1.9} />
      </button>
    </motion.div>
  );
}
