export interface VPSProvider {
  id: string;
  name: string;
  category: 'free' | 'ultra_budget' | 'best_value' | 'high_specs' | 'india_friendly';
  planName: string;
  monthlyUsd: number;
  monthlyInr: number;
  yearlyUsd?: number;
  isFree?: boolean;
  cpu: string;
  ram: string;
  ramGb: number;
  storage: string;
  bandwidth: string;
  portSpeed: string;
  locations: string[];
  osSupported: string[];
  paymentMethods: string[];
  supportsUpi: boolean;
  creditCardRequired: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
  officialUrl: string;
  freeTrialNote?: string;
  couponTip?: string;
}

export const VPS_PROVIDERS: VPSProvider[] = [
  {
    id: 'oracle-free',
    name: 'Oracle Cloud Free Tier',
    category: 'free',
    planName: 'Always Free Ampere A1 / AMD',
    monthlyUsd: 0,
    monthlyInr: 0,
    isFree: true,
    cpu: 'Up to 4 OCPU ARM (or 2 AMD)',
    ram: 'Up to 24 GB RAM (Free!)',
    ramGb: 24,
    storage: '200 GB NVMe Boot Disk',
    bandwidth: '10 TB / Month Free',
    portSpeed: '4 Gbps Network',
    locations: ['Mumbai (India)', 'Hyderabad (India)', 'Singapore', 'Frankfurt', 'Ashburn (US)'],
    osSupported: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Oracle Linux', 'Debian'],
    paymentMethods: ['International Debit/Credit Card (For ₹75 refundable verification)'],
    supportsUpi: false,
    creditCardRequired: true,
    pros: [
      '100% Free Forever without monthly bill',
      'Massive 24 GB RAM and 4 ARM Cores',
      'Data centers available in Mumbai & Hyderabad for lowest ping',
      'Free static IPv4 and IPv6 included'
    ],
    cons: [
      'Account registration can be strict with debit cards',
      'ARM capacity occasionally runs out in popular regions'
    ],
    bestFor: '100% free hosting, heavy bots, Docker containers, personal projects',
    officialUrl: 'https://www.oracle.com/cloud/free/',
    freeTrialNote: '₹75-₹100 charge on card for verification, refunded within 24 hours.'
  },
  {
    id: 'racknerd',
    name: 'RackNerd (Promotional VPS)',
    category: 'ultra_budget',
    planName: 'Special Yearly Promo Deal',
    monthlyUsd: 1.15,
    monthlyInr: 99,
    yearlyUsd: 13.98,
    cpu: '1 vCPU Core',
    ram: '1.5 GB RAM',
    ramGb: 1.5,
    storage: '30 GB Pure SSD (RAID-10)',
    bandwidth: '3,000 GB / Month',
    portSpeed: '1 Gbps Port',
    locations: ['Los Angeles', 'San Jose', 'Chicago', 'Dallas', 'New York', 'France'],
    osSupported: ['Ubuntu 24.04', 'Ubuntu 22.04', 'Debian 12', 'AlmaLinux'],
    paymentMethods: ['UPI / NetBanking', 'PayPal', 'Crypto (USDT/BTC)', 'Debit / Credit Card'],
    supportsUpi: true,
    creditCardRequired: false,
    pros: [
      'Cheapest paid VPS on earth (~₹99/month on yearly promo)',
      'Accepts Indian UPI & PayPal directly (No credit card needed!)',
      'Includes dedicated clean IPv4 address',
      'Instant provisioning in under 60 seconds'
    ],
    cons: [
      'Billed annually for the best discount (~$13-$17/year)',
      'Data centers primarily in US & Europe (latency ~180-220ms from India)'
    ],
    bestFor: 'Telegram bots, Python scripts, WireGuard VPN, 24/7 automation, testing',
    officialUrl: 'https://www.racknerd.com/',
    couponTip: 'Look for Black Friday / New Year deals on LowEndBox / RackNerd promo page.'
  },
  {
    id: 'hetzner',
    name: 'Hetzner Cloud',
    category: 'best_value',
    planName: 'CX22 (Intel/AMD EPYC)',
    monthlyUsd: 4.10,
    monthlyInr: 349,
    cpu: '2 vCPU Cores',
    ram: '4 GB RAM',
    ramGb: 4,
    storage: '40 GB NVMe SSD',
    bandwidth: '20 TB / Month',
    portSpeed: '10 Gbps Host Link',
    locations: ['Falkenstein (Germany)', 'Nuremberg (Germany)', 'Helsinki (Finland)', 'Ashburn (US)', 'Singapore'],
    osSupported: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Debian 12', 'Arch', 'Fedora'],
    paymentMethods: ['PayPal', 'International Debit Card', 'Credit Card'],
    supportsUpi: false,
    creditCardRequired: false,
    pros: [
      'Top performance/dollar ratio in the entire cloud industry',
      'Blazing fast NVMe SSD and high single-core CPU speeds',
      'Generous 20,000 GB bandwidth included',
      'Pay-per-hour billing (destroy server anytime and only pay pennies)'
    ],
    cons: [
      'KYC identity verification required during registration',
      'Singapore location has a slight regional surcharge'
    ],
    bestFor: 'Full-stack web apps, production APIs, game servers, Docker stacks',
    officialUrl: 'https://www.hetzner.com/cloud/',
    couponTip: 'New accounts often get €20 free credit via developer referral links.'
  },
  {
    id: 'aws-lightsail',
    name: 'AWS Lightsail',
    category: 'best_value',
    planName: 'Amazon Lightsail 1GB/2GB Bundle',
    monthlyUsd: 3.50,
    monthlyInr: 295,
    cpu: '1 vCPU Core',
    ram: '1 GB RAM (or $5 for 2GB)',
    ramGb: 1,
    storage: '40 GB SSD Storage',
    bandwidth: '1 TB Data Transfer',
    portSpeed: 'High Speed AWS Backbone',
    locations: ['Mumbai (ap-south-1)', 'Sydney (ap-southeast-2)', 'Singapore', 'US-East', 'Frankfurt'],
    osSupported: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Debian', 'Amazon Linux 2023'],
    paymentMethods: ['Indian Debit/Credit Card (SBI, HDFC, ICICI, etc.)'],
    supportsUpi: false,
    creditCardRequired: true,
    pros: [
      'Runs on the EXACT same AWS infrastructure as 54.252.142.201',
      'Predictable fixed pricing without surprise IPv4 or egress bills',
      'Includes static IP and automated snapshots',
      'First 3 months free on eligible instance sizes'
    ],
    cons: [
      'Less RAM compared to Hetzner or Contabo at the same price',
      'Bandwidth overage is $0.09/GB after 1TB'
    ],
    bestFor: 'Anyone who wants genuine AWS quality and Mumbai low ping on a tight budget',
    officialUrl: 'https://aws.amazon.com/lightsail/',
    freeTrialNote: 'First 90 days free for new Lightsail accounts on 512MB and 1GB plans.'
  },
  {
    id: 'contabo',
    name: 'Contabo Cloud VPS',
    category: 'high_specs',
    planName: 'Cloud VPS S',
    monthlyUsd: 5.50,
    monthlyInr: 460,
    cpu: '4 vCPU Cores',
    ram: '8 GB RAM',
    ramGb: 8,
    storage: '50 GB NVMe (or 200 GB SSD)',
    bandwidth: '32 TB / Month (1 Gbps port)',
    portSpeed: '1 Gbps Port',
    locations: ['Germany', 'USA (New York, Seattle)', 'UK', 'Singapore', 'India', 'Japan'],
    osSupported: ['Ubuntu 24.04', 'Ubuntu 22.04', 'Debian 12', 'CentOS', 'Windows Server'],
    paymentMethods: ['PayPal', 'Debit Card', 'Credit Card'],
    supportsUpi: false,
    creditCardRequired: false,
    pros: [
      'Unbeatable hardware specifications: 4 Cores + 8 GB RAM for ~$5.50',
      'Massive 32 TB bandwidth allowance',
      'Option for 200 GB SSD or 50 GB fast NVMe',
      'IPv4 and IPv6 included free'
    ],
    cons: [
      'One-time setup fee on monthly billing (waived on longer terms)',
      'CPU is shared, so heavy sustained 100% CPU loads may get throttled'
    ],
    bestFor: 'Heavy Docker stacks, GitLab runners, multi-service databases, Minecraft servers',
    officialUrl: 'https://contabo.com/en/vps/',
    couponTip: 'Select annual billing to waive the setup fee.'
  },
  {
    id: 'hostinger',
    name: 'Hostinger VPS',
    category: 'india_friendly',
    planName: 'KVM 1',
    monthlyUsd: 4.99,
    monthlyInr: 399,
    cpu: '1 vCPU Core',
    ram: '4 GB RAM',
    ramGb: 4,
    storage: '50 GB NVMe SSD',
    bandwidth: '4 TB / Month',
    portSpeed: '300 Mbps',
    locations: ['India (Mumbai)', 'USA', 'United Kingdom', 'France', 'Brazil'],
    osSupported: ['Ubuntu 24.04', 'Ubuntu 22.04', 'Debian', 'CentOS'],
    paymentMethods: ['UPI (GPay, PhonePe, Paytm)', 'NetBanking', 'RuPay Card', 'PayPal'],
    supportsUpi: true,
    creditCardRequired: false,
    pros: [
      'Direct UPI and Indian RuPay card payment (zero forex charges)',
      'Data center in Mumbai (ultra-low 10-25ms ping inside India)',
      'Easy browser-based web terminal and AI assistant',
      'Weekly automated backups included free'
    ],
    cons: [
      'Best ₹399/mo price requires multi-month or annual commitment',
      'Renewal price is slightly higher after introductory period'
    ],
    bestFor: 'Indian developers needing UPI payment and ultra-fast Mumbai ping without credit cards',
    officialUrl: 'https://www.hostinger.in/vps-hosting',
    couponTip: 'Use standard coupon codes like SAVE10 at checkout for an extra 10% off.'
  },
  {
    id: 'ovh-cloud',
    name: 'OVHcloud VPS',
    category: 'ultra_budget',
    planName: 'Starter VPS',
    monthlyUsd: 3.50,
    monthlyInr: 290,
    cpu: '1 vCPU Core',
    ram: '2 GB RAM',
    ramGb: 2,
    storage: '20 GB SSD SATA',
    bandwidth: 'Unmetered (100 Mbps)',
    portSpeed: '100 Mbps Unmetered',
    locations: ['France (Gravelines, Roubaix)', 'Poland', 'Canada (Beauharnois)', 'Australia (Sydney)'],
    osSupported: ['Ubuntu 24.04 LTS', 'Ubuntu 22.04 LTS', 'Debian', 'Fedora'],
    paymentMethods: ['Credit/Debit Card', 'PayPal'],
    supportsUpi: false,
    creditCardRequired: false,
    pros: [
      'Legendary OVH Anti-DDoS protection included at no extra charge',
      'Unmetered bandwidth with zero surprise overage fees',
      'Data center in Sydney Australia (same city as 54.252.142.201!)',
      'Very stable European network backbone'
    ],
    cons: [
      'Port speed capped at 100 Mbps on the starter tier',
      'Support response time can be slow on basic tier'
    ],
    bestFor: 'DDoS-protected services, game bots, Australian/European traffic',
    officialUrl: 'https://www.ovhcloud.com/en/vps/',
    couponTip: 'Look for annual prepay discounts on OVH promotions.'
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    category: 'best_value',
    planName: 'Basic Droplet',
    monthlyUsd: 4.00,
    monthlyInr: 335,
    cpu: '1 vCPU Core',
    ram: '512MB / 1 GB RAM ($6)',
    ramGb: 1,
    storage: '10 GB - 25 GB SSD',
    bandwidth: '500 GB - 1 TB Transfer',
    portSpeed: '1 Gbps Network',
    locations: ['Bangalore (India)', 'Singapore', 'Frankfurt', 'New York', 'San Francisco', 'London'],
    osSupported: ['Ubuntu 24.04', 'Ubuntu 22.04', 'Debian', 'CentOS', 'Fedora'],
    paymentMethods: ['PayPal', 'International Debit/Credit Card'],
    supportsUpi: false,
    creditCardRequired: false,
    pros: [
      'World-class documentation and user-friendly control panel',
      'Bangalore data center for fast Indian local traffic',
      '1-Click Marketplace apps (WordPress, Docker, WireGuard)',
      '$200 free credit for 60 days on student GitHub pack or referral'
    ],
    cons: [
      'Entry $4 plan only has 512MB RAM; 1GB RAM is $6/mo',
      'Added fees for snapshots ($0.06/GB)'
    ],
    bestFor: 'Beginners learning cloud infrastructure, web apps, GitHub Student pack users',
    officialUrl: 'https://www.digitalocean.com/',
    freeTrialNote: '$200 free credit for 60 days with new account referral.'
  }
];

