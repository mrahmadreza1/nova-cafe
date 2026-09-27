/* ============================================================
   منبع دادهٔ منو — در محیط واقعی با CMS یا دیتابیس جایگزین شود.
   امضای توابع را حفظ کنید تا بقیهٔ اپ دست‌نخورده بماند.
   ============================================================ */

export type CategoryId =
  | "coffee"
  | "hot"
  | "cold"
  | "cake"
  | "breakfast"
  | "snack"
  | "food";

export type Trait =
  | "تلخ"
  | "شیرین"
  | "خنک"
  | "سبک"
  | "پرکافئین"
  | "بدون‌لبنیات";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  emoji: string;
  traits: Trait[];
  ingredients: string[];
  /** شناسهٔ محصولاتی که بیشترین هم‌رخدادی را با این قلم دارند */
  pairings: string[];
  badge?: "پرفروش" | "جدید" | "ویژه" | "سالم";
  bestSeller?: boolean;
};

export type Addon = { id: string; name: string; price: number };

export type Category = { id: CategoryId; label: string; tone: string };

export const categories: Category[] = [
  { id: "coffee", label: "قهوه‌ها", tone: "from-[#E7D3BE] to-[#C8A587]" },
  { id: "hot", label: "نوشیدنی گرم", tone: "from-[#F1DCC8] to-[#D9B08C]" },
  { id: "cold", label: "نوشیدنی سرد", tone: "from-[#D7E9FA] to-[#A9C9EE]" },
  { id: "cake", label: "کیک و دسر", tone: "from-[#F7DCE6] to-[#E3B3CA]" },
  { id: "breakfast", label: "صبحانه", tone: "from-[#FCEDCB] to-[#F0CE93]" },
  { id: "snack", label: "میان‌وعده", tone: "from-[#E4EFD8] to-[#BFD8A8]" },
  { id: "food", label: "غذاها", tone: "from-[#FBDDD2] to-[#EEB49E]" },
];

export const addons: Addon[] = [
  { id: "a1", name: "شات اضافه اسپرسو", price: 25000 },
  { id: "a2", name: "شیر بدون لاکتوز", price: 15000 },
  { id: "a3", name: "سیروپ وانیل", price: 12000 },
  { id: "a4", name: "خامهٔ سرد", price: 18000 },
];

