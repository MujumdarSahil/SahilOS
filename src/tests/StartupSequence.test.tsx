import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StartupSequence } from "@/components/startup/StartupSequence";

describe("StartupSequence Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    // Default window.matchMedia mock
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

  it("renders the startup diagnostics and skip button", () => {
    const onComplete = vi.fn();
    render(<StartupSequence onComplete={onComplete} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/SKIP INITIALIZATION/i)).toBeInTheDocument();
    expect(screen.getByText(/DIAGNOSTIC TELEMETRY/i)).toBeInTheDocument();
  });

  it("invokes onComplete when clicking the skip button", () => {
    const onComplete = vi.fn();
    render(<StartupSequence onComplete={onComplete} />);

    const skipButton = screen.getByRole("button", { name: /skip initialization/i });
    fireEvent.click(skipButton);

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem("sahil_os_booted")).toBe("true");
  });

  it("invokes onComplete when pressing the Escape key", () => {
    const onComplete = vi.fn();
    render(<StartupSequence onComplete={onComplete} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("bypasses immediately if prefers-reduced-motion is enabled", () => {
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

    const onComplete = vi.fn();
    render(<StartupSequence onComplete={onComplete} />);

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("bypasses immediately if sahil_os_booted is already in sessionStorage", () => {
    sessionStorage.setItem("sahil_os_booted", "true");
    const onComplete = vi.fn();
    render(<StartupSequence onComplete={onComplete} />);

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
