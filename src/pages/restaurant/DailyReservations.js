import React from "react";
import { useAuth } from "../../utils/AuthContext";

const DailyReservations = ({ reservations, handleDelete, startEdit }) => {
  const { auth } = useAuth();

  // Extract useful data from auth
  const { capacity, shifts, time_slot } = auth;

  // Parse reservation times into minutes for slot calculation
  const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  // Format minutes to HH:MM
  const minutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // Build slots for each shift
  const slotsByShift = {};
  for (const [shiftName, { start, end }] of Object.entries(shifts)) {
    const startMins = timeToMinutes(start);
    const endMins = timeToMinutes(end);
    const slots = [];
    for (let time = startMins; time < endMins; time += time_slot) {
      slots.push({
        start: minutesToTime(time),
        end: minutesToTime(Math.min(time + time_slot, endMins)),
        reservations: [],
      });
    }
    slotsByShift[shiftName] = slots;
  }

  // Assign reservations to slots
  reservations.forEach((resv) => {
    const resvStart = timeToMinutes(resv.start_time);
    for (const [shiftName, slots] of Object.entries(slotsByShift)) {
      slots.forEach((slot) => {
        const slotStart = timeToMinutes(slot.start);
        const slotEnd = timeToMinutes(slot.end);
        // Check if reservation start time falls into slot time range
        if (resvStart >= slotStart && resvStart < slotEnd) {
          slot.reservations.push(resv);
        }
      });
    }
  });

  // Calculate usage for a slot
  const slotUsage = (slot) =>
    slot.reservations.reduce((sum, r) => sum + r.people, 0);

  // Calculate total usage per shift
  const shiftUsage = (slots) =>
    slots.reduce((sum, slot) => sum + slotUsage(slot), 0);

  // Helpers for styling slot capacity
  const getSlotBg = (used) => {
    if (used === 0) return "bg-green-100";
    if (used <= capacity / 2) return "bg-yellow-100";
    if (used < capacity) return "bg-yellow-300";
    return "bg-red-300"; // over capacity
  };

  return (
    <div className="  mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6">
        Daily Reservations Overview
      </h2>

      {/* Show summary capacity and shift usage */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-indigo-700">
          Total Capacity: <span className="font-extrabold">{capacity}</span> seats
        </p>
      </div>

      {Object.entries(slotsByShift).map(([shiftName, slots]) => {
        const totalUsed = shiftUsage(slots);
        return (
          <section key={shiftName} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4 capitalize">
              {shiftName} Shift ({shifts[shiftName].start} - {shifts[shiftName].end})
            </h3>

            {/* Shift usage bar */}
            <div className="mb-6 w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className={`h-6 ${
                  totalUsed > capacity ? "bg-red-500" : "bg-indigo-600"
                }`}
                style={{
                  width: `${Math.min((totalUsed / capacity) * 100, 100)}%`,
                }}
                title={`${totalUsed} / ${capacity} seats booked`}
              />
            </div>
            <p className="mb-4 font-semibold text-indigo-700">
              Total booked seats: {totalUsed} / {capacity}
            </p>

            {/* Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slots.map((slot) => {
                const usedSeats = slotUsage(slot);
                return (
                  <div
                    key={slot.start}
                    className={`p-4 rounded-md border cursor-pointer ${getSlotBg(
                      usedSeats
                    )} hover:shadow-lg transition`}
                    title={`Time: ${slot.start} - ${slot.end}\nBooked seats: ${usedSeats}/${capacity}`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-indigo-900">
                        {slot.start} - {slot.end}
                      </span>
                      <span
                        className={`font-bold ${
                          usedSeats >= capacity ? "text-red-700" : "text-indigo-700"
                        }`}
                      >
                        {usedSeats} / {capacity}
                      </span>
                    </div>

                    {slot.reservations.length === 0 ? (
                      <p className="text-green-700 text-sm font-medium">
                        No reservations
                      </p>
                    ) : (
                      <ul className="max-h-48 overflow-y-auto text-sm space-y-1">
                        {slot.reservations.map((resv) => (
                          <li
                            key={resv.reservation_date}
                            className="flex justify-between items-center bg-indigo-50 rounded px-2 py-1"
                          >
                            <div>
                              <p className="font-semibold">{resv.full_name}</p>
                              <p className="text-indigo-700">
                                Guests: {resv.people}
                              </p>
                            </div>
                            <div className="space-x-2">
                              <button
                                onClick={() => startEdit(resv)}
                                className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-xs"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(
                                    resv.reservation_date,
                                    resv.reservation_date.split("#")[0]
                                  )
                                }
                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DailyReservations;
