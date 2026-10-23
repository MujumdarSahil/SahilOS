"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ExternalLink,
  FileText,
  ChevronRight,
  Filter,
  Search,
  Share2,
  Check,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { projectsData, MissionDossier } from "@/data/projects";

interface DossiersSectionProps {
  onSelectDossier: (dossier: MissionDossier) => void;
}

export const DossiersSection: React.FC<DossiersSectionProps> = ({ onSelectDossier }) => {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["ALL", "AI / AGENTIC", "LLM / RAG", "BLOCKCHAIN", "ML / PREDICTIVE"];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeFilter === "ALL" || project.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      project.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleShareLink = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/dossiers/${projectId}`;
      navigator.clipboard.writeText(url);
      setCopiedId(projectId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="dossiers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cyan/15 gap-4">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
            <Layers className="h-4 w-4" />
            <span>// MISSION.ARCHIVE — LEVEL-05 CLEARANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ice">
            Interactive Mission Dossiers
          </h2>
          <p className="text-sm font-mono text-ice-muted mt-1">
            Structured engineering case studies with verified architectures and production evidence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <Filter className="h-3.5 w-3.5 text-cyan mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded px-2.5 py-1 transition ${
                activeFilter === cat
                  ? "bg-cyan text-obsidian font-bold shadow-hud-cyan"
                  : "bg-gunmetal text-ice-muted hover:text-ice hover:bg-gunmetal-high border border-cyan/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dossier by codename, technology, or keywords..."
            className="w-full rounded bg-gunmetal pl-9 pr-4 py-2 font-mono text-xs text-ice border border-cyan/20 focus:border-cyan focus:outline-none placeholder-ice-muted/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-ice-muted hover:text-cyan"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="hud-panel p-12 text-center rounded-lg border border-cyan/20 max-w-xl mx-auto">
          <AlertCircle className="h-8 w-8 text-amber mx-auto mb-3" />
          <div className="font-mono text-sm font-bold text-ice mb-1">
            NO MISSION DOSSIER FOUND
          </div>
          <p className="font-mono text-xs text-ice-muted mb-4">
            Zero dossiers match the query &quot;{searchQuery}&quot; under &quot;{activeFilter}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("ALL");
            }}
            className="rounded border border-cyan/40 bg-cyan/15 px-3 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="hud-panel rounded-lg p-6 flex flex-col justify-between hover:border-cyan/40 transition duration-300 group"
            >
              <div>
                {/* Card Meta Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/25">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-ice-muted">
                      {project.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                        project.accentColor === "amber"
                          ? "border-amber/40 bg-amber/10 text-amber"
                          : "border-cyan/40 bg-cyan/10 text-cyan"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Maturity Indicator */}
                <div className="flex items-center space-x-1.5 font-mono text-[10px] text-stark-green mb-2">
                  <ShieldCheck className="h-3 w-3" />
                  <span>MATURITY: {project.maturityLevel}</span>
                </div>

                {/* Title & Codename */}
                <h3 className="text-xl font-bold font-sans text-ice group-hover:text-cyan transition mb-1">
                  {project.codename}
                </h3>
                <p className="font-mono text-xs text-amber mb-3">
                  {project.title}
                </p>
                <p className="text-sm text-ice-muted leading-relaxed font-sans mb-4">
                  {project.summary}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-gunmetal-surface text-ice-muted border border-cyan/15"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 text-cyan">
                      +{project.technologies.length - 5} MORE
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-cyan/15 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onSelectDossier(project)}
                    className="flex items-center space-x-1 font-mono text-xs font-semibold text-cyan hover:text-cyan-bright transition group-hover:translate-x-0.5 duration-200"
                  >
                    <span>INSPECT</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={`/dossiers/${project.id}`}
                    className="font-mono text-xs text-ice-muted hover:text-ice underline underline-offset-4"
                  >
                    FULL ROUTE
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleShareLink(project.id, e)}
                    aria-label={`Copy shareable link for ${project.codename}`}
                    className="p-1.5 rounded border border-cyan/20 text-cyan hover:bg-cyan/15 transition relative"
                  >
                    {copiedId === project.id ? (
                      <Check className="h-3.5 w-3.5 text-stark-green" />
                    ) : (
                      <Share2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  {project.paperUrl && (
                    <a
                      href={project.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View paper for ${project.codename}`}
                      className="p-1.5 rounded border border-amber/30 text-amber hover:bg-amber/15 transition"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.codename}`}
                      className="p-1.5 rounded border border-cyan/30 text-cyan hover:bg-cyan/15 transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
