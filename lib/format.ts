const fa = new Intl.NumberFormat("fa-IR");

/** عدد را با ارقام فارسی و جداکنندهٔ هزارگان برمی‌گرداند */
export const n = (value: number) => fa.format(value);

/** قیمت با واحد تومان */
export const toman = (value: number) => `${fa.format(value)} تومان`;

/** درصد خدمات میز */
export const SERVICE_RATE = 0.09;
export const withService = (subtotal: number) =>
  Math.round(subtotal * (1 + SERVICE_RATE));
