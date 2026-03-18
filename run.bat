@echo off
:: 1. Move to your specific project directory (Change this path!)
cd /d "C:\Users\Sophia\Documents\ds-prints-calculator"

echo Starting DS Prints Local Development Server...

:: 2. Start Vercel Dev
start "DS-Prints-Server" cmd /c "vercel dev"

:: 3. Give the database a moment to connect
timeout /t 8 /nobreak >nul

:: 4. Force Chrome to open the local site and other tabs in one window
start chrome "https://mail.google.com/mail/u/0/#inbox" ^ "https://business.facebook.com/latest/inbox/all/?asset_id=1018369448015643" ^ "https://www.canva.com/design/DAHA6S0DXRc/p76JZl9WtPoSzY7cVpN_qw/edit" ^ "http://localhost:3000"

exit