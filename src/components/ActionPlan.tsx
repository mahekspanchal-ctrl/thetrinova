import React from 'react';
import { RecoveryAction, ActionCategory } from '../types';
import {
  CheckSquare,
  Square,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Info,
  PhoneCall
} from 'lucide-react';

interface ActionPlanProps {
  doFirst: RecoveryAction[];
  doNext: RecoveryAction[];
  getHelp: RecoveryAction[];
  completedActionIds: Set<string>;
  onToggleAction: (id: string) => void;
  onOpenHelpline: () => void;
}

export const ActionPlan: React.FC<ActionPlanProps> = ({
  doFirst,
  doNext,
  getHelp,
  completedActionIds,
  onToggleAction,
  onOpenHelpline
}) => {
  const sections: {
    category: ActionCategory;
    title: string;
    subtitle: string;
    actions: RecoveryAction[];
    headerColor: string;
    badgeStyle: string;
  }[] = [
    {
      category: 'DO THIS FIRST',
      title: 'DO THIS FIRST',
      subtitle: 'Immediate actions that contain damage and reduce ongoing risk.',
      actions: doFirst,
      headerColor: 'text-amber-900 border-amber-300',
      badgeStyle: 'text-amber-800'
    },
    {
      category: 'DO THIS NEXT',
      title: 'DO THIS NEXT',
      subtitle: 'Additional steps to secure affected accounts, devices, and future identity.',
      actions: doNext,
      headerColor: 'text-slate-800 border-slate-200',
      badgeStyle: 'text-slate-700'
    },
    {
      category: 'GET HELP',
      title: 'GET HELP',
      subtitle: 'Official law enforcement reporting channels, national portals, and bank desks.',
      actions: getHelp,
      headerColor: 'text-teal-900 border-teal-200',
      badgeStyle: 'text-teal-800'
    }
  ];

  const totalActions = doFirst.length + doNext.length + getHelp.length;

  if (totalActions === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
        <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          Select what happened above to generate your action plan
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Choose the events from the options above or select one of the test scenarios to view tailored next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
          <span>Personalised Action Plan</span>
          <span aria-hidden="true">·</span>
          <span>Condition-based Priority Engine</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Your Next Steps
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Follow these actions in order. We have prioritised them to prevent further unauthorized access before taking secondary administrative steps.
        </p>
      </div>

      {/* Realistic Expectations Notice */}
      <div className="p-4 bg-slate-100/90 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-900">Realistic expectations:</span> KavachAI provides structured triage steps to stop continued damage and formally notify institutions. While acting rapidly in the initial hours maximizes the chance of freezing unauthorized transfers, no software can guarantee 100% financial recovery.
        </div>
      </div>

      {/* The 3 Ordered Sections */}
      {sections.map((sec) => {
        if (sec.actions.length === 0) return null;

        return (
          <section key={sec.category} className="space-y-4">
            {/* Section Header (Unboxed clean text) */}
            <div className="border-b pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base font-bold tracking-tight text-slate-900">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {sec.subtitle}
                </p>
              </div>
              <span className="text-xs text-slate-400 tabular-nums">
                {sec.actions.filter((a) => completedActionIds.has(a.id)).length} of {sec.actions.length} completed
              </span>
            </div>

            {/* Action Cards List */}
            <div className="space-y-4">
              {sec.actions.map((action, index) => {
                const isCompleted = completedActionIds.has(action.id);

                return (
                  <div
                    key={action.id}
                    id={`action-${action.id}`}
                    className={`rounded-xl border transition-all p-5 sm:p-6 ${
                      isCompleted
                        ? 'bg-slate-50/70 border-slate-200 opacity-75'
                        : sec.category === 'DO THIS FIRST'
                        ? 'bg-white border-amber-300/80 shadow-xs ring-1 ring-amber-400/20'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => onToggleAction(action.id)}
                        className={`mt-1 p-1 rounded hover:bg-slate-100 transition-colors shrink-0 ${
                          isCompleted ? 'text-teal-600' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        aria-label={`Mark step ${action.title} as completed`}
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>

                      {/* Main Details */}
                      <div className="flex-1 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <h4
                            className={`text-base font-semibold leading-snug ${
                              isCompleted
                                ? 'line-through text-slate-500'
                                : 'text-slate-900'
                            }`}
                          >
                            <span className="tabular-nums font-mono text-xs text-slate-400 mr-2">
                              {index + 1}.
                            </span>
                            {action.title}
                          </h4>

                          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                            {action.urgencyLevel === 'immediate' && (
                              <span className="font-semibold text-amber-700">Immediate</span>
                            )}
                            {action.urgencyLevel === 'high' && (
                              <span className="font-semibold text-slate-700">High priority</span>
                            )}
                            {action.urgencyLevel === 'recommended' && (
                              <span className="text-slate-500">Recommended</span>
                            )}
                          </div>
                        </div>

                        {/* Distinctive Feature: "Why this step comes first" */}
                        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs leading-relaxed space-y-1">
                          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>Why this step comes first</span>
                          </div>
                          <p className="text-slate-600 pl-5">
                            {action.whyThisFirst}
                          </p>
                        </div>

                        {/* Safe Execution Steps */}
                        <div className="space-y-1.5 text-xs">
                          <div className="font-semibold text-slate-800">
                            How to carry it out safely:
                          </div>
                          <ul className="space-y-1 text-slate-600 pl-1">
                            {action.howToCarryOut.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <span className="text-teal-600 font-bold shrink-0">·</span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action buttons (Helpline or External Links) */}
                        {(action.officialLink || action.helplineReference) && (
                          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                            {action.officialLink && (
                              <a
                                href={action.officialLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                              >
                                <span>Open Official Portal</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {action.helplineReference && (
                              <button
                                type="button"
                                onClick={onOpenHelpline}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 rounded-lg transition-colors font-medium"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
                                <span>{action.helplineReference}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
