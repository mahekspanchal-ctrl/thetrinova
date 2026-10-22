import React from 'react';
import { ShieldAlert, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenHelpline: () => void;
  activeTab: 'assistant' | 'check_message' | 'scenarios' | 'directory';
  setActiveTab: (tab: 'assistant' | 'check_message' | 'scenarios' | 'directory') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHelpline,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-slate-100 border-b border-slate-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <button
          onClick={() => setActiveTab('assistant')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white hover:text-teal-300 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span>KavachAI</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'assistant'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Recovery Assistant
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'scenarios'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Test Scenarios
          </button>
          <button
            onClick={() => setActiveTab('check_message')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'check_message'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Check a Message
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'directory'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Emergency Directory
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 1930</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950 px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('assistant')}
          className={`px-2 py-1 rounded ${activeTab === 'assistant' ? 'text-teal-400 font-semibold' : 'text-slate-400'}`}
        >
          Assistant
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-2 py-1 rounded ${activeTab === 'scenarios' ? 'text-teal-400 font-semibold' : 'text-slate-400'}`}
        >
          Scenarios
        </button>
        <button
          onClick={() => setActiveTab('check_message')}
          className={`px-2 py-1 rounded ${activeTab === 'check_message' ? 'text-teal-400 font-semibold' : 'text-slate-400'}`}
        >
          Check Message
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-2 py-1 rounded ${activeTab === 'directory' ? 'text-teal-400 font-semibold' : 'text-slate-400'}`}
        >
          Directory
        </button>
      </div>
    </header>
  );
};
