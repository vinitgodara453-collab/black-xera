import React, { useState } from 'react';
import { 
  QrItem, 
  TransactionRecord, 
  AnalyticsSummary, 
  QrPricingPlan 
} from '../types/qrcodes';
import { 
  ShieldCheck, 
  IndianRupee, 
  Users, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Settings, 
  Sliders, 
  Trash2, 
  Save, 
  Lock, 
  Unlock, 
  AlertCircle,
  ExternalLink,
  Smartphone
} from 'lucide-react';

interface AdminPanelProps {
  lang: 'hi' | 'en';
  analytics: AnalyticsSummary;
  transactions: TransactionRecord[];
  qrCodes: QrItem[];
  pricingPlans: QrPricingPlan[];
  ownerUpi: { upiId: string; payeeName: string };
  onUpdateOwnerUpi: (newUpi: { upiId: string; payeeName: string }) => void;
  onUpdatePricingPlans: (updatedPlans: QrPricingPlan[]) => void;
  onApproveTransaction: (id: string) => void;
  onRejectTransaction: (id: string) => void;
  onDeleteQrCode: (id: string) => void;
  onToggleQrStatus: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lang,
  analytics,
  transactions,
  qrCodes,
  pricingPlans,
  ownerUpi,
  onUpdateOwnerUpi,
  onUpdatePricingPlans,
  onApproveTransaction,
  onRejectTransaction,
  onDeleteQrCode,
  onToggleQrStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'codes' | 'pricing' | 'upi_settings'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default unlocked for easy direct access
  const [adminPin, setAdminPin] = useState('');
  
  // UPI Edit State
  const [upiIdInput, setUpiIdInput] = useState(ownerUpi.upiId);
  const [payeeNameInput, setPayeeNameInput] = useState(ownerUpi.payeeName);
  const [upiSaveSuccess, setUpiSaveSuccess] = useState(false);

