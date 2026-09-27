"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { Thumb } from "@/components/ui/thumb";
import { Badge, toneForBadge } from "@/components/ui/badge";
import { useCart } from "@/lib/store/cart";
import { useSession } from "@/lib/store/session";
import { useToast } from "@/lib/store/toast";
import { fadeUp } from "@/lib/motion";
import { n } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/menu";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const showToast = useToast((s) => s.show);
  const favorites = useSession((s) => s.favorites);
  const toggleFavorite = useSession((s) => s.toggleFavorite);
  const isFav = favorites.includes(product.id);

  return (
    <motion.div variants={fadeUp} className="relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
      <Link href={`/menu/${product.slug}`} className="relative block">
        <Thumb
          category={product.category}
          emoji={product.emoji}
          className="h-[106px] w-full text-[38px]"
        />
        {product.badge && (
          <Badge tone={toneForBadge(product.badge)} className="absolute start-2 top-2 z-10">
            {product.badge}
          </Badge>
        )}
      </Link>

      <button
        type="button"
        aria-label={isFav ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
        aria-pressed={isFav}
        onClick={() => toggleFavorite(product.id)}
        className="glass absolute end-2 top-2 z-10 grid size-[29px] place-items-center rounded-full text-ink-2"
      >
        <Heart
          className={cn("size-[15px]", isFav && "fill-[#E0245E] text-[#E0245E]")}
          strokeWidth={1.9}
        />
      </button>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/menu/${product.slug}`} className="text-[13.8px] font-semibold -tracking-[0.02em]">
          {product.name}
        </Link>
        <p className="min-h-8 text-[11.5px] leading-[1.65] text-ink-3">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <span className="text-[13.5px] font-bold -tracking-[0.02em]">
            {n(product.price)}
            <small className="ms-1 text-[10.5px] font-medium text-ink-3">تومان</small>
          </span>
          <button
            type="button"
            aria-label={`افزودن ${product.name} به سبد`}
            onClick={() => {
              add(product);
              showToast(`${product.name} به سبد اضافه شد`);
            }}
            className="grid size-8 place-items-center rounded-[11px] bg-primary text-white shadow-action transition active:scale-[0.85]"
          >
            <Plus className="size-[17px]" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
