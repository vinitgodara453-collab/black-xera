import React, { useState } from 'react';
import { Globe, Copy, Check, Share2, ExternalLink, Zap, Shield, ArrowRight } from 'lucide-react';

interface FreeHostingGuideProps {
  lang: 'hi' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

export const FreeHostingGuide: React.FC<FreeHostingGuideProps> = ({
  lang,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const liveUrl = window.location.href.split('?')[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = encodeURIComponent(
    lang === 'hi'
      ? `🚀 मेरा नया डायनामिक QR कोड और एनालिटिक्स प्लेटफॉर्म लाइव है! अभी चेक करें: ${liveUrl}`
      : `🚀 Check out my live dynamic QR Code & Analytics Platform: ${liveUrl}`
  );

  return (
    <section id="hosting-guide" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? '100% फ्री लाइव होस्टिंग गाइड' : '100% Free Hosting & Deployment'}</span>
            <span aria-hidden="true">·</span>
            <span>Zero Server Bill</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'hi' ? 'इसे बिल्कुल मुफ़्त में कहाँ और कैसे लाइव होस्ट करें?' : 'Where & How to Host This Website 100% Free'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi'
              ? 'अच्छी खबर: आपका यह ऐप अभी भी Google Cloud पर 24/7 लाइव चल रहा है! इसके अलावा आप इसे Vercel या Netlify पर भी ₹0 में होस्ट कर सकते हैं।'
              : 'Great news: Your website is ALREADY live on Google Cloud right now. Here is how to host it permanently for free on Vercel or Netlify.'}
          </p>
        </div>

        {/* Current Live URL Banner */}
        <div className="p-5 bg-[#0D1424] border border-emerald-900/50 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-white uppercase">{lang === 'hi' ? 'आपकी वेबसाइट अभी लाइव है!' : 'Your Website is Currently LIVE!'}</span>
            </div>
            <span className="text-emerald-400 font-bold">Hosted on Google Cloud Run</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#070B14] border border-slate-800 p-3 rounded-lg font-mono text-xs">
            <span className="text-emerald-400 truncate select-all">{liveUrl}</span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Live Link'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold rounded text-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Best 100% Free Hosting Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Option 1: Vercel */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-base">1. Vercel (Best & Easiest)</span>
                <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[10px]">₹0 Free Forever</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'React और Vite वेबसाइट्स के लिए दुनिया का सबसे बेहतरीन फ्री होस्टिंग प्लेटफॉर्म। 1 मिनट में लाइव होता है और कभी डाउन नहीं होता।'
                  : 'The industry-standard free hosting platform for React & Vite with instant deployments and free SSL.'}
              </p>
              <div className="text-[11px] text-slate-400 bg-[#080D18] p-2.5 rounded space-y-1">
                <div>✓ <strong>चार्ज:</strong> ₹0 (क्रेडिट कार्ड की जरूरत नहीं)</div>
                <div>✓ <strong>SSL:</strong> फ्री ऑटोमैटिक HTTPS</div>
                <div>✓ <strong>स्पीड:</strong> सुपरफास्ट ग्लोबल CDN</div>
              </div>
            </div>

            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Vercel.com खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Option 2: Netlify */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-base">2. Netlify</span>
                <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[10px]">₹0 Free Forever</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'इसमें आप अपने कोड के `dist` फोल्डर को सीधे ड्रैग-एंड-ड्रॉप (Drag & Drop) करके भी 10 सेकंड में वेबसाइट लाइव कर सकते हैं।'
                  : 'Deploy directly via Drag-and-Drop or GitHub. 100GB monthly bandwidth included free.'}
              </p>
              <div className="text-[11px] text-slate-400 bg-[#080D18] p-2.5 rounded space-y-1">
                <div>✓ <strong>ड्रैग एंड ड्रॉप:</strong> सीधे फोल्डर अपलोड करें</div>
                <div>✓ <strong>कस्टम डोमेन:</strong> फ्री में अपना .com जोड़ें</div>
                <div>✓ <strong>अपटाइम:</strong> 99.99% हाई स्पीड</div>
              </div>
            </div>

