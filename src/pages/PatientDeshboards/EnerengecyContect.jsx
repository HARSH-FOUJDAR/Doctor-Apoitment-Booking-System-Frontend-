import React from "react";
import PatientSidebar from "./patientSidebar";
import { PiAmbulanceFill } from "react-icons/pi";
import { MdAddCall } from "react-icons/md";
import { useEffect, useState } from "react";
const EnerengecyContect = () => {
  const [emergencyData, setEmergencyData] = React.useState([]);
  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/emergency/alldata");
        const data = await response.json();
        setEmergencyData(data.mobileNumbers);
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }
    };
    fetchEmergencyData();
  }, []);
  return (
    <>
      <PatientSidebar />
      <section className="justify-center items-center flex w-full h-50 bg-blue-900  shadow-md">
        <div className="Justify-content items-center flex flex-col">
          <h1 className="text-3xl font-bold text-white mb-4">
            Emergency Contact 24*7
          </h1>
          <p className="text-lg text-white mb-8">
            In case of an emergency, please contact the following numbers:
          </p>
        </div>
      </section>
      {emergencyData.map((item) => (
        <div className="grid grid-cols-1 gap-4 mt-8 mx-auto w-7xl">
          <section className="flex justify-center items-center w-full mt-8 mx-auto ">
            <div className="flex justify-evenly items-center bg-gray-200 w-full h-20  rounded-md shadow-md gap-50">
              <div className="bg-blue-200 w-15 h-15 rounded-full flex justify-center items-center ">
                <PiAmbulanceFill className="text-3xl text-blue-800" />
              </div>
              <div className="flex justify-center items-start gap-5">
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
          </section>
        </div>
      ))}
    </>
  );
};

export default EnerengecyContect;
