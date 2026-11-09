import React, { useState } from 'react';
import { ShieldCheck, Search, Zap, Activity, AlertTriangle, ArrowRight, Radio, ExternalLink } from 'lucide-react';
import { SAMPLE_LIVE_TELEMETRY } from '../data/cyberDatabase';
import { Language } from '../types/cyber';

interface LiveThreatMapHeroProps {
  lang: Language;
  onScan: (target: string) => void;
  onOpenShareModal: () => void;
}

export const LiveThreatMapHero: React.FC<LiveThreatMapHeroProps> = ({
  lang,
  onScan,
  onOpenShareModal,
}) => {
  const [inputTarget, setInputTarget] = useState('54.252.142.201');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTarget.trim()) {
      onScan(inputTarget.trim());
      const el = document.getElementById('scanner-suite');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-10 sm:py-16 border-b border-slate-800/80 bg-gradient-to-b from-[#060911] via-[#090F1C] to-[#070B14] overflow-hidden">
      
      {/* Background Subtle Grid Effect */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Kicker metadata separator */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
          <span className="text-cyan-400 font-semibold">{lang === 'hi' ? 'नेक्स्ट-जेन साइबर डिफेंस OS 2026' : 'Autonomous Cyber Defense OS 2026'}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">{lang === 'hi' ? 'क्लाउड पर 24/7 लाइव' : 'Hosted 24/7 Global'}</span>
          <span aria-hidden="true">·</span>
          <span>VIP Membership & UPI Integrated</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            {lang === 'hi' ? (
              <>
                आपका अपना <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">साइबर सिक्योरिटी प्लेटफॉर्म</span> — सबसे अपग्रेडेड और लाइव
              </>
            ) : (
              <>
                Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Cyber Security Suite</span> with VIP Monetization
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {lang === 'hi' ? (
              <>
                आज के सभी आधुनिक साइबर सुरक्षा टूल्स से कहीं आगे: <strong>65,535 पोर्ट ऑडिट</strong>, <strong>डार्क वेब डेटा लीक स्कैनर</strong>, <strong>फिशिंग डिटेक्टर</strong>, और <strong>GPU हैश लैब</strong>। आपका अपना UPI (<code className="text-cyan-300 font-mono text-xs">bajranggodara930@okaxis</code>) सीधे VIP मेम्बरशिप से जुड़ा हुआ है!
              </>
            ) : (
              <>
                Engineered for 2026 threats: Deep CVE port scanning, dark web breach intel, phishing analysis, and real-time GPU hash cracking defense. Monetized with VIP subscriptions directly powered by your UPI QR code.
              </>
            )}
          </p>
        </div>

        {/* Primary Interactive Scan Input Box */}
        <div className="mt-8 max-w-2xl bg-[#0D1424] border border-cyan-900/50 hover:border-cyan-700/60 transition-colors rounded-xl p-2.5 sm:p-3 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputTarget}
                onChange={(e) => setInputTarget(e.target.value)}
                placeholder={lang === 'hi' ? 'IP, डोमेन या वेबसाइट दर्ज करें (e.g. 54.252.142.201 ya google.com)...' : 'Enter IP, Domain, or URL to scan (e.g. 54.252.142.201)...'}
                className="w-full bg-[#080D18] border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <span>{lang === 'hi' ? 'गहन सुरक्षा स्कैन करें' : 'Deep Cyber Scan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Targets Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">{lang === 'hi' ? 'क्विक टेस्ट:' : 'Quick Targets:'}</span>
            <button
              type="button"
              onClick={() => { setInputTarget('54.252.142.201'); onScan('54.252.142.201'); }}
              className="text-cyan-400 hover:underline font-mono"
            >
              54.252.142.201 (Your VPS)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => { setInputTarget('google.com'); onScan('google.com'); }}
              className="hover:text-slate-200 font-mono"
            >
              google.com
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => { setInputTarget('login-verify-bank.com'); onScan('login-verify-bank.com'); }}
              className="text-rose-400 hover:underline font-mono"
            >
              Suspicious Phishing URL
            </button>
          </div>
        </div>

        {/* Live SOC Telemetry Stream */}
        <div className="mt-8 bg-[#090E1A] border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="font-bold text-white uppercase tracking-wider">{lang === 'hi' ? 'लाइव साइबर अटैक टेलीमेट्री (ग्लोबल SOC)' : 'Live Cyber Attack Telemetry (Global SOC)'}</span>
            </div>
            <span className="font-mono text-cyan-400 text-[11px] tabular-nums">
              {lang === 'hi' ? '2.8M अटैक्स न्यूट्रलाइज्ड' : '2,849,120 Attacks Neutralized Today'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SAMPLE_LIVE_TELEMETRY.slice(0, 3).map((item) => (
              <div key={item.id} className="p-2.5 bg-[#0D1424] border border-slate-800/90 rounded text-xs space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-mono">{item.origin} → {item.target}</span>
                  <span className="text-slate-400 font-mono text-[10px]">{item.timestamp}</span>
                </div>
                <div className="text-white font-medium text-xs truncate">
                  {item.type}
                </div>
                <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">
                  Severity: {item.severity}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
