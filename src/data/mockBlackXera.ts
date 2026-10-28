import { BlackXeraProduct, WalletTransaction, CustomerOrder, AdminSettings } from '../types/blackxera';

export const INITIAL_PRODUCTS: BlackXeraProduct[] = [
  {
    id: 'tg-russia-aged-tdata',
    title: 'Russia (+7) Aged TData (30-90 Days)',
    subtitle: 'Non-drop ready Telegram desktop account with 2FA password',
    category: 'tg_russia',
    badge: 'BEST SELLER',
    badgeType: 'russia',
    iconType: 'russia',
    priceInr: 22,
    originalPriceInr: 45,
    stock: 820,
    unit: 'per TData account',
    minQty: 1,
    maxQty: 30,
    description: '30 to 90 days aged Russian (+7) Telegram account in TData format for Telegram Desktop. Comes with 2FA password, zero ban rate, unbannable clean session.',
    deliveryType: 'instant_tdata',
    format: 'TData',
    ageDays: 45,
    isRussiaSpecial: true
  },
  {
    id: 'tg-russia-live-otp',
    title: 'Russia (+7) Live Telegram OTP',
    subtitle: 'Instant 15-min SMS OTP verification for fresh account',
    category: 'tg_russia',
    badge: 'CHEAPEST ₹12',
    badgeType: 'low_price',
    iconType: 'russia',
    priceInr: 12,
    originalPriceInr: 25,
    stock: 4500,
    unit: 'per OTP verification',
    minQty: 1,
    maxQty: 50,
    description: 'Real Russian (+7) virtual number for instant Telegram SMS verification. 15-minute wait window, instant auto-refund if OTP is not received.',
    deliveryType: 'live_sms_otp',
    format: 'Live OTP',
    isRussiaSpecial: true
  },
  {
    id: 'tg-russia-session-json',
    title: 'Russia (+7) Session + JSON',
    subtitle: 'Telethon & Pyrogram format for bots / scraping',
    category: 'tg_russia',
    badge: 'BOT SCRIPTS',
    badgeType: 'instant',
    iconType: 'russia',
    priceInr: 16,
    originalPriceInr: 35,
    stock: 1200,
    unit: 'per session',
    minQty: 1,
    maxQty: 50,
    description: 'Clean Russian (+7) Telegram account in .session and .json format. Ready for Python Telethon, Pyrogram, mass DM tools, and Telegram scraper bots.',
    deliveryType: 'session_json',
    format: 'Session+JSON',
    isRussiaSpecial: true
  },
  {
    id: 'tg-russia-aged-bulk-10',
    title: 'Russia (+7) Bulk Pack (10x TData)',
    subtitle: '10x Aged TData accounts bundle (₹19/acc wholesale)',
    category: 'tg_russia',
    badge: 'WHOLESALE',
    badgeType: 'hot',
    iconType: 'russia',
    priceInr: 190,
    originalPriceInr: 350,
    stock: 150,
    unit: 'Pack of 10 Accounts',
    minQty: 1,
    maxQty: 10,
    description: 'Bulk wholesale bundle of 10 aged Russian (+7) TData accounts. Instant zip file download with all 10 session folders and passwords.',
    deliveryType: 'instant_tdata',
    format: 'Bulk Bundle',
    isRussiaSpecial: true
  },
  {
    id: 'tg-russia-old-premium',
    title: 'Russia (+7) Old Vintage (180+ Days)',
    subtitle: 'High trust score, channel creator & invite safe',
    category: 'tg_russia',
    badge: 'HIGH TRUST',
    badgeType: 'premium',
    iconType: 'russia',
    priceInr: 34,
    originalPriceInr: 70,
    stock: 310,
    unit: 'per vintage account',
    minQty: 1,
    maxQty: 15,
    description: 'Over 6 months (180+ days) aged Russian Telegram account. Maximum trust score, ideal for creating public channels, groups, and high-frequency messaging without flood limits.',
    deliveryType: 'instant_tdata',
    format: 'TData',
    ageDays: 180,
    isRussiaSpecial: true
  },
  {
    id: 'good-quality-tg',
    title: 'Good Quality TG (Global)',
    subtitle: 'Good quality ready-made TG accounts (Multi-Country)',
    category: 'tg_premium',
    badge: 'PREMIUM',
    badgeType: 'premium',
    iconType: 'tg_premium',
    priceInr: 22,
    originalPriceInr: 45,
    stock: 580,
    unit: 'per account',
    minQty: 1,
    maxQty: 50,
    description: '1 to 6-month aged Telegram Accounts with TData & Session+JSON formats. 2FA protected, unbannable, 100% active sessions.',
    deliveryType: 'instant_tdata',
    availableCountries: [
      { name: 'Indonesia (+62)', code: '+62', price: 20, stock: 240 },
      { name: 'Kazakhstan (+77)', code: '+77', price: 22, stock: 180 },
      { name: 'USA (+1)', code: '+1', price: 25, stock: 95 },
      { name: 'United Kingdom (+44)', code: '+44', price: 28, stock: 65 }
    ]
  },
  {
    id: 'cheap-phishing-tg',
    title: 'Budget Bulk TG',
    subtitle: 'Budget bulk ready-made TG accounts',
    category: 'tg_bulk',
    badge: 'LOW PRICE',
    badgeType: 'low_price',
    iconType: 'tg_bulk',
    priceInr: 9,
    originalPriceInr: 20,
    stock: 1420,
    unit: 'per account',
    minQty: 1,
    maxQty: 100,
    description: 'Instant wholesale fresh Telegram accounts. Perfect for mass messaging, channel member boosting, and group creation.',
    deliveryType: 'instant_tdata',
    availableCountries: [
      { name: 'Indonesia (+62)', code: '+62', price: 8, stock: 650 },
      { name: 'Vietnam (+84)', code: '+84', price: 9, stock: 420 },
      { name: 'South Africa (+27)', code: '+27', price: 10, stock: 350 }
    ]
  },
  {
    id: 'whatsapp-fresh',
    title: 'WhatsApp',
    subtitle: 'Fresh WhatsApp numbers & OTP',
    category: 'whatsapp',
    badge: 'FRESH',
    badgeType: 'fresh',
    iconType: 'whatsapp',
    priceInr: 14,
    originalPriceInr: 30,
    stock: 410,
    unit: 'per number',
    minQty: 1,
    maxQty: 25,
    description: 'Fresh non-recycled virtual mobile numbers for instant WhatsApp and WhatsApp Business SMS verification.',
    deliveryType: 'live_sms_otp',
    availableCountries: [
      { name: 'India (+91)', code: '+91', price: 18, stock: 80 },
      { name: 'Indonesia (+62)', code: '+62', price: 12, stock: 190 },
      { name: 'USA (+1)', code: '+1', price: 15, stock: 140 }
    ]
  },
  {
    id: 'all-apps-otp',
    title: 'All Apps OTP',
    subtitle: 'Any app · worldwide instant OTP',
    category: 'otp_apps',
    badge: 'INSTANT',
    badgeType: 'instant',
    iconType: 'otp',
    priceInr: 6,
    originalPriceInr: 15,
    stock: 8900,
    unit: 'per verification',
    minQty: 1,
    maxQty: 50,
    description: 'Instant SMS OTP verification for 150+ apps: Google / Gmail, Netflix, Instagram, OpenAI ChatGPT, Facebook, Amazon, and Discord.',
    deliveryType: 'live_sms_otp',
    availableCountries: [
      { name: 'Global Pool (150+ Countries)', code: 'ALL', price: 6, stock: 8900 }
    ]
  },
  {
    id: 'social-media-booster',
    title: 'Social Media Booster',
    subtitle: 'Followers · likes · views · members & more',
    category: 'smm',
    badge: 'GROWTH',
    badgeType: 'growth',
    iconType: 'smm',
    priceInr: 18,
    originalPriceInr: 49,
    stock: 9999,
    unit: 'per 1,000 units',
    minQty: 1,
    maxQty: 100,
    description: 'High-speed social growth server: Telegram channel members (non-drop), Instagram real followers, YouTube views, and Telegram post reactions.',
    deliveryType: 'automated_key'
  },
  {
    id: 'tg-stars-wholesale',
    title: 'Telegram Stars (Wholesale UPI)',
    subtitle: 'Direct Telegram Stars via UPI (50% Cheaper)',
    category: 'tg_stars',
    badge: 'HOT DEAL',
    badgeType: 'hot',
    iconType: 'star',
    priceInr: 180,
    originalPriceInr: 250,
    stock: 50000,
    unit: '100 Stars Pack (Direct to @username)',
    minQty: 1,
    maxQty: 20,
    description: 'Buy Telegram Stars directly with Indian UPI. Play Store charges high fees; here you get 100 Stars delivered directly to your Telegram @username!',
    deliveryType: 'direct_topup'
  },
  {
    id: 'freefire-diamonds',
    title: 'Free Fire Diamonds (UID)',
    subtitle: 'Instant 100% Safe Player ID Top-Up',
    category: 'gaming',
    badge: 'INSTANT',
    badgeType: 'instant',
    iconType: 'game',
    priceInr: 78,
    originalPriceInr: 99,
    stock: 3500,
    unit: '100 + 10 Bonus Diamonds',
    minQty: 1,
    maxQty: 10,
    description: 'Instant Free Fire UID Diamond top-up with zero password required. 100% legal via official partner APIs.',
    deliveryType: 'direct_topup'
  }
];

