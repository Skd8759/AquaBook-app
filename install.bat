@echo off
echo 🏊‍♂️ Setting up NITK Swimming Pool Booking App...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

REM Create .env file for backend if it doesn't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    copy "backend\env.example" "backend\.env"
    echo ✅ Backend .env file created
) else (
    echo ✅ Backend .env file already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Make sure MongoDB is running on your system
echo 2. Update the .env file in the backend folder with your MongoDB connection string
echo 3. Run the following commands:
echo    npm run dev          # Start both frontend and backend in development mode
echo    OR
echo    npm start            # Start only the backend
echo    npm run dev --prefix frontend  # Start only the frontend
echo.
echo 🌐 The app will be available at:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:4000
echo.
pause
