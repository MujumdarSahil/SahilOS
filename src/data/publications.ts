export interface PublicationEntry {
  id: string;
  title: string;
  venue: string;
  date: string;
  status: "PUBLISHED" | "IN REVIEW";
  statusColor: string;
  abstract: string;
  paperUrl?: string;
  authors: string[];
}

export const publicationsData: PublicationEntry[] = [
  {
    id: "defense-ledger-incet",
    title: "Defense Ledger – Blockchain-Powered Ammunition and Supply Chain",
    venue: "6th International Conference of Emerging Technology (INCET 2025), Jain College of Engineering, Belagavi, India",
    date: "MAY 2025",
    status: "PUBLISHED",
    statusColor: "#F3AE50",
    abstract:
      "A novel decentralized architecture addressing vulnerability, transparency, and custodial integrity in defense logistics. Demonstrates how permissioned smart contracts and cryptographic serialization eliminate tampering, fraud, and unrecorded transfers in defense ammunition inventory.",
    paperUrl: "https://drive.google.com/file/d/1CvLnb9SIzECA-7HZunOlNNhWTUmLvGTe/view?usp=sharing",
    authors: ["Sahil Mujumdar et al."],
  },
  {
    id: "medagentx-journal",
    title: "MedAgentX: Agentic AI Platform for Clinical Decision Support",
    venue: "Journal Submission — Clinical Decision Support & Biomedical Informatics",
    date: "2025",
    status: "IN REVIEW",
    statusColor: "#48DDF5",
    abstract:
      "Investigating multi-agent orchestration for clinical AI systems. Implements retrieval-augmented generation coupled with strict clinical validation guardrails and human-in-the-loop diagnostic review to eliminate hallucination risks in automated healthcare recommendation pipelines.",
    paperUrl: "https://drive.google.com/file/d/1CvLnb9SIzECA-7HZunOlNNhWTUmLvGTe/view?usp=sharing",
    authors: ["Sahil Mujumdar et al."],
  },
];
