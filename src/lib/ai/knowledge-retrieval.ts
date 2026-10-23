import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { publicationsData } from "@/data/publications";
import { certificationsData } from "@/data/certifications";
import { skillMetrics, skillCategoryGroups } from "@/data/skills";
import { SafeAction } from "./actions";

export interface GroundedRetrievalResult {
  response: string;
  sources: string[];
  action?: SafeAction;
  confidence: number;
}

export function resolveGroundedQuery(query: string): GroundedRetrievalResult {
  const q = query.toLowerCase().trim();

  // 1. Projects & Architecture queries
  if (q.includes("medagentx") || q.includes("e-doctor") || q.includes("clinical")) {
    const p = projectsData.find((proj) => proj.id === "medagentx");
    return {
      response: `MedAgentX is an Agentic AI Platform for Clinical Decision Support authored by Sahil. It coordinates specialized diagnosis and pharmacology sub-agents grounded with FAISS retrieval and deterministic clinical guardrails to eliminate hallucination. A research paper is currently under preparation for peer review.`,
      sources: ["/dossiers/medagentx", "Research Archive"],
      action: { type: "open_dossier", dossierId: "medagentx", label: "Inspect MedAgentX Dossier" },
      confidence: 0.98,
    };
  }

  if (q.includes("omnitutor") || q.includes("multi-llm") || q.includes("orchestrat") || q.includes("gateway")) {
    const p = projectsData.find((proj) => proj.id === "omnitutor-ai");
    return {
      response: `OmniTutor AI is a production-grade multi-LLM orchestration gateway built with FastAPI, FAISS, and Streamlit. It dynamically routes prompt workloads across OpenAI, Groq (ultra-fast inference), and Google Gemini with automated circuit-breaker failovers and localized vector caching.`,
      sources: ["/dossiers/omnitutor-ai"],
      action: { type: "open_dossier", dossierId: "omnitutor-ai", label: "Inspect OmniTutor AI Dossier" },
      confidence: 0.98,
    };
  }

  if (q.includes("defense") || q.includes("ledger") || q.includes("ammunition") || q.includes("incet") || q.includes("blockchain")) {
    if (q.includes("predict") || q.includes("forecast")) {
      return {
        response: `Ammo.Predict is an end-to-end predictive machine learning framework developed in Python with Scikit-Learn that forecasts munitions consumption rates, wear thresholds, and procurement scheduling using multivariate regression.`,
        sources: ["/dossiers/ammo-predict"],
        action: { type: "open_dossier", dossierId: "ammo-predict", label: "Inspect Ammo.Predict Dossier" },
        confidence: 0.95,
      };
    }
    return {
      response: `Defense Ledger is a tamper-proof military ordnance tracking system utilizing Solidity smart contracts and cryptographic logging. The research was peer-reviewed, accepted, and published at the 6th International Conference of Emerging Technology (INCET 2025) in Belagavi, India.`,
      sources: ["/dossiers/defense-ledger", "INCET 2025 Proceedings"],
      action: { type: "open_dossier", dossierId: "defense-ledger", label: "Inspect Defense.Ledger Dossier" },
      confidence: 0.98,
    };
  }

  if (q.includes("llm") || q.includes("rag") || q.includes("agent") || q.includes("built with llm")) {
    return {
      response: `Sahil has architected two major LLM systems: 1) OmniTutor AI (multi-LLM dynamic routing across OpenAI, Groq, and Gemini with FAISS and circuit breakers), and 2) MedAgentX (agentic clinical decision platform with multi-agent orchestration and safety guardrails). Both emphasize low latency and strict hallucination prevention.`,
      sources: ["/dossiers/omnitutor-ai", "/dossiers/medagentx"],
      action: { type: "navigate", targetSection: "dossiers", label: "View Mission Dossiers" },
      confidence: 0.96,
    };
  }

  // 2. Experience & Work History queries
  if (q.includes("nic") || q.includes("national informatics") || q.includes("government")) {
    const nic = experienceData.find((e) => e.id === "national-informatics-centre");
    return {
      response: `At the National Informatics Centre (NIC), Government of India (July 2024 – June 2025), Sahil served as a Data Analyst Intern. He built an Election Dashboard with ASP.NET, Chart.js, and SQL Server (30% boost in decision accessibility), conducted security audits mitigating vulnerabilities (40% enhancement), and implemented Redis caching (25% latency reduction).`,
      sources: ["Experience Timeline // NIC"],
      action: { type: "navigate", targetSection: "experience", label: "View Experience Timeline" },
      confidence: 0.98,
    };
  }

  if (q.includes("tobox") || q.includes("current job") || q.includes("present role")) {
    return {
      response: `Sahil is currently a Jr. Data Scientist at Tobox Ventures (July 2025 – Present, On-site). He engineers automated predictive pipelines and statistical models using Python, SQL, and Scikit-Learn to derive actionable business intelligence.`,
      sources: ["Experience Timeline // Tobox Ventures"],
      action: { type: "navigate", targetSection: "experience", label: "View Experience Timeline" },
      confidence: 0.98,
    };
  }

  if (q.includes("zscaler") || q.includes("networking") || q.includes("zero trust")) {
    return {
      response: `Sahil completed a Networking Virtual Internship at Zscaler (July 2024 – Sept 2024), specializing in Zero Trust Architecture (ZTA), cloud web security, SSL inspection policies, and enterprise network resilience drills.`,
      sources: ["Experience Timeline // Zscaler", "Credential Registry"],
      action: { type: "navigate", targetSection: "certifications", label: "View Zscaler Credential" },
      confidence: 0.96,
    };
  }

  if (q.includes("experience") || q.includes("career") || q.includes("background") || q.includes("history")) {
    return {
      response: `Sahil's verified trajectory spans 1+ years in AI and data engineering: Jr. Data Scientist at Tobox Ventures (current), Data Analyst Intern at National Informatics Centre (Govt. of India), and Networking Specialist Intern at Zscaler.`,
      sources: ["Experience Timeline"],
      action: { type: "navigate", targetSection: "experience", label: "View Experience Timeline" },
      confidence: 0.95,
    };
  }

  // 3. Publications & Academic research
  if (q.includes("publication") || q.includes("paper") || q.includes("research") || q.includes("journal") || q.includes("conference")) {
    const papers = publicationsData.map((p) => `"${p.title}" (${p.status} · ${p.venue})`).join("\n\n");
    return {
      response: `Sahil has 2 major publication records:\n\n${papers}\n\nBoth papers feature external verified PDF and Google Drive documents.`,
      sources: ["Research Archive"],
      action: { type: "navigate", targetSection: "publications", label: "View Research Archive" },
      confidence: 0.98,
    };
  }

  // 4. Certifications queries
  if (q.includes("cert") || q.includes("license") || q.includes("credential") || q.includes("aws") || q.includes("kubernetes")) {
    const list = certificationsData.map((c) => `• ${c.name} (${c.issuer})`).join("\n");
    return {
      response: `Sahil holds 8 verified industry certifications across Cloud, Machine Learning, Data Engineering, and Security:\n\n${list}\n\nAll credentials feature authentic verification links in the Credential Registry.`,
      sources: ["Credential Registry"],
      action: { type: "navigate", targetSection: "certifications", label: "View Credential Registry" },
      confidence: 0.98,
    };
  }

  // 5. Skills & Tech Stack queries
  if (q.includes("skill") || q.includes("stack") || q.includes("python") || q.includes("pytorch") || q.includes("fastapi")) {
    return {
      response: `Sahil's core competencies center on AI/ML Frameworks (92% proficiency in PyTorch, TensorFlow, Scikit-Learn), Python & Data Engineering (88%), and LLM / RAG Systems (85% with FAISS, multi-agent frameworks, and guardrails). Cloud & DevOps spans AWS, Docker, and Kubernetes.`,
      sources: ["Knowledge Constellation"],
      action: { type: "navigate", targetSection: "constellation", label: "Explore Capability Matrix" },
      confidence: 0.95,
    };
  }

  // 6. Resume & Contact queries
  if (q.includes("resume") || q.includes("cv")) {
    return {
      response: `Sahil's verified resume is available for immediate download as a PDF document. You can also view his 60-Second Recruiter Dossier.`,
      sources: ["/resume-sahil.pdf"],
      action: { type: "open_resume" },
      confidence: 0.99,
    };
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("linkedin") || q.includes("github")) {
    return {
      response: `Sahil Nitin Mujumdar is based in Mumbai, India and is available for high-impact AI/ML engineering roles.\n\n• Email: ${profileData.email}\n• Phone: ${profileData.phoneDisplay}\n• GitHub: ${profileData.github}\n• LinkedIn: ${profileData.linkedin}`,
      sources: ["Profile Registry"],
      confidence: 0.99,
    };
  }

  // 7. Unverified or out-of-scope query
  return {
    response: `I do not possess verified operational data regarding "${query}". As a grounded JARVIS assistant, I am restricted to Sahil Mujumdar's authenticated engineering missions, publications, skills, and professional credentials. Please ask about his machine learning architectures, experience at Tobox/NIC/Zscaler, or research papers.`,
    sources: ["SAHIL.OS Directive Policy"],
    confidence: 0.4,
  };
}
