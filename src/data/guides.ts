export interface QuickScript {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  category: 'security' | 'docker' | 'python' | 'web' | 'vpn';
  commands: string[];
}

export const QUICK_SCRIPTS: QuickScript[] = [
  {
    id: 'essential-security',
    title: 'Essential Security & Updates (Pehla Kaam)',
    titleHi: 'नया VPS लेते ही ये 3 कमांड चलाएं (Security & Update)',
    description: 'Update packages, enable basic firewall, and secure SSH login.',
    descriptionHi: 'सिस्टम को अपडेट करें, UFW फायरवॉल चालू करें ताकि सर्वर हैक न हो।',
    category: 'security',
    commands: [
      '# 1. Update all packages to latest versions',
      'sudo apt update && sudo apt upgrade -y',
      '',
      '# 2. Allow SSH before enabling firewall (Important! Do not skip or you get locked out)',
      'sudo ufw allow 22/tcp',
      'sudo ufw allow 80/tcp',
      'sudo ufw allow 443/tcp',
      '',
      '# 3. Enable UFW firewall',
      'sudo ufw enable',
      '',
      '# 4. Check status',
      'sudo ufw status verbose'
    ]
  },
  {
    id: 'docker-setup',
    title: 'Install Docker & Docker Compose',
    titleHi: 'Docker & Docker Compose 1-Click इनस्टॉल',
    description: 'Install official modern Docker engine on Ubuntu 24.04 / 22.04 LTS.',
    descriptionHi: 'कंटेनर ऐप्स, डेटाबेस और बॉट चलाने के लिए डॉकर इनस्टॉल करें।',
    category: 'docker',
    commands: [
      '# Official Docker automated install script',
      'curl -fsSL https://get.docker.com -o get-docker.sh',
      'sudo sh get-docker.sh',
      '',
      '# Add your current user to docker group (so you don\'t need sudo every time)',
      'sudo usermod -aG docker $USER',
      '',
      '# Verify docker installation',
      'docker --version',
      'docker compose version'
    ]
  },
  {
    id: 'python-telegram-bot',
    title: 'Python 3, Pip & 24/7 Bot Runner (Systemd)',
    titleHi: 'Telegram Bot & Python 24/7 बैकग्राउंड रनर',
    description: 'Setup Python environment and create a systemd service that never stops.',
    descriptionHi: 'टेलीग्राम बॉट या पाइथन स्क्रिप्ट को 24 घंटे बिना बंद हुए चलाने के लिए।',
    category: 'python',
    commands: [
      '# Install Python, pip, and virtual environment tools',
      'sudo apt install -y python3 python3-pip python3-venv git tmux',
      '',
      '# Create project directory and venv',
      'mkdir -p ~/mybot && cd ~/mybot',
      'python3 -m venv venv',
      'source venv/bin/activate',
      '',
      '# Install your requirements (e.g., aiogram or pyTelegramBotAPI)',
      'pip install pyTelegramBotAPI python-dotenv requests',
      '',
      '# Run in background via tmux (Detaches with Ctrl+B then D):',
      'tmux new -s bot_session "python3 bot.py"'
    ]
  },
  {
    id: 'nginx-ssl',
    title: 'Nginx Web Server + Free SSL (Let\'s Encrypt)',
    titleHi: 'Nginx वेब सर्वर + फ्री SSL सर्टिफिकेट',
    description: 'Host websites, APIs, or reverse proxy with automatic HTTPS encryption.',
    descriptionHi: 'अपनी वेबसाइट या API को फ्री SSL (HTTPS) के साथ लाइव करें।',
    category: 'web',
    commands: [
      '# Install Nginx and Certbot',
      'sudo apt install -y nginx certbot python3-certbot-nginx',
      '',
      '# Start and enable Nginx',
      'sudo systemctl start nginx',
      'sudo systemctl enable nginx',
      '',
      '# Get free SSL certificate (Replace yourdomain.com with your actual domain)',
      '# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com'
    ]
  },
  {
    id: 'wireguard-vpn',
    title: 'Fast WireGuard VPN / Outline Server',
    titleHi: 'पर्सनल प्राइवेट VPN सर्वर (WireGuard)',
    description: 'Run your own ultra-fast private VPN to bypass blocks and protect traffic.',
    descriptionHi: 'अपना खुद का सुपरफास्ट प्राइवेट VPN बनाएं और हाई स्पीड इंटरनेट एक्सेस करें।',
    category: 'vpn',
    commands: [
      '# Easy 1-click WireGuard installer script (Angristan)',
      'curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh',
      'chmod +x wireguard-install.sh',
      'sudo ./wireguard-install.sh',
      '',
      '# Follow the on-screen prompts; it will generate a QR code for your phone!',
      '# WireGuard app is free on Android, iOS, Windows, Mac.'
    ]
  }
];

export interface SetupStep {
  step: number;
  title: string;
  titleHi: string;
  shortDesc: string;
  shortDescHi: string;
  details: string[];
  detailsHi: string[];
}

