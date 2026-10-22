import React from 'react';
import { RecoveryAction, IncidentId, FollowUpAnswers } from '../types';
import { X, Printer, Shield, CheckSquare, Square } from 'lucide-react';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidents: IncidentId[];
  answers: FollowUpAnswers;
  actions: RecoveryAction[];
  completedActionIds: Set<string>;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  incidents,
  answers,
  actions,
  completedActionIds
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const timestamp = new Date().toLocaleString();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden">
        {/* Modal controls bar (hidden on print) */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-sm">Printable Incident Triage & Evidence Sheet</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-400 hover:bg-teal-300 text-slate-900 rounded-md font-semibold text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 font-sans print:p-0">
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                KavachAI — Incident Recovery Record
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Personal cyber incident triage log for bank disputes, 1930 reporting, and police records.
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <div>Generated: {timestamp}</div>
              <div>Mode: Local Client Session</div>
            </div>
          </div>

          {/* Section: Recorded Incident Details */}
          <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h2 className="font-bold uppercase tracking-wider text-slate-700">
              1. Incident Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div>
                <strong>Selected Events:</strong> {incidents.join(', ')}
              </div>
              {answers.affectedService && (
                <div>
                  <strong>Target Service:</strong> {answers.affectedService}
                </div>
              )}
              {answers.moneyDeductedStatus && (
                <div>
                  <strong>Financial Loss Status:</strong> {answers.moneyDeductedStatus}
                </div>
              )}
              {answers.hoursSinceTransaction && (
                <div>
                  <strong>Time Elapsed:</strong> {answers.hoursSinceTransaction}
                </div>
              )}
            </div>
          </div>

          {/* Section: Recommended Actions Checklist */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">
              2. Recovery Actions & Completion Status
            </h2>
            <div className="space-y-3">
              {actions.map((act) => {
                const isDone = completedActionIds.has(act.id);
                return (
                  <div key={act.id} className="text-xs border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-teal-700 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <strong className={isDone ? 'line-through text-slate-500' : 'text-slate-900'}>
                        [{act.category}] {act.title}
                      </strong>
                    </div>
                    <p className="text-slate-600 pl-6 mt-1 text-[11px]">
                      <em>Priority rationale:</em> {act.whyThisFirst}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Offline Note-taking fields for victim */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">
              3. Institution Follow-up & Evidence Log (Handwritten Field Notes)
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-300 p-2.5 rounded h-16">
                <span className="text-slate-500 block mb-1">Bank Fraud Complaint Ref # :</span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded h-16">
                <span className="text-slate-500 block mb-1">Cyber Crime 1930 Ack # :</span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded h-16">
                <span className="text-slate-500 block mb-1">Police Station & FIR / GD # :</span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded h-16">
                <span className="text-slate-500 block mb-1">Officer Name & Contact :</span>
              </div>
            </div>
          </div>

          {/* Footer disclaimer on paper */}
          <div className="text-[10px] text-slate-500 border-t pt-3 leading-relaxed">
            <strong>Legal Notice:</strong> KavachAI is an emergency cyber triage guide developed for university hackathon demonstration. It does not replace official police investigations, forensic analysis, or statutory banking dispute resolution mechanisms. Report official complaints via https://cybercrime.gov.in/ or toll-free helpline 1930.
          </div>
        </div>
      </div>
    </div>
  );
};
