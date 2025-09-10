import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Clock, CheckCircle, Users } from "lucide-react";
import axios from "axios";

const BookingModal = ({ slot, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const API_BASE =
    import.meta.env.MODE === "development" ? "http://localhost:4000" : ""; // production

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Automatically check availability when modal opens
  useEffect(() => {
    console.log("BookingModal opened for slot:", slot);
    console.log("Current token:", localStorage.getItem("token"));
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    setCheckingAvailability(true);
    try {
      console.log("Checking availability for slot:", slot.id);
      const response = await axios.get(
        `${API_BASE}/api/bookings/check-availability/${slot.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Availability response:", response.data);
      setAvailability(response.data);
      showMessage("success", "Availability checked successfully!");
    } catch (error) {
      console.error("Availability check error:", error);
      showMessage(
        "error",
        error.response?.data?.error || "Failed to check availability"
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBooking = async () => {
    if (!availability?.canBook) {
      showMessage("error", "This swimming pool slot is full");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting swimming pool booking with:", {
        slotId: slot.id,
        token: localStorage.getItem("token") ? "Present" : "Missing",
      });

      const response = await axios.post(
        `${API_BASE}/api/bookings`,
        {
          slotId: slot.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Booking response:", response.data);
      showMessage("success", "Swimming pool booking successful!");
      setTimeout(() => onSuccess(), 2000);
    } catch (error) {
      console.error("Booking error:", error);
      showMessage("error", error.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getGenderIcon = (gender) => {
    return gender === "boys" ? "♂" : "♀";
  };

  const getGenderColor = (gender) => {
    return gender === "boys"
      ? "from-emerald-500 to-teal-500"
      : "from-rose-500 to-pink-500";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${getGenderColor(
                  slot.gender
                )} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Book Swimming Pool
                </h2>
                <p className="text-sm text-gray-600">
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)} (
                  {slot.gender === "boys" ? "Boys" : "Girls"})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg fast-hover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 modal-scroll">
            {/* Message Display */}
            <AnimatePresence>
              {message.text && (
                <motion.div
                  className={`p-4 rounded-lg flex items-center space-x-2 ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Swimming Pool Info */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${getGenderColor(
                    slot.gender
                  )} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl font-bold text-white">
                    {getGenderIcon(slot.gender)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {slot.gender === "boys" ? "Boys" : "Girls"} Swimming Pool
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    30-minute swimming session
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
                  <div className="text-3xl font-bold text-emerald-600">
                    {availability ? availability.occupied : slot.occupied || 0}/
                    {availability ? availability.capacity : slot.capacity || 20}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    Swimmers
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
                  <div className="text-3xl font-bold text-cyan-600">
                    {availability
                      ? availability.available
                      : (slot.capacity || 20) - (slot.occupied || 0)}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    Available
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            {checkingAvailability && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Checking availability...</span>
                </div>
              </div>
            )}

            {/* Capacity Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Pool Capacity</span>
                <span>
                  {Math.round(
                    ((availability
                      ? availability.occupied
                      : slot.occupied || 0) /
                      (availability
                        ? availability.capacity
                        : slot.capacity || 20)) *
                      100
                  )}
                  % full
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    (availability
                      ? availability.occupied
                      : slot.occupied || 0) === 0
                      ? "bg-green-500"
                      : (availability
                          ? availability.occupied
                          : slot.occupied || 0) <
                        (availability
                          ? availability.capacity
                          : slot.capacity || 20) *
                          0.7
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      ((availability
                        ? availability.occupied
                        : slot.occupied || 0) /
                        (availability
                          ? availability.capacity
                          : slot.capacity || 20)) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Availability Info */}
            {availability ? (
              <motion.div
                className={`p-4 border rounded-lg ${
                  availability.canBook
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`flex items-center space-x-2 ${
                    availability.canBook ? "text-green-800" : "text-red-800"
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {availability.canBook
                      ? `Pool has ${availability.available} spots available for booking.`
                      : "Pool is currently full. Please try another time slot."}
                  </span>
                </div>
              </motion.div>
            ) : (
              !checkingAvailability && (
                <motion.div
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Checking availability... Please wait or try refreshing.
                    </span>
                  </div>
                </motion.div>
              )
            )}

            {/* Booking Summary */}
            {availability?.canBook && (
              <motion.div
                className="p-4 bg-primary-50 border border-primary-200 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-medium text-primary-800 mb-2">
                  Booking Summary
                </h4>
                <div className="space-y-1 text-sm text-primary-700">
                  <div>
                    • Time: {formatTime(slot.startTime)} -{" "}
                    {formatTime(slot.endTime)}
                  </div>
                  <div>
                    • Pool: {slot.gender === "boys" ? "Boys" : "Girls"} Swimming
                    Pool
                  </div>
                  <div>• Duration: 30 minutes</div>
                  <div>• Type: Individual booking</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
            <button onClick={onClose} className="btn-secondary stable-button">
              Cancel
            </button>
            <button
              onClick={handleBooking}
              disabled={!availability?.canBook || loading}
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
