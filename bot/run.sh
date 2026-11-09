#!/bin/bash
clear
echo "=========================================================="
echo "👑 CHEAP API TELEGRAM BOT PRO - TERMUX LAUNCHER"
echo "=========================================================="
echo ""

# 1. Update and install packages
echo "⏳ [1/3] Checking Python & Git..."
pkg install -y python git tmux

# 2. Setup project directory
echo "⏳ [2/3] Updating bot files..."
if [ -d "black-xera" ]; then
    cd black-xera/bot
    git pull origin main 2>/dev/null
else
    git clone https://github.com/vinitgodara453-collab/black-xera.git
    cd black-xera/bot
fi

# 3. Install Python requirements
echo "⏳ [3/3] Checking Python libraries..."
pip install pyTelegramBotAPI requests

# 4. Wake lock to prevent background sleep
termux-wake-lock 2>/dev/null

echo ""
echo "=========================================================="
echo "🚀 STARTING BOT (Connecting to Telegram...)"
echo "=========================================================="
python bot.py
