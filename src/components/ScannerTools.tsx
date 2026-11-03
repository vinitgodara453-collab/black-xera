import React, { useState, useEffect } from 'react';
import { ScanResult, Language } from '../types/cyber';
import { scanCyberTarget, checkEmailBreaches, analyzePasswordEntropy, PasswordAnalysis } from '../utils/securityEngine';
import { ShieldCheck, ShieldAlert, AlertTriangle, Key, Terminal, Lock, Globe, Server, Copy, Check, ExternalLink, Cpu, Hash } from 'lucide-react';

interface ScannerToolsProps {
  currentScan: ScanResult;
  onNewScan: (target: string) => void;
  lang: Language;
  isVip: boolean;
  onOpenVipModal: () => void;
}

export const ScannerTools: React.FC<ScannerToolsProps> = ({
  currentScan,
  onNewScan,
  lang,
  isVip,
  onOpenVipModal,
}) => {
  const [activeTab, setActiveTab] = useState<'target_scan' | 'darkweb' | 'password_lab' | 'ports' | 'payload_ai'>('target_scan');
  
  // Dark web check state
  const [breachQuery, setBreachQuery] = useState('bajranggodara930@gmail.com');
  const [breachResult, setBreachResult] = useState(() => checkEmailBreaches('bajranggodara930@gmail.com'));
  
  // Password lab state
  const [testPassword, setTestPassword] = useState('CyberShield#2026!Secure');
  const [passwordAnalysis, setPasswordAnalysis] = useState<PasswordAnalysis | null>(null);

  // Copied helper
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    analyzePasswordEntropy(testPassword).then(setPasswordAnalysis);
  }, [testPassword]);

  const handleBreachSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (breachQuery.trim()) {
      setBreachResult(checkEmailBreaches(breachQuery.trim()));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getThreatBadge = (level: ScanResult['threatLevel']) => {
    switch (level) {
      case 'critical':
        return <span className="text-rose-400 font-bold font-mono">CRITICAL THREAT</span>;
      case 'high':
        return <span className="text-rose-400 font-bold font-mono">HIGH RISK</span>;
      case 'medium':
        return <span className="text-amber-400 font-semibold font-mono">MODERATE RISK</span>;
      default:
        return <span className="text-emerald-400 font-bold font-mono">CLEAN / SECURE</span>;
    }
  };

  return (
    <section id="scanner-suite" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2 font-mono">
              <span>{lang === 'hi' ? '2026 अपग्रेडेड साइबर टूल्स' : 'Cyber Defense Suite 2026'}</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Scanners</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {lang === 'hi' ? 'गहन सुरक्षा विश्लेषण & भेद्यता लैब' : 'Deep Vulnerability Scanner & Security Lab'}
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('target_scan')}
              className={`py-2 px-3 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'target_scan' ? 'bg-cyan-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'hi' ? '1. टारगेट स्कैनर' : '1. Target Scanner'}
            </button>
            <button
              onClick={() => setActiveTab('darkweb')}
              className={`py-2 px-3 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'darkweb' ? 'bg-cyan-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'hi' ? '2. डार्क वेब लीक' : '2. Dark Web Breach'}
            </button>
            <button
              onClick={() => setActiveTab('password_lab')}
              className={`py-2 px-3 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'password_lab' ? 'bg-cyan-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'hi' ? '3. पासवर्ड & हैश लैब' : '3. Password Lab'}
            </button>
            <button
              onClick={() => setActiveTab('ports')}
              className={`py-2 px-3 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'ports' ? 'bg-cyan-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'hi' ? '4. पोर्ट ऑडिट & फ़ायरवॉल' : '4. Port & Firewall'}
            </button>
          </div>
        </div>

        {/* TAB 1: Target Scanner Results */}
        {activeTab === 'target_scan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 7 Columns: Scan Breakdown */}
            <div className="lg:col-span-7 bg-[#0D1424] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    {lang === 'hi' ? 'स्कैन किया गया टारगेट' : 'Scanned Target'}
                  </span>
                  <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
                    {currentScan.target}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{lang === 'hi' ? 'स्टेटस' : 'Status'}</span>
                  {getThreatBadge(currentScan.threatLevel)}
                </div>
              </div>

              {/* Score Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{lang === 'hi' ? 'सुरक्षा स्कोर (Security Score):' : 'Security Health Score:'}</span>
                  <span className="font-mono font-bold text-white tabular-nums">{currentScan.overallScore}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentScan.overallScore >= 80 ? 'bg-emerald-500' : currentScan.overallScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${currentScan.overallScore}%` }}
                  />
                </div>
              </div>

              {/* SSL & DNS Specs Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#080D18] border border-slate-800 rounded space-y-1">
                  <span className="text-slate-400 font-medium block">SSL/TLS Encryption</span>
                  <div className="font-bold text-white">{currentScan.sslStatus.protocol}</div>
                  <div className="text-[11px] text-slate-400">{currentScan.sslStatus.issuer}</div>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Grade: {currentScan.sslStatus.grade} · {currentScan.sslStatus.expiresInDays} days remaining
                  </div>
                </div>

                <div className="p-3 bg-[#080D18] border border-slate-800 rounded space-y-1">
                  <span className="text-slate-400 font-medium block">DNS & Email Protection</span>
                  <div className="font-bold text-white font-mono">
                    A: {currentScan.dnsAnalysis.aRecords[0] || 'N/A'}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    SPF: {currentScan.dnsAnalysis.spfConfigured ? '✓ Configured' : '✗ Missing'} · DMARC: {currentScan.dnsAnalysis.dmarcConfigured ? '✓ Active' : '✗ Missing'}
                  </div>
                </div>
              </div>

              {/* Threat Flags */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  {lang === 'hi' ? 'पहचाने गए संभावित खतरे (Detected Flags):' : 'Threat Intelligence Findings:'}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentScan.threatFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 bg-slate-900/60 rounded border border-slate-800/80">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <span className="text-xs font-semibold text-emerald-400 block">
                  {lang === 'hi' ? 'तुरंत सुरक्षा सुधार (Fix Recommendations):' : 'Remediation Steps:'}
                </span>
                <ul className="space-y-1 text-xs text-slate-300 list-disc pl-4">
                  {(lang === 'hi' ? currentScan.recommendationsHi : currentScan.recommendations).map((rec, idx) => (
                    <li key={idx} className="leading-relaxed">{rec}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right 5 Columns: Interactive Port Audit */}
            <div className="lg:col-span-5 bg-[#0C1220] border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm">
                  {lang === 'hi' ? 'ओपन पोर्ट्स & एक्सपोज़र' : 'Port Exposure Audit'}
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  {currentScan.openPorts.filter(p => p.status === 'open').length} Open
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {currentScan.openPorts.map((p) => (
                  <div key={p.port} className="p-2.5 bg-[#080D18] border border-slate-800 rounded space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-white">Port {p.port} ({p.service})</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        p.status === 'open' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {p.status.toUpperCase()}
                      </span>
                    </div>
                    {p.cveAlert && (
                      <p className="text-[11px] text-rose-300 leading-tight">
                        ⚠️ {p.cveAlert}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Linux UFW Quick Command */}
              <div className="p-3 bg-[#080D18] border border-cyan-950 rounded text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-mono text-cyan-400 text-[11px]">1-Click Linux Defense Command:</span>
                  <button
                    onClick={() => handleCopy('sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw allow 443/tcp && sudo ufw enable')}
                    className="text-cyan-400 hover:text-white p-1"
                    title="Copy command"
                  >
                    {copiedText?.includes('ufw') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-[11px] text-emerald-400 bg-black/40 p-2 rounded break-all">
                  sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw enable
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Dark Web Breach & Email Leak Detector */}
        {activeTab === 'darkweb' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6">
            
            <div className="max-w-2xl space-y-2">
              <h3 className="text-lg font-bold text-white">
                {lang === 'hi' ? 'डार्क वेब ईमेल & डेटा ब्रीच चेकर' : 'Dark Web & Data Breach Threat Intelligence'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {lang === 'hi'
                  ? 'जांचें कि आपका ईमेल या फोन नंबर किसी हैक हुए डेटाबेस (Naz.API, RedLine Stealer) में लीक तो नहीं हुआ।'
                  : 'Search over 800+ million compromised credentials across infostealer logs and dark web forums.'}
              </p>
            </div>

            {/* Breach Search Form */}
            <form onSubmit={handleBreachSearch} className="max-w-xl flex gap-2">
              <input
                type="text"
                value={breachQuery}
                onChange={(e) => setBreachQuery(e.target.value)}
                placeholder="email@example.com / username / phone"
                className="flex-1 bg-[#080D18] border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
              >
                {lang === 'hi' ? 'लीक चेक करें' : 'Check Leaks'}
              </button>
            </form>

            {/* Breach Results */}
            {breachResult.isCompromised ? (
              <div className="space-y-4 border-t border-slate-800 pt-5">
                <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-rose-300">
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white">
                        {lang === 'hi' ? 'चेतावनी: यह अकाउंट डेटा लीक में मिला है!' : 'Alert: Leaked Credentials Found in Global Dumps!'}
                      </span>
                      <div className="text-[11px] text-slate-300 font-mono mt-0.5">Target: {breachResult.query}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-rose-400 text-xs">
                    {breachResult.breaches.length} Breaches Detected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {breachResult.breaches.map((breach, idx) => (
                    <div key={idx} className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white">{breach.sourceName}</span>
                        <span className="text-[10px] font-mono text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded">
                          {breach.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {lang === 'hi' ? breach.descriptionHi : breach.description}
                      </p>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">{lang === 'hi' ? 'लीक डेटा:' : 'Exposed:'} </span>
                        <span className="text-amber-300">{breach.compromisedData.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mitigation Steps */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2">
                  <div className="font-bold text-emerald-400">
                    {lang === 'hi' ? 'तुरंत करने योग्य सुरक्षा उपाय:' : 'Immediate Remediation Checklist:'}
                  </div>
                  <ul className="text-slate-300 space-y-1 list-disc pl-4 text-[11px]">
                    <li>{lang === 'hi' ? 'इस ईमेल से जुड़े सभी पासवर्ड तुरंत बदलें और किसी भी अकाउंट में एक जैसा पासवर्ड न रखें।' : 'Change your master password immediately and never reuse credentials across services.'}</li>
                    <li>{lang === 'hi' ? 'अपने Google और महत्वपूर्ण खातों पर Two-Factor Authentication (2FA) चालू करें।' : 'Enable Authenticator-based 2FA (TOTP) on all critical personal & financial accounts.'}</li>
                    <li>{lang === 'hi' ? 'ब्राउज़र में सेव किए गए पासवर्ड्स को डिलीट करें क्योंकि इन्फो-स्टीलर मैलवेयर उन्हें चुरा लेते हैं।' : 'Avoid saving passwords directly in the browser; use an encrypted password manager.'}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-950/20 border border-emerald-900/30 rounded-lg text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">
                  {lang === 'hi' ? 'कोई सार्वजनिक लीक नहीं मिला!' : 'No Public Leaks Detected'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {lang === 'hi' 
                    ? `"${breachResult.query}" हमारे ज्ञात डेटाबेस में सुरक्षित है।`
                    : `No compromised records found for "${breachResult.query}". Stay vigilant with 2FA.`}
                </p>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: Password & Hash Security Lab */}
        {activeTab === 'password_lab' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6">
            
            <div className="max-w-2xl space-y-1">
              <h3 className="text-lg font-bold text-white">
                {lang === 'hi' ? 'पासवर्ड शक्ति & GPU क्रैकिंग लैब' : 'Password Entropy & Hash Lab'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'देखें कि आधुनिक RTX 4090 GPU क्लस्टर या क्वांटम कंप्यूटर को आपका पासवर्ड क्रैक करने में कितना समय लगेगा।'
                  : 'Benchmark entropy and calculate exact cracking times against 8x RTX 4090 GPU clusters.'}
              </p>
            </div>

            {/* Input Box */}
            <div className="max-w-xl space-y-2">
              <label className="block text-xs text-slate-300 font-medium">
                {lang === 'hi' ? 'टेस्ट करने के लिए पासवर्ड लिखें:' : 'Enter Password to Test:'}
              </label>
              <input
                type="text"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full bg-[#080D18] border border-slate-800 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            {passwordAnalysis && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Crack Times */}
                <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2 text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block">
                    {lang === 'hi' ? 'GPU क्लस्टर पर क्रैकिंग समय' : '8x RTX 4090 GPU Cluster'}
                  </span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {passwordAnalysis.crackTimeGpuCluster}
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                    Single CPU: <span className="text-slate-200">{passwordAnalysis.crackTimeCpu}</span>
                  </div>
                </div>

                {/* Entropy Bits */}
                <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2 text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block">
                    {lang === 'hi' ? 'एंट्रॉपी बिट्स' : 'Entropy Score'}
                  </span>
                  <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
                    {passwordAnalysis.entropyBits} Bits
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                    Rating: <span className="text-white font-medium">{passwordAnalysis.strength}</span>
                  </div>
                </div>

                {/* Generated SHA-256 Hash */}
                <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2 text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block flex justify-between items-center">
                    <span>SHA-256 Hash</span>
                    <button
                      onClick={() => handleCopy(passwordAnalysis.sha256 || '')}
                      className="text-cyan-400 hover:text-white"
                      title="Copy SHA-256"
                    >
                      {copiedText === passwordAnalysis.sha256 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                  <div className="font-mono text-[10px] text-slate-300 break-all select-all">
                    {passwordAnalysis.sha256}
                  </div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 truncate">
                    MD5: {passwordAnalysis.md5}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 4: Port & Exploit Audit */}
        {activeTab === 'ports' && (
          <div className="bg-[#0D1424] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6">
            <div className="max-w-2xl space-y-1">
              <h3 className="text-lg font-bold text-white">
                {lang === 'hi' ? 'सर्वर पोर्ट सुरक्षा & फ़ायरवॉल गाइड' : 'Server Port Hardening & Firewall Matrix'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'अगर आपके VPS (जैसे 54.252.142.201) पर अनावश्यक पोर्ट्स खुले हैं, तो हैकर्स उन पर ब्रूट-फोर्स हमला कर सकते हैं।'
                  : 'Automated remediation scripts to close open database ports and block brute-force scanners.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'hi' ? 'अनिवार्य सुरक्षा फ़ायरवॉल (Ubuntu)' : 'Essential UFW Firewall Rules'}</span>
                </span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'hi' ? 'केवल जरूरी पोर्ट्स (SSH और Web) खोलें, बाकी सब बंद करें:' : 'Allow only SSH and Web traffic, drop all incoming probes:'}
                </p>
                <div className="bg-black/40 p-2.5 rounded font-mono text-[11px] text-emerald-400 space-y-1">
                  <div>sudo ufw default deny incoming</div>
                  <div>sudo ufw default allow outgoing</div>
                  <div>sudo ufw allow 22/tcp</div>
                  <div>sudo ufw allow 80/tcp</div>
                  <div>sudo ufw allow 443/tcp</div>
                  <div>sudo ufw enable</div>
                </div>
              </div>

              <div className="p-4 bg-[#080D18] border border-slate-800 rounded-lg space-y-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'hi' ? 'Fail2Ban ब्रूट-फोर्स प्रोटेक्शन' : 'Fail2Ban Automated IP Ban'}</span>
                </span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'hi' ? '3 गलत पासवर्ड डालने पर हैकर का IP 24 घंटे के लिए अपने आप बैन हो जाएगा:' : 'Automatically ban botnets after 3 failed password attempts:'}
                </p>
                <div className="bg-black/40 p-2.5 rounded font-mono text-[11px] text-cyan-300 space-y-1">
                  <div>sudo apt install fail2ban -y</div>
                  <div>sudo systemctl enable fail2ban</div>
                  <div>sudo systemctl start fail2ban</div>
                  <div>sudo fail2ban-client status sshd</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
