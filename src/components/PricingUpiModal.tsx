import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { PRICING_PLANS, DEFAULT_OWNER_UPI } from '../data/mockQrcodes';
import { QrPricingPlan, TransactionRecord } from '../types/qrcodes';
import { Crown, Check, Copy, Smartphone, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface PricingUpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
  onAddTransaction: (tx: TransactionRecord) => void;
  isVip: boolean;
}

export const PricingUpiModal: React.FC<PricingUpiModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddTransaction,
  isVip,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'pro' | 'business'>('pro');
  const [buyerName, setBuyerName] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  // Dynamic UPI URI string
  const upiUri = `upi://pay?pa=${DEFAULT_OWNER_UPI.upiId}&pn=${encodeURIComponent(DEFAULT_OWNER_UPI.payeeName)}&am=${selectedPlan.priceInr}&cu=INR&tn=NexCodes%20${encodeURIComponent(selectedPlan.name)}`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 240,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    }).then(setQrCodeDataUrl);
  }, [upiUri]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(DEFAULT_OWNER_UPI.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 6) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newTx: TransactionRecord = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        buyerName: buyerName.trim() || 'Verified Customer',
        buyerPhoneOrEmail: buyerContact.trim() || 'UPI App User',
        planName: selectedPlan.name,
        amountInr: selectedPlan.priceInr,
        utrNumber: utrNumber.trim(),
        date: new Date().toLocaleString(),
        status: 'verified',
      };

      onAddTransaction(newTx);
      setIsSubmitting(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0C1220] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 text-sm font-semibold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Crown className="w-4 h-4" />
            <span>{lang === 'hi' ? 'VIP अपग्रेड & UPI पेमेंट गेटवे' : 'VIP Upgrade & UPI Payment Portal'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-0.5">
            {lang === 'hi' ? 'डायनामिक QR & फुल एनालिटिक्स अनलॉक करें' : 'Unlock Dynamic QR & Scan Analytics'}
          </h3>
        </div>

        {/* Plan Switcher */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedPlanId('pro')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedPlanId === 'pro'
                ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                : 'bg-[#080D18] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Pro Creator</span>
              <span className="font-mono font-bold text-emerald-400">₹299/mo</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi' ? 'डायनामिक लिंक और पूरा एनालिटिक्स' : 'Dynamic links & full scan analytics'}
            </p>
          </button>

          <button
            onClick={() => setSelectedPlanId('business')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedPlanId === 'business'
                ? 'bg-amber-500/20 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                : 'bg-[#080D18] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Business Lifetime</span>
              <span className="font-mono font-bold text-amber-400">₹799 Lifetime</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {lang === 'hi' ? 'असीमित कोड्स & कमर्शियल रीसेल' : 'Unlimited dynamic codes & reseller rights'}
            </p>
          </button>
        </div>

        {/* Step 1: Real Dynamic UPI QR Code */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 block">
            {lang === 'hi' ? '1. QR कोड स्कैन करके पेमेंट करें:' : '1. Scan UPI QR Code to Pay:'}
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#070B14] border border-slate-800 p-4 rounded-xl">
            {qrCodeDataUrl ? (
              <div className="p-2 bg-white rounded-xl shrink-0 shadow-lg">
                <img src={qrCodeDataUrl} alt="UPI QR Code" className="w-36 h-36 object-contain" />
              </div>
            ) : (
              <div className="w-36 h-36 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-500">
                Generating QR...
              </div>
            )}

            <div className="space-y-2 text-xs flex-1">
              <div className="text-slate-300">
                <span className="text-slate-400">Payee:</span> <strong>{DEFAULT_OWNER_UPI.payeeName}</strong>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Amount:</span> <strong className="text-emerald-400 font-mono text-base">₹{selectedPlan.priceInr}</strong>
              </div>

              {/* UPI Copy Box */}
              <div className="p-2 bg-slate-900 border border-slate-800 rounded flex items-center justify-between font-mono text-[11px] text-indigo-300">
                <span className="truncate">{DEFAULT_OWNER_UPI.upiId}</span>
                <button
                  onClick={handleCopyUpi}
                  className="text-slate-400 hover:text-white p-1 ml-1"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Instant App Launchers */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                <a
                  href={upiUri}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold"
                >
                  Open UPI App
                </a>
                <a
                  href={`phonepe://pay?pa=${DEFAULT_OWNER_UPI.upiId}&pn=${encodeURIComponent(DEFAULT_OWNER_UPI.payeeName)}&am=${selectedPlan.priceInr}&cu=INR`}
                  className="px-2.5 py-1 bg-[#5f259f] hover:bg-[#4d1d80] text-white rounded text-[11px] font-semibold"
                >
                  PhonePe
                </a>
                <a
                  href={`gpay://upi/pay?pa=${DEFAULT_OWNER_UPI.upiId}&pn=${encodeURIComponent(DEFAULT_OWNER_UPI.payeeName)}&am=${selectedPlan.priceInr}&cu=INR`}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-semibold"
                >
                  GPay
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: UTR Reference Submission */}
        <form onSubmit={handleVerifyPayment} className="space-y-3 border-t border-slate-800 pt-3 text-xs">
          <span className="block font-bold text-slate-300">
            {lang === 'hi' ? '2. पेमेंट के बाद अपना नाम और 12-अंकों का UTR नंबर दर्ज करें:' : '2. Enter Your Details & 12-Digit Bank UTR No:'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Your Name (e.g. Ramesh Kumar)"
              required
              className="bg-[#070B14] border border-slate-800 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={buyerContact}
              onChange={(e) => setBuyerContact(e.target.value)}
              placeholder="Mobile or Email"
              className="bg-[#070B14] border border-slate-800 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="12-digit UTR No. (e.g. 428910283921)"
              required
              className="flex-1 bg-[#070B14] border border-slate-800 rounded px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs rounded transition-all cursor-pointer shadow-md shrink-0"
            >
              {isSubmitting ? 'Verifying...' : 'Submit & Activate'}
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'hi'
                ? 'बधाई हो! पेमेंट वेरीफाई हो गया और VIP फीचर्स अनलॉक हो गए। यह रिकॉर्ड एनालिटिक्स में जुड़ गया!'
                : 'Payment verified! VIP unlocked and transaction logged in the Revenue Dashboard.'}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
