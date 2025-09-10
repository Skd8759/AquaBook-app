import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Calendar,
  Settings,
  Droplets,
  Sun,
  Moon,
  BookOpen,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use shared theme context for consistent dark/light mode
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navItems = [
    {
      path: "/calendar",
      label: "Calendar",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      path: "/my-bookings",
      label: "My Bookings",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      path: "/admin",
      label: "Admin",
      icon: <Settings className="w-5 h-5" />,
      adminOnly: true,
    },
  ];

  return (
    <motion.nav
      className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 backdrop-blur-md border-b-2 border-emerald-200 dark:border-emerald-700 fixed-navbar shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Droplets className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                AquaBook
              </h1>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                NITK Swimming Pool
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.adminOnly && user.role !== "admin") return null;

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105"
                      : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-800 dark:hover:text-emerald-200 hover:shadow-md"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-3 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </motion.button>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 capitalize font-medium">
                  {user.role || "student"}
                </p>
              </div>

              {/* User Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              className="p-3 text-emerald-600 dark:text-emerald-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t-2 border-emerald-200 dark:border-emerald-700 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => {
            if (item.adminOnly && user.role !== "admin") return null;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
