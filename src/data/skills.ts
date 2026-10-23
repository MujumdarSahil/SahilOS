export interface SkillMetric {
  label: string;
  category: string;
  proficiency: number;
  highlightColor: string;
  description: string;
}

export interface SkillCategoryGroup {
  category: string;
  skills: string[];
}

export const skillMetrics: SkillMetric[] = [
  {
    label: "AI / ML FRAMEWORKS",
    category: "Machine Learning",
    proficiency: 92,
    highlightColor: "#48DDF5",
    description: "PyTorch, TensorFlow, Scikit-Learn, Keras, OpenCV",
  },
  {
    label: "PYTHON & DATA ENG",
    category: "Core Engineering",
    proficiency: 88,
    highlightColor: "#48DDF5",
    description: "Python, SQL, ETL pipelines, Pandas, NumPy, Spark",
  },
  {
    label: "LLM & RAG SYSTEMS",
    category: "Generative AI",
    proficiency: 85,
    highlightColor: "#F3AE50",
    description: "FAISS, Vector Embeddings, Multi-Agent Orchestration, Guardrails",
  },
  {
    label: "CLOUD & DEVOPS",
    category: "Infrastructure",
    proficiency: 75,
    highlightColor: "#48DDF5",
    description: "AWS, GCP, Docker, Kubernetes, CI/CD, Microservices",
  },
  {
    label: "NLP & DEEP LEARNING",
    category: "Deep Learning",
    proficiency: 78,
    highlightColor: "#F3AE50",
    description: "Transformers, Sentiment Analysis, Named Entity Recognition, Tokenizers",
  },
  {
    label: "COMPUTER VISION",
    category: "Vision",
    proficiency: 72,
    highlightColor: "#48DDF5",
    description: "Object Detection, Image Classification, OpenCV pipelines",
  },
];

export const skillCategoryGroups: SkillCategoryGroup[] = [
  {
    category: "PROGRAMMING LANGUAGES",
    skills: ["Python", "SQL", "Java", "R", "TypeScript", "Solidity", "HTML5", "CSS3"],
  },
  {
    category: "MACHINE LEARNING & AI",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Keras",
      "OpenCV",
      "FAISS",
      "RAG Architectures",
      "Agentic AI",
      "NLP",
      "Hugging Face",
    ],
  },
  {
    category: "BACKEND & SERVING",
    skills: ["FastAPI", "Flask", "Streamlit", "ASP.NET", "RESTful APIs", "Pydantic"],
  },
  {
    category: "CLOUD & INFRASTRUCTURE",
    skills: ["AWS Cloud", "GCP", "Docker", "Kubernetes", "CI/CD Pipelines", "Apache Spark", "Hadoop"],
  },
  {
    category: "DATA STORAGE & CACHING",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQL Server (SSMS)"],
  },
  {
    category: "AI GOVERNANCE & SECURITY",
    skills: ["Zero Trust Security", "Ethical AI Guardrails", "Data Privacy & Governance", "Vulnerability Auditing"],
  },
  {
    category: "ANALYTICS & TOOLING",
    skills: ["Git", "GitHub", "Power BI", "Chart.js", "Jupyter", "Linux/Bash"],
  },
];

export interface GraphNode {
  id: string;
  label: string;
  category: "core" | "skill" | "project" | "research";
  size: number;
  connections: string[];
}

export const knowledgeConstellationNodes: GraphNode[] = [
  { id: "core", label: "SAHIL // AI ARCHITECT", category: "core", size: 24, connections: ["python", "rag", "agents", "ml", "blockchain"] },
  { id: "python", label: "Python & FastAPI", category: "skill", size: 18, connections: ["core", "medagentx", "omnitutor", "rag"] },
  { id: "rag", label: "RAG & FAISS", category: "skill", size: 16, connections: ["core", "python", "medagentx", "omnitutor"] },
  { id: "agents", label: "Agentic Workflows", category: "skill", size: 16, connections: ["core", "medagentx", "omnitutor"] },
  { id: "ml", label: "PyTorch & Scikit-Learn", category: "skill", size: 16, connections: ["core", "ammopredict", "cv"] },
  { id: "cv", label: "Computer Vision", category: "skill", size: 14, connections: ["ml"] },
  { id: "blockchain", label: "Blockchain & Solidity", category: "skill", size: 14, connections: ["core", "defenseledger"] },
  { id: "medagentx", label: "MedAgentX (E-Doctor)", category: "project", size: 20, connections: ["python", "rag", "agents", "paper_medagentx"] },
  { id: "omnitutor", label: "OmniTutor AI (Multi-LLM)", category: "project", size: 18, connections: ["python", "rag", "agents"] },
  { id: "defenseledger", label: "Defense.Ledger", category: "project", size: 18, connections: ["blockchain", "paper_defense"] },
  { id: "ammopredict", label: "Ammo.Predict", category: "project", size: 16, connections: ["ml", "python"] },
  { id: "paper_defense", label: "INCET 2025 Paper", category: "research", size: 14, connections: ["defenseledger"] },
  { id: "paper_medagentx", label: "Clinical AI Paper", category: "research", size: 14, connections: ["medagentx"] },
];
