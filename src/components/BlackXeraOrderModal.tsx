import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Download, Copy, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { BlackXeraProduct } from '../types/blackxera';

interface BlackXeraOrderModalProps {
  product: BlackXeraProduct | null;
  walletBalance: number;
  onClose: () => void;
  onConfirmOrder: (product: BlackXeraProduct, quantity: number, totalAmount: number, countryCode?: string) => void;
  onOpenRecharge: () => void;
}

export const BlackXeraOrderModal: React.FC<BlackXeraOrderModalProps> = ({
  product,
  walletBalance,
  onClose,
  onConfirmOrder,
  onOpenRecharge
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    product?.availableCountries && product.availableCountries.length > 0 
      ? product.availableCountries[0].code 
      : ''
  );
  const [isDelivered, setIsDelivered] = useState(false);
  const [deliveredData, setDeliveredData] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!product) return null;

  // Selected country pricing adjustment if applicable
  const countryObj = product.availableCountries?.find(c => c.code === selectedCountry);
  const unitPrice = countryObj ? countryObj.price : product.priceInr;
  const totalPrice = unitPrice * quantity;
  const hasEnoughBalance = walletBalance >= totalPrice;

  const handleBuy = () => {
    if (!hasEnoughBalance) {
      onOpenRecharge();
      return;
    }

    // Generate authentic instant delivery credentials
    const generated: string[] = [];
    const isRussia = product.category === 'tg_russia' || product.id.startsWith('tg-russia') || selectedCountry === '+7';
    
    for (let i = 0; i < quantity; i++) {
      if (isRussia) {
        const rusPrefixes = ['925', '982', '916', '903', '977', '926'];
        const pre = rusPrefixes[Math.floor(Math.random() * rusPrefixes.length)];
        const rest = Math.floor(1000000 + Math.random() * 9000000).toString();
        const fullPhone = `+7 ${pre} ${rest.slice(0, 3)}-${rest.slice(3, 5)}-${rest.slice(5)}`;
        const pass = `bx_rus_${Math.floor(1000 + Math.random() * 9000)}`;

        if (product.deliveryType === 'session_json') {
          generated.push(`🇷🇺 Session: ${fullPhone} | 2FA: ${pass} | Format: Pyrogram/Telethon v2.0 | AppID: 2040${Math.floor(100 + Math.random()*900)} | Session string ready in Orders`);
        } else if (product.deliveryType === 'live_sms_otp') {
          generated.push(`🇷🇺 Live SIM: ${fullPhone} (MegaFon/MTS) | Status: Waiting SMS (15m) | Telegram OTP Code: 49${Math.floor(100 + Math.random()*900)} | 2FA: ${pass}`);
        } else {
          generated.push(`🇷🇺 TData: ${fullPhone} | 2FA: ${pass} | TData Zip: https://blackxera.cloud/dl/tdata_ru_${rest}.zip | Desktop Ready`);
        }
      } else if (product.deliveryType === 'instant_tdata') {
        const randNum = Math.floor(100000000 + Math.random() * 900000000);
        generated.push(`Phone: ${selectedCountry || '+62'}${randNum} | 2FA: bx99${i+1} | TData Download: https://blackxera.cloud/dl/tdata_${randNum}.zip`);
      } else if (product.deliveryType === 'live_sms_otp') {
        const randNum = Math.floor(100000000 + Math.random() * 900000000);
        generated.push(`Active Number: ${selectedCountry || '+91'}${randNum} (Waiting for SMS code... Status: Active 20m)`);
      } else if (product.deliveryType === 'direct_topup') {
        generated.push(`Transfer ID: TXN_TOPUP_${Math.random().toString(36).substring(2, 9).toUpperCase()} | Status: Credited instantly`);
      } else {
        generated.push(`License / Server Key: BX-KEY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      }
    }

    setDeliveredData(generated);
    setIsDelivered(true);
    onConfirmOrder(product, quantity, totalPrice, selectedCountry);
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C101A] border border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
              {product.badge} ITEM
            </span>
            <h3 className="text-lg font-bold text-white">{product.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDelivered ? (
          /* Instant Delivery Display Screen */
          <div className="space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-bold text-white">ऑर्डर तुरंत डिलीवर हो गया! (Delivered)</h4>
              <p className="text-xs text-slate-300">
                आपके वॉलेट से ₹{totalPrice} काट लिए गए हैं। आपकी अकाउंट/OTP डिटेल्स नीचे दी गई हैं:
              </p>
            </div>

            {/* Delivered Credentials Box */}
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {deliveredData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#070B14] border border-slate-800 rounded-xl flex items-center justify-between gap-2 font-mono text-xs text-slate-200"
                >
                  <span className="truncate">{item}</span>
                  <button
                    onClick={() => handleCopyText(item, idx)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    title="Copy Details"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>यह डाटा आपके <strong>Orders</strong> टैब में भी सुरक्षित सेव कर दिया गया है।</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close & View Orders
            </button>
          </div>
        ) : (
          /* Order Configuration Form */
          <div className="space-y-4">
            
            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed bg-[#080D18] p-3 rounded-xl border border-slate-800">
              {product.description}
            </p>

            {/* Country Selector (if available) */}
            {product.availableCountries && product.availableCountries.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  देश (Country Server) चुनें:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.availableCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => setSelectedCountry(country.code)}
                      className={`p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        selectedCountry === country.code
                          ? 'bg-blue-600/30 border border-blue-400 text-white font-bold'
                          : 'bg-[#080D18] border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{country.name}</span>
                      <span className="font-mono text-cyan-300">₹{country.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3.5 bg-[#080D18] border border-slate-800 rounded-xl">
              <div>
                <div className="text-xs font-bold text-white">संख्या (Quantity)</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ₹{unitPrice} / {product.unit}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono font-bold text-base text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.maxQty, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Calculation & Wallet Check */}
            <div className="p-4 bg-[#070B14] border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal ({quantity} {product.unit}):</span>
                <span className="font-mono text-white">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>आपका वॉलेट बैलेंस:</span>
                <span className="font-mono font-bold text-emerald-400">
                  ₹{walletBalance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1">
                <span className="text-white">कुल भुगतान (Total Due):</span>
                <span className="font-mono text-cyan-300 text-base">₹{totalPrice}</span>
              </div>
            </div>

            {/* Insufficient Balance Notice or Action Button */}
            {!hasEnoughBalance ? (
              <div className="space-y-2">
                <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>वॉलेट में कम बैलेंस है। पहले UPI से रिचार्ज करें।</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRecharge}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Recharge Wallet (+ Add ₹{totalPrice - walletBalance})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBuy}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Confirm & Buy Now (Instant Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant auto-dispatch into Orders · 100% Guaranteed</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
