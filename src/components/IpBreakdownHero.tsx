import React, { useState } from 'react';
import { TARGET_IP_DATA, IpAnalysis } from '../data/vpsProviders';
import { Server, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2, Copy, Check, Info, Search } from 'lucide-react';

interface IpBreakdownHeroProps {
  lang: 'hi' | 'en';
  currency: 'INR' | 'USD';
  onSelectAlternative: () => void;
  onOpenSsh: (ip: string, user: string) => void;
}

export const IpBreakdownHero: React.FC<IpBreakdownHeroProps> = ({
  lang,
  currency,
  onSelectAlternative,
  onOpenSsh,
}) => {
  const [currentIp, setCurrentIp] = useState(TARGET_IP_DATA.ip);
  const [inputIp, setInputIp] = useState('');
  const [copied, setCopied] = useState(false);

  const ipData: IpAnalysis = currentIp === TARGET_IP_DATA.ip 
    ? TARGET_IP_DATA 
    : {
        ...TARGET_IP_DATA,
        ip: currentIp,
        city: 'Sydney / Cloud Datacenter',
        region: 'Cloud Network'
      };

  const handleCopyIp = () => {
    navigator.clipboard.writeText(ipData.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomIpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputIp.trim()) {
      setCurrentIp(inputIp.trim());
      setInputIp('');
    }
  };

  return (
    <section id="ip-analysis" className="py-8 sm:py-12 border-b border-slate-800/80 bg-gradient-to-b from-[#090D16] via-[#0D1424] to-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Kicker / Lead-in (Zero-pill text separator) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-3">
          <span className="text-blue-400 font-semibold">{lang === 'hi' ? 'IP रिपोर्ट & विश्लेषण' : 'IP Intelligence & Analysis'}</span>
          <span aria-hidden="true">·</span>
          <span>Amazon Web Services (AWS)</span>
          <span aria-hidden="true">·</span>
          <span>Ubuntu Linux Server</span>
          <span aria-hidden="true">·</span>
          <span>Sydney, Australia</span>
        </div>

        {/* Main Title & User Inquiry Response */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white" style={{ textWrap: 'balance' }}>
              {lang === 'hi' ? (
                <>
                  <span className="font-mono text-blue-400">{ipData.ip}</span> वाला Ubuntu VPS{' '}
                  <span className="text-emerald-400">सस्ते में कहाँ मिलता है?</span>
                </>
              ) : (
                <>
                  Where to get an Ubuntu VPS like{' '}
                  <span className="font-mono text-blue-400">{ipData.ip}</span> for cheap?
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'hi' ? (
                <>
                  यह IP <strong>Amazon AWS EC2 (Sydney, Australia)</strong> का सर्वर है, जिसका डिफॉल्ट यूजर{' '}
                  <code className="text-amber-300 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded text-xs">ubuntu</code> होता है।{' '}
                  AWS EC2 पर ऐसा 1GB सर्वर चलाने का बिल हर महीने <strong>₹1,500 से ₹2,500 ($18-$30/mo)</strong> तक आ सकता है क्योंकि AWS अब IPv4 एड्रेस ($3.65/mo) और डेटा ट्रांसफर का भी अलग पैसा लेता है!
                </>
              ) : (
                <>
                  This IP belongs to <strong>Amazon AWS EC2 (Sydney, Australia)</strong> with default user{' '}
                  <code className="text-amber-300 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded text-xs">ubuntu</code>.{' '}
                  Running this on AWS EC2 typically costs <strong>$18 to $30/month (₹1,500 - ₹2,500/mo)</strong> due to compute fees, outbound bandwidth, and the mandatory $3.65/mo IPv4 address surcharge.
                </>
              )}
            </p>

            {/* Quick Answer Banner */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{lang === 'hi' ? 'सीधा जवाब (Sasta VPS Kaha Milega?):' : 'Direct Answer & Best Alternatives:'}</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">1.</span>
                  <span>
                    <strong>Oracle Cloud Free Tier</strong>: बिल्कुल <span className="text-emerald-400 font-semibold">₹0 / फ्री</span> हमेशा के लिए (24GB RAM, 4 Cores, 200GB SSD)!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">2.</span>
                  <span>
                    <strong>RackNerd Promo Deal</strong>: मात्र <span className="text-emerald-400 font-semibold">₹99/महीना ($13.98/साल)</span> — PhonePe / UPI से पेमेंट, नो क्रेडिट कार्ड!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">3.</span>
                  <span>
                    <strong>Hetzner Cloud CX22</strong>: मात्र <span className="text-emerald-400 font-semibold">₹349/महीना (€3.79/mo)</span> — 4GB RAM + 2 vCPU, AWS से 4 गुना तेज!
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">4.</span>
                  <span>
                    <strong>AWS Lightsail</strong>: अगर AWS ही चाहिए तो <span className="text-emerald-400 font-semibold">₹295/महीना ($3.50/mo)</span> फिक्स बिल, पहले 3 महीने फ्री!
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onSelectAlternative}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-md transition-colors shadow-sm cursor-pointer"
              >
                <span>{lang === 'hi' ? 'सस्ते प्रोवाइडर्स की तुलना देखें' : 'Compare Cheap Providers'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenSsh(ipData.ip, ipData.defaultUser)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium rounded-md border border-slate-700/80 transition-colors cursor-pointer"
              >
                <span>{lang === 'hi' ? 'SSH लॉग इन कमांड' : 'SSH Login Helper'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live IP Dossier Card */}
          <div className="lg:col-span-5 bg-[#0C1220] border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  {lang === 'hi' ? 'IP सर्वर डिटेल्स' : 'IP Server Dossier'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-mono font-bold text-white tracking-tight">{ipData.ip}</span>
                  <button
                    onClick={handleCopyIp}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Copy IP"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{lang === 'hi' ? 'डिफॉल्ट यूजर' : 'Default User'}</span>
                <div className="text-sm font-mono text-amber-300 font-semibold">{ipData.defaultUser}</div>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">{lang === 'hi' ? 'क्लाउड प्रोवाइडर' : 'Cloud Provider'}</span>
                <span className="font-medium text-slate-200 text-right">{ipData.cloudProvider}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">{lang === 'hi' ? 'डेटा सेंटर लोकेशन' : 'Datacenter Location'}</span>
                <span className="font-medium text-slate-200 text-right">{ipData.city}, {ipData.country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">{lang === 'hi' ? 'AWS रीजन कोड' : 'AWS Region Code'}</span>
                <span className="font-mono text-slate-200 text-right">{ipData.region}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">{lang === 'hi' ? 'नेटवर्क ASN / ISP' : 'ASN Network'}</span>
                <span className="font-mono text-slate-300 text-right">{ipData.asn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">{lang === 'hi' ? 'अनुमानित AWS खर्च' : 'Estimated AWS Bill'}</span>
                <span className="font-mono font-bold text-rose-400 text-right tabular-nums">
                  {currency === 'INR' ? `₹${ipData.estimatedEc2Cost.monthlyInr}/mo` : `$${ipData.estimatedEc2Cost.monthlyUsd}/mo`}
                </span>
              </div>
            </div>

            {/* Why AWS is Expensive Breakdown */}
            <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-300 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span>{lang === 'hi' ? 'AWS EC2 इतना महंगा क्यों पड़ता है?' : 'Why AWS EC2 is so expensive:'}</span>
              </div>
              <ul className="text-slate-300 space-y-1 pl-4 list-disc text-[11px] leading-relaxed">
                <li>IPv4 Address Fee: <strong>$3.65/mo (~₹307)</strong> सिर्फ IP का लगता है।</li>
                <li>EBS Disk (30GB SSD): <strong>~$2.70/mo (~₹228)</strong> अलग से।</li>
                <li>Egress Bandwidth: <strong>$0.09/GB</strong> (दूसरे प्रोवाइडर्स 2,000GB फ्री देते हैं)।</li>
              </ul>
            </div>

            {/* Test another IP form */}
            <form onSubmit={handleCustomIpSubmit} className="pt-1">
              <label className="block text-[11px] text-slate-400 mb-1.5">
                {lang === 'hi' ? 'कोई दूसरा IP चेक करना चाहते हैं?' : 'Want to inspect another IP address?'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputIp}
                  onChange={(e) => setInputIp(e.target.value)}
                  placeholder="e.g. 13.235.12.98"
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 transition-colors"
                >
                  {lang === 'hi' ? 'जांचें' : 'Check'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
