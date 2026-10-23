import { z } from "zod";

export const ALLOWED_SECTIONS = [
  "command-center",
  "dossiers",
  "experience",
  "constellation",
  "publications",
  "certifications",
] as const;

export const ALLOWED_DOSSIERS = [
  "medagentx",
  "omnitutor-ai",
  "defense-ledger",
  "ammo-predict",
] as const;

export const NavigateActionSchema = z.object({
  type: z.literal("navigate"),
  targetSection: z.enum(ALLOWED_SECTIONS),
  label: z.string().optional(),
});

export const OpenDossierActionSchema = z.object({
  type: z.literal("open_dossier"),
  dossierId: z.enum(ALLOWED_DOSSIERS),
  label: z.string().optional(),
});

export const HighlightSkillActionSchema = z.object({
  type: z.literal("highlight_skill"),
  skillName: z.string().min(1).max(50),
  label: z.string().optional(),
});

export const OpenResumeActionSchema = z.object({
  type: z.literal("open_resume"),
  label: z.string().optional(),
});

export const SafeActionSchema = z.discriminatedUnion("type", [
  NavigateActionSchema,
  OpenDossierActionSchema,
  HighlightSkillActionSchema,
  OpenResumeActionSchema,
]);

export type SafeAction = z.infer<typeof SafeActionSchema>;

export function getActionLabel(action: SafeAction): string {
  if (action.label) return action.label;
  if (action.type === "open_resume") return "Open Verified Resume (PDF)";
  if (action.type === "highlight_skill") return `Inspect Skill: ${action.skillName}`;
  if (action.type === "navigate") return `Navigate to ${action.targetSection.toUpperCase()}`;
  if (action.type === "open_dossier") return `Open Dossier: ${action.dossierId.toUpperCase()}`;
  return "EXECUTE DIRECTIVE";
}
