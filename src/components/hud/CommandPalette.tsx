"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  FileDown,
  Layers,
  Briefcase,
  Cpu,
  BookOpen,
  Award,
  MessageSquare,
  Mail,
  ExternalLink,
  X,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProjectDossier: (projectId: string) => void;
  onToggleJarvis: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "NAVIGATION" | "DOSSIERS" | "JARVIS & SYSTEM" | "CONTACT & REPO";
  shortcut?: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenProjectDossier,
  onToggleJarvis,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-command-center",
      title: "Navigate: Command Center Core",
      category: "NAVIGATION",
      shortcut: "G C",
      icon: Cpu,
      action: () => onNavigateSection("command-center"),
    },
    {
      id: "nav-dossiers",
      title: "Navigate: Mission Dossiers",
      category: "NAVIGATION",
      shortcut: "G D",
      icon: Layers,
      action: () => onNavigateSection("dossiers"),
    },
    {
      id: "nav-experience",
      title: "Navigate: Experience Timeline",
      category: "NAVIGATION",
      shortcut: "G E",
      icon: Briefcase,
      action: () => onNavigateSection("experience"),
    },
    {
      id: "nav-constellation",
      title: "Navigate: Neural Knowledge Matrix",
      category: "NAVIGATION",
      shortcut: "G M",
      icon: Cpu,
      action: () => onNavigateSection("constellation"),
    },
    {
      id: "nav-publications",
      title: "Navigate: Research Archive",
      category: "NAVIGATION",
      shortcut: "G R",
      icon: BookOpen,
      action: () => onNavigateSection("publications"),
    },
    {
      id: "nav-certifications",
      title: "Navigate: Credential Registry",
      category: "NAVIGATION",
      shortcut: "G K",
      icon: Award,
      action: () => onNavigateSection("certifications"),
    },
    // Projects
    ...projectsData.map((project) => ({
      id: `project-${project.id}`,
      title: `Inspect Dossier: ${project.codename} (${project.category})`,
      category: "DOSSIERS" as const,
      icon: Layers,
      action: () => onOpenProjectDossier(project.id),
    })),
    // System & AI
    {
      id: "system-jarvis",
      title: "Activate JARVIS Conversational AI",
      category: "JARVIS & SYSTEM",
      shortcut: "J",
      icon: MessageSquare,
      action: onToggleJarvis,
    },
    {
      id: "system-resume",
      title: "Open Verified Resume (PDF)",
      category: "JARVIS & SYSTEM",
      shortcut: "R",
      icon: FileDown,
      action: () => window.open(profileData.resumeUrl, "_blank"),
    },
    // Contact
    {
      id: "contact-email",
      title: `Send Email to Sahil (${profileData.email})`,
      category: "CONTACT & REPO",
      icon: Mail,
      action: () => (window.location.href = `mailto:${profileData.email}`),
    },
    {
      id: "contact-github",
      title: "Open GitHub Profile (MujumdarSahil)",
      category: "CONTACT & REPO",
      icon: ExternalLink,
      action: () => window.open(profileData.github, "_blank"),
    },
    {
      id: "contact-linkedin",
      title: "Open LinkedIn Profile",
      category: "CONTACT & REPO",
      icon: ExternalLink,
      action: () => window.open(profileData.linkedin, "_blank"),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Universal Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl hud-panel bg-gunmetal/95 rounded-lg border border-cyan/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-cyan/20 bg-gunmetal-surface">
          <Search className="h-4 w-4 text-cyan mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search dossiers, skills, telemetry..."
            className="w-full bg-transparent font-mono text-sm text-ice placeholder-ice-muted/60 focus:outline-none"
            aria-autocomplete="list"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="text-ice-muted hover:text-cyan p-1 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          role="listbox"
          className="max-h-80 overflow-y-auto p-2 divide-y divide-cyan/10"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-ice-muted">
              NO SYSTEM DIRECTIVES MATCHING &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition font-mono text-xs ${
                    isSelected
                      ? "bg-cyan/15 text-cyan border border-cyan/30"
                      : "text-ice hover:bg-gunmetal-high"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-cyan" : "text-ice-muted"}`} />
                    <span className="truncate">{cmd.title}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[10px] text-ice-muted/70">{cmd.category}</span>
                    {cmd.shortcut && (
                      <kbd className="rounded bg-obsidian px-1.5 py-0.5 text-[9px] text-cyan border border-cyan/20">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-cyan/15 bg-obsidian-card font-mono text-[10px] text-ice-muted">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan/70">SAHIL.OS DIRECTIVE BUS</span>
        </div>
      </div>
    </div>
  );
};