            <a
              href="https://netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Netlify.com खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Option 3: Cloudflare Pages */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white text-base">3. Cloudflare Pages</span>
                <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[10px]">Unlimited Bandwidth</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'दुनिया का सबसे सुरक्षित नेटवर्क। इस पर अनलिमिटेड बैंडविड्थ बिल्कुल फ्री मिलती है और भारत में सबसे तेज स्पीड (DDoS प्रोटेक्टेड) होती है।'
                  : 'Unlimited free bandwidth, enterprise DDoS protection, and local servers across Indian cities.'}
              </p>
              <div className="text-[11px] text-slate-400 bg-[#080D18] p-2.5 rounded space-y-1">
                <div>✓ <strong>बैंडविड्थ:</strong> असीमित (Unlimited)</div>
                <div>✓ <strong>सुरक्षा:</strong> सबसे मजबूत एंटी-हैक शील्ड</div>
                <div>✓ <strong>लोकेशन:</strong> मुंबई और दिल्ली एज सर्वर</div>
              </div>
            </div>

            <a
              href="https://pages.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Cloudflare Pages खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Option 4: Railway.app (Python Telegram Hosting Bot Pro) */}
        <div className="p-6 bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#141e33] border-2 border-indigo-500/50 rounded-2xl shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  {lang === 'hi' ? 'टेलीग्राम होस्टिंग बॉट (Railway.app Ready)' : 'TELEGRAM HOSTING BOT (RAILWAY READY)'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  👑 Naitik Hosting Bot Pro (Python 3.11 + UPI Gateway)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold rounded-lg">
                Procfile + requirements.txt Included
              </span>
              <a
                href="https://railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm font-mono"
              >
                <span>Railway.app</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#080D1A] border border-slate-800 rounded-xl space-y-2">
              <strong className="text-white block font-mono text-xs">1. BotFather से टोकन लें:</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                टेलीग्राम पर <code>@BotFather</code> को <code>/newbot</code> भेजकर अपने बॉट का नाम और टोकन प्राप्त करें।
              </p>
            </div>

            <div className="p-4 bg-[#080D1A] border border-slate-800 rounded-xl space-y-2">
              <strong className="text-white block font-mono text-xs">2. Railway Environment Variables:</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Railway प्रोजेक्ट में <code>Variables</code> में जाएं और <code>BOT_TOKEN</code>, <code>ADMIN_ID</code>, और <code>OWNER_UPI=bajranggodara930@okaxis</code> सेट करें।
              </p>
            </div>

            <div className="p-4 bg-[#080D1A] border border-slate-800 rounded-xl space-y-2">
              <strong className="text-white block font-mono text-xs">3. 24/7 ऑटो-स्टार्ट (Procfile):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Railway आपकी <code>Procfile</code> (<code>worker: python bot.py</code>) को पहचान कर बॉट को बिना सोए 24/7 लाइव रखता है।
              </p>
            </div>
          </div>

          {/* Termux to Railway Bridge Box */}
          <div className="p-4 sm:p-5 bg-[#090E1A] border border-cyan-500/30 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📲 ⇄ 🚂</span>
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">
                    Termux को Railway से कैसे Connect करें (Direct Cloud Deploy)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Termux से सीधा Railway CLI या GitHub के जरिए मोबाइल से ही बॉट को Railway पर पुश करें
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] rounded">
                Termux CLI Mode
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              {/* Method 1: Railway CLI */}
              <div className="p-3.5 bg-[#050811] border border-slate-800 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between text-indigo-400 font-bold font-mono text-xs">
                  <span>तरीका 1: Railway Official CLI (सबसे आसान)</span>
                  <span className="text-[10px] bg-indigo-950/80 px-1.5 py-0.5 rounded text-indigo-300">Direct Upload</span>
                </div>
                <div className="bg-[#020409] p-2.5 rounded font-mono text-[11px] text-emerald-400 space-y-1.5 overflow-x-auto border border-slate-800">
                  <div className="text-slate-500"># 1. Termux पैकेज से सीधा Railway डालें (npm की जरूरत नहीं):</div>
                  <div className="text-cyan-300">pkg update && pkg install railway-cli -y</div>
                  <div className="text-slate-500"># 2. Mobile ब्राउज़र से लॉगिन करें:</div>
                  <div className="text-cyan-300">railway login --browserless</div>
                  <div className="text-slate-500"># 3. अपने बॉट फोल्डर में जाएं और कनेक्ट करें:</div>
                  <div className="text-cyan-300">cd ~/bot && railway init</div>
                  <div className="text-slate-500"># 4. सीधा Railway पर कोड चढ़ाएं:</div>
                  <div className="text-amber-300 font-bold">railway up</div>
                  <div className="text-slate-500"># 5. मोबाइल से लाइव लॉग्स देखें:</div>
                  <div className="text-cyan-300">railway logs</div>
                </div>
              </div>

              {/* Method 2: GitHub Auto Sync */}
              <div className="p-3.5 bg-[#050811] border border-slate-800 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between text-purple-400 font-bold font-mono text-xs">
                  <span>तरीका 2: GitHub Repo Auto Sync (बेस्ट फॉर अपडेट)</span>
                  <span className="text-[10px] bg-purple-950/80 px-1.5 py-0.5 rounded text-purple-300">Auto Deploy</span>
                </div>
                <div className="bg-[#020409] p-2.5 rounded font-mono text-[11px] text-purple-300 space-y-1.5 overflow-x-auto border border-slate-800">
                  <div className="text-slate-500"># 1. Termux में Git सेटअप करें:</div>
                  <div className="text-cyan-300">git init && git add .</div>
                  <div className="text-cyan-300">git commit -m "Deploy Naitik Bot"</div>
                  <div className="text-slate-500"># 2. GitHub Repo लिंक करके पुश करें:</div>
                  <div className="text-cyan-300">git remote add origin https://github.com/USER/bot.git</div>
                  <div className="text-amber-300 font-bold">git push -u origin main</div>
                  <div className="text-slate-500"># 3. Railway.app डैशबोर्ड में:</div>
                  <div className="text-slate-300 text-[11px]">"New Project" ➔ "Deploy from GitHub" चुनें। जब भी Termux से git push करेंगे, Railway अपने आप अपडेट हो जाएगा!</div>
                </div>
              </div>
            </div>

            <div className="bg-amber-950/30 border border-amber-600/40 rounded-lg p-3 text-xs text-amber-200/90 flex items-start gap-2">
              <span className="text-base">💡</span>
              <p className="leading-relaxed">
                <strong>प्रो टिप:</strong> अगर <code>railway login --browserless</code> में समस्या आए, तो Railway.app पर जाकर <strong>Account Settings ➔ Tokens</strong> से एक Personal API Token बनाएं, और Termux में <code>export RAILWAY_TOKEN="your_token"</code> रन करके <code>railway up</code> दबाएं!
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#060911] border border-slate-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-300 text-[11px] font-mono">
              📁 बॉट की पूरी फाइल्स: <code>/bot/bot.py</code>, <code>/bot/requirements.txt</code>, <code>/bot/Procfile</code> आपके प्रोजेक्ट में तैयार हैं!
            </span>
            <span className="text-emerald-400 font-bold font-mono text-xs">
              ✓ Ready for 1-Click Railway & Render Deployment
            </span>
          </div>
        </div>

        {/* Option 5: Render.com (100% Free - No Android ARM Error) */}
        <div className="p-6 bg-gradient-to-br from-[#0c1626] via-[#0d1c33] to-[#122442] border-2 border-emerald-500/50 rounded-2xl shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {lang === 'hi' ? 'RENDER.COM (100% फ्री - कोई क्रेडिट कार्ड नहीं)' : 'RENDER.COM (100% FREE - NO CREDIT CARD)'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Render.com से Termux को Connect करें (750 Free Hours)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-lg">
                Zero ARM64 Errors
              </span>
              <a
                href="https://render.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm font-mono"
              >
                <span>Render.com खोलें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Step 1: Deploy Hook from Termux */}
            <div className="p-4 bg-[#080E1C] border border-slate-800 rounded-xl space-y-2.5">
              <strong className="text-emerald-400 font-bold font-mono flex items-center gap-2">
                <span>1. Termux Deploy Hook (1-Command Deploy)</span>
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Render में <strong>Settings ➔ Deploy Hook</strong> की लिंक मिलती है। Termux में केवल 1 curl कमांड चलाकर आप जब चाहें बिना किसी ऐप के बॉट री-डिप्लॉय कर सकते हैं:
              </p>
              <div className="bg-[#02050E] p-2.5 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto border border-slate-800">
                curl -X POST https://api.render.com/deploy/srv-YOUR_ID?key=YOUR_KEY
              </div>
            </div>

            {/* Step 2: Settings on Render */}
            <div className="p-4 bg-[#080E1C] border border-slate-800 rounded-xl space-y-2.5">
              <strong className="text-cyan-400 font-bold font-mono flex items-center gap-2">
                <span>2. Render.com पर सर्विस सेटिंग्स</span>
              </strong>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>• <strong>Service Type:</strong> Web Service या Background Worker</div>
                <div>• <strong>Environment:</strong> Python 3</div>
                <div>• <strong>Build Command:</strong> <code>pip install -r requirements.txt</code></div>
                <div>• <strong>Start Command:</strong> <code>python bot.py</code></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
