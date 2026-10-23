"use client";

import React, { useState, useEffect } from "react";
import { Zap, FastForward, CheckCircle2 } from "lucide-react";

interface StartupSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "CORE.SYS // INITIATING KERNEL SEQUENCE...",
  "NEURAL.NET // SYNCING MULTI-AGENT ADAPTERS...",
  "GRAPH.MATRIX // LOADING CAPABILITY ONTOLOGY...",
  "SECURITY.GUARD // AUDIT ZERO-TRUST POLICY: VALIDATED",
  "TELEMETRY // RESOLVING SENSORY TELEMETRY HUD...",
  "OPERATING SYSTEM READY // WELCOME TO SAHIL.OS",
];

export const StartupSequence: React.FC<StartupSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if reduced-motion preferred or already completed in session
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyBooted = sessionStorage.getItem("sahil_os_booted") === "true";

      if (prefersReducedMotion || alreadyBooted) {
        onComplete();
        return;
      }
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            sessionStorage.setItem("sahil_os_booted", "true");
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const logInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 350);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        sessionStorage.setItem("sahil_os_booted", "true");
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sahil_os_booted", "true");
    }
    onComplete();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Startup Sequence"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-deep px-4 select-none"
    >
      {/* Top Telemetry */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 text-cyan font-mono text-xs tracking-wider">
        <Zap className="h-4 w-4 animate-pulse text-cyan" />
        <span>{"SAHIL.OS // STARK.CORE.v2.0"}</span>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        aria-label="Skip initialization sequence"
        className="absolute top-6 right-6 flex items-center space-x-2 rounded border border-cyan/30 bg-gunmetal/60 px-3 py-1.5 font-mono text-xs text-cyan transition hover:bg-cyan/10 hover:border-cyan focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <span>SKIP INITIALIZATION [ESC]</span>
        <FastForward className="h-3.5 w-3.5" />
      </button>

      {/* Central Reactor Ring Animation */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Ring */}
        <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-full border border-cyan/20 border-dashed animate-spin-slow" />
        
        {/* Middle Ring */}
        <div className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full border-2 border-t-cyan border-r-transparent border-b-cyan/40 border-l-transparent animate-reverse-spin" />
        
        {/* Inner Reactor Glow */}
        <div className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-amber/40 bg-gunmetal flex flex-col items-center justify-center shadow-hud-cyan">
          <span className="font-mono text-xs text-amber font-semibold">POWER</span>
          <span className="font-mono text-lg font-bold text-cyan tracking-wider">{progress}%</span>
        </div>
      </div>

      {/* System Boot Diagnostic Console */}
      <div className="w-full max-w-md hud-panel p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-cyan/15 pb-2 text-[11px] text-ice-muted">
          <span>DIAGNOSTIC TELEMETRY</span>
          <span className="text-cyan">STATUS: CHARGING</span>
        </div>

        <div className="h-20 overflow-hidden flex flex-col justify-end space-y-1">
          {BOOT_LOGS.slice(0, currentStep + 1).map((log, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 ${
                index === currentStep ? "text-cyan font-medium" : "text-ice-muted/70"
              }`}
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 text-cyan/70" />
              <span className="truncate">{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gunmetal-surface h-1.5 rounded-full overflow-hidden border border-cyan/20 mt-3">
          <div
            className="h-full bg-gradient-to-r from-cyan to-amber transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer System Clearance */}
      <p className="absolute bottom-6 font-mono text-[10px] text-ice-muted/60 tracking-widest text-center">
        {"RESTRICTED LEVEL-05 WORKSPACE // AUTHORIZED VISITOR SESSION GRANTED"}
      </p>
    </div>
  );
};
