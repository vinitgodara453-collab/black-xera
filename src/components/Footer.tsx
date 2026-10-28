import React from 'react';
import { Server, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'hi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080F] border-t border-slate-800/80 py-10 px-4 sm:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Server className="w-4 h-4 text-blue-500" />
            <span>CloudVPS Finder</span>
            <span className="text-slate-400 font-normal">· {lang === 'hi' ? 'सस्ता Ubuntu VPS गाइड' : 'Cheap Ubuntu VPS Guide'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-400">
            <a href="#ip-analysis" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'IP रिपोर्ट' : 'IP Dossier'}
            </a>
            <a href="#providers" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'प्रोवाइडर्स' : 'Providers'}
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'कैलकुलेटर' : 'Calculator'}
            </a>
            <a href="#guides" className="hover:text-white transition-colors">
              {lang === 'hi' ? 'गाइड' : 'Guides'}
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

        {/* Disclaimer & Info */}
        <div className="border-t border-slate-800/60 pt-6 text-[11px] text-slate-400 space-y-2">
          <p>
            {lang === 'hi'
              ? 'नोट: 54.252.142.201 अमेज़न वेब सर्विसेज (AWS EC2 Sydney) का एक सार्वजनिक IP एड्रेस है। सभी नाम, ट्रेडमार्क और लोगो (AWS, Ubuntu, Hetzner, Contabo, Oracle) उनके संबंधित स्वामियों के हैं। कीमतें और प्लान्स प्रोवाइडर्स की आधिकारिक वेबसाइट्स के अनुसार अपडेट किए गए हैं।'
              : 'Disclaimer: 54.252.142.201 is a public IP address located in AWS Sydney (ap-southeast-2). All registered trademarks, logos, and brand names belong to their respective holders (Amazon Web Services, Canonical Ubuntu, Hetzner, Oracle, Contabo). Pricing and specifications are regularly benchmarked against public provider tiers.'}
          </p>
          <p className="text-slate-400">
            © {new Date().getFullYear()} CloudVPS Finder. Dedicated to helping developers find high-performance, affordable cloud infrastructure.
          </p>
        </div>

      </div>
    </footer>
  );
};
