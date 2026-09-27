import Link from "next/link";
import { ChevronLeft, LayoutGrid, MessageCircle, Mic, Utensils } from "lucide-react";

const paths = [
  {
    href: "/chat",
    title: "گفتگو با نُوا",
    hint: "بنویسید چه می‌خواهید، پیشنهاد می‌گیرید",
    Icon: MessageCircle,
    accent: true,
  },
  {
    href: "/voice",
    title: "سفارش صوتی",
    hint: "بدون تایپ، فقط حرف بزنید",
    Icon: Mic,
    accent: true,
  },
  {
    href: "/menu",
    title: "مشاهده منو",
    hint: "خودم انتخاب می‌کنم",
    Icon: LayoutGrid,
    accent: false,
  },
];

export default function WelcomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative h-[334px] shrink-0 overflow-hidden rounded-b-[34px]">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_0%,#3E7BFF_0%,transparent_60%),radial-gradient(80%_70%_at_90%_20%,#6FA0FF_0%,transparent_55%),linear-gradient(200deg,#1F53E0,#0C2E86_70%)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 400 340"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="steam" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity=".28" />
            </linearGradient>
          </defs>
          <path
            d="M0 250 C 80 200 120 280 200 230 S 330 180 400 220 L400 340 L0 340Z"
            fill="url(#steam)"
          />
          <circle cx="320" cy="70" r="46" fill="#fff" opacity=".08" />
          <circle cx="90" cy="120" r="70" fill="#fff" opacity=".06" />
        </svg>

        <div className="absolute end-5 top-5 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <span className="size-[7px] animate-pulse rounded-full bg-[#4ADE80]" />
          باز است تا ۲۳:۰۰
        </div>

        <div className="relative flex h-full flex-col justify-end px-5 pb-7 text-white">
          <div className="mb-3.5 grid size-[58px] place-items-center rounded-[20px] border border-white/30 bg-white/15 text-2xl font-extrabold backdrop-blur">
            ن
          </div>
          <h1 className="text-[29px] font-extrabold leading-tight -tracking-[0.035em]">
            کافه نُوا
          </h1>
          <p className="mt-2 max-w-[31ch] text-sm leading-[1.8] opacity-90">
            نُوا، دستیار سفارش ماست. بگویید چه حالی دارید تا نوشیدنی و خوراک
            مناسبش را پیدا کند.
          </p>
        </div>
      </section>

      <nav className="flex flex-col gap-2.5 px-4 pb-6 pt-5">
        {paths.map(({ href, title, hint, Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3.5 rounded-[24px] border border-border bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-float"
          >
            <span
              className={
                accent
                  ? "grid size-[46px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#5B8DEF] to-[#1F53E0] text-white shadow-action"
                  : "grid size-[46px] shrink-0 place-items-center rounded-2xl bg-surface-3 text-ink-2"
              }
            >
              <Icon className="size-[21px]" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <b className="block text-[15px] font-semibold -tracking-[0.02em]">
                {title}
              </b>
              <span className="text-[12.5px] text-ink-3">{hint}</span>
            </span>
            <ChevronLeft className="ms-auto size-[18px] text-ink-3" />
          </Link>
        ))}
      </nav>

      <div className="mx-4 mb-5 flex items-center gap-2.5 rounded-[18px] border border-dashed border-border-strong bg-surface-2 px-4 py-3 text-[13px] text-ink-2">
        <Utensils className="size-4" strokeWidth={1.8} />
        میز شمارهٔ <b className="text-ink">۱۲</b> · سفارش مستقیم به آشپزخانه
        ارسال می‌شود
      </div>
    </main>
  );
}
