import React from "react";
import PatientSidebar from "./patientSidebar";
import { PiAmbulanceFill } from "react-icons/pi";
import { MdAddCall } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
const EnerengecyContect = () => {
  const [emergencyData, setEmergencyData] = React.useState([]);

  const token = localStorage.getItem("token");
  if (!token) {
    toast.info("Please Login Again");
    navigate("/login");
    return;
  }
  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const res = await axios.get(
          "https://doctor-apoitment-booking-system.onrender.com/emergency/alldata",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setEmergencyData(res.data.mobile);
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }
    };
    fetchEmergencyData();
  }, []);
  return (
    <>
      <PatientSidebar />
      <section className="flex flex-col items-center justify-center max-w-7xl rounded-2xl mt-8 w-full min-h-[220px] bg-blue-900 shadow-md mx-auto gap-4 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Emergency Contact 24×7
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl">
          In case of an emergency, please contact the following numbers.
        </p>
      </section>
      <div className="max-w-7xl w-full mx-auto mt-8 px-4">
        {emergencyData.map((item) => (
          <div
            key={item.id}
            className="  flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
        bg-gray-200
        rounded-md
        shadow-md
        p-4
        mb-4"
          >
            <div className="bg-blue-200 w-15 h-15 rounded-full flex justify-center items-center ">
              <PiAmbulanceFill className="text-3xl text-blue-800 " />
            </div>
            <div className="flex justify-center items-start gap-3">
              <MdAddCall className="text-4xl text-green-500" />
              <span className="text-lg font-medium">
                {item.mobile || "N/A"}
              </span>
            </div>
            <p className="text-lg font-medium">{item.name || "N/A"}</p>
            <a
              href={`tel:${item.mobile}`}
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Call Now
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default EnerengecyContect;
