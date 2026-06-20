import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import PatientSidebar from "./patientSidebar";
import { IoLocation } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import Footer from "../../components/Footer";

import { FaStethoscope } from "react-icons/fa"; // Doctor icon ke liye
const PatientHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    toast.info("Please Login Again");
    navigate("/login");
    return;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://doctor-apoitment-booking-system.onrender.com/doctor/getDoctor",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDoctor(res.data.doctors || res.data);
      } catch (err) {
        toast.error("Could not load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const alldoctor = [
    "General Physician",
    "Internal Medicine Specialist",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
    "Gynecologist",
    "Neurologist",
    "Neurosurgeon",
    "Psychiatrist",
    "Psychologist",
    "ENT Specialist",
    "Ophthalmologist",
    "Oncologist",
    "Gastroenterologist",
    "Urologist",
    "Nephrologist",
    "Pulmonologist",
    "Endocrinologist",
    "Rheumatologist",
    "Hematologist",
    "Radiologist",
    "Anesthesiologist",
    "Pathologist",
    "Dentist",
    "General Surgeon",
    "Plastic Surgeon",
    "Cardiothoracic Surgeon",
    "Pediatric Surgeon",
    "Obstetrician",
    "Sexologist",
    "Immunologist",
    "Allergy Specialist",
    "Sports Medicine Specialist",
    "Critical Care Specialist",
    "Emergency Medicine Specialist",
    "Geriatrician",
    "Hepatologist",
    "Infectious Disease Specialist",
  ];

  const specializations = [...new Set(Doctor.map((dr) => dr.specialization))];

  const searchCity = [...new Set(Doctor.map((dr) => dr.city))];

  const searchdoctor = Doctor.filter((Dr) => {
    const matchsearch = Dr.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSpecialization = Dr.specialization
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchsearch || matchSpecialization;
  });

  return (
    <>
      {" "}
      <PatientSidebar></PatientSidebar>
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 w-full  py-16 flex flex-col items-center  justify-center text-white px-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            Find Your Specialist
          </h2>
          <p className="text-blue-100">
            Book appointments with the best doctors in your area
          </p>
        </div>

        <div className="flex  max-w-7xl flex-col lg:flex-row gap-5 bg-white rounded-lg shadow-2xl overflow-hidden p-1 lg:p-2">
          {/* 2. Specialist Filter */}
          <div className="flex items-center   flex-1 border-b lg:border-b-0 lg:border-r border-gray-500 px-6 py-5">
            <FaStethoscope className="text-blue-500 text-xl mr-1" />
            <select
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gray-800   focus:outline-none bg-transparent cursor-pointer font-medium"
            >
              <option value="" className="text-gray-900">
                Select Specialization
              </option>
              {specializations.map((spec) => (
                <option
                  key={spec}
                  value={spec}
                  className="text-black justify-center items-center flex "
                >
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Search Doctor Name */}
          <div className="flex items-center  px-5 py-5">
            <IoSearch className="text-gray-400 text-2xl mr-2" />
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gray-800 focus:outline-none"
            />
          </div>

          {/* 4. Action Button */}
          <button
            type="submit"
            onClick={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-4 items-center justify-center flex px-12 rounded-lg transition-all m-1"
          >
            Search Now
          </button>
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Patient Dashboard
            </h2>
            <p className="mt-2 text-gray-600 text-lg">
              Book an appointment with our top-rated specialists.
            </p>
          </div>

          {/* Grid setup: 2 columns on desktop for horizontal cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto md-grid-cols-1">
            {searchdoctor.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-all duration-300 group"
                role="article"
                aria-labelledby={`doctor-${doctor._id}-name`}
              >
                {/* Image Section */}
                <div className="w-full sm:w-48 lg:w-56 h-64 sm:h-auto relative shrink-0 overflow-hidden">
                  {doctor.profile?.profilePicture ? (
                    <img
                      src={doctor.profile.profilePicture}
                      alt={`Dr. ${doctor.name}, ${doctor.specialization} specialist`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      role="img"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-medium">
                        No profile photo
                      </span>
                    </div>
                  )}
                  {/* Online Status */}
                  <div
                    className="absolute top-3 left-3 bg-green-500 h-3 w-3 rounded-full border-2 border-white"
                    aria-label="Doctor is online"
                    role="status"
                  />
                </div>

                {/* Info Section */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3
                        id={`doctor-${doctor._id}-name`}
                        className="text-xl font-bold text-gray-900"
                      >
                        Dr. {doctor.name}
                      </h3>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Verified
                      </span>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm mt-1">
                      <span className="font-bold text-blue-900">MBBS, MD</span>{" "}
                      - {doctor.specialization}
                    </p>
                    <div
                      className="flex items-center gap-2 text-green-600 text-[12px] font-bold mt-3"
                      aria-label="Available today"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      Available Today
                    </div>
                  </div>

                  {/* Parallel Info */}
                  <div className="grid grid-cols-2 gap-4 my-5 py-3 border-y border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Experience
                      </p>
                      <p className="text-md font-bold text-gray-800">
                        {doctor.experience}+ Years
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Consultation
                      </p>
                      <p className="text-md font-bold text-gray-800">
                        ₹{doctor.payment}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/doctorDetails/${doctor._id}`)}
                      className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`View details and book with Dr. ${doctor.name}`}
                    >
                      View Details & Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute">
                <ClipLoader color="#3B82F6" size={100} speedMultiplier={0.8} />
              </div>

              <img
                className="w-16 h-16 object-contain rounded-full bg-white p-2 shadow-sm"
                src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
                alt="Medical Logo"
              />
            </div>

            <p className="text-slate-500 font-medium animate-pulse">
              Securing your connection...
            </p>
          </div>
        ) : (
          <p className="text-slate-500 font-medium animate-pulse">No Doctor</p>
        )}
      </section>
      <Footer></Footer>
    </>
  );
};

export default PatientHome;
