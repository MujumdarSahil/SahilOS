"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { SafeAction, SafeActionSchema, getActionLabel } from "@/lib/ai/actions";
import { JarvisVoiceControls } from "./JarvisVoiceControls";
import { jarvisVoiceSynthesizer } from "@/lib/speech/synthesis";

interface JarvisDockProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenProjectDossier?: (projectId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  timestamp: string;
  sources?: string[];
  action?: SafeAction;
  isError?: boolean;
}

const SUGGESTIONS = [
  "What has Sahil built with LLMs?",
  "Tell me about MedAgentX",
  "Summarize his experience at NIC",
  "List his certifications with links",
  "Show me his publications",
];

export const JarvisDock: React.FC<JarvisDockProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenProjectDossier,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "jarvis",
      text: `Greetings. I am JARVIS, Sahil Mujumdar's AI copilot and operating system interface. Ask me anything regarding his research, machine learning systems, verified credentials, or career trajectory.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Cancel speech synthesis when dock closes or unmounts
  useEffect(() => {
    return () => {
      jarvisVoiceSynthesizer.stop();
      setIsSpeaking(false);
    };
  }, []);

  const handleClose = () => {
    jarvisVoiceSynthesizer.stop();
    setIsSpeaking(false);
    onClose();
  };

  if (!isOpen) return null;

  const executeAction = (action?: SafeAction) => {
    if (!action) return;

    // Validate action before execution
    const parse = SafeActionSchema.safeParse(action);
    if (!parse.success) return;

    const validated = parse.data;
    if (validated.type === "navigate" && onNavigateSection) {
      onNavigateSection(validated.targetSection);
    } else if (validated.type === "open_dossier" && onOpenProjectDossier) {
      onOpenProjectDossier(validated.dossierId);
    } else if (validated.type === "open_resume") {
      window.open("/resume-sahil.pdf", "_blank");
    }
  };

  const handleSend = async (messageToSend?: string) => {
    const query = (messageToSend || input).trim();
    if (!query || isLoading) return;

    // Stop ongoing speech
    jarvisVoiceSynthesizer.stop();
    setIsSpeaking(false);

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastFailedMessage(null);

    // Extract minimal history for context
    const historyPayload = messages.slice(-4).map((m) => ({
      role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      let validatedAction: SafeAction | undefined = undefined;
      if (data.action) {
        const actionResult = SafeActionSchema.safeParse(data.action);
        if (actionResult.success) {
          validatedAction = actionResult.data;
        }
      }

      const replyText = data.response || "No response received.";

      const jarvisMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "jarvis",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: Array.isArray(data.sources) ? data.sources : undefined,
        action: validatedAction,
      };

      setMessages((prev) => [...prev, jarvisMessage]);

      // Speak response if voice audio output is unmuted
      if (!jarvisVoiceSynthesizer.getMuted()) {
        jarvisVoiceSynthesizer.speak(
          replyText,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false),
          () => setIsSpeaking(false)
        );
      }
    } catch {
      setLastFailedMessage(query);
      const errorMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "jarvis",
        text: "Direct neural link encountered an obstacle. Tap 'Retry Directive' or consult the Mission Dossiers and Capability Matrix.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    jarvisVoiceSynthesizer.stop();
    setIsSpeaking(false);
    setMessages([
      {
        id: "init-reset",
        sender: "jarvis",
        text: `Terminal reset complete. All diagnostic logs cleared. Standing by for your instructions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setLastFailedMessage(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="JARVIS AI Assistant Console"
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isMinimized
          ? "bottom-4 right-4 w-72"
          : "bottom-4 right-4 w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh]"
      } hud-panel bg-gunmetal/95 rounded-lg border border-cyan/40 flex flex-col overflow-hidden`}
    >
      {/* Title Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gunmetal-surface border-b border-cyan/20 select-none">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 border border-cyan/40">
            <Bot className="h-4 w-4 text-cyan animate-pulse" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-ice flex items-center space-x-1.5">
              <span>JARVIS</span>
              <span className="rounded bg-cyan/15 px-1 py-0.2 text-[9px] text-cyan border border-cyan/30">
                ACTIVE
              </span>
            </div>
            <div className="font-mono text-[9px] text-stark-green flex items-center space-x-1">
              <ShieldCheck className="h-2.5 w-2.5" />
              <span>GROUNDED RETRIEVAL // ZERO-TRUST</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-ice-muted">
          <button
            onClick={handleReset}
            aria-label="Reset conversation"
            title="Reset Terminal Session"
            className="p-1 hover:text-amber rounded hover:bg-gunmetal"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Maximize assistant" : "Minimize assistant"}
            className="p-1 hover:text-cyan rounded hover:bg-gunmetal"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={handleClose}
            aria-label="Close assistant"
            className="p-1 hover:text-cyan rounded hover:bg-gunmetal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Stream */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    msg.sender === "user"
                      ? "bg-amber text-obsidian"
                      : "bg-cyan text-obsidian"
                  }`}
                >
                  {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div
                  className={`max-w-[85%] rounded p-3 ${
                    msg.sender === "user"
                      ? "bg-amber/15 text-ice border border-amber/30 text-right"
                      : msg.isError
                      ? "bg-amber/15 text-amber border border-amber/40 text-left"
                      : "bg-gunmetal-surface text-ice border border-cyan/20 text-left"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Sources List */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-cyan/15 flex flex-wrap gap-1 items-center">
                      <span className="font-mono text-[9px] text-ice-muted uppercase">SOURCES:</span>
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-gunmetal text-cyan border border-cyan/25"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Proposed Safe Action Button */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-cyan/20">
                      <button
                        onClick={() => executeAction(msg.action)}
                        className="flex items-center space-x-1.5 rounded bg-cyan/20 hover:bg-cyan/30 text-cyan border border-cyan/40 px-2.5 py-1 font-mono text-[10px] font-semibold transition"
                      >
                        <span>{getActionLabel(msg.action)}</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  <span className="block mt-1 font-mono text-[9px] text-ice-muted/60">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-cyan font-mono text-xs pl-8">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>CONSULTING VERIFIED ARCHIVE...</span>
              </div>
            )}

            {lastFailedMessage && !isLoading && (
              <div className="flex items-center justify-between p-2 rounded bg-amber/10 border border-amber/30 text-[11px] font-mono text-amber">
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Query failed</span>
                </div>
                <button
                  onClick={() => handleSend(lastFailedMessage)}
                  className="underline hover:text-ice ml-2"
                >
                  Retry Directive
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-cyan/10 bg-obsidian-card flex flex-wrap gap-1.5 overflow-x-auto">
            {SUGGESTIONS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSend(prompt)}
                className="rounded bg-gunmetal px-2 py-1 font-mono text-[10px] text-cyan hover:bg-cyan/15 hover:border-cyan/40 border border-cyan/15 transition truncate max-w-full disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Voice Input & Speech Output Tactical Strip */}
          <JarvisVoiceControls
            onTranscriptReceived={(transcript) => handleSend(transcript)}
            isSpeaking={isSpeaking}
            onStopSpeaking={() => setIsSpeaking(false)}
            disabled={isLoading}
          />

          {/* Text Input Box */}
          <div className="p-3 bg-gunmetal-surface border-t border-cyan/20 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type directive or query JARVIS..."
              className="flex-1 bg-obsidian rounded border border-cyan/20 px-3 py-2 font-mono text-xs text-ice placeholder-ice-muted/50 focus:outline-none focus:border-cyan disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              aria-label="Send message to JARVIS"
              className="flex h-8 w-8 items-center justify-center rounded bg-cyan text-obsidian hover:bg-cyan-bright transition font-bold disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
