"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* تفاوت پلتفرم‌ها پشت همین هوک پنهان می‌ماند:
   کروم و اج → Web Speech API با lang="fa-IR"
   سافاری iOS → ضبط صدا و ارسال به /api/transcribe */

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
  return Ctor ? (new Ctor() as SpeechRecognitionLike) : null;
}

export function useSpeech(onFinal: (text: string) => void) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    setSupported(Boolean(getRecognition()));
  }, []);

  const stop = useCallback(() => {
    recRef.current?.stop();
    mediaRef.current?.stop();
    setRecording(false);
  }, []);

  const start = useCallback(async () => {
    setTranscript("");
    const rec = getRecognition();

    if (rec) {
      rec.lang = "fa-IR";
      rec.interimResults = true;
      rec.continuous = false;
      rec.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join(" ");
        setTranscript(text);
        if (e.results[e.results.length - 1].isFinal) onFinal(text);
      };
      rec.onerror = () => setRecording(false);
      rec.onend = () => setRecording(false);
      recRef.current = rec;
      rec.start();
      setRecording(true);
      return;
    }

    // مسیر جایگزین: ضبط و رونویسی سمت سرور
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const media = new MediaRecorder(stream);
    chunksRef.current = [];
    media.ondataavailable = (e) => chunksRef.current.push(e.data);
    media.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("audio", blob);
      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      const { text } = await res.json();
      setTranscript(text);
      onFinal(text);
    };
    mediaRef.current = media;
    media.start();
    setRecording(true);
  }, [onFinal]);

  return { recording, transcript, supported, start, stop, toggle: () => (recording ? stop() : start()) };
}
