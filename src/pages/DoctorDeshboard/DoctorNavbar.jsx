import React from "react";
import {
  FaCalendarCheck,
  FaUserInjured,
  FaClock,
  FaWallet,
} from "react-icons/fa";

const DoctorNavbar = () => {
  const stats = [
    {
      id: 1,
      title: "Total Appointments",
      value: "120",
      icon: <FaCalendarCheck />,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-200",
    },
    {
      id: 2,
      title: "Pending Requests",
      value: "15",
      icon: <FaClock />,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-200",
    },
    {
      id: 3,
      title: "Total Patients",
      value: "85",
      icon: <FaUserInjured />,
      color: "from-emerald-400 to-green-600",
      shadow: "shadow-green-200",
    },
    {
      id: 4,
      title: "Total Earnings",
      value: "$4,200",
      icon: <FaWallet />,
      color: "from-purple-500 to-indigo-600",
      shadow: "shadow-purple-200",
    },
  ];

  return (
    <div className="w-full font-sans">
      <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg  flex justify-between items-center sticky top-0 z-50"></nav>

      <div className="px-8 max-w-7xl mx-auto">
        {/* --- Welcome Header --- */}
        <div className="py-10">
          <h1 className="text-slate-800 text-3xl font-black leading-tight">
            Welcome back, <span className="text-blue-600">Dr. Sarah</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Here's what's happening with your patients{" "}
            <span className="text-blue-500 font-bold underline decoration-2 underline-offset-4">
              today.
            </span>
          </p>
        </div>

        {/* --- 4 Stats Boxes: Modern Gradient & Floating Effect --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer overflow-hidden relative"
            >
              <div
                className={`absolute -right-4 -bottom-4 w-20 h-15 bg-gradient-to-br ${item.color}  duration-700`}
              ></div>

              <div className="relative z-10">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[2px] mb-2">
                  {item.title}
                </p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {item.value}
                </h3>
              </div>

              <div
                className={`bg-gradient-to-br ${item.color} text-white p-4 rounded-2xl text-2xl shadow-lg ${item.shadow} duration-300 relative z-10`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorNavbar;
