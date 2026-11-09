import React from 'react';
import { X, ExternalLink, Globe, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface BlackXeraFreeHostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlackXeraFreeHostModal: React.FC<BlackXeraFreeHostModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#080D18] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">BLACK XERA को फ्री होस्ट कैसे करें?</h3>
              <p className="text-[11px] text-slate-400">₹0 Free Forever Hosting on Vercel, Netlify & Cloudflare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-[#050811] p-3 rounded-xl border border-slate-800">
          यह वेबसाइट <strong>100% React + Tailwind</strong> में बनी है। इसे आप बिना ₹1 दिए लाइफटाइम फ्री में लाइव रख सकते हैं और अपना खुद का .com या .in डोमेन भी जोड़ सकते हैं:
        </p>

        {/* 3 Free Hosting Methods */}
        <div className="space-y-3 text-xs">
          
          {/* Method 1: Vercel */}
          <div className="p-4 bg-[#0B1120] border border-indigo-500/30 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">1. Vercel (सबसे तेज और बेस्ट)</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                1-Click GitHub Deploy
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              1. अपने GitHub पर इस कोड को पुश करें।<br />
              2. [vercel.com](https://vercel.com) पर फ्री साइन-अप करें ➔ <strong>"Import Git Repository"</strong> दबाएं।<br />
              3. Vercel 30 सेकंड में आपकी साइट लाइव कर देगा और <code>blackxera.vercel.app</code> फ्री लिंक दे देगा!
            </p>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 pt-1"
            >
              <span>Vercel.com खोलें</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Method 2: Netlify Drag & Drop */}
          <div className="p-4 bg-[#0B1120] border border-cyan-500/30 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">2. Netlify (Drag & Drop - नो कोडिंग)</span>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                सीधा फोल्डर अपलोड
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              1. <code>npm run build</code> कमांड चलाकर <code>dist</code> फोल्डर बनाएं।<br />
              2. [netlify.com](https://netlify.com) खोलकर <code>dist</code> फोल्डर को सीधा ब्राउज़र में ड्रैग एंड ड्रॉप करें। 10 सेकंड में साइट चालू!
            </p>
            <a
              href="https://netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 pt-1"
            >
              <span>Netlify.com खोलें</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Method 3: Cloudflare Pages */}
          <div className="p-4 bg-[#0B1120] border border-slate-700 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">3. Cloudflare Pages</span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Unlimited Free Bandwidth
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              DDoS प्रोटेक्शन के साथ असीमित बैंडविड्थ। कभी क्रैश नहीं होता।
            </p>
          </div>

        </div>

        {/* Benefits badge */}
        <div className="p-3 bg-[#060912] border border-slate-800 rounded-xl space-y-1 text-slate-300 text-[11px]">
          <div className="text-emerald-400 font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>लाइफटाइम फ्री SSL सर्टिफिकेट (https://)</span>
          </div>
          <div>✓ कस्टम डोमेन (जैसे: <code>www.blackxera.com</code>) बिना पैसे दिए जोड़ सकते हैं</div>
          <div>✓ 99.99% अपटाइम के साथ 24 घंटे बिना सोए एक्टिव</div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Got It, Close Guide
        </button>

      </div>
    </div>
  );
};
