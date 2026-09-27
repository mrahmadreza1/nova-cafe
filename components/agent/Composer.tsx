"use client";

import Link from "next/link";
import { useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";

export function Composer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="glass safe-b flex shrink-0 items-end gap-2.5 border-t border-border px-3.5 pt-2.5">
      <div className="flex flex-1 items-center gap-2 rounded-[24px] border border-border bg-surface-2 py-1.5 pe-1.5 ps-3.5 transition focus-within:border-primary-line focus-within:shadow-[0_0_0_4px_var(--color-primary-soft)]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="پیام‌تان را بنویسید…"
          aria-label="متن پیام"
          autoComplete="off"
          className="flex-1 bg-transparent py-2 outline-none placeholder:text-ink-3"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label="ارسال"
          className="grid size-[38px] shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-action transition active:scale-90 disabled:opacity-45 disabled:shadow-none"
        >
          <SendHorizontal className="size-[17px]" />
        </button>
      </div>
      <Link
        href="/voice"
        aria-label="سفارش صوتی"
        className="grid size-[38px] shrink-0 place-items-center rounded-2xl border border-border bg-surface-2 text-ink-2"
      >
        <Mic className="size-[19px]" strokeWidth={1.8} />
      </Link>
    </div>
  );
}
