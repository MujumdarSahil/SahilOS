"use client";

import React from "react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { certificationsData } from "@/data/certifications";

export const CredentialRegistry: React.FC = () => {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 pb-4 border-b border-cyan/15">
        <div className="flex items-center space-x-2 font-mono text-xs text-cyan tracking-widest mb-1">
          <Award className="h-4 w-4" />
          <span>// CREDENTIAL.REGISTRY — VERIFIED LICENSES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ice">
          Certifications & Accreditations
        </h2>
        <p className="text-sm font-mono text-ice-muted mt-1">
          {certificationsData.length} authenticated credentials across cloud, machine learning, data engineering, and network architecture.
        </p>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certificationsData.map((cert) => (
          <a
            key={cert.id}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-panel rounded-lg p-5 flex flex-col justify-between hover:border-cyan/50 hover:-translate-y-1 transition duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                  {cert.category}
                </span>
                <ShieldCheck className="h-4 w-4 text-stark-green" />
              </div>

              <h3 className="font-bold font-sans text-sm text-ice group-hover:text-cyan transition mb-1">
                {cert.name}
              </h3>
              <p className="font-mono text-xs text-ice-muted">
                {cert.issuer}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan/10 flex items-center justify-between text-cyan font-mono text-xs">
              <span>VERIFY CERTIFICATE</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
