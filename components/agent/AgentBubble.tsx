"use client";

import { motion } from "framer-motion";
import { AgentAvatar } from "./Avatar";
import { RecommendationCard } from "./RecommendationCard";
import { bubbleIn, staggerList } from "@/lib/motion";
import { getProduct } from "@/content/menu";

export function AgentBubble({
  text,
  productIds = [],
}: {
  text: string;
  productIds?: string[];
}) {
  const items = productIds.map(getProduct).filter(Boolean);

  return (
    <motion.div
      variants={bubbleIn}
      initial="hidden"
      animate="show"
      className="flex max-w-[92%] gap-2"
    >
      <AgentAvatar />
      <div className="min-w-0">
        <p
          aria-live="polite"
          className="rounded-[20px] rounded-ss-[7px] border border-border bg-surface-2 px-4 py-2.5 text-[14.2px] leading-[1.85]"
        >
          {text}
        </p>
        {items.length > 0 && (
          <motion.div
            variants={staggerList}
            initial="hidden"
            animate="show"
            className="mt-1.5 flex flex-col gap-2"
          >
            {items.map((p) => (
              <RecommendationCard key={p!.id} product={p!} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      variants={bubbleIn}
      initial="hidden"
      animate="show"
      className="ms-auto max-w-[88%]"
    >
      <p className="rounded-[20px] rounded-se-[7px] bg-primary px-4 py-2.5 text-[14.2px] leading-[1.85] text-white shadow-action">
        {text}
      </p>
    </motion.div>
  );
}
