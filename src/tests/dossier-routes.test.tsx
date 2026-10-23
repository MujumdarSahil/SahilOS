import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { generateStaticParams, generateMetadata } from "@/app/dossiers/[id]/page";
import { DossierDetailView } from "@/components/dossiers/DossierDetailView";
import DossierNotFound from "@/app/dossiers/[id]/not-found";
import { projectsData } from "@/data/projects";

describe("Phase 3: Dossier Routes & Detail Views", () => {
  it("generateStaticParams generates params for all verified mission dossiers", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(projectsData.length);
    const ids = params.map((p) => p.id);
    expect(ids).toContain("medagentx");
    expect(ids).toContain("omnitutor-ai");
    expect(ids).toContain("defense-ledger");
    expect(ids).toContain("ammo-predict");
  });

  it("generateMetadata generates title and openGraph metadata for valid project", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ id: "medagentx" }) });
    expect(metadata.title).toContain("MEDAGENTX");
    expect(metadata.description).toBeDefined();
  });

  it("generateMetadata handles not-found metadata for invalid project", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ id: "non-existent-id" }) });
    expect(metadata.title).toContain("Dossier Not Found");
  });

  it("DossierDetailView renders all required case study sections", () => {
    const sampleDossier = projectsData[0];
    render(<DossierDetailView dossier={sampleDossier} />);

    expect(screen.getByText(sampleDossier.codename)).toBeInTheDocument();
    expect(screen.getByText(sampleDossier.title)).toBeInTheDocument();
    expect(screen.getByText(/MISSION OBJECTIVE & SCOPE/i)).toBeInTheDocument();
    expect(screen.getByText(/CORE PROBLEM STATEMENT/i)).toBeInTheDocument();
    expect(screen.getByText(/ARCHITECTURE & SYSTEM DECISIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/VERIFIED RESULTS & EVIDENCE AUDIT/i)).toBeInTheDocument();
    expect(screen.getByText(/LIMITATIONS, EDGE CASES & LESSONS LEARNED/i)).toBeInTheDocument();
    expect(screen.getByText(/DEPLOYED COMPONENT STACK/i)).toBeInTheDocument();
  });

  it("DossierDetailView copies direct share link to clipboard", () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const sampleDossier = projectsData[0];
    render(<DossierDetailView dossier={sampleDossier} />);

    const shareBtn = screen.getByRole("button", { name: /share direct dossier link/i });
    fireEvent.click(shareBtn);

    expect(writeTextMock).toHaveBeenCalled();
  });

  it("DossierNotFound renders classified 404 message and project alternatives", () => {
    render(<DossierNotFound />);

    expect(screen.getByText(/TELEMETRY ERROR 404/i)).toBeInTheDocument();
    expect(screen.getByText(/AVAILABLE VERIFIED MISSION DOSSIERS/i)).toBeInTheDocument();
    expect(screen.getByText("MEDAGENTX")).toBeInTheDocument();
  });
});
