import React from 'react';
import { TEST_SCENARIOS } from '../data/scenarios';
import { TestScenario } from '../types';
import { CheckCircle2, PlayCircle } from 'lucide-react';

interface TestScenariosBarProps {
  onSelectScenario: (scenario: TestScenario) => void;
  selectedScenarioId: string | null;
}

export const TestScenariosBar: React.FC<TestScenariosBarProps> = ({
  onSelectScenario,
  selectedScenarioId
}) => {
  return (
    <div className="bg-slate-100/90 border-b border-slate-200/90 py-2.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-800">Simulate a scenario:</span>
          <span className="hidden md:inline text-slate-400">Click to preview tailored guidance</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {TEST_SCENARIOS.map((sc) => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-semibold ring-1 ring-teal-400/50'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
                title={sc.summary}
              >
                {isSelected ? (
                  <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                ) : (
                  <PlayCircle className="w-3 h-3 text-slate-400 shrink-0" />
                )}
                <span className={isSelected ? 'text-teal-300' : 'text-teal-700 font-semibold'}>
                  {sc.code}:
                </span>
                <span className="truncate max-w-[140px] sm:max-w-none">{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
