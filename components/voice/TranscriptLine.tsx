"use client";

export function TranscriptLine({
  text,
  recording,
}: {
  text: string;
  recording: boolean;
}) {
  if (!text)
    return (
      <p className="min-h-[76px] max-w-[26ch] text-[15px] text-ink-2">
        میکروفون را بزنید و بگویید چه می‌خواهید
      </p>
    );

  return (
    <p
      aria-live="polite"
      className="min-h-[76px] max-w-[28ch] text-[19px] font-semibold leading-[1.75] -tracking-[0.02em]"
    >
      {text}
      {recording && (
        <span className="ms-0.5 inline-block h-[19px] w-[2px] animate-pulse bg-primary align-[-3px]" />
      )}
    </p>
  );
}
