import { describe, it, expect } from "vitest";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { publicationsData } from "@/data/publications";
import { certificationsData } from "@/data/certifications";
import { skillMetrics, skillCategoryGroups } from "@/data/skills";

describe("Data Integrity & Grounding Tests", () => {
  it("verifies accurate profile identity and contact information", () => {
    expect(profileData.name).toBe("Sahil Nitin Mujumdar");
    expect(profileData.email).toBe("21107050.sahil.mujumdar@gmail.com");
    expect(profileData.phone).toBe("+917588005913");
    expect(profileData.github).toContain("github.com/MujumdarSahil");
    expect(profileData.linkedin).toContain("linkedin.com/in/sahil-mujumdar");
    expect(profileData.resumeUrl).toBe("/resume-sahil.pdf");
  });

  it("ensures all mission dossiers contain complete engineering case study sections", () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(4);
    projectsData.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.codename).toBeDefined();
      expect(project.objective.length).toBeGreaterThan(10);
      expect(project.problemStatement.length).toBeGreaterThan(10);
      expect(project.architecture.length).toBeGreaterThan(10);
      expect(project.implementationDetails.length).toBeGreaterThan(0);
      expect(project.resultsAndEvidence.length).toBeGreaterThan(0);
      expect(project.limitationsAndLessons.length).toBeGreaterThan(0);
      expect(project.technologies.length).toBeGreaterThan(0);
    });
  });

  it("verifies accurate experience timeline and roles", () => {
    expect(experienceData.length).toBe(3);
    const companies = experienceData.map((e) => e.company);
    expect(companies).toContain("TOBOX VENTURES");
    expect(companies).toContain("NATIONAL INFORMATICS CENTRE (NIC)");
    expect(companies).toContain("ZSCALER");
  });

  it("verifies peer-reviewed publications and conference record", () => {
    expect(publicationsData.length).toBeGreaterThanOrEqual(2);
    const incetPaper = publicationsData.find((p) => p.id === "defense-ledger-incet");
    expect(incetPaper).toBeDefined();
    expect(incetPaper?.status).toBe("PUBLISHED");
    expect(incetPaper?.venue).toContain("INCET 2025");
  });

  it("verifies certifications with active credential links", () => {
    expect(certificationsData.length).toBe(8);
    certificationsData.forEach((cert) => {
      expect(cert.credentialUrl).toMatch(/^https?:\/\//);
      expect(cert.verified).toBe(true);
    });
  });

  it("verifies skill categories and metrics are well-formed", () => {
    expect(skillMetrics.length).toBe(6);
    expect(skillCategoryGroups.length).toBeGreaterThanOrEqual(5);
  });
});
