# 👑 Naitik Hosting Bot Pro (Python Telegram Bot)

A high-speed Telegram Cloud Hosting Bot designed for deployment on **Railway.app**, **Render**, or **VPS**.

---

## ⚡ Features
- 🚀 **Host Python & Node.js Bots**: Users can upload `.py`, `.js`, or `.zip` files to run 24/7.
- 💳 **Direct Indian UPI Auto-Recharge**: Direct payment via PhonePe, Paytm, and Google Pay to `bajranggodara930@okaxis`.
- 🧾 **UTR Verification System**: Users enter 12-digit UTR; Admin gets instant Approve/Reject buttons.
- 👑 **VIP & Pricing Tiers**: Starter (₹29), Pro (₹49), Ultra (₹99), Diamond VIP (₹199).
- 🛠️ **Master Admin Panel (`/admin`)**: User stats, live pending payments, balance manager, broadcast.
- 💎 **Premium Styled UI**: Clean inline keyboard menus with animated status indicators.

---

## 🚀 How to Host on Railway.app (Step-by-Step)

### Step 1: Create Your Bot on Telegram
1. Open Telegram and search for `@BotFather`.
2. Send `/newbot`, choose a name and username (e.g. `My_Hosting_Bot`).
3. Copy the **HTTP API Bot Token** (e.g. `7892341234:AAH...`).

### Step 2: Get Your Telegram Numeric ID
1. Search for `@userinfobot` on Telegram and send `/start`.
2. Copy your numeric **Id** (e.g. `123456789`). This is your `ADMIN_ID`.

### Step 3: Deploy to Railway.app
1. Go to [Railway.app](https://railway.app/) and sign up with GitHub or Email.
2. Click **"New Project"** -> **"Deploy from GitHub repo"** (or upload this folder).
3. In your Railway Project Settings, go to **"Variables"** and add these 3 variables:
   - `BOT_TOKEN` = `your_telegram_bot_token_here`
   - `ADMIN_ID` = `your_numeric_telegram_user_id`
   - `OWNER_UPI` = `bajranggodara930@okaxis`
   - `OWNER_NAME` = `Bajrang Godara`
4. Railway will automatically detect the `Procfile` (`worker: python bot.py`) and start your bot 24/7!

---

## 💻 How to Run Locally (PC / VPS)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the bot
python bot.py
```

---

## 📲 How to Connect Termux with Railway.app (Mobile Deployment)

You can push and control Railway directly from your mobile using Termux!

### Method 1: Railway Official CLI via Termux Package

```bash
# 1. Termux package manager se railway install karein (npm install mat karein, Android pe error deta hai):
pkg update && pkg install railway-cli -y

# 2. Login to Railway from Termux
railway login --browserless
# (Termux will output a pairing URL. Open that URL in your phone's browser and tap Approve)

# 4. Navigate to your bot directory
cd ~/bot

# 5. Connect to Railway
railway init
# Choose "Empty Project" or link your existing project

# 6. Set your Bot Token and UPI credentials
railway variables --set BOT_TOKEN="your_bot_father_token"
railway variables --set ADMIN_ID="your_telegram_numeric_id"
railway variables --set OWNER_UPI="bajranggodara930@okaxis"

# 7. Upload and start the bot on Railway cloud
railway up

# 8. View live logs in Termux anytime
railway logs
```

### Method 2: API Token Method (Zero Browser hassle)
If `railway login --browserless` gives any issue:
1. Open [Railway.app](https://railway.app) -> **Account Settings** -> **Tokens** -> Click **Create New Token**.
2. In Termux, run:
```bash
export RAILWAY_TOKEN="paste_your_railway_token_here"
railway up
```
Your bot will immediately be live 24/7 on Railway cloud without needing your mobile to stay on or connected!

