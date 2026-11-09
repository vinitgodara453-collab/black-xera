import React from 'react';
import { WalletTransaction } from '../types/blackxera';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, XCircle, QrCode } from 'lucide-react';

interface BlackXeraHistoryViewProps {
  transactions: WalletTransaction[];
  onOpenRecharge: () => void;
}

export const BlackXeraHistoryView: React.FC<BlackXeraHistoryViewProps> = ({
  transactions,
  onOpenRecharge
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-bold text-white">Wallet History</h2>
          <p className="text-xs text-slate-400">Recharges, UPI UTR verification & purchases</p>
        </div>

        <button
          onClick={onOpenRecharge}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>+ Recharge</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {transactions.map((tx) => {
          const isRecharge = tx.type === 'recharge';

          return (
            <div
              key={tx.id}
              className="p-4 bg-[#0D121D] border border-slate-800 rounded-2xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isRecharge
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {isRecharge ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {isRecharge ? 'UPI Wallet Recharge' : (tx.productTitle || 'Store Purchase')}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{tx.date}</span>
                    {tx.utrNumber && (
                      <>
                        <span>·</span>
                        <span className="text-cyan-400">UTR: {tx.utrNumber}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div
                  className={`font-mono font-bold text-sm sm:text-base ${
                    isRecharge ? 'text-emerald-400' : 'text-slate-200'
                  }`}
                >
                  {isRecharge ? `+₹${tx.amountInr}` : `-₹${tx.amountInr}`}
                </div>

                <div className="flex items-center justify-end gap-1 text-[10px]">
                  {tx.status === 'approved' && (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                  )}
                  {tx.status === 'pending' && (
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> Verifying UTR
                    </span>
                  )}
                  {tx.status === 'rejected' && (
                    <span className="text-rose-400 flex items-center gap-0.5">
                      <XCircle className="w-3 h-3" /> Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
