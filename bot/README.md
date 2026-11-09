# 👑 CHEAP API & OTP TELEGRAM BOT PRO (@cheap_api_bot Clone)

A complete, production-ready clone of **@cheap_api_bot** featuring Virtual Numbers, Real-Time OTPs, Russian Telegram Accounts (+7 TData/Sessions), Instant UPI Payments with 1-click Admin verification, Developer API, and Referral Rewards.

---

## 🚀 Key Features

1. **Virtual Numbers & Instant OTPs**:
   - Telegram, WhatsApp, Gmail, Instagram, Discord, OpenAI
   - Dedicated Russian (+7), USA (+1), India (+91), Indonesia (+62)
   - Real-time polling with `🔄 Refresh OTP` and `❌ Cancel & Auto-Refund` (20-min timer).

2. **Ready Russian Telegram Accounts**:
   - Aged 2021-2023 TData (+7 9xx) with 2FA password provided.
   - Fresh Russia pre-registered accounts.
   - Telethon / Pyrogram python session strings.

3. **UPI Payment Gateway (Indian Users)**:
   - Dynamic UPI payment instructions (`vinit-godara@fam`).
   - 12-digit UTR submission.
   - **Admin Instant 1-Click Verification**: Admin receives an interactive Telegram card with `[✅ Approve]` and `[❌ Reject]` buttons. Approving instantly credits the user's wallet!

4. **Developer API (`/api_key`)**:
   - Every user gets their private API key to connect to SMM Panels, Websites, or Custom Scripts.
   - Endpoints: `balance`, `get_number`, `get_status`, `cancel`.

5. **Referral & Earn**:
   - Shareable link `t.me/BotUsername?start=ref_USERID`.
   - Users earn ₹2.00 free wallet credit per referral.

6. **24/7 Keep-Alive Web Server**:
   - Built-in lightweight HTTP server running on port 8080.
   - Never sleeps on Koyeb or Hugging Face Spaces!

---

## 🛠️ Environment Variables Configuration

Set these in your host dashboard (or `.env` file):

| Variable | Description | Example |
| :--- | :--- | :--- |
| `BOT_TOKEN` | Token from @BotFather on Telegram | `7945621834:AAFt...` |
| `ADMIN_ID` | Your Telegram numeric User ID | `789654321` (Get from @userinfobot) |
| `OWNER_UPI` | Your UPI ID to receive payments | `vinit-godara@fam` |
| `OWNER_NAME` | Name shown on UPI screen | `VINIT GODARA` |
| `BOT_USERNAME` | Your Telegram bot username | `Cheap_Api_Pro_Bot` |
| `SUPPORT_USERNAME` | Admin handle for user support | `@vinitgodara453` |
| `PORT` | Web port for health check | `8080` |

---

## 🌐 24/7 Free Hosting Setup (No Sleep, No Railway, No Render)

### Option 1: Koyeb (Recommended - 100% Free & Always Active)
1. Go to [https://www.koyeb.com](https://www.koyeb.com) and sign up with GitHub.
2. Click **Create App** -> **GitHub**.
3. Select your repository: `vinitgodara453-collab/black-xera`.
4. Set root directory to `bot` (or root if bot is at root).
5. In **Environment Variables**, add:
   - `BOT_TOKEN` = `your_telegram_bot_token`
   - `ADMIN_ID` = `your_telegram_id`
   - `OWNER_UPI` = `vinit-godara@fam`
6. Click **Deploy**. Koyeb will run your bot 24/7 forever without sleeping!

---

### Option 2: Hugging Face Spaces (Docker - 16 GB RAM Free)
1. Go to [https://huggingface.co/new-space](https://huggingface.co/new-space).
2. Space Name: `cheap-api-bot`, Space SDK: **Docker** (Blank).
3. Under **Settings** -> **Variables and secrets**, add `BOT_TOKEN` and `ADMIN_ID`.
4. Push this bot folder to the Space Git repository:
   ```bash
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/cheap-api-bot
   git push hf main
   ```
5. It stays online 24/7 with zero sleeping.

---

### Option 3: Termux (Directly from Phone)
1. Open Termux on Android:
   ```bash
   pkg update && pkg install python git tmux -y
   git clone https://github.com/vinitgodara453-collab/black-xera.git
   cd black-xera/bot
   pip install -r requirements.txt
   ```
2. Set token and run in background:
   ```bash
   export BOT_TOKEN="your_bot_token_here"
   export ADMIN_ID="your_telegram_id_here"
   termux-wake-lock
   tmux new -s bot "python bot.py"
   ```
3. Detach tmux using `Ctrl + B` then `D`. The bot will run continuously in the background!
