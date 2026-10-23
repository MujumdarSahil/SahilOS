import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DossiersSection } from "@/components/dossiers/DossiersSection";

describe("Phase 3: Dossiers Section Search & Filtering", () => {
  const onSelectDossier = vi.fn();

  it("filters dossiers by category buttons", () => {
    render(<DossiersSection onSelectDossier={onSelectDossier} />);

    // Click BLOCKCHAIN filter
    const blockchainBtn = screen.getByRole("button", { name: "BLOCKCHAIN" });
    fireEvent.click(blockchainBtn);

    expect(screen.getByText("DEFENSE.LEDGER")).toBeInTheDocument();
    expect(screen.queryByText("MEDAGENTX")).not.toBeInTheDocument();
  });

  it("filters dossiers by keyword search input", () => {
    render(<DossiersSection onSelectDossier={onSelectDossier} />);

    const searchInput = screen.getByPlaceholderText(/Search dossier by codename/i);
    fireEvent.change(searchInput, { target: { value: "OmniTutor" } });

    expect(screen.getByText("OMNITUTOR AI")).toBeInTheDocument();
    expect(screen.queryByText("DEFENSE.LEDGER")).not.toBeInTheDocument();
  });

  it("renders empty state when search returns no matching dossiers", () => {
    render(<DossiersSection onSelectDossier={onSelectDossier} />);

    const searchInput = screen.getByPlaceholderText(/Search dossier by codename/i);
    fireEvent.change(searchInput, { target: { value: "NonExistentKeywordXYZ" } });

    expect(screen.getByText(/NO MISSION DOSSIER FOUND/i)).toBeInTheDocument();
  });

  it("resets filter when reset button is clicked", () => {
    render(<DossiersSection onSelectDossier={onSelectDossier} />);

    const searchInput = screen.getByPlaceholderText(/Search dossier by codename/i);
    fireEvent.change(searchInput, { target: { value: "NonExistentKeywordXYZ" } });

    const resetBtn = screen.getByRole("button", { name: /reset all filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText("MEDAGENTX")).toBeInTheDocument();
    expect(screen.getByText("OMNITUTOR AI")).toBeInTheDocument();
  });
});
