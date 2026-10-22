import React from 'react';
import { RecoveryAction } from '../types';
import { CheckCircle2, Circle, ArrowRight, Printer, RotateCcw, AlertOctagon } from 'lucide-react';

interface ProgressTrackerProps {
  completedActionIds: Set<string>;
  allActions: RecoveryAction[];
  nextRecommendedAction: RecoveryAction | null;
  onResetSituation: () => void;
  onOpenPrintReport: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedActionIds,
  allActions,
  nextRecommendedAction,
  onResetSituation,
  onOpenPrintReport
}) => {
  const totalCount = allActions.length;
  const completedCount = completedActionIds.size;
  const remainingCount = Math.max(0, totalCount - completedCount);
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (totalCount === 0) return null;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 space-y-4">
      {/* Header and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
            <span>My Situation, My Checklist</span>
            <span aria-hidden="true">·</span>
            <span>Real-time Triage Tracker</span>
          </div>
          <h3 className="text-lg font-bold text-white">Your Progress</h3>
        </div>

        {/* Real-time counters */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>
              <strong className="text-white tabular-nums font-semibold text-sm">{completedCount}</strong> completed
            </span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Circle className="w-4 h-4 text-amber-400" />
            <span>
              <strong className="text-white tabular-nums font-semibold text-sm">{remainingCount}</strong> remaining
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar (reflecting actual checked actions) */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Completion status</span>
          <span className="tabular-nums font-mono text-slate-300">{percentage}% secured</span>
        </div>
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-teal-400 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Next Recommended Action Callout */}
      {nextRecommendedAction ? (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Next Priority</span>
              <span className="text-slate-400 font-normal">({nextRecommendedAction.category})</span>
            </div>
            <p className="text-sm font-semibold text-white leading-snug">
              {nextRecommendedAction.title}
            </p>
          </div>

          <a
            href={`#action-${nextRecommendedAction.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shrink-0"
          >
            <span>Jump to step</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-xs text-emerald-200 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            You have marked all immediate recommended recovery actions. Continue to monitor statements and follow up on any official complaints filed.
          </span>
        </div>
      )}

      {/* Action controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
        <button
          onClick={onResetSituation}
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Revise situation selections</span>
        </button>

        <button
          onClick={onOpenPrintReport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-teal-400" />
          <span>Print / Export Incident Record</span>
        </button>
      </div>
    </div>
  );
};
