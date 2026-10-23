"use client";

import React, { useState } from "react";
import { Cpu, Search, CheckCircle, Network, Layers } from "lucide-react";
import { skillMetrics, skillCategoryGroups, knowledgeConstellationNodes } from "@/data/skills";

export const KnowledgeConstellation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"matrix" | "graph">("matrix");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const filteredCategories = skillCategoryGroups.map((group) => ({
    ...group,
    skills: group.skills.filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.skills.length > 0);

  const activeNodeData = knowledgeConstellationNodes.find((n) => n.id === selectedNode);

  return (
    <section id="constellation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-cyan/15 gap-4">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
            <Cpu className="h-4 w-4" />
            <span>// NEURAL.MATRIX — CAPABILITY INDEX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ice">
            Knowledge Constellation
          </h2>
          <p className="text-sm font-mono text-ice-muted mt-1">
            Multidisciplinary technical competency graph across artificial intelligence, systems engineering, and data architectures.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center space-x-1.5 rounded px-3 py-1.5 transition ${
              activeTab === "matrix"
                ? "bg-cyan text-obsidian font-bold shadow-hud-cyan"
                : "bg-gunmetal text-ice-muted hover:text-ice border border-cyan/15"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>CAPABILITY MATRIX</span>
          </button>
          <button
            onClick={() => setActiveTab("graph")}
            className={`flex items-center space-x-1.5 rounded px-3 py-1.5 transition ${
              activeTab === "graph"
                ? "bg-cyan text-obsidian font-bold shadow-hud-cyan"
                : "bg-gunmetal text-ice-muted hover:text-ice border border-cyan/15"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>RELATIONSHIP GRAPH</span>
          </button>
        </div>
      </div>

      {/* Main View Content */}
      {activeTab === "matrix" ? (
        <div className="space-y-12">
          {/* Progress Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillMetrics.map((metric) => (
              <div key={metric.label} className="hud-panel p-5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-ice">
                    {metric.label}
                  </span>
                  <span className="font-mono text-xs text-cyan font-semibold">
                    {metric.proficiency}%
                  </span>
                </div>

                <div className="w-full bg-gunmetal-surface h-2 rounded-full overflow-hidden border border-cyan/15 mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-cyan to-cyan-bright transition-all duration-500"
                    style={{ width: `${metric.proficiency}%` }}
                  />
                </div>

                <p className="text-xs text-ice-muted font-mono">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Search Filter for Skills */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specific language, library, or framework..."
                className="w-full rounded bg-gunmetal pl-9 pr-4 py-2 font-mono text-xs text-ice border border-cyan/20 focus:border-cyan focus:outline-none placeholder-ice-muted/50"
              />
            </div>
          </div>

          {/* Categorized Competency Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.category}
                className="hud-panel rounded-lg p-5 border border-cyan/15 space-y-3"
              >
                <h3 className="font-mono text-xs font-semibold text-cyan tracking-wider border-b border-cyan/10 pb-2">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center space-x-1 rounded bg-gunmetal-surface px-2.5 py-1 font-mono text-xs text-ice hover:text-cyan hover:border-cyan/40 border border-cyan/15 transition cursor-default"
                    >
                      <CheckCircle className="h-3 w-3 text-cyan/70" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Interactive Relationship Graph / Constellation Explorer */
        <div className="hud-panel rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan/15 pb-4">
            <div>
              <h3 className="font-mono text-sm text-cyan font-semibold">
                NEURAL TOPOLOGY BUS // CLICK NODE TO INSPECT CROSS-LINKED ASSETS
              </h3>
              <p className="text-xs text-ice-muted font-mono mt-0.5">
                Shows semantic bridges between theoretical research, applied engineering, and core frameworks.
              </p>
            </div>
            {selectedNode && (
              <button
                onClick={() => setSelectedNode(null)}
                className="font-mono text-xs text-amber hover:underline self-start sm:self-auto"
              >
                [RESET SELECTION]
              </button>
            )}
          </div>

          {/* Node Grid Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {knowledgeConstellationNodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isConnected =
                activeNodeData &&
                (activeNodeData.connections.includes(node.id) ||
                  node.connections.includes(activeNodeData.id));

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`p-3 rounded border text-left transition font-mono text-xs flex flex-col justify-between h-24 ${
                    isSelected
                      ? "border-cyan bg-cyan/20 text-cyan shadow-hud-cyan"
                      : isConnected
                      ? "border-amber/60 bg-amber/10 text-amber"
                      : "border-cyan/15 bg-gunmetal text-ice hover:bg-gunmetal-high"
                  }`}
                >
                  <span className="text-[10px] text-ice-muted uppercase">
                    {node.category}
                  </span>
                  <span className="font-bold truncate mt-1">{node.label}</span>
                  <span className="text-[9px] text-cyan/70 mt-1">
                    {node.connections.length} LINKS
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Node Inspector */}
          {activeNodeData && (
            <div className="p-4 rounded bg-gunmetal-surface border border-cyan/30 mt-4 space-y-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="font-bold text-cyan">{activeNodeData.label}</span>
                <span className="text-ice-muted">· Category: {activeNodeData.category}</span>
              </div>
              <div className="text-xs font-mono text-ice">
                <span className="text-amber">Directly Connected Entities: </span>
                {activeNodeData.connections.join(", ")}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
