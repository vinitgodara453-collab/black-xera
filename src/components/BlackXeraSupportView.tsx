import React from 'react';
import { Headphones, Send, MessageCircle, ShieldCheck, HelpCircle, ExternalLink, Mail } from 'lucide-react';
import { AdminSettings } from '../types/blackxera';

interface BlackXeraSupportViewProps {
  adminSettings: AdminSettings;
}

export const BlackXeraSupportView: React.FC<BlackXeraSupportViewProps> = ({ adminSettings }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-lg font-bold text-white">Help & Customer Support</h2>
        <p className="text-xs text-slate-400">24/7 dedicated support for orders, recharges & accounts</p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Telegram Direct Support */}
        <a
          href={adminSettings.supportTelegram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-gradient-to-br from-[#0c182b] to-[#112445] border border-blue-500/40 rounded-2xl hover:border-blue-400 transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Send className="w-6 h-6 translate-x-[-1px] translate-y-[1px]" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                Telegram Support
              </h3>
              <ExternalLink className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Direct chat with owner for instant UTR approval, replacement & queries.
            </p>
          </div>
          <span className="inline-block text-[11px] font-mono text-cyan-400 font-bold">
            Chat {adminSettings.supportTelegram ? adminSettings.supportTelegram.replace(/https?:\/\/t\.me\//, '@') : '@SHIVAMH4REEE'} ➔
          </span>
        </a>

        {/* Official Updates Channel */}
        <a
          href={adminSettings.channelLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-gradient-to-br from-[#121324] to-[#1c1d38] border border-purple-500/40 rounded-2xl hover:border-purple-400 transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                Official Channel
              </h3>
              <ExternalLink className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Stock replenishment announcements, daily discount coupons & server updates.
            </p>
          </div>
          <span className="inline-block text-[11px] font-mono text-purple-300 font-bold">
            Join Telegram Channel ➔
          </span>
        </a>

      </div>

      {/* Frequently Asked Questions */}
      <div className="p-5 bg-[#0D121D] border border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          <span>अक्सर पूछे जाने वाले सवाल (FAQ)</span>
        </h4>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-3 bg-[#070A12] rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-white block">Q: वॉलेट में पैसा कितनी देर में ऐड होता है?</strong>
            <p className="text-slate-400 leading-relaxed">
              UPI से पेमेंट करने के बाद 12 अंकों का UTR नंबर डालते ही 1 से 3 मिनट के अंदर बैलेंस आपके वॉलेट में ऑटो-क्रेडिट हो जाता है।
            </p>
          </div>

          <div className="p-3 bg-[#070A12] rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-white block">Q: टेलीग्राम अकाउंट किस फॉर्मेट में मिलता है?</strong>
            <p className="text-slate-400 leading-relaxed">
              TData और Session+JSON दोनों फॉर्मेट्स में। फाइल को डाउनलोड करके 1-क्लिक में Telegram Desktop में लॉगिन कर सकते हैं। 2FA पासवर्ड भी साथ में दिया जाता है।
            </p>
          </div>

          <div className="p-3 bg-[#070A12] rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-white block">Q: अगर किसी नंबर पर OTP नहीं आया तो क्या होगा?</strong>
            <p className="text-slate-400 leading-relaxed">
              अगर 15 मिनट के अंदर OTP नहीं आता, तो आपके पैसे तुरंत आपके वॉलेट में वापस आ जाते हैं। ₹0 का नुकसान होता है।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
