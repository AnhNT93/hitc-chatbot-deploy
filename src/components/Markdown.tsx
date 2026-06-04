"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed text-ink-800">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="mb-2 last:mb-0 space-y-1.5 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 last:mb-0 list-decimal space-y-1.5 pl-5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-ink-800">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="flex-1 leading-relaxed">{children}</span>
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-500"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-paper-100 px-1.5 py-0.5 text-[0.85em] font-mono text-ink-900">
              {children}
            </code>
          ),
          h1: ({ children }) => (
            <h3 className="mb-2 mt-3 font-display text-lg font-semibold text-ink-900">{children}</h3>
          ),
          h2: ({ children }) => (
            <h3 className="mb-2 mt-3 font-display text-base font-semibold text-ink-900">{children}</h3>
          ),
          h3: ({ children }) => (
            <h4 className="mb-1.5 mt-2 font-display text-sm font-semibold text-ink-900">{children}</h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-brand-500/40 pl-3 text-ink-700">
              {children}
            </blockquote>
          ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
