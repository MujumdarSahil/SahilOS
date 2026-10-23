import Link from "next/link";
import { AlertOctagon, ArrowLeft, Layers } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function DossierNotFound() {
  return (
    <div className="min-h-screen bg-obsidian text-ice flex flex-col items-center justify-center p-6 relative">
      <div className="hud-panel-amber max-w-lg w-full p-8 rounded-lg border border-amber/40 shadow-2xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center">
            <AlertOctagon className="h-8 w-8 text-amber animate-pulse" />
          </div>
        </div>

        <div>
          <span className="font-mono text-xs text-amber tracking-widest uppercase">
            {"// TELEMETRY ERROR 404: CLASSIFIED DOSSIER UNRESOLVED"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-ice mt-2">
            Mission Record Not Found
          </h1>
          <p className="font-mono text-xs text-ice-muted mt-2 leading-relaxed">
            The requested intelligence dossier identifier does not exist within the verified Stark-grade registry or requires higher clearance.
          </p>
        </div>

        {/* Valid Dossier Alternatives */}
        <div className="border-t border-amber/20 pt-4 text-left">
          <span className="font-mono text-[11px] text-amber block mb-2 font-semibold">
            AVAILABLE VERIFIED MISSION DOSSIERS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projectsData.map((project) => (
              <Link
                key={project.id}
                href={`/dossiers/${project.id}`}
                className="flex items-center space-x-2 rounded bg-gunmetal p-2 font-mono text-xs text-cyan hover:bg-cyan/15 hover:border-cyan/40 border border-cyan/15 transition"
              >
                <Layers className="h-3.5 w-3.5 text-cyan" />
                <span className="truncate">{project.codename}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 rounded border border-cyan/40 bg-cyan/15 px-4 py-2 font-mono text-xs text-cyan hover:bg-cyan/25 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO OPERATING SYSTEM</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
