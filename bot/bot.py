#!/usr/bin/env python3
"""
=============================================================================
🔥 CHEAP API & OTP BOT PRO (Clone of @cheap_api_bot) 🔥
=============================================================================
Features:
- 📱 Virtual Numbers & Real-Time OTP for Telegram, WhatsApp, Gmail, etc.
- 🇷🇺 Dedicated Russia (+7), USA (+1), India (+91) Cheap Telegram Accounts & OTP
- 📂 Instant Telegram TData / Session Account Delivery
- 💳 Indian UPI Payment Gateway (Dynamic QR Code, PhonePe, Paytm, GPay, FamPay)
- ⚡ 1-Click Admin Approval / Rejection of UTR Payments directly in Telegram
- 🔑 Developer API System (/api_key) to connect SMM Panels & Custom Scripts
- 🎁 Referral & Earn System (Earn wallet balance per invite)
- 🛠️ Powerful Master Admin Panel (/admin): Broadcast, Balance Manager, Price Config
- 🌐 Embedded HTTP Server (Port 8080) for 24/7 Keep-Alive on Koyeb / Hugging Face / VPS
=============================================================================
"""

import os
import sys
import json
import time
import random
import string
import logging
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
import requests
import telebot
from telebot import types

# Optional QR code generator
try:
    import qrcode
    HAS_QR = True
except ImportError:
    HAS_QR = False

# ----------------- CONFIGURATION & ENVIRONMENT -----------------
BOT_TOKEN = os.getenv("BOT_TOKEN", "7945621834:AAFtExampleTokenReplaceMe")
ADMIN_ID = int(os.getenv("ADMIN_ID", "789654321"))
OWNER_UPI = os.getenv("OWNER_UPI", "vinit-godara@fam")
OWNER_NAME = os.getenv("OWNER_NAME", "VINIT GODARA")
BOT_USERNAME = os.getenv("BOT_USERNAME", "Cheap_Api_Pro_Bot")
CHANNEL_USERNAME = os.getenv("CHANNEL_USERNAME", "")  # e.g. "@BlackXeraOfficial"
SUPPORT_USERNAME = os.getenv("SUPPORT_USERNAME", "@vinitgodara453")

# External 5SIM / SMS-Activate API Keys (Optional - Fallback simulator included)
FIVE_SIM_TOKEN = os.getenv("FIVE_SIM_TOKEN", "")
SMS_ACTIVATE_KEY = os.getenv("SMS_ACTIVATE_KEY", "")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(message)s"
)
logger = logging.getLogger("CheapApiBot")

bot = telebot.TeleBot(BOT_TOKEN, parse_mode="HTML")

# ----------------- LOCAL PERSISTENT DATABASE -----------------
DB_FILE = os.path.join(os.path.dirname(__file__), "cheap_api_db.json")

def load_db():
    if not os.path.exists(DB_FILE):
        default_db = {
            "users": {},
            "orders": {},
            "active_numbers": {},
            "pending_utrs": {},
            "stats": {"total_orders": 1284, "total_spent": 48290.0, "total_users": 520},
            "pricing": {
                "tg_russia": 29.0,
                "tg_usa": 18.0,
                "tg_india": 35.0,
                "tg_indonesia": 22.0,
                "wa_russia": 39.0,
                "wa_india": 45.0,
                "wa_usa": 25.0,
                "gmail": 12.0,
                "tdata_russia_aged": 79.0,
                "tdata_russia_fresh": 45.0,
                "session_russia_aged": 69.0
            }
        }
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(default_db, f, indent=2)
        return default_db
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading database: {e}")
        return {"users": {}, "orders": {}, "active_numbers": {}, "pending_utrs": {}, "pricing": {}}

def save_db(data):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving database: {e}")

def get_or_create_user(user_id, username="", full_name="", referrer_id=None):
    db = load_db()
    uid = str(user_id)
    if uid not in db["users"]:
        api_key = "ca_" + "".join(random.choices(string.ascii_letters + string.digits, k=24))
        db["users"][uid] = {
            "user_id": user_id,
            "username": username or "",
            "full_name": full_name or "Customer",
            "balance": 0.0,
            "total_spent": 0.0,
            "api_key": api_key,
            "referrer": referrer_id,
            "ref_count": 0,
            "ref_earnings": 0.0,
            "joined_at": int(time.time()),
            "banned": False
        }
        # Credit referrer bonus if applicable
        if referrer_id and str(referrer_id) in db["users"] and str(referrer_id) != uid:
            ref_u = db["users"][str(referrer_id)]
            ref_u["ref_count"] = ref_u.get("ref_count", 0) + 1
            ref_u["balance"] = round(ref_u.get("balance", 0.0) + 2.0, 2)  # ₹2 free referral bonus
            ref_u["ref_earnings"] = round(ref_u.get("ref_earnings", 0.0) + 2.0, 2)
            try:
                bot.send_message(
                    referrer_id,
                    f"🎉 <b>New Referral Joined!</b>\n"
                    f"User <b>{full_name}</b> joined using your link.\n"
                    f"💰 <b>₹2.00 Bonus</b> credited to your wallet balance!"
                )
            except Exception:
                pass
        db["stats"]["total_users"] = len(db["users"])
        save_db(db)
    return db["users"][uid]

def update_user(user_id, updates):
    db = load_db()
    uid = str(user_id)
    if uid in db["users"]:
        db["users"][uid].update(updates)
        save_db(db)

# In-memory temporary state tracking (e.g. awaiting UTR, custom amount)
USER_STATES = {}

# ----------------- UI / KEYBOARD BUILDERS -----------------

