"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useToast } from "@/lib/store/toast";
import { EASE } from "@/lib/motion";

export function Toast() {
  const message = useToast((s) => s.message);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="pointer-events-none fixed inset-x-4 bottom-[92px] z-50 mx-auto flex max-w-[480px] items-center gap-2.5 rounded-[18px] bg-ink px-4 py-3 text-[13.5px] font-medium text-white shadow-float"
        >
          <Check className="size-4" strokeWidth={2.4} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
