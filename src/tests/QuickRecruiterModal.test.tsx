import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuickRecruiterModal } from "@/components/hud/QuickRecruiterModal";

describe("QuickRecruiterModal Component", () => {
  const onClose = vi.fn();

  it("does not render when isOpen is false", () => {
    const { container } = render(<QuickRecruiterModal isOpen={false} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders recruiter information and career path when open", () => {
    render(<QuickRecruiterModal isOpen={true} onClose={onClose} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/RECRUITER 60-SECOND EXECUTIVE DOSSIER/i)).toBeInTheDocument();
    expect(screen.getByText("Sahil Nitin Mujumdar")).toBeInTheDocument();
    expect(screen.getByText("TOBOX VENTURES")).toBeInTheDocument();
    expect(screen.getByText("NATIONAL INFORMATICS CENTRE (NIC)")).toBeInTheDocument();
  });

  it("contains direct resume download link", () => {
    render(<QuickRecruiterModal isOpen={true} onClose={onClose} />);
    const resumeLink = screen.getByRole("link", { name: /download resume/i });
    expect(resumeLink).toHaveAttribute("href", "/resume-sahil.pdf");
  });

  it("closes on Escape key press", () => {
    render(<QuickRecruiterModal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
