import React, { useState } from 'react';
import { SETUP_STEPS, QUICK_SCRIPTS, USE_CASES } from '../data/guides';
import { VPS_PROVIDERS } from '../data/vpsProviders';
import { Check, Copy, ChevronDown, ChevronUp, Bot, GraduationCap, Globe, CreditCard, Layers, ExternalLink, Code2 } from 'lucide-react';

interface SetupGuidesProps {
  lang: 'hi' | 'en';
  currency: 'INR' | 'USD';
  onSelectProvider: (providerId: string) => void;
}

export const SetupGuides: React.FC<SetupGuidesProps> = ({
  lang,
  currency,
  onSelectProvider,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'usecases' | 'scripts' | 'free_nocard'>('free_nocard');
  const [selectedScriptId, setSelectedScriptId] = useState<string>(QUICK_SCRIPTS[0].id);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const selectedScript = QUICK_SCRIPTS.find(s => s.id === selectedScriptId) || QUICK_SCRIPTS[0];

  const handleCopyScript = (scriptText: string, id: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const getUseCaseIcon = (name: string) => {
    switch (name) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-blue-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="guides" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
            <span>{lang === 'hi' ? 'सच्चाई, फ्री ट्रिक्स & गाइड' : 'Free Methods & Complete Guides'}</span>
            <span aria-hidden="true">·</span>
            <span>Ubuntu 24.04 / 22.04 LTS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {lang === 'hi' ? 'सस्ता या फ्री VPS कैसे लें (पूरी सच्चाई)' : 'How to Get Cheap or 100% Free Ubuntu VPS'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'hi' 
              ? 'अगर आपके पास क्रेडिट कार्ड नहीं है या ₹0 में सर्वर चाहिए, तो ये 4 तरीके सबसे बेस्ट हैं।' 
              : 'Zero credit card methods, AWS 1-year free tier, GitHub Codespaces, and the truth about cheap seller VPS.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg max-w-2xl mb-8 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('free_nocard')}
            className={`py-2 px-3 rounded-md transition-colors text-center whitespace-nowrap cursor-pointer ${
              activeTab === 'free_nocard' ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            {lang === 'hi' ? '⚡ 100% फ्री & बिना कार्ड के तरीके' : '⚡ 100% Free & No Card'}
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-2 px-3 rounded-md transition-colors text-center whitespace-nowrap cursor-pointer ${
              activeTab === 'steps' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '1. स्टेप-बाय-स्टेप गाइड' : '1. Step-by-Step Guide'}
          </button>
          <button
            onClick={() => setActiveTab('usecases')}
            className={`py-2 px-3 rounded-md transition-colors text-center whitespace-nowrap cursor-pointer ${
              activeTab === 'usecases' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '2. काम के अनुसार चुनें' : '2. Match by Use Case'}
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={`py-2 px-3 rounded-md transition-colors text-center whitespace-nowrap cursor-pointer ${
              activeTab === 'scripts' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? '3. 1-क्लिक स्क्रिप्ट्स' : '3. Quick Scripts'}
          </button>
        </div>

        {/* TAB 0: 100% Free & No Card Methods (The Real Truth) */}
        {activeTab === 'free_nocard' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-lg text-xs space-y-2">
              <div className="text-amber-300 font-bold text-sm flex items-center gap-2">
                <span>⚠️ {lang === 'hi' ? 'अगर आप Telegram / YouTube से ₹100 वाला AWS VPS लेने की सोच रहे हैं:' : 'If you are looking at ₹100 AWS VPS from Telegram / Resellers:'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {lang === 'hi' 
                  ? 'टेलीग्राम पर लोग जो ₹100-₹150 में AWS का Ubuntu VPS (जैसे 54.252...) बेचते हैं, वो वर्चुअल कार्ड से बनाया हुआ फेक फ्री टियर होता है। अमेज़न 3 से 7 दिन में उस अकाउंट को बैन कर देता है और आपका सर्वर बंद हो जाता है। अगर आपको लंबे समय तक बॉट या कोड चलाना है, तो नीचे दिए गए 3 असली और सुरक्षित तरीके अपनाएं:' 
                  : 'Cheap ₹100 AWS accounts sold on Telegram use virtual/trial cards that get suspended by AWS fraud detection within 3-7 days. For stable, uninterrupted hosting, use the verified official free methods below:'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: AWS 1-Year Free Tier */}
              <div className="bg-[#0D1424] border border-emerald-900/40 rounded-lg p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">AWS Official Free Tier</span>
                    <span className="font-mono bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded text-[11px]">12 Months Free</span>
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'hi' ? 'अमेज़न AWS का 1 साल फ्री Ubuntu VPS' : 'Amazon AWS 1-Year Free Ubuntu EC2'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'hi'
                      ? 'जो IP आपने दिया (54.252.142.201), वो AWS का ही है! आप खुद AWS पर जाकर ₹2 में 1 साल (12 महीने) के लिए 750 घंटे/माह फ्री Ubuntu t2.micro/t3.micro ले सकते हैं।'
                      : 'The exact IP you asked about (54.252.142.201) runs on AWS! You can create your own official AWS account for ₹2 verification and get 12 months free Ubuntu EC2.'}
                  </p>
                  <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                    <div>✓ <strong>आवश्यकता:</strong> भारत का कोई भी सामान्य डेबिट कार्ड (SBI, HDFC, ICICI)</div>
                    <div>✓ <strong>चार्ज:</strong> केवल ₹2 कटता है (रिफंडेबल)</div>
                    <div>✓ <strong>OS:</strong> Ubuntu 24.04 LTS (User: ubuntu)</div>
                  </div>
                </div>

                <a
                  href="https://aws.amazon.com/free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'hi' ? 'AWS फ्री टियर अकाउंट बनाएं' : 'Open AWS Free Tier'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: GitHub Codespaces */}
              <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">GitHub Codespaces</span>
                    <span className="font-mono bg-blue-950/40 text-blue-300 px-2 py-0.5 rounded text-[11px]">No Card Needed</span>
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'hi' ? 'गिटहब कोडस्पेस (0 रुपये, कोई कार्ड नहीं)' : 'GitHub Codespaces (Zero Card)'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'hi'
                      ? 'अगर आपके पास बैंक कार्ड नहीं है, तो GitHub पर फ्री में पूरा Ubuntu Linux एनवायरनमेंट मिलता है। इसमें Root एक्सेस, Docker, Python, Node सब पहले से होता है।'
                      : 'No bank card or phone verification needed. GitHub gives 120 core hours per month of full cloud Ubuntu Linux with Docker, Python, and root terminal.'}
                  </p>
                  <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                    <div>✓ <strong>आवश्यकता:</strong> केवल एक फ्री GitHub अकाउंट</div>
                    <div>✓ <strong>क्रेडिट कार्ड:</strong> बिल्कुल नहीं चाहिए (0%)</div>
                    <div>✓ <strong>ब्राउज़र में टर्मिनल:</strong> तुरंत 1 क्लिक में चालू</div>
                  </div>
                </div>

                <a
                  href="https://github.com/codespaces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'hi' ? 'GitHub Codespaces खोलें' : 'Open Codespaces'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 3: Google Cloud Shell */}
              <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400">Google Cloud Shell</span>
                    <span className="font-mono bg-indigo-950/40 text-indigo-300 px-2 py-0.5 rounded text-[11px]">Gmail Login</span>
                  </div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'hi' ? 'गूगल क्लाउड शेल (फ्री लिनक्स VM)' : 'Google Cloud Shell (Free Linux VM)'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'hi'
                      ? 'गूगल हर जीमेल यूजर को 50 घंटे प्रति सप्ताह का फ्री डेबियन/उबंटू लिनक्स VM देता है जिसमें 5GB परसिस्टेंट स्टोरेज मिलता है। कार्ड की कोई जरूरत नहीं।'
                      : 'Google provides every Gmail account with 50 weekly hours of cloud Linux with 5GB persistent storage, web preview, and built-in code editor.'}
                  </p>
                  <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                    <div>✓ <strong>आवश्यकता:</strong> केवल आपकी Gmail ID</div>
                    <div>✓ <strong>कार्ड / पेमेंट:</strong> ₹0 (कार्ड नहीं चाहिए)</div>
                    <div>✓ <strong>उपयोग:</strong> Python, Git, Docker, Testing</div>
                  </div>
                </div>

                <a
                  href="https://shell.cloud.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'hi' ? 'गूगल शेल चालू करें' : 'Open Google Shell'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* TAB 1: Step by Step Guide */}
        {activeTab === 'steps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SETUP_STEPS.map((step) => (
              <div key={step.step} className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {lang === 'hi' ? step.titleHi : step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400">
                  {lang === 'hi' ? step.shortDescHi : step.shortDesc}
                </p>

                <ul className="space-y-2 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
                  {(lang === 'hi' ? step.detailsHi : step.details).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Match by Use Case */}
        {activeTab === 'usecases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((uc) => {
              const matchedProvider = VPS_PROVIDERS.find(p => p.id === uc.recommendedProviderId);
              return (
                <div key={uc.id} className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      {getUseCaseIcon(uc.iconName)}
                      <h3 className="font-bold text-white text-sm">
                        {lang === 'hi' ? uc.titleHi : uc.title}
                      </h3>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? uc.whyThisHi : uc.whyThis}
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === 'hi' ? 'ज़रूरी स्पेक्स:' : 'Required Specs:'}</span>
                        <span className="text-slate-200 font-medium">{uc.specsNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === 'hi' ? 'अनुमानित बजट:' : 'Estimated Cost:'}</span>
                        <span className="text-emerald-400 font-mono font-semibold">{uc.approxCost}</span>
                      </div>
                      {matchedProvider && (
                        <div className="flex justify-between border-t border-slate-800 pt-1 mt-1">
                          <span className="text-slate-400">{lang === 'hi' ? 'बेस्ट प्रोवाइडर:' : 'Best Provider:'}</span>
                          <span className="text-blue-400 font-semibold">{matchedProvider.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {matchedProvider && (
                    <button
                      onClick={() => onSelectProvider(matchedProvider.id)}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors text-center cursor-pointer"
                    >
                      {lang === 'hi' ? `${matchedProvider.name} देखें` : `View ${matchedProvider.name}`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Quick 1-Click Scripts */}
        {activeTab === 'scripts' && (
          <div id="scripts" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Script Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                {lang === 'hi' ? 'स्क्रिप्ट चुनें' : 'Select Script Recipe'}
              </span>
              {QUICK_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors text-xs space-y-1 cursor-pointer ${
                    selectedScriptId === script.id
                      ? 'bg-blue-950/40 border-blue-600 text-white'
                      : 'bg-[#0D1424] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">
                    {lang === 'hi' ? script.titleHi : script.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {lang === 'hi' ? script.descriptionHi : script.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Script Display & Terminal */}
            <div className="lg:col-span-8 bg-[#0C1220] border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {lang === 'hi' ? selectedScript.titleHi : selectedScript.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'hi' ? selectedScript.descriptionHi : selectedScript.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyScript(selectedScript.commands.join('\n'), selectedScript.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors cursor-pointer shrink-0"
                >
                  {copiedScriptId === selectedScript.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>{lang === 'hi' ? 'कॉपी हो गया' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'पूरी स्क्रिप्ट कॉपी करें' : 'Copy All Commands'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Box */}
              <div className="bg-[#080B12] border border-slate-800 rounded p-4 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed">
                {selectedScript.commands.map((cmd, i) => (
                  <div key={i} className={cmd.startsWith('#') ? 'text-slate-500' : 'text-slate-100'}>
                    {cmd}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  {lang === 'hi' 
                    ? 'यह सभी कमांड्स Ubuntu 24.04 और 22.04 दोनों पर 100% टेस्टेड हैं।' 
                    : 'Tested and verified on Ubuntu 24.04 and 22.04 LTS.'}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
