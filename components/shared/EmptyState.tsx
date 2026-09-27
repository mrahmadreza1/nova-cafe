/** حالت خالی یک دعوت به کنش است، نه پیام تأسف. */
export function EmptyState({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-8 py-14 text-center">
      <div className="mb-1.5 grid size-[74px] place-items-center rounded-[26px] border border-border bg-surface-2 text-ink-3">
        {icon}
      </div>
      <b className="text-base -tracking-[0.02em]">{title}</b>
      <p className="max-w-[30ch] text-[13.5px] leading-[1.85] text-ink-2">
        {description}
      </p>
      {children && <div className="mt-3 flex gap-2.5">{children}</div>}
    </div>
  );
}
