import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommandPalette } from "@/components/hud/CommandPalette";

describe("CommandPalette Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onNavigateSection: vi.fn(),
    onOpenProjectDossier: vi.fn(),
    onToggleJarvis: vi.fn(),
  };

  it("does not render when isOpen is false", () => {
    const { container } = render(<CommandPalette {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders search input and commands list when isOpen is true", () => {
    render(<CommandPalette {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type a command or search/i)).toBeInTheDocument();
  });

  it("filters directives based on search input", () => {
    render(<CommandPalette {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Type a command or search/i);

    fireEvent.change(input, { target: { value: "MedAgentX" } });
    expect(screen.getByText(/Inspect Dossier: MEDAGENTX/i)).toBeInTheDocument();
  });

  it("executes the appropriate action when a command is clicked", () => {
    render(<CommandPalette {...defaultProps} />);
    const command = screen.getByText(/Navigate: Experience Timeline/i);

    fireEvent.click(command);
    expect(defaultProps.onNavigateSection).toHaveBeenCalledWith("experience");
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("closes when the close button or backdrop is clicked", () => {
    render(<CommandPalette {...defaultProps} />);
    const closeBtn = screen.getByRole("button", { name: /close command palette/i });

    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
