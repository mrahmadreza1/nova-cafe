"use client";

export const QUICK_PROMPTS = [
  "یک قهوه تلخ می‌خواهم",
  "برای صبحانه چه پیشنهاد می‌دهی؟",
  "پرفروش‌ترین نوشیدنی چیست؟",
  "یک دسر کنار لاته پیشنهاد بده",
];

export function QuickChips({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-4 pb-1 pt-2">
      {QUICK_PROMPTS.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          className="whitespace-nowrap rounded-full border border-border bg-surface-2 px-4 py-2 text-[13px] font-medium text-ink-2 transition hover:bg-surface-3"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
