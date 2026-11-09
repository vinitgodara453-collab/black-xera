import { QrItem, TransactionRecord, AnalyticsSummary, QrPricingPlan } from '../types/qrcodes';

export const DEFAULT_OWNER_UPI = {
  upiId: 'bajranggodara930@okaxis', // Bajrang Godara's UPI
  payeeName: 'Bajrang Godara (NexCodes)',
};

export const INITIAL_QR_CODES: QrItem[] = [
  {
    id: 'qr-1',
    title: 'My Business Website',
    type: 'url',
    rawContent: 'https://ais-pre-wr7v2hutjvwqhvrdb63q37-662892046092.asia-southeast1.run.app',
    dynamicUrl: 'https://ais-pre-wr7v2hutjvwqhvrdb63q37-662892046092.asia-southeast1.run.app',
    style: {
      fgColor: '#000000',
      bgColor: '#FFFFFF',
      frameStyle: 'scanme',
      frameText: 'SCAN ME',
      errorCorrectionLevel: 'M',
      size: 280,
    },
    createdAt: '2026-10-18',
    scansCount: 1420,
    isDynamic: true,
    status: 'active',
  },
  {
    id: 'qr-2',
    title: 'Instant UPI Shop Payment',
    type: 'upi',
    rawContent: 'upi://pay?pa=bajranggodara930@okaxis&pn=Bajrang%20Godara&cu=INR',
    style: {
      fgColor: '#0F172A',
      bgColor: '#FFFFFF',
      frameStyle: 'badge',
      frameText: 'PAY VIA UPI',
      errorCorrectionLevel: 'H',
      size: 280,
    },
    createdAt: '2026-10-19',
    scansCount: 980,
    isDynamic: true,
    status: 'active',
  },
  {
    id: 'qr-3',
    title: 'Office WiFi Auto-Connect',
    type: 'wifi',
    rawContent: 'WIFI:S:NexCodes_Office;T:WPA;P:FastSecure2026;;',
    style: {
      fgColor: '#1E293B',
      bgColor: '#FFFFFF',
      frameStyle: 'simple',
      frameText: 'FREE WIFI',
      errorCorrectionLevel: 'M',
      size: 280,
    },
    createdAt: '2026-10-20',
    scansCount: 435,
    isDynamic: false,
    status: 'active',
  },
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'TXN-9081',
    buyerName: 'Rahul Sharma',
    buyerPhoneOrEmail: 'rahul.sharma@gmail.com',
    planName: 'Pro Creator Plan',
    amountInr: 299,
    utrNumber: '428919204821',
    date: '2026-10-21 11:42 AM',
    status: 'verified',
  },
  {
    id: 'TXN-9080',
    buyerName: 'Vikram Singh',
    buyerPhoneOrEmail: '982910****',
    planName: 'Business Unlimited Lifetime',
    amountInr: 799,
    utrNumber: '428849102914',
    date: '2026-10-21 09:15 AM',
    status: 'verified',
  },
  {
    id: 'TXN-9079',
    buyerName: 'Amit Patel',
    buyerPhoneOrEmail: 'amit.patel@outlook.com',
    planName: 'Pro Creator Plan',
    amountInr: 299,
    utrNumber: '428790123891',
    date: '2026-10-20 06:30 PM',
    status: 'verified',
  },
  {
    id: 'TXN-9078',
    buyerName: 'Deepak Choudhary',
    buyerPhoneOrEmail: '941400****',
    planName: 'Business Unlimited Lifetime',
    amountInr: 799,
    utrNumber: '428659124018',
    date: '2026-10-20 02:10 PM',
    status: 'verified',
  },
  {
    id: 'TXN-9077',
    buyerName: 'Sanjay Verma',
    buyerPhoneOrEmail: 'sanjay.v@gmail.com',
    planName: 'Pro Creator Plan',
    amountInr: 299,
    utrNumber: '428519401892',
    date: '2026-10-19 08:20 PM',
    status: 'verified',
  },
];

