import { getClient, TRANSCRIBE_MODEL } from "@/lib/agent/provider";

export const maxDuration = 30;

/* مسیر جایگزین تشخیص گفتار برای مرورگرهایی که Web Speech API ندارند
   (سافاری iOS). هوک lib/voice/useSpeech.ts خودکار به اینجا می‌آید. */
export async function POST(req: Request) {
  const client = getClient();
  if (!client) {
    return Response.json(
      { text: "", error: "کلید OpenAI تنظیم نشده است" },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const audio = form.get("audio");
  if (!(audio instanceof File)) {
    return Response.json({ text: "", error: "فایل صوتی ارسال نشد" }, { status: 400 });
  }

  try {
    const result = await client.audio.transcriptions.create({
      model: TRANSCRIBE_MODEL,
      file: audio,
      language: "fa",
    });
    return Response.json({ text: result.text });
  } catch {
    return Response.json({ text: "", error: "رونویسی انجام نشد" }, { status: 502 });
  }
}
