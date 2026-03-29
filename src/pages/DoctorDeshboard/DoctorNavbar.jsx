import React, { useState } from "react";
import AdminHeroSection from "../Admin/AdminHeroSection";
import { IoPeople } from "react-icons/io5";
import { IoMedkit } from "react-icons/io5";
import DoctorHeroDeshboard from "./DoctorHeroDeshboard";
const DoctorNavbar = () => {
  const [doctors, setDoctors] = useState([]);

  return (
    <div className="flex">
      <main className="flex-1 bg-gray-50 min-h-screen p-8">
        <header className="mb-8">
          <h1 className="font-bold text-3xl text-slate-800">
            Welcome to{" "}
            <span className="italic text-blue-600">Doctor Dashboard</span>
          </h1>
          <p className="text-gray-500">Here is what's happening today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<IoPeople size={24} />}
            title="Total Patients"
            count="1,284"
            color="bg-blue-500"
          />
          <StatCard
            icon={<IoMedkit size={24} />}
            title="Total Doctors"
            count={doctors.length || 100}
            color="bg-green-500"
          />
          <StatCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#F3F3F3"
              >
                <path d="M609-389q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM480-160v-56q0-24 12.5-44.5T528-290q36-15 74.5-22.5T680-320q39 0 77.5 7.5T832-290q23 9 35.5 29.5T880-216v56H480ZM287-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm113-113ZM80-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T400-440q35 0 70 6t70 14l-34 34-34 34q-18-5-36-6.5t-36-1.5q-58 0-113.5 14T180-306q-10 5-15 14t-5 20v32h240v80H80Zm320-80Zm56.5-343.5Q480-607 480-640t-23.5-56.5Q433-720 400-720t-56.5 23.5Q320-673 320-640t23.5 56.5Q367-560 400-560t56.5-23.5Z" />
              </svg>
            }
            title="Active Accounts"
            count="42"
            color="bg-purple-500"
          />
          <StatCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#F3F3F3"
              >
                <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
              </svg>
            }
            title="Growth Rate"
            count="42"
            color="bg-purple-500"
          />
        </div>

        <DoctorHeroDeshboard />
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, count, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{count}</p>
    </div>
  </div>
);

export default DoctorNavbar;
