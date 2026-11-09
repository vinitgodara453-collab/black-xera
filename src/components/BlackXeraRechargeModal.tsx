import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ShieldCheck, ArrowRight, Smartphone, Sparkles } from 'lucide-react';
import { AdminSettings } from '../types/blackxera';

interface BlackXeraRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminSettings: AdminSettings;
  onSubmitRecharge: (amount: number, utr: string) => void;
  initialAmount?: number;
}

export const BlackXeraRechargeModal: React.FC<BlackXeraRechargeModalProps> = ({
  isOpen,
  onClose,
  adminSettings,
  onSubmitRecharge,
  initialAmount
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount || 200);
  const [customAmount, setCustomAmount] = useState<string>(initialAmount ? initialAmount.toString() : '');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialAmount) {
      setSelectedAmount(initialAmount);
      setCustomAmount(initialAmount.toString());
    }
  }, [initialAmount]);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Real Indian UPI URI standard format
  const upiUri = `upi://pay?pa=${encodeURIComponent(adminSettings.ownerUpi)}&pn=${encodeURIComponent(adminSettings.ownerName)}&am=${currentAmount}&cu=INR&tn=BlackXera%20Recharge`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUri)}&margin=8`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(adminSettings.ownerUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (currentAmount < adminSettings.minRechargeInr) {
      setErrorMsg(`Minimum recharge is ₹${adminSettings.minRechargeInr}`);
      return;
    }

    const cleanUtr = utrNumber.trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      setErrorMsg('कृपया 12 अंकों का सही UTR / Ref Number डालें (Please enter 12-digit UTR)');
      return;
    }

    onSubmitRecharge(currentAmount, cleanUtr);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0C101A] border border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Recharge Wallet (Instant UPI)</h3>
              <p className="text-[11px] text-slate-400">PhonePe · Paytm · Google Pay · BHIM</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">UTR सबमिट हो गया! (Submitted)</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                आपका ₹{currentAmount} का रिचार्ज वेरिफिकेशन में भेज दिया गया है। एडमिन द्वारा चेक करते ही वॉलेट बैलेंस जुड़ जाएगा!
              </p>
            </div>
            <div className="p-3 bg-[#080C14] border border-slate-800 rounded-xl font-mono text-xs text-slate-400 space-y-1">
              <div>UTR Number: <span className="text-cyan-400 font-bold">{utrNumber}</span></div>
              <div>Amount: <span className="text-emerald-400 font-bold">₹{currentAmount}</span></div>
            </div>
            <button
              onClick={() => { setIsSubmitted(false); onClose(); }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          /* Recharge Form & QR */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Amount Selection Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>रिचार्ज राशि चुनें (Select Amount)</span>
                <span className="text-slate-500 text-[10px]">Min: ₹{adminSettings.minRechargeInr}</span>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400'
                        : 'bg-[#080D18] text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  placeholder="Custom Amount (जैसे: 350)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-[#080D18] border border-slate-800 focus:border-blue-500 rounded-xl py-2 pl-7 pr-3 text-xs text-white placeholder-slate-600 font-mono outline-none"
                />
              </div>
            </div>

            {/* Live QR Code Box */}
            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-3">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <img
                  src={qrImageUrl}
                  alt="UPI QR Code"
                  className="w-44 h-44 object-contain"
                />
              </div>

              <div className="text-center space-y-1">
                <div className="text-xs font-extrabold text-white">
                  Scan & Pay ₹{currentAmount} with any UPI App
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-cyan-400">
                  <span>UPI: {adminSettings.ownerUpi}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1 hover:text-white"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500">Payee: {adminSettings.ownerName}</div>
              </div>
            </div>

            {/* UTR Number Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>12 अंकों का UTR / Ref No. डालें</span>
                <span className="text-blue-400 text-[10px]">Payment के बाद मिलता है</span>
              </label>
              <input
                type="text"
                maxLength={12}
                placeholder="उदा. 429810394821"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#080D18] border border-slate-800 focus:border-blue-500 rounded-xl p-2.5 text-sm font-mono tracking-widest text-white placeholder-slate-600 outline-none text-center font-bold"
                required
              />
            </div>

            {errorMsg && (
              <div className="p-2 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Verify & Add ₹{currentAmount} to Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Bank to Bank Transfer · Zero Middleman Fees</span>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