export interface IpAnalysis {
  ip: string;
  isp: string;
  asn: string;
  organization: string;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  cloudProvider: string;
  serviceType: string;
  defaultUser: string;
  estimatedEc2Cost: {
    monthlyUsd: number;
    monthlyInr: number;
    breakdown: { item: string; costUsd: number; costInr: number; note: string }[];
  };
  whyExpensive: string[];
}

export const TARGET_IP_DATA: IpAnalysis = {
  ip: '54.252.142.201',
  isp: 'Amazon.com, Inc. / AWS',
  asn: 'AS16509 (AMAZON-02)',
  organization: 'Amazon Data Services Sydney',
  city: 'Sydney',
  country: 'Australia',
  countryCode: 'AU',
  region: 'ap-southeast-2 (Asia Pacific - Sydney)',
  cloudProvider: 'Amazon Web Services (AWS)',
  serviceType: 'Amazon EC2 (Elastic Compute Cloud)',
  defaultUser: 'ubuntu',
  estimatedEc2Cost: {
    monthlyUsd: 18.85,
    monthlyInr: 1590,
    breakdown: [
      {
        item: 't3.micro (2 vCPU burstable, 1 GB RAM)',
        costUsd: 8.50,
        costInr: 715,
        note: '$0.0116/hour base compute'
      },
      {
        item: 'Public IPv4 Address Fee (Mandatory on AWS)',
        costUsd: 3.65,
        costInr: 307,
        note: '$0.005/hour mandatory charge by AWS for all public IPs'
      },
      {
        item: 'EBS General Purpose SSD (gp3 - 30 GB)',
        costUsd: 2.70,
        costInr: 228,
        note: '$0.09 per GB-month root volume storage'
      },
      {
        item: 'Bandwidth Egress (Estimated ~40GB outbound)',
        costUsd: 4.00,
        costInr: 340,
        note: 'AWS charges $0.09 - $0.11 per GB outbound to internet'
      }
    ]
  },
  whyExpensive: [
    'AWS EC2 bills every component separately (Compute + IPv4 + EBS Disk + Bandwidth).',
    'Starting 2024, AWS charges $3.65/month just for holding a public IPv4 address!',
    'Bandwidth on AWS is very costly ($0.09/GB egress), whereas budget VPS providers give 2,000GB - 20,000GB free!',
    'If you forget an EC2 instance running without stopping it, the monthly bill can jump to ₹2,000 - ₹5,000+.'
  ]
};
