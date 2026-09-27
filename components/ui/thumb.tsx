import { cn } from "@/lib/utils";
import { toneOf, type CategoryId } from "@/content/menu";

/** تصویر محصول به‌صورت گرادیان تولیدشده از دستهٔ محصول.
 *  در محیط واقعی این کامپوننت را با next/image جایگزین کنید و
 *  گرادیان را به‌عنوان placeholder نگه دارید. */
export function Thumb({
  category,
  emoji,
  className,
  children,
}: {
  category: CategoryId;
  emoji: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br",
        toneOf(category),
        className
      )}
    >
      <span aria-hidden>{emoji}</span>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_8%,rgba(255,255,255,.55),transparent_55%)]" />
      {children}
    </div>
  );
}
