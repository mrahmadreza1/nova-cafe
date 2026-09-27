"use client";

import { Check } from "lucide-react";
import { addons, type Addon } from "@/content/menu";
import { n } from "@/lib/format";
import { cn } from "@/lib/utils";

export function AddonList({
  selected,
  onToggle,
}: {
  selected: Addon[];
  onToggle: (addon: Addon) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {addons.map((a) => {
        const on = selected.some((x) => x.id === a.id);
        return (
          <button
            key={a.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(a)}
            className={cn(
              "flex items-center gap-3 rounded-[18px] border px-3.5 py-3 text-start transition",
              on ? "border-primary bg-primary-soft" : "border-border bg-surface"
            )}
          >
            <span
              className={cn(
                "grid size-[21px] shrink-0 place-items-center rounded-[7px] border-[1.5px] transition",
                on ? "border-primary bg-primary text-white" : "border-border-strong text-transparent"
              )}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-[14px]">{a.name}</span>
            <span className="ms-auto text-[12.5px] font-semibold text-ink-2">
              +{n(a.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
