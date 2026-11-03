import React, { useState } from 'react';
import { UpiPaymentConfig, Language } from '../types/cyber';
import { Settings, Check, Smartphone, X, Save } from 'lucide-react';

interface AdminUpiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  upiConfig: UpiPaymentConfig;
  onSaveConfig: (newConfig: UpiPaymentConfig) => void;
}

export const AdminUpiSettingsModal: React.FC<AdminUpiSettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  upiConfig,
  onSaveConfig,
}) => {
  const [upiId, setUpiId] = useState(upiConfig.upiId);
  const [payeeName, setPayeeName] = useState(upiConfig.payeeName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (upiId.trim() && payeeName.trim()) {
      onSaveConfig({
        upiId: upiId.trim(),
        payeeName: payeeName.trim(),
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0C1220] border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-5 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <Settings className="w-4 h-4" />
          <span>{lang === 'hi' ? 'एडमिन UPI सेटिंग्स' : 'Admin UPI Settings'}</span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'अपना UPI ID और खाता बदलें' : 'Configure Your Receiving UPI ID'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'hi'
              ? 'VIP मेम्बरशिप से आने वाला सारा पैसा सीधे आपके इस UPI खाते में जमा होगा।'
              : 'All membership funds will directly route to this UPI VPA without platform middleman.'}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {lang === 'hi' ? 'आपका UPI ID (VPA):' : 'Your UPI ID (VPA):'}
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. bajranggodara930@okaxis"
              className="w-full bg-[#070B14] border border-slate-800 rounded-lg px-3 py-2 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Google Pay, PhonePe, Paytm, या BHIM का कोई भी UPI ID डालें।
            </span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {lang === 'hi' ? 'खाता धारक का नाम (Payee Name):' : 'Payee / Business Name:'}
            </label>
            <input
              type="text"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              placeholder="e.g. Bajrang Godara"
              className="w-full bg-[#070B14] border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs rounded flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{lang === 'hi' ? 'UPI सेटिंग्स सफलतापूर्वक अपडेट हो गईं!' : 'UPI Settings saved successfully!'}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-xs transition-colors"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded text-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'UPI सेव करें' : 'Save UPI Config'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
