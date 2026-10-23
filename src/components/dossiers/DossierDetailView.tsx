"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Check,
  ExternalLink,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { MissionDossier, projectsData } from "@/data/projects";

interface DossierDetailViewProps {
  dossier: MissionDossier;
}

export const DossierDetailView: React.FC<DossierDetailViewProps> = ({ dossier }) => {
  const [copied, setCopied] = useState(false);

  const currentIndex = projectsData.findIndex((p) => p.id === dossier.id);
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ice py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-cyan/15 pb-4">
          <Link
            href="/#dossiers"
            className="flex items-center space-x-2 font-mono text-xs text-cyan hover:text-cyan-bright transition group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
            <span>RETURN TO COMMAND CENTER</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              aria-label="Share direct dossier link"
              className="flex items-center space-x-1.5 rounded border border-cyan/30 bg-gunmetal px-3 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/15 transition"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-stark-green" />
                  <span className="text-stark-green">COPIED // DIRECT LINK READY</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>SHARE DOSSIER</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dossier Header Panel */}
        <div className="hud-panel p-6 sm:p-8 rounded-lg border border-cyan/30">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-3">
            <span className="rounded bg-cyan/15 px-2.5 py-1 text-cyan border border-cyan/30 font-semibold">
              CATEGORY: {dossier.category}
            </span>
            <span className="rounded bg-amber/15 px-2.5 py-1 text-amber border border-amber/30 font-semibold">
              STATUS: {dossier.status}
            </span>
            <span className="rounded bg-gunmetal px-2.5 py-1 text-stark-green border border-stark-green/30 font-semibold flex items-center space-x-1">
              <ShieldCheck className="h-3 w-3" />
              <span>MATURITY: {dossier.maturityLevel}</span>
            </span>
            <span className="text-ice-muted ml-auto font-mono text-xs">{dossier.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-sans text-ice tracking-tight mb-2">
            {dossier.codename}
          </h1>
          <p className="font-mono text-sm sm:text-base text-cyan font-medium mb-4">
            {dossier.title}
          </p>
          <p className="text-base text-ice-muted leading-relaxed font-sans max-w-3xl">
            {dossier.summary}
          </p>

          {/* Outbound Link Bar */}
          <div className="mt-6 pt-4 border-t border-cyan/15 flex flex-wrap gap-3">
            {dossier.paperUrl && (
              <a
                href={dossier.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded border border-amber/40 bg-amber/15 px-3.5 py-2 font-mono text-xs text-amber hover:bg-amber/25 transition"
              >
                <FileText className="h-4 w-4" />
                <span>ACCESS RESEARCH PAPER (PEER-REVIEWED)</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {dossier.repositoryUrl && (
              <a
                href={dossier.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded border border-cyan/40 bg-cyan/15 px-3.5 py-2 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>VERIFIED SOURCE CODE REPOSITORY</span>
              </a>
            )}
          </div>
        </div>

        {/* Dual Column: Objective & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="hud-panel p-6 rounded-lg border border-cyan/20">
            <h2 className="font-mono text-xs font-bold text-cyan tracking-wider flex items-center space-x-2 mb-3">
              <Layers className="h-4 w-4" />
              <span>MISSION OBJECTIVE & SCOPE</span>
            </h2>
            <p className="text-sm text-ice leading-relaxed font-sans">
              {dossier.objective}
            </p>
          </div>

          <div className="hud-panel-amber p-6 rounded-lg border border-amber/30">
            <h2 className="font-mono text-xs font-bold text-amber tracking-wider flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-4 w-4" />
              <span>CORE PROBLEM STATEMENT</span>
            </h2>
            <p className="text-sm text-ice leading-relaxed font-sans">
              {dossier.problemStatement}
            </p>
          </div>
        </div>

        {/* System Architecture */}
        <div className="hud-panel p-6 sm:p-8 rounded-lg border border-cyan/25">
          <h2 className="font-mono text-xs font-bold text-cyan tracking-wider flex items-center space-x-2 mb-3">
            <Cpu className="h-4 w-4" />
            <span>ARCHITECTURE & SYSTEM DECISIONS</span>
          </h2>
          <p className="text-sm sm:text-base text-ice leading-relaxed font-sans mb-4">
            {dossier.architecture}
          </p>

          <div className="mt-4 pt-4 border-t border-cyan/10">
            <h3 className="font-mono text-xs text-ice-muted uppercase tracking-wider mb-2">
              DEPLOYED COMPONENT STACK:
            </h3>
            <div className="flex flex-wrap gap-2">
              {dossier.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-gunmetal px-3 py-1 font-mono text-xs text-cyan border border-cyan/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Implementation Specifications */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs font-bold text-cyan tracking-widest uppercase">
            // IMPLEMENTATION SPECIFICATIONS & ENGINEERING DRILLS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dossier.implementationDetails.map((detail, index) => (
              <div
                key={index}
                className="hud-panel p-4 rounded-lg flex items-start space-x-3 border border-cyan/15"
              >
                <div className="h-5 w-5 rounded bg-cyan/15 border border-cyan/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-[10px] text-cyan font-bold">{index + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-ice leading-relaxed font-sans">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Results & Test Evidence */}
        <div className="hud-panel p-6 sm:p-8 rounded-lg border border-stark-green/35">
          <h2 className="font-mono text-xs font-bold text-stark-green tracking-wider flex items-center space-x-2 mb-3">
            <CheckCircle2 className="h-4 w-4" />
            <span>VERIFIED RESULTS & EVIDENCE AUDIT</span>
          </h2>
          <ul className="space-y-2">
            {dossier.resultsAndEvidence.map((result, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2.5 text-sm text-ice font-sans leading-relaxed"
              >
                <span className="text-stark-green font-bold shrink-0">▸</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations & Lessons Learned */}
        <div className="hud-panel p-6 sm:p-8 rounded-lg border border-amber/35">
          <h2 className="font-mono text-xs font-bold text-amber tracking-wider flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-4 w-4" />
            <span>LIMITATIONS, EDGE CASES & LESSONS LEARNED</span>
          </h2>
          <ul className="space-y-2">
            {dossier.limitationsAndLessons.map((lesson, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2.5 text-sm text-ice-muted font-sans leading-relaxed"
              >
                <span className="text-amber font-bold shrink-0">▸</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination Navigation Footer */}
        <div className="border-t border-cyan/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <Link
            href={`/dossiers/${prevProject.id}`}
            className="flex items-center space-x-2 text-ice-muted hover:text-cyan transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>PREV: {prevProject.codename}</span>
          </Link>

          <Link
            href="/#dossiers"
            className="rounded border border-cyan/30 bg-gunmetal px-4 py-2 text-cyan hover:bg-cyan/20 transition"
          >
            ALL MISSION DOSSIERS
          </Link>

          <Link
            href={`/dossiers/${nextProject.id}`}
            className="flex items-center space-x-2 text-ice-muted hover:text-cyan transition"
          >
            <span>NEXT: {nextProject.codename}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
