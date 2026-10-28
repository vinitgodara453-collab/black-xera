export type ProductCategory = 
  | 'all'
  | 'tg_russia'
  | 'tg_premium' 
  | 'tg_bulk' 
  | 'whatsapp' 
  | 'otp_apps' 
  | 'smm' 
  | 'tg_stars'
  | 'gaming';

export interface BlackXeraProduct {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  badge: string;
  badgeType: 'premium' | 'low_price' | 'fresh' | 'instant' | 'growth' | 'hot' | 'russia';
  iconType: 'tg_premium' | 'tg_bulk' | 'whatsapp' | 'otp' | 'smm' | 'star' | 'game' | 'russia';
  priceInr: number;
  originalPriceInr: number;
  stock: number;
  unit: string;
  minQty: number;
  maxQty: number;
  description: string;
  deliveryType: 'instant_tdata' | 'live_sms_otp' | 'direct_topup' | 'automated_key' | 'session_json';
  availableCountries?: { name: string; code: string; price: number; stock: number }[];
  isRussiaSpecial?: boolean;
  ageDays?: number;
  format?: 'TData' | 'Session+JSON' | 'Live OTP' | 'Bulk Bundle';
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'recharge' | 'purchase';
  amountInr: number;
  utrNumber?: string;
  productTitle?: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  paymentMethod: string;
}

export interface CustomerOrder {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  totalAmountInr: number;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
  deliveredCredentials?: string[];
  notes?: string;
}

export interface AdminSettings {
  ownerUpi: string;
  ownerName: string;
  supportTelegram: string;
  supportWhatsapp: string;
  channelLink: string;
  announcement: string;
  isStoreOpen: boolean;
  minRechargeInr: number;
}
