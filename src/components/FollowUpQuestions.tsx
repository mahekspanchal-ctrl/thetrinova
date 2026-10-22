import React from 'react';
import { IncidentId, FollowUpAnswers } from '../types';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

interface FollowUpQuestionsProps {
  selectedIncidents: IncidentId[];
  answers: FollowUpAnswers;
  onUpdateAnswer: <K extends keyof FollowUpAnswers>(key: K, value: FollowUpAnswers[K]) => void;
}

export const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({
  selectedIncidents,
  answers,
  onUpdateAnswer
}) => {
  const showLinkQuestions = selectedIncidents.includes('clicked_link');
  const showDetailsOrOtp =
    selectedIncidents.includes('entered_details') || selectedIncidents.includes('shared_otp');
  const showAppQuestions = selectedIncidents.includes('installed_app');
  const showMoneyQuestions = selectedIncidents.includes('unauthorized_txn');
  const showOfficialQuestions = selectedIncidents.includes('threatened_official');

  // If nothing selected, return null
  if (selectedIncidents.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Privacy reminder */}
      <div className="flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Confidentiality Guarantee:</span> KavachAI does not collect or accept sensitive secrets. Never enter your actual PIN, full bank account number, card CVV, or passwords anywhere in this tool.
        </div>
      </div>

      <div className="border-b border-slate-200 pb-2">
        <h3 className="text-base font-bold text-slate-900">
          A few clarifying questions
        </h3>
        <p className="text-xs text-slate-600">
          These help us tailor your immediate priority order.
        </p>
      </div>

      {/* Question 1: If clicked link */}
      {showLinkQuestions && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Did you enter any information on the website you opened?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { id: 'no_closed', label: 'No, I closed it immediately without typing' },
              { id: 'personal_details', label: 'Yes, basic personal details (Name, phone, address)' },
              { id: 'credentials', label: 'Yes, login username or account password' },
              { id: 'card_bank', label: 'Yes, card number, CVV, or bank credentials' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onUpdateAnswer('enteredInfoOnSite', opt.id as FollowUpAnswers['enteredInfoOnSite'])
                }
                className={`text-left p-3 rounded-lg border transition-all ${
                  answers.enteredInfoOnSite === opt.id
                    ? 'bg-teal-700 text-white border-teal-700 font-medium'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 2: Affected service (bank, upi, email, etc.) */}
      {(showDetailsOrOtp || showMoneyQuestions) && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Which service or account may be affected?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { id: 'bank', label: 'Bank Account / Card' },
              { id: 'upi', label: 'UPI / Payment App (GPay, PhonePe)' },
              { id: 'email_apple_google', label: 'Email / Google / Apple ID' },
              { id: 'social_media', label: 'Social Media / Messaging' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onUpdateAnswer('affectedService', opt.id as FollowUpAnswers['affectedService'])
                }
                className={`text-left p-3 rounded-lg border transition-all ${
                  answers.affectedService === opt.id
                    ? 'bg-teal-700 text-white border-teal-700 font-medium'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 3: Remote App questions */}
      {showAppQuestions && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Did you install a screen-sharing app or an unknown APK?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'screen_share', label: 'Screen-sharing app (AnyDesk, TeamViewer, RustDesk)' },
                { id: 'unknown_apk', label: 'Unknown APK file downloaded from link or WhatsApp' },
                { id: 'not_sure', label: 'Not sure of the app name' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onUpdateAnswer('remoteAppType', opt.id as FollowUpAnswers['remoteAppType'])
                  }
                  className={`text-left p-3 rounded-lg border transition-all ${
                    answers.remoteAppType === opt.id
                      ? 'bg-teal-700 text-white border-teal-700 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Is the affected device currently connected to the internet?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'connected', label: 'Yes, it is still connected to Wi-Fi or Mobile Data' },
                { id: 'disconnected_airplane', label: 'No, I turned on Airplane Mode or turned it off' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onUpdateAnswer(
                      'deviceInternetStatus',
                      opt.id as FollowUpAnswers['deviceInternetStatus']
                    )
                  }
                  className={`text-left p-3 rounded-lg border transition-all ${
                    answers.deviceInternetStatus === opt.id
                      ? 'bg-teal-700 text-white border-teal-700 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Question 4: Has money been deducted? & Time elapsed */}
      {(showMoneyQuestions || showDetailsOrOtp) && (
        <div className="space-y-4 pt-2 border-t border-slate-200/70">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Has money been debited or deducted from your account?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'yes_deducted', label: 'Yes, money has been deducted' },
                { id: 'unknown_possible', label: 'Unknown / Not sure yet' },
                { id: 'not_yet', label: 'No money deducted so far' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onUpdateAnswer(
                      'moneyDeductedStatus',
                      opt.id as FollowUpAnswers['moneyDeductedStatus']
                    )
                  }
                  className={`text-left p-3 rounded-lg border transition-all ${
                    answers.moneyDeductedStatus === opt.id
                      ? 'bg-teal-700 text-white border-teal-700 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {answers.moneyDeductedStatus === 'yes_deducted' && (
            <div className="space-y-2 bg-amber-50/50 p-3 rounded-xl border border-amber-200/70">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>How long ago did the transaction happen? (Golden Hour Triage)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'under_2h', label: 'Within the last 2 hours (Critical)' },
                  { id: '2_to_24h', label: '2 to 24 hours ago' },
                  { id: '1_to_3d', label: '1 to 3 days ago' },
                  { id: 'over_3d', label: 'More than 3 days ago' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      onUpdateAnswer(
                        'hoursSinceTransaction',
                        opt.id as FollowUpAnswers['hoursSinceTransaction']
                      )
                    }
                    className={`text-left p-2.5 rounded-lg border transition-all ${
                      answers.hoursSinceTransaction === opt.id
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question 5: Official impersonation / threatening */}
      {showOfficialQuestions && (
        <div className="space-y-3 pt-2 border-t border-slate-200/70">
          <label className="block text-sm font-semibold text-slate-800">
            Who are they claiming to be?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              { id: 'police_cbi', label: 'Police / CBI / ED officer' },
              { id: 'customs_courier', label: 'Customs / FedEx / DHL Courier' },
              { id: 'telecom', label: 'Telecom / SIM Card Dept' },
              { id: 'bank_official', label: 'RBI or Bank Official' },
              { id: 'tax', label: 'Income Tax Department' },
              { id: 'other', label: 'Other Authority' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onUpdateAnswer(
                    'impersonatorType',
                    opt.id as FollowUpAnswers['impersonatorType']
                  )
                }
                className={`text-left p-3 rounded-lg border transition-all ${
                  answers.impersonatorType === opt.id
                    ? 'bg-teal-700 text-white border-teal-700 font-medium'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
