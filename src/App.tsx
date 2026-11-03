import React, { useState, useEffect } from 'react';
import { 
  BlackXeraProduct, 
  WalletTransaction, 
  CustomerOrder, 
  AdminSettings,
  ProductCategory
} from './types/blackxera';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_WALLET_BALANCE, 
  DEMO_USER_ID, 
  INITIAL_TRANSACTIONS, 
  INITIAL_ORDERS, 
  DEFAULT_ADMIN_SETTINGS 
} from './data/mockBlackXera';
import { BlackXeraHeader } from './components/BlackXeraHeader';
import { BlackXeraWalletCard } from './components/BlackXeraWalletCard';
import { BlackXeraProductCard } from './components/BlackXeraProductCard';
import { BlackXeraBottomNav, BlackXeraTab } from './components/BlackXeraBottomNav';
import { BlackXeraRechargeModal } from './components/BlackXeraRechargeModal';
import { BlackXeraOrderModal } from './components/BlackXeraOrderModal';
import { BlackXeraOrdersView } from './components/BlackXeraOrdersView';
import { BlackXeraHistoryView } from './components/BlackXeraHistoryView';
import { BlackXeraSupportView } from './components/BlackXeraSupportView';
import { BlackXeraAccountView } from './components/BlackXeraAccountView';
import { BlackXeraAdminModal } from './components/BlackXeraAdminModal';
import { BlackXeraFreeHostModal } from './components/BlackXeraFreeHostModal';
import { WholesaleSuppliersPanel } from './components/WholesaleSuppliersPanel';
import { RussiaTelegramPanel } from './components/RussiaTelegramPanel';
import { ShieldCheck, Sparkles, TrendingUp, Layers, HelpCircle, Bell, ArrowRight, Zap, QrCode } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<BlackXeraTab>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showWholesalePanel, setShowWholesalePanel] = useState<boolean>(false);
  const [showRussiaDedicatedHub, setShowRussiaDedicatedHub] = useState<boolean>(true);
  const [rechargePrefillAmount, setRechargePrefillAmount] = useState<number | undefined>(undefined);

  // Persistent States in LocalStorage
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bx_wallet_balance');
      return saved ? parseFloat(saved) : INITIAL_WALLET_BALANCE;
    } catch {
      return INITIAL_WALLET_BALANCE;
    }
  });

  const [products, setProducts] = useState<BlackXeraProduct[]>(() => {
    try {
      const saved = localStorage.getItem('bx_products');
      if (saved) {
        const parsed: BlackXeraProduct[] = JSON.parse(saved);
        // Ensure new Russia products are included
        const hasRussia = parsed.some(p => p.id === 'tg-russia-aged-tdata');
        if (!hasRussia) {
          return INITIAL_PRODUCTS;
        }
        return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('bx_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('bx_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('bx_admin_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.ownerUpi === 'bajranggodara930@okaxis' || !parsed.ownerUpi) {
          return DEFAULT_ADMIN_SETTINGS;
        }
        return parsed;
      }
      return DEFAULT_ADMIN_SETTINGS;
    } catch {
      return DEFAULT_ADMIN_SETTINGS;
    }
  });

  // Modal triggers
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BlackXeraProduct | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isFreeHostOpen, setIsFreeHostOpen] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('bx_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('bx_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bx_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bx_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bx_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  // Handlers
  const handleRefreshBalance = () => {
    setRefreshNotice(true);
    setTimeout(() => setRefreshNotice(false), 2000);
  };

  const handleOrderConfirm = (
    product: BlackXeraProduct, 
    quantity: number, 
    totalAmount: number, 
    countryCode?: string
  ) => {
    // 1. Deduct wallet balance
    setWalletBalance(prev => Math.max(0, prev - totalAmount));

    // 2. Reduce product stock
    setProducts(prev => prev.map(p => {
      if (p.id === product.id) {
        return { ...p, stock: Math.max(0, p.stock - quantity) };
      }
      return p;
    }));

    // 3. Create Order
    const newOrder: CustomerOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: DEMO_USER_ID,
      productId: product.id,
      productTitle: `${product.title} (${quantity} ${product.unit})`,
      quantity,
      totalAmountInr: totalAmount,
      date: 'Just now',
      status: 'completed',
      deliveredCredentials: [
        `Instant delivery: ${product.deliveryType === 'instant_tdata' ? 'TData Session ready' : 'Active SMS service'}`
      ],
      notes: countryCode ? `Country Server: ${countryCode}` : 'Instant auto-fulfilled'
    };
    setOrders(prev => [newOrder, ...prev]);

    // 4. Create Transaction Record
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: DEMO_USER_ID,
      type: 'purchase',
      amountInr: totalAmount,
      productTitle: product.title,
      date: 'Just now',
      status: 'approved',
      paymentMethod: 'Wallet Balance'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleSubmitRecharge = (amount: number, utr: string) => {
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: DEMO_USER_ID,
      type: 'recharge',
      amountInr: amount,
      utrNumber: utr,
      date: 'Just now',
      status: 'pending',
      paymentMethod: 'PhonePe / Paytm UPI'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleApproveTransaction = (txId: string) => {
    const targetTx = transactions.find(t => t.id === txId);
    if (!targetTx) return;

    setWalletBalance(prev => prev + targetTx.amountInr);
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'approved' } : t));
  };

  const handleRejectTransaction = (txId: string) => {
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'rejected' } : t));
  };

  const handleManualCredit = (amount: number) => {
    setWalletBalance(prev => prev + amount);
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: DEMO_USER_ID,
      type: 'recharge',
      amountInr: amount,
      utrNumber: 'MANUAL_CREDIT',
      date: 'Just now',
      status: 'approved',
      paymentMethod: 'Admin Manual Credit'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const pendingRecharges = transactions.filter(t => t.type === 'recharge' && t.status === 'pending');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'tg_russia', label: '🇷🇺 Russia TG (+7)' },
    { id: 'tg_premium', label: 'TG Quality' },
    { id: 'tg_bulk', label: 'Budget TG' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'otp_apps', label: 'All Apps OTP' },
    { id: 'smm', label: 'SMM Booster' },
    { id: 'tg_stars', label: 'TG Stars' }
  ];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-20">
      
      {/* Top Header matching quickcodes.net screenshot */}
      <BlackXeraHeader
        adminSettings={adminSettings}
        isAdmin={isAdmin}
        onToggleAdmin={() => {
          setIsAdmin(!isAdmin);
          setIsAdminModalOpen(true);
        }}
        onOpenRecharge={() => setIsRechargeOpen(true)}
        onOpenHostingGuide={() => setIsFreeHostOpen(true)}
        pendingRechargesCount={pendingRecharges.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-5 sm:py-6 space-y-6">
        
        {/* TAB: HOME VIEW (Exact QuickCodes Screen) */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            
            {/* Live Announcement Bar */}
            <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">{adminSettings.announcement}</span>
              </div>
              <button 
                onClick={() => setIsFreeHostOpen(true)}
                className="text-[10px] font-mono font-bold text-cyan-400 hover:underline whitespace-nowrap hidden sm:inline"
              >
                Free Host Guide ➔
              </button>
            </div>

            {/* Wallet Balance Hero Card (Exact replica of screenshot) */}
            <BlackXeraWalletCard
              balance={walletBalance}
              userId={DEMO_USER_ID}
              onOpenRecharge={() => setIsRechargeOpen(true)}
              onRefresh={handleRefreshBalance}
            />

            {refreshNotice && (
              <div className="text-center text-xs text-cyan-300 font-mono animate-in fade-in">
                ✓ Wallet balance and real-time stocks refreshed
              </div>
            )}

            {/* Dedicated Russia Telegram Sasta & Real Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-950/70 via-[#0B1220] to-rose-950/60 border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-rose-600 text-white flex items-center gap-1 shadow-sm">
                    <span>🇷🇺</span> RUSSIA (+7) WHOLESALE HUB
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-500/30">
                    Saste & Real Accounts
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                    UPI Active
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Russia Telegram Accounts & Live OTP (₹12 से शुरू)
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Aged TData Desktop, Pyrogram/Telethon Sessions & 15-min Live SMS OTP। डायरेक्ट UPI QR से पेमेंट और तुरंत डिलीवरी।
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setShowRussiaDedicatedHub(!showRussiaDedicatedHub);
                    if (!showRussiaDedicatedHub) {
                      setActiveCategory('tg_russia');
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>🇷🇺</span>
                  {showRussiaDedicatedHub ? 'Hide Russia Hub' : 'Open Russia TG Hub'}
                </button>
              </div>
            </div>

            {/* Dedicated Russia Telegram Full Panel View */}
            {showRussiaDedicatedHub && (
              <RussiaTelegramPanel
                products={products}
                walletBalance={walletBalance}
                adminSettings={adminSettings}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenRecharge={(amt) => {
                  setRechargePrefillAmount(amt);
                  setIsRechargeOpen(true);
                }}
                onQuickBuy={(prod, qty, cCode) => {
                  handleOrderConfirm(prod, qty, prod.priceInr * qty, cCode);
                }}
              />
            )}

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'tg_russia') {
                      setShowRussiaDedicatedHub(true);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'bg-[#0D121D] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services Grid (Exact 2-column cards layout from screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <BlackXeraProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Wholesale Panels & Free Hosting Collapsible Banner */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px]">
                💡 Want to see wholesale provider APIs or deploy to Vercel/Netlify for ₹0?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWholesalePanel(!showWholesalePanel)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  {showWholesalePanel ? 'Hide Supplier Directory' : 'View Wholesale Sources'}
                </button>
                <button
                  onClick={() => setIsFreeHostOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900/50 cursor-pointer"
                >
                  🚀 Free Hosting
                </button>
              </div>
            </div>

            {showWholesalePanel && (
              <div className="animate-in fade-in duration-300">
                <WholesaleSuppliersPanel lang="hi" />
              </div>
            )}

          </div>
        )}

        {/* TAB: ORDERS VIEW */}
        {activeTab === 'orders' && (
          <BlackXeraOrdersView orders={orders} />
        )}

        {/* TAB: HISTORY VIEW */}
        {activeTab === 'history' && (
          <BlackXeraHistoryView 
            transactions={transactions} 
            onOpenRecharge={() => setIsRechargeOpen(true)} 
          />
        )}

        {/* TAB: SUPPORT VIEW */}
        {activeTab === 'support' && (
          <BlackXeraSupportView adminSettings={adminSettings} />
        )}

        {/* TAB: ACCOUNT VIEW */}
        {activeTab === 'account' && (
          <BlackXeraAccountView
            userId={DEMO_USER_ID}
            walletBalance={walletBalance}
            adminSettings={adminSettings}
            onOpenRecharge={() => setIsRechargeOpen(true)}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
            onOpenHostingGuide={() => setIsFreeHostOpen(true)}
          />
        )}

      </main>

      {/* Bottom 5-Tab Navigation Bar (Exact replica of QuickCodes screenshot) */}
      <BlackXeraBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        ordersCount={orders.length}
      />

      {/* Recharge Modal (Indian UPI QR) */}
      <BlackXeraRechargeModal
        isOpen={isRechargeOpen}
        onClose={() => {
          setIsRechargeOpen(false);
          setRechargePrefillAmount(undefined);
        }}
        adminSettings={adminSettings}
        onSubmitRecharge={handleSubmitRecharge}
        initialAmount={rechargePrefillAmount}
      />

      {/* Order Purchase & Instant Delivery Modal */}
      <BlackXeraOrderModal
        product={selectedProduct}
        walletBalance={walletBalance}
        onClose={() => setSelectedProduct(null)}
        onConfirmOrder={handleOrderConfirm}
        onOpenRecharge={() => {
          setSelectedProduct(null);
          setIsRechargeOpen(true);
        }}
      />

      {/* Master Owner Admin Modal ("sab mere cantol me ho") */}
      <BlackXeraAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        products={products}
        onUpdateProducts={(updated) => setProducts(updated)}
        pendingTransactions={pendingRecharges}
        onApproveTransaction={handleApproveTransaction}
        onRejectTransaction={handleRejectTransaction}
        adminSettings={adminSettings}
        onUpdateSettings={(newSettings) => setAdminSettings(newSettings)}
        onManualCredit={handleManualCredit}
      />

      {/* Free Hosting Modal ("free host bi kar sakhu") */}
      <BlackXeraFreeHostModal
        isOpen={isFreeHostOpen}
        onClose={() => setIsFreeHostOpen(false)}
      />

    </div>
  );
}
