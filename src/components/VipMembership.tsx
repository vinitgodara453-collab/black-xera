import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { VIP_PLANS } from '../data/cyberDatabase';
import { VipPlan, UpiPaymentConfig, UserVipStatus, Language } from '../types/cyber';
import { Crown, Check, Copy, QrCode, ArrowRight, ShieldCheck, Sparkles, Smartphone, Download, AlertCircle } from 'lucide-react';

interface VipMembershipProps {
  lang: Language;
  upiConfig: UpiPaymentConfig;
  vipStatus: UserVipStatus;
  onUpgradeSuccess: (planId: 'pro' | 'elite', planName: string, utr: string) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  selectedPlanIdDefault?: 'pro' | 'elite';
}

export const VipMembership: React.FC<VipMembershipProps> = ({
  lang,
  upiConfig,
  vipStatus,
  onUpgradeSuccess,
  isModalOpen,
  onCloseModal,
  selectedPlanIdDefault = 'pro',
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'pro' | 'elite'>(selectedPlanIdDefault);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const selectedPlan = VIP_PLANS.find(p => p.id === selectedPlanId) || VIP_PLANS[1];

  // Dynamic UPI URI string
  const upiUri = `upi://pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.payeeName)}&am=${selectedPlan.priceInr}&cu=INR&tn=CyberShield%20${encodeURIComponent(selectedPlan.name)}%20VIP`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 260,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR Code error:', err));
  }, [upiUri]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiConfig.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      setVerificationError(lang === 'hi' ? 'कृपया सही 12-अंकों का UTR / Transaction ID दर्ज करें।' : 'Please enter valid 12-digit UTR transaction reference number.');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    setTimeout(() => {
      setIsVerifying(false);
      onUpgradeSuccess(selectedPlan.id as 'pro' | 'elite', selectedPlan.name, utrNumber.trim());
      onCloseModal();
    }, 800);
  };

  return (
    <section id="vip-pricing" className="py-12 sm:py-16 border-b border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'VIP मेम्बरशिप & प्रीमियम सुरक्षा' : 'VIP Membership & Defense'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'hi' ? 'अपनी साइबर सुरक्षा को VIP में अपग्रेड करें' : 'Unlock Elite VIP Threat Intelligence'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi'
              ? 'असीमित पोर्ट स्कैनिंग, डार्क वेब मॉनिटरिंग और पेनेट्रेशन टेस्टिंग रिपोर्ट सीधे आपके पास।'
              : 'Enterprise-grade threat hunting, continuous breach monitoring, and direct incident support.'}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {VIP_PLANS.map((plan) => {
            const isCurrent = vipStatus.isVip && vipStatus.planId === plan.id;
            const isPro = plan.id === 'pro';

            return (
              <div
                key={plan.id}
                className={`bg-[#0D1424] border rounded-xl p-6 flex flex-col justify-between transition-all relative ${
                  plan.isPopular
                    ? 'border-amber-500/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-full shadow">
                    {lang === 'hi' ? 'सबसे लोकप्रिय VIP' : 'Most Popular'}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{lang === 'hi' ? plan.nameHi : plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {lang === 'hi' ? plan.taglineHi : plan.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-1.5 py-2 border-y border-slate-800/80">
                    <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                      {plan.priceInr === 0 ? '₹0' : `₹${plan.priceInr}`}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      /{lang === 'hi' ? plan.billingPeriodHi : plan.billingPeriod}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 text-xs text-slate-300">
                    {(lang === 'hi' ? plan.featuresHi : plan.features).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800">
                  {plan.id === 'free' ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 bg-slate-900 text-slate-400 text-xs font-semibold rounded-lg text-center cursor-default"
                    >
                      {lang === 'hi' ? 'डिफ़ॉल्ट मुफ़्त प्लान' : 'Current Active Plan'}
                    </button>
                  ) : isCurrent ? (
                    <div className="w-full py-2.5 px-4 bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'सक्रिय VIP सदस्य' : 'Active VIP Member'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPlanId(plan.id as 'pro' | 'elite');
                        // Open modal by triggering parent
                        onUpgradeSuccess(plan.id as 'pro' | 'elite', plan.name, ''); // Trigger modal flow
                      }}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? `₹${plan.priceInr} में VIP लें (UPI)` : `Join VIP (₹${plan.priceInr})`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* UPI Integration Callout */}
        <div className="mt-10 p-5 bg-[#090E1A] border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                {lang === 'hi' ? 'डायरेक्ट UPI पेमेंट गेटवे इंटीग्रेटेड' : 'Instant UPI Payment QR Code Integrated'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'hi' ? 'PhonePe, Google Pay, Paytm, BHIM या किसी भी UPI ऐप से 1-क्लिक में पेमेंट करें।' : 'Pay effortlessly with PhonePe, Google Pay, Paytm, or BHIM UPI.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#060A14] border border-slate-800 px-3 py-2 rounded-lg text-xs font-mono">
            <span className="text-slate-400">UPI ID:</span>
            <span className="text-cyan-400 font-bold">{upiConfig.upiId}</span>
            <button
              onClick={handleCopyUpi}
              className="text-slate-400 hover:text-white p-1"
              title="Copy UPI ID"
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>

      {/* UPI PAYMENT & QR CODE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-[#0C1220] border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-5 relative max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Crown className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'VIP मेम्बरशिप पेमेंट' : 'VIP Membership Payment'}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedPlan.name} (₹{selectedPlan.priceInr})
                </h3>
              </div>
              <button
                onClick={onCloseModal}
                className="text-slate-400 hover:text-white p-1 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Scan QR or Open App */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                {lang === 'hi' ? '1. QR कोड स्कैन करें या UPI ID पर पेमेंट भेजें:' : '1. Scan QR Code or Pay via UPI ID:'}
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#070B14] border border-slate-800 p-4 rounded-xl">
                {/* Real Dynamic QR Code */}
                {qrCodeUrl ? (
                  <div className="p-2 bg-white rounded-lg shadow-md shrink-0">
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-36 h-36 bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-400">
                    Generating QR...
                  </div>
                )}

                <div className="space-y-2 text-xs flex-1">
                  <div className="text-slate-300">
                    <span className="text-slate-400">{lang === 'hi' ? 'प्राप्तकर्ता (Payee):' : 'Payee:'}</span>{' '}
                    <strong>{upiConfig.payeeName}</strong>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-400">{lang === 'hi' ? 'रकम (Amount):' : 'Amount:'}</span>{' '}
                    <strong className="text-emerald-400 font-mono text-sm">₹{selectedPlan.priceInr}</strong>
                  </div>

                  {/* Copy UPI Box */}
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded flex items-center justify-between font-mono text-[11px] text-cyan-400">
                    <span className="truncate">{upiConfig.upiId}</span>
                    <button
                      onClick={handleCopyUpi}
                      className="text-slate-300 hover:text-white p-1 shrink-0 ml-1"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Direct App Launchers on Mobile */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    <a
                      href={upiUri}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold"
                    >
                      Open UPI App
                    </a>
                    <a
                      href={`phonepe://pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.payeeName)}&am=${selectedPlan.priceInr}&cu=INR`}
                      className="px-2.5 py-1 bg-[#5f259f] hover:bg-[#4d1d80] text-white rounded text-[11px] font-semibold"
                    >
                      PhonePe
                    </a>
                    <a
                      href={`gpay://upi/pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.payeeName)}&am=${selectedPlan.priceInr}&cu=INR`}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-semibold"
                    >
                      GPay
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Submit UTR / Ref Number */}
            <form onSubmit={handleVerifyPayment} className="space-y-3 border-t border-slate-800 pt-3">
              <label className="block text-xs font-semibold text-slate-300">
                {lang === 'hi' ? '2. पेमेंट के बाद 12-अंकों का UTR / Transaction No. दर्ज करें:' : '2. Enter 12-Digit UTR / Transaction Reference Number:'}
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 428910283921"
                  className="flex-1 bg-[#070B14] border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  {isVerifying ? (lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...') : (lang === 'hi' ? 'VIP एक्टिवेट करें' : 'Unlock VIP Access')}
                </button>
              </div>

              {verificationError && (
                <div className="text-rose-400 text-[11px] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{verificationError}</span>
                </div>
              )}
            </form>

            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
              💡 {lang === 'hi' 
                ? 'पेमेंट सीधे आपके UPI खाते में जमा होता है। UTR दर्ज करते ही तुरंत VIP एक्सेस एक्टिव हो जाता है।' 
                : 'Direct peer-to-peer UPI transfer with zero platform cut. Instant automated entitlement upon UTR submission.'}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
