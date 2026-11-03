import React, { useState } from 'react';
import { AnalyticsSummary, TransactionRecord } from '../types/qrcodes';
import { 
  Users, 
  IndianRupee, 
  ScanLine, 
  TrendingUp, 
  Smartphone, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  CreditCard, 
  ArrowUpRight,
  Sparkles,
  Calendar
} from 'lucide-react';

interface AnalyticsDashboardProps {
  lang: 'hi' | 'en';
  analytics: AnalyticsSummary;
  transactions: TransactionRecord[];
  onSimulateScan: () => void;
  onSimulatePayment: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  lang,
  analytics,
  transactions,
  onSimulateScan,
  onSimulatePayment,
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'all' | '30d' | '7d'>('all');

  return (
    <section id="analytics" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header & Live Simulators */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'लाइव यूजर ट्रैफ़िक & कमाई रिपोर्ट' : 'Live User Traffic & Revenue Intelligence'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Real-Time Sync</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {lang === 'hi' ? 'कितने यूजर आए & कितना पेमेंट हुआ (डैशबोर्ड)' : 'User Traffic & Payment Revenue Dashboard'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'hi'
                ? 'आपके सभी QR कोड्स पर कितने लोगों ने स्कैन किया और UPI से कितनी कुल कमाई हुई, उसका पूरा लाइव हिसाब।'
                : 'Complete real-time breakdown of user scans, unique visitor devices, and total UPI payments received.'}
            </p>
          </div>

          {/* Interactive Simulation Buttons to see numbers update */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onSimulateScan}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Click to simulate a real user scanning a code"
            >
              <ScanLine className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'hi' ? '+1 यूजर स्कैन टेस्ट' : '+1 Scan Test'}</span>
            </button>

            <button
              onClick={onSimulatePayment}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
              title="Click to simulate a user buying Pro VIP via UPI"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? '+₹299 पेमेंट जोड़ें' : '+₹299 Payment Test'}</span>
            </button>
          </div>
        </div>

        {/* 4 PRIMARY STATS METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Total Scans (Kitne User Aaye) */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">{lang === 'hi' ? 'कुल यूजर स्कैन्स' : 'Total User Scans'}</span>
              <ScanLine className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
              {analytics.totalScans.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2 font-mono">
              <span>{lang === 'hi' ? 'आज के स्कैन्स:' : 'Today:'} <strong className="text-emerald-400">+{analytics.todayScans}</strong></span>
              <span className="text-slate-400">({analytics.uniqueUsers} {lang === 'hi' ? 'यूनीक' : 'unique'})</span>
            </div>
          </div>

          {/* Stat 2: Total Revenue (Kitna Payment Hua) */}
          <div className="p-5 bg-[#0D1424] border border-emerald-900/40 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span className="font-medium">{lang === 'hi' ? 'कुल कमाई / पेमेंट्स (UPI)' : 'Total Revenue (UPI)'}</span>
              <IndianRupee className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              ₹{analytics.totalRevenueInr.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2 font-mono">
              <span>{lang === 'hi' ? 'आज की कमाई:' : 'Today:'} <strong className="text-emerald-400">+₹{analytics.todayRevenueInr}</strong></span>
              <span className="text-emerald-400/90 font-semibold">{transactions.length} orders</span>
            </div>
          </div>

          {/* Stat 3: Active Dynamic Codes */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">{lang === 'hi' ? 'सक्रिय QR कोड्स' : 'Active QR Codes'}</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
              {analytics.activeQrs}
            </div>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
              100% Uptime · Real-time redirects
            </div>
          </div>

          {/* Stat 4: Average Order Value */}
          <div className="p-5 bg-[#0D1424] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">{lang === 'hi' ? 'औसत पेमेंट वैल्यू' : 'Avg Order Value'}</span>
              <CreditCard className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
              ₹{transactions.length > 0 ? Math.round(analytics.totalRevenueInr / transactions.length) : 0}
            </div>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
              Direct to UPI (Zero commission)
            </div>
          </div>

        </div>

        {/* 7-DAY ACTIVITY & DEVICE/LOCATION BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Daily Trend Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {lang === 'hi' ? 'दैनिक स्कैन्स और कमाई का ट्रेंड (पिछले 7 दिन)' : 'Daily Scans & Revenue Growth (Last 7 Days)'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'hi' ? 'यूज़र्स द्वारा स्कैन करने की गति और पेमेंट ग्राफ' : 'Growth trajectory of scans and UPI conversions'}
                </p>
              </div>
            </div>

            {/* Simulated Bar Graph */}
            <div className="space-y-3 pt-2">
              {analytics.dailyActivity.map((day, idx) => {
                const maxScans = 1000;
                const scanWidth = Math.min(100, Math.round((day.scans / maxScans) * 100));

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-semibold">{day.date}</span>
                      <div className="space-x-3">
                        <span className="text-cyan-400">{day.scans} scans</span>
                        <span className="text-emerald-400 font-bold">₹{day.revenue}</span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-[#080D18] rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300" 
                        style={{ width: `${scanWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device & Location Split (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Devices Card */}
            <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'hi' ? 'यूज़र किस डिवाइस से आए? (Devices)' : 'Scanning Devices & Apps'}</span>
              </h3>

              <div className="space-y-2 text-xs">
                {analytics.devices.map((dev, i) => (
                  <div key={i} className="p-2.5 bg-[#080D18] border border-slate-800 rounded-lg space-y-1">
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-200">{dev.name}</span>
                      <span className="text-cyan-400 font-bold">{dev.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${dev.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'टॉप शहर जहाँ से स्कैन हुए' : 'Top Scanning Cities'}</span>
              </h3>

              <div className="space-y-1.5 text-xs">
                {analytics.locations.map((loc, i) => (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-slate-800/60 font-mono text-[11px]">
                    <span className="text-slate-300">{loc.city}</span>
                    <span className="text-emerald-400 font-bold">{loc.scans} scans ({loc.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* PAYMENT TRANSACTIONS TABLE (Kitna Payment Hua Detailed Records) */}
        <div className="bg-[#0D1424] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base">
                {lang === 'hi' ? 'ताज़ा UPI पेमेंट्स की सूची (Recent Payment Records)' : 'Recent UPI Transactions'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'ग्राहकों द्वारा सीधे आपके UPI पर भेजे गए पेमेंट्स और 12-अंकों का UTR नंबर'
                  : 'Verified customer orders with 12-digit bank UTR numbers'}
              </p>
            </div>
            <span className="font-mono text-emerald-400 font-bold text-xs">
              Total: ₹{analytics.totalRevenueInr.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#080D18] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'ग्राहक' : 'Buyer'}</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'प्लान' : 'Plan'}</th>
                  <th className="py-3 px-3 font-mono">{lang === 'hi' ? 'रकम (₹)' : 'Amount'}</th>
                  <th className="py-3 px-3 font-mono">Bank UTR / Ref</th>
                  <th className="py-3 px-3">{lang === 'hi' ? 'तारीख & समय' : 'Date'}</th>
                  <th className="py-3 px-3 text-right">{lang === 'hi' ? 'स्टेटस' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-cyan-400 font-bold whitespace-nowrap">{tx.id}</td>
                    <td className="py-3 px-3 text-white font-sans font-medium whitespace-nowrap">
                      <div>{tx.buyerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{tx.buyerPhoneOrEmail}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans whitespace-nowrap">{tx.planName}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold whitespace-nowrap">₹{tx.amountInr}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{tx.utrNumber}</td>
                    <td className="py-3 px-3 text-slate-400 font-sans text-[11px] whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-sans font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
