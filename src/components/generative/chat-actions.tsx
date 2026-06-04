"use client";

import { createContext, useContext } from "react";

interface ChatActions {
  /** Gửi một câu hỏi (dưới vai trò user) vào hội thoại. */
  ask: (text: string) => void;
}

const ChatActionsContext = createContext<ChatActions | null>(null);

export function ChatActionsProvider({
  ask,
  children,
}: {
  ask: (text: string) => void;
  children: React.ReactNode;
}) {
  return (
    <ChatActionsContext.Provider value={{ ask }}>
      {children}
    </ChatActionsContext.Provider>
  );
}

export function useChatActions(): ChatActions {
  return useContext(ChatActionsContext) ?? { ask: () => {} };
}
