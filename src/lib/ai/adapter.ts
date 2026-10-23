import { SafeAction, SafeActionSchema } from "./actions";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";

export const ALLOWED_FREE_MODELS = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash-8b",
] as const;

export type AllowedModel = (typeof ALLOWED_FREE_MODELS)[number];

export interface GeminiResponse {
  response: string;
  sources: string[];
  action?: SafeAction;
}

export async function callGeminiAssistant(
  prompt: string,
  history: { role: string; content: string }[] = []
): Promise<GeminiResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return null; // Gracefully signal fallback to local retrieval
  }

  // Model selection with strict allowlist
  const requestedModel = process.env.AI_MODEL || "gemini-1.5-flash";
  const model = ALLOWED_FREE_MODELS.includes(requestedModel as AllowedModel)
    ? requestedModel
    : "gemini-1.5-flash";

  const systemInstruction = `
You are JARVIS, an advanced AI copilot and operating system interface for Sahil Nitin Mujumdar (Data Scientist & AI Engineer from Mumbai, India).
Answer questions strictly from the verified facts below. Never invent metrics, employers, or credentials.
If information is not known, explicitly state that you do not have verified records on it.

Verified Profile:
- Name: ${profileData.name}
- Title: ${profileData.title}
- Location: ${profileData.location}
- Email: ${profileData.email}
- Phone: ${profileData.phoneDisplay}
- Current Job: Jr. Data Scientist at Tobox Ventures (July 2025 - Present)
- Prior Experience: Data Analyst Intern at National Informatics Centre (NIC), Govt. of India (July 2024 - June 2025); Networking Intern at Zscaler (July 2024 - Sept 2024)
- Projects:
${projectsData.map((p) => `  * ${p.codename}: ${p.title} (${p.category}, Status: ${p.status})`).join("\n")}
- Publications: Defense Ledger (Published at INCET 2025), MedAgentX (Journal submission under preparation)
- Certifications: AWS Cloud Foundations, Zscaler Networking, Udemy Kubernetes, Data Engineering Pro/Master, ML Pro/Master, Power BI

Respond in strict JSON format:
{
  "response": "Concise, technical, grounded answer in Stark-grade style.",
  "sources": ["source reference name"],
  "action": optional action object like {"type": "navigate", "targetSection": "dossiers"} or {"type": "open_dossier", "dossierId": "medagentx"} or {"type": "open_resume"}
}
`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const formattedContents = [
      ...history.slice(-4).map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      { role: "user", parts: [{ text: prompt }] },
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
          responseMimeType: "application/json",
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Gemini API responded with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    let validatedAction: SafeAction | undefined = undefined;

    if (parsed.action) {
      const actionParse = SafeActionSchema.safeParse(parsed.action);
      if (actionParse.success) {
        validatedAction = actionParse.data;
      }
    }

    return {
      response: typeof parsed.response === "string" ? parsed.response : String(parsed),
      sources: Array.isArray(parsed.sources) ? parsed.sources : ["Verified Knowledge Base"],
      action: validatedAction,
    };
  } catch (error) {
    console.warn("Gemini call failed or timed out. Falling back to local retrieval:", error);
    return null;
  }
}
