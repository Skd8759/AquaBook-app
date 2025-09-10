# 🚀 Installation Guide - NITK Swimming Pool App

## Quick Installation (Recommended)

### For Windows:
1. Double-click `install.bat` or run in Command Prompt:
   ```cmd
   install.bat
   ```

### For Mac/Linux:
1. Run in terminal:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

### For All Platforms:
1. Run the Node.js setup script:
   ```bash
   node setup.js
   ```

## Manual Installation

### Prerequisites
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Configure Environment

1. Copy the environment example file:
   ```bash
   cp backend/env.example backend/.env
   ```

2. Edit `backend/.env` and update:
   ```env
   MONGODB_URI=mongodb://localhost:27017/nitk-pool-booking
   JWT_SECRET=your-super-secret-jwt-key
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   ```

### Step 3: Start the Application

#### Option 1: Start Both Servers (Recommended)
```bash
npm run dev
```

#### Option 2: Start Servers Separately
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run dev --prefix frontend
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 🔧 Troubleshooting

### Common Issues:

1. **Port already in use**
   - Change the PORT in `backend/.env`
   - Kill the process using the port

2. **MongoDB connection failed**
   - Make sure MongoDB is running
   - Check the MONGODB_URI in `.env`

3. **Dependencies installation failed**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Permission denied (Linux/Mac)**
   - Run: `chmod +x install.sh`
   - Or use: `bash install.sh`

## 📱 First Time Setup

1. **Create an admin account** (you'll need to do this through the database or add a script)
2. **Create swimming pool slots** using the admin panel
3. **Test the booking system** with student accounts

## 🎯 What's Next?

1. Read the [README.md](README.md) for detailed documentation
2. Check the [API documentation](backend/README.md) for backend details
3. Customize the application for your needs

---

**Need help?** Check the troubleshooting section or create an issue in the repository.
