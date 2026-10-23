import { z } from "zod";

export const PersonalProfileSchema = z.object({
  name: z.string().min(1),
  codename: z.string().min(1),
  title: z.string().min(1),
  specialization: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  github: z.string().url(),
  linkedin: z.string().url(),
  resumeUrl: z.string().min(1),
  availability: z.string().min(1),
  clearanceLevel: z.string().min(1),
  bio: z.string().min(20),
  metrics: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      detail: z.string().min(1),
    })
  ),
});

export const MissionDossierSchema = z.object({
  id: z.string().min(1),
  codename: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  category: z.enum(["AI / AGENTIC", "LLM / RAG", "BLOCKCHAIN", "ML / PREDICTIVE"]),
  status: z.enum([
    "JOURNAL SUBMISSION",
    "ACTIVE DEPLOYMENT",
    "PUBLISHED (INCET 2025)",
    "RESEARCH COMPLETED",
  ]),
  maturityLevel: z.enum(["PRODUCTION DEPLOYED", "PEER-REVIEWED PUBLICATION", "JOURNAL UNDER PREPARATION", "RESEARCH PROTOTYPE"]),
  summary: z.string().min(20),
  objective: z.string().min(20),
  problemStatement: z.string().min(20),
  architecture: z.string().min(20),
  implementationDetails: z.array(z.string().min(5)),
  resultsAndEvidence: z.array(z.string().min(5)),
  limitationsAndLessons: z.array(z.string().min(5)),
  technologies: z.array(z.string().min(1)),
  repositoryUrl: z.string().url().optional(),
  paperUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  featured: z.boolean(),
  accentColor: z.enum(["cyan", "amber", "stark"]),
});

export const MissionEntrySchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  division: z.string().optional(),
  role: z.string().min(1),
  period: z.string().min(1),
  mode: z.enum(["ON-SITE", "HYBRID", "REMOTE"]),
  status: z.enum(["ACTIVE MISSION", "COMPLETED"]),
  summary: z.string().min(15),
  highlights: z.array(z.string().min(5)),
  techStack: z.array(z.string().min(1)),
});

export const PublicationEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  venue: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(["PUBLISHED", "IN REVIEW"]),
  statusColor: z.string().min(1),
  abstract: z.string().min(20),
  paperUrl: z.string().url().optional(),
  authors: z.array(z.string().min(1)),
});

export const CertificationEntrySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  issuer: z.string().min(1),
  credentialUrl: z.string().url(),
  category: z.enum([
    "CLOUD & DEVOPS",
    "DATA ENGINEERING",
    "MACHINE LEARNING",
    "CYBERSECURITY & NETWORKING",
    "ANALYTICS",
  ]),
  verified: z.literal(true),
});

export const GraphNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: z.enum(["core", "skill", "project", "research"]),
  size: z.number().positive(),
  connections: z.array(z.string().min(1)),
});
