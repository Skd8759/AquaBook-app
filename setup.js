#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏊‍♂️ Setting up NITK Swimming Pool Booking App...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}\n`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm.');
  process.exit(1);
}

// Create .env file for backend if it doesn't exist
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('📝 Creating backend .env file...');
  const envContent = `# Database
MONGODB_URI=mongodb://localhost:27017/nitk-pool-booking

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
PORT=4000
NODE_ENV=development

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
`;
  fs.writeFileSync(backendEnvPath, envContent);
  console.log('✅ Backend .env file created');
} else {
  console.log('✅ Backend .env file already exists');
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies:', error.message);
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies:', error.message);
  process.exit(1);
}

// Create start scripts
console.log('\n📝 Creating start scripts...');

// Update root package.json
const rootPackageJson = {
  "name": "nitk-swimming-pool-app",
  "version": "1.0.0",
  "description": "NITK Swimming Pool Booking Application",
  "scripts": {
    "install-all": "npm install && npm install --prefix backend && npm install --prefix frontend",
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "start": "npm run start --prefix backend",
    "build": "npm run build --prefix frontend",
    "build-all": "npm run build --prefix frontend && npm run start --prefix backend"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "keywords": ["swimming", "pool", "booking", "nitk", "react", "nodejs"],
  "author": "",
  "license": "ISC"
};

fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(rootPackageJson, null, 2));

// Install concurrently for running both servers
try {
  execSync('npm install concurrently --save-dev', { stdio: 'inherit' });
  console.log('✅ Concurrently installed for running both servers');
} catch (error) {
  console.log('⚠️  Warning: Could not install concurrently. You may need to run servers separately.');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Update the .env file in the backend folder with your MongoDB connection string');
console.log('3. Run the following commands:');
console.log('   npm run dev          # Start both frontend and backend in development mode');
console.log('   OR');
console.log('   npm start            # Start only the backend');
console.log('   npm run dev --prefix frontend  # Start only the frontend');
console.log('\n🌐 The app will be available at:');
console.log('   Frontend: http://localhost:5173');
console.log('   Backend:  http://localhost:4000');
console.log('\n📚 For more information, check the README.md file');
