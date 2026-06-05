import React from "react";
import PatientSidebar from "./patientSidebar";
const MedicalStore = () => {
  return (
    <div>
      <PatientSidebar />
      <div className="lg:ml-64">
        <h1>Medical Store</h1>
        <p>This is the Medical Store page.</p>
      </div>
    </div>
  );
};

export default MedicalStore;
