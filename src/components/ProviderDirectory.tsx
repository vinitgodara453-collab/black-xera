import React, { useState, useMemo } from 'react';
import { VPS_PROVIDERS, VPSProvider } from '../data/vpsProviders';
import { ProviderCard } from './ProviderCard';
import { Search, SlidersHorizontal, Table, LayoutGrid, Check, ExternalLink } from 'lucide-react';

interface ProviderDirectoryProps {
  lang: 'hi' | 'en';
  currency: 'INR' | 'USD';
  onQuickSetup: (provider: VPSProvider) => void;
  selectedCategoryFromParent?: string;
}

export const ProviderDirectory: React.FC<ProviderDirectoryProps> = ({
  lang,
  currency,
  onQuickSetup,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = [
    { id: 'all', labelEn: 'All Providers', labelHi: 'सभी प्रोवाइडर्स' },
    { id: 'free', labelEn: 'Free Forever ($0)', labelHi: 'बिल्कुल फ्री (₹0)' },
    { id: 'ultra_budget', labelEn: 'Under $1.50 (₹150/mo)', labelHi: '₹150/माह से कम' },
    { id: 'best_value', labelEn: 'Best Value (Hetzner / Lightsail)', labelHi: 'बेस्ट वैल्यू (Hetzner/Lightsail)' },
    { id: 'high_specs', labelEn: 'High Specs (8GB RAM)', labelHi: 'हैवी स्पेक्स (8GB RAM)' },
    { id: 'india_friendly', labelEn: 'UPI / India Datacenter', labelHi: 'UPI / भारत डेटा सेंटर' },
  ];

  const filteredProviders = useMemo(() => {
    return VPS_PROVIDERS.filter((provider) => {
      // Category filter
      if (activeCategory === 'india_friendly') {
        if (!provider.supportsUpi && !provider.locations.some(l => l.includes('India') || l.includes('Mumbai'))) {
          return false;
        }
      } else if (activeCategory !== 'all' && provider.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(query);
        const matchesSpecs = provider.ram.toLowerCase().includes(query) || provider.cpu.toLowerCase().includes(query);
        const matchesLocation = provider.locations.some(loc => loc.toLowerCase().includes(query));
        const matchesPayment = provider.paymentMethods.some(pm => pm.toLowerCase().includes(query));
        return matchesName || matchesSpecs || matchesLocation || matchesPayment;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="providers" className="py-10 sm:py-14 border-b border-slate-800/80 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
              <span>{lang === 'hi' ? 'सस्ते VPS प्रोवाइडर डायरेक्टरी' : 'Cheap VPS Provider Directory'}</span>
              <span aria-hidden="true">·</span>
              <span>2025/2026 Verified Pricing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {lang === 'hi' 
                ? 'कहाँ से मिलेगा सबसे सस्ता और भरोसेमंद Ubuntu VPS?' 
                : 'Where to Buy the Cheapest & Most Reliable Ubuntu VPS'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'hi'
                ? 'निचे दिए गए सभी प्रोवाइडर्स पर Ubuntu 24.04/22.04 LTS सपोर्टेड है और डेडिकेटेड IPv4 मिलता है।'
                : 'All providers below include dedicated IPv4, root SSH access, and verified Ubuntu LTS support.'}
            </p>
          </div>

          {/* Table / Grid Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-md text-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'कार्ड व्यू' : 'Cards'}</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'तुलना तालिका' : 'Table'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs (Functional segmented filter controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {lang === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'प्रोवाइडर, RAM, लोकेशन या पेमेंट खोजें (e.g. Hetzner, UPI, Mumbai)...' : 'Filter by provider name, RAM, location, or UPI...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* View Mode: Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                currency={currency}
                lang={lang}
                onQuickSetup={onQuickSetup}
              />
            ))}
          </div>
        )}

        {/* View Mode: Comparison Table */}
        {viewMode === 'table' && (
          <div className="bg-[#0C1220] border border-slate-800 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'प्रोवाइडर' : 'Provider'}</th>
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'मंथली खर्च' : 'Monthly Price'}</th>
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'RAM / CPU' : 'RAM / vCPU'}</th>
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'स्टोरेज / डिस्क' : 'Storage'}</th>
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'बैंडविड्थ' : 'Bandwidth'}</th>
                  <th className="py-3.5 px-4">{lang === 'hi' ? 'UPI समर्थित?' : 'UPI / India'}</th>
                  <th className="py-3.5 px-4 text-right">{lang === 'hi' ? 'एक्शन' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProviders.map((provider) => {
                  const isFree = provider.isFree;
                  const priceStr = isFree 
                    ? (lang === 'hi' ? '₹0 मुफ़्त' : '$0 FREE') 
                    : currency === 'INR' 
                      ? `₹${provider.monthlyInr}/mo` 
                      : `$${provider.monthlyUsd.toFixed(2)}/mo`;

                  return (
                    <tr key={provider.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                        <div>{provider.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{provider.planName}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 tabular-nums whitespace-nowrap">
                        {priceStr}
                      </td>

                      <td className="py-3.5 px-4 text-slate-200 font-mono whitespace-nowrap">
                        <div>{provider.ram}</div>
                        <div className="text-[11px] text-slate-400 font-sans">{provider.cpu}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        {provider.storage}
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        {provider.bandwidth}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {provider.supportsUpi ? (
                          <span className="text-emerald-400 font-medium">✓ UPI Yes</span>
                        ) : (
                          <span className="text-slate-400">Card / PayPal</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <a
                          href={provider.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-xs transition-colors"
                        >
                          <span>{lang === 'hi' ? 'देखें' : 'Get'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
