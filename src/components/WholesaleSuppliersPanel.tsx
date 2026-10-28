import React, { useState } from 'react';
import { 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  ShoppingBag, 
  Key, 
  Tv, 
  Smartphone, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

export interface SupplierPanel {
  id: string;
  name: string;
  category: 'ott_software' | 'smm' | 'otp_virtual' | 'keys_giftcards' | 'cloud_vps';
  officialUrl: string;
  whatTheyProvide: string;
  whatTheyProvideHi: string;
  wholesalePrice: string;
  wholesalePriceHi: string;
  resaleProfitMargin: string;
  howItWorks: string;
  howItWorksHi: string;
  apiSupport: boolean;
  trustedRating: string;
}

export const WHOLESALE_SUPPLIERS: SupplierPanel[] = [
  {
    id: 'plati-market',
    name: 'Plati.Market / GGsel (Top Digital Accounts)',
    category: 'ott_software',
    officialUrl: 'https://plati.market/',
    whatTheyProvide: 'Canva Pro, Telegram Premium, Spotify, Discord Nitro, ChatGPT Plus, Steam, VPNs',
    whatTheyProvideHi: 'कैनवा प्रो, टेलीग्राम प्रीमियम, स्पॉटीफाई, डिस्कोर्ड नाइट्रो, चैटजीपीटी प्लस, वीपीएन',
    wholesalePrice: '₹30 - ₹120 per account',
    wholesalePriceHi: '₹30 से ₹120 प्रति अकाउंट',
    resaleProfitMargin: '300% - 500% Profit (₹299 me beche)',
    howItWorks: 'Direct marketplace of wholesale creators and distributors in CIS/Europe. Instant delivery via automated bot.',
    howItWorksHi: 'यहाँ दुनिया भर के होलसेलर ₹30-₹100 में कैनवा प्रो, टेलीग्राम प्रीमियम और ओटीटी अकाउंट्स बेचते हैं, जिन्हें आप ₹299 में बेच सकते हैं।',
    apiSupport: true,
    trustedRating: '4.8/5 (Global Marketplace)'
  },
  {
    id: 'sms-activate',
    name: 'SMS-Activate.org (OTP & Virtual Numbers)',
    category: 'otp_virtual',
    officialUrl: 'https://sms-activate.org/',
    whatTheyProvide: 'Virtual Numbers for Telegram, WhatsApp, Gmail, OpenAI, Netflix OTP Verification',
    whatTheyProvideHi: 'टेलीग्राम, व्हाट्सएप, जीमेल, चैटजीपीटी, नेटफ्लिक्स के लिए वर्चुअल नंबर और OTP',
    wholesalePrice: '₹5 - ₹18 per OTP number',
    wholesalePriceHi: '₹5 से ₹18 प्रति OTP',
    resaleProfitMargin: '400% Profit (Sell OTP for ₹40-₹60)',
    howItWorks: 'Provides real disposable mobile numbers from 150+ countries via API to create infinite fresh accounts.',
    howItWorksHi: 'अगर आपको नए फ्रेश अकाउंट्स (जैसे टेलीग्राम या जीमेल) खुद बनाकर बेचने हैं, तो यहाँ से ₹5-₹10 में विदेशी नंबरों पर OTP मिलता है।',
    apiSupport: true,
    trustedRating: '4.9/5 (10M+ Users)'
  },
  {
    id: 'codes-wholesale',
    name: 'CodesWholesale.com (B2B Digital Keys)',
    category: 'keys_giftcards',
    officialUrl: 'https://codeswholesale.com/',
    whatTheyProvide: 'Software Keys (Windows 11, Office 365, Antivirus), Steam, Xbox, PlayStation, Gift Cards',
    whatTheyProvideHi: 'विंडोज 11 कीज़, एमएस ऑफिस 365, एंटीवायरस, स्टीम, गूगल प्ले और गेम गिफ्ट कार्ड्स',
    wholesalePrice: '₹80 - ₹450 per license key',
    wholesalePriceHi: '₹80 से ₹450 प्रति लाइसेंस की',
    resaleProfitMargin: '200% - 400% Profit',
    howItWorks: 'Official EU B2B distributor with automated REST API that pushes digital codes directly into your store.',
    howItWorksHi: 'ऑफिशियल B2B डिस्ट्रीब्यूटर है। जब आपकी साइट पर कोई ऑर्डर आएगा, तो API अपने आप की (Key) खरीदकर ग्राहक को ईमेल कर देगी।',
    apiSupport: true,
    trustedRating: '4.7/5 (Licensed B2B)'
  },
  {
    id: 'jap-smm',
    name: 'JustAnotherPanel / SMMMain (Social Media)',
    category: 'smm',
    officialUrl: 'https://justanotherpanel.com/',
    whatTheyProvide: 'Instagram Followers, Likes, Telegram Channel Members, YouTube Subscribers, Views',
    whatTheyProvideHi: 'इंस्टाग्राम फॉलोअर्स, लाइक्स, टेलीग्राम चैनल मेंबर्स, यूट्यूब सब्सक्राइबर्स और व्यूज',
    wholesalePrice: '₹12 - ₹45 per 1,000 units',
    wholesalePriceHi: '₹12 से ₹45 प्रति 1,000 फॉलोअर्स/मेंबर्स',
    resaleProfitMargin: '500% - 1000% Profit (Sell for ₹199 - ₹499)',
    howItWorks: 'The world\'s largest wholesale SMM provider with native API v2 integration used by 95% of retail panels.',
    howItWorksHi: 'यह दुनिया का सबसे बड़ा होलसेल SMM प्रोवाइडर है जहाँ ₹15 में 1,000 फॉलोअर्स मिलते हैं जिसे लोग अपनी साइट पर ₹200-₹500 में बेचते हैं।',
    apiSupport: true,
    trustedRating: '4.6/5 (Wholesale SMM)'
  },
  {
    id: 'fazer-cards',
    name: 'FazerCards B2B (Subscriptions & Cards)',
    category: 'keys_giftcards',
    officialUrl: 'https://fazercards.com/',
    whatTheyProvide: 'Digital Subscriptions, OTT Gift Cards, Google Play / Apple Gift Cards, Game Top-ups',
    whatTheyProvideHi: 'डिजिटल सब्सक्रिप्शन, OTT गिफ्ट कार्ड्स, गूगल प्ले कार्ड्स, फ्री फायर डायमंड्स',
    wholesalePrice: 'Wholesale Distributor Rates (Discount 15% - 40%)',
    wholesalePriceHi: 'थोक डिस्ट्रीब्यूटर रेट्स (15% से 40% की छूट)',
    resaleProfitMargin: '30% - 60% Margin',
    howItWorks: 'B2B portal providing bulk catalog of gift cards and vouchers with instant API delivery.',
    howItWorksHi: 'थोक में गिफ्ट कार्ड्स और सब्सक्रिप्शन वाउचर्स खरीदने के लिए B2B रीसेलर पोर्टल।',
    apiSupport: true,
    trustedRating: '4.5/5'
  },
  {
    id: '5sim-net',
    name: '5SIM.net (Cheap Virtual SMS)',
    category: 'otp_virtual',
    officialUrl: 'https://5sim.net/',
    whatTheyProvide: 'Temporary Phone Numbers for bulk account creations (Telegram, WhatsApp, Discord)',
    whatTheyProvideHi: 'थोक में नए अकाउंट्स बनाने के लिए 100+ देशों के वर्चुअल मोबाइल नंबर',
    wholesalePrice: '₹4 - ₹15 per verification',
    wholesalePriceHi: '₹4 से ₹15 प्रति नंबर',
    resaleProfitMargin: 'High',
    howItWorks: 'Automated SMS receive platform supporting all major protocols and payment methods (Crypto, UPI, Cards).',
    howItWorksHi: 'सस्ते विदेशी नंबरों पर OTP पाने का दूसरा सबसे लोकप्रिय प्लेटफार्म।',
    apiSupport: true,
    trustedRating: '4.8/5'
  },
  {
    id: 'smshub-org',
    name: 'SMSHUB.org (Sabse Sasta TG Numbers)',
    category: 'otp_virtual',
    officialUrl: 'https://smshub.org/',
    whatTheyProvide: 'Cheapest Telegram, WhatsApp, Gmail, Discord, Twitter OTP numbers starting ₹6',
    whatTheyProvideHi: 'दुनिया का सबसे सस्ता टेलीग्राम OTP पोर्टल (सिर्फ ₹6 से ₹10 में नया अकाउंट)',
    wholesalePrice: '₹6 - ₹12 per Telegram OTP',
    wholesalePriceHi: '₹6 से ₹12 प्रति टेलीग्राम नंबर',
    resaleProfitMargin: '500% Profit (Sell account for ₹50 - ₹100)',
    howItWorks: 'Direct wholesale SMS gateway with instant API and UPI deposit support through Indian payment gateways.',
    howItWorksHi: 'यहाँ इंडोनेशिया, वियतनाम, और रूस के नंबर सिर्फ ₹6-₹8 में मिलते हैं। डायरेक्ट UPI से बैलेंस ऐड हो जाता है।',
    apiSupport: true,
    trustedRating: '4.9/5 (Cheapest Worldwide)'
  },
  {
    id: 'indian-otp',
    name: 'IndianOTP / RapidOTP (Direct UPI QR)',
    category: 'otp_virtual',
    officialUrl: 'https://indianotp.com/',
    whatTheyProvide: '100% Indian Direct PhonePe / Paytm / GPay QR Payment, Instant OTP within 5 seconds',
    whatTheyProvideHi: '100% भारतीय UPI QR (PhonePe, Paytm, GPay) से बैलेंस लोड, 5 सेकंड में नया टेलीग्राम OTP',
    wholesalePrice: '₹10 - ₹18 per Telegram account',
    wholesalePriceHi: '₹10 से ₹18 प्रति टेलीग्राम नंबर',
    resaleProfitMargin: '300% - 400% Profit',
    howItWorks: 'Dedicated Indian OTP service tailored for Telegram and WhatsApp resellers with zero VPN needed.',
    howItWorksHi: 'बिना किसी VPN के सीधा भारतीय UPI QR से ₹50-₹100 ऐड करें और तुरंत फ्रेश टेलीग्राम नंबर लें।',
    apiSupport: true,
    trustedRating: '4.8/5 (Instant UPI)'
  },
  {
    id: 'grizzly-sms',
    name: 'Grizzly SMS (GrizzlySms.com)',
    category: 'otp_virtual',
    officialUrl: 'https://grizzlysms.com/',
    whatTheyProvide: 'Instant Virtual SMS numbers for Telegram, WhatsApp, OpenAI, Gmail & Instagram OTP',
    whatTheyProvideHi: 'टेलीग्राम, व्हाट्सएप, जीमेल, चैटजीपीटी के लिए तुरंत वर्चुअल नंबर और OTP प्राप्त करें',
    wholesalePrice: '₹6 - ₹20 per OTP',
    wholesalePriceHi: '₹6 से ₹20 प्रति OTP',
    resaleProfitMargin: '300% - 400% Profit',
    howItWorks: 'Global virtual number provider with automated API. Works best with 1.1.1.1 WARP or Proton VPN.',
    howItWorksHi: 'दुनिया भर के 100+ देशों के नंबरों पर OTP प्राप्त करने का लोकप्रिय पैनल। इसे खोलने के लिए 1.1.1.1 WARP या Proton VPN का उपयोग करें।',
    apiSupport: true,
    trustedRating: '4.7/5'
  }
];

interface WholesaleSuppliersPanelProps {
  lang: 'hi' | 'en';
}

export const WholesaleSuppliersPanel: React.FC<WholesaleSuppliersPanelProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelHi: 'सभी होलसेल पैनल्स', labelEn: 'All Wholesale Panels' },
    { id: 'ott_software', labelHi: 'Canva / Telegram / OTT', labelEn: 'Accounts & Subscriptions' },
    { id: 'otp_virtual', labelHi: 'OTP & वर्चुअल नंबर', labelEn: 'OTP & Numbers' },
    { id: 'keys_giftcards', labelHi: 'डिजिटल कीज़ & वाउचर्स', labelEn: 'Keys & Gift Cards' },
    { id: 'smm', labelHi: 'SMM फॉलोअर्स & मेंबर्स', labelEn: 'SMM Services' },
  ];

  const filteredSuppliers = WHOLESALE_SUPPLIERS.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section id="suppliers-guide" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono">
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सीक्रेट होलसेल सप्लायर पैनल्स की लिस्ट' : 'Secret Wholesale Supplier Panels Directory'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Direct Sourcing Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'hi' ? 'सारे अकाउंट्स कहाँ से आते हैं? (Wholesale Panels)' : 'Where Do Accounts Come From? (Wholesale Panels)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'hi'
              ? 'इंटरनेट पर जो लोग सस्ते में Canva Pro, Telegram Premium, OTT, या SMM बेचते हैं, वे इन्हीं होलसेल पैनल्स से ₹10-₹80 में माल लेते हैं और अपनी वेबसाइट पर ₹200-₹500 में बेचते हैं।'
              : 'The exact B2B wholesale API panels and supplier sources used by digital resellers worldwide to buy accounts for ₹10-₹80 and sell for ₹299+.'}
          </p>
        </div>

        {/* SINGLE MASTER ALL-IN-ONE PANEL SPOTLIGHT (Solution for 1-Wallet Requirement) */}
        <div className="relative overflow-hidden p-6 sm:p-7 bg-gradient-to-br from-[#0e172a] via-[#0f172a] to-[#131b2e] border-2 border-emerald-500/50 rounded-2xl shadow-xl space-y-5">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/20 to-transparent w-72 h-full pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {lang === 'hi' ? '★ 1 ही पैनल में सब कुछ (Single Wallet UPI)' : '★ ALL-IN-ONE MASTER PANEL (SINGLE WALLET)'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  IndianProvider.com / SMMWiz (Master Reseller Panel)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-lg">
                {lang === 'hi' ? '✓ डायरेक्ट PhonePe / Paytm UPI से पेमेंट' : '✓ Direct Indian UPI Payments'}
              </span>
              <span className="px-2.5 py-1 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold rounded-lg">
                1 Wallet = 100+ Services
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#080D1A]/90 border border-emerald-900/40 rounded-xl space-y-2">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'अलग-अलग जगह पैसा नहीं रखना पड़ेगा' : 'Single Wallet Balance'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'आपको 5 अलग-अलग वेबसाइटों में पैसा अटकाने की बिल्कुल जरूरत नहीं है। इस 1 ही पैनल में आप Paytm या PhonePe QR स्कैन करके ₹500 ऐड कर सकते हैं।'
                  : 'No need to lock funds in multiple foreign sites. Top up just once with ₹500 via Indian UPI QR, and use it across all services.'}
              </p>
            </div>

            <div className="p-4 bg-[#080D1A]/90 border border-emerald-900/40 rounded-xl space-y-2">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'सारे डिजिटल प्रोडक्ट्स एक ही ड्रॉपडाउन में' : 'Everything in 1 Dropdown'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'Canva Pro (₹35), Telegram Premium (₹120), Netflix Screen (₹60), Amazon Prime, YouTube Premium, ChatGPT, और Instagram फॉलोअर्स सब एक ही जगह।'
                  : 'Canva Pro, Telegram Premium, Netflix screens, Prime, YouTube Premium, ChatGPT Plus & SMM followers all under one catalog.'}
              </p>
            </div>

            <div className="p-4 bg-[#080D1A]/90 border border-emerald-900/40 rounded-xl space-y-2">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'ऑटोमैटिक API v2 सपोर्ट' : 'Automated API v2 Support'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'आपको सिर्फ 1 API Key मिलती है। जब भी आपकी वेबसाइट पर ग्राहक QR से पेमेंट करेगा, यह पैनल खुद ब खुद डिलीवरी कर देगा।'
                  : 'Provides a single standardized REST API v2 key. Connect it once to automate instant order fulfillment on your site.'}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-emerald-400 font-bold">Official Portal:</span>
              <span className="text-white font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">https://indianprovider.com</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleCopy('https://indianprovider.com')}
                className="flex-1 sm:flex-initial py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedUrl === 'https://indianprovider.com' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl === 'https://indianprovider.com' ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <a
                href="https://indianprovider.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <span>{lang === 'hi' ? 'IndianProvider पैनल खोलें' : 'Open IndianProvider'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* TELEGRAM STARS SPECIAL GUIDE (Cheapest TG Stars via UPI) */}
        <div className="p-6 bg-gradient-to-br from-[#0c1427] to-[#111c38] border-2 border-amber-500/50 rounded-2xl shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">⭐</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {lang === 'hi' ? 'सस्ते टेलीग्राम स्टार्स (Telegram Stars Guide)' : 'Cheapest Telegram Stars (Wholesale UPI)'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {lang === 'hi' ? 'Telegram Stars सबसे सस्ते UPI से कहाँ मिलेंगे?' : 'Where to Buy TG Stars Cheapest via UPI?'}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold rounded-lg">
              {lang === 'hi' ? 'Play Store से 50% सस्ता' : '50% Cheaper than Play Store'}
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            {lang === 'hi' ? (
              <p>
                अगर आप टेलीग्राम ऐप (Play Store / App Store) से स्टार्स खरीदते हैं तो 30% टैक्स की वजह से 1 स्टार <strong className="text-rose-400">₹2.00 से ₹2.10</strong> का पड़ता है। लेकिन इन 2 तरीकों से आप UPI देकर <strong className="text-emerald-400">₹1.15 से ₹1.25</strong> में स्टार्स ले सकते हैं:
              </p>
            ) : (
              <p>
                Official Play Store charges a 30% fee, making 1 Star cost <strong className="text-rose-400">₹2.00+</strong>. With the wholesale channels below, you can buy Telegram Stars via direct Indian UPI for <strong className="text-emerald-400">₹1.15 - ₹1.25</strong> per Star.
              </p>
            )}
          </div>

          {/* Rate comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 bg-[#080D18] border border-rose-900/40 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">1. Telegram App (Play Store)</span>
              <div className="text-rose-300 text-base font-extrabold font-mono">₹2.00 - ₹2.10 / Star</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {lang === 'hi' ? 'बहुत महंगा! गूगल/एप्पल 30% कमीशन काट लेता है।' : 'Expensive due to 30% app store cut.'}
              </p>
            </div>

            <div className="p-3.5 bg-[#080D18] border border-emerald-500/40 rounded-xl space-y-1.5 shadow-sm shadow-emerald-500/10">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">2. Indian Master Panels (UPI)</span>
              <div className="text-emerald-300 text-base font-extrabold font-mono">₹1.20 - ₹1.30 / Star</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi' ? 'IndianProvider / SMMWiz पर PhonePe/Paytm QR से ₹500 ऐड करें। सिर्फ यूजरनेम डालो और स्टार्स तुरंत अकाउंट में!' : 'Direct PhonePe/Paytm UPI QR. Enter TG username and stars are transferred instantly.'}
              </p>
            </div>

            <div className="p-3.5 bg-[#080D18] border border-cyan-500/40 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">3. Fragment.com (Official Base)</span>
              <div className="text-cyan-300 text-base font-extrabold font-mono">₹1.12 - ₹1.18 / Star</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi' ? 'टेलीग्राम का ऑफिशियल ब्लॉकचेन पोर्टल (TON कॉइन से)। @Wallet P2P में UPI देकर TON खरीदकर सीधे Fragment से लें।' : 'Official Telegram Fragment platform. Buy TON via Telegram Wallet P2P with UPI and pay directly.'}
              </p>
            </div>
          </div>

          {/* Live Star Calculator & Direct Steps */}
          <div className="p-4 bg-[#080D1A] border border-amber-500/30 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-white text-xs font-mono uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                {lang === 'hi' ? '⭐ लाइव स्टार्स रेट & प्रॉफिट कैलकुलेटर (UPI Rates)' : '⭐ Live Stars Rate & Profit Calculator (UPI)'}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                {lang === 'hi' ? 'होलसेल रेट: ~₹1.20 / Star | Play Store: ₹2.10 / Star' : 'Wholesale: ~₹1.20 / Star | Play Store: ₹2.10 / Star'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { stars: 50, playstore: 105, wholesale: 60, profit: 45 },
                { stars: 100, playstore: 210, wholesale: 120, profit: 90 },
                { stars: 250, playstore: 525, wholesale: 300, profit: 225 },
                { stars: 500, playstore: 1050, wholesale: 600, profit: 450 },
                { stars: 1000, playstore: 2100, wholesale: 1200, profit: 900 },
              ].map((tier) => (
                <div key={tier.stars} className="p-2.5 bg-[#0D1424] border border-slate-800 rounded-lg text-center space-y-1">
                  <div className="text-amber-400 font-extrabold text-sm font-mono">{tier.stars} Stars</div>
                  <div className="text-[10px] text-slate-400">PlayStore: <span className="line-through text-rose-400 font-mono">₹{tier.playstore}</span></div>
                  <div className="text-[11px] text-emerald-400 font-bold font-mono">UPI Rate: ₹{tier.wholesale}</div>
                  <div className="text-[9px] text-amber-300 font-mono bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/30">
                    बचत: ₹{tier.profit}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Step Guide */}
            <div className="p-3 bg-[#060911] border border-slate-800/80 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[11px] font-mono font-bold">#1 Cheapest UPI:</span>
                <span className="text-slate-200 text-xs">
                  {lang === 'hi'
                    ? 'IndianProvider.com खोलें > "Add Funds" में Paytm/PhonePe QR से ₹100-₹500 डालें > "Telegram Stars" सेलेक्ट करके @username डालें!'
                    : 'Open IndianProvider.com > Add Funds with Paytm/PhonePe QR > Select Telegram Stars > Enter @username & receive instantly!'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://indianprovider.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded flex items-center gap-1 shadow-sm font-mono"
                >
                  <span>{lang === 'hi' ? 'UPI से स्टार्स लें' : 'Buy Stars via UPI'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://fragment.com/stars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-mono text-xs flex items-center gap-1 whitespace-nowrap px-2 py-1.5 bg-slate-900 border border-slate-800 rounded"
                >
                  <span>Fragment.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GRIZZLY SMS & OTP PANELS VPN UNBLOCK GUIDE */}
        <div className="p-6 bg-gradient-to-br from-[#0e172a] via-[#101b33] to-[#0d1527] border-2 border-indigo-500/50 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  {lang === 'hi' ? 'Grizzly SMS लॉगिन & VPN गाइड' : 'Grizzly SMS Login & Free VPN Guide'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {lang === 'hi' ? 'GrizzlySms.com लॉगिन नहीं हो रहा? (Best 100% Free VPNs)' : 'Grizzly SMS Login Blocked? (Best 100% Free VPNs)'}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold rounded-lg">
              {lang === 'hi' ? 'बिना पैसे दिए (No Premium Popups)' : '100% Free - No Premium Popups'}
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              {lang === 'hi' ? (
                <>
                  प्ले स्टोर पर जो आम VPN (Turbo, SuperVPN, Thunder) होते हैं, वे बार-बार <strong className="text-rose-400">"Upgrade to Premium"</strong> का पॉपअप दिखाते हैं और उनका सर्वर GrizzlySMS के क्लाउडफ्लेयर द्वारा ब्लॉक हो जाता है। 
                  GrizzlySms.com पर बिना किसी रुकावट के लॉगिन करने के लिए ये <strong>3 बिल्कुल मुफ़्त (100% Free) टूल्स</strong> इस्तेमाल करें:
                </>
              ) : (
                <>
                  Generic free VPNs push annoying "Upgrade to Premium" paywalls and get blocked by Cloudflare on GrizzlySms.com. 
                  Use these <strong>3 verified 100% free VPN solutions</strong> that never ask for payment:
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            {/* 1.1.1.1 WARP */}
            <div className="p-4 bg-[#080D18] border border-indigo-500/30 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm font-mono">1. Cloudflare 1.1.1.1 (WARP)</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-800">
                  {lang === 'hi' ? 'सबसे बेस्ट' : 'Top Pick'}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'यह कोई साधारण VPN नहीं बल्कि Cloudflare का ऑफिशियल टूल है। इसमें 0 विज्ञापन और 0 प्रीमियम झंझट है। 1 क्लिक में ऑन करो, Grizzly SMS तुरंत खुल जाएगा।'
                  : 'Official Cloudflare secure tunnel. Zero ads, zero paywalls. 1-tap connect instantly unblocks GrizzlySMS without bot flags.'}
              </p>
              <div className="text-[10px] text-indigo-400 font-mono">Play Store: "1.1.1.1: Faster Internet"</div>
            </div>

            {/* Proton VPN Free */}
            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm font-mono">2. Proton VPN (Free Tier)</span>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 font-mono px-1.5 py-0.5 rounded border border-indigo-800">
                  Unlimited Free
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'स्विट्जरलैंड का सबसे सुरक्षित VPN। इसका फ्री प्लान अनलिमिटेड है और कभी पैसे नहीं मांगता। नीदरलैंड्स (Netherlands) या USA सर्वर चुनें, लॉगिन हो जाएगा।'
                  : 'Swiss privacy VPN with unlimited free data and no speed cap. Connect to Netherlands/USA server to login smoothly.'}
              </p>
              <div className="text-[10px] text-indigo-400 font-mono">Play Store: "Proton VPN"</div>
            </div>

            {/* Opera Browser Built-in VPN */}
            <div className="p-4 bg-[#080D18] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm font-mono">3. Opera Browser (In-Built)</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-1.5 py-0.5 rounded">
                  No App Needed
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'hi'
                  ? 'अगर अलग से कोई VPN ऐप डाउनलोड नहीं करना, तो Opera Browser डाउनलोड करें। सेटिंग्स में जाकर "Free VPN" चालू करें और grizzlysms.com खोलें।'
                  : 'No separate VPN install needed. Install Opera browser on mobile/PC, toggle Free VPN in settings, and open GrizzlySMS directly.'}
              </p>
              <div className="text-[10px] text-indigo-400 font-mono">Setting: Opera Browser → VPN ON</div>
            </div>
          </div>

          <div className="p-3 bg-[#080D1A] border border-slate-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-300 text-xs">
              {lang === 'hi' 
                ? '💡 टिप: 1.1.1.1 WARP ऑन करने के बाद Chrome में Incognito/Private Tab में GrizzlySms.com खोलें, लॉगिन एरर हमेशा के लिए हट जाएगा।'
                : '💡 Tip: After enabling 1.1.1.1 WARP, open GrizzlySMS in Incognito/Private mode to clear cached cookies.'}
            </span>
            <a
              href="https://grizzlysms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded flex items-center gap-1 font-mono whitespace-nowrap"
            >
              <span>GrizzlySms.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* TELEGRAM SAFE OTP & CHEAP VIRTUAL ACCOUNTS HUB (UPI DIRECT) */}
        <div className="p-6 bg-gradient-to-br from-[#091528] via-[#0c1c38] to-[#12264c] border-2 border-cyan-500/50 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {lang === 'hi' ? 'टेलीग्राम वर्चुअल नंबर & फ्रेश अकाउंट गाइड' : 'TELEGRAM VIRTUAL NUMBERS & OTP GUIDE'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {lang === 'hi' ? 'सस्ते Telegram Accounts कहाँ से बनाएं? (Direct UPI + 100% Safe)' : 'Cheapest Telegram OTP Panels via Direct UPI'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold rounded-lg">
                ₹6 - ₹12 Per Account
              </span>
              <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-lg">
                Direct UPI QR
              </span>
            </div>
          </div>

          {/* Top 3 Panels with Direct UPI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Panel 1: SMSHUB.org */}
            <div className="p-4 bg-[#060e1d] border border-cyan-500/30 rounded-xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">1. SMSHUB.org</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">
                    दुनिया में सबसे सस्ता
                  </span>
                </div>
                <div className="text-emerald-400 font-mono font-extrabold text-base">₹6 - ₹10 / Telegram OTP</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'hi' 
                    ? 'यहाँ इंडोनेशिया (+62), वियतनाम (+84) और अफ्रीका के नंबर ₹6-₹8 में मिल जाते हैं। UPI से पेमेंट ऐड करने का ऑप्शन उपलब्ध है।'
                    : 'The cheapest global SMS hub. Indonesia (+62) & Vietnam (+84) numbers available from ₹6-₹8.'}
                </p>
                <div className="text-[10px] text-cyan-400 font-mono bg-[#030812] p-2 rounded">
                  ✓ UPI & Crypto Support<br />
                  ✓ 20 मिनट तक OTP वेटिंग टाइम<br />
                  ✓ अगर OTP न आए तो 0 पैसा कटता है
                </div>
              </div>
              <a
                href="https://smshub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 shadow-sm transition-colors"
              >
                <span>SMSHUB.org खोलें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Panel 2: IndianOTP.com */}
            <div className="p-4 bg-[#060e1d] border border-emerald-500/30 rounded-xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">2. IndianOTP / RapidOTP</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
                    Direct PhonePe/Paytm QR
                  </span>
                </div>
                <div className="text-emerald-400 font-mono font-extrabold text-base">₹10 - ₹16 / Telegram OTP</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'hi'
                    ? '100% भारतीय पैनल। किसी विदेशी गेटवे या VPN की जरूरत नहीं। PhonePe/Paytm QR स्कैन करके ₹50-₹100 डालें और 5 सेकंड में नया नंबर पाएं।'
                    : '100% Indian panel with direct Paytm/PhonePe QR code deposit. Instant Telegram numbers with zero VPN required.'}
                </p>
                <div className="text-[10px] text-emerald-400 font-mono bg-[#030812] p-2 rounded">
                  ✓ 100% Indian UPI QR<br />
                  ✓ Instant Automatic Deposit<br />
                  ✓ Fresh non-recycled numbers
                </div>
              </div>
              <a
                href="https://indianotp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 shadow-sm transition-colors"
              >
                <span>IndianOTP.com खोलें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Panel 3: 5SIM.net */}
            <div className="p-4 bg-[#060e1d] border border-slate-700 rounded-xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">3. 5SIM.net</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded border border-purple-800">
                    हाई-क्वालिटी सर्वर
                  </span>
                </div>
                <div className="text-emerald-400 font-mono font-extrabold text-base">₹8 - ₹14 / Telegram OTP</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {lang === 'hi'
                    ? 'दुनिया का सबसे भरोसेमंद प्लेटफॉर्म। 150+ देशों के नंबर उपलब्ध हैं। भारतीय UPI से पेमेंट लोड करने का आसान विकल्प मिलता है।'
                    : 'Ultra-reliable global platform. Over 150 countries available with instant SMS delivery and Indian UPI gateway.'}
                </p>
                <div className="text-[10px] text-purple-400 font-mono bg-[#030812] p-2 rounded">
                  ✓ 150+ देशों के ऑपरेटर<br />
                  ✓ कलेक्टिबल और VIP नंबर्स<br />
                  ✓ हाई सक्सेस रेट
                </div>
              </div>
              <a
                href="https://5sim.net"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 shadow-sm transition-colors"
              >
                <span>5SIM.net खोलें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Account Safety Protocol (How to keep it safe from bans) */}
          <div className="p-4 bg-[#050b17] border border-amber-500/40 rounded-xl space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'अकाउंट को 100% सुरक्षित (Safe) रखने के 4 नियम (ताकि कभी बैन न हो):' : '4 Golden Rules to Keep New Telegram Accounts 100% Safe:'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-300 text-[11px]">
              <div className="p-2.5 bg-[#081224] rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-mono text-xs">1. तुरंत 2FA पासवर्ड लगाएं:</strong>
                <p className="text-slate-400 leading-relaxed">
                  अकाउंट बनते ही <code>Settings ➔ Privacy ➔ Two-Step Verification</code> में पासवर्ड सेट करें। इससे कोई दूसरा व्यक्ति आपका अकाउंट कभी नहीं ले पाएगा।
                </p>
              </div>

              <div className="p-2.5 bg-[#081224] rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-mono text-xs">2. फ्लाइट मोड ट्रिक (IP चेंज):</strong>
                <p className="text-slate-400 leading-relaxed">
                  हर 1 या 2 अकाउंट बनाने के बाद फोन का Airplane/Flight Mode 5 सेकंड के लिए On/Off करें ताकि आपका मोबाइल IP नया हो जाए।
                </p>
              </div>

              <div className="p-2.5 bg-[#081224] rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-mono text-xs">3. सबसे सुरक्षित देश चुनें:</strong>
                <p className="text-slate-400 leading-relaxed">
                  इंडोनेशिया (<strong>+62</strong>), वियतनाम (<strong>+84</strong>), या कज़ाकिस्तान (<strong>+77</strong>) के नंबर सबसे कम बैन होते हैं और सबसे सस्ते हैं।
                </p>
              </div>

              <div className="p-2.5 bg-[#081224] rounded-lg border border-slate-800 space-y-1">
                <strong className="text-white block font-mono text-xs">4. 24 घंटे का वार्म-अप:</strong>
                <p className="text-slate-400 leading-relaxed">
                  नया अकाउंट बनते ही तुरंत 100 ग्रुप्स में मैसेज या मेंबर्स ऐड न करें। 24 घंटे अकाउंट को नॉर्मल रहने दें, फिर इस्तेमाल करें।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Secrets Revealed Box */}
        <div className="p-5 bg-[#0D1424] border border-amber-900/40 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'hi' ? 'होलसेल अकाउंट्स 4 तरीकों से आते हैं:' : '4 Ways Resellers Source Accounts:'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3 bg-[#080D18] border border-slate-800 rounded-lg space-y-1">
              <strong className="text-white block font-mono">1. B2B होलसेल मार्केटप्लेस (Plati / GGsel):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                यहाँ रूस और यूरोप के होलसेलर्स ₹30-₹70 में Canva Pro, Telegram Premium, और Spotify के अकाउंट्स थोक में बेचते हैं।
              </p>
            </div>

            <div className="p-3 bg-[#080D18] border border-slate-800 rounded-lg space-y-1">
              <strong className="text-white block font-mono">2. वर्चुअल नंबर & OTP पैनल्स (SMS-Activate / 5SIM):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                यहाँ ₹5-₹12 में विदेशी नंबर पर OTP मिलता है जिससे फ्रेश Telegram, WhatsApp, या ChatGPT अकाउंट्स बनाकर रीसेल किए जाते हैं।
              </p>
            </div>

            <div className="p-3 bg-[#080D18] border border-slate-800 rounded-lg space-y-1">
              <strong className="text-white block font-mono">3. रीजनल करेंसी आर्बिट्राज (Regional Pricing):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                तुर्की (Turkey), नाइजीरिया, या मिस्र में नेटफ्लिक्स/स्पॉटीफाई ₹50-₹80/माह में मिलता है। लोग वहाँ का अकाउंट बनाकर भारत में ₹250 में बेचते हैं।
              </p>
            </div>

            <div className="p-3 bg-[#080D18] border border-slate-800 rounded-lg space-y-1">
              <strong className="text-white block font-mono">4. SMM होलसेल प्रोवाइडर API (JAP / Peakerr):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                यहाँ ₹15-₹30 में 1,000 इंस्टाग्राम फॉलोअर्स या टेलीग्राम मेंबर्स मिलते हैं, जिन्हें रीसेलर अपनी साइट पर ₹200-₹400 में बेचते हैं।
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-[#0D1424] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {lang === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-[#0D1424] border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-colors space-y-4"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white text-sm">{supplier.name}</span>
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-950/50 border border-amber-800/40 px-1.5 py-0.5 rounded">
                    {supplier.apiSupport ? '✓ API Enabled' : 'Bulk Portal'}
                  </span>
                </div>

                {/* What they provide */}
                <div className="text-xs space-y-1">
                  <span className="text-slate-400 text-[11px]">{lang === 'hi' ? 'क्या सर्विस मिलती है:' : 'Services Available:'}</span>
                  <div className="font-medium text-slate-200 text-xs">
                    {lang === 'hi' ? supplier.whatTheyProvideHi : supplier.whatTheyProvide}
                  </div>
                </div>

                {/* Pricing & Margin Box */}
                <div className="p-3 bg-[#080D18] border border-slate-800 rounded-lg space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'hi' ? 'होलसेल रेट:' : 'Wholesale Cost:'}</span>
                    <span className="text-emerald-400 font-bold">{lang === 'hi' ? supplier.wholesalePriceHi : supplier.wholesalePrice}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1 text-[11px]">
                    <span className="text-slate-400">{lang === 'hi' ? 'आपका प्रॉफिट मार्जिन:' : 'Your Margin:'}</span>
                    <span className="text-amber-400 font-bold">{supplier.resaleProfitMargin}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {lang === 'hi' ? supplier.howItWorksHi : supplier.howItWorks}
                </p>

                {/* URL Display */}
                <div className="p-2 bg-[#070B14] border border-slate-800 rounded flex items-center justify-between font-mono text-[11px] text-cyan-400">
                  <span className="truncate">{supplier.officialUrl}</span>
                  <button
                    onClick={() => handleCopy(supplier.officialUrl)}
                    className="text-slate-400 hover:text-white p-1 ml-1"
                    title="Copy URL"
                  >
                    {copiedUrl === supplier.officialUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={supplier.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  <span>{lang === 'hi' ? 'होलसेल पैनल खोलें' : 'Visit Supplier Panel'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
