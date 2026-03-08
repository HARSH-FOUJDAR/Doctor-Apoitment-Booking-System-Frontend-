import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    specialization: "",
    experience: "",
    contactNumber: "",
    clinicAddress: "",
    payment: "",
    file: null,
  });
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

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) return toast.error("Please login first");
    if (!input.file) return toast.error("Profile picture is required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("specialization", input.specialization);
      formData.append("experience", input.experience);
      formData.append("contactNumber", input.contactNumber);
      formData.append("clinicAddress", input.clinicAddress);
      formData.append("payment", input.payment);
      formData.append("file", input.file); // Match this with Multer upload.single("file")

      const response = await axios.post(
        "https://doctor-apoitment-booking-system.onrender.com/doctor/addDoctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Doctor added successfully!");
        navigate("/doctorhome");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add doctor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white px-10 py-12 shadow-2xl rounded-[2.5rem] border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Add New Doctor
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <select
                  name="specialization"
                  value={input.specialization}
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select specialization</option>

                  {alldoctor.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Doctor Bio / Description"
                rows="3"
                onChange={onChangeHandler}
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <input
                  name="contactNumber"
                  placeholder="Phone Number"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <input
                name="clinicAddress"
                placeholder="Clinic Full Address"
                onChange={onChangeHandler}
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              <input
                name="payment"
                placeholder="Consultation Fees (e.g. ₹500)"
                onChange={onChangeHandler}
                className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />

              <div className="mt-2">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? "bg-gray-400 cursor-blanck" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-bold p-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-100 mt-6`}
              >
                {loading ? "Uploading..." : "Register Doctor"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
