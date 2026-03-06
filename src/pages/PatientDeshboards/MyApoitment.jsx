import React, { useEffect, useState } from "react";
import PatientSidebar from "./patientSidebar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString && JSON.parse(userString);
  const patientId = user?._id;

  // 1. Fetch Appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/appoitmet/myappoitment/${patientId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Could not fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) fetchAppointments();
  }, [patientId]);

  // 2. Cancel/Delete Appointment Function
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`https://doctor-apoitment-booking-system.onrender.com/appoitmet/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(appointments.filter((app) => app._id !== id));
        alert("Appointment cancelled successfully.");
      } catch (err) {
        alert("Failed to cancel appointment.");
      }
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          My Appointments
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute">
                <ClipLoader color="#3B82F6" size={100} speedMultiplier={0.8} />
              </div>

              <img
                className="w-16 h-16 object-contain rounded-full bg-white p-2 shadow-sm"
                src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
                alt="Medical Logo"
              />
            </div>

            <p className="text-slate-500 font-medium animate-pulse">
              Securing your connection...
            </p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <p className="text-gray-500 text-lg">No appointments booked yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="border p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow relative"
              >
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    a.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {a.status}
                </span>

                <h3 className="text-xl font-bold text-blue-700 mb-1">
                  Dr. {a.doctor?.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {a.doctor?.specialization}
                </p>

                <hr className="mb-4" />

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Patient:</strong> {a.firstName} {a.lastName}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(a.appointmentDate).toDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {a.appointmentTime}
                  </p>
                  <p>
                    <strong>Payment:</strong>
                    <span
                      className={
                        a.paymentStatus === "Paid"
                          ? "text-green-600 ml-1"
                          : "text-red-500 ml-1"
                      }
                    >
                      {a.paymentStatus}
                    </span>
                  </p>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => handleCancel(a._id)}
                  className="mt-6 w-full bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors border border-red-200"
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
