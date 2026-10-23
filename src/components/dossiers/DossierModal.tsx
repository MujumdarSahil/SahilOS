"use client";

import React, { useEffect } from "react";
import {
  X,
  ExternalLink,
  FileText,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Layers,
} from "lucide-react";
import { MissionDossier } from "@/data/projects";

interface DossierModalProps {
  dossier: MissionDossier | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ dossier, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (dossier) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dossier, onClose]);

  if (!dossier) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Mission Dossier: ${dossier.codename}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto hud-panel bg-gunmetal/95 rounded-lg border border-cyan/40 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-cyan/20 pb-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan mb-1">
              <span className="rounded bg-cyan/15 px-2 py-0.5 border border-cyan/30">
                {dossier.category}
              </span>
              <span>·</span>
              <span className="text-amber">{dossier.status}</span>
              <span>·</span>
              <span className="text-ice-muted">{dossier.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-ice">
              {dossier.codename}
            </h2>
            <p className="text-sm font-mono text-cyan/90 mt-1">{dossier.title}</p>
          </div>

          <div className="flex items-center space-x-2">
            {dossier.paperUrl && (
              <a
                href={dossier.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded border border-amber/40 bg-amber/15 px-3 py-1.5 font-mono text-xs text-amber hover:bg-amber/25 transition"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">RESEARCH PAPER</span>
              </a>
            )}
            {dossier.repositoryUrl && (
              <a
                href={dossier.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded border border-cyan/40 bg-cyan/15 px-3 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">REPOSITORY</span>
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close dossier"
              className="text-ice-muted hover:text-cyan p-1.5 rounded border border-transparent hover:border-cyan/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-ice">
          {/* Summary & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-gunmetal-surface border border-cyan/15">
              <h3 className="font-mono text-xs font-semibold text-cyan mb-2 flex items-center space-x-1.5">
                <Layers className="h-4 w-4" />
                <span>MISSION OBJECTIVE</span>
              </h3>
              <p className="text-xs sm:text-sm text-ice-muted leading-relaxed font-sans">
                {dossier.objective}
              </p>
            </div>

            <div className="p-4 rounded bg-gunmetal-surface border border-amber/20">
              <h3 className="font-mono text-xs font-semibold text-amber mb-2 flex items-center space-x-1.5">
                <AlertTriangle className="h-4 w-4" />
                <span>PROBLEM STATEMENT</span>
              </h3>
              <p className="text-xs sm:text-sm text-ice-muted leading-relaxed font-sans">
                {dossier.problemStatement}
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="p-4 rounded bg-gunmetal-surface border border-cyan/15">
            <h3 className="font-mono text-xs font-semibold text-cyan mb-2 flex items-center space-x-1.5">
              <Cpu className="h-4 w-4" />
              <span>ARCHITECTURE & TECHNICAL DECISIONS</span>
            </h3>
            <p className="text-xs sm:text-sm text-ice-muted leading-relaxed font-sans">
              {dossier.architecture}
            </p>
          </div>

          {/* Implementation Highlights */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-cyan mb-3">
              IMPLEMENTATION SPECIFICATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dossier.implementationDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2.5 p-3 rounded bg-gunmetal border border-cyan/10"
                >
                  <CheckCircle className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                  <span className="text-xs text-ice leading-relaxed font-sans">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Evidence & Results */}
          <div className="p-4 rounded bg-gunmetal border border-stark-green/30">
            <h3 className="font-mono text-xs font-semibold text-stark-green mb-2">
              VERIFIED RESULTS & EVIDENCE
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-ice">
              {dossier.resultsAndEvidence.map((result, idx) => (
                <li key={idx} className="leading-relaxed font-sans">{result}</li>
              ))}
            </ul>
          </div>

          {/* Limitations and Lessons */}
          <div className="p-4 rounded bg-gunmetal border border-amber/30">
            <h3 className="font-mono text-xs font-semibold text-amber mb-2">
              LIMITATIONS & LESSONS LEARNED
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-ice-muted">
              {dossier.limitationsAndLessons.map((lesson, idx) => (
                <li key={idx} className="leading-relaxed font-sans">{lesson}</li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-cyan mb-2">
              DEPLOYED TECHNOLOGIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {dossier.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-gunmetal-surface px-2.5 py-1 font-mono text-xs text-cyan border border-cyan/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-cyan/20 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded border border-cyan/30 bg-gunmetal px-4 py-2 font-mono text-xs text-cyan hover:bg-cyan/15 transition"
          >
            DISMISS DOSSIER [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
