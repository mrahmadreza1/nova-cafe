export function AgentAvatar({ size = 30 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className="grid shrink-0 place-items-center rounded-[11px] bg-gradient-to-br from-[#5B8DEF] to-[#1F53E0] font-extrabold text-white shadow-action"
    >
      ن
    </span>
  );
}
