"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useRef } from "react";
import { ToolRenderer } from "@/components/generative/ToolRenderer";
import { ChatActionsProvider } from "@/components/generative/chat-actions";
import { Markdown } from "@/components/Markdown";

const SUGGESTIONS = [
  { label: "HITC là công ty gì?", q: "Giới thiệu tổng quan về HITC" },
  { label: "Dịch vụ Cloud có gì?", q: "Liệt kê các dịch vụ cloud của HITC" },
  { label: "Data Center EcoDC", q: "Thông tin Data Center EcoDC Tier 3 của HITC" },
  {
    label: "Tổng đài CSKH 100 agent",
    q: "Mình cần xây tổng đài chăm sóc khách hàng quy mô 100 agent, tư vấn giúp",
  },
  { label: "Backup 50 máy chủ", q: "Cần giải pháp backup cho 50 máy chủ" },
  { label: "Liên hệ", q: "Cho mình thông tin liên hệ HITC" },
];

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({ api: "/api/chat" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Whether the view should keep snapping to the bottom as content grows.
  const stickRef = useRef(true);

  const empty = messages.length === 0;

  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // Track whether the user is near the bottom; if they scroll up to read, stop
  // auto-snapping so we don't yank them back down.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickRef.current = distanceFromBottom < 120;
  }, []);

  // Force-snap on explicit user actions (send / click a card).
  const askAndStick = useCallback(
    (text: string) => {
      stickRef.current = true;
      append({ role: "user", content: text });
      requestAnimationFrame(() => scrollToBottom("smooth"));
    },
    [append, scrollToBottom],
  );

  // Snap when new messages arrive (token streaming updates `messages`).
  useEffect(() => {
    if (stickRef.current) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    }
  }, [messages, scrollToBottom]);

  // Generative UI cards (tool results) mount/expand asynchronously after the
  // message object updates, so observe the content box and keep snapping while
  // the user is anchored to the bottom.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const ro = new ResizeObserver(() => {
      if (stickRef.current) scrollToBottom("auto");
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [empty, scrollToBottom]);

  return (
    <ChatActionsProvider ask={askAndStick}>
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6">
      <Header />

      <section
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-area flex-1 overflow-y-auto pb-40 pt-6"
      >
        {empty ? (
          <Hero onPick={askAndStick} />
        ) : (
          <div ref={contentRef} className="space-y-6">
            {messages.map((m) => {
              const invs = (m as unknown as { toolInvocations?: Array<{ toolName: string; toolCallId: string; state: "partial-call" | "call" | "result"; args?: Record<string, unknown>; result?: unknown }> }).toolInvocations;
              return (
                <MessageBubble key={m.id} role={m.role}>
                  {m.content &&
                    (m.role === "user" ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    ) : (
                      <Markdown>{m.content}</Markdown>
                    ))}
                  {invs && invs.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {invs.map((inv) => (
                        <ToolRenderer key={inv.toolCallId} inv={inv} />
                      ))}
                    </div>
                  )}
                </MessageBubble>
              );
            })}
            {isLoading && <TypingIndicator />}
          </div>
        )}
      </section>

      <Composer
        value={input}
        onChange={handleInputChange}
        onSubmit={(e) => {
          stickRef.current = true;
          handleSubmit(e);
        }}
        disabled={isLoading}
        suggestions={empty ? [] : SUGGESTIONS.slice(0, 3)}
        onPick={askAndStick}
      />
    </main>
    </ChatActionsProvider>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-paper-200 py-5">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-bold text-white shadow-glow">
          H
        </div>
        <div>
          <div className="font-display text-base font-semibold text-ink-900">
            HITC <span className="text-ink-500">· Trợ lý ảo</span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ink-500">
            Powered by restai
          </div>
        </div>
      </div>
      <a
        href="https://www.hitc.vn"
        target="_blank"
        rel="noreferrer"
        className="hidden rounded-full border border-paper-200 bg-white px-3 py-1.5 text-xs text-ink-700 transition hover:border-brand-400/60 hover:text-ink-900 sm:inline-block"
      >
        hitc.vn ↗
      </a>
    </header>
  );
}

function Hero({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="pt-10 sm:pt-16">
      <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-brand-600">
        Trợ lý ảo HITC
      </div>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink-900 sm:text-5xl md:text-6xl">
        Tư vấn hạ tầng số,
        <br />
        <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
          trong một cuộc trò chuyện.
        </span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-700">
        Hỏi về Data Center, Cloud, Internet & truyền dẫn, tổng đài, hay mô tả nhu cầu
        của bạn — trợ lý sẽ trả lời bằng giao diện trực quan, có thể click để tìm hiểu sâu hơn.
      </p>

      <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.q)}
            className="group flex items-center justify-between gap-3 rounded-xl border border-paper-200 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-glow"
          >
            <span className="text-sm text-ink-800">{s.label}</span>
            <span className="text-brand-500 transition group-hover:translate-x-0.5">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xs font-bold text-white">
          H
        </div>
      )}
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-2.5 text-sm text-white shadow-glow"
            : "max-w-[90%] flex-1 text-sm text-ink-800"
        }
      >
        {children}
      </div>
      {isUser && (
        <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-paper-200 bg-white text-xs text-ink-700">
          B
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-ink-500">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xs font-bold text-white">
        H
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-paper-200 bg-white px-3 py-2.5 shadow-soft">
        <span className="dot-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
        <span className="dot-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
        <span className="dot-3 h-1.5 w-1.5 rounded-full bg-brand-500" />
      </div>
    </div>
  );
}

function Composer({
  value,
  onChange,
  onSubmit,
  disabled,
  suggestions,
  onPick,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  suggestions: { label: string; q: string }[];
  onPick: (q: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {suggestions.length > 0 && (
          <div className="pointer-events-auto mb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => onPick(s.q)}
                className="rounded-full border border-paper-200 bg-white/90 px-3 py-1 text-xs text-ink-700 shadow-soft backdrop-blur transition hover:border-brand-400/60 hover:text-ink-900"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={onSubmit}
          className="pointer-events-auto mb-4 flex items-center gap-2 rounded-2xl border border-paper-200 bg-white/95 p-1.5 shadow-ring backdrop-blur-xl"
        >
          <input
            value={value}
            onChange={onChange}
            placeholder="Hỏi về dịch vụ HITC — Data Center, Cloud, Internet, Tổng đài…"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-paper-100 disabled:text-ink-400"
            aria-label="Gửi"
          >
            <span aria-hidden>↑</span>
          </button>
        </form>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-paper-50 via-paper-50/90 to-transparent" />
    </div>
  );
}
