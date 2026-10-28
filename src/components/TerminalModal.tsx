import React, { useState } from 'react';
import { X, Terminal as TerminalIcon, Copy, Check, Play, CornerDownLeft } from 'lucide-react';
import { SshCommandBuilder } from './SshCommandBuilder';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'hi' | 'en';
  defaultIp?: string;
  defaultUser?: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultIp = '54.252.142.201',
  defaultUser = 'ubuntu',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0C1220] border border-slate-800 rounded-lg max-w-2xl w-full p-6 space-y-4 relative max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
          <TerminalIcon className="w-4 h-4" />
          <span>{lang === 'hi' ? 'SSH टर्मिनल और लॉगिन टूल' : 'SSH Terminal & Connection Helper'}</span>
        </div>

        <SshCommandBuilder
          initialIp={defaultIp}
          initialUser={defaultUser}
          lang={lang}
        />

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded border border-slate-800 transition-colors"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
