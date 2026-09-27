# نقشهٔ فایل‌ها

هر فایل، یک مسئولیت.

## پیکربندی
- `package.json` — وابستگی‌ها و اسکریپت‌ها
- `tsconfig.json` — مسیر `@/*` به ریشهٔ پروژه
- `next.config.ts`
- `postcss.config.mjs` — Tailwind v4
- `.env.example` — کلید OpenAI (اختیاری)

## استایل
- `styles/globals.css` — توکن‌های رنگ، شعاع، سایه و حرکت در بلوک `@theme`

## داده
- `content/menu.ts` — ۲۳ محصول، ۷ دسته، افزودنی‌ها و توابع جست‌وجو

## منطق
- `lib/utils.ts` — `cn()`
- `lib/format.ts` — اعداد فارسی، تومان، نرخ خدمات میز
- `lib/motion.ts` — واریانت‌های مشترک Framer Motion
- `lib/agent/provider.ts` — کلاینت OpenAI، نام مدل‌ها، پشتیبانی از baseURL سفارشی
- `lib/agent/prompt.ts` — سیستم‌پرامپت فارسی + فشردهٔ منو
- `lib/agent/recommender.ts` — ماتریس هم‌رخدادی و پیشنهاد مکمل
- `lib/agent/fallback.ts` — موتور قاعده‌محور محلی
- `lib/store/cart.ts` — سبد، جمع‌ها، پیشنهادهای رد شده
- `lib/store/session.ts` — میز، علاقه‌مندی، گفتگو، سفارش فعال
- `lib/store/toast.ts` — پیام‌های کوتاه
- `lib/voice/useSpeech.ts` — Web Speech API با مسیر جایگزین سرور

## کامپوننت
- `components/ui/` — `button` · `skeleton` · `badge` · `thumb`
- `components/shared/` — `AppBar` · `TabBar` · `EmptyState` · `Toast`
- `components/agent/` — `Avatar` · `AgentBubble` · `TypingDots` · `QuickChips` · `Composer` · `RecommendationCard`
- `components/voice/` — `VoiceOrb` · `TranscriptLine`
- `components/menu/` — `SearchBar` · `CategoryTabs` · `ProductCard` · `AddonList`
- `components/cart/` — `CartLine` · `QuantityStepper` · `OrderSummary`
- `components/order/` — `SuccessTicket` · `TrackingSteps`

## صفحات
- `app/layout.tsx` — `dir="rtl"` · فونت وزیرمتن · توست سراسری
- `app/page.tsx` — خوش‌آمد
- `app/chat/page.tsx`
- `app/voice/page.tsx`
- `app/menu/page.tsx` + `loading.tsx`
- `app/menu/[slug]/page.tsx` (سرور) + `ProductDetail.tsx` (کلاینت)
- `app/cart/page.tsx`
- `app/review/page.tsx`
- `app/order/[id]/page.tsx`
- `app/kds/page.tsx`
- `app/api/agent/route.ts` · `app/api/orders/route.ts` · `app/api/transcribe/route.ts`

## میکرو‌اینتراکشن‌ها و جای تعریفشان

| رویداد | فایل |
|---|---|
| ارسال و دریافت پیام | `lib/motion.ts` → `bubbleIn`, `staggerList` |
| تایپینگ ایجنت | `components/agent/TypingDots.tsx` |
| ضبط صدا | `components/voice/VoiceOrb.tsx` |
| افزودن به سبد | `components/shared/TabBar.tsx` (نشان) + `Toast.tsx` |
| پذیرش یا رد پیشنهاد | `lib/motion.ts` → `slideOutRow` |
| ثبت سفارش | `app/order/[id]/page.tsx` (تیک تأیید) |
