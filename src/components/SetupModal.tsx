import React, { useState } from 'react';
import { VPSProvider } from '../data/vpsProviders';
import { X, Check, Copy, ExternalLink, Terminal, Shield, AlertCircle } from 'lucide-react';

interface SetupModalProps {
  provider: VPSProvider | null;
  onClose: () => void;
  lang: 'hi' | 'en';
}

export const SetupModal: React.FC<SetupModalProps> = ({
  provider,
  onClose,
  lang,
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!provider) return null;

  const defaultUser = provider.id === 'aws-lightsail' || provider.id === 'oracle-free' ? 'ubuntu' : 'root';
  const sshCmd = `ssh ${defaultUser}@YOUR_SERVER_IP`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0C1220] border border-slate-800 rounded-lg max-w-xl w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="text-xs font-semibold text-blue-400 mb-1">
            {lang === 'hi' ? 'सेटअप निर्देश' : 'Setup & Onboarding Guide'}
          </div>
          <h3 className="text-xl font-bold text-white">
            {provider.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {provider.planName} · {provider.ram} · {provider.cpu}
          </p>
        </div>

        {/* Important purchase tips */}
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-md text-xs space-y-2">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? 'खरीदने से पहले जरूरी बातें:' : 'Important Purchase Tips:'}</span>
          </div>
          <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
            {provider.id === 'oracle-free' && (
              <>
                <li>{lang === 'hi' ? 'साइनअप करते समय "Always Free Eligible" रीजन (जैसे Mumbai या Hyderabad) चुनें।' : 'Select an Always Free eligible home region like Mumbai or Hyderabad during signup.'}</li>
                <li>{lang === 'hi' ? 'कार्ड पर ₹75-₹100 डिडक्ट होगा और 24 घंटे में रिफंड हो जाएगा।' : 'Verification requires temporary card authorization (~₹75-100), refunded automatically.'}</li>
              </>
            )}
            {provider.id === 'racknerd' && (
              <>
                <li>{lang === 'hi' ? 'पेमेंट पेज पर "UPI / NetBanking" या "PayPal" चुनें, इंटरनेशनल क्रेडिट कार्ड की जरूरत नहीं है।' : 'Choose UPI or PayPal at checkout—no international credit card needed.'}</li>
                <li>{lang === 'hi' ? 'लोकेशन में Los Angeles (LA) या San Jose चुनें, भारत के लिए सबसे अच्छी स्पीड मिलेगी।' : 'Pick Los Angeles or San Jose for optimal Asia/India routing.'}</li>
              </>
            )}
            {provider.id === 'hetzner' && (
              <>
                <li>{lang === 'hi' ? 'साइन अप के बाद ईमेल पर KYC वेरिफिकेशन लिंक आ सकता है, आधार/पासपोर्ट या ड्राइविंग लाइसेंस तैयार रखें।' : 'Hetzner requires identity verification (ID/Passport) to prevent abusive spam accounts.'}</li>
                <li>{lang === 'hi' ? 'सर्वर बनाते समय OS में "Ubuntu 24.04" और आर्किटेक्चर में "x86 (Intel/AMD)" चुनें।' : 'Choose Ubuntu 24.04 LTS and x86_64 architecture for widest compatibility.'}</li>
              </>
            )}
            {provider.id === 'hostinger' && (
              <>
                <li>{lang === 'hi' ? 'चेकआउट पर "Server Location" में Mumbai (India) चुनें, इससे भारत में 15-25ms पिंग मिलेगी।' : 'Select Mumbai server location for <25ms latency inside India.'}</li>
                <li>{lang === 'hi' ? 'पेमेंट में सीधे PhonePe, GPay, या Paytm UPI से पेमेंट कर सकते हैं।' : 'Pay directly using any Indian UPI app (GPay, PhonePe, Paytm).'}</li>
              </>
            )}
            {provider.id === 'aws-lightsail' && (
              <>
                <li>{lang === 'hi' ? 'AWS कंसोल में जाकर Lightsail खोलें -> Create Instance -> Linux/Unix -> OS Only -> Ubuntu 24.04 चुनें।' : 'In AWS Console, open Lightsail -> Create Instance -> Linux/Unix -> OS Only -> Ubuntu 24.04.'}</li>
                <li>{lang === 'hi' ? 'स्टैटिक IP अटैच करना न भूलें (Lightsail में 1 स्टैटिक IP बिल्कुल फ्री मिलता है)।' : 'Remember to attach a Static IP (1 static IP is free on Lightsail).'}</li>
              </>
            )}
          </ul>
        </div>

        {/* SSH Connection snippet */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'hi' ? 'लॉग इन कमांड (SSH)' : 'SSH Login Command'}</span>
            </span>
            <button
              onClick={() => handleCopy(sshCmd)}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              {copiedCmd === sshCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd === sshCmd ? (lang === 'hi' ? 'कॉपी हो गया' : 'Copied') : (lang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
            </button>
          </div>
          <div className="p-3 bg-[#080B12] border border-slate-800 rounded font-mono text-emerald-400 text-xs">
            $ {sshCmd}
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'hi' 
              ? `* "YOUR_SERVER_IP" की जगह प्रोवाइडर से मिला हुआ IP डालें। डिफॉल्ट यूजर "${defaultUser}" है।` 
              : `* Replace YOUR_SERVER_IP with the IP address emailed to you. Default username is "${defaultUser}".`}
          </div>
        </div>

        {/* First commands to run */}
        <div className="space-y-1.5 text-xs">
          <div className="text-slate-300 font-semibold">
            {lang === 'hi' ? 'लॉग इन होते ही यह चलाएं:' : 'First command upon login:'}
          </div>
          <div className="p-2.5 bg-[#080B12] border border-slate-800 rounded font-mono text-slate-300 text-[11px]">
            sudo apt update && sudo apt upgrade -y
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded border border-slate-800 transition-colors"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
          <a
            href={provider.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors"
          >
            <span>{lang === 'hi' ? `${provider.name} वेबसाइट खोलें` : `Visit ${provider.name}`}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
