#!/bin/bash

echo "🏊‍♂️ Setting up NITK Swimming Pool Booking App..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install root dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp "backend/env.example" "backend/.env"
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

echo
echo "🎉 Setup completed successfully!"
echo
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running on your system"
echo "2. Update the .env file in the backend folder with your MongoDB connection string"
echo "3. Run the following commands:"
echo "   npm run dev          # Start both frontend and backend in development mode"
echo "   OR"
echo "   npm start            # Start only the backend"
echo "   npm run dev --prefix frontend  # Start only the frontend"
echo
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo
