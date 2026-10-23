import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IntelligenceCore, checkWebGLSupport } from "@/components/core/IntelligenceCore";

describe("IntelligenceCore Component", () => {
  const defaultProps = {
    onNavigateDossiers: vi.fn(),
    onNavigateExperience: vi.fn(),
    onNavigateConstellation: vi.fn(),
    onToggleJarvis: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("safely detects WebGL support in environment", () => {
    // In standard jsdom without headless gl, checkWebGLSupport correctly returns false
    const supported = checkWebGLSupport();
    expect(typeof supported).toBe("boolean");
  });

  it("renders accessible companion controls for all core subsystems", () => {
    render(<IntelligenceCore {...defaultProps} />);

    expect(screen.getByRole("navigation", { name: /intelligence core subsystem controls/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /access mission dossiers/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /access experience timeline/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /access knowledge matrix/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /engage jarvis intelligence/i })).toBeInTheDocument();
  });

  it("invokes navigation callbacks when companion buttons are clicked", () => {
    render(<IntelligenceCore {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /access mission dossiers/i }));
    expect(defaultProps.onNavigateDossiers).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /access experience timeline/i }));
    expect(defaultProps.onNavigateExperience).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /access knowledge matrix/i }));
    expect(defaultProps.onNavigateConstellation).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /engage jarvis intelligence/i }));
    expect(defaultProps.onToggleJarvis).toHaveBeenCalledTimes(1);
  });

  it("handles reduced-motion preference gracefully", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<IntelligenceCore {...defaultProps} />);
    expect(screen.getByTestId("intelligence-core-container")).toBeInTheDocument();
  });

  it("renders fallback HUD core seamlessly when WebGL is absent", () => {
    render(<IntelligenceCore {...defaultProps} />);
    // When WebGL is unavailable in test environment, FallbackCore renders with 2D HUD representation
    expect(screen.getByText(/INTELLIGENCE/i)).toBeInTheDocument();
    expect(screen.getByText(/REACTOR ACTIVE/i)).toBeInTheDocument();
  });
});
