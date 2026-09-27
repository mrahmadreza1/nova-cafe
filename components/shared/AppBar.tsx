"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function AppBar({
  title,
  subtitle,
  action,
  backTo,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backTo?: string;
}) {
  const router = useRouter();
  return (
    <header className="glass sticky top-0 z-20 flex min-h-[56px] items-center gap-3 border-b border-border px-4 py-2.5">
      <button
        type="button"
        aria-label="بازگشت"
        onClick={() => (backTo ? router.push(backTo) : router.back())}
        className="grid size-[34px] shrink-0 place-items-center rounded-xl bg-surface-3 transition hover:bg-border"
      >
        <ChevronLeft className="size-[18px] rotate-180" />
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-[16.5px] font-bold -tracking-[0.02em]">{title}</h1>
        {subtitle && <p className="-mt-1 text-xs text-ink-3">{subtitle}</p>}
      </div>
      {action && <div className="ms-auto">{action}</div>}
    </header>
  );
}
