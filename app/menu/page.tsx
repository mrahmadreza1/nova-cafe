"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { TabBar } from "@/components/shared/TabBar";
import { SearchBar } from "@/components/menu/SearchBar";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ProductCard } from "@/components/menu/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { staggerList } from "@/lib/motion";
import { findProducts, products, type CategoryId } from "@/content/menu";
import { n } from "@/lib/format";

export default function MenuPage() {
  const [category, setCategory] = useState<CategoryId>("coffee");
  const [query, setQuery] = useState("");

  const list = useMemo(
    () => (query.trim() ? findProducts({ query }) : findProducts({ category })),
    [query, category]
  );

  return (
    <>
      <AppBar
        title="منوی کافه"
        subtitle={`${n(products.length)} محصول در ۷ دسته`}
        backTo="/"
      />

      <div className="flex-1 overflow-y-auto">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryTabs active={category} onChange={(c) => { setCategory(c); setQuery(""); }} />

        <div className="mx-4 mb-3.5 flex gap-2.5 rounded-[24px] border border-primary-line bg-gradient-to-bl from-primary-soft to-surface-2 p-3.5">
          <Sparkles className="mt-0.5 size-[17px] shrink-0 text-primary" strokeWidth={1.8} />
          <div>
            <b className="text-[13.5px]">نُوا امروز پیشنهاد می‌دهد</b>
            <p className="mt-0.5 text-[12.5px] leading-[1.8] text-ink-2">
              هوا ابری است و بیشتر مهمان‌ها سراغ نوشیدنی گرم رفته‌اند. لاته با
              چیزکیک بلوبری پرتکرارترین ترکیب امروز بوده است.
            </p>
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="mt-2">
                بپرس از نُوا
              </Button>
            </Link>
          </div>
        </div>

        {list.length > 0 ? (
          <motion.div
            variants={staggerList}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-3 px-4 pb-6"
          >
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={<Search className="size-6" />}
            title="چیزی با این نام پیدا نشد"
            description="می‌توانید نام دیگری امتحان کنید یا بگذارید نُوا بر اساس ذائقه‌تان پیشنهاد بدهد."
          >
            <Link href="/chat">
              <Button>پرسیدن از نُوا</Button>
            </Link>
          </EmptyState>
        )}
      </div>

      <TabBar />
    </>
  );
}
