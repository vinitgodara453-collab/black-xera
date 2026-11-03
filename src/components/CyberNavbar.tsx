import React from 'react';
import { ShieldAlert, Globe, Crown, Settings, Share2, Sparkles } from 'lucide-react';
import { Language, UserVipStatus } from '../types/cyber';

interface CyberNavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  vipStatus: UserVipStatus;
  onOpenVipModal: () => void;
  onOpenAdminSettings: () => void;
  onOpenShareModal: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  lang,
  setLang,
  vipStatus,
  onOpenVipModal,
  onOpenAdminSettings,
  onOpenShareModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="font-mono tracking-tight">CyberShield</span>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded">2026 AI</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#scanner-suite" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'स्कैनर टूल्स' : 'Scanner Suite'}
          </a>
          <a href="#darkweb-check" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'डार्क वेब लीक' : 'Dark Web Breach'}
          </a>
          <a href="#password-lab" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'पासवर्ड & हैश लैब' : 'Password Lab'}
          </a>
          <a href="#vip-pricing" className="text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'VIP मेम्बरशिप' : 'VIP Membership'}</span>
          </a>
          <a href="#host-guide" className="text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'लाइव होस्टिंग & शेयर' : 'Host & Share'}
          </a>
        </nav>

        {/* Zone 3: Controls and primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Share Live Button */}
          <button
            onClick={onOpenShareModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-md hover:bg-emerald-900/50 transition-colors cursor-pointer whitespace-nowrap"
            title="App is Live Everywhere! Click to Share"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'लाइव लिंक' : 'Live URL'}</span>
          </button>

          {/* Owner UPI Settings */}
          <button
            onClick={onOpenAdminSettings}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md transition-colors cursor-pointer"
            title="Admin & UPI ID Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'hi' ? 'हिंदी' : 'EN'}</span>
          </button>

          {/* Primary Action Button */}
          {vipStatus.isVip ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded-md text-xs font-semibold whitespace-nowrap">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{vipStatus.planName || 'VIP ACTIVE'}</span>
            </div>
          ) : (
            <button
              onClick={onOpenVipModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-md transition-colors whitespace-nowrap shadow-sm cursor-pointer font-sans"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'VIP खरीदें (UPI)' : 'Get VIP Shield'}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
