# 🚀 Quick Start Guide - NITK Swimming Pool App

## ✅ Installation Complete!

Your project is now fully set up and ready to run. Here's how to get started:

## 🎯 Step 1: Start MongoDB

Make sure MongoDB is running on your system:

- **Windows**: Start MongoDB service or run `mongod`
- **Mac**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`
- **Cloud**: Use MongoDB Atlas (already configured)

## 🎯 Step 2: Create Admin User

```bash
npm run create-admin
```

This creates an admin user with:

- **Email**: admin@nitk.ac.in
- **Password**: admin123
- **Role**: admin

⚠️ **Change the password after first login!**

## 🎯 Step 3: Start the Application

### Option A: Start Both Servers (Recommended)

```bash
npm run dev
```

### Option B: Use Start Scripts

```bash
# Windows
start.bat

# Mac/Linux
./start.sh
```

### Option C: Start Separately

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run dev --prefix frontend
```

## 🌐 Access the App

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 🎯 Step 4: First Time Setup

1. **Login as Admin**

   - Go to http://localhost:5173
   - Click "Login"
   - Use: admin@nitk.ac.in / admin123

2. **Create Swimming Pool Slots**

   - Go to Admin panel
   - Select a date
   - Click "Create Swimming Pool Slots"
   - System creates 10 slots automatically:
     - 5 morning slots (6:00-8:00 AM) for boys
     - 5 evening slots (6:00-8:00 PM) for girls

3. **Test the Booking System**
   - Create a student account
   - Browse available slots
   - Book a swimming pool slot

## 🎯 Available Commands

```bash
# Development
npm run dev              # Start both servers
npm start               # Start backend only
npm run dev --prefix frontend  # Start frontend only

# Admin
npm run create-admin    # Create admin user

# Production
npm run build           # Build for production
npm run build-all       # Build and start production

# Setup
npm run setup           # Run full setup
npm run install-all     # Install all dependencies
```

## 🎯 Features Overview

### Swimming Pool Slots

- **Duration**: 30 minutes per slot
- **Capacity**: 20 swimmers per slot
- **Gender Separation**:
  - Morning (6:00-8:00 AM) for boys
  - Evening (6:00-8:00 PM) for girls
- **Time Slots**: 6:00, 6:30, 7:00, 7:30, 8:00

### User Interface

- Modern, responsive design
- Real-time availability
- Gender-specific color coding
- Mobile-friendly
- Intuitive navigation

## 🔧 Troubleshooting

### Common Issues:

1. **"Cannot connect to MongoDB"**

   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `backend/.env`

2. **"Port already in use"**

   - Change `PORT` in `backend/.env`
   - Kill the process using the port

3. **"Module not found"**

   - Run `npm run install-all`
   - Clear cache: `npm cache clean --force`

4. **"Admin user already exists"**
   - Use existing admin credentials
   - Or delete existing admin from database

## 📱 Mobile Access

The app is fully responsive and works on:

- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🎉 You're Ready!

Your NITK Swimming Pool Booking App is now running!

**Start booking those swimming sessions! 🏊‍♂️🏊‍♀️**

---

_Need help? Check the full documentation in README.md or INSTALL.md_
