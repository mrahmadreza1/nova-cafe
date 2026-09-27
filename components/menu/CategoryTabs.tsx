"use client";

import { categories, type CategoryId } from "@/content/menu";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 pt-1">
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          aria-pressed={active === c.id}
          className={cn(
            "whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition",
            active === c.id
              ? "border-ink bg-ink font-semibold text-surface"
              : "border-border bg-surface-2 font-medium text-ink-2"
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
