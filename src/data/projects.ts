export interface MissionDossier {
  id: string;
  codename: string;
  title: string;
  date: string;
  category: "AI / AGENTIC" | "LLM / RAG" | "BLOCKCHAIN" | "ML / PREDICTIVE";
  status: "JOURNAL SUBMISSION" | "ACTIVE DEPLOYMENT" | "PUBLISHED (INCET 2025)" | "RESEARCH COMPLETED";
  maturityLevel: "PRODUCTION DEPLOYED" | "PEER-REVIEWED PUBLICATION" | "JOURNAL UNDER PREPARATION" | "RESEARCH PROTOTYPE";
  summary: string;
  objective: string;
  problemStatement: string;
  architecture: string;
  implementationDetails: string[];
  resultsAndEvidence: string[];
  limitationsAndLessons: string[];
  technologies: string[];
  repositoryUrl?: string;
  paperUrl?: string;
  demoUrl?: string;
  featured: boolean;
  accentColor: "cyan" | "amber" | "stark";
}

export const projectsData: MissionDossier[] = [
  {
    id: "medagentx",
    codename: "MEDAGENTX",
    title: "E-Doctor OS — Agentic AI Platform for Clinical Decision Support",
    date: "JUNE 2025",
    category: "AI / AGENTIC",
    status: "JOURNAL SUBMISSION",
    maturityLevel: "JOURNAL UNDER PREPARATION",
    summary:
      "Agentic AI platform empowering clinical practitioners and medical researchers with programmable recommendation agents, hybrid retrieval-augmented generation, and strict human-in-the-loop diagnostic guardrails.",
    objective:
      "Eliminate hallucination risks in clinical AI queries by orchestrating autonomous verification agents grounded against peer-reviewed medical corpora and clinical guidelines.",
    problemStatement:
      "Standard LLMs often generate inaccurate or overly generalized medical recommendations without clinical grounding or confidence bounds, posing severe safety risks in clinical decision support.",
    architecture:
      "Distributed micro-agent design: A triage agent routes symptoms to specialized diagnostic and pharmacology sub-agents; an orchestration supervisor synthesizes multi-agent findings through FAISS vector indexing and cross-references them against safety guardrails.",
    implementationDetails: [
      "Constructed high-speed asynchronous REST API using Python and FastAPI with streaming responses.",
      "Embedded clinical trial protocols, ICD-10 codings, and pharmacological guidelines into FAISS high-dimensional vector space.",
      "Implemented structured JSON output enforcement with Pydantic schemas to prevent prompt injection and hallucinated pharmacology doses.",
      "Built deterministic safety guardrail filter enforcing human physician sign-off before presenting therapeutic interventions.",
    ],
    resultsAndEvidence: [
      "Achieved sub-500ms retrieval latency across extensive medical knowledge bases.",
      "99.4% adherence to verified clinical guidelines in simulated validation runs.",
      "Drafted and submitted comprehensive research paper to peer-reviewed clinical informatics journal.",
    ],
    limitationsAndLessons: [
      "Real-world clinical adoption requires regional regulatory clearances (e.g. HIPAA / FDA Software as a Medical Device).",
      "Model outputs must explicitly declare uncertainty boundaries rather than binary assertions.",
    ],
    technologies: ["Python", "FastAPI", "RAG", "FAISS", "Multi-Agent Orchestration", "LLMs", "Clinical AI Guardrails"],
    paperUrl: "https://drive.google.com/file/d/1CvLnb9SIzECA-7HZunOlNNhWTUmLvGTe/view?usp=sharing",
    featured: true,
    accentColor: "cyan",
  },
  {
    id: "omnitutor-ai",
    codename: "OMNITUTOR AI",
    title: "Multi-LLM Orchestrator with Dynamic RAG",
    date: "JANUARY 2026",
    category: "LLM / RAG",
    status: "ACTIVE DEPLOYMENT",
    maturityLevel: "PRODUCTION DEPLOYED",
    summary:
      "High-availability LLM routing gateway dynamically balancing prompt workloads across OpenAI, Groq, and Google Gemini with FAISS vector search, circuit-breaker failovers, and real-time observability.",
    objective:
      "Prevent provider lock-in, eliminate single-point downtime, and optimize per-query latency and token cost across disparate AI backends.",
    problemStatement:
      "Relying on a single AI provider introduces severe vulnerability to upstream API rate limits, unexpected outages, and unpredictable inference cost spikes.",
    architecture:
      "Asynchronous proxy architecture featuring a dynamic load router, sliding-window cost optimizer, circuit breaker pattern, and unified semantic vector memory powered by FAISS.",
    implementationDetails: [
      "Engineered resilient multi-provider adapter layer wrapping OpenAI, Groq LPU inference, and Google Gemini 1.5/2.0.",
      "Integrated automated circuit-breaker pattern with exponential backoff and transparent fallback to secondary models on 429/503 errors.",
      "Implemented low-latency FAISS vector retrieval for localized document caching and semantic context deduplication.",
      "Built interactive telemetry dashboard using Streamlit to monitor query throughput, latency histograms, and token expenditures.",
    ],
    resultsAndEvidence: [
      "Maintained 99.98% uptime during simulated provider outage tests via automatic failover.",
      "Reduced average response latency by 45% by routing urgent queries to ultra-fast Groq LPUs.",
      "Decoupled client applications completely from proprietary provider API syntax.",
    ],
    limitationsAndLessons: [
      "Provider embedding spaces are non-interchangeable; standardized on unified vector normalization to prevent semantic drift.",
      "Token count estimation differs across tokenizers (tiktoken vs sentencepiece); unified server-side budget tracking.",
    ],
    technologies: ["FastAPI", "FAISS", "RAG", "OpenAI", "Groq", "Google Gemini", "Streamlit", "Python"],
    repositoryUrl: "https://github.com/MujumdarSahil",
    featured: true,
    accentColor: "cyan",
  },
  {
    id: "defense-ledger",
    codename: "DEFENSE.LEDGER",
    title: "Blockchain-Powered Ammunition & Supply Chain Protocol",
    date: "JUNE 2024",
    category: "BLOCKCHAIN",
    status: "PUBLISHED (INCET 2025)",
    maturityLevel: "PEER-REVIEWED PUBLICATION",
    summary:
      "Tamper-proof military ordnance tracking system utilizing Solidity smart contracts, cryptographic access controls, and immutable ledger logging for national defense logistics.",
    objective:
      "Guarantee absolute traceability, accountability, and fraud prevention in ammunition distribution through decentralized ledger technology.",
    problemStatement:
      "Conventional centralized supply chain systems suffer from single points of failure, vulnerable database audits, and risks of unauthorized diversion or falsified records in defense inventory.",
    architecture:
      "Decentralized ledger architecture deploying role-based Solidity smart contracts across validated nodes with cryptographic multi-signature authorization.",
    implementationDetails: [
      "Authored gas-optimized Solidity smart contracts enforcing role-based permissions (quartermaster, field depot, logistics operator).",
      "Integrated SHA-256 batch cryptographic verification linking physical ballistic serialization with ledger token states.",
      "Deployed automated trigger alerts for unauthorized deviation in ordnance custody or transfer thresholds.",
      "Presented peer-reviewed research at the 6th International Conference of Emerging Technology (INCET 2025).",
    ],
    resultsAndEvidence: [
      "100% audit immutability in simulated defense logistics stress tests.",
      "Peer-reviewed paper accepted and published in INCET 2025 proceedings at Jain College of Engineering, Belagavi, India.",
      "Zero vulnerability findings during static contract analysis with automated verification suites.",
    ],
    limitationsAndLessons: [
      "Public blockchain gas fees are prohibitive; optimized implementation for enterprise permissioned consortia (e.g. Hyperledger / Private EVM).",
      "Physical tracking hardware integration requires ruggedized tamper-evident RFID/NFC tagging.",
    ],
    technologies: ["Solidity", "Blockchain", "Smart Contracts", "Cryptography", "Web3", "Distributed Systems"],
    paperUrl: "https://drive.google.com/file/d/1CvLnb9SIzECA-7HZunOlNNhWTUmLvGTe/view?usp=sharing",
    featured: true,
    accentColor: "amber",
  },
  {
    id: "ammo-predict",
    codename: "AMMO.PREDICT",
    title: "Predictive Ammunition Logistics & Demand Forecasting",
    date: "APRIL 2024",
    category: "ML / PREDICTIVE",
    status: "RESEARCH COMPLETED",
    maturityLevel: "RESEARCH PROTOTYPE",
    summary:
      "End-to-end predictive machine learning framework forecasting supply consumption rates, wear thresholds, and procurement scheduling from multi-variable operational telemetry.",
    objective:
      "Eliminate logistical shortages and wasteful overstocking by applying advanced predictive regression and time-series modeling to munitions logistics.",
    problemStatement:
      "Supply procurement in defense operations historically relied on manual heuristics, causing critical latency in restocking and suboptimal budget allocation.",
    architecture:
      "Modular ML training and inference pipeline: feature normalization, anomaly detection, XGBoost/Random Forest regression, and dynamic visual analytics.",
    implementationDetails: [
      "Engineered automated preprocessing pipelines handling high-dimensional time-series data with Pandas and NumPy.",
      "Evaluated multiple regression and ensemble architectures (Random Forest, Gradient Boosting, Ridge Regression) for minimal RMSE.",
      "Integrated environmental degradation factors, operational frequency metrics, and historical deployment cadence.",
      "Constructed interactive data visualizations providing supply officers with forecast confidence intervals.",
    ],
    resultsAndEvidence: [
      "Achieved 89.2% forecast accuracy across historical multi-year logistical datasets.",
      "Reduced forecast turnaround from days of manual compilation to instantaneous automated model evaluation.",
    ],
    limitationsAndLessons: [
      "Black swan disruptions (extreme weather, geopolitical shocks) require human-overridable parameter multipliers.",
      "Data quality in legacy paper logs required extensive data cleaning and synthetic augmentation.",
    ],
    technologies: ["Python", "Scikit-Learn", "Machine Learning", "Pandas", "NumPy", "Data Visualization"],
    repositoryUrl: "https://github.com/MujumdarSahil",
    featured: false,
    accentColor: "amber",
  },
];
