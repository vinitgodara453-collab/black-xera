import React from 'react';
import { QrCode, Crown, Globe, BarChart3, Layers, Share2, Sparkles, Smartphone } from 'lucide-react';

interface NexNavbarProps {
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  onOpenCreate: () => void;
  onOpenPricing: () => void;
  onOpenHostGuide: () => void;
  activeView: 'studio' | 'analytics' | 'mycodes' | 'admin';
  setActiveView: (view: 'studio' | 'analytics' | 'mycodes' | 'admin') => void;
  isVip: boolean;
}

export const NexNavbar: React.FC<NexNavbarProps> = ({
  lang,
  setLang,
  onOpenCreate,
  onOpenPricing,
  onOpenHostGuide,
  activeView,
  setActiveView,
  isVip,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveView('studio')}
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight">NexCodes</span>
          <span className="text-[10px] text-indigo-400 font-mono bg-indigo-950/60 border border-indigo-800/50 px-1.5 py-0.5 rounded">PRO</span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveView('studio')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'studio' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-100'
            }`}
          >
            {lang === 'hi' ? 'QR स्टूडियो (नया बनाएं)' : 'QR Studio'}
          </button>
          
          <button
            onClick={() => setActiveView('mycodes')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'mycodes' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-100'
            }`}
          >
            {lang === 'hi' ? 'मेरे QR कोड्स' : 'My QR Codes'}
          </button>

          <button
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'analytics' ? 'text-emerald-400 font-semibold' : 'text-emerald-400/90 hover:text-emerald-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{lang === 'hi' ? 'एनालिटिक्स (यूजर & कमाई)' : 'Analytics & Revenue'}</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer px-2 py-0.5 rounded border ${
              activeView === 'admin'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>🛡️</span>
            <span>{lang === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('suppliers-guide');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-amber-400 hover:text-amber-300 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>📦</span>
            <span>{lang === 'hi' ? 'होलसेल सप्लायर्स' : 'Wholesale Panels'}</span>
          </button>

          <button
            onClick={onOpenPricing}
            className="text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'प्लान्स & UPI' : 'Plans & UPI'}</span>
          </button>

          <button
            onClick={onOpenHostGuide}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'hi' ? 'फ्री होस्टिंग गाइड' : 'Free Host Guide'}
          </button>
        </nav>

        {/* Zone 3: Controls and primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'hi' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Primary Action Button */}
          {isVip ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded-md text-xs font-semibold whitespace-nowrap">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>VIP ACTIVE</span>
            </div>
          ) : (
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'VIP अपग्रेड (₹299)' : 'Upgrade VIP'}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
