import { describe, it, expect } from "vitest";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { publicationsData } from "@/data/publications";
import { certificationsData } from "@/data/certifications";
import { knowledgeConstellationNodes } from "@/data/skills";
import {
  PersonalProfileSchema,
  MissionDossierSchema,
  MissionEntrySchema,
  PublicationEntrySchema,
  CertificationEntrySchema,
  GraphNodeSchema,
} from "@/lib/validation/schemas";

describe("Phase 3: Zod Content Schema Validation", () => {
  it("validates the personal profile against PersonalProfileSchema", () => {
    expect(() => PersonalProfileSchema.parse(profileData)).not.toThrow();
  });

  it("validates all mission dossiers against MissionDossierSchema", () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(4);
    projectsData.forEach((project) => {
      expect(() => MissionDossierSchema.parse(project)).not.toThrow();
    });
  });

  it("validates experience entries against MissionEntrySchema", () => {
    expect(experienceData.length).toBe(3);
    experienceData.forEach((exp) => {
      expect(() => MissionEntrySchema.parse(exp)).not.toThrow();
    });
  });

  it("validates publication records against PublicationEntrySchema", () => {
    expect(publicationsData.length).toBeGreaterThanOrEqual(2);
    publicationsData.forEach((pub) => {
      expect(() => PublicationEntrySchema.parse(pub)).not.toThrow();
    });
  });

  it("validates certifications against CertificationEntrySchema", () => {
    expect(certificationsData.length).toBe(8);
    certificationsData.forEach((cert) => {
      expect(() => CertificationEntrySchema.parse(cert)).not.toThrow();
    });
  });

  it("validates knowledge constellation nodes against GraphNodeSchema", () => {
    knowledgeConstellationNodes.forEach((node) => {
      expect(() => GraphNodeSchema.parse(node)).not.toThrow();
    });
  });
});
