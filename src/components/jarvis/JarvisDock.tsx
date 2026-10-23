"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  Cpu,
  Bot,
  User,
  Sparkles,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { certificationsData } from "@/data/certifications";
import { publicationsData } from "@/data/publications";

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Local Grounded Knowledge Resolver for Phase 1
  const resolveQuery = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("llm") || q.includes("rag") || q.includes("omnitutor")) {
      return `Sahil engineered OmniTutor AI (a resilient multi-LLM orchestrator routing prompts dynamically across OpenAI, Groq, and Gemini with FAISS vector indexing and circuit breaker fallbacks) and MedAgentX (an agentic clinical AI platform with programmable multi-agent workflows and RAG).`;
    }

    if (q.includes("medagentx") || q.includes("doctor")) {
      const p = projectsData.find((proj) => proj.id === "medagentx");
      return `MedAgentX is an Agentic AI Platform for Clinical Decision Support. Built with Python, FastAPI, FAISS, and multi-agent verification guardrails to eliminate hallucination in medical reasoning. Research paper is currently in review.`;
    }

    if (q.includes("nic") || q.includes("informatics") || q.includes("government")) {
      const exp = experienceData.find((e) => e.id === "national-informatics-centre");
      return `At the National Informatics Centre (NIC), Government of India, Sahil served as a Data Analyst Intern (July 2024 – June 2025). He developed an election dashboard resulting in a 30% improvement in data accessibility, performed security audits driving a 40% security enhancement, and implemented Redis caching cutting response times by 25%.`;
    }

    if (q.includes("cert") || q.includes("credential")) {
      const names = certificationsData.map((c) => `${c.name} (${c.issuer})`).join("; ");
      return `Sahil holds 8 verified credentials including: ${names}. All are accessible via the Credential Registry section.`;
    }

    if (q.includes("paper") || q.includes("publication") || q.includes("research")) {
      const pubs = publicationsData.map((p) => `"${p.title}" (${p.status} at ${p.venue})`).join("\n\n");
      return `Sahil has 2 major publication records:\n\n${pubs}`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone")) {
      return `Sahil is based in Mumbai, India and is available for high-impact AI/ML roles. Reach him directly at ${profileData.email} or call ${profileData.phoneDisplay}.`;
    }

    if (q.includes("tobox") || q.includes("experience") || q.includes("work")) {
      return `Sahil currently works as a Jr. Data Scientist at Tobox Ventures (July 2025 – Present) building predictive pipelines and analytical ML models. Previously he was at National Informatics Centre (NIC) and Zscaler.`;
    }

    return `I have recorded your query. In Phase 4, full neural streaming with server-side LLMs is linked to this terminal. You can explore verified details right now in the Mission Dossiers and Capability Matrix sections.`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = resolveQuery(currentInput);
      const jarvisMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "jarvis",
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, jarvisMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="JARVIS AI Assistant Console"
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isMinimized
          ? "bottom-4 right-4 w-72"
          : "bottom-4 right-4 w-[92vw] sm:w-[440px] h-[550px] max-h-[85vh]"
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
            <div className="font-mono text-[9px] text-ice-muted">
              GROUNDED KNOWLEDGE AGENT
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-ice-muted">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Maximize assistant" : "Minimize assistant"}
            className="p-1 hover:text-cyan rounded hover:bg-gunmetal"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
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
                  className={`max-w-[80%] rounded p-3 ${
                    msg.sender === "user"
                      ? "bg-amber/15 text-ice border border-amber/30 text-right"
                      : "bg-gunmetal-surface text-ice border border-cyan/20 text-left"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span className="block mt-1 font-mono text-[9px] text-ice-muted/60">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-cyan font-mono text-xs pl-8">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>PROCESSING INTEL...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-cyan/10 bg-obsidian-card flex flex-wrap gap-1.5 overflow-x-auto">
            {SUGGESTIONS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(prompt);
                }}
                className="rounded bg-gunmetal px-2 py-1 font-mono text-[10px] text-cyan hover:bg-cyan/15 hover:border-cyan/40 border border-cyan/15 transition truncate max-w-full"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-gunmetal-surface border-t border-cyan/20 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Query JARVIS regarding Sahil's work..."
              className="flex-1 bg-obsidian rounded border border-cyan/20 px-3 py-2 font-mono text-xs text-ice placeholder-ice-muted/50 focus:outline-none focus:border-cyan"
            />
            <button
              onClick={handleSend}
              aria-label="Send message to JARVIS"
              className="flex h-8 w-8 items-center justify-center rounded bg-cyan text-obsidian hover:bg-cyan-bright transition font-bold"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
