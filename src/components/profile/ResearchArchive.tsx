"use client";

import React from "react";
import { BookOpen, ExternalLink, Users } from "lucide-react";
import { publicationsData } from "@/data/publications";

export const ResearchArchive: React.FC = () => {
  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 pb-4 border-b border-cyan/15">
        <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
          <BookOpen className="h-4 w-4" />
          <span>{"// RESEARCH.ARCHIVE — PEER-REVIEWED CORPUS"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ice">
          Publication Record
        </h2>
        <p className="text-sm font-mono text-ice-muted mt-1">
          Peer-reviewed international conference proceedings and clinical AI journal submissions.
        </p>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {publicationsData.map((paper) => (
          <article
            key={paper.id}
            className="hud-panel rounded-lg p-6 sm:p-8 hover:border-cyan/40 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    paper.status === "PUBLISHED"
                      ? "bg-amber/15 text-amber border border-amber/30"
                      : "bg-cyan/15 text-cyan border border-cyan/30"
                  }`}
                >
                  {paper.status}
                </span>
                <span className="text-ice-muted">· {paper.date}</span>
              </div>

              {paper.paperUrl && (
                <a
                  href={paper.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 font-mono text-xs text-cyan hover:underline"
                >
                  <span>[ ACCESS RESEARCH PAPER ]</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-sans text-ice mb-2">
              {paper.title}
            </h3>

            <p className="font-mono text-xs text-amber mb-4">
              {paper.venue}
            </p>

            <p className="text-sm text-ice-muted leading-relaxed font-sans mb-4">
              {paper.abstract}
            </p>

            <div className="flex items-center space-x-2 font-mono text-xs text-ice">
              <Users className="h-4 w-4 text-cyan" />
              <span>Authors: {paper.authors.join(", ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
