"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { TabBar } from "@/components/shared/TabBar";
import { CartLineRow } from "@/components/cart/CartLine";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { countOf, useCart } from "@/lib/store/cart";
import { n } from "@/lib/format";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const count = countOf(lines);

  return (
    <>
      <AppBar
        title="سبد سفارش"
        subtitle={count ? `${n(count)} قلم` : "خالی"}
        backTo="/menu"
      />

      <div className="flex-1 overflow-y-auto">
        {lines.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="size-6" />}
            title="سبد شما خالی است"
            description="از منو انتخاب کنید یا بگذارید نُوا بر اساس حال‌وهوای امروزتان پیشنهاد بدهد."
          >
            <Link href="/chat">
              <Button>گفتگو با نُوا</Button>
            </Link>
            <Link href="/menu">
              <Button variant="ghost">دیدن منو</Button>
            </Link>
          </EmptyState>
        ) : (
          <div className="p-4">
            <AnimatePresence initial={false}>
              {lines.map((l) => (
                <CartLineRow key={l.key} line={l} />
              ))}
            </AnimatePresence>
            <div className="mt-3.5">
              <OrderSummary lines={lines} />
            </div>
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <div className="glass safe-b sticky bottom-[68px] z-10 flex items-center gap-3 border-t border-border px-4 pt-3">
          <Link href="/menu">
            <Button variant="ghost">ادامهٔ خرید</Button>
          </Link>
          <Link href="/review" className="flex-1">
            <Button size="lg" block>
              نهایی کردن سفارش
            </Button>
          </Link>
        </div>
      )}

      <TabBar />
    </>
  );
}
