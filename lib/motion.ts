import type { Variants } from "framer-motion";

/** منحنی حرکتی واحد کل محصول */
export const EASE = [0.22, 0.7, 0.28, 1] as const;

/** مقیاس زمانی سه‌سطحی: ورود / اکشن / تغییر وضعیت */
export const DUR = { enter: 0.38, action: 0.18, state: 0.8 } as const;

export const bubbleIn: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR.enter, ease: EASE } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE } },
};

export const staggerList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const sheetUp: Variants = {
  hidden: { y: "100%" },
  show: { y: 0, transition: { type: "spring", stiffness: 380, damping: 36 } },
  exit: { y: "100%", transition: { duration: 0.22, ease: EASE } },
};

export const slideOutRow: Variants = {
  show: { opacity: 1, x: 0, height: "auto" },
  exit: { opacity: 0, x: 24, height: 0, marginBottom: 0, transition: { duration: 0.32, ease: EASE } },
};
