export type Language = 'hi' | 'en';

export interface ScanResult {
  target: string;
  targetType: 'ip' | 'domain' | 'url';
  timestamp: string;
  threatLevel: 'clean' | 'low' | 'medium' | 'high' | 'critical';
  overallScore: number; // 0 - 100
  sslStatus: {
    valid: boolean;
    issuer: string;
    protocol: string;
    expiresInDays: number;
    grade: 'A+' | 'A' | 'B' | 'F';
  };
  dnsAnalysis: {
    aRecords: string[];
    mxRecords: string[];
    spfConfigured: boolean;
    dmarcConfigured: boolean;
  };
  securityHeaders: {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    corsPermissive: boolean;
  };
  openPorts: {
    port: number;
    service: string;
    status: 'open' | 'closed' | 'filtered';
    risk: 'safe' | 'warning' | 'danger';
    cveAlert?: string;
  }[];
  threatFlags: string[];
  recommendations: string[];
  recommendationsHi: string[];
}

export interface BreachRecord {
  sourceName: string;
  breachDate: string;
  compromisedData: string[];
  severity: 'high' | 'critical';
  description: string;
  descriptionHi: string;
  pwnedAccountsCount: string;
}

export interface VipPlan {
  id: 'free' | 'pro' | 'elite';
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  priceInr: number;
  billingPeriod: string;
  billingPeriodHi: string;
  isPopular?: boolean;
  features: string[];
  featuresHi: string[];
  scanLimits: string;
}

export interface UpiPaymentConfig {
  upiId: string;
  payeeName: string;
  merchantCode?: string;
}

export interface UserVipStatus {
  isVip: boolean;
  planId?: 'pro' | 'elite';
  planName?: string;
  activatedAt?: string;
  utrNumber?: string;
}
