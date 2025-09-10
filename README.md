# 🏊‍♂️ NITK Swimming Pool Booking App

A modern web application for booking swimming pool slots at NITK with gender separation and real-time capacity management.

## ✨ Features

- **Gender Separation**: Morning slots for boys, evening slots for girls
- **30-minute Slots**: Perfect duration for swimming sessions
- **Real-time Booking**: Live availability and instant confirmations
- **Capacity Management**: 20 swimmers per slot with visual indicators
- **Admin Panel**: Easy slot creation and management
- **Responsive Design**: Works on all devices
- **Modern UI**: Beautiful, intuitive interface

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **MongoDB** (running locally or cloud instance)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd B-D-App
   ```

2. **Run the setup script**
   ```bash
   node setup.js
   ```

   This will:
   - Install all dependencies
   - Create necessary configuration files
   - Set up the development environment

3. **Configure MongoDB**
   - Make sure MongoDB is running on your system
   - Update the `MONGODB_URI` in `backend/.env` if needed

4. **Start the application**
   ```bash
   npm run dev
   ```

   This starts both frontend and backend servers simultaneously.

### Alternative Manual Setup

If the setup script doesn't work, follow these steps:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Create environment file**
   ```bash
   cp backend/.env.example backend/.env
   ```

5. **Start the servers**
   ```bash
   # Terminal 1 - Backend
   npm start

   # Terminal 2 - Frontend
   npm run dev --prefix frontend
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Admin Panel**: http://localhost:5173/admin (admin login required)

## 📱 Usage

### For Students
1. Visit the application
2. Login with your credentials
3. Browse available swimming pool slots
4. Book your preferred time slot
5. View your bookings in "My Bookings"

### For Admins
1. Login with admin credentials
2. Go to Admin panel
3. Select a date to create swimming pool slots
4. System automatically creates:
   - 5 morning slots (6:00-8:00 AM) for boys
   - 5 evening slots (6:00-8:00 PM) for girls
5. Monitor bookings and manage slots

## 🏗️ Project Structure

```
B-D-App/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication middleware
│   │   └── services/       # Business logic
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
│   └── package.json
├── setup.js               # Setup script
└── README.md
```

## 🔧 Configuration

### Backend Configuration (`backend/.env`)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/nitk-pool-booking

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=4000
NODE_ENV=development

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

The frontend automatically detects the environment and uses the appropriate API endpoints.

## 📊 Database Schema

### Users
- `name`: User's full name
- `email`: User's email address
- `password`: Hashed password
- `role`: 'student' or 'admin'

### Slots
- `startTime`: Slot start time
- `endTime`: Slot end time
- `gender`: 'boys' or 'girls'
- `capacity`: Maximum swimmers (20)
- `occupied`: Current bookings count

### Bookings
- `user`: Reference to User
- `slot`: Reference to Slot
- `cancelledAt`: Cancellation timestamp (null if active)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update `MONGODB_URI` in production environment
3. Set `NODE_ENV=production`
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the frontend: `npm run build --prefix frontend`
2. Deploy the `dist` folder to your hosting service
3. Update `FRONTEND_URL` in backend configuration

## 🛠️ Development

### Available Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend
npm start

# Start only frontend
npm run dev --prefix frontend

# Build frontend for production
npm run build

# Build and start for production
npm run build-all
```

### Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check the `.env` configuration
5. Create an issue in the repository

## 🎯 Features Overview

### Swimming Pool Slots
- **Duration**: 30 minutes per slot
- **Capacity**: 20 swimmers per slot
- **Gender Separation**: 
  - Morning slots (6:00-8:00 AM) for boys
  - Evening slots (6:00-8:00 PM) for girls
- **Time Slots**: 6:00, 6:30, 7:00, 7:30, 8:00

### Booking System
- Real-time availability checking
- Individual swimmer bookings
- Capacity visualization
- Booking cancellation
- Admin management

### User Interface
- Modern, responsive design
- Gender-specific color coding
- Real-time updates
- Intuitive navigation
- Mobile-friendly

---

**Happy Swimming! 🏊‍♂️🏊‍♀️**