  // Pricing Edit State
  const [editedPlans, setEditedPlans] = useState<QrPricingPlan[]>(pricingPlans);
  const [pricingSaveSuccess, setPricingSaveSuccess] = useState(false);

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerUpi({
      upiId: upiIdInput.trim(),
      payeeName: payeeNameInput.trim(),
    });
    setUpiSaveSuccess(true);
    setTimeout(() => setUpiSaveSuccess(false), 2000);
  };

  const handlePriceChange = (planId: string, newPrice: number) => {
    setEditedPlans(prev => prev.map(p => p.id === planId ? { ...p, priceInr: newPrice } : p));
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePricingPlans(editedPlans);
    setPricingSaveSuccess(true);
    setTimeout(() => setPricingSaveSuccess(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Transaction ID', 'Buyer Name', 'Contact', 'Plan', 'Amount (INR)', 'UTR Number', 'Date', 'Status'];
    const rows = transactions.map(t => [
      t.id,
      `"${t.buyerName}"`,
      `"${t.buyerPhoneOrEmail}"`,
      `"${t.planName}"`,
      t.amountInr,
      `"${t.utrNumber}"`,
      `"${t.date}"`,
      t.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexcodes_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'मास्टर एडमिन कंट्रोल पैनल' : 'Master Owner Admin Panel'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Bajrang Godara (Owner)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {lang === 'hi' ? 'वेबसाइट एडमिन पैनल (कंट्रोल सेंटर)' : 'Website Admin & Control Panel'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'hi'
                ? 'यहाँ से आप सभी ग्राहकों के पेमेंट्स, UTR अप्रूवल, सभी यूज़र्स के QR कोड्स, और UPI सेटिंग्स कंट्रोल कर सकते हैं।'
                : 'Centralized administration for customer orders, UTR verification, pricing plans, and QR management.'}
            </p>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'hi' ? 'पेमेंट रिपोर्ट डाउनलोड करें (CSV)' : 'Export Orders CSV'}</span>
          </button>
        </div>

        {/* Tab Navigation for Admin Sub-Panels */}
        <div className="flex items-center gap-1 p-1 bg-[#0D1424] border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', labelHi: '1. ओवरव्यू डैशबोर्ड', labelEn: '1. Overview' },
            { id: 'payments', labelHi: '2. पेमेंट & UTR अप्रूवल पैनल', labelEn: '2. Payment Orders & UTR' },
            { id: 'codes', labelHi: '3. सभी यूज़र्स के QR कोड्स', labelEn: '3. All Users Codes' },
            { id: 'pricing', labelHi: '4. प्लान्स और रेट बदलें', labelEn: '4. Edit Plans & Pricing' },
            { id: 'upi_settings', labelHi: '5. UPI खाता सेटिंग्स', labelEn: '5. UPI Gateway Setup' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* SUB-PANEL 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 bg-[#0D1424] border border-emerald-900/40 rounded-xl space-y-1">
                <span className="text-xs text-slate-400">{lang === 'hi' ? 'कुल पेमेंट (कुल कमाई)' : 'Total Revenue'}</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  ₹{analytics.totalRevenueInr.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-800 font-mono">
                  Direct to UPI ({transactions.length} Orders)
                </span>
              </div>

              <div className="p-4 bg-[#0D1424] border border-slate-800 rounded-xl space-y-1">
                <span className="text-xs text-slate-400">{lang === 'hi' ? 'कुल यूजर स्कैन्स' : 'Total User Scans'}</span>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {analytics.totalScans.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-800 font-mono">
                  {analytics.uniqueUsers} Unique Devices
                </span>
              </div>

              <div className="p-4 bg-[#0D1424] border border-slate-800 rounded-xl space-y-1">
                <span className="text-xs text-slate-400">{lang === 'hi' ? 'लाइव QR कोड्स' : 'Active Dynamic Codes'}</span>
                <div className="text-2xl font-bold font-mono text-indigo-400">
                  {qrCodes.length}
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-800 font-mono">
                  100% Hosted & Working
                </span>
              </div>

              <div className="p-4 bg-[#0D1424] border border-slate-800 rounded-xl space-y-1">
                <span className="text-xs text-slate-400">{lang === 'hi' ? 'सक्रिय UPI ID' : 'Active Receiving UPI'}</span>
                <div className="text-sm font-bold font-mono text-amber-300 truncate mt-1">
                  {ownerUpi.upiId}
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-slate-800">
                  {ownerUpi.payeeName}
                </span>
              </div>

            </div>

            {/* Quick Status Info */}
            <div className="p-4 bg-[#0D1424] border border-slate-800 rounded-xl text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'एडमिन पैनल की स्थिति:' : 'Admin Panel Status:'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'यह एक पूर्ण कस्टम एडमिन पैनल (Custom Built React Admin Console) है जिसमें कोई थर्ड-पार्टी सब्सक्रिप्शन शुल्क नहीं है। सारा डेटा सीधे आपके ब्राउज़र और लोकल डेटाबेस में सुरक्षित रहता है और UPI पेमेंट्स सीधे आपके बैंक में आते हैं।'
                  : 'Zero third-party vendor lock-in. Full master control over user traffic, customer transactions, dynamic QR destinations, and UPI configuration.'}
              </p>
            </div>
          </div>
        )}

        {/* SUB-PANEL 2: Payment & UTR Approval */}
        {activeTab === 'payments' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'hi' ? 'सभी ग्राहक पेमेंट्स & बैंक UTR सत्यापन' : 'All Customer Payments & Bank UTR Verification'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'hi'
                    ? 'ग्राहकों द्वारा UPI से भेजे गए 12-अंकों के UTR नंबर चेक करें और वेरीफाई करें'
                    : 'Review and verify customer bank transaction references'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#080D18] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">{lang === 'hi' ? 'ग्राहक का नाम' : 'Customer'}</th>
                    <th className="py-3 px-3">{lang === 'hi' ? 'प्लान' : 'Plan'}</th>
                    <th className="py-3 px-3 font-mono">{lang === 'hi' ? 'रकम' : 'Amount'}</th>
                    <th className="py-3 px-3 font-mono">{lang === 'hi' ? 'UTR नंबर' : 'UTR Ref'}</th>
                    <th className="py-3 px-3">{lang === 'hi' ? 'तारीख' : 'Date'}</th>
                    <th className="py-3 px-3 text-right">{lang === 'hi' ? 'एक्शन' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 text-cyan-400 font-bold whitespace-nowrap">{tx.id}</td>
                      <td className="py-3 px-3 text-white font-sans font-medium whitespace-nowrap">
                        <div>{tx.buyerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{tx.buyerPhoneOrEmail}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-sans whitespace-nowrap">{tx.planName}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold whitespace-nowrap">₹{tx.amountInr}</td>
                      <td className="py-3 px-3 text-amber-300 font-semibold whitespace-nowrap select-all">{tx.utrNumber}</td>
                      <td className="py-3 px-3 text-slate-400 font-sans text-[11px] whitespace-nowrap">{tx.date}</td>
                      <td className="py-3 px-3 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => onApproveTransaction(tx.id)}
                          className="px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 rounded text-[11px] font-sans font-semibold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectTransaction(tx.id)}
                          className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400 rounded text-[11px] font-sans font-semibold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-PANEL 3: All Users QR Codes Management */}
        {activeTab === 'codes' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'hi' ? 'वेबसाइट पर बने सभी QR कोड्स का नियंत्रण' : 'All Platform QR Codes Directory'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'hi' ? 'किसी भी कोड को ब्लॉक करें, डिलीट करें या उसका टारगेट लिंक चेक करें' : 'Monitor, pause, or remove any dynamic code on the platform'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#080D18] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Title / Code</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Target Destination URL</th>
                    <th className="py-3 px-3 font-mono">Scans</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {qrCodes.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-sans font-semibold text-white whitespace-nowrap">
                        <div>{c.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{c.id} · {c.createdAt}</div>
                      </td>
                      <td className="py-3 px-3 text-indigo-400 uppercase text-[11px] whitespace-nowrap">{c.type}</td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs truncate">{c.dynamicUrl || c.rawContent}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold whitespace-nowrap">{c.scansCount} scans</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <button
                          onClick={() => onToggleQrStatus(c.id)}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold cursor-pointer ${
                            c.status === 'active'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          }`}
                        >
                          {c.status}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => onDeleteQrCode(c.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                          title="Delete Code"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-PANEL 4: Pricing & Plans Configuration */}
        {activeTab === 'pricing' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            <div>
              <h3 className="font-bold text-white text-base">
                {lang === 'hi' ? 'प्लान्स और कीमतें बदलें (Pricing Manager)' : 'Pricing & Plans Configuration'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'अपनी मर्जी से Pro Creator या Business प्लान की कीमत बदलें। यह बदलाव पूरी वेबसाइट पर तुरंत दिखने लगेगा।'
                  : 'Adjust plan prices and billing cadences in real-time across the whole site.'}
              </p>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4 max-w-xl">
              {editedPlans.filter(p => p.id !== 'free').map((p) => (
                <div key={p.id} className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{p.name} ({p.period})</span>
                    <span className="font-mono text-emerald-400 font-bold">Current: ₹{p.priceInr}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'hi' ? 'नई कीमत (₹ INR):' : 'New Price in INR:'}
                    </label>
                    <input
                      type="number"
                      value={p.priceInr}
                      onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                      className="w-full bg-[#0D1424] border border-slate-700 rounded px-3 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}

              {pricingSaveSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{lang === 'hi' ? 'प्लान की कीमतें सफलतापूर्वक अपडेट हो गईं!' : 'Pricing updated successfully!'}</span>
                </div>
              )}

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'नई कीमतें सेव करें' : 'Save New Prices'}</span>
              </button>
            </form>
          </div>
        )}

        {/* SUB-PANEL 5: UPI Gateway Settings */}
        {activeTab === 'upi_settings' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            <div>
              <h3 className="font-bold text-white text-base">
                {lang === 'hi' ? 'UPI पेमेंट खाता सेटिंग्स' : 'Receiving UPI Gateway Configuration'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'ग्राहकों से पेमेंट प्राप्त करने के लिए अपना UPI ID (जैसे Google Pay / PhonePe / Paytm VPA) और नाम सेट करें।'
                  : 'Manage destination UPI VPA where all customer subscription payments are routed.'}
              </p>
            </div>

            <form onSubmit={handleSaveUpi} className="space-y-4 max-w-xl text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {lang === 'hi' ? 'आपका UPI ID (VPA):' : 'Your UPI ID (VPA):'}
                </label>
                <input
                  type="text"
                  value={upiIdInput}
                  onChange={(e) => setUpiIdInput(e.target.value)}
                  placeholder="e.g. bajranggodara930@okaxis"
                  required
                  className="w-full bg-[#080D18] border border-slate-700 rounded-lg px-3 py-2 text-indigo-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  ग्राहक PhonePe, Google Pay, Paytm या BHIM से इसी ID पर पेमेंट करेंगे।
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {lang === 'hi' ? 'खाता धारक / बिजनेस का नाम:' : 'Payee / Business Name:'}
                </label>
                <input
                  type="text"
                  value={payeeNameInput}
                  onChange={(e) => setPayeeNameInput(e.target.value)}
                  placeholder="e.g. Bajrang Godara (NexCodes)"
                  required
                  className="w-full bg-[#080D18] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {upiSaveSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{lang === 'hi' ? 'UPI खाता सफलतापूर्वक सेव हो गया!' : 'UPI configuration saved successfully!'}</span>
                </div>
              )}

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'UPI सेटिंग्स सेव करें' : 'Save UPI Settings'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
