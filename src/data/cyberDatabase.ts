import { VipPlan, UpiPaymentConfig, BreachRecord } from '../types/cyber';

export const DEFAULT_UPI_CONFIG: UpiPaymentConfig = {
  upiId: 'bajranggodara930@okaxis', // Set to user's handle from email bajranggodara930@gmail.com
  payeeName: 'Bajrang Godara (CyberShield Security)',
  merchantCode: 'CYBERSHIELD',
};

export const VIP_PLANS: VipPlan[] = [
  {
    id: 'free',
    name: 'Free Scout Shield',
    nameHi: 'फ़्री स्काउट शील्ड',
    tagline: 'Basic domain & IP health check for personal use',
    taglineHi: 'व्यक्तिगत उपयोग के लिए बेसिक डोमेन और IP जांच',
    priceInr: 0,
    billingPeriod: 'Forever Free',
    billingPeriodHi: 'हमेशा मुफ़्त',
    features: [
      'Basic IP / Domain reputation scan',
      'SSL Certificate expiration check',
      'Password entropy & hash generator',
      '3 Dark Web breach lookups per day',
      'Community threat alerts'
    ],
    featuresHi: [
      'बेसिक IP और डोमेन प्रतिष्ठा जांच',
      'SSL सर्टिफिकेट एक्सपायरी स्टेटस',
      'पासवर्ड शक्ति और हैश कैलकुलेटर',
      'प्रतिदिन 3 डार्क वेब लीक खोज',
      'कम्युनिटी साइबर थ्रेट अलर्ट'
    ],
    scanLimits: '3 scans / day'
  },
  {
    id: 'pro',
    name: 'Pro Cyber Shield VIP',
    nameHi: 'प्रो साइबर शील्ड VIP',
    tagline: 'Deep vulnerability scanning & automated threat defense',
    taglineHi: 'गहन भेद्यता स्कैनिंग और स्वचालित सुरक्षा रक्षा',
    priceInr: 499,
    billingPeriod: 'per month',
    billingPeriodHi: 'प्रति माह',
    isPopular: true,
    features: [
      'Full 65,535 Port Scanner & CVE Exploit audit',
      'Unlimited Dark Web email & phone leak scans',
      'Phishing URL & Typosquatting deep analyzer',
      'Automated Linux UFW & Nginx mitigation rules',
      'Official Penetration Testing PDF Audit Report',
      'VIP Verified Security Badge'
    ],
    featuresHi: [
      'फुल पोर्ट स्कैनर और CVE भेद्यता ऑडिट',
      'असीमित डार्क वेब ईमेल व फोन लीक जांच',
      'फ़िशिंग लिंक और नकली डोमेन का गहन विश्लेषण',
      'तुरंत कॉपी करने योग्य लिनक्स फ़ायरवॉल नियम',
      'आधिकारिक पेनेट्रेशन टेस्टिंग PDF रिपोर्ट',
      'VIP वेरिफाइड सिक्योरिटी बैज'
    ],
    scanLimits: 'Unlimited scans'
  },
  {
    id: 'elite',
    name: 'Elite Black-Hat Defense VIP',
    nameHi: 'एलीट ब्लैक-हैट डिफेंस VIP',
    tagline: 'Military-grade incident response & 1-on-1 cyber assistance',
    taglineHi: 'मिलिट्री-ग्रेड रक्षा, AI थ्रेट विश्लेषण और वीआईपी सहायता',
    priceInr: 999,
    billingPeriod: 'lifetime access',
    billingPeriodHi: 'लाइफटाइम एक्सेस',
    features: [
      'Everything in Pro Shield VIP included',
      'AI-Powered Malware & Suspicious Payload Analyzer',
      'Custom Zero-Day Vulnerability Advisory',
      'Direct WhatsApp/Telegram VIP Security Support',
      'Server Hardening Script Generator (Ubuntu/Debian)',
      'Lifetime Updates & New Tool Access'
    ],
    featuresHi: [
      'प्रो शील्ड VIP के सभी फीचर्स शामिल',
      'AI आधारित मैलवेयर और पेलोड विश्लेषण',
      'ज़ीरो-डे भेद्यता सुरक्षा एडवाइजरी',
      'सीधा WhatsApp/Telegram VIP साइबर सहायता',
      '1-क्लिक सर्वर हार्डनिंग स्क्रिप्ट जनरेटर',
      'लाइफटाइम अपडेट और भविष्य के सभी नए टूल्स'
    ],
    scanLimits: 'Priority Unlimited'
  }
];

export const KNOWN_BREACHES_DB: BreachRecord[] = [
  {
    sourceName: 'Naz.API & Stealer Logs 2024-2026',
    breachDate: 'January 2026',
    compromisedData: ['Email Addresses', 'Plaintext Passwords', 'Session Tokens', 'Browser Cookies'],
    severity: 'critical',
    description: 'A massive 71 million credential collection extracted from RedLine, Vidar, and Racoon infostealer malwares across Windows systems.',
    descriptionHi: 'रेडलाइन और रैसून मैलवेयर द्वारा चुराए गए 7.1 करोड़ ईमेल और पासवर्ड का वैश्विक डेटाबेस।',
    pwnedAccountsCount: '70,848,000'
  },
  {
    sourceName: 'Indian Telecom & FinTech Dump',
    breachDate: 'October 2025',
    compromisedData: ['Phone Numbers', 'Aadhaar Reference Hash', 'PAN Masked', 'Email Addresses'],
    severity: 'high',
    description: 'Scraped database targeting Indian subscribers across multiple third-party marketing brokers.',
    descriptionHi: 'भारतीय सब्सक्राइबर्स का फोन नंबर और ईमेल से जुड़ा लीक डेटाबेस।',
    pwnedAccountsCount: '34,200,000'
  },
  {
    sourceName: 'Collection #1-5 Global Megaleak',
    breachDate: 'Historical Aggregation',
    compromisedData: ['Email Addresses', 'SHA-1 Hashes', 'Bcrypt Hashes'],
    severity: 'critical',
    description: 'Historical compilation containing billions of credential pairs aggregated from thousands of breached websites.',
    descriptionHi: 'हजारों वेबसाइटों से लीक हुए ईमेल और पासवर्ड हैश का ऐतिहासिक संग्रह।',
    pwnedAccountsCount: '772,904,991'
  }
];

export const SAMPLE_LIVE_TELEMETRY = [
  { id: '1', origin: 'Mumbai, IN', target: 'AWS ap-south-1', type: 'SSH Brute-Force (Port 22)', severity: 'high', timestamp: '2s ago' },
  { id: '2', origin: 'Sydney, AU (54.252...)', target: 'Cloudflare Edge', type: 'DDoS SYN Flood (12 Gbps)', severity: 'critical', timestamp: '5s ago' },
  { id: '3', origin: 'Frankfurt, DE', target: 'Corporate Gateway', type: 'SQL Injection in /api/v1/login', severity: 'medium', timestamp: '8s ago' },
  { id: '4', origin: 'Singapore, SG', target: 'Fintech API', type: 'Credential Stuffing Botnet', severity: 'high', timestamp: '11s ago' },
  { id: '5', origin: 'Ashburn, US', target: 'WordPress Core', type: 'CVE-2024-4328 RCE Probe', severity: 'critical', timestamp: '14s ago' }
];
