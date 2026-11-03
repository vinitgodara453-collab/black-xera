import React from 'react';
import { Home, ListOrdered, History, Headphones, User } from 'lucide-react';

export type BlackXeraTab = 'home' | 'orders' | 'history' | 'support' | 'account';

interface BlackXeraBottomNavProps {
  activeTab: BlackXeraTab;
  onSelectTab: (tab: BlackXeraTab) => void;
  ordersCount: number;
}

export const BlackXeraBottomNav: React.FC<BlackXeraBottomNavProps> = ({
  activeTab,
  onSelectTab,
  ordersCount
}) => {
  const tabs = [
    { id: 'home' as BlackXeraTab, label: 'Home', icon: Home },
    { id: 'orders' as BlackXeraTab, label: 'Orders', icon: ListOrdered, badge: ordersCount },
    { id: 'history' as BlackXeraTab, label: 'History', icon: History },
    { id: 'support' as BlackXeraTab, label: 'Support', icon: Headphones },
    { id: 'account' as BlackXeraTab, label: 'Account', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070A11]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 safe-bottom">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-blue-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-500' : ''}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-[9px] font-mono px-1 rounded-full font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-sans mt-1 tracking-tight ${isActive ? 'text-blue-500 font-bold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
