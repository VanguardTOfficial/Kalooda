"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const greetingInitialized = useRef(false);

  useEffect(() => {
    if (!greetingInitialized.current) {
      greetingInitialized.current = true;
      setMessages([{ role: "assistant", content: t("chatbotGreeting") }]);
    }
  }, [t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? t("chatbotError") },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chatbotOffline") },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-lux-gold/50 bg-lux-espresso text-lux-cream shadow-[0_8px_30px_rgba(26,21,18,0.35)] transition-[transform,box-shadow] hover:scale-105 hover:shadow-lg active:scale-95"
        aria-label={t("toggleChat")}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-[5.5rem] end-5 z-50 flex h-[28rem] w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-lg border border-lux-border bg-lux-surface-elevated shadow-2xl animate-slide-up">
          <div className="flex items-center gap-2 border-b border-lux-border bg-gradient-to-r from-lux-espresso to-lux-walnut px-4 py-3 text-lux-cream">
            <Bot className="h-5 w-5 text-lux-gold-light" aria-hidden />
            <span className="font-serif text-sm font-semibold">{t("sweetBot")}</span>
            <span className="ms-auto text-xs text-lux-cream/70">{t("chatbotSubtitle")}</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-lux-espresso text-lux-cream"
                      : "border border-lux-gold/40 bg-lux-cream text-lux-gold"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <Bot className="h-3.5 w-3.5" aria-hidden />
                  )}
                </div>
                <div
                  className={`max-w-[78%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-lux-espresso text-lux-cream"
                      : "border border-lux-border bg-lux-cream/80 text-lux-ink"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-lux-gold/40 bg-lux-cream text-lux-gold">
                  <Bot className="h-3.5 w-3.5" aria-hidden />
                </div>
                <div className="rounded-lg border border-lux-border bg-lux-cream/60 px-4 py-2 text-sm text-lux-muted">
                  {t("typing")}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-lux-border bg-lux-surface px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbotPlaceholder")}
              className="flex-1 rounded-md border border-lux-border bg-lux-ivory px-3 py-2 text-sm text-lux-ink outline-none placeholder:text-lux-muted focus:border-lux-gold focus:ring-1 focus:ring-lux-gold/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-lux-espresso text-lux-cream transition-colors hover:bg-lux-walnut disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
