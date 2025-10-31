import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNotification } from "../../components/Notification";
import DocumentUpload from "./GuestDataCollector";

const useDecodedToken = (token) => {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return decoded;
};

const GuestsManager = () => {
  const { booking_id, key } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const { showNotification } = useNotification();
  
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const decodedToken = useDecodedToken(token);

  useEffect(() => {
    if (decodedToken) {
      fetchGuests();
    }
  }, [decodedToken]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://cnho0zr7e8.execute-api.eu-central-1.amazonaws.com/prod/airbnb/api/guest/guest`, {
        headers: { "authorization": token },
      });
      setGuests(res.data);
    } catch (err) {
      console.error("Error fetching guests:", err);
      showNotification({ text: "Failed to fetch guests", error:true });
    } finally {
      setLoading(false);
    }
  };

  const deleteGuest = async (guest_id) => {
    try {
      await axios.delete(`https://cnho0zr7e8.execute-api.eu-central-1.amazonaws.com/prod/airbnb/api/guest/guest?guest_id=${guest_id}`, {
        headers: { "authorization": token },
      });
      fetchGuests();
      showNotification({ text: "Guest successfully deleted!", error:false });
    } catch (err) {
      console.error("Error deleting guest:", err);
      showNotification({ text: "Failed to delete guest", error:true });
    }
  };

  const submitDocuments = async () => {
    try {
      await axios.post(
        "https://cnho0zr7e8.execute-api.eu-central-1.amazonaws.com/prod/airbnb/api/guest/submit",
        {},
        { headers: { "Authorization": token } }
      );
      showNotification({ text: "Data successfully submitted!", error:false});
      fetchGuests();
    } catch (err) {
      console.error("Error submitting documents:", err);
      showNotification({ text: "Failed to submit documents", error:true });
    }
  };

  if (!token || !decodedToken) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div></div>;

  return (
    <div className="min-h-screen bg-gray-100  px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-extrabold text-white">Guest Management</h1>
        </div>
   
        <div className="p-6 space-y-8 mt-0"  >
          <BookingDetails booking={decodedToken} />
          <GuestList guests={guests} onDeleteGuest={deleteGuest} loading={loading} expectedGuests={decodedToken.number_of_guests} />
          <DocumentUpload 
            fetchGuests={fetchGuests} 
            booking_id={decodedToken.booking_id} 
            host_id={decodedToken.host_id} 
            apartment_id={decodedToken.apartment_id}  
            token={token}
          />
          <SubmitButton 
            onSubmit={submitDocuments} 
            disabled={guests.length !== decodedToken.number_of_guests} 
          />
        </div>
      </div>
    </div>
  );
};

const BookingDetails = ({ booking }) => (
  <div className="bg-gray-50 rounded-lg p-6 shadow">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <p><span className="font-medium">Booking Code:</span> {booking.booking_id}</p>
      <p><span className="font-medium">Guests:</span> {booking.number_of_guests}</p>
      <p><span className="font-medium">Check-in:</span> {new Date(booking.checkin).toLocaleDateString()}</p>
      <p><span className="font-medium">Check-out:</span> {new Date(booking.checkout).toLocaleDateString()}</p>
    </div>
  </div>
);

const GuestList = ({ guests, onDeleteGuest, loading, expectedGuests }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">Guest List</h2>
    {loading ? (
      <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guests.map((guest) => (
          <GuestCard key={guest.guest_id} guest={guest} onDelete={onDeleteGuest} />
        ))}
        {Array.from({ length: expectedGuests - guests.length }, (_, index) => (
          <EmptyGuestCard key={index} guestNumber={index + guests.length + 1} />
        ))}
      </div>
    )}
  </div>
);

const GuestCard = ({ guest, onDelete }) => (
  <div className={`border rounded-lg p-4 shadow-sm ${guest.sent ? 'bg-green-50' : 'bg-white'}`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{guest.nome} {guest.cognome}</h3>
        <p className="text-sm text-gray-600">{guest.tipo_documento}: {guest.numero_documento}</p>
        <p className="text-sm text-gray-600">{guest.guest_type_code}</p>
      </div>
      <button
        onClick={() => onDelete(guest.guest_id)}
        className="text-red-600 hover:text-red-800 transition"
      >
        Delete
      </button>
    </div>
  </div>
);

const EmptyGuestCard = ({ guestNumber }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-32 text-gray-400">
    <span className="text-lg font-semibold">Guest {guestNumber}</span>
    <span className="text-sm">No data entered</span>
  </div>
);

const SubmitButton = ({ onSubmit, disabled }) => (
  <button
    onClick={onSubmit}
    disabled={disabled}
    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
      disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
    }`}
  >
    Submit Data
  </button>
);

export default GuestsManager;