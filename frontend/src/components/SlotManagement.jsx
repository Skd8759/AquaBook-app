import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Plus, Waves } from "lucide-react";
import axios from "axios";
import DateSelector from "./slot-management/DateSelector";
import SlotCreator from "./slot-management/SlotCreator";
import MessageDisplay from "./slot-management/MessageDisplay";

const SlotManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [existingSlots, setExistingSlots] = useState([]);
  const [customSlots, setCustomSlots] = useState({
    morningCount: 5,
    eveningCount: 5,
  });

  const API_BASE =
    import.meta.env.MODE === "development" ? "http://localhost:4000" : ""; // production

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Fetch existing slots for the selected date
  const fetchExistingSlots = async (date) => {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const response = await axios.get(
        `${API_BASE}/api/slots/list?from=${startOfDay.toISOString()}&to=${endOfDay.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setExistingSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch existing slots:", error);
      setExistingSlots([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchExistingSlots(date);
  };

  const createSlots = async () => {
    if (!selectedDate) {
      showMessage("error", "Please select a date");
      return;
    }

    if (customSlots.morningCount === 0 && customSlots.eveningCount === 0) {
      showMessage("error", "Please select at least one slot to create");
      return;
    }

    // Check if slots already exist for this date
    if (existingSlots.length > 0) {
      showMessage("error", "Swimming pool slots already exist for this date");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE}/api/slots`,
        {
          date: selectedDate.toISOString(),
          morningCount: customSlots.morningCount,
          eveningCount: customSlots.eveningCount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      showMessage(
        "success",
        `Successfully created ${
          customSlots.morningCount + customSlots.eveningCount
        } swimming pool slots for the selected date`
      );
      fetchExistingSlots(selectedDate);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.error || "Failed to create slots"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExistingSlots(selectedDate);
  }, []);

  return (
    <div className="space-y-6">
      <MessageDisplay message={message} />

      <div className="grid lg:grid-cols-2 gap-8">
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <SlotCreator
          selectedDate={selectedDate}
          loading={loading}
          onCreateSlots={createSlots}
          customSlots={customSlots}
          onCustomSlotsChange={setCustomSlots}
        />
      </div>

      {/* Existing Slots Display */}
      {existingSlots.length > 0 && (
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Waves className="w-5 h-5 text-blue-600" />
            <span>Existing Swimming Pool Slots</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {existingSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg border-2 ${
                  slot.gender === "boys"
                    ? "border-blue-200 bg-blue-50"
                    : "border-pink-200 bg-pink-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">
                      {new Date(slot.startTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      -{" "}
                      {new Date(slot.endTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {slot.gender === "boys" ? "Boys" : "Girls"} Pool
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      {slot.occupied}/{slot.capacity}
                    </div>
                    <div className="text-sm text-gray-600">swimmers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Info Section */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">1. Select Date</h4>
            <p className="text-sm text-gray-600">
              Choose the date for which you want to create swimming pool slots
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Waves className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">2. Auto-Generate</h4>
            <p className="text-sm text-gray-600">
              Creates 5 morning slots (boys) and 5 evening slots (girls)
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-800 mb-2">3. Create Slots</h4>
            <p className="text-sm text-gray-600">
              Generate 10 swimming pool slots (30-minute each)
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SlotManagement;
