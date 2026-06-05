import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
const PatientDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const getPatientDetails = async () => {
    try {
      const res = await axios.get(
        `https://doctor-apoitment-booking-system.onrender.com/appoitmet/patientdetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setData(res.data.appoitment);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, [id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <SideBar />
      {data ? (
        <>
          <h2 className="text-2xl font-bold text-orange-700 mx-auto flex mb-2 justify-around">
            Patient Details
          </h2>
          <div className="space-y-4">
            <p className="text-lg font-medium">Name: {data.firstName}</p>
            <p className="text-lg font-medium">Email: {data.email}</p>
            <p className="text-lg font-medium">Mobile: {data.mobileNumber}</p>

            <h3 className="mt-4 font-semibold">Appointment</h3>
            <p className="text-lg font-medium">Date: {data.appointmentDate}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex gap-4 mt-6">
        <button className="mt-6 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Accept Appointment
        </button>

        <button className="mt-6 bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600">
          Reject Appointment
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
