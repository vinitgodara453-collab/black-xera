export type QrType = 'url' | 'upi' | 'wifi' | 'vcard' | 'whatsapp' | 'text' | 'email';

export interface QrStyleOptions {
  fgColor: string;
  bgColor: string;
  frameStyle: 'none' | 'simple' | 'badge' | 'scanme';
  frameText: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  size: number;
  logoUrl?: string;
}

export interface QrItem {
  id: string;
  title: string;
  type: QrType;
  rawContent: string;
  dynamicUrl?: string;
  style: QrStyleOptions;
  createdAt: string;
  scansCount: number;
  isDynamic: boolean;
  status: 'active' | 'paused';
}

export interface TransactionRecord {
  id: string;
  buyerName: string;
  buyerPhoneOrEmail: string;
  planName: string;
  amountInr: number;
  utrNumber: string;
  date: string;
  status: 'verified' | 'pending';
}

export interface AnalyticsSummary {
  totalScans: number;
  uniqueUsers: number;
  totalRevenueInr: number;
  activeQrs: number;
  todayScans: number;
  todayRevenueInr: number;
  devices: { name: string; percentage: number; count: number }[];
  locations: { city: string; scans: number; percentage: number }[];
  dailyActivity: { date: string; scans: number; revenue: number }[];
}

export interface QrPricingPlan {
  id: 'free' | 'pro' | 'business';
  name: string;
  nameHi: string;
  priceInr: number;
  period: string;
  periodHi: string;
  features: string[];
  featuresHi: string[];
  isPopular?: boolean;
}
