import React, { useState } from 'react';
import { analyzeMessageText, SAMPLE_MESSAGES, SampleMessageItem } from '../data/messageAnalyzer';
import { AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2, Search, Languages, Highlighter, Sparkles } from 'lucide-react';

interface CheckMessageProps {
  onGoToAssistant: () => void;
  isHomepageProminent?: boolean;
}

export const CheckMessage: React.FC<CheckMessageProps> = ({
  onGoToAssistant,
  isHomepageProminent = false
}) => {
  const [selectedLanguageTab, setSelectedLanguageTab] = useState<'All' | 'Gujarati (ગુજરાતી)' | 'Hindi (हिंदी)' | 'English'>('All');
  // Start empty so user is not overwhelmed on initial page open
  const [inputText, setInputText] = useState('');
  const analysis = analyzeMessageText(inputText);

  const filteredSamples = selectedLanguageTab === 'All'
    ? SAMPLE_MESSAGES
    : SAMPLE_MESSAGES.filter((s) => s.language === selectedLanguageTab);

  const handleSelectSample = (sample: SampleMessageItem) => {
    setInputText(sample.text);
  };

  return (
    <div
      id="check-message-box"
      className={`bg-white border rounded-2xl p-5 sm:p-7 space-y-5 transition-all ${
        isHomepageProminent
          ? 'border-teal-400/80 shadow-sm ring-1 ring-teal-500/20'
          : 'border-slate-200 shadow-xs max-w-4xl mx-auto'
      }`}
    >
      {/* Title & Language Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Languages className="w-3.5 h-3.5 text-teal-600" />
            <span>Message Safety Inspector</span>
            <span aria-hidden="true">·</span>
            <span>Gujarati · Hindi · English</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Check a Suspicious Message
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Paste any suspicious SMS, WhatsApp notice, or email to inspect warning signs (account-blocking threats, urgency, fake links, OTP requests).
          </p>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start">
          {(['All', 'Gujarati (ગુજરાતી)', 'Hindi (हिंदी)', 'English'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedLanguageTab(tab)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedLanguageTab === tab
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.replace(' (ગુજરાતી)', '').replace(' (हिंदी)', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Prominent Input Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="suspicious-msg-input" className="font-semibold text-slate-700 flex items-center gap-1.5">
            <span>Paste suspicious message text here</span>
          </label>
          {analysis.detectedLanguage && analysis.detectedLanguage !== 'Unspecified' && (
            <span className="text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              Detected: {analysis.detectedLanguage}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            id="suspicious-msg-input"
            rows={inputText ? 4 : 3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="તમારો શંકાસ્પદ સંદેશ અહીં પેસ્ટ કરો / अपना संदिग्ध संदेश यहाँ पेस्ट करें / Paste your message here..."
            className="w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white leading-relaxed font-sans transition-all placeholder:text-slate-400 shadow-inner"
          />
        </div>

        {/* Quick action bar below textarea */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              Try sample:
            </span>
            {filteredSamples.slice(0, 3).map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded text-[11px] font-medium transition-colors"
              >
                {sample.label.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-slate-500 hover:text-slate-900 underline"
            >
              Clear message
            </button>
          )}
        </div>
      </div>

      {/* Analysis Output & Preserved Text with Highlights (Revealed only when user pastes text) */}
      {inputText.trim() ? (
        <div className="space-y-4 pt-3 border-t border-slate-200 animate-fadeIn">
          {/* Preserved Original Text with Highlighted Warning Signs */}
          <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <Highlighter className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-slate-900">
                  Original Message (Flagged Phrases Highlighted)
                </span>
              </div>
              {analysis.detectedIssues.length > 0 ? (
                <span className="text-xs text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md font-medium">
                  {analysis.detectedIssues.length} warning phrase{analysis.detectedIssues.length > 1 ? 's' : ''} detected
                </span>
              ) : (
                <span className="text-xs text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-md font-medium">
                  No scam keywords flagged
                </span>
              )}
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-sm sm:text-base leading-relaxed text-slate-900 whitespace-pre-wrap font-sans">
              {analysis.highlightedSpans && analysis.highlightedSpans.length > 0 ? (
                analysis.highlightedSpans.map((span, sIdx) =>
                  span.isFlagged ? (
                    <mark
                      key={sIdx}
                      title={span.explanation || span.category}
                      className="bg-amber-200/90 text-amber-950 font-semibold px-1.5 py-0.5 rounded border border-amber-400 mx-0.5 inline shadow-2xs"
                    >
                      {span.text}
                    </mark>
                  ) : (
                    <span key={sIdx}>{span.text}</span>
                  )
                )
              ) : (
                <span>{inputText}</span>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              Your original text is preserved above with detected warning signs highlighted in amber.
            </p>
          </div>

          {/* Breakdown Header */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Warning Analysis
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-700 font-medium">
            {analysis.generalObservation}
          </p>

          {/* Identified Issues Cards */}
          {analysis.detectedIssues.length > 0 ? (
            <div className="grid grid-cols-1 gap-2.5">
              {analysis.detectedIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-900">
                      {issue.category}
                    </span>
                    <span className="font-mono bg-amber-100/90 text-amber-950 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-bold">
                      "{issue.phrase}"
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {issue.explanation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                No obvious phishing or scam keywords were detected by the pattern scanner in this sample. Always verify unexpected payment requests through official channels.
              </span>
            </div>
          )}

          {/* Action Callout if user already acted */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Did you already click, reply, or share details?</span>
              </div>
              <p className="text-xs text-slate-300">
                Select your situation below to generate your step-by-step recovery plan.
              </p>
            </div>
            <button
              onClick={onGoToAssistant}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shrink-0 shadow-sm"
            >
              <span>Go to Recovery Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Discreet Disclaimer at the bottom */}
      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Text inspection runs locally in your browser. No messages or phone numbers are sent to any server.</span>
      </div>
    </div>
  );
};
