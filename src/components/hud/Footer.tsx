"use client";

import React from "react";
import { Mail, Phone, ExternalLink, ArrowUp, ShieldCheck } from "lucide-react";
import { profileData } from "@/data/profile";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyan/15 bg-obsidian-card py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-sm font-bold text-ice mb-1">
            <span className="text-cyan">SAHIL.OS</span>
            <span>{"//"}</span>
            <span>{profileData.name}</span>
          </div>
          <p className="font-mono text-xs text-ice-muted max-w-md">
            Cinematic personal operating system & production portfolio. Developed for high-reliability AI engineering and enterprise data science.
          </p>
          <div className="flex items-center space-x-2 mt-2 font-mono text-[11px] text-stark-green">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{"LEVEL-05 SECURITY VERIFIED // ZERO-TRUST PROTOCOLS ENFORCED"}</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 font-mono text-xs">
          <a
            href={`mailto:${profileData.email}`}
            className="flex items-center space-x-1.5 text-cyan hover:underline"
          >
            <Mail className="h-4 w-4" />
            <span>{profileData.email}</span>
          </a>

          <a
            href={`tel:${profileData.phone}`}
            className="flex items-center space-x-1.5 text-ice-muted hover:text-ice"
          >
            <Phone className="h-4 w-4" />
            <span>{profileData.phoneDisplay}</span>
          </a>

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-ice-muted hover:text-cyan"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-ice-muted hover:text-cyan"
          >
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center space-x-1 rounded border border-cyan/25 bg-gunmetal px-2.5 py-1 text-cyan hover:bg-cyan/15 transition"
          >
            <span>TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-cyan/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ice-muted/60">
        <div>© 2026 SAHIL NITIN MUJUMDAR. ALL RIGHTS RESERVED.</div>
        <div className="mt-2 sm:mt-0">DESIGNED WITH IRON MAN & STARK-STYLE TELEMETRY INSPIRATION</div>
      </div>
    </footer>
  );
};
