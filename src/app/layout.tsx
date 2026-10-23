import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-obsidian text-ice antialiased min-h-screen relative selection:bg-cyan/30 selection:text-cyan font-sans">
        {/* Subtle Ambient Grid Layer */}
        <div className="fixed inset-0 bg-tactical-grid pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
