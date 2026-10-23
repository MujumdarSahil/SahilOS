"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  FileDown,
  Search,
  Menu,
  X,
  Compass,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { profileData } from "@/data/profile";

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenRecruiterDossier: () => void;
  onToggleJarvis: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenRecruiterDossier,
  onToggleJarvis,
  activeSection,
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { id: "command-center", label: "COMMAND", icon: Compass },
    { id: "dossiers", label: "DOSSIERS", icon: Layers },
    { id: "experience", label: "EXPERIENCE", icon: Briefcase },
    { id: "constellation", label: "MATRIX", icon: Cpu },
    { id: "publications", label: "RESEARCH", icon: BookOpen },
    { id: "certifications", label: "CREDENTIALS", icon: Award },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan/15 bg-obsidian/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-cyan/40 bg-gunmetal shadow-hud-cyan">
            <Cpu className="h-5 w-5 text-cyan animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold tracking-widest text-ice">
                SAHIL.OS
              </span>
              <span className="rounded bg-cyan/10 px-1.5 py-0.2 font-mono text-[10px] text-cyan border border-cyan/30">
                v2.0
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 font-mono text-[10px] text-ice-muted">
              <span className="flex h-1.5 w-1.5 rounded-full bg-stark-green animate-ping" />
              <span>CORE ONLINE</span>
              <span>·</span>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Operating system navigation"
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center space-x-1.5 rounded px-2.5 py-1.5 font-mono text-xs tracking-wider transition ${
                  isActive
                    ? "bg-cyan/15 text-cyan border border-cyan/40 shadow-sm"
                    : "text-ice-muted hover:bg-gunmetal hover:text-ice"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Recruiter Fast-Track Button */}
          <button
            onClick={onOpenRecruiterDossier}
            aria-label="Open 60-Second Recruiter Dossier"
            className="hidden sm:flex items-center space-x-1.5 rounded border border-amber/40 bg-amber/10 px-2.5 py-1.5 font-mono text-xs font-medium text-amber hover:bg-amber/20 transition"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>RECRUITER 60s</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette (Press Control K)"
            className="flex items-center space-x-1.5 rounded border border-cyan/20 bg-gunmetal px-2.5 py-1.5 font-mono text-xs text-cyan hover:border-cyan/50 hover:bg-gunmetal-high transition"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline text-ice-muted">COMMAND</span>
            <kbd className="hidden sm:inline rounded bg-obsidian px-1 py-0.5 text-[9px] text-cyan/80 border border-cyan/30">
              ⌘K
            </kbd>
          </button>

          {/* Direct Resume Action */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Sahil's verified resume (PDF)"
            className="flex items-center space-x-1 rounded border border-cyan/40 bg-cyan/10 px-2.5 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">RESUME</span>
          </a>

          {/* JARVIS Assistant Trigger */}
          <button
            onClick={onToggleJarvis}
            aria-label="Activate JARVIS AI Assistant"
            className="flex items-center space-x-1 rounded border border-cyan/50 bg-gunmetal px-2.5 py-1.5 font-mono text-xs text-cyan hover:shadow-hud-cyan transition"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">JARVIS</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded border border-cyan/30 bg-gunmetal text-cyan hover:bg-gunmetal-high"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan/20 bg-obsidian-card p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="flex items-center space-x-2 rounded border border-cyan/15 bg-gunmetal p-2.5 font-mono text-xs text-ice hover:bg-cyan/10 hover:text-cyan"
                >
                  <Icon className="h-4 w-4 text-cyan" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-cyan/15 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterDossier();
              }}
              className="flex-1 flex items-center justify-center space-x-2 rounded border border-amber/40 bg-amber/10 py-2 font-mono text-xs text-amber"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>RECRUITER 60-SEC DOSSIER</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
