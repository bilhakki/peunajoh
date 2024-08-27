"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

const backendUrl = "http://localhost:3000";

// interface Message {
//   id: string;
//   text: string;
//   // Tambahkan properti lain sesuai kebutuhan
// }
// interface ChatResponse {
//   messages: Message[];
// }
interface ChatContextProps {
  chat: (message: string) => Promise<void>;
  message: any | null;
  onMessagePlayed: () => void;
  loading: boolean;
  cameraZoomed: boolean;
  setCameraZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chat = async (message: string) => {
    setLoading(true);
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data: any = await response.json();
    setMessages((prevMessages) => [...prevMessages, ...data.messages]);
    setLoading(false);
  };

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessages((prevMessages) => prevMessages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
