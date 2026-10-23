export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  credentialUrl: string;
  category: "CLOUD & DEVOPS" | "DATA ENGINEERING" | "MACHINE LEARNING" | "CYBERSECURITY & NETWORKING" | "ANALYTICS";
  verified: boolean;
}

export const certificationsData: CertificationEntry[] = [
  {
    id: "zscaler-networking",
    name: "Networking Virtual Internship",
    issuer: "Zscaler",
    credentialUrl: "https://drive.google.com/file/d/1ttypuumrsjwe_2MVZjDkWZ-B2JXQGjMu/view?usp=drive_link",
    category: "CYBERSECURITY & NETWORKING",
    verified: true,
  },
  {
    id: "aws-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    credentialUrl: "https://drive.google.com/file/d/1duZ30ZbC4WwNzSOWZW-fSsqkEr0y5rts/view?usp=drive_link",
    category: "CLOUD & DEVOPS",
    verified: true,
  },
  {
    id: "kubernetes-foundation",
    name: "Kubernetes Foundation Certification",
    issuer: "Udemy",
    credentialUrl: "https://drive.google.com/file/d/10WmjAQmffuh9Fj5c7tOM_PUYbGkLDL2J/view?usp=drive_link",
    category: "CLOUD & DEVOPS",
    verified: true,
  },
  {
    id: "data-engineering-pro",
    name: "Data Engineering Professional",
    issuer: "Accredited Certification Board",
    credentialUrl: "https://drive.google.com/file/d/1cGOCm0TdbrdMwXQYEoklpjhYFAWXi6kf/view?usp=sharing",
    category: "DATA ENGINEERING",
    verified: true,
  },
  {
    id: "data-engineering-master",
    name: "Data Engineering Master",
    issuer: "Accredited Certification Board",
    credentialUrl: "https://drive.google.com/file/d/1r3ZtJ3532SxNyXnFWbSD6uNXQLEmWYeY/view?usp=sharing",
    category: "DATA ENGINEERING",
    verified: true,
  },
  {
    id: "ml-pro",
    name: "Machine Learning Professional",
    issuer: "Accredited Certification Board",
    credentialUrl: "https://drive.google.com/file/d/1If2UeTNM85t36NWs4Q4F__EDddpO-gLH/view?usp=sharing",
    category: "MACHINE LEARNING",
    verified: true,
  },
  {
    id: "ml-master",
    name: "Machine Learning Master",
    issuer: "Accredited Certification Board",
    credentialUrl: "https://drive.google.com/file/d/1VOpDUUP4flYkozxTGJ31cG3eo2px-SKS/view?usp=sharing",
    category: "MACHINE LEARNING",
    verified: true,
  },
  {
    id: "power-bi",
    name: "Power BI Data Analysis & Business Intelligence",
    issuer: "Udemy",
    credentialUrl: "https://drive.google.com/file/d/1vjpThnuDO1Ov0jO3kuv9OHbj4brOHSQV/view?usp=drive_link",
    category: "ANALYTICS",
    verified: true,
  },
];
