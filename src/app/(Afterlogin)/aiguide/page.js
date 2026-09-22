"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import GuideDashboard from "@/components/aiguide/GuideDashboard";
import ActiveChatView from "@/components/aiguide/ActiveChatView";
import ChatInput from "@/components/aiguide/ChatInput";

export default function AIGuidePage() {
  const [activeChat, setActiveChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State to handle the Coming Soon Trophy Modal Pop-up
  const [isTrophyOpen, setIsTrophyOpen] = useState(false);

  // Helper utility to get standard formatted timestamp string
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    setActiveChat(true);
    const currentTime = getCurrentTime();

    const userMessage = { role: "user", text: textToSend, time: currentTime };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorText = typeof data.error === "object"
          ? data.error.message
          : data.error;

        if (response.status === 401) {
          throw new Error("Your session has expired. Please sign in again.");
        }

        throw new Error(errorText || "The AI guide is temporarily unavailable. Please try again.");
      }

      const aiReplyText = data?.choices?.[0]?.message?.content;
      if (!aiReplyText) {
        throw new Error("The AI guide returned an empty response. Please try again.");
      }

      const aiMessage = {
        role: "assistant",
        text: aiReplyText,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat Error:", err);
      
      // Render the actual readable error text in the chat UI
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          text: err.message || "An unexpected error occurred. Please try again.", 
          time: getCurrentTime() 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 font-sans flex flex-col justify-between pb-20 dark:bg-zinc-950 md:pb-0">
      
      {/* Dynamic Main Dashboard Container */}
      <div className="flex-1 w-full mx-auto px-4 pt-4 md:px-8 md:pt-8 lg:max-w-7xl lg:px-12">
        {!activeChat ? (
          <GuideDashboard 
            onSelectPrompt={handleSendMessage} 
            onTrophyClick={() => setIsTrophyOpen(true)} 
          />
        ) : (
          <ActiveChatView 
            messages={messages} 
            loading={loading} 
            onSelectPrompt={handleSendMessage}
            onBack={() => { setActiveChat(false); setMessages([]); }} 
          />
        )}
      </div>

      {/* Sticky Bottom Action input bar */}
      <div className="w-full dark:bg-zinc-950/95 dark:bg-none mx-auto px-4 fixed bottom-16 left-0 right-0 bg-gradient-to-t from-[#f5f7fb] via-[#f5f7fb]/95 to-transparent pt-4 pb-4 z-30 md:bottom-0 md:left-64 md:w-[calc(100%-16rem)] md:px-8 md:pb-6 lg:px-12">
        <ChatInput 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onSend={() => handleSendMessage(inputMessage)}
        />
        {!activeChat && (
          <p className="text-[10px] text-center text-slate-400 font-medium mt-3 px-6 select-none">
            AI responses are for guidance, not a substitute for professional advice
          </p>
        )}
      </div>

      {/* TROPHY POPUP OVERLAY MODAL */}
      {isTrophyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[1px] animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl overflow-visible max-w-[380px] w-full p-2 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsTrophyOpen(false)}
              className="absolute -top-3 -right-3 bg-[#0A1D87] text-white p-2 rounded-full shadow-lg hover:bg-blue-900 active:scale-95 transition-all z-10"
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={3} />
            </button>

            <div className="w-full h-auto overflow-hidden rounded-2xl bg-white">
              <img 
                src="/comming-soon.png" 
                alt="Coming Soon Spiritual Banner" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}