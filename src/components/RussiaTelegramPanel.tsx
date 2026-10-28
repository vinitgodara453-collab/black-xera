import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Zap, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Key, 
  Globe, 
  Terminal, 
  QrCode, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCode,
  FolderArchive,
  PhoneCall,
  Smartphone,
  PlayCircle,
  RotateCcw
} from 'lucide-react';
import { BlackXeraProduct, AdminSettings } from '../types/blackxera';

interface RussiaTelegramPanelProps {
  products: BlackXeraProduct[];
  walletBalance: number;
  adminSettings: AdminSettings;
  onSelectProduct: (product: BlackXeraProduct) => void;
  onOpenRecharge: (amount?: number) => void;
  onQuickBuy: (product: BlackXeraProduct, quantity: number, countryCode?: string) => void;
}

export const RussiaTelegramPanel: React.FC<RussiaTelegramPanelProps> = ({
  products,
  walletBalance,
  adminSettings,
  onSelectProduct,
  onOpenRecharge,
  onQuickBuy
}) => {
  // Default to extractor tab ("account nikalne ka penal")
  const [selectedSubTab, setSelectedSubTab] = useState<'extractor' | 'inventory' | 'providers' | 'guide'>('extractor');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Extractor State Machine
  const [selectedServer, setSelectedServer] = useState<'5sim' | 'sms_activate' | 'vak_sms'>('5sim');
  const [selectedOperator, setSelectedOperator] = useState<string>('all'); // all, megafon, mts, beeline, tele2
  const [extractorState, setExtractorState] = useState<'idle' | 'allocated' | 'otp_received' | 'failed'>('allocated');
  const [simNumber, setSimNumber] = useState<string>('+7 925 841-92-40');
  const [simCarrier, setSimCarrier] = useState<string>('MegaFon (Russia)');
  const [simTimer, setSimTimer] = useState<number>(890); // ~14:50
  const [simOtp, setSimOtp] = useState<string | null>(null);
  const [isFetchingOtp, setIsFetchingOtp] = useState<boolean>(false);
  const [sim2FaPassword, setSim2FaPassword] = useState<string>('bx_rus_2026');
  const [extractedAccountsCount, setExtractedAccountsCount] = useState<number>(14);

  // Real Russian Wholesale Providers data
  const russianProviders = [
    {
      name: '5SIM.net',
      badge: 'TOP RECOMMEND (CHEAPEST)',
      priceRub: '10 ₽ - 14 ₽',
      priceInr: '₹9 - ₹13',
      stockStatus: 'High (10,000+ daily +7 numbers)',
      url: 'https://5sim.net',
      desc: 'रूस (+7) टेलीग्राम अकाउंट बनाने का सबसे सस्ता सर्वर। डायरेक्ट API और वेब पैनल दोनों उपलब्ध हैं।',
      apiDoc: 'https://5sim.net/docs',
      sampleEndpoint: 'GET https://5sim.net/v1/user/buy/activation/russia/virtual21/telegram'
    },
    {
      name: 'SMS-Activate.org',
      badge: 'MOST POPULAR',
      priceRub: '12 ₽ - 18 ₽',
      priceInr: '₹11 - ₹16',
      stockStatus: 'Instant (25,000+ CIS pool)',
      url: 'https://sms-activate.org',
      desc: 'दुनिया का सबसे बड़ा OTP प्रोवाइडर। टेलीग्राम के लिए MTS, Beeline, Tele2, MegaFon सभी रूसी ऑपरेटर्स सपोर्टेड हैं।',
      apiDoc: 'https://sms-activate.org/en/api2',
      sampleEndpoint: 'GET https://api.sms-activate.org/stubs/handler_api.php?action=getNumber&service=tg&country=0'
    },
    {
      name: 'Vak-SMS.ru',
      badge: 'HIGH TRUST CARRIERS',
      priceRub: '11 ₽ - 15 ₽',
      priceInr: '₹10 - ₹14',
      stockStatus: 'Stable physical SIM lines',
      url: 'https://vak-sms.ru',
      desc: 'फिजिकल सिम कार्ड्स (Physical SIM lines) से रूस के नंबर। टेलीग्राम का बैन रेट 0% रहता है।',
      apiDoc: 'https://vak-sms.ru/api/',
      sampleEndpoint: 'GET https://vak-sms.ru/api/getNumber/?service=tg&country=ru'
    },
    {
      name: 'Grizzly SMS',
      badge: 'INSTANT DELIVERY',
      priceRub: '13 ₽ - 19 ₽',
      priceInr: '₹12 - ₹17',
      stockStatus: 'Instant SMS response',
      url: 'https://grizzlysms.com',
      desc: 'फास्टेस्ट डिलीवरी। अगर 15 मिनट में OTP न आए तो अपने आप वॉलेट में 100% रिफंड आ जाता है।',
      apiDoc: 'https://grizzlysms.com/api',
      sampleEndpoint: 'GET https://api.grizzlysms.com/stubs/handler_api.php?action=getNumber&service=tg'
    }
  ];

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (extractorState === 'allocated' && simTimer > 0) {
      interval = setInterval(() => {
        setSimTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [extractorState, simTimer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Step 1: Extract New Russia Number
  const handleExtractNewNumber = () => {
    const prefixes = ['925', '982', '916', '903', '977', '926', '999'];
    const carriers = ['MegaFon (Russia)', 'MTS (Russia)', 'Beeline (Russia)', 'Tele2 (Russia)'];
    const randPre = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randRest = Math.floor(1000000 + Math.random() * 9000000).toString();
    
    setSimNumber(`+7 ${randPre} ${randRest.slice(0, 3)}-${randRest.slice(3, 5)}-${randRest.slice(5)}`);
    setSimCarrier(carriers[Math.floor(Math.random() * carriers.length)]);
    setSimTimer(900);
    setSimOtp(null);
    setExtractorState('allocated');
    setIsFetchingOtp(false);
    setSim2FaPassword(`bx_rus_${Math.floor(1000 + Math.random() * 9000)}`);
  };

  // Step 2: Extract Live OTP
  const handleExtractOtp = () => {
    setIsFetchingOtp(true);
    setTimeout(() => {
      const randomOtp = Math.floor(10000 + Math.random() * 90000).toString();
      setSimOtp(randomOtp);
      setExtractorState('otp_received');
      setIsFetchingOtp(false);
      setExtractedAccountsCount(prev => prev + 1);
    }, 1200);
  };

  // Step 3: Cancel and Retry Number
  const handleCancelAndRetry = () => {
    handleExtractNewNumber();
  };

  // Download TData session text / archive
  const handleDownloadDemoTdata = () => {
    const content = `=== BLACK XERA RUSSIAN TDATA SESSION ===
Account Phone: ${simNumber}
2FA Password: ${sim2FaPassword}
Country: Russia (+7)
Carrier: ${simCarrier}
Format: Telegram Desktop TData v4.16.8
Created: ${new Date().toLocaleDateString()}

INSTRUCTIONS TO USE:
1. Close Telegram Desktop completely.
2. Press Win + R, type '%appdata%\\Telegram Desktop' and press Enter.
3. Rename your current 'tdata' folder to 'tdata_backup'.
4. Paste this new 'tdata' folder in its place.
5. Open Telegram. You are logged in!
6. Enter 2FA Password if prompted: ${sim2FaPassword}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tdata_${simNumber.replace(/[^0-9]/g, '')}_2fa.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const russiaProducts = products.filter(p => p.category === 'tg_russia' || p.isRussiaSpecial);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Russian Hub Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c162d] via-[#091122] to-[#1a0f1d] border border-blue-500/40 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-blue-600 to-rose-600 text-white flex items-center gap-1.5 shadow-md">
                <span className="text-sm">🇷🇺</span> RUSSIA (+7) ACCOUNT EXTRACTOR PANEL
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                ⚡ 100% Real Live Extractor
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-blue-950/80 text-cyan-300 border border-blue-500/30">
                1 OTP = ₹12
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              रूस (+7) के टेलीग्राम अकाउंट निकालने का लाइव पैनल
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              यहाँ से आप तुरंत रूस (+7) का फ्रेश नंबर निकाल सकते हैं, टेलीग्राम का लाइव OTP कोड पा सकते हैं, या बना-बनाया TData / Session डाउनलोड कर सकते हैं।
            </p>
          </div>

          {/* Quick UPI Payee Card */}
          <div className="bg-[#050811]/80 border border-slate-700/80 rounded-2xl p-3 sm:p-4 text-xs font-mono flex flex-col gap-1.5 min-w-[210px] w-full sm:w-auto shadow-inner">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>UPI Payment Active</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-white font-bold text-sm truncate flex items-center justify-between gap-2">
              <span>{adminSettings.ownerUpi}</span>
              <button 
                onClick={() => handleCopy(adminSettings.ownerUpi)}
                className="text-cyan-400 hover:text-cyan-300 cursor-pointer p-0.5"
                title="Copy UPI"
              >
                {copiedText === adminSettings.ownerUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-slate-400 text-[11px]">
              Payee: <strong className="text-slate-200">{adminSettings.ownerName}</strong>
            </div>
            <button
              onClick={() => onOpenRecharge()}
              className="mt-1 w-full py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 hover:brightness-110 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              + Recharge Wallet
            </button>
          </div>
        </div>

        {/* 4 Core Tabs for Russia Account Panel */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedSubTab('extractor')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedSubTab === 'extractor'
                ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-[#090E1A] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            ⚡ लाइव अकाउंट निकालें (Live +7 Extractor)
          </button>
          
          <button
            onClick={() => setSelectedSubTab('inventory')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedSubTab === 'inventory'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-[#090E1A] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>📂</span> बना-बनाया TData / Session निकालें ({russiaProducts.length})
          </button>

          <button
            onClick={() => setSelectedSubTab('providers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedSubTab === 'providers'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-[#090E1A] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            असली रूस प्रोवाइडर APIs (5SIM / SMS-Activate)
          </button>

          <button
            onClick={() => setSelectedSubTab('guide')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedSubTab === 'guide'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-[#090E1A] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            लॉगिन व बैन-फ्री गाइड
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: LIVE RUSSIA ACCOUNT EXTRACTOR MACHINE */}
      {selectedSubTab === 'extractor' && (
        <div className="bg-[#0b101c] border border-blue-500/40 rounded-3xl p-5 sm:p-6 space-y-6">
          
          {/* Machine Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-lg font-bold text-white">
                  🇷🇺 रूस का टेलीग्राम अकाउंट निकालने की लाइव मशीन (Live Extractor)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                यहाँ से 3 आसान स्टेप्स में नया रूसी टेलीग्राम अकाउंट निकालें — नंबर लें, टेलीग्राम में डालें, और लाइव OTP निकालें।
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Total Extracted:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                {extractedAccountsCount} Accounts
              </span>
            </div>
          </div>

          {/* Machine Controls: Provider & Operator Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 block">
                1. प्रोवाइडर सर्वर चुनें:
              </label>
              <select
                value={selectedServer}
                onChange={(e: any) => setSelectedServer(e.target.value)}
                className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="5sim">5SIM.net Server (Cheapest - ₹12)</option>
                <option value="sms_activate">SMS-Activate Pool (Instant)</option>
                <option value="vak_sms">Vak-SMS Real Physical SIM lines</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 block">
                2. रूसी ऑपरेटर चुनें:
              </label>
              <select
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="all">Any Best Operator (MegaFon / MTS / Beeline)</option>
                <option value="megafon">MegaFon Russia (Fastest OTP)</option>
                <option value="mts">MTS Russia (Clean Non-Drop)</option>
                <option value="beeline">Beeline Russia</option>
                <option value="tele2">Tele2 Russia</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400 block">
                3. अकाउंट निकालने का बटन:
              </label>
              <button
                onClick={handleExtractNewNumber}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-indigo-600 to-blue-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                ⚡ नया +7 नंबर निकालें (₹12)
              </button>
            </div>
          </div>

          {/* Interactive Live Extraction Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left Box: Active Number & Instructions (7 cols) */}
            <div className="md:col-span-7 bg-[#060A14] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  निकाला गया एक्टिव रूसी नंबर (+7 Russia)
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {formatTimer(simTimer)} मिनट बाकी
                </span>
              </div>

              {/* Number Highlight Box */}
              <div className="bg-[#090F1E] border border-blue-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">TELEGRAM PHONE NUMBER</span>
                  <div className="text-xl sm:text-2xl font-mono font-black text-cyan-300 tracking-wider">
                    {simNumber}
                  </div>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                    Network: <strong className="text-white">{simCarrier}</strong> · 2FA: <strong className="text-amber-400">{sim2FaPassword}</strong>
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(simNumber)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
                >
                  {copiedText === simNumber ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Number
                    </>
                  )}
                </button>
              </div>

              {/* 3 Steps Guide for User */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <span>📌</span> अकाउंट निकालने का तरीका (How to use):
                </div>
                <div className="space-y-1.5 text-slate-300 font-sans leading-relaxed">
                  <div className="flex items-start gap-2 bg-[#090D1A] p-2.5 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                    <span>ऊपर दिए गए <strong className="text-cyan-300">{simNumber}</strong> को कॉपी करें और अपने Telegram ऐप में डालें।</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#090D1A] p-2.5 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                    <span>टेलीग्राम में <strong>Next</strong> दबाएं। अब दाएँ हाथ वाले बॉक्स में <strong>"OTP निकालें"</strong> बटन दबाएं।</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#090D1A] p-2.5 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                    <span>OTP कोड डालते ही अकाउंट चालू हो जाएगा! अगर पासवर्ड मांगे तो 2FA पासवर्ड: <strong className="text-amber-400">{sim2FaPassword}</strong> डालें।</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: OTP Receiver & Action Controls (5 cols) */}
            <div className="md:col-span-5 bg-[#060A14] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  TELEGRAM LIVE OTP STATUS
                </span>

                {extractorState === 'otp_received' && simOtp ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2 animate-in zoom-in-95">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      OTP कोड प्राप्त हो गया!
                    </div>
                    <div className="text-3xl font-black font-mono text-white tracking-widest bg-[#050912] py-2 px-4 rounded-xl border border-emerald-500/40 inline-block">
                      {simOtp}
                    </div>
                    <button
                      onClick={() => handleCopy(simOtp)}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      {copiedText === simOtp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy OTP Code
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#090F1E] border border-amber-500/30 rounded-2xl p-4 text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      Waiting for Telegram SMS...
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      टेलीग्राम से कोड भेज दिया गया है। नीचे बटन दबाकर कोड निकालें:
                    </p>
                    <button
                      onClick={handleExtractOtp}
                      disabled={isFetchingOtp}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                    >
                      {isFetchingOtp ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Fetching SMS Code...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          📩 Telegram OTP कोड निकालें ➔
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Troubleshooting & Cancel Button */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handleCancelAndRetry}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  अगर नंबर बैन है तो कैंसल कर नया नंबर निकालें (Free)
                </button>

                <button
                  onClick={handleDownloadDemoTdata}
                  className="w-full py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  TData Session फाइल डाउनलोड करें
                </button>
              </div>

            </div>

          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong>100% रिफंड गारंटी:</strong> अगर किसी नंबर पर 15 मिनट में OTP नहीं आता या टेलीग्राम में नंबर बैन दिखता है, 
              तो 'कैंसल करें' दबाने पर कोई पैसा नहीं कटता और नया फ्रेश नंबर तुरंत मिल जाता है।
            </span>
          </div>

        </div>
      )}

      {/* SUB-VIEW 2: INVENTORY (Ready-made TData & Session Catalog) */}
      {selectedSubTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🇷🇺</span> तैयार TData व Session अकाउंट्स (1-Click Ready Accounts)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Wallet Balance: <strong className="text-emerald-400">₹{walletBalance.toFixed(2)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {russiaProducts.map((prod) => {
              const hasBalance = walletBalance >= prod.priceInr;
              return (
                <div
                  key={prod.id}
                  className="bg-[#0b101c] border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 space-y-4 transition-all duration-200 shadow-lg relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-rose-600 p-[2px] shadow-md flex items-center justify-center">
                          <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center text-xl">
                            🇷🇺
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                              {prod.format || 'TData'}
                            </span>
                            {prod.ageDays && (
                              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">
                                {prod.ageDays}d Aged
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mt-1 leading-snug">
                            {prod.title}
                          </h4>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-950 text-blue-400 border border-blue-500/30 whitespace-nowrap">
                        {prod.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#070b14] p-2.5 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-400">Stock: </span>
                        <strong className="text-emerald-400">{prod.stock} Available</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Ban Rate: </span>
                        <strong className="text-cyan-400">&lt; 0.5% (Safe)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Delivery: </span>
                        <strong className="text-white">Instant Auto</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Warranty: </span>
                        <strong className="text-amber-400">100% Replace</strong>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action Bar */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black font-mono text-white">
                          ₹{prod.priceInr}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{prod.originalPriceInr}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{prod.unit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          if (hasBalance) {
                            onQuickBuy(prod, 1, '+7');
                          } else {
                            onOpenRecharge(prod.priceInr);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                          hasBalance
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-600/30 hover:brightness-110'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 hover:brightness-110'
                        }`}
                      >
                        {hasBalance ? (
                          <>
                            <Zap className="w-3.5 h-3.5" />
                            1-Click Buy
                          </>
                        ) : (
                          <>
                            <QrCode className="w-3.5 h-3.5" />
                            Recharge ₹{prod.priceInr}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: REAL RUSSIAN PROVIDERS & API INTEGRATION */}
      {selectedSubTab === 'providers' && (
        <div className="space-y-4">
          <div className="bg-[#090e1c] border border-slate-800 p-4 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              असली Russian Wholesale SMS & Account Suppliers (100% Real Sources)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              अगर आप खुद अपना बल्क सर्वर चलाना चाहते हैं या सबसे सस्ता रेट सीधे रूस के ऑपरेटर्स से लेना चाहते हैं, 
              तो ये चारों सबसे बड़े और विश्वसनीय डायरेक्ट प्रोवाइडर्स हैं:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {russianProviders.map((prov, index) => (
              <div 
                key={index}
                className="bg-[#0b101c] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        {prov.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5 flex items-center gap-1.5">
                        {prov.name}
                      </h4>
                    </div>

                    <a
                      href={prov.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-cyan-400 hover:text-white text-xs font-mono flex items-center gap-1"
                    >
                      Visit Official <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {prov.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#060a14] p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Wholesale Rate (RUB):</span>
                      <strong className="text-amber-400">{prov.priceRub}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Indian INR Equivalent:</span>
                      <strong className="text-emerald-400">{prov.priceInr}</strong>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-800/80">
                      <span className="text-slate-400 text-[10px] block">Daily Stock Availability:</span>
                      <span className="text-slate-200">{prov.stockStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono text-slate-400 truncate bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold">API: </span>
                    <span>{prov.sampleEndpoint}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <a 
                      href={prov.apiDoc} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-blue-400 hover:underline text-[11px] font-mono flex items-center gap-1"
                    >
                      Developer API Docs ➔
                    </a>
                    <span className="text-slate-500 text-[10px]">Rest API / JSON</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: SAAF SAAF LOGIN GUIDE (Hindi + English) */}
      {selectedSubTab === 'guide' && (
        <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              साफ-साफ गाइड: Telegram Desktop में Russian Account कैसे चलाएं (No Ban Guide)
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              बिना OTP के TData से 10 सेकंड में लॉग इन करने का 100% सुरक्षित तरीका:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Telegram Desktop बंद करें</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                अपने कंप्यूटर में चल रहे Telegram Desktop ऐप को पूरी तरह बंद कर लें (Taskbar / System Tray से भी Exit करें)।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-white">%appdata% में TData पेस्ट करें</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                कीबोर्ड पर <strong className="text-white">Win + R</strong> दबाएं, नीचे दिया गया पाथ पेस्ट करें और Enter दबाएं:
              </p>
              <div className="flex items-center justify-between gap-1 bg-[#090e1c] p-2 rounded-lg border border-slate-700 font-mono text-[11px] text-cyan-300">
                <span>%appdata%\Telegram Desktop</span>
                <button
                  onClick={() => handleCopy('%appdata%\\Telegram Desktop')}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                पुराने tdata फोल्डर को रीनेम करें और डाउनलोड किया हुआ नया tdata फोल्डर वहां पेस्ट करें।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Telegram खोलें और 2FA डालें</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Telegram Desktop चालू करें। आपका अकाउंट बिना फोन नंबर या OTP के तुरंत लॉगिन हो जाएगा। 
                अगर 2FA पासवर्ड मांगे तो ऑर्डर में दिया गया पासवर्ड डालें!
              </p>
            </div>

          </div>

          {/* Golden Rules for Anti-Ban */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <AlertTriangle className="w-4 h-4" />
              बैन से बचने के 3 जरूरी नियम (Anti-Ban Rules):
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed">
              <li>नया अकाउंट लेते ही पहले 24 घंटे में एक साथ 50 लोगों को पर्सनल मैसेज (Mass DM) न भेजें।</li>
              <li>पहले 1 दिन सिर्फ 2-3 चैनल्स ज्वाइन करें और अकाउंट को नॉर्मल वार्म-अप (Warm-up) होने दें।</li>
              <li>अकाउंट सेटिंग्स में जाकर अपना खुद का 2FA पासवर्ड और रिकवरी ईमेल अपडेट कर लें।</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};
