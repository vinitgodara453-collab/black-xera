import React from 'react';
import { VPSProvider } from '../data/vpsProviders';
import { ExternalLink, Check, Cpu, HardDrive, Wifi, ShieldAlert, Sparkles, CreditCard, ChevronRight } from 'lucide-react';

interface ProviderCardProps {
  provider: VPSProvider;
  currency: 'INR' | 'USD';
  lang: 'hi' | 'en';
  onQuickSetup: (provider: VPSProvider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  currency,
  lang,
  onQuickSetup,
}) => {
  const isFree = provider.isFree;
  const priceDisplay = isFree
    ? (lang === 'hi' ? 'मुफ़्त (₹0)' : 'FREE ($0)')
    : currency === 'INR'
      ? `₹${provider.monthlyInr}`
      : `$${provider.monthlyUsd.toFixed(2)}`;

  const periodDisplay = isFree ? '' : (lang === 'hi' ? '/महीना' : '/mo');

  return (
    <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div>
        {/* Top Header: Unboxed metadata separator */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-blue-400">{provider.name}</span>
            <span aria-hidden="true">·</span>
            <span>{provider.planName}</span>
          </div>

          {provider.supportsUpi && (
            <span className="text-emerald-400 font-medium">
              {lang === 'hi' ? 'UPI समर्थित' : 'UPI Supported'}
            </span>
          )}
        </div>

        {/* Price and Target Audience */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
            {priceDisplay}
          </span>
          {periodDisplay && (
            <span className="text-xs text-slate-400 font-medium">{periodDisplay}</span>
          )}
          {provider.yearlyUsd && (
            <span className="text-xs text-slate-400 ml-auto">
              {currency === 'INR' ? `₹${Math.round(provider.yearlyUsd * 84)}/साल` : `$${provider.yearlyUsd}/yr`}
            </span>
          )}
        </div>

        {/* Specs Table - Clean rows */}
        <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'hi' ? 'प्रोसेसर (CPU)' : 'vCPU Core'}</span>
            </span>
            <span className="font-medium text-slate-200">{provider.cpu}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'hi' ? 'मेमोरी (RAM)' : 'RAM Memory'}</span>
            </span>
            <span className="font-mono font-semibold text-emerald-400">{provider.ram}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'hi' ? 'स्टोरेज डिस्क' : 'Disk Storage'}</span>
            </span>
            <span className="font-medium text-slate-200">{provider.storage}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'hi' ? 'बैंडविड्थ / ट्रैफ़िक' : 'Bandwidth'}</span>
            </span>
            <span className="font-medium text-slate-200">{provider.bandwidth}</span>
          </div>
        </div>

        {/* Locations and Payment Note */}
        <div className="pt-3 pb-2 space-y-1.5 text-xs text-slate-400">
          <div>
            <span className="text-slate-400">{lang === 'hi' ? 'डेटा सेंटर:' : 'Locations:'} </span>
            <span className="text-slate-300">{provider.locations.slice(0, 3).join(', ')}{provider.locations.length > 3 ? ` +${provider.locations.length - 3}` : ''}</span>
          </div>
          <div>
            <span className="text-slate-400">{lang === 'hi' ? 'पेमेंट:' : 'Payment:'} </span>
            <span className="text-slate-300">{provider.paymentMethods.join(', ')}</span>
          </div>
        </div>

        {/* Pros bullet list */}
        <div className="py-2.5 space-y-1">
          {provider.pros.slice(0, 2).map((pro, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{pro}</span>
            </div>
          ))}
        </div>

        {/* Free trial note or coupon tip */}
        {provider.freeTrialNote && (
          <div className="text-[11px] text-amber-300/90 bg-amber-950/20 px-2.5 py-1.5 rounded border border-amber-900/40 my-2">
            💡 {provider.freeTrialNote}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
        <button
          onClick={() => onQuickSetup(provider)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded transition-colors text-center cursor-pointer"
        >
          {lang === 'hi' ? 'सेटअप निर्देश' : 'Setup Guide'}
        </button>

        <a
          href={provider.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors whitespace-nowrap"
        >
          <span>{lang === 'hi' ? 'वेबसाइट खोलें' : 'Get VPS'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