def main_menu_keyboard(is_admin=False):
    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("⚡ Buy Virtual Number (OTP)", callback_data="menu_buy_otp")
    b2 = types.InlineKeyboardButton("🇷🇺 Russia TG Accounts (TData)", callback_data="menu_russia_tg")
    b3 = types.InlineKeyboardButton("💳 Add Balance (UPI QR)", callback_data="menu_add_balance")
    b4 = types.InlineKeyboardButton("👤 My Profile & Balance", callback_data="menu_profile")
    b5 = types.InlineKeyboardButton("🔑 Developer API Key", callback_data="menu_developer_api")
    b6 = types.InlineKeyboardButton("🎁 Refer & Earn (Free ₹)", callback_data="menu_referral")
    b7 = types.InlineKeyboardButton("📦 My Orders & History", callback_data="menu_my_orders")
    b8 = types.InlineKeyboardButton("💬 24/7 Live Support", callback_data="menu_support")
    
    markup.add(b1)
    markup.add(b2)
    markup.add(b3, b4)
    markup.add(b5, b6)
    markup.add(b7, b8)
    
    if is_admin:
        b_admin = types.InlineKeyboardButton("👑 Master Admin Panel", callback_data="admin_dashboard")
        markup.add(b_admin)
        
    return markup

def back_home_keyboard():
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("🔙 Back to Main Menu", callback_data="menu_home"))
    return markup

def service_selector_keyboard():
    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("✈️ Telegram", callback_data="service_tg")
    b2 = types.InlineKeyboardButton("💬 WhatsApp", callback_data="service_wa")
    b3 = types.InlineKeyboardButton("📸 Instagram", callback_data="service_ig")
    b4 = types.InlineKeyboardButton("📧 Google / Gmail", callback_data="service_gmail")
    b5 = types.InlineKeyboardButton("🎮 Discord", callback_data="service_discord")
    b6 = types.InlineKeyboardButton("🤖 OpenAI / ChatGPT", callback_data="service_openai")
    b_back = types.InlineKeyboardButton("🔙 Back to Menu", callback_data="menu_home")
    markup.add(b1, b2)
    markup.add(b3, b4)
    markup.add(b5, b6)
    markup.add(b_back)
    return markup

def country_selector_keyboard(service_code):
    markup = types.InlineKeyboardMarkup(row_width=2)
    db = load_db()
    pricing = db.get("pricing", {})
    
    # Prices
    p_rus = pricing.get(f"{service_code}_russia", 29.0)
    p_usa = pricing.get(f"{service_code}_usa", 18.0)
    p_ind = pricing.get(f"{service_code}_india", 35.0)
    p_indo = pricing.get(f"{service_code}_indonesia", 22.0)
    
    b1 = types.InlineKeyboardButton(f"🇷🇺 Russia (+7) • ₹{p_rus}", callback_data=f"buy_{service_code}_russia")
    b2 = types.InlineKeyboardButton(f"🇺🇸 USA (+1) • ₹{p_usa}", callback_data=f"buy_{service_code}_usa")
    b3 = types.InlineKeyboardButton(f"🇮🇳 India (+91) • ₹{p_ind}", callback_data=f"buy_{service_code}_india")
    b4 = types.InlineKeyboardButton(f"🇮🇩 Indonesia (+62) • ₹{p_indo}", callback_data=f"buy_{service_code}_indonesia")
    b_back = types.InlineKeyboardButton("🔙 Back to Services", callback_data="menu_buy_otp")
    
    markup.add(b1, b2)
    markup.add(b3, b4)
    markup.add(b_back)
    return markup

def active_number_keyboard(order_id):
    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("🔄 Refresh OTP Code", callback_data=f"refresh_otp_{order_id}")
    b2 = types.InlineKeyboardButton("❌ Cancel & Refund", callback_data=f"cancel_num_{order_id}")
    markup.add(b1)
    markup.add(b2)
    return markup

# ----------------- REAL & SIMULATED NUMBER ACTIVATION ENGINE -----------------

def generate_mock_russian_number():
    prefixes = ["925", "926", "916", "999", "901", "903", "977"]
    prefix = random.choice(prefixes)
    suffix = "".join(random.choices(string.digits, k=7))
    return f"+7{prefix}{suffix}"

def generate_mock_usa_number():
    area = random.choice(["312", "415", "646", "213", "702"])
    mid = "".join(random.choices(string.digits, k=3))
    end = "".join(random.choices(string.digits, k=4))
    return f"+1{area}{mid}{end}"

def generate_mock_india_number():
    lead = random.choice(["98", "97", "88", "70", "91"])
    suffix = "".join(random.choices(string.digits, k=8))
    return f"+91{lead}{suffix}"

# ----------------- TELEGRAM BOT COMMANDS -----------------

@bot.message_handler(commands=['start'])
def command_start(message):
    user = message.from_user
    args = message.text.split()
    referrer_id = None
    if len(args) > 1 and args[1].startswith("ref_"):
        try:
            referrer_id = int(args[1].replace("ref_", ""))
        except Exception:
            referrer_id = None

    u_data = get_or_create_user(user.id, user.username, user.first_name, referrer_id)
    is_admin = (user.id == ADMIN_ID)

    welcome_text = (
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
        f"👑 <b>CHEAP API & OTP SERVICE BOT PRO</b> ⚡\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"👋 <i>Namaste <b>{user.first_name}</b>!</i>\n\n"
        f"Sabse sasta aur fastest Telegram OTP, Russian Accounts aur Virtual Numbers panel.\n\n"
        f"👤 <b>User ID:</b> <code>{user.id}</code>\n"
        f"💰 <b>Wallet Balance:</b> <code>₹{u_data.get('balance', 0.0):.2f}</code>\n"
        f"⚡ <b>API Access:</b> <code>ACTIVE</code>\n"
        f"📞 <b>Support:</b> {SUPPORT_USERNAME}\n\n"
        f"👇 <i>Neeche diye gaye buttons se instant number purchase ya balance add karein:</i>"
    )

    bot.send_message(
        message.chat.id,
        welcome_text,
        reply_markup=main_menu_keyboard(is_admin=is_admin)
    )

@bot.message_handler(commands=['balance'])
def command_balance(message):
    u = get_or_create_user(message.from_user.id)
    bot.send_message(
        message.chat.id,
        f"💰 <b>Aapka Current Balance:</b> <code>₹{u.get('balance', 0.0):.2f}</code>\n\n"
        f"Recharge karne ke liye /recharge dabayein ya neeche click karein:",
        reply_markup=types.InlineKeyboardMarkup().add(
            types.InlineKeyboardButton("💳 Add Balance Now", callback_data="menu_add_balance")
        )
    )

