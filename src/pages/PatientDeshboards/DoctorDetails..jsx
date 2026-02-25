import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoArrowBack,
  IoCall,
  IoLocation,
  IoWallet,
  IoMedkit,
  IoCalendarOutline,
  IoStar,
  IoTime,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import PatientSidebar from "./patientSidebar";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    mobileNumber: "",
    reason: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/doctor/getDoctor/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setDoctor(res.data.doctor || res.data);
      } catch (err) {
        toast.error("Doctor details not found");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDoctor();
  }, [id, token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");

    // SAFE PARSING: Checks if string exists and isn't the literal word "undefined"
    let user = null;
    if (userString && userString !== "undefined") {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }

    const userId = user?._id;

    if (!userId) {
      toast.error("User session expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/appoitmet/apotmentform",
        {
          doctor: id,
          patient: userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          mobileNumber: formData.mobileNumber,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
          paymentStatus: "unpaid",
          paymentMethod: formData.paymentMethod || "clinic",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Appointment Booked Successfully");
      navigate("/patienthome");
    } catch (error) {
      console.error("Booking Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  if (loading)
    return (
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
    );

  if (!doctor)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Doctor not found!
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 mb-6 hover:text-blue-600"
        >
          <IoArrowBack className="mr-2" />
          Back
        </button>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Card */}
            <div className="bg-white p-8 rounded-2xl shadow border">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={
                    doctor.profile?.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt={doctor.name}
                  className="w-40 h-40 rounded-xl object-cover"
                />

                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    Dr. {doctor.name}
                  </h1>

                  <p className="text-blue-600 font-semibold mt-1">
                    {doctor.specialization}
                  </p>

                  <div className="flex items-center mt-2 text-sm text-slate-600">
                    <IoStar className="text-yellow-500 mr-1" />
                    {doctor.rating || "4.8"} Rating
                  </div>

                  <p className="mt-2 text-slate-600">
                    <IoMedkit className="inline mr-2" />
                    {doctor.experience} Years Experience
                  </p>

                  <p className="mt-2 text-slate-600">
                    <IoCall className="inline mr-2" />
                    {doctor.contactNumber}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h3 className="font-bold text-lg mb-2">About Doctor</h3>
                <p className="text-slate-600">
                  {doctor.description ||
                    "Dedicated to providing high-quality healthcare services."}
                </p>
              </div>
            </div>

            {/* Services */}
            {/* Services */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="font-bold text-xl mb-4">
                Comprehensive Services Offered
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Our clinic provides a wide range of medical services designed to
                ensure complete patient care. We focus on accurate diagnosis,
                personalized treatment plans, and long-term health management to
                help our patients live healthier lives.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 text-sm">
                {(
                  doctor.services || [
                    "General Consultation and Routine Checkups",
                    "Advanced Health Screening and Preventive Care",
                    "ECG and Cardiac Monitoring Services",
                    "Diabetes Diagnosis and Long-term Management",
                    "Hypertension and Blood Pressure Monitoring",
                    "Cholesterol and Lipid Profile Testing",
                    "Thyroid Function Testing and Treatment",
                    "Lifestyle and Nutritional Counseling",
                    "Chronic Disease Management",
                    "Follow-up Consultations and Health Tracking",
                  ]
                ).map((service, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✔</span>
                    {service}
                  </li>
                ))}
              </ul>

              <p className="text-slate-500 text-xs mt-4">
                Our goal is to deliver patient-centered care with modern
                diagnostic tools and evidence-based treatment methods to ensure
                safety and effective recovery.
              </p>
            </div>
            {/* Instructions */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="font-bold text-xl mb-3">
                Important Guidelines Before Your Visit
              </h3>

              <p className="text-slate-600 text-sm mb-4">
                To ensure a smooth and efficient consultation experience, we
                kindly request patients to follow the instructions below before
                visiting the clinic.
              </p>

              <ul className="text-slate-700 space-y-3 text-sm">
                <li>
                  • Carry all previous medical reports, lab test results, and
                  imaging records.
                </li>
                <li>
                  • Bring current prescriptions and a list of medications you
                  are taking.
                </li>
                <li>
                  • Arrive at least 15 minutes prior to your scheduled
                  appointment time.
                </li>
                <li>
                  • Follow fasting instructions if blood tests or specific
                  procedures are scheduled.
                </li>
                <li>
                  • Inform the doctor about any allergies or ongoing treatments.
                </li>
                <li>
                  • Avoid heavy meals before cardiac or diagnostic procedures.
                </li>
                <li>
                  • Stay hydrated unless instructed otherwise for medical tests.
                </li>
                <li>
                  • For first-time visits, carry a valid ID proof for
                  registration purposes.
                </li>
              </ul>

              <p className="text-slate-500 text-xs mt-4">
                Following these instructions helps us provide accurate
                diagnosis, reduce waiting time, and ensure a better healthcare
                experience for every patient.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE BOOKING */}
          <div className="bg-white p-6 rounded-2xl shadow border h-fit sticky top-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <IoCalendarOutline className="mr-2 text-blue-600" />
              Book Appointment
            </h2>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="font-bold p-2 text-blue-700">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold p-2 text-blue-700">Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold p-2 text-blue-700">Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold p-2 text-blue-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  placeholder="Enter The City"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold p-2 text-blue-700">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter the Address"
                  onChange={handleChange}
                  value={formData.address}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 flex gap-5">
                <div>
                  <label className="font-bold p-2 text-blue-700">Date</label>

                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold p-2 text-blue-700">Time</label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-bold p-2 text-blue-700">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter The Mobile Number"
                  onChange={handleChange}
                  value={formData.mobileNumber}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-bold p-2 text-blue-700">
                  Reason for Visit
                </label>

                <textarea
                  name="reason"
                  placeholder="Reason for Visit"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              {/* Payment */}
              <div className="border-t pt-4">
                <p className="font-semibold mb-2">
                  Consultation Fee: ₹{doctor.payment}
                </p>

                <div className="space-y-2">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      onChange={handleChange}
                    />
                    Pay Online
                  </label>

                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="clinic"
                      onChange={handleChange}
                    />
                    Pay at Clinic
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Confirm Booking
              </button>

              <div className="text-xs text-slate-500 mt-3">
                <p className="font-semibold">Cancellation Policy:</p>
                <p>• 24hr before → Full Refund</p>
                <p>• Same day → 50% Refund</p>
                <p>• No Show → No Refund</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
