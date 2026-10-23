"use client";

import React, { useState, useMemo } from "react";
import { Cpu, Search, CheckCircle, Network, Layers, RotateCcw, Info } from "lucide-react";
import {
  skillMetrics,
  skillCategoryGroups,
  knowledgeConstellationNodes,
  GraphNode,
} from "@/data/skills";

// Preset normalized 2D coordinates for the constellation graph layout (centered at 500, 300)
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  core: { x: 500, y: 300 },
  python: { x: 340, y: 220 },
  rag: { x: 420, y: 150 },
  agents: { x: 580, y: 150 },
  ml: { x: 660, y: 220 },
  cv: { x: 780, y: 190 },
  blockchain: { x: 320, y: 380 },
  medagentx: { x: 520, y: 460 },
  omnitutor: { x: 670, y: 380 },
  defenseledger: { x: 210, y: 430 },
  ammopredict: { x: 790, y: 330 },
  paper_defense: { x: 120, y: 490 },
  paper_medagentx: { x: 520, y: 550 },
};

export const KnowledgeConstellation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"matrix" | "graph">("matrix");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const filteredCategories = skillCategoryGroups
    .map((group) => ({
      ...group,
      skills: group.skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.skills.length > 0);

  const activeNode = useMemo(() => {
    return knowledgeConstellationNodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // Compute all unique edge pairs
  const edges = useMemo(() => {
    const list: { from: string; to: string }[] = [];
    const seen = new Set<string>();

    knowledgeConstellationNodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [node.id, targetId].sort().join("---");
        if (!seen.has(key) && NODE_COORDINATES[node.id] && NODE_COORDINATES[targetId]) {
          seen.add(key);
          list.push({ from: node.id, to: targetId });
        }
      });
    });
    return list;
  }, []);

  const isConnected = (nodeAId: string, nodeBId: string) => {
    if (!selectedNodeId) return false;
    if (nodeAId === selectedNodeId || nodeBId === selectedNodeId) return true;
    const nodeA = knowledgeConstellationNodes.find((n) => n.id === nodeAId);
    return nodeA?.connections.includes(nodeBId) ?? false;
  };

  return (
    <section id="constellation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cyan/15 gap-4">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
            <Cpu className="h-4 w-4" />
            <span>{"// NEURAL.MATRIX — CAPABILITY INDEX"}</span>
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
        <div className="space-y-10">
          {/* Progress Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillMetrics.map((metric) => (
              <div key={metric.label} className="hud-panel p-5 rounded-lg border border-cyan/15">
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
        /* Interactive Relationship Graph */
        <div className="hud-panel rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan/15 pb-4">
            <div>
              <div className="flex items-center space-x-2 font-mono text-sm text-cyan font-semibold">
                <span>NEURAL TOPOLOGY BUS</span>
                <span className="text-xs text-ice-muted">({knowledgeConstellationNodes.length} VERIFIED NODES)</span>
              </div>
              <p className="text-xs text-ice-muted font-mono mt-0.5">
                Click any node to highlight semantic bridges across research, applied frameworks, and mission dossiers.
              </p>
            </div>
            {selectedNodeId && (
              <button
                onClick={() => setSelectedNodeId(null)}
                className="flex items-center space-x-1.5 rounded border border-amber/40 bg-amber/15 px-3 py-1 font-mono text-xs text-amber hover:bg-amber/25 transition self-start sm:self-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESET SELECTION</span>
              </button>
            )}
          </div>

          {/* Interactive SVG Constellation Canvas */}
          <div className="relative w-full h-[450px] sm:h-[520px] bg-obsidian-deep/90 rounded border border-cyan/20 overflow-hidden select-none">
            <svg
              viewBox="0 0 1000 620"
              className="w-full h-full"
              aria-label="Knowledge Constellation Graph"
            >
              <defs>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Edge Connecting Lines */}
              {edges.map(({ from, to }) => {
                const cFrom = NODE_COORDINATES[from];
                const cTo = NODE_COORDINATES[to];
                if (!cFrom || !cTo) return null;

                const isEdgeActive =
                  selectedNodeId &&
                  (from === selectedNodeId || to === selectedNodeId);

                return (
                  <line
                    key={`${from}-${to}`}
                    x1={cFrom.x}
                    y1={cFrom.y}
                    x2={cTo.x}
                    y2={cTo.y}
                    stroke={
                      isEdgeActive
                        ? "#F3AE50"
                        : selectedNodeId
                        ? "rgba(72, 221, 245, 0.08)"
                        : "rgba(72, 221, 245, 0.22)"
                    }
                    strokeWidth={isEdgeActive ? 2.5 : 1.2}
                    strokeDasharray={isEdgeActive ? "none" : "3,3"}
                    className="transition-colors duration-200"
                  />
                );
              })}

              {/* Node Circles & Labels */}
              {knowledgeConstellationNodes.map((node) => {
                const coords = NODE_COORDINATES[node.id];
                if (!coords) return null;

                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isNeighbor =
                  activeNode &&
                  (activeNode.connections.includes(node.id) ||
                    node.connections.includes(activeNode.id));

                const nodeRadius =
                  node.category === "core" ? 22 : node.category === "project" ? 16 : 12;

                const strokeColor =
                  isSelected || isNeighbor
                    ? "#F3AE50"
                    : node.category === "core"
                    ? "#48DDF5"
                    : "rgba(72, 221, 245, 0.6)";

                const fillColor = isSelected
                  ? "#F3AE50"
                  : isNeighbor
                  ? "#10202B"
                  : node.category === "core"
                  ? "#48DDF5"
                  : "#10202B";

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer transition-transform duration-150"
                  >
                    {/* Pulsing ring on selection */}
                    {isSelected && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={nodeRadius + 8}
                        fill="none"
                        stroke="#F3AE50"
                        strokeWidth={1.5}
                        strokeDasharray="4,4"
                        className="animate-spin-slow"
                      />
                    )}

                    {/* Node Core Circle */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={nodeRadius}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected ? "url(#amberGlow)" : "url(#cyanGlow)"}
                    />

                    {/* Node Text Label */}
                    <text
                      x={coords.x}
                      y={coords.y + nodeRadius + 14}
                      textAnchor="middle"
                      fill={isSelected ? "#F3AE50" : isHovered ? "#48DDF5" : "#DCE8F1"}
                      fontSize={node.category === "core" ? "12" : "10"}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none select-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector Panel */}
          {activeNode ? (
            <div className="p-4 rounded bg-gunmetal-surface border border-cyan/30 space-y-2">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="font-bold text-cyan text-sm">{activeNode.label}</span>
                <span className="text-amber">[{activeNode.category.toUpperCase()}]</span>
              </div>
              <div className="text-xs font-mono text-ice">
                <span className="text-amber font-semibold">Directly Connected Entities ({activeNode.connections.length}): </span>
                <span>{activeNode.connections.join(", ")}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 font-mono text-xs text-ice-muted/70 p-2">
              <Info className="h-4 w-4 text-cyan" />
              <span>Select any node on the graph to inspect its architectural associations and dependent subsystems.</span>
            </div>
          )}

          {/* Accessible HTML List Alternative */}
          <div className="border-t border-cyan/15 pt-4">
            <h4 className="font-mono text-xs text-cyan font-semibold uppercase mb-3">
              ACCESSIBLE DIRECTORY OF GRAPH ENTITIES:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {knowledgeConstellationNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
                  aria-pressed={selectedNodeId === node.id}
                  className={`p-2 rounded border text-left font-mono text-xs transition ${
                    selectedNodeId === node.id
                      ? "border-amber bg-amber/15 text-amber"
                      : "border-cyan/15 bg-gunmetal text-ice hover:bg-gunmetal-high"
                  }`}
                >
                  <div className="font-semibold truncate">{node.label}</div>
                  <div className="text-[10px] text-ice-muted">{node.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