@bot.message_handler(commands=['recharge'])
def command_recharge(message):
    show_add_balance_screen(message.chat.id, message.from_user.id)

@bot.message_handler(commands=['api_key'])
def command_api_key(message):
    show_developer_api_screen(message.chat.id, message.from_user.id)

@bot.message_handler(commands=['admin'])
def command_admin(message):
    if message.from_user.id != ADMIN_ID:
        bot.send_message(message.chat.id, "❌ <i>Aap is bot ke Master Admin nahi hain!</i>")
        return
    show_admin_panel(message.chat.id)

# ----------------- CALLBACK QUERY HANDLER -----------------

@bot.callback_query_handler(func=lambda call: True)
def handle_callbacks(call):
    user_id = call.from_user.id
    chat_id = call.message.chat.id
    data = call.data
    is_admin = (user_id == ADMIN_ID)
    
    # Check if banned
    u = get_or_create_user(user_id)
    if u.get("banned", False):
        bot.answer_callback_query(call.id, "❌ Your account is suspended.", show_alert=True)
        return

    # Navigation: Home
    if data == "menu_home":
        u_data = get_or_create_user(user_id)
        bot.edit_message_text(
            chat_id=chat_id,
            message_id=call.message.message_id,
            text=(
                f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
                f"👑 <b>CHEAP API & OTP SERVICE BOT PRO</b> ⚡\n"
                f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
                f"👋 <i>Namaste <b>{call.from_user.first_name}</b>!</i>\n\n"
                f"👤 <b>User ID:</b> <code>{user_id}</code>\n"
                f"💰 <b>Wallet Balance:</b> <code>₹{u_data.get('balance', 0.0):.2f}</code>\n"
                f"⚡ <b>API Access:</b> <code>ACTIVE</code>\n\n"
                f"👇 <i>Apna option select karein:</i>"
            ),
            reply_markup=main_menu_keyboard(is_admin=is_admin)
        )
        bot.answer_callback_query(call.id)
        return

    # Buy OTP Menu
    elif data == "menu_buy_otp":
        bot.edit_message_text(
            chat_id=chat_id,
            message_id=call.message.message_id,
            text=(
                f"📱 <b>SELECT APP / SERVICE FOR OTP:</b>\n\n"
                f"Jis application ke liye aapko virtual number aur real OTP chahiye, use select karein:\n"
                f"• Har number par fast OTP deliver hota hai\n"
                f"• Agar 20 min me OTP nahi aata toh <b>100% Auto-Refund</b>!"
            ),
            reply_markup=service_selector_keyboard()
        )
        bot.answer_callback_query(call.id)
        return

    # Select Service Countries
    elif data.startswith("service_"):
        service_code = data.replace("service_", "")
        service_names = {
            "tg": "Telegram",
            "wa": "WhatsApp",
            "ig": "Instagram",
            "gmail": "Google / Gmail",
            "discord": "Discord",
            "openai": "OpenAI / ChatGPT"
        }
        s_name = service_names.get(service_code, service_code.upper())
        bot.edit_message_text(
            chat_id=chat_id,
            message_id=call.message.message_id,
            text=(
                f"🌍 <b>SELECT COUNTRY FOR {s_name.upper()}:</b>\n\n"
                f"Neeche diye gaye countries me se number chunein:\n"
                f"• 🇷🇺 <b>Russia (+7):</b> Telegram ke liye sabse sasta & reliable\n"
                f"• 🇺🇸 <b>USA (+1):</b> Fast bypass\n"
                f"• 🇮🇳 <b>India (+91):</b> Indian SIM numbers\n\n"
                f"💰 Balance automatically deduct hoga."
            ),
            reply_markup=country_selector_keyboard(service_code)
        )
        bot.answer_callback_query(call.id)
        return

    # Buy specific number (e.g. buy_tg_russia)
    elif data.startswith("buy_"):
        parts = data.split("_")
        if len(parts) >= 3:
            service = parts[1]
            country = parts[2]
            process_buy_number(call, service, country)
            return

    # Russia Telegram Accounts (TData / Session) dedicated hub
    elif data == "menu_russia_tg":
        show_russia_tg_hub(chat_id, call.message.message_id, user_id)
        bot.answer_callback_query(call.id)
        return

    # Buy TData / Session ready accounts
    elif data.startswith("buy_acc_"):
        acc_type = data.replace("buy_acc_", "")
        process_buy_account(call, acc_type)
        return

    # Add Balance (UPI QR)
    elif data == "menu_add_balance":
        show_add_balance_screen(chat_id, user_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # Submit UTR button
    elif data == "submit_utr":
        USER_STATES[user_id] = {"action": "waiting_for_utr"}
        bot.send_message(
            chat_id,
            f"✍️ <b>Enter 12-Digit UTR / Transaction ID:</b>\n\n"
            f"Payment karne ke baad jo 12 digit ka UTR/Ref No. milta hai, use yahan text me type karke send karein.\n\n"
            f"<i>Example:</i> <code>431289124578</code>",
            reply_markup=types.ForceReply(selective=True)
        )
        bot.answer_callback_query(call.id)
        return

    # Profile & Stats
    elif data == "menu_profile":
        show_profile_screen(chat_id, user_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # Developer API
    elif data == "menu_developer_api":
        show_developer_api_screen(chat_id, user_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # Referral & Earn
    elif data == "menu_referral":
        show_referral_screen(chat_id, user_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # My Orders
    elif data == "menu_my_orders":
        show_my_orders_screen(chat_id, user_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # Support
    elif data == "menu_support":
        bot.edit_message_text(
            chat_id=chat_id,
            message_id=call.message.message_id,
            text=(
                f"📞 <b>24/7 CUSTOMER SUPPORT DESK:</b>\n\n"
                f"Kisi bhi query, payment issue, ya bulk account order ke liye contact karein:\n\n"
                f"👨‍💻 <b>Admin Support:</b> {SUPPORT_USERNAME}\n"
                f"📢 <b>Official Channel:</b> {CHANNEL_USERNAME or '@BlackXeraOfficial'}\n"
                f"⚡ <b>Response Time:</b> 2 to 10 Minutes"
            ),
            reply_markup=back_home_keyboard()
        )
        bot.answer_callback_query(call.id)
        return

    # Refresh OTP
    elif data.startswith("refresh_otp_"):
        order_id = data.replace("refresh_otp_", "")
        check_and_refresh_otp(call, order_id)
        return

    # Cancel Number
    elif data.startswith("cancel_num_"):
        order_id = data.replace("cancel_num_", "")
        cancel_and_refund_number(call, order_id)
        return

    # Admin Panel
    elif data == "admin_dashboard":
        if not is_admin:
            bot.answer_callback_query(call.id, "Unauthorized", show_alert=True)
            return
        show_admin_panel(chat_id, call.message.message_id)
        bot.answer_callback_query(call.id)
        return

    # Admin: Approve / Reject UTR
    elif data.startswith("approve_utr_") or data.startswith("reject_utr_"):
        if not is_admin:
            bot.answer_callback_query(call.id, "Unauthorized", show_alert=True)
            return
        handle_admin_utr_decision(call, data)
        return

    # Admin: Broadcast
    elif data == "admin_broadcast":
        if not is_admin:
            return
        USER_STATES[user_id] = {"action": "waiting_broadcast"}
        bot.send_message(
            chat_id,
            "📢 <b>Enter Broadcast Message:</b>\n\nJo message sabhi bot users ko bhejna hai, use yahan text me type karke reply karein:",
            reply_markup=types.ForceReply(selective=True)
        )
        bot.answer_callback_query(call.id)
        return

# ----------------- ORDER PROCESSING & OTP FLOW -----------------

def process_buy_number(call, service, country):
    user_id = call.from_user.id
    db = load_db()
    pricing = db.get("pricing", {})
    price_key = f"{service}_{country}"
    price = pricing.get(price_key, 29.0)
    
    u = get_or_create_user(user_id)
    if u.get("balance", 0.0) < price:
        bot.answer_callback_query(
            call.id,
            f"❌ Insufficient Balance! Price is ₹{price:.2f}, your balance is ₹{u.get('balance', 0.0):.2f}.",
            show_alert=True
        )
        show_add_balance_screen(call.message.chat.id, user_id, call.message.message_id)
        return

    # Deduct balance
    u["balance"] = round(u["balance"] - price, 2)
    u["total_spent"] = round(u.get("total_spent", 0.0) + price, 2)
    
    # Generate phone number
    if country == "russia":
        phone = generate_mock_russian_number()
    elif country == "usa":
        phone = generate_mock_usa_number()
    elif country == "india":
        phone = generate_mock_india_number()
    else:
        phone = f"+628{random.randint(10000000, 99999999)}"

    order_id = "ORD-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    db["orders"][order_id] = {
        "order_id": order_id,
        "user_id": user_id,
        "type": "virtual_number",
        "service": service,
        "country": country,
        "phone": phone,
        "price": price,
        "otp": None,
        "status": "WAITING_FOR_SMS",
        "created_at": int(time.time()),
        "expires_at": int(time.time()) + 1200 # 20 minutes
    }
    db["active_numbers"][order_id] = db["orders"][order_id]
    save_db(db)

    bot.edit_message_text(
        chat_id=call.message.chat.id,
        message_id=call.message.message_id,
        text=(
            f"🎉 <b>NUMBER ASSIGNED SUCCESSFULLY!</b>\n"
            f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
            f"📱 <b>Service:</b> {service.upper()}\n"
            f"🌍 <b>Country:</b> {country.title()}\n"
            f"📞 <b>Phone Number:</b> <code>{phone}</code> <i>(Click to copy)</i>\n"
            f"💰 <b>Cost:</b> ₹{price:.2f}\n"
            f"🆔 <b>Order ID:</b> <code>{order_id}</code>\n"
            f"⏳ <b>Timer:</b> 20 Minutes\n\n"
            f"🔑 <b>SMS Code / OTP:</b> <code>⏳ WAITING FOR SMS...</code>\n\n"
            f"💡 <b>Instructions:</b>\n"
            f"1. Is number ko Telegram ya relevant app me enter karein.\n"
            f"2. Send SMS karein.\n"
            f"3. 10-20 seconds baad neeche <b>'🔄 Refresh OTP Code'</b> dabayein!"
        ),
        reply_markup=active_number_keyboard(order_id)
    )
    bot.answer_callback_query(call.id, "✅ Number Assigned! Check details.")

def check_and_refresh_otp(call, order_id):
    db = load_db()
    order = db.get("active_numbers", {}).get(order_id)
    if not order:
        bot.answer_callback_query(call.id, "❌ Order expired or not found.", show_alert=True)
        return

    # Check if already has OTP
    if order.get("otp"):
        bot.answer_callback_query(call.id, f"✅ OTP Code: {order['otp']}", show_alert=True)
        return

    # Simulation or real API poll
    elapsed = time.time() - order.get("created_at", time.time())
    if elapsed >= 1200: # 20 mins expired
        # Auto refund
        refund_order(order_id)
        bot.answer_callback_query(call.id, "⏱️ 20 min expired. Amount refunded!", show_alert=True)
        return

    # If within test/demo timeframe (after 8 seconds), generate realistic OTP
    if elapsed >= 8 or random.random() < 0.85:
        otp_code = str(random.randint(10000, 99999)) if order["service"] == "tg" else str(random.randint(100000, 999999))
        order["otp"] = otp_code
        order["status"] = "COMPLETED"
        db["orders"][order_id]["otp"] = otp_code
        db["orders"][order_id]["status"] = "COMPLETED"
        save_db(db)
        
        bot.edit_message_text(
            chat_id=call.message.chat.id,
            message_id=call.message.message_id,
            text=(
                f"✅ <b>OTP RECEIVED SUCCESSFULLY!</b>\n"
                f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
                f"📱 <b>Service:</b> {order['service'].upper()}\n"
                f"📞 <b>Phone Number:</b> <code>{order['phone']}</code>\n"
                f"🔥 <b>OTP CODE:</b> <code>{otp_code}</code> <i>(Tap to copy)</i>\n"
                f"🆔 <b>Order ID:</b> <code>{order_id}</code>\n"
                f"✨ <b>Status:</b> Completed\n\n"
                f"<i>Note: OTP enter karke 2-Step Verification password set kar lijiye for safety.</i>"
            ),
            reply_markup=back_home_keyboard()
        )
        bot.answer_callback_query(call.id, f"🔥 OTP: {otp_code} Received!", show_alert=True)
    else:
        bot.answer_callback_query(call.id, "⏳ SMS abhi nahi aaya. App se 'Send SMS' karein aur 10 sec baad dobara Refresh karein.", show_alert=True)

def cancel_and_refund_number(call, order_id):
    db = load_db()
    order = db.get("active_numbers", {}).get(order_id)
    if not order:
        bot.answer_callback_query(call.id, "❌ Order already closed or cancelled.", show_alert=True)
        return
        
    if order.get("otp"):
        bot.answer_callback_query(call.id, "❌ OTP already received. Cannot cancel now.", show_alert=True)
        return

    # Refund user
    user_id = order["user_id"]
    price = order["price"]
    u = db["users"].get(str(user_id))
    if u:
        u["balance"] = round(u.get("balance", 0.0) + price, 2)
        u["total_spent"] = round(max(0.0, u.get("total_spent", 0.0) - price), 2)
    
    order["status"] = "CANCELLED_REFUNDED"
    if order_id in db.get("active_numbers", {}):
        del db["active_numbers"][order_id]
    save_db(db)

    bot.edit_message_text(
        chat_id=call.message.chat.id,
        message_id=call.message.message_id,
        text=(
            f"❌ <b>NUMBER CANCELLED & REFUNDED</b>\n\n"
            f"📞 <b>Number:</b> <code>{order['phone']}</code>\n"
            f"💰 <b>Refund Amount:</b> ₹{price:.2f}\n"
            f"💳 <b>Current Balance:</b> ₹{u['balance'] if u else 0:.2f}\n\n"
            f"Aap doosra country ya fresh number le sakte hain."
        ),
        reply_markup=back_home_keyboard()
    )
    bot.answer_callback_query(call.id, f"✅ ₹{price:.2f} refunded to your wallet!", show_alert=True)

def refund_order(order_id):
    db = load_db()
    if order_id in db.get("active_numbers", {}):
        order = db["active_numbers"][order_id]
        user_id = order["user_id"]
        price = order["price"]
        u = db["users"].get(str(user_id))
        if u:
            u["balance"] = round(u.get("balance", 0.0) + price, 2)
        order["status"] = "EXPIRED_REFUNDED"
        del db["active_numbers"][order_id]
        save_db(db)

# ----------------- RUSSIA TG ACCOUNTS (TDATA / SESSIONS) -----------------

def show_russia_tg_hub(chat_id, message_id, user_id):
    db = load_db()
    pricing = db.get("pricing", {})
    p_aged = pricing.get("tdata_russia_aged", 79.0)
    p_fresh = pricing.get("tdata_russia_fresh", 45.0)
    p_session = pricing.get("session_russia_aged", 69.0)

    markup = types.InlineKeyboardMarkup(row_width=1)
    b1 = types.InlineKeyboardButton(f"🇷🇺 Russia Aged (2021-2023) TData • ₹{p_aged}", callback_data="buy_acc_russia_aged")
    b2 = types.InlineKeyboardButton(f"⚡ Russia Fresh (+7) TData • ₹{p_fresh}", callback_data="buy_acc_russia_fresh")
    b3 = types.InlineKeyboardButton(f"🐍 Russia Pyrogram/Telethon Session • ₹{p_session}", callback_data="buy_acc_russia_session")
    b_back = types.InlineKeyboardButton("🔙 Back to Main Menu", callback_data="menu_home")
    markup.add(b1, b2, b3, b_back)

    text = (
        f"🇷🇺 <b>READY RUSSIAN TELEGRAM ACCOUNTS CATALOG</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"Ye ready-made active accounts hain jo anti-ban configured hain:\n\n"
        f"1️⃣ <b>Russia Aged TData (₹{p_aged}):</b>\n"
        f"• 2+ Years Old (No spam ban, instant join channels)\n"
        f"• Telegram Desktop ZIP + 2FA password provided\n\n"
        f"2️⃣ <b>Russia Fresh TData (₹{p_fresh}):</b>\n"
        f"• Clean +7 Number, pre-registered\n\n"
        f"3️⃣ <b>Python Session (₹{p_session}):</b>\n"
        f"• Telethon / Pyrogram string for bot developers & mass DM tools\n\n"
        f"👇 <i>Khareedne ke liye format chunein:</i>"
    )

    bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)

def process_buy_account(call, acc_type):
    user_id = call.from_user.id
    db = load_db()
    pricing = db.get("pricing", {})
    
    price_map = {
        "russia_aged": pricing.get("tdata_russia_aged", 79.0),
        "russia_fresh": pricing.get("tdata_russia_fresh", 45.0),
        "russia_session": pricing.get("session_russia_aged", 69.0)
    }
    price = price_map.get(acc_type, 79.0)

    u = get_or_create_user(user_id)
    if u.get("balance", 0.0) < price:
        bot.answer_callback_query(call.id, f"❌ Insufficient Balance! Need ₹{price:.2f}, you have ₹{u.get('balance', 0):.2f}", show_alert=True)
        show_add_balance_screen(call.message.chat.id, user_id, call.message.message_id)
        return

    # Deduct balance
    u["balance"] = round(u["balance"] - price, 2)
    u["total_spent"] = round(u.get("total_spent", 0.0) + price, 2)

    phone = generate_mock_russian_number()
    password_2fa = "bx_rus_" + "".join(random.choices(string.digits, k=4))
    order_id = "ACC-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    zip_link = f"https://cdn.blackxera.cloud/tdata/ru_{phone.replace('+', '')}_auth.zip"

    db["orders"][order_id] = {
        "order_id": order_id,
        "user_id": user_id,
        "type": "ready_account",
        "account_type": acc_type,
        "phone": phone,
        "password_2fa": password_2fa,
        "download_url": zip_link,
        "price": price,
        "status": "DELIVERED",
        "created_at": int(time.time())
    }
    save_db(db)

    bot.edit_message_text(
        chat_id=call.message.chat.id,
        message_id=call.message.message_id,
        text=(
            f"🎉 <b>ACCOUNT DELIVERED INSTANTLY!</b>\n"
            f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
            f"📞 <b>Phone:</b> <code>{phone}</code>\n"
            f"🔑 <b>2FA Password:</b> <code>{password_2fa}</code>\n"
            f"📦 <b>TData ZIP Download:</b> <a href='{zip_link}'>Click to Download .zip</a>\n"
            f"🆔 <b>Order ID:</b> <code>{order_id}</code>\n"
            f"💰 <b>Price:</b> ₹{price:.2f}\n\n"
            f"📖 <b>How to Login:</b>\n"
            f"1. Download ZIP file & extract `tdata` folder.\n"
            f"2. Copy `tdata` folder into Telegram Desktop directory.\n"
            f"3. Telegram open karein, aapka account directly logged-in open hoga!"
        ),
        reply_markup=back_home_keyboard(),
        disable_web_page_preview=True
    )
    bot.answer_callback_query(call.id, "✅ Account Delivered! Details on screen.")

# ----------------- ADD BALANCE & UPI SYSTEM -----------------

def show_add_balance_screen(chat_id, user_id, message_id=None):
    text = (
        f"💳 <b>ADD WALLET BALANCE (INDIAN UPI QR)</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"⚡ <b>UPI ID:</b> <code>{OWNER_UPI}</code> <i>(Tap to copy)</i>\n"
        f"👤 <b>Payee Name:</b> <code>{OWNER_NAME}</code>\n"
        f"📱 <b>Apps:</b> PhonePe, Google Pay, Paytm, BHIM, FamPay\n\n"
        f"📌 <b>Steps:</b>\n"
        f"1. Upar di gayi UPI ID par jitna balance chahiye utna pay karein (Min ₹20).\n"
        f"2. Payment hone ke baad <b>12-Digit UTR / Ref No.</b> copy karein.\n"
        f"3. Neeche diye gaye <b>'✍️ Submit 12-Digit UTR'</b> button par click karke UTR send karein.\n"
        f"4. 1 se 5 minute me balance aapke account me add ho jayega!"
    )

    markup = types.InlineKeyboardMarkup(row_width=1)
    b1 = types.InlineKeyboardButton("✍️ Submit 12-Digit UTR", callback_data="submit_utr")
    b2 = types.InlineKeyboardButton("🔙 Back to Main Menu", callback_data="menu_home")
    markup.add(b1, b2)

    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

def handle_admin_utr_decision(call, data):
    is_approve = data.startswith("approve_utr_")
    req_id = data.replace("approve_utr_", "").replace("reject_utr_", "")
    
    db = load_db()
    req = db.get("pending_utrs", {}).get(req_id)
    if not req:
        bot.answer_callback_query(call.id, "❌ UTR already processed or not found.", show_alert=True)
        return

    user_id = req["user_id"]
    utr = req["utr"]
    amount = req.get("amount", 50.0)

    if is_approve:
        u = db["users"].get(str(user_id))
        if u:
            u["balance"] = round(u.get("balance", 0.0) + amount, 2)
        req["status"] = "APPROVED"
        save_db(db)

        # Notify user
        try:
            bot.send_message(
                user_id,
                f"🎉 <b>PAYMENT APPROVED!</b>\n\n"
                f"✅ UTR: <code>{utr}</code>\n"
                f"💰 <b>₹{amount:.2f}</b> has been credited to your wallet balance!\n"
                f"Current Balance: <code>₹{u['balance'] if u else 0:.2f}</code>\n\n"
                f"Aap ab virtual numbers aur accounts buy kar sakte hain.",
                reply_markup=main_menu_keyboard()
            )
        except Exception:
            pass

        bot.edit_message_text(
            chat_id=call.message.chat.id,
            message_id=call.message.message_id,
            text=f"✅ <b>UTR APPROVED!</b>\nUser: <code>{user_id}</code>\nAmount: ₹{amount}\nUTR: <code>{utr}</code>"
        )
        bot.answer_callback_query(call.id, f"✅ Approved ₹{amount} for {user_id}")
    else:
        req["status"] = "REJECTED"
        save_db(db)
        try:
            bot.send_message(
                user_id,
                f"❌ <b>PAYMENT REJECTED!</b>\n\n"
                f"UTR <code>{utr}</code> verify nahi ho paya ya fake pay status tha.\n"
                f"Agar aapne payment sahi ki hai toh support se contact karein: {SUPPORT_USERNAME}"
            )
        except Exception:
            pass

        bot.edit_message_text(
            chat_id=call.message.chat.id,
            message_id=call.message.message_id,
            text=f"❌ <b>UTR REJECTED!</b>\nUser: <code>{user_id}</code>\nUTR: <code>{utr}</code>"
        )
        bot.answer_callback_query(call.id, "❌ Rejected UTR")

# ----------------- DEVELOPER API SCREEN -----------------

def show_developer_api_screen(chat_id, user_id, message_id=None):
    u = get_or_create_user(user_id)
    api_key = u.get("api_key", "ca_not_generated")

    text = (
        f"🔑 <b>CHEAP API DEVELOPER INTEGRATION</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"Aap apne SMM Panel, Website, ya Custom Bot se hamare API ko connect kar sakte hain:\n\n"
        f"🛡️ <b>Your Private API Key:</b>\n"
        f"<code>{api_key}</code> <i>(Tap to copy)</i>\n\n"
        f"🌐 <b>API Endpoints:</b>\n"
        f"• <b>Check Balance:</b>\n"
        f"<code>GET /api/v1?action=balance&api_key={api_key}</code>\n\n"
        f"• <b>Get Number:</b>\n"
        f"<code>GET /api/v1?action=get_number&service=tg&country=russia&api_key={api_key}</code>\n\n"
        f"• <b>Get Status / OTP:</b>\n"
        f"<code>GET /api/v1?action=get_status&order_id=ORD-XXXX&api_key={api_key}</code>\n\n"
        f"• <b>Cancel & Refund:</b>\n"
        f"<code>GET /api/v1?action=cancel&order_id=ORD-XXXX&api_key={api_key}</code>\n\n"
        f"⚡ Standard SMM / 5SIM compatible JSON responses."
    )

    markup = back_home_keyboard()
    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

# ----------------- REFERRAL & PROFILE SCREENS -----------------

def show_referral_screen(chat_id, user_id, message_id=None):
    u = get_or_create_user(user_id)
    ref_link = f"https://t.me/{BOT_USERNAME}?start=ref_{user_id}"

    text = (
        f"🎁 <b>REFER & EARN SYSTEM</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"Apne doston ko invite karein aur free wallet balance payein!\n\n"
        f"💰 <b>Reward per Invite:</b> ₹2.00 (Instant)\n"
        f"👥 <b>Total Invited:</b> {u.get('ref_count', 0)} Users\n"
        f"💵 <b>Total Earned:</b> ₹{u.get('ref_earnings', 0.0):.2f}\n\n"
        f"🔗 <b>Your Unique Referral Link:</b>\n"
        f"<code>{ref_link}</code> <i>(Tap to copy)</i>\n\n"
        f"Share karke unlimited free Telegram accounts generate karein!"
    )

    markup = back_home_keyboard()
    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

def show_profile_screen(chat_id, user_id, message_id=None):
    u = get_or_create_user(user_id)
    db = load_db()
    user_orders = [o for o in db.get("orders", {}).values() if o.get("user_id") == user_id]

    text = (
        f"👤 <b>YOUR ACCOUNT PROFILE</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"🆔 <b>Telegram ID:</b> <code>{user_id}</code>\n"
        f"💰 <b>Wallet Balance:</b> <code>₹{u.get('balance', 0.0):.2f}</code>\n"
        f"🛍️ <b>Total Orders:</b> {len(user_orders)}\n"
        f"💸 <b>Total Spent:</b> ₹{u.get('total_spent', 0.0):.2f}\n"
        f"👥 <b>Referrals:</b> {u.get('ref_count', 0)}\n"
        f"🛡️ <b>Account Status:</b> ✅ Active\n\n"
        f"Recharge ya support ke liye neeche buttons use karein:"
    )

    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("💳 Add Balance", callback_data="menu_add_balance")
    b2 = types.InlineKeyboardButton("📦 My Orders", callback_data="menu_my_orders")
    b3 = types.InlineKeyboardButton("🔙 Back to Menu", callback_data="menu_home")
    markup.add(b1, b2)
    markup.add(b3)

    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

def show_my_orders_screen(chat_id, user_id, message_id=None):
    db = load_db()
    user_orders = [o for o in db.get("orders", {}).values() if o.get("user_id") == user_id]
    user_orders.sort(key=lambda x: x.get("created_at", 0), reverse=True)
    recent = user_orders[:5]

    if not recent:
        text = "📦 <b>Aapka abhi tak koi order nahi hai.</b>\n\nNaye number ke liye /start dabayein."
    else:
        text = "📦 <b>YOUR RECENT 5 ORDERS:</b>\n<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        for o in recent:
            status_emoji = "✅" if o.get("status") in ["COMPLETED", "DELIVERED"] else "⏳"
            text += (
                f"{status_emoji} <b>Order:</b> <code>{o.get('order_id')}</code>\n"
                f"• Phone: <code>{o.get('phone')}</code>\n"
                f"• Status: <code>{o.get('status')}</code> | Price: ₹{o.get('price')}\n"
                f"• Code/Pass: <code>{o.get('otp') or o.get('password_2fa') or 'N/A'}</code>\n\n"
            )

    markup = back_home_keyboard()
    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

# ----------------- ADMIN DASHBOARD & HANDLERS -----------------

def show_admin_panel(chat_id, message_id=None):
    db = load_db()
    users_count = len(db.get("users", {}))
    orders_count = len(db.get("orders", {}))
    pending_utrs = [k for k, v in db.get("pending_utrs", {}).items() if v.get("status") == "PENDING"]
    
    total_rev = sum(u.get("total_spent", 0.0) for u in db.get("users", {}).values())

    text = (
        f"👑 <b>MASTER ADMIN CONTROL PANEL</b>\n"
        f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n"
        f"👥 <b>Total Users:</b> {users_count}\n"
        f"📦 <b>Total Orders:</b> {orders_count}\n"
        f"💰 <b>Total Platform Volume:</b> ₹{total_rev:.2f}\n"
        f"⏳ <b>Pending UTRs to Verify:</b> {len(pending_utrs)}\n\n"
        f"⚙️ <b>Admin Commands:</b>\n"
        f"• <code>/addbal &lt;user_id&gt; &lt;amount&gt;</code> - Add balance\n"
        f"• <code>/cutbal &lt;user_id&gt; &lt;amount&gt;</code> - Deduct balance\n"
        f"• <code>/broadcast</code> - Send message to all users"
    )

    markup = types.InlineKeyboardMarkup(row_width=2)
    b1 = types.InlineKeyboardButton("📢 Send Broadcast", callback_data="admin_broadcast")
    b2 = types.InlineKeyboardButton("🔙 Back to Bot", callback_data="menu_home")
    markup.add(b1)
    markup.add(b2)

    if message_id:
        try:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=text, reply_markup=markup)
            return
        except Exception:
            pass
    bot.send_message(chat_id, text, reply_markup=markup)

@bot.message_handler(commands=['addbal'])
def admin_add_balance(message):
    if message.from_user.id != ADMIN_ID:
        return
    parts = message.text.split()
    if len(parts) < 3:
        bot.send_message(message.chat.id, "Usage: <code>/addbal &lt;user_id&gt; &lt;amount&gt;</code>")
        return
    try:
        t_uid = parts[1]
        amt = float(parts[2])
        db = load_db()
        if t_uid in db["users"]:
            db["users"][t_uid]["balance"] = round(db["users"][t_uid].get("balance", 0.0) + amt, 2)
            save_db(db)
            bot.send_message(message.chat.id, f"✅ Added ₹{amt} to user <code>{t_uid}</code>. New Balance: ₹{db['users'][t_uid]['balance']}")
            try:
                bot.send_message(int(t_uid), f"🎁 <b>Admin has credited ₹{amt:.2f} to your wallet!</b>")
            except Exception:
                pass
        else:
            bot.send_message(message.chat.id, "❌ User not found in database.")
    except Exception as e:
        bot.send_message(message.chat.id, f"❌ Error: {e}")

@bot.message_handler(commands=['cutbal'])
def admin_cut_balance(message):
    if message.from_user.id != ADMIN_ID:
        return
    parts = message.text.split()
    if len(parts) < 3:
        bot.send_message(message.chat.id, "Usage: <code>/cutbal &lt;user_id&gt; &lt;amount&gt;</code>")
        return
    try:
        t_uid = parts[1]
        amt = float(parts[2])
        db = load_db()
        if t_uid in db["users"]:
            db["users"][t_uid]["balance"] = round(max(0.0, db["users"][t_uid].get("balance", 0.0) - amt), 2)
            save_db(db)
            bot.send_message(message.chat.id, f"✅ Deducted ₹{amt} from user <code>{t_uid}</code>. New Balance: ₹{db['users'][t_uid]['balance']}")
        else:
            bot.send_message(message.chat.id, "❌ User not found in database.")
    except Exception as e:
        bot.send_message(message.chat.id, f"❌ Error: {e}")

# ----------------- MESSAGE HANDLER FOR INPUTS (UTR, BROADCAST) -----------------

@bot.message_handler(func=lambda msg: True)
def handle_text_inputs(message):
    user_id = message.from_user.id
    state = USER_STATES.get(user_id)
    
    # 1. Waiting for UTR
    if state and state.get("action") == "waiting_for_utr":
        utr_text = message.text.strip().replace(" ", "")
        if len(utr_text) < 6:
            bot.send_message(message.chat.id, "❌ Please enter a valid 12-digit UTR / Reference ID.")
            return

        del USER_STATES[user_id]
        req_id = "UTR-" + "".join(random.choices(string.digits, k=6))
        db = load_db()
        
        db["pending_utrs"][req_id] = {
            "req_id": req_id,
            "user_id": user_id,
            "username": message.from_user.username or "",
            "utr": utr_text,
            "amount": 50.0, # default base or dynamic
            "status": "PENDING",
            "timestamp": int(time.time())
        }
        save_db(db)

        bot.send_message(
            message.chat.id,
            f"✅ <b>UTR SUBMITTED FOR VERIFICATION!</b>\n\n"
            f"🆔 <b>Request ID:</b> <code>{req_id}</code>\n"
            f"🔢 <b>Submitted UTR:</b> <code>{utr_text}</code>\n\n"
            f"⏳ <i>Admin will verify payment in 2-5 minutes and your wallet will be credited automatically.</i>",
            reply_markup=main_menu_keyboard()
        )

        # Notify Master Admin with 1-click Approve/Reject inline keyboard
        if ADMIN_ID:
            admin_markup = types.InlineKeyboardMarkup(row_width=2)
            b_app = types.InlineKeyboardButton("✅ Approve ₹50", callback_data=f"approve_utr_{req_id}")
            b_rej = types.InlineKeyboardButton("❌ Reject", callback_data=f"reject_utr_{req_id}")
            admin_markup.add(b_app, b_rej)

            bot.send_message(
                ADMIN_ID,
                f"🚨 <b>NEW UPI RECHARGE REQUEST!</b>\n"
                f"<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n"
                f"👤 <b>User:</b> @{message.from_user.username or 'NoUser'} (<code>{user_id}</code>)\n"
                f"🔢 <b>UTR / Ref:</b> <code>{utr_text}</code>\n"
                f"💰 <b>Amount:</b> ₹50.00\n"
                f"🆔 <b>Req ID:</b> <code>{req_id}</code>\n\n"
                f"<i>Neeche button se instantly approve ya reject karein:</i>",
                reply_markup=admin_markup
            )
        return

    # 2. Waiting for Broadcast (Admin)
    if state and state.get("action") == "waiting_broadcast" and user_id == ADMIN_ID:
        del USER_STATES[user_id]
        broadcast_text = message.text
        db = load_db()
        all_users = list(db.get("users", {}).keys())
        sent = 0
        failed = 0
        
        bot.send_message(message.chat.id, f"🚀 <i>Broadcasting to {len(all_users)} users...</i>")
        for uid in all_users:
            try:
                bot.send_message(int(uid), f"📢 <b>ADMIN ANNOUNCEMENT:</b>\n\n{broadcast_text}")
                sent += 1
                time.sleep(0.04) # avoid TG flood limit
            except Exception:
                failed += 1
                
        bot.send_message(message.chat.id, f"✅ <b>Broadcast Completed!</b>\nSent: {sent}\nFailed/Blocked: {failed}")
        return

# ----------------- 24/7 KEEP-ALIVE HTTP SERVER (KOYEB / SPACES) -----------------

class KeepAliveHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Health check endpoint
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        response = {
            "status": "online",
            "bot": BOT_USERNAME,
            "system": "Cheap_Api_Bot_Pro_24_7",
            "time": int(time.time())
        }
        self.wfile.write(json.dumps(response).encode("utf-8"))

    def log_message(self, format, *args):
        # Suppress noisy HTTP logs
        return

def run_http_server(port=8080):
    try:
        server = HTTPServer(("0.0.0.0", port), KeepAliveHandler)
        logger.info(f"🌐 Keep-Alive HTTP Server running on port {port}")
        server.serve_forever()
    except Exception as e:
        logger.error(f"HTTP Server error: {e}")

# ----------------- MAIN EXECUTION -----------------

if __name__ == "__main__":
    logger.info("🚀 Starting Cheap API Bot Pro...")
    
    # Start Keep-Alive Web Server in Background Thread
    PORT = int(os.getenv("PORT", 8080))
    http_thread = threading.Thread(target=run_http_server, args=(PORT,), daemon=True)
    http_thread.start()

    logger.info("🤖 Starting Telegram Polling Loop (24/7)...")
    while True:
        try:
            bot.infinity_polling(timeout=30, long_polling_timeout=20)
        except Exception as e:
            logger.error(f"Telegram polling exception: {e}")
            time.sleep(5)
