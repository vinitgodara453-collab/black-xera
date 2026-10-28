import React, { useState } from 'react';
import { VPS_PROVIDERS, VPSProvider } from '../data/vpsProviders';
import { ExternalLink, Copy, Check, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';

interface QuickBuyLinksProps {
  lang: 'hi' | 'en';
  currency: 'INR' | 'USD';
}

export const QuickBuyLinks: React.FC<QuickBuyLinksProps> = ({ lang, currency }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section id="buy-links" className="py-8 sm:py-12 border-b border-slate-800/80 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span>{lang === 'hi' ? 'सीधे खरीदने के लिंक्स' : 'Direct Purchase Links & Portals'}</span>
            <span aria-hidden="true">·</span>
            <span>1-Click Access</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {lang === 'hi' 
              ? 'सस्ते VPS खरीदने के सभी आधिकारिक लिंक्स (Official Links)' 
              : 'Direct Official Purchase Links for All Cheap VPS Providers'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'hi'
              ? 'किसी भी प्रोवाइडर की वेबसाइट पर जाने के लिए "वेबसाइट खोलें" दबाएं या लिंक कॉपी करें।'
              : 'Click "Open Portal" to register directly on the official platform or copy the exact URL.'}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VPS_PROVIDERS.map((provider) => {
            const isFree = provider.isFree;
            const price = isFree
              ? (lang === 'hi' ? '₹0 मुफ़्त' : '$0 FREE')
              : currency === 'INR'
                ? `₹${provider.monthlyInr}/माह`
                : `$${provider.monthlyUsd.toFixed(2)}/mo`;

            return (
              <div
                key={provider.id}
                className="bg-[#0D1424] border border-slate-800 hover:border-slate-700 rounded-lg p-4 flex flex-col justify-between transition-colors space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white text-sm">{provider.name}</span>
                    <span className="font-mono font-bold text-emerald-400 tabular-nums">{price}</span>
                  </div>

                  <div className="text-xs text-slate-400">
                    {provider.ram} · {provider.cpu}
                  </div>

                  {/* Payment tag */}
                  <div className="text-[11px] text-slate-400 mt-2">
                    <span className="text-slate-400">{lang === 'hi' ? 'पेमेंट:' : 'Payment:'} </span>
                    <span className={provider.supportsUpi ? 'text-emerald-400 font-medium' : 'text-slate-300'}>
                      {provider.supportsUpi ? '✓ UPI (PhonePe/GPay/Paytm)' : provider.paymentMethods[0]}
                    </span>
                  </div>

                  {/* URL Display */}
                  <div className="mt-2.5 p-2 bg-[#070B14] border border-slate-800 rounded flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-blue-400 truncate select-all">
                      {provider.officialUrl}
                    </span>
                    <button
                      onClick={() => handleCopy(provider.officialUrl)}
                      className="text-slate-400 hover:text-white p-1 transition-colors shrink-0"
                      title="Copy URL"
                    >
                      {copiedUrl === provider.officialUrl ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <a
                    href={provider.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold transition-colors"
                  >
                    <span>{lang === 'hi' ? 'वेबसाइट खोलें / खरीदें' : 'Open Portal / Buy'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