export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalScans: 4835,
  uniqueUsers: 3210,
  totalRevenueInr: 18450,
  activeQrs: 8,
  todayScans: 284,
  todayRevenueInr: 1098,
  devices: [
    { name: 'Android (PhonePe/GPay/Camera)', percentage: 68, count: 3287 },
    { name: 'iOS (iPhone Camera)', percentage: 26, count: 1257 },
    { name: 'Desktop & Tablets', percentage: 6, count: 291 },
  ],
  locations: [
    { city: 'Mumbai', scans: 1420, percentage: 32 },
    { city: 'Delhi NCR', scans: 1150, percentage: 26 },
    { city: 'Jaipur / Rajasthan', scans: 890, percentage: 20 },
    { city: 'Bangalore', scans: 740, percentage: 16 },
    { city: 'Others', scans: 635, percentage: 6 },
  ],
  dailyActivity: [
    { date: '15 Oct', scans: 310, revenue: 598 },
    { date: '16 Oct', scans: 450, revenue: 1098 },
    { date: '17 Oct', scans: 520, revenue: 1397 },
    { date: '18 Oct', scans: 680, revenue: 2196 },
    { date: '19 Oct', scans: 740, revenue: 2495 },
    { date: '20 Oct', scans: 890, revenue: 3194 },
    { date: '21 Oct (Today)', scans: 284, revenue: 1098 },
  ],
};

export const PRICING_PLANS: QrPricingPlan[] = [
  {
    id: 'free',
    name: 'Starter Free',
    nameHi: 'स्टार्टर मुफ़्त',
    priceInr: 0,
    period: 'Forever',
    periodHi: 'हमेशा',
    features: [
      'Unlimited Static QR Codes',
      'Standard PNG Download',
      'URL, WiFi, Text, Email types',
      'No expiration on printed codes',
      'Basic scan counter'
    ],
    featuresHi: [
      'असीमित स्टेटिक QR कोड बनाएं',
      'HD क्वालिटी PNG डाउनलोड',
      'वेबसाइट, WiFi, टेक्स्ट, ईमेल सपोर्ट',
      'प्रिंट किए गए कोड कभी एक्सपायर नहीं होते',
      'बेसिक स्कैन काउंटर'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    nameHi: 'प्रो क्रिएटर',
    priceInr: 299,
    period: 'per month',
    periodHi: 'प्रति माह',
    isPopular: true,
    features: [
      'Dynamic QR Codes (Edit link anytime without reprinting!)',
      'Full Analytics (कितने यूजर आए, डिवाइस, शहर)',
      'UPI Payment QR with custom callout frame',
      'High-Res Vector SVG & PDF exports',
      'Custom colors, logos & frames (SCAN ME)',
      'Password protected QR codes'
    ],
    featuresHi: [
      'डायनामिक QR कोड (प्रिंट के बाद भी लिंक बदलें!)',
      'पूरा एनालिटिक्स (कितने यूजर आए, शहर, डिवाइस)',
      'UPI पेमेंट QR कोड (PhonePe/GPay सपोर्ट)',
      'वेक्टर SVG और HD PDF डाउनलोड',
      'कस्टम कलर्स, लोगो और SCAN ME फ्रेम',
      'पासवर्ड प्रोटेक्टेड QR कोड्स'
    ]
  },
  {
    id: 'business',
    name: 'Business Lifetime VIP',
    nameHi: 'बिजनेस लाइफटाइम VIP',
    priceInr: 799,
    period: 'one-time lifetime',
    periodHi: 'एक बार, लाइफटाइम',
    features: [
      'Everything in Pro Plan included',
      'Unlimited Dynamic QR Codes',
      'Custom Short Domain URL branding',
      'Bulk QR Generation via Excel/CSV',
      'Commercial Reseller License',
      'Priority WhatsApp Support'
    ],
    featuresHi: [
      'प्रो प्लान के सभी फीचर्स शामिल',
      'असीमित डायनामिक QR कोड्स',
      'कस्टम शार्ट डोमेन ब्रांडिंग',
      'एक्सेल/CSV से बल्क में QR जनरेशन',
      'कमर्शियल रीसेलर लाइसेंस',
      'डायरेक्ट WhatsApp वीआईपी सपोर्ट'
    ]
  }
];
