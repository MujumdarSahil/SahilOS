import { describe, it, expect } from "vitest";
import { resolveGroundedQuery } from "@/lib/ai/knowledge-retrieval";

describe("Phase 4: Grounded Knowledge Retrieval Engine", () => {
  it("resolves queries regarding MedAgentX with verified facts and dossier action", () => {
    const result = resolveGroundedQuery("Tell me about MedAgentX");
    expect(result.response).toContain("Agentic AI Platform for Clinical Decision Support");
    expect(result.sources).toContain("/dossiers/medagentx");
    expect(result.action?.type).toBe("open_dossier");
    expect(result.action && "dossierId" in result.action ? result.action.dossierId : "").toBe("medagentx");
    expect(result.confidence).toBeGreaterThan(0.9);
  });

  it("resolves queries regarding OmniTutor AI with dynamic routing facts", () => {
    const result = resolveGroundedQuery("What is OmniTutor AI?");
    expect(result.response).toContain("multi-LLM orchestration gateway");
    expect(result.sources).toContain("/dossiers/omnitutor-ai");
    expect(result.action?.type).toBe("open_dossier");
  });

  it("resolves experience at NIC with quantitative verified metrics", () => {
    const result = resolveGroundedQuery("Summarize his experience at NIC");
    expect(result.response).toContain("National Informatics Centre");
    expect(result.response).toContain("30%");
    expect(result.response).toContain("40%");
    expect(result.response).toContain("Redis");
    expect(result.action?.type).toBe("navigate");
  });

  it("resolves publication records including INCET 2025 conference", () => {
    const result = resolveGroundedQuery("Show me his research publications");
    expect(result.response).toContain("Defense Ledger");
    expect(result.response).toContain("INCET 2025");
    expect(result.action?.type).toBe("navigate");
  });

  it("resolves verified industry certifications", () => {
    const result = resolveGroundedQuery("List his certifications with links");
    expect(result.response).toContain("AWS");
    expect(result.response).toContain("Zscaler");
    expect(result.response).toContain("Kubernetes");
    expect(result.sources).toContain("Credential Registry");
  });

  it("resolves contact and location requests", () => {
    const result = resolveGroundedQuery("How do I contact Sahil?");
    expect(result.response).toContain("Mumbai, India");
    expect(result.response).toContain("21107050.sahil.mujumdar@gmail.com");
  });

  it("acknowledges unknown queries honestly without fabricating answers", () => {
    const result = resolveGroundedQuery("What is Sahil's favorite pizza topping?");
    expect(result.response).toContain("I do not possess verified operational data");
    expect(result.confidence).toBeLessThan(0.5);
  });
});
