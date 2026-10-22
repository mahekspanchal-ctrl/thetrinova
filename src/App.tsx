import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TestScenariosBar } from './components/TestScenariosBar';
import { IncidentSelector } from './components/IncidentSelector';
import { FollowUpQuestions } from './components/FollowUpQuestions';
import { ActionPlan } from './components/ActionPlan';
import { ProgressTracker } from './components/ProgressTracker';
import { CheckMessage } from './components/CheckMessage';
import { EmergencyDirectoryModal } from './components/EmergencyDirectoryModal';
import { PrintReportModal } from './components/PrintReportModal';
import { Footer } from './components/Footer';
import { generateRecoveryPlan } from './data/recoveryEngine';
import { IncidentId, FollowUpAnswers, TestScenario, RecoveryAction } from './types';
import { ShieldCheck, ArrowRight, LifeBuoy, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'check_message' | 'scenarios' | 'directory'>('assistant');
  const [selectedIncidents, setSelectedIncidents] = useState<IncidentId[]>([]);
  const [answers, setAnswers] = useState<FollowUpAnswers>({});
  const [completedActionIds, setCompletedActionIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('kavachai_completed_actions') || localStorage.getItem('scamtrace_completed_actions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);

  const assistantSectionRef = useRef<HTMLDivElement>(null);
  const incidentSelectorRef = useRef<HTMLDivElement>(null);
  const planSectionRef = useRef<HTMLDivElement>(null);

  // Sync completed actions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'kavachai_completed_actions',
        JSON.stringify(Array.from(completedActionIds))
      );
    } catch {
      // localStorage may fail in hermetic iframes
    }
  }, [completedActionIds]);

  // Generate dynamic plan based on selected incidents and follow-up answers
  const { doFirst, doNext, getHelp } = useMemo(() => {
    return generateRecoveryPlan(selectedIncidents, answers);
  }, [selectedIncidents, answers]);

  const allActions: RecoveryAction[] = useMemo(() => {
    return [...doFirst, ...doNext, ...getHelp];
  }, [doFirst, doNext, getHelp]);

  // Find the highest priority unchecked action
  const nextRecommendedAction = useMemo(() => {
    for (const act of allActions) {
      if (!completedActionIds.has(act.id)) {
        return act;
      }
    }
    return null;
  }, [allActions, completedActionIds]);

  const handleToggleIncident = (id: IncidentId) => {
    setSelectedScenarioId(null);
    setSelectedIncidents((prev) => {
      let next: IncidentId[];
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        if (id === 'unsure') {
          next = ['unsure'];
        } else {
          next = [...prev.filter((i) => i !== 'unsure'), id];
        }
      }
      return next;
    });
  };

  const handleClearIncidents = () => {
    setSelectedScenarioId(null);
    setSelectedIncidents([]);
    setAnswers({});
    setCompletedActionIds(new Set());
  };

  const handleUpdateAnswer = <K extends keyof FollowUpAnswers>(
    key: K,
    value: FollowUpAnswers[K]
  ) => {
    setSelectedScenarioId(null);
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggleAction = (id: string) => {
    setCompletedActionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectScenario = (scenario: TestScenario) => {
    setSelectedScenarioId(scenario.id);
    setSelectedIncidents(scenario.incidents);
    setAnswers(scenario.answers);
    setCompletedActionIds(new Set());
    setActiveTab('assistant');

    setTimeout(() => {
      planSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToAssistant = () => {
    setActiveTab('assistant');
    incidentSelectorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-200">
      {/* Top Bar Contract (3 Zones) */}
      <Header
        onOpenHelpline={() => setIsHelplineOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Section */}
      <Hero
        onStartClick={handleScrollToAssistant}
        onOpenHelpline={() => setIsHelplineOpen(true)}
      />

      {/* Test Scenarios Quick Bar */}
      <TestScenariosBar
        onSelectScenario={handleSelectScenario}
        selectedScenarioId={selectedScenarioId}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-12">
        {activeTab === 'check_message' ? (
          <CheckMessage onGoToAssistant={() => setActiveTab('assistant')} />
        ) : activeTab === 'scenarios' ? (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Simulated Test Scenarios
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Test how the KavachAI condition-based triage engine reacts to different fraud types and degrees of exposure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Scenario A: Clicked a link, closed immediately',
                    desc: 'User tapped a suspicious courier link in an SMS, but did not type any credentials or download files. Triage confirms clicking alone does not compromise credentials.',
                    id: 'scenario_link'
                  },
                  {
                    title: 'Scenario B: Shared an OTP on a voice call',
                    desc: 'User shared a banking one-time verification code with an imposter. Triage triggers immediate card blocking and password reset from a clean device.',
                    id: 'scenario_otp'
                  },
                  {
                    title: 'Scenario C: Installed remote screen sharing tool',
                    desc: 'User installed AnyDesk on caller instructions. Triage orders immediate physical Airplane Mode disconnect to sever the attacker connection.',
                    id: 'scenario_app'
                  },
                  {
                    title: 'Scenario D: Active unauthorized UPI debit',
                    desc: 'Money deducted from bank account. Triage triggers urgent 1930 Golden Hour helpline reporting and bank freeze request.',
                    id: 'scenario_money'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3"
                  >
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                    <button
                      onClick={() => {
                        const sc = [
                          {
                            id: 'scenario_link',
                            code: 'Scenario A' as const,
                            title: 'Clicked a suspicious link',
                            summary: '',
                            userStory: '',
                            incidents: ['clicked_link' as IncidentId],
                            answers: { enteredInfoOnSite: 'no_closed' as const, fileOrAppDownloaded: 'no' as const, moneyDeductedStatus: 'not_yet' as const }
                          },
                          {
                            id: 'scenario_otp',
                            code: 'Scenario B' as const,
                            title: 'Shared an OTP',
                            summary: '',
                            userStory: '',
                            incidents: ['shared_otp' as IncidentId, 'entered_details' as IncidentId],
                            answers: { affectedService: 'bank' as const, otpSharingChannel: 'call' as const, moneyDeductedStatus: 'unknown_possible' as const, enteredInfoOnSite: 'credentials' as const }
                          },
                          {
                            id: 'scenario_app',
                            code: 'Scenario C' as const,
                            title: 'Installed unfamiliar app',
                            summary: '',
                            userStory: '',
                            incidents: ['installed_app' as IncidentId],
                            answers: { remoteAppType: 'screen_share' as const, deviceInternetStatus: 'connected' as const, fileOrAppDownloaded: 'downloaded_and_installed' as const, moneyDeductedStatus: 'unknown_possible' as const }
                          },
                          {
                            id: 'scenario_money',
                            code: 'Scenario D' as const,
                            title: 'Money deducted',
                            summary: '',
                            userStory: '',
                            incidents: ['unauthorized_txn' as IncidentId, 'entered_details' as IncidentId],
                            answers: { moneyDeductedStatus: 'yes_deducted' as const, hoursSinceTransaction: 'under_2h' as const, affectedService: 'upi' as const }
                          }
                        ].find((s) => s.id === item.id);
                        if (sc) handleSelectScenario(sc);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
                    >
                      <span>Load this scenario</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'directory' ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider">
              <LifeBuoy className="w-4 h-4" />
              <span>Official Emergency Directory</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              National Helplines & Verified Reporting Portals
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Always use verified official channels rather than phone numbers found in sponsored search results or SMS messages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase text-teal-900">India National Cyber Helpline</span>
                <h3 className="text-2xl font-bold text-slate-900">1930</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Call immediately for cyber financial frauds. Coordinated directly by the Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs.
                </p>
                <div className="pt-2">
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-teal-800 underline inline-flex items-center gap-1"
                  >
                    <span>Visit cybercrime.gov.in</span>
                  </a>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase text-slate-600">Department of Telecom (DoT) Chakshu</span>
                <h3 className="text-base font-bold text-slate-900">Sanchar Saathi Portal</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Report suspected fraud communications received over call, SMS, or WhatsApp to disconnect fraudulent SIM cards and blacklisted IMEI devices.
                </p>
                <div className="pt-2">
                  <a
                    href="https://sancharsaathi.gov.in/sfc/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-800 underline inline-flex items-center gap-1"
                  >
                    <span>Open Chakshu Facility</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveTab('assistant')}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Return to Recovery Assistant
              </button>
            </div>
          </div>
        ) : (
          /* Main Recovery Assistant View (Homepage Central Feature) */
          <div className="space-y-10" ref={assistantSectionRef}>
            {/* Prominent Message Paste & Analysis Box at Top of Homepage (Hindi, Gujarati, English) */}
            <CheckMessage
              onGoToAssistant={() => {
                incidentSelectorRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              isHomepageProminent={true}
            />

            {/* Step 1: What happened? */}
            <div
              ref={incidentSelectorRef}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs"
            >
              <IncidentSelector
                selectedIncidents={selectedIncidents}
                onToggleIncident={handleToggleIncident}
                onClearAll={handleClearIncidents}
              />
            </div>

            {/* Step 2 & 3: Contextual Clarifications and Action Plan (Revealed when incident is selected) */}
            {selectedIncidents.length > 0 ? (
              <>
                <FollowUpQuestions
                  selectedIncidents={selectedIncidents}
                  answers={answers}
                  onUpdateAnswer={handleUpdateAnswer}
                />

                <div ref={planSectionRef} className="space-y-8 pt-2">
                  <ProgressTracker
                    completedActionIds={completedActionIds}
                    allActions={allActions}
                    nextRecommendedAction={nextRecommendedAction}
                    onResetSituation={handleScrollToAssistant}
                    onOpenPrintReport={() => setIsPrintReportOpen(true)}
                  />

                  <ActionPlan
                    doFirst={doFirst}
                    doNext={doNext}
                    getHelp={getHelp}
                    completedActionIds={completedActionIds}
                    onToggleAction={handleToggleAction}
                    onOpenHelpline={() => setIsHelplineOpen(true)}
                  />
                </div>
              </>
            ) : (
              <div className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-4 text-center text-xs text-slate-500">
                <span>Select your situation from the options above or pick a test scenario to generate your step-by-step emergency checklist.</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Emergency Directory Modal */}
      <EmergencyDirectoryModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
      />

      {/* Printable Report Modal */}
      <PrintReportModal
        isOpen={isPrintReportOpen}
        onClose={() => setIsPrintReportOpen(false)}
        incidents={selectedIncidents}
        answers={answers}
        actions={allActions}
        completedActionIds={completedActionIds}
      />

      {/* Footer */}
      <Footer onOpenHelpline={() => setIsHelplineOpen(true)} />
    </div>
  );
}
