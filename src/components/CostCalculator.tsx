import React, { useState } from 'react';
import { VPS_PROVIDERS } from '../data/vpsProviders';
import { TrendingDown, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CostCalculatorProps {
  currency: 'INR' | 'USD';
  lang: 'hi' | 'en';
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ currency, lang }) => {
  const [ramSelection, setRamSelection] = useState<number>(2); // 2GB RAM
  const [months, setMonths] = useState<number>(12); // 12 months

  // AWS EC2 monthly calculation based on RAM:
  // 1GB: t3.micro ~$8.50 + $3.65 IPv4 + $2.70 EBS + $3.50 egress = ~$18.35/mo
  // 2GB: t3.small ~$17.00 + $3.65 IPv4 + $3.00 EBS + $4.00 egress = ~$27.65/mo
  // 4GB: t3.medium ~$34.00 + $3.65 IPv4 + $4.00 EBS + $5.00 egress = ~$46.65/mo
  // 8GB: t3.large ~$68.00 + $3.65 IPv4 + $5.00 EBS + $6.00 egress = ~$82.65/mo
  const getEc2CostPerMonthUsd = (ram: number) => {
    switch (ram) {
      case 1:
        return 18.35;
      case 2:
        return 27.65;
      case 4:
        return 46.65;
      case 8:
        return 82.65;
      default:
        return 27.65;
    }
  };

  // Best alternative cost per month based on RAM:
  const getAlternativePlan = (ram: number) => {
    if (ram === 1) {
      return {
        name: 'RackNerd / Lightsail',
        monthlyUsd: 1.15,
        monthlyInr: 99,
        specs: '1 vCPU, 1.5GB RAM, 30GB SSD, 3TB Bandwidth'
      };
    } else if (ram === 2) {
      return {
        name: 'Hetzner Cloud CX22',
        monthlyUsd: 4.10,
        monthlyInr: 349,
        specs: '2 vCPU, 4GB RAM (gives double RAM!), 40GB NVMe, 20TB Bandwidth'
      };
    } else if (ram === 4) {
      return {
        name: 'Hetzner Cloud CX22',
        monthlyUsd: 4.10,
        monthlyInr: 349,
        specs: '2 vCPU, 4GB RAM, 40GB NVMe, 20TB Bandwidth'
      };
    } else {
      return {
        name: 'Contabo Cloud VPS S',
        monthlyUsd: 5.50,
        monthlyInr: 460,
        specs: '4 vCPU Cores, 8GB RAM, 50GB NVMe, 32TB Bandwidth'
      };
    }
  };

  const ec2MonthlyUsd = getEc2CostPerMonthUsd(ramSelection);
  const ec2MonthlyInr = Math.round(ec2MonthlyUsd * 84);

  const altPlan = getAlternativePlan(ramSelection);
  const altMonthlyUsd = altPlan.monthlyUsd;
  const altMonthlyInr = altPlan.monthlyInr;

  const totalEc2Usd = ec2MonthlyUsd * months;
  const totalEc2Inr = ec2MonthlyInr * months;

  const totalAltUsd = altMonthlyUsd * months;
  const totalAltInr = altMonthlyInr * months;

  const savedUsd = totalEc2Usd - totalAltUsd;
  const savedInr = totalEc2Inr - totalAltInr;
  const percentageSaved = Math.round((savedUsd / totalEc2Usd) * 100);

  return (
    <section id="calculator" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
            <span>{lang === 'hi' ? 'लागत और बचत तुलना' : 'Interactive Cost & Savings Calculator'}</span>
            <span aria-hidden="true">·</span>
            <span>AWS EC2 vs Budget VPS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {lang === 'hi' 
              ? 'AWS EC2 (54.252...) के मुकाबले आप कितने पैसे बचा सकते हैं?' 
              : 'How much money do you save switching from AWS EC2?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            {lang === 'hi'
              ? 'RAM और समय चुनें, और देखें कि बजट प्रोवाइडर से आपको समान या बेहतर स्पीड में कितनी बड़ी बचत होती है।'
              : 'Select your server RAM and duration to see real-time savings with equivalent or superior specs.'}
          </p>
        </div>

        {/* Interactive Controls & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#0D1424] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-6">
            
            {/* RAM Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                {lang === 'hi' ? 'सर्वर RAM चुनें:' : 'Select Server RAM:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 4, 8].map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setRamSelection(ram)}
                    className={`py-2 px-3 text-xs font-semibold rounded transition-colors ${
                      ramSelection === ram
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {ram} GB
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                <span>{lang === 'hi' ? 'अवधि (Duration):' : 'Duration (Months):'}</span>
                <span className="font-mono font-bold text-blue-400">{months} {lang === 'hi' ? 'महीने' : 'Months'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 mo</span>
                <span>6 mo</span>
                <span>12 mo (1 yr)</span>
                <span>24 mo (2 yr)</span>
              </div>
            </div>

            {/* Alternative Recommended Spec */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded text-xs space-y-1.5">
              <div className="text-slate-400 font-medium">
                {lang === 'hi' ? 'सुझाया गया विकल्प:' : 'Recommended Alternative:'}
              </div>
              <div className="text-white font-bold">{altPlan.name}</div>
              <div className="text-slate-300 text-[11px] font-mono">{altPlan.specs}</div>
            </div>
          </div>

          {/* Results Comparison Column */}
          <div className="lg:col-span-7 bg-[#0C1220] border border-slate-800 rounded-lg p-5 sm:p-6 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* AWS EC2 Box */}
              <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-lg space-y-2">
                <div className="text-xs text-rose-300 font-medium">
                  {lang === 'hi' ? 'AWS EC2 का खर्च (54.252...)' : 'AWS EC2 Cost (Current)'}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-400 tabular-nums">
                  {currency === 'INR' ? `₹${totalEc2Inr.toLocaleString('en-IN')}` : `$${totalEc2Usd.toFixed(2)}`}
                </div>
                <div className="text-[11px] text-slate-400">
                  {currency === 'INR' ? `₹${ec2MonthlyInr}/माह` : `$${ec2MonthlyUsd.toFixed(2)}/mo`} × {months} {lang === 'hi' ? 'माह' : 'mo'}
                </div>
                <div className="text-[10px] text-slate-400 border-t border-rose-900/40 pt-1.5">
                  Includes mandatory IPv4 fee, compute, EBS disk & data transfer.
                </div>
              </div>

              {/* Recommended Alternative Box */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-lg space-y-2">
                <div className="text-xs text-emerald-300 font-medium">
                  {altPlan.name}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                  {currency === 'INR' ? `₹${totalAltInr.toLocaleString('en-IN')}` : `$${totalAltUsd.toFixed(2)}`}
                </div>
                <div className="text-[11px] text-slate-400">
                  {currency === 'INR' ? `₹${altMonthlyInr}/माह` : `$${altMonthlyUsd.toFixed(2)}/mo`} × {months} {lang === 'hi' ? 'माह' : 'mo'}
                </div>
                <div className="text-[10px] text-slate-400 border-t border-emerald-900/40 pt-1.5">
                  Full root access, free IPv4, NVMe SSD & up to 20TB traffic!
                </div>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="p-4 bg-blue-950/30 border border-blue-900/40 rounded-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  {lang === 'hi' ? 'आपकी कुल सीधी बचत' : 'Your Total Net Savings'}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums mt-0.5">
                  {currency === 'INR' ? `₹${savedInr.toLocaleString('en-IN')}` : `$${savedUsd.toFixed(2)}`}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-slate-400 block">
                  {lang === 'hi' ? 'खर्च में कटौती' : 'Bill Reduction'}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {percentageSaved}% OFF
                </span>
              </div>
            </div>

            {/* Bottom summary text */}
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'अतिरिक्त लाभ: Hetzner और RackNerd में AWS से 2x से 4x ज्यादा RAM और 10x ज्यादा फ्री बैंडविड्थ मिलती है।'
                  : 'Bonus: Budget providers like Hetzner provide 2x-4x more RAM and 20x higher bandwidth limits than EC2.'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
