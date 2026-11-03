import React from 'react';
import { QrCode, ArrowUp } from 'lucide-react';

interface NexFooterProps {
  lang: 'hi' | 'en';
  onNavigate: (view: 'studio' | 'analytics' | 'mycodes') => void;
  onOpenPricing: () => void;
  onOpenHosting: () => void;
}

export const NexFooter: React.FC<NexFooterProps> = ({
  lang,
  onNavigate,
  onOpenPricing,
  onOpenHosting,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050810] border-t border-slate-800/80 py-10 px-4 sm:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <span>NexCodes Pro</span>
            <span className="text-slate-400 font-normal">
              · {lang === 'hi' ? 'स्मार्ट डायनामिक QR & एनालिटिक्स प्लेटफॉर्म' : 'Dynamic QR Studio & Live Analytics'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
            <button onClick={() => onNavigate('studio')} className="hover:text-white transition-colors cursor-pointer">
              {lang === 'hi' ? 'QR बनाएं' : 'Create QR'}
            </button>
            <button onClick={() => onNavigate('mycodes')} className="hover:text-white transition-colors cursor-pointer">
              {lang === 'hi' ? 'मेरे कोड्स' : 'My Codes'}
            </button>
            <button onClick={() => onNavigate('analytics')} className="hover:text-white transition-colors cursor-pointer">
              {lang === 'hi' ? 'एनालिटिक्स & कमाई' : 'Analytics & Revenue'}
            </button>
            <button onClick={onOpenPricing} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
              {lang === 'hi' ? 'VIP प्लान्स' : 'VIP Plans'}
            </button>
            <button onClick={onOpenHosting} className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              {lang === 'hi' ? 'फ्री होस्टिंग' : 'Free Hosting'}
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-auto sm:ml-0"
            >
              <span>{lang === 'hi' ? 'ऊपर जाएं' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-400">
          <span>© {new Date().getFullYear()} NexCodes Pro. Engineered for modern dynamic QR management and UPI monetization.</span>
          <span className="font-mono text-emerald-400">Zero Commission · 100% Direct UPI Payouts</span>
        </div>

      </div>
    </footer>
  );
};
