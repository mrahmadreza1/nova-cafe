import { AgentAvatar } from "./Avatar";

export function TypingDots() {
  return (
    <div className="flex max-w-[88%] gap-2" aria-label="نُوا در حال نوشتن است">
      <AgentAvatar />
      <div className="flex items-center gap-1 rounded-[20px] rounded-ss-[7px] border border-border bg-surface-2 px-4 py-4">
        {[0, 0.18, 0.36].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}s` }}
            className="size-[7px] animate-bounce rounded-full bg-ink-3"
          />
        ))}
      </div>
    </div>
  );
}
