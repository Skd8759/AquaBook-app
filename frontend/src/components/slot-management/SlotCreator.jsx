import { motion } from "framer-motion";
import { Plus, Droplets, Clock, Users } from "lucide-react";

const SlotCreator = ({
  selectedDate,
  loading,
  onCreateSlots,
  customSlots,
  onCustomSlotsChange,
}) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl shadow-xl border-2 border-emerald-200 p-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Droplets className="w-8 h-8 text-emerald-600" />
          <h3 className="text-2xl font-bold text-gray-800">
            Create Swimming Pool Slots
          </h3>
        </div>

        {selectedDate && (
          <div className="mb-6 p-6 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-2xl border-2 border-emerald-300">
            <h4 className="font-bold text-emerald-800 mb-3 text-lg">
              Selected Date:
            </h4>
            <div className="text-xl font-bold text-emerald-700">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-emerald-600 mt-2 font-medium">
              {customSlots.morningCount} morning slots (Boys) +{" "}
              {customSlots.eveningCount} evening slots (Girls)
            </div>
          </div>
        )}

        {/* Custom Slot Configuration */}
        <div className="mb-6 p-6 bg-white rounded-2xl border-2 border-emerald-200 shadow-lg">
          <h4 className="font-bold text-gray-800 mb-4 text-lg">
            Customize Slot Configuration
          </h4>

          <div className="grid grid-cols-2 gap-6">
            {/* Morning Slots */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-700">
                  Morning Slots (Boys)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    onCustomSlotsChange({
                      ...customSlots,
                      morningCount: Math.max(0, customSlots.morningCount - 1),
                    })
                  }
                  className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg font-bold transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-emerald-600 w-8 text-center">
                  {customSlots.morningCount}
                </span>
                <button
                  onClick={() =>
                    onCustomSlotsChange({
                      ...customSlots,
                      morningCount: Math.min(10, customSlots.morningCount + 1),
                    })
                  }
                  className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-gray-600">
                Times: 6:00 AM - 8:00 AM
              </div>
            </div>

            {/* Evening Slots */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-rose-600" />
                <span className="font-semibold text-gray-700">
                  Evening Slots (Girls)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    onCustomSlotsChange({
                      ...customSlots,
                      eveningCount: Math.max(0, customSlots.eveningCount - 1),
                    })
                  }
                  className="w-8 h-8 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-rose-600 w-8 text-center">
                  {customSlots.eveningCount}
                </span>
                <button
                  onClick={() =>
                    onCustomSlotsChange({
                      ...customSlots,
                      eveningCount: Math.min(10, customSlots.eveningCount + 1),
                    })
                  }
                  className="w-8 h-8 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-gray-600">
                Times: 6:00 PM - 8:00 PM
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="text-sm text-emerald-700 font-medium">
              Total Slots: {customSlots.morningCount + customSlots.eveningCount}{" "}
              slots
            </div>
            <div className="text-xs text-emerald-600">
              Each slot: 30 minutes, 20 swimmers capacity
            </div>
          </div>
        </div>

        <motion.button
          onClick={onCreateSlots}
          disabled={
            loading ||
            !selectedDate ||
            (customSlots.morningCount === 0 && customSlots.eveningCount === 0)
          }
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 inline-flex items-center space-x-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6" />
          <span>{loading ? "Creating..." : "Create Swimming Pool Slots"}</span>
        </motion.button>

        <p className="text-sm text-gray-600 mt-4 font-medium">
          Creates {customSlots.morningCount + customSlots.eveningCount} swimming
          pool slots with your custom configuration
        </p>
      </div>
    </motion.div>
  );
};

export default SlotCreator;
