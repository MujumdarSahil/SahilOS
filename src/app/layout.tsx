import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAHIL.OS 2.0 | Sahil Mujumdar — Data Scientist & AI Engineer",
  description:
    "Cinematic personal operating system and portfolio for Sahil Nitin Mujumdar. Featuring interactive mission dossiers, 3D intelligence core, capability constellation, and grounded JARVIS AI assistant.",
  keywords: [
    "Sahil Mujumdar",
    "Data Scientist",
    "AI Engineer",
    "Agentic AI",
    "RAG",
    "Machine Learning",
    "FastAPI",
    "PyTorch",
    "Portfolio",
    "Iron Man JARVIS OS",
  ],
  authors: [{ name: "Sahil Nitin Mujumdar" }],
  openGraph: {
    title: "SAHIL.OS 2.0 — AI Engineering Command Center",
    description:
      "Interactive digital operating system showcasing Sahil Mujumdar's verified AI projects, publications, and enterprise data systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-ice antialiased min-h-screen relative selection:bg-cyan/30 selection:text-cyan">
        {/* Subtle Ambient Grid Layer */}
        <div className="fixed inset-0 bg-tactical-grid pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
