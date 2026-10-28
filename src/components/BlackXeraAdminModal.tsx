import React, { useState } from 'react';
import { X, ShieldAlert, Check, DollarSign, QrCode, Settings, Bell, Save, Trash2, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { BlackXeraProduct, WalletTransaction, AdminSettings } from '../types/blackxera';

interface BlackXeraAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BlackXeraProduct[];
  onUpdateProducts: (updated: BlackXeraProduct[]) => void;
  pendingTransactions: WalletTransaction[];
  onApproveTransaction: (txId: string) => void;
  onRejectTransaction: (txId: string) => void;
  adminSettings: AdminSettings;
  onUpdateSettings: (settings: AdminSettings) => void;
  onManualCredit: (amount: number) => void;
}

export const BlackXeraAdminModal: React.FC<BlackXeraAdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  pendingTransactions,
  onApproveTransaction,
  onRejectTransaction,
  adminSettings,
  onUpdateSettings,
  onManualCredit
}) => {
  const [activeTab, setActiveTab] = useState<'prices' | 'recharges' | 'settings' | 'manual'>('prices');
  const [editedProducts, setEditedProducts] = useState<BlackXeraProduct[]>(products);
  const [settingsForm, setSettingsForm] = useState<AdminSettings>(adminSettings);
  const [manualAmount, setManualAmount] = useState<string>('500');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePriceChange = (id: string, newPrice: number) => {
    setEditedProducts(prev => prev.map(p => p.id === id ? { ...p, priceInr: newPrice } : p));
  };

  const handleStockChange = (id: string, newStock: number) => {
    setEditedProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  const handleSavePrices = () => {
    onUpdateProducts(editedProducts);
    setSaveToast('सभी प्रोडक्ट के नए रेट सेव हो गए! (Prices Updated)');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSaveToast('UPI और स्टोर सेटिंग्स सेव हो गईं! (Settings Saved)');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleManualAdd = () => {
    const val = parseFloat(manualAmount);
    if (!isNaN(val) && val > 0) {
      onManualCredit(val);
      setSaveToast(`₹${val} वॉलेट में तुरंत क्रेडिट कर दिए गए!`);
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090D16] border border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-white max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>BLACK XERA Master Control</span>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-mono font-bold">OWNER</span>
              </h3>
              <p className="text-[11px] text-slate-400">सब कुछ आपके कंट्रोल में: रेट्स, UPI, अप्रूवल्स और स्टॉक्स</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none">
          {[
            { id: 'prices', label: 'प्राइस & स्टॉक कंट्रोल', icon: DollarSign },
            { id: 'recharges', label: `पेंडिंग UPI रिचार्ज (${pendingTransactions.length})`, icon: QrCode, badge: pendingTransactions.length },
            { id: 'settings', label: 'UPI & स्टोर सेटिंग्स', icon: Settings },
            { id: 'manual', label: 'मैन्युअल वॉलेट फंड्स', icon: Sparkles }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {saveToast && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-medium text-center flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          
          {/* TAB 1: Price & Stock Control */}
          {activeTab === 'prices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  यहाँ से आप किसी भी प्रोडक्ट की कीमत और स्टॉक तुरंत बदल सकते हैं:
                </span>
                <button
                  onClick={handleSavePrices}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Prices</span>
                </button>
              </div>

              <div className="space-y-3">
                {editedProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="p-3.5 bg-[#0D121F] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{prod.title}</div>
                      <div className="text-[11px] text-slate-400">{prod.subtitle}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Price Input */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono block">कीमत (₹)</span>
                        <div className="flex items-center bg-[#070B14] border border-slate-700 rounded-lg px-2 py-1">
                          <span className="text-slate-500 mr-1">₹</span>
                          <input
                            type="number"
                            value={prod.priceInr}
                            onChange={(e) => handlePriceChange(prod.id, parseFloat(e.target.value) || 0)}
                            className="w-16 bg-transparent text-white font-mono font-bold outline-none text-right"
                          />
                        </div>
                      </div>

                      {/* Stock Input */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono block">स्टॉक</span>
                        <div className="bg-[#070B14] border border-slate-700 rounded-lg px-2 py-1">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => handleStockChange(prod.id, parseInt(e.target.value) || 0)}
                            className="w-16 bg-transparent text-cyan-300 font-mono font-bold outline-none text-right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Pending Recharges Approval */}
          {activeTab === 'recharges' && (
            <div className="space-y-3">
              <span className="text-xs text-slate-400 block">
                ग्राहकों द्वारा UPI से भेजे गए 12 अंकों के UTR कोड्स। सही पाए जाने पर 1-क्लिक में अप्रूव करें:
              </span>

              {pendingTransactions.length === 0 ? (
                <div className="p-8 text-center bg-[#0D121F] border border-slate-800 rounded-2xl space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-slate-300">कोई पेंडिंग UTR नहीं है!</div>
                  <p className="text-xs text-slate-500">All recharge requests have been cleared.</p>
                </div>
              ) : (
                pendingTransactions.map(tx => (
                  <div
                    key={tx.id}
                    className="p-4 bg-[#0D121F] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-bold">{tx.id}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{tx.date}</span>
                      </div>
                      <div className="text-white font-bold text-sm">
                        UTR: <span className="font-mono text-amber-300 text-base">{tx.utrNumber}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Amount: <strong className="text-emerald-400 text-sm">₹{tx.amountInr}</strong> via {tx.paymentMethod}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApproveTransaction(tx.id)}
                        className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Credit</span>
                      </button>

                      <button
                        onClick={() => onRejectTransaction(tx.id)}
                        className="py-2 px-3 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Store & UPI Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-3">
                
                {/* UPI ID */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    आपकी मुख्य UPI ID (जहाँ ग्राहक पैसे भेजेंगे):
                  </label>
                  <input
                    type="text"
                    value={settingsForm.ownerUpi}
                    onChange={(e) => setSettingsForm({ ...settingsForm, ownerUpi: e.target.value })}
                    className="w-full bg-[#080D18] border border-slate-800 focus:border-amber-500 rounded-xl p-2.5 text-xs font-mono text-cyan-300 outline-none"
                    required
                  />
                </div>

                {/* Payee Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    UPI खाताधारक का नाम (Payee Name):
                  </label>
                  <input
                    type="text"
                    value={settingsForm.ownerName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
                    className="w-full bg-[#080D18] border border-slate-800 focus:border-amber-500 rounded-xl p-2.5 text-xs text-white outline-none"
                    required
                  />
                </div>

                {/* Telegram Support Username/Link */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    टेलीग्राम सपोर्ट लिंक (Telegram Support):
                  </label>
                  <input
                    type="text"
                    value={settingsForm.supportTelegram}
                    onChange={(e) => setSettingsForm({ ...settingsForm, supportTelegram: e.target.value })}
                    className="w-full bg-[#080D18] border border-slate-800 focus:border-amber-500 rounded-xl p-2.5 text-xs text-cyan-400 outline-none"
                    required
                  />
                </div>

                {/* Announcement text */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    वेबसाइट घोषणा बैनर (Announcement Bar):
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.announcement}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                    className="w-full bg-[#080D18] border border-slate-800 focus:border-amber-500 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Save UPI & Store Settings
              </button>
            </form>
          )}

          {/* TAB 4: Manual Balance Credit */}
          {activeTab === 'manual' && (
            <div className="p-4 bg-[#0D121F] border border-slate-800 rounded-2xl space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Manual Wallet Credit (Demo & Testing)</h4>
                <p className="text-xs text-slate-400">
                  बिना UPI के टेस्टिंग के लिए अपने वॉलेट में सीधे पैसे जोड़ें:
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-xl py-2 pl-7 pr-3 text-sm text-white font-mono outline-none"
                    placeholder="500"
                  />
                </div>

                <button
                  onClick={handleManualAdd}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  + Add to Wallet
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
