"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AppBar } from "@/components/shared/AppBar";
import { TabBar } from "@/components/shared/TabBar";
import { VoiceOrb } from "@/components/voice/VoiceOrb";
import { TranscriptLine } from "@/components/voice/TranscriptLine";
import { AgentAvatar } from "@/components/agent/Avatar";
import { RecommendationCard } from "@/components/agent/RecommendationCard";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/lib/voice/useSpeech";
import { useSession } from "@/lib/store/session";
import { useCart } from "@/lib/store/cart";
import { fadeUp, staggerList } from "@/lib/motion";
import { getProduct } from "@/content/menu";

export default function VoicePage() {
  const pushMessage = useSession((s) => s.pushMessage);
  const lines = useCart((s) => s.lines);
  const [reply, setReply] = useState<{ text: string; productIds: string[] } | null>(null);

  /* متن تشخیص‌داده‌شده به همان ریسمان گفتگوی چت تزریق می‌شود؛
     تاریخچه بین صدا و متن یکی است. */
  const onFinal = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      pushMessage({ role: "user", text });
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", text }],
          cart: lines.map((l) => ({ id: l.product.id, name: l.product.name, qty: l.qty })),
        }),
      });
      const data = await res.json();
      setReply({ text: data.reply, productIds: data.productIds ?? [] });
      pushMessage({ role: "agent", text: data.reply, productIds: data.productIds });
    },
    [lines, pushMessage]
  );

  const { recording, transcript, supported, toggle } = useSpeech(onFinal);

  return (
    <>
      <AppBar title="سفارش صوتی" subtitle="با نُوا حرف بزنید" backTo="/" />

      <div className="flex flex-1 flex-col items-center justify-between overflow-y-auto bg-[radial-gradient(70%_45%_at_50%_12%,var(--color-primary-soft),transparent_70%)] px-5 py-6 text-center">
        <TranscriptLine text={transcript} recording={recording} />

        <div className="my-auto">
          <VoiceOrb recording={recording} onToggle={toggle} />
        </div>

        {reply ? (
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="w-full text-start">
            <div className="rounded-[24px] border border-border bg-surface p-4 shadow-card">
              <div className="flex items-start gap-2.5">
                <AgentAvatar />
                <p className="text-[13.8px] leading-[1.9]">{reply.text}</p>
              </div>
              {reply.productIds.length > 0 && (
                <motion.div
                  variants={staggerList}
                  initial="hidden"
                  animate="show"
                  className="mt-3 flex flex-col gap-2"
                >
                  {reply.productIds.map(getProduct).filter(Boolean).map((p) => (
                    <RecommendationCard key={p!.id} product={p!} />
                  ))}
                </motion.div>
              )}
            </div>
            <Link href="/chat" className="mt-2.5 block">
              <Button variant="ghost" block>
                ادامه در چت متنی
              </Button>
            </Link>
          </motion.div>
        ) : (
          <p className="max-w-[26ch] text-sm leading-[1.9] text-ink-2">
            {supported
              ? "مثلاً بگویید: «یک لاته می‌خواهم با یک دسر سبک کنارش»"
              : "مرورگر شما تشخیص گفتار درجا ندارد؛ صدا ضبط و رونویسی می‌شود."}
          </p>
        )}
      </div>

      <TabBar />
    </>
  );
}