export const SETUP_STEPS: SetupStep[] = [
  {
    step: 1,
    title: 'Choose the Right Provider (Bina Credit Card ya Saste me)',
    titleHi: 'सही प्रोवाइडर चुनें (सस्ते में या बिना क्रेडिट कार्ड)',
    shortDesc: 'Pick based on your payment mode and monthly budget.',
    shortDescHi: 'अगर UPI है तो RackNerd/Hostinger लें; अगर फ्री चाहिए तो Oracle Cloud लें।',
    details: [
      'If you have NO Credit Card and want UPI/GPay: Pick RackNerd (~₹99/mo) or Hostinger (~₹399/mo).',
      'If you want 100% FREE forever: Go with Oracle Cloud Always Free (24GB RAM ARM).',
      'If you want the absolute highest performance for $4/mo: Hetzner Cloud CX22 is unbeatable.',
      'If you want AWS ecosystem specifically: Pick AWS Lightsail ($3.50/mo fixed) instead of EC2.'
    ],
    detailsHi: [
      'अगर आपके पास इंटरनेशनल क्रेडिट कार्ड नहीं है (सिर्फ UPI / PhonePe / Paytm है): RackNerd (₹99/महीना) या Hostinger लें।',
      'अगर बिल्कुल ₹0 (फ्री) में हमेशा के लिए चाहिए: Oracle Cloud Free Tier पर जाएं (24 GB RAM और 4 Cores फ्री मिलते हैं)।',
      'अगर सबसे दमदार स्पीड और NVMe डिस्क चाहिए: Hetzner Cloud CX22 (~₹349/महीना) सबसे बेस्ट है।',
      'अगर आपको AWS का ही सर्वर चाहिए लेकिन सस्ता: AWS Lightsail लें ($3.50/माह फिक्स बिल, कोई हिडन चार्ज नहीं)।'
    ]
  },
  {
    step: 2,
    title: 'Select OS: Ubuntu 24.04 LTS (Noble Numbat)',
    titleHi: 'ऑपरेटिंग सिस्टम चुनें: Ubuntu 24.04 या 22.04 LTS',
    shortDesc: 'Always select Ubuntu LTS (Long Term Support) for max compatibility.',
    shortDescHi: 'हमेशा LTS (Long Term Support) वर्जन ही चुनें, 5 साल तक अपडेट मिलते हैं।',
    details: [
      'Ubuntu is the industry standard (90% of tutorials and Docker images are built for it).',
      'Default user for Ubuntu is usually "ubuntu" on AWS, or "root" on Hetzner/RackNerd/Contabo.',
      'LTS means guaranteed security updates without breaking your running services.'
    ],
    detailsHi: [
      'Ubuntu दुनिया का सबसे पॉपुलर Linux OS है—सारे ट्यूटोरियल, Docker कंटेनर और बॉट्स इस पर तुरंत चलते हैं।',
      'AWS पर डिफॉल्ट यूजर "ubuntu" होता है, जबकि Hetzner/RackNerd पर डिफॉल्ट "root" होता है।',
      'LTS का मतलब 5 साल तक फ्री सिक्योरिटी अपडेट्स।'
    ]
  },
  {
    step: 3,
    title: 'Connect via SSH from Windows, Mac, or Android',
    titleHi: 'SSH से सर्वर कनेक्ट करें (Terminal / Putty / Termux)',
    shortDesc: 'Use your computer terminal or phone to login securely.',
    shortDescHi: 'अपने लैपटॉप या मोबाइल से 1 लाइन कमांड लिखकर सर्वर में लॉग इन करें।',
    details: [
      'Windows 10/11 & Mac: Open "Command Prompt", "PowerShell", or "Terminal".',
      'Android Phone: Install free "Termux" or "JuiceSSH" app from Play Store.',
      'Command: ssh username@YOUR_SERVER_IP (e.g. ssh ubuntu@54.252.142.201)',
      'If using an SSH Key (.pem / .id_rsa): ssh -i mykey.pem ubuntu@54.252.142.201'
    ],
    detailsHi: [
      'Windows या Mac में सीधे CMD / PowerShell / Terminal खोलें।',
      'Android मोबाइल से चलाने के लिए Play Store से "Termux" या "JuiceSSH" ऐप इनस्टॉल करें।',
      'कमांड लिखें: ssh username@YOUR_IP (जैसे: ssh ubuntu@54.252.142.201)',
      'अगर AWS की .pem की-फाइल है: ssh -i key.pem ubuntu@54.252.142.201'
    ]
  },
  {
    step: 4,
    title: 'Keep Your Bot/App Running 24/7 Even If PC is Off',
    titleHi: 'PC बंद होने के बाद भी बॉट/स्क्रिप्ट 24/7 कैसे चलाएं?',
    shortDesc: 'Use Screen, Tmux, PM2, or Systemd daemon service.',
    shortDescHi: 'Tmux या Screen इस्तेमाल करें ताकि टर्मिनल बंद करने पर भी कोड चलता रहे।',
    details: [
      'Option A (Quickest): Run `tmux` -> run your script -> press `Ctrl+B` then `D` to detach.',
      'Option B (For Node.js): Install PM2 (`npm install -g pm2 && pm2 start app.js --name myapp`).',
      'Option C (For Production Python): Create a `systemd` service file in `/etc/systemd/system/`.'
    ],
    detailsHi: [
      'तरीका 1 (सबसे आसान): सर्वर में `tmux` लिखें -> अपनी फाइल चलाएं -> कीबोर्ड पर `Ctrl+B` दबाकर `D` दबाएं। सेशन बैकग्राउंड में चलता रहेगा!',
      'तरीका 2 (Node.js/React के लिए): `pm2` इस्तेमाल करें (`pm2 start index.js`).',
      'तरीका 3 (Systemd Service): सिस्टम सर्विस बनाएं ताकि VPS रीस्टार्ट होने पर भी बॉट अपने आप चालू हो जाए।'
    ]
  }
];

