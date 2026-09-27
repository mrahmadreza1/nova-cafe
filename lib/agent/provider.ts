import OpenAI from "openai";

/* ============================================================
   تنها نقطهٔ اتصال به مدل زبانی.
   اگر بعداً خواستید ارائه‌دهنده را عوض کنید، فقط همین فایل
   تغییر می‌کند و بقیهٔ پروژه دست‌نخورده می‌ماند.
   ============================================================ */

export const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

/** مدل رونویسی صدا برای مرورگرهایی که Web Speech ندارند (سافاری iOS) */
export const TRANSCRIBE_MODEL =
  process.env.OPENAI_TRANSCRIBE_MODEL ?? "whisper-1";

/** اگر کلید تنظیم نشده باشد null برمی‌گردد تا مسیر قاعده‌محور محلی فعال شود */
export function getClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  return new OpenAI({
    apiKey,
    // برای Azure OpenAI یا هر درگاه سازگار با OpenAI
    baseURL: process.env.OPENAI_BASE_URL,
  });
}
