import React, { useState } from 'react';
import { QrItem } from '../types/qrcodes';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { 
  QrCode, 
  Download, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Check, 
  Copy, 
  Globe, 
  Smartphone, 
  Wifi, 
  MessageSquare,
  ScanLine
} from 'lucide-react';

interface MyCodesManagerProps {
  lang: 'hi' | 'en';
  codes: QrItem[];
  onUpdateCode: (updated: QrItem) => void;
  onDeleteCode: (id: string) => void;
  onOpenCreate: () => void;
}

export const MyCodesManager: React.FC<MyCodesManagerProps> = ({
  lang,
  codes,
  onUpdateCode,
  onDeleteCode,
  onOpenCreate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [downloadUrls, setDownloadUrls] = useState<Record<string, string>>({});

  React.useEffect(() => {
    codes.forEach(async (c) => {
      const url = await generateQrDataUrl(c.dynamicUrl || c.rawContent, c.style);
      setDownloadUrls(prev => ({ ...prev, [c.id]: url }));
    });
  }, [codes]);

  const startEdit = (code: QrItem) => {
    setEditingId(code.id);
    setEditUrl(code.dynamicUrl || code.rawContent);
  };

  const saveEdit = (code: QrItem) => {
    onUpdateCode({
      ...code,
      dynamicUrl: editUrl.trim(),
      rawContent: editUrl.trim(),
    });
    setEditingId(null);
  };

  const handleDownload = (code: QrItem) => {
    const dataUrl = downloadUrls[code.id];
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${code.title.toLowerCase().replace(/\s+/g, '_')}_qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#080C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 font-mono mb-1">
              <QrCode className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रबंधित कोड्स' : 'Managed Dynamic QR Codes'}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {lang === 'hi' ? 'मेरे सभी QR कोड्स & री-डायरेक्शन' : 'My Active QR Codes & Dynamic Links'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'hi'
                ? 'यहाँ से आप कभी भी अपने QR कोड का लिंक बदल सकते हैं, बिना दोबारा प्रिंट किए!'
                : 'Update destination URLs anytime without reprinting your printed QR codes.'}
            </p>
          </div>

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>{lang === 'hi' ? '+ नया QR कोड बनाएं' : '+ Create New QR'}</span>
          </button>
        </div>

        {/* Codes Grid */}
        {codes.length === 0 ? (
          <div className="p-12 text-center bg-[#0D1424] border border-slate-800 rounded-xl space-y-3">
            <QrCode className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="font-bold text-white text-sm">
              {lang === 'hi' ? 'अभी कोई QR कोड नहीं बनाया गया है' : 'No QR codes created yet'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'ऊपर दिए गए बटन से अपना पहला डायनामिक या UPI पेमेंट QR कोड बनाएं।'
                : 'Click the button above to generate your first custom trackable QR code.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {codes.map((code) => {
              const imgUrl = downloadUrls[code.id];
              const isEditing = editingId === code.id;

              return (
                <div
                  key={code.id}
                  className="bg-[#0D1424] border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-colors space-y-4"
                >
                  <div className="space-y-3">
                    
                    {/* Top Row: Type & Scans */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-indigo-400 uppercase font-semibold">
                        {code.type.toUpperCase()} · {code.isDynamic ? 'DYNAMIC' : 'STATIC'}
                      </span>
                      <span className="font-mono font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                        <ScanLine className="w-3.5 h-3.5" />
                        <span>{code.scansCount} scans</span>
                      </span>
                    </div>

                    {/* QR Thumbnail & Title */}
                    <div className="flex items-center gap-3 bg-[#080D18] border border-slate-800 p-2.5 rounded-lg">
                      <div className="w-16 h-16 bg-white rounded p-1 shrink-0 flex items-center justify-center">
                        {imgUrl ? (
                          <img src={imgUrl} alt={code.title} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-slate-200 animate-pulse" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-white text-sm truncate">{code.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          Created: {code.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Target / Content Box */}
                    <div className="text-xs space-y-1">
                      <span className="text-slate-400 text-[11px] font-medium block">
                        {lang === 'hi' ? 'डेस्टिनेशन / टारगेट लिंक:' : 'Destination Target:'}
                      </span>
                      
                      {isEditing ? (
                        <div className="flex gap-1.5 pt-1">
                          <input
                            type="text"
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className="flex-1 bg-[#080D18] border border-indigo-500 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none"
                          />
                          <button
                            onClick={() => saveEdit(code)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-[#080D18] border border-slate-800/80 rounded font-mono text-[11px] text-slate-300">
                          <span className="truncate max-w-[200px]">{code.dynamicUrl || code.rawContent}</span>
                          <button
                            onClick={() => startEdit(code)}
                            className="text-indigo-400 hover:text-white p-1 ml-1"
                            title="Edit URL anytime"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownload(code)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={() => onDeleteCode(code.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                      title="Delete QR Code"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