export const INITIAL_WALLET_BALANCE = 1250.00;
export const DEMO_USER_ID = 'BX-4874E9HK';

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN-9021',
    userId: DEMO_USER_ID,
    type: 'recharge',
    amountInr: 500,
    utrNumber: '429810394821',
    date: 'Today, 02:45 PM',
    status: 'approved',
    paymentMethod: 'PhonePe UPI QR'
  },
  {
    id: 'TXN-8812',
    userId: DEMO_USER_ID,
    type: 'purchase',
    amountInr: 88,
    productTitle: 'Good Quality TG (4 Accounts)',
    date: 'Yesterday, 07:15 PM',
    status: 'approved',
    paymentMethod: 'Wallet Balance'
  },
  {
    id: 'TXN-8740',
    userId: DEMO_USER_ID,
    type: 'recharge',
    amountInr: 1000,
    utrNumber: '429583720194',
    date: '24 Oct 2026',
    status: 'approved',
    paymentMethod: 'Google Pay UPI'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ORD-7721',
    userId: DEMO_USER_ID,
    productId: 'good-quality-tg',
    productTitle: 'Good Quality TG (Aged TData)',
    quantity: 2,
    totalAmountInr: 44,
    date: 'Today, 03:10 PM',
    status: 'completed',
    deliveredCredentials: [
      '+6285819382910 | 2FA: bx9932 | TData: https://blackxera.cloud/dl/tdata_6285819382910.zip',
      '+6285819382911 | 2FA: bx9932 | TData: https://blackxera.cloud/dl/tdata_6285819382911.zip'
    ],
    notes: 'Aged 3 months, full 2FA password provided. Clean session.'
  },
  {
    id: 'ORD-7690',
    userId: DEMO_USER_ID,
    productId: 'tg-stars-wholesale',
    productTitle: 'Telegram Stars (100 Stars)',
    quantity: 1,
    totalAmountInr: 180,
    date: 'Yesterday, 08:30 PM',
    status: 'completed',
    deliveredCredentials: [
      'Transfer Hash: ton_tx_83910fbc | Sent 100 Stars to @user'
    ],
    notes: 'Delivered directly to Telegram ID.'
  }
];

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  ownerUpi: 'vinit-godara@fam',
  ownerName: 'VINIT GODARA',
  supportTelegram: 'https://t.me/SHIVAMH4REEE',
  supportWhatsapp: '+919876543210',
  channelLink: 'https://t.me/BOT_CODE_MEKAR',
  announcement: '🇷🇺 BLACK XERA: रूस (+7) टेलीग्राम अकाउंट निकालने का लाइव पैनल एक्टिव! (Live +7 Extractor & Instant UPI)',
  isStoreOpen: true,
  minRechargeInr: 50
};
