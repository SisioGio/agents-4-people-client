import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { useNotification } from "../../components/Notification";
import { useAuth } from "../../utils/AuthContext";
import DailyReservations from "./DailyReservations";

const ReservationsManager = () => {
  const { auth } = useAuth();
  const {showNotification} = useNotification()
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editKey, setEditKey] = useState(null);
  const [openForm,setOpenForm] = useState(false)
  const [form, setForm] = useState({
    full_name: "",
    reservation_date: "", // yyyy-mm-dd
    reservation_time: "", // hh:mm
    reservation_people: 1,
    notes: "",
    phone_no: "",
  });
const [selectedDay, setSelectedDay] = useState(new Date()); // Date object now

  // This state stores the "center" day for the day selector window.
  // Initially same as selectedDay.
  const [centerDay, setCenterDay] = useState(new Date());

  // Generate 7 days centered on centerDay
  const get7DayWindow = (center) => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(center);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const dayWindow = get7DayWindow(centerDay);

  // Format date YYYY-MM-DD for API and display
  const formatDate = (date) => date.toISOString().slice(0, 10);

  // When user clicks a day in the dayWindow
  const onDayClick = (day) => {
    setSelectedDay(day);
    setCenterDay(day); // re-center day window around selected day
  };

  // Scroll day window backward
  const onPrevClick = () => {
    const newCenter = new Date(centerDay);
    newCenter.setDate(newCenter.getDate() - 1);
    setCenterDay(newCenter);
  };

  // Scroll day window forward
  const onNextClick = () => {
    const newCenter = new Date(centerDay);
    newCenter.setDate(newCenter.getDate() + 1);
    setCenterDay(newCenter);
  };

  // User can select day from date input
  const onDateInputChange = (e) => {
    const d = new Date(e.target.value);
    if (!isNaN(d)) {
      setSelectedDay(d);
      setCenterDay(d);
    }
  };
   

  // Fetch reservations when selectedDay changes
  useEffect(() => {
    fetchReservations(selectedDay);
  }, [selectedDay]);

  const fetchReservations = async (date) => {
    setLoading(true);
    try {
      const dateParam = formatDate(date)
      const res = await apiClient.get(`/reservation/get?date=${dateParam}`);
      setReservations(res.data || []);
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
    }
    setLoading(false);
  };






  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const startAdd = () => {
    setOpenForm(true)
    setEditKey(null);
    setForm({
      full_name: "",
      reservation_date: "",
      reservation_time: "",
      reservation_people: 1,
      notes: "",
      phone_no: "",
    });
  };

  const startEdit = (resv) => {
    setOpenForm(true)
    // resv.reservation_date is key: "YYYY-MM-DD#UUID"
    setEditKey(resv.reservation_date);
    setForm({
      full_name: resv.full_name,
      reservation_date: resv.reservation_date.split("#")[0],
      reservation_time: resv.start_time,
      reservation_people: resv.people,
      notes: resv.notes || "",
      phone_no: resv.phone_number || "",
    });
  };

  const cancelEdit = () => {
    setEditKey(null);
    setOpenForm(false)
    startAdd();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: form.full_name,
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      reservation_people: Number(form.reservation_people),
      notes: form.notes,
      phone_no: form.phone_no,
    };

    try {
      if (editKey) {
        // update requires reservation_key
        await apiClient.put("/reservation/upd", {
          ...payload,
          reservation_key: editKey,
        });
        showNotification({text:"🎯 Reservation successfully updated!",error:false})
      } else {
        await apiClient.post("/reservation/add", payload);
        showNotification({text:"🎯 Reservation successfully added!",error:false})
      }
      fetchReservations(form.reservation_date);
      cancelEdit();
    } catch (error) {
      console.error("Error saving reservation:", error);
      showNotification({text:"🚫 Ops, something went wrong!",error:true})
    }
  };

  const handleDelete = async (key, date) => {
    // if (!window.confirm("Are you sure you want to delete this reservation?"))
    //   return;
    try {

      console.log(key)
      const res = await apiClient.delete(`/reservation/del?reservation_key=${encodeURIComponent(key)}`);
      showNotification({text:"🎯 Reservation successfully removed!",error:false})
      fetchReservations(date);
    } catch (error) {
      console.error("Delete failed:", error);
      console.log(error.response.data.message)
      showNotification({
  text: error?.response?.data?.message || "⚠️ Something went wrong. Try refreshing or checking your connection.",
  error: true,
});
    }
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-lg font-semibold text-indigo-700 animate-pulse">
        Loading reservations...
      </p>
    );
  }

 
  return (
    <div className="p-6  mx-auto">
 

      <div className="mb-4 flex items-center space-x-3">
        <button
          onClick={onPrevClick}
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Prev
        </button>

        <div className="flex space-x-2 overflow-x-auto no-scrollbar">
          {dayWindow.map((day) => {
            const dayStr = formatDate(day);
            const bookedPeople = 0; // replace with real booking count per day if available
            const capacity = auth.capacity || 50;
            const percent = Math.min(100, (bookedPeople / capacity) * 100);

            return (
              <button
                key={dayStr}
                onClick={() => onDayClick(day)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg cursor-pointer transition ${
                  formatDate(selectedDay) === dayStr
                    ? "bg-indigo-700 text-white shadow-lg"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
                title={`${bookedPeople} booked of ${capacity} capacity`}
              >
                <span className="font-semibold">{dayStr.slice(5)}</span>
                <div className="w-16 h-2 bg-indigo-300 rounded mt-1 overflow-hidden">
                  <div
                    className="h-full bg-indigo-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onNextClick}
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Next
        </button>

        <input
          type="date"
          value={formatDate(selectedDay)}
          onChange={onDateInputChange}
          className="ml-4 p-1 rounded border border-indigo-300"
        />
      </div>




      <button
        onClick={startAdd}
        className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400"
      >
        + Add New Reservation
      </button>

      {openForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-white p-6 rounded-lg shadow-lg border border-indigo-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={form.full_name}
                onChange={handleInputChange}
                required
                placeholder="Full name"
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="phone_no"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_no"
                name="phone_no"
                value={form.phone_no}
                onChange={handleInputChange}
                placeholder="e.g. +1234567890"
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="reservation_people"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Number of Guests
              </label>
              <input
                type="number"
                id="reservation_people"
                name="reservation_people"
                value={form.reservation_people}
                onChange={handleInputChange}
                min={1}
                required
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="reservation_date"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Date
              </label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                value={form.reservation_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="reservation_time"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Time
              </label>
              <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                value={form.reservation_time}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="notes"
                className="block mb-2 font-semibold text-indigo-700"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any special requests..."
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-4 justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-700 via-indigo-700 to-fuchsia-700 text-white rounded-lg font-semibold hover:brightness-110 transition"
            >
              {editKey ? "Update Reservation" : "Add Reservation"}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-2 border border-indigo-300 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <DailyReservations reservations={reservations} handleDelete={handleDelete} startEdit={startEdit}/>
    </div>
  );
};

export default ReservationsManager;
