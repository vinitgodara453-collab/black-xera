import React, { useState } from 'react';
import { User, Copy, Check, Key, ShieldAlert, Sparkles, ExternalLink, RefreshCw, QrCode } from 'lucide-react';
import { AdminSettings } from '../types/blackxera';

interface BlackXeraAccountViewProps {
  userId: string;
  walletBalance: number;
  adminSettings: AdminSettings;
  onOpenRecharge: () => void;
  onOpenAdmin: () => void;
  onOpenHostingGuide: () => void;
}

export const BlackXeraAccountView: React.FC<BlackXeraAccountViewProps> = ({
  userId,
  walletBalance,
  adminSettings,
  onOpenRecharge,
  onOpenAdmin,
  onOpenHostingGuide
}) => {
  const [apiKey, setApiKey] = useState('bx_live_9482710492817293847291');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyApi = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Profile Header Card */}
      <div className="p-6 bg-[#0D121D] border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-blue-600/20">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center text-cyan-400">
              <User className="w-8 h-8" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-bold text-white">Bajrang Godara</h3>
              <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-500/30 text-[10px] font-mono rounded-full font-bold">
                DIAMOND VIP
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
              <span>Account ID: {userId}</span>
              <button onClick={handleCopyId} className="hover:text-white">
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
          <div className="text-center sm:text-right">
            <span className="text-[11px] text-slate-400">Total Balance</span>
            <div className="text-2xl font-black text-emerald-400 font-sans">
              ₹{walletBalance.toFixed(2)}
            </div>
          </div>
          <button
            onClick={onOpenRecharge}
            className="w-full sm:w-auto py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Reseller API Key Box */}
      <div className="p-5 bg-[#0D121D] border border-slate-800 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">Reseller REST API Key</h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Active v2 API
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Use this key to integrate BLACK XERA automatic Telegram & OTP stock directly into your own website or Telegram bot.
        </p>
        <div className="p-2.5 bg-[#070A12] border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs text-cyan-300">
          <span className="truncate">{apiKey}</span>
          <button
            onClick={handleCopyApi}
            className="p-1.5 hover:text-white text-slate-400 cursor-pointer"
            title="Copy API Key"
          >
            {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Master Admin Panel Trigger & Free Hosting Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Owner Admin Mode ("sab mere cantol me ho") */}
        <div className="p-5 bg-gradient-to-br from-[#1c1409] to-[#261c0d] border border-amber-500/40 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">Master Admin Control</h4>
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            Change product prices, approve pending UPI recharges, manage UPI ID, and broadcast announcements.
          </p>
          <button
            onClick={onOpenAdmin}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Open Admin Dashboard ➔
          </button>
        </div>

        {/* Free Hosting Guide ("free host bi kar sakhu") */}
        <div className="p-5 bg-gradient-to-br from-[#0c1815] to-[#122420] border border-emerald-500/40 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">Free Hosting (Vercel / Netlify)</h4>
          </div>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Host this complete BLACK XERA website 100% free with your custom domain or free .vercel.app link.
          </p>
          <button
            onClick={onOpenHostingGuide}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            View Free Hosting Steps ➔
          </button>
        </div>

      </div>

    </div>
  );
};
