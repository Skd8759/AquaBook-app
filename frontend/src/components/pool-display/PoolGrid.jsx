import { motion } from "framer-motion";
import { Users, Droplets } from "lucide-react";

const PoolGrid = ({ slot, onSlotClick }) => {
  // Format time with AM/PM for morning, 24-hour + PM for evening
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    if (hours < 12) {
      return `${hours === 0 ? 12 : hours}:${minutes} AM`; // Morning
    } else {
      return `${hours}:${minutes} PM`; // Evening (24-hour + PM)
    }
  };

  // Morning / Evening helper, subtle styling
  const getPeriod = (dateString) => {
    const hours = new Date(dateString).getHours();
    return hours < 12 ? "Morning" : "Evening";
  };

  // Get gender-specific styling
  const getGenderColor = (gender) => {
    return gender === "male"
      ? "from-emerald-500 to-teal-500"
      : "from-rose-500 to-pink-500";
  };

  const getGenderIcon = (gender) => {
    return gender === "male" ? "♂" : "♀";
  };

  // Get capacity status for swimming pool
  const getCapacityStatus = () => {
    const occupied = slot.occupied || 0;
    const capacity = slot.capacity || 20;
    const available = capacity - occupied;

    if (available === 0)
      return {
        status: "full",
        color: "bg-red-100 border-red-300 text-red-700",
      };
    else if (occupied > 0)
      return {
        status: "partial",
        color: "bg-yellow-100 border-yellow-300 text-yellow-700",
      };
    else
      return {
        status: "available",
        color: "bg-green-100 border-green-300 text-green-700",
      };
  };

  const capacityStatus = getCapacityStatus();
  const occupied = slot.occupied || 0;
  const capacity = slot.capacity || 20;
  const available = capacity - occupied;

  return (
    <motion.div
      className={`p-8 rounded-3xl border-2 stable-layout cursor-pointer transition-all duration-300 ${
        slot.status === "full"
          ? "border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 cursor-not-allowed opacity-75"
          : "border-emerald-200 hover:border-emerald-400 hover:shadow-2xl hover:scale-[1.03] bg-gradient-to-br from-emerald-50 to-cyan-50 backdrop-blur-sm"
      }`}
      onClick={() => slot.status !== "full" && onSlotClick(slot)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${getGenderColor(
              slot.gender
            )} rounded-2xl flex items-center justify-center shadow-xl`}
          >
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}{" "}
              <span className="text-sm text-emerald-600 font-semibold">
                ({getPeriod(slot.startTime)})
              </span>
            </h3>
            <p className="text-sm text-gray-700 font-medium">
              Swimming Pool - {slot.gender === "male" ? "Male" : "Female"} Only
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold border-2 shadow-lg ${
            slot.status === "available"
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : slot.status === "partial"
              ? "bg-amber-100 text-amber-800 border-amber-300"
              : "bg-red-100 text-red-800 border-red-300"
          }`}
        >
          <span className="capitalize">{slot.status}</span>
        </div>
      </div>

      {/* Swimming Pool Info */}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-600">
                {getGenderIcon(slot.gender)}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">
                {slot.gender === "male" ? "Male" : "Female"} Swimming Pool
              </h4>
              <p className="text-sm text-gray-700 font-medium">
                30-minute swimming sessions
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold ${capacityStatus.color}`}>
              {occupied}/{capacity}
            </div>
            <div className="text-sm text-gray-700 font-semibold">
              {available} spots available
            </div>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-700 font-semibold">
            <span>Pool Capacity</span>
            <span>{Math.round((occupied / capacity) * 100)}% full</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 shadow-inner">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                occupied === 0
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                  : occupied < capacity * 0.7
                  ? "bg-gradient-to-r from-amber-400 to-amber-500"
                  : "bg-gradient-to-r from-red-400 to-red-500"
              }`}
              style={{
                width: `${Math.min((occupied / capacity) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoolGrid;
