import React, { useState } from 'react';
import { Terminal, Copy, Check, Key, Smartphone, Monitor, Shield, ArrowRight } from 'lucide-react';

interface SshCommandBuilderProps {
  initialIp?: string;
  initialUser?: string;
  lang: 'hi' | 'en';
}

export const SshCommandBuilder: React.FC<SshCommandBuilderProps> = ({
  initialIp = '54.252.142.201',
  initialUser = 'ubuntu',
  lang,
}) => {
  const [ip, setIp] = useState(initialIp);
  const [user, setUser] = useState(initialUser);
  const [useKey, setUseKey] = useState(false);
  const [keyPath, setKeyPath] = useState('my-key.pem');
  const [port, setPort] = useState('22');
  const [platform, setPlatform] = useState<'windows' | 'mac' | 'android'>('windows');
  const [copied, setCopied] = useState(false);

  const command = useKey
    ? port === '22'
      ? `ssh -i ${keyPath} ${user}@${ip}`
      : `ssh -i ${keyPath} -p ${port} ${user}@${ip}`
    : port === '22'
      ? `ssh ${user}@${ip}`
      : `ssh -p ${port} ${user}@${ip}`;

  const chmodCommand = platform !== 'windows' && useKey ? `chmod 400 ${keyPath}\n` : '';
  const fullCommandToCopy = `${chmodCommand}${command}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommandToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0C1220] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Terminal className="w-4 h-4" />
            <span>{lang === 'hi' ? 'SSH कनेक्शन हेल्पर' : 'SSH Connection Generator'}</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'अपने सर्वर में 1 क्लिक में लॉग इन करें' : 'Connect to Ubuntu Server via SSH'}
          </h3>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-md text-xs">
          <button
            onClick={() => setPlatform('windows')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              platform === 'windows' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows</span>
          </button>
          <button
            onClick={() => setPlatform('mac')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              platform === 'mac' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Mac/Linux</span>
          </button>
          <button
            onClick={() => setPlatform('android')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              platform === 'android' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android (Termux)</span>
          </button>
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 font-medium mb-1">
            {lang === 'hi' ? 'सर्वर IP एड्रेस:' : 'Server IP Address:'}
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">
            {lang === 'hi' ? 'यूजरनेम:' : 'SSH User:'}
          </label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
          />
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {lang === 'hi' ? 'AWS पर: "ubuntu" | Hetzner/RackNerd पर: "root"' : 'AWS: "ubuntu" · Hetzner/RackNerd: "root"'}
          </span>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">
            {lang === 'hi' ? 'SSH पोर्ट:' : 'SSH Port:'}
          </label>
          <input
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Key Auth Toggle */}
      <div className="flex items-center gap-3 pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input
            type="checkbox"
            checked={useKey}
            onChange={(e) => setUseKey(e.target.checked)}
            className="rounded border-slate-700 text-blue-600 focus:ring-0"
          />
          <span>{lang === 'hi' ? 'SSH की-फाइल (.pem / .id_rsa) इस्तेमाल करें' : 'Use SSH Key file (.pem / .id_rsa)'}</span>
        </label>

        {useKey && (
          <input
            type="text"
            value={keyPath}
            onChange={(e) => setKeyPath(e.target.value)}
            placeholder="path/to/key.pem"
            className="bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
          />
        )}
      </div>

      {/* Generated Terminal Box */}
      <div className="bg-[#080B12] border border-slate-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F19] border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span className="font-mono text-slate-400 text-[11px] ml-2">
              {platform === 'windows' ? 'PowerShell / Command Prompt' : platform === 'mac' ? 'Terminal (bash/zsh)' : 'Termux Mobile Terminal'}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'कमांड कॉपी करें' : 'Copy Command'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 font-mono text-xs sm:text-sm text-emerald-400 space-y-1 overflow-x-auto">
          {platform !== 'windows' && useKey && (
            <div className="text-slate-400">
              <span className="text-slate-400 select-none">$ </span>
              <span>chmod 400 {keyPath}</span>
            </div>
          )}
          <div>
            <span className="text-slate-400 select-none">$ </span>
            <span className="text-white font-semibold">{command}</span>
          </div>
        </div>
      </div>

      {/* Platform Instructions */}
      <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded text-xs text-slate-300 space-y-1">
        <div className="font-semibold text-slate-200">
          {platform === 'windows' && (lang === 'hi' ? 'Windows यूज़र्स के लिए निर्देश:' : 'Windows Instructions:')}
          {platform === 'mac' && (lang === 'hi' ? 'Mac / Linux यूज़र्स के लिए निर्देश:' : 'Mac / Linux Instructions:')}
          {platform === 'android' && (lang === 'hi' ? 'Android मोबाइल यूज़र्स के लिए निर्देश:' : 'Android Instructions:')}
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          {platform === 'windows' && (lang === 'hi' 
            ? 'Windows 10/11 में Start दबाकर "cmd" या "powershell" खोलें, ऊपर दी गई कमांड पेस्ट करें और Enter दबाएं। पासवर्ड मांगे तो पासवर्ड टाइप करें (टाइप करते समय स्क्रीन पर दिखेगा नहीं, यह सामान्य है)।' 
            : 'Open PowerShell or Command Prompt, paste the command above, and hit Enter. Type your server password when prompted (input is hidden by default).')}
          {platform === 'mac' && (lang === 'hi' 
            ? 'Spotlight से "Terminal" खोलें, कमांड पेस्ट करें। अगर Key फाइल इस्तेमाल कर रहे हैं तो सुनिश्चित करें कि उस फाइल का परमिशन `chmod 400` हो।' 
            : 'Open Terminal, paste the command. If using an SSH key, ensure file permissions are restricted via `chmod 400`.')}
          {platform === 'android' && (lang === 'hi' 
            ? 'Google Play Store से "Termux" या "JuiceSSH" इनस्टॉल करें। Termux में पहले `pkg install openssh` चलाएं, फिर ऊपर वाली कमांड से लॉग इन करें।' 
            : 'Install "Termux" from F-Droid or Play Store. Run `pkg install openssh`, then paste the command to manage your VPS straight from your smartphone.')}
        </p>
      </div>

    </div>
  );
};
