export interface PersonalProfile {
  name: string;
  codename: string;
  title: string;
  specialization: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  availability: string;
  clearanceLevel: string;
  bio: string;
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const profileData: PersonalProfile = {
  name: "Sahil Nitin Mujumdar",
  codename: "OPERATOR // SAHIL",
  title: "Data Scientist & AI Engineer",
  specialization: "Agentic AI Architectures, Advanced RAG & Distributed ML Systems",
  location: "Mumbai, Maharashtra, India",
  email: "21107050.sahil.mujumdar@gmail.com",
  phone: "+917588005913",
  phoneDisplay: "+91 75880 05913",
  github: "https://github.com/MujumdarSahil",
  linkedin: "https://www.linkedin.com/in/sahil-mujumdar-2ba179268/",
  resumeUrl: "/resume-sahil.pdf",
  availability: "AVAILABLE FOR HIGH-IMPACT AI ENGINEERING & DATA ROLES",
  clearanceLevel: "LEVEL-05 (AUTHORIZED RESEARCH & GOVT CREDENTIALS)",
  bio: "AI/Data Science engineer with proven experience constructing production-ready machine learning systems, computer vision pipelines, and multi-agent LLM orchestrators. Proficient in Python, FastAPI, PyTorch, and TensorFlow with deep hands-on expertise in RAG pipelines, real-time AI systems, and secure deployment architectures across enterprise and government infrastructure.",
  metrics: [
    { label: "EXPERIENCE", value: "1+ YRS", detail: "Active ML/Data Engineering" },
    { label: "SYSTEMS BUILT", value: "4+", detail: "Autonomous & RAG Platforms" },
    { label: "PUBLICATIONS", value: "2", detail: "Peer-Reviewed & Submitted" },
    { label: "CREDENTIALS", value: "8", detail: "AWS, Zscaler, Data & ML" },
  ],
};
