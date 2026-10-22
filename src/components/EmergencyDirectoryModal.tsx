import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../data/emergencyDirectory';
import { X, PhoneCall, ExternalLink, ShieldCheck, Clock, Building } from 'lucide-react';

interface EmergencyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDirectoryModal: React.FC<EmergencyDirectoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'India' | 'International'>('India');

  if (!isOpen) return null;

  const contacts = EMERGENCY_CONTACTS.filter((c) => c.region === selectedRegion);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-400/20 text-teal-400 flex items-center justify-center border border-teal-400/30">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Official Emergency Directory</h3>
              <p className="text-xs text-slate-300">Verified helplines and reporting authorities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Golden Hour highlight */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wide">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>India Cyber Helpline 1930 (Golden Hour)</span>
            </div>
            <p className="text-xs text-teal-950 leading-relaxed">
              Dialling <strong>1930</strong> immediately after an unauthorized financial transaction triggers the <em>Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS)</em>. This enables law enforcement and participating banks to put an automated freeze on beneficiary accounts before funds are laundered.
            </p>
          </div>

          {/* Region Tabs (Interactive functional buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedRegion('India')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedRegion === 'India'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              India (Helpline 1930 & Major Banks)
            </button>
            <button
              onClick={() => setSelectedRegion('International')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedRegion === 'International'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              International (US / UK / Australia)
            </button>
          </div>

          {/* Contacts List */}
          <div className="space-y-3">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold text-slate-900 text-sm">{contact.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{contact.category}</span>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {contact.notes}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  {contact.phone !== 'N/A (Web Portal)' && (
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors text-xs"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{contact.phone}</span>
                    </a>
                  )}

                  {contact.website && (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-950 font-medium underline text-xs"
                    >
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* What to prepare before calling */}
          <div className="p-4 bg-slate-100 rounded-xl space-y-2 text-xs text-slate-700 border border-slate-200">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>What to have ready before calling 1930 or your bank:</span>
            </div>
            <ul className="space-y-1 list-disc pl-4 text-slate-600">
              <li>Your bank account number or debit card last 4 digits.</li>
              <li>Approximate time and exact amount of the transaction.</li>
              <li>The 12-digit UPI reference number (UTR/RRN) if available in the SMS.</li>
              <li>The mobile number, website link, or caller ID of the suspect.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
