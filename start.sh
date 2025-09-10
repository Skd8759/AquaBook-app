#!/bin/bash

echo "🏊‍♂️ Starting NITK Swimming Pool Booking App..."
echo

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Backend .env file not found. Please run setup first."
    echo "Run: npm run setup"
    exit 1
fi

echo "✅ Starting both frontend and backend servers..."
echo
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo
echo "Press Ctrl+C to stop both servers"
echo

# Start both servers concurrently
npm run dev
