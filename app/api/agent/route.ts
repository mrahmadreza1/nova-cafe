import { getClient, MODEL } from "@/lib/agent/provider";
import { menuDigest, systemPrompt } from "@/lib/agent/prompt";
import { localReply, type AgentReply } from "@/lib/agent/fallback";
import { products } from "@/content/menu";

export const maxDuration = 30;

type Body = {
  messages: { role: "user" | "agent"; text: string }[];
  cart?: { id: string; name: string; qty: number }[];
};

const validIds = new Set(products.map((p) => p.id));

/** خروجی مدل را پاک و اعتبارسنجی می‌کند تا محصول ناموجود به رابط نرسد */
function parse(raw: string): AgentReply | null {
  try {
    const json = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(json) as AgentReply;
    if (typeof data.reply !== "string") return null;
    return {
      reply: data.reply,
      productIds: (data.productIds ?? []).filter((id) => validIds.has(id)).slice(0, 3),
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const { messages, cart = [] }: Body = await req.json();
  const last = messages[messages.length - 1]?.text ?? "";
  const client = getClient();

  // بدون کلید، موتور قاعده‌محور محلی پاسخ می‌دهد
  if (!client) return Response.json(localReply(last));

  try {
    const res = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.5,
      max_tokens: 700,
      // مدل موظف است JSON معتبر برگرداند
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            systemPrompt,
            `منوی کافه (id | نام | دسته | قیمت | ویژگی‌ها | توضیح):\n${menuDigest}`,
            `سبد فعلی: ${cart.length ? JSON.stringify(cart) : "خالی"}`,
          ].join("\n\n"),
        },
        ...messages.slice(-10).map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        })),
      ],
    });

    const text = res.choices[0]?.message?.content ?? "";
    return Response.json(parse(text) ?? localReply(last));
  } catch {
    // خطای شبکه، سهمیه یا فیلتر: سفارش‌گیری متوقف نمی‌شود
    return Response.json(localReply(last));
  }
}
