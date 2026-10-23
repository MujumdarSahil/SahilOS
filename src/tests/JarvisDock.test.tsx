import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { JarvisDock } from "@/components/jarvis/JarvisDock";

describe("Phase 4: JarvisDock Assistant Component", () => {
  const onClose = vi.fn();
  const onNavigateSection = vi.fn();
  const onOpenProjectDossier = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <JarvisDock
        isOpen={false}
        onClose={onClose}
        onNavigateSection={onNavigateSection}
        onOpenProjectDossier={onOpenProjectDossier}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders JARVIS header and initial message when open", () => {
    render(
      <JarvisDock
        isOpen={true}
        onClose={onClose}
        onNavigateSection={onNavigateSection}
        onOpenProjectDossier={onOpenProjectDossier}
      />
    );

    expect(screen.getByRole("dialog", { name: /JARVIS AI Assistant Console/i })).toBeInTheDocument();
    expect(screen.getAllByText(/JARVIS/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Greetings. I am JARVIS/i)).toBeInTheDocument();
  });

  it("resets conversation history when reset button is clicked", () => {
    render(
      <JarvisDock
        isOpen={true}
        onClose={onClose}
        onNavigateSection={onNavigateSection}
        onOpenProjectDossier={onOpenProjectDossier}
      />
    );

    const resetBtn = screen.getByRole("button", { name: /reset conversation/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/Terminal reset complete/i)).toBeInTheDocument();
  });

  it("submits message to /api/chat and renders assistant reply with source references", async () => {
    // Mock global fetch for /api/chat
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        response: "OmniTutor AI is a multi-LLM orchestration gateway.",
        sources: ["/dossiers/omnitutor-ai"],
        action: { type: "open_dossier", dossierId: "omnitutor-ai", label: "Inspect OmniTutor AI" },
        provider: "grounded-local",
      }),
    });
    global.fetch = fetchMock;

    render(
      <JarvisDock
        isOpen={true}
        onClose={onClose}
        onNavigateSection={onNavigateSection}
        onOpenProjectDossier={onOpenProjectDossier}
      />
    );

    const input = screen.getByPlaceholderText(/Type directive or query JARVIS/i);
    fireEvent.change(input, { target: { value: "Tell me about OmniTutor" } });

    const sendBtn = screen.getByRole("button", { name: /send message to jarvis/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText(/multi-LLM orchestration gateway/i)).toBeInTheDocument();
    });

    expect(screen.getByText("/dossiers/omnitutor-ai")).toBeInTheDocument();
    expect(screen.getByText(/Inspect OmniTutor AI/i)).toBeInTheDocument();

    // Click proposed action
    const actionBtn = screen.getByText(/Inspect OmniTutor AI/i);
    fireEvent.click(actionBtn);

    expect(onOpenProjectDossier).toHaveBeenCalledWith("omnitutor-ai");
  });
});