export interface UseCaseRecommendation {
  id: string;
  title: string;
  titleHi: string;
  iconName: string;
  recommendedProviderId: string;
  whyThis: string;
  whyThisHi: string;
  specsNeeded: string;
  approxCost: string;
}

export const USE_CASES: UseCaseRecommendation[] = [
  {
    id: 'telegram-bot',
    title: 'Telegram / Discord Bot / Python Scripts',
    titleHi: 'Telegram Bot या Python स्क्रिप्ट 24/7 चलाना',
    iconName: 'Bot',
    recommendedProviderId: 'racknerd',
    whyThis: 'Bots consume very little RAM (<300MB). RackNerd at ~₹99/mo ($13.98/year) gives you 1.5GB RAM and a 24/7 clean IP.',
    whyThisHi: 'टेलीग्राम बॉट बहुत कम RAM (200-300MB) लेते हैं। RackNerd पर मात्र ₹99/माह में 1.5GB RAM मिलती है जो बॉट के लिए एकदम परफेक्ट है।',
    specsNeeded: '1 vCPU, 1GB - 2GB RAM',
    approxCost: '₹99/month (~$1.15/mo)'
  },
  {
    id: 'free-testing',
    title: 'College Projects / Learning Linux for Free',
    titleHi: 'कॉलेज प्रोजेक्ट / Linux सीखने के लिए बिल्कुल फ्री',
    iconName: 'GraduationCap',
    recommendedProviderId: 'oracle-free',
    whyThis: 'Oracle Cloud gives 4 OCPU ARM and 24 GB RAM for 100% Free Forever. Zero ongoing cost.',
    whyThisHi: 'Oracle Cloud हमेशा के लिए फ्री है (₹0)। इसमें 24GB RAM और 200GB स्टोरेज मिलता है। सीखने के लिए सबसे बेस्ट।',
    specsNeeded: 'Up to 24GB RAM, 4 Cores',
    approxCost: '₹0 / Forever'
  },
  {
    id: 'web-production',
    title: 'Production Website / Fast APIs / SaaS',
    titleHi: 'फास्ट वेबसाइट, Node.js API या प्रोडक्शन वेब ऐप',
    iconName: 'Globe',
    recommendedProviderId: 'hetzner',
    whyThis: 'Hetzner CX22 has top-tier AMD/Intel single-thread performance, NVMe disks, and 20TB traffic for ~₹349/mo.',
    whyThisHi: 'Hetzner की स्पीड और NVMe डिस्क बहुत ज्यादा तेज है। ₹349/महीने में 4GB RAM और 2 vCPU मिलता है।',
    specsNeeded: '2 vCPU, 4GB RAM, NVMe SSD',
    approxCost: '₹349/month (~$4.10/mo)'
  },
  {
    id: 'india-upi',
    title: 'Lowest Ping in India + Easy UPI Payment',
    titleHi: 'भारत में सबसे कम पिंग (<20ms) और डायरेक्ट UPI पेमेंट',
    iconName: 'CreditCard',
    recommendedProviderId: 'hostinger',
    whyThis: 'Mumbai data center ensures <20ms latency inside India, and you can pay directly via PhonePe, GPay, or Paytm.',
    whyThisHi: 'मुंबई डेटा सेंटर होने से भारत में सुपरफास्ट स्पीड मिलती है, और बिना क्रेडिट कार्ड PhonePe/GPay से पेमेंट कर सकते हैं।',
    specsNeeded: '1 vCPU, 4GB RAM, Mumbai DC',
    approxCost: '₹399/month'
  },
  {
    id: 'heavy-docker',
    title: 'Heavy Docker Stacks / Game Servers / DBs',
    titleHi: 'मल्टीपल Docker कंटेनर या हैवी डेटाबेस सर्वर',
    iconName: 'Layers',
    recommendedProviderId: 'contabo',
    whyThis: 'Contabo Cloud VPS S gives a gigantic 8 GB RAM and 4 vCPU cores for only ~$5.50 (~₹460/mo).',
    whyThisHi: 'Contabo में मात्र ₹460/महीने में 8GB RAM और 4 vCPU कोर मिलते हैं। हैवी ऐप्स आसानी से चल जाते हैं।',
    specsNeeded: '4 vCPU, 8GB RAM',
    approxCost: '₹460/month (~$5.50/mo)'
  }
];
