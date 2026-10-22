import React from 'react';
import { IncidentId } from '../types';
import {
  Link as LinkIcon,
  KeyRound,
  MessageSquareCode,
  Smartphone,
  CreditCard,
  ShieldAlert,
  HelpCircle,
  Check
} from 'lucide-react';

interface IncidentItem {
  id: IncidentId;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INCIDENT_OPTIONS: IncidentItem[] = [
  {
    id: 'clicked_link',
    label: '1. I clicked a suspicious link.',
    hint: 'Opened a link in an SMS, email, WhatsApp, or search result that felt suspicious.',
    icon: LinkIcon
  },
  {
    id: 'entered_details',
    label: '2. I entered my password or banking details.',
    hint: 'Typed login username, password, debit/credit card CVV, or netbanking credentials on a webpage.',
    icon: KeyRound
  },
  {
    id: 'shared_otp',
    label: '3. I shared an OTP.',
    hint: 'Read out, texted, or forwarded a one-time verification code received from my bank or service.',
    icon: MessageSquareCode
  },
  {
    id: 'installed_app',
    label: '4. I installed an unfamiliar app or granted remote access.',
    hint: 'Downloaded an APK, or installed AnyDesk, TeamViewer, QuickSupport, or similar screen-share tool.',
    icon: Smartphone
  },
  {
    id: 'unauthorized_txn',
    label: '5. I transferred money or noticed an unauthorised transaction.',
    hint: 'Sent money via UPI/NEFT/IMPS to a fraudster or saw an unexpected debit alert on my account.',
    icon: CreditCard
  },
  {
    id: 'threatened_official',
    label: '6. Someone claiming to be an official is threatening or pressuring me.',
    hint: 'Caller claims to be Police, CBI, Customs, ED, or Court warning of arrest, illegal parcels, or court warrants.',
    icon: ShieldAlert
  },
  {
    id: 'unsure',
    label: "7. I'm not sure what happened.",
    hint: 'Something feels wrong, strange activity appeared on my phone, or I need general guidance.',
    icon: HelpCircle
  }
];

interface IncidentSelectorProps {
  selectedIncidents: IncidentId[];
  onToggleIncident: (id: IncidentId) => void;
  onClearAll: () => void;
}

export const IncidentSelector: React.FC<IncidentSelectorProps> = ({
  selectedIncidents,
  onToggleIncident,
  onClearAll
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            What happened?
          </h2>
          <p className="text-sm text-slate-600">
            Select all that apply. Scams frequently involve multiple steps in sequence.
          </p>
        </div>

        {selectedIncidents.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors self-start sm:self-auto underline"
          >
            Reset selections ({selectedIncidents.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INCIDENT_OPTIONS.map((item) => {
          const isSelected = selectedIncidents.includes(item.id);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleIncident(item.id)}
              className={`text-left p-4 rounded-xl border transition-all relative flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-teal-50/60 border-teal-500/80 shadow-xs ring-1 ring-teal-500/30'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                  isSelected
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              {/* Content */}
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-teal-700' : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold leading-snug ${
                      isSelected ? 'text-teal-950' : 'text-slate-900'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.hint}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
