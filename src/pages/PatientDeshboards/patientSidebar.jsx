import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  UserCircle,
  LogOut,
  ChevronLeft,
  Stethoscope,
  ClipboardList,
  Settings,
} from "lucide-react";
import { MdAdd } from "react-icons/md";

const PatientSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Dummy user state - isse aap apne backend/auth logic se replace karein
  const [user, setUser] = useState({
    username: "Dr. Sameer",
    email: "doctor@clinic.com",
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Doctor Appointment Navigation Items
  const navItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
      path: "/patienthome",
    },
    {
      icon: <CalendarCheck size={22} />,
      label: "My Appointments",
      path: "/myapoitment",
    },

    {
      icon: <UserCircle size={22} />,
      label: "Profile",
      path: "/patientprofile",
    },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-blue-100 p-4 flex justify-between items-center z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Stethoscope size={20} />
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight">
            Medi<span className="text-blue-600">Care</span>
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="lg:hidden fixed bottom-6 left-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-3xl flex justify-around items-center py-3 px-2 z-[60] shadow-2xl border border-white/10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path} className="relative p-2">
              <div
                className={`relative z-10 ${isActive ? "text-blue-400" : "text-gray-400"}`}
              >
                {item.icon}
              </div>
              {isActive && (
                <motion.div
                  layoutId="mobileActive"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "100px" : "280px" }}
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-white text-gray-800 flex-col z-50 border-r border-gray-100 shadow-xl"
      >

        {/* Logo Section */}
        <div className="p-8 mb-4 flex items-center gap-4">
          <div className="min-w-[48px] h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 text-white">
            <img
              className="w-10 h-10 object-contain rounded-2xl"
              src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
              alt="Medical Logo"
            />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-black text-gray-800 tracking-tight"
            >
              Appoint<span className="text-blue-500">ify</span>
            </motion.span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.label} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative group ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-blue-600" : "group-hover:text-blue-600"}`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span
                      className={`font-bold tracking-wide ${isActive ? "text-blue-700" : ""}`}
                    >
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute left-0 w-1.5 h-6 bg-blue-600 rounded-r-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {user && (
          <div className="p-6 mt-auto">
            <div
              className={`flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="min-w-[40px] h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {user.username?.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user.username}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-[15px] cursor-pointer font-bold text-red-500 uppercase tracking-wider hover:underline flex items-center gap-1"
                  >
                    Logout <LogOut size={25} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.aside>

      {/* Content Spacers */}
      <div
        className={`hidden lg:block transition-all duration-300 ${isCollapsed ? "ml-[100px]" : "ml-[280px]"}`}
      />
      <div className="lg:hidden h-20" />
    </>
  );
};

export default PatientSidebar;
