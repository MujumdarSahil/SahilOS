export interface MissionEntry {
  id: string;
  company: string;
  division?: string;
  role: string;
  period: string;
  mode: "ON-SITE" | "HYBRID" | "REMOTE";
  status: "ACTIVE MISSION" | "COMPLETED";
  summary: string;
  highlights: string[];
  techStack: string[];
}

export const experienceData: MissionEntry[] = [
  {
    id: "tobox-ventures",
    company: "TOBOX VENTURES",
    role: "Jr. Data Scientist",
    period: "JULY 2025 — PRESENT",
    mode: "ON-SITE",
    status: "ACTIVE MISSION",
    summary:
      "Assisting in the engineering and operationalization of predictive models and data pipelines using Python, SQL, and modern machine learning frameworks.",
    highlights: [
      "Engineered automated ETL data pipelines in Python and SQL, cutting analytical processing overhead.",
      "Developed statistical models and time-series forecasting algorithms delivering data-driven business intelligence.",
      "Conducted exploratory data analysis (EDA) and built dynamic metric dashboards for executive decision support.",
    ],
    techStack: ["Python", "SQL", "Scikit-Learn", "Pandas", "Statistical Analysis", "ETL Pipelines"],
  },
  {
    id: "national-informatics-centre",
    company: "NATIONAL INFORMATICS CENTRE (NIC)",
    division: "Government of India",
    role: "Data Analyst Intern",
    period: "JULY 2024 — JUNE 2025",
    mode: "HYBRID",
    status: "COMPLETED",
    summary:
      "Constructed secure high-throughput election monitoring systems, hardened national web applications, and optimized database access for federal civil infrastructure.",
    highlights: [
      "Built High-Impact Election Dashboard with ASP.NET, Chart.js, and SQL Server — achieved a 30% improvement in data accessibility and live decision speed.",
      "Conducted rigorous security audits identifying and patching critical vulnerabilities — resulted in a 40% enhancement in verified system security.",
      "Implemented Redis caching layer and modular HTML templates — reduced backend request latency by 25%.",
    ],
    techStack: ["ASP.NET", "Chart.js", "SQL Server", "Redis", "Security Auditing", "Vulnerability Remediation"],
  },
  {
    id: "zscaler-internship",
    company: "ZSCALER",
    role: "Networking Virtual Internship",
    period: "JULY 2024 — SEPT 2024",
    mode: "REMOTE",
    status: "COMPLETED",
    summary:
      "Deep specialization in Zero Trust Architecture (ZTA), cloud perimeter security, and threat mitigation across modern enterprise network topologies.",
    highlights: [
      "Completed intensive hands-on drills with Zscaler Zero Trust Exchange platform and secure cloud infrastructure transformations.",
      "Configured robust mitigation policies for secure web gateways, deep SSL inspection, and distributed cloud firewalls.",
      "Simulated enterprise threat scenarios, driving a 20% verified improvement in simulated network resilience.",
    ],
    techStack: ["Zero Trust Exchange", "SSL Inspection", "Cloud Security", "Firewall Policy", "Network Defense"],
  },
];
