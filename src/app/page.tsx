"use client";

import React, { useState, useEffect } from "react";
import { StartupSequence } from "@/components/startup/StartupSequence";
import { Header } from "@/components/hud/Header";
import { HeroSection } from "@/components/hud/HeroSection";
import { DossiersSection } from "@/components/dossiers/DossiersSection";
import { ExperienceTimeline } from "@/components/profile/ExperienceTimeline";
import { KnowledgeConstellation } from "@/components/constellation/KnowledgeConstellation";
import { ResearchArchive } from "@/components/profile/ResearchArchive";
import { CredentialRegistry } from "@/components/profile/CredentialRegistry";
import { Footer } from "@/components/hud/Footer";
import { CommandPalette } from "@/components/hud/CommandPalette";
import { QuickRecruiterModal } from "@/components/hud/QuickRecruiterModal";
import { DossierModal } from "@/components/dossiers/DossierModal";
import { JarvisDock } from "@/components/jarvis/JarvisDock";
import { MissionDossier, projectsData } from "@/data/projects";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<MissionDossier | null>(null);
  const [jarvisOpen, setJarvisOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("command-center");

  // Global Keyboard Shortcuts (Ctrl+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    const sectionIds = [
      "command-center",
      "dossiers",
      "experience",
      "constellation",
      "publications",
      "certifications",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isBooting]);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenProjectDossier = (projectId: string) => {
    const proj = projectsData.find((p) => p.id === projectId);
    if (proj) {
      setSelectedDossier(proj);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-obsidian">
      {/* Startup Sequence */}
      {isBooting && (
        <StartupSequence onComplete={() => setIsBooting(false)} />
      )}

      {/* Main Operating System Shell */}
      <Header
        activeSection={activeSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenRecruiterDossier={() => setRecruiterModalOpen(true)}
        onToggleJarvis={() => setJarvisOpen((prev) => !prev)}
      />

      <main className="flex-1">
        <HeroSection
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenRecruiterDossier={() => setRecruiterModalOpen(true)}
          onToggleJarvis={() => setJarvisOpen(true)}
        />

        <DossiersSection
          onSelectDossier={(dossier) => setSelectedDossier(dossier)}
        />

        <ExperienceTimeline />

        <KnowledgeConstellation />

        <ResearchArchive />

        <CredentialRegistry />
      </main>

      <Footer />

      {/* Universal Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigateSection={handleNavigateSection}
        onOpenProjectDossier={handleOpenProjectDossier}
        onToggleJarvis={() => setJarvisOpen((prev) => !prev)}
      />

      {/* Recruiter 60-Second Fast-Track Dossier Modal */}
      <QuickRecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
      />

      {/* Structured Mission Dossier Case Study Modal */}
      <DossierModal
        dossier={selectedDossier}
        onClose={() => setSelectedDossier(null)}
      />

      {/* JARVIS AI Assistant Dock */}
      <JarvisDock
        isOpen={jarvisOpen}
        onClose={() => setJarvisOpen(false)}
        onNavigateSection={handleNavigateSection}
        onOpenProjectDossier={handleOpenProjectDossier}
      />
    </div>
  );
}
