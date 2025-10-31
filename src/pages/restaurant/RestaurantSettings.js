import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../components/Notification";
const initialShifts = {
  morning: { start: "", end: "" },
  evening: { start: "", end: "" },
};

const RestaurantSettings = () => {
    const {showNotification} = useNotification()

    const { auth } = useAuth();
  const [form, setForm] = useState({
    name: auth.name,
    capacity: auth.capacity,
    shifts: auth.shifts,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);




 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Restaurant name is required.");
      return;
    }
    if (!form.capacity || Number(form.capacity) < 1) {
      alert("Capacity must be at least 1.");
      return;
    }

    setSaving(true);
    try {
      await apiClient.put("/restaurant/upd", form);
      
      showNotification({text:"🎯 Settings updated successfully!",error:false})
    } catch (error) {
      console.error("Failed to update settings:", error);

      showNotification({text:"🚫 Ops, something went wrong!",error:true})
    } finally {
      setSaving(false);
    }
  };

  // Add new shift key input state
  const [newShiftName, setNewShiftName] = useState("");

  // Handle dynamic shifts change (already mostly done)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [shift, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        shifts: {
          ...prev.shifts,
          [shift]: {
            ...prev.shifts[shift],
            [field]: value,
          },
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add a new shift dynamically
  const handleAddShift = () => {
    const trimmedName = newShiftName.trim();
    if (!trimmedName) return alert("Shift name cannot be empty.");
    if (form.shifts[trimmedName]) return alert("Shift name already exists.");

    setForm((prev) => ({
      ...prev,
      shifts: {
        ...prev.shifts,
        [trimmedName]: { start: "", end: "" },
      },
    }));
    setNewShiftName("");
  };

  // Optionally remove a shift
  const handleRemoveShift = (shiftName) => {
    if (!window.confirm(`Remove shift "${shiftName}"?`)) return;
    setForm((prev) => {
      const newShifts = { ...prev.shifts };
      delete newShifts[shiftName];
      return { ...prev, shifts: newShifts };
    });
  };




  return (
    <div className=" mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 select-none">
        Restaurant Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Name */}
        <div>
          <label htmlFor="name" className="block text-indigo-700 font-semibold mb-2">
            Restaurant Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g., The Cozy Place"
            className="w-full px-4 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Capacity */}
        <div>
          <label htmlFor="capacity" className="block text-indigo-700 font-semibold mb-2">
            Total Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            min={1}
            required
            placeholder="e.g., 50"
            className="w-full px-4 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Shifts */}
        <fieldset className="border border-indigo-300 rounded p-4">
          <legend className="text-indigo-700 font-semibold mb-4">Shifts</legend>

          {Object.entries(form.shifts).map(([shiftName, shiftTimes]) => (
            <div
              key={shiftName}
              className="grid grid-cols-2 gap-6 mb-4 items-center"
            >
              <div className="col-span-2 flex justify-between items-center mb-2">
                <h4 className="font-semibold text-indigo-700 text-lg">
                  {shiftName.charAt(0).toUpperCase() + shiftName.slice(1)}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveShift(shiftName)}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                  aria-label={`Remove shift ${shiftName}`}
                >
                  Remove
                </button>
              </div>

              <div>
                <label
                  htmlFor={`${shiftName}.start`}
                  className="block text-indigo-700 font-semibold mb-1"
                >
                  Start Time
                </label>
                <input
                  id={`${shiftName}.start`}
                  name={`${shiftName}.start`}
                  type="time"
                  value={shiftTimes.start}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label
                  htmlFor={`${shiftName}.end`}
                  className="block text-indigo-700 font-semibold mb-1"
                >
                  End Time
                </label>
                <input
                  id={`${shiftName}.end`}
                  name={`${shiftName}.end`}
                  type="time"
                  value={shiftTimes.end}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          ))}

          {/* Add new shift */}
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              placeholder="New shift name"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
              className="flex-grow px-4 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={handleAddShift}
              className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
            >
              Add Shift
            </button>
          </div>
        </fieldset>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantSettings;
