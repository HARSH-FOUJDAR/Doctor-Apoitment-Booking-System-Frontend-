import React from "react";
import PatientSidebar from "./patientSidebar";
const MedicalStore = () => {
  return (
    <div>
      <PatientSidebar />
      <div className="flex min-h-screen p-6 flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-black flex justify-center font-bold text-xl">
            Medical Store
          </h1>
          <br />
          <p className="text-md justify-center flex text-red-600">
            This is the Medical Store page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalStore;
