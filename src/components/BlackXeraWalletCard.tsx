import React, { useState } from 'react';
import { Plus, RefreshCw, Copy, Check, Gem, UserCheck } from 'lucide-react';

interface BlackXeraWalletCardProps {
  balance: number;
  userId: string;
  onOpenRecharge: () => void;
  onRefresh: () => void;
}

export const BlackXeraWalletCard: React.FC<BlackXeraWalletCardProps> = ({
  balance,
  userId,
  onOpenRecharge,
  onRefresh
}) => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e40af] p-6 sm:p-7 shadow-2xl shadow-blue-600/30 text-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 space-y-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-blue-100/90 tracking-wide">
            Wallet balance
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-inner">
            <Gem className="w-3.5 h-3.5 text-cyan-200 fill-cyan-200/50" />
            <span className="text-[11px] font-sans font-bold">Diamond</span>
          </div>
        </div>

        {/* Big Balance Display */}
        <div className="tracking-tight">
          <h1 className="text-3xl sm:text-5xl font-black font-sans flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold font-sans">₹</span>
            <span>{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </h1>
        </div>

        {/* User ID Badge with Copy */}
        <div className="pt-0.5">
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-mono font-medium transition-all cursor-pointer group"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-200" />
            <span className="text-blue-100/90">BX ID</span>
            <span className="font-bold text-white tracking-wider">{userId}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-blue-200 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* Action Buttons: Recharge & Refresh (Exactly as in screenshot) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
          {/* + Recharge Button */}
          <button
            onClick={onOpenRecharge}
            className="w-full py-3 px-4 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-black/15 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Recharge</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefreshClick}
            className="w-full py-3 px-4 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
