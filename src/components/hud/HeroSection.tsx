"use client";

import React, { useState, useEffect } from "react";
import {
  FileDown,
  Layers,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Activity,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { IntelligenceCore } from "@/components/core/IntelligenceCore";

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
  onOpenRecruiterDossier: () => void;
  onToggleJarvis: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRecruiterDossier,
  onToggleJarvis,
  onNavigateSection,
}) => {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      const hrs = String(Math.floor(elapsedSec / 3600)).padStart(2, "0");
      const mins = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, "0");
      const secs = String(elapsedSec % 60).padStart(2, "0");
      setUptime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="command-center"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Operator Bio & Tactical Status */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan/30 bg-gunmetal/80 px-3 py-1 font-mono text-xs text-cyan backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-stark-green animate-pulse" />
            <span>OPERATING SYSTEM READY</span>
            <span className="text-ice-muted">·</span>
            <span className="text-amber">UPTIME: {uptime}</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="font-mono text-xs sm:text-sm tracking-widest text-cyan uppercase">
              // STARK-GRADE ENGINEERING COMMAND CENTER
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-ice tracking-tight">
              {profileData.name}
            </h1>
            <p className="text-lg sm:text-xl font-mono text-cyan font-medium">
              {profileData.title}
            </p>
          </div>

          {/* Specialization & Bio */}
          <p className="text-base text-ice-muted leading-relaxed font-sans max-w-2xl">
            {profileData.bio}
          </p>

          {/* Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            {profileData.metrics.map((metric) => (
              <div
                key={metric.label}
                className="hud-panel p-3 rounded border border-cyan/15 bg-gunmetal/60"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-cyan">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] text-ice-muted uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            {/* Mission Dossiers Trigger */}
            <button
              onClick={() => scrollToSection("dossiers")}
              className="flex items-center space-x-2 rounded bg-cyan px-4 py-2.5 font-bold text-obsidian shadow-hud-cyan hover:bg-cyan-bright transition"
            >
              <Layers className="h-4 w-4" />
              <span>EXPLORE DOSSIERS</span>
            </button>

            {/* Recruiter 60-Sec Button */}
            <button
              onClick={onOpenRecruiterDossier}
              className="flex items-center space-x-2 rounded border border-amber/50 bg-amber/15 px-4 py-2.5 font-bold text-amber hover:bg-amber/25 transition"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>RECRUITER 60s</span>
            </button>

            {/* Engage JARVIS Trigger */}
            <button
              onClick={onToggleJarvis}
              className="flex items-center space-x-2 rounded border border-cyan/40 bg-gunmetal px-4 py-2.5 text-cyan hover:bg-cyan/15 transition"
            >
              <MessageSquare className="h-4 w-4" />
              <span>ENGAGE JARVIS</span>
            </button>

            {/* Resume Button */}
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded border border-cyan/25 bg-gunmetal px-3 py-2.5 text-ice hover:text-cyan hover:border-cyan/50 transition"
            >
              <FileDown className="h-4 w-4" />
              <span>RESUME.PDF</span>
            </a>
          </div>

          {/* System Clearance Note */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-ice-muted/70 pt-1">
            <Activity className="h-3.5 w-3.5 text-stark-green" />
            <span>AUTHENTICATED REPOSITORY INTEGRITY 100% · ZERO THIRD-PARTY COOKIES</span>
          </div>
        </div>

        {/* Right Column: Reactor Intelligence Core Scene */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full">
            <IntelligenceCore
              onNavigateDossiers={() => scrollToSection("dossiers")}
              onNavigateExperience={() => scrollToSection("experience")}
              onNavigateConstellation={() => scrollToSection("constellation")}
              onToggleJarvis={onToggleJarvis}
            />
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => scrollToSection("dossiers")}
          aria-label="Scroll down to mission dossiers"
          className="flex flex-col items-center text-cyan/70 hover:text-cyan transition group"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase mb-1">
            SYSTEM TELEMETRY BELOW
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
