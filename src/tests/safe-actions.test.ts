import { describe, it, expect } from "vitest";
import {
  SafeActionSchema,
  ALLOWED_SECTIONS,
  ALLOWED_DOSSIERS,
} from "@/lib/ai/actions";

describe("Phase 4: Safe Action Schemas & Boundaries", () => {
  it("approves valid navigate actions to allowed sections", () => {
    ALLOWED_SECTIONS.forEach((section) => {
      const validAction = {
        type: "navigate",
        targetSection: section,
        label: `Go to ${section}`,
      };
      expect(() => SafeActionSchema.parse(validAction)).not.toThrow();
    });
  });

  it("approves valid open_dossier actions to allowed project IDs", () => {
    ALLOWED_DOSSIERS.forEach((dossierId) => {
      const validAction = {
        type: "open_dossier",
        dossierId: dossierId,
        label: `Open ${dossierId}`,
      };
      expect(() => SafeActionSchema.parse(validAction)).not.toThrow();
    });
  });

  it("approves open_resume action", () => {
    const validAction = { type: "open_resume" };
    expect(() => SafeActionSchema.parse(validAction)).not.toThrow();
  });

  it("rejects unauthorized navigation targets", () => {
    const maliciousAction = {
      type: "navigate",
      targetSection: "admin-settings-unauthorized",
    };
    expect(() => SafeActionSchema.parse(maliciousAction)).toThrow();
  });

  it("rejects unauthorized dossier IDs", () => {
    const invalidDossier = {
      type: "open_dossier",
      dossierId: "unknown-secret-project",
    };
    expect(() => SafeActionSchema.parse(invalidDossier)).toThrow();
  });

  it("rejects script injection, shell commands, or arbitrary action types", () => {
    const arbitraryCode = {
      type: "eval",
      code: "alert('pwned')",
    };
    expect(() => SafeActionSchema.parse(arbitraryCode)).toThrow();
  });
});
