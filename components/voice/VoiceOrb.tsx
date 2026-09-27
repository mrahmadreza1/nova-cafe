"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";

const BARS = 21;

export function VoiceOrb({
  recording,
  onToggle,
}: {
  recording: boolean;
  onToggle: () => void;
}) {
  const [levels, setLevels] = useState<number[]>(Array(BARS).fill(6));

  /* موج صوتی از AnalyserNode واقعی تغذیه می‌شود، نه از انیمیشن ساختگی */
  useEffect(() => {
    if (!recording) {
      setLevels(Array(BARS).fill(6));
      return;
    }
    let raf = 0;
    let ctx: AudioContext | undefined;
    let stream: MediaStream | undefined;
    let cancelled = false;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) return;
        ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const loop = () => {
          analyser.getByteFrequencyData(data);
          setLevels(
            Array.from({ length: BARS }, (_, i) => 6 + (data[i % data.length] / 255) * 40)
          );
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch {
        /* دسترسی رد شد: میله‌ها در حالت پایه می‌مانند */
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      void ctx?.close();
    };
  }, [recording]);

  return (
    <div className="relative grid place-items-center">
      <AnimatePresence>
        {recording &&
          [0, 0.8, 1.6].map((delay) => (
            <motion.span
              key={delay}
              className="absolute rounded-full border border-primary/25"
              initial={{ width: 150, height: 150, opacity: 0.85 }}
              animate={{ width: 320, height: 320, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        aria-label={recording ? "پایان ضبط" : "شروع ضبط"}
        aria-pressed={recording}
        className="relative z-10 grid size-[148px] place-items-center rounded-full bg-gradient-to-br from-[#5B8DEF] to-[#1F53E0] text-white shadow-[0_20px_50px_rgb(47_107_255/.4)]"
      >
        <Mic className="size-[46px]" strokeWidth={1.6} />
      </motion.button>

      <div className="mt-6 flex h-[52px] items-center justify-center gap-1" aria-hidden>
        {levels.map((h, i) => (
          <span
            key={i}
            style={{ height: h }}
            className={`w-1 rounded-full transition-[height] duration-100 ${
              recording ? "bg-primary" : "bg-primary-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
