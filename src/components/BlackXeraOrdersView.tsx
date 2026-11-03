import React, { useState } from 'react';
import { CustomerOrder } from '../types/blackxera';
import { Package, Download, Copy, Check, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface BlackXeraOrdersViewProps {
  orders: CustomerOrder[];
}

export const BlackXeraOrdersView: React.FC<BlackXeraOrdersViewProps> = ({ orders }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (orders.length === 0) {
    return (
      <div className="py-16 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <Package className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-300">No Orders Yet</div>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          When you buy TG accounts, WhatsApp numbers, or OTPs, your credentials will appear here instantly!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-bold text-white">My Orders</h2>
          <p className="text-xs text-slate-400">Total {orders.length} order(s) placed</p>
        </div>
        <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
          Auto-Delivered
        </span>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 sm:p-5 bg-[#0D121D] border border-slate-800 rounded-2xl space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{order.id}</span>
                  <span className="text-slate-500 text-xs">·</span>
                  <span className="text-xs text-slate-400">{order.date}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {order.productTitle}
                </h4>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-sm text-white">
                  ₹{order.totalAmountInr}
                </span>
                <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
            </div>

            {/* Delivered Credentials */}
            {order.deliveredCredentials && order.deliveredCredentials.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Delivered Data / Download Links:
                </span>
                <div className="space-y-1.5">
                  {order.deliveredCredentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#070A12] border border-slate-800/80 rounded-xl flex items-center justify-between gap-2 font-mono text-xs text-slate-300"
                    >
                      <span className="truncate">{cred}</span>
                      <button
                        onClick={() => handleCopy(cred)}
                        className="p-1 text-slate-400 hover:text-white"
                        title="Copy"
                      >
                        {copiedKey === cred ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.notes && (
              <p className="text-[11px] text-slate-400 italic">
                Note: {order.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
