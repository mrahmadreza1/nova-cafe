"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, MessageCircle, Mic, ShoppingBag } from "lucide-react";
import { useCart, countOf } from "@/lib/store/cart";
import { n } from "@/lib/format";
import { cn } from "@/lib/utils";

const items = [
  { href: "/menu", label: "منو", Icon: LayoutGrid },
  { href: "/chat", label: "چت", Icon: MessageCircle },
  { href: "/voice", label: "صدا", Icon: Mic },
  { href: "/cart", label: "سبد", Icon: ShoppingBag },
];

export function TabBar() {
  const pathname = usePathname();
  const count = useCart((s) => countOf(s.lines));

  return (
    <nav className="glass safe-b sticky bottom-0 z-20 grid grid-cols-4 gap-0.5 border-t border-border px-2.5 pt-2">
      {items.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex flex-col items-center gap-[3px] rounded-2xl py-1.5 text-[11px] font-medium transition-colors",
              active ? "text-primary" : "text-ink-3"
            )}
          >
            <Icon className="size-[21px]" strokeWidth={1.8} />
            <span>{label}</span>
            {href === "/cart" && count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: [0.4, 1.25, 1] }}
                transition={{ duration: 0.45 }}
                className="absolute end-4 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white"
              >
                {n(count)}
              </motion.span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
