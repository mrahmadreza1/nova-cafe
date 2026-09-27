"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { Thumb } from "@/components/ui/thumb";
import { Button } from "@/components/ui/button";
import { AddonList } from "@/components/menu/AddonList";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { AgentAvatar } from "@/components/agent/Avatar";
import { useCart } from "@/lib/store/cart";
import { useSession } from "@/lib/store/session";
import { useToast } from "@/lib/store/toast";
import { pairingsFor } from "@/lib/agent/recommender";
import { n, toman } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Addon, Product } from "@/content/menu";
import { useRouter } from "next/navigation";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Addon[]>([]);
  const add = useCart((s) => s.add);
  const showToast = useToast((s) => s.show);
  const favorites = useSession((s) => s.favorites);
  const toggleFavorite = useSession((s) => s.toggleFavorite);
  const isFav = favorites.includes(product.id);

  const extra = selected.reduce((a, x) => a + x.price, 0);
  const suggestions = pairingsFor([product.id], 3);

  return (
    <>
      <AppBar title={product.name} subtitle="جزئیات محصول" backTo="/menu" />

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <Thumb
            category={product.category}
            emoji={product.emoji}
            className="h-[252px] w-full text-[82px]"
          />
          <button
            type="button"
            aria-label={isFav ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
            aria-pressed={isFav}
            onClick={() => toggleFavorite(product.id)}
            className="glass absolute end-3.5 top-3.5 grid size-9 place-items-center rounded-full text-ink-2"
          >
            <Heart className={cn("size-[17px]", isFav && "fill-[#E0245E] text-[#E0245E]")} />
          </button>
        </div>

        <div className="relative -mt-7 rounded-t-[30px] bg-surface px-4 pb-6 pt-5">
          <span className="mx-auto mb-3.5 block h-1 w-9 rounded-full bg-border-strong" />

          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h2 className="text-[21px] font-bold -tracking-[0.03em]">{product.name}</h2>
              <p className="mt-1.5 text-[13.8px] leading-[1.9] text-ink-2">
                {product.description}
              </p>
            </div>
            <span className="whitespace-nowrap text-[17px] font-bold -tracking-[0.02em]">
              {n(product.price)}
              <small className="ms-1 text-[10.5px] font-medium text-ink-3">تومان</small>
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.ingredients.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-ink-2"
              >
                {i}
              </span>
            ))}
          </div>

          <h3 className="mb-2.5 mt-6 text-[15px] font-bold -tracking-[0.02em]">
            افزودنی‌ها
          </h3>
          <AddonList
            selected={selected}
            onToggle={(a) =>
              setSelected((s) =>
                s.some((x) => x.id === a.id) ? s.filter((x) => x.id !== a.id) : [...s, a]
              )
            }
          />

          <section className="mt-5 rounded-[24px] border border-primary-line bg-gradient-to-bl from-primary-soft to-surface p-4 shadow-card">
            <div className="mb-2.5 flex items-center gap-2.5">
              <AgentAvatar />
              <p className="text-[13.2px] leading-[1.75]">
                مشتریانی که <b>{product.name}</b> سفارش داده‌اند، معمولاً این‌ها
                را هم انتخاب کرده‌اند.
              </p>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
              {suggestions.map(({ product: p }) => (
                <div
                  key={p.id}
                  className="w-[124px] shrink-0 rounded-[18px] border border-border bg-surface p-2.5 shadow-card"
                >
                  <Link href={`/menu/${p.slug}`}>
                    <Thumb
                      category={p.category}
                      emoji={p.emoji}
                      className="mb-2 h-[66px] w-full rounded-xl text-[27px]"
                    />
                    <b className="block text-[12.5px]">{p.name}</b>
                  </Link>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[11.5px] text-ink-2">{n(p.price)}</span>
                    <button
                      type="button"
                      aria-label={`افزودن ${p.name}`}
                      onClick={() => {
                        add(p);
                        showToast(`${p.name} به سبد اضافه شد`);
                      }}
                      className="grid size-[26px] place-items-center rounded-[9px] bg-primary text-white shadow-action active:scale-90"
                    >
                      <Plus className="size-3.5" strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="glass safe-b sticky bottom-0 z-10 flex items-center gap-3 border-t border-border px-4 pt-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            add(product, qty, selected);
            showToast(`${product.name} به سبد اضافه شد`);
            router.push("/cart");
          }}
        >
          افزودن · {toman((product.price + extra) * qty)}
        </Button>
      </div>
    </>
  );
}
