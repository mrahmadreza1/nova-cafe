import { cn } from "@/lib/utils";

type Tone = "hot" | "new" | "ok" | "neutral";

const tones: Record<Tone, string> = {
  hot: "bg-warning-soft text-warning",
  new: "bg-primary-soft text-primary",
  ok: "bg-success-soft text-success",
  neutral: "bg-surface-3 text-ink-2",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export const toneForBadge = (badge?: string): Tone =>
  badge === "پرفروش" ? "hot" : badge === "جدید" ? "new" : badge ? "ok" : "neutral";
