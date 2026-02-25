import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import PatientHome from "./pages/PatientDeshboards/PatientHome";
import Doctorhome from "./pages/DoctorDeshboard/Doctorhome";
import Appointments from "./pages/DoctorDeshboard/Appointments";
import PatientRecords from "./pages/DoctorDeshboard/PatientRecords";
import DoctorProfile from "./pages/DoctorDeshboard/DoctorProfile";
import AddDoctor from "./pages/DoctorDeshboard/AddDoctor";
import MyApoitment from "./pages/PatientDeshboards/MyApoitment";
import PatientProfile from "./pages/PatientDeshboards/PatientProfile";
import DoctorDetails from "./pages/PatientDeshboards/DoctorDetails.";
// import ApoitmentForm from "./pages/PatientDeshboards/ApoitmentForm";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctorhome" element={<Doctorhome />} />
        <Route path="/patienthome" element={<PatientHome />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patientrecords" element={<PatientRecords />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/adddoctor" element={<AddDoctor />} />
        <Route path="/myapoitment" element={<MyApoitment />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/doctorDetails/:id" element={<DoctorDetails />} />
        {/* <Route path="/ApoitmentForm/:id" element={<DoctorDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
