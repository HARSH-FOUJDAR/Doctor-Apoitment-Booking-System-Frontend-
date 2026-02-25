import React from "react";
import SideBar from "./SideBar";
import DoctorNavbar from "./DoctorNavbar";

const Doctorhome = () => {
  const allAppointments = [
    {
      id: 1,
      patient: "Rahul Sharma",
      date: "20 Feb 2026",
      time: "10:30 AM",
      status: "Confirmed",
      img: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
    },
    {
      id: 2,
      patient: "Anjali Gupta",
      date: "20 Feb 2026",
      time: "11:15 AM",
      status: "Pending",
      img: "https://ui-avatars.com/api/?name=Anjali+Gupta&background=E53E3E&color=fff",
    },
    {
      id: 3,
      patient: "Amit Verma",
      date: "21 Feb 2026",
      time: "09:00 AM",
      status: "Cancelled",
      img: "https://ui-avatars.com/api/?name=Amit+Verma&background=38A169&color=fff",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {" "}
      {/* Light premium background */}
      {/* Sidebar - Fixed */}
      <div className="w-64 fixed h-full shadow-xl">
        <SideBar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <DoctorNavbar />

        {/* --- All Appointments Card --- */}
        <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="px-8 py-6 bg-white border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                Recent Appointments
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                You have {allAppointments.length} appointments today
              </p>
            </div>
            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              Show All
            </button>
          </div>

          {/* Custom Styled Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fcfcfd] text-gray-400 text-xs uppercase tracking-widest">
                  <th className="px-8 py-5 font-semibold">Patient</th>
                  <th className="px-8 py-5 font-semibold">Date & Time</th>
                  <th className="px-8 py-5 font-semibold">Status</th>
                  <th className="px-8 py-5 font-semibold text-center">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="group hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.img}
                          alt="user"
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <span className="font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                          {app.patient}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-medium">
                          {app.date}
                        </span>
                        <span className="text-xs text-gray-400">
                          {app.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold inline-block shadow-sm ${
                          app.status === "Confirmed"
                            ? "bg-green-50 text-green-600"
                            : app.status === "Pending"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                          Details
                        </button>
                        <button className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctorhome;
