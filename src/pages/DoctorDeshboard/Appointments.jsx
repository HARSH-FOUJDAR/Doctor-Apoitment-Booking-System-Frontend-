import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // NOTE: Fixed potential typo from 'appoitmet' to 'appointment'
      const res = await axios.get(
        "http://localhost:5000/appoitmet/allAppointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Helper function to dynamically style status badges
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Layout Alignment */}
      <SideBar />

      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Appointments Management
          </h1>
          <p className="text-slate-500 mt-1">
            Review, confirm, or reject upcoming patient schedules.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : appointments.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-lg">No appointments found.</p>
          </div>
        ) : (
          /* Grid Cards Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1"
              >
                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Header: Name & Status */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800  transition-colors">
                        {item.firstName} {item.lastName}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        ID: {item.patientId || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-md font-medium border ${getStatusColor(item.status)}`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Details List */}
                  <div className="space-y-2.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">
                        Email:
                      </span>
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">
                        Mobile:
                      </span>
                      <span>{item.mobileNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">
                        Date:
                      </span>
                      <span className="text-blue-600 font-medium">
                        {item.appointmentDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">
                        City:
                      </span>
                      <span>{item.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">
                        Address:
                      </span>
                      <span>{item.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-slate-700 w-20 shrink-0">
                        Reason:
                      </span>
                      <p className="text-slate-500 italic">
                        "{item.reason || "No reason provided"}"
                      </p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Doctor Info */}
                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 text-slate-500">
                    <p>
                      <span className="font-semibold text-slate-700">
                        Doctor:
                      </span>{" "}
                      {item.doctorName}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">
                        Doc ID:
                      </span>{" "}
                      {item.doctorId}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 bg-white">
                  <button
                    onClick={() => {
                      /* Add your backend patch/put call here */
                    }}
                    className="w-full py-2.5 px-4 rounded-xl cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500/20"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      /* Add your backend patch/put call here */
                    }}
                    className="w-full py-2.5 px-4 rounded-xl cursor-pointer bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-medium text-sm transition-colors focus:ring-2 focus:ring-rose-500/20"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
