"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experienceData } from "@/data/experience";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 pb-4 border-b border-cyan/15">
        <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
          <Briefcase className="h-4 w-4" />
          <span>// DEPLOYMENT.RECORD — VERIFIED MISSIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ice">
          Verified Experience Timeline
        </h2>
        <p className="text-sm font-mono text-ice-muted mt-1">
          Chronological record of enterprise data science, federal software engineering, and security operations.
        </p>
      </div>

      {/* Timeline entries */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan/20 space-y-12">
        {experienceData.map((mission) => {
          const isActive = mission.status === "ACTIVE MISSION";
          return (
            <div key={mission.id} className="relative group">
              {/* Marker Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 ${
                  isActive
                    ? "border-stark-green bg-obsidian text-stark-green shadow-sm"
                    : "border-cyan bg-obsidian text-cyan"
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-stark-green animate-ping" : "bg-cyan"
                  }`}
                />
              </div>

              {/* Mission Card */}
              <div className="hud-panel rounded-lg p-6 hover:border-cyan/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold font-sans text-ice">
                        {mission.company}
                      </span>
                      {mission.division && (
                        <span className="font-mono text-xs text-amber">
                          ({mission.division})
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-sm font-semibold text-cyan">
                      {mission.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="flex items-center space-x-1 text-ice-muted">
                      <Calendar className="h-3.5 w-3.5 text-cyan" />
                      <span>{mission.period}</span>
                    </span>
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-gunmetal-surface border border-cyan/20 text-cyan text-[11px]">
                      <MapPin className="h-3 w-3" />
                      <span>{mission.mode}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isActive
                          ? "bg-stark-green/15 text-stark-green border border-stark-green/30"
                          : "bg-cyan/10 text-cyan border border-cyan/25"
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-ice-muted leading-relaxed font-sans mb-4">
                  {mission.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-5">
                  {mission.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-ice">
                      <CheckCircle2 className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyan/10">
                  {mission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-gunmetal text-ice-muted border border-cyan/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
