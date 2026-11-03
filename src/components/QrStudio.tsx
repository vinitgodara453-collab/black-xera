import React, { useState, useEffect } from 'react';
import { QrType, QrStyleOptions, QrItem } from '../types/qrcodes';
import { generateQrDataUrl, generateQrSvg } from '../utils/qrGenerator';
import { 
  Globe, 
  Smartphone, 
  Wifi, 
  MessageSquare, 
  UserSquare2, 
  FileText, 
  Download, 
  Sparkles, 
  Save, 
  Check, 
  Copy, 
  Palette, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface QrStudioProps {
  lang: 'hi' | 'en';
  onSaveCode: (item: QrItem) => void;
  isVip: boolean;
  onOpenPricing: () => void;
}

export const QrStudio: React.FC<QrStudioProps> = ({
  lang,
  onSaveCode,
  isVip,
  onOpenPricing,
}) => {
  const [qrType, setQrType] = useState<QrType>('url');
  const [title, setTitle] = useState('My Brand Website');
  
  // Content state by type
  const [urlInput, setUrlInput] = useState('https://mybusiness.com');
  const [upiId, setUpiId] = useState('bajranggodara930@okaxis');
  const [upiName, setUpiName] = useState('Bajrang Godara');
  const [upiAmount, setUpiAmount] = useState('499');
  const [wifiSsid, setWifiSsid] = useState('MyHome_WiFi');
  const [wifiPass, setWifiPass] = useState('supersecret123');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  const [waPhone, setWaPhone] = useState('+919829000000');
  const [waMessage, setWaMessage] = useState('Hello! I want to inquire about your services.');
  const [vcardName, setVcardName] = useState('Bajrang Godara');
  const [vcardPhone, setVcardPhone] = useState('+91 98290 00000');
  const [vcardEmail, setVcardEmail] = useState('bajranggodara930@gmail.com');
  const [textInput, setTextInput] = useState('Welcome to our digital platform!');

  // Styling state
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [frameStyle, setFrameStyle] = useState<'none' | 'simple' | 'badge' | 'scanme'>('scanme');
  const [frameText, setFrameText] = useState('SCAN ME');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Preview & output
  const [qrImageUrl, setQrImageUrl] = useState<string>('');
  const [isDynamic, setIsDynamic] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Generate payload string
  const getRawContent = (): string => {
    switch (qrType) {
      case 'url':
        return urlInput.trim().startsWith('http') ? urlInput.trim() : `https://${urlInput.trim()}`;
      case 'upi':
        const cleanPa = upiId.trim();
        const cleanPn = encodeURIComponent(upiName.trim());
        const amParam = upiAmount ? `&am=${upiAmount.trim()}` : '';
        return `upi://pay?pa=${cleanPa}&pn=${cleanPn}${amParam}&cu=INR`;
      case 'wifi':
        return `WIFI:S:${wifiSsid.trim()};T:${wifiSecurity};P:${wifiPass};;`;
      case 'whatsapp':
        const cleanPhone = waPhone.replace(/\D/g, '');
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage.trim())}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case 'text':
      default:
        return textInput.trim();
    }
  };

  const styleOptions: QrStyleOptions = {
    fgColor,
    bgColor,
    frameStyle,
    frameText,
    errorCorrectionLevel: errorCorrection,
    size: 280,
  };

  useEffect(() => {
    const raw = getRawContent();
    generateQrDataUrl(raw, styleOptions).then(setQrImageUrl);
  }, [qrType, urlInput, upiId, upiName, upiAmount, wifiSsid, wifiPass, wifiSecurity, waPhone, waMessage, vcardName, vcardPhone, vcardEmail, textInput, fgColor, bgColor, frameStyle, frameText, errorCorrection]);

  const handleDownloadPng = () => {
    const a = document.createElement('a');
    a.href = qrImageUrl;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = async () => {
    const raw = getRawContent();
    const svgData = await generateQrSvg(raw, styleOptions);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveToDashboard = () => {
    const raw = getRawContent();
    const newItem: QrItem = {
      id: `qr-${Date.now()}`,
      title: title.trim() || 'Untitled QR Code',
      type: qrType,
      rawContent: raw,
      dynamicUrl: isDynamic ? raw : undefined,
      style: styleOptions,
      createdAt: new Date().toISOString().split('T')[0],
      scansCount: 0,
      isDynamic,
      status: 'active',
    };
    onSaveCode(newItem);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section className="py-8 sm:py-12 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Kicker */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 font-mono">
            <span>{lang === 'hi' ? 'स्मार्ट QR कोड जनरेटर' : 'Smart Dynamic QR Studio'}</span>
            <span aria-hidden="true">·</span>
            <span>HD Vector & Analytics Enabled</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'hi' ? 'कस्टम डायनामिक QR कोड बनाएं' : 'Create & Customize Dynamic QR Codes'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi'
              ? 'वेबसाइट, UPI पेमेंट, WiFi या WhatsApp के लिए सुंदर और हाई-क्वालिटी QR कोड्स बनाएं और उनके स्कैन्स ट्रैक करें।'
              : 'Generate branded, trackable QR codes for websites, UPI payments, Wi-Fi, and contacts with live scan analytics.'}
          </p>
        </div>

        {/* Studio Grid: Controls Left, Live Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
            
            {/* Step 1: Select Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                {lang === 'hi' ? '1. QR कोड का प्रकार चुनें:' : '1. Select Content Type:'}
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'url', label: 'Website', icon: <Globe className="w-4 h-4" /> },
                  { id: 'upi', label: 'UPI Pay', icon: <Smartphone className="w-4 h-4" /> },
                  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
                  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-4 h-4" /> },
                  { id: 'vcard', label: 'Contact', icon: <UserSquare2 className="w-4 h-4" /> },
                  { id: 'text', label: 'Text/SMS', icon: <FileText className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setQrType(item.id as QrType);
                      if (item.id === 'upi') setFrameText('PAY VIA UPI');
                      else if (item.id === 'wifi') setFrameText('FREE WIFI');
                      else if (item.id === 'whatsapp') setFrameText('WHATSAPP');
                      else setFrameText('SCAN ME');
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      qrType === item.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                        : 'bg-[#080D18] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-[11px] truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Content Fields based on type */}
            <div className="space-y-3 p-4 bg-[#080D18] border border-slate-800 rounded-lg">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'hi' ? '2. डेटा दर्ज करें:' : '2. Enter Data / Details:'}
              </label>

              {/* Title input */}
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {lang === 'hi' ? 'QR कोड का नाम / टाइटल:' : 'Code Label / Title:'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* TYPE: URL */}
              {qrType === 'url' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'hi' ? 'वेबसाइट URL लिंक:' : 'Destination Website URL:'}
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-2 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* TYPE: UPI */}
              {qrType === 'upi' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {lang === 'hi' ? 'UPI ID (VPA):' : 'UPI ID (VPA):'}
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. bajranggodara930@okaxis"
                        className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {lang === 'hi' ? 'प्राप्तकर्ता का नाम (Payee Name):' : 'Payee Name:'}
                      </label>
                      <input
                        type="text"
                        value={upiName}
                        onChange={(e) => setUpiName(e.target.value)}
                        placeholder="e.g. Bajrang Godara"
                        className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'hi' ? 'रकम (Amount ₹) [खाली छोड़ सकते हैं]:' : 'Fixed Amount (INR) [Optional]:'}
                    </label>
                    <input
                      type="number"
                      value={upiAmount}
                      onChange={(e) => setUpiAmount(e.target.value)}
                      placeholder="e.g. 499"
                      className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* TYPE: WiFi */}
              {qrType === 'wifi' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">WiFi SSID (Network Name):</label>
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Password:</label>
                      <input
                        type="text"
                        value={wifiPass}
                        onChange={(e) => setWifiPass(e.target.value)}
                        className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TYPE: WhatsApp */}
              {qrType === 'whatsapp' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">WhatsApp Mobile (+91...):</label>
                    <input
                      type="text"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Pre-filled Message:</label>
                    <input
                      type="text"
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* TYPE: Text */}
              {qrType === 'text' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Text Message / Note:</label>
                  <textarea
                    rows={2}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full bg-[#0D1424] border border-slate-700/80 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

            </div>

            {/* Step 3: Custom Styling & Frames */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'hi' ? '3. स्टाइल, फ्रेम & रंग (Customization):' : '3. Frame & Visual Styling:'}
              </label>

              {/* Frame Style */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'scanme', label: 'Scan Me Frame' },
                  { id: 'badge', label: 'Badge Frame' },
                  { id: 'simple', label: 'Border Box' },
                  { id: 'none', label: 'No Frame (Clean)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrameStyle(f.id as any)}
                    className={`py-2 px-2 text-[11px] font-medium rounded border transition-colors cursor-pointer text-center ${
                      frameStyle === f.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                        : 'bg-[#080D18] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {frameStyle !== 'none' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'hi' ? 'फ्रेम का टेक्स्ट (CTA Text):' : 'Callout Text:'}
                  </label>
                  <input
                    type="text"
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    className="w-full bg-[#080D18] border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'hi' ? 'QR का रंग (Foreground):' : 'QR Color (Dark):'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 bg-[#080D18] border border-slate-800 rounded px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'hi' ? 'बैकग्राउंड रंग (Light):' : 'Background Color:'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 bg-[#080D18] border border-slate-800 rounded px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Live Preview Column (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 sticky top-20">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {lang === 'hi' ? 'लाइव प्रीव्यू' : 'Live Preview'}
                </span>
                <h3 className="font-bold text-white text-base truncate">{title}</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                READY TO SCAN
              </span>
            </div>

            {/* The Rendered QR Image Container */}
            <div className="flex flex-col items-center justify-center p-6 bg-[#070B14] border border-slate-800 rounded-xl shadow-inner min-h-[300px]">
              {qrImageUrl ? (
                <img
                  src={qrImageUrl}
                  alt="Generated QR Code"
                  className="max-w-[260px] max-h-[320px] object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-xs text-slate-500">Generating live QR...</div>
              )}
              <span className="text-[11px] text-slate-400 font-mono mt-3">
                {lang === 'hi' ? 'अपने फोन के कैमरे से स्कैन करके टेस्ट करें' : 'Scan with your smartphone camera to test'}
              </span>
            </div>

            {/* Download Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>

              <button
                onClick={handleDownloadSvg}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700/80 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Vector SVG</span>
              </button>
            </div>

            {/* Save & Track Code Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleSaveToDashboard}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{lang === 'hi' ? 'डैशबोर्ड में सेव हो गया!' : 'Saved to My Codes & Tracking Active!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'डैशबोर्ड में सेव करें (ट्रैकिंग ऑन)' : 'Save & Track Scans (Dynamic)'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
