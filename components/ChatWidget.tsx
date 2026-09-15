"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-data";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi — I can answer questions about ${siteConfig.name}'s work, services, and background. What would you like to know?`,
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only decoration, not a real assistant turn — exclude
        // it from what's actually sent to the model.
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: body.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={`Chat with an assistant about ${siteConfig.name}`}
          className="w-[min(24rem,calc(100vw-3rem))] h-[28rem] bg-surface rounded-xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-on-primary">
            <span className="font-headline-md text-sm">Ask about my work</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="hover:opacity-80"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                close
              </span>
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface"
                }`}
              >
                {message.content}
              </div>
            ))}
            {sending && (
              <div className="bg-surface-container-high text-on-surface-variant rounded-lg px-3 py-2 text-sm w-fit">
                Thinking…
              </div>
            )}
            {error && (
              <p role="alert" className="text-error text-xs">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-outline-variant/20">
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={sending}
              maxLength={2000}
              className="flex-1 border border-outline-variant rounded-lg px-3 py-2 text-sm bg-surface focus:border-secondary focus:ring-0 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="bg-primary text-on-primary rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                send
              </span>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:bg-primary-container transition-all active:scale-95"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          {open ? "close" : "chat"}
        </span>
      </button>
    </div>
  );
}
