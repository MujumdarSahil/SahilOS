"use client";

import React, { useEffect } from "react";
import {
  X,
  FileDown,
  ShieldCheck,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Award,
  ExternalLink,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { projectsData } from "@/data/projects";

interface QuickRecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickRecruiterModal: React.FC<QuickRecruiterModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter 60-Second Dossier"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto hud-panel-amber bg-gunmetal/95 rounded-lg border border-amber/40 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-amber/20 pb-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-amber font-mono text-xs font-semibold tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>RECRUITER 60-SECOND EXECUTIVE DOSSIER</span>
            </div>
            <h2 className="text-2xl font-bold text-ice font-sans">{profileData.name}</h2>
            <p className="text-cyan text-sm font-mono">{profileData.title} · {profileData.location}</p>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded border border-cyan/40 bg-cyan/15 px-3 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>DOWNLOAD RESUME</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close recruiter dossier"
              className="text-ice-muted hover:text-amber p-1.5 rounded border border-transparent hover:border-amber/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Summary */}
        <div className="mb-6 p-4 rounded bg-gunmetal-surface border border-cyan/15">
          <p className="text-xs sm:text-sm text-ice leading-relaxed font-sans">
            {profileData.bio}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded bg-amber/15 border border-amber/30 px-2.5 py-0.5 font-mono text-[11px] text-amber">
              STATUS: {profileData.availability}
            </span>
            <span className="rounded bg-cyan/15 border border-cyan/30 px-2.5 py-0.5 font-mono text-[11px] text-cyan">
              CLEARANCE: {profileData.clearanceLevel}
            </span>
          </div>
        </div>

        {/* 3-Column Quick Digest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Experience */}
          <div className="p-3.5 rounded bg-gunmetal border border-cyan/15">
            <div className="flex items-center space-x-2 text-cyan font-mono text-xs font-semibold mb-2">
              <Briefcase className="h-4 w-4" />
              <span>CAREER PATH</span>
            </div>
            <div className="space-y-2 text-xs">
              {experienceData.map((exp) => (
                <div key={exp.id} className="border-l border-cyan/30 pl-2">
                  <div className="font-semibold text-ice">{exp.company}</div>
                  <div className="text-cyan text-[11px]">{exp.role}</div>
                  <div className="text-[10px] text-ice-muted">{exp.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Projects */}
          <div className="p-3.5 rounded bg-gunmetal border border-cyan/15">
            <div className="flex items-center space-x-2 text-cyan font-mono text-xs font-semibold mb-2">
              <Layers className="h-4 w-4" />
              <span>FEATURED WORK</span>
            </div>
            <div className="space-y-2 text-xs">
              {projectsData.slice(0, 3).map((proj) => (
                <div key={proj.id} className="border-l border-amber/30 pl-2">
                  <div className="font-semibold text-ice">{proj.codename}</div>
                  <div className="text-amber text-[11px]">{proj.category}</div>
                  <div className="text-[10px] text-ice-muted truncate">{proj.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Competencies */}
          <div className="p-3.5 rounded bg-gunmetal border border-cyan/15">
            <div className="flex items-center space-x-2 text-cyan font-mono text-xs font-semibold mb-2">
              <Award className="h-4 w-4" />
              <span>CORE STACK</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              {[
                "Python",
                "PyTorch",
                "FastAPI",
                "RAG",
                "FAISS",
                "Multi-Agent",
                "SQL Server",
                "AWS Cloud",
                "Docker",
                "Zero Trust",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-gunmetal-high px-2 py-0.5 text-ice border border-cyan/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Direct Outreach */}
        <div className="border-t border-amber/20 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-ice">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center space-x-1.5 text-cyan hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{profileData.email}</span>
            </a>
            <a
              href={`tel:${profileData.phone}`}
              className="flex items-center space-x-1.5 text-ice hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{profileData.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-ice-muted hover:text-cyan"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3" />
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
          </div>
        </div>
      </div>
    </div>
  );
};
