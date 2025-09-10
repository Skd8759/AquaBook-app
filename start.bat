@echo off
echo 🏊‍♂️ Starting NITK Swimming Pool Booking App...
echo.

REM Check if .env file exists
if not exist "backend\.env" (
    echo ❌ Backend .env file not found. Please run setup first.
    echo Run: npm run setup
    pause
    exit /b 1
)

echo ✅ Starting both frontend and backend servers...
echo.
echo 🌐 The app will be available at:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:4000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers concurrently
call npm run dev
