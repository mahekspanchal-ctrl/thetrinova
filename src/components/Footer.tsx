import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenHelpline: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelpline }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 px-4 sm:px-6 text-xs">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Wordmark & Principle */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span>KavachAI</span>
            </div>
            <p className="text-slate-300 text-sm font-medium">
              Something went wrong. Here's what to do next.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Most scam tools focus on before an attack happens. KavachAI focuses on the difficult moment right after. We provide clear, prioritised, and calm recovery steps without blame or false promises.
            </p>
          </div>

          {/* Col 2: Official Portals */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Official Indian Channels
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={onOpenHelpline}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  National Helpline 1930
                </button>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in/sfc/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Chakshu Portal (DoT)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://myaadhaar.uidai.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>UIDAI Biometric Lock</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Ethics */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Prototype Transparency
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              KavachAI is a rule-based guided recovery prototype developed for university hackathon demonstration. It uses transparent, condition-based triage logic rather than speculative AI models. All operations run locally inside your browser; no personal incident data or secrets are stored.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} KavachAI · Built for University Hackathon · Empathetic Cyber Incident Triage
          </div>
          <div className="flex items-center gap-1">
            <span>Designed with care for victims of digital fraud</span>
            <Heart className="w-3 h-3 text-teal-500 fill-teal-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
