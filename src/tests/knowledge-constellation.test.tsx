import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KnowledgeConstellation } from "@/components/constellation/KnowledgeConstellation";

describe("Phase 3: Knowledge Constellation & Alternative Views", () => {
  it("renders capability matrix by default", () => {
    render(<KnowledgeConstellation />);
    expect(screen.getByText("AI / ML FRAMEWORKS")).toBeInTheDocument();
    expect(screen.getByText("PYTHON & DATA ENG")).toBeInTheDocument();
  });

  it("switches to interactive relationship graph on tab click", () => {
    render(<KnowledgeConstellation />);

    const graphTabBtn = screen.getByRole("button", { name: /relationship graph/i });
    fireEvent.click(graphTabBtn);

    expect(screen.getByText(/NEURAL TOPOLOGY BUS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Knowledge Constellation Graph/i)).toBeInTheDocument();
  });

  it("allows selecting a node from the accessible directory and resets selection", () => {
    render(<KnowledgeConstellation />);

    const graphTabBtn = screen.getByRole("button", { name: /relationship graph/i });
    fireEvent.click(graphTabBtn);

    // Select the Python node
    const pythonBtn = screen.getByRole("button", { name: /Python & FastAPI/i });
    fireEvent.click(pythonBtn);

    expect(screen.getByText(/Directly Connected Entities/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset selection/i })).toBeInTheDocument();

    // Click reset selection
    const resetBtn = screen.getByRole("button", { name: /reset selection/i });
    fireEvent.click(resetBtn);

    expect(screen.queryByRole("button", { name: /reset selection/i })).not.toBeInTheDocument();
  });
});
