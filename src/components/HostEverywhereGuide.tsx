import React, { useState } from 'react';
import { Globe, Copy, Check, Share2, Smartphone, Monitor, Shield, ExternalLink, Zap } from 'lucide-react';
import { Language } from '../types/cyber';

interface HostEverywhereGuideProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const HostEverywhereGuide: React.FC<HostEverywhereGuideProps> = ({
  lang,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const liveAppUrl = window.location.href.split('?')[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(liveAppUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = encodeURIComponent(
    lang === 'hi' 
      ? `🔐 मेरा नया साइबर सिक्योरिटी प्लेटफॉर्म लाइव है! अपने डोमेन, IP और डार्क वेब लीक्स की जांच करें: ${liveAppUrl}`
      : `🔐 Check your domain & IP security on my live Cyber Defense Platform: ${liveAppUrl}`
  );

  return (
    <section id="host-guide" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'लाइव क्लाउड डिप्लॉयमेंट' : 'Global Cloud Hosting'}</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Access</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {lang === 'hi' ? 'आपका ऐप हर जगह 24/7 लाइव है!' : 'Your Cyber Platform is Live Worldwide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi'
              ? 'यह ऐप Google Cloud के सर्वर पर होस्ट हो चुका है और दुनिया में कोई भी व्यक्ति इस लिंक से इसे एक्सेस कर सकता है।'
              : 'Deployed on production Google Cloud Run with instant worldwide routing and SSL encryption.'}
          </p>
        </div>

        {/* Live URL Card */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#080D18] border border-slate-800 p-3.5 rounded-lg font-mono text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-slate-400 select-none">Live URL:</span>
              <span className="text-emerald-400 font-bold truncate select-all">{liveAppUrl}</span>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (lang === 'hi' ? 'कॉपी हो गया' : 'Copied') : (lang === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link')}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold rounded text-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3 Steps to Attach Custom Domain */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            
            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-1.5">
              <span className="font-mono text-cyan-400 font-bold text-xs block">Step 1: Domain खरीदें</span>
              <h4 className="font-bold text-white">अपना नाम चुनें (.com / .in)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Hostinger, GoDaddy या Namecheap से ₹200-₹400 में कोई भी डोमेन लें (जैसे <code>bajrangsecurity.in</code>).
              </p>
            </div>

            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-1.5">
              <span className="font-mono text-cyan-400 font-bold text-xs block">Step 2: Cloudflare जोड़ें</span>
              <h4 className="font-bold text-white">फ़्री DDoS और SSL सुरक्षा</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cloudflare पर मुफ़्त अकाउंट बनाकर अपने डोमेन का DNS जोड़ें। इससे वेबसाइट पर कभी हैकर का हमला नहीं होगा।
              </p>
            </div>

            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-1.5">
              <span className="font-mono text-cyan-400 font-bold text-xs block">Step 3: CNAME रिकॉर्ड सेट करें</span>
              <h4 className="font-bold text-white">सीधा लाइव लिंक कनेक्ट करें</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cloudflare DNS में CNAME रिकॉर्ड में इस ऐप का URL डाल दें। 10 मिनट में आपका कस्टम डोमेन लाइव हो जाएगा!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
