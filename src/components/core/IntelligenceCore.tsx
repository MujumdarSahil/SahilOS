"use client";

import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";
import { Cpu, Zap, Shield, Activity, Layers, Briefcase, MessageSquare } from "lucide-react";
import { FallbackCore } from "./FallbackCore";

interface IntelligenceCoreProps {
  onNavigateDossiers: () => void;
  onNavigateExperience: () => void;
  onNavigateConstellation: () => void;
  onToggleJarvis: () => void;
}

// Error Boundary for WebGL/Canvas failures
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("WebGL initialization or rendering failed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Helper to check WebGL capability
export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Dynamically import the 3D ReactorScene with ssr: false
const DynamicReactorScene = dynamic(
  () => import("./ReactorScene").then((mod) => mod.ReactorScene),
  {
    ssr: false,
    loading: () => <FallbackCore />,
  }
);

export const IntelligenceCore: React.FC<IntelligenceCoreProps> = ({
  onNavigateDossiers,
  onNavigateExperience,
  onNavigateConstellation,
  onToggleJarvis,
}) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    const isSupported = checkWebGLSupport();
    setWebGLSupported(isSupported);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleNodeSelect = (nodeId: string) => {
    switch (nodeId) {
      case "dossiers":
        onNavigateDossiers();
        break;
      case "experience":
        onNavigateExperience();
        break;
      case "constellation":
        onNavigateConstellation();
        break;
      case "jarvis":
        onToggleJarvis();
        break;
      default:
        break;
    }
  };

  const fallbackView = (
    <FallbackCore
      onActivateDossier={onNavigateDossiers}
      onActivateJarvis={onToggleJarvis}
    />
  );

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center"
      data-testid="intelligence-core-container"
    >
      {/* 3D Scene or Fallback Core */}
      <div className="w-full relative flex items-center justify-center">
        {webGLSupported === false ? (
          fallbackView
        ) : (
          <WebGLErrorBoundary fallback={fallbackView}>
            <DynamicReactorScene
              onSelectNode={handleNodeSelect}
              reducedMotion={reducedMotion}
            />
          </WebGLErrorBoundary>
        )}
      </div>

      {/* Accessible Companion Controls (Canvas-Independent Navigation) */}
      <nav
        aria-label="Intelligence Core Subsystem Controls"
        className="mt-2 w-full max-w-md px-2"
      >
        <div className="flex items-center justify-between mb-2 px-1 text-[11px] font-mono text-ice-muted">
          <span className="flex items-center space-x-1">
            <Cpu className="h-3 w-3 text-cyan" />
            <span>REACTOR CORE TELEMETRY</span>
          </span>
          <span className="text-cyan text-[10px]">
            {webGLSupported ? "ACCELERATED 3D" : "2D HUD MODE"}
          </span>
        </div>

        {/* 4 Interactive Subsystem Directives */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={onNavigateDossiers}
            aria-label="Access Mission Dossiers"
            className="flex items-center justify-center space-x-1.5 rounded border border-cyan/30 bg-gunmetal/80 px-2.5 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/15 hover:border-cyan transition shadow-sm"
          >
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span>DOSSIERS</span>
          </button>

          <button
            onClick={onNavigateExperience}
            aria-label="Access Experience Timeline"
            className="flex items-center justify-center space-x-1.5 rounded border border-amber/40 bg-gunmetal/80 px-2.5 py-1.5 font-mono text-xs text-amber hover:bg-amber/15 hover:border-amber transition shadow-sm"
          >
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <span>MISSIONS</span>
          </button>

          <button
            onClick={onNavigateConstellation}
            aria-label="Access Knowledge Matrix"
            className="flex items-center justify-center space-x-1.5 rounded border border-cyan/30 bg-gunmetal/80 px-2.5 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/15 hover:border-cyan transition shadow-sm"
          >
            <Activity className="h-3.5 w-3.5 shrink-0" />
            <span>MATRIX</span>
          </button>

          <button
            onClick={onToggleJarvis}
            aria-label="Engage JARVIS Intelligence"
            className="flex items-center justify-center space-x-1.5 rounded border border-amber/40 bg-gunmetal/80 px-2.5 py-1.5 font-mono text-xs text-amber hover:bg-amber/15 hover:border-amber transition shadow-sm"
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span>JARVIS</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