export const products: Product[] = [
  { id: "esp", slug: "espresso", name: "اسپرسو", description: "تک‌شات، بدنهٔ غلیظ و کرمای فندقی", price: 58000, category: "coffee", emoji: "☕", traits: ["تلخ", "پرکافئین", "بدون‌لبنیات"], ingredients: ["دانهٔ عربیکا اتیوپی", "آب فیلترشده"], pairings: ["cookie", "brownie"] },
  { id: "ame", slug: "americano", name: "آمریکانو", description: "اسپرسو با آب داغ، ملایم و طولانی", price: 68000, category: "coffee", emoji: "☕", traits: ["تلخ", "بدون‌لبنیات"], ingredients: ["دو شات اسپرسو", "آب داغ"], pairings: ["cheesecake", "cookie"] },
  { id: "lat", slug: "latte", name: "لاته", description: "شیر بخارپز با فوم مخملی", price: 92000, category: "coffee", emoji: "🥛", traits: ["شیرین"], ingredients: ["اسپرسو", "شیر پرچرب", "فوم"], pairings: ["cheesecake", "brownie", "cookie"], badge: "پرفروش", bestSeller: true },
  { id: "cap", slug: "cappuccino", name: "کاپوچینو", description: "تعادل کلاسیک اسپرسو، شیر و فوم", price: 88000, category: "coffee", emoji: "☕", traits: [], ingredients: ["اسپرسو", "شیر", "فوم ضخیم"], pairings: ["croissant", "cookie"] },
  { id: "moc", slug: "mocha", name: "موکا", description: "شکلات تلخ و اسپرسو با شیر", price: 105000, category: "coffee", emoji: "🍫", traits: ["شیرین"], ingredients: ["اسپرسو", "شکلات تلخ ۷۰٪", "شیر"], pairings: ["brownie"] },
  { id: "v60", slug: "v60", name: "V60 دم‌دستی", description: "پروفایل روشن و میوه‌ای، تک‌خاستگاه", price: 98000, category: "coffee", emoji: "🫗", traits: ["تلخ", "سبک", "بدون‌لبنیات"], ingredients: ["دانهٔ کلمبیا", "دم سه‌دقیقه‌ای"], pairings: ["cheesecake"], badge: "ویژه" },
  { id: "mat", slug: "matcha-latte", name: "ماچا لاته", description: "ماچای درجه‌یک ژاپنی با شیر", price: 112000, category: "hot", emoji: "🍵", traits: ["شیرین"], ingredients: ["ماچا تشریفاتی", "شیر"], pairings: ["cookie"], badge: "جدید" },
  { id: "cho", slug: "hot-chocolate", name: "هات‌چاکلت", description: "شکلات داغ غلیظ با خامه", price: 98000, category: "hot", emoji: "🍫", traits: ["شیرین"], ingredients: ["شکلات بلژیکی", "شیر", "خامه"], pairings: ["brownie"] },
  { id: "tea", slug: "masala-tea", name: "چای ماسالا", description: "چای سیاه با ادویهٔ هندی", price: 72000, category: "hot", emoji: "🫖", traits: ["سبک"], ingredients: ["چای آسام", "هل، دارچین، زنجبیل"], pairings: ["croissant"] },
  { id: "ice", slug: "iced-latte", name: "آیس‌لاته", description: "اسپرسوی سرد روی یخ و شیر", price: 96000, category: "cold", emoji: "🧊", traits: ["خنک"], ingredients: ["اسپرسو", "شیر سرد", "یخ"], pairings: ["cheesecake"] },
  { id: "cb", slug: "cold-brew", name: "کلد برو", description: "دم سرد ۱۸ ساعته، کافئین بالا", price: 105000, category: "cold", emoji: "🥤", traits: ["خنک", "تلخ", "پرکافئین", "بدون‌لبنیات"], ingredients: ["دانهٔ برزیل", "دم سرد ۱۸ ساعت"], pairings: ["cookie", "nuts"], badge: "ویژه" },
  { id: "lem", slug: "mint-lemonade", name: "لیموناد نعنا", description: "خنک، ترش و تازه", price: 78000, category: "cold", emoji: "🍋", traits: ["خنک", "سبک", "بدون‌لبنیات"], ingredients: ["لیمو تازه", "نعنا", "سودا"], pairings: ["sandwich"] },
  { id: "cheesecake", slug: "blueberry-cheesecake", name: "چیزکیک بلوبری", description: "بافت ابریشمی با سس بلوبری", price: 135000, category: "cake", emoji: "🍰", traits: ["شیرین"], ingredients: ["پنیر خامه‌ای", "بلوبری", "بیسکویت"], pairings: ["lat", "ame"], badge: "پرفروش", bestSeller: true },
  { id: "brownie", slug: "fudge-brownie", name: "براونی فاج", description: "مغزدار با گردو و شکلات تلخ", price: 118000, category: "cake", emoji: "🍫", traits: ["شیرین"], ingredients: ["شکلات ۷۰٪", "گردو"], pairings: ["esp", "lat"] },
  { id: "cookie", slug: "chocolate-cookie", name: "کوکی شکلاتی", description: "لبهٔ ترد، مرکز نرم", price: 62000, category: "cake", emoji: "🍪", traits: ["شیرین"], ingredients: ["آرد", "چیپس شکلات", "کره"], pairings: ["lat", "mat"] },
  { id: "croissant", slug: "butter-croissant", name: "کروسان کره", description: "۷۲ ساعت تخمیر، لایه‌لایه", price: 92000, category: "breakfast", emoji: "🥐", traits: [], ingredients: ["کرهٔ فرانسوی", "خمیر ورقه‌ای"], pairings: ["cap", "ame"], badge: "پرفروش", bestSeller: true },
  { id: "omelette", slug: "mushroom-omelette", name: "املت قارچ", description: "تخم‌مرغ محلی، قارچ و پنیر", price: 168000, category: "breakfast", emoji: "🍳", traits: [], ingredients: ["تخم‌مرغ", "قارچ", "پنیر"], pairings: ["ame", "lem"] },
  { id: "granola", slug: "granola-yogurt", name: "گرانولا و ماست", description: "ماست یونانی، عسل و میوه", price: 128000, category: "breakfast", emoji: "🥣", traits: ["سبک"], ingredients: ["ماست یونانی", "گرانولا", "عسل"], pairings: ["cb"] },
  { id: "sandwich", slug: "caprese-sandwich", name: "ساندویچ کاپرزه", description: "موزارلا، گوجه و ریحان", price: 158000, category: "snack", emoji: "🥪", traits: [], ingredients: ["موزارلا", "گوجه", "ریحان", "نان چاباتا"], pairings: ["lem"] },
  { id: "nuts", slug: "roasted-nuts", name: "مغزهای بوداده", description: "ترکیب بادام، پسته و فندق", price: 85000, category: "snack", emoji: "🥜", traits: ["سبک", "بدون‌لبنیات"], ingredients: ["بادام", "پسته", "فندق"], pairings: ["cb"] },
  { id: "water", slug: "mineral-water", name: "آب معدنی", description: "۵۰۰ میلی‌لیتر، خنک", price: 22000, category: "snack", emoji: "💧", traits: ["خنک", "سبک", "بدون‌لبنیات"], ingredients: ["آب معدنی"], pairings: [] },
  { id: "pasta", slug: "pesto-pasta", name: "پاستا پستو", description: "پستوی خانگی با پارمزان", price: 245000, category: "food", emoji: "🍝", traits: [], ingredients: ["پنه", "پستوی ریحان", "پارمزان"], pairings: ["lem"] },
  { id: "bowl", slug: "chicken-quinoa-bowl", name: "بول مرغ و کینوا", description: "مرغ گریل، کینوا و سبزیجات", price: 265000, category: "food", emoji: "🥗", traits: ["سبک"], ingredients: ["سینهٔ مرغ", "کینوا", "آووکادو"], pairings: ["lem", "granola"], badge: "سالم" },
];

/* ---------------------- دسترسی‌ها ---------------------- */

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: CategoryId) =>
  categories.find((c) => c.id === id)!;
export const toneOf = (id: CategoryId) => getCategory(id).tone;

export function findProducts(args: {
  query?: string;
  category?: CategoryId;
  traits?: Trait[];
  maxPrice?: number;
}): Product[] {
  const { query, category, traits, maxPrice } = args;
  return products.filter((p) => {
    if (category && p.category !== category) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (traits?.length && !traits.every((t) => p.traits.includes(t))) return false;
    if (query) {
      const q = query.trim();
      if (!p.name.includes(q) && !p.description.includes(q)) return false;
    }
    return true;
  });
}
