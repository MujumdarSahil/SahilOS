import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { DossierDetailView } from "@/components/dossiers/DossierDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Dossier Not Found // SAHIL.OS 2.0",
      description: "Classified mission record not found within SAHIL.OS registry.",
    };
  }

  return {
    title: `${project.codename} // Mission Dossier — SAHIL.OS 2.0`,
    description: `${project.title}: ${project.summary}`,
    openGraph: {
      title: `${project.codename} — ${project.title}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function DossierPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <DossierDetailView dossier={project} />;
}
