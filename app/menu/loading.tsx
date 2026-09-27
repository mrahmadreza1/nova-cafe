import { Skeleton } from "@/components/ui/skeleton";

/* ابعاد اسکلتون دقیقاً برابر کارت واقعی است تا هنگام بارگذاری
   چیدمان نپرد. */
export default function Loading() {
  return (
    <div className="px-4 pt-3.5">
      <Skeleton className="h-[42px] rounded-[18px]" />
      <div className="mt-3 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[34px] w-24 rounded-full" />
        ))}
      </div>
      <Skeleton className="mt-3.5 h-[92px] rounded-[24px]" />
      <div className="mt-3.5 grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[24px] border border-border">
            <Skeleton className="h-[106px] rounded-none" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-2.5 w-3/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
