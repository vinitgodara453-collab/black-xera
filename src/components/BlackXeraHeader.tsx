import React, { useState } from 'react';
import { Shield, Bell, Sun, Moon, Menu, X, ShieldAlert, ExternalLink, Sparkles, Check, Copy } from 'lucide-react';
import { AdminSettings } from '../types/blackxera';

interface BlackXeraHeaderProps {
  adminSettings: AdminSettings;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenRecharge: () => void;
  onOpenHostingGuide: () => void;
  pendingRechargesCount: number;
}

export const BlackXeraHeader: React.FC<BlackXeraHeaderProps> = ({
  adminSettings,
  isAdmin,
  onToggleAdmin,
  onOpenRecharge,
  onOpenHostingGuide,
  pendingRechargesCount
}) => {
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#07090E]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-wider text-white font-mono uppercase">
                  BLACK XERA
                </span>
                <span className="text-[9px] font-mono bg-blue-950/80 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded font-bold">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans tracking-tight">
                Instant TG & OTP Hub
              </p>
            </div>
          </div>

          {/* Right Action Icons (Matching screenshot: Bell, Sun/Moon, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin Control Badge */}
            <button
              onClick={onToggleAdmin}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAdmin 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-amber-400'
              }`}
              title="Admin Control Panel"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdmin ? 'Admin Mode (Active)' : 'Admin Control'}</span>
              {pendingRechargesCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1 rounded-full animate-pulse">
                  {pendingRechargesCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0d1322] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Announcements
                    </span>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed bg-[#070b14] p-3 rounded-xl border border-slate-800">
                    {adminSettings.announcement}
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> All server gateways operational 24/7
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle (Sun/Moon) */}
            <button
              onClick={() => setIsThemeDark(!isThemeDark)}
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isThemeDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger Drawer Menu */}
            <button
              onClick={() => setShowDrawer(true)}
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Side Drawer Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-72 sm:w-80 h-full bg-[#0B0F19] border-l border-slate-800 p-5 flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white font-mono">BLACK XERA</span>
                </div>
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => { setShowDrawer(false); onOpenRecharge(); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg bg-blue-600/20 text-blue-300 font-bold hover:bg-blue-600/30 transition-colors flex items-center justify-between"
                >
                  <span>💳 Add Wallet Balance (UPI)</span>
                  <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">QR Scan</span>
                </button>

                <button
                  onClick={() => { setShowDrawer(false); onOpenHostingGuide(); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-900/40 transition-colors flex items-center justify-between"
                >
                  <span>🚀 Free Website Hosting Guide</span>
                  <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">₹0 Free</span>
                </button>

                <button
                  onClick={() => { setShowDrawer(false); onToggleAdmin(); }}
                  className="w-full text-left py-2.5 px-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-900/40 transition-colors flex items-center justify-between"
                >
                  <span>🛠️ Admin Control Dashboard</span>
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">Owner</span>
                </button>

                <a
                  href={adminSettings.supportTelegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left py-2.5 px-3 rounded-lg bg-[#0e1628] text-slate-300 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>💬 Telegram Live Support</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={adminSettings.channelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left py-2.5 px-3 rounded-lg bg-[#0e1628] text-slate-300 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>📢 Official Updates Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Owner UPI Footer Info */}
            <div className="p-3 bg-[#070A12] border border-slate-800 rounded-xl space-y-1 text-[11px] font-mono text-slate-400">
              <div className="text-white font-bold">Official UPI Account:</div>
              <div className="text-cyan-400">{adminSettings.ownerUpi}</div>
              <div className="text-slate-500 text-[10px]">Owner: {adminSettings.ownerName}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
