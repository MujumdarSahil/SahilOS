"use client";

import React from "react";
import { Cpu, Shield, Zap, Activity } from "lucide-react";

interface FallbackCoreProps {
  onActivateDossier?: () => void;
  onActivateJarvis?: () => void;
}

export const FallbackCore: React.FC<FallbackCoreProps> = ({
  onActivateDossier,
  onActivateJarvis,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 w-full max-w-lg mx-auto">
      {/* Outer Orbit Ring */}
      <div className="relative flex items-center justify-center h-64 w-64 sm:h-80 sm:w-80">
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-cyan/20 border-dashed animate-spin-slow pointer-events-none" />
        
        {/* Ring 2 */}
        <div className="absolute inset-4 rounded-full border-2 border-t-cyan border-r-transparent border-b-cyan/30 border-l-transparent animate-reverse-spin pointer-events-none" />
        
        {/* Ring 3 */}
        <div className="absolute inset-10 rounded-full border border-amber/30 pointer-events-none" />

        {/* Central Core Reactor */}
        <div className="relative z-10 flex flex-col items-center justify-center h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gunmetal border-2 border-cyan/60 shadow-hud-cyan p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/15 mb-2 border border-cyan/40">
            <Cpu className="h-6 w-6 text-cyan animate-pulse" />
          </div>
          <span className="font-mono text-xs font-bold text-ice tracking-wider">
            INTELLIGENCE
          </span>
          <span className="font-mono text-[10px] text-cyan font-semibold">
            REACTOR ACTIVE
          </span>
          <div className="mt-1 flex items-center space-x-1 text-[9px] font-mono text-amber">
            <Zap className="h-3 w-3" />
            <span>LEVEL-05</span>
          </div>
        </div>

        {/* Orbiting Telemetry Nodes */}
        <button
          onClick={onActivateDossier}
          aria-label="Jump to Mission Dossiers"
          className="absolute -top-2 rounded border border-cyan/40 bg-gunmetal/90 px-2 py-1 font-mono text-[10px] text-cyan shadow-sm hover:bg-cyan/20 transition cursor-pointer"
        >
          [DOSSIERS: 4]
        </button>

        <button
          onClick={onActivateJarvis}
          aria-label="Engage JARVIS Assistant"
          className="absolute -bottom-2 rounded border border-amber/40 bg-gunmetal/90 px-2 py-1 font-mono text-[10px] text-amber shadow-sm hover:bg-amber/20 transition cursor-pointer"
        >
          [JARVIS: READY]
        </button>

        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center space-x-1 rounded border border-cyan/20 bg-gunmetal/90 px-2 py-0.5 font-mono text-[9px] text-ice-muted">
          <Activity className="h-3 w-3 text-stark-green" />
          <span>99.9% SYS</span>
        </div>

        <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1 rounded border border-cyan/20 bg-gunmetal/90 px-2 py-0.5 font-mono text-[9px] text-ice-muted">
          <Shield className="h-3 w-3 text-cyan" />
          <span>SECURED</span>
        </div>
      </div>
    </div>
  );
};
