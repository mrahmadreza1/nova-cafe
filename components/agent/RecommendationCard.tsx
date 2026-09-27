"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Thumb } from "@/components/ui/thumb";
import { bubbleIn } from "@/lib/motion";
import { toman } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/lib/store/toast";
import type { Product } from "@/content/menu";

export function RecommendationCard({
  product,
  reason,
}: {
  product: Product;
  reason?: string;
}) {
  const add = useCart((s) => s.add);
  const showToast = useToast((s) => s.show);

  return (
    <motion.div
      variants={bubbleIn}
      className="flex items-center gap-3 rounded-[18px] border border-border bg-surface p-2.5 shadow-card"
    >
      <Link href={`/menu/${product.slug}`} aria-label={product.name}>
        <Thumb
          category={product.category}
          emoji={product.emoji}
          className="size-[50px] rounded-[13px] text-2xl"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/menu/${product.slug}`} className="block truncate text-[13.5px] font-semibold">
          {product.name}
        </Link>
        <span className="text-xs text-ink-3">{reason ?? toman(product.price)}</span>
      </div>
      <button
        type="button"
        aria-label={`افزودن ${product.name} به سبد`}
        onClick={() => {
          add(product);
          showToast(`${product.name} به سبد اضافه شد`);
        }}
        className="grid size-[34px] shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition hover:bg-primary hover:text-white active:scale-90"
      >
        <Plus className="size-[17px]" strokeWidth={2.4} />
      </button>
    </motion.div>
  );
}
