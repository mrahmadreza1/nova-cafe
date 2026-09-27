"use client";

import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mx-4 mt-3.5 flex items-center gap-2.5 rounded-[18px] border border-border bg-surface-2 px-3.5 py-2.5 text-ink-3">
      <Search className="size-[17px]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جست‌وجو در منو…"
        aria-label="جست‌وجو در منو"
        className="flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3"
      />
    </div>
  );
}
