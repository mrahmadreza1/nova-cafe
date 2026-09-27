"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { AppBar } from "@/components/shared/AppBar";
import { TabBar } from "@/components/shared/TabBar";
import { AgentBubble, UserBubble } from "@/components/agent/AgentBubble";
import { TypingDots } from "@/components/agent/TypingDots";
import { QuickChips } from "@/components/agent/QuickChips";
import { Composer } from "@/components/agent/Composer";
import { useSession } from "@/lib/store/session";
import { useCart } from "@/lib/store/cart";

export default function ChatPage() {
  const messages = useSession((s) => s.messages);
  const pushMessage = useSession((s) => s.pushMessage);
  const lines = useCart((s) => s.lines);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e5, behavior: "smooth" });
  }, [messages.length, pending]);

  async function send(text: string) {
    pushMessage({ role: "user", text });
    setPending(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", text }].map((m) => ({
            role: m.role,
            text: m.text,
          })),
          cart: lines.map((l) => ({
            id: l.product.id,
            name: l.product.name,
            qty: l.qty,
          })),
        }),
      });
      const data = await res.json();
      pushMessage({ role: "agent", text: data.reply, productIds: data.productIds });
    } catch {
      pushMessage({
        role: "agent",
        text: "ارتباط برقرار نشد. دوباره بفرستید یا مستقیم از منو انتخاب کنید.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <AppBar
        title="نُوا"
        subtitle="دستیار سفارش کافه · آنلاین"
        backTo="/"
        action={
          <Link
            href="/menu"
            aria-label="منو"
            className="grid size-[34px] place-items-center rounded-xl bg-surface-3"
          >
            <LayoutGrid className="size-[18px]" strokeWidth={1.8} />
          </Link>
        }
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-4 pb-2 pt-4">
          {messages.map((m) =>
            m.role === "agent" ? (
              <AgentBubble key={m.id} text={m.text} productIds={m.productIds} />
            ) : (
              <UserBubble key={m.id} text={m.text} />
            )
          )}
          {pending && <TypingDots />}
        </div>
      </div>

      <QuickChips onPick={send} />
      <Composer onSend={send} disabled={pending} />
      <TabBar />
    </>
  );
}
