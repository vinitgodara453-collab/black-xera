import React from 'react';
import { ShieldAlert, ArrowUp } from 'lucide-react';
import { Language } from '../types/cyber';

interface CyberFooterProps {
  lang: Language;
}

export const CyberFooter: React.FC<CyberFooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050810] border-t border-slate-800/80 py-10 px-4 sm:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span className="font-mono">CyberShield 2026</span>
            <span className="text-slate-400 font-normal">
              · {lang === 'hi' ? 'नेक्स्ट-जेन साइबर डिफेंस OS' : 'Next-Gen Cyber Security Platform'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
            <a href="#scanner-suite" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'स्कैनर' : 'Scanners'}
            </a>
            <a href="#darkweb-check" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'डार्क वेब' : 'Dark Web'}
            </a>
            <a href="#password-lab" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'हैश लैब' : 'Hash Lab'}
            </a>
            <a href="#vip-pricing" className="text-amber-400 hover:text-amber-300 transition-colors">
              {lang === 'hi' ? 'VIP मेम्बरशिप' : 'VIP Access'}
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer ml-auto sm:ml-0"
            >
              <span>{lang === 'hi' ? 'ऊपर जाएं' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal & Standards Statement */}
        <div className="border-t border-slate-800/60 pt-4 text-[11px] text-slate-400 space-y-2">
          <p>
            {lang === 'hi'
              ? 'अस्वीकरण: CyberShield केवल सुरक्षा विश्लेषण और वैध पेनेट्रेशन टेस्टिंग के लिए बनाया गया है। बिना अनुमति किसी भी अनाधिकृत सर्वर पर हमला करना आईटी अधिनियम के तहत दंडनीय अपराध है।'
              : 'Notice: CyberShield is built strictly for defensive cybersecurity auditing and authorized threat testing aligned with MITRE ATT&CK®, OWASP Top 10, and NIST SP 800-115 standards.'}
          </p>
          <div className="flex flex-wrap justify-between items-center text-slate-400 pt-1">
            <span>© {new Date().getFullYear()} CyberShield 2026. All rights reserved.</span>
            <span className="font-mono text-cyan-500/80">Secured with 256-bit AES & Modern Cryptography</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
