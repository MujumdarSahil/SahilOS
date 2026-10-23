import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DossierModal } from "@/components/dossiers/DossierModal";
import { projectsData } from "@/data/projects";

describe("DossierModal Component", () => {
  const onClose = vi.fn();
  const sampleDossier = projectsData[0]; // MEDAGENTX

  it("does not render when dossier is null", () => {
    const { container } = render(<DossierModal dossier={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders all critical sections of the mission dossier", () => {
    render(<DossierModal dossier={sampleDossier} onClose={onClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(sampleDossier.codename)).toBeInTheDocument();
    expect(screen.getByText(/MISSION OBJECTIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/PROBLEM STATEMENT/i)).toBeInTheDocument();
    expect(screen.getByText(/ARCHITECTURE & TECHNICAL DECISIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/VERIFIED RESULTS & EVIDENCE/i)).toBeInTheDocument();
    expect(screen.getByText(/LIMITATIONS & LESSONS LEARNED/i)).toBeInTheDocument();
    expect(screen.getByText(/DEPLOYED TECHNOLOGIES/i)).toBeInTheDocument();
  });

  it("closes when the close button or Escape key is pressed", () => {
    render(<DossierModal dossier={sampleDossier} onClose={onClose} />);

    const closeBtn = screen.getByRole("button", { name: /close dossier/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
