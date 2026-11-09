#!/bin/bash
# ==============================================================================
# 🚀 1-CLICK TERMUX SETUP SCRIPT FOR CHEAP API BOT (@cheap_api_bot CLONE)
# ==============================================================================

clear
echo "=========================================================="
echo "👑 CHEAP API TELEGRAM BOT PRO - TERMUX INSTALLER"
echo "=========================================================="
echo ""

# 1. Update and install packages
echo "⏳ [1/4] Installing Python, Git, and Tmux..."
pkg update -y
pkg install -y python git tmux

# 2. Setup project directory
echo "⏳ [2/4] Setting up bot files..."
if [ -d "black-xera" ]; then
    cd black-xera/bot
    git pull
else
    git clone https://github.com/vinitgodara453-collab/black-xera.git
    cd black-xera/bot
fi

# 3. Install Python requirements
echo "⏳ [3/4] Installing required Python libraries..."
pip install --upgrade pip
pip install -r requirements.txt

# 4. Ask for Token if not configured
echo ""
echo "=========================================================="
echo "🔑 BOT CONFIGURATION"
echo "=========================================================="

if [ -z "$BOT_TOKEN" ] || [ "$BOT_TOKEN" == "7945621834:AAFtExampleTokenReplaceMe" ]; then
    read -p "👉 Apna Telegram Bot Token dalein (from @BotFather): " input_token
    export BOT_TOKEN="$input_token"
fi

if [ -z "$ADMIN_ID" ] || [ "$ADMIN_ID" == "789654321" ]; then
    read -p "👉 Apna Telegram Numeric User ID dalein: " input_admin
    export ADMIN_ID="$input_admin"
fi

export OWNER_UPI="vinit-godara@fam"
export OWNER_NAME="VINIT GODARA"

# Save to .env for persistence
cat <<EOF > .env
BOT_TOKEN=$BOT_TOKEN
ADMIN_ID=$ADMIN_ID
OWNER_UPI=$OWNER_UPI
OWNER_NAME=$OWNER_NAME
PORT=8080
EOF

# 5. Prevent Android from killing Termux in background
termux-wake-lock 2>/dev/null

echo ""
echo "=========================================================="
echo "✅ SETUP COMPLETE! Starting Bot 24/7 in Background..."
echo "=========================================================="
echo "👉 Live logs dekhne ke liye: tmux attach -t cheapbot"
echo "👉 Bot band karne ke liye: tmux kill-session -t cheapbot"
echo "=========================================================="
echo ""

# Kill existing session if any
tmux kill-session -t cheapbot 2>/dev/null

# Start new 24/7 session
tmux new-session -d -s cheapbot "python bot.py"

echo "🎉 BOT LIVE HAI! Apne Telegram me /start bhej kar test karein."
tmux attach -t cheapbot
