import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="p-6">
      {data ? (
        <>
          <h2 className="text-xl font-bold">Patient Details</h2>

          <p>Name: {data.firstName}</p>
          <p>Email: {data.email}</p>
          <p>Mobile: {data.mobileNumber}</p>

          <h3 className="mt-4 font-semibold">Appointment</h3>
          <p>Date: {data.appointmentDate}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientDetails;
