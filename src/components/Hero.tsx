import React from 'react';
import { ArrowDown, ShieldCheck, Lock, Clock } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
  onOpenHelpline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick, onOpenHelpline }) => {
  return (
    <section className="bg-slate-900 text-white border-b border-slate-800 pt-8 pb-9 sm:pt-10 sm:pb-11 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Unboxed Tagline */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-teal-400 mb-3 tracking-wide">
          <span>KavachAI</span>
          <span aria-hidden="true">·</span>
          <span>Something went wrong. Here's what to do next.</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
          It's not too late to take the next step.
        </h1>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Clicked a suspicious link? Shared an OTP? Sent money? Tell us what happened. We'll help you prioritise what to do next.
        </p>

        {/* CTA Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
          <button
            onClick={onStartClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-md transition-colors whitespace-nowrap"
          >
            <span>Help Me Secure My Account</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHelpline}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Active Financial Loss? Call 1930</span>
          </button>
        </div>

        {/* Reassuring note */}
        <p className="text-xs text-slate-400 font-normal">
          You don't need to be certain that it's a scam to get guidance.
        </p>

        {/* Trust & Confidentiality markers (Unboxed metadata) */}
        <div className="mt-5 pt-4 border-t border-slate-800/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            100% private & client-side
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            No credentials or OTPs ever requested
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Zero judgment or blame</span>
        </div>
      </div>
    </section>
  );
};
