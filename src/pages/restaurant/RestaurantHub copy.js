import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {useAuth} from './../../../utils/AuthContext'
// Sample data
const restaurant = {
  id: 'restaurant-1',
  name: 'Restaurant 1',
  opening_hour: '09:00',
  closing_hour: '23:00',
  capacity: 20,
  slot_time: 60, // in minutes
};

const reservations = [
  {
    id: '1',
    date: '2025-05-16',
    start_time: '16:00',
    end_time: '18:00',
    people: 4,
    phone_number: '+391252342',
    full_name: 'Alessio Giovannini',
    notes: 'Something romantic',
  },
  {
    id: '2',
    date: '2025-05-17',
    start_time: '14:00',
    end_time: '15:00',
    people: 6,
    phone_number: '+391252343',
    full_name: 'Marco Bianchi',
    notes: 'Birthday',
  },
];

// Helpers
const formatTime = (hour, minute) =>
  `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

const generateSlots = (open, close, interval) => {
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  const slots = [];
  let current = new Date(0, 0, 0, openH, openM);
  const end = new Date(0, 0, 0, closeH, closeM);

  while (current < end) {
    const start = formatTime(current.getHours(), current.getMinutes());
    current.setMinutes(current.getMinutes() + interval);
    const endSlot = formatTime(current.getHours(), current.getMinutes());
    slots.push({ start, end: endSlot });
  }
  return slots;
};

const get7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const RestaurantHub = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateStr = selectedDate.toISOString().split('T')[0];

  const slots = generateSlots(
    restaurant.opening_hour,
    restaurant.closing_hour,
    restaurant.slot_time
  );

  const slotData = slots.map((slot) => {
    const resForSlot = reservations.filter(
      (res) =>
        res.date === dateStr &&
        slot.start >= res.start_time &&
        slot.start < res.end_time
    );

    const people = resForSlot.reduce((sum, res) => sum + res.people, 0);

    return { ...slot, people, reservations: resForSlot };
  });

  const days = get7Days();


  const get_reservations = ()=>{

    
  }
  useState(()=>{


  },[])

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-6   text-white">
        {restaurant.name} — Daily Reservation Overview
      </h2>

      {/* Day selector */}
      <div className="flex space-x-4 overflow-x-auto mb-10 pb-2">
        {days.map((day, i) => {
          const label = day.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          const isToday =
            day.toDateString() === new Date().toDateString();

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(day)}
              className={`px-4 py-2 rounded-lg font-semibold min-w-[100px] ${
                day.toDateString() === selectedDate.toDateString()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              } ${isToday ? 'border-2 border-purple-500' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Slot overview */}
      <div className="grid gap-6">
        {slotData.map((slot, i) => {
          const pct = Math.min(
            (slot.people / restaurant.capacity) * 100,
            100
          );
          if(slot.reservations.length>0){
 return (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl border border-gray-200 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-indigo-600">
                  {slot.start} – {slot.end}
                </h4>
                <span className="text-sm text-gray-500">
                  {slot.people} / {restaurant.capacity} people
                </span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct > 80
                      ? 'bg-red-500'
                      : pct > 50
                      ? 'bg-yellow-400'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Reservations inside slot */}
              {slot.reservations.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {slot.reservations.map((r) => (
                    <div
                      key={r.id}
                      className="bg-gray-50 rounded-md p-2 text-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">
                          {r.full_name}
                        </span>
                        <span className="text-gray-600">{r.people} ppl</span>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {r.phone_number} – {r.notes}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No reservations</p>
              )}
            </motion.div>
          );
          }
         
        })}
      </div>
    </div>
  );
};

export default RestaurantHub;
