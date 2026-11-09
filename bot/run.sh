#!/bin/bash
clear
echo "=========================================================="
echo "👑 CHEAP API TELEGRAM BOT PRO - LAUNCHER"
echo "=========================================================="
echo ""

# Ensure directory
if [ ! -d "$HOME/black-xera" ]; then
    cd "$HOME"
    git clone https://github.com/vinitgodara453-collab/black-xera.git
fi

cd "$HOME/black-xera/bot" 2>/dev/null || cd "$HOME/black-xera"
git pull origin main 2>/dev/null

pip install pyTelegramBotAPI requests
termux-wake-lock 2>/dev/null

echo "🚀 Starting bot.py..."
python bot.py
