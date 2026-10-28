import React from 'react';
import { Server, Globe, DollarSign, Terminal } from 'lucide-react';

interface NavbarProps {
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  currency,
  setCurrency,
  onOpenTerminal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors">
          <Server className="w-5 h-5 text-blue-500 shrink-0" />
          <span>CloudVPS Finder</span>
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#buy-links" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'खरीदने के लिंक्स' : 'Buy Links'}
          </a>
          <a href="#providers" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'सस्ते VPS लिस्ट' : 'Cheap VPS List'}
          </a>
          <a href="#calculator" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'बचत कैलकुलेटर' : 'Cost Savings'}
          </a>
          <a href="#guides" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'सेटअप गाइड' : 'Setup Guide'}
          </a>
          <a href="#scripts" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? '1-क्लिक स्क्रिप्ट्स' : 'Quick Scripts'}
          </a>
        </nav>

        {/* Zone 3: Controls and primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Toggle */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-medium">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currency === 'INR' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currency === 'USD' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap"
            title="Toggle Hindi/Hinglish and English"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'hi' ? 'हिंदी / Hinglish' : 'English'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'SSH कनेक्ट करें' : 'SSH Connect'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
